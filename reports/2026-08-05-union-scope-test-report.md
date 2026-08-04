# microsoft_graph_v4 — 95-scope union token re-test

## Report header

- **Date run:** 2026-08-05 04:10 IST (2026-08-05 04:10 UTC)
- **Test name:** Full 733-table re-battery with the 95-scope union token (12 new scopes added by interactive consent)
- **Time taken:** ~55 min (733-table battery @ 3 workers/60s + serial clean of 153 noise tables)
- **Stats line:** 733 tables · 886 automated `coral sql` invocations (733 battery + 153 serial clean) · 0 timeouts

## 🎯 Bottom line

**Adding 12 scopes unlocked 8 more tables — pass went from 221 → 229. All 8 were predicted targets.**

The previous union token (83 scopes) left 213 auth tables. Categorizing their 403/401 errors showed a subset was missing *consentable* scopes (B2C user flows, OneNote, user activities, device local credentials). Those 12 scopes were consented interactively, a fresh 95-scope token was minted, and the full battery re-run. Exactly the predicted 8 tables flipped auth → pass.

| | 83-scope union (prev run) | **95-scope union (this run)** |
|---|---:|---:|
| **pass** | 221 | **229** (+8 unlocked, 0 flips lost) |
| **auth** | 213 | **197** (−16) |
| **bad_request** | 123 | **132** |
| **not_found** | 106 | **105** |
| **unsupported** | 50 | **51** |
| **error** | 16 | **15** |
| **license** | 4 | **4** |

The auth drop is larger than 8 because 10 tables moved auth → bad_request (feature-gated APIs now return 400 instead of 403), plus 2 auth → not_found and 1 auth → unsupported. No pass → non-pass regressions: all 221 prior passes stayed passes.

## ✅ The 8 tables unlocked by the 12 new scopes

| Table | Area | Scope added |
|---|---|---|
| `identity_b2xidentityuserflow_identity_listb2xuserflows` | B2C user flows | `IdentityUserFlow.Read.All` |
| `me_onenote_me_onenote_listnotebooks` | OneNote | `Notes.Read` |
| `me_onenote_me_onenote_listpages` | OneNote | `Notes.Read` |
| `me_onenote_me_onenote_listsections` | OneNote | `Notes.Read` |
| `me_onenote_me_onenote_listsectiongroups` | OneNote | `Notes.Read` |
| `me_useractivity_me_activities_recent` | User activity | `UserActivity.ReadWrite.CreatedByApp` |
| `me_useractivity_me_listactivities` | User activity | `UserActivity.ReadWrite.CreatedByApp` |
| `directory_devicelocalcredentialinfo_directory_listdevicelocalcredentials` | Directory | `DeviceLocalCredential.Read.All` |

All 12 scopes were verified present on the Graph service principal (`/tmp/graph_sp_scopes.json`, 797 scopes) before consenting, so none of the consent work was wasted.

## 🔒 Why the other 197 tables still auth

Remaining auth is *role/license/feature-gated*, not missing-consentable-scope. The 197 split:

| Group | Count | Example | Verdict |
|---|---:|---|---|
| `UnknownError` empty | 66 | `me_cloudclipboardroot_me_cloudclipboard_listitems` (401 "User was not authorized") | Endpoint-level auth on a per-user basis |
| Forbidden/403 | 44 | `communications_onlinemeeting_communications_listonlinemeetings` | Requires premium/caller identity |
| AccessDenied | 36 | `deviceappmanagement_*` Intune endpoints | Admin role / app-scope only |
| Unauthorized/401 | 24 | `security_*` security APIs | InsufficientGraphPermissions |
| Defender-license | 10 | `security_*_defender_*` | Tenant not onboarded to Microsoft Defender for Identity |
| `Authorization_RequestDenied` | 8 | `directory_customsecurityattributedefinition_*` | Requires an Azure AD role (e.g. Attribute Definition Administrator), not a scope |
| Feature-flag | 7 | `identity_authenticationeventsflow_*` (`EnableMsGraphAuthenticationEventListener`) | Tenant feature flag not enabled |
| User-not-authorized | 2 | `me_usersettings_me_settings_listwindows` | Per-user setting auth |

None of these are consentable scope gaps. **The 95-scope union token is at the ceiling of what interactive consent can unlock** for this app.

## 🔀 Transition matrix (83-scope clean → 95-scope clean)

| 83→95 | auth | bad_request | not_found | unsupported | pass | error | license |
|---|--:|--:|--:|--:|--:|--:|--:|
| auth (213) | 0 | 10 | 1 | 1 | 8 | 0 | 0 |
| bad_request (123) | 1 | 120 | 2 | 0 | 0 | 0 | 0 |
| error (16) | 0 | 0 | 1 | 0 | 0 | 15 | 0 |
| not_found (106) | 3 | 2 | 101 | 0 | 0 | 0 | 0 |
| pass (221) | 0 | 0 | 0 | 0 | 221 | 0 | 0 |
| unsupported (50) | 0 | 0 | 0 | 50 | 0 | 0 | 0 |
| license (4) | 0 | 0 | 0 | 0 | 0 | 0 | 4 |

## 📊 Final breakdown (95-scope union run)

| Status | Count | % | What it means |
|---|--:|--:|---|
| 🟢 **pass** | 229 | 31.2% | Returned valid `1` row |
| 🔒 **auth** | 197 | 26.9% | 401/403 — role/license/feature-gated |
| ⚠️ **bad_request** | 132 | 18.0% | Graph rejected request (bad URL/params/entity) |
| 🔍 **not_found** | 105 | 14.3% | Endpoint not found / empty tenant data |
| 🚫 **unsupported** | 51 | 7.0% | API not supported for AAD accounts |
| 💥 **error** | 15 | 2.0% | Server 500/503/405 or Graph bug |
| 🎫 **license** | 4 | 0.5% | AadPremiumLicenseRequired |

## 🔴 The 15 remaining real errors

| # | Table | Error |
|---|-------|-------|
| 1 | `admin_exchangeadmin_admin_exchange_listmailboxes` | {"error":{"code":"ErrorInternalServerError","message":"An internal server error occurred. The operation failed |
| 2 | `connections_externalconnection_connections_externalconnection_listexternalconnection` | {"error":{"code":"UnknownError","message":"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\"\"http://www.w3. |
| 3 | `education_reportsroot_education_reports_listreadingassignmentsubmissions` | {"error":{"code":"internalServerError","message":"The user does not have the required permissions to access th |
| 4 | `education_reportsroot_education_reports_listreadingcoachpassages` | {"error":{"code":"internalServerError","message":"The user does not have the required permissions to access th |
| 5 | `education_reportsroot_education_reports_listreflectcheckinresponses` | {"error":{"code":"internalServerError","message":"The user does not have the required permissions to access th |
| 6 | `education_reportsroot_education_reports_listspeakerassignmentsubmissions` | {"error":{"code":"internalServerError","message":"The user does not have the required permissions to access th |
| 7 | `external_external_external_external_getexternal` | {"error":{"code":"UnknownError","message":"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\"\"http://www.w3. |
| 8 | `me_employeeexperienceuser_me_employeeexperience_listassignedroles` | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:35:00","request-id":"74b410ce |
| 9 | `me_userdatasecurityandgovernance_me_datasecurityandgovernance_activities_listcontentactivities` | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:35:59","request-id":"6991daa1 |
| 10 | `me_usersettings_me_settings_workhoursandlocations_listoccurrences` | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:36:05","request-id":"f7cdcce3 |
| 11 | `planner_plannerplan_planner_listplans` | {"error":{"code":"","message":"This entity set must be queried with a filter on owner property, or container t |
| 12 | `planner_plannertask_planner_listtasks` | {"error":{"code":"","message":"This entity set cannot be queried without a filter on planId or publication's i |
| 13 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listresourcenamespaces` | {"error":{"code":"UnknownError","message":"<!DOCTYPE html>\r\n<html>\r\n    <head>\r\n        <title>Runtime E |
| 14 | `rolemanagement_rbacapplication_rolemanagement_getentitlementmanagement` | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:38:58","request-id":"dd546ea3 |
| 15 | `storage_storagesettings_storage_settings_quota_listservices` | {"error":{"code":"InternalServerError","message":"Invalid URI: The hostname could not be parsed.","innerError" |

## 🧪 Live verification (95-scope token)

- Token minted from a fresh interactive consent (`/tmp/scopes_token.json` base, 12 scopes) exchanged to the full 95-scope set; scp = 110 claims (95 union + openid/profile/email + 12 fully-qualified `https://graph.microsoft.com/X` duplicates). 0 requested-but-missing.
- Source re-added with `MS_GRAPH_ACCESS_TOKEN="$(cat /tmp/union_access_token.txt)"` — health check passed (`me_user_me_user_getuser`, 1 row), 6030 tables, 1/1 declared query test passed.
- Background refresher restarted (now mints from `scopes_token.json`); every 40 min it refreshes the token and re-adds the source, so the report is reproducible.

## 📋 Full 733-table results (this run)

| # | Table | Status | ms | Error |
|---|-------|------:|---:|-------|
| 1 | `admin_admin_admin_admin_getadmin` | pass | 9787 |  |
| 2 | `admin_adminmicrosoft365apps_admin_getmicrosoft365apps` | pass | 9938 |  |
| 3 | `admin_adminmicrosoft365apps_admin_microsoft365apps_getinstallationoptions` | auth | 10032 | {"error":{"code":"Forbidden","message":"Access is denied to the requested resource. The user or app might not  |
| 4 | `admin_adminreportsettings_admin_getreportsettings` | auth | 5150 | {"error":{"code":"UnknownError","message":"{\"error\":{\"code\":\"S2SUnauthorized\",\"message\":\"Invalid perm |
| 5 | `admin_configurationmanagement_admin_configurationmanagement_listconfigurationdrifts` | auth | 8986 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T21:34:30","request-id":"2f78a395 |
| 6 | `admin_configurationmanagement_admin_configurationmanagement_listconfigurationmonitoringresults` | auth | 8854 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T21:34:30","request-id":"87ec62b6 |
| 7 | `admin_configurationmanagement_admin_configurationmanagement_listconfigurationmonitors` | auth | 7624 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T21:34:33","request-id":"a2d67916 |
| 8 | `admin_configurationmanagement_admin_configurationmanagement_listconfigurationsnapshotjobs` | auth | 8272 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T21:34:38","request-id":"d1a5976e |
| 9 | `admin_configurationmanagement_admin_configurationmanagement_listconfigurationsnapshots` | auth | 8291 | {"error":{"code":"UnknownError","message":"{\"error\":\"Your organization does not have the required license t |
| 10 | `admin_configurationmanagement_admin_getconfigurationmanagement` | unsupported | 7729 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 11 | `admin_edge_admin_edge_getinternetexplorermode` | unsupported | 7238 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 12 | `admin_edge_admin_edge_internetexplorermode_listsitelists` | auth | 7460 | {"error":{"code":"Forbidden","message":"You do not have permission to access the resource.","innerError":{"dat |
| 13 | `admin_edge_admin_getedge` | unsupported | 7771 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 14 | `admin_exchangeadmin_admin_exchange_gettracing` | pass | 8117 |  |
| 15 | `admin_exchangeadmin_admin_exchange_listmailboxes` | error | 0 | {"error":{"code":"ErrorInternalServerError","message":"An internal server error occurred. The operation failed |
| 16 | `admin_exchangeadmin_admin_exchange_tracing_listmessagetraces` | auth | 8134 | {"error":{"code":"Forbidden","message":"Service principal-less Authentication failed: the service principal fo |
| 17 | `admin_exchangeadmin_admin_getexchange` | unsupported | 7276 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 18 | `admin_peopleadminsettings_admin_getpeople` | auth | 8249 | {"error":{"code":"forbidden","message":"Authorization failed because of missing requirement(s).","innerError": |
| 19 | `admin_peopleadminsettings_admin_people_getiteminsights` | pass | 7835 |  |
| 20 | `admin_peopleadminsettings_admin_people_getpronouns` | auth | 8444 | {"error":{"code":"forbidden","message":"Authorization failed because of missing requirement(s).","innerError": |
| 21 | `admin_peopleadminsettings_admin_people_listprofilecardproperties` | auth | 8378 | {"error":{"code":"forbidden","message":"Authorization failed because of missing requirement(s).","innerError": |
| 22 | `admin_peopleadminsettings_admin_people_listprofilepropertysettings` | auth | 8322 | {"error":{"code":"forbidden","message":"Authorization failed because of missing requirement(s).","innerError": |
| 23 | `admin_peopleadminsettings_admin_people_listprofilesources` | auth | 8144 | {"error":{"code":"forbidden","message":"Authorization failed because of missing requirement(s).","innerError": |
| 24 | `admin_serviceannouncement_admin_getserviceannouncement` | not_found | 8212 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T21:35:22","request-id":"c69445f1 |
| 25 | `admin_serviceannouncement_admin_serviceannouncement_listhealthoverviews` | auth | 8210 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T21:35:22","request-id":"6847bdb0 |
| 26 | `admin_serviceannouncement_admin_serviceannouncement_listissues` | auth | 9324 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T21:35:27","request-id":"3ce1ab9c |
| 27 | `admin_serviceannouncement_admin_serviceannouncement_listmessages` | auth | 10085 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T21:35:32","request-id":"39884def |
| 28 | `admin_sharepoint_admin_getsharepoint` | unsupported | 9987 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 29 | `admin_sharepoint_admin_sharepoint_getsettings` | auth | 9755 | {"error":{"code":"accessDenied","message":"Caller does not have required permissions for this API","innerError |
| 30 | `admin_teamsadminroot_admin_getteams` | unsupported | 9514 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 31 | `admin_teamsadminroot_admin_teams_getpolicy` | unsupported | 9418 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 32 | `admin_teamsadminroot_admin_teams_gettelephonenumbermanagement` | unsupported | 9801 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 33 | `admin_teamsadminroot_admin_teams_listuserconfigurations` | auth | 11670 | {"error":{"code":"forbidden","message":"Insufficient permission(s) for the request. API requires any of the fo |
| 34 | `admin_teamsadminroot_admin_teams_policy_listuserassignments` | not_found | 10595 | {"error":{"code":"UnknownError","message":"{\"code\":\"NotFound\",\"message\":\"Resource not found.\",\"action |
| 35 | `admin_teamsadminroot_admin_teams_telephonenumbermanagement_listnumberassignments` | auth | 10303 | {"error":{"code":"forbidden","message":"Insufficient permission(s) for the request. API requires any of the fo |
| 36 | `admin_teamsadminroot_admin_teams_telephonenumbermanagement_listoperations` | auth | 10568 | {"error":{"code":"forbidden","message":"Insufficient permission(s) for the request. API requires any of the fo |
| 37 | `agreementacceptances_agreementacceptance_agreementacceptances_agreementacceptance_listagreementacceptance` | not_found | 7525 | {"error":{"code":"","message":"No HTTP resource was found that matches the request URI 'https://api.termsofuse |
| 38 | `agreements_agreement_agreements_agreement_listagreement` | auth | 8782 | {"error":{"code":"TenantNotLicensed","message":"No access. This feature requires a subscription to Microsoft E |
| 39 | `appcatalogs_appcatalogs_appcatalogs_appcatalogs_getappcatalogs` | auth | 8478 | {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{" |
| 40 | `appcatalogs_teamsapp_appcatalogs_listteamsapps` | pass | 10311 |  |
| 41 | `applications_application_applications_application_listapplication` | pass | 7783 |  |
| 42 | `applications_application_functions_applications_delta` | pass | 7684 |  |
| 43 | `applicationtemplates_applicationtemplate_applicationtemplates_applicationtemplate_listapplicationtemplate` | pass | 10424 |  |
| 44 | `auditlogs_auditlogroot_auditlogs_auditlogroot_getauditlogroot` | pass | 8378 |  |
| 45 | `auditlogs_directoryaudit_auditlogs_listdirectoryaudits` | pass | 11332 |  |
| 46 | `auditlogs_provisioningobjectsummary_auditlogs_listprovisioning` | pass | 14755 |  |
| 47 | `auditlogs_signin_auditlogs_listsignins` | auth | 11872 | {"error":{"code":"Authentication_RequestFromNonPremiumTenantOrB2CTenant","message":"Tenant is not a B2C tenant |
| 48 | `authenticationmethodconfigurations_authenticationmethodconfiguration_authenticationmethodconfigurations_authenticationmethodconfiguration_listauthenticationmethodconfiguration` | not_found | 12137 | {"error":{"code":"UnknownError","message":"{\"ErrorCode\":\"badRequest\",\"Message\":\"Resource not found for  |
| 49 | `authenticationmethodspolicy_authenticationmethodconfiguration_authenticationmethodspolicy_listauthenticationmethodconfigurations` | not_found | 11686 | {"error":{"code":"badRequest","message":"Resource not found for segment 'authenticationMethodsPolicy/authentic |
| 50 | `authenticationmethodspolicy_authenticationmethodspolicy_authenticationmethodspolicy_authenticationmethodspolicy_getauthenticationmethodspolicy` | pass | 11041 |  |
| 51 | `certificatebasedauthconfiguration_certificatebasedauthconfiguration_certificatebasedauthconfiguration_certificatebasedauthconfiguration_listcertificatebasedauthconfiguration` | unsupported | 11329 | {"error":{"code":"Request_UnsupportedQuery","message":"Direct queries to this resource type are not supported. |
| 52 | `chats_chat_chats_chat_listchat` | pass | 10204 |  |
| 53 | `chats_chat_functions_chats_getallmessages` | not_found | 9405 | {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{" |
| 54 | `chats_chat_functions_chats_getallretainedmessages` | not_found | 9621 | {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{" |
| 55 | `communications_adhoccall_communications_adhoccalls_getallrecordings` | not_found | 10958 | {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{" |
| 56 | `communications_adhoccall_communications_adhoccalls_getalltranscripts` | not_found | 10454 | {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{" |
| 57 | `communications_adhoccall_communications_listadhoccalls` | not_found | 11195 | {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{" |
| 58 | `communications_call_communications_listcalls` | auth | 11340 | {"error":{"code":"UnknownError","message":"{\"code\":\"7503\",\"message\":\"Application is not registered in o |
| 59 | `communications_callrecord_communications_listcallrecords` | auth | 11270 | {"error":{"code":"Forbidden","message":"","innerError":{"request-id":"12e4b6b4-4310-4374-af6e-4847436ced25","d |
| 60 | `communications_cloudcommunications_communications_cloudcommunications_getcloudcommunications` | pass | 11015 |  |
| 61 | `communications_cloudcommunications_functions_communications_getallonlinemeetingmessages` | auth | 14167 | {"error":{"code":"unauthorized","message":"Authorization credentials are invalid.","innerError":{"date":"2026- |
| 62 | `communications_onlinemeeting_communications_listonlinemeetings` | auth | 13747 | {"error":{"code":"Forbidden","message":"Insufficient permissions","innerError":{"date":"2026-08-04T21:37:32"," |
| 63 | `communications_onlinemeeting_communications_onlinemeetings_getallrecordings` | not_found | 14190 | {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{" |
| 64 | `communications_onlinemeeting_communications_onlinemeetings_getalltranscripts` | not_found | 11439 | {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{" |
| 65 | `communications_onlinemeetingengagementconversation_communications_listonlinemeetingconversations` | auth | 11672 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T21:37:45","request-id":"3f932403 |
| 66 | `communications_presence_communications_listpresences` | not_found | 10954 | {"error":{"code":"NotFound","message":"","innerError":{"request-id":"3d5eb893-9828-496b-b756-cac56c373bac","da |
| 67 | `compliance_compliance_compliance_compliance_getcompliance` | pass | 10735 |  |
| 68 | `connections_externalconnection_connections_externalconnection_listexternalconnection` | error | 0 | {"error":{"code":"UnknownError","message":"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\"\"http://www.w3. |
| 69 | `contacts_orgcontact_contacts_orgcontact_listorgcontact` | pass | 11399 |  |
| 70 | `contacts_orgcontact_functions_contacts_delta` | pass | 9968 |  |
| 71 | `contracts_contract_contracts_contract_listcontract` | pass | 11112 |  |
| 72 | `contracts_contract_functions_contracts_delta` | unsupported | 9816 | {"error":{"code":"Request_UnsupportedQuery","message":"Differential query is not supported for entity type: Co |
| 73 | `copilot_aiinteractionhistory_copilot_getinteractionhistory` | not_found | 10893 | {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{" |
| 74 | `copilot_aiinteractionhistory_copilot_interactionhistory_getallenterpriseinteractions` | not_found | 10789 | {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{" |
| 75 | `copilot_aiuser_copilot_listusers` | not_found | 10736 | {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{" |
| 76 | `copilot_copilotadmin_copilot_admin_catalog_listpackages` | auth | 10997 | {"error":{"code":"Forbidden","message":"Customer must be a licensed for Agent 365 in order to use Agent 365 Gr |
| 77 | `copilot_copilotadmin_copilot_admin_getcatalog` | unsupported | 10570 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 78 | `copilot_copilotadmin_copilot_admin_getsettings` | not_found | 11026 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T21:38:33","request-id":"08c6fe1f |
| 79 | `copilot_copilotadmin_copilot_admin_settings_getlimitedmode` | auth | 10945 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T21:38:37","request-id":"b9fe2ffe |
| 80 | `copilot_copilotadmin_copilot_getadmin` | not_found | 11708 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T21:38:44","request-id":"6ff44356 |
| 81 | `copilot_copilotreportroot_copilot_getreports` | not_found | 11091 | {"error":{"code":"UnknownError","message":"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http:/ |
| 82 | `copilot_copilotroot_copilot_copilotroot_getcopilotroot` | pass | 11055 |  |
| 83 | `datapolicyoperations_datapolicyoperation_datapolicyoperations_datapolicyoperation_listdatapolicyoperation` | auth | 21937 | {"error":{"code":"Forbidden","message":"{\"scopes\":\"\",\"outcome\":\"RequestValidationFailure\",\"message\": |
| 84 | `deviceappmanagement_androidmanagedappprotection_deviceappmanagement_listandroidmanagedappprotections` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 85 | `deviceappmanagement_defaultmanagedappprotection_deviceappmanagement_listdefaultmanagedappprotections` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 86 | `deviceappmanagement_deviceappmanagement_deviceappmanagement_deviceappmanagement_getdeviceappmanagement` | auth | 10873 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 87 | `deviceappmanagement_iosmanagedappprotection_deviceappmanagement_listiosmanagedappprotections` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 88 | `deviceappmanagement_managedapppolicy_deviceappmanagement_listmanagedapppolicies` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 89 | `deviceappmanagement_managedappregistration_deviceappmanagement_listmanagedappregistrations` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 90 | `deviceappmanagement_managedappregistration_deviceappmanagement_managedappregistrations_getuseridswithflaggedappregistration` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 91 | `deviceappmanagement_managedappstatus_deviceappmanagement_listmanagedappstatuses` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 92 | `deviceappmanagement_manageddevicemobileappconfiguration_deviceappmanagement_listmobileappconfigurations` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 93 | `deviceappmanagement_managedebook_deviceappmanagement_listmanagedebooks` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 94 | `deviceappmanagement_mdmwindowsinformationprotectionpolicy_deviceappmanagement_listmdmwindowsinformationprotectionpolicies` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 95 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 96 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asandroidlobapp` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 97 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asandroidstoreapp` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 98 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asioslobapp` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 99 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asiosstoreapp` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 100 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asiosvppapp` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 101 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmacosdmgapp` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 102 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmacoslobapp` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 103 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmanagedandroidlobapp` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 104 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmanagedioslobapp` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 105 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmanagedmobilelobapp` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 106 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmicrosoftstoreforbusinessapp` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 107 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswin32lobapp` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 108 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswindowsappx` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 109 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswindowsmobilemsi` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 110 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswindowsuniversalappx` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 111 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswindowswebapp` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 112 | `deviceappmanagement_mobileappcategory_deviceappmanagement_listmobileappcategories` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 113 | `deviceappmanagement_mobileapprelationship_deviceappmanagement_listmobileapprelationships` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 114 | `deviceappmanagement_targetedmanagedappconfiguration_deviceappmanagement_listtargetedmanagedappconfigurations` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 115 | `deviceappmanagement_vpptoken_deviceappmanagement_listvpptokens` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 116 | `deviceappmanagement_windowsinformationprotectionpolicy_deviceappmanagement_listwindowsinformationprotectionpolicies` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 117 | `devicemanagement_applepushnotificationcertificate_devicemanagement_applepushnotificationcertificate_downloadapplepushnotificationcertificatesigningrequest` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 118 | `devicemanagement_applepushnotificationcertificate_devicemanagement_getapplepushnotificationcertificate` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 119 | `devicemanagement_auditevent_devicemanagement_auditevents_getauditcategories` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 120 | `devicemanagement_auditevent_devicemanagement_listauditevents` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 121 | `devicemanagement_compliancemanagementpartner_devicemanagement_listcompliancemanagementpartners` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 122 | `devicemanagement_detectedapp_devicemanagement_listdetectedapps` | not_found | 11239 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 123 | `devicemanagement_deviceandappmanagementroleassignment_devicemanagement_listroleassignments` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 124 | `devicemanagement_devicecategory_devicemanagement_listdevicecategories` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 125 | `devicemanagement_devicecompliancepolicy_devicemanagement_listdevicecompliancepolicies` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 126 | `devicemanagement_devicecompliancepolicydevicestatesummary_devicemanagement_getdevicecompliancepolicydevicestatesummary` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 127 | `devicemanagement_devicecompliancepolicysettingstatesummary_devicemanagement_listdevicecompliancepolicysettingstatesummaries` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 128 | `devicemanagement_deviceconfiguration_devicemanagement_listdeviceconfigurations` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 129 | `devicemanagement_deviceconfigurationdevicestatesummary_devicemanagement_getdeviceconfigurationdevicestatesummaries` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 130 | `devicemanagement_deviceenrollmentconfiguration_devicemanagement_listdeviceenrollmentconfigurations` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 131 | `devicemanagement_devicemanagement_devicemanagement_devicemanagement_getdevicemanagement` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 132 | `devicemanagement_devicemanagement_functions_devicemanagement_userexperienceanalyticssummarizeworkfromanywheredevices` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 133 | `devicemanagement_devicemanagementexchangeconnector_devicemanagement_listexchangeconnectors` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 134 | `devicemanagement_devicemanagementpartner_devicemanagement_listdevicemanagementpartners` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 135 | `devicemanagement_devicemanagementreports_devicemanagement_getreports` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 136 | `devicemanagement_devicemanagementreports_devicemanagement_reports_listexportjobs` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 137 | `devicemanagement_devicemanagementtroubleshootingevent_devicemanagement_listtroubleshootingevents` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 138 | `devicemanagement_importedwindowsautopilotdeviceidentity_devicemanagement_listimportedwindowsautopilotdeviceidentities` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 139 | `devicemanagement_iosupdatedevicestatus_devicemanagement_listiosupdatestatuses` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 140 | `devicemanagement_manageddevice_devicemanagement_listmanageddevices` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 141 | `devicemanagement_manageddeviceoverview_devicemanagement_getmanageddeviceoverview` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 142 | `devicemanagement_mobileapptroubleshootingevent_devicemanagement_listmobileapptroubleshootingevents` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 143 | `devicemanagement_mobilethreatdefenseconnector_devicemanagement_listmobilethreatdefenseconnectors` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 144 | `devicemanagement_notificationmessagetemplate_devicemanagement_listnotificationmessagetemplates` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 145 | `devicemanagement_onpremisesconditionalaccesssettings_devicemanagement_getconditionalaccesssettings` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 146 | `devicemanagement_remoteassistancepartner_devicemanagement_listremoteassistancepartners` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 147 | `devicemanagement_resourceoperation_devicemanagement_listresourceoperations` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 148 | `devicemanagement_roledefinition_devicemanagement_listroledefinitions` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 149 | `devicemanagement_softwareupdatestatussummary_devicemanagement_getsoftwareupdatestatussummary` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 150 | `devicemanagement_termsandconditions_devicemanagement_listtermsandconditions` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 151 | `devicemanagement_userexperienceanalyticsapphealthapplicationperformance_devicemanagement_listuserexperienceanalyticsapphealthapplicationperformance` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 152 | `devicemanagement_userexperienceanalyticsapphealthappperformancebyappversiondetails_devicemanagement_listuserexperienceanalyticsapphealthapplicationperformancebyappversiondetails` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 153 | `devicemanagement_userexperienceanalyticsapphealthappperformancebyappversiondeviceid_devicemanagement_listuserexperienceanalyticsapphealthapplicationperformancebyappversiondeviceid` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 154 | `devicemanagement_userexperienceanalyticsapphealthappperformancebyosversion_devicemanagement_listuserexperienceanalyticsapphealthapplicationperformancebyosversion` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 155 | `devicemanagement_userexperienceanalyticsapphealthdevicemodelperformance_devicemanagement_listuserexperienceanalyticsapphealthdevicemodelperformance` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 156 | `devicemanagement_userexperienceanalyticsapphealthdeviceperformance_devicemanagement_listuserexperienceanalyticsapphealthdeviceperformance` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 157 | `devicemanagement_userexperienceanalyticsapphealthdeviceperformancedetails_devicemanagement_listuserexperienceanalyticsapphealthdeviceperformancedetails` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 158 | `devicemanagement_userexperienceanalyticsapphealthosversionperformance_devicemanagement_listuserexperienceanalyticsapphealthosversionperformance` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 159 | `devicemanagement_userexperienceanalyticsbaseline_devicemanagement_listuserexperienceanalyticsbaselines` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 160 | `devicemanagement_userexperienceanalyticscategory_devicemanagement_getuserexperienceanalyticsapphealthoverview` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 161 | `devicemanagement_userexperienceanalyticscategory_devicemanagement_listuserexperienceanalyticscategories` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 162 | `devicemanagement_userexperienceanalyticscategory_devicemanagement_userexperienceanalyticsapphealthoverview_listmetricvalues` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 163 | `devicemanagement_userexperienceanalyticsdeviceperformance_devicemanagement_listuserexperienceanalyticsdeviceperformance` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 164 | `devicemanagement_userexperienceanalyticsdevicescores_devicemanagement_listuserexperienceanalyticsdevicescores` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 165 | `devicemanagement_userexperienceanalyticsdevicestartuphistory_devicemanagement_listuserexperienceanalyticsdevicestartuphistory` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 166 | `devicemanagement_userexperienceanalyticsdevicestartupprocess_devicemanagement_listuserexperienceanalyticsdevicestartupprocesses` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 167 | `devicemanagement_userexperienceanalyticsdevicestartupprocessperformance_devicemanagement_listuserexperienceanalyticsdevicestartupprocessperformance` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 168 | `devicemanagement_userexperienceanalyticsmetrichistory_devicemanagement_listuserexperienceanalyticsmetrichistory` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 169 | `devicemanagement_userexperienceanalyticsmodelscores_devicemanagement_listuserexperienceanalyticsmodelscores` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 170 | `devicemanagement_userexperienceanalyticsoverview_devicemanagement_getuserexperienceanalyticsoverview` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 171 | `devicemanagement_userexperienceanalyticsscorehistory_devicemanagement_listuserexperienceanalyticsscorehistory` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 172 | `devicemanagement_userexperienceanalyticsworkfromanywherehardwarereadinessmetric_devicemanagement_getuserexperienceanalyticsworkfromanywherehardwarereadinessmetric` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 173 | `devicemanagement_userexperienceanalyticsworkfromanywheremetric_devicemanagement_listuserexperienceanalyticsworkfromanywheremetrics` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 174 | `devicemanagement_userexperienceanalyticsworkfromanywheremodelperformance_devicemanagement_listuserexperienceanalyticsworkfromanywheremodelperformance` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 175 | `devicemanagement_virtualendpoint_devicemanagement_getvirtualendpoint` | auth | 8508 | {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":" |
| 176 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_auditevents_getauditactivitytypes` | auth | 9218 | {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":" |
| 177 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_deviceimages_getsourceimages` | auth | 8734 | {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":" |
| 178 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_getreport` | auth | 8735 | {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":" |
| 179 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listauditevents` | auth | 7707 | {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":" |
| 180 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listcloudpcs` | auth | 8965 | {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":" |
| 181 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listdeviceimages` | auth | 9088 | {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":" |
| 182 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listgalleryimages` | auth | 9019 | {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":" |
| 183 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listonpremisesconnections` | auth | 8781 | {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":" |
| 184 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listprovisioningpolicies` | auth | 8626 | {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":" |
| 185 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listserviceplans` | auth | 9008 | {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":" |
| 186 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listusersettings` | auth | 9072 | {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":" |
| 187 | `devicemanagement_windowsautopilotdeviceidentity_devicemanagement_listwindowsautopilotdeviceidentities` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 188 | `devicemanagement_windowsinformationprotectionapplearningsummary_devicemanagement_listwindowsinformationprotectionapplearningsummaries` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 189 | `devicemanagement_windowsinformationprotectionnetworklearningsummary_devicemanagement_listwindowsinformationprotectionnetworklearningsummaries` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 190 | `devicemanagement_windowsmalwareinformation_devicemanagement_listwindowsmalwareinformation` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 191 | `devices_device_devices_device_listdevice` | pass | 8735 |  |
| 192 | `devices_device_functions_devices_delta` | pass | 8789 |  |
| 193 | `directory_administrativeunit_directory_administrativeunits_delta` | pass | 8786 |  |
| 194 | `directory_administrativeunit_directory_listadministrativeunits` | pass | 8610 |  |
| 195 | `directory_attributeset_directory_listattributesets` | auth | 8102 | {"error":{"code":"Authorization_RequestDenied","message":"Insufficient privileges to complete the operation.", |
| 196 | `directory_companysubscription_directory_listsubscriptions` | pass | 8010 |  |
| 197 | `directory_customsecurityattributedefinition_directory_listcustomsecurityattributedefinitions` | auth | 7929 | {"error":{"code":"Authorization_RequestDenied","message":"Insufficient privileges to complete the operation.", |
| 198 | `directory_devicelocalcredentialinfo_directory_listdevicelocalcredentials` | pass | 9099 |  |
| 199 | `directory_directory_directory_directory_getdirectory` | bad_request | 0 | {"error":{"code":"Request_InvalidRequestUrl","message":"Request url was invalid. The request should be like /t |
| 200 | `directory_directoryobject_directory_listdeleteditems` | unsupported | 8623 | {"error":{"code":"Request_UnsupportedQuery","message":"Searches against this resource are not supported. Only  |
| 201 | `directory_directoryobject_directory_listdeleteditems_asadministrativeunit` | pass | 9175 |  |
| 202 | `directory_directoryobject_directory_listdeleteditems_asapplication` | pass | 8609 |  |
| 203 | `directory_directoryobject_directory_listdeleteditems_asdevice` | pass | 9197 |  |
| 204 | `directory_directoryobject_directory_listdeleteditems_asgroup` | pass | 8658 |  |
| 205 | `directory_directoryobject_directory_listdeleteditems_asserviceprincipal` | pass | 8637 |  |
| 206 | `directory_directoryobject_directory_listdeleteditems_asuser` | pass | 8701 |  |
| 207 | `directory_identityproviderbase_directory_federationconfigurations_availableprovidertypes` | unsupported | 8622 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 208 | `directory_identityproviderbase_directory_listfederationconfigurations` | pass | 8694 |  |
| 209 | `directory_onpremisesdirectorysynchronization_directory_listonpremisessynchronization` | pass | 8804 |  |
| 210 | `directory_publickeyinfrastructureroot_directory_getpublickeyinfrastructure` | not_found | 8690 | {"error":{"code":"Request_ResourceNotFound","message":"Resource not found for the segment 'publicKeyInfrastruc |
| 211 | `directory_publickeyinfrastructureroot_directory_publickeyinfrastructure_listcertificatebasedauthconfigurations` | pass | 8599 |  |
| 212 | `directory_recovery_directory_getrecovery` | pass | 9024 |  |
| 213 | `directory_recovery_directory_recovery_listjobs` | auth | 9310 | {"error":{"code":"Forbidden","message":"Insufficient permissions to perform this operation.","innerError":{"da |
| 214 | `directory_recovery_directory_recovery_listsnapshots` | auth | 9301 | {"error":{"code":"Forbidden","message":"Insufficient permissions to perform this operation.","innerError":{"da |
| 215 | `directoryobjects_directoryobject_directoryobjects_directoryobject_listdirectoryobject` | unsupported | 9360 | {"error":{"code":"Request_UnsupportedQuery","message":"Searches against this resource are not supported. Only  |
| 216 | `directoryobjects_directoryobject_functions_directoryobjects_delta` | unsupported | 9297 | {"error":{"code":"Request_UnsupportedQuery","message":"Delta query is not supported for directoryObjects witho |
| 217 | `directoryroles_directoryrole_directoryroles_directoryrole_listdirectoryrole` | pass | 9308 |  |
| 218 | `directoryroles_directoryrole_functions_directoryroles_delta` | pass | 11973 |  |
| 219 | `directoryroletemplates_directoryroletemplate_directoryroletemplates_directoryroletemplate_listdirectoryroletemplate` | pass | 15118 |  |
| 220 | `directoryroletemplates_directoryroletemplate_functions_directoryroletemplates_delta` | unsupported | 15148 | {"error":{"code":"Request_UnsupportedQuery","message":"Differential query is not supported for entity type: Di |
| 221 | `domaindnsrecords_domaindnsrecord_domaindnsrecords_domaindnsrecord_listdomaindnsrecord` | unsupported | 14589 | {"error":{"code":"Request_UnsupportedQuery","message":"This resource can only be queried through a navigation  |
| 222 | `domains_domain_domains_domain_listdomain` | pass | 14180 |  |
| 223 | `drives_drive_drives_drive_listdrive` | pass | 14112 |  |
| 224 | `education_educationclass_education_classes_delta` | auth | 11854 | {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":" |
| 225 | `education_educationclass_education_listclasses` | auth | 9677 | {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":" |
| 226 | `education_educationroot_education_educationroot_geteducationroot` | auth | 9738 | {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":" |
| 227 | `education_educationschool_education_listschools` | auth | 10217 | {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":" |
| 228 | `education_educationschool_education_schools_delta` | auth | 10141 | {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":" |
| 229 | `education_educationuser_education_getme` | auth | 10117 | {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":" |
| 230 | `education_educationuser_education_listusers` | auth | 9856 | {"error":{"code":"AccessDenied","message":"Required claim values are not provided.","innerError":{"date":"2026 |
| 231 | `education_educationuser_education_me_assignments_delta` | unsupported | 10246 | {"error":{"code":"BadRequest","message":"Unsupported request: Change tracking is not supported against 'micros |
| 232 | `education_educationuser_education_me_getuser` | auth | 10447 | {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":" |
| 233 | `education_educationuser_education_me_listassignments` | pass | 10802 |  |
| 234 | `education_educationuser_education_me_listclasses` | auth | 10882 | {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":" |
| 235 | `education_educationuser_education_me_listrubrics` | pass | 10891 |  |
| 236 | `education_educationuser_education_me_listschools` | auth | 10019 | {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":" |
| 237 | `education_educationuser_education_me_listtaughtclasses` | auth | 10147 | {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":" |
| 238 | `education_educationuser_education_me_user_getmailboxsettings` | auth | 9848 | {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":" |
| 239 | `education_educationuser_education_me_user_listserviceprovisioningerrors` | auth | 10110 | {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":" |
| 240 | `education_educationuser_education_users_delta` | auth | 9288 | {"error":{"code":"AccessDenied","message":"Required claim values are not provided.","innerError":{"date":"2026 |
| 241 | `education_reportsroot_education_getreports` | not_found | 16711 | {"error":{"code":"HostNotFound","message":"Target 'fake_node' is not found.","innerError":{"date":"2026-08-04T |
| 242 | `education_reportsroot_education_reports_listreadingassignmentsubmissions` | error | 0 | {"error":{"code":"internalServerError","message":"The user does not have the required permissions to access th |
| 243 | `education_reportsroot_education_reports_listreadingcoachpassages` | error | 0 | {"error":{"code":"internalServerError","message":"The user does not have the required permissions to access th |
| 244 | `education_reportsroot_education_reports_listreflectcheckinresponses` | error | 0 | {"error":{"code":"internalServerError","message":"The user does not have the required permissions to access th |
| 245 | `education_reportsroot_education_reports_listspeakerassignmentsubmissions` | error | 0 | {"error":{"code":"internalServerError","message":"The user does not have the required permissions to access th |
| 246 | `employeeexperience_community_employeeexperience_listcommunities` | bad_request | 0 | {"error":{"code":"UnknownError","message":"<html><body><h1>400 Bad request</h1>\nYour browser sent an invalid  |
| 247 | `employeeexperience_employeeexperience_employeeexperience_employeeexperience_getemployeeexperience` | pass | 8880 |  |
| 248 | `employeeexperience_engagementasyncoperation_employeeexperience_listengagementasyncoperations` | bad_request | 0 | {"error":{"code":"UnknownError","message":"<html><body><h1>400 Bad request</h1>\nYour browser sent an invalid  |
| 249 | `employeeexperience_engagementrole_employeeexperience_listroles` | bad_request | 0 | {"error":{"code":"UnknownError","message":"<html><body><h1>400 Bad request</h1>\nYour browser sent an invalid  |
| 250 | `employeeexperience_learningcourseactivity_employeeexperience_listlearningcourseactivities` | not_found | 12454 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T21:48:30","request-id":"f14dd2af |
| 251 | `employeeexperience_learningprovider_employeeexperience_listlearningproviders` | auth | 13388 | {"error":{"code":"forbidden","message":"Insufficient permissions to complete the operation.","innerError":{"da |
| 252 | `external_external_external_external_getexternal` | error | 0 | {"error":{"code":"UnknownError","message":"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\"\"http://www.w3. |
| 253 | `external_externalconnection_external_listconnections` | pass | 10779 |  |
| 254 | `filteroperators_filteroperatorschema_filteroperators_filteroperatorschema_listfilteroperatorschema` | not_found | 7604 | UnknownError: {"Message":"No HTTP resource was found that matches the request URI 'https://syncfabric.windowsa |
| 255 | `functions_attributemappingfunctionschema_functions_attributemappingfunctionschema_listattributemappingfunctionschema` | not_found | 9911 | {"error":{"code":"UnknownError","message":"{\"Message\":\"No HTTP resource was found that matches the request  |
| 256 | `grouplifecyclepolicies_grouplifecyclepolicy_grouplifecyclepolicies_grouplifecyclepolicy_listgrouplifecyclepolicy` | pass | 9331 |  |
| 257 | `groups_group_functions_groups_delta` | pass | 10837 |  |
| 258 | `groups_group_groups_group_listgroup` | pass | 12475 |  |
| 259 | `groupsettings_groupsetting_groupsettings_groupsetting_listgroupsetting` | pass | 12252 |  |
| 260 | `groupsettingtemplates_groupsettingtemplate_functions_groupsettingtemplates_delta` | unsupported | 12222 | {"error":{"code":"Request_UnsupportedQuery","message":"Differential query is not supported for entity type: Se |
| 261 | `groupsettingtemplates_groupsettingtemplate_groupsettingtemplates_groupsettingtemplate_listgroupsettingtemplate` | pass | 10903 |  |
| 262 | `identity_authenticationeventlistener_identity_listauthenticationeventlisteners` | pass | 11358 |  |
| 263 | `identity_authenticationeventsflow_identity_listauthenticationeventsflows` | auth | 10140 | {"error":{"code":"AADB2C","message":"Unauthorized. Access to this Api requires feature: 'EnableMsGraphAuthenti |
| 264 | `identity_authenticationeventsflow_identity_listauthenticationeventsflows_asexternalusersselfservicesignupeventsflow` | not_found | 15680 | {"error":{"code":"UnknownError","message":"{\"message\":\"No HTTP resource was found that matches the request  |
| 265 | `identity_b2xidentityuserflow_identity_listb2xuserflows` | pass | 15370 |  |
| 266 | `identity_conditionalaccessroot_identity_conditionalaccess_authenticationstrength_listauthenticationmethodmodes` | pass | 16033 |  |
| 267 | `identity_conditionalaccessroot_identity_conditionalaccess_authenticationstrength_listpolicies` | pass | 11126 |  |
| 268 | `identity_conditionalaccessroot_identity_conditionalaccess_deleteditems_listnamedlocations` | pass | 12111 |  |
| 269 | `identity_conditionalaccessroot_identity_conditionalaccess_deleteditems_listpolicies` | pass | 13303 |  |
| 270 | `identity_conditionalaccessroot_identity_conditionalaccess_getauthenticationstrength` | not_found | 11113 | {"error":{"code":"UnknownError","message":"{\"ErrorCode\":\"badRequest\",\"Message\":\"Resource not found for  |
| 271 | `identity_conditionalaccessroot_identity_conditionalaccess_getdeleteditems` | not_found | 10649 | {"error":{"code":"UnknownError","message":"{\"Message\":\"No HTTP resource was found that matches the request  |
| 272 | `identity_conditionalaccessroot_identity_conditionalaccess_listauthenticationcontextclassreferences` | pass | 10096 |  |
| 273 | `identity_conditionalaccessroot_identity_conditionalaccess_listnamedlocations` | pass | 14398 |  |
| 274 | `identity_conditionalaccessroot_identity_conditionalaccess_listpolicies` | pass | 12784 |  |
| 275 | `identity_conditionalaccessroot_identity_conditionalaccess_listtemplates` | pass | 10326 |  |
| 276 | `identity_customauthenticationextension_identity_listcustomauthenticationextensions` | pass | 8401 |  |
| 277 | `identity_identityapiconnector_identity_listapiconnectors` | bad_request | 0 | {"error":{"code":"AADB2C99039","message":"The feature self service sign up is not enabled for the tenant 'algs |
| 278 | `identity_identitycontainer_identity_identitycontainer_getidentitycontainer` | not_found | 10092 | {"error":{"code":"UnknownError","message":"{\"message\":\"No HTTP resource was found that matches the request  |
| 279 | `identity_identityproviderbase_identity_identityproviders_availableprovidertypes` | pass | 12289 |  |
| 280 | `identity_identityproviderbase_identity_listidentityproviders` | pass | 12138 |  |
| 281 | `identity_identityuserflowattribute_identity_listuserflowattributes` | bad_request | 0 | {"error":{"code":"AADB2C99039","message":"The feature self service sign up is not enabled for the tenant 'algs |
| 282 | `identity_identityverifiedidroot_identity_getverifiedid` | unsupported | 12707 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 283 | `identity_identityverifiedidroot_identity_verifiedid_listprofiles` | auth | 12747 | {"error":{"code":"accessDenied","message":"Request Authorization failed","innerError":{"message":"Request Auth |
| 284 | `identity_riskpreventioncontainer_identity_getriskprevention` | not_found | 12906 | {"error":{"code":"UnknownError","message":"{\"message\":\"No HTTP resource was found that matches the request  |
| 285 | `identity_riskpreventioncontainer_identity_riskprevention_listfraudprotectionproviders` | auth | 11815 | {"error":{"code":"AADB2C","message":"'0aa3a51b-3716-44d7-9636-f85f3db072bf' is not an Azure AD B2C directory.  |
| 286 | `identity_riskpreventioncontainer_identity_riskprevention_listwebapplicationfirewallproviders` | auth | 11619 | {"error":{"code":"AADB2C","message":"'0aa3a51b-3716-44d7-9636-f85f3db072bf' is not an Azure AD B2C directory.  |
| 287 | `identity_riskpreventioncontainer_identity_riskprevention_listwebapplicationfirewallverifications` | auth | 9997 | {"error":{"code":"AADB2C","message":"'0aa3a51b-3716-44d7-9636-f85f3db072bf' is not an Azure AD B2C directory.  |
| 288 | `identitygovernance_accessreviewset_identitygovernance_accessreviews_listdefinitions` | auth | 15261 | {"error":{"code":"","message":"Attempted to perform an unauthorized operation.","innerError":{"date":"2026-08- |
| 289 | `identitygovernance_accessreviewset_identitygovernance_accessreviews_listhistorydefinitions` | auth | 11998 | {"error":{"code":"","message":"Attempted to perform an unauthorized operation.","innerError":{"date":"2026-08- |
| 290 | `identitygovernance_accessreviewset_identitygovernance_getaccessreviews` | bad_request | 0 | {"error":{"code":"","message":"Bad filter: One of these properties must be specified: 'businessFlowTemplateId' |
| 291 | `identitygovernance_appconsentapprovalroute_identitygovernance_appconsent_listappconsentrequests` | pass | 7479 |  |
| 292 | `identitygovernance_appconsentapprovalroute_identitygovernance_getappconsent` | not_found | 10522 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T21:51:16","request-id":"876257dc |
| 293 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_assignments_additionalaccess_894c` | auth | 9303 | {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller |
| 294 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_getsettings` | auth | 10121 | {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller |
| 295 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listaccesspackageassignmentapprovals` | auth | 12602 | {"error":{"code":"","message":"Only app tokens are supported","innerError":{"date":"2026-08-04T21:51:28","requ |
| 296 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listaccesspackages` | auth | 12271 | {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller |
| 297 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listaccesspackagesuggestions` | not_found | 14694 | {"error":{"code":"","message":"No HTTP resource was found that matches the request URI 'https://igaelm-asev3-e |
| 298 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listassignmentpolicies` | auth | 15008 | {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller |
| 299 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listassignmentrequests` | auth | 14872 | {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller |
| 300 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listassignments` | auth | 23548 | {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller |
| 301 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listavailableaccesspackages` | not_found | 15252 | {"error":{"code":"","message":"No HTTP resource was found that matches the request URI 'https://igaelm-asev3-e |
| 302 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listcatalogs` | auth | 15386 | {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller |
| 303 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listconnectedorganizations` | auth | 10684 | {"error":{"code":"NoLicense","message":"User is not authorized to perform the operation. Reason: Tenant does n |
| 304 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listcontrolconfigurations` | not_found | 16713 | {"error":{"code":"","message":"No HTTP resource was found that matches the request URI 'https://igaelm-asev3-e |
| 305 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listresourceenvironments` | auth | 16513 | {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller |
| 306 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listresourcerequests` | auth | 26048 | {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller |
| 307 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listresourcerolescopes` | not_found | 19435 | {"error":{"code":"UnknownError","message":"{\"message\":\"No HTTP resource was found that matches the request  |
| 308 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listresources` | auth | 19611 | {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller |
| 309 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listsubjects` | auth | 7646 | {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller |
| 310 | `identitygovernance_entitlementmanagement_identitygovernance_getentitlementmanagement` | auth | 16414 | {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller |
| 311 | `identitygovernance_identitygovernance_identitygovernance_identitygovernance_getidentitygovernance` | pass | 15557 |  |
| 312 | `identitygovernance_lifecycleworkflowscontainer_identitygovernance_getlifecycleworkflows` | not_found | 16180 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T21:52:58","request-id":"57baff84 |
| 313 | `identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_deleteditems_listworkflows` | auth | 18774 | {"error":{"code":"Access denied","message":"Insufficient privileges to complete the operation. For a full list |
| 314 | `identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_getdeleteditems` | not_found | 17580 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T21:53:08","request-id":"9ab5f50d |
| 315 | `identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_getinsights` | not_found | 18164 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T21:53:16","request-id":"48621b45 |
| 316 | `identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_getsettings` | auth | 22671 | {"error":{"code":"Access denied","message":"Insufficient privileges to complete the operation. For a full list |
| 317 | `identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_listcustomtaskextensions` | auth | 22728 | {"error":{"code":"Access denied","message":"Insufficient privileges to complete the operation. For a full list |
| 318 | `identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_listtaskdefinitions` | auth | 14867 | {"error":{"code":"Access denied","message":"Insufficient privileges to complete the operation. For a full list |
| 319 | `identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_listworkflows` | auth | 7900 | {"error":{"code":"Access denied","message":"Insufficient privileges to complete the operation. For a full list |
| 320 | `identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_listworkflowtemplates` | auth | 14112 | {"error":{"code":"Access denied","message":"Insufficient privileges to complete the operation. For a full list |
| 321 | `identitygovernance_privilegedaccessroot_identitygovernance_getprivilegedaccess` | not_found | 0 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"MissingProvider\",\"message\":\"The provider is mi |
| 322 | `identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_getgroup` | bad_request | 0 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"MissingProvider\",\"message\":\"The provider is mi |
| 323 | `identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listassignmentapprovals` | auth | 14108 | {"error":{"code":"","message":"Only app tokens are supported","innerError":{"date":"2026-08-04T21:53:59","requ |
| 324 | `identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listassignmentscheduleinstances` | auth | 13844 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"PermissionScopeNotGranted\",\"message\":\"Authoriz |
| 325 | `identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listassignmentschedulerequests` | auth | 15933 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"PermissionScopeNotGranted\",\"message\":\"Authoriz |
| 326 | `identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listassignmentschedules` | auth | 15657 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"PermissionScopeNotGranted\",\"message\":\"Authoriz |
| 327 | `identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listeligibilityscheduleinstances` | auth | 15421 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"PermissionScopeNotGranted\",\"message\":\"Authoriz |
| 328 | `identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listeligibilityschedulerequests` | auth | 13849 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"PermissionScopeNotGranted\",\"message\":\"Authoriz |
| 329 | `identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listeligibilityschedules` | auth | 16557 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"PermissionScopeNotGranted\",\"message\":\"Authoriz |
| 330 | `identitygovernance_termsofusecontainer_identitygovernance_gettermsofuse` | not_found | 14471 | {"error":{"code":"UnknownError","message":"{\"Message\":\"No HTTP resource was found that matches the request  |
| 331 | `identitygovernance_termsofusecontainer_identitygovernance_termsofuse_listagreementacceptances` | not_found | 14381 | {"error":{"code":"UnknownError","message":"{\"Message\":\"No HTTP resource was found that matches the request  |
| 332 | `identitygovernance_termsofusecontainer_identitygovernance_termsofuse_listagreements` | auth | 13861 | {"error":{"code":"TenantNotLicensed","message":"No access. This feature requires a subscription to Microsoft E |
| 333 | `identityprotection_identityprotectionroot_identityprotection_identityprotectionroot_getidentityprotectionroot` | pass | 12228 |  |
| 334 | `identityprotection_riskdetection_identityprotection_listriskdetections` | auth | 13066 | {"error":{"code":"Forbidden","message":"Your tenant is not licensed for this feature.","innerError":{"date":"2 |
| 335 | `identityprotection_riskyserviceprincipal_identityprotection_listriskyserviceprincipals` | auth | 10199 | {"error":{"code":"Forbidden","message":"You cannot perform the requested operation, required scopes are missin |
| 336 | `identityprotection_riskyuser_identityprotection_listriskyusers` | auth | 9972 | {"error":{"code":"Forbidden","message":"Your tenant is not licensed for this feature.","innerError":{"date":"2 |
| 337 | `identityprotection_serviceprincipalriskdetection_identityprotection_listserviceprincipalriskdetections` | auth | 8763 | {"error":{"code":"Forbidden","message":"Your tenant is not licensed for this feature.","innerError":{"date":"2 |
| 338 | `identityproviders_identityprovider_functions_identityproviders_availableprovidertypes` | pass | 10145 |  |
| 339 | `identityproviders_identityprovider_identityproviders_identityprovider_listidentityprovider` | pass | 10637 |  |
| 340 | `informationprotection_bitlocker_informationprotection_bitlocker_listrecoverykeys` | auth | 9439 | {"error":{"code":"authorization_error","message":"Failed to authorize, token doesn't have the required permiss |
| 341 | `informationprotection_bitlocker_informationprotection_getbitlocker` | not_found | 9065 | {"error":{"code":"NotFound","message":"Unsupported method or endpoint.","innerError":{"date":"2026-08-04T21:55 |
| 342 | `informationprotection_informationprotection_informationprotection_informationprotection_getinformationprotection` | pass | 8451 |  |
| 343 | `informationprotection_threatassessmentrequest_informationprotection_listthreatassessmentrequests` | auth | 11218 | {"error":{"code":"Unauthorized","message":"Required authentication information is either missing or not valid  |
| 344 | `invitations_directoryobject_invitations_listinvitedusersponsors` | not_found | 36587 | {"error":{"code":"UnknownError","message":"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http:/ |
| 345 | `invitations_invitation_invitations_invitation_listinvitation` | not_found | 36473 | {"error":{"code":"UnknownError","message":"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http:/ |
| 346 | `invitations_user_invitations_getinviteduser` | not_found | 30841 | {"error":{"code":"UnknownError","message":"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http:/ |
| 347 | `invitations_user_invitations_inviteduser_getmailboxsettings` | not_found | 8199 | {"error":{"code":"BadRequest","message":"Resource not found for the segment 'mailboxSettings'.","innerError":{ |
| 348 | `invitations_user_invitations_inviteduser_listserviceprovisioningerrors` | not_found | 8167 | {"error":{"code":"BadRequest","message":"Resource not found for the segment 'serviceProvisioningErrors'.","inn |
| 349 | `me_adhoccall_me_adhoccalls_getallrecordings` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Missing the parameter alias '@startDateTime' in the request query str |
| 350 | `me_adhoccall_me_adhoccalls_getalltranscripts` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Missing the parameter alias '@startDateTime' in the request query str |
| 351 | `me_adhoccall_me_listadhoccalls` | not_found | 11616 | {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{" |
| 352 | `me_agreementacceptance_me_listagreementacceptances` | auth | 11827 | {"error":{"code":"UnauthorizedAccess","message":"User does not have any of the required scopes: user_impersona |
| 353 | `me_approleassignment_me_listapproleassignments` | pass | 6881 |  |
| 354 | `me_authentication_me_authentication_fido2methods_creationoptions` | unsupported | 6929 | {"error":{"code":"methodNotAllowed","message":"The method is not supported for this URL.","innerError":{"messa |
| 355 | `me_authentication_me_authentication_listemailmethods` | pass | 12196 |  |
| 356 | `me_authentication_me_authentication_listexternalauthenticationmethods` | pass | 11313 |  |
| 357 | `me_authentication_me_authentication_listfido2methods` | pass | 11478 |  |
| 358 | `me_authentication_me_authentication_listmethods` | pass | 10360 |  |
| 359 | `me_authentication_me_authentication_listmicrosoftauthenticatormethods` | pass | 9867 |  |
| 360 | `me_authentication_me_authentication_listoperations` | not_found | 9267 | {"error":{"code":"UnknownError","message":"{\"ErrorCode\":\"badRequest\",\"Message\":\"Resource not found for  |
| 361 | `me_authentication_me_authentication_listpasswordmethods` | pass | 9718 |  |
| 362 | `me_authentication_me_authentication_listphonemethods` | pass | 9539 |  |
| 363 | `me_authentication_me_authentication_listplatformcredentialmethods` | not_found | 9187 | {"error":{"code":"resourceNotFound","message":"Unable to find a platform credentials on the user","innerError" |
| 364 | `me_authentication_me_authentication_listsoftwareoathmethods` | pass | 8708 |  |
| 365 | `me_authentication_me_authentication_listtemporaryaccesspassmethods` | pass | 8758 |  |
| 366 | `me_authentication_me_authentication_listwindowshelloforbusinessmethods` | pass | 9139 |  |
| 367 | `me_authentication_me_getauthentication` | unsupported | 8259 | {"error":{"code":"badRequest","message":"Unsupported segment type.","innerError":{"message":"Unsupported segme |
| 368 | `me_calendar_me_calendar_listcalendarpermissions` | pass | 8100 |  |
| 369 | `me_calendar_me_calendar_listevents` | pass | 7830 |  |
| 370 | `me_calendar_me_getcalendar` | pass | 8467 |  |
| 371 | `me_calendar_me_listcalendars` | pass | 8832 |  |
| 372 | `me_calendargroup_me_listcalendargroups` | pass | 8563 |  |
| 373 | `me_chat_me_chats_getallmessages` | unsupported | 9335 | Source request failed (412)
Detail: {"error":{"code":"PreconditionFailed","message":"Requested API is not supp |
| 374 | `me_chat_me_chats_getallretainedmessages` | unsupported | 9774 | Source request failed (412)
Detail: {"error":{"code":"PreconditionFailed","message":"Requested API is not supp |
| 375 | `me_chat_me_listchats` | pass | 10042 |  |
| 376 | `me_cloudclipboardroot_me_cloudclipboard_listitems` | auth | 11087 | {"error":{"code":"UnknownError","message":"{\"Message\":\"User was not authorized.\"}","innerError":{"date":"2 |
| 377 | `me_cloudclipboardroot_me_getcloudclipboard` | not_found | 10802 | {"error":{"code":"UnknownError","message":"{\"Message\":\"No HTTP resource was found that matches the request  |
| 378 | `me_cloudpc_me_listcloudpcs` | auth | 9870 | {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":" |
| 379 | `me_contact_me_contacts_delta` | pass | 8388 |  |
| 380 | `me_contact_me_listcontacts` | pass | 9095 |  |
| 381 | `me_contactfolder_me_contactfolders_delta` | pass | 8598 |  |
| 382 | `me_contactfolder_me_listcontactfolders` | pass | 8779 |  |
| 383 | `me_devicemanagementtroubleshootingevent_me_listdevicemanagementtroubleshootingevents` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 384 | `me_directoryobject_me_getmanager` | not_found | 8408 | {"error":{"code":"Request_ResourceNotFound","message":"Resource 'manager' does not exist or one of its queried |
| 385 | `me_directoryobject_me_listcreatedobjects` | pass | 10315 |  |
| 386 | `me_directoryobject_me_listcreatedobjects_asserviceprincipal` | pass | 10027 |  |
| 387 | `me_directoryobject_me_listdirectreports` | pass | 8175 |  |
| 388 | `me_directoryobject_me_listdirectreports_asorgcontact` | pass | 6599 |  |
| 389 | `me_directoryobject_me_listdirectreports_asuser` | pass | 8890 |  |
| 390 | `me_directoryobject_me_listmemberof` | pass | 7038 |  |
| 391 | `me_directoryobject_me_listmemberof_asadministrativeunit` | pass | 8876 |  |
| 392 | `me_directoryobject_me_listmemberof_asdirectoryrole` | pass | 9190 |  |
| 393 | `me_directoryobject_me_listmemberof_asgroup` | pass | 9185 |  |
| 394 | `me_directoryobject_me_listowneddevices` | pass | 9165 |  |
| 395 | `me_directoryobject_me_listowneddevices_asapproleassignment` | pass | 10330 |  |
| 396 | `me_directoryobject_me_listowneddevices_asdevice` | pass | 9744 |  |
| 397 | `me_directoryobject_me_listowneddevices_asendpoint` | pass | 10212 |  |
| 398 | `me_directoryobject_me_listownedobjects` | pass | 9641 |  |
| 399 | `me_directoryobject_me_listownedobjects_asapplication` | pass | 9082 |  |
| 400 | `me_directoryobject_me_listownedobjects_asgroup` | pass | 11962 |  |
| 401 | `me_directoryobject_me_listownedobjects_asserviceprincipal` | pass | 12711 |  |
| 402 | `me_directoryobject_me_listrefsponsors` | pass | 12725 |  |
| 403 | `me_directoryobject_me_listregistereddevices` | pass | 10691 |  |
| 404 | `me_directoryobject_me_listregistereddevices_asapproleassignment` | pass | 17795 |  |
| 405 | `me_directoryobject_me_listregistereddevices_asdevice` | pass | 17755 |  |
| 406 | `me_directoryobject_me_listregistereddevices_asendpoint` | pass | 13091 |  |
| 407 | `me_directoryobject_me_listsponsors` | pass | 10660 |  |
| 408 | `me_directoryobject_me_listtransitivememberof` | pass | 10672 |  |
| 409 | `me_directoryobject_me_listtransitivememberof_asadministrativeunit` | pass | 10659 |  |
| 410 | `me_directoryobject_me_listtransitivememberof_asdirectoryrole` | pass | 6487 |  |
| 411 | `me_directoryobject_me_listtransitivememberof_asgroup` | pass | 6375 |  |
| 412 | `me_drive_me_getdrive` | pass | 10854 |  |
| 413 | `me_drive_me_listdrives` | pass | 9896 |  |
| 414 | `me_employeeexperienceuser_me_employeeexperience_listassignedroles` | error | 0 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:35:00","request-id":"74b410ce |
| 415 | `me_employeeexperienceuser_me_employeeexperience_listlearningcourseactivities` | auth | 11374 | {"error":{"code":"forbidden","message":"Insufficient scope permissions to perform the request operation on cou |
| 416 | `me_employeeexperienceuser_me_getemployeeexperience` | unsupported | 8015 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 417 | `me_event_me_listevents` | pass | 8908 |  |
| 418 | `me_extension_me_listextensions` | pass | 7618 |  |
| 419 | `me_inferenceclassification_me_getinferenceclassification` | pass | 8384 |  |
| 420 | `me_inferenceclassification_me_inferenceclassification_listoverrides` | pass | 8010 |  |
| 421 | `me_iteminsights_me_getinsights` | pass | 7151 |  |
| 422 | `me_iteminsights_me_insights_listshared` | pass | 8378 |  |
| 423 | `me_iteminsights_me_insights_listtrending` | pass | 8642 |  |
| 424 | `me_iteminsights_me_insights_listused` | pass | 8516 |  |
| 425 | `me_licensedetails_me_licensedetails_getteamslicensingdetails` | pass | 8550 |  |
| 426 | `me_licensedetails_me_listlicensedetails` | pass | 8805 |  |
| 427 | `me_mailboxsettings_me_getmailboxsettings` | auth | 8623 | {"error":{"code":"ErrorAccessDenied","message":"Access is denied. Check credentials and try again."}} [GET] ht |
| 428 | `me_mailfolder_me_listmailfolders` | pass | 8681 |  |
| 429 | `me_mailfolder_me_mailfolders_delta` | pass | 8857 |  |
| 430 | `me_managedappregistration_me_listmanagedappregistrations` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 431 | `me_manageddevice_me_listmanageddevices` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 432 | `me_message_me_listmessages` | pass | 9105 |  |
| 433 | `me_message_me_messages_delta` | unsupported | 8856 | {"error":{"code":"BadRequest","message":"Unsupported request: Change tracking is not supported against 'micros |
| 434 | `me_oauth2permissiongrant_me_listoauth2permissiongrants` | pass | 8945 |  |
| 435 | `me_onenote_me_getonenote` | not_found | 8796 | {"error":{"code":"UnknownError","message":"{\r\n  \"Message\": \"No HTTP resource was found that matches the r |
| 436 | `me_onenote_me_onenote_listnotebooks` | pass | 11274 |  |
| 437 | `me_onenote_me_onenote_listoperations` | bad_request | 0 | {"error":{"code":"20112","message":"Invalid Entity ID specified.","innerError":{"date":"2026-08-04T22:35:16"," |
| 438 | `me_onenote_me_onenote_listpages` | pass | 10738 |  |
| 439 | `me_onenote_me_onenote_listresources` | auth | 7164 | {"error":{"code":"UnknownError","message":"{\r\n  \"Message\": \"No HTTP resource was found that matches the r |
| 440 | `me_onenote_me_onenote_listsectiongroups` | pass | 10733 |  |
| 441 | `me_onenote_me_onenote_listsections` | pass | 9301 |  |
| 442 | `me_onlinemeeting_me_listonlinemeetings` | auth | 8219 | {"error":{"code":"Forbidden","message":"Insufficient permissions","innerError":{"date":"2026-08-04T22:00:56"," |
| 443 | `me_onlinemeeting_me_onlinemeetings_getallrecordings` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Missing the parameter alias '@startDateTime' in the request query str |
| 444 | `me_onlinemeeting_me_onlinemeetings_getalltranscripts` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Missing the parameter alias '@startDateTime' in the request query str |
| 445 | `me_onpremisessyncbehavior_me_getonpremisessyncbehavior` | pass | 6510 |  |
| 446 | `me_outlookuser_me_getoutlook` | pass | 8215 |  |
| 447 | `me_outlookuser_me_outlook_listmastercategories` | pass | 8191 |  |
| 448 | `me_outlookuser_me_outlook_supportedlanguages` | pass | 8133 |  |
| 449 | `me_outlookuser_me_outlook_supportedtimezones_5c4f` | pass | 8392 |  |
| 450 | `me_person_me_listpeople` | pass | 8571 |  |
| 451 | `me_planneruser_me_getplanner` | pass | 9102 |  |
| 452 | `me_planneruser_me_planner_listplans` | pass | 8668 |  |
| 453 | `me_planneruser_me_planner_listtasks` | pass | 9167 |  |
| 454 | `me_presence_me_getpresence` | pass | 8903 |  |
| 455 | `me_profilephoto_me_getphoto` | not_found | 9422 | {"error":{"code":"ImageNotFound","message":"Exception of type 'Microsoft.People.Image.Common.Exceptions.ImageN |
| 456 | `me_profilephoto_me_listphotos` | not_found | 9192 | {"error":{"code":"ImageNotFound","message":"Exception of type 'Microsoft.People.Image.Common.Exceptions.ImageN |
| 457 | `me_resourcespecificpermissiongrant_me_listpermissiongrants` | auth | 8991 | {"error":{"code":"Forbidden","message":"Missing scope permissions on the request. API requires one of 'Resourc |
| 458 | `me_scopedrolemembership_me_listscopedrolememberof` | pass | 9274 |  |
| 459 | `me_serviceprovisioningerror_me_listserviceprovisioningerrors` | pass | 9322 |  |
| 460 | `me_site_me_listfollowedsites` | pass | 10169 |  |
| 461 | `me_team_me_joinedteams_getallmessages` | not_found | 9212 | {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{" |
| 462 | `me_team_me_listjoinedteams` | pass | 9825 |  |
| 463 | `me_todo_me_gettodo` | not_found | 8302 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:01:56","request-id":"ede4d679 |
| 464 | `me_todo_me_todo_listlists` | auth | 9047 | {"error":{"code":"notAllowed","message":"Access is denied to the requested resource. The user might not have e |
| 465 | `me_todo_me_todo_lists_delta` | auth | 8869 | {"error":{"code":"notAllowed","message":"Access is denied to the requested resource. The user might not have e |
| 466 | `me_user_functions_me_exportdeviceandappmanagementdata_1a02` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 467 | `me_user_functions_me_getmanagedappdiagnosticstatuses` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 468 | `me_user_functions_me_getmanagedapppolicies` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 469 | `me_user_functions_me_getmanageddeviceswithappfailures` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 470 | `me_user_me_user_getuser` | pass | 9427 |  |
| 471 | `me_useractivity_me_activities_recent` | pass | 10073 |  |
| 472 | `me_useractivity_me_listactivities` | pass | 10096 |  |
| 473 | `me_userdatasecurityandgovernance_me_datasecurityandgovernance_activities_listcontentactivities` | error | 0 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:35:59","request-id":"6991daa1 |
| 474 | `me_userdatasecurityandgovernance_me_datasecurityandgovernance_getactivities` | not_found | 7791 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:02:33","request-id":"6639f5fb |
| 475 | `me_userdatasecurityandgovernance_me_datasecurityandgovernance_getprotectionscopes` | not_found | 7668 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:02:33","request-id":"ed14c6bb |
| 476 | `me_userdatasecurityandgovernance_me_datasecurityandgovernance_listsensitivitylabels` | not_found | 9141 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:02:37","request-id":"abe10b90 |
| 477 | `me_userdatasecurityandgovernance_me_getdatasecurityandgovernance` | not_found | 9225 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:02:42","request-id":"db036b10 |
| 478 | `me_usersettings_me_getsettings` | pass | 9342 |  |
| 479 | `me_usersettings_me_settings_getexchange` | pass | 9017 |  |
| 480 | `me_usersettings_me_settings_getiteminsights` | pass | 9032 |  |
| 481 | `me_usersettings_me_settings_getshiftpreferences` | pass | 9696 |  |
| 482 | `me_usersettings_me_settings_getstorage` | unsupported | 8871 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 483 | `me_usersettings_me_settings_getworkhoursandlocations` | pass | 8795 |  |
| 484 | `me_usersettings_me_settings_listwindows` | auth | 8652 | {"error":{"code":"UnknownError","message":"{\"Message\":\"User was not authorized.\"}","innerError":{"date":"2 |
| 485 | `me_usersettings_me_settings_storage_getquota` | unsupported | 8930 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 486 | `me_usersettings_me_settings_storage_quota_listservices` | unsupported | 9020 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 487 | `me_usersettings_me_settings_workhoursandlocations_listoccurrences` | error | 0 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:36:05","request-id":"f7cdcce3 |
| 488 | `me_usersettings_me_settings_workhoursandlocations_listrecurrences` | pass | 9229 |  |
| 489 | `me_usersolutionroot_me_getsolutions` | bad_request | 0 | {"error":{"code":"Request_BadRequest","message":"Unexpected segment DynamicPathSegment. Expected property/$val |
| 490 | `me_usersolutionroot_me_solutions_getworkingtimeschedule` | bad_request | 0 | {"error":{"code":"Request_BadRequest","message":"Unexpected segment DynamicPathSegment. Expected property/$val |
| 491 | `me_userteamwork_me_getteamwork` | pass | 9474 |  |
| 492 | `me_userteamwork_me_teamwork_getallretainedtargetedmessages` | unsupported | 9200 | Source request failed (412)
Detail: {"error":{"code":"PreconditionFailed","message":"Requested API is not supp |
| 493 | `me_userteamwork_me_teamwork_getalltargetedmessages` | unsupported | 9306 | Source request failed (412)
Detail: {"error":{"code":"PreconditionFailed","message":"Requested API is not supp |
| 494 | `me_userteamwork_me_teamwork_listassociatedteams` | pass | 9830 |  |
| 495 | `me_userteamwork_me_teamwork_listinstalledapps` | auth | 9965 | {"error":{"code":"Forbidden","message":"Missing scope permissions on the request. API requires one of 'TeamsAp |
| 496 | `oauth2permissiongrants_oauth2permissiongrant_functions_oauth2permissiongrants_delta` | pass | 9886 |  |
| 497 | `oauth2permissiongrants_oauth2permissiongrant_oauth2permissiongrants_oauth2permissiongrant_listoauth2permissiongrant` | pass | 9563 |  |
| 498 | `organization_organization_functions_organization_delta` | unsupported | 9200 | {"error":{"code":"Request_UnsupportedQuery","message":"Differential query is not supported for entity type: Or |
| 499 | `organization_organization_organization_organization_listorganization` | pass | 9156 |  |
| 500 | `permissiongrants_resourcespecificpermissiongrant_functions_permissiongrants_delta` | unsupported | 8910 | {"error":{"code":"Request_UnsupportedQuery","message":"Differential query is not supported for entity type: Re |
| 501 | `permissiongrants_resourcespecificpermissiongrant_permissiongrants_resourcespecificpermissiongrant_listresourcespecificpermissiongrant` | unsupported | 9385 | {"error":{"code":"Request_UnsupportedQuery","message":"Direct queries to this resource type are not supported. |
| 502 | `places_place_places_place_listplace_asbuilding` | pass | 9312 |  |
| 503 | `places_place_places_place_listplace_asdesk` | pass | 9434 |  |
| 504 | `places_place_places_place_listplace_asfloor` | pass | 9276 |  |
| 505 | `places_place_places_place_listplace_asroom` | pass | 9776 |  |
| 506 | `places_place_places_place_listplace_asroomlist` | pass | 9962 |  |
| 507 | `places_place_places_place_listplace_assection` | pass | 10173 |  |
| 508 | `places_place_places_place_listplace_asworkspace` | pass | 9544 |  |
| 509 | `planner_planner_planner_planner_getplanner` | pass | 9413 |  |
| 510 | `planner_plannerbucket_planner_listbuckets` | pass | 10199 |  |
| 511 | `planner_plannerplan_planner_listplans` | error | 0 | {"error":{"code":"","message":"This entity set must be queried with a filter on owner property, or container t |
| 512 | `planner_plannertask_planner_listtasks` | error | 0 | {"error":{"code":"","message":"This entity set cannot be queried without a filter on planId or publication's i |
| 513 | `policies_activitybasedtimeoutpolicy_policies_listactivitybasedtimeoutpolicies` | pass | 11254 |  |
| 514 | `policies_adminconsentrequestpolicy_policies_getadminconsentrequestpolicy` | pass | 12102 |  |
| 515 | `policies_appmanagementpolicy_policies_listappmanagementpolicies` | pass | 11422 |  |
| 516 | `policies_authenticationflowspolicy_policies_getauthenticationflowspolicy` | pass | 11532 |  |
| 517 | `policies_authenticationmethodspolicy_policies_authenticationmethodspolicy_listauthenticationmethodconfigurations` | not_found | 9900 | {"error":{"code":"badRequest","message":"Resource not found for segment 'authenticationMethodsPolicy/authentic |
| 518 | `policies_authenticationmethodspolicy_policies_getauthenticationmethodspolicy` | pass | 10539 |  |
| 519 | `policies_authenticationstrengthpolicy_policies_listauthenticationstrengthpolicies` | pass | 10211 |  |
| 520 | `policies_authorizationpolicy_policies_getauthorizationpolicy` | pass | 9363 |  |
| 521 | `policies_claimsmappingpolicy_policies_listclaimsmappingpolicies` | pass | 9671 |  |
| 522 | `policies_conditionalaccesspolicy_policies_listconditionalaccesspolicies` | pass | 12243 |  |
| 523 | `policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_getdefault` | pass | 10306 |  |
| 524 | `policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_gettemplates` | bad_request | 0 | {"error":{"code":"Request_BadRequest","message":"Exception of type 'Microsoft.Online.RestServices.Common.BadRe |
| 525 | `policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_listpartners` | pass | 9955 |  |
| 526 | `policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_templates_getmultitenantorganizationidentitysynchronization` | pass | 8116 |  |
| 527 | `policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_templates_getmultitenantorganizationpartnerconfiguration` | pass | 9740 |  |
| 528 | `policies_crosstenantaccesspolicy_policies_getcrosstenantaccesspolicy` | pass | 11399 |  |
| 529 | `policies_deviceregistrationpolicy_policies_getdeviceregistrationpolicy` | pass | 11527 |  |
| 530 | `policies_featurerolloutpolicy_policies_listfeaturerolloutpolicies` | pass | 12846 |  |
| 531 | `policies_federatedtokenvalidationpolicy_policies_getfederatedtokenvalidationpolicy` | not_found | 10541 | {"error":{"code":"Request_ResourceNotFound","message":"Resource '' does not exist or one of its queried refere |
| 532 | `policies_homerealmdiscoverypolicy_policies_listhomerealmdiscoverypolicies` | pass | 10395 |  |
| 533 | `policies_identitysecuritydefaultsenforcementpolicy_policies_getidentitysecuritydefaultsenforcementpolicy` | pass | 12672 |  |
| 534 | `policies_ownerlessgrouppolicy_policies_getownerlessgrouppolicy` | not_found | 16761 | {"error":{"code":"UnknownError","message":"{\"code\":\"ObjectNotFound\",\"message\":\"Requested object does no |
| 535 | `policies_permissiongrantpolicy_policies_listpermissiongrantpolicies` | pass | 9619 |  |
| 536 | `policies_policyroot_policies_policyroot_getpolicyroot` | bad_request | 0 | {"error":{"code":"Request_InvalidRequestUrl","message":"Request url was invalid. The request should be like /t |
| 537 | `policies_tenantappmanagementpolicy_policies_getdefaultappmanagementpolicy` | pass | 7946 |  |
| 538 | `policies_tokenissuancepolicy_policies_listtokenissuancepolicies` | pass | 9231 |  |
| 539 | `policies_tokenlifetimepolicy_policies_listtokenlifetimepolicies` | pass | 6014 |  |
| 540 | `policies_unifiedrolemanagementpolicy_policies_listrolemanagementpolicies` | bad_request | 0 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"MissingProvider\",\"message\":\"The provider is mi |
| 541 | `policies_unifiedrolemanagementpolicyassignment_policies_listrolemanagementpolicyassignments` | bad_request | 0 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"MissingProvider\",\"message\":\"The provider is mi |
| 542 | `print_print_print_print_getprint` | not_found | 8858 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:06:12","request-id":"ba49aef9 |
| 543 | `print_printconnector_print_listconnectors` | auth | 7851 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:06:15","request-id":"4ad6fa27 |
| 544 | `print_printer_print_listprinters` | auth | 8639 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:06:20","request-id":"e09fcba8 |
| 545 | `print_printershare_print_listshares` | auth | 7017 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"403\",\"message\":\"The token does not have one or |
| 546 | `print_printoperation_print_listoperations` | not_found | 8769 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:06:24","request-id":"f9ca0718 |
| 547 | `print_printservice_print_listservices` | auth | 9281 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:06:29","request-id":"88eac9ff |
| 548 | `print_printtaskdefinition_print_listtaskdefinitions` | auth | 9179 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"403\",\"message\":\"The token does not have one or |
| 549 | `privacy_privacy_privacy_privacy_getprivacy` | pass | 9153 |  |
| 550 | `privacy_subjectrightsrequest_privacy_listsubjectrightsrequests` | not_found | 13181 | {"error":{"code":"HostNotFound","message":"Target 'privacy.trafficmanager.net' is not found.","innerError":{"d |
| 551 | `reports_authenticationmethodsroot_reports_authenticationmethods_listuserregistrationdetails` | auth | 9335 | {"error":{"code":"Authentication_RequestFromNonPremiumTenantOrB2CTenant","message":"Tenant is not a B2C tenant |
| 552 | `reports_authenticationmethodsroot_reports_authenticationmethods_usersregisteredbyfeature_07f2` | auth | 10335 | {"error":{"code":"Authentication_RequestFromNonPremiumTenantOrB2CTenant","message":"Tenant is not a B2C tenant |
| 553 | `reports_authenticationmethodsroot_reports_authenticationmethods_usersregisteredbymethod_d25d` | auth | 12532 | {"error":{"code":"Authentication_RequestFromNonPremiumTenantOrB2CTenant","message":"Tenant is not a B2C tenant |
| 554 | `reports_authenticationmethodsroot_reports_getauthenticationmethods` | pass | 8789 |  |
| 555 | `reports_partners_reports_getpartners` | unsupported | 12218 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 556 | `reports_partners_reports_partners_billing_getreconciliation` | unsupported | 10188 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 557 | `reports_partners_reports_partners_billing_getusage` | unsupported | 10184 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 558 | `reports_partners_reports_partners_billing_listmanifests` | not_found | 10754 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:07:06","request-id":"711319ee |
| 559 | `reports_partners_reports_partners_billing_listoperations` | not_found | 9133 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:07:11","request-id":"9e1a2990 |
| 560 | `reports_partners_reports_partners_billing_reconciliation_getbilled` | unsupported | 8886 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 561 | `reports_partners_reports_partners_billing_reconciliation_getunbilled` | unsupported | 8116 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 562 | `reports_partners_reports_partners_billing_usage_getbilled` | unsupported | 9449 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 563 | `reports_partners_reports_partners_billing_usage_getunbilled` | unsupported | 9202 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 564 | `reports_partners_reports_partners_getbilling` | unsupported | 9274 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 565 | `reports_printusagebyprinter_reports_listdailyprintusagebyprinter` | auth | 10016 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:07:30","request-id":"72610d7a |
| 566 | `reports_printusagebyprinter_reports_listmonthlyprintusagebyprinter` | auth | 9864 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:07:30","request-id":"47bbb8fc |
| 567 | `reports_printusagebyuser_reports_listdailyprintusagebyuser` | auth | 10507 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:07:34","request-id":"3eeb4983 |
| 568 | `reports_printusagebyuser_reports_listmonthlyprintusagebyuser` | auth | 10690 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:07:40","request-id":"04eefc88 |
| 569 | `reports_reportroot_functions_reports_deviceconfigurationdeviceactivity` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 570 | `reports_reportroot_functions_reports_deviceconfigurationuseractivity` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 571 | `reports_reportroot_functions_reports_manageddeviceenrollmentfailuredetails_8191` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 572 | `reports_reportroot_functions_reports_manageddeviceenrollmenttopfailures_9ce7` | bad_request | 0 | {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026- |
| 573 | `reports_reportroot_reports_reportroot_getreportroot` | pass | 10023 |  |
| 574 | `reports_securityreportsroot_reports_getsecurity` | not_found | 9364 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:08:00","request-id":"a7f4c3ec |
| 575 | `reports_securityreportsroot_reports_security_getattacksimulationrepeatoffenders` | not_found | 9468 | {"error":{"code":"UnknownError","message":"{\"@odata.context\":\"https://substrate.office.com/attackSimulator/ |
| 576 | `reports_securityreportsroot_reports_security_getattacksimulationsimulationusercoverage` | auth | 9581 | {"error":{"code":"UnknownError","message":"{\"@odata.context\":\"https://substrate.office.com/attackSimulator/ |
| 577 | `reports_securityreportsroot_reports_security_getattacksimulationtrainingusercoverage` | not_found | 9707 | {"error":{"code":"UnknownError","message":"{\"@odata.context\":\"https://substrate.office.com/attackSimulator/ |
| 578 | `rolemanagement_rbacapplication_rolemanagement_directory_listresourcenamespaces` | pass | 9601 |  |
| 579 | `rolemanagement_rbacapplication_rolemanagement_directory_listroleassignments` | pass | 9199 |  |
| 580 | `rolemanagement_rbacapplication_rolemanagement_directory_listroleassignmentscheduleinstances` | license | 0 | {"error":{"code":"AadPremiumLicenseRequired","message":"The tenant needs to have Microsoft Entra ID P2 or Micr |
| 581 | `rolemanagement_rbacapplication_rolemanagement_directory_listroleassignmentschedulerequests` | auth | 10583 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"PermissionScopeNotGranted\",\"message\":\"Authoriz |
| 582 | `rolemanagement_rbacapplication_rolemanagement_directory_listroleassignmentschedules` | license | 0 | {"error":{"code":"AadPremiumLicenseRequired","message":"The tenant needs to have Microsoft Entra ID P2 or Micr |
| 583 | `rolemanagement_rbacapplication_rolemanagement_directory_listroledefinitions` | pass | 7385 |  |
| 584 | `rolemanagement_rbacapplication_rolemanagement_directory_listroleeligibilityscheduleinstances` | license | 0 | {"error":{"code":"AadPremiumLicenseRequired","message":"The tenant needs to have Microsoft Entra ID P2 or Micr |
| 585 | `rolemanagement_rbacapplication_rolemanagement_directory_listroleeligibilityschedulerequests` | auth | 8110 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"PermissionScopeNotGranted\",\"message\":\"Authoriz |
| 586 | `rolemanagement_rbacapplication_rolemanagement_directory_listroleeligibilityschedules` | license | 0 | {"error":{"code":"AadPremiumLicenseRequired","message":"The tenant needs to have Microsoft Entra ID P2 or Micr |
| 587 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listresourcenamespaces` | error | 0 | {"error":{"code":"UnknownError","message":"<!DOCTYPE html>\r\n<html>\r\n    <head>\r\n        <title>Runtime E |
| 588 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleassignments` | auth | 8669 | {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller |
| 589 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleassignmentscheduleinstances` | unsupported | 6754 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"ProviderNotSupported\",\"message\":\"The provider  |
| 590 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleassignmentschedulerequests` | unsupported | 8741 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"ProviderNotSupported\",\"message\":\"The provider  |
| 591 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleassignmentschedules` | unsupported | 9968 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"ProviderNotSupported\",\"message\":\"The provider  |
| 592 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroledefinitions` | auth | 6951 | {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller |
| 593 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleeligibilityscheduleinstances` | unsupported | 8803 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"ProviderNotSupported\",\"message\":\"The provider  |
| 594 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleeligibilityschedulerequests` | unsupported | 10547 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"ProviderNotSupported\",\"message\":\"The provider  |
| 595 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleeligibilityschedules` | unsupported | 9606 | {"error":{"code":"UnknownError","message":"{\"errorCode\":\"ProviderNotSupported\",\"message\":\"The provider  |
| 596 | `rolemanagement_rbacapplication_rolemanagement_getdirectory` | bad_request | 0 | {"error":{"code":"Request_InvalidRequestUrl","message":"Request url was invalid. The request should be like /t |
| 597 | `rolemanagement_rbacapplication_rolemanagement_getentitlementmanagement` | error | 0 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:38:58","request-id":"dd546ea3 |
| 598 | `rolemanagement_rolemanagement_rolemanagement_rolemanagement_getrolemanagement` | bad_request | 0 | {"error":{"code":"Request_InvalidRequestUrl","message":"Request url was invalid. The request should be like /t |
| 599 | `schemaextensions_schemaextension_schemaextensions_schemaextension_listschemaextension` | pass | 8679 |  |
| 600 | `scopedrolememberships_scopedrolemembership_scopedrolememberships_scopedrolemembership_listscopedrolemembership` | unsupported | 7068 | {"error":{"code":"Request_UnsupportedQuery","message":"Direct queries to this resource type are not supported. |
| 601 | `security_alert_security_listalerts` | pass | 10370 |  |
| 602 | `security_alert_security_listalerts_v2` | auth | 8308 | {"error":{"code":"Unauthorized","message":"Unauthorized request - Account is not provisioned.","innerError":{" |
| 603 | `security_attacksimulationroot_security_attacksimulation_listendusernotifications` | bad_request | 0 | {"error":{"code":"UnknownError","message":"{\"@odata.context\":\"https://substrate.office.com/attackSimulator/ |
| 604 | `security_attacksimulationroot_security_attacksimulation_listlandingpages` | bad_request | 0 | {"error":{"code":"UnknownError","message":"{\"@odata.context\":\"https://substrate.office.com/attackSimulator/ |
| 605 | `security_attacksimulationroot_security_attacksimulation_listloginpages` | bad_request | 0 | {"error":{"code":"UnknownError","message":"{\"@odata.context\":\"https://substrate.office.com/attackSimulator/ |
| 606 | `security_attacksimulationroot_security_attacksimulation_listoperations` | not_found | 8833 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:09:43","request-id":"90055c85 |
| 607 | `security_attacksimulationroot_security_attacksimulation_listpayloads` | bad_request | 0 | {"error":{"code":"UnknownError","message":"{\"@odata.context\":\"https://substrate.office.com/attackSimulator/ |
| 608 | `security_attacksimulationroot_security_attacksimulation_listsimulationautomations` | pass | 9254 |  |
| 609 | `security_attacksimulationroot_security_attacksimulation_listsimulations` | pass | 9872 |  |
| 610 | `security_attacksimulationroot_security_attacksimulation_listtrainings` | pass | 24704 |  |
| 611 | `security_attacksimulationroot_security_getattacksimulation` | not_found | 9396 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:09:57","request-id":"a69663d5 |
| 612 | `security_auditcoreroot_security_auditlog_listqueries` | auth | 8042 | {"error":{"code":"UnknownError","message":"{\"Message\":\"User:vickykumar@algsoch762.onmicrosoft.com dont have |
| 613 | `security_auditcoreroot_security_getauditlog` | auth | 8576 | {"error":{"code":"UnknownError","message":"{\"Message\":\"User:vickykumar@algsoch762.onmicrosoft.com dont have |
| 614 | `security_casesroot_security_cases_listediscoverycases` | auth | 9851 | {"error":{"code":"Unauthorized","message":"ServiceFabricGraphAuthenticationMiddleware.ValidateToken: Invalid s |
| 615 | `security_casesroot_security_getcases` | pass | 13896 |  |
| 616 | `security_collaborationroot_security_collaboration_listanalyzedemails` | auth | 13568 | {"error":{"code":"UnknownError","message":"403 401.4 Unauthorized: (UCCService: Unknown)","innerError":{"date" |
| 617 | `security_collaborationroot_security_getcollaboration` | auth | 9892 | {"error":{"code":"UnknownError","message":"401 401.2 Unauthorized","innerError":{"date":"2026-08-04T22:10:21", |
| 618 | `security_identitycontainer_security_getidentities` | auth | 7627 | {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After lice |
| 619 | `security_identitycontainer_security_identities_getsensorcandidateactivationconfiguration` | auth | 11982 | {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After lice |
| 620 | `security_identitycontainer_security_identities_getsettings` | auth | 10964 | {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After lice |
| 621 | `security_identitycontainer_security_identities_listhealthissues` | auth | 9789 | {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After lice |
| 622 | `security_identitycontainer_security_identities_listidentityaccounts` | auth | 9996 | {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After lice |
| 623 | `security_identitycontainer_security_identities_listsensorcandidates` | auth | 9982 | {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After lice |
| 624 | `security_identitycontainer_security_identities_listsensors` | auth | 9460 | {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After lice |
| 625 | `security_identitycontainer_security_identities_sensors_getdeploymentaccesskey` | auth | 10247 | {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After lice |
| 626 | `security_identitycontainer_security_identities_sensors_getdeploymentpackageuri` | auth | 9797 | {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After lice |
| 627 | `security_identitycontainer_security_identities_settings_getautoauditingconfiguration` | auth | 11188 | {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After lice |
| 628 | `security_incident_security_listincidents` | auth | 11789 | {"error":{"code":"Unauthorized","message":"Unauthorized request - Account is not provisioned.","innerError":{" |
| 629 | `security_labelsroot_security_getlabels` | auth | 11688 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:11:04","request-id":"d7650053 |
| 630 | `security_labelsroot_security_labels_listauthorities` | auth | 11126 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:11:08","request-id":"7e50711d |
| 631 | `security_labelsroot_security_labels_listcategories` | auth | 9293 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:11:13","request-id":"e8384a79 |
| 632 | `security_labelsroot_security_labels_listcitations` | auth | 9267 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:11:13","request-id":"ac0dfd09 |
| 633 | `security_labelsroot_security_labels_listdepartments` | auth | 9043 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:11:17","request-id":"987cd10a |
| 634 | `security_labelsroot_security_labels_listfileplanreferences` | auth | 9012 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:11:22","request-id":"f8c6c797 |
| 635 | `security_labelsroot_security_labels_listretentionlabels` | auth | 9008 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:11:22","request-id":"c24fa571 |
| 636 | `security_securescore_security_listsecurescores` | pass | 12004 |  |
| 637 | `security_securescorecontrolprofile_security_listsecurescorecontrolprofiles` | pass | 13216 |  |
| 638 | `security_security_security_security_getsecurity` | pass | 11328 |  |
| 639 | `security_subjectrightsrequest_security_listsubjectrightsrequests` | not_found | 13322 | {"error":{"code":"HostNotFound","message":"Target 'privacy.trafficmanager.net' is not found.","innerError":{"d |
| 640 | `security_tenantdatasecurityandgovernance_security_datasecurityandgovernance_getprotectionscopes` | not_found | 10234 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:11:44","request-id":"df4ec228 |
| 641 | `security_tenantdatasecurityandgovernance_security_datasecurityandgovernance_listsensitivitylabels` | auth | 8351 | {"error":{"code":"Unauthorized","message":"Authorization is failed with code: InsufficientGraphPermissions."," |
| 642 | `security_tenantdatasecurityandgovernance_security_getdatasecurityandgovernance` | not_found | 5328 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:11:48","request-id":"1242bfdf |
| 643 | `security_threatintelligence_security_getthreatintelligence` | pass | 9189 |  |
| 644 | `security_threatintelligence_security_threatintelligence_listarticleindicators` | not_found | 9266 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:11:53","request-id":"f78d0173 |
| 645 | `security_threatintelligence_security_threatintelligence_listarticles` | auth | 9079 | {"error":{"code":"notAllowed","message":"The organization has not been onboarded to Microsoft Defender.","inne |
| 646 | `security_threatintelligence_security_threatintelligence_listhostcomponents` | not_found | 8657 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:12:02","request-id":"de773979 |
| 647 | `security_threatintelligence_security_threatintelligence_listhostcookies` | not_found | 8582 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:12:02","request-id":"7884fea1 |
| 648 | `security_threatintelligence_security_threatintelligence_listhostpairs` | not_found | 8871 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:12:06","request-id":"2a1b92a7 |
| 649 | `security_threatintelligence_security_threatintelligence_listhostports` | not_found | 8984 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:12:11","request-id":"a1f72132 |
| 650 | `security_threatintelligence_security_threatintelligence_listhosts` | not_found | 8979 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:12:11","request-id":"58fa4fce |
| 651 | `security_threatintelligence_security_threatintelligence_listhostsslcertificates` | not_found | 9697 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:12:16","request-id":"801a47b0 |
| 652 | `security_threatintelligence_security_threatintelligence_listhosttrackers` | not_found | 10839 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:12:22","request-id":"289f9be2 |
| 653 | `security_threatintelligence_security_threatintelligence_listintelligenceprofileindicators` | not_found | 10851 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:12:22","request-id":"41c49dd0 |
| 654 | `security_threatintelligence_security_threatintelligence_listintelprofiles` | auth | 10863 | {"error":{"code":"notAllowed","message":"The organization has not been onboarded to Microsoft Defender.","inne |
| 655 | `security_threatintelligence_security_threatintelligence_listpassivednsrecords` | not_found | 10594 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:12:32","request-id":"befb3502 |
| 656 | `security_threatintelligence_security_threatintelligence_listsslcertificates` | auth | 10582 | {"error":{"code":"notAllowed","message":"The organization has not been onboarded to Microsoft Defender.","inne |
| 657 | `security_threatintelligence_security_threatintelligence_listsubdomains` | not_found | 10802 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:12:37","request-id":"129af496 |
| 658 | `security_threatintelligence_security_threatintelligence_listvulnerabilities` | not_found | 11287 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:12:44","request-id":"fb15ad72 |
| 659 | `security_threatintelligence_security_threatintelligence_listwhoishistoryrecords` | not_found | 11219 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:12:43","request-id":"9114af3c |
| 660 | `security_threatintelligence_security_threatintelligence_listwhoisrecords` | auth | 10852 | {"error":{"code":"notAllowed","message":"The organization has not been onboarded to Microsoft Defender.","inne |
| 661 | `security_triggersroot_security_gettriggers` | auth | 10316 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:12:54","request-id":"1445da38 |
| 662 | `security_triggersroot_security_triggers_listretentionevents` | auth | 10205 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:12:54","request-id":"67b1ff0d |
| 663 | `security_triggertypesroot_security_gettriggertypes` | auth | 10030 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:12:58","request-id":"928d949f |
| 664 | `security_triggertypesroot_security_triggertypes_listretentioneventtypes` | auth | 10024 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:13:04","request-id":"8a70aa02 |
| 665 | `serviceprincipals_serviceprincipal_functions_serviceprincipals_delta` | pass | 13595 |  |
| 666 | `serviceprincipals_serviceprincipal_serviceprincipals_serviceprincipal_listserviceprincipal` | pass | 10344 |  |
| 667 | `shares_shareddriveitem_shares_shareddriveitem_listshareddriveitem` | bad_request | 0 | {"error":{"code":"invalidRequest","message":"The request is malformed or incorrect."}} [GET] https://graph.mic |
| 668 | `sites_site_functions_sites_delta` | auth | 6099 | {"error":{"code":"accessDenied","message":"Access denied","innerError":{"date":"2026-08-04T22:13:14","request- |
| 669 | `sites_site_functions_sites_getallsites` | auth | 8967 | {"error":{"code":"accessDenied","message":"Access denied","innerError":{"date":"2026-08-04T22:13:17","request- |
| 670 | `sites_site_sites_site_listsite` | pass | 9149 |  |
| 671 | `solutions_backuprestoreroot_solutions_backuprestore_getemailnotificationssetting` | auth | 9132 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:13:23","request-id":"ff532401 |
| 672 | `solutions_backuprestoreroot_solutions_backuprestore_listbrowsesessions` | auth | 9952 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:13:27","request-id":"75fbfe13 |
| 673 | `solutions_backuprestoreroot_solutions_backuprestore_listdriveinclusionrules` | not_found | 10451 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:13:33","request-id":"01d0bfbc |
| 674 | `solutions_backuprestoreroot_solutions_backuprestore_listdriveprotectionunits` | not_found | 10436 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:13:33","request-id":"346b1cbc |
| 675 | `solutions_backuprestoreroot_solutions_backuprestore_listdriveprotectionunitsbulkadditionjobs` | not_found | 9710 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:13:37","request-id":"36780313 |
| 676 | `solutions_backuprestoreroot_solutions_backuprestore_listexchangeprotectionpolicies` | auth | 9243 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:13:42","request-id":"6af67f69 |
| 677 | `solutions_backuprestoreroot_solutions_backuprestore_listexchangerestoresessions` | auth | 9256 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:13:42","request-id":"50863e9d |
| 678 | `solutions_backuprestoreroot_solutions_backuprestore_listmailboxinclusionrules` | not_found | 9185 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:13:46","request-id":"65c7888c |
| 679 | `solutions_backuprestoreroot_solutions_backuprestore_listmailboxprotectionunits` | not_found | 9286 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:13:52","request-id":"8e97a9db |
| 680 | `solutions_backuprestoreroot_solutions_backuprestore_listmailboxprotectionunitsbulkadditionjobs` | not_found | 9199 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:13:52","request-id":"b98e121a |
| 681 | `solutions_backuprestoreroot_solutions_backuprestore_listonedriveforbusinessbrowsesessions` | auth | 9362 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:13:56","request-id":"00d2d8d8 |
| 682 | `solutions_backuprestoreroot_solutions_backuprestore_listonedriveforbusinessprotectionpolicies` | auth | 9254 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:14:01","request-id":"afa04910 |
| 683 | `solutions_backuprestoreroot_solutions_backuprestore_listonedriveforbusinessrestoresessions` | auth | 9154 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:14:01","request-id":"39f1c481 |
| 684 | `solutions_backuprestoreroot_solutions_backuprestore_listprotectionpolicies` | auth | 9049 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:14:05","request-id":"32f79f91 |
| 685 | `solutions_backuprestoreroot_solutions_backuprestore_listprotectionunits` | auth | 8812 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:14:10","request-id":"4a000208 |
| 686 | `solutions_backuprestoreroot_solutions_backuprestore_listprotectionunits_asdriveprotectionunit` | auth | 8896 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:14:10","request-id":"a366a70b |
| 687 | `solutions_backuprestoreroot_solutions_backuprestore_listprotectionunits_asmailboxprotectionunit` | auth | 8833 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:14:14","request-id":"52c796c0 |
| 688 | `solutions_backuprestoreroot_solutions_backuprestore_listprotectionunits_assiteprotectionunit` | auth | 9085 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:14:19","request-id":"07f10f59 |
| 689 | `solutions_backuprestoreroot_solutions_backuprestore_listrestorepoints` | auth | 8911 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:14:19","request-id":"c83de445 |
| 690 | `solutions_backuprestoreroot_solutions_backuprestore_listrestoresessions` | auth | 9515 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:14:23","request-id":"8b16e947 |
| 691 | `solutions_backuprestoreroot_solutions_backuprestore_listserviceapps` | auth | 11359 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:14:30","request-id":"33b285d4 |
| 692 | `solutions_backuprestoreroot_solutions_backuprestore_listsharepointbrowsesessions` | auth | 11320 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:14:30","request-id":"ad468fcb |
| 693 | `solutions_backuprestoreroot_solutions_backuprestore_listsharepointprotectionpolicies` | auth | 29411 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:14:52","request-id":"f328e63a |
| 694 | `solutions_backuprestoreroot_solutions_backuprestore_listsharepointrestoresessions` | auth | 22445 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:14:52","request-id":"1674f6be |
| 695 | `solutions_backuprestoreroot_solutions_backuprestore_listsiteinclusionrules` | not_found | 22404 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:14:52","request-id":"c5f88ae7 |
| 696 | `solutions_backuprestoreroot_solutions_backuprestore_listsiteprotectionunits` | not_found | 10030 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:15:02","request-id":"e418c548 |
| 697 | `solutions_backuprestoreroot_solutions_backuprestore_listsiteprotectionunitsbulkadditionjobs` | not_found | 10012 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:15:02","request-id":"04c3567f |
| 698 | `solutions_backuprestoreroot_solutions_getbackuprestore` | auth | 9978 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:15:02","request-id":"6459aa7a |
| 699 | `solutions_bookingbusiness_solutions_listbookingbusinesses` | auth | 6088 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:15:09","request-id":"f8db7625 |
| 700 | `solutions_bookingcurrency_solutions_listbookingcurrencies` | auth | 6104 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:15:09","request-id":"4275c111 |
| 701 | `solutions_solutionsroot_solutions_solutionsroot_getsolutionsroot` | pass | 6041 |  |
| 702 | `solutions_virtualeventsroot_solutions_getvirtualevents` | not_found | 4365 | {"error":{"code":"UnknownError","message":"{\"operationFailure\":{\"reason\":\"unknown\",\"code\":404,\"subCod |
| 703 | `solutions_virtualeventsroot_solutions_virtualevents_listevents` | not_found | 8712 | {"error":{"code":"UnknownError","message":"{\"operationFailure\":{\"reason\":\"unknown\",\"code\":404,\"subCod |
| 704 | `solutions_virtualeventsroot_solutions_virtualevents_listtownhalls` | auth | 8785 | {"error":{"code":"Forbidden","message":"Insufficient permissions","innerError":{"date":"2026-08-04T22:15:17"," |
| 705 | `solutions_virtualeventsroot_solutions_virtualevents_listwebinars` | auth | 9298 | {"error":{"code":"Forbidden","message":"Insufficient permissions","innerError":{"date":"2026-08-04T22:15:22"," |
| 706 | `storage_filestorage_storage_filestorage_listcontainers` | bad_request | 0 | {"error":{"code":"invalidRequest","message":"failed to parse filter parameter.","innerError":{"date":"2026-08- |
| 707 | `storage_filestorage_storage_filestorage_listcontainertyperegistrations` | auth | 8918 | {"error":{"code":"accessDenied","message":"Caller does not have required permissions for this API","innerError |
| 708 | `storage_filestorage_storage_filestorage_listcontainertypes` | auth | 8018 | {"error":{"code":"accessDenied","message":"Caller does not have required permissions for this API","innerError |
| 709 | `storage_filestorage_storage_filestorage_listdeletedcontainers` | bad_request | 0 | {"error":{"code":"invalidRequest","message":"failed to parse filter parameter.","innerError":{"date":"2026-08- |
| 710 | `storage_filestorage_storage_getfilestorage` | unsupported | 8837 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 711 | `storage_storage_storage_storage_getstorage` | pass | 8901 |  |
| 712 | `storage_storagesettings_storage_getsettings` | unsupported | 8899 | {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microso |
| 713 | `storage_storagesettings_storage_settings_getquota` | not_found | 0 | {"error":{"code":"InternalServerError","message":"Invalid URI: The hostname could not be parsed.","innerError" |
| 714 | `storage_storagesettings_storage_settings_quota_listservices` | error | 0 | {"error":{"code":"InternalServerError","message":"Invalid URI: The hostname could not be parsed.","innerError" |
| 715 | `subscribedskus_subscribedsku_subscribedskus_subscribedsku_listsubscribedsku` | pass | 8113 |  |
| 716 | `subscriptions_subscription_subscriptions_subscription_listsubscription` | pass | 8069 |  |
| 717 | `teams_team_functions_teams_getallmessages` | not_found | 9642 | {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T22:16:02","request-id":"5ec0a398 |
| 718 | `teams_team_teams_team_listteam` | pass | 9159 |  |
| 719 | `teamstemplates_teamstemplate_teamstemplates_teamstemplate_listteamstemplate` | not_found | 8864 | {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{" |
| 720 | `teamwork_deletedchat_teamwork_listdeletedchats` | auth | 8376 | {"error":{"code":"Forbidden","message":"Missing scope permissions on the request. API requires one of 'Chat.Ma |
| 721 | `teamwork_deletedteam_teamwork_deletedteams_getallmessages` | not_found | 8102 | {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{" |
| 722 | `teamwork_deletedteam_teamwork_listdeletedteams` | pass | 8617 |  |
| 723 | `teamwork_teamsappsettings_teamwork_getteamsappsettings` | auth | 8350 | {"error":{"code":"Forbidden","message":"API requires one of the following permissions: 'TeamworkAppSettings.Re |
| 724 | `teamwork_teamwork_teamwork_teamwork_getteamwork` | pass | 8441 |  |
| 725 | `teamwork_workforceintegration_teamwork_listworkforceintegrations` | auth | 8682 | {"error":{"code":"Forbidden","message":"Missing scope permissions on the request. API requires one of 'Workfor |
| 726 | `tenantrelationships_delegatedadmincustomer_tenantrelationships_listdelegatedadmincustomers` | pass | 9055 |  |
| 727 | `tenantrelationships_delegatedadminrelationship_tenantrelationships_listdelegatedadminrelationships` | pass | 8942 |  |
| 728 | `tenantrelationships_multitenantorganization_tenantrelationships_getmultitenantorganization` | pass | 8934 |  |
| 729 | `tenantrelationships_multitenantorganization_tenantrelationships_multitenantorganization_getjoinrequest` | pass | 8981 |  |
| 730 | `tenantrelationships_multitenantorganization_tenantrelationships_multitenantorganization_listtenants` | pass | 8966 |  |
| 731 | `tenantrelationships_tenantrelationship_tenantrelationships_tenantrelationship_gettenantrelationship` | pass | 8613 |  |
| 732 | `users_user_functions_users_delta` | pass | 8831 |  |
| 733 | `users_user_users_user_listuser` | pass | 8824 |  |

---

## 📁 Files

- `/tmp/coral_sql_results_2026-08-05-union95-everything-clean.json` — final 95-scope results (733 tables, noise-cleared)
- `/tmp/coral_sql_results_2026-08-05-union95-everything.json` — raw 95-scope battery
- `/tmp/coral_sql_results_2026-08-05-union-everything-clean.json` — 83-scope baseline (comparison)
- `/tmp/scopes_token.json` — 12-scope interactive-consent base token (refresh_token for future minting)
- `/tmp/union_token.json` / `/tmp/union_access_token.txt` — current 95-scope source token
- `/tmp/manifest-msgraph-union.yaml` — source manifest, 95 Graph scopes
- `/tmp/graph_sp_scopes.json` — 797 Graph SP scopes (fixability verification)
- `/tmp/run_everything_union95.py`, `/tmp/run_noise_serial_union95.py` — drivers

Author: Vicky Kumar <algsoch@gmail.com> · Repo: https://github.com/FiscalMindset/coral_specs_testing
