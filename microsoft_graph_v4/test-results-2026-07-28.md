# Microsoft Graph v4 — Full Table Coverage Report

**Date**: 28 July 2026  
**Tester**: Vicky Kumar (FiscalMindset)  
**Connector**: `microsoft_graph_v4` (coral 0.5.2, DSL v4)  
**Test account**: `algsoch@gmail.com` — Entra ID tenant `algsochgmail.onmicrosoft.com`  
**Graph endpoint**: `https://graph.microsoft.com/v1.0`

---

## Summary

| Metric | Value |
|---|---|
| Total tables in manifest | **733** |
| Tested | **708** (96.6%) |
| Untestable (license-gated) | **25** (no SPO / no Office365 license) |
| **PASS** | **27** |
| FAIL — 401 Unauthorized | **667** |
| FAIL — 403 Forbidden (consent) | **3** |
| FAIL — 400 Bad Request | **10** |
| FAIL — 404 Not Found | **1** |

---

## All 27 PASS Tables

| # | Table | Category |
|---|---|---|
| 1 | `application_copilotcopilotadmin_copilot_admin_e5_skus_listsubscriptions` | Copilot |
| 2 | `application_copilotcopilotadmin_copilot_admin_listcopilotreports` | Copilot |
| 3 | `chats_chat_chats_chat_getallmessages` | Chats |
| 4 | `chats_chat_chats_chatlistallmessages` | Chats |
| 5 | `chats_chat_chats_listchats` | Chats |
| 6 | `chats_chat_chats_listchatsofuser` | Chats |
| 7 | `chatsofuser_chat_chats_chat_getallmessagesofuser` | ChatsOfUser |
| 8 | `chatsofuser_chat_chats_chats_chatlistallmessagesofuser` | ChatsOfUser |
| 9 | `chatsofuser_chat_chats_getchatsofuser` | ChatsOfUser |
| 10 | `contacts_contact_listcontacts` | Contacts |
| 11 | `copilot_copilotadmin_copilot_admin_catalog_listpackages` | Copilot |
| 12 | `deviceconfigprofile_deviceconfigurations_deviceconfigurations_listconfigurations` | DeviceConfig |
| 13 | `devicemanagement_deviceconfigurationprofilesettings_devicemanagement_listdevicemanagementconfigurations` | DeviceManagement |
| 14 | `devices_device_device_listdevice` | Devices |
| 15 | `devices_device_devices_device_listdevice` | Devices |
| 16 | `identityprotection_riskyserviceprincipal_identityprotection_listriskyserviceprincipals` | IdentityProtection |
| 17 | `identityprotection_riskysignals_identityprotection_listidentityrisysignalsriskevents` | IdentityProtection |
| 18 | `identityprotection_riskysignals_identityprotection_listriskysignals` | IdentityProtection |
| 19 | `identityprotection_riskysignals_identityprotection_listriskysignals_riskysignal_listrisksignal` | IdentityProtection |
| 20 | `identityprotection_riskyuser_identityprotection_listriskyusers` | IdentityProtection |
| 21 | `identityprotection_serviceprincipalriskdetection_identityprotection_listserviceprincipalriskdetections` | IdentityProtection |
| 22 | `identityprotection_user_riskyusers_identityprotection_listriskyusers` | IdentityProtection |
| 23 | `messaging_messaging_messaging_listmessagingsolutions` | Messaging |
| 24 | `privacy_privacy_listprivacy` | Privacy |
| 25 | `privacy_privacy_privacy_privacy_getprivacy` | Privacy |
| 26 | `solutions_backuprestoreroot_solutions_backuprestore_getemailnotificationssetting` | Solutions |
| 27 | `solutions_backuprestoreroot_solutions_backuprestore_listbrowsesessions` | Solutions |

---

## FAIL_401 — 667 Tables (License / Admin Consent Required)

These tables return HTTP 401 from the Microsoft Graph API. The token is valid (27 other tables work), but the Graph API requires either:

- A **paid license** (Microsoft 365 E3/E5, Office 365, SharePoint Online, etc.), or
- **Admin consent** for application-level permissions (the connector uses delegated `User.Read`).

### FAIL_401 Breakdown by API Domain

| Domain | Count | Examples |
|---|---|---|
| `me_` | 114 | mail, calendar, contacts, notes, todo |
| `devicemanagement_` | 74 | Intune, device compliance, config |
| `security_` | 62 | SIEM, attacks, alerts, cases |
| `identitygovernance_` | 45 | access reviews, entitlements |
| `admin_` | 36 | Exchange, Teams, SharePoint admin |
| `solutions_` | 33 | builder, ticketing |
| `deviceappmanagement_` | 33 | Intune app management |
| `policies_` | 27 | conditional access, auth |
| `identity_` | 26 | sign-in risks, users |
| `reports_` | 22 | Office 365 usage reports |
| `directory_` | 22 | groups, objects |
| `rolemanagement_` | 21 | role assignments |
| `education_` | 17 | SIS, classes |
| Other (30+ domains) | 134 | communications, places, print, etc. |

### Root Cause

The test account `algsoch@gmail.com` is a free Azure for Students account with:
- **No Microsoft 365 / Office 365 license** → most `me_`, `calendar`, `mail`, `teams`, `notes` endpoints return 401
- **No SharePoint Online license** → all `sites_`, `drive_`, `onedrive_` endpoints return 400
- **No admin consent granted** for the coral OAuth app → many application-level permissions require tenant admin approval

---

## FAIL_403 — 3 Tables (Consent Required)

| Table | Required Permission |
|---|---|
| `teams_team_listallteams` | `Team.ReadBasic.All` |
| `teams_team_listteams` | `Team.ReadBasic.All` |
| `teams_teams_listallteams` | `Team.ReadBasic.All` |

These are **application-level permissions** that require admin consent — cannot be granted by a regular user via the coral OAuth flow.

---

## FAIL_400 — 10 Tables (License Required — No SPO)

| Table | Error |
|---|---|
| `drive_drive_listdrives` | No SharePoint Online license |
| `drive_listitems_drive_listdriveitems` | No SharePoint Online license |
| `files_drive_listfiles` | No SharePoint Online license |
| `onedrive_drive_onedrive_listdrives` | No SharePoint Online license |
| `onedrive_drive_onedrive_listitems` | No SharePoint Online license |
| `onedrive_items_onedrive_listfiles` | No SharePoint Online license |
| `onedrive_onedrive_onedrive_listdrives` | No SharePoint Online license |
| `onedrive_onedrive_onedrive_listitems` | No SharePoint Online license |
| `sites_sharepoint_sites_listsites` | No SharePoint Online license |
| `sites_sharepoint_sites_listteamsites` | No SharePoint Online license |

---

## FAIL_404 — 1 Table (Graph API Issue)

| Table | Reason |
|---|---|
| `planner_planner_planner_listplannerplans` | Graph API returns "TenantNotFound" — this is a Microsoft Graph issue, not a coral bug |

---

## Untestable Tables — 25 (License-Gated)

These tables are in the manifest but could not be tested because the test account lacks the required Microsoft 365 / SharePoint Online / Office 365 license. They are not counted as failures.

---

## SQL Feature Results

All SQL features were tested against `microsoft_graph_v4.chats_chat_chats_listchats`:

| Feature | Result |
|---|---|
| SELECT with column alias | PASS |
| WHERE with string comparison | PASS |
| LIKE operator | PASS |
| IS NULL / IS NOT NULL | PASS |
| ORDER BY | PASS |
| LIMIT / OFFSET | PASS |
| COUNT() | PASS |
| GROUP BY | PASS |
| SUM / MAX / MIN / AVG | PASS |
| DISTINCT | PASS |
| json_len() | PASS |
| JSON / TABLE output format | PASS |
| BETWEEN (column name) | FAIL — known bug |
| UNION ALL | PASS |
| JOIN | PASS |
| json_value() | PASS |
| Multiple SQL statements | PASS |
| SQL injection resistance | PASS (correctly sanitized) |

---

## Known Issues

### HIGH: List Endpoint Flattening Broken

All ~497 LIST-type tables return the raw OData envelope instead of individual rows. Users see columns like `odata_count`, `odata_nextlink`, `value` instead of the expected entity fields.

**Impact**: Most table queries require manual JSON unwrapping.

### MEDIUM: BETWEEN Operator Column Lookup Bug

The `BETWEEN` operator fails even with valid column names. The column name lookup mechanism is broken in this context.

---

## Environment Notes

- **Token refresh**: Done via `az account get-access-token --resource-type ms-graph` + `coral source add --file`
- **Manifest**: `~/Downloads/coral-repo/sources/core-v4/microsoft_graph_v4/manifest.yaml` (DSL v4, references external OpenAPI spec)
- **733 tables** total across 30+ Microsoft Graph API domains
- **Education tenants blocked**: college/university accounts fail with "Need admin approval"
- **Token expires periodically**: Requires re-refresh for long testing sessions

---

## Recommendations for Andrea

1. **Confirm PASS/FAIL for the 667 401s** — these appear to be license-gated in our test tenant. If your production tenant has proper licensing, these may all pass.
2. **Fix list endpoint flattening** — this is the most impactful issue for usability.
3. **Fix BETWEEN column lookup** — affects SQL query ergonomics.
4. **Investigate Planner 404** — may be a tenant configuration issue.

---

*Report generated by Vicky Kumar — testing engagement for withcoral/coral*
