# Changelog

All notable changes to the Coral Specs Testing hub (the static report hub at `frontend/` + the smoke-test suite at `frontend/test/smoke.js`). Report content in `reports/` is dated and frozen per the [reporting rules](README.md#-reporting-rules-enforced) — this changelog tracks the **hub itself**, not the reports.

The format is [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.2] — 2026-08-10

### Added
- **New report** `2026-08-10-search-planner-comms-surfaces-retest.{md,html}` — targeted retest of yesterday's 21 failures. **3 of 21 now pass** via the function form:
  - `groups_plannergroup_groups_planner_listplans(group_id)` → 200 OK empty for all 5 tenant teams (algsoch / Q3 FY26 Sales Ops / CS IIT Delhi / Product Eng Mobile / Engineering FiscalMindset). Revises F-new-1.
  - `users_presence_users_getpresence(user_id => '55bcc9a0-...')` → `availability=Offline activity=Offline` real data. Turns the `listpresences` 404 into a PASS via the function form.
- 18 of 21 reproduce unchanged — confirmed Graph-side scope/ACS/licence/bugs:
  - 5× Search 403 — unchanged (needs `Search.Read.All` which the Coral manifest OAuth flow doesn't request).
  - 3× Education 403 — unchanged (needs `Edu.*` in OAuth scope).
  - 4× Communications scope 403 (onlineMeetings, callRecords, etc.) — unchanged.
  - 1× Calls ACS "Application is not registered in our store" — reproduced via `getcalls(call_id)` function form (whole-surface, not per-endpoint).
  - 1× `onlineMeetingConversations` HTML 400 Graph bug — also reproduced via function form.
  - 1× `listadhoccalls` 404 — also reproduced via `getadhoccalls(id)` function form.
  - 1× `auditLogs/signIns` 403 P1+P2 premium licence — unchanged.
  - 1× F7 400 filter mandatory — unchanged (regression-clean).
  - 1× catalog drift (`sites_baseitem_sites_listitems`) — unchanged.

### Single highest-leverage action (added to recommendations)
Add the 119 unscoped Graph permissions (Search.Read.All, OnlineMeetings.Read.All, EduRoster.Read.All, etc.) to the Coral manifest's OAuth scope list. With the AllPrincipals grant already having 128 scopes, this one-line manifest change unlocks 8 of 21 failures on re-consent — the AllPrincipals grant allows 128 scopes but the OAuth-requested-scope list currently constrains `scp` claim to 9.

### Changed
- Updated yesterday's report headline to acknowledge function-form fixes in next-day retest.

## [1.0.1] — 2026-08-09

### Added
- **New report** `2026-08-09-search-planner-comms-surfaces-walk.{md,html}` — 40-probe walk of 4 Microsoft Graph surfaces that v8 did not cover: Search (5 probes), Planner (4), Communications (9), Education (6), plus regression + tenant inventory (16). 19 pass / 21 fail.
  - **Search**: all 5 fail — 1× 404 zero-arg regression confirmed (`search_searchentity_getsearchentity` unchanged from v6), 4× 403 (`Search.Read.All` missing).
  - **Planner**: 2 pass empty + 2 fail 400 — the 2 failures are Coral-side: `planner_plannerplan_planner_listplans` and `planner_plannertask_planner_listtasks` are no-arg tables but Graph demands `$filter` (F-new-1).
  - **Communications**: 2 pass empty + 7 fail — 3× scope (`OnlineMeetings.Read.All`, `CallRecords.Read.All`, `Presence.Read.All`), 1× ACS-not-registered with distinctive `"Application is not registered in our store"` body (F-new-3), 1× 404 `adhocCalls`, 1× 400 with HTML body from `onlineMeetingConversations` (F-new-2), 1× 404 `communications/presences`.
  - **Education**: 0/6 pass — 5× scope (`Edu.*`) + 1× 500 `HostNotFound "Target 'fake_node' is not found"` on `/education/reports` (Graph internal routing bug).
  - **Regression checks**: F7 (`drives_driveitem_drives_listitems` filter) holds (F-new-5); `sites_baseitem_sites_listitems` is now a function in current catalog, v6 finding stale (F-new-4).
  - **Tenant inventory reconfirms v8**: 16 users, 50 groups, 3 drives, 2 chats, 2 sites, n apps, Coral SP by appId — same keychain OAuth that fails on 4 new surfaces works on all established ones.
- Registry updated (`frontend/js/data.js`): new entry at the top with status `latest`; v8 changed to `superseded`; passSeries extended with today's 19/40 point; smoke-test integrity block catches all changes.

### Recommendations added (to the report's Recommendations section)
1. Coral should expose `$filter` on the 2 failing Planner tables (F-new-1).
2. Coral's error wrapper should surface Graph's `code` field so consumers can route failures automatically (403 `UnknownError` → re-consent; 403 `Application is not registered` → notify admin; 400 HTML body → retry-with-backoff) (F-new-2, F-new-3).
3. Add `Search.Read.All` (or `External.Item.Read.All`) to the Coral app's delegated grant and re-consent to unblock the 4 Search list endpoints (F-new-6).

## [1.0.0] — 2026-08-08

First tagged release of the 8-page hub. Marks the transition from "ad-hoc reports in `reports/`" to "frozen report registry + derived dashboard + CI-gated deploy".

### Added
- **`frontend/` hub** — 8 static pages (overview, reports catalog, report detail, timeline, findings, guides, about, 404) with shared design system + dark/light toggle.
- **`frontend/js/data.js`** — single source of truth: `CORAL_REPORTS` registry (30 entries) and `CORAL_META` (tables/funcs/attribution/passSeries). All dashboard numbers are derived from these — nothing hardcoded in renderers.
- **`frontend/js/common.js`** — shared helpers (`esc`, `fileLink`, `statLine`, `catLabel`) consumed by every page controller.
- **`frontend/test/smoke.js`** — headless render + integrity suite (40+ checks): render sanity per page, registry integrity (unique ids, exactly one `latest`, `REPORTS[0]` is latest, every `r.md`/`r.html` on disk, stats buckets ≤ `total` and complete sets sum to total, attribution sums to 604, passSeries in-bounds), link resolution, static-asset presence.
- **CI** — `.github/workflows/pr.yml` (PR checks) + `.github/workflows/pages.yml` (Pages deploy gated on `npm test`); Dependabot for npm + GitHub Actions.
- **`package.json`** — `npm test` script and Node 18+ engine pin.
- **README** — `## 🏃 Running this hub` section (install, run tests, preview locally, architecture, script-tag order).
- **CHANGELOG.md** — this file.

### Schema rules for `CORAL_REPORTS` entries

Required (runtime `data.js` will throw at load if missing):

- `id` — string, unique across the registry, used as `?id=` query param by `report.html`
- `date` — string, `YYYY-MM-DD`
- `title` — string
- `category` — string (used to populate the reports-page filter)
- `status` — one of `latest` | `addendum` | `superseded` | `canonical` | `guide`
- `md` — string, repo-relative path to the `.md` (or `.html` for HTML-only reports)
- `html` — string, repo-relative path to the `.html` (or `.md` for md-only reports)
- `stats.total` — number, sum of the per-bucket stats (`pass`/`error`/`not_found`/`gated`/`catalog`) when all are numeric; otherwise must be ≥ the sum of any numeric subset

Optional: `short`, `headline`, `findings` (array of strings), `tags` (array of strings), `addendum` (id of an addendum entry).

### Security note

The repo is public and intentionally documents the test tenant (`algsoch762.onmicrosoft.com`), the Coral app client ID, and the admin email in `README.md` — these are required for full reproduction of the test runs (Andrea and Matt need them to re-execute the batteries). Real secrets (`eyJ...` access tokens, Bearer strings, the test-user password) are **never** committed. See [`reports/2026-08-02-commit-email-exposure.md`](reports/2026-08-02-commit-email-exposure.md) for an investigation of email exposure via upstream maintainer commit metadata.

[1.0.0]: https://github.com/FiscalMindset/coral_specs_testing/releases/tag/v1.0.0
