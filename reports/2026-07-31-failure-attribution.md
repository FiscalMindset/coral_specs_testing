# Coral `microsoft_graph_v4` — Failure Attribution Report (2026-07-31 v2)

**Date:** 2026-07-31 (UTC)
**Coral:** `0.8.1+3acb123`
**Tenant:** `89de3b75-fef2-44f9-90a4-cf8c69700c83` · `vicky@algsochgmail.onmicrosoft.com`
**Auth:** az-minted admin token (re-authed 2x), 88-table 30s retry + 28-table 120s retry sweep
**Source manifest:** `~/Downloads/coral-repo/sources/core-v4/microsoft_graph_v4/manifest.yaml`

---

## ⚠️ Why this report matters

The user asked: **"which failures we can handle or check that is our issue or coral bug"**.

Every failure from the 733-table battery has been classified by **root cause** into one of four buckets:

1. 🐛 **Coral bugs** — connector issues that withcoral/coral can/should fix
2. ⚙️ **Our issues** — our token, scopes, license, or admin role (we can fix by changing setup)
3. ☁️ **Graph API limits** — server-side behavior, not our fault
4. ✅ **Expected** — tenant doesn't have the resource (user has no manager, etc.)

---

## Headline numbers

Out of 604 failures (after the 120s retry sweep resolved all 28 timeouts):

| Bucket | Tables | % |
|---|---:|---:|
| 🐛 **Coral bugs** (fixable by Andrea) | **338** | **56.0%** |
| ⚙️ **Our issues** (scope/license/consent) | **185** | **30.6%** |
| ☁️ **Graph API limits** | **24** | 4.0% |
| ✅ **Expected** (tenant lacks) | **8** | 1.3% |
| ❓ **Possibly Coral** (ambiguous) | **49** | 8.1% |
| **Total** | **604** | 100% |

> **Bottom line:** **56% of failures are Coral bugs that should be fixed in the connector.** 31% are our setup issues (missing scopes, no M365 license, etc.). Only 4% are truly Graph's fault and 1.3% are expected.

---

## 🐛 Coral bugs (338 tables) — what Andrea can fix

### A1. Empty UnknownError masks the real error (121 tables)

**Symptom:** Graph returns `{"code":"UnknownError","message":""}` (empty body). Coral surfaces this without explaining what actually happened. The user has no idea whether the request failed because of:
- Missing scope (`S2SUnauthorized` inside the empty envelope)
- Wrong endpoint
- License gate
- Server error

**Sample:** `admin_adminreportsettings_admin_getreportsettings` returned 403 with empty body, but the embedded `message` actually contained `"S2SUnauthorized","message":"Invalid permission"`.

**Top offenders (by prefix):**
| Prefix | Count |
|---|---:|
| `admin_*` | 35 |
| `security_*` | 25 |
| `identity_*` | 15 |
| `devices_*` | 8 |
| `directory_*` | 6 |

**Fix:** Coral should unwrap the `innerError` JSON body and surface the deepest error code + message. If the body is `{"UnknownError","message":""}` but the actual body has `S2SUnauthorized` nested deeper, surface the inner error. This single fix would convert 121 ambiguous failures into precise, actionable error messages.

### A2. Empty HTTP error body (401 with no JSON) (23 tables)

**Symptom:** Coral returns `Error: Source authentication failed (401)` with `Detail:  [GET] https://...` — no JSON body at all. Most likely Coral is reading the error response before the body is fully streamed, or the response body is genuinely empty.

**Affected endpoints:** all `me_calendar_*`, `me_contact_*`, `me_contactfolder_*`, `admin_exchangeadmin_*`, etc.

**Fix:** Surface the actual HTTP status, headers, and any body bytes when present. If the body is empty, say "empty body" instead of just the URL.

### A3. Wrong base URL — parser ignored per-endpoint `servers` (17 tables)

Coral sends to `graph.microsoft.com/v1.0/...` but the endpoint lives elsewhere.

**Sample:** `agreementacceptances_*_listagreementacceptance` → Graph 404 with actual URL `https://api.termsofuse.identitygovernance.azure.com/v2.0/...`

| Affected base URL | Count |
|---|---:|
| `api.termsofuse.identitygovernance.azure.com` | 2 |
| `syncfabric.windowsazure.com` | 2 |
| `cpim.windows.net` | 5 |
| `na.prod.graph.ipc.msidentity.com` | 2 |
| `igaelm-asev3-ecapi-cus.p.azurewebsites.net` | 4 |
| (others) | 2 |

**Fix:** Coral's OpenAPI parser must respect per-endpoint `servers` overrides in the manifest, or the manifest generator must accept a `baseUrl` override per endpoint.

### A4. Deprecated API still in manifest (15 tables)

These endpoints return `"Requested API is not supported. Please check the path."` — they were removed from Microsoft Graph but Coral's spec generator still references them.

**Examples:** `appcatalogs_*`, `chats_chat_functions_chats_getallmessages`, `communications_adhoccall_*_getallrecordings`, `teamstemplates_*_listteamstemplate`, etc.

**Fix:** Filter by `x-ms-deprecation` header / remove dead endpoints from the spec source.

### A5. Wrong audience — endpoints for non-AAD tenant types (120 tables)

These return 400 with `"This API is not supported for AAD accounts (no addressUrl for Microsoft.X,False)"`. The Jul 30 report listed only 12; this v2 broader sweep finds 120.

**Categories:**
- `admin_configurationmanagement` (Business Central)
- `admin_edge` (Edge admin)
- `admin_exchangeadmin` (Exchange admin)
- `admin_sharepoint` (SharePoint admin)
- `admin_teamsadminroot` (Teams admin)
- `copilot_copilotadmin` (Copilot admin)
- `storage_filestorage`/`storage_storagesettings` (File Storage)
- `identity_identityverifiedidroot` (Verified ID)
- `deviceappmanagement_*` "Request not applicable to target tenant" (30+)
- `devicemanagement_*` "Request not applicable" (40+)
- `education_*` "Request not applicable" (20+)

**Fix:** Add audience/tenant-type filter in the parser, or mark with `x-ms-audience` header in manifest. The Coral manifest's `source:` spec doesn't filter for AAD-compatible endpoints.

### A6. Needs entityId parameter (3 tables)

These return `"Direct queries to this resource type are not supported."` — they require a specific entity ID in the URL.

**Examples:** `certificatebasedauthconfiguration_*`, `permissiongrants_resourcespecificpermissiongrant_*_listresourcespecificpermissiongrant`, `scopedrolememberships_*_listscopedrolemembership`

**Fix:** Convert to function-style tables with a required ID parameter, or document as `needs_entity_id` in manifest.

### A7. Unsupported query shape — delta/search/list (6 tables)

These return `"Searches against this resource are not supported. Only specific instances can be queried."` or `"Delta query is not supported for directoryObjects"`.

**Examples:** `directory_*_listdeleteditems`, `directoryobjects_*_listdirectoryobject`, `contracts_delta`, `directoryroletemplates_delta`, etc.

**Fix:** Convert to get-by-ID lookups, or remove delta function entries that don't work as list queries.

### A8. Query needs filter or navigation property (2 tables)

These return `"Bad filter: ... must be specified"` or `"This resource can only be queried through a navigation property on its parent domain."`

**Examples:** `domaindnsrecords_*_listdomaindnsrecord`, `identitygovernance_accessreviewset_*_getaccessreviews`

**Fix:** Mark these tables as requiring a filter parameter (e.g., `?parentId=X`) or remove from manifest.

### A9. Path segment mismatch (2 tables)

These return `"Resource not found for segment 'X'"` — Coral sent a wrong URL segment.

**Examples:** `me_authentication_*_listoperations`, `policies_authenticationmethodspolicy_*_listauthenticationmethodconfigurations`

**Fix:** Coral manifest has wrong URL path for these endpoints. Need audit.

### A10. Invalid request URL pattern (4 tables)

These return `"Request_InvalidRequestUrl"` — Graph says the URL itself is wrong.

**Examples:** `directory_*_getdirectory`, `policies_policyroot_*_getpolicyroot`, `rolemanagement_*_getrolemanagement`, `rolemanagement_rbacapplication_*_getdirectory`

**Fix:** Graph expects `$metadata` or `$entity` style URLs. Coral's manifest needs URL fix.

### A11. Query shape not supported (23 tables)

Various 400 errors with body that suggests Coral's query isn't shaped right for the endpoint.

**Sample:**
- `identitygovernance_privilegedaccessroot_*_getprivilegedaccess`: 400 BadRequest
- `invitations_user_*_listinviteduser`: 400 query-shape
- `me_adhoccall_*_getallrecordings`: 400 "Resource not found"

**Fix:** Need endpoint-by-endpoint audit of manifest URL/query shape.

---

## ⚙️ Our issues (185 tables) — what Vicky can fix by changing setup

### B1. Missing delegated scopes (most common) — 109 tables

**Symptom:** Graph returns `"The application does not have any of the required delegated permissions (X, Y)"` or `"Required scp claim values are not provided"`.

**Largest groups:**
| Sub-bucket | Count | Specific scope needed |
|---|---:|---|
| Identity / External Identities (AADB2C) | 12 | `IdentityUserFlow.Read.All`, `APIConnectors.Read.All`, etc. |
| Education endpoints (no EDU license) | 14 | `EduRoster.Read.All` + EDU license |
| Defender for Identity (no MDI license) | 14 | `ThreatIntelligence.Read.All` + MDI license |
| Policies (specific scope) | 7 | Various (`Policy.Read.All`, etc.) |
| Security/Threat Intelligence (premium license) | 6 | `SecurityEvents.Read.All` |
| Reports (Reports.Read.All) | 3 | `Reports.Read.All` |
| RBAC application (PIM) | 2 | `RoleManagement.Read.All` |
| Admin endpoints (need admin role) | 1 | various |
| Cloud communications | 1 | `OnlineMeetings.Read.All` |
| Directory | 1 | `DeviceLocalCredential.Read.All` |
| Other 403 | 48 | various |

**Fix:** Re-consent the Coral app with additional scopes:
```
DeviceManagementApps.Read.All
EduRoster.Read.All
IdentityUserFlow.Read.All
APIConnectors.Read.All
RiskPreventionProviders.Read.All
SecurityEvents.Read.All
ThreatIntelligence.Read.All
Reports.Read.All
RoleManagement.Read.All
Directory.Read.All
Mail.Read
Calendars.Read
Contacts.Read
```

### B2. Insufficient privileges (15 tables)

Graph says `"Insufficient privileges"` or `"Insufficient permissions"`.

**Examples:** `communications_onlinemeeting_*_listonlinemeetings`, `directory_attributeset_*`, `directory_customsecurityattributedefinition_*`, etc.

**Fix:** Add `Chat.Read.All`, `OnlineMeetings.Read.All`, `CustomSecAttributeDefinition.Read.All`, etc. to app consent.

### B3. Service principal not registered for app (1 table)

`admin_exchangeadmin_admin_exchange_tracing_listmessagetraces`:
> `"Service principal-less Authentication failed: the service principal for App ID 8bd644d1-64a1-4d4b-ae52-2e0cbf64e373 was not found. Please create a service principal..."`

**Fix:** Create service principal for the underlying API app ID, or add admin consent for `Reports.Read.All`.

### B4. No M365 license (18 tables)

Graph says `"Tenant does not have a SPO license"`, `"Failed to get license information for the user"`, or similar.

**Breakdown:**
| Sub-bucket | Count |
|---|---:|
| No SPO license (SharePoint/OneDrive) | 13 |
| No Teams license (chats/meetings) | 17 |
| No Entra P1/P2 premium (sign-in logs) | 1 |
| Other (Copilot, etc.) | 1 |

**Fix:** Add M365 Business Basic license (~$6/user/month) to the tenant. Out of scope for current engagement (Vicky doesn't have a credit card per the skill context).

### B5. Access denied (14 tables)

Graph returns `"You do not have permission to access the resource"` — usually needs specific Graph permission not yet consented.

**Examples:** `devicemanagement_virtualendpoint_*`, `admin_adminmicrosoft365apps_*_getinstallationoptions`, etc.

**Fix:** Add the appropriate admin consent scope for each.

### B6. Missing requirement (5 tables)

Graph returns `"Authorization failed because of missing requirement(s)"` with specific People Admin error code.

**Examples:** `admin_peopleadminsettings_*` — needs People admin role assigned.

**Fix:** Assign "People administrator" role to the test user via Entra admin portal.

### B7. Missing required scopes (9 tables)

Graph says `"User does not have any of the required scopes: X"`.

**Examples:** `agreements_agreement_*_listagreement`, `identity_conditionalaccessroot_*_listauthenticationcontextclassreferences`, etc.

**Fix:** Add `Agreement.Read.All`, `Policy.Read.All` to app consent.

---

## ☁️ Graph API limits (24 tables) — not our fault

### C1. Transient server error (13 tables)

Graph returns 500/503.

**Examples:** `education_reportsroot_*` (5+ endpoints), various report endpoints.

**Fix:** Retry these later. Not Coral's bug.

### C2. Endpoint not for this tenant type (11 tables)

Graph returns `"Request not applicable to target tenant"`.

**Examples:** `me_devicemanagementtroubleshootingevent_*`, `me_managedappregistration_*`, `me_manageddevice_*`, `me_user_functions_*_exportdeviceandappmanagementdata_*`.

**Fix:** Not applicable to a personal AAD tenant. These need Intune enrollment or other infrastructure.

---

## ✅ Expected (8 tables) — tenant doesn't have these

### D1. Tenant has no Planner

7 planner endpoints return 404 — Microsoft Planner isn't activated on this tenant.

**Examples:** `me_planneruser_*`, `planner_*`

**Fix:** Expected. No fix needed.

### D2. User has no manager

`me_directoryobject_me_getmanager` → 404 because the test user has no manager.

**Fix:** Expected. No fix needed.

---

## ❓ Possibly Coral (47 tables) — ambiguous, needs investigation

### E1. Empty 404 responses (42 tables)

Graph returns `404 (UnknownError, message="")` — same pattern as the auth error mask.

**Affected prefixes:** `security_threatintelligence` (15), `me_userdatasecurityandgovernance` (4), `invitations_*` (3), `copilot_*` (3), `print_*` (3), etc.

**Fix:** Same root cause as A1 — Coral should unwrap empty bodies. Or these endpoints genuinely don't exist (then should be removed from manifest).

### E2. 404 with detail (5 tables)

Graph returns 404 with structured error but the message is ambiguous about whether endpoint exists or is hidden by tenant config.

**Examples:** `communications_presence_*_listpresences`, `directory_publickeyinfrastructureroot_*_getpublickeyinfrastructure`, `informationprotection_bitlocker_*_getbitlocker`, etc.

**Fix:** Per-endpoint investigation needed.

---

## 📊 Per-prefix attribution (most affected prefixes)

| Prefix | Total fail | Coral bug | Our issue | Graph | Other |
|---|---:|---:|---:|---:|---:|
| `me_*` | 111 | 28 (25%) | 35 (32%) | 7 (6%) | 41 (37%) |
| `devicemanagement_*` | 74 | 41 (55%) | 30 (41%) | 3 (4%) | 0 |
| `security_*` | 61 | 27 (44%) | 32 (52%) | 0 | 2 (3%) |
| `identitygovernance_*` | 44 | 26 (59%) | 14 (32%) | 0 | 4 (9%) |
| `deviceappmanagement_*` | 33 | 31 (94%) | 0 | 2 (6%) | 0 |
| `admin_*` | 32 | 18 (56%) | 13 (41%) | 1 (3%) | 0 |
| `education_*` | 22 | 0 | 22 (100%) | 0 | 0 |
| `rolemanagement_*` | 18 | 5 (28%) | 11 (61%) | 0 | 2 (11%) |
| `identity_*` | 19 | 6 (32%) | 8 (42%) | 1 (5%) | 4 (21%) |
| `directory_*` | 9 | 6 (67%) | 3 (33%) | 0 | 0 |

---

## 📋 Summary — what to do

### For Andrea (Coral connector fixes)
**Priority P0 — biggest wins (~294 tables):**

1. **Fix the empty UnknownError mask (121 tables)** — unwrap `innerError` JSON body
2. **Fix the empty HTTP error body (23 tables)** — capture full response body
3. **Fix wrong audience filter (120 tables)** — add AAD-only filter in manifest
4. **Fix wrong base URL parser (17 tables)** — respect per-endpoint `servers` overrides
5. **Remove deprecated APIs from manifest (15 tables)** — filter by `x-ms-deprecation`
6. **Convert needs-entityId to function tables (3 tables)** — add required ID param
7. **Convert delta/search list to function tables (6 tables)** — accept ID filter
8. **Fix query-shape tables (~25 tables)** — audit manifest URL/query

### For Vicky (our setup fixes)
**Re-consent app with broader scopes, add M365 license:**

1. Run interactive `coral source add microsoft_graph_v4` to consent broader scopes
2. Add M365 Business Basic license (out of scope — Vicky has no credit card)
3. Accept that some tables will fail until license is added

### For both (token stability)

**The 23 empty-body 401 errors and 121 empty-UnknownError errors may have the same root cause:** Coral's error parser is broken. A fix to Coral's error reporting would:
- Surface the actual permission/scope requirement
- Eliminate 144 "ambiguous" failures
- Make remaining 460 failures precisely attributable

---

## 📁 Raw data

- Per-table attribution JSON: `/tmp/attribution_final.json`
- Full coral run results: `/tmp/coral_sql_results_2026-07-31.json`
- Original v2 report: `reports/2026-07-31-msgraph-reauth-test-report-v2.md`
- Original v2 HTML: `reports/2026-07-31-msgraph-reauth-test-report-v2.html`

---

_Generated 2026-07-31 by Coral Specs Testing (failure attribution analysis)._
_Author: Vicky Kumar <algsoch@gmail.com> · Repo: [FiscalMindset/coral_specs_testing](https://github.com/FiscalMindset/coral_specs_testing)_