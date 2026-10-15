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

test("health endpoint is available for deployment checks", async () => {
    const response = await fetch(baseUrl + "/api/health");
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok" });
});

test("PostgreSQL-backed accounts keep data across server restarts", async () => {
    const postgresUsers = new Map();
    const pool = {
        async query(query, values = []) {
            if (query.includes("CREATE TABLE IF NOT EXISTS flousi_users")) {
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
            throw new Error("Unexpected PostgreSQL query: " + query);
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
        await new Promise((resolve, reject) => postgresServer.close(error => error ? reject(error) : resolve()));

        postgresServer = await createServer({ dataDir: postgresDataDir, pool });
        await new Promise(resolve => postgresServer.listen(0, "127.0.0.1", resolve));
        postgresBaseUrl = "http://127.0.0.1:" + postgresServer.address().port;
        const read = await fetch(postgresBaseUrl + "/api/data", {
            headers: { Authorization: "Bearer " + account.token }
        });
        assert.equal(read.status, 200);
        assert.deepEqual((await read.json()).data, updatedData);
    } finally {
        if (postgresServer && postgresServer.listening) {
            await new Promise((resolve, reject) => postgresServer.close(error => error ? reject(error) : resolve()));
        }
        await fs.rm(postgresDataDir, { recursive: true, force: true });
    }
});
