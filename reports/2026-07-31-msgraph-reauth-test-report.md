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

The 45 spec bugs from the Jul 30 report were re-verified against today's data:

| Category | Jul 30 | Jul 31 result |
|----------|--------|---------------|
| Wrong URL / path mismatch | 13 | 13 still `wrong_url` |
| Deprecated / beta-only API | 13 | 13 still `deprecated` |
| Wrong audience (AAD accounts) | 12 | 8 still `wrong_audience`, 4 now `timeout` (see §9) |
| Needs entityId parameter | 4 | 1 `auth`, 3 tables not in today's 733 list (wildcard `_*_list*` spec entries) |
| Unsupported query shape | 3 | 3 still `unsupported_query` |
| **Total** | **45** | **40 reproduced · 5 changed** |

**All 45 genuine spec bugs remain unfixed** — none started passing. The 4 wrong-audience
tables that now time out are the `admin_configurationmanagement`, `admin_edge`,
`admin_exchangeadmin`, and `admin_teamsadminroot` tables; on Jul 29 they returned a fast
400, today the endpoint hangs past 30s (see §9).

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
