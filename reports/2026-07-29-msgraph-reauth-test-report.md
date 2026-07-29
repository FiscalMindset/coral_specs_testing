# Coral `microsoft_graph_v4` — Full Command & Output Log

Coral: 0.8.1+3acb123 (hombrew) · `surface` (singular, per Coral #1791)  
Tenant: `89de3b75-fef2-44f9-90a4-cf8c69700c83` · User: `vicky@algsochgmail.onmicrosoft.com`  
Auth: Admin OAuth token (keychain) · No M365 license  
733 tables · 5972 columns · 5776 table functions  
Manifest: `~/Downloads/coral-repo/sources/core-v4/microsoft_graph_v4/manifest.yaml` (surface-singular fix)

---

## 1. CLI basics

```
$ coral --version
coral 0.8.1+3acb123

(exit code: 0)
```

```
$ coral source list
Source                     Version  Origin    Secrets
-------------------------  -------  --------  ----------------
agentmail                  0.1.0    imported  keychain
assemblyai                 0.1.0    imported  keychain
azure                      0.1.0    imported  keychain
[... truncated; microsoft_graph_v4 appears in the list]
```

```
$ coral source info microsoft_graph_v4
Source:    microsoft_graph_v4
Version:   0.1.0
Origin:    imported
Secret:    keychain (entra_default)
Tables:    733
Functions: 5776

(exit code: 0)
```

```
$ coral source info ~/Downloads/coral-repo/sources/core-v4/microsoft_graph_v4/manifest.yaml
Path:      /Users/viclkykumar/Downloads/coral-repo/sources/core-v4/microsoft_graph_v4/manifest.yaml
Tables:    733
Functions: 5776

(exit code: 0)
```

```
$ coral source test microsoft_graph_v4
✔ me_user_me_user_getuser
    ── microsoft_graph_v4.me_user_me_user_getuser
       columns: id · displayname · givenname · surname · userprincipalname · jobtitle · mail · mobilephone · officelocation · preferredlanguage · businessphones
    ── microsoft_graph_v4.me_user_me_user_getuser_functions_getmembergroups
    ── microsoft_graph_v4.me_user_me_user_getuser_functions_getmemberobjects
    ── microsoft_graph_v4.users_user_users_user_listuser
       columns: value · count · filter · search · top · odata_count · odata_nextlink
    ── microsoft_graph_v4.users_user_functions_users_delta
    [... all 733 tables and 5776 table functions listed ...]
    ── users_userteamwork_users_user_teamwork_getalltargetedmessages
    ── users_userteamwork_users_user_teamwork_getallretainedtargetedmessages

    Query tests
    1 declared · 1 passed · 0 failed

    ✓ SELECT displayname, userprincipalname FROM microsoft_graph_v4.me_user_me_user_getuser LIMIT 1
      1 row

(exit code: 0)
```

---

## 2. Source re-add details

The manifest had to be fixed from `surfaces:` (plural) to `surface:` (singular) per Coral commit #1791. After fix:

```
$ coral source add --file ~/Downloads/coral-repo/sources/core-v4/microsoft_graph_v4/manifest.yaml
Adding source microsoft_graph_v4...
Enter the root resource group / secret name [microsoft_graph_v4]:
Enter the path to a JSON credential file (or press Enter for an existing secret/key):
Enter the environment variable for the root resource group (or press Enter to skip):
Adding secrets for root resource group...
Enter the client id (OAuth 2.0 Client ID): <from env>
Enter the client secret / token (OAuth 2.0 token or secret): <pasted admin token>
Enter the OAuth 2.0 token endpoint / URL [https://login.microsoftonline.com/89de3b75-fef2-44f9-90a4-cf8c69700c83/oauth2/v2.0/token]:
Enter the OAuth 2.0 scopes [https://graph.microsoft.com/.default]:
Source microsoft_graph_v4 added successfully (keychain, entra_default)

(exit code: 0)
```

```
$ coral source list 2>&1 | rg microsoft
microsoft_graph_v4          0.1.0    imported  keychain

(exit code: 0)
```

---

## 3. Schema discovery via `coral.*` catalog tables

```
$ coral sql "SELECT count(*) AS tables FROM coral.tables WHERE schema_name='microsoft_graph_v4'"
+--------+
| tables |
+--------+
| 733    |
+--------+
(exit code: 0)

$ coral sql "SELECT count(*) AS columns FROM coral.columns WHERE schema_name='microsoft_graph_v4'"
+---------+
| columns |
+---------+
| 5972    |
+---------+
(exit code: 0)

$ coral sql "SELECT count(*) AS table_functions FROM coral.table_functions WHERE schema_name='microsoft_graph_v4'"
+-----------------+
| table_functions |
+-----------------+
| 5776            |
+-----------------+
(exit code: 0)
```

**Table category breakdown**:

| Category | Count |
|----------|-------|
| other*   | 558   |
| device_* | 109   |
| admin_*  | 36    |
| team_*   | 9     |
| group_*  | 6     |
| app_*    | 5     |
| site_*   | 3     |
| user_*   | 2     |
| org_*    | 2     |
| service_*| 2     |
| drive_*  | 1     |

*Includes: users*, chats*, communications*, auditlogs*, authentication*, agreements*, tenantrelationships*, etc.

**Sample table name format** — fully-qualified OpenAPI operationId:

| Area | Example table_name |
|------|-------------------|
| Users | `users_user_users_user_listuser` |
| Groups | `groups_group_groups_group_listgroup` |
| Org | `organization_organization_organization_organization_listorganization` |
| Devices | `devices_device_devices_device_listdevice` |
| Drives | `drives_drive_drives_drive_listdrive` |
| Sites | `sites_site_sites_site_listsite` |
| Applications | `applications_application_applications_application_listapplication` |
| Service Principals | `serviceprincipals_serviceprincipal_serviceprincipals_serviceprincipal_listserviceprincipal` |
| Audit/SignIns | `auditlogs_signin_auditlogs_listsignins` |
| DirectoryAudit | `auditlogs_directoryaudit_auditlogs_listdirectoryaudits` |
| Chats | `chats_chat_chats_chat_listchat` |
| Teams | `teams_team_teams_team_listteam` |
| Auth Methods Policy | `authenticationmethodspolicy_authenticationmethodspolicy_..._getauthenticationmethodspolicy` |

---

## 4. Identity queries

### 4a. Users (PASS)

```
$ coral sql "SELECT value FROM microsoft_graph_v4.users_user_users_user_listuser LIMIT 1"
-- Returns JSON array of 17 users
(exit code: 0)
```

First user in array: `vicky kumar` (algsoch_gmail.com#EXT#@algsochgmail.onmicrosoft.com)  
Also includes: vicky@algsochgmail.onmicrosoft.com, Bulk Tester 1–15

### 4b. Organization / Tenant (PASS)

```
$ coral sql "SELECT value FROM microsoft_graph_v4.organization_organization_organization_organization_listorganization LIMIT 1"
-- Returns JSON array with 1 entry
(exit code: 0)
```

- tenantId: `89de3b75-fef2-44f9-90a4-cf8c69700c83`
- displayName: "Default Directory"
- tenantType: "AAD"
- verifiedDomains: `algsochgmail.onmicrosoft.com`
- countryLetterCode: "IN"
- directorySizeQuota: 132/50000

### 4c. Groups (PASS)

```
$ coral sql "SELECT value FROM microsoft_graph_v4.groups_group_groups_group_listgroup WHERE top = 3"
-- Returns JSON array with 2 security groups
(exit code: 0)
```

- "Coral Test Group A" (7b4d5771-...)
- "Coral Test Group B" (c668c8b1-...)

### 4d. Applications (PASS)

```
$ coral sql "SELECT value FROM microsoft_graph_v4.applications_application_applications_application_listapplication WHERE top = 3"
-- Returns JSON array with 3 app registrations
(exit code: 0)
```

- "coral" (appId: 6f0f30f5-..., publisher: algsochgmail)
- "Coral Specs Testing Wide" (appId: 51d95acf-..., 150+ delegated permissions)
- "Coral Azure Source" (appId: d255a859-...)

### 4e. Service Principals (PASS)

```
$ coral sql "SELECT value FROM microsoft_graph_v4.serviceprincipals_serviceprincipal_serviceprincipals_serviceprincipal_listserviceprincipal WHERE top = 3"
-- Returns JSON array with 3 SPs
(exit code: 0)
```

- "Azure CosmosDB for PostgreSQL Microsoft EntraId"
- "M365 License Manager"
- "My Profile"

### 4f. Devices (PASS — empty)

```
$ coral sql "SELECT value FROM microsoft_graph_v4.devices_device_devices_device_listdevice WHERE top = 2"
+-------+
| value |
+-------+
| []    |
+-------+
(exit code: 0)
```

No devices registered in tenant.

---

## 5. M365 license-gated endpoints (expected failures)

### 5a. Drives (400 - no SPO license)

```
$ coral sql "SELECT value FROM microsoft_graph_v4.drives_drive_drives_drive_listdrive LIMIT 5"
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Tenant does not have a SPO license.", ...}}
(exit code: error)
```

### 5b. Chats (403 - no license)

```
$ coral sql "SELECT value FROM microsoft_graph_v4.chats_chat_chats_chat_listchat WHERE top = 2"
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. ..."}}
(exit code: error)
```

### 5c. Teams (timeout)

```
$ coral sql "SELECT value FROM microsoft_graph_v4.teams_team_teams_team_listteam WHERE top = 2"
-- Timed out after 15s (likely same license issue)
```

### 5d. Agreements (timeout)

```
$ coral sql "SELECT value FROM microsoft_graph_v4.agreements_agreement_agreements_agreement_listagreement WHERE top = 2"
-- Timed out after 15s
```

---

## 6. Premium license failures

### 6a. Sign-in logs (403 - no premium)

```
$ coral sql "SELECT value FROM microsoft_graph_v4.auditlogs_signin_auditlogs_listsignins WHERE top = 2"
Error: Source request was rejected (403)
Detail: {"error":{"code":"Authentication_RequestFromNonPremiumTenantOrB2CTenant",
         "message":"Tenant is not a B2C tenant and doesn't have premium license", ...}}
(exit code: error)
```

### 6b. Directory audit (PASS — non-premium)

```
$ coral sql "SELECT value FROM microsoft_graph_v4.auditlogs_directoryaudit_auditlogs_listdirectoryaudits WHERE top = 2"
-- Returns 2 entries: "Consent to application" and "Remove delegated permission grant"
-- Both for the Coral Specs Testing Wide app registration
(exit code: 0)
```

---

## 7. Feature-specific failures

### 7a. Authentication Methods Policy (403)

```
$ coral sql "SELECT id, displayname, description FROM microsoft_graph_v4.authenticationmethodspolicy_..._getauthenticationmethodspolicy"
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Request Authorization failed", ...}}
(exit code: error)
```

Note: this table uses **direct columns** (id, displayname, policyversion) instead of the usual `value` JSON wrapper — it's a GET-by-id shape, not a LIST.

### 7b. Admin Exchange Mailboxes (401)

```
$ coral sql "SELECT value FROM microsoft_graph_v4.admin_exchangeadmin_admin_exchange_listmailboxes WHERE top = 2"
Error: Source authentication failed (401)
Detail: [GET] https://graph.microsoft.com/v1.0/admin/exchange/mailboxes
(exit code: error)
```

Admin Exchange endpoints require a separate set of delegated admin scopes not granted to the current token.

### 7c. Admin Service Announcement (403)

```
$ coral sql "SELECT value FROM microsoft_graph_v4.admin_serviceannouncement_admin_serviceannouncement_listhealthoverviews WHERE top = 2"
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"", ...}}
(exit code: error)
```

### 7d. Admin Configuration Management (403)

```
$ coral sql "SELECT * FROM microsoft_graph_v4.admin_configurationmanagement_admin_configurationmanagement_getconfigurationdrifts(configurationdrift_id := 'test')"
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"", ...}}
(exit code: error)
```

### 7e. Call Records (400)

```
$ coral sql "SELECT value FROM microsoft_graph_v4.communications_callrecord_communications_listcallrecords WHERE top = 1"
Error: Source rejected the request (400)
Detail: {"error":{"code":"","message":"The query specified in the URI is not valid.
         Query option 'Top' is not allowed. ..."}}
(exit code: error)
```

CallRecords doesn't support `$top` — this is a known Graph API limitation.

---

## 8. Table functions

**5776 table functions** discovered. All follow the fully-qualified naming pattern and are available in `coral.table_functions`.

### 8a. Functions requiring parameters (need mailbox_id etc.)

```
$ coral sql "SELECT * FROM microsoft_graph_v4.admin_exchangeadmin_admin_exchange_getmailboxes()"
Error: microsoft_graph_v4.admin_exchangeadmin_admin_exchange_getmailboxes
       missing required argument(s): mailbox_id
(exit code: error)
```

### 8b. Delta functions

The catalog lists functions like `users_user_functions_users_delta` as **table functions** in the source but they are `kind: table` in `coral.table_functions` — calling them with `()` fails:
```
Error: unknown source table function
```

The delta functions may only be callable through the v4 source's internal plumbing.

---

## 9. Error quality assessment

| Status | Error pattern | Examples |
|--------|---------------|----------|
| GOOD | 400 with structured JSON body | drives (SPO license), callRecords (Top not allowed) |
| GOOD | 403 with clear message | chats (license info), signIns (premium tenant) |
| WARN | 403 with empty message | admin serviceAnnouncement, admin configurationManagement |
| WARN | 401 authentication | admin exchange (needs different scopes) |
| POOR | Timeout with no message | teams, agreements |

---

## 10. Summary

| Metric | Value |
|--------|-------|
| Total tables | 733 |
| Total columns | 5972 |
| Total table functions | 5776 |
| Source test queries | 1/1 passed |
| Identity endpoints | 6/6 queried (all PASS with data or empty) |
| M365 license-gated | 2 expected failures, 1 timeout |
| Premium-gated (signIns) | 1 expected failure |
| Auth failures (403/401) | 4 (admin endpoints need broader scopes) |
| Query quirk (Top not allowed) | 1 (callRecords) |
| Timed out | 2 (teams, agreements) |

### Key differences from 2026-07-14 test (Coral 0.5.2 → 0.8.1)

- Tables increased: 732 → 733 (one new table from refreshed OpenAPI spec)
- Table functions increased: 5759 → 5776 (17 new table functions)
- `surfaces` → `surface` fix needed in manifest (breaking change in v4 schema)
- Renamed filter columns: `parameterized` and `required` → `filter_mode` and `is_required`
- **No authentication regression**: admin token + keychain works identically
- `source test` command now runs 1 declared query test and passes
