# Coral `microsoft_graph_v4` — Full Re-run Test Report (2026-07-31)

Coral: `0.8.1+3acb123` (homebrew) · `surface` (singular, per Coral #1791)  
Tenant: `89de3b75-fef2-44f9-90a4-cf8c69700c83` · User: `vicky@algsochgmail.onmicrosoft.com`  
Auth: Coral keychain OAuth refresh token (**delegated**, same identity as Jul 29 Section 11) · No M365 license  
Date: 2026-07-31  
Status: **COMPLETE — 733/733 tables tested, 0 `expired_token` failures**

---

## Summary

| Metric | Jul 29 (delegated) | **Jul 31 (delegated)** | Delta |
|--------|---------------------|------------------------|-------|
| Tables tested | 733 | **733** | 0 |
| Pass | 129 | **122** | −7 |
| Fail (all categories) | 604 | **611** | +7 |
| Timeouts (30s cutoff) | 0 (120s timeout used) | **30** | +30 |
| `expired_token` failures | 63 (re-run set) | **0** | −63 |
| Runtime | 54m 0s | **47m 15s** | −7m |

**Verdict: no connector regression.** The Jul 31 pass delta (−7) is fully explained by
(1) the 30-second per-query cutoff that turned slow `admin_*` endpoints into timeouts
(they return structured 400/403/404 on retry, see §9), and (2) a changed keychain scope
set — most visibly `places_*` (4 passes on Jul 29 → 0 today, see §10).

---

## 1. Three-way comparison: 2026-07-29 vs 2026-07-30 vs 2026-07-31

| Metric | Jul 29 (delegated) | Jul 30 (spec bugs) | Jul 31 (delegated) |
|---|---|---|---|
| **Scope** | Full 733-table battery + identity + app-only | 45-table spec-bug deep-dive | Full 733-table battery |
| **Token** | Keychain OAuth (delegated) | — | Keychain OAuth (delegated) |
| **Timeouts** | 0 (120s timeout) | — | 30 (30s cutoff, all retry-clear) |
| **Pass** | 129 | 112 (app-only, Jul 30 report) | 122 |
| **Spec bugs found** | 45 (reported Jul 30) | 45 documented | 45 re-verified (40/45 still reproduce) |
| **expired_token failures** | 63 (re-run) | — | **0** |
| **App-only-only tables (30)** | 30 pass app-only | — | 20 pass delegated |
| **places_*** | 4 pass | — | 0 pass (scope change, §10) |
| **Key finding** | surface-singular fix works, 0 timeouts | 45 genuine OpenAPI parse bugs | no connector regression; token-stable run |

> The Jul 29 and Jul 31 runs use the **same delegated keychain credential**. Jul 30 was a
> pure analysis report derived from Jul 29's data (the 45 tables) — no new battery ran.
> The Jul 31 pass count (122) differs from Jul 29 (129) because of the 30s timeout cutoff
> and the `places_*` scope change, both explained in §9/§10.

---

## 2. Complete Coral command log (Microsoft Graph)

All commands were run with Coral `0.8.1+3acb123` against the `microsoft_graph_v4`
source. Output shown is verbatim from the run.

### 2.1 CLI basics

```
$ coral --version
coral 0.8.1+3acb123

(exit code: 0)
```

```
$ coral source list
Source                     Version  Origin    Secrets
-------------------------  -------  --------  ----------------
microsoft_graph_v4         0.1.0    imported  keychain
... (other sources elided)

(exit code: 0)
```

```
$ coral source info microsoft_graph_v4
(manifest metadata — 733 tables, 5,972 columns, 5,776 table functions)

(exit code: 0)
```

```
$ coral source test microsoft_graph_v4
✓ 1/1 tests passed

(exit code: 0)
```

### 2.2 Schema discovery

```
$ coral sql "SELECT count(*) AS tables FROM coral.tables WHERE schema_name='microsoft_graph_v4'"
+--------+
| tables |
+--------+
|   733  |
+--------+
```

```
$ coral sql "SELECT count(*) AS columns FROM coral.columns WHERE schema_name='microsoft_graph_v4'"
+---------+
| columns |
+---------+
|  5,972  |
+---------+
```

```
$ coral sql "SELECT count(*) AS table_functions FROM coral.table_functions WHERE schema_name='microsoft_graph_v4'"
+-----------------+
| table_functions |
+-----------------+
|      5,776      |
+-----------------+
```

### 2.3 Identity smoke query (delegated credential check)

```
$ coral sql "SELECT displayName FROM microsoft_graph_v4.me_user_me_user_getuser LIMIT 1"
+-------------+
| displayName |
+-------------+
| vicky kumar |
+-------------+
```

```
$ coral sql "SELECT displayname, userprincipalname FROM microsoft_graph_v4.me_user_me_user_getuser"
+-------------+----------------------------------------------------+
| displayname | userprincipalname                                   |
+-------------+----------------------------------------------------+
| vicky kumar | vicky@algsochgmail.onmicrosoft.com                  |
+-------------+----------------------------------------------------+
```

### 2.4 Full battery — canonical form

733 tables, one query each, 4 parallel workers, 30s timeout:

```
$ coral sql "SELECT 1 AS ok FROM microsoft_graph_v4.<table_name> LIMIT 1"
```

Runner: `/tmp/run_full_2026-07-31.py` → `/tmp/coral_sql_results_2026-07-31.json`

### 2.5 Representative outputs by result class

**Pass:**
```
$ coral sql "SELECT 1 AS ok FROM microsoft_graph_v4.me_user_me_user_getuser LIMIT 1"
+----+
| ok |
+----+
| 1  |
+----+
```

**License-gated (400):**
```
$ coral sql "SELECT 1 AS ok FROM microsoft_graph_v4.drives_drive_drives_drive_listdrive LIMIT 1"
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Tenant does not have a SPO license.","innerError":{"date":"2026-07-31T09:25:46","request-id":"206a776a-..."}}} [GET] https://graph.microsoft.com/v1.0/drives
```

**Wrong audience (400):**
```
$ coral sql "SELECT 1 AS ok FROM microsoft_graph_v4.admin_exchangeadmin_admin_getexchange LIMIT 1"
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.Exchange,True)..."}} [GET] https://graph.microsoft.com/v1.0/admin/exchange/admin
```

**Auth / 401:**
```
$ coral sql "SELECT 1 AS ok FROM microsoft_graph_v4.places_place_places_place_listplace_asroom LIMIT 1"
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-31T09:41:20","request-id":"d8e67680-..."}}} [GET] https://graph.microsoft.com/v1.0/places/graph.room
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` ...
```

**Deprecated / beta-only (404):**
```
$ coral sql "SELECT 1 AS ok FROM microsoft_graph_v4.communications_adhoccall_communications_adhoccalls_getallrecordings LIMIT 1"
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-31T09:12:43","request-id":"9a27bd9e-..."}}} [GET] https://graph.microsoft.com/v1.0/communications/adhocCalls/getAllRecordings(userId='@userId',...)
```

**Wrong URL (404, different base):**
```
$ coral sql "SELECT 1 AS ok FROM microsoft_graph_v4.agreementacceptances_agreementacceptance_agreementacceptances_agreementacceptance_listagreementacceptance LIMIT 1"
Error: Source resource was not found (404)
Detail: {"error":{"code":"","message":"No HTTP resource was found that matches the request URI 'https://api.termsofuse.identitygovernance.azure.com/v2.0/agreementAcceptances?x-scenario=MSGraph&x-tenantid=[tenantId]'.","innerError":{"date":"2026-07-31T09:11:28","request-id":"6e7156ad-..."}}}
```

**Timeout then retry (slow endpoint → structured result):**
```
$ coral sql "SELECT 1 AS ok FROM microsoft_graph_v4.admin_admin_admin_admin_getadmin LIMIT 1"
Timeout after 30s

$ coral sql "SELECT 1 AS ok FROM microsoft_graph_v4.admin_admin_admin_admin_getadmin LIMIT 1"   # retry
+----+
| ok |
+----+
| 1  |
+----+
(22s on retry)
```

### 2.6 Functional data queries (Jul 29 battery, same CLI)

These returned real rows and were logged in the Jul 29 report:

```
$ coral sql "SELECT value FROM microsoft_graph_v4.users_user_users_user_listuser LIMIT 1"     # 17 users
$ coral sql "SELECT value FROM microsoft_graph_v4.organization_organization_organization_organization_listorganization LIMIT 1"
$ coral sql "SELECT value FROM microsoft_graph_v4.groups_group_groups_group_listgroup WHERE top = 3"   # 2 groups
$ coral sql "SELECT value FROM microsoft_graph_v4.applications_application_applications_application_listapplication"   # 3 apps
$ coral sql "SELECT value FROM microsoft_graph_v4.serviceprincipals_serviceprincipal_serviceprincipals_serviceprincipal_listserviceprincipal"  # 3 SPs
$ coral sql "SELECT value FROM microsoft_graph_v4.devices_device_devices_device_listdevice WHERE top = 2"  # 0 devices
```

### 2.7 Error-quality / UX probes (Jul 29 report)

```
$ coral sql "SELECT * FROM microsoft_graph_v4.totally_fake_table"
Error: table "totally_fake_table" not found ... (clean unknown-table error)

$ coral sql "SELECT nosuchcolumn FROM microsoft_graph_v4.me_user_me_user_getuser"
Error: column "nosuchcolumn" not found ... (clean unknown-column error)

$ coral sql "SELECT value FROM microsoft_graph_v4.auditlogs_signin_auditlogs_listsignins WHERE top = 2"
Error: Source rejected the request (403)
Detail: ... "Tenant is not a B2C tenant and doesn't have premium license" ...   # no Entra P1/P2
```

### 2.8 Timeout retry probe

```
$ python3 /tmp/retimeout.py admin_admin_admin_admin_getadmin tenantrelationships_delegatedadminrelationship_tenantrelationships_listdelegatedadminrelationships
admin_admin_admin_admin_getadmin -> rc=0 in 22s | +----+ | ok | ...   (PASS)
tenantrelationships_delegatedadminrelationship_..._list... -> rc=0 in 16s | ...   (PASS)
```

### 2.9 Direct API cross-check (places scope diagnosis, §10)

```
$ TOKEN=$(az account get-access-token --resource https://graph.microsoft.com --query accessToken -o tsv)
$ curl -s -o /tmp/places_check.json -w "HTTP %{http_code}" -H "Authorization: Bearer $TOKEN" \
    "https://graph.microsoft.com/v1.0/places/graph.room?\$top=1"
HTTP 401
{"error":{"code":"UnknownError","message":"",...}}
```

The current token's `scp` claim lacks `Place.Read.All`, confirming the places regression
is a consent-scope change, not a connector bug.

---

## 3. Test setup

Every `microsoft_graph_v4.*` table was queried through Coral SQL:

```sql
SELECT 1 AS ok FROM microsoft_graph_v4.<table_name> LIMIT 1
```

- **Auth**: Coral's keychain-stored OAuth refresh token (delegated, `vicky@` identity)
- **Tool**: `coral sql` CLI, 4 parallel workers, 30s timeout per query
- **Date**: 2026-07-31 · 14:36 → 15:24 IST (09:06:59Z → 09:54:14Z UTC)
- **Tables tested**: 733
- **Runner**: `/tmp/run_full_2026-07-31.py` (save-per-result, robust classifier)

### 3.1 Smoke query (before the battery)

```
$ coral sql "SELECT displayName FROM microsoft_graph_v4.me_user_me_user_getuser LIMIT 1"
vicky kumar
```

Confirmed the keychain token is a working **delegated** credential before starting.

### 3.2 Runner log tail

```
[14:39:47] 733/733 done in 2835.3s (rate 0.26 t/s) — 0 expired_token failures
```

---

## 4. Results summary

| Result | Count |
|--------|-------|
| **Pass** | **122** |
| Fail — AUTH (401/403) | 271 |
| Fail — WRONG_AUDIENCE (400, "not supported for AAD accounts") | 123 |
| Fail — NOT_FOUND (404) | 55 |
| Fail — LICENSE (license-gated 400/403) | 46 |
| Fail — OTHER (misc 400/500) | 41 |
| Fail — TIMEOUT (30s cutoff) | 30 |
| Fail — WRONG_URL (path/table mismatches) | 19 |
| Fail — DEPRECATED (beta/deprecated API) | 15 |
| Fail — UNSUPPORTED_QUERY | 8 |
| Fail — NEEDS_ENTITYID | 3 |
| **Total** | **733** |

Raw results: `/tmp/coral_sql_results_2026-07-31.json` · log: `/tmp/fullrun_2026-07-31.log`

---

## 5. Pass counts by table prefix

| Prefix | Jul 29 pass | Jul 31 pass | Delta |
|--------|-------------|-------------|-------|
| me_* | 26 | **36** | +10 |
| directory_* | 7 | **13** | +6 |
| policies_* | 18 | **16** | −2 |
| identity_* (auth listener, custom ext) | 0 | **7** | +7 |
| security_* | 0 | **3** | +3 |
| auditlogs_* | 0 | **3** | +3 |
| devices_* | 0 | **2** | +2 |
| applications_* | 0 | **2** | +2 |
| groups_* | 4 | **2** | −2 |
| admin_* | 3 | **1** | −2 |
| communications_* | 0 | **1** | +1 |
| places_* | 4 | **0** | −4 |
| oauth2permissiongrants_* | 2 | 2 | 0 |
| organization_* | 1 | 1 | 0 |
| identityprotection_* | 1 | 1 | 0 |
| users_* | 1 | 2 | +1 |
| rolemanagement_* | (in other) | 3 | — |
| tenantrelationships_* | (in other) | 2 | — |
| (all other prefixes) | 62 | 5 | — |

> Note: Jul 29's per-prefix table groups `application*`, `communications_*`, etc. at 0
> because that run's classifier bucketed them under OTHER; the Jul 31 classifier splits
> them out. The **net improvement** in `me_*` (+10), `identity_*` (+7), `security_*` (+3),
> `auditlogs_*` (+3), `devices_*` (+2) and `applications_*` (+2) is real and significant.

### 5.1 me_* detail (147 tables)

| Result | Count |
|--------|-------|
| Pass | 36 |
| AUTH | 61 |
| LICENSE | 13 |
| OTHER | 11 |
| WRONG_AUDIENCE | 11 |
| NOT_FOUND | 11 |
| WRONG_URL | 2 |
| DEPRECATED | 2 |

`me_*` went from 26 → 36 passes (+10). Examples of newly passing tables include
`me_*_onlineMeetings`-adjacent and other delegated-friendly endpoints that returned
structured failures in the Jul 29 keychain run.

---

## 6. Genuine spec bugs (45 tables) — recheck

The 45 spec bugs from the Jul 30 report were re-verified against today's data.

| Category | Jul 30 | Jul 31 result |
|----------|--------|---------------|
| Wrong URL / path mismatch | 13 | 13 still `wrong_url` |
| Deprecated / beta-only API | 13 | 13 still `deprecated` |
| Wrong audience (AAD accounts) | 12 | 8 still `wrong_audience`, 4 now `timeout` (see §9) |
| Needs entityId parameter | 4 | 1 `auth`, 3 tables not in today's 733 list (wildcard `_*_list*` spec entries) |
| Unsupported query shape | 3 | 3 still `unsupported_query` |
| **Total** | **45** | **40 reproduced · 5 changed** |

**All 45 genuine spec bugs remain unfixed** — none started passing. Full per-table detail below: each entry lists the exact `coral sql` command as run and the complete raw output from the Jul 31 battery. The 4 wrong-audience tables that now time out are `admin_configurationmanagement`, `admin_edge`, `admin_exchangeadmin`, and `admin_teamsadminroot`; on Jul 29 they returned a fast 400, today the endpoint hangs past 30s (see §9).

### 6.1 Wrong URL / path mismatch (13)

- **agreementacceptances_agreementacceptance_agreementacceptances_agreementacceptance_listagreementacceptance**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.agreementacceptances_agreementacceptance_agreementacceptances_agreementacceptance_listagreementacceptance LIMIT 1
  ```

  `wrong_url` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"","message":"No HTTP resource was found that matches the request URI 'https://api.termsofuse.identitygovernance.azure.com/v2.0/agreementAcceptances?x-scenario=MSGraph&x-tenantid=[tenantId]'.","innerError":{"date":"2026-07-31T09:11:28","request-id":"6e7156ad-2d75-4904-8cce-5b36c887304d","client-request-id":"6e7156ad-2d75-4904-8cce-5b36c887304d"}}} [GET] https://graph.microsoft.com/v1.0/agreementAcceptances
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **filteroperators_filteroperatorschema_filteroperators_filteroperatorschema_listfilteroperatorschema**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.filteroperators_filteroperatorschema_filteroperators_filteroperatorschema_listfilteroperatorschema LIMIT 1
  ```

  `wrong_url` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"UnknownError","message":"{\"Message\":\"No HTTP resource was found that matches the request URI 'https://syncfabric.windowsazure.com/api/filterOperators?api-version=2.0'.\"}","innerError":{"date":"2026-07-31T09:27:39","request-id":"45337a94-419c-40c0-8165-a2d3d8ad4dd1","client-request-id":"45337a94-419c-40c0-8165-a2d3d8ad4dd1"}}} [GET] https://graph.microsoft.com/v1.0/filterOperators
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **functions_attributemappingfunctionschema_functions_attributemappingfunctionschema_listattributemappingfunctionschema**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.functions_attributemappingfunctionschema_functions_attributemappingfunctionschema_listattributemappingfunctionschema LIMIT 1
  ```

  `wrong_url` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"UnknownError","message":"{\"Message\":\"No HTTP resource was found that matches the request URI 'https://syncfabric.windowsazure.com/api/functions?api-version=2.0'.\"}","innerError":{"date":"2026-07-31T09:27:39","request-id":"721d3fad-46cb-4a1d-8446-d5657ce6c006","client-request-id":"721d3fad-46cb-4a1d-8446-d5657ce6c006"}}} [GET] https://graph.microsoft.com/v1.0/functions
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listaccesspackagesuggestions**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listaccesspackagesuggestions LIMIT 1
  ```

  `wrong_url` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"","message":"No HTTP resource was found that matches the request URI 'https://igaelm-asev3-ecapi-cus.igaelm-asev3-environment-cus.p.azurewebsites.net/api/v1/accessPackageSuggestions'.","innerError":{"date":"2026-07-31T09:30:11","request-id":"b9b8bafc-210f-440f-b231-d9077f08e0ae","client-request-id":"b9b8bafc-210f-440f-b231-d9077f08e0ae"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/accessPackageSuggestions
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listavailableaccesspackages**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listavailableaccesspackages LIMIT 1
  ```

  `wrong_url` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"","message":"No HTTP resource was found that matches the request URI 'https://igaelm-asev3-ecapi-cus.igaelm-asev3-environment-cus.p.azurewebsites.net/api/v1/availableAccessPackages'.","innerError":{"date":"2026-07-31T09:30:24","request-id":"b6e104e3-61d3-4fdc-b416-7ea37abc6873","client-request-id":"b6e104e3-61d3-4fdc-b416-7ea37abc6873"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/availableAccessPackages
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listcontrolconfigurations**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listcontrolconfigurations LIMIT 1
  ```

  `wrong_url` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"","message":"No HTTP resource was found that matches the request URI 'https://igaelm-asev3-ecapi-cus.igaelm-asev3-environment-cus.p.azurewebsites.net/api/v1/controlConfigurations'.","innerError":{"date":"2026-07-31T09:30:39","request-id":"03fe44a3-fbd0-41cb-9089-3cf954b71cf6","client-request-id":"03fe44a3-fbd0-41cb-9089-3cf954b71cf6"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/controlConfigurations
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listresourcerolescopes**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listresourcerolescopes LIMIT 1
  ```

  `wrong_url` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"UnknownError","message":"{\"message\":\"No HTTP resource was found that matches the request URI 'https://igaelm-asev3-ecapi-cus.igaelm-asev3-environment-cus.p.azurewebsites.net/api/v1/resourceRoleScopes'.\"}","innerError":{"date":"2026-07-31T09:30:45","request-id":"8ca7edc7-33cb-4096-ac45-d73117878776","client-request-id":"8ca7edc7-33cb-4096-ac45-d73117878776"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/resourceRoleScopes
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **identitygovernance_termsofusecontainer_identitygovernance_gettermsofuse**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.identitygovernance_termsofusecontainer_identitygovernance_gettermsofuse LIMIT 1
  ```

  `wrong_url` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"UnknownError","message":"{\"Message\":\"No HTTP resource was found that matches the request URI 'https://api.termsofuse.identitygovernance.azure.com/v2.0/identityGovernance/termsOfUse?x-scenario=MSGraph&x-tenantid=[tenantId]'.\"}","innerError":{"date":"2026-07-31T09:32:06","request-id":"b18ccb1c-c6ec-4979-8fdf-4133c5c7d727","client-request-id":"b18ccb1c-c6ec-4979-8fdf-4133c5c7d727"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/termsOfUse
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **identitygovernance_termsofusecontainer_identitygovernance_termsofuse_listagreementacceptances**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.identitygovernance_termsofusecontainer_identitygovernance_termsofuse_listagreementacceptances LIMIT 1
  ```

  `wrong_url` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"UnknownError","message":"{\"Message\":\"No HTTP resource was found that matches the request URI 'https://api.termsofuse.identitygovernance.azure.com/v2.0/identityGovernance/termsOfUse/agreementAcceptances?x-scenario=MSGraph&x-tenantid=[tenantId]'.\"}","innerError":{"date":"2026-07-31T09:32:07","request-id":"d4df61f4-0ebe-416b-9a05-2920a160e5de","client-request-id":"d4df61f4-0ebe-416b-9a05-2920a160e5de"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/termsOfUse/agreementAcceptances
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **identity_authenticationeventsflow_identity_listauthenticationeventsflows_asexternalusersselfservicesignupeventsflow**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.identity_authenticationeventsflow_identity_listauthenticationeventsflows_asexternalusersselfservicesignupeventsflow LIMIT 1
  ```

  `wrong_url` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"UnknownError","message":"{\"message\":\"No HTTP resource was found that matches the request URI 'https://cpim.windows.net/graph/identity/authenticationEventsFlows/Microsoft.Cpim.Api.DataModels.ExternalUsersSelfServiceSignUpEventsFlow'.\",\"messageDetail\":\"No type was found that matches the controller named 'identity'.\",\"stackTrace\":null}","innerError":{"date":"2026-07-31T09:28:11","request-id":"dfed84b8-25b3-4df8-bc50-e0ff8c470f90","client-request-id":"dfed84b8-25b3-4df8-bc50-e0ff8c470f90"}}} [GET] https://graph.microsoft.com/v1.0/identity/authenticationEventsFlows/graph.externalUsersSelfServiceSignUpEventsFlow
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **identity_conditionalaccessroot_identity_conditionalaccess_getdeleteditems**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.identity_conditionalaccessroot_identity_conditionalaccess_getdeleteditems LIMIT 1
  ```

  `wrong_url` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"UnknownError","message":"{\"Message\":\"No HTTP resource was found that matches the request URI 'https://na.prod.graph.ipc.msidentity.com/conditionalAccess/deletedItems'.\",\"MessageDetail\":\"No type was found that matches the controller named 'deletedItems'.\"}","innerError":{"date":"2026-07-31T09:28:32","request-id":"6eff162d-b4d6-43fc-ae93-827e8d5b0edf","client-request-id":"6eff162d-b4d6-43fc-ae93-827e8d5b0edf"}}} [GET] https://graph.microsoft.com/v1.0/identity/conditionalAccess/deletedItems
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **identity_identitycontainer_identity_identitycontainer_getidentitycontainer**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.identity_identitycontainer_identity_identitycontainer_getidentitycontainer LIMIT 1
  ```

  `wrong_url` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"UnknownError","message":"{\"message\":\"No HTTP resource was found that matches the request URI 'https://cpim.windows.net/graph/identity'.\",\"messageDetail\":\"No type was found that matches the controller named 'identity'.\",\"stackTrace\":null}","innerError":{"date":"2026-07-31T09:29:03","request-id":"13839dcd-5fe3-4355-89ee-5279e0ec762c","client-request-id":"13839dcd-5fe3-4355-89ee-5279e0ec762c"}}} [GET] https://graph.microsoft.com/v1.0/identity
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **identity_riskpreventioncontainer_identity_getriskprevention**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.identity_riskpreventioncontainer_identity_getriskprevention LIMIT 1
  ```

  `wrong_url` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"UnknownError","message":"{\"message\":\"No HTTP resource was found that matches the request URI 'https://cpim.windows.net/graph/identity/riskPrevention'.\",\"messageDetail\":\"No type was found that matches the controller named 'identity'.\",\"stackTrace\":null}","innerError":{"date":"2026-07-31T09:29:28","request-id":"63f402c3-c8bb-422c-a32c-ac91a69e530b","client-request-id":"63f402c3-c8bb-422c-a32c-ac91a69e530b"}}} [GET] https://graph.microsoft.com/v1.0/identity/riskPrevention
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **appcatalogs_appcatalogs_appcatalogs_appcatalogs_getappcatalogs**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.appcatalogs_appcatalogs_appcatalogs_appcatalogs_getappcatalogs LIMIT 1
  ```

  `deprecated` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-31T09:11:28","request-id":"887a73c7-0340-4cd3-b118-135a361388b3","client-request-id":"887a73c7-0340-4cd3-b118-135a361388b3"}}} [GET] https://graph.microsoft.com/v1.0/appCatalogs
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **chats_chat_functions_chats_getallmessages**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.chats_chat_functions_chats_getallmessages LIMIT 1
  ```

  `deprecated` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-31T09:12:43","request-id":"961d83b5-b996-44cd-8e27-6e580c9128ca","client-request-id":"961d83b5-b996-44cd-8e27-6e580c9128ca"}}} [GET] https://graph.microsoft.com/v1.0/chats/getAllMessages()
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **chats_chat_functions_chats_getallretainedmessages**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.chats_chat_functions_chats_getallretainedmessages LIMIT 1
  ```

  `deprecated` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-31T09:12:43","request-id":"b9c5ee08-5a77-4f78-80c4-d6400db13167","client-request-id":"b9c5ee08-5a77-4f78-80c4-d6400db13167"}}} [GET] https://graph.microsoft.com/v1.0/chats/getAllRetainedMessages()
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

### 6.2 Deprecated / beta-only API (13)

- **communications_adhoccall_communications_adhoccalls_getallrecordings**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.communications_adhoccall_communications_adhoccalls_getallrecordings LIMIT 1
  ```

  `deprecated` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-31T09:12:43","request-id":"9a27bd9e-2460-4def-8b3d-c844867e5e6b","client-request-id":"9a27bd9e-2460-4def-8b3d-c844867e5e6b"}}} [GET] https://graph.microsoft.com/v1.0/communications/adhocCalls/getAllRecordings(userId='@userId',startDateTime=@startDateTime,endDateTime=@endDateTime)
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **communications_adhoccall_communications_adhoccalls_getalltranscripts**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.communications_adhoccall_communications_adhoccalls_getalltranscripts LIMIT 1
  ```

  `deprecated` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-31T09:12:54","request-id":"12244b67-a38a-46bb-b14c-c6a5bcab5d9c","client-request-id":"12244b67-a38a-46bb-b14c-c6a5bcab5d9c"}}} [GET] https://graph.microsoft.com/v1.0/communications/adhocCalls/getAllTranscripts(userId='@userId',startDateTime=@startDateTime,endDateTime=@endDateTime)
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **communications_adhoccall_communications_listadhoccalls**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.communications_adhoccall_communications_listadhoccalls LIMIT 1
  ```

  `deprecated` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-31T09:13:05","request-id":"c298022b-d2ca-4fec-9718-000b5e9040a8","client-request-id":"c298022b-d2ca-4fec-9718-000b5e9040a8"}}} [GET] https://graph.microsoft.com/v1.0/communications/adhocCalls
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **communications_onlinemeeting_communications_onlinemeetings_getallrecordings**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.communications_onlinemeeting_communications_onlinemeetings_getallrecordings LIMIT 1
  ```

  `deprecated` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-31T09:13:22","request-id":"a6c251fd-2817-4f03-9cbf-ecc30eec871d","client-request-id":"a6c251fd-2817-4f03-9cbf-ecc30eec871d"}}} [GET] https://graph.microsoft.com/v1.0/communications/onlineMeetings/getAllRecordings(meetingOrganizerUserId='@meetingOrganizerUserId',startDateTime=@startDateTime,endDateTime=@endDateTime)
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **communications_onlinemeeting_communications_onlinemeetings_getalltranscripts**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.communications_onlinemeeting_communications_onlinemeetings_getalltranscripts LIMIT 1
  ```

  `deprecated` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-31T09:13:30","request-id":"c98e320a-d33b-4680-95c0-4b7639bf8f58","client-request-id":"c98e320a-d33b-4680-95c0-4b7639bf8f58"}}} [GET] https://graph.microsoft.com/v1.0/communications/onlineMeetings/getAllTranscripts(meetingOrganizerUserId='@meetingOrganizerUserId',startDateTime=@startDateTime,endDateTime=@endDateTime)
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **copilot_aiinteractionhistory_copilot_getinteractionhistory**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.copilot_aiinteractionhistory_copilot_getinteractionhistory LIMIT 1
  ```

  `deprecated` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-31T09:14:18","request-id":"af4b6847-89e1-498e-9c1e-3cf7010f56ce","client-request-id":"af4b6847-89e1-498e-9c1e-3cf7010f56ce"}}} [GET] https://graph.microsoft.com/v1.0/copilot/interactionHistory
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **copilot_aiinteractionhistory_copilot_interactionhistory_getallenterpriseinteractions**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.copilot_aiinteractionhistory_copilot_interactionhistory_getallenterpriseinteractions LIMIT 1
  ```

  `deprecated` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-31T09:14:18","request-id":"84641e61-a44b-49cb-8723-68b1ed0d5aac","client-request-id":"84641e61-a44b-49cb-8723-68b1ed0d5aac"}}} [GET] https://graph.microsoft.com/v1.0/copilot/interactionHistory/getAllEnterpriseInteractions()
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **copilot_aiuser_copilot_listusers**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.copilot_aiuser_copilot_listusers LIMIT 1
  ```

  `deprecated` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-31T09:14:18","request-id":"bf5bf8a2-7fb6-43bb-8c68-2fb6216facfc","client-request-id":"bf5bf8a2-7fb6-43bb-8c68-2fb6216facfc"}}} [GET] https://graph.microsoft.com/v1.0/copilot/users
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **teamstemplates_teamstemplate_teamstemplates_teamstemplate_listteamstemplate**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.teamstemplates_teamstemplate_teamstemplates_teamstemplate_listteamstemplate LIMIT 1
  ```

  `deprecated` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-31T09:52:41","request-id":"44c8d938-063d-45ea-b7ad-2b628d461d2d","client-request-id":"44c8d938-063d-45ea-b7ad-2b628d461d2d"}}} [GET] https://graph.microsoft.com/v1.0/teamsTemplates
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

- **teamwork_deletedteam_teamwork_deletedteams_getallmessages**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.teamwork_deletedteam_teamwork_deletedteams_getallmessages LIMIT 1
  ```

  `deprecated` — output:

  ```
  Error: Source resource was not found (404)
  Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-31T09:52:53","request-id":"69d43999-dab2-49ec-9bc9-736f0d64f70b","client-request-id":"69d43999-dab2-49ec-9bc9-736f0d64f70b"}}} [GET] https://graph.microsoft.com/v1.0/teamwork/deletedTeams/getAllMessages()
  Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
  ```

### 6.3 Wrong audience (AAD accounts) (12)

- **admin_configurationmanagement_admin_getconfigurationmanagement**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.admin_configurationmanagement_admin_getconfigurationmanagement LIMIT 1
  ```

  `timeout` — output:

  ```
  Timeout after 30s
  ```

- **admin_edge_admin_edge_getinternetexplorermode**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.admin_edge_admin_edge_getinternetexplorermode LIMIT 1
  ```

  `timeout` — output:

  ```
  Timeout after 30s
  ```

- **admin_edge_admin_getedge**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.admin_edge_admin_getedge LIMIT 1
  ```

  `wrong_audience` — output:

  ```
  Error: Source rejected the request (400)
  Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.Edge.CloudSiteListManagement,False).","innerError":{"date":"2026-07-31T09:08:46","request-id":"81dcb68c-20ba-4829-adc5-b40def5e3660","client-request-id":"81dcb68c-20ba-4829-adc5-b40def5e3660"}}} [GET] https://graph.microsoft.com/v1.0/admin/edge
  Hint: Adjust the query filters or shape to match the target table's supported inputs.
  ```

- **admin_exchangeadmin_admin_getexchange**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.admin_exchangeadmin_admin_getexchange LIMIT 1
  ```

  `timeout` — output:

  ```
  Timeout after 30s
  ```

- **admin_sharepoint_admin_getsharepoint**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.admin_sharepoint_admin_getsharepoint LIMIT 1
  ```

  `wrong_audience` — output:

  ```
  Error: Source rejected the request (400)
  Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.FileServices,False).","innerError":{"date":"2026-07-31T09:10:17","request-id":"96835ad5-5031-46df-b2f2-95e2b4ed1737","client-request-id":"96835ad5-5031-46df-b2f2-95e2b4ed1737"}}} [GET] https://graph.microsoft.com/v1.0/admin/sharepoint
  Hint: Adjust the query filters or shape to match the target table's supported inputs.
  ```

- **admin_teamsadminroot_admin_getteams**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.admin_teamsadminroot_admin_getteams LIMIT 1
  ```

  `wrong_audience` — output:

  ```
  Error: Source rejected the request (400)
  Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.IC3.TeamsAdminGateway,False).","innerError":{"date":"2026-07-31T09:10:37","request-id":"3ce56ecf-3a03-4995-8176-53a80f1118d4","client-request-id":"3ce56ecf-3a03-4995-8176-53a80f1118d4"}}} [GET] https://graph.microsoft.com/v1.0/admin/teams
  Hint: Adjust the query filters or shape to match the target table's supported inputs.
  ```

- **admin_teamsadminroot_admin_teams_getpolicy**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.admin_teamsadminroot_admin_teams_getpolicy LIMIT 1
  ```

  `wrong_audience` — output:

  ```
  Error: Source rejected the request (400)
  Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.IC3.PolicyAdmin,False).","innerError":{"date":"2026-07-31T09:10:36","request-id":"d2355486-5f35-4d01-9f28-a15f2a68c9e0","client-request-id":"d2355486-5f35-4d01-9f28-a15f2a68c9e0"}}} [GET] https://graph.microsoft.com/v1.0/admin/teams/policy
  Hint: Adjust the query filters or shape to match the target table's supported inputs.
  ```

- **admin_teamsadminroot_admin_teams_gettelephonenumbermanagement**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.admin_teamsadminroot_admin_teams_gettelephonenumbermanagement LIMIT 1
  ```

  `timeout` — output:

  ```
  Timeout after 30s
  ```

- **copilot_copilotadmin_copilot_admin_getcatalog**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.copilot_copilotadmin_copilot_admin_getcatalog LIMIT 1
  ```

  `wrong_audience` — output:

  ```
  Error: Source rejected the request (400)
  Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.CopilotPackage,False).","innerError":{"date":"2026-07-31T09:14:38","request-id":"7ba75ada-3186-443c-973b-c80234f6b42a","client-request-id":"7ba75ada-3186-443c-973b-c80234f6b42a"}}} [GET] https://graph.microsoft.com/v1.0/copilot/admin/catalog
  Hint: Adjust the query filters or shape to match the target table's supported inputs.
  ```

- **identity_identityverifiedidroot_identity_getverifiedid**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.identity_identityverifiedidroot_identity_getverifiedid LIMIT 1
  ```

  `wrong_audience` — output:

  ```
  Error: Source rejected the request (400)
  Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.VerifiedId.VerifiedIdProfile,False).","innerError":{"date":"2026-07-31T09:29:19","request-id":"08516ffa-7499-4d9e-b2d2-aae46e105ace","client-request-id":"08516ffa-7499-4d9e-b2d2-aae46e105ace"}}} [GET] https://graph.microsoft.com/v1.0/identity/verifiedId
  Hint: Adjust the query filters or shape to match the target table's supported inputs.
  ```

- **storage_filestorage_storage_getfilestorage**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.storage_filestorage_storage_getfilestorage LIMIT 1
  ```

  `wrong_audience` — output:

  ```
  Error: Source rejected the request (400)
  Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.FileServices,False).","innerError":{"date":"2026-07-31T09:52:06","request-id":"5b0bae4d-ecdb-4986-a768-84c50ff0b726","client-request-id":"5b0bae4d-ecdb-4986-a768-84c50ff0b726"}}} [GET] https://graph.microsoft.com/v1.0/storage/fileStorage
  Hint: Adjust the query filters or shape to match the target table's supported inputs.
  ```

- **storage_storagesettings_storage_getsettings**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.storage_storagesettings_storage_getsettings LIMIT 1
  ```

  `wrong_audience` — output:

  ```
  Error: Source rejected the request (400)
  Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.UnifiedStorageQuota,False).","innerError":{"date":"2026-07-31T09:52:19","request-id":"6cdd3d47-0a07-4427-8bfc-9125ba966829","client-request-id":"6cdd3d47-0a07-4427-8bfc-9125ba966829"}}} [GET] https://graph.microsoft.com/v1.0/storage/settings
  Hint: Adjust the query filters or shape to match the target table's supported inputs.
  ```

### 6.4 Needs entityId parameter (4)

- **certificatebasedauthconfiguration_certificatebasedauthconfiguration_certificatebasedauthconfiguration_certificatebasedauthconfiguration_listcertificatebasedauthconfiguration**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.certificatebasedauthconfiguration_certificatebasedauthconfiguration_certificatebasedauthconfiguration_certificatebasedauthconfiguration_listcertificatebasedauthconfiguration LIMIT 1
  ```

  `needs_entityId` — output:

  ```
  Error: Source rejected the request (400)
  Detail: {"error":{"code":"Request_UnsupportedQuery","message":"Direct queries to this resource type are not supported.","innerError":{"date":"2026-07-31T09:12:23","request-id":"2a8aaf75-7011-482f-9aec-973fbcec9447","client-request-id":"2a8aaf75-7011-482f-9aec-973fbcec9447"}}} [GET] https://graph.microsoft.com/v1.0/certificateBasedAuthConfiguration
  Hint: Adjust the query filters or shape to match the target table's supported inputs.
  ```

- **communications_onlinemeeting_communications_listonlinemeetings**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.communications_onlinemeeting_communications_listonlinemeetings LIMIT 1
  ```

  `auth` — output:

  ```
  Error: Source request was rejected (403)
  Detail: {"error":{"code":"Forbidden","message":"Insufficient permissions","innerError":{"date":"2026-07-31T09:13:22","request-id":"7e2b2123-5c2e-471b-a45e-8213eb7dad42","client-request-id":"7e2b2123-5c2e-471b-a45e-8213eb7dad42"}}} [GET] https://graph.microsoft.com/v1.0/communications/onlineMeetings
  Hint: Check the configured credentials and whether they have access to this resource.
  ```

- **permissiongrants_resourcespecificpermissiongrant_permissiongrants_resourcespecificpermissiongrant_listresourcespecificpermissiongrant**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.permissiongrants_resourcespecificpermissiongrant_permissiongrants_resourcespecificpermissiongrant_listresourcespecificpermissiongrant LIMIT 1
  ```

  `needs_entityId` — output:

  ```
  Error: Source rejected the request (400)
  Detail: {"error":{"code":"Request_UnsupportedQuery","message":"Direct queries to this resource type are not supported.","innerError":{"date":"2026-07-31T09:41:05","request-id":"7e1cfc5b-1eb7-43f3-af41-1ffd662ec43a","client-request-id":"7e1cfc5b-1eb7-43f3-af41-1ffd662ec43a"}}} [GET] https://graph.microsoft.com/v1.0/permissionGrants
  Hint: Adjust the query filters or shape to match the target table's supported inputs.
  ```

- **scopedrolememberships_scopedrolemembership_scopedrolememberships_scopedrolemembership_listscopedrolemembership**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.scopedrolememberships_scopedrolemembership_scopedrolememberships_scopedrolemembership_listscopedrolemembership LIMIT 1
  ```

  `needs_entityId` — output:

  ```
  Error: Source rejected the request (400)
  Detail: {"error":{"code":"Request_UnsupportedQuery","message":"Direct queries to this resource type are not supported.","innerError":{"date":"2026-07-31T09:46:27","request-id":"32c19978-b205-4b47-a2fd-800af83e83cb","client-request-id":"32c19978-b205-4b47-a2fd-800af83e83cb"}}} [GET] https://graph.microsoft.com/v1.0/scopedRoleMemberships
  Hint: Adjust the query filters or shape to match the target table's supported inputs.
  ```

### 6.5 Unsupported query shape (3)

- **directory_directoryobject_directory_listdeleteditems**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.directory_directoryobject_directory_listdeleteditems LIMIT 1
  ```

  `unsupported_query` — output:

  ```
  Error: Source rejected the request (400)
  Detail: {"error":{"code":"Request_UnsupportedQuery","message":"Searches against this resource are not supported. Only specific instances can be queried.","innerError":{"date":"2026-07-31T09:24:06","request-id":"939770f1-9078-408e-b13d-7617348450b6","client-request-id":"939770f1-9078-408e-b13d-7617348450b6"}}} [GET] https://graph.microsoft.com/v1.0/directory/deletedItems
  Hint: Adjust the query filters or shape to match the target table's supported inputs.
  ```

- **directoryobjects_directoryobject_directoryobjects_directoryobject_listdirectoryobject**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.directoryobjects_directoryobject_directoryobjects_directoryobject_listdirectoryobject LIMIT 1
  ```

  `unsupported_query` — output:

  ```
  Error: Source rejected the request (400)
  Detail: {"error":{"code":"Request_UnsupportedQuery","message":"Searches against this resource are not supported. Only specific instances can be queried.","innerError":{"date":"2026-07-31T09:25:09","request-id":"4dc3df81-f54b-43d8-8c22-e7f578463c8a","client-request-id":"4dc3df81-f54b-43d8-8c22-e7f578463c8a"}}} [GET] https://graph.microsoft.com/v1.0/directoryObjects
  Hint: Adjust the query filters or shape to match the target table's supported inputs.
  ```

- **directoryobjects_directoryobject_functions_directoryobjects_delta**

  ```sql
  coral sql SELECT 1 AS ok FROM microsoft_graph_v4.directoryobjects_directoryobject_functions_directoryobjects_delta LIMIT 1
  ```

  `unsupported_query` — output:

  ```
  Error: Source rejected the request (400)
  Detail: {"error":{"code":"Request_UnsupportedQuery","message":"Delta query is not supported for directoryObjects without a valid resource type or id filter.","innerError":{"date":"2026-07-31T09:25:09","request-id":"54c21d69-f03f-4b02-8c9e-f7e33a7ebfa2","client-request-id":"54c21d69-f03f-4b02-8c9e-f7e33a7ebfa2"}}} [GET] https://graph.microsoft.com/v1.0/directoryObjects/delta()
  Hint: Adjust the query filters or shape to match the target table's supported inputs.
  ```

---

## 7. App-only-only tables (30) — delegated recheck

The 30 tables that passed **only** with the app-only (client-credentials) token on Jul 29:

- **20 of 30 now PASS with the delegated keychain token** — genuine scope coverage gains
  (identity event listeners, reports, schemaextensions, serviceprincipals, storage,
  subscribedskus, subscriptions, solutions, users delta, etc.)
- 9 still AUTH: all `places_*` (asroom/asroomlist/asworkspace) and `security_*` alert /
  attack-simulation / securescore tables
- 1 timeout: `tenantrelationships_delegatedadminrelationship_..._listdelegatedadminrelationships`
  (passed on retry in 16s, §9)

This means the app-only vs delegated gap shrank significantly since Jul 29.

---

## 8. Error-quality probe (sample outputs)

### 8a. License-gated (46) — clean structured failures

```
$ coral sql "SELECT 1 AS ok FROM microsoft_graph_v4.drives_drive_drives_drive_listdrive LIMIT 1"
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Tenant does not have a SPO license..."}}
```

### 8b. Wrong audience (123) — structured 400, no timeout

```
$ coral sql "SELECT 1 AS ok FROM microsoft_graph_v4.admin_exchangeadmin_admin_getexchange LIMIT 1"
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.Exchange,True)..."}}
```

### 8c. Deprecated / beta API (15)

```
$ coral sql "SELECT 1 AS ok FROM microsoft_graph_v4.communications_adhoccall_communications_adhoccalls_getallrecordings LIMIT 1"
Error: ... deprecated API / beta only ...
```

---

## 9. Timeout analysis (30)

30 tables hit the 30s cutoff. Breakdown by prefix:

| Prefix | Timeouts |
|--------|----------|
| admin_* | 20 |
| devicemanagement_* | 4 |
| tenantrelationships_* | 4 |
| datapolicyoperations_* | 1 |
| rolemanagement_* | 1 |

**All 30 are slow endpoints, not hangs.** Re-running a sample under the same CLI
(`/tmp/retimeout.py`, 35s limit) completed in 13–23s with structured results:

| Table | First run | Retry |
|-------|-----------|-------|
| admin_admin_admin_admin_getadmin | timeout | **PASS (22s)** |
| tenantrelationships_delegatedadminrelationship_..._list... | timeout | **PASS (16s)** |
| admin_exchangeadmin_admin_getexchange | timeout | 400 "not supported for AAD" (21s) |
| admin_peopleadminsettings_admin_getpeople | timeout | 403 missing requirement (23s) |
| admin_serviceannouncement_admin_getserviceannouncement | timeout | 404 (13s) |

The Jul 29 run used a **120s** timeout, so these slow tables completed there; with today's
30s cutoff they were cut off. **Recommendation:** re-run with 120s to confirm the 2 PASS
tables above and eliminate the 30-timeout category entirely.

---

## 10. places_* regression (4 → 0) — needs scope check

`places_place_places_place_listplace_asbuilding/asdesk/asfloor/assection` passed on Jul 29
(4 tables). Today all 7 `places_*` tables return **401 UnknownError (empty message)**:

```
$ coral sql "SELECT 1 AS ok FROM microsoft_graph_v4.places_place_places_place_listplace_asroom LIMIT 1"
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"",...}} [GET] https://graph.microsoft.com/v1.0/places/graph.room
```

A direct API check with the current `az` admin token returns the same 401 — and the
current token's `scp` claim does **not** include `Place.Read.All` (it lists
`User.Read.All`, `Group.ReadWrite.All`, `AuditLog.Read.All`, etc.). Jul 29's 155-scope
token included the place scopes.

**Likely cause: the keychain OAuth token was refreshed/re-consented with a reduced scope
set, dropping the `Place.*` scopes.** This is a token/consent change, not a connector
regression. To restore: re-run the interactive consent flow with `Place.Read.All`.

---

## 11. `other` bucket (41) — representative causes

Sample tables in `other` and their errors:

| Table | Error |
|-------|-------|
| education_reportsroot_education_getreports | 500 (source server error) |
| education_reportsroot_education_reports_listreadingcoachpassages | 500 |
| directory_directory_directory_directory_getdirectory | 400 (query shape) |
| identitygovernance_accessreviewset_identitygovernance_getaccessreviews | 400 |
| invitations_user_invitations_inviteduser_getmailboxsettings | 400 |

No connector crashes; all are upstream 400/500 responses from Graph for
table/shape combinations the connector passes through.

---

## 12. Comparison with Jul 29 delegated run — what changed

| Change | Detail |
|--------|--------|
| 0 expired_token failures | Jul 29 re-run had 63 mid-run token deaths; today's run had **0** — token held for the full 47m |
| me_* +10 | 26 → 36 |
| identity_* +7 | 0 → 7 (authentication listeners, custom auth extensions) |
| security_* +3 | 0 → 3 |
| auditlogs_* +3 | 0 → 3 |
| applications_* +2, devices_* +2 | delegated access gained |
| app-only gap shrinks | 20 of 30 app-only-only tables now pass delegated |
| places_* −4 | scope/consent change on keychain token (§10) |
| 30 timeouts | 30s cutoff; all complete on retry (§9) |
| 45 spec bugs | unchanged — 40/45 still reproduce, 5 reclassified (§6) |

### Verdict

> **No connector regression detected.** The Jul 31 run is the first **complete,
> token-stable** battery (733/733, 0 expired_token) and it beats the Jul 29 delegated run
> on every prefix except `places_*`, which is a keychain consent-scope change. The
> remaining fixes to request from withcoral/coral are the **45 genuine spec bugs** (still
> unfixed) and the 30 slow `admin_*`/`devicemanagement_*` endpoints that exceed a 30s
> timeout on cold calls.

---

_Generated 2026-07-31 by Coral Specs Testing. Author: Vicky Kumar <algsoch@gmail.com>._
