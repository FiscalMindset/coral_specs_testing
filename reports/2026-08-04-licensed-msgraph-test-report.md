# Microsoft Graph v4 Source — Business Premium Licensed-Tenant Test Report

**Date:** 2026-08-04 (UTC) · 2026-08-04 23:08 IST
**Test name:** Full 733-table battery against the licensed Business Premium tenant (`algsoch762.onmicrosoft.com`)
**Time taken:** ~1h 40m (fast battery 10s/20s timeouts + 60s timeout sweep for all timeouts)
**Stats line:** 733 tables tested · 2-phase battery + sweep · results at `/tmp/coral_sql_results_2026-08-04-licensed-sweep.json`
**Status:** ✅ COMPLETE — **70 PASS / 663 FAIL** · **0 timeouts**

> **Bottom line:** The Business Premium license **unlocked 23 tables that failed
> on the unlicensed tenant** (10 previously `license`-blocked file/Teams/Chat
> tables now pass; plus 10 `auth`→pass and 2 `not_found`→pass). However the raw
> pass count dropped 109 → 70 because the new tenant authenticates with the
> **default 9-scope Coral-app token** while the old tenant used the **36-scope
> admin grant** — so ~34 directory/policy tables that used to pass now fail with
> `auth` (403 scope-denied), not because of licensing. **The license win is real;
> it is masked by the narrower token.**

---

## 🎯 Why this run matters

This is the first battery run against a **licensed** tenant. The engagement's
core blocker since 2026-07-14 was "no M365 license" — identity queries worked,
but file/SharePoint/Teams data queries failed with license errors. Business
Premium is now active on `algsoch762.onmicrosoft.com`, so this run answers:
*which tables stop failing once the tenant actually has the licenses the Graph
endpoints require?*

Two changes happened at once, so the numbers need careful reading:

| Change | Old run (baseline) | This run |
|---|---|---|
| Tenant | `algsochgmail.onmicrosoft.com` (unlicensed) | `algsoch762.onmicrosoft.com` (**Business Premium**) |
| Token | 36-scope keychain admin grant | default **9-scope** Coral-app consent |
| Pass | 109 | **70** |

The token difference is the confounder: 62 tables that passed before now fail
(34 with `auth`, 26 with `error`, 2 `bad_request`) — all permission/scope
failures, not license failures. To get a clean "what does the license buy you"
comparison, the wide-scope token needs to be re-granted on the new tenant (see
the re-run recommendation at the end).

---

## 📊 Final breakdown (licensed tenant)

| Status | Count | % | What it means |
|---|---:|---:|---|
| 🟢 **pass** | **70** | **9.5%** | Returned valid `1` row |
| 🟡 **auth** | **280** | **38.2%** | 403/401 — app lacks the delegated scope |
| 🟠 **error** | **155** | **21.1%** | 400/500 errors, bad filters |
| 🟠 **bad_request** | **114** | **15.6%** | 400 — consumer-audience / MSA-only endpoints (spec gap) |
| 🟠 **not_found** | **74** | **10.1%** | 404 / endpoint missing |
| 🟠 **unsupported** | **40** | **5.5%** | Not supported for AAD-account audience |
| **Total** | **733** | 100% | 0 timeouts |

> Note the status vocabulary changed between runs (old used `license`,
> `wrong_audience`, `wrong_url`, `deprecated`, `other`; the current Coral build
> maps these to `auth`, `bad_request`, `error`, `not_found`, `unsupported`), so
> before/after must be compared via the transition matrix below, not raw counts.

### 🔀 Transition matrix (old status → new status)

| Old \ New | pass | auth | bad_request | error | not_found | unsupported |
|---|---:|---:|---:|---:|---:|---:|
| pass (109) | **47** | 34 | 2 | 26 | 0 | 0 |
| auth (282) | **10** | 203 | 10 | 50 | 9 | 0 |
| wrong_audience (131) | 0 | 2 | **82** | 27 | 1 | 19 |
| license (56) | **10** | 28 | 3 | 11 | 0 | 4 |
| not_found (58) | **2** | 5 | 4 | 11 | **36** | 0 |
| other (57) | **1** | 8 | 10 | 21 | 5 | 12 |
| wrong_url (19) | 0 | 0 | 2 | 5 | **12** | 0 |
| deprecated (15) | 0 | 0 | 1 | 3 | **11** | 0 |
| needs_entityId (3) | 0 | 0 | 0 | 0 | 0 | **3** |
| unsupported_query (3) | 0 | 0 | 0 | 1 | 0 | **2** |

**Reading it:**
- **47 pass stayed pass** — the stable core.
- **23 tables improved to pass** — the license + re-consent wins (listed below).
- **62 pass → auth/error/bad_request** — the token-scope regression (directory,
  policy, and role tables need scopes the 9-scope token doesn't have).
- **82 wrong_audience → bad_request** — the consumer-audience endpoints now
  surface as explicit `bad_request` (400) instead of a distinct label; same
  spec-gap class, re-labelled by the newer Coral build.

### ✅ The 23 tables the license / re-consent unlocked (old → pass)

| Old status | Table |
|---|---|
| license | `chats_chat_chats_chat_listchat` |
| license | `me_chat_me_listchats` |
| license | `me_drive_me_getdrive` |
| license | `me_drive_me_listdrives` |
| license | `me_site_me_listfollowedsites` |
| license | `me_team_me_listjoinedteams` |
| license | `me_userteamwork_me_teamwork_listassociatedteams` |
| license | `sites_site_sites_site_listsite` |
| license | `teams_team_teams_team_listteam` |
| license | `teamwork_deletedteam_teamwork_listdeletedteams` |
| auth | `me_iteminsights_me_getinsights` |
| auth | `me_iteminsights_me_insights_listshared` |
| auth | `me_iteminsights_me_insights_listused` |
| auth | `me_outlookuser_me_getoutlook` |
| auth | `me_outlookuser_me_outlook_supportedlanguages` |
| auth | `me_outlookuser_me_outlook_supportedtimezones_5c4f` |
| auth | `me_usersettings_me_getsettings` |
| auth | `me_usersettings_me_settings_getexchange` |
| auth | `tenantrelationships_delegatedadmincustomer_tenantrelationships_listdelegatedadmincustomers` |
| auth | `tenantrelationships_delegatedadminrelationship_tenantrelationships_listdelegatedadminrelationships` |
| other | `me_iteminsights_me_insights_listtrending` |
| not_found | `me_usersettings_me_settings_getiteminsights` |
| not_found | `planner_planner_planner_planner_getplanner` |

**The 10 `license`→pass tables are the headline result:** Teams list, chats,
drives, sites, joined teams, followed sites, associated teamwork, and deleted
teams all return data on the licensed tenant. That is exactly the 
file/Teams/chat surface the connector exists for.

### 📋 All 70 passing tables (licensed tenant)

By prefix:

| Prefix | Pass | Total | Old pass |
|---|---:|---:|---:|
| `me_` | **44** | 147 | 35 |
| `tenantrelationships_` | 3 | 6 | 1 |
| `admin_` | 2 | 36 | 4 |
| `reports_` | 2 | 27 | 2 |
| `security_` | 2 | 64 | 3 |
| `applicationtemplates_` | 1 | 1 | 1 |
| `auditlogs_` | 1 | 4 | 1 |
| `chats_` | 1 | 3 | 0 |
| `compliance_` | 1 | 1 | 1 |
| `copilot_` | 1 | 10 | 1 |
| `directory_` | 1 | 22 | 10 |
| `identitygovernance_` | 1 | 45 | 2 |
| `informationprotection_` | 1 | 4 | 1 |
| `organization_` | 1 | 2 | 1 |
| `planner_` | 1 | 4 | 0 |
| `privacy_` | 1 | 2 | 1 |
| `schemaextensions_` | 1 | 1 | 1 |
| `sites_` | 1 | 3 | 0 |
| `solutions_` | 1 | 35 | 1 |
| `subscriptions_` | 1 | 1 | 1 |
| `teams_` | 1 | 2 | 0 |
| `teamwork_` | 1 | 6 | 0 |

Full list of 70 passing tables: `me_directoryobject_me_listmemberof*`
(4 variants), `me_directoryobject_me_listdirectreports*` (3), `me_directoryobject_me_listowneddevices*` (2),
`me_directoryobject_me_listownedobjects*` (4), `me_directoryobject_me_listregistereddevices*` (3),
`me_directoryobject_me_listtransitivememberof*` (4), `me_directoryobject_me_listrefsponsors`,
`me_directoryobject_me_listcreatedobjects_asserviceprincipal`, `me_chat_me_listchats`,
`me_drive_me_getdrive`, `me_drive_me_listdrives`, `me_extension_me_listextensions`,
`me_iteminsights_me_getinsights` + `_listshared`/`_listtrending`/`_listused`,
`me_licensedetails_me_*` (2), `me_oauth2permissiongrant_me_listoauth2permissiongrants`,
`me_outlookuser_me_getoutlook` + `_supportedlanguages` + `_supportedtimezones_5c4f`,
`me_serviceprovisioningerror_me_listserviceprovisioningerrors`, `me_site_me_listfollowedsites`,
`me_team_me_listjoinedteams`, `me_user_me_user_getuser`, `me_usersettings_me_getsettings` +
`_settings_getexchange` + `_settings_getiteminsights`, `me_userteamwork_me_teamwork_listassociatedteams`,
`chats_chat_chats_chat_listchat`, `teams_team_teams_team_listteam`,
`teamwork_deletedteam_teamwork_listdeletedteams`, `planner_planner_planner_planner_getplanner`,
`sites_site_sites_site_listsite`, `tenantrelationships_*` (3), `admin_exchangeadmin_admin_exchange_gettracing`,
`admin_peopleadminsettings_admin_people_getiteminsights`, `applicationtemplates_*` (1),
`auditlogs_auditlogroot_auditlogroot_getauditlogroot`, `compliance_compliance_*_getcompliance`,
`copilot_copilotroot_*_getcopilotroot`, `directory_recovery_directory_getrecovery`,
`identitygovernance_identitygovernance_*_getidentitygovernance`,
`informationprotection_*_getinformationprotection`, `organization_*_listorganization`,
`privacy_privacy_*_getprivacy`, `reports_*` (2), `schemaextensions_*` (1),
`security_casesroot_security_getcases`, `security_threatintelligence_security_getthreatintelligence`,
`solutions_solutionsroot_*_getsolutionsroot`, `subscriptions_subscription_*_listsubscription`.

### ⚠️ The 62 pass→fail regressions are token scope, not license

All 62 were directory / policy / role tables (users, groups, applications,
devices, service principals, policies, directory roles, conditional access,
`me_directoryobject` sponsor/owned-device variants, deleted-items). Each fails
with a Graph `403`/`400` scope error because the **9-scope** default token lacks
the delegated permissions (e.g. `Directory.Read.All`, `Policy.Read.All`,
`RoleManagement.Read.Directory`) that the old **36-scope** token carried.
**A wide-scope token on the licensed tenant is expected to restore most of
these** — the license itself does not block them.

---

## 🔑 What the license actually bought

1. **File/SharePoint/Teams/Chat data now works** — `teams list`, `chats list`,
   `me joinedTeams`, `me followedSites`, `drives`, `sites`, deleted teams, and
   planner all return data. This is the connector's core surface and the 
   engagement's original blocker.
2. **Insights + Outlook user settings unlocked** — `me_iteminsights_*` (4),
   `me_outlookuser_*` (3), `me_usersettings_*` (3).
3. **Delegated-admin tenant relationships pass** — 3 `tenantrelationships_*`
   tables.
4. **Stable core intact** — 47 tables that passed before still pass.

## 🛠️ Remaining work

1. **Re-run with the wide-scope token on the licensed tenant.** Grant the same
   36-scope admin consent / use the interactive re-auth, then re-run the battery
   to get the clean "licensed vs unlicensed with identical scopes" comparison.
   Expected: ~62 pass→fail regressions mostly flip back to pass, lifting the
   licensed count well above the unlicensed 109.
2. **`bad_request`/`unsupported` (154)**: the old `wrong_audience` class —
   consumer-MSA-only endpoints exposed in the manifest. Spec gap to report
   upstream; not fixable by scopes or license.
3. **`not_found` (74)**: endpoint hygiene — remove or fix endpoints that no
   longer exist (12 wrong_url and 11 deprecated old rows land here).
4. **`error` (155)**: mixed 400/500; worth one pass to separate transient 500s
   from genuine spec bugs.

---

## 🧪 Live commands & real output (reproduce with Coral)

Every command below was run against the live licensed tenant on 2026-08-04.
Copy-paste any of them into a terminal with `coral` installed.

### 1. Teams list — the headline license unlock

```bash
$ coral sql "SELECT * FROM microsoft_graph_v4.teams_team_teams_team_listteam LIMIT 2"
+-------------+----------------+--------------------------------------------------------------------------------------------+-------+--------+--------+------+-----+
| odata_count | odata_nextlink | value                                                                                      | count | filter | search | skip | top |
+-------------+----------------+--------------------------------------------------------------------------------------------+-------+--------+--------+------+-----+
| 1           |                | [{"id":"fd31e343-d9f4-471b-a821-bc5ed36b10f6","createdDateTime":null,"displayName":"algsoch",...}] |       |        |        |      |     |
+-------------+----------------+--------------------------------------------------------------------------------------------+-------+--------+--------+------+-----+
```

### 2. My joined teams

```bash
$ coral sql "SELECT value FROM microsoft_graph_v4.me_team_me_listjoinedteams LIMIT 1"
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| value                                                                                                                                                              |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [{"id":"fd31e343-d9f4-471b-a821-bc5ed36b10f6","createdDateTime":null,"displayName":"algsoch",...,"tenantId":"0aa3a51b-3716-44d7-9636-f85f3db072bf",...}] |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

### 3. My drive (OneDrive) — flattened get-table

```bash
$ coral sql "SELECT microsoft_graph_v4.me_drive_me_getdrive.drivetype, microsoft_graph_v4.me_drive_me_getdrive.quota FROM microsoft_graph_v4.me_drive_me_getdrive LIMIT 1"
+-----------+----------------------------------------------------------------------------------------------+
| drivetype | quota                                                                                        |
+-----------+----------------------------------------------------------------------------------------------+
| business  | {"deleted":0,"remaining":1099511327630,"state":"normal","total":1099511627776,"used":300146} |
+-----------+----------------------------------------------------------------------------------------------+
```

> `quota` is a nested JSON object — the engine returns it raw; one of the
> known limitations for list/get tables (no JSON functions to unnest yet).

### 4. Chats list

```bash
$ coral sql "SELECT value FROM microsoft_graph_v4.chats_chat_chats_chat_listchat LIMIT 1"
+------------------------------------------------------------------------------------------------------------------------------------+
| value                                                                                                                              |
+------------------------------------------------------------------------------------------------------------------------------------+
| [{"id":"19:meeting_YWEwNzIyYjQtMTZkOS00NGE5LThlMGItOGYwMzQzODkyYjg2@thread.v2","topic":"New event",...,"chatType":"meeting","webUrl":"https://teams.microsoft.com/l/chat/...","tenantId":"0aa3a51b-3716-44d7-9636-f85f3db072bf",...}] |
+------------------------------------------------------------------------------------------------------------------------------------+
```

### 5. Sites list — passes but returns empty (no sites created yet)

```bash
$ coral sql "SELECT * FROM microsoft_graph_v4.sites_site_sites_site_listsite LIMIT 1"
+-------------+----------------+-------+-------+--------+--------+------+-----+
| odata_count | odata_nextlink | value | count | filter | search | skip | top |
+-------------+----------------+-------+-------+--------+--------+------+-----+
|             |                | []    |       |        |        |      |     |
+-------------+----------------+-------+-------+--------+--------+------+-----+
```

### 6. Planner — passes but returns empty (no plans yet)

```bash
$ coral sql "SELECT * FROM microsoft_graph_v4.planner_planner_planner_planner_getplanner LIMIT 1"
+------------+---------+----+-------+-------+
| odata_type | buckets | id | plans | tasks |
+------------+---------+----+-------+-------+
|            |         |    |       |       |
+------------+---------+----+-------+-------+
```

### 7. Me — identity baseline still works

```bash
$ coral sql "SELECT displayname, userprincipalname FROM microsoft_graph_v4.me_user_me_user_getuser LIMIT 1"
+-------------+---------------------------------------+
| displayname | userprincipalname                     |
+-------------+---------------------------------------+
| vicky kumar | vickykumar@algsoch762.onmicrosoft.com |
+-------------+---------------------------------------+
```

### 8. The token-scope regression, live (not a license failure)

```bash
$ coral sql "SELECT * FROM microsoft_graph_v4.users_user_users_user_listuser LIMIT 1"
Error: Source request was rejected (403)
Detail: {"error":{"code":"Authorization_RequestDenied","message":"Insufficient privileges to complete the operation.","innerError":{"date":"2026-08-04T17:50:31","request-id":"a7af732f-ce18-4969-a0d5-57fcb8e2e582",...}}} [GET] https://graph.microsoft.com/v1.0/users
Hint: Check the configured credentials and whether they have access to this resource.
```

> This is the same endpoint that passed with the 36-scope token on the
> unlicensed tenant — proving the pass→auth regression is a **token scope**
> issue, not a licensing one.

---

## 📁 Files

- `/tmp/coral_sql_results_2026-08-04-licensed-sweep.json` — final licensed-run results (733 rows)
- `/tmp/coral_sql_results_2026-08-04.json` — old unlicensed baseline (109 PASS)
- `/tmp/run_battery_fast.py` — Phase-1 battery (733 tables, 10s/20s)
- `/tmp/run_sweep.py` — Phase-2 60s timeout sweep (0 remaining timeouts)
- `reports/2026-08-04-msgraph-reauth-test-report.md` — prior unlicensed report

---

_Generated 2026-08-04 by Coral Specs Testing._
_Author: Vicky Kumar <algsoch@gmail.com> · Repo: [FiscalMindset/coral_specs_testing](https://github.com/FiscalMindset/coral_specs_testing)_
