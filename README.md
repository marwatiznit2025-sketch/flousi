# Flousi

Flousi is an Arabic/Darija budget planner for tracking transactions, monthly budgets, and savings goals. Guest data stays in the browser. An optional REST API lets account holders sync that data across devices.

Use the moon/sun button in the app header to switch between light and dark mode. The selected theme is saved in this browser.

Choose MAD, USD, EUR, GBP, CAD, SAR, or AED in **Settings → Currency** to change the currency shown by the app. This changes the displayed currency only; it does not convert saved amounts.

## Run locally

1. Install Node.js 18 or newer.
2. From this project directory, run `npm start`.
3. Open `http://127.0.0.1:3000`.

The API and web app are served from the same origin. By default, account data is stored in the ignored `data/` directory. Set `DATABASE_URL` to use PostgreSQL instead; the server creates its `flousi_users` table on startup.

### Deploy the app and API on Railway

Connect this project to Railway from its GitHub repository and deploy it. The included `railway.json` binds the server to Railway's public interface and checks `/api/health`; the app and API will use the same Railway URL. In the service's **Variables**, add:

- `DATABASE_URL`: the PostgreSQL connection string from your database provider.
- `FLOUSI_AUTH_SECRET`: a private random value of at least 32 bytes. Generate it locally and keep it secret.

Do not add these values to `index.html`, GitHub, or this README. Generate `FLOUSI_AUTH_SECRET` locally in PowerShell with:

```powershell
$bytes = New-Object byte[] 48
$rng = [Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
[Convert]::ToBase64String($bytes)
$rng.Dispose()
```

Copy the generated value directly into Railway's service variables, without saving it in the project. Leave `FLOUSI_ALLOWED_ORIGIN` unset when serving the frontend and API from the same Railway service. Railway provides `PORT`; do not hard-code it.

When `DATABASE_URL` is absent, the API continues to use the local JSON store. Existing JSON accounts are not automatically copied to PostgreSQL; keep the `data/` directory as a backup before switching storage.

### Move local browser data to Railway

Data saved under `file://` or another local site origin is isolated by the browser and does not automatically appear on Railway. Before changing origins, open the current app, continue as a guest, then go to **Settings → Export data** and save the JSON file. Open the deployed Railway URL and import that file from **Settings → Import and merge data**. For a new account, import first and then register; for an existing account, log in first and then import so the merged data syncs to PostgreSQL. Local records replace matching transaction/goal IDs, local monthly budgets replace the same month's budget, and alerts/challenges are combined without duplicates.

## REST API

All request and response bodies use JSON. Account routes return a bearer token; send it as `Authorization: Bearer <token>` to protected routes.

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create an account; accepts `{ "email", "password", "data" }`. The app sends the current guest data as `data`. Passwords must be at least 10 characters. |
| `POST` | `/api/auth/login` | Sign in with `{ "email", "password" }`. |
| `GET` | `/api/data` | Read the signed-in account's transactions, budgets, goals, and app data. |
| `PUT` | `/api/data` | Replace the signed-in account's app data with the submitted data document. |
| `GET` | `/api/health` | Check that the API is running and PostgreSQL is reachable. |

Account creation transfers the current browser's guest data into the new account. Signing into an existing account loads that account's data; guest data remains saved on the device and is restored when signing out. API errors use a JSON `error` message and a stable `code`.

## GitHub Pages and hosted APIs

GitHub Pages can host only the static web app, not the Node.js API. To use account sync with a separately hosted API:

1. Deploy the Node.js app to a host that can reach a PostgreSQL database.
2. Set `DATABASE_URL` to the private PostgreSQL connection string, `FLOUSI_AUTH_SECRET` to a secret of at least 32 bytes, and `FLOUSI_ALLOWED_ORIGIN` to the exact published site origin, such as `https://your-name.github.io`.
3. Configure the host to bind to `0.0.0.0` (for example, set `HOST=0.0.0.0`) and provide its `PORT`.
4. Set `window.FLOUSI_API_URL` in `index.html` to the API's HTTPS origin, for example `https://api.example.com`.
5. Publish the static site using **Settings → Pages → GitHub Actions**.

For same-origin hosting, leave `window.FLOUSI_API_URL` empty. Never put database credentials or the authentication secret in `index.html` or the static deployment. If `FLOUSI_AUTH_SECRET` is not set, the server stores a generated secret in `data/auth-secret`; that file must persist across restarts for existing tokens to remain valid.

## Security and storage notes

- Passwords are hashed with Node.js `scrypt`; API access tokens expire after 30 days.
- Keep the API behind HTTPS when exposed to the internet. PostgreSQL is used when `DATABASE_URL` is configured; otherwise, the JSON store is intended for a small single-server app, not a horizontally scaled production database.
- Local browser storage remains a cache and lets guests use the app without an account. The app reports when a server sync fails, keeps those changes on the device, and uploads them when the API is available again. If two devices edit the same account while offline, the most recently synced full data document replaces the earlier one.
