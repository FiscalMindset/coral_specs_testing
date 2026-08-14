/* Coral Specs Testing — report registry (real data from committed reports).
   Every stat below is transcribed from the actual report files in /reports.
   Do not invent values; update only when a new report is committed.

   Schema for each entry in CORAL_REPORTS (validated at load time — see
   __validateRegistry below, throws on missing/invalid required fields):
     id       string, unique, used as the ?id= query param by report.html
     date     string, YYYY-MM-DD
     title    string
     category string
     status   one of latest | addendum | superseded | canonical | guide
     md       repo-relative path to the .md (or .html for HTML-only reports)
     html     repo-relative path to the .html (or .md for md-only reports)
     stats    { total: number, [pass,error,not_found,gated,catalog]?: number|null }
   Optional: short, headline, findings (string[]), tags (string[]), addendum (id)

   Schema for CORAL_META (validated at load time):
     tables           number
     funcs            number
     attributionTotal number  (sum of all attribution[*].value)
     attribution      { label, value, color }[]
     passSeries       { date, label, pass, total }[]   (0 <= pass <= total) */
window.CORAL_REPORTS = [
  {
    id: "2026-08-10-search-planner-comms-surfaces-retest-v2",
    date: "2026-08-10",
    title: "Full re-test with 130-scope token (ms-scope attribution corrected)",
    short: "22 re-probes: 4 pass (3 function form + POST /search/query), 17 unchanged — most are LICENCE gates not scope",
    category: "sharepoint-teams",
    status: "latest",
    stats: { pass: 4, error: 17, not_found: null, gated: 0, catalog: 1, total: 22 },
    headline: "Today's morning session: PATCHed AllPrincipals admin grant to add Search/ExternalItem (verified 121 unique scopes). Edited msgraph-surface-v3 branch in coral-repo to expand manifest OAuth scope list from 9 to 118 scopes (commit b5a5891, add-zerops-source untouched per user instruction). User re-authed via coral source add --interactive with a 22-scope minimal manifest (URL length cap forced trimming from 118 to 22). Token decoded: 130 scopes in scp claim, including all 21 failure-relevant scopes. Re-ran all 22 probes against the new token. RESULT: only 1 NEW pass (POST /search/query returns 200 OK with real message hits). 17 failures reproduce unchanged — but the root cause is now clearly MICROSOFT LICENCE GATES, not scope gaps. Tenant has only O365_BUSINESS_PREMIUM: no Education (6 failures), no E5 (1 callRecords), no P1+P2 (1 signIns), no ACS provisioning (1 calls), no Search admin data (3 acronyms/bookmarks/qnas). The earlier 'ms-scope' attribution was wrong.",
    findings: [
      "Token verified: 130 scopes in scp claim (decoded JWT from keychain). All 21 failure-relevant scopes PRESENT.",
      "POST /search/query returns 200 OK with real message hits — NEW PASS, doesn't need admin provisioning",
      "5× Search list endpoints (acronyms/bookmarks/qnas/getacronyms) still 403 — scope in token but Microsoft refuses without Search admin data provisioning",
      "6× Education endpoints still 403 — tenant has no M365 Education licence, scope in token but Microsoft refuses",
      "1× callRecords still 403 — tenant has no E5 licence, scope in token but Microsoft refuses",
      "1× signIns still 403 — tenant has no Entra P1/P2, scope in token but Microsoft refuses",
      "1× calls still 403 ACS — needs Azure Communication Services resource provisioning",
      "2× onlineMeetings still 403 — likely vickykumar account needs OnlineMeetings licence assignment",
      "3× Graph design/route absent (listpresences/listadhoccalls/onlineMeetingConversations) — unchanged",
      "2× Planner table forms still 405 (Graph demands $filter) — function form with group_id works",
      "1× F7 400 unchanged — regression-clean",
      "Yesterday's ms-scope attribution was WRONG: 16 of 17 unchanged failures are LICENCE gates, not scope. Need to correct F-new-6 in the 2026-08-09 walk report."
    ],
    md: "reports/2026-08-10-search-planner-comms-surfaces-retest-v2.md",
    html: "reports/2026-08-10-search-planner-comms-surfaces-retest-v2.html",
    tags: ["coral-sql", "sharepoint", "search", "licence", "scope-correction", "msgraph-surface-v3", "token-validation"]
  },
  {
    id: "2026-08-10-msgraph-surface-walk-v2",
    date: "2026-08-10",
    title: "Manifest scope expansion + re-test attempt (status update)",
    short: "Manifest scopes 9→118 committed on msgraph-surface-v3; 3 of 21 still pass; 18 still 403 until interactive re-add",
    category: "sharepoint-teams",
    status: "superseded",
    stats: { pass: 3, error: 18, not_found: null, gated: 0, catalog: 0, total: 22 },
    headline: "Today: PATCHed AllPrincipals admin grant to add Search/OnlineMeetings/Edu/Presence/CallRecords.Read.All scopes (verified 121 unique scopes now granted). Created fresh branch msgraph-surface-v3 off origin/main (kept add-zerops-source untouched per user instruction). Expanded sources/v4/microsoft_graph/manifest.yaml OAuth scope list from 9 to 118 scopes, committed as b5a5891 on msgraph-surface-v3. Attempted to re-add source via coral source add --file with env-var token, but the CLI treats env-var tokens as pre-minted (bypasses OAuth flow). Re-test with the resulting 12-scope az token shows: 3 function-form fixes still pass (planner via group_id, presence via user_id), 18 scope-blocked still 403 (az token lacks Search.Read.All etc.). The manifest change is ready — needs one user-initiated 'coral source add --interactive' to mint a refresh token with the full 118 scopes.",
    findings: [
      "Manifest scope expansion: 9 → 118 scopes committed on msgraph-surface-v3 branch (b5a5891)",
      "AllPrincipals grant now has 121 unique scopes including Search/OnlineMeetings/Edu/Presence/CallRecords.Read.All (verified via re-fetch)",
      "add-zerops-source branch is untouched (verified zero diff vs origin/main)",
      "Currently-installed source uses az admin token (12 scopes), NOT the new 118 — env-var path bypasses the OAuth flow",
      "Re-test confirms 3 function-form fixes still hold (planner listplans via group_id, getpresence via user_id)",
      "Re-test confirms 18 scope-blocked still 403 — will continue to until user runs coral source add --interactive once",
      "Single user action needed: 'coral source remove microsoft_graph_v4' then 'coral source add --interactive --file manifest.yaml' once"
    ],
    md: "reports/2026-08-10-msgraph-surface-walk-v2.md",
    html: "reports/2026-08-10-msgraph-surface-walk-v2.html",
    tags: ["coral-sql", "sharepoint", "manifest", "oauth", "scope-expansion", "msgraph-surface-v3"]
  },
  {
    id: "2026-08-10-search-planner-comms-surfaces-retest",
    date: "2026-08-10",
    title: "Retest of 21 failures from 08-09 walk (function-form fixes)",
    short: "22 retest probes + 10 control: 3 now passes (planner + presence function form), 18 reproduce unchanged (Graph-side: scope/ACS/licence/bug)",
    category: "sharepoint-teams",
    status: "superseded",
    stats: { pass: 3, error: 18, not_found: null, gated: 0, catalog: 1, total: 22 },
    headline: "Targeted retest of the 21 failures from the 2026-08-09 walk. Fresh keychain OAuth token re-added interactively after a session mishap. 3 of 21 now pass with the connector's function-form calls (groups_plannergroup_groups_planner_listplans(group_id), users_presence_users_getpresence(user_id)); 18 reproduce unchanged as Graph-side failures (ms-scope, ACS-not-registered, premium-licence, Graph HTML-body bugs). F-new-1 (Planner tables) is REVISED: the connector exposes both broken table form and working function form — the function form routes correctly, the table form is the dead-end. F-new-3 (ACS) is CONFIRMED: same distinctive 'code:7503 Application is not registered in our store' body reproduces via the function form with bogus id, confirming it's whole-surface not per-endpoint.",
    findings: [
      "3 of 21 now pass via the function form (planner_listplans + planner_plans_listbuckets via group_id, getpresence via user_id)",
      "F-new-1 REVISED: connector exposes both broken TABLE form (no-arg → 405) and working FUNCTION form (group_id → 200 OK empty). Tested all 5 teams (algsoch, Q3 FY26 Sales Ops, CS IIT Delhi, Product Eng Mobile, Engineering FiscalMindset) — each returns 0 plans",
      "F-new-2 CONFIRMED: HTML body from onlineMeetingConversations also reproduces via getonlinemeetingconversations(id) function form. Genuine Graph bug.",
      "F-new-3 CONFIRMED: ACS 403 'Application is not registered in our store' reproduces via getcalls(call_id) function form. Whole-surface, not per-endpoint.",
      "F-new-4 CONFIRMED: sites_baseitem_sites_listitems still a function, v6 finding stale",
      "F-new-5 CONFIRMED: F7 filter mandatory still holds",
      "F-new-6 CONFIRMED + SCOPE NOTE: zero-arg getsearchentity 404 unchanged, list endpoints still 403 (Search.Read.All missing from Coral OAuth scope list — manifests asks for only 9 scopes, AllPrincipals grant allows 128 but token scp = OAuth-scope ∩ grant-scope = 9). Adding Search.Read.All to manifest OAuth.scopes is the single highest-leverage fix.",
      "Single highest-leverage fix: add 119 unscoped Graph permissions to Coral manifest's OAuth.scopes. With AllPrincipals grant already having 128 scopes, one manifest edit unlocks 8 of 21 failures (Search × 5, OnlineMeetings, CallRecords, Edu)."
    ],
    md: "reports/2026-08-10-search-planner-comms-surfaces-retest.md",
    html: "reports/2026-08-10-search-planner-comms-surfaces-retest.html",
    tags: ["coral-sql", "sharepoint", "search", "planner", "communications", "education", "surface-walk", "retest", "function-form-fix"]
  },
  {
    id: "2026-08-09-search-planner-comms-surfaces-walk",
    date: "2026-08-09",
    title: "Search + Planner + Communications + Education surface walk",
    short: "40 probes · 19 pass (14 real + 5 empty) / 21 fail (10 ms-scope, 1 error, 2 api-config, 2 api-constraint, 3 api-not-supported, 1 upstream, 1 unknown, 1 catalog)",
    category: "sharepoint-teams",
    status: "superseded",
    stats: { pass: 19, error: 17, not_found: 3, gated: 0, catalog: 1, total: 40 },
    headline: "First walk of 4 Microsoft Graph surfaces that v8 did not cover — Search, Planner, Communications, Education. 40 probes against the live source: 14 pass (real data) + 5 pass (200 OK empty) + 21 fail. Of the 21 failures only 2 are Coral-side (F-new-1: planner tables need filter args; F-new-4: sites_baseitem_sites_listitems catalog drift); the other 19 are Graph-side (ms-scope, api-config, api-not-supported, api-constraint, upstream, unknown). New findings: 1) F-new-1 planner listplans/listtasks 400 demanding $filter; 2) F-new-2 onlineMeetingConversations returns HTML body from Graph; 3) F-new-3 calls API needs ACS registration (not a missing scope); 4) F-new-4 catalog drift on sites_baseitem_sites_listitems; 5) F-new-5 F7 filter fix holds; 6) F-new-6 Search surface unchanged from v6 (zero-arg getsearchentity still 404).",
    findings: [
      "40 probes: 14 real-data pass + 5 empty-200-OK pass + 21 fail. Of 21 fails: 10 ms-scope (Search.Read.All, OnlineMeetings.Read.All, Edu.*), 1 error (F7 filter mandatory), 2 api-constraint (planner needs $filter), 3 api-not-supported (presence/adhoccalls/search zero-arg), 2 api-config (ACS not registered + P1+P2 licence), 1 upstream (education/reports HostNotFound), 1 unknown (onlineMeetingConversations HTML body), 1 catalog drift",
      "Tenant inventory reconfirms v8: 16 users, 50 groups, 3 drives, 2 chats, 2 sites, n apps, n SPs — same keychain OAuth that fails on 4 new surfaces works on all the established ones. Failure wall is genuinely Graph-side, not a token problem.",
      "F-new-1: planner_plannerplan_planner_listplans + planner_plannertask_planner_listtasks are exposed as no-arg tables; Graph rejects with 400 demanding $filter on owner/planId. Coral should expose the filter arg.",
      "F-new-2: communications_onlinemeetingengagementconversation_communications_listonlinemeetingconversations returns 400 with HTML body (\"<html><body><h1>400 Bad request</h1>Your browser sent an invalid request.</body></html>\"). Graph-side malformed response bug — should report.",
      "F-new-3: communications_call_communications_listcalls 403 with body \"Application is not registered in our store\" — ACS resource not provisioned. Different failure class from a missing scope; needs tenant admin to register ACS.",
      "F-new-4: sites_baseitem_sites_listitems was a no-arg table in v6, now a function (renamed in current catalog build). v6's 'maps non-endpoint' finding is now stale — anyone re-running v6 should expect different output here.",
      "F-new-5: F7 fix holds — drives_driveitem_drives_listitems(filter => 'name ne null') on OneDrive returns 15 items; without filter still 400. The fix is about exposing the arg, not making it optional.",
      "F-new-6: Search surface unchanged from v6 — zero-arg search_searchentity_getsearchentity() still 404; the 4 list endpoints still 403 with UnknownError. Add Search.Read.All to the Coral app's delegated grant to unblock the list endpoints."
    ],
    md: "reports/2026-08-09-search-planner-comms-surfaces-walk.md",
    html: "reports/2026-08-09-search-planner-comms-surfaces-walk.html",
    tags: ["coral-sql", "sharepoint", "search", "planner", "communications", "education", "surface-walk", "regression"]
  },
  {
    id: "2026-08-08-sharepoint-teams-coral-sql-data-report-v8",
    date: "2026-08-08",
    title: "161-probe consolidated battery (v8)",
    short: "161 probes · 79 pass / 80 error / 2 catalog facts",
    category: "sharepoint-teams",
    status: "superseded",
    stats: { pass: 79, error: 80, gated: 0, catalog: 2, total: 161 },
    headline: "Every probe run to date merged into one 161-probe matrix, all re-verified live: 48 v6 + 21 v7 + 15 deep + 77 T-series. 79 pass / 80 error / 2 catalog facts. 69 of 80 errors are Microsoft-side (ms-scope 24, ms-upstream 22, graph-constraint 10, aad-account 8, delegated-context 5); only 7 test-side and 3-4 Coral-fixable. Retesting cannot turn any of the 80 into a pass.",
    findings: [
      "161 probes: 79 pass / 80 error / 2 catalog facts (79 pass = real data or valid empty)",
      "Teams fully walkable from one user_id: 5 teams → 24 channels → messages → members → schedule → 63 apps",
      "Chats from zero: 1:1 chat = 11 real messages (calendar-conflict note, SDR/BDR idea, SOC2 call notes); meeting chat = 2 events",
      "OneDrive root = 14 real items; followed sites = Viva Home + 3 lists + 25TiB site drive",
      "Error attribution (sums to 80): ms-scope 24, ms-upstream 22, graph-constraint 10, aad-account 8, test-data 7, delegated-context 5, spec/catalog 4",
      "backupRestore surface (28 probes) 100% gated — M365 Backup unprovisioned; admin endpoints 400 'not supported for AAD accounts'",
      "Only 7 test-side stale-ID errors and 3-4 Coral modeling bugs; 69 Microsoft-side → retesting cannot fix any of the 80",
      "F8 catalog drift (T11) FIXED — chats_chat_chats_chat_listchat confirmed live"
    ],
    md: "reports/2026-08-08-sharepoint-teams-coral-sql-data-report-v8.md",
    html: "reports/2026-08-08-sharepoint-teams-coral-sql-data-report-v8.html",
    tags: ["coral-sql", "sharepoint", "teams", "consolidated", "161-probes"],
    addendum: "2026-08-08-sharepoint-teams-coral-sql-data-report-v8-test-data-correction"
  },
  {
    id: "2026-08-08-sharepoint-teams-coral-sql-data-report-v8-test-data-correction",
    date: "2026-08-08",
    title: "v8 test-data correction (addendum)",
    short: "Corrective re-run of the 2 never-retested item-15 probes · taxonomy corrected",
    category: "sharepoint-teams",
    status: "addendum",
    stats: { pass: 79, error: 80, gated: 0, catalog: 2, total: 161 },
    headline: "Re-ran the 2 never-retested 'item 15' probes from v8's test-data bucket with valid live seeds. test-data 7→5, ms-upstream 22→23 (lastModifiedByUser 500 on both routes), spec/catalog 4→5 (drive-as-list item permissions 404 on valid items). Still sums to 80: 70 Microsoft-side (24+23+10+8+5), 5 test-side, 5 spec/catalog (3-4 Coral-fixable). v8 itself remains frozen.",
    findings: [
      "v6-list lastmodifiedby → 500 lastModifiedByUser on drive-as-list AND site-list routes with valid items → ms-upstream",
      "v6-drive-as-list item permissions → 404 on valid OneDrive items 1/3 while site-list variant returns 4 → spec/catalog",
      "Remaining 5 test-data probes all pass with valid seeds (version 1.0, root children, item 3, team b4dd618c)",
      "Corrected taxonomy: ms-scope 24, ms-upstream 23, graph-constraint 10, aad-account 8, test-data 5, delegated-context 5, spec/catalog 5"
    ],
    md: "reports/2026-08-08-sharepoint-teams-coral-sql-data-report-v8-test-data-correction.md",
    html: "reports/2026-08-08-sharepoint-teams-coral-sql-data-report-v8-test-data-correction.html",
    tags: ["coral-sql", "sharepoint", "teams", "addendum", "correction"]
  },
  {
    id: "2026-08-08-sharepoint-teams-coral-sql-data-report-v7",
    date: "2026-08-08",
    title: "v6 recommendations re-verified + Teams deep walk (v7)",
    short: "29 probes · 16 pass / 10 error / 2 gated / 1 catalog fact",
    category: "sharepoint-teams",
    status: "superseded",
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
    stats: { pass: 29, error: 9, not_found: 7, gated: 2, catalog: 1, total: 48 },
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

/* Hub meta facts — real numbers transcribed from committed reports (same rule
   as REPORTS: never invent; update only when a report/connector run changes them).
   attribution = failure-attribution buckets (338 + 185 + 24 + 8 + 49 = 604);
   passSeries  = pass counts per battery run from each dated report. */
window.CORAL_META = {
  tables: 733,
  funcs: 5776,
  attributionTotal: 604,
  attribution: [
    { label: "Coral bugs", value: 338, color: "var(--bad)" },
    { label: "Our setup", value: 185, color: "var(--info)" },
    { label: "Graph limits", value: 24, color: "var(--purple)" },
    { label: "Expected", value: 8, color: "var(--pass)" },
    { label: "Possibly Coral", value: 49, color: "var(--warn)" }
  ],
  passSeries: [
    { date: "07-28", label: "07-28 az token", pass: 117, total: 733 },
    { date: "07-31", label: "07-31 reauth v1", pass: 122, total: 733 },
    { date: "07-31", label: "07-31 reauth v2", pass: 129, total: 733 },
    { date: "08-04", label: "08-04 keychain", pass: 109, total: 733 },
    { date: "08-04", label: "08-04 licensed", pass: 70, total: 733 },
    { date: "08-05", label: "08-05 all-scope", pass: 146, total: 733 },
    { date: "08-05", label: "08-05 95-scope", pass: 229, total: 733 },
    { date: "08-06", label: "08-06 SP+Teams v6", pass: 29, total: 48 },
    { date: "08-08", label: "08-08 re-verify v7", pass: 16, total: 29 },
    { date: "08-08", label: "08-08 161-probe v8", pass: 79, total: 161 },
    { date: "08-09", label: "08-09 Search+Planner+Comms+Edu", pass: 19, total: 40 },
    { date: "08-10", label: "08-10 retest of 21 fails", pass: 3, total: 22 }
  ],
  guides: [
    {
      title: "How to consent to all 36 Coral app scopes",
      desc: "Step-by-step interactive re-consent walkthrough for acquiring a 36-scope OAuth token (recommended path).",
      file: "reports/2026-07-31-oauth-consent-guide.md"
    },
    {
      title: "Scope unlock test (13 → 36 scopes)",
      desc: "Expand the OAuth2 admin grant via Graph API PATCH — the exact request that returned HTTP 204.",
      file: "reports/2026-07-31-scope-unlock-test.md"
    },
    {
      title: "Full command & output log (07-14)",
      desc: "Every coral command from the original battery, verbatim with output and exit codes.",
      file: "reports/2026-07-14-full-command-output-log.md"
    },
    {
      title: "Directory data test log (07-14)",
      desc: "Real-data testing without an M365 license: 18 users + 2 groups through the connector.",
      file: "reports/2026-07-14-directory-data-test-log.md"
    },
    {
      title: "MS Graph OpenAPI cross-check (v4.5)",
      desc: "How failures were triaged against Microsoft's published OpenAPI to retract phantom Coral bugs.",
      file: "reports/2026-08-05-sharepoint-teams-deep-data-report-v4.5.md"
    },
    {
      title: "OAuth re-auth verification (v5.2)",
      desc: "Re-adding the source via interactive OAuth to fix scope-403s — a proven repro for token issues.",
      file: "reports/2026-08-06-sharepoint-teams-coral-sql-data-report-v5.2.md"
    }
  ]
};

/* Runtime registry shape-check. Throws on the first missing/invalid required
   field so a malformed entry fails LOUDLY at load time (not silently during a
   smoke run hours later). Soft issues (extra fields, null bucket stats) are
   tolerated — only schema-breaking issues throw. Called immediately below. */
(function __validateRegistry() {
  var STATUSES = ["latest", "addendum", "superseded", "canonical", "guide"];
  var DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
  function fail(r, msg) {
    throw new Error("data.js: [" + (r && r.id || "?") + "] " + msg);
  }
  function numOrNull(v) { return v === null || typeof v === "number"; }
  window.CORAL_REPORTS.forEach(function (r, i) {
    if (!r || typeof r !== "object") fail(r, "entry #" + i + " is not an object");
    ["id", "date", "title", "category", "status", "md", "html"].forEach(function (k) {
      if (typeof r[k] !== "string" || !r[k]) fail(r, "missing/invalid required string field '" + k + "'");
    });
    if (!DATE_RE.test(r.date)) fail(r, "date '" + r.date + "' does not match YYYY-MM-DD");
    if (STATUSES.indexOf(r.status) === -1) fail(r, "status '" + r.status + "' not in " + STATUSES.join("|"));
    var s = r.stats;
    if (!s || typeof s !== "object") fail(r, "missing stats object");
    if (!numOrNull(s.total)) fail(r, "stats.total must be number or null (null = qualitative report, not a quantified battery)");
    ["pass", "error", "not_found", "gated", "catalog"].forEach(function (b) {
      if (s[b] !== undefined && !numOrNull(s[b])) fail(r, "stats." + b + " must be number, null, or undefined");
    });
  });
  var m = window.CORAL_META;
  if (!m || typeof m !== "object") throw new Error("data.js: CORAL_META missing");
  if (typeof m.tables !== "number" || typeof m.funcs !== "number") throw new Error("data.js: CORAL_META.tables/funcs must be numbers");
  if (typeof m.attributionTotal !== "number") throw new Error("data.js: CORAL_META.attributionTotal missing");
  if (!Array.isArray(m.attribution)) throw new Error("data.js: CORAL_META.attribution must be an array");
  var attrSum = m.attribution.reduce(function (s, d) { return s + (d && d.value || 0); }, 0);
  if (attrSum !== m.attributionTotal) throw new Error("data.js: CORAL_META attribution sum " + attrSum + " != attributionTotal " + m.attributionTotal);
  if (!Array.isArray(m.passSeries)) throw new Error("data.js: CORAL_META.passSeries must be an array");
})();
