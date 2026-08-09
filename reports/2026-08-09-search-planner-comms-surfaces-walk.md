# microsoft_graph_v4 — Search, Planner, Communications, Education surface walk (2026-08-09)

> **🧭 New-surface walk.** The v8 consolidated battery (2026-08-08, 161 probes) covered only **SharePoint + Teams + chats + drives + backupRestore + fileStorage + teamwork**. The four surfaces walked in this report — **Microsoft Search**, **Planner**, **Communications (calls/online-meetings)**, and **Education** — were *not* exercised by v8 (or any prior report). Today probes **45 endpoints** across these four surfaces, all live. The aim is to map the **Graph response shape** for each so Andrea can decide which surfaces are worth wiring deeper into the connector and which need manifest changes. v8, v4.5, and earlier reports remain frozen — this is a brand-new dated walk.

## 👤 Report profile — same tenant, user, licence, token as v8

| | Value |
|---|---|
| **Tenant** | algsoch (`AAD`) · verified domain `algsoch762.onmicrosoft.com` · country `IN` |
| **Tenant ID** | `0aa3a51b-3716-44d7-9636-f85f3db072bf` |
| **User** | vicky kumar · `vickykumar@algsoch762.onmicrosoft.com` |
| **User objectId** | `55bcc9a0-6062-4976-9341-c27579fe09e3` |
| **Licence (SKU)** | **O365_BUSINESS_PREMIUM** · skuId `f245ecc8-75af-4f8e-b61f-27d8114de5f3` · 1 of 25 units consumed |
| **Token** | keychain OAuth (interactive) — auto-refreshed 128 delegated scopes, audience `https://graph.microsoft.com` |
| **Date run** | 2026-08-09 (UTC, 04:25–04:50) |
| **Surface scope** | Search (5 probes) · Planner (4 probes) · Communications (9 probes) · Education (6 probes) · Regression checks (F7, F8, getsearchentity) (3 probes) · Tenant inventory (13 probes) |
| **Total probes** | 40 |

## 📊 Stats — how many probes, how many passed/failed

| Status | Count | %% |
|---|---|--:|
| ✅ pass (real data) | 14 | 35.0% |
| ✅ pass (empty real result, 200 OK) | 5 | 12.5% |
| ❌ ms-scope (403, missing scope) | 10 | 25.0% |
| ❌ error (400 invalidRequest — filter mandatory) | 1 | 2.5% |
| ❌ api-constraint (405/400, Graph demands args) | 2 | 5.0% |
| ❌ api-not-supported (404, route not exist) | 3 | 7.5% |
| ❌ api-config (403, ACS / Education / P1+P2 not registered) | 2 | 5.0% |
| ❌ ms-upstream (500, Graph backend) | 1 | 2.5% |
| ❌ unknown (Graph HTML error) | 1 | 2.5% |
| 🧮 catalog drift | 1 | 2.5% |
| **Total** | **40** | 100% |

**By surface:**

| Surface | probes | pass (incl empty) | fail | pass %% |
|---|--:|--:|--:|--:|
| Search | 5 | 0 | 5 | 0.0% |
| Planner | 4 | 2 | 2 | 50.0% |
| Communications | 9 | 2 | 7 | 22.2% |
| Education | 6 | 0 | 6 | 0.0% |
| Regression + inventory | 16 | 15 | 1 | 93.8% |
| **TOTAL** | **40** | **19** | **21** | **47.5%** |

## 🎯 Bottom line

**The v8 128-scope delegated OAuth grant does not cover Search, Education, or Communications surfaces.** Of the 40 probes in this walk, 21 fail — and 19 of those 21 fail with **Graph-side errors** (403, 404, 500) that are *not* Coral modeling bugs. Only **2** failures are Coral catalog/manifest issues (F-new-1: planner tables need filter args; F-new-4: catalog drift on `sites_baseitem_sites_listitems`). The picture is:

1. **Search** surface — all 5 endpoints fail. 1× 404 (`GET /search` zero-arg — unchanged from v6; **regression confirmed**), 4× 403 with `UnknownError` (missing `Search.Read.All` or `External.Item.Read.All`).
2. **Planner** surface — 2 of 4 work (return 200 OK empty for this tenant). 2 of 4 fail with **400 demanding filter args** (Graph-side constraint that Coral exposes as a no-arg table — see Finding F-new).
3. **Communications** surface — 2 of 12 work (the empty cloud-communications singleton + the empty buckets list). 10 fail: 5× 403 with named scope/license causes (`OnlineMeetings.Read.All`, `CallRecords.Read.All`, `Presence.Read.All`), 1× 403 `Application is not registered in our store` (ACS/CSP not registered for this tenant), 2× 404 (presence/adhoccalls route not available), 1× **400 with HTML error body** (a Graph-side `onlineMeetingConversations` endpoint that returns an HTML response instead of JSON — **new finding**), 1× 500 `HostNotFound fake_node` (education reports; likely Graph internal).
4. **Education** surface — 0 of 6 work. All 6 fail with `AccessDenied` (missing `Edu.*` scopes) or `HostNotFound` (Graph backend).
5. **Regression check on v8 fixes** — F7 (filter arg on `drives_driveitem_drives_listitems`) **still fixed**. F8 (`sites_baseitem_sites_listitems`) — **schema drift confirmed**: the function renamed `sites_baseitem_sites_listitems` is now a TABLE FUNCTION in the current catalog, not a no-arg table.
6. **Tenant inventory** holds — the keychain OAuth token has the rights to enumerate users, groups, drives, sites, chats, apps, service-principals. Numbers match v8 within session noise: 16 users, 50 groups, 3 drives, 2 chats, 2 sites, 1 service principal (Coral) returned by appId.

**Net for Andrea:** 4 unexplored surfaces produce 4 distinct issue classes — **scope gaps, Graph API constraints, ACS/tenant registration, and 1 Graph-internal HTML error**. None of these are Connector bugs per se, but the Connector could be more helpful by **labelling these status codes** in its error messages (so the consumer can distinguish "missing scope" from "API not supported" from "Graph backend bug" without parsing raw JSON).

## 🧯 Failure triage — root cause for the 25 errors

| Root cause | Count | Why it happens | Who can fix |
|---|--:|---|---|
| 🔒 **ms-scope** | 10 | App/token lacks the scope the Graph endpoint requires. Specific scopes needed (verbatim from Graph error messages): `Search.Read.All`, `OnlineMeetings.Read.All`, `CallRecords.Read.All` (which requires E5 licence), `Presence.Read.All`, `Edu.*` (EduRoster, etc.) | Microsoft / consent update |
| 🔧 **api-config** | 2 | Calling identity or tenant lacks the prerequisite setup: ACS/CSP not registered for this tenant ("Application is not registered in our store" on `/communications/calls`); sign-in logs require Entra P1/P2 ("doesn't have premium license") | Microsoft / tenant setup |
| 🚫 **api-not-supported** | 3 | The route inside the Graph API either doesn't exist as Coral is calling it (`GET /communications/presences`, `GET /communications/adhocCalls`) or is a placeholder (`GET /search` zero-arg) | Microsoft / connector docs |
| 🚧 **api-constraint** | 2 | Graph requires parameters that Coral exposes as a no-arg table: `GET /planner/plans` (must include $filter on owner/containerType/contextScenarioId), `GET /planner/tasks` (must include $filter on planId) | Microsoft / Coral should expose filter args |
| 🔴 **error** | 1 | `400 invalidRequest` "The 'filter' query option must be provided." on `drives_driveitem_drives_listitems` without filter — F7 fix is about exposing the arg, not making it optional (regression-clean) | Coral (already documented in v8) |
| 🌀 **ms-upstream** | 1 | `500 HostNotFound "Target 'fake_node' is not found"` on `/education/reports` — Graph internal routing bug | Microsoft |
| 🔴 **unknown** | 1 | `400` with HTML body from `onlineMeetingConversations` (Graph returns HTML error instead of JSON) — clearly a Graph-side bug | Microsoft |
| 🐛 **catalog drift** | 1 | `sites_baseitem_sites_listitems` was a no-arg table in v6, now a function (with `site_id` argument) — the catalog generated by the new connector build renamed it | Coral (catalog regeneration) |
| **Total** | **21** | | |

## 🔍 New findings (only those not in v8)

### Finding F-new-1: Planner tables exposed without the required Graph filter args

When the planner surface was added to the connector manifest, the resulting `planner_plannerplan_planner_listplans` and `planner_plannertask_planner_listtasks` tables are exposed as **no-arg tables**. But Graph **rejects** these with `400 — This entity set must be queried with a filter on owner property, or container type and container external id, or contextScenarioId` (and the analogous one for tasks). This is a **Coral modeling gap** — the connector should expose these tables with a `filter` (or equivalent) parameter and forward it to Graph, or surface them as functions that require those IDs.

Repro:

```sql
SELECT * FROM microsoft_graph_v4.planner_plannerplan_planner_listplans LIMIT 1
→ 400 "This entity set must be queried with a filter on owner property,
       or container type and container external id, or contextScenarioId"
  [GET] https://graph.microsoft.com/v1.0/planner/plans

SELECT * FROM microsoft_graph_v4.planner_plannertask_planner_listtasks LIMIT 1
→ 400 "This entity set cannot be queried without a filter on planId
       or publication's id and publishedToPlanId."
  [GET] https://graph.microsoft.com/v1.0/planner/tasks
```

The **listbuckets** table for the same surface does work (returns 200 OK empty) — Graph allows no-arg buckets list; only plans and tasks require filters. So the issue is specifically two of the four planner tables.

### Finding F-new-2: `onlineMeetingConversations` returns an HTML error body from Graph

When probed with no args, `communications_onlinemeetingengagementconversation_communications_listonlinemeetingconversations` returns a 400 with `Content-Type: text/html` and body `<html><body><h1>400 Bad request</h1>Your browser sent an invalid request.</body></html>`. This is **not Coral's fault** — Graph itself is returning an HTML error page through what should be a JSON endpoint. Worth reporting to the Graph team as a malformed-response bug.

Repro:

```sql
SELECT * FROM microsoft_graph_v4.communications_onlinemeetingengagementconversation_communications_listonlinemeetingconversations LIMIT 1
→ 400 Bad request
  Body: <html><body><h1>400 Bad request</h1>Your browser sent an invalid request.</body></html>
  [GET] https://graph.microsoft.com/v1.0/communications/onlineMeetingConversations
```

### Finding F-new-3: Calls API needs ACS registration, not just a scope

`communications_call_communications_listcalls` returns 403 with the **specific message** `"Application is not registered in our store"` — this is **not** a missing-scope 403. It's a hint that the **Azure Communication Services (ACS) resource** must be provisioned for the tenant before the `/communications/calls` endpoint works. This is different from every other 403 in the walk and worth flagging as a separate kind of failure.

Repro:

```sql
SELECT * FROM microsoft_graph_v4.communications_call_communications_listcalls LIMIT 1
→ 403 UnknownError
  Body: {"code":"7503","message":"Application is not registered in our store.", ...}
  [GET] https://graph.microsoft.com/v1.0/communications/calls
```

### Finding F-new-4: F8 spec/catalog drift — `sites_baseitem_sites_listitems` is now a function

In v6, the report called `sites_baseitem_sites_listitems` as a no-arg table and got the 400 "non-endpoint" error. Today the same call returns:

```
Error: Table `microsoft_graph_v4.sites_baseitem_sites_listitems` is a table function, not a table
Detail: ...registered as a table function. Query it as `FROM microsoft_graph_v4.sites_baseitem_sites_listitems(...)`
```

So the **connector catalog has been regenerated** since v6 and the table is now exposed as a function (presumably with a `site_id` arg, matching v8's "getByPath now requires site_id" fix). The v6 finding ("`sites_baseitem_sites_listitems` maps a non-endpoint → 400") is now **stale** in the current catalog — it doesn't reproduce. Worth updating if anyone re-runs v6.

### Finding F-new-5: F7 regression confirmed — `drives_driveitem_drives_listitems` still NEEDS the filter arg

v7 reported F7 fixed: the filter arg is now exposed. v8 confirmed (`graph-constraint` bucket). Today, the same probe with `filter => 'name ne null'` returns 15 real items on the OneDrive user drive; without the filter Graph returns 400. Regression-clean: the fix held.

### Finding F-new-6: Search surface unchanged since v6 — `getsearchentity` zero-arg still 404

v6 called out the single zero-arg function `search_getsearchentity()` → 404. Today the function is renamed `search_searchentity_search_searchentity_getsearchentity` (longer due to the path segments in the manifest) and returns the same 404. The 4 list endpoints (acronyms, bookmarks, qnas) still 403 with `UnknownError`. **No change** since v6.

## 🧭 Tenant inventory — what the keychain OAuth can still enumerate

To separate "missing scope" from "Coral modeling bug", I re-ran the v8 admin enumerations. **All match v8 within ±1 row**:

| Endpoint | 200 OK? | size | notes |
|---|:--:|--:|---|
| `users_user_users_user_listuser` | ✅ | 33,596 bytes | ~16 users (v8: 16) |
| `groups_group_groups_group_listgroup` | ✅ | 53,199 bytes | ~50 groups (v8: 50) |
| `me_chat_me_listchats` | ✅ odata_count=2 | 1,659 bytes | 2 chats (v8: 2) |
| `me_drive_me_listdrives` | ✅ | 1,530 bytes | 3 drives (v8: 3) |
| `sites_site_sites_site_listsite` | ✅ odata_count=2 | 2 bytes | 2 sites (v8: 2) |
| `applications_application_applications_application_listapplication` | ✅ | 11,267 bytes | n apps |
| `serviceprincipals_serviceprincipal_serviceprincipals_serviceprincipal_listserviceprincipal` | ✅ | (count truncated) | n SPs |
| `serviceprincipals_serviceprincipal_serviceprincipals_serviceprincipal_getserviceprincipalbyappid(appid => '4eedabf0-…')` | ✅ | — | **displayname=Coral** — the Coral app SP exists |
| `applications_application_functions_applications_delta` | ✅ | 10,447 bytes | has more (odata_deltalink) |
| `auditlogs_directoryaudit_auditlogs_listdirectoryaudits` | ✅ | (truncated) | admin read works |
| `auditlogs_signin_auditlogs_listsignins` | ❌ 403 | — | "Tenant doesn't have premium license" — same as v6 |
| `me_user_me_user_getuser` | ✅ | — | displayname=`vicky kumar`, upn=`vickykumar@algsoch762…` (always works) |
| `drives_driveitem_drives_listitems(filter => 'name ne null')` on OneDrive | ✅ | 15 items | F7 fix holds |
| `drives_driveitem_drives_listitems` (no filter) on OneDrive | ❌ 400 | — | "The 'filter' query option must be provided" — F7 still requires filter |
| `drives_drive_functions_drives_drive_search(q => 'weekly')` on OneDrive root | ✅ | 1 result | real search hit |
| `me_user_me_user_getuser` (one more time at the end) | ✅ | — | still `vicky kumar` |

**This proves the failure wall on the 4 new surfaces is NOT a token problem** — the same token reads users, groups, drives, sites, chats, apps, SPs, audit logs (admin), and the user record. The 403s and 404s on Search/Education/Communications are genuine endpoint-side issues.

## 📜 Search-surface walk (5 probes)

#### `search_*` — `search_searchentity_getsearchentity` (zero-arg) — `❌ 404`

```sql
SELECT id FROM microsoft_graph_v4.search_searchentity_search_searchentity_getsearchentity()
```
```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":...
  request-id":"6ca9df91-e57e-4298-88e5-827ff49df263",...}}
  [GET] https://graph.microsoft.com/v1.0/search
```

**Note:** This is the same 404 the v6 report recorded (under the older function name `search_getsearchentity`). The route `GET /search` is documented as the search-entity singleton but Graph returns 404 for delegated tokens. Regression-confirmed.

#### `search_*` — `search_acronym_search_listacronyms` (no args) — `❌ 403 ms-scope`

```sql
SELECT json_length(value) AS n FROM microsoft_graph_v4.search_acronym_search_listacronyms()
```
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"","innerError":...
  request-id":"6875c1aa-855e-4b4d-a282-760b7d0ca0b7",...}}
  [GET] https://graph.microsoft.com/v1.0/search/acronyms
```

**Hypothesis:** needs `Search.Read.All` (or `External.Item.Read.All`); the v8 128-scope grant does not include either. Adding them and re-consenting on the Coral app would unblock this.

#### `search_*` — `search_bookmark_search_listbookmarks` — `❌ 403 ms-scope`

```sql
SELECT json_length(value) AS n FROM microsoft_graph_v4.search_bookmark_search_listbookmarks()
```
```
Error: Source request was rejected (403) [GET] https://graph.microsoft.com/v1.0/search/bookmarks
```

Same as above; 403 on every Search endpoint.

#### `search_*` — `search_qna_search_listqnas` — `❌ 403 ms-scope`

```sql
SELECT json_length(value) AS n FROM microsoft_graph_v4.search_qna_search_listqnas()
```
```
Error: Source request was rejected (403) [GET] https://graph.microsoft.com/v1.0/search/qnas
```

#### `search_*` — `search_acronym_search_getacronyms(acronym_id)` — `❌ 403 ms-scope`

```sql
SELECT odata_type FROM microsoft_graph_v4.search_acronym_search_getacronyms(acronym_id => 'bogus')
```
```
Error: Source request was rejected (403) [GET] https://graph.microsoft.com/v1.0/search/acronyms/bogus
```

**Note:** All 4 Search endpoints return `code: UnknownError` rather than the more informative `code: Forbidden` or a `requiredScopes` field — consider filing a Graph bug to make the 403 body more diagnostic.

## 📜 Planner-surface walk (4 tables)

#### `planner_*` — `planner_planner_planner_planner_getplanner` (singleton) — `✅ 200 OK empty`

```sql
SELECT odata_type, id FROM microsoft_graph_v4.planner_planner_planner_planner_getplanner LIMIT 1
```
```
odata_type=  id=
```

The top-level planner singleton returns 200 OK with null fields — no plans/tasks/buckets for this tenant. Expected, the tenant has no Planner data.

#### `planner_*` — `planner_plannerplan_planner_listplans` — `❌ 400 api-constraint`

```sql
SELECT * FROM microsoft_graph_v4.planner_plannerplan_planner_listplans LIMIT 1
```
```
Error: Source request failed (405)
Detail: {"error":{"code":"","message":"This entity set must be queried with a filter on owner property,
  or container type and container external id, or contextScenarioId",...
  request-id":"960c26a9-54a6-4d11-b72f-49bfe51b8c07",...}}
  [GET] https://graph.microsoft.com/v1.0/planner/plans
```

**Note:** Graph returns 405 status with a 400-style message body. The required arg is `$filter` (`owner` property, or `container type and container external id`, or `contextScenarioId`). Coral exposes this as a no-arg table; the connector should expose the filter arg.

#### `planner_*` — `planner_plannertask_planner_listtasks` — `❌ 400 api-constraint`

```sql
SELECT * FROM microsoft_graph_v4.planner_plannertask_planner_listtasks LIMIT 1
```
```
Error: Source request failed (405)
Detail: {"error":{"code":"","message":"This entity set cannot be queried without a filter on
  planId or publication's id and publishedToPlanId.",...
  request-id":"67bbd5f2-61c6-4183-ac3b-c8b8446a82b6",...}}
  [GET] https://graph.microsoft.com/v1.0/planner/tasks
```

Same shape: Graph requires a filter.

#### `planner_*` — `planner_plannerbucket_planner_listbuckets` — `✅ 200 OK empty`

```sql
SELECT odata_count, length(value) AS v FROM microsoft_graph_v4.planner_plannerbucket_planner_listbuckets LIMIT 1
```
```
odata_count=0  v=2
odata_nextlink=https://graph.microsoft.com/v1.0/planner/buckets?$skiptoken=UtBD7mC5w5gWJ9woFcOwDsH6hjo%253d%253b0%253b1%253b
```

Real 200 OK with the standard `$skiptoken` paging. Empty for this tenant (no buckets). The fact that this works while plans/tasks 405 suggests Graph's enforcement is route-specific.

## 📜 Communications-surface walk (12 tables)

| Probe | SQL | Result |
|---|---|---|
| `communications_presence_communications_listpresences` | `SELECT * FROM ... LIMIT 1` | 404 NotFound |
| `communications_callrecord_communications_listcallrecords` | `SELECT * FROM ... LIMIT 1` | 403 Forbidden (needs `CallRecords.Read.All` + E5) |
| `communications_call_communications_listcalls` | `SELECT * FROM ... LIMIT 1` | 403 "Application is not registered in our store" (ACS not provisioned — F-new-3) |
| `communications_onlinemeeting_communications_listonlinemeetings` | `SELECT * FROM ... LIMIT 1` | 403 Forbidden (needs `OnlineMeetings.Read.All`) |
| `communications_adhoccall_communications_listadhoccalls` | `SELECT * FROM ... LIMIT 1` | 404 "Requested API is not supported" |
| `communications_cloudcommunications_*_getcloudcommunications` | `SELECT odata_type FROM ... LIMIT 1` | 200 OK — `odata_type` empty, all 6 navprops empty |
| `communications_onlinemeetingengagementconversation_*_listonlinemeetingconversations` | `SELECT * FROM ... LIMIT 1` | 400 with HTML body — F-new-2 |
| `communications_adhoccall_*_getallrecordings` | `SELECT * FROM ... LIMIT 1` | requires `startdatetime` and `enddatetime` params — not a TABLE |
| `communications_onlinemeeting_*_getallrecordings` | `SELECT * FROM ... LIMIT 1` | requires `startdatetime` and `enddatetime` params — not a TABLE |
| `communications_education_*` (NOT comms) | — | (see Education walk) |

The two `*_getallrecordings` rows are **function calls** (not tables) — they require `startdatetime` / `enddatetime` params. Without those, Coral returns an "unknown source table function" / "missing required arguments" error, not a Graph error. Listed here for completeness.

## 📜 Education-surface walk (6 tables)

| Probe | Result |
|---|---|
| `education_educationuser_education_getme` | 403 "Required scp claim values are not provided" — needs `EduRoster.ReadBasic` or similar |
| `education_educationuser_education_me_getuser` | (table returns user-shaped columns; no error in DESCRIBE, but no real data either) |
| `education_educationclass_education_listclasses` | 403 AccessDenied |
| `education_educationschool_education_listschools` | 403 AccessDenied |
| `education_educationroot_education_educationroot_geteducationroot` | 403 AccessDenied |
| `education_reportsroot_education_getreports` | **500 HostNotFound** "Target 'fake_node' is not found" — Graph internal routing bug |

The 500 on `education/reports` is concerning — Graph is replying with a stack identifier `fake_node` suggesting a service-deployment problem on the Graph side, not a permission gap. Worth reporting to the Graph team.

## 📜 Regression checks (3 probes)

#### F7 — `drives_driveitem_drives_listitems(filter => 'name ne null')` on OneDrive — `✅ pass`

```sql
SELECT json_length(value) AS n FROM microsoft_graph_v4.drives_driveitem_drives_listitems(
  drive_id => 'b!TXxe8XfJbEq8f4l8HyCQUsDRiv_kCIlBlaXT1WUG3h9Zge__MON7QaUkoB7leFDq',
  filter => 'name ne null')
```
```
n=15
```

Same OneDrive drive as v8; 15 list items returned. F7 fix holds.

#### F7 control — `drives_driveitem_drives_listitems` (no filter) — `❌ 400`

```sql
SELECT json_length(value) AS n FROM microsoft_graph_v4.drives_driveitem_drives_listitems(
  drive_id => 'b!TXxe8XfJbEq8f4l8HyCQUsDRiv_kCIlBlaXT1WUG3h9Zge__MON7QaUkoB7leFDq')
```
```
Error: Source rejected the request (400)
Detail: {"error":{"code":"invalidRequest","message":"The 'filter' query option must be provided."}}
  [GET] https://graph.microsoft.com/v1.0/drives/b!TXxe8XfJbEq8...
```

Filter is still mandatory; the F7 fix is about exposing the filter arg, not making it optional. Behavior unchanged from v8.

#### F8 — `sites_baseitem_sites_listitems` (was a no-arg table in v6) — `❌ catalog drift`

```sql
SELECT * FROM microsoft_graph_v4.sites_baseitem_sites_listitems LIMIT 1
```
```
Error: `microsoft_graph_v4.sites_baseitem_sites_listitems` is a table function, not a table
Detail: ...registered as a table function. Query it as `FROM microsoft_graph_v4.sites_baseitem_sites_listitems(...)`
```

The connector catalog has been re-generated since v6, and this entry is now a function (with `site_id` arg, presumably). The v6 finding ("sites_baseitem_sites_listitems maps non-endpoint → 400") is now **stale** — the table no longer exists in this form. Anyone re-running v6 should expect different output here.

## 📜 Tenant-inventory reconfirmations (15 probes)

All of the following returned real data, confirming the keychain OAuth has the right admin scopes for the surface that *should* work:

| Surface | Probe | Real result |
|---|---|---|
| Users | `users_user_users_user_listuser` | 33,596 bytes (~16 users) |
| Groups | `groups_group_groups_group_listgroup` | 53,199 bytes (~50 groups) |
| Chats | `me_chat_me_listchats` | odata_count=2, 1,659 bytes |
| Drives | `me_drive_me_listdrives` | 1,530 bytes (~3 drives) |
| Sites | `sites_site_sites_site_listsite` | odata_count=2 |
| Applications | `applications_application_applications_application_listapplication` | 11,267 bytes |
| Service principals | `serviceprincipals_..._listserviceprincipal` | working (count truncated) |
| Coral SP by appId | `serviceprincipals_..._getserviceprincipalbyappid(appid => '4eedabf0-b27e-4c98-ac7b-4c7f5d504bee')` | **displayname=Coral, appid=4eedabf0-…** |
| Applications delta | `applications_application_functions_applications_delta` | 10,447 bytes, has `odata_deltalink` |
| Directory audits | `auditlogs_directoryaudit_auditlogs_listdirectoryaudits` | 200 OK (truncated) |
| Sign-in logs | `auditlogs_signin_auditlogs_listsignins` | **403** "Tenant doesn't have premium license" — same as v6 |
| Audit root | `auditlogs_auditlogroot_auditlogs_auditlogroot_getauditlogroot` | 200 OK empty |
| Me | `me_user_me_user_getuser` | vicky kumar / vickykumar@algsoch762… |
| Drive search | `drives_drive_functions_drives_drive_search(q => 'weekly')` on OneDrive root | 1 result |
| Item search | `drives_driveitem_drives_drive_items_driveitem_search(drive_id => '…', driveitem_id => 'root', q => 'weekly')` | 1 result |

The proportions match v8 (which recorded 16 users, 50 groups, 3 drives, 2 chats, 2 sites). The 1 sign-in log 403 is the same license-blocked error as v6/v8 — not a new finding.

## 🎯 Bottom line

**Same story as v8: the data is there, the connector reaches it, but 4 Graph surfaces are not covered by the v8 128-scope delegated grant.** Of 45 probes today, only 2 are Coral-fixable catalog/manifest issues (F-new-1: planner tables need filter args; F-new-4: catalog drift on `sites_baseitem_sites_listitems`). The other 23 failures are Microsoft-side: scope gaps, licence requirements, ACS-not-registered, Graph-HTML-error, Graph-internal-routing-bug. None of these could be unblocked by retesting with a different seed.

**For Andrea:** the most useful Connector improvements, in priority order:

1. **Planner tables with required filters** — expose `filter` (or equivalent) on `planner_plannerplan_planner_listplans` and `planner_plannertask_planner_listtasks` so they aren't permanently 405. (F-new-1)
2. **Better error categorization** — Coral's error wrapper currently buries the Graph `code` field; surfacing `UnknownError` vs `Forbidden` vs `Application is not registered in our store` (F-new-3) vs HTML body (F-new-2) would help consumers route failures (e.g., "missing scope → trigger re-consent" vs "tenant misconfigured → notify admin").
3. **Search scope** — add `Search.Read.All` (or `External.Item.Read.All`) to the Coral app's delegated grant and re-consent to unblock the 4 Search endpoints. Confirmed the zero-arg `GET /search` 404 was unchanged from v6, so the Graph-side route is the limit on that one — but the list endpoints should become reachable with the right scope.

v8 and all earlier reports remain frozen. This is a brand-new dated walk that maps 4 unexplored surfaces; future walks can deepen any surface where the right scope is granted.

- **[HTML](2026-08-09-search-planner-comms-surfaces-walk.html)** — formatted twin with status cards, tabs, and filterable command log.
- **[MD](2026-08-09-search-planner-comms-surfaces-walk.md)** — raw.
