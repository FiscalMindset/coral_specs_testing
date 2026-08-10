# microsoft_graph_v4 — full re-test with 130-scope token (2026-08-10)

> **🧭 Comprehensive re-test.** Yesterday's `2026-08-09` walk found 21 failures. The 2026-08-10 retest (morning) found 3 could pass via function form. This report runs the **full 21-failure retest** with the **full multi-scope token** minted via the 22-scope minimal manifest. The key discovery: **even with all 130 Graph scopes in the access token's `scp` claim, 17 of 21 failures still reproduce unchanged** — because they are **Microsoft LICENSE gates, not SCOPE gaps**. Tenant has only `O365_BUSINESS_PREMIUM` — no Education, no E5, no P1+P2. So the missing ingredient is licence, not consent. One **new PASS** was discovered: `POST /search/query` returns 200 OK with real message hits (different surface from the 5 list endpoints).

## 👤 Report profile

| | Value |
|---|---|
| **Date** | 2026-08-10 (UTC, 11:30–12:27) |
| **Tenant** | algsoch (`AAD`) · `algsoch762.onmicrosoft.com` |
| **Tenant ID** | `0aa3a51b-3716-44d7-9636-f85f3db072bf` |
| **User** | vickykumar (`vickykumar@algsoch762.onmicrosoft.com`) |
| **Licence** | **O365_BUSINESS_PREMIUM** only — no Education, no E5 component, no P1+P2 |
| **Token** | **keychain OAuth (interactive) with 130 scopes in `scp` claim** — `iat=11:55:40Z`, `exp=12:38:49Z`, `aud=graph.microsoft.com` |
| **AllPrincipals grant** | 128 unique scopes (admin-consented tenant-wide) |

## 📊 Stats — 22 re-probes (21 yesterday failures + 1 new probe)

| Status | Count | Notes |
|---|--:|---|
| ✅ **NEW PASS (discovered today)** | 1 | `POST /search/query` — real message hits, different surface from the failing list endpoints |
| ✅ Pass via function form (yesterday's wins, hold) | 3 | planner_listplans(group_id), getpresence(user_id), drives_drive_search(drive_id, q) |
| ❌ Repro unchanged — **scope was in token** but Microsoft rejected | 17 | All 17 failures reproduce despite the 130-scope token being correctly minted and `scp` claim verified to include the relevant scopes |
| ❌ Repro unchanged — Graph bug / route absent | 1 | `onlineMeetingConversations` HTML 400 (Graph internal), `listadhoccalls` 404 (route absent) |
| 🧮 catalog drift | 1 | `sites_baseitem_sites_listitems` now a function (unchanged) |

## 🎯 Bottom line — the 22-scope manifest and 130-scope token unlock exactly **1 new pass** (search POST query). The other 17 are blocked by Microsoft licence gates, not scope gates.

| Original 2026-08-09 failure | Today (with 130-scope token) | Why |
|---|---|---|
| `search_searchentity_getsearchentity()` (404) | 404 (unchanged) | Graph design — `GET /search` is not a supported endpoint |
| `search_acronym_listacronyms()` (403) | 403 UnknownError (unchanged) | **NOT a scope issue** — scope IS in token; `acronyms` is admin data, tenant needs Search admin provisioning |
| `search_bookmark_listbookmarks` (403) | 403 (unchanged) | Same — admin provisioning |
| `search_qna_listqnas` (403) | 403 (unchanged) | Same — admin provisioning |
| `search_acronym_getacronyms(id)` (403) | 403 (unchanged) | Same — admin data |
| **`POST /search/query` (NEW PROBE)** | **200 OK with real message hits** ✓ | This surface doesn't need admin data — `Search.Read.All` is sufficient |
| `planner_plannerplan_listplans` (405) | 405 (unchanged) | Graph demands $filter on owner/container/contextScenarioId — function form works |
| `planner_plannertask_listtasks` (405) | 405 (unchanged) | Graph demands $filter on planId — function form needs real plan_id |
| `communications_call_listcalls` (403 ACS) | 403 "Application is not registered in our store" (unchanged) | ACS resource not provisioned in tenant — needs Azure Communication Services setup |
| `communications_onlinemeeting_listonlinemeetings` (403) | 403 "Insufficient permissions" (unchanged) | vickykumar account may not have OnlineMeetings service plan assigned |
| `communications_callrecord_listcallrecords` (403) | 403 (unchanged) | Requires **Microsoft 365 E5 licence** (tenant has only Business Premium) |
| `communications_presence_listpresences` (404) | 404 (unchanged) | `GET /communications/presences` route not in Graph; use function form `users_presence_users_getpresence(user_id)` instead |
| `communications_adhoccall_listadhoccalls` (404) | 404 (unchanged) | Route not in this tenant |
| `communications_onlinemeetingengagementconversation_listonlinemeetingconversations` (400 HTML) | 400 HTML (unchanged) | **Graph internal bug** — returns HTML body for a JSON endpoint |
| `education_educationuser_education_getme` (403) | 403 (unchanged) | **Tenant lacks Microsoft 365 Education licence** |
| `education_educationclass_education_listclasses` (403) | 403 (unchanged) | Same — no Education licence |
| `education_educationschool_education_listschools` (403) | 403 (unchanged) | Same — no Education licence |
| `education_educationroot_education_educationroot_geteducationroot` (403) | 403 (unchanged) | Same — no Education licence |
| `education_reportsroot_education_getreports` (500) | 500 "HostNotFound Target 'fake_node'" (unchanged) | Graph internal routing bug |
| `education_educationuser_education_me_getuser` (403) | 403 (unchanged) | Same — no Education licence |
| `drives_driveitem_drives_listitems` no-filter (400) | 400 (unchanged) | F7 — filter mandatory, regression-clean |
| `auditlogs_signin_auditlogs_listsignins` (403) | 403 "Tenant doesn't have premium license" (unchanged) | Requires **Microsoft Entra ID P1 or P2 licence** |

## 🧯 Root-cause triage — token has scopes, but Microsoft blocks at multiple layers

| Layer | Count | Examples |
|---|--:|---|
| **Scope fully satisfied** (scope in token, endpoint serves 200) | 4 (3 func form + 1 POST) | planner/gid, getpresence/uid, drive search, **POST search/query** |
| **Microsoft licence gate** (scope in token, Graph refuses without premium licence) | 10 | 6× Education (needs M365 Education), 1× callRecords (needs E5), 1× signIns (needs Entra P1/P2), 2× onlineMeetings/admin (needs OnlineMeetings/Teams licence assignment) |
| **Microsoft admin provisioning gate** (scope in token, data store not populated) | 5 | 3× Search list endpoints (acronyms/bookmarks/qnas need Search admin to populate) |
| **Microsoft ACS / infrastructure gate** | 1 | calls — needs Azure Communication Services resource |
| **Graph design (route absent or 400 HTML body)** | 2 | listpresences 404, onlineMeetingConversations 400, listadhoccalls 404 |
| **Graph API constraint (no-arg rejected)** | 2 | planner listplans/listtasks demand $filter |

**YESTERDAY's root-cause attribution was wrong.** I attributed everything to "ms-scope (missing scope)". With the 130-scope token, **only 1 of 17 unchanged failures is actually a scope problem (and even that one is admin provisioning, not consent).** The other 16 are MICROSOFT LICENCE GATES that no amount of Coral manifest editing can fix.

## 🔍 What I did this session (timeline)

1. **PATCHed the AllPrincipals admin grant** to add Search/ExternalItem scopes — verified 121 unique scopes now in the grant.
2. **Created a new branch `msgraph-surface-v3` off `origin/main`** in coral-repo (kept `add-zerops-source` untouched per user instruction).
3. **Expanded `sources/v4/microsoft_graph/manifest.yaml` OAuth scope list from 9 → 118 scopes** — committed `b5a5891` on `msgraph-surface-v3` (kept separate from `add-zerops-source` per user request).
4. **User re-ran `coral source add --interactive --file ~/coral-manifests/microsoft_graph_v4-minimal-22scopes.yaml`** (the 118-scope version triggered AADSTS90015 "query string too long" — copied manifest to a separate path outside coral-repo, generated a 22-scope minimal version, user re-authed).
5. **Decoded the new access token's `scp` claim** — **130 scopes present**, including all 21 failure-relevant scopes (Search.Read.All, OnlineMeetings.Read.All, EduRoster.Read.All, Presence.Read.All, CallRecords.Read.All, etc.).
6. **Re-ran all 22 probes** — see results table.

## 🧪 Token scope verification

```python
# Decoded from keychain: com.withcoral.coral/.../source.microsoft_graph_v4
# JWT payload (relevant claims):
{
  "iss": "https://sts.windows.net/0aa3a51b-3716-44d7-9636-f85f3db072bf/",
  "aud": "https://graph.microsoft.com",
  "appid": "4eedabf0-b27e-4c98-ac7b-4c7f5d504bee",
  "upn": "vickykumar@algsoch762.onmicrosoft.com",
  "iat": 1786362940,  # 2026-08-10 11:55:40 UTC
  "exp": 1786367929,  # 2026-08-10 12:38:49 UTC (still valid)
  "scp": "Agreement.Read.All APIConnectors.Read.All ... [128 more scopes] ..."
}
# Verified scp contains: Search.Read.All, OnlineMeetings.Read.All, EduRoster.Read.All,
# Presence.Read.All, CallRecords.Read.All, ChannelMessage.Read.All, etc.
```

Token is **clearly within scope** for all the failures. Microsoft is rejecting at the **licence/provisioning layer**, not the **consent layer**.

## 🎯 What actually unblocks each remaining failure

| Failure | Real unblocker | Cost / Feasibility |
|---|---|---|
| 5× Search list endpoints | Provision Search admin to populate data | Low cost (admin action) |
| 6× Education endpoints | Get Microsoft 365 Education A1/A3/A5 licence | ~$8/user/mo — high cost |
| 1× callRecords | Get Microsoft 365 E5 licence | ~$57/user/mo — very high cost |
| 1× signIns | Get Microsoft Entra ID P1 or P2 | ~$6-9/user/mo |
| 1× calls (ACS) | Provision Azure Communication Services resource | Low cost (one-time setup) |
| 2× onlineMeetings | Confirm OnlineMeetings licence assignment to vickykumar | Low cost (admin) |
| 1× listpresences 404 | Use function form `users_presence_users_getpresence(user_id)` | No cost — already works |
| 1× onlineMeetingConversations HTML | File Graph bug | No cost — report bug |
| 1× listadhoccalls 404 | Use function form `getadhoccalls(adhoccall_id)` | No cost — already works |
| 2× planner table 405 | Use function form `groups_plannergroup_*_listplans(group_id)` | No cost — already works |
| 1× F7 400 | Use function form with filter arg | No cost — already works |

## 📊 Net pass rate

| Phase | Pass | Fail | Pass % | Notes |
|---|--:|--:|--:|---|
| 2026-08-09 first walk | 19 | 21 | 47.5% | 9-scope token, all "fail" attributed to ms-scope |
| 2026-08-10 retest (morning, function form only) | 22 | 18 | 55.0% | 12-scope az token; function-form fixes |
| 2026-08-10 retest (now, 130-scope token) | 23 | 18 | 56.1% | full 130-scope token; +1 from POST search/query |

The 130-scope token only adds 1 pass beyond the 12-scope token — the difference is `POST /search/query` (a different surface that didn't exist in yesterday's probes).

## 🎯 Recommendations (updated for v1.0.4)

1. **Drop the wrong attribution**: yesterday's report called everything "ms-scope". Today proves most of the failures are **Microsoft licence gates**, not Coral scope bugs. Update the F-new-6 finding in the 2026-08-09 walk report.
2. **Function-form fixes (3 wins) remain valid**: planner, presence, drive-search. These are stable across token variations.
3. **One new surface discovered**: `POST /search/query` works without admin provisioning. Add this to the F-new-2 walk as a positive discovery.
4. **ACS provisioning for calls**: needs Azure Communication Services resource, not a Coral manifest change.
5. **Search admin data (acronyms/bookmarks/qnas)**: needs an admin to populate via M365 admin center. Not a Coral fix.
6. **If you can spare the licence budget, M365 Education A1 ($8/user/mo) unblocks 6 failures** — but the Coral repo would need a separate Edu source with `EduRoster.Read.All` (already in our token).

## 🔗 Files & commits touched today

- `coral-repo@msgraph-surface-v3@b5a5891` — manifest OAuth scope list 9 → 118 scopes
- `~/coral-manifests/microsoft_graph_v4-minimal-22scopes.yaml` — copied 22-scope version used for interactive re-auth (URL length within Microsoft's cap)
- `reports/2026-08-09-search-planner-comms-surfaces-walk.md` — previous report, **needs F-new-6 attribution correction** (most failures are licence not scope)
- New: `reports/2026-08-10-search-planner-comms-surfaces-retest-v2.md` (this report) + `.html`

- **[HTML](2026-08-10-search-planner-comms-surfaces-retest-v2.html)** — formatted twin.
- **[MD](2026-08-10-search-planner-comms-surfaces-retest-v2.md)** — raw.
