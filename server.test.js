"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { after, before, test } = require("node:test");
const { createServer } = require("./server");

let dataDir;
let server;
let baseUrl;

before(async () => {
    dataDir = await fs.mkdtemp(path.join(os.tmpdir(), "flousi-api-"));
    server = await createServer({ dataDir });
    await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
    baseUrl = "http://127.0.0.1:" + server.address().port;
});

after(async () => {
    if (server) await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
    if (dataDir) await fs.rm(dataDir, { recursive: true, force: true });
});

async function post(pathname, body) {
    return fetch(baseUrl + pathname, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
}

test("registration imports data and account data is private and persistent", async () => {
    const initialData = {
        transactions: [{
            id: "tx-1",
            type: "expense",
            description: "Lunch",
            amount: 12.5,
            category: "الماكلة",
            date: "2026-10-14"
        }],
        budgets: { "2026-10": 500 },
        goals: [{ id: "goal-1", name: "Trip", target: 1000, saved: 25 }],
        budgetAlerts: ["2026-10:80"],
        dailyChallenges: ["2026-10-14"]
    };
    const registration = await post("/api/auth/register", {
        email: "owner@example.com",
        password: "correct-horse-battery",
        data: initialData
    });
    assert.equal(registration.status, 201);
    const account = await registration.json();
    assert.equal(account.email, "owner@example.com");
    assert.ok(account.token);
    assert.deepEqual(account.data, initialData);

    const read = await fetch(baseUrl + "/api/data", {
        headers: { Authorization: "Bearer " + account.token }
    });
    assert.equal(read.status, 200);
    assert.deepEqual((await read.json()).data, initialData);

    const update = { transactions: [], budgets: {}, goals: [], budgetAlerts: [], dailyChallenges: [] };
    const write = await fetch(baseUrl + "/api/data", {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + account.token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(update)
    });
    assert.equal(write.status, 200);

    const login = await post("/api/auth/login", { email: "OWNER@example.com", password: "correct-horse-battery" });
    assert.equal(login.status, 200);
    assert.deepEqual((await login.json()).data, update);
});

test("registration rejects weak passwords and invalid app data", async () => {
    const weakPassword = await post("/api/auth/register", {
        email: "weak@example.com",
        password: "short",
        data: { transactions: [], budgets: {}, goals: [], budgetAlerts: [], dailyChallenges: [] }
    });
    assert.equal(weakPassword.status, 400);

    const invalidData = await post("/api/auth/register", {
        email: "invalid@example.com",
        password: "long-enough-password",
        data: { transactions: [{ amount: -10 }], budgets: {}, goals: [], budgetAlerts: [], dailyChallenges: [] }
    });
    assert.equal(invalidData.status, 400);
});

test("account data requires a valid bearer token", async () => {
    const response = await fetch(baseUrl + "/api/data");
    assert.equal(response.status, 401);
    assert.equal((await response.json()).code, "UNAUTHORIZED");
});

test("friend challenges require accounts and keep participant progress private from nonmembers", async () => {
    const emptyData = { transactions: [], budgets: {}, goals: [], budgetAlerts: [], dailyChallenges: [] };
    const ownerRegistration = await post("/api/auth/register", {
        email: "challenge-owner@example.com",
        password: "correct-horse-battery",
        data: emptyData
    });
    const friendRegistration = await post("/api/auth/register", {
        email: "challenge-friend@example.com",
        password: "correct-horse-battery",
        data: emptyData
    });
    const owner = await ownerRegistration.json();
    const friend = await friendRegistration.json();
    const headers = token => ({ Authorization: "Bearer " + token, "Content-Type": "application/json" });
    const deadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    const unauthorized = await fetch(baseUrl + "/api/challenges");
    assert.equal(unauthorized.status, 401);

    const invalid = await fetch(baseUrl + "/api/challenges", {
        method: "POST",
        headers: headers(owner.token),
        body: JSON.stringify({ title: "Trip", target: 100, currency: "XYZ", deadline, name: "Alex" })
    });
    assert.equal(invalid.status, 400);
    assert.equal((await invalid.json()).code, "INVALID_CHALLENGE");

    const created = await fetch(baseUrl + "/api/challenges", {
        method: "POST",
        headers: headers(owner.token),
        body: JSON.stringify({ title: "Trip savings", target: 100, currency: "MAD", deadline, name: "Alex" })
    });
    assert.equal(created.status, 201);
    const challenge = (await created.json()).challenge;
    assert.match(challenge.id, /^[A-Za-z0-9_-]{16}$/);
    assert.equal(challenge.participants.length, 1);
    assert.equal(challenge.participants[0].isYou, true);
    assert.equal(JSON.stringify(challenge).includes(owner.email), false);

    const friendListBeforeJoin = await fetch(baseUrl + "/api/challenges", {
        headers: headers(friend.token)
    });
    assert.deepEqual((await friendListBeforeJoin.json()).challenges, []);

    const joined = await fetch(baseUrl + "/api/challenges/" + challenge.id + "/join", {
        method: "POST",
        headers: headers(friend.token),
        body: JSON.stringify({ name: "Sam" })
    });
    assert.equal(joined.status, 200);
    assert.deepEqual((await joined.json()).challenge.participants.map(item => item.name), ["Alex", "Sam"]);

    const updated = await fetch(baseUrl + "/api/challenges/" + challenge.id + "/progress", {
        method: "PUT",
        headers: headers(friend.token),
        body: JSON.stringify({ progress: 45 })
    });
    assert.equal(updated.status, 200);

    const overTarget = await fetch(baseUrl + "/api/challenges/" + challenge.id + "/progress", {
        method: "PUT",
        headers: headers(friend.token),
        body: JSON.stringify({ progress: 101 })
    });
    assert.equal(overTarget.status, 400);

    const ownerList = await fetch(baseUrl + "/api/challenges", { headers: headers(owner.token) });
    const ownerChallenge = (await ownerList.json()).challenges[0];
    assert.deepEqual(ownerChallenge.participants.map(item => item.progress), [0, 45]);
    assert.equal(JSON.stringify(ownerChallenge).includes(friend.email), false);

    const outsiderRegistration = await post("/api/auth/register", {
        email: "challenge-outsider@example.com",
        password: "correct-horse-battery",
        data: emptyData
    });
    const outsider = await outsiderRegistration.json();
    const outsiderProgress = await fetch(baseUrl + "/api/challenges/" + challenge.id + "/progress", {
        method: "PUT",
        headers: headers(outsider.token),
        body: JSON.stringify({ progress: 10 })
    });
    assert.equal(outsiderProgress.status, 404);
});

test("health endpoint is available for deployment checks", async () => {
    const response = await fetch(baseUrl + "/api/health");
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok" });
});

test("PostgreSQL-backed accounts keep data across server restarts", async () => {
    const postgresUsers = new Map();
    const postgresChallenges = new Map();
    const pool = {
        async query(query, values = []) {
            if (["BEGIN", "COMMIT", "ROLLBACK"].includes(query)) {
                return { rows: [], rowCount: 0 };
            }
            if (query.includes("CREATE TABLE IF NOT EXISTS flousi_users") ||
                query.includes("CREATE TABLE IF NOT EXISTS flousi_challenges")) {
                return { rows: [], rowCount: 0 };
            }
            if (query === "SELECT 1") {
                return { rows: [{ "?column?": 1 }], rowCount: 1 };
            }
            if (query.includes("SELECT email, salt, password_hash")) {
                const user = postgresUsers.get(values[0]);
                return { rows: user ? [user] : [], rowCount: user ? 1 : 0 };
            }
            if (query.includes("INSERT INTO flousi_users")) {
                if (postgresUsers.has(values[0])) return { rows: [], rowCount: 0 };
                postgresUsers.set(values[0], {
                    email: values[0],
                    salt: values[1],
                    passwordHash: values[2],
                    data: JSON.parse(values[3])
                });
                return { rows: [{ email: values[0] }], rowCount: 1 };
            }
            if (query.includes("UPDATE flousi_users")) {
                const user = postgresUsers.get(values[0]);
                if (!user) return { rows: [], rowCount: 0 };
                user.data = JSON.parse(values[1]);
                return { rows: [], rowCount: 1 };
            }
            if (query.includes("SELECT id, title, target, currency, deadline, participants")) {
                if (query.includes("WHERE id = $1")) {
                    const challenge = postgresChallenges.get(values[0]);
                    return { rows: challenge ? [challenge] : [], rowCount: challenge ? 1 : 0 };
                }
                const [{ email }] = JSON.parse(values[0]);
                const challenges = [...postgresChallenges.values()]
                    .filter(challenge => challenge.participants.some(participant => participant.email === email));
                return { rows: challenges, rowCount: challenges.length };
            }
            if (query.includes("INSERT INTO flousi_challenges")) {
                const challenge = {
                    id: values[0],
                    title: values[1],
                    target: values[2],
                    currency: values[3],
                    deadline: values[4],
                    participants: JSON.parse(values[5])
                };
                postgresChallenges.set(challenge.id, challenge);
                return { rows: [], rowCount: 1 };
            }
            if (query.includes("UPDATE flousi_challenges")) {
                const challenge = postgresChallenges.get(values[0]);
                if (!challenge) return { rows: [], rowCount: 0 };
                challenge.participants = JSON.parse(values[1]);
                return { rows: [], rowCount: 1 };
            }
            throw new Error("Unexpected PostgreSQL query: " + query);
        },
        async connect() {
            return { query: this.query.bind(this), release() {} };
        }
    };
    const postgresDataDir = await fs.mkdtemp(path.join(os.tmpdir(), "flousi-postgres-"));
    let postgresServer;

    try {
        postgresServer = await createServer({ dataDir: postgresDataDir, pool });
        await new Promise(resolve => postgresServer.listen(0, "127.0.0.1", resolve));
        let postgresBaseUrl = "http://127.0.0.1:" + postgresServer.address().port;
        const registration = await fetch(postgresBaseUrl + "/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "postgres@example.com",
                password: "correct-horse-battery",
                data: { transactions: [], budgets: {}, goals: [], budgetAlerts: [], dailyChallenges: [] }
            })
        });
        assert.equal(registration.status, 201);
        const account = await registration.json();
        const friendRegistration = await fetch(postgresBaseUrl + "/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "postgres-friend@example.com",
                password: "correct-horse-battery",
                data: { transactions: [], budgets: {}, goals: [], budgetAlerts: [], dailyChallenges: [] }
            })
        });
        const friend = await friendRegistration.json();
        const updatedData = {
            transactions: [],
            budgets: { "2026-10": 750 },
            goals: [],
            budgetAlerts: [],
            dailyChallenges: []
        };
        const write = await fetch(postgresBaseUrl + "/api/data", {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + account.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        });
        assert.equal(write.status, 200);
        const challengeResponse = await fetch(postgresBaseUrl + "/api/challenges", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + account.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: "Postgres savings",
                target: 200,
                currency: "EUR",
                deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
                name: "Alex"
            })
        });
        assert.equal(challengeResponse.status, 201);
        const challenge = (await challengeResponse.json()).challenge;
        const friendJoin = await fetch(postgresBaseUrl + "/api/challenges/" + challenge.id + "/join", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + friend.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: "Sam" })
        });
        assert.equal(friendJoin.status, 200);
        const friendProgress = await fetch(postgresBaseUrl + "/api/challenges/" + challenge.id + "/progress", {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + friend.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ progress: 25 })
        });
        assert.equal(friendProgress.status, 200);
        await new Promise((resolve, reject) => postgresServer.close(error => error ? reject(error) : resolve()));

        postgresServer = await createServer({ dataDir: postgresDataDir, pool });
        await new Promise(resolve => postgresServer.listen(0, "127.0.0.1", resolve));
        postgresBaseUrl = "http://127.0.0.1:" + postgresServer.address().port;
        const read = await fetch(postgresBaseUrl + "/api/data", {
            headers: { Authorization: "Bearer " + account.token }
        });
        assert.equal(read.status, 200);
        assert.deepEqual((await read.json()).data, updatedData);
        const challengeRead = await fetch(postgresBaseUrl + "/api/challenges", {
            headers: { Authorization: "Bearer " + account.token }
        });
        assert.equal(challengeRead.status, 200);
        const persistedChallenge = (await challengeRead.json()).challenges[0];
        assert.equal(persistedChallenge.currency, "EUR");
        assert.deepEqual(persistedChallenge.participants.map(participant => participant.progress), [0, 25]);
    } finally {
        if (postgresServer && postgresServer.listening) {
            await new Promise((resolve, reject) => postgresServer.close(error => error ? reject(error) : resolve()));
        }
        await fs.rm(postgresDataDir, { recursive: true, force: true });
    }
});
