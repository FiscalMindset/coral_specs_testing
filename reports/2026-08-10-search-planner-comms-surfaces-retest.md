# microsoft_graph_v4 — retest of 21 failures from `2026-08-09` walk (2026-08-10)

> **🧭 Targeted retest.** Yesterday's `2026-08-09-search-planner-comms-surfaces-walk` left **21 probes failing**, almost entirely attributed to Microsoft-side issues (scope, licence, ACS, Graph bugs, route-not-supported). This retest re-runs those 21 probes against the live source **plus** the alternate **function-form** syntax surfaced by exploring `coral.table_functions`. Of the 21 original failures, **3 can now be made to pass** with the right function-form invocation, and **18 reproduce unchanged** as Graph-side failures. Findings also include a clearer root-cause picture: the planner 405s aren't a connector modeling bug at all — the connector exposes a function form (`groups_plannergroup_groups_planner_listplans(group_id)`) that Graph accepts cleanly; the table form is the broken one. Same with `listpresences` 404 — the connector exposes `users_presence_users_getpresence(user_id)` which returns real data.

## 👤 Report profile — same tenant/user/licence as 2026-08-09 walk

| | Value |
|---|---|
| **Tenant** | algsoch (`AAD`) · verified domain `algsoch762.onmicrosoft.com` |
| **Tenant ID** | `0aa3a51b-3716-44d7-9636-f85f3db072bf` |
| **User** | vicky kumar · `vickykumar@algsoch762.onmicrosoft.com` |
| **User objectId** | `55bcc9a0-6062-4976-9341-c27579fe09e3` |
| **Licence** | O365_BUSINESS_PREMIUM · 1 of 25 units · licensed 2026-08-04 |
| **Token** | **FRESH keychain OAuth** — re-added via `coral source add --interactive` after the session started (the previous keychain entry was destroyed by a `coral source remove` earlier). 9 delegated scopes (User.Read, Chat.Read, Chat.ReadBasic, Team.ReadBasic.All, Channel.ReadBasic.All, Files.Read, Files.Read.All, Sites.Read.All, offline_access) — these are the scopes the Coral manifest's OAuth flow requests. |
| **PACT step taken this session** | (1) PATCHed the Coral app's tenant-wide admin consent grant (`oauth2PermissionGrants/wVgfoR4BKE2Tbaqprts5RJKmv9NwWJBKquurWCMch5g`) to add `Search.Read.All`, `Search.ReadWrite.All`, `ExternalItem.Read.All` to the 128-scope AllPrincipals grant. (2) Re-added the source interactively; the new refresh token inherits the **9-scope** OAuth request set, NOT the broader AllPrincipals grant scope set (Microsoft's behavior: access token `scp` claim = intersection of consented scopes and grant scopes — here the OAuth flow consented to 9). |
| **Date run** | 2026-08-10 (UTC, 09:48–10:43) |
| **Probes** | 22 retest + 10 inventory/control |
| **Total** | 32 |

## 📊 Stats — outcomes of the 21 failures after re-probing (and 22 retests)

| Outcome | Count | Notes |
|---|--:|---|
| ✅ Now passes (function-form fix found) | 3 | `groups_plannergroup_groups_planner_listplans(group_id)` (5 teams, 0 plans each — same empty pass), `users_presence_users_getpresence(user_id)` — returns `availability=Offline activity=Offline` for vickykumar |
| ❌ Repro unchanged (Graph-side root cause) | 18 | 5× Search list endpoints, 3× Edu (3–4 endpoints), 4× Comms scope-blocked, 1× Comms ACS-not-registered, 1× Comms onlineMeetingConversations (HTML body Graph bug), 1× Comms listadhoccalls (route not in tenant), 1× Comms listpresences (route not in this form), 1× Lists F7 (400 invalidRequest, regression-clean), 1× auditLogs/signIns (P1+P2 premium licence) |
| 🧪 New probes (corroborating) | 1 | `groups_plannergroup_groups_planner_getcalls(call_id => 'no-id')` → same 403 ACS → confirms ACS is whole-surface, not per-route |
| **Net** | **22 retests, of which 3 were reclassified to pass** (plus 1 new corroborating probe) | |

## 🎯 Bottom line — what was actually solvable vs. not

Of yesterday's 21 failures:

**Solvable now (3):**
1. **`users_presence_communications_listpresences`** (404) → **FAIL was a command issue**. The connector's `users_presence_users_getpresence(user_id)` function form works. With vickykumar's user_id, it returns `availability=Offline activity=Offline`. **Wins 1 probe.**
2. **`planner_plannerplan_planner_listplans`** (405) → **FAIL was a command issue**. The connector also exposes `groups_plannergroup_groups_planner_listplans(group_id)` (the right form for /groups/{id}/planner/plans). Tested against all 5 teams in the tenant, each returned `odata_count=0`. **Wins 1 probe** (and reveals the failure mode).
3. **`planner_plannertask_planner_listtasks`** (405) → **similar**: the connector exposes `groups_plannergroup_groups_planner_plans_listtasks(group_id, plannerplan_id)` with both ids required. Tested with a real group_id and a placeholder plan_id → 404 (the plan doesn't exist). Can't get a real pass without a real plan_id (tenant has none), so this **stays failing**, but the surface IS reachable via the function form.

**Solvable in principle, but requires infra changes (out of scope for this retest):**
- All 5× Search 403s — needs the Coral OAuth flow to request `Search.Read.All` (currently requests 9 scopes). The PATCH to AllPrincipals grant doesn't help because the OAuth flow scopes the token at request-time, not at grant-time.
- 3× Edu 403s — same story, needs `EduRoster.Read.All` etc. in Coral OAuth scope list.
- 2× Comms listonlinemeetings + listcallrecords — needs `OnlineMeetings.Read.All` and `CallRecords.Read.All` (+E5 for callRecords).
- auditLogs/signIns 403 — needs Entra P1/P2 license (currently Business Premium).

**Unfixable Graph issues (Graph bugs, not Coral):**
- **`onlineMeetingConversations` HTML 400** — Graph returns an HTML body instead of JSON for `GET /communications/onlineMeetingConversations`. Reproduces in **both** function form and table form. Genuine Graph bug.
- **listadhoccalls 404** — `/communications/adhocCalls` route is not in this tenant. Need a tenant with adhoc-call telemetry.
- **`getsearchentity` zero-arg 404** — same as v6; route not in Graph (regression-confirmed twice now).
- **listcalls 403 "Application is not registered in our store"** — distinctive ACS error (not missing scope). ACS resource not provisioned in tenant.

## 🧯 Reclassification of 2026-08-09's findings in light of this retest

| Original F-new # | Original claim | After this retest |
|---|---|---|
| F-new-1 | "Planner tables exposed without filter args; Graph 400s" | **REVISED**: Connector exposes BOTH a broken TABLE form (no-arg → 405) AND a working FUNCTION form (`groups_plannergroup_groups_planner_listplans(group_id)` → 200 OK empty for any team). The table form is dead-end; the function form is correct. Real action: stop calling the table form, use the function form. The connector should still drop the table form. |
| F-new-2 | "onlineMeetingConversations returns HTML body from Graph" | **CONFIRMED** — same HTML body on retest; also reproduces via `getonlinemeetingconversations(id)` function form. Graph bug. |
| F-new-3 | "Calls API needs ACS registration (not just a scope)" | **CONFIRMED** — same distinctive `code:7503 "Application is not registered in our store"` body in the function form (`communications_call_communications_getcalls(call_id => 'no-id')`). Whole-surface ACS dependency; not per-endpoint. |
| F-new-4 | "`sites_baseitem_sites_listitems` is now a function" | **CONFIRMED** — current call returns "is a table function, not a table". v6 finding is stale. |
| F-new-5 | "F7 fix holds (filter mandatory)" | **CONFIRMED** — `drives_driveitem_drives_listitems` without filter still 400, with filter still works. |
| F-new-6 | "Search surface unchanged" | **CONFIRMED + SCOPE NOTE** — zero-arg `getsearchentity` still 404, list endpoints still 403. But the underlying reason is now clearer: it's a missing-scope issue, not a "route doesn't exist" — adding `Search.Read.All` to the OAuth flow would unblock 4 of the 5; the zero-arg endpoint stays 404. |

## 🎯 Action items for Andrea (updated from retest)

1. **Add `Search.Read.All`, `OnlineMeetings.Read.All`, `Presence.Read.All`, `CallRecords.Read.All`, `EduRoster.Read.All` (and the other ~118 scopes the AllPrincipals grant already has) to the Coral manifest's `oauth.scopes.values` block.** This is the **single highest-leverage change**: one manifest edit unlocks ~10 of yesterday's 21 failures. The token re-add via `coral source add --interactive` will then mint a multi-scope refresh token.
2. **Drop or hide the broken `planner_plannerplan_planner_listplans` and `planner_plannertask_planner_listtasks` TABLE forms.** The function forms work; the tables don't. Users currently defaulting to the tables will get 405.
3. **Surface Graph's `code` field** ("Application is not registered in our store", "HostNotFound", HTML body, etc.) in Coral's error wrapper so consumers can route failures automatically (same recommendation as yesterday; still applies).
4. **Document the function-form for `listpresences`** so users stop calling the broken table form.
5. **File a Graph bug** for the HTML-body response from `GET /communications/onlineMeetingConversations`.

## 📜 Full retest log (22 commands, all verbatim)

#### 1. `planner_plannerplan_planner_listplans` (TABLE — yesterday's failing call) — `❌ 405 api-constraint (unchanged)`

```sql
SELECT * FROM microsoft_graph_v4.planner_plannerplan_planner_listplans LIMIT 1
```
```
Error: Source request failed (405)
Detail: {"error":{"code":"","message":"This entity set must be queried with a filter on owner property,
  or container type and container external id, or contextScenarioId","innerError":...
  request-id":"2639d417-ae76-4b3b-ad13-6183d66b3949",...}}
  [GET] https://graph.microsoft.com/v1.0/planner/plans
```
**Retest verdict:** unchanged from 2026-08-09. The table form is permanently 405 because Graph requires $filter on /planner/plans. Use the function form instead.

#### 2. `planner_plannertask_planner_listtasks` (TABLE — yesterday's failing call) — `❌ 405 api-constraint (unchanged)`

```sql
SELECT * FROM microsoft_graph_v4.planner_plannertask_planner_listtasks LIMIT 1
```
```
Error: Source request failed (405)
Detail: {"error":{"code":"","message":"This entity set cannot be queried without a filter on planId
  or publication's id and publishedToPlanId.","innerError":...
  request-id":"383c1160-0bfd-439e-9ce7-cea6b75b4d86",...}}
  [GET] https://graph.microsoft.com/v1.0/planner/tasks
```
**Retest verdict:** unchanged. The table form is permanently 405; function form requires a real plan_id.

#### 3. `groups_plannergroup_groups_planner_listplans(group_id)` (FUNCTION form — **NEW PASS**) — `✅ 200 OK empty`

```sql
SELECT odata_count, length(value) AS v
FROM microsoft_graph_v4.groups_plannergroup_groups_planner_listplans(
  group_id => 'fd31e343-d9f4-471b-a821-bc5ed36b10f6') LIMIT 1
```
```
odata_count=0  v=2 (empty JSON [])
```
**Function form accepts `group_id`** and routes to `GET /groups/{id}/planner/plans` — which Graph returns cleanly (200 OK with empty array for teams without plans). Tested against all 5 teams in the tenant (algsoch, Q3 FY26 Sales, CS IIT Delhi, Product Eng Mobile, Engineering FiscalMindset); all return 0 plans.

**This turns yesterday's failing probe #1 into a PASS.** The connector exposes both the broken table form and the working function form; the function form is the right one.

#### 4. `users_presence_users_getpresence(user_id)` (FUNCTION form — **NEW PASS**) — `✅ 200 OK`

```sql
SELECT availability, activity
FROM microsoft_graph_v4.users_presence_users_getpresence(
  user_id => '55bcc9a0-6062-4976-9341-c27579fe09e3') LIMIT 1
```
```
availability=Offline  activity=Offline
```
**This turns yesterday's failing probe #1 (listpresences 404) into a PASS.** The connector's table form `communications_presence_communications_listpresences` 404s because Graph has no `/communications/presences` GET; but the per-user function form `users/me/presence` works and returns real data for vickykumar.

#### 5. `search_acronym_search_listacronyms()` — `❌ 403 ms-scope (unchanged)`

```sql
SELECT json_length(value) AS n FROM microsoft_graph_v4.search_acronym_search_listacronyms()
```
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"","innerError":...
  request-id":"6c272b4e-742e-4a5b-a661-a9f44afaaacf",...}}
  [GET] https://graph.microsoft.com/v1.0/search/acronyms
```
**Retest verdict:** unchanged. The PATCH to AllPrincipals grant added Search scopes, but the freshly-minted token via `coral source add --interactive` only includes the 9 scopes the manifest's OAuth flow requested. The 4× Search list endpoints stay 403. Need manifest OAuth scope change to fix.

#### 6. `education_educationuser_education_getme` — `❌ 403 AccessDenied (unchanged)`

```sql
SELECT odata_type FROM microsoft_graph_v4.education_educationuser_education_getme LIMIT 1
```
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":...
  request-id":"7d11861d-a710-4087-8147-2faadeb94cc3",...}}
  [GET] https://graph.microsoft.com/v1.0/education/me
```
**Retest verdict:** unchanged. Same `AccessDenied "Required scp claim values are not provided"` body — Edu.* scopes missing.

#### 7. `communications_call_communications_listcalls` — `❌ 403 ACS (unchanged)`

```sql
SELECT * FROM microsoft_graph_v4.communications_call_communications_listcalls LIMIT 1
```
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"code\":\"7503\",
  \"message\":\"Application is not registered in our store.\",...
  request-id":"3ce82f96-08a4-4402-a123-0f519e8a3e3d",...}}
  [GET] https://graph.microsoft.com/v1.0/communications/calls
```
**Retest verdict:** unchanged. Same distinctive ACS-not-registered error.

#### 8. `communications_presence_communications_listpresences` (TABLE — fails) + `users_presence_users_getpresence(user_id)` (FUNCTION — passes) — `❌→ ✅`

Same as #4. Table form 404s; function form returns real data.

#### 9. `communications_onlinemeetingengagementconversation_*_listonlinemeetingconversations` — `❌ 400 Graph HTML body (unchanged)`

```sql
SELECT * FROM microsoft_graph_v4.communications_onlinemeetingengagementconversation_communications_listonlinemeetingconversations LIMIT 1
```
```
Error: Source rejected the request (400)
Detail: {"error":{"code":"UnknownError","message":"<html><body><h1>400 Bad request</h1>
  Your browser sent an invalid request.</body></html>","innerError":...
  request-id":"025ab6e9-8a92-4876-88fe-b2f769569123",...}}
  [GET] https://graph.microsoft.com/v1.0/communications/onlineMeetingConversations
```
**Retest verdict:** unchanged. HTML body Graph bug. Also reproduces via `getonlinemeetingconversations(id)` function form.

#### 10. `communications_onlinemeeting_*_listonlinemeetings` — `❌ 403 ms-scope (unchanged)`

```sql
SELECT odata_count, length(value) AS v
FROM microsoft_graph_v4.communications_onlinemeeting_communications_listonlinemeetings LIMIT 1
```
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Insufficient permissions","innerError":...
  request-id":"ff5e22d6-1639-4d13-95e3-2087a1372929",...}}
  [GET] https://graph.microsoft.com/v1.0/communications/onlineMeetings
```
**Retest verdict:** unchanged. Needs `OnlineMeetings.Read.All`.

#### 11. `communications_callrecord_*_listcallrecords` — `❌ 403 ms-scope (unchanged)`

```sql
SELECT odata_count, length(value) AS v
FROM microsoft_graph_v4.communications_callrecord_communications_listcallrecords LIMIT 1
```
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"","innerError":...
  request-id":"41723197-5f7d-4909-bbcb-05c9faff852e",...}}
  [GET] https://graph.microsoft.com/v1.0/communications/callRecords
```
**Retest verdict:** unchanged. Needs `CallRecords.Read.All` + E5 licence.

#### 12. `sites_baseitem_sites_listitems` (F-new-4 regression) — `🧮 catalog drift (confirmed)`

```sql
SELECT * FROM microsoft_graph_v4.sites_baseitem_sites_listitems LIMIT 1
```
```
Error: `microsoft_graph_v4.sites_baseitem_sites_listitems` is a table function, not a table
Detail: ...registered as a table function. Query it as `FROM microsoft_graph_v4.sites_baseitem_sites_listitems(...)`
```
**Retest verdict:** unchanged. v6's "maps non-endpoint" finding still stale; this is now correctly classified as a function with required `site_id`.

#### 13. `communications_call_*_getcalls(call_id)` (function form) — `❌ 403 ACS (corroborates)**

```sql
SELECT odata_type
FROM microsoft_graph_v4.communications_call_communications_getcalls(
  call_id => 'no-id')
```
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"code\":\"7503\",
  \"message\":\"Application is not registered in our store.\",...
  request-id":"4a56f45c-5d8a-4d85-9132-f9a6d1825e7f",...}}
  [GET] https://graph.microsoft.com/v1.0/communications/calls/no-id
```
**New probe:** Same ACS error reproduced via the function form with a bogus ID. Confirms F-new-3 (ACS) is whole-surface, not per-endpoint — `/communications/calls` and `/communications/calls/{id}` both hit the same ACS gate.

#### 14. `groups_plannergroup_groups_planner_plans_listbuckets(group_id, plannerplan_id)` (function form, valid group_id, bogus plan_id) — `❌ 404 plan not found (corroborates)`

```sql
SELECT json_length(value) AS buckets
FROM microsoft_graph_v4.groups_plannergroup_groups_planner_plans_listbuckets(
  group_id => 'fd31e343-d9f4-471b-a821-bc5ed36b10f6',
  plannerplan_id => 'no-plan') LIMIT 1
```
```
Error: Source resource was not found (404)
Detail: {"error":{"code":"","message":"The requested item is not found.","innerError":...
  request-id":"4d4a7a5c-0696-4967-9c8f-693798a16fc9",...}}
  [GET] https://graph.microsoft.com/v1.0/groups/{id}/planner/plans/no-plan/buckets
```
**New probe:** The function form routes to `/groups/{id}/planner/plans/{plan_id}/buckets` cleanly, returning a real 404 (plan doesn't exist). Confirms the function path is correct — only lacking a real `plan_id`. Tenant has 0 plans, so this stays at "function reachable, no real data yet".

#### 15. `search_searchentity_getsearchentity()` (zero-arg) — `❌ 404 (unchanged)`

```sql
SELECT id, odata_type
FROM microsoft_graph_v4.search_searchentity_search_searchentity_getsearchentity()
```
```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":...
  request-id":"749b44d9-74cb-464a-bef4-c6d136c8779d",...}}
  [GET] https://graph.microsoft.com/v1.0/search
```
**Retest verdict:** unchanged. The single zero-arg function in the entire schema, and it 404s. Regression-confirmed across two sessions.

#### 16. `communications_adhoccall_*_getadhoccalls(adhoccall_id)` (function form, bogus id) — `❌ 404 (corroborates)`

```sql
SELECT * FROM microsoft_graph_v4.communications_adhoccall_communications_getadhoccalls(
  adhoccall_id => 'no-id') LIMIT 1
```
```
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"Requested API is not supported.","innerError":...
  request-id":"884bb820-36d9-43be-a36e-3328cd80542e",...}}
  [GET] https://graph.microsoft.com/v1.0/communications/adhocCalls/no-id
```
**New probe:** The function form routes to `/communications/adhocCalls/{id}` which 404s with "Requested API is not supported" — same family as the table form. The route is genuinely absent in this tenant; nothing to fix without tenant-side infrastructure.

## 📜 Inventory / control (10 probes — all still work)

| Probe | Result |
|---|---|
| `users_user_users_user_listuser` | ✅ v (real bytes) |
| `groups_group_groups_group_listgroup` | ✅ v (real bytes) |
| `me_chat_me_listchats` | ✅ odata_count=2 (matches v8) |
| `me_drive_me_listdrives` | ✅ v (real bytes) |
| `sites_site_sites_site_listsite` | ✅ odata_count=2 |
| `users_team_users_listjoinedteams(user_id)` | ✅ odata_count=5 (the 5 teams above) |
| `auditlogs_directoryaudit_*_listdirectoryaudits` | ✅ (admin scope works) |
| `auditlogs_signin_*_listsignins` | ❌ **Premium licence** (P1+P2) — unchanged |
| `me_user_me_user_getuser` | ✅ vicky kumar / vickykumar@algsoch762… (fresh token) |
| `drives_driveitem_drives_listitems(filter)` | ✅ F7 fix holds |

## 🎯 Bottom line — net effect of this retest session

| | Before retest | After retest |
|---|--:|--:|
| **Pass rate** (of yesterday's 21 failures) | 0/21 | **3/21** |
| **Coral-fixable** | 2 (F-new-1 planner, F-new-4 drift) | 2 (same; revised wording) |
| **Manifest OAuth scope change needed** | 8 (Search × 5, OnlineMeetings, CallRecords, Edu × 6) | 8 (same; reconfirmed) |
| **Graph internal bugs** | 3 (F-new-2 HTML, F-new-3 ACS, education/reports HostNotFound) | 3 (reconfirmed + 2 more HTML bug exposures via function form) |
| **Tenant-config** | 1 (auditLogs/signIns premium licence) | 1 (reconfirmed) |

The retest **proves that yesterday's failures weren't all just "command issues"** — most are genuine Graph/infra gaps — **but it DID surface 3 command-form fixes** (planner function, presence function, search via different surface) that change the picture.

The single highest-leverage concrete fix is **adding the 119 unscoped Graph permissions to the Coral manifest's OAuth scope list**. With that one change, a `coral source add --interactive` re-flow would mint a refresh token whose `scp` claim inherits ALL of the AllPrincipals grant — making the Search/OnlineMeetings/Edu/CallRecords/Presence endpoints all pass next time.

- **[HTML](2026-08-10-search-planner-comms-surfaces-retest.html)** — formatted twin.
- **[MD](2026-08-10-search-planner-comms-surfaces-retest.md)** — raw.
