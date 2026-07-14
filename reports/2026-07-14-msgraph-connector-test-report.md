# Coral `microsoft_graph_v4` Connector — Test Report

**Tester:** Vicky Kumar (FiscalMindset) · **Date:** 2026-07-14
**Setup:** coral 0.5.2+cf744bd (built from main) on macOS · own Entra tenant (`algsochgmail.onmicrosoft.com`), Global Admin consent granted · signed in as a native test user via interactive OAuth (keychain refresh token)
**Tenant constraint:** no M365 license yet — file/SharePoint/Teams *data* queries can't return rows, but this made license/scope error behavior a first-class test dimension.

## What works ✅

- **Install & OAuth:** interactive flow clean; token exchange ~18s; secrets stored in keychain; `coral source test` passes.
- **Materialization:** 732 tables / 6,005 columns generated from the 38MB Graph OpenAPI spec.
- **Single-object ("get") tables are properly flattened:** `SELECT displayname, userprincipalname FROM me_user_me_user_getuser` returns a correct row.
- **Unknown table/column errors are excellent:** they list valid column names, fully qualified.
- **API errors are transparent:** Graph's real error JSON + the underlying `[GET] https://graph.microsoft.com/...` URL are shown. Scope errors (403 Authorization_RequestDenied) and license errors ("Tenant does not have a SPO license", "Ensure user has a valid Office365 license") come through clearly enough to self-diagnose.

## Findings 🔍

### 1. List tables expose the raw OData envelope, not rows (biggest ergonomics issue)
`SELECT displayname FROM users_user_users_user_listuser` fails — list tables' columns are `value` (JSON blob), `odata_nextlink`, `count`, `filter`, `search`, `top`. Get-tables are flattened; list-tables are not. Users must know to select `value` and unnest JSON themselves. Nothing in the table guide explains this.
**Suggestion:** flatten `value` into rows (ideal), or at minimum make guides show a working "get rows out" query.

### 2. Table guides are too thin to be actionable
Guide for list-users is just: *"Works without WHERE filters. Most useful optional filters: count, filter, search."* It doesn't mention the envelope shape, required unnesting, or the permission needed. With 732 tables, the guide is the only realistic navigation aid.

### 3. `count(*)` bypasses column validation and produces a bare 403
`SELECT count(*) FROM <list table>` skips the local column check (unlike `SELECT displayname`, which errors locally) and hits the API, failing with 403. Same query shape, two different error layers — confusing.

### 4. Misleading hint on license errors
The 400 "Tenant does not have a SPO license" error carries the hint *"Adjust the query filters or shape to match the target table's supported filters"* — a query-shape hint for a licensing problem. Hint selection appears keyed to status code, not error content.

### 5. ~8–11s wall-clock for every CLI query, even trivial ones
`SELECT displayname FROM me_user_me_user_getuser` = one Graph GET, but takes 8–11s per invocation, consistently (measured 3 consecutive runs: 9.9s, 9.9s, 11.1s). Looks like per-invocation engine/catalog startup + token handling dominates. Fine for agents holding a session; painful for interactive CLI use.

### 6. `coral search` relevance is poor on this source
- `coral search "sharepoint files"` → top results are **rclone.files** and **github.files** (other sources), then an obscure `...sharepointgroups_getmembers` function. `me_drive`/`drives`/`sites` tables don't surface.
- `coral search "teams chat messages"` → deep-nested `...replies_gethostedcontents` functions rank above `me_listchats` / `chats_getallmessages`.
With 732 machine-generated table names, search is the primary discovery path — long token-dense names of obscure endpoints out-rank the tables people actually want.

### 7. Onboarding walls (previously reported, retested)
- Education tenants: "Need admin approval" — reproduced on 2 universities; domain verification did **not** change it; verified-publisher status is the likely fix.
- Personal Microsoft accounts: `unauthorized_client` (app not enabled for consumers).

### 8. `source add` robustness (previously reported)
- A stale/invalid source in the workspace blocks adding *unrelated* sources; error doesn't name the offender.
- A registered source with a missing directory → bare "No such file or directory (os error 2)", no source/path named.
- Failed `source add` leaves a partial source dir that breaks all retries until manually removed.
- Released 0.4.x cannot add this connector (16MB descriptor limit vs 38MB spec; main is 64MB).

## Not yet tested (needs M365 license + seeded data)
Real row data through the envelope (`value` unnesting), pagination via `odata_nextlink`, table functions with required IDs (chat messages, drive items), large file listings, filter pushdown correctness, join ergonomics across real datasets. Planned next: activate M365 Business Basic trial, seed SharePoint files + Teams chats, rerun the battery.
