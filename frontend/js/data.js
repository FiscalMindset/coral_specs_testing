/* Coral Specs Testing — report registry (real data from committed reports).
   Every stat below is transcribed from the actual report files in /reports.
   Do not invent values; update only when a new report is committed. */
window.CORAL_REPORTS = [
  {
    id: "2026-08-08-sharepoint-teams-coral-sql-data-report-v7",
    date: "2026-08-08",
    title: "v6 recommendations re-verified + Teams deep walk (v7)",
    short: "29 probes · 16 pass / 10 error / 2 gated / 1 catalog fact",
    category: "sharepoint-teams",
    status: "latest",
    stats: { pass: 16, error: 10, gated: 2, catalog: 1, total: 29 },
    headline: "Teams unlocked from one user id (55bcc9a0-…): 5 teams → 24 channels → real messages → members → schedule → 63 installed apps. F7 FIXED (drives listitems filter now exposed); F2 PARTIALLY RESOLVED (users_team_users_listjoinedteams opens the surface). New: listtags 403 perm gap, me_getjoinedteams arg bug, Graph top/search option constraints, 410 on bogus channel id.",
    findings: [
      "F7 FIXED — drives_driveitem_drives_listitems now exposes filter optional arg → clean [] result",
      "F2 PARTIAL — users_team_users_listjoinedteams(user_id) walks 5 teams / 24 channels; me_getjoinedteams still mis-modeled",
      "F4/F5 persist — user rows carry no id column; site/drive createdByUser routes still 500 upstream",
      "F8 persists — sites_baseitem_sites_listitems still maps non-endpoint → 400; getByPath now requires site_id",
      "F11 — teams listtags → 403: app role set lacks TeamworkTag.Read (permission gap, needs consent update)",
      "F13/F14 — Graph option constraints: filter/search/top all rejected on listmessages/listinstalledapps (filter re-verified type-correct, still 400); bogus channel → 410 Gone",
      "F15 — connector drift: 6,038 table functions (+262 vs v6), 736 tables, still exactly one zero-arg function"
    ],
    md: "reports/2026-08-08-sharepoint-teams-coral-sql-data-report-v7.html",
    html: "reports/2026-08-08-sharepoint-teams-coral-sql-data-report-v7.html",
    tags: ["coral-sql", "sharepoint", "teams", "recheck", "deep-walk"]
  },
  {
    id: "2026-08-06-sharepoint-teams-coral-sql-data-report-v6",
    date: "2026-08-06",
    title: "Exhaustive SharePoint + Teams retest (v6)",
    short: "48 probes · 29 pass / 9 error / 7 not_found / 2 gated",
    category: "sharepoint-teams",
    status: "superseded",
    stats: { pass: 29, error: 9, not_found: 7, gated: 2, total: 48 },
    headline: "Every surface function probed against the live source: site → list → item → drive → drives-as-list walk with two seeded IDs; Teams surface proven unexecutable-from-zero (spec gap, not token gap).",
    findings: [
      "SP hierarchy fully walkable from 2 seeds (site triple + Code Snippets list id)",
      "Teams/chats/groups/filestorage unexecutable from zero — no listing roots, user rows expose no id",
      "Exactly one zero-arg function in the whole schema: search_getsearchentity() → 404",
      "getByPath variants → 400; createdBy/lastModifiedBy routes → 500 upstream",
      "OneDrive recent/search bridge into OneDrive; item getfields returns real field rows"
    ],
    md: "reports/2026-08-06-sharepoint-teams-coral-sql-data-report-v6.html",
    html: "reports/2026-08-06-sharepoint-teams-coral-sql-data-report-v6.html",
    tags: ["coral-sql", "sharepoint", "teams", "exhaustive"]
  },
  {
    id: "2026-08-06-sharepoint-teams-coral-sql-data-report-v5.2",
    date: "2026-08-06",
    title: "OAuth re-auth verification (v5.2)",
    short: "13 commands · 63 output lines · 3/3 403s fixed",
    category: "sharepoint-teams",
    status: "superseded",
    stats: { pass: null, error: null, not_found: null, gated: null, total: 13 },
    headline: "Re-adding the source via interactive OAuth fixed all 3/3 scope 403s. Calendar re-verifies to exactly 31 events and root site to exactly 27 lists (v5 numbers hold). getfields/id-gating findings re-confirmed.",
    findings: [
      "Interactive OAuth grants manifest scopes → previously-403 probes return data",
      "31 calendar events + 27 root lists re-verified exactly to v5",
      "12 getfields routes expose only odata_type+id; user/group lookups expose no id column"
    ],
    md: "reports/2026-08-06-sharepoint-teams-coral-sql-data-report-v5.2.md",
    html: "reports/2026-08-06-sharepoint-teams-coral-sql-data-report-v5.2.html",
    tags: ["coral-sql", "sharepoint", "teams", "oauth"]
  },
  {
    id: "2026-08-06-sharepoint-teams-coral-sql-data-report-v5.1",
    date: "2026-08-06",
    title: "Catalog-level re-verification (v5.1)",
    short: "v5 claims re-checked against live catalog",
    category: "sharepoint-teams",
    status: "superseded",
    stats: { pass: null, error: null, not_found: null, gated: null, total: null },
    headline: "Re-verifies v5 against the live catalog with a fresh Entra business token. Proves the v5 user-lookup SQL is NOT reproducible (no id column), the field-values limitation spans all 12 getfields variants, and group-by-uniqueName hides id.",
    findings: [
      "v5 user-lookup SQL not reproducible — catalog exposes NO id column on getuserbyuserprincipalname",
      "Field-values limitation proven across all 12 getfields variants",
      "groupbyuniquename exposes uniquename/organizationid but no id column"
    ],
    md: "reports/2026-08-06-sharepoint-teams-coral-sql-data-report-v5.1.md",
    html: "reports/2026-08-06-sharepoint-teams-coral-sql-data-report-v5.1.html",
    tags: ["coral-sql", "sharepoint", "teams", "catalog"]
  },
  {
    id: "2026-08-06-sharepoint-teams-coral-sql-data-report",
    date: "2026-08-06",
    title: "SP + Teams DATA drill-down through Coral SQL (v5)",
    short: "27 lists · 956 items · 31 events · 5 teams · 24 channels · 147 messages",
    category: "sharepoint-teams",
    status: "superseded",
    stats: { pass: null, error: null, not_found: null, gated: null, total: null },
    headline: "Pure Coral SQL exercise — every count retrieved only via SELECT against the source (no curl/Graph). Proves the connector alone inventories tenant SharePoint + Teams data, with three documented limitations.",
    findings: [
      "27 SharePoint lists on root site",
      "956 list items summed across all 27 lists",
      "31 calendar events (next 30 days)",
      "5 teams / 24 channels / 147 messages inventoried",
      "3 documented limitations: field values, root user/group lists"
    ],
    md: "reports/2026-08-06-sharepoint-teams-coral-sql-data-report.md",
    html: "reports/2026-08-06-sharepoint-teams-coral-sql-data-report.html",
    tags: ["coral-sql", "sharepoint", "teams", "data"]
  },
  {
    id: "2026-08-05-sharepoint-teams-deep-data-report-v4.5",
    date: "2026-08-05",
    title: "Deep-data drill-down v4.5 (corrected triage)",
    short: "92 calls · 14/15 deep pass · 0 Coral bugs",
    category: "sharepoint-teams",
    status: "canonical",
    stats: { pass: 35, error: 3, not_found: 18, gated: 0, total: 92 },
    headline: "Corrected triage of the canonical deep-data report: with the Microsoft Graph OpenAPI in hand, 0 of the 57 failing calls are Coral bugs. 2 v4.3-era suspicions retracted (phantom /shares route; teams getChannel IS published).",
    findings: [
      "0 Coral bugs · 0 MS-spec bugs · 57 genuine Microsoft failures",
      "teams getChannel re-verified PASSING with real General channel row",
      "GET /shares is a phantom route in Microsoft's own OpenAPI (zero path params)",
      "Deep battery: 14 pass (93.3%) / 1 error (getAllMessages → 412 app-only)"
    ],
    md: "reports/2026-08-05-sharepoint-teams-deep-data-report-v4.5.md",
    html: "reports/2026-08-05-sharepoint-teams-deep-data-report-v4.5.html",
    tags: ["sharepoint", "teams", "triage", "graph-openapi"]
  },
  {
    id: "2026-08-05-sharepoint-teams-deep-data-report-v4.3",
    date: "2026-08-05",
    title: "Deep-data drill-down v4.3",
    short: "92 calls · 13/15 deep pass",
    category: "sharepoint-teams",
    status: "superseded",
    stats: { pass: 34, error: 3, not_found: 18, gated: 0, total: 92 },
    headline: "Frozen v4.3 report — 92 calls, 13/15 deep-data pass. Superseded by v4.5 which retracted its two 'Coral source bug' claims after live re-verification.",
    findings: [],
    md: "reports/2026-08-05-sharepoint-teams-deep-data-report-v4.3.md",
    html: "reports/2026-08-05-sharepoint-teams-deep-data-report-v4.3.html",
    tags: ["sharepoint", "teams", "deep-data"]
  },
  {
    id: "2026-08-05-sharepoint-teams-deep-data-report-v4",
    date: "2026-08-05",
    title: "Deep-data drill-down v4",
    short: "92 calls · 128-scope token",
    category: "sharepoint-teams",
    status: "superseded",
    stats: { pass: null, error: null, not_found: null, gated: null, total: 92 },
    headline: "Initial deep-data drill-down with a 128-scope delegated token — 77 top-level + 15 ID-driven calls. Superseded by v4.3 and v4.5.",
    findings: [],
    md: "reports/2026-08-05-sharepoint-teams-deep-data-report-v4.md",
    html: "reports/2026-08-05-sharepoint-teams-deep-data-report-v4.html",
    tags: ["sharepoint", "teams", "deep-data"]
  },
  {
    id: "2026-08-05-sharepoint-teams-deep-data-report",
    date: "2026-08-05",
    title: "Deep-data drill-down v1",
    short: "SP + Teams real-data drill-down",
    category: "sharepoint-teams",
    status: "superseded",
    stats: { pass: null, error: null, not_found: null, gated: null, total: null },
    headline: "First SharePoint + Teams deep-data drill-down. Superseded by v4 → v4.3 → v4.5 (corrected triage).",
    findings: [],
    md: "reports/2026-08-05-sharepoint-teams-deep-data-report.md",
    html: "reports/2026-08-05-sharepoint-teams-deep-data-report.html",
    tags: ["sharepoint", "teams", "deep-data"]
  },
  {
    id: "2026-08-05-sharepoint-teams-report",
    date: "2026-08-05",
    title: "Focused SharePoint/OneDrive + Teams battery",
    short: "77 tables · 15 pass · 0 timeouts",
    category: "sharepoint-teams",
    status: "canonical",
    stats: { pass: 15, error: 2, not_found: 15, gated: 0, total: 77 },
    headline: "77 SharePoint + Teams tables from the catalog queried with real data commands (SELECT * LIMIT 5). 15 pass, 32 auth-gated, 15 not_found, 10 unsupported, 3 bad_request, 2 server-error. Every output captured verbatim.",
    findings: [
      "15/77 SP+Teams tables return real data",
      "32 auth-gated (scope), 15 not_found, 10 unsupported, 3 bad_request, 2 server-error",
      "0 timeouts across 77-table battery"
    ],
    md: "reports/2026-08-05-sharepoint-teams-report.md",
    html: "reports/2026-08-05-sharepoint-teams-report.html",
    tags: ["sharepoint", "teams", "battery"]
  },
  {
    id: "2026-08-05-union-scope-test-report",
    date: "2026-08-05",
    title: "95-scope union token re-test",
    short: "pass 221 → 229 · 8 predicted unlocks",
    category: "scopes",
    status: "canonical",
    stats: { pass: 229, error: 15, not_found: 105, gated: 0, total: 733 },
    headline: "Adding 12 consentable scopes unlocked exactly the 8 predicted tables (pass 221→229). Auth bucket dropped 213→197, with 10 tables moving auth→bad_request (feature-gated APIs now return 400 instead of 403).",
    findings: [
      "8 tables unlocked by 12 new scopes — all were predicted targets",
      "0 pass→non-pass regressions — all 221 prior passes stayed passes",
      "886 automated coral sql invocations, 0 timeouts"
    ],
    md: "reports/2026-08-05-union-scope-test-report.md",
    html: "reports/2026-08-05-union-scope-test-report.html",
    tags: ["scopes", "battery", "733-tables"]
  },
  {
    id: "2026-08-05-licensed-allscope-test-report",
    date: "2026-08-05",
    title: "Full-scope (az admin token) re-test",
    short: "pass 70 → 146 · 87 unlocks · 15 remaining errors",
    category: "licensed",
    status: "canonical",
    stats: { pass: 146, error: 15, not_found: null, gated: 0, total: 733 },
    headline: "18-scope az admin token proves the previous run's blocker was the token, not the license: users list now returns real rows. 87 tables unlocked (52 auth→pass, 29 error→pass, 6 bad_request→pass); errors collapsed 155→15.",
    findings: [
      "87 tables unlocked with full scopes (52 auth + 29 error + 6 bad_request → pass)",
      "Live 403 repro (listuser) now returns real rows",
      "15 remaining real errors: Edu-role 500s ×4, planner 405 ×2, storage URI spec bug ×2, MS-side 500/503 ×7",
      "10 chat/Teams/files/sites tables flipped pass→auth (admin token lacks OAuth scopes)"
    ],
    md: "reports/2026-08-05-licensed-allscope-test-report.md",
    html: "reports/2026-08-05-licensed-allscope-test-report.html",
    tags: ["licensed", "scopes", "733-tables"]
  },
  {
    id: "2026-08-05-auth-rerun-confirmed",
    date: "2026-08-05",
    title: "Auth-classified calls re-run",
    short: "0/23 pass with fresh valid token",
    category: "auth",
    status: "canonical",
    stats: { pass: 0, error: null, not_found: null, gated: 0, total: 25 },
    headline: "Re-ran every v4.3 'auth' failure with a freshly-validated 128-scope token: 0/23 pass. The auth bucket is permanent MS-side blocking (app-only permissions + unprovisioned M365 Backup), not expired-token noise.",
    findings: [
      "0/23 pass — all still 403 accessDenied/UnknownError with valid token",
      "sites/delta, getAllSites, containerTypes/Registrations are app-only permissions",
      "Entire solutions/backupRestore surface (18 calls) 403s — M365 Backup not provisioned",
      "Confirms the v4.3 triage 34/92 pass ceiling"
    ],
    md: "reports/2026-08-05-auth-rerun-confirmed.md",
    html: "reports/2026-08-05-auth-rerun-confirmed.html",
    tags: ["auth", "triage", "verification"]
  },
  {
    id: "2026-08-04-licensed-msgraph-test-report",
    date: "2026-08-04",
    title: "Business Premium licensed-tenant test",
    short: "23 tables unlocked · pass 70",
    category: "licensed",
    status: "canonical",
    stats: { pass: 70, error: null, not_found: null, gated: 0, total: 733 },
    headline: "First battery against a licensed Business Premium tenant. 23 tables unlocked (Teams list, chats, drives, sites, joined teams, insights, outlook settings, planner, deleted teams). Raw pass count lower due to narrower 9-scope token.",
    findings: [
      "23 license-gated tables now pass",
      "Raw pass count masked by 9-scope token vs old 36-scope grant",
      "0 timeouts in full battery + sweep"
    ],
    md: "reports/2026-08-04-licensed-msgraph-test-report.md",
    html: "reports/2026-08-04-licensed-msgraph-test-report.html",
    tags: ["licensed", "733-tables"]
  },
  {
    id: "2026-08-04-spec-bug-tables",
    date: "2026-08-04",
    title: "Spec-bug audit",
    short: "248 fixable · 30 not fixable in spec",
    category: "spec-bugs",
    status: "canonical",
    stats: { pass: 109, error: null, not_found: null, gated: 0, total: 733 },
    headline: "Classifies every failing table into what Coral can fix in the manifest vs what it cannot. 248 spec-fixable, 30 not fixable (Graph server errors, transient outages, missing licenses). Ordered by impact Tier 1→6.",
    findings: [
      "Tier 1: remove 131 consumer-only tables",
      "248 fixable in manifest · 30 not fixable (Graph-side)",
      "109 currently passing (keychain OAuth, 36 scopes)"
    ],
    md: "reports/2026-08-04-spec-bug-tables.md",
    html: "reports/2026-08-04-spec-bug-tables.html",
    tags: ["spec-bugs", "audit"]
  },
  {
    id: "2026-08-04-msgraph-reauth-test-report",
    date: "2026-08-04",
    title: "Keychain OAuth run",
    short: "109 pass · 0 timeouts · 0 expired-token",
    category: "reauth",
    status: "canonical",
    stats: { pass: 109, error: null, not_found: null, gated: 0, total: 733 },
    headline: "Keychain OAuth flow proven end-to-end: token auto-refreshes, so expired-token (0/733) and timeout (0/733) failures are gone. 109 PASS — the honest reproducible number for a fresh Coral install.",
    findings: [
      "0 timeouts (all 442 solved via 120s sweep)",
      "0 expired-token (keychain auto-refresh worked end-to-end)",
      "+17 me_* endpoints (18→35) vs interim 12-scope az run"
    ],
    md: "reports/2026-08-04-msgraph-reauth-test-report.md",
    html: "reports/2026-08-04-msgraph-reauth-test-report.html",
    tags: ["reauth", "keychain", "733-tables"]
  },
  {
    id: "2026-08-02-commit-email-exposure",
    date: "2026-08-02",
    title: "Coral contributor email exposure",
    short: "7 emails exposed via commit metadata",
    category: "security",
    status: "canonical",
    stats: { pass: null, error: null, not_found: null, gated: null, total: null },
    headline: "Personal maintainer emails retrievable by anyone via GET /repos/{owner}/{repo}/git/commits/{full-sha} on both origin and fork. Not a file leak — commit metadata. Zero personal emails in repo files.",
    findings: [
      "7 personal emails exposed (james@withcoral.com, simonw@, saul@, ilia@, andrea@, james.audretsch@, james@phoebe.ai)",
      "12 commits / 7 identities curl-verified on origin + fork (14 requests, 0 failures)",
      "100% reproducible via Coral alone (github.commits MCP)",
      "Fix: GitHub 'Keep my email address private' → noreply commits"
    ],
    md: "reports/2026-08-02-commit-email-exposure.md",
    html: "reports/2026-08-02-commit-email-exposure.html",
    tags: ["security", "github", "privacy"]
  },
  {
    id: "2026-07-31-failure-attribution",
    date: "2026-07-31",
    title: "Failure attribution report",
    short: "604 failures · 338 Coral bugs (56%)",
    category: "triage",
    status: "canonical",
    stats: { pass: null, error: null, not_found: null, gated: null, total: 604 },
    headline: "Every 733-table battery failure classified by root cause: 56% are Coral bugs fixable in the connector, 31% our setup issues, 4% Graph's fault, 1.3% expected, 8.1% ambiguous.",
    findings: [
      "338 Coral bugs (56.0%) — fixable by Andrea",
      "185 our issues (30.6%) — scopes/license/consent",
      "24 Graph API limits (4.0%) · 8 expected (1.3%)",
      "49 possibly-Coral (8.1%) ambiguous"
    ],
    md: "reports/2026-07-31-failure-attribution.md",
    html: "reports/2026-07-31-failure-attribution.html",
    tags: ["triage", "analysis"]
  },
  {
    id: "2026-07-31-msgraph-reauth-test-report-v2",
    date: "2026-07-31",
    title: "Full 733-table re-run v2 (az token + retry)",
    short: "129 pass · 0 timeouts · 0 expired_token",
    category: "reauth",
    status: "canonical",
    stats: { pass: 129, error: null, not_found: null, gated: 0, total: 733 },
    headline: "Az-minted admin token + 4-layer retry strategy: +7 passes over v1 (122→129), 0 final timeouts (all 28 resolved via 120s sweep), 0 expired_token. The canonical complete-coverage run.",
    findings: [
      "15 tables recovered across 2 retry sweeps (13 @30s + 2 @120s)",
      "42/45 spec bugs unchanged, 3 reclassified (none auto-fixed)",
      "~2h30m runtime for 733 tables + sweeps"
    ],
    md: "reports/2026-07-31-msgraph-reauth-test-report-v2.md",
    html: "reports/2026-07-31-msgraph-reauth-test-report-v2.html",
    tags: ["reauth", "733-tables", "retry"]
  },
  {
    id: "2026-07-31-msgraph-reauth-test-report",
    date: "2026-07-31",
    title: "Full 733-table re-run v1 (delegated, frozen)",
    short: "122 pass · 30 timeouts (resolve on retry)",
    category: "reauth",
    status: "superseded",
    stats: { pass: 122, error: null, not_found: null, gated: 0, total: 733 },
    headline: "Delegated keychain OAuth full re-run, 47m. 122 pass, 30 timeouts (all resolve on retry), 45 genuine spec bugs, places_* regression (token change, not connector). Frozen — superseded by v2.",
    findings: [
      "me_* 26→36, identity_* 0→7, security_* 0→3, auditlogs_* 0→3",
      "places_* 4→0 — keychain re-consent dropped Place.Read.All (token change)",
      "All 45 genuine spec bugs still reproduce (40 exact, 5 reclassified)"
    ],
    md: "reports/2026-07-31-msgraph-reauth-test-report.md",
    html: "reports/2026-07-31-msgraph-reauth-test-report.html",
    tags: ["reauth", "733-tables"]
  },
  {
    id: "2026-07-31-scope-unlock-test",
    date: "2026-07-31",
    title: "Scope unlock test (13 → 36 scopes)",
    short: "23 new scopes added via Graph PATCH",
    category: "scopes",
    status: "canonical",
    stats: { pass: null, error: null, not_found: null, gated: null, total: null },
    headline: "Updated the OAuth2 admin grant for the Coral app from 13 to 36 scopes via Graph API PATCH. Result: HTTP 204 No Content.",
    findings: [
      "23 new scopes added (13→36) via oauth2PermissionGrants PATCH",
      "HTTP 204 No Content confirmed"
    ],
    md: "reports/2026-07-31-scope-unlock-test.md",
    html: "reports/2026-07-31-scope-unlock-test.md",
    tags: ["scopes", "oauth"]
  },
  {
    id: "2026-07-31-oauth-consent-guide",
    date: "2026-07-31",
    title: "How to consent to all 36 Coral app scopes",
    short: "Interactive re-consent walkthrough",
    category: "guide",
    status: "canonical",
    stats: { pass: null, error: null, not_found: null, gated: null, total: null },
    headline: "Step-by-step guide for acquiring a new OAuth token with the 36-scope admin grant: interactive re-add (recommended) or alternative tool paths.",
    findings: [],
    md: "reports/2026-07-31-oauth-consent-guide.md",
    html: "reports/2026-07-31-oauth-consent-guide.md",
    tags: ["guide", "oauth"]
  },
  {
    id: "2026-07-30-msgraph-spec-bugs",
    date: "2026-07-30",
    title: "45 genuine Microsoft Graph spec bugs",
    short: "13 wrong URL · 13 deprecated · 12 wrong audience · 4 needs entityId · 3 unsupported query",
    category: "spec-bugs",
    status: "canonical",
    stats: { pass: null, error: null, not_found: null, gated: null, total: 45 },
    headline: "45 tables with OpenAPI parser bugs. All would fail for any AAD tenant with any credentials — not a token or tenant issue.",
    findings: [
      "13 wrong URL · 13 deprecated · 12 wrong audience · 4 needs entityId · 3 unsupported query",
      "Re-tested in v2: 42/45 still reproduce"
    ],
    md: "reports/2026-07-30-msgraph-spec-bugs.md",
    html: "reports/2026-07-30-msgraph-spec-bugs.html",
    tags: ["spec-bugs", "openapi"]
  },
  {
    id: "2026-07-29-msgraph-reauth-test-report",
    date: "2026-07-29",
    title: "Re-auth test (Coral 0.8.1 / surface-singular fix)",
    short: "8 pass · 4 fail · 0 timeouts",
    category: "reauth",
    status: "canonical",
    stats: { pass: 8, error: 4, not_found: null, gated: 0, total: 12 },
    headline: "733 tables, 5,776 table funcs. surface-singular manifest fix (#1791) means Agreements and Teams now return clean 403s instead of timing out. 0 timeouts across all tests (was 2 in 0.5.2).",
    findings: [
      "CLI basics, schema discovery, identity queries all pass (6/6 identity)",
      "Drives/Chats/Teams/Agreements/Sign-in logs fail with structured 400/403 reasons",
      "vs 0.5.2: 0 timeouts (was 2) — surface-singular fix working"
    ],
    md: "reports/2026-07-29-msgraph-reauth-test-report.md",
    html: "reports/2026-07-29-msgraph-reauth-test-report.html",
    tags: ["reauth", "manifest-fix"]
  },
  {
    id: "2026-07-28-az-token-coverage-report",
    date: "2026-07-28",
    title: "API coverage with az CLI token",
    short: "117 pass · 616 fail (192×403 · 181×400 · 148×401 · 83×table-not-found)",
    category: "coverage",
    status: "canonical",
    stats: { pass: 117, error: null, not_found: 83, gated: 0, total: 733 },
    headline: "SELECT * LIMIT 1 on all 733 registered tables using an az CLI token (4 workers, 60s timeout). 117 PASS / 616 FAIL, broken down by HTTP status.",
    findings: [
      "192× 403 Forbidden · 181× 400 BadRequest · 148× 401 Unauthorized",
      "83× Table Not Found · 12× other error",
      "16% pass rate with az CLI token"
    ],
    md: "reports/2026-07-28-az-token-coverage-report.md",
    html: "reports/2026-07-28-az-token-coverage-report.html",
    tags: ["coverage", "az-token", "733-tables"]
  },
  {
    id: "2026-07-14-msgraph-connector-test-report",
    date: "2026-07-14",
    title: "No-license test battery",
    short: "39 commands · 612 output lines · ~3h40m",
    category: "baseline",
    status: "canonical",
    stats: { pass: null, error: null, not_found: null, gated: null, total: 39 },
    headline: "The original connector test battery: install, OAuth, materialization, query ergonomics, error UX, performance, catalog search findings.",
    findings: [
      "List-tables expose raw OData envelope (value JSON) instead of flattened rows",
      "count(*) bypasses local column validation → bare 403",
      "8–11s overhead per CLI query",
      "coral search relevance poor for 'sharepoint files'"
    ],
    md: "reports/2026-07-14-msgraph-connector-test-report.md",
    html: "reports/2026-07-14-msgraph-connector-test-report.md",
    tags: ["baseline", "connector"]
  },
  {
    id: "2026-07-14-full-command-output-log",
    date: "2026-07-14",
    title: "Full command & output log",
    short: "39 commands verbatim with actual output",
    category: "baseline",
    status: "canonical",
    stats: { pass: null, error: null, not_found: null, gated: null, total: 39 },
    headline: "Every coral command from the Jul 14 battery run verbatim with actual output and exit code.",
    findings: [],
    md: "reports/2026-07-14-full-command-output-log.md",
    html: "reports/2026-07-14-full-command-output-log.md",
    tags: ["baseline", "command-log"]
  },
  {
    id: "2026-07-14-directory-data-test-log",
    date: "2026-07-14",
    title: "Directory data test log",
    short: "18 users + 2 groups · no license needed",
    category: "baseline",
    status: "canonical",
    stats: { pass: null, error: null, not_found: null, gated: null, total: null },
    headline: "Real-data testing without an M365 license: 18 users + 2 groups queried through the connector. Verified OData pushdown, table functions with real IDs, nextlink population.",
    findings: [
      "Filter/top OData pushdown verified",
      "String fns on value work; list data cannot be unnested (no JSON fns in DataFusion)",
      "No skiptoken input → pagination can't continue past page 1"
    ],
    md: "reports/2026-07-14-directory-data-test-log.md",
    html: "reports/2026-07-14-directory-data-test-log.md",
    tags: ["baseline", "directory"]
  }
];
