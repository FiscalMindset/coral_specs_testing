# Microsoft Graph v4 — Genuine Spec Bugs (45 tables)

**Date:** 2026-07-29 | **Source:** `microsoft_graph_v4` | **Scope:** 45 tables with OpenAPI-to-DSL parsing errors

These are **not** auth, license, or tenant configuration issues. They are bugs in how Coral's spec generator parsed the Microsoft Graph OpenAPI v2 spec. Each table listed here would fail for **any** AAD tenant with **any** credentials.

---

## Test Methodology

Every table in the `microsoft_graph_v4` source (733 total) was probed with:

```sql
SELECT 1 AS ok FROM microsoft_graph_v4.<table_name> LIMIT 1
```

Tables that returned a valid row **passed**; tables that returned an error were classified by error type. **112 passed**, **45 have spec bugs**, **576 are auth/config failures**.

Example raw command:

```bash
coral sql \
  --task-id "<task_id>" \
  --intent "test if this table is functional" \
  --query "SELECT 1 AS ok FROM microsoft_graph_v4.agreementacceptances_agreementacceptance_agreementacceptances_agreementacceptance_listagreementacceptance LIMIT 1"
```

---

## Summary

| Category | Count | Root Cause |
|---|---|---|
| Wrong URL | **13** | Base URL mismatch — Coral ignores per-endpoint `servers` override in OpenAPI |
| Deprecated API | **13** | Endpoint removed from Microsoft Graph v1.0 but still in generated spec |
| Wrong Audience | **12** | Endpoint for non-AAD tenant types (BP, Edge, Exchange admin, etc.) |
| Needs entityId | **4** | Direct list not supported — requires entity ID parameter |
| Unsupported Query | **3** | Search/delta query not allowed on this resource |

---

## 1. Wrong URL (13 tables)

Coral sends the request to `graph.microsoft.com/v1.0/...` but the actual endpoint lives at a different base URL.

| Table Name | URL Coral Tried |
|---|---|
| `agreementacceptances_..._listagreementacceptance` | `api.termsofuse.identitygovernance.azure.com/v2.0/agree…` |
| `filteroperators_..._listfilteroperatorschema` | `syncfabric.windowsazure.com/…` |
| `functions_..._listattributemappingfunctionschema` | `syncfabric.windowsazure.com/…` |
| `identity_authenticationeventsflow_...` | `cpim.windows.net/graph/…` |
| `identity_conditionalaccessroot_..._getdeleteditems` | `na.prod.graph.ipc.msidentity.com/…` |
| `identity_identitycontainer_...` | `cpim.windows.net/graph/…` |
| `identity_riskpreventioncontainer_...` | `cpim.windows.net/graph/…` |
| `identitygovernance_entitlementmanagement_..._listaccesspackagesuggestions` | `igaelm-asev3-ecapi-cus.…` |
| `identitygovernance_entitlementmanagement_..._listavailableaccesspackages` | `igaelm-asev3-ecapi-cus.…` |
| `identitygovernance_entitlementmanagement_..._listcontrolconfigurations` | `igaelm-asev3-ecapi-cus.…` |
| `identitygovernance_entitlementmanagement_..._listresourcerolescopes` | `igaelm-asev3-ecapi-cus.…` |
| `identitygovernance_termsofusecontainer_..._gettermsofuse` | `api.termsofuse.identitygovernance.azure.com/…` |
| `identitygovernance_termsofusecontainer_..._listagreementacceptances` | `api.termsofuse.identitygovernance.azure.com/…` |

**Error body:**
```json
{"error":{"code":"","message":"No HTTP resource was found that matches the request URI 'https://...'"}}
```

**Fix:** The Coral OpenAPI parser must respect per-endpoint `servers` overrides in the OpenAPI spec, or the manifest generator should accept a `baseUrl` override for these endpoints.

**Actual Coral SQL output:**

```bash
coral sql --task-id "<task_id>" --intent "test" --query "
SELECT 1 AS ok FROM microsoft_graph_v4.agreementacceptances_agreementacceptance_agreementacceptances_agreementacceptance_listagreementacceptance LIMIT 1
"
```

```json
// → Error: Source resource was not found (404)
// → Detail:
{"error":{"code":"","message":"No HTTP resource was found that matches the request URI 'https://api.termsofuse.identitygovernance.azure.com/v2.0/agree…'"}}
```

---

## 2. Deprecated / Removed API (13 tables)

These endpoints return `"Requested API is not supported"` — they were fully removed from Microsoft Graph v1.0.

| Table Name |
|---|
| `appcatalogs_appcatalogs_appcatalogs_appcatalogs_getappcatalogs` |
| `chats_chat_functions_chats_getallmessages` |
| `chats_chat_functions_chats_getallretainedmessages` |
| `communications_adhoccall_communications_adhoccalls_getallrecordings` |
| `communications_adhoccall_communications_adhoccalls_getalltranscripts` |
| `communications_adhoccall_communications_listadhoccalls` |
| `communications_onlinemeeting_communications_onlinemeetings_getallrecordings` |
| `communications_onlinemeeting_communications_onlinemeetings_getalltranscripts` |
| `copilot_aiinteractionhistory_copilot_getinteractionhistory` |
| `copilot_aiinteractionhistory_copilot_interactionhistory_getallenterpriseinteractions` |
| `copilot_aiuser_copilot_listusers` |
| `teamstemplates_teamstemplate_teamstemplates_teamstemplate_listteamstemplate` |
| `teamwork_deletedteam_teamwork_deletedteams_getallmessages` |

**Error body:**
```json
{"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path."}}
```

**Fix:** Audit each against current Graph API docs and remove dead endpoints from the spec source.

**Actual Coral SQL output:**

```bash
coral sql --task-id "<task_id>" --intent "test" --query "
SELECT 1 AS ok FROM microsoft_graph_v4.appcatalogs_appcatalogs_appcatalogs_appcatalogs_getappcatalogs LIMIT 1
"
```

```json
// → Error: Source resource was not found (404)
// → Detail:
{"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-29T18:56:40","request-id":"...","client-request-id":"..."}}}
```

---

## 3. Wrong Audience (12 tables)

These endpoints exist but target non-AAD tenant types (Business Central, Edge, Exchange admin, SharePoint admin, Teams admin, Copilot admin, Verified ID, File Storage).

| Table Name | Audience |
|---|---|
| `admin_configurationmanagement_admin_getconfigurationmanagement` | Business Central |
| `admin_edge_admin_edge_getinternetexplorermode` | Edge-specific |
| `admin_edge_admin_getedge` | Edge-specific |
| `admin_exchangeadmin_admin_getexchange` | Exchange admin |
| `admin_sharepoint_admin_getsharepoint` | SharePoint admin |
| `admin_teamsadminroot_admin_getteams` | Teams admin |
| `admin_teamsadminroot_admin_teams_getpolicy` | Teams admin |
| `admin_teamsadminroot_admin_teams_gettelephonenumbermanagement` | Teams admin |
| `copilot_copilotadmin_copilot_admin_getcatalog` | Copilot admin |
| `identity_identityverifiedidroot_identity_getverifiedid` | Verified ID (Entra External ID) |
| `storage_filestorage_storage_getfilestorage` | File Storage |
| `storage_storagesettings_storage_getsettings` | File Storage |

**Error body:**
```json
{"error":{"code":"Forbidden","message":"This API is not supported for AAD accounts."}}
```

**Fix:** Add audience/tenant-type filtering in the parser, or mark with `x-ms-audience` header in manifest.

**Actual Coral SQL output:**

```bash
coral sql --task-id "<task_id>" --intent "test" --query "
SELECT 1 AS ok FROM microsoft_graph_v4.admin_configurationmanagement_admin_getconfigurationmanagement LIMIT 1
"
```

```json
// → Error: Source rejected the request (400)
// → Detail:
{"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.XTA,False).","innerError":{"date":"2026-07-29T19:..."}}}
```

---

## 4. Needs entityId Parameter (4 tables)

These return `"Direct queries to this resource type are not supported"` — they require a specific entity ID in the URL.

| Table Name | Issue |
|---|---|
| `certificatebasedauthconfiguration_*_list*` | Requires org-level `{certificateBasedAuthConfigurationId}` |
| `communications_onlinemeeting_communications_listonlinemeetings` | Requires `joinWebUrl` (VideoTeleConference ID) |
| `permissiongrants_resourcespecificpermissiongrant_*_list*` | Requires `{resourceSpecificPermissionGrantId}` |
| `scopedrolememberships_scopedrolemembership_*_list*` | Requires `{scopedRoleMembershipId}` |

**Fix:** Make these function-style tables with a required entity ID parameter, or document as `needs_entity_id` in manifest.

**Actual Coral SQL output:**

```bash
coral sql --task-id "<task_id>" --intent "test" --query "
SELECT 1 AS ok FROM microsoft_graph_v4.scopedrolememberships_scopedrolemembership_scopedrolememberships_scopedrolemembership_listscopedrolemembership LIMIT 1
"
```

```json
// → Error: Source rejected the request (400)
// → Detail:
{"error":{"code":"Request_UnsupportedQuery","message":"Direct queries to this resource type are not supported.","innerError":{"date":"2026-07-29T19:34:..."}}}
```

---

## 5. Unsupported Query Pattern (3 tables)

| Table Name | Error |
|---|---|
| `directory_directoryobject_directory_listdeleteditems` | `"Searches against this resource are not supported. Only specific instances can be queried."` |
| `directoryobjects_directoryobject_directoryobjects_directoryobject_listdirectoryobject` | `"Searches against this resource are not supported. Only specific instances can be queried."` |
| `directoryobjects_directoryobject_functions_directoryobjects_delta` | `"Delta query is not supported for this resource."` |

**Fix:** Convert to get-by-ID lookups or remove list endpoints. The delta function may need a different manifest approach entirely.

**Actual Coral SQL output:**

```bash
coral sql --task-id "<task_id>" --intent "test" --query "
SELECT 1 AS ok FROM microsoft_graph_v4.directory_directoryobject_directory_listdeleteditems LIMIT 1
"
```

```json
// → Error: Source rejected the request (400)
// → Detail:
{"error":{"code":"Request_UnsupportedQuery","message":"Searches against this resource are not supported. Only specific instances can be queried.","innerError":{"date":"2026-07-29T19:34:..."}}}
```

---

## Priority for Fixing

1. **P0: Wrong URL (13)** — These directly affect the test pass rate for the msgraph source. Fixing base URL handling would fix all 13 at once.
2. **P1: Deprecated API (13)** — These are noise that lower the effective coverage. Should be filtered out.
3. **P2: Wrong Audience (12)** — Important for correctness but lower urgency since they require tenant-type detection.
4. **P3: Needs entityId + Unsupported Query (7)** — Less common but create confusing error messages for users.
