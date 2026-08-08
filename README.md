<div align="center">
  <a href="https://github.com/FiscalMindset"><img src="https://github.com/FiscalMindset.png?size=100" width="100" height="100" alt="Vicky Kumar avatar" style="border-radius:50%"></a>
  <h1>🐠 Coral Specs Testing</h1>
  <p><strong>Real-world testing of <a href="https://github.com/withcoral/coral">Coral</a> <code>microsoft_graph_v4</code> source connector</strong></p>
  <p>by <a href="https://github.com/FiscalMindset">Vicky Kumar (@FiscalMindset)</a></p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/tables-733-22c55e" alt="733 tables">
  <img src="https://img.shields.io/badge/table_funcs-5,776-3b82f6" alt="5776 table funcs">
  <img src="https://img.shields.io/badge/identity_tests-6/6_PASS-22c55e" alt="6/6 PASS">
  <img src="https://img.shields.io/badge/timeouts-0_(resolved)-22c55e" alt="0 timeouts (resolved)">
  <img src="https://img.shields.io/badge/reports_frozen-✓-8b5cf6" alt="reports frozen">
  <img src="https://img.shields.io/badge/last_updated-2026--08--07-6b7280" alt="last updated 2026-08-07">
</p>

---

## 👤 About the tester

| | |
|---|---|
| **Name** | Vicky Kumar |
| **GitHub** | [@FiscalMindset](https://github.com/FiscalMindset) (commits also authored as `npdimagine`) |
| **Email** | `npdimagine@gmail.com` (personal) · `algsoch@gmail.com` (admin / Entra tenant) |
| **Project** | withcoral/coral — testing `microsoft_graph_v4` source connector (Microsoft Graph API via Coral) |
| **Reporting repo** | [FiscalMindset/coral_specs_testing](https://github.com/FiscalMindset/coral_specs_testing) (public) |
| **Contacts** | Matt Henderson (hired) · Andrea Ambu (engineer; receives reports) |

---

## 🔐 Microsoft account in use

| | |
|---|---|
| **Tenant** | `algsoch762.onmicrosoft.com` (Business Premium) |
| **Tenant ID** | `0aa3a51b-3716-44d7-9636-f85f3db072bf` |
| **Admin account** | `algsoch@gmail.com` (Global Administrator) |
| **Test user** | `vickykumar@algsoch762.onmicrosoft.com` |
| **Sign-in methods** | Interactive OAuth (keychain) · non-interactive `az` admin token (1h) |
| **Coral app client ID** | `4eedabf0-b27e-4c98-ac7b-4c7f5d504bee` |
| **License state** | O365_BUSINESS_PREMIUM (1 of 25 units, licensed 2026-08-04) — Teams/Chat/Drive/Site/license-gated tables unlocked |

---

## 📊 Reports

> **Frozen** once committed — new testing → new dated file, never modify existing ones.
> Most reports ship a `.md` (raw) and a responsive `.html`; a few early ones are `.md`-only (rendered by the hub).

### 🆕 2026-08-06 — Exhaustive SharePoint + Teams retest (v6): 48 probes, Teams spec gap proven

| | |
|---|---|
| **Date** | 2026-08-06 |
| **Probes** | 48 — every surface function probed against the live source |
| **Result** | 29 pass / 9 error / 7 not_found / 2 gated |

Every surface function probed against the live source: site → list → item → drive → drives-as-list walk with two seeded IDs; Teams surface proven **unexecutable-from-zero** (spec gap, not token gap). Findings:

- SP hierarchy fully walkable from 2 seeds (site triple + Code Snippets list id)
- Teams/chats/groups/filestorage unexecutable from zero — no listing roots, user rows expose no `id`
- Exactly one zero-arg function in the whole schema: `search_getsearchentity()` → 404
- `getByPath` variants → 400; `createdBy`/`lastModifiedBy` routes → 500 upstream
- OneDrive recent/search bridge into OneDrive; item getfields returns real field rows

- **[HTML](reports/2026-08-06-sharepoint-teams-coral-sql-data-report-v6.html)** — full 48-probe matrix with verbatim outputs (HTML-only report).

### 2026-08-06 — OAuth re-auth verification (v5.2): 3/3 scope 403s fixed

| | |
|---|---|
| **Date** | 2026-08-06 |
| **Commands** | 13 · 63 output lines |
| **Result** | 3/3 scope 403s fixed |

Re-adding the source via interactive OAuth fixed all 3/3 scope 403s. Calendar re-verifies to exactly 31 events and root site to exactly 27 lists (v5 numbers hold). getfields/id-gating findings re-confirmed.

- **[Markdown](reports/2026-08-06-sharepoint-teams-coral-sql-data-report-v5.2.md)** · **[HTML](reports/2026-08-06-sharepoint-teams-coral-sql-data-report-v5.2.html)** — full command log and re-verification results.

### 2026-08-06 — Catalog-level re-verification (v5.1)

| | |
|---|---|
| **Date** | 2026-08-06 |
| **Re-verifies** | v5 claims against the live catalog with a fresh Entra business token |

Proves the v5 user-lookup SQL is **NOT reproducible** (catalog exposes no `id` column on `getuserbyuserprincipalname`), the field-values limitation spans all 12 `getfields` variants, and `groupbyuniquename` exposes uniquename/organizationid but no `id`.

- **[Markdown](reports/2026-08-06-sharepoint-teams-coral-sql-data-report-v5.1.md)** · **[HTML](reports/2026-08-06-sharepoint-teams-coral-sql-data-report-v5.1.html)** — catalog-proof with verbatim query results.

### 2026-08-06 — SP + Teams DATA drill-down through Coral SQL (v5)

| | |
|---|---|
| **Date** | 2026-08-06 |
| **Data** | 27 lists · 956 items · 31 events · 5 teams · 24 channels · 147 messages |

Pure Coral SQL exercise — every count retrieved only via `SELECT` against the source (no curl/Graph). Proves the connector alone inventories tenant SharePoint + Teams data, with three documented limitations (field values, root user/group lists).

- **[Markdown](reports/2026-08-06-sharepoint-teams-coral-sql-data-report.md)** · **[HTML](reports/2026-08-06-sharepoint-teams-coral-sql-data-report.html)** — full SQL used and per-count verification.

### 2026-08-05 — SharePoint + Teams deep-data drill-down v4.5 (corrected triage): 0 Coral bugs

| | |
|---|---|
| **Date** | 2026-08-05 |
| **Calls** | 92 (15 deep-data battery + 77 top-level tables) |
| **Deep battery** | **14 pass (93.3%) / 1 error (6.7%)** — the single error is `getAllMessages` → 412 app-only |
| **Combined** | **35 pass / 23 auth / 3 bad_request / 18 not_found / 10 unsupported / 3 error** |
| **Triage** | **0 Coral bugs · 0 MS-spec bugs · 57 genuine Microsoft** — all 57 failures reproduced against live Graph |

v4.5 is the **corrected triage** of the canonical deep-data report: re-examination with the Microsoft Graph OpenAPI proved **0 of the 57 failing calls are Coral bugs**. Two v4.3-era suspicions retracted: the `GET /shares` 400 is a **phantom route** in MS's OpenAPI (the path has zero parameters — Coral faithfully forwards the filter; MS rejects it) and Teams `channel getChannel` **IS published** by Microsoft Graph, so the earlier "catalog gap" claim was wrong. Verified by the live re-run: `channels getChannel` returns real rows (`General`, membershipType=standard, created 2026-07-25) → **pass**.

- **[Markdown](reports/2026-08-05-sharepoint-teams-deep-data-report-v4.5.md)** · **[HTML](reports/2026-08-05-sharepoint-teams-deep-data-report-v4.5.html)** — corrected triage with the full 92-call log, per-area stats, and verbatim outputs for every failing call.

### 2026-08-05 — Deep-data drill-down v4.3 (frozen): superseded by v4.5

| | |
|---|---|
| **Date** | 2026-08-05 |
| **Calls** | 92 (15 deep-data battery + 77 top-level tables) |
| **Deep battery** | 13 pass / 2 error |
| **Status** | frozen — superseded by v4.5 |

Frozen v4.3 report — 92 calls, 13/15 deep-data pass. **Superseded by v4.5**, which retracted its two "Coral source bug" claims after live re-verification.

- **[Markdown](reports/2026-08-05-sharepoint-teams-deep-data-report-v4.3.md)** · **[HTML](reports/2026-08-05-sharepoint-teams-deep-data-report-v4.3.html)** — frozen original triage, kept for the record.

### 2026-08-05 — Auth-classified calls re-run: 0/23 pass (permanent, not transient)

| | |
|---|---|
| **Date** | 2026-08-05 (run 06:56–07:00 UTC) |
| **Token** | fresh valid 128-scope delegated token (iat 06:40:45Z · exp 08:02:10Z) |
| **Calls** | all 23 `auth`-classified from v4.3 + 2 storage container filter probes = 25 |
| **Result** | **0/23 pass** — all 23 still 403 (`accessDenied` / `UnknownError`) with a valid token; **0 transient flakes** |

Re-running every v4.3 `auth` failure with a freshly-validated token proved the `auth` bucket is **permanent MS-side blocking**, not expired-token noise: `sites/delta`/`getAllSites` + containerTypes/Registrations are app-only permissions (delegated can never pass), and the entire `solutions/backupRestore` surface (18 calls) 403s `UnknownError` because M365 Backup isn't provisioned in the tenant. T60/T63 reproduce their 400 exactly (coral forwards the `containerTypeId` filter verbatim; MS rejects empty/zero). Confirms the v4.3 triage (34/92 pass ceiling).

- **[Markdown](reports/2026-08-05-auth-rerun-confirmed.md)** · **[HTML](reports/2026-08-05-auth-rerun-confirmed.html)** — result matrix for all 25 calls, root-cause classification, verbatim outputs, what would make each pass.

### 2026-08-05 — Focused SharePoint/OneDrive + Teams battery: 77 tables, 0 timeouts

| | |
|---|---|
| **Date** | 2026-08-05 |
| **Tables** | 77 SharePoint + Teams tables from the catalog |
| **Result** | **15 pass** · 32 auth-gated · 15 not_found · 10 unsupported · 3 bad_request · 2 server-error |
| **Timeouts** | 0 |

77 SharePoint + Teams tables queried with real data commands (`SELECT * LIMIT 5`), every output captured verbatim.

- **[Markdown](reports/2026-08-05-sharepoint-teams-report.md)** · **[HTML](reports/2026-08-05-sharepoint-teams-report.html)** — per-table result matrix with verbatim outputs.

### 2026-08-05 — 95-scope union token re-test: pass 221 → 229, 8 predicted unlocks

| | |
|---|---|
| **Date** | 2026-08-05 |
| **Scopes** | 12 consentable scopes added to the union token |
| **Result** | **pass 221 → 229** · auth 213 → 197 |
| **Regressions** | 0 — all 221 prior passes stayed passes |
| **Invocations** | 886 automated `coral sql` calls, 0 timeouts |

Adding 12 consentable scopes unlocked exactly the **8 predicted tables**; 10 tables moved auth→bad_request (feature-gated APIs now return 400 instead of 403).

- **[Markdown](reports/2026-08-05-union-scope-test-report.md)** · **[HTML](reports/2026-08-05-union-scope-test-report.html)** — scope diff, unlock matrix, verbatim outputs.

### 2026-08-05 — Full-scope (az admin token) re-test: pass 70 → 146

| | |
|---|---|
| **Date** | 2026-08-05 |
| **Tenant** | `algsoch762.onmicrosoft.com` (Business Premium) |
| **Token** | az-minted admin token, 18 scopes (`Directory.AccessAsUser.All` + 17 more) |
| **Tables tested** | 733 (battery @ 3 workers/60s + serial clean of 44 trace-race tables) |
| **Passing** | **146** (was 70 with 9-scope token) |
| **Unlocked** | 87 tables (52 auth→pass, 29 error→pass, 6 bad_request→pass) |
| **Remaining errors** | 15 real (Edu-role 500s ×4, planner 405 ×2, storage URI spec bug ×2, Microsoft-side 500/503 ×7) |

Granting all scopes proves the previous run's blocker was the **token, not the license** — the exact live 403 repro `users_user_users_user_listuser` now returns real rows. Error count collapsed 155 → 15 (telemetry-trace race cleared + scope-resolved errors). Tradeoff: 10 chat/Teams/files/sites tables flipped pass→auth because the admin token lacks the OAuth chat/team/file scopes — the manifest should union both scope sets for a single consent covering everything.

- **[Markdown](reports/2026-08-05-licensed-allscope-test-report.md)** · **[HTML](reports/2026-08-05-licensed-allscope-test-report.html)** — bottom line, transition matrix, all 87 unlocks, 15 remaining errors, live verification, full 733-table searchable results.

### 2026-08-04 — Business Premium licensed-tenant test: 23 tables unlocked

| | |
|---|---|
| **Date** | 2026-08-04 |
| **Tenant** | `algsoch762.onmicrosoft.com` (Business Premium) |
| **Tables tested** | 733 (full battery + sweep, 0 timeouts) |
| **Passing** | 70 (vs 109 on unlicensed tenant) |
| **License unlocks** | 23 tables (10 license-blocked Teams/Chat/Drive/Site tables now pass) |

First battery run against a **licensed** tenant. The license unlocked 23 tables (Teams list, chats, drives, sites, joined teams, insights, outlook settings, planner, deleted teams); the raw pass count is lower because the new tenant uses the default 9-scope token vs the old 36-scope grant, so ~34 directory/policy tables regress to `auth` on scope, not license. License win is real but masked by the narrower token.

- **[Markdown](reports/2026-08-04-licensed-msgraph-test-report.md)** · **[HTML](reports/2026-08-04-licensed-msgraph-test-report.html)** — breakdown, transition matrix, all 23 unlocks, full 70-table pass list, re-run recommendation.

### 2026-08-04 — Spec-bug audit: 248 fixable, 30 not fixable in spec

| | |
|---|---|
| **Date** | 2026-08-04 |
| **Tables tested** | 733 (full battery, keychain OAuth token) |
| **Spec-fixable bugs** | 248 (wrong audience, not found, wrong URL, deprecated, missing params) |
| **Not fixable in spec** | 30 (Graph server errors, transient outages, missing licenses) |
| **Currently passing** | 109 (keychain OAuth, 36 scopes) |

Classifies every failing table into what Coral can fix in the manifest vs what it cannot. Ordered by impact: Tier 1 (remove 131 consumer-only tables) through Tier 6 (reclassify misclassified errors). Ready to share with Andrea for upstream manifest fixes.

- **[Markdown](reports/2026-08-04-spec-bug-tables.md)** · **[HTML](reports/2026-08-04-spec-bug-tables.html)** — full table lists per bug class, fix recommendations, summary dashboard.

### 2026-08-04 — Keychain OAuth run: 109 pass, 0 timeouts, 0 expired-token

| | |
|---|---|
| **Date** | 2026-08-04 |
| **Result** | **109 PASS / 733** — the honest reproducible number for a fresh Coral install |
| **Timeouts** | 0 (all 442 solved via 120s sweep) |
| **expired_token** | 0 (keychain auto-refresh worked end-to-end) |
| **`me_*` endpoints** | 18 → 35 vs the interim 12-scope az run |

Keychain OAuth flow proven end-to-end: token auto-refreshes, so expired-token (0/733) and timeout (0/733) failures are gone.

- **[Markdown](reports/2026-08-04-msgraph-reauth-test-report.md)** · **[HTML](reports/2026-08-04-msgraph-reauth-test-report.html)** — full 733-table run with transition analysis.

### 2026-08-02 — Coral contributor email exposure (public git commit metadata)

| | |
|---|---|
| **Date** | 2026-08-02 |
| **Method** | Coral MCP (`github.commits`) + GitHub REST API (`curl`, no auth) |
| **Repos** | `withcoral/coral` (origin) · `FiscalMindset/coral` (fork) · local clone |
| **Verdict** | ⚠️ EXPOSED — maintainer emails public via commit metadata on both repos (not a file leak) |

Investigated the contributor email question. Personal addresses (`james@withcoral.com`, `simonw@withcoral.com`, `saul@withcoral.com`, `ilia@phoebe.ai`, `james.audretsch@phoebe.ai`, `andrea@withcoral.com`, `james@phoebe.ai`) are retrievable by anyone via `GET /repos/{owner}/{repo}/git/commits/{full-sha}` on both origin and fork — commit objects are identical across a fork. Zero personal emails in repo files (only deliberate `security@` / `legal@` aliases). Fix: GitHub "Keep my email address private" → commit as `noreply`; history removal requires `git filter-repo` + force-push.

- **[Markdown](reports/2026-08-02-commit-email-exposure.md)** · **[HTML](reports/2026-08-02-commit-email-exposure.html)** — repo topology proof (fork flags), per-email commit counts, full-SHA API proof on both repos, file-scan results, verdict + solution suggestions.
- **Proof depth:** **12 commits / 7 identities curl-verified** on both origin and fork via `GET /repos/{owner}/{repo}/git/commits/{full-sha}` (no auth) — 14 requests, 0 failures, 0 mismatches; identical SHAs confirm forks copy the commit graph verbatim. Every proof commit is a **clickable link** on both repos (commit page + API JSON), and the report opens with a "What we found" table listing each exposed email with its commit count. **100% reproducible via Coral alone** — the report's "Reproduce everything with Coral" section (§4.9) ships the exact `coral_sql` commands with real captured outputs (total count `956`, the full 70-email `GROUP BY` scan, `regexp_match` SHA extraction, and the fork variant), no `git`/`curl` required.

### 2026-07-31 v2 — Full 733-table re-run: az-minted admin token + 4-layer retry strategy

| | |
|---|---|
| **Date** | 2026-07-31 |
| **Coral** | `0.8.1+3acb123` (homebrew) |
| **Tables tested** | **733 / 733** (100%) |
| **Auth** | az-minted admin token, **re-authed 2x mid-run** |
| **Retry sweeps** | 88 tables (30s, after main run) + 28 tables (120s, after 30s retry) |
| **Pass** | **129** (v1 same date: 122, Jul 29: 129) |
| **`expired_token` (final)** | **0** — solved via short-lived tokens + retry sweep |
| **Timeouts (final)** | **0** — all 28 resolved via 120s retry sweep |
| **Spec bugs** | 42/45 unchanged, 3 reclassified (none auto-fixed, all still broken) |
| **Status** | 🟢 COMPLETE — no connector regression |

**Key wins vs v1 (same date, earlier run):**
- **+7 more passes** — 15 tables recovered across two retry sweeps (13 from 30s + 2 from 120s)
- **0 final `expired_token`** — token-expiry problem solved via az short-lived tokens + mid-run re-auth + retry sweep
- **0 final timeouts** — all 28 cold-call-slow endpoints resolved via 120s retry sweep
- **3 spec-bug flips, all confirmed via 120s retry** — none became PASS, no auto-fixes

**3 spec-bug flips (none became PASS):**
| Table | v1 status | v2 status (final) | Why |
|---|---|---|---|
| `communications_onlinemeeting_communications_listonlinemeetings` | `needs_entityId` | `auth` (403) | Graph's error is non-deterministic between entityId gate and 403 |
| `identity_riskpreventioncontainer_identity_getriskprevention` | `wrong_url` | `wrong_url` (confirmed) | Was timeout-masked at 30s; 120s revealed 404 |
| `directoryobjects_directoryobject_functions_directoryobjects_delta` | `unsupported_query` | `unsupported_query` (confirmed) | Was timeout-masked at 30s; 120s revealed the error |

> v1 (`reports/2026-07-31-msgraph-reauth-test-report.md`) is **frozen** — different methodology (keychain OAuth, 47m, no retry sweep). v2 is the canonical "complete coverage" run. Same scope, same Coral version, same tenant, same delegated identity.

- **[Markdown](reports/2026-07-31-msgraph-reauth-test-report-v2.md)** · **[HTML](reports/2026-07-31-msgraph-reauth-test-report-v2.html)** — full 733-table az-token re-run: 4-layer retry strategy (az-minted token + mid-run re-auth + 30s retry sweep + 120s retry sweep), 4-day compare (Jul 29 + Jul 30 + Jul 31 v1 + v2), per-prefix pass table, command log, all 45 spec bugs with verbatim outputs, both retry sweeps with full outcome tables.

### 2026-07-31 v1 (frozen) — Full 733-table re-run: delegated keychain OAuth, 47m

| | |
|---|---|
| **Date** | 2026-07-31 |
| **Coral** | `0.8.1+3acb123` (homebrew) |
| **Tables tested** | **733 / 733** (100%) |
| **Pass (delegated)** | 122 |
| **expired_token failures** | **0** (Jul 29 re-run had 63) |
| **Timeouts (30s cutoff)** | 30 — all resolve on retry (2 PASS, rest structured 400/403/404) |
| **Spec bugs** | 45 genuine — all still unfixed |
| **App-only-only gap** | 20 of 30 now pass delegated |
| **Status** | 🟢 COMPLETE — no connector regression |

**Headline changes vs Jul 29 delegated:**
- `me_*` 26 → **36**, `identity_*` 0 → **7**, `security_*` 0 → **3**, `auditlogs_*` 0 → **3**, `devices_*` 0 → **2**, `applications_*` 0 → **2**
- `places_*` 4 → **0** — keychain token re-consented without `Place.Read.All` (token change, not a connector regression)
- All 45 genuine spec bugs from Jul 30 still reproduce (40/45 exact, 5 reclassified)
- **Recommendation:** re-run with 120s timeout to clear the 30-timeout bucket

- **[Markdown](reports/2026-07-31-msgraph-reauth-test-report.md)** · **[HTML](reports/2026-07-31-msgraph-reauth-test-report.html)** — full 733-table delegated re-run: status distribution, per-prefix passes vs Jul 29, spec-bug recheck (45), app-only-only recheck (30), timeout analysis, places regression, verdict.

### 2026-07-31 — Failure attribution: 604 failures, 338 Coral bugs (56%)

| | |
|---|---|
| **Date** | 2026-07-31 |
| **Failures classified** | 604 |
| **Coral bugs** | **338 (56.0%)** — fixable by Andrea |
| **Our issues** | 185 (30.6%) — scopes/license/consent |
| **Graph limits** | 24 (4.0%) · 8 expected (1.3%) · 49 possibly-Coral (8.1%) |

Every 733-table battery failure classified by root cause: 56% are Coral bugs fixable in the connector, 31% our setup issues, 4% Graph's fault, 1.3% expected, 8.1% ambiguous.

- **[Markdown](reports/2026-07-31-failure-attribution.md)** · **[HTML](reports/2026-07-31-failure-attribution.html)** — per-category classification, per-table attribution, fix recommendations.

### 2026-07-31 — Scope unlock test: 13 → 36 scopes via Graph PATCH

| | |
|---|---|
| **Date** | 2026-07-31 |
| **Method** | Graph API `oauth2PermissionGrants` PATCH |
| **Result** | 23 new scopes added (13→36) · **HTTP 204 No Content** |

Updated the OAuth2 admin grant for the Coral app from 13 to 36 scopes via Graph API PATCH.

- **[Markdown](reports/2026-07-31-scope-unlock-test.md)** — scope diff and PATCH proof.

### 2026-07-31 — How to consent to all 36 Coral app scopes

| | |
|---|---|
| **Date** | 2026-07-31 |
| **Type** | guide |

Step-by-step guide for acquiring a new OAuth token with the 36-scope admin grant: interactive re-add (recommended) or alternative tool paths.

- **[Markdown](reports/2026-07-31-oauth-consent-guide.md)** — full walkthrough with command examples.

### 2026-07-30 — 45 genuine Microsoft Graph spec bugs

| | |
|---|---|
| **Date** | 2026-07-30 |
| **Breakdown** | 13 wrong URL · 13 deprecated · 12 wrong audience · 4 needs entityId · 3 unsupported query |
| **Re-test** | 42/45 still reproduce (v2, 2026-07-31) |

45 tables with OpenAPI parser bugs. All would fail for any AAD tenant with any credentials — not a token or tenant issue.

- **[Markdown](reports/2026-07-30-msgraph-spec-bugs.md)** · **[HTML](reports/2026-07-30-msgraph-spec-bugs.html)** — per-bug table with full outputs.

### 2026-07-29 — Re-auth test: Coral 0.8.1 / surface-singular fix

| | |
|---|---|
| **Date** | 2026-07-29 |
| **Coral** | `0.8.1+3acb123` (homebrew) |
| **Tables** | 733 (+1 from 0.5.2) |
| **Table funcs** | 5,776 (+17 from 0.5.2) |
| **Identity PASS** | 6/6 |
| **License-gated** | 4/4 structured failures (400/403) |
| **Timeouts** | **0** (was 2 in 0.5.2 — improved!) |
| **Manifest fix** | `surfaces` → `surface` (#1791) |
| **Status** | 🟢 8 PASS · 🔴 4 FAIL |

**Passed:**
| Query | Result | Reason |
|-------|--------|--------|
| CLI basics (`--version`, `source list`, `source test`) | ✅ | All exit code 0 |
| Schema discovery (tables, columns, table funcs) | ✅ | 733 tables, 5,972 columns, 5,776 funcs |
| Me / User profile | ✅ | `displayName: "Vicky Test"` returned |
| List users | ✅ | 17 users returned (guest + 15 bulk + test user) |
| Organization / Tenant | ✅ | Tenant ID, type, quota all readable |
| Groups | ✅ | 2 security groups |
| Applications | ✅ | 3 apps including `coral` |
| Service Principals | ✅ | 3 SPs |
| Devices | ✅ | Empty list - no device registered |

**Failures:**
| Query | Status | Reason |
|-------|--------|--------|
| Drives (`listdrive`) | ❌ 400 | `"Tenant does not have a SPO license"` — no SharePoint license |
| Chats (`listchat`) | ❌ 403 | `"Failed to get license information for the user"` — no Teams license |
| Teams (`listteam`) | ❌ 403 | `"Failed to get license information for the user"` — no Teams license |
| Agreements (`listagreement`) | ❌ 403 | `"User does not have any of the required scopes: user_impersonation, Agreement.Read.All"` |
| Sign-in logs (`listsignins`) | ❌ 403 | `"Tenant is not a B2C tenant and doesn't have premium license"` — no Entra P1/P2 |

> **vs 0.5.2 improvement:** Agreements and Teams previously **timed out** after 15s. Now both return clean 403s with the specific reason — this is the `surface-singular` fix working. All 4 failures are **expected** (no M365 license, no premium license), and there are **0 timeouts** across the entire test (was 2 in 0.5.2).

- **[Markdown](reports/2026-07-29-msgraph-reauth-test-report.md)** · **[HTML](reports/2026-07-29-msgraph-reauth-test-report.html)** — full command & output log: CLI basics, schema discovery, identity queries, M365 license-gated, premium failures, feature-specific failures, table functions, error quality assessment, vs-0.5.2 diff.

### 2026-07-28 — API coverage with az CLI token: 117 pass / 616 fail

| | |
|---|---|
| **Date** | 2026-07-28 |
| **Method** | `SELECT * LIMIT 1` on all 733 registered tables (az CLI token, 4 workers, 60s) |
| **Result** | **117 PASS / 616 FAIL** (16% pass rate) |
| **Breakdown** | 192× 403 Forbidden · 181× 400 BadRequest · 148× 401 Unauthorized · 83× Table Not Found · 12× other |

- **[Markdown](reports/2026-07-28-az-token-coverage-report.md)** · **[HTML](reports/2026-07-28-az-token-coverage-report.html)** — full per-table results with HTTP status breakdown.

### 2026-07-14 — Microsoft Graph v4 connector: no-license test battery

| | |
|---|---|
| **Date** | 2026-07-14 (UTC) · 14:32 BST |
| **Time taken** | ~3h 40m |
| **Commands run** | 39 |
| **Output lines** | 612 |
| **Status** | ✅ Complete |

- **[Markdown](reports/2026-07-14-msgraph-connector-test-report.md)** — install, OAuth, materialization, query ergonomics, error UX, performance, catalog search findings.
- **[Markdown](reports/2026-07-14-full-command-output-log.md)** — every coral command run verbatim with actual output and exit code.
- **[Markdown](reports/2026-07-14-directory-data-test-log.md)** — real-data testing without M365 license: 18 users + 2 groups queried through the connector.

---

## 🧪 Test environment

- **Coral CLI** `0.5.2+cf744bd` (Jul 14) → `0.8.1+3acb123` (Jul 29) — macOS + Linux (Ubuntu droplet)
- **Microsoft Entra** test tenant (Business Premium), delegated OAuth, admin-consented
- **License** — O365_BUSINESS_PREMIUM (1 of 25 units, licensed 2026-08-04); identity queries work and file/Teams/license-gated endpoints return structured 400/403 errors (no timeouts)

---

## 📐 Reporting rules (enforced)

- Responsive HTML renders + matching `.md` source for every report
- **No fake data, no placeholders** — every value from a real run
- **Frozen reports** — never modify existing reports; new testing → new file
- **Author:** `Vicky Kumar <algsoch@gmail.com>` — no AI/Claude co-author trailer

---

<p align="center"><sub>Public on GitHub · maintained by <a href="https://github.com/FiscalMindset">Vicky Kumar</a> · last updated 2026-08-07</sub></p>
