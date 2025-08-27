# First App — End‑to‑End Setup (ABAI / MaxTrax3)

This guide gets you from zero to a running **API + App + Databases** and a working **Home** page with five components wired to a `defects1` data source.

> Assumptions: Windows host with IIS available, SQL Server (2019+), .NET 8 SDK, Node 20+, Git, and VS Code. Frontend is **vanilla JS (TS‑convertible)** with hash routing. API is **.NET 8 Web API** (SQL‑agnostic adapter, using SQL Server to start).

---

## 0) Prereqs & Baseline
- **Upload the latest working solution zip** you have so we don’t overwrite prior work. (We’ll merge into it.)
- Install: .NET 8 SDK, Node 20+, SQL Server, and Azure Data Studio or SSMS.
- Create a Windows user or service identity that can read from `C:\inetpub\wwwroot\abai\prod` and access SQL.
- Pick your root folder (example): `C:\Projects\ABAI_FirstApp`.

Directory layout after this guide:

```
/ABAI_FirstApp
  /api/MaxTrax3_API           <-- .NET 8 Web API
  /app                        <-- Vite + Vanilla JS PWA
  /sql/main                   <-- NCG “main” DB scripts
  /sql/client                 <-- Client DB scripts
  /docs/first-app.md          <-- this file
```

---

## 1) Setup the **Main Database** (NCG control / multi‑tenant)
1. Create DB: `NCG_Main`.
2. Run `sql/main/001_main_schema.sql` then `002_seed.sql`.
3. Note the **Control** tables contain tenants, environment sources, and licensing.

**Connection string example (for API `appsettings.json`):**
```
"ConnectionStrings": {
  "MainDb": "Server=YOURSERVER;Database=NCG_Main;User Id=ncg_app;Password=***;TrustServerCertificate=True;"
}
```

---

## 2) Build the **API** codebase
1. Open `api/MaxTrax3_API` in VS Code: `dotnet restore && dotnet build`.
2. Set `ASPNETCORE_ENVIRONMENT=Development` and update `appsettings.Development.json` with your connection strings.
3. Run migrations (manual in early phase: just run the SQL scripts), then `dotnet run`.
4. Verify endpoints:
   - `GET /health` → `200 OK`
   - `GET /api/defects` → empty or seeded list
   - `GET /api/defects/counts` → `{ total, withGeo }`

**Key notes**
- Passwords use **BCrypt**.
- DB adapters are pluggable; we start with SQL Server via Dapper.
- CORS allows `http://localhost:5173` by default.

---

## 3) Build the **App** codebase
1. From `/app`: `npm install` then `npm run dev` (Vite).
2. Open `http://localhost:5173/#/home`.
3. Confirm the five components render (Indicator, Filter, Grid, Map, Form). They call the API at `http://localhost:5240` (or whatever your API port is). Configure in `/app/src/config.js`.

---

## 4) Setup the **Client Database**
1. Create DB: `Client_WMATA` (or your client name).
2. Run `sql/client/101_client_schema.sql` then `102_seed.sql`.
3. Add a `Source` row in **NCG_Main** Control table pointing to this client DB. This powers **dynamic source switching**.

---

## 5) Configure the **Home** page
- `/#/home` declares a page‑level data source `defects1`:
  - Server: `SELECT defect_id, status, priority, problem, [date], lat, lng FROM dbo.Defects ORDER BY [date] DESC`
  - Client cache: IndexedDB collection `defects`
- Components:
  1. **Indicator** — shows `{{records.count}} Defects`.
  2. **Filter** — Status, Priority, Problem (emits `filter:changed` events).
  3. **Grid** — Columns: **Actions | Status | Priority | Problem | Date** (includes a conditional map “pointer” icon when `lat/lng` present).
  4. **Map** — Centers on selected record; fits markers for filtered set.
  5. **Form** — View/Edit/Add a defect.

Routing, page composition, and data source are declared in `/app/src/app.js` and component configs under `/app/src/components/...`.

---

## 6) Deploy a **Prod** build into IIS
1. `npm run build` in `/app`; copy `dist/**` into `C:\inetpub\wwwroot\abai\prod`.
2. Set API base URL in `/app/public/config.prod.json` before build or via server‑side rewrite to `/config.json`.
3. Ensure SW caching is on; test offline for cached routes.

---

## 7) Operations
- **Logs**: API uses console + rolling file; App logs to `localStorage` (dev) and SW postMessage (prod).
- **Backup**: schedule daily backups for both DBs; capture API `appsettings` in Secrets Vault.
- **Monitoring**: add `/health` endpoint to a heartbeat monitor.

---

## Decisions to Confirm (you can just edit these lines)
- Default tenant and first client name: **WMATA** (change if needed).
- API port: **5240** (change if dotnet picks another).
- Map provider: **Leaflet + OSM** (can swap later).

---

## Next
- Upload your current code zip and we’ll **merge** this starter into it.
- When ready, we’ll add auth UI + feature flags + SW update prompts.
