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
  <img src="https://img.shields.io/badge/last_updated-2026--08--04-6b7280" alt="last updated 2026-08-04">
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
| **Tenant** | `algsochgmail.onmicrosoft.com` (Azure for Students) |
| **Tenant ID** | `89de3b75-fef2-44f9-90a4-cf8c69700c83` |
| **Admin account** | `algsoch@gmail.com` (Global Administrator) |
| **Test user** | `vicky@algsochgmail.onmicrosoft.com` |
| **Sign-in methods** | Interactive OAuth (keychain) · non-interactive `az` admin token (1h) |
| **Coral app client ID** | `4eedabf0-b27e-4c98-ac7b-4c7f5d504bee` |
| **License state** | No M365 license — identity endpoints work, file/Teams/license-gated endpoints return structured errors |

---

## 📊 Reports

> **Frozen** once committed — new testing → new dated file, never modify existing ones.
> Every report has a matching `.md` (raw) and `.html` (responsive) version.

### 🆕 2026-08-04 — Spec-bug audit: 248 fixable, 30 not fixable in spec

| | |
|---|---|
| **Date** | 2026-08-04 |
| **Tables tested** | 733 (full battery, keychain OAuth token) |
| **Spec-fixable bugs** | 248 (wrong audience, not found, wrong URL, deprecated, missing params) |
| **Not fixable in spec** | 30 (Graph server errors, transient outages, missing licenses) |
| **Currently passing** | 109 (keychain OAuth, 36 scopes) |

Classifies every failing table into what Coral can fix in the manifest vs what it cannot. Ordered by impact: Tier 1 (remove 131 consumer-only tables) through Tier 6 (reclassify misclassified errors). Ready to share with Andrea for upstream manifest fixes.

- **[Markdown](reports/2026-08-04-spec-bug-tables.md)** · **[HTML](reports/2026-08-04-spec-bug-tables.html)** — full table lists per bug class, fix recommendations, summary dashboard.

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

### 2026-07-14 — Microsoft Graph v4 connector: no-license test battery

| | |
|---|---|
| **Date** | 2026-07-14 (UTC) · 14:32 BST |
| **Time taken** | ~3h 40m |
| **Commands run** | 39 |
| **Output lines** | 612 |
| **Status** | ✅ Complete |

- **[Markdown](reports/2026-07-14-msgraph-connector-test-report.md)** · **[HTML](reports/2026-07-14-msgraph-connector-test-report.html)** — install, OAuth, materialization, query ergonomics, error UX, performance, catalog search findings.
- **[Markdown](reports/2026-07-14-full-command-output-log.md)** · **[HTML](reports/2026-07-14-full-command-output-log.html)** — every coral command run verbatim with actual output and exit code.
- **[Markdown](reports/2026-07-14-directory-data-test-log.md)** · **[HTML](reports/2026-07-14-directory-data-test-log.html)** — real-data testing without M365 license: 18 users + 2 groups queried through the connector.

---

## 🧪 Test environment

- **Coral CLI** `0.5.2+cf744bd` (Jul 14) → `0.8.1+3acb123` (Jul 29) — macOS + Linux (Ubuntu droplet)
- **Microsoft Entra** test tenant (Azure for Students), delegated OAuth, admin-consented
- **No M365 license** — identity queries work; file/Teams/license-gated endpoints return structured 400/403 errors (no timeouts)

---

## 📐 Reporting rules (enforced)

- Responsive HTML renders + matching `.md` source for every report
- **No fake data, no placeholders** — every value from a real run
- **Frozen reports** — never modify existing reports; new testing → new file
- **Author:** `Vicky Kumar <algsoch@gmail.com>` — no AI/Claude co-author trailer

---

<p align="center"><sub>Public on GitHub · maintained by <a href="https://github.com/FiscalMindset">Vicky Kumar</a> · last updated 2026-08-04</sub></p>
