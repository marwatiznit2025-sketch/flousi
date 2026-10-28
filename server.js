"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { promisify } = require("node:util");

const scrypt = promisify(crypto.scrypt);
const TOKEN_LIFETIME_SECONDS = 30 * 24 * 60 * 60;
const MAX_BODY_BYTES = 10 * 1024 * 1024;
const SUPPORTED_CURRENCIES = new Set(["MAD", "USD", "EUR", "GBP", "CAD", "SAR", "AED"]);
const STATIC_FILES = new Map([
    ["/", ["index.html", "text/html; charset=utf-8"]],
    ["/index.html", ["index.html", "text/html; charset=utf-8"]],
    ["/app.js", ["app.js", "text/javascript; charset=utf-8"]],
    ["/style.css", ["style.css", "text/css; charset=utf-8"]],
    ["/logo.svg", ["logo.svg", "image/svg+xml"]],
    ["/manifest.webmanifest", ["manifest.webmanifest", "application/manifest+json; charset=utf-8"]],
    ["/sw.js", ["sw.js", "text/javascript; charset=utf-8"]]
    ["/robots.txt", ["robots.txt", "text/plain; charset=utf-8"]],
    ["/sitemap.xml", ["sitemap.xml", "application/xml; charset=utf-8"]]
    
]);

function isPlainObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

function emptyData() {
    return { transactions: [], budgets: {}, goals: [], budgetAlerts: [], dailyChallenges: [] };
}

function validDate(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(value + "T00:00:00Z");
    return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function validateData(value) {
    if (!isPlainObject(value) ||
        !Array.isArray(value.transactions) || value.transactions.length > 10000 ||
        !isPlainObject(value.budgets) ||
        !Array.isArray(value.goals) || value.goals.length > 1000 ||
        !Array.isArray(value.budgetAlerts) || value.budgetAlerts.length > 5000 ||
        !Array.isArray(value.dailyChallenges) || value.dailyChallenges.length > 365) {
        return null;
    }

    const transactions = [];
    for (const item of value.transactions) {
        if (!isPlainObject(item) ||
            typeof item.id !== "string" || item.id.length < 1 || item.id.length > 128 ||
            !["income", "expense"].includes(item.type) ||
            typeof item.description !== "string" || !item.description.trim() || item.description.length > 200 ||
            !Number.isFinite(item.amount) || item.amount <= 0 || item.amount > 999999999 ||
            typeof item.category !== "string" || item.category.length > 50 ||
            !validDate(item.date)) {
            return null;
        }
        transactions.push({
            id: item.id,
            type: item.type,
            description: item.description.trim(),
            amount: item.amount,
            category: item.category,
            date: item.date
        });
    }

    const budgets = {};
    for (const [month, amount] of Object.entries(value.budgets)) {
        if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month) ||
            !Number.isFinite(amount) || amount <= 0 || amount > 999999999) {
            return null;
        }
        budgets[month] = amount;
    }

    const goals = [];
    for (const goal of value.goals) {
        if (!isPlainObject(goal) ||
            typeof goal.id !== "string" || goal.id.length < 1 || goal.id.length > 128 ||
            typeof goal.name !== "string" || !goal.name.trim() || goal.name.length > 50 ||
            !Number.isFinite(goal.target) || goal.target <= 0 || goal.target > 999999999 ||
            !Number.isFinite(goal.saved) || goal.saved < 0 || goal.saved > goal.target) {
            return null;
        }
        goals.push({ id: goal.id, name: goal.name.trim(), target: goal.target, saved: goal.saved });
    }

    const budgetAlerts = value.budgetAlerts.filter(item =>
        typeof item === "string" && /^\d{4}-(0[1-9]|1[0-2]):(80|100)$/.test(item));
    if (budgetAlerts.length !== value.budgetAlerts.length) return null;

    const dailyChallenges = value.dailyChallenges.filter(validDate);
    if (dailyChallenges.length !== value.dailyChallenges.length) return null;

    return { transactions, budgets, goals, budgetAlerts, dailyChallenges };
}

function sendJson(response, statusCode, body) {
    response.writeHead(statusCode, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff"
    });
    response.end(JSON.stringify(body));
}

async function readJson(request) {
    const chunks = [];
    let size = 0;
    for await (const chunk of request) {
        size += chunk.length;
        if (size > MAX_BODY_BYTES) {
            const error = new Error("Request body is too large.");
            error.statusCode = 413;
            throw error;
        }
        chunks.push(chunk);
    }
    try {
        return JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
        const error = new Error("Request body must be valid JSON.");
        error.statusCode = 400;
        throw error;
    }
}

function normalizeEmail(value) {
    if (typeof value !== "string") return null;
    const email = value.trim().toLowerCase();
    return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

function validChallenge(value) {
    if (!isPlainObject(value) ||
        typeof value.id !== "string" || !/^[A-Za-z0-9_-]{16}$/.test(value.id) ||
        typeof value.title !== "string" || !value.title.trim() || value.title.length > 60 ||
        !Number.isFinite(value.target) || value.target <= 0 || value.target > 999999999 ||
        !SUPPORTED_CURRENCIES.has(value.currency) ||
        !validDate(value.deadline) ||
        !Array.isArray(value.participants) || value.participants.length < 1 || value.participants.length > 50) return false;
    const emails = new Set();
    return value.participants.every(participant => {
        const email = normalizeEmail(participant && participant.email);
        if (!email || typeof participant.name !== "string" || !participant.name.trim() || participant.name.length > 40 ||
            !Number.isFinite(participant.progress) || participant.progress < 0 || participant.progress > value.target ||
            emails.has(email)) return false;
        emails.add(email);
        return true;
    });
}

function publicChallenge(challenge, email) {
    return {
        id: challenge.id,
        title: challenge.title,
        target: Number(challenge.target),
        currency: challenge.currency,
        deadline: challenge.deadline,
        participants: challenge.participants.map(participant => ({
            name: participant.name,
            progress: Number(participant.progress),
            isYou: participant.email === email
        }))
    };
}

async function createServer(options = {}) {
    const dataDir = options.dataDir || process.env.FLOUSI_DATA_DIR || path.join(__dirname, "data");
    const storePath = path.join(dataDir, "store.json");
    const secretPath = path.join(dataDir, "auth-secret");
    const databaseUrl = options.databaseUrl || process.env.DATABASE_URL;
    const allowedOrigin = options.allowedOrigin === undefined
        ? process.env.FLOUSI_ALLOWED_ORIGIN || ""
        : options.allowedOrigin;
    await fs.mkdir(dataDir, { recursive: true });

    let secret;
    if (process.env.FLOUSI_AUTH_SECRET) {
        secret = Buffer.from(process.env.FLOUSI_AUTH_SECRET, "utf8");
        if (secret.length < 32) throw new Error("FLOUSI_AUTH_SECRET must contain at least 32 bytes.");
    } else {
        try {
            secret = await fs.readFile(secretPath);
        } catch (error) {
            if (error.code !== "ENOENT") throw error;
            secret = crypto.randomBytes(32);
            try {
                await fs.writeFile(secretPath, secret, { flag: "wx", mode: 0o600 });
            } catch (writeError) {
                if (writeError.code !== "EEXIST") throw writeError;
                secret = await fs.readFile(secretPath);
            }
        }
        if (secret.length !== 32) throw new Error("Flousi authentication secret must contain exactly 32 bytes.");
    }

    let pool = options.pool || null;
    const ownsPool = !pool && Boolean(databaseUrl);
    if (databaseUrl && !pool) {
        const { Pool } = require("pg");
        pool = new Pool({ connectionString: databaseUrl });
    }
    if (pool) {
        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS flousi_users (
                    email TEXT PRIMARY KEY,
                    salt TEXT NOT NULL,
                    password_hash TEXT NOT NULL,
                    data JSONB NOT NULL
                )
            `);
            await pool.query(`
                CREATE TABLE IF NOT EXISTS flousi_challenges (
                    id TEXT PRIMARY KEY,
                    title TEXT NOT NULL,
                    target NUMERIC NOT NULL,
                    currency TEXT NOT NULL,
                    deadline DATE NOT NULL,
                    participants JSONB NOT NULL
                )
            `);
        } catch (error) {
            if (ownsPool) {
                try {
                    await pool.end();
                } catch (closeError) {
                    console.error("Could not close the PostgreSQL pool after startup failure:", closeError);
                }
            }
            throw error;
        }
    }

    let store;
    if (!pool) {
        try {
            store = JSON.parse(await fs.readFile(storePath, "utf8"));
        } catch (error) {
            if (error.code !== "ENOENT") throw error;
            store = { users: {} };
            await fs.writeFile(storePath, JSON.stringify(store), { flag: "wx", mode: 0o600 });
        }
        if (!isPlainObject(store) || !isPlainObject(store.users)) {
            throw new Error("Flousi account storage is invalid; refusing to overwrite it.");
        }
        if (store.challenges === undefined) store.challenges = {};
        if (!isPlainObject(store.challenges) ||
            !Object.values(store.challenges).every(validChallenge)) {
            throw new Error("Flousi challenge storage is invalid; refusing to overwrite it.");
        }
    }

    let writeQueue = Promise.resolve();
    function persistStore() {
        const snapshot = JSON.stringify(store);
        const write = writeQueue.then(async () => {
            const temporaryPath = storePath + ".tmp";
            await fs.writeFile(temporaryPath, snapshot, { mode: 0o600 });
            await fs.rename(temporaryPath, storePath);
        });
        writeQueue = write.catch(() => {});
        return write;
    }

    async function findUser(email) {
        if (!pool) return store.users[email] || null;
        const result = await pool.query(
            'SELECT email, salt, password_hash AS "passwordHash", data FROM flousi_users WHERE email = $1',
            [email]
        );
        return result.rows[0] || null;
    }

    async function createUser(user) {
        if (!pool) {
            if (store.users[user.email]) return false;
            store.users[user.email] = user;
            try {
                await persistStore();
            } catch (error) {
                delete store.users[user.email];
                throw error;
            }
            return true;
        }
        const result = await pool.query(
            `INSERT INTO flousi_users (email, salt, password_hash, data)
             VALUES ($1, $2, $3, $4::jsonb)
             ON CONFLICT (email) DO NOTHING
             RETURNING email`,
            [user.email, user.salt, user.passwordHash, JSON.stringify(user.data)]
        );
        return result.rowCount === 1;
    }

    async function updateUserData(email, data) {
        if (!pool) {
            const user = store.users[email];
            if (!user) return false;
            const previousData = user.data;
            user.data = data;
            try {
                await persistStore();
            } catch (error) {
                user.data = previousData;
                throw error;
            }
            return true;
        }
        const result = await pool.query(
            "UPDATE flousi_users SET data = $2::jsonb WHERE email = $1",
            [email, JSON.stringify(data)]
        );
        return result.rowCount === 1;
    }

    async function withPgTransaction(operation) {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const result = await operation(client);
            await client.query("COMMIT");
            return result;
        } catch (error) {
            try {
                await client.query("ROLLBACK");
            } catch (rollbackError) {
                console.error("Could not roll back a challenge transaction:", rollbackError);
            }
            throw error;
        } finally {
            client.release();
        }
    }

    async function getChallenges(email) {
        if (!pool) {
            return Object.values(store.challenges)
                .filter(challenge => challenge.participants.some(participant => participant.email === email))
                .map(challenge => publicChallenge(challenge, email));
        }
        const result = await pool.query(
            `SELECT id, title, target, currency, deadline, participants
             FROM flousi_challenges
             WHERE participants @> $1::jsonb`,
            [JSON.stringify([{ email }])]
        );
        return result.rows.map(row => publicChallenge({
            id: row.id,
            title: row.title,
            target: Number(row.target),
            currency: row.currency,
            deadline: typeof row.deadline === "string" ? row.deadline.slice(0, 10) : row.deadline.toISOString().slice(0, 10),
            participants: row.participants
        }, email));
    }

    async function createChallenge(challenge) {
        if (!pool) {
            store.challenges[challenge.id] = challenge;
            try {
                await persistStore();
            } catch (error) {
                delete store.challenges[challenge.id];
                throw error;
            }
            return;
        }
        await withPgTransaction(async client => {
            await client.query(
                `INSERT INTO flousi_challenges (id, title, target, currency, deadline, participants)
                 VALUES ($1, $2, $3, $4, $5, $6::jsonb)`,
                [challenge.id, challenge.title, challenge.target, challenge.currency, challenge.deadline, JSON.stringify(challenge.participants)]
            );
        });
    }

    async function joinChallenge(id, email, name) {
        if (!pool) {
            const challenge = store.challenges[id];
            if (!challenge) return null;
            if (!challenge.participants.some(participant => participant.email === email)) {
                if (challenge.participants.length >= 50) return false;
                challenge.participants.push({ email, name, progress: 0 });
                try {
                    await persistStore();
                } catch (error) {
                    challenge.participants = challenge.participants.filter(participant => participant.email !== email);
                    throw error;
                }
            }
            return publicChallenge(challenge, email);
        }
        return withPgTransaction(async client => {
            const result = await client.query(
                `SELECT id, title, target, currency, deadline, participants
                 FROM flousi_challenges WHERE id = $1 FOR UPDATE`,
                [id]
            );
            const row = result.rows[0];
            if (!row) return null;
            const participants = row.participants;
            if (!participants.some(participant => participant.email === email)) {
                if (participants.length >= 50) return false;
                participants.push({ email, name, progress: 0 });
                await client.query(
                    "UPDATE flousi_challenges SET participants = $2::jsonb WHERE id = $1",
                    [id, JSON.stringify(participants)]
                );
            }
            return publicChallenge({
                id: row.id,
                title: row.title,
                target: Number(row.target),
                currency: row.currency,
                deadline: typeof row.deadline === "string" ? row.deadline.slice(0, 10) : row.deadline.toISOString().slice(0, 10),
                participants
            }, email);
        });
    }

    async function updateChallengeProgress(id, email, progress) {
        if (!pool) {
            const challenge = store.challenges[id];
            const participant = challenge && challenge.participants.find(item => item.email === email);
            if (!participant) return null;
            if (progress > challenge.target) return false;
            const previousProgress = participant.progress;
            participant.progress = progress;
            try {
                await persistStore();
            } catch (error) {
                participant.progress = previousProgress;
                throw error;
            }
            return publicChallenge(challenge, email);
        }
        return withPgTransaction(async client => {
            const result = await client.query(
                `SELECT id, title, target, currency, deadline, participants
                 FROM flousi_challenges WHERE id = $1 FOR UPDATE`,
                [id]
            );
            const row = result.rows[0];
            if (!row) return null;
            const participants = row.participants;
            const participant = participants.find(item => item.email === email);
            if (!participant) return null;
            if (progress > Number(row.target)) return false;
            participant.progress = progress;
            await client.query(
                "UPDATE flousi_challenges SET participants = $2::jsonb WHERE id = $1",
                [id, JSON.stringify(participants)]
            );
            return publicChallenge({
                id: row.id,
                title: row.title,
                target: Number(row.target),
                currency: row.currency,
                deadline: typeof row.deadline === "string" ? row.deadline.slice(0, 10) : row.deadline.toISOString().slice(0, 10),
                participants
            }, email);
        });
    }

    function createToken(email) {
        const payload = Buffer.from(JSON.stringify({
            sub: email,
            exp: Math.floor(Date.now() / 1000) + TOKEN_LIFETIME_SECONDS
        })).toString("base64url");
        const signature = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
        return payload + "." + signature;
    }

    async function authenticatedUser(request) {
        const authorization = request.headers.authorization;
        if (typeof authorization !== "string") return null;
        const match = /^Bearer\s+([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)$/i.exec(authorization);
        if (!match) return null;
        const parts = match[1].split(".");
        if (parts.length !== 2) return null;
        const [payload, signature] = parts;
        if (!payload || !signature) return null;
        const expected = crypto.createHmac("sha256", secret).update(payload).digest();
        let actual;
        try {
            actual = Buffer.from(signature, "base64url");
        } catch {
            return null;
        }
        if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return null;
        let claims;
        try {
            claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
        } catch {
            return null;
        }
        if (!claims || typeof claims.sub !== "string" || !Number.isFinite(claims.exp) ||
            claims.exp <= Math.floor(Date.now() / 1000)) return null;
        return findUser(claims.sub);
    }

    const server = http.createServer(async (request, response) => {
        const origin = request.headers.origin;
        if (origin && allowedOrigin) {
            if (origin !== allowedOrigin) {
                sendJson(response, 403, { error: "Origin is not allowed." });
                return;
            }
            response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
            response.setHeader("Vary", "Origin");
        }
        if (request.method === "OPTIONS" && request.url.startsWith("/api/")) {
            response.writeHead(204, {
                "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
                "Access-Control-Allow-Headers": "Authorization, Content-Type",
                "Access-Control-Max-Age": "600"
            });
            response.end();
            return;
        }

        const pathname = new URL(request.url, "http://localhost").pathname;
        try {
            if (request.method === "GET" && pathname === "/api/health") {
                if (pool) await pool.query("SELECT 1");
                sendJson(response, 200, { status: "ok" });
                return;
            }
            if (request.method === "POST" && pathname === "/api/auth/register") {
                const body = await readJson(request);
                const email = normalizeEmail(body && body.email);
                if (!email) {
                    sendJson(response, 400, { error: "A valid email address is required.", code: "INVALID_EMAIL" });
                    return;
                }
                if (typeof body.password !== "string" ||
                    body.password.length < 10 || body.password.length > 128) {
                    sendJson(response, 400, { error: "Password must contain 10 to 128 characters.", code: "INVALID_PASSWORD" });
                    return;
                }
                if (await findUser(email)) {
                    sendJson(response, 409, { error: "An account with this email already exists.", code: "EMAIL_EXISTS" });
                    return;
                }
                const data = validateData(body.data);
                if (!data) {
                    sendJson(response, 400, { error: "Account data is invalid.", code: "INVALID_DATA" });
                    return;
                }
                const salt = crypto.randomBytes(16);
                const passwordHash = await scrypt(body.password, salt, 64);
                const user = { email, salt: salt.toString("base64"), passwordHash: passwordHash.toString("base64"), data };
                if (!await createUser(user)) {
                    sendJson(response, 409, { error: "An account with this email already exists.", code: "EMAIL_EXISTS" });
                    return;
                }
                sendJson(response, 201, { token: createToken(email), email, data });
                return;
            }

            if (request.method === "POST" && pathname === "/api/auth/login") {
                const body = await readJson(request);
                const email = normalizeEmail(body && body.email);
                const user = email && await findUser(email);
                if (!user || typeof body.password !== "string" || body.password.length > 128) {
                    sendJson(response, 401, { error: "Email or password is incorrect.", code: "INVALID_LOGIN" });
                    return;
                }
                const passwordHash = await scrypt(body.password, Buffer.from(user.salt, "base64"), 64);
                const expected = Buffer.from(user.passwordHash, "base64");
                if (expected.length !== passwordHash.length || !crypto.timingSafeEqual(expected, passwordHash)) {
                    sendJson(response, 401, { error: "Email or password is incorrect.", code: "INVALID_LOGIN" });
                    return;
                }
                sendJson(response, 200, { token: createToken(email), email, data: user.data });
                return;
            }

            if (pathname === "/api/data" && (request.method === "GET" || request.method === "PUT")) {
                const user = await authenticatedUser(request);
                if (!user) {
                    sendJson(response, 401, { error: "Authentication is required.", code: "UNAUTHORIZED" });
                    return;
                }
                if (request.method === "GET") {
                    sendJson(response, 200, { email: user.email, data: user.data });
                    return;
                }
                const data = validateData(await readJson(request));
                if (!data) {
                    sendJson(response, 400, { error: "Account data is invalid.", code: "INVALID_DATA" });
                    return;
                }
                if (!await updateUserData(user.email, data)) {
                    sendJson(response, 401, { error: "Authentication is required.", code: "UNAUTHORIZED" });
                    return;
                }
                sendJson(response, 200, { data });
                return;
            }

            if (pathname === "/api/challenges" && (request.method === "GET" || request.method === "POST")) {
                const user = await authenticatedUser(request);
                if (!user) {
                    sendJson(response, 401, { error: "Authentication is required.", code: "UNAUTHORIZED" });
                    return;
                }
                if (request.method === "GET") {
                    sendJson(response, 200, { challenges: await getChallenges(user.email) });
                    return;
                }
                const body = await readJson(request);
                if (!isPlainObject(body)) {
                    sendJson(response, 400, { error: "Challenge details are invalid.", code: "INVALID_CHALLENGE" });
                    return;
                }
                const title = typeof body.title === "string" ? body.title.trim() : "";
                const name = typeof body.name === "string" ? body.name.trim() : "";
                const today = new Date().toISOString().slice(0, 10);
                if (!title || title.length > 60 || !name || name.length > 40 ||
                    !Number.isFinite(body.target) || body.target <= 0 || body.target > 999999999 ||
                    !SUPPORTED_CURRENCIES.has(body.currency) ||
                    !validDate(body.deadline) || body.deadline <= today) {
                    sendJson(response, 400, { error: "Challenge details are invalid.", code: "INVALID_CHALLENGE" });
                    return;
                }
                const challenge = {
                    id: crypto.randomBytes(12).toString("base64url"),
                    title,
                    target: body.target,
                    currency: body.currency,
                    deadline: body.deadline,
                    participants: [{ email: user.email, name, progress: 0 }]
                };
                await createChallenge(challenge);
                sendJson(response, 201, { challenge: publicChallenge(challenge, user.email) });
                return;
            }

            const challengeMatch = /^\/api\/challenges\/([A-Za-z0-9_-]{16})(?:\/(join|progress))?$/.exec(pathname);
            if (challengeMatch && ["POST", "PUT"].includes(request.method)) {
                const user = await authenticatedUser(request);
                if (!user) {
                    sendJson(response, 401, { error: "Authentication is required.", code: "UNAUTHORIZED" });
                    return;
                }
                const [, id, action] = challengeMatch;
                const body = await readJson(request);
                if (!isPlainObject(body)) {
                    sendJson(response, 400, { error: "Challenge details are invalid.", code: "INVALID_CHALLENGE" });
                    return;
                }
                if (action === "join" && request.method === "POST") {
                    const name = typeof body.name === "string" ? body.name.trim() : "";
                    if (!name || name.length > 40) {
                        sendJson(response, 400, { error: "A display name is required.", code: "INVALID_CHALLENGE" });
                        return;
                    }
                    const challenge = await joinChallenge(id, user.email, name);
                    if (challenge === false) {
                        sendJson(response, 409, { error: "This challenge is full.", code: "CHALLENGE_FULL" });
                        return;
                    }
                    if (!challenge) {
                        sendJson(response, 404, { error: "Challenge not found.", code: "NOT_FOUND" });
                        return;
                    }
                    sendJson(response, 200, { challenge });
                    return;
                }
                if (action === "progress" && request.method === "PUT") {
                    if (!Number.isFinite(body.progress) || body.progress < 0 || body.progress > 999999999) {
                        sendJson(response, 400, { error: "Progress amount is invalid.", code: "INVALID_CHALLENGE" });
                        return;
                    }
                    const challenge = await updateChallengeProgress(id, user.email, body.progress);
                    if (challenge === false) {
                        sendJson(response, 400, { error: "Progress cannot exceed the challenge target.", code: "INVALID_CHALLENGE" });
                        return;
                    }
                    if (!challenge) {
                        sendJson(response, 404, { error: "Challenge not found.", code: "NOT_FOUND" });
                        return;
                    }
                    sendJson(response, 200, { challenge });
                    return;
                }
            }

            if (pathname.startsWith("/api/")) {
                sendJson(response, 404, { error: "API endpoint not found.", code: "NOT_FOUND" });
                return;
            }
            if (request.method !== "GET" && request.method !== "HEAD") {
                sendJson(response, 405, { error: "Method not allowed.", code: "METHOD_NOT_ALLOWED" });
                return;
            }
            const file = STATIC_FILES.get(pathname);
            if (!file) {
                sendJson(response, 404, { error: "Page not found.", code: "NOT_FOUND" });
                return;
            }
            const contents = await fs.readFile(path.join(__dirname, file[0]));
            response.writeHead(200, {
                "Content-Type": file[1],
                "X-Content-Type-Options": "nosniff",
                "Referrer-Policy": "same-origin"
            });
            response.end(request.method === "HEAD" ? undefined : contents);
        } catch (error) {
            if (error.statusCode) {
                sendJson(response, error.statusCode, { error: error.message, code: "INVALID_REQUEST" });
                return;
            }
            console.error("Flousi request failed:", error);
            if (!response.headersSent) sendJson(response, 500, { error: "Internal server error.", code: "SERVER_ERROR" });
            else response.destroy();
        }
    });
    if (ownsPool) {
        server.on("close", () => {
            pool.end().catch(error => console.error("Could not close the PostgreSQL pool:", error));
        });
    }
    return server;
}

if (require.main === module) {
    createServer().then(server => {
        const port = Number(process.env.PORT) || 3000;
        const host = process.env.HOST || (process.env.RAILWAY_ENVIRONMENT ? "0.0.0.0" : "127.0.0.1");
        server.listen(port, host, () => {
            console.log("Flousi is available at http://" + host + ":" + port);
        });
    }).catch(error => {
        console.error("Could not start Flousi:", error);
        process.exitCode = 1;
    });
}

module.exports = { createServer };

