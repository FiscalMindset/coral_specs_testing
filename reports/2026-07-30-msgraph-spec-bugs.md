# Microsoft Graph v4 — Genuine Spec Bugs (45 tables)

**Date:** 2026-07-30 | **Source:** `microsoft_graph_v4` | **Scope:** 45 tables with OpenAPI-to-DSL parsing errors | **Last updated:** 2026-08-01 (root-cause verification against live spec)

These are **not** auth, license, or tenant configuration issues. They are bugs in how Coral's spec generator parsed the Microsoft Graph OpenAPI v2 spec. Each table listed here would fail for **any** AAD tenant with **any** credentials.

> **Update 2026-08-01 — root-cause verification.** The live Graph v1.0
> `openapi.yaml` (36 MB, fetched 2026-08-01) was inspected to verify the
> claimed root causes. The spec contains **one top-level server
> (`https://graph.microsoft.com/v1.0`) and no per-operation `servers`
> overrides**, and **no `x-ms-audience` fields**. The "deprecated" tables
> (e.g. `appCatalogs.appCatalogs.GetAppCatalogs`) are still present in the
> v1.0 spec and are **not flagged `deprecated: true`** (only 79 operations in
> the whole spec are). Coral 0.8.1 therefore imported the document
> faithfully — these 45 failures are **Graph-service realities that the
> OpenAPI metadata does not encode** (host routing, retired endpoints,
> tenant-type restrictions, entity-scoped resources, query restrictions),
> not parser bugs the generator could avoid automatically. Fixes require
> curated per-operation overrides or a trimmed document, not a parser change
> alone. See the corrected root-cause notes per section and the Solution
> section at the end.

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

| Category | Count | Root Cause (corrected 2026-08-01) |
|---|---|---|
| Wrong URL | **13** | Spec has a single server and **no per-op `servers` override** — real hosts are external knowledge |
| Deprecated API | **13** | Spec still ships ops Graph has retired; **not flagged `deprecated`** |
| Wrong Audience | **12** | Spec has **no audience metadata**; AAD-only source can't reach them |
| Needs entityId | **4** | Spec models as plain lists; entity-ID requirement is Graph-side |
| Unsupported Query | **3** | Runtime query restrictions, not spec data |

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

**Fix (corrected 2026-08-01):** The spec contains **no** per-operation `servers` overrides — the only server is `https://graph.microsoft.com/v1.0`, so a parser change cannot recover the real hosts. These endpoints live on separate services (`api.termsofuse.identitygovernance.azure.com`, `syncfabric.windowsazure.com`, `cpim.windows.net`, `igaelm-…`) — knowledge that exists only in Microsoft's docs. Reaching them requires a **curated per-operation `base_url` override map** (a coral feature built from Microsoft docs) or removing the 13 tables. Not expressible in the current DSL v4 manifest (single `base_url` per surface).

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

**Fix (corrected 2026-08-01):** These operations are **still present and unmarked** (`deprecated: true` absent) in the v1.0 spec, so a "filter deprecated" parser change would not remove them. The Graph metadata repo is stale relative to the live service. Fix = curated operation **denylist** (coral feature) or a trimmed local document.

**Actual Coral SQL output:**

```bash
coral sql --task-id "<task_id>" --intent "test" --query "
SELECT 1 AS ok FROM microsoft_graph_v4.appcatalogs_appcatalogs_appcatalogs_appcatalogs_getappcatalogs LIMIT 1
"
```

```json
// → Error: Source resource was not found (404)
// → Detail:
{"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-30T18:56:40","request-id":"...","client-request-id":"..."}}}
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

**Fix (corrected 2026-08-01):** The spec has **no `x-ms-audience` metadata**, so audience cannot be detected or filtered automatically. Fix = curated denylist/tag for these 12, or removal — they are unusable against a standard work/school AAD account anyway.

**Actual Coral SQL output:**

```bash
coral sql --task-id "<task_id>" --intent "test" --query "
SELECT 1 AS ok FROM microsoft_graph_v4.admin_configurationmanagement_admin_getconfigurationmanagement LIMIT 1
"
```

```json
// → Error: Source rejected the request (400)
// → Detail:
{"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.XTA,False).","innerError":{"date":"2026-07-30T19:..."}}}
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

**Fix (corrected 2026-08-01):** The spec models these as plain collection GETs; the entity-ID requirement is Graph-side behavior not present in the metadata. Fix = a per-operation required-input override (coral feature) or removal.

**Actual Coral SQL output:**

```bash
coral sql --task-id "<task_id>" --intent "test" --query "
SELECT 1 AS ok FROM microsoft_graph_v4.scopedrolememberships_scopedrolemembership_scopedrolememberships_scopedrolemembership_listscopedrolemembership LIMIT 1
"
```

```json
// → Error: Source rejected the request (400)
// → Detail:
{"error":{"code":"Request_UnsupportedQuery","message":"Direct queries to this resource type are not supported.","innerError":{"date":"2026-07-30T19:34:..."}}}
```

---

## 5. Unsupported Query Pattern (3 tables)

| Table Name | Error |
|---|---|
| `directory_directoryobject_directory_listdeleteditems` | `"Searches against this resource are not supported. Only specific instances can be queried."` |
| `directoryobjects_directoryobject_directoryobjects_directoryobject_listdirectoryobject` | `"Searches against this resource are not supported. Only specific instances can be queried."` |
| `directoryobjects_directoryobject_functions_directoryobjects_delta` | `"Delta query is not supported for this resource."` |

**Fix (corrected 2026-08-01):** Search/delta restrictions are Graph runtime behavior, not spec data. Fix = remove the 3 tables, or add runtime delta/search support (coral feature).

**Actual Coral SQL output:**

```bash
coral sql --task-id "<task_id>" --intent "test" --query "
SELECT 1 AS ok FROM microsoft_graph_v4.directory_directoryobject_directory_listdeleteditems LIMIT 1
"
```

```json
// → Error: Source rejected the request (400)
// → Detail:
{"error":{"code":"Request_UnsupportedQuery","message":"Searches against this resource are not supported. Only specific instances can be queried.","innerError":{"date":"2026-07-30T19:34:..."}}}
```

---

## Solution (2026-08-01)

The 45 tables **cannot be fixed by editing the `microsoft_graph_v4` manifest** (DSL v4 exposes a single `base_url` per surface, surface-wide headers, and no operation filtering), and the OpenAPI spec provides no per-operation metadata to fix them automatically. Two workable options:

1. **Trim the document (no Rust, fastest).** Vendor a corrected copy of the Graph v1.0 `openapi.yaml` into the source as `file:` with the 45 buggy operations deleted. The remaining ~700 tables all become genuine. Cost: the source diverges from upstream Graph metadata until coral supports filtering.
2. **Per-operation override feature (Rust in `coral-spec`/`coral-engine`).** Add an optional per-operation map to the DSL v4 openapi surface, e.g. `operations: <id>: { base_url, headers, enabled, required_inputs }`, seeded with curated data for these 45 (hosts from Microsoft docs, retired ops disabled, audience-specific ops tagged). Requires a coral CLI release to take effect in this test environment.

**Recommended:** keep the P0–P3 priority, but reframe from "parser must respect servers/x-ms-audience" (not implementable as written) to "coral needs a curated per-operation override capability".

## Priority for Fixing

1. **P0: Wrong URL (13)** — These directly affect the test pass rate for the msgraph source. Requires curated per-op `base_url` data (or removing the 13).
2. **P1: Deprecated API (13)** — Noise that lowers effective coverage. Remove via denylist or trimmed doc.
3. **P2: Wrong Audience (12)** — Correctness concern; unusable against a work/school AAD account, so removal is safe.
4. **P3: Needs entityId + Unsupported Query (7)** — Remove or convert; confusing errors for users.
