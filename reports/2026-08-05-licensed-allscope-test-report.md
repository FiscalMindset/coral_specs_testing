# microsoft_graph_v4 — full-scope (az admin token) re-test

## Report header

- **Date run:** 2026-08-05 00:30 IST (2026-08-04 19:00 UTC)
- **Test name:** Full 733-table re-battery with an all-scope admin token on the licensed Business Premium tenant
- **Time taken:** ~45 min (733-table battery @ 3 workers/60s + serial clean of 44 noise tables)
- **Stats line:** 733 tables · 777 automated `coral sql` invocations (733 battery + 44 serial clean) · 0 timeouts

## 🎯 Bottom line

**Granting all scopes unlocked 87 more tables — pass went from 70 → 146.**

The previous run's blocker was the **token, not the license**. Re-adding the source with a fresh Azure-CLI admin
token (`Directory.AccessAsUser.All` + 17 more scopes, app `04b07795-8ddb-461a-bbee-02f9e1bf7b46`) instead of the
default 9-scope OAuth consent **proves** it: the exact endpoint that was the live 403 repro —
`users_user_users_user_listuser` — now returns real rows.

| | 9-scope OAuth (prev run) | **All-scope admin token (this run)** |
|---|---|---|
| **pass** | 70 | **146** (+87 unlocked, −10 flips) |
| **auth** | 280 | **315** |
| **error** | 155 | **15** |
| **bad_request** | 114 | **120** |
| **not_found** | 74 | **88** |
| **unsupported** | 40 | **49** |

The `error` count collapse 155 → 15 is two things: (1) the local telemetry-trace race was cleared (44 tables re-run
serially, 1 worker) and (2) the admin token resolved errors that were really missing scope.

## ⚠️ The one tradeoff: 10 chat/Teams/files/sites tables flipped pass → auth

No single token has every Graph scope. The admin token brings directory/audit/group scopes but **lacks the OAuth
scopes the 9-scope consent had** (`Chat.Read`, `Team.ReadBasic.All`, `Files.Read.All`, `Sites.Read.All`), so these 10
passed before and now 403:

| Table | Area |
|---|---|
| `chats_chat_chats_chat_listchat` | chats |
| `me_chat_me_listchats` | me |
| `me_iteminsights_me_getinsights` | me |
| `me_iteminsights_me_insights_listshared` | me |
| `me_iteminsights_me_insights_listtrending` | me |
| `me_iteminsights_me_insights_listused` | me |
| `me_site_me_listfollowedsites` | me |
| `me_userteamwork_me_teamwork_listassociatedteams` | me |
| `teams_team_teams_team_listteam` | teams |
| `teamwork_deletedteam_teamwork_listdeletedteams` | teamwork |

**To truly grant everything**, the manifest's OAuth scope list (currently 9 scopes) should be the **union** of the two
sets: the 9 existing (Chat/Team/Channel/Files/Sites/User.Read) **plus** the admin-token scopes
(`Directory.AccessAsUser.All`, `User.Read.All`, `Group.ReadWrite.All`, `AuditLog.Read.All`, `Application.ReadWrite.All`,
`email`, `profile`, `openid`, `offline_access`). Then one interactive consent grants both halves.

## 📊 Final breakdown (all-scope run)

| Status | Count | % | What it means |
|---|---:|---:|---|
| 🟢 **pass** | **146** | **19.9%** | Returned valid `1` row |
| 🟡 **auth** | **315** | **43.0%** | 403/401 — token lacks the delegated scope |
| 🟠 **bad_request** | **120** | **16.4%** | 400 — consumer/MSA-only endpoints, missing filter params |
| 🟠 **not_found** | **88** | **12.0%** | 404 — endpoint missing in this SKU or bad path |
| 🟠 **unsupported** | **49** | **6.7%** | Not supported for this audience |
| 🔴 **error** | **15** | **2.0%** | Real 500/503/405 server-side issues |
| **Total** | **733** | 100% | 0 timeouts |

## 🔀 Transition matrix (9-scope sweep → all-scope clean)

| Old \ New | pass | auth | bad_request | error | not_found | unsupported |
|---|---|---|---|---|---|---|
| pass (70) | **59** | 10 | 0 | 0 | 1 | 0 |
| auth (280) | **52** | 223 | 2 | 0 | 2 | 1 |
| bad_request (114) | 6 | 9 | 91 | 0 | 7 | 1 |
| error (155) | **29** | 61 | 26 | 15 | 15 | 9 |
| not_found (74) | 0 | 10 | 1 | 0 | 63 | 0 |
| unsupported (40) | 0 | 2 | 0 | 0 | 0 | 38 |

Read as: 52 tables that were `auth` with the 9-scope token now **pass**; 29 that were `error` now **pass**.

## ✅ The 87 tables unlocked by granting all scopes

Old status in parentheses. Highlights: **all user/group/device/app/service-principal/role/policy lists**,
`subscribedSkus` (license list), `companySubscriptions`, `directoryAudits` (audit log), `domains`, and the
previously-failing `users_user_users_user_listuser`.

<details>
<summary>Full list (87 tables)</summary>

| # | Table | Old status |
|---|---|---|
| 1 | `admin_admin_admin_admin_getadmin` | bad_request |
| 2 | `admin_adminmicrosoft365apps_admin_getmicrosoft365apps` | bad_request |
| 3 | `applications_application_applications_application_listapplication` | auth |
| 4 | `applications_application_functions_applications_delta` | error |
| 5 | `auditlogs_directoryaudit_auditlogs_listdirectoryaudits` | auth |
| 6 | `auditlogs_provisioningobjectsummary_auditlogs_listprovisioning` | auth |
| 7 | `communications_cloudcommunications_communications_cloudcommunications_getcloudcommunications` | error |
| 8 | `contacts_orgcontact_contacts_orgcontact_listorgcontact` | auth |
| 9 | `contacts_orgcontact_functions_contacts_delta` | auth |
| 10 | `contracts_contract_contracts_contract_listcontract` | auth |
| 11 | `devices_device_devices_device_listdevice` | auth |
| 12 | `devices_device_functions_devices_delta` | error |
| 13 | `directory_administrativeunit_directory_administrativeunits_delta` | auth |
| 14 | `directory_administrativeunit_directory_listadministrativeunits` | auth |
| 15 | `directory_companysubscription_directory_listsubscriptions` | auth |
| 16 | `directory_directoryobject_directory_listdeleteditems_asadministrativeunit` | auth |
| 17 | `directory_directoryobject_directory_listdeleteditems_asapplication` | error |
| 18 | `directory_directoryobject_directory_listdeleteditems_asdevice` | error |
| 19 | `directory_directoryobject_directory_listdeleteditems_asgroup` | auth |
| 20 | `directory_directoryobject_directory_listdeleteditems_asserviceprincipal` | error |
| 21 | `directory_directoryobject_directory_listdeleteditems_asuser` | auth |
| 22 | `directory_identityproviderbase_directory_listfederationconfigurations` | auth |
| 23 | `directory_onpremisesdirectorysynchronization_directory_listonpremisessynchronization` | error |
| 24 | `directory_publickeyinfrastructureroot_directory_publickeyinfrastructure_listcertificatebasedauthconfigurations` | auth |
| 25 | `directoryroles_directoryrole_directoryroles_directoryrole_listdirectoryrole` | auth |
| 26 | `directoryroles_directoryrole_functions_directoryroles_delta` | error |
| 27 | `directoryroletemplates_directoryroletemplate_directoryroletemplates_directoryroletemplate_listdirectoryroletemplate` | error |
| 28 | `domains_domain_domains_domain_listdomain` | error |
| 29 | `drives_drive_drives_drive_listdrive` | bad_request |
| 30 | `employeeexperience_employeeexperience_employeeexperience_employeeexperience_getemployeeexperience` | error |
| 31 | `groups_group_functions_groups_delta` | error |
| 32 | `groups_group_groups_group_listgroup` | auth |
| 33 | `groupsettings_groupsetting_groupsettings_groupsetting_listgroupsetting` | auth |
| 34 | `groupsettingtemplates_groupsettingtemplate_groupsettingtemplates_groupsettingtemplate_listgroupsettingtemplate` | auth |
| 35 | `identity_authenticationeventlistener_identity_listauthenticationeventlisteners` | auth |
| 36 | `identity_conditionalaccessroot_identity_conditionalaccess_deleteditems_listnamedlocations` | auth |
| 37 | `identity_conditionalaccessroot_identity_conditionalaccess_deleteditems_listpolicies` | auth |
| 38 | `identity_conditionalaccessroot_identity_conditionalaccess_listnamedlocations` | auth |
| 39 | `identity_conditionalaccessroot_identity_conditionalaccess_listpolicies` | auth |
| 40 | `identity_conditionalaccessroot_identity_conditionalaccess_listtemplates` | error |
| 41 | `identity_customauthenticationextension_identity_listcustomauthenticationextensions` | auth |
| 42 | `identityprotection_identityprotectionroot_identityprotection_identityprotectionroot_getidentityprotectionroot` | error |
| 43 | `me_approleassignment_me_listapproleassignments` | error |
| 44 | `me_directoryobject_me_listcreatedobjects` | error |
| 45 | `me_directoryobject_me_listowneddevices_asdevice` | error |
| 46 | `me_directoryobject_me_listowneddevices_asendpoint` | error |
| 47 | `me_directoryobject_me_listregistereddevices_asdevice` | error |
| 48 | `me_directoryobject_me_listsponsors` | error |
| 49 | `me_onpremisessyncbehavior_me_getonpremisessyncbehavior` | auth |
| 50 | `me_planneruser_me_getplanner` | auth |
| 51 | `me_planneruser_me_planner_listplans` | auth |
| 52 | `me_planneruser_me_planner_listtasks` | auth |
| 53 | `me_scopedrolemembership_me_listscopedrolememberof` | error |
| 54 | `me_usersettings_me_settings_getshiftpreferences` | auth |
| 55 | `me_userteamwork_me_getteamwork` | bad_request |
| 56 | `oauth2permissiongrants_oauth2permissiongrant_functions_oauth2permissiongrants_delta` | auth |
| 57 | `oauth2permissiongrants_oauth2permissiongrant_oauth2permissiongrants_oauth2permissiongrant_listoauth2permissiongrant` | auth |
| 58 | `planner_plannerbucket_planner_listbuckets` | error |
| 59 | `policies_activitybasedtimeoutpolicy_policies_listactivitybasedtimeoutpolicies` | error |
| 60 | `policies_appmanagementpolicy_policies_listappmanagementpolicies` | error |
| 61 | `policies_authorizationpolicy_policies_getauthorizationpolicy` | auth |
| 62 | `policies_claimsmappingpolicy_policies_listclaimsmappingpolicies` | auth |
| 63 | `policies_conditionalaccesspolicy_policies_listconditionalaccesspolicies` | auth |
| 64 | `policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_getdefault` | auth |
| 65 | `policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_listpartners` | bad_request |
| 66 | `policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_templates_getmultitenantorganizationidentitysynchronization` | auth |
| 67 | `policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_templates_getmultitenantorganizationpartnerconfiguration` | auth |
| 68 | `policies_crosstenantaccesspolicy_policies_getcrosstenantaccesspolicy` | bad_request |
| 69 | `policies_featurerolloutpolicy_policies_listfeaturerolloutpolicies` | auth |
| 70 | `policies_homerealmdiscoverypolicy_policies_listhomerealmdiscoverypolicies` | auth |
| 71 | `policies_permissiongrantpolicy_policies_listpermissiongrantpolicies` | error |
| 72 | `policies_tenantappmanagementpolicy_policies_getdefaultappmanagementpolicy` | auth |
| 73 | `policies_tokenissuancepolicy_policies_listtokenissuancepolicies` | error |
| 74 | `policies_tokenlifetimepolicy_policies_listtokenlifetimepolicies` | auth |
| 75 | `rolemanagement_rbacapplication_rolemanagement_directory_listresourcenamespaces` | auth |
| 76 | `rolemanagement_rbacapplication_rolemanagement_directory_listroleassignments` | auth |
| 77 | `rolemanagement_rbacapplication_rolemanagement_directory_listroledefinitions` | auth |
| 78 | `security_security_security_security_getsecurity` | error |
| 79 | `serviceprincipals_serviceprincipal_functions_serviceprincipals_delta` | auth |
| 80 | `serviceprincipals_serviceprincipal_serviceprincipals_serviceprincipal_listserviceprincipal` | auth |
| 81 | `storage_storage_storage_storage_getstorage` | error |
| 82 | `subscribedskus_subscribedsku_subscribedskus_subscribedsku_listsubscribedsku` | auth |
| 83 | `tenantrelationships_multitenantorganization_tenantrelationships_getmultitenantorganization` | auth |
| 84 | `tenantrelationships_multitenantorganization_tenantrelationships_multitenantorganization_getjoinrequest` | auth |
| 85 | `tenantrelationships_multitenantorganization_tenantrelationships_multitenantorganization_listtenants` | error |
| 86 | `users_user_functions_users_delta` | auth |
| 87 | `users_user_users_user_listuser` | auth |

</details>

## 🔴 The 15 remaining real errors

These are genuine Graph server-side issues, not scope or noise:

| Table | Error |
|---|---|
| `admin_exchangeadmin_admin_exchange_listmailboxes` | `Error: Source server error (500) Detail: {"error":{"code":"ErrorInternalServerError","message":"An internal server error occurred.` |
| `connections_externalconnection_connections_externalconnection_listexternalconnection` | `Error: Source server error (503) Detail: {"error":{"code":"UnknownError","message":"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01/` |
| `education_reportsroot_education_reports_listreadingassignmentsubmissions` | `Error: Source server error (500) Detail: {"error":{"code":"internalServerError","message":"The user does not have the required per` |
| `education_reportsroot_education_reports_listreadingcoachpassages` | `Error: Source server error (500) Detail: {"error":{"code":"internalServerError","message":"The user does not have the required per` |
| `education_reportsroot_education_reports_listreflectcheckinresponses` | `Error: Source server error (500) Detail: {"error":{"code":"internalServerError","message":"The user does not have the required per` |
| `education_reportsroot_education_reports_listspeakerassignmentsubmissions` | `Error: Source server error (500) Detail: {"error":{"code":"internalServerError","message":"The user does not have the required per` |
| `external_external_external_external_getexternal` | `Error: Source server error (503) Detail: {"error":{"code":"UnknownError","message":"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01/` |
| `me_employeeexperienceuser_me_employeeexperience_listassignedroles` | `Error: Source server error (500) Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T18:22:33","` |
| `me_userdatasecurityandgovernance_me_datasecurityandgovernance_activities_listcontentactivities` | `Error: Source request failed (405) Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T18:25:25"` |
| `planner_plannerplan_planner_listplans` | `Error: Source request failed (405) Detail: {"error":{"code":"","message":"This entity set must be queried with a filter on owner p` |
| `planner_plannertask_planner_listtasks` | `Error: Source request failed (405) Detail: {"error":{"code":"","message":"This entity set cannot be queried without a filter on pl` |
| `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listresourcenamespaces` | `Error: Source server error (500) Detail: {"error":{"code":"UnknownError","message":"<!DOCTYPE html>\r\n<html>\r\n    <head>\r\n   ` |
| `rolemanagement_rbacapplication_rolemanagement_getentitlementmanagement` | `Error: Source server error (500) Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-04T18:31:44","` |
| `storage_storagesettings_storage_settings_getquota` | `Error: Source server error (500) Detail: {"error":{"code":"InternalServerError","message":"Invalid URI: The hostname could not be ` |
| `storage_storagesettings_storage_settings_quota_listservices` | `Error: Source server error (500) Detail: {"error":{"code":"InternalServerError","message":"Invalid URI: The hostname could not be ` |

Root causes: `education_reportsroot_*` (4) need an **Education** license/role; `planner_listplans/listtasks` (2)
require a **filter on `owner`/`planId`** — spec should declare those; `storage_storagesettings_getquota` (2) is an
**Invalid URI spec bug**; `admin_exchangeadmin_listmailboxes`, `me_employeeexperienceuser`, `rolemanagement_*`, and
`connections_*`/`external_*` are Microsoft-side 500/503s.

## 🧪 Live verification (all-scope token)

```sql
SELECT value FROM microsoft_graph_v4.users_user_users_user_listuser LIMIT 1
-- was 403 with 9-scope token; now returns:
-- [{"displayName":"vicky kumar","userPrincipalName":"vickykumar@algsoch762.onmicrosoft.com",
--   "id":"55bcc9a0-6062-4976-9341-c27579fe09e3"}]

SELECT value FROM microsoft_graph_v4.groups_group_groups_group_listgroup LIMIT 1
-- 2 groups: All Company + algsoch (Team-backed) — full group metadata

SELECT value FROM microsoft_graph_v4.subscribedskus_subscribedsku_subscribedskus_subscribedsku_listsubscribedsku LIMIT 1
-- O365_BUSINESS_PREMIUM, 25 licenses, 45 service plans

SELECT value FROM microsoft_graph_v4.devices_device_devices_device_listdevice LIMIT 1
-- [] (no devices enrolled) — endpoint works, empty tenant
```

## 📋 Full 733-table results (all tables, this run)

| # | Table | Status | ms | Error (short) |
|---|---|---|---|---|
| 1 | `admin_admin_admin_admin_getadmin` | pass | 6705 |  |
| 2 | `admin_adminmicrosoft365apps_admin_getmicrosoft365apps` | pass | 6797 |  |
| 3 | `admin_adminmicrosoft365apps_admin_microsoft365apps_getinstallationoptions` | auth | 7004 | Forbidden: Access is denied to the requested resource. The user or app might not have enough permissi |
| 4 | `admin_adminreportsettings_admin_getreportsettings` | auth | 5105 | UnknownError: {\ |
| 5 | `admin_configurationmanagement_admin_configurationmanagement_listconfigurationdrifts` | auth | 9037 | UnknownError:  |
| 6 | `admin_configurationmanagement_admin_configurationmanagement_listconfigurationmonitoringresults` | auth | 8775 | UnknownError:  |
| 7 | `admin_configurationmanagement_admin_configurationmanagement_listconfigurationmonitors` | auth | 8387 | UnknownError:  |
| 8 | `admin_configurationmanagement_admin_configurationmanagement_listconfigurationsnapshotjobs` | auth | 9825 | UnknownError:  |
| 9 | `admin_configurationmanagement_admin_configurationmanagement_listconfigurationsnapshots` | auth | 10067 | UnknownError: {\ |
| 10 | `admin_configurationmanagement_admin_getconfigurationmanagement` | auth | 10605 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.XTA,False). |
| 11 | `admin_edge_admin_edge_getinternetexplorermode` | unsupported | 10445 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.Edge.CloudSiteList |
| 12 | `admin_edge_admin_edge_internetexplorermode_listsitelists` | auth | 10459 | Forbidden: You do not have permission to access the resource. |
| 13 | `admin_edge_admin_getedge` | unsupported | 9119 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.Edge.CloudSiteList |
| 14 | `admin_exchangeadmin_admin_exchange_gettracing` | pass | 9445 |  |
| 15 | `admin_exchangeadmin_admin_exchange_listmailboxes` | error | 13436 | ErrorInternalServerError: An internal server error occurred. The operation failed. |
| 16 | `admin_exchangeadmin_admin_exchange_tracing_listmessagetraces` | auth | 9845 | Forbidden: Service principal-less Authentication failed: the service principal for App ID 8bd644d1-64 |
| 17 | `admin_exchangeadmin_admin_getexchange` | unsupported | 8348 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.Exchange,True). |
| 18 | `admin_peopleadminsettings_admin_getpeople` | auth | 10341 | forbidden: Authorization failed because of missing requirement(s). |
| 19 | `admin_peopleadminsettings_admin_people_getiteminsights` | pass | 10343 |  |
| 20 | `admin_peopleadminsettings_admin_people_getpronouns` | auth | 10542 | forbidden: Authorization failed because of missing requirement(s). |
| 21 | `admin_peopleadminsettings_admin_people_listprofilecardproperties` | auth | 9443 | forbidden: Authorization failed because of missing requirement(s). |
| 22 | `admin_peopleadminsettings_admin_people_listprofilepropertysettings` | auth | 9396 | forbidden: Authorization failed because of missing requirement(s). |
| 23 | `admin_peopleadminsettings_admin_people_listprofilesources` | auth | 8926 | forbidden: Authorization failed because of missing requirement(s). |
| 24 | `admin_serviceannouncement_admin_getserviceannouncement` | not_found | 8638 | UnknownError:  |
| 25 | `admin_serviceannouncement_admin_serviceannouncement_listhealthoverviews` | auth | 8780 | UnknownError:  |
| 26 | `admin_serviceannouncement_admin_serviceannouncement_listissues` | auth | 9013 | UnknownError:  |
| 27 | `admin_serviceannouncement_admin_serviceannouncement_listmessages` | auth | 9424 | UnknownError:  |
| 28 | `admin_sharepoint_admin_getsharepoint` | unsupported | 9207 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.FileServices,False |
| 29 | `admin_sharepoint_admin_sharepoint_getsettings` | auth | 9530 | accessDenied: Caller does not have required permissions for this API |
| 30 | `admin_teamsadminroot_admin_getteams` | unsupported | 8974 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.IC3.TeamsAdminGate |
| 31 | `admin_teamsadminroot_admin_teams_getpolicy` | unsupported | 8916 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.IC3.PolicyAdmin,Fa |
| 32 | `admin_teamsadminroot_admin_teams_gettelephonenumbermanagement` | unsupported | 8839 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.IC3.TelephoneNumbe |
| 33 | `admin_teamsadminroot_admin_teams_listuserconfigurations` | auth | 13120 | forbidden: Insufficient permission(s) for the request. API requires any of the following permission(s |
| 34 | `admin_teamsadminroot_admin_teams_policy_listuserassignments` | not_found | 12398 | UnknownError: {\ |
| 35 | `admin_teamsadminroot_admin_teams_telephonenumbermanagement_listnumberassignments` | auth | 13229 | forbidden: Insufficient permission(s) for the request. API requires any of the following permission(s |
| 36 | `admin_teamsadminroot_admin_teams_telephonenumbermanagement_listoperations` | auth | 11993 | forbidden: Insufficient permission(s) for the request. API requires any of the following permission(s |
| 37 | `agreementacceptances_agreementacceptance_agreementacceptances_agreementacceptance_listagreementacceptance` | not_found | 10205 | Error: Source resource was not found (404) Detail: {"error":{"code":"","message":"No HTTP resource w |
| 38 | `agreements_agreement_agreements_agreement_listagreement` | auth | 10608 | UnauthorizedAccess: User does not have any of the required scopes: user_impersonation, Agreement.Read.All, Agr |
| 39 | `appcatalogs_appcatalogs_appcatalogs_appcatalogs_getappcatalogs` | not_found | 9152 | NotFound: Requested API is not supported. Please check the path. |
| 40 | `appcatalogs_teamsapp_appcatalogs_listteamsapps` | auth | 8290 | Forbidden: Missing scope permissions on the request. API requires one of 'AppCatalog.Submit, AppCatal |
| 41 | `applications_application_applications_application_listapplication` | pass | 8296 |  |
| 42 | `applications_application_functions_applications_delta` | pass | 9302 |  |
| 43 | `applicationtemplates_applicationtemplate_applicationtemplates_applicationtemplate_listapplicationtemplate` | pass | 10298 |  |
| 44 | `auditlogs_auditlogroot_auditlogs_auditlogroot_getauditlogroot` | pass | 9582 |  |
| 45 | `auditlogs_directoryaudit_auditlogs_listdirectoryaudits` | pass | 11143 |  |
| 46 | `auditlogs_provisioningobjectsummary_auditlogs_listprovisioning` | pass | 9966 |  |
| 47 | `auditlogs_signin_auditlogs_listsignins` | auth | 11584 | Authentication_RequestFromNonPremiumTenantOrB2CTenant: Tenant is not a B2C tenant and doesn't have premium license |
| 48 | `authenticationmethodconfigurations_authenticationmethodconfiguration_authenticationmethodconfigurations_authenticationmethodconfiguration_listauthenticationmethodconfiguration` | not_found | 9089 | UnknownError: {\ |
| 49 | `authenticationmethodspolicy_authenticationmethodconfiguration_authenticationmethodspolicy_listauthenticationmethodconfigurations` | not_found | 9195 | badRequest: Resource not found for segment 'authenticationMethodsPolicy/authenticationMethodConfigurat |
| 50 | `authenticationmethodspolicy_authenticationmethodspolicy_authenticationmethodspolicy_authenticationmethodspolicy_getauthenticationmethodspolicy` | auth | 8721 | accessDenied: Request Authorization failed |
| 51 | `certificatebasedauthconfiguration_certificatebasedauthconfiguration_certificatebasedauthconfiguration_certificatebasedauthconfiguration_listcertificatebasedauthconfiguration` | unsupported | 9174 | Request_UnsupportedQuery: Direct queries to this resource type are not supported. |
| 52 | `chats_chat_chats_chat_listchat` | auth | 9089 | Forbidden: Missing scope permissions on the request. API requires one of 'Chat.ReadBasic, Chat.Read,  |
| 53 | `chats_chat_functions_chats_getallmessages` | not_found | 9131 | NotFound: Requested API is not supported. Please check the path. |
| 54 | `chats_chat_functions_chats_getallretainedmessages` | not_found | 10034 | NotFound: Requested API is not supported. Please check the path. |
| 55 | `communications_adhoccall_communications_adhoccalls_getallrecordings` | not_found | 9994 | NotFound: Requested API is not supported. Please check the path. |
| 56 | `communications_adhoccall_communications_adhoccalls_getalltranscripts` | not_found | 10477 | NotFound: Requested API is not supported. Please check the path. |
| 57 | `communications_adhoccall_communications_listadhoccalls` | not_found | 10184 | NotFound: Requested API is not supported. Please check the path. |
| 58 | `communications_call_communications_listcalls` | auth | 10436 | UnknownError: {\ |
| 59 | `communications_callrecord_communications_listcallrecords` | auth | 9663 | Forbidden:  |
| 60 | `communications_cloudcommunications_communications_cloudcommunications_getcloudcommunications` | pass | 9253 |  |
| 61 | `communications_cloudcommunications_functions_communications_getallonlinemeetingmessages` | auth | 10039 | unauthorized: Authorization credentials are invalid. |
| 62 | `communications_onlinemeeting_communications_listonlinemeetings` | auth | 9729 | Forbidden: Insufficient permissions |
| 63 | `communications_onlinemeeting_communications_onlinemeetings_getallrecordings` | not_found | 10112 | NotFound: Requested API is not supported. Please check the path. |
| 64 | `communications_onlinemeeting_communications_onlinemeetings_getalltranscripts` | not_found | 8867 | NotFound: Requested API is not supported. Please check the path. |
| 65 | `communications_onlinemeetingengagementconversation_communications_listonlinemeetingconversations` | not_found | 11353 | UnknownError:  |
| 66 | `communications_presence_communications_listpresences` | not_found | 11419 | NotFound:  |
| 67 | `compliance_compliance_compliance_compliance_getcompliance` | pass | 11043 |  |
| 68 | `connections_externalconnection_connections_externalconnection_listexternalconnection` | error | 14461 | UnknownError: <!DOCTYPE HTML PUBLIC \ |
| 69 | `contacts_orgcontact_contacts_orgcontact_listorgcontact` | pass | 10183 |  |
| 70 | `contacts_orgcontact_functions_contacts_delta` | pass | 10098 |  |
| 71 | `contracts_contract_contracts_contract_listcontract` | pass | 6785 |  |
| 72 | `contracts_contract_functions_contracts_delta` | unsupported | 12559 | Request_UnsupportedQuery: Differential query is not supported for entity type: Contract |
| 73 | `copilot_aiinteractionhistory_copilot_getinteractionhistory` | not_found | 12387 | NotFound: Requested API is not supported. Please check the path. |
| 74 | `copilot_aiinteractionhistory_copilot_interactionhistory_getallenterpriseinteractions` | not_found | 11143 | NotFound: Requested API is not supported. Please check the path. |
| 75 | `copilot_aiuser_copilot_listusers` | not_found | 10170 | NotFound: Requested API is not supported. Please check the path. |
| 76 | `copilot_copilotadmin_copilot_admin_catalog_listpackages` | auth | 10503 | Forbidden: Customer must be a licensed for Agent 365 in order to use Agent 365 Graph APIs |
| 77 | `copilot_copilotadmin_copilot_admin_getcatalog` | unsupported | 11437 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.CopilotPackage,Fal |
| 78 | `copilot_copilotadmin_copilot_admin_getsettings` | not_found | 14942 | UnknownError:  |
| 79 | `copilot_copilotadmin_copilot_admin_settings_getlimitedmode` | auth | 14195 | UnknownError:  |
| 80 | `copilot_copilotadmin_copilot_getadmin` | not_found | 13005 | UnknownError:  |
| 81 | `copilot_copilotreportroot_copilot_getreports` | not_found | 9662 | UnknownError: <!DOCTYPE html PUBLIC \ |
| 82 | `copilot_copilotroot_copilot_copilotroot_getcopilotroot` | pass | 8541 |  |
| 83 | `datapolicyoperations_datapolicyoperation_datapolicyoperations_datapolicyoperation_listdatapolicyoperation` | auth | 17458 | Forbidden: {\ |
| 84 | `deviceappmanagement_androidmanagedappprotection_deviceappmanagement_listandroidmanagedappprotections` | bad_request | 9699 | BadRequest: Request not applicable to target tenant. |
| 85 | `deviceappmanagement_defaultmanagedappprotection_deviceappmanagement_listdefaultmanagedappprotections` | bad_request | 8912 | BadRequest: Request not applicable to target tenant. |
| 86 | `deviceappmanagement_deviceappmanagement_deviceappmanagement_deviceappmanagement_getdeviceappmanagement` | bad_request | 5576 | BadRequest: Request not applicable to target tenant. |
| 87 | `deviceappmanagement_iosmanagedappprotection_deviceappmanagement_listiosmanagedappprotections` | bad_request | 5485 | BadRequest: Request not applicable to target tenant. |
| 88 | `deviceappmanagement_managedapppolicy_deviceappmanagement_listmanagedapppolicies` | bad_request | 6816 | BadRequest: Request not applicable to target tenant. |
| 89 | `deviceappmanagement_managedappregistration_deviceappmanagement_listmanagedappregistrations` | bad_request | 9974 | BadRequest: Request not applicable to target tenant. |
| 90 | `deviceappmanagement_managedappregistration_deviceappmanagement_managedappregistrations_getuseridswithflaggedappregistration` | bad_request | 9861 | BadRequest: Request not applicable to target tenant. |
| 91 | `deviceappmanagement_managedappstatus_deviceappmanagement_listmanagedappstatuses` | bad_request | 9419 | BadRequest: Request not applicable to target tenant. |
| 92 | `deviceappmanagement_manageddevicemobileappconfiguration_deviceappmanagement_listmobileappconfigurations` | bad_request | 8816 | BadRequest: Request not applicable to target tenant. |
| 93 | `deviceappmanagement_managedebook_deviceappmanagement_listmanagedebooks` | bad_request | 8881 | BadRequest: Request not applicable to target tenant. |
| 94 | `deviceappmanagement_mdmwindowsinformationprotectionpolicy_deviceappmanagement_listmdmwindowsinformationprotectionpolicies` | auth | 8958 | BadRequest: Request not applicable to target tenant. |
| 95 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps` | bad_request | 8964 | BadRequest: Request not applicable to target tenant. |
| 96 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asandroidlobapp` | bad_request | 8847 | BadRequest: Request not applicable to target tenant. |
| 97 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asandroidstoreapp` | bad_request | 8888 | BadRequest: Request not applicable to target tenant. |
| 98 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asioslobapp` | bad_request | 8993 | BadRequest: Request not applicable to target tenant. |
| 99 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asiosstoreapp` | bad_request | 8859 | BadRequest: Request not applicable to target tenant. |
| 100 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asiosvppapp` | bad_request | 9030 | BadRequest: Request not applicable to target tenant. |
| 101 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmacosdmgapp` | bad_request | 9107 | BadRequest: Request not applicable to target tenant. |
| 102 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmacoslobapp` | bad_request | 9084 | BadRequest: Request not applicable to target tenant. |
| 103 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmanagedandroidlobapp` | bad_request | 9136 | BadRequest: Request not applicable to target tenant. |
| 104 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmanagedioslobapp` | bad_request | 9296 | BadRequest: Request not applicable to target tenant. |
| 105 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmanagedmobilelobapp` | bad_request | 9256 | BadRequest: Request not applicable to target tenant. |
| 106 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmicrosoftstoreforbusinessapp` | bad_request | 9232 | BadRequest: Request not applicable to target tenant. |
| 107 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswin32lobapp` | bad_request | 9632 | BadRequest: Request not applicable to target tenant. |
| 108 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswindowsappx` | bad_request | 9580 | BadRequest: Request not applicable to target tenant. |
| 109 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswindowsmobilemsi` | bad_request | 9963 | BadRequest: Request not applicable to target tenant. |
| 110 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswindowsuniversalappx` | bad_request | 9688 | BadRequest: Request not applicable to target tenant. |
| 111 | `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswindowswebapp` | bad_request | 9791 | BadRequest: Request not applicable to target tenant. |
| 112 | `deviceappmanagement_mobileappcategory_deviceappmanagement_listmobileappcategories` | bad_request | 9512 | BadRequest: Request not applicable to target tenant. |
| 113 | `deviceappmanagement_mobileapprelationship_deviceappmanagement_listmobileapprelationships` | bad_request | 9871 | BadRequest: Request not applicable to target tenant. |
| 114 | `deviceappmanagement_targetedmanagedappconfiguration_deviceappmanagement_listtargetedmanagedappconfigurations` | bad_request | 9769 | BadRequest: Request not applicable to target tenant. |
| 115 | `deviceappmanagement_vpptoken_deviceappmanagement_listvpptokens` | bad_request | 9947 | BadRequest: Request not applicable to target tenant. |
| 116 | `deviceappmanagement_windowsinformationprotectionpolicy_deviceappmanagement_listwindowsinformationprotectionpolicies` | auth | 9812 | BadRequest: Request not applicable to target tenant. |
| 117 | `devicemanagement_applepushnotificationcertificate_devicemanagement_applepushnotificationcertificate_downloadapplepushnotificationcertificatesigningrequest` | bad_request | 9940 | BadRequest: Request not applicable to target tenant. |
| 118 | `devicemanagement_applepushnotificationcertificate_devicemanagement_getapplepushnotificationcertificate` | bad_request | 9931 | BadRequest: Request not applicable to target tenant. |
| 119 | `devicemanagement_auditevent_devicemanagement_auditevents_getauditcategories` | bad_request | 9358 | BadRequest: Request not applicable to target tenant. |
| 120 | `devicemanagement_auditevent_devicemanagement_listauditevents` | bad_request | 9334 | BadRequest: Request not applicable to target tenant. |
| 121 | `devicemanagement_compliancemanagementpartner_devicemanagement_listcompliancemanagementpartners` | bad_request | 8512 | BadRequest: Request not applicable to target tenant. |
| 122 | `devicemanagement_detectedapp_devicemanagement_listdetectedapps` | bad_request | 8666 | BadRequest: Request not applicable to target tenant. |
| 123 | `devicemanagement_deviceandappmanagementroleassignment_devicemanagement_listroleassignments` | bad_request | 8495 | BadRequest: Request not applicable to target tenant. |
| 124 | `devicemanagement_devicecategory_devicemanagement_listdevicecategories` | bad_request | 9276 | BadRequest: Request not applicable to target tenant. |
| 125 | `devicemanagement_devicecompliancepolicy_devicemanagement_listdevicecompliancepolicies` | bad_request | 9849 | BadRequest: Request not applicable to target tenant. |
| 126 | `devicemanagement_devicecompliancepolicydevicestatesummary_devicemanagement_getdevicecompliancepolicydevicestatesummary` | auth | 9576 | BadRequest: Request not applicable to target tenant. |
| 127 | `devicemanagement_devicecompliancepolicysettingstatesummary_devicemanagement_listdevicecompliancepolicysettingstatesummaries` | bad_request | 9316 | BadRequest: Request not applicable to target tenant. |
| 128 | `devicemanagement_deviceconfiguration_devicemanagement_listdeviceconfigurations` | bad_request | 9237 | BadRequest: Request not applicable to target tenant. |
| 129 | `devicemanagement_deviceconfigurationdevicestatesummary_devicemanagement_getdeviceconfigurationdevicestatesummaries` | bad_request | 9039 | BadRequest: Request not applicable to target tenant. |
| 130 | `devicemanagement_deviceenrollmentconfiguration_devicemanagement_listdeviceenrollmentconfigurations` | bad_request | 9581 | BadRequest: Request not applicable to target tenant. |
| 131 | `devicemanagement_devicemanagement_devicemanagement_devicemanagement_getdevicemanagement` | bad_request | 9468 | BadRequest: Request not applicable to target tenant. |
| 132 | `devicemanagement_devicemanagement_functions_devicemanagement_userexperienceanalyticssummarizeworkfromanywheredevices` | bad_request | 9443 | BadRequest: Request not applicable to target tenant. |
| 133 | `devicemanagement_devicemanagementexchangeconnector_devicemanagement_listexchangeconnectors` | bad_request | 10192 | BadRequest: Request not applicable to target tenant. |
| 134 | `devicemanagement_devicemanagementpartner_devicemanagement_listdevicemanagementpartners` | bad_request | 12064 | BadRequest: Request not applicable to target tenant. |
| 135 | `devicemanagement_devicemanagementreports_devicemanagement_getreports` | bad_request | 11852 | BadRequest: Request not applicable to target tenant. |
| 136 | `devicemanagement_devicemanagementreports_devicemanagement_reports_listexportjobs` | bad_request | 11636 | BadRequest: Request not applicable to target tenant. |
| 137 | `devicemanagement_devicemanagementtroubleshootingevent_devicemanagement_listtroubleshootingevents` | bad_request | 9388 | BadRequest: Request not applicable to target tenant. |
| 138 | `devicemanagement_importedwindowsautopilotdeviceidentity_devicemanagement_listimportedwindowsautopilotdeviceidentities` | bad_request | 7501 | BadRequest: Request not applicable to target tenant. |
| 139 | `devicemanagement_iosupdatedevicestatus_devicemanagement_listiosupdatestatuses` | bad_request | 11122 | BadRequest: Request not applicable to target tenant. |
| 140 | `devicemanagement_manageddevice_devicemanagement_listmanageddevices` | bad_request | 13349 | BadRequest: Request not applicable to target tenant. |
| 141 | `devicemanagement_manageddeviceoverview_devicemanagement_getmanageddeviceoverview` | bad_request | 6463 | BadRequest: Request not applicable to target tenant. |
| 142 | `devicemanagement_mobileapptroubleshootingevent_devicemanagement_listmobileapptroubleshootingevents` | bad_request | 9773 | BadRequest: Request not applicable to target tenant. |
| 143 | `devicemanagement_mobilethreatdefenseconnector_devicemanagement_listmobilethreatdefenseconnectors` | bad_request | 9124 | BadRequest: Request not applicable to target tenant. |
| 144 | `devicemanagement_notificationmessagetemplate_devicemanagement_listnotificationmessagetemplates` | bad_request | 9072 | BadRequest: Request not applicable to target tenant. |
| 145 | `devicemanagement_onpremisesconditionalaccesssettings_devicemanagement_getconditionalaccesssettings` | bad_request | 9015 | BadRequest: Request not applicable to target tenant. |
| 146 | `devicemanagement_remoteassistancepartner_devicemanagement_listremoteassistancepartners` | bad_request | 9262 | BadRequest: Request not applicable to target tenant. |
| 147 | `devicemanagement_resourceoperation_devicemanagement_listresourceoperations` | bad_request | 9301 | BadRequest: Request not applicable to target tenant. |
| 148 | `devicemanagement_roledefinition_devicemanagement_listroledefinitions` | bad_request | 9785 | BadRequest: Request not applicable to target tenant. |
| 149 | `devicemanagement_softwareupdatestatussummary_devicemanagement_getsoftwareupdatestatussummary` | bad_request | 9909 | BadRequest: Request not applicable to target tenant. |
| 150 | `devicemanagement_termsandconditions_devicemanagement_listtermsandconditions` | bad_request | 9808 | BadRequest: Request not applicable to target tenant. |
| 151 | `devicemanagement_userexperienceanalyticsapphealthapplicationperformance_devicemanagement_listuserexperienceanalyticsapphealthapplicationperformance` | bad_request | 10622 | BadRequest: Request not applicable to target tenant. |
| 152 | `devicemanagement_userexperienceanalyticsapphealthappperformancebyappversiondetails_devicemanagement_listuserexperienceanalyticsapphealthapplicationperformancebyappversiondetails` | bad_request | 9219 | BadRequest: Request not applicable to target tenant. |
| 153 | `devicemanagement_userexperienceanalyticsapphealthappperformancebyappversiondeviceid_devicemanagement_listuserexperienceanalyticsapphealthapplicationperformancebyappversiondeviceid` | bad_request | 9191 | BadRequest: Request not applicable to target tenant. |
| 154 | `devicemanagement_userexperienceanalyticsapphealthappperformancebyosversion_devicemanagement_listuserexperienceanalyticsapphealthapplicationperformancebyosversion` | bad_request | 7981 | BadRequest: Request not applicable to target tenant. |
| 155 | `devicemanagement_userexperienceanalyticsapphealthdevicemodelperformance_devicemanagement_listuserexperienceanalyticsapphealthdevicemodelperformance` | bad_request | 7851 | BadRequest: Request not applicable to target tenant. |
| 156 | `devicemanagement_userexperienceanalyticsapphealthdeviceperformance_devicemanagement_listuserexperienceanalyticsapphealthdeviceperformance` | bad_request | 13755 | BadRequest: Request not applicable to target tenant. |
| 157 | `devicemanagement_userexperienceanalyticsapphealthdeviceperformancedetails_devicemanagement_listuserexperienceanalyticsapphealthdeviceperformancedetails` | bad_request | 10271 | BadRequest: Request not applicable to target tenant. |
| 158 | `devicemanagement_userexperienceanalyticsapphealthosversionperformance_devicemanagement_listuserexperienceanalyticsapphealthosversionperformance` | bad_request | 9764 | BadRequest: Request not applicable to target tenant. |
| 159 | `devicemanagement_userexperienceanalyticsbaseline_devicemanagement_listuserexperienceanalyticsbaselines` | bad_request | 10119 | BadRequest: Request not applicable to target tenant. |
| 160 | `devicemanagement_userexperienceanalyticscategory_devicemanagement_getuserexperienceanalyticsapphealthoverview` | bad_request | 12031 | BadRequest: Request not applicable to target tenant. |
| 161 | `devicemanagement_userexperienceanalyticscategory_devicemanagement_listuserexperienceanalyticscategories` | bad_request | 9686 | BadRequest: Request not applicable to target tenant. |
| 162 | `devicemanagement_userexperienceanalyticscategory_devicemanagement_userexperienceanalyticsapphealthoverview_listmetricvalues` | bad_request | 6161 | BadRequest: Request not applicable to target tenant. |
| 163 | `devicemanagement_userexperienceanalyticsdeviceperformance_devicemanagement_listuserexperienceanalyticsdeviceperformance` | bad_request | 9858 | BadRequest: Request not applicable to target tenant. |
| 164 | `devicemanagement_userexperienceanalyticsdevicescores_devicemanagement_listuserexperienceanalyticsdevicescores` | bad_request | 8701 | BadRequest: Request not applicable to target tenant. |
| 165 | `devicemanagement_userexperienceanalyticsdevicestartuphistory_devicemanagement_listuserexperienceanalyticsdevicestartuphistory` | bad_request | 11598 | BadRequest: Request not applicable to target tenant. |
| 166 | `devicemanagement_userexperienceanalyticsdevicestartupprocess_devicemanagement_listuserexperienceanalyticsdevicestartupprocesses` | bad_request | 10621 | BadRequest: Request not applicable to target tenant. |
| 167 | `devicemanagement_userexperienceanalyticsdevicestartupprocessperformance_devicemanagement_listuserexperienceanalyticsdevicestartupprocessperformance` | bad_request | 9899 | BadRequest: Request not applicable to target tenant. |
| 168 | `devicemanagement_userexperienceanalyticsmetrichistory_devicemanagement_listuserexperienceanalyticsmetrichistory` | bad_request | 11697 | BadRequest: Request not applicable to target tenant. |
| 169 | `devicemanagement_userexperienceanalyticsmodelscores_devicemanagement_listuserexperienceanalyticsmodelscores` | bad_request | 10477 | BadRequest: Request not applicable to target tenant. |
| 170 | `devicemanagement_userexperienceanalyticsoverview_devicemanagement_getuserexperienceanalyticsoverview` | bad_request | 12423 | BadRequest: Request not applicable to target tenant. |
| 171 | `devicemanagement_userexperienceanalyticsscorehistory_devicemanagement_listuserexperienceanalyticsscorehistory` | bad_request | 11866 | BadRequest: Request not applicable to target tenant. |
| 172 | `devicemanagement_userexperienceanalyticsworkfromanywherehardwarereadinessmetric_devicemanagement_getuserexperienceanalyticsworkfromanywherehardwarereadinessmetric` | bad_request | 10194 | BadRequest: Request not applicable to target tenant. |
| 173 | `devicemanagement_userexperienceanalyticsworkfromanywheremetric_devicemanagement_listuserexperienceanalyticsworkfromanywheremetrics` | bad_request | 9489 | BadRequest: Request not applicable to target tenant. |
| 174 | `devicemanagement_userexperienceanalyticsworkfromanywheremodelperformance_devicemanagement_listuserexperienceanalyticsworkfromanywheremodelperformance` | bad_request | 8684 | BadRequest: Request not applicable to target tenant. |
| 175 | `devicemanagement_virtualendpoint_devicemanagement_getvirtualendpoint` | auth | 8619 | accessDenied: Access is denied to the requested resource. |
| 176 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_auditevents_getauditactivitytypes` | auth | 8841 | accessDenied: Access is denied to the requested resource. |
| 177 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_deviceimages_getsourceimages` | auth | 8860 | accessDenied: Access is denied to the requested resource. |
| 178 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_getreport` | auth | 8920 | accessDenied: Access is denied to the requested resource. |
| 179 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listauditevents` | auth | 9338 | accessDenied: Access is denied to the requested resource. |
| 180 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listcloudpcs` | auth | 10119 | accessDenied: Access is denied to the requested resource. |
| 181 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listdeviceimages` | auth | 10178 | accessDenied: Access is denied to the requested resource. |
| 182 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listgalleryimages` | auth | 9879 | accessDenied: Access is denied to the requested resource. |
| 183 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listonpremisesconnections` | auth | 9457 | accessDenied: Access is denied to the requested resource. |
| 184 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listprovisioningpolicies` | auth | 9272 | accessDenied: Access is denied to the requested resource. |
| 185 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listserviceplans` | auth | 9251 | accessDenied: Access is denied to the requested resource. |
| 186 | `devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listusersettings` | auth | 10126 | accessDenied: Access is denied to the requested resource. |
| 187 | `devicemanagement_windowsautopilotdeviceidentity_devicemanagement_listwindowsautopilotdeviceidentities` | bad_request | 9382 | BadRequest: Request not applicable to target tenant. |
| 188 | `devicemanagement_windowsinformationprotectionapplearningsummary_devicemanagement_listwindowsinformationprotectionapplearningsummaries` | bad_request | 6150 | BadRequest: Request not applicable to target tenant. |
| 189 | `devicemanagement_windowsinformationprotectionnetworklearningsummary_devicemanagement_listwindowsinformationprotectionnetworklearningsummaries` | bad_request | 9575 | BadRequest: Request not applicable to target tenant. |
| 190 | `devicemanagement_windowsmalwareinformation_devicemanagement_listwindowsmalwareinformation` | bad_request | 9869 | BadRequest: Request not applicable to target tenant. |
| 191 | `devices_device_devices_device_listdevice` | pass | 9803 |  |
| 192 | `devices_device_functions_devices_delta` | pass | 9734 |  |
| 193 | `directory_administrativeunit_directory_administrativeunits_delta` | pass | 8247 |  |
| 194 | `directory_administrativeunit_directory_listadministrativeunits` | pass | 11496 |  |
| 195 | `directory_attributeset_directory_listattributesets` | auth | 9808 | Authorization_RequestDenied: Insufficient privileges to complete the operation. |
| 196 | `directory_companysubscription_directory_listsubscriptions` | pass | 9179 |  |
| 197 | `directory_customsecurityattributedefinition_directory_listcustomsecurityattributedefinitions` | auth | 9205 | Authorization_RequestDenied: Insufficient privileges to complete the operation. |
| 198 | `directory_devicelocalcredentialinfo_directory_listdevicelocalcredentials` | auth | 9538 | authorization_error: Failed to authorize, token doesn't have the required permissions. |
| 199 | `directory_directory_directory_directory_getdirectory` | bad_request | 9344 | Request_InvalidRequestUrl: Request url was invalid. The request should be like /tenantdomainname/Entity or /$metadata |
| 200 | `directory_directoryobject_directory_listdeleteditems` | unsupported | 9339 | Request_UnsupportedQuery: Searches against this resource are not supported. Only specific instances can be queried. |
| 201 | `directory_directoryobject_directory_listdeleteditems_asadministrativeunit` | pass | 9270 |  |
| 202 | `directory_directoryobject_directory_listdeleteditems_asapplication` | pass | 8151 |  |
| 203 | `directory_directoryobject_directory_listdeleteditems_asdevice` | pass | 10093 |  |
| 204 | `directory_directoryobject_directory_listdeleteditems_asgroup` | pass | 9496 |  |
| 205 | `directory_directoryobject_directory_listdeleteditems_asserviceprincipal` | pass | 9484 |  |
| 206 | `directory_directoryobject_directory_listdeleteditems_asuser` | pass | 9710 |  |
| 207 | `directory_identityproviderbase_directory_federationconfigurations_availableprovidertypes` | unsupported | 9595 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.CPIM,False). |
| 208 | `directory_identityproviderbase_directory_listfederationconfigurations` | pass | 10088 |  |
| 209 | `directory_onpremisesdirectorysynchronization_directory_listonpremisessynchronization` | pass | 10289 |  |
| 210 | `directory_publickeyinfrastructureroot_directory_getpublickeyinfrastructure` | not_found | 10184 | Request_ResourceNotFound: Resource not found for the segment 'publicKeyInfrastructure'. |
| 211 | `directory_publickeyinfrastructureroot_directory_publickeyinfrastructure_listcertificatebasedauthconfigurations` | pass | 9927 |  |
| 212 | `directory_recovery_directory_getrecovery` | pass | 9913 |  |
| 213 | `directory_recovery_directory_recovery_listjobs` | auth | 9950 | Forbidden: Insufficient permissions to perform this operation. |
| 214 | `directory_recovery_directory_recovery_listsnapshots` | auth | 9697 | Forbidden: Insufficient permissions to perform this operation. |
| 215 | `directoryobjects_directoryobject_directoryobjects_directoryobject_listdirectoryobject` | unsupported | 8951 | Request_UnsupportedQuery: Searches against this resource are not supported. Only specific instances can be queried. |
| 216 | `directoryobjects_directoryobject_functions_directoryobjects_delta` | unsupported | 8968 | Request_UnsupportedQuery: Delta query is not supported for directoryObjects without a valid resource type or id filt |
| 217 | `directoryroles_directoryrole_directoryroles_directoryrole_listdirectoryrole` | pass | 9020 |  |
| 218 | `directoryroles_directoryrole_functions_directoryroles_delta` | pass | 9404 |  |
| 219 | `directoryroletemplates_directoryroletemplate_directoryroletemplates_directoryroletemplate_listdirectoryroletemplate` | pass | 9377 |  |
| 220 | `directoryroletemplates_directoryroletemplate_functions_directoryroletemplates_delta` | unsupported | 9115 | Request_UnsupportedQuery: Differential query is not supported for entity type: DirectoryRoleTemplate |
| 221 | `domaindnsrecords_domaindnsrecord_domaindnsrecords_domaindnsrecord_listdomaindnsrecord` | auth | 8883 | Request_UnsupportedQuery: This resource can only be queried through a navigation property on its parent domain. |
| 222 | `domains_domain_domains_domain_listdomain` | pass | 8819 |  |
| 223 | `drives_drive_drives_drive_listdrive` | pass | 9066 |  |
| 224 | `education_educationclass_education_classes_delta` | auth | 9634 | AccessDenied: Required scp claim values are not provided. |
| 225 | `education_educationclass_education_listclasses` | auth | 9528 | AccessDenied: Required scp claim values are not provided. |
| 226 | `education_educationroot_education_educationroot_geteducationroot` | auth | 9823 | AccessDenied: Required scp claim values are not provided. |
| 227 | `education_educationschool_education_listschools` | auth | 9906 | AccessDenied: Required scp claim values are not provided. |
| 228 | `education_educationschool_education_schools_delta` | auth | 9840 | AccessDenied: Required scp claim values are not provided. |
| 229 | `education_educationuser_education_getme` | auth | 9733 | AccessDenied: Required scp claim values are not provided. |
| 230 | `education_educationuser_education_listusers` | auth | 9637 | AccessDenied: Required claim values are not provided. |
| 231 | `education_educationuser_education_me_assignments_delta` | unsupported | 9610 | BadRequest: Unsupported request: Change tracking is not supported against 'microsoft.graph.educationAs |
| 232 | `education_educationuser_education_me_getuser` | auth | 9638 | AccessDenied: Required scp claim values are not provided. |
| 233 | `education_educationuser_education_me_listassignments` | auth | 10113 | UnknownError:  |
| 234 | `education_educationuser_education_me_listclasses` | auth | 9821 | AccessDenied: Required scp claim values are not provided. |
| 235 | `education_educationuser_education_me_listrubrics` | auth | 10132 | UnknownError:  |
| 236 | `education_educationuser_education_me_listschools` | auth | 10102 | AccessDenied: Required scp claim values are not provided. |
| 237 | `education_educationuser_education_me_listtaughtclasses` | auth | 9824 | AccessDenied: Required scp claim values are not provided. |
| 238 | `education_educationuser_education_me_user_getmailboxsettings` | auth | 9540 | AccessDenied: Required scp claim values are not provided. |
| 239 | `education_educationuser_education_me_user_listserviceprovisioningerrors` | auth | 10840 | AccessDenied: Required scp claim values are not provided. |
| 240 | `education_educationuser_education_users_delta` | auth | 7632 | AccessDenied: Required claim values are not provided. |
| 241 | `education_reportsroot_education_getreports` | not_found | 16302 | HostNotFound: Target 'fake_node' is not found. |
| 242 | `education_reportsroot_education_reports_listreadingassignmentsubmissions` | error | 13768 | internalServerError: The user does not have the required permissions to access this endpoint: required one role |
| 243 | `education_reportsroot_education_reports_listreadingcoachpassages` | error | 13888 | internalServerError: The user does not have the required permissions to access this endpoint: required one role |
| 244 | `education_reportsroot_education_reports_listreflectcheckinresponses` | error | 9475 | internalServerError: The user does not have the required permissions to access this endpoint: required one role |
| 245 | `education_reportsroot_education_reports_listspeakerassignmentsubmissions` | error | 11254 | internalServerError: The user does not have the required permissions to access this endpoint: required one role |
| 246 | `employeeexperience_community_employeeexperience_listcommunities` | auth | 9066 | unauthorized: Authorization credentials are invalid. |
| 247 | `employeeexperience_employeeexperience_employeeexperience_employeeexperience_getemployeeexperience` | pass | 7825 |  |
| 248 | `employeeexperience_engagementasyncoperation_employeeexperience_listengagementasyncoperations` | auth | 8893 | unauthorized: Authorization credentials are invalid. |
| 249 | `employeeexperience_engagementrole_employeeexperience_listroles` | auth | 8765 | unauthorized: Authorization credentials are invalid. |
| 250 | `employeeexperience_learningcourseactivity_employeeexperience_listlearningcourseactivities` | not_found | 9045 | UnknownError:  |
| 251 | `employeeexperience_learningprovider_employeeexperience_listlearningproviders` | auth | 18721 | forbidden: Insufficient permissions to complete the operation. |
| 252 | `external_external_external_external_getexternal` | error | 12162 | UnknownError: <!DOCTYPE HTML PUBLIC \ |
| 253 | `external_externalconnection_external_listconnections` | auth | 10637 | Unauthenticated: The request has not been applied because it lacks valid authentication credentials for the |
| 254 | `filteroperators_filteroperatorschema_filteroperators_filteroperatorschema_listfilteroperatorschema` | not_found | 8524 | UnknownError: {\ |
| 255 | `functions_attributemappingfunctionschema_functions_attributemappingfunctionschema_listattributemappingfunctionschema` | not_found | 4625 | UnknownError: {\ |
| 256 | `grouplifecyclepolicies_grouplifecyclepolicy_grouplifecyclepolicies_grouplifecyclepolicy_listgrouplifecyclepolicy` | auth | 8662 | Unauthorized: Permission denied. |
| 257 | `groups_group_functions_groups_delta` | pass | 8763 |  |
| 258 | `groups_group_groups_group_listgroup` | pass | 8784 |  |
| 259 | `groupsettings_groupsetting_groupsettings_groupsetting_listgroupsetting` | pass | 9160 |  |
| 260 | `groupsettingtemplates_groupsettingtemplate_functions_groupsettingtemplates_delta` | unsupported | 9041 | Request_UnsupportedQuery: Differential query is not supported for entity type: SettingTemplate |
| 261 | `groupsettingtemplates_groupsettingtemplate_groupsettingtemplates_groupsettingtemplate_listgroupsettingtemplate` | pass | 8533 |  |
| 262 | `identity_authenticationeventlistener_identity_listauthenticationeventlisteners` | pass | 9659 |  |
| 263 | `identity_authenticationeventsflow_identity_listauthenticationeventsflows` | auth | 9116 | AADB2C: Unauthorized. Access to this Api requires feature: 'EnableMsGraphAuthenticationEventListen |
| 264 | `identity_authenticationeventsflow_identity_listauthenticationeventsflows_asexternalusersselfservicesignupeventsflow` | not_found | 8299 | UnknownError: {\ |
| 265 | `identity_b2xidentityuserflow_identity_listb2xuserflows` | auth | 8334 | AADB2C: The application does not have any of the required delegated permissions (IdentityUserFlow. |
| 266 | `identity_conditionalaccessroot_identity_conditionalaccess_authenticationstrength_listauthenticationmethodmodes` | auth | 7898 | accessDenied: Request Authorization failed |
| 267 | `identity_conditionalaccessroot_identity_conditionalaccess_authenticationstrength_listpolicies` | auth | 9818 | accessDenied: Request Authorization failed |
| 268 | `identity_conditionalaccessroot_identity_conditionalaccess_deleteditems_listnamedlocations` | pass | 11701 |  |
| 269 | `identity_conditionalaccessroot_identity_conditionalaccess_deleteditems_listpolicies` | pass | 13949 |  |
| 270 | `identity_conditionalaccessroot_identity_conditionalaccess_getauthenticationstrength` | not_found | 11905 | UnknownError: {\ |
| 271 | `identity_conditionalaccessroot_identity_conditionalaccess_getdeleteditems` | not_found | 11319 | UnknownError: {\ |
| 272 | `identity_conditionalaccessroot_identity_conditionalaccess_listauthenticationcontextclassreferences` | auth | 7741 | AccessDenied: You cannot perform the requested operation, required scopes are missing in the token. |
| 273 | `identity_conditionalaccessroot_identity_conditionalaccess_listnamedlocations` | pass | 12157 |  |
| 274 | `identity_conditionalaccessroot_identity_conditionalaccess_listpolicies` | pass | 11291 |  |
| 275 | `identity_conditionalaccessroot_identity_conditionalaccess_listtemplates` | pass | 10875 |  |
| 276 | `identity_customauthenticationextension_identity_listcustomauthenticationextensions` | pass | 14107 |  |
| 277 | `identity_identityapiconnector_identity_listapiconnectors` | auth | 4827 | AADB2C: The application does not have any of the required delegated permissions (APIConnectors.Rea |
| 278 | `identity_identitycontainer_identity_identitycontainer_getidentitycontainer` | not_found | 9479 | UnknownError: {\ |
| 279 | `identity_identityproviderbase_identity_identityproviders_availableprovidertypes` | auth | 7281 | AADB2C: The application does not have any of the required delegated permissions (IdentityProvider. |
| 280 | `identity_identityproviderbase_identity_listidentityproviders` | auth | 8674 | AADB2C: The application does not have any of the required delegated permissions (IdentityProvider. |
| 281 | `identity_identityuserflowattribute_identity_listuserflowattributes` | auth | 8919 | AADB2C: The application does not have any of the required delegated permissions (IdentityUserFlow. |
| 282 | `identity_identityverifiedidroot_identity_getverifiedid` | unsupported | 8585 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.VerifiedId.Verifie |
| 283 | `identity_identityverifiedidroot_identity_verifiedid_listprofiles` | auth | 5834 | accessDenied: Request Authorization failed |
| 284 | `identity_riskpreventioncontainer_identity_getriskprevention` | not_found | 9236 | UnknownError: {\ |
| 285 | `identity_riskpreventioncontainer_identity_riskprevention_listfraudprotectionproviders` | auth | 9118 | AADB2C: The application does not have any of the required delegated permissions (RiskPreventionPro |
| 286 | `identity_riskpreventioncontainer_identity_riskprevention_listwebapplicationfirewallproviders` | auth | 9100 | AADB2C: The application does not have any of the required delegated permissions (RiskPreventionPro |
| 287 | `identity_riskpreventioncontainer_identity_riskprevention_listwebapplicationfirewallverifications` | auth | 9004 | AADB2C: The application does not have any of the required delegated permissions (RiskPreventionPro |
| 288 | `identitygovernance_accessreviewset_identitygovernance_accessreviews_listdefinitions` | auth | 13782 | Error: Source request was rejected (403) Detail: {"error":{"code":"","message":"Attempted to perform |
| 289 | `identitygovernance_accessreviewset_identitygovernance_accessreviews_listhistorydefinitions` | auth | 13609 | Error: Source request was rejected (403) Detail: {"error":{"code":"","message":"Attempted to perform |
| 290 | `identitygovernance_accessreviewset_identitygovernance_getaccessreviews` | bad_request | 9331 | Error: Source rejected the request (400) Detail: {"error":{"code":"","message":"Bad filter: One of t |
| 291 | `identitygovernance_appconsentapprovalroute_identitygovernance_appconsent_listappconsentrequests` | auth | 6050 | Error: Source request was rejected (403) Detail: {"error":{"code":"","message":"Attempted to perform |
| 292 | `identitygovernance_appconsentapprovalroute_identitygovernance_getappconsent` | not_found | 9663 | UnknownError:  |
| 293 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_assignments_additionalaccess_894c` | auth | 8899 | UnAuthorized: User is not authorized to perform the operation. Reason: The caller is not authorized. |
| 294 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_getsettings` | auth | 6732 | UnAuthorized: User is not authorized to perform the operation. Reason: The caller is not authorized. |
| 295 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listaccesspackageassignmentapprovals` | auth | 8586 | Error: Source request was rejected (403) Detail: {"error":{"code":"","message":"Only app tokens are  |
| 296 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listaccesspackages` | auth | 7786 | UnAuthorized: User is not authorized to perform the operation. Reason: The caller is not authorized. |
| 297 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listaccesspackagesuggestions` | not_found | 9021 | Error: Source resource was not found (404) Detail: {"error":{"code":"","message":"No HTTP resource w |
| 298 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listassignmentpolicies` | auth | 8287 | UnAuthorized: User is not authorized to perform the operation. Reason: The caller is not authorized. |
| 299 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listassignmentrequests` | auth | 8186 | UnAuthorized: User is not authorized to perform the operation. Reason: The caller is not authorized. |
| 300 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listassignments` | auth | 8633 | UnAuthorized: User is not authorized to perform the operation. Reason: The caller is not authorized. |
| 301 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listavailableaccesspackages` | not_found | 9073 | Error: Source resource was not found (404) Detail: {"error":{"code":"","message":"No HTTP resource w |
| 302 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listcatalogs` | auth | 9118 | UnAuthorized: User is not authorized to perform the operation. Reason: The caller is not authorized. |
| 303 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listconnectedorganizations` | auth | 10758 | NoLicense: User is not authorized to perform the operation. Reason: Tenant does not meet license requ |
| 304 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listcontrolconfigurations` | not_found | 9091 | Error: Source resource was not found (404) Detail: {"error":{"code":"","message":"No HTTP resource w |
| 305 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listresourceenvironments` | auth | 8384 | UnAuthorized: User is not authorized to perform the operation. Reason: The caller is not authorized. |
| 306 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listresourcerequests` | auth | 6593 | UnAuthorized: User is not authorized to perform the operation. Reason: The caller is not authorized. |
| 307 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listresourcerolescopes` | not_found | 9804 | UnknownError: {\ |
| 308 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listresources` | auth | 8475 | UnAuthorized: User is not authorized to perform the operation. Reason: The caller is not authorized. |
| 309 | `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listsubjects` | auth | 9209 | UnAuthorized: User is not authorized to perform the operation. Reason: The caller is not authorized. |
| 310 | `identitygovernance_entitlementmanagement_identitygovernance_getentitlementmanagement` | auth | 11342 | UnAuthorized: User is not authorized to perform the operation. Reason: The caller is not authorized. |
| 311 | `identitygovernance_identitygovernance_identitygovernance_identitygovernance_getidentitygovernance` | pass | 9636 |  |
| 312 | `identitygovernance_lifecycleworkflowscontainer_identitygovernance_getlifecycleworkflows` | not_found | 12820 | UnknownError:  |
| 313 | `identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_deleteditems_listworkflows` | auth | 13136 | Access denied: Insufficient privileges to complete the operation. For a full list of supported delegated  |
| 314 | `identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_getdeleteditems` | not_found | 12188 | UnknownError:  |
| 315 | `identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_getinsights` | not_found | 11447 | UnknownError:  |
| 316 | `identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_getsettings` | auth | 14175 | Access denied: Insufficient privileges to complete the operation. For a full list of supported delegated  |
| 317 | `identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_listcustomtaskextensions` | auth | 14805 | Access denied: Insufficient privileges to complete the operation. For a full list of supported delegated  |
| 318 | `identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_listtaskdefinitions` | auth | 15753 | Access denied: Insufficient privileges to complete the operation. For a full list of supported delegated  |
| 319 | `identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_listworkflows` | auth | 15740 | Access denied: Insufficient privileges to complete the operation. For a full list of supported delegated  |
| 320 | `identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_listworkflowtemplates` | auth | 15115 | Access denied: Insufficient privileges to complete the operation. For a full list of supported delegated  |
| 321 | `identitygovernance_privilegedaccessroot_identitygovernance_getprivilegedaccess` | bad_request | 16488 | UnknownError: {\ |
| 322 | `identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_getgroup` | bad_request | 15203 | UnknownError: {\ |
| 323 | `identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listassignmentapprovals` | auth | 10305 | Error: Source request was rejected (403) Detail: {"error":{"code":"","message":"Only app tokens are  |
| 324 | `identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listassignmentscheduleinstances` | auth | 11208 | UnknownError: {\ |
| 325 | `identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listassignmentschedulerequests` | auth | 13837 | UnknownError: {\ |
| 326 | `identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listassignmentschedules` | auth | 14854 | UnknownError: {\ |
| 327 | `identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listeligibilityscheduleinstances` | auth | 13169 | UnknownError: {\ |
| 328 | `identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listeligibilityschedulerequests` | auth | 14274 | UnknownError: {\ |
| 329 | `identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listeligibilityschedules` | auth | 13618 | UnknownError: {\ |
| 330 | `identitygovernance_termsofusecontainer_identitygovernance_gettermsofuse` | not_found | 11826 | UnknownError: {\ |
| 331 | `identitygovernance_termsofusecontainer_identitygovernance_termsofuse_listagreementacceptances` | not_found | 12284 | UnknownError: {\ |
| 332 | `identitygovernance_termsofusecontainer_identitygovernance_termsofuse_listagreements` | auth | 13647 | UnauthorizedAccess: User does not have any of the required scopes: user_impersonation, Agreement.Read.All, Agr |
| 333 | `identityprotection_identityprotectionroot_identityprotection_identityprotectionroot_getidentityprotectionroot` | pass | 12424 |  |
| 334 | `identityprotection_riskdetection_identityprotection_listriskdetections` | auth | 13211 | Forbidden: You cannot perform the requested operation, required scopes are missing in the token. |
| 335 | `identityprotection_riskyserviceprincipal_identityprotection_listriskyserviceprincipals` | auth | 10232 | Forbidden: You cannot perform the requested operation, required scopes are missing in the token. |
| 336 | `identityprotection_riskyuser_identityprotection_listriskyusers` | auth | 13715 | Forbidden: You cannot perform the requested operation, required scopes are missing in the token. |
| 337 | `identityprotection_serviceprincipalriskdetection_identityprotection_listserviceprincipalriskdetections` | auth | 9567 | Forbidden: You cannot perform the requested operation, required scopes are missing in the token. |
| 338 | `identityproviders_identityprovider_functions_identityproviders_availableprovidertypes` | auth | 15333 | AADB2C: The application does not have any of the required delegated permissions (IdentityProvider. |
| 339 | `identityproviders_identityprovider_identityproviders_identityprovider_listidentityprovider` | auth | 14683 | AADB2C: The application does not have any of the required delegated permissions (IdentityProvider. |
| 340 | `informationprotection_bitlocker_informationprotection_bitlocker_listrecoverykeys` | auth | 11317 | authorization_error: Failed to authorize, token doesn't have the required permissions. |
| 341 | `informationprotection_bitlocker_informationprotection_getbitlocker` | not_found | 8977 | NotFound: Unsupported method or endpoint. |
| 342 | `informationprotection_informationprotection_informationprotection_informationprotection_getinformationprotection` | pass | 13840 |  |
| 343 | `informationprotection_threatassessmentrequest_informationprotection_listthreatassessmentrequests` | auth | 12656 | UnknownError: <!DOCTYPE html PUBLIC \ |
| 344 | `invitations_directoryobject_invitations_listinvitedusersponsors` | not_found | 14333 | UnknownError: <!DOCTYPE html PUBLIC \ |
| 345 | `invitations_invitation_invitations_invitation_listinvitation` | not_found | 9513 | UnknownError: <!DOCTYPE html PUBLIC \ |
| 346 | `invitations_user_invitations_getinviteduser` | not_found | 14533 | UnknownError: <!DOCTYPE html PUBLIC \ |
| 347 | `invitations_user_invitations_inviteduser_getmailboxsettings` | not_found | 12180 | BadRequest: Resource not found for the segment 'mailboxSettings'. |
| 348 | `invitations_user_invitations_inviteduser_listserviceprovisioningerrors` | not_found | 12041 | BadRequest: Resource not found for the segment 'serviceProvisioningErrors'. |
| 349 | `me_adhoccall_me_adhoccalls_getallrecordings` | bad_request | 10906 | BadRequest: Missing the parameter alias '@startDateTime' in the request query string. |
| 350 | `me_adhoccall_me_adhoccalls_getalltranscripts` | bad_request | 11382 | BadRequest: Missing the parameter alias '@startDateTime' in the request query string. |
| 351 | `me_adhoccall_me_listadhoccalls` | not_found | 7225 | NotFound: Requested API is not supported. Please check the path. |
| 352 | `me_agreementacceptance_me_listagreementacceptances` | auth | 7187 | UnauthorizedAccess: User does not have any of the required scopes: user_impersonation, AgreementAcceptance.Rea |
| 353 | `me_approleassignment_me_listapproleassignments` | pass | 11411 |  |
| 354 | `me_authentication_me_authentication_fido2methods_creationoptions` | unsupported | 12087 | methodNotAllowed: The method is not supported for this URL. |
| 355 | `me_authentication_me_authentication_listemailmethods` | auth | 11480 | accessDenied: Request Authorization failed |
| 356 | `me_authentication_me_authentication_listexternalauthenticationmethods` | auth | 11784 | accessDenied: Request Authorization failed |
| 357 | `me_authentication_me_authentication_listfido2methods` | auth | 11377 | accessDenied: Request Authorization failed |
| 358 | `me_authentication_me_authentication_listmethods` | auth | 10886 | accessDenied: Request Authorization failed |
| 359 | `me_authentication_me_authentication_listmicrosoftauthenticatormethods` | auth | 11001 | accessDenied: Request Authorization failed |
| 360 | `me_authentication_me_authentication_listoperations` | not_found | 10445 | UnknownError: {\ |
| 361 | `me_authentication_me_authentication_listpasswordmethods` | auth | 10824 | accessDenied: Request Authorization failed |
| 362 | `me_authentication_me_authentication_listphonemethods` | auth | 10545 | accessDenied: Request Authorization failed |
| 363 | `me_authentication_me_authentication_listplatformcredentialmethods` | auth | 10487 | accessDenied: Request Authorization failed |
| 364 | `me_authentication_me_authentication_listsoftwareoathmethods` | auth | 10103 | accessDenied: Request Authorization failed |
| 365 | `me_authentication_me_authentication_listtemporaryaccesspassmethods` | auth | 10193 | accessDenied: Request Authorization failed |
| 366 | `me_authentication_me_authentication_listwindowshelloforbusinessmethods` | auth | 10828 | accessDenied: Request Authorization failed |
| 367 | `me_authentication_me_getauthentication` | unsupported | 11313 | badRequest: Unsupported segment type. |
| 368 | `me_calendar_me_calendar_listcalendarpermissions` | auth | 10726 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 369 | `me_calendar_me_calendar_listevents` | auth | 11012 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 370 | `me_calendar_me_getcalendar` | auth | 10525 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 371 | `me_calendar_me_listcalendars` | auth | 10991 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 372 | `me_calendargroup_me_listcalendargroups` | auth | 7123 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 373 | `me_chat_me_chats_getallmessages` | unsupported | 9839 | PreconditionFailed: Requested API is not supported in delegated context |
| 374 | `me_chat_me_chats_getallretainedmessages` | unsupported | 6075 | PreconditionFailed: Requested API is not supported in delegated context |
| 375 | `me_chat_me_listchats` | auth | 9168 | Forbidden: Missing scope permissions on the request. API requires one of 'Chat.ReadBasic, Chat.Read,  |
| 376 | `me_cloudclipboardroot_me_cloudclipboard_listitems` | auth | 9522 | UnknownError: {\ |
| 377 | `me_cloudclipboardroot_me_getcloudclipboard` | not_found | 9485 | UnknownError: {\ |
| 378 | `me_cloudpc_me_listcloudpcs` | auth | 8624 | accessDenied: Access is denied to the requested resource. |
| 379 | `me_contact_me_contacts_delta` | auth | 7609 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 380 | `me_contact_me_listcontacts` | auth | 7608 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 381 | `me_contactfolder_me_contactfolders_delta` | auth | 8281 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 382 | `me_contactfolder_me_listcontactfolders` | auth | 8180 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 383 | `me_devicemanagementtroubleshootingevent_me_listdevicemanagementtroubleshootingevents` | bad_request | 8327 | BadRequest: Request not applicable to target tenant. |
| 384 | `me_directoryobject_me_getmanager` | not_found | 8596 | Request_ResourceNotFound: Resource 'manager' does not exist or one of its queried reference-property objects are not |
| 385 | `me_directoryobject_me_listcreatedobjects` | pass | 10395 |  |
| 386 | `me_directoryobject_me_listcreatedobjects_asserviceprincipal` | pass | 10350 |  |
| 387 | `me_directoryobject_me_listdirectreports` | pass | 9010 |  |
| 388 | `me_directoryobject_me_listdirectreports_asorgcontact` | pass | 7364 |  |
| 389 | `me_directoryobject_me_listdirectreports_asuser` | pass | 7267 |  |
| 390 | `me_directoryobject_me_listmemberof` | pass | 8665 |  |
| 391 | `me_directoryobject_me_listmemberof_asadministrativeunit` | pass | 9142 |  |
| 392 | `me_directoryobject_me_listmemberof_asdirectoryrole` | pass | 9119 |  |
| 393 | `me_directoryobject_me_listmemberof_asgroup` | pass | 8987 |  |
| 394 | `me_directoryobject_me_listowneddevices` | pass | 8536 |  |
| 395 | `me_directoryobject_me_listowneddevices_asapproleassignment` | pass | 8539 |  |
| 396 | `me_directoryobject_me_listowneddevices_asdevice` | pass | 8483 |  |
| 397 | `me_directoryobject_me_listowneddevices_asendpoint` | pass | 6965 |  |
| 398 | `me_directoryobject_me_listownedobjects` | pass | 8469 |  |
| 399 | `me_directoryobject_me_listownedobjects_asapplication` | pass | 5353 |  |
| 400 | `me_directoryobject_me_listownedobjects_asgroup` | pass | 8732 |  |
| 401 | `me_directoryobject_me_listownedobjects_asserviceprincipal` | pass | 8828 |  |
| 402 | `me_directoryobject_me_listrefsponsors` | pass | 8788 |  |
| 403 | `me_directoryobject_me_listregistereddevices` | pass | 8202 |  |
| 404 | `me_directoryobject_me_listregistereddevices_asapproleassignment` | pass | 7864 |  |
| 405 | `me_directoryobject_me_listregistereddevices_asdevice` | pass | 7764 |  |
| 406 | `me_directoryobject_me_listregistereddevices_asendpoint` | pass | 7879 |  |
| 407 | `me_directoryobject_me_listsponsors` | pass | 8082 |  |
| 408 | `me_directoryobject_me_listtransitivememberof` | pass | 7986 |  |
| 409 | `me_directoryobject_me_listtransitivememberof_asadministrativeunit` | pass | 8373 |  |
| 410 | `me_directoryobject_me_listtransitivememberof_asdirectoryrole` | pass | 8790 |  |
| 411 | `me_directoryobject_me_listtransitivememberof_asgroup` | pass | 8686 |  |
| 412 | `me_drive_me_getdrive` | not_found | 8859 | itemNotFound: Item not found |
| 413 | `me_drive_me_listdrives` | pass | 9124 |  |
| 414 | `me_employeeexperienceuser_me_employeeexperience_listassignedroles` | error | 13049 | UnknownError:  |
| 415 | `me_employeeexperienceuser_me_employeeexperience_listlearningcourseactivities` | auth | 11117 | forbidden: Insufficient scope permissions to perform the request operation on course activity record. |
| 416 | `me_employeeexperienceuser_me_getemployeeexperience` | unsupported | 7425 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.Viva.Learning,Fals |
| 417 | `me_event_me_listevents` | auth | 7169 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 418 | `me_extension_me_listextensions` | pass | 8318 |  |
| 419 | `me_inferenceclassification_me_getinferenceclassification` | auth | 10270 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 420 | `me_inferenceclassification_me_inferenceclassification_listoverrides` | auth | 9892 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 421 | `me_iteminsights_me_getinsights` | auth | 10079 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 422 | `me_iteminsights_me_insights_listshared` | auth | 9252 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 423 | `me_iteminsights_me_insights_listtrending` | auth | 9189 | Unauthorized: Access to Document in Graph API requires the following permissions: Sites.Read.All, Sites. |
| 424 | `me_iteminsights_me_insights_listused` | auth | 9137 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 425 | `me_licensedetails_me_licensedetails_getteamslicensingdetails` | pass | 9461 |  |
| 426 | `me_licensedetails_me_listlicensedetails` | pass | 9204 |  |
| 427 | `me_mailboxsettings_me_getmailboxsettings` | auth | 9503 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 428 | `me_mailfolder_me_listmailfolders` | auth | 11839 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 429 | `me_mailfolder_me_mailfolders_delta` | auth | 8083 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 430 | `me_managedappregistration_me_listmanagedappregistrations` | bad_request | 10055 | BadRequest: Request not applicable to target tenant. |
| 431 | `me_manageddevice_me_listmanageddevices` | bad_request | 9453 | BadRequest: Request not applicable to target tenant. |
| 432 | `me_message_me_listmessages` | auth | 9974 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 433 | `me_message_me_messages_delta` | unsupported | 10418 | BadRequest: Unsupported request: Change tracking is not supported against 'microsoft.graph.message'. |
| 434 | `me_oauth2permissiongrant_me_listoauth2permissiongrants` | pass | 10522 |  |
| 435 | `me_onenote_me_getonenote` | auth | 10455 | 40001: The request does not contain a valid authentication token. Detailed error information: {0} |
| 436 | `me_onenote_me_onenote_listnotebooks` | auth | 10180 | 40001: The request does not contain a valid authentication token. Detailed error information: {0} |
| 437 | `me_onenote_me_onenote_listoperations` | auth | 9964 | 40001: The request does not contain a valid authentication token. Detailed error information: {0} |
| 438 | `me_onenote_me_onenote_listpages` | auth | 9459 | 40001: The request does not contain a valid authentication token. Detailed error information: {0} |
| 439 | `me_onenote_me_onenote_listresources` | auth | 9922 | 40001: The request does not contain a valid authentication token. Detailed error information: {0} |
| 440 | `me_onenote_me_onenote_listsectiongroups` | auth | 10784 | 40001: The request does not contain a valid authentication token. Detailed error information: {0} |
| 441 | `me_onenote_me_onenote_listsections` | auth | 9547 | 40001: The request does not contain a valid authentication token. Detailed error information: {0} |
| 442 | `me_onlinemeeting_me_listonlinemeetings` | auth | 8439 | Forbidden: Insufficient permissions |
| 443 | `me_onlinemeeting_me_onlinemeetings_getallrecordings` | bad_request | 7503 | BadRequest: Missing the parameter alias '@startDateTime' in the request query string. |
| 444 | `me_onlinemeeting_me_onlinemeetings_getalltranscripts` | bad_request | 8304 | BadRequest: Missing the parameter alias '@startDateTime' in the request query string. |
| 445 | `me_onpremisessyncbehavior_me_getonpremisessyncbehavior` | pass | 8694 |  |
| 446 | `me_outlookuser_me_getoutlook` | pass | 8527 |  |
| 447 | `me_outlookuser_me_outlook_listmastercategories` | auth | 8696 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 448 | `me_outlookuser_me_outlook_supportedlanguages` | pass | 8616 |  |
| 449 | `me_outlookuser_me_outlook_supportedtimezones_5c4f` | pass | 6825 |  |
| 450 | `me_person_me_listpeople` | auth | 5400 | ErrorAccessDenied: Access is denied. Check credentials and try again. |
| 451 | `me_planneruser_me_getplanner` | pass | 9018 |  |
| 452 | `me_planneruser_me_planner_listplans` | pass | 9243 |  |
| 453 | `me_planneruser_me_planner_listtasks` | pass | 8934 |  |
| 454 | `me_presence_me_getpresence` | auth | 8889 | Forbidden:  |
| 455 | `me_profilephoto_me_getphoto` | not_found | 9510 | ImageNotFound: Exception of type 'Microsoft.People.Image.Common.Exceptions.ImageNotFoundException' was th |
| 456 | `me_profilephoto_me_listphotos` | not_found | 9222 | ImageNotFound: Exception of type 'Microsoft.People.Image.Common.Exceptions.ImageNotFoundException' was th |
| 457 | `me_resourcespecificpermissiongrant_me_listpermissiongrants` | auth | 9567 | Forbidden: Missing scope permissions on the request. API requires one of 'ResourceSpecificPermissionG |
| 458 | `me_scopedrolemembership_me_listscopedrolememberof` | pass | 9311 |  |
| 459 | `me_serviceprovisioningerror_me_listserviceprovisioningerrors` | pass | 9401 |  |
| 460 | `me_site_me_listfollowedsites` | auth | 9509 | accessDenied: This operation is not supported with the provided scopes |
| 461 | `me_team_me_joinedteams_getallmessages` | not_found | 9532 | NotFound: Requested API is not supported. Please check the path. |
| 462 | `me_team_me_listjoinedteams` | pass | 9983 |  |
| 463 | `me_todo_me_gettodo` | auth | 9184 | UnknownError:  |
| 464 | `me_todo_me_todo_listlists` | auth | 9245 | UnknownError:  |
| 465 | `me_todo_me_todo_lists_delta` | auth | 8629 | UnknownError:  |
| 466 | `me_user_functions_me_exportdeviceandappmanagementdata_1a02` | bad_request | 9769 | BadRequest: Request not applicable to target tenant. |
| 467 | `me_user_functions_me_getmanagedappdiagnosticstatuses` | bad_request | 10628 | BadRequest: Request not applicable to target tenant. |
| 468 | `me_user_functions_me_getmanagedapppolicies` | bad_request | 8819 | BadRequest: Request not applicable to target tenant. |
| 469 | `me_user_functions_me_getmanageddeviceswithappfailures` | bad_request | 10112 | BadRequest: Request not applicable to target tenant. |
| 470 | `me_user_me_user_getuser` | pass | 9545 |  |
| 471 | `me_useractivity_me_activities_recent` | auth | 10037 | UnknownError: {\ |
| 472 | `me_useractivity_me_listactivities` | auth | 10501 | UnknownError: {\ |
| 473 | `me_userdatasecurityandgovernance_me_datasecurityandgovernance_activities_listcontentactivities` | error | 9598 | UnknownError:  |
| 474 | `me_userdatasecurityandgovernance_me_datasecurityandgovernance_getactivities` | not_found | 8653 | UnknownError:  |
| 475 | `me_userdatasecurityandgovernance_me_datasecurityandgovernance_getprotectionscopes` | not_found | 8925 | UnknownError:  |
| 476 | `me_userdatasecurityandgovernance_me_datasecurityandgovernance_listsensitivitylabels` | not_found | 8047 | UnknownError:  |
| 477 | `me_userdatasecurityandgovernance_me_getdatasecurityandgovernance` | not_found | 9096 | UnknownError:  |
| 478 | `me_usersettings_me_getsettings` | pass | 9070 |  |
| 479 | `me_usersettings_me_settings_getexchange` | pass | 8962 |  |
| 480 | `me_usersettings_me_settings_getiteminsights` | pass | 9167 |  |
| 481 | `me_usersettings_me_settings_getshiftpreferences` | pass | 12964 |  |
| 482 | `me_usersettings_me_settings_getstorage` | unsupported | 9165 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.UnifiedStorageQuot |
| 483 | `me_usersettings_me_settings_getworkhoursandlocations` | auth | 8908 | UnknownError:  |
| 484 | `me_usersettings_me_settings_listwindows` | auth | 8419 | UnknownError: {\ |
| 485 | `me_usersettings_me_settings_storage_getquota` | unsupported | 9081 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.UnifiedStorageQuot |
| 486 | `me_usersettings_me_settings_storage_quota_listservices` | unsupported | 8957 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.UnifiedStorageQuot |
| 487 | `me_usersettings_me_settings_workhoursandlocations_listoccurrences` | auth | 8367 | UnknownError:  |
| 488 | `me_usersettings_me_settings_workhoursandlocations_listrecurrences` | auth | 9008 | UnknownError:  |
| 489 | `me_usersolutionroot_me_getsolutions` | bad_request | 9488 | Request_BadRequest: Unexpected segment DynamicPathSegment. Expected property/$value. |
| 490 | `me_usersolutionroot_me_solutions_getworkingtimeschedule` | bad_request | 9759 | Request_BadRequest: Unexpected segment DynamicPathSegment. Expected property/$value. |
| 491 | `me_userteamwork_me_getteamwork` | pass | 9843 |  |
| 492 | `me_userteamwork_me_teamwork_getallretainedtargetedmessages` | unsupported | 9164 | PreconditionFailed: Requested API is not supported in delegated context |
| 493 | `me_userteamwork_me_teamwork_getalltargetedmessages` | unsupported | 9034 | PreconditionFailed: Requested API is not supported in delegated context |
| 494 | `me_userteamwork_me_teamwork_listassociatedteams` | auth | 10248 | Forbidden: Missing scope permissions on the request. API requires one of 'Team.ReadBasic.All, TeamSet |
| 495 | `me_userteamwork_me_teamwork_listinstalledapps` | auth | 8326 | Forbidden: Missing scope permissions on the request. API requires one of 'TeamsAppInstallation.ReadFo |
| 496 | `oauth2permissiongrants_oauth2permissiongrant_functions_oauth2permissiongrants_delta` | pass | 10668 |  |
| 497 | `oauth2permissiongrants_oauth2permissiongrant_oauth2permissiongrants_oauth2permissiongrant_listoauth2permissiongrant` | pass | 9960 |  |
| 498 | `organization_organization_functions_organization_delta` | unsupported | 10541 | Request_UnsupportedQuery: Differential query is not supported for entity type: Organization |
| 499 | `organization_organization_organization_organization_listorganization` | pass | 11593 |  |
| 500 | `permissiongrants_resourcespecificpermissiongrant_functions_permissiongrants_delta` | unsupported | 11495 | Request_UnsupportedQuery: Differential query is not supported for entity type: ResourceSpecificPermissionGrant |
| 501 | `permissiongrants_resourcespecificpermissiongrant_permissiongrants_resourcespecificpermissiongrant_listresourcespecificpermissiongrant` | unsupported | 11499 | Request_UnsupportedQuery: Direct queries to this resource type are not supported. |
| 502 | `places_place_places_place_listplace_asbuilding` | auth | 10018 | UnknownError:  |
| 503 | `places_place_places_place_listplace_asdesk` | auth | 7648 | UnknownError:  |
| 504 | `places_place_places_place_listplace_asfloor` | auth | 12840 | UnknownError:  |
| 505 | `places_place_places_place_listplace_asroom` | auth | 12166 | UnknownError:  |
| 506 | `places_place_places_place_listplace_asroomlist` | auth | 12225 | UnknownError:  |
| 507 | `places_place_places_place_listplace_assection` | auth | 13467 | UnknownError:  |
| 508 | `places_place_places_place_listplace_asworkspace` | auth | 7327 | UnknownError:  |
| 509 | `planner_planner_planner_planner_getplanner` | pass | 8985 |  |
| 510 | `planner_plannerbucket_planner_listbuckets` | pass | 13117 |  |
| 511 | `planner_plannerplan_planner_listplans` | error | 11196 | Error: Source request failed (405) Detail: {"error":{"code":"","message":"This entity set must be qu |
| 512 | `planner_plannertask_planner_listtasks` | error | 11093 | Error: Source request failed (405) Detail: {"error":{"code":"","message":"This entity set cannot be  |
| 513 | `policies_activitybasedtimeoutpolicy_policies_listactivitybasedtimeoutpolicies` | pass | 10523 |  |
| 514 | `policies_adminconsentrequestpolicy_policies_getadminconsentrequestpolicy` | auth | 11124 | Error: Source request was rejected (403) Detail: {"error":{"code":"","message":"Attempted to perform |
| 515 | `policies_appmanagementpolicy_policies_listappmanagementpolicies` | pass | 9938 |  |
| 516 | `policies_authenticationflowspolicy_policies_getauthenticationflowspolicy` | auth | 10151 | AADB2C: The application does not have any of the required delegated permissions (Policy.Read.All,  |
| 517 | `policies_authenticationmethodspolicy_policies_authenticationmethodspolicy_listauthenticationmethodconfigurations` | not_found | 8741 | badRequest: Resource not found for segment 'authenticationMethodsPolicy/authenticationMethodConfigurat |
| 518 | `policies_authenticationmethodspolicy_policies_getauthenticationmethodspolicy` | auth | 8940 | accessDenied: Request Authorization failed |
| 519 | `policies_authenticationstrengthpolicy_policies_listauthenticationstrengthpolicies` | auth | 5582 | accessDenied: Request Authorization failed |
| 520 | `policies_authorizationpolicy_policies_getauthorizationpolicy` | pass | 7505 |  |
| 521 | `policies_claimsmappingpolicy_policies_listclaimsmappingpolicies` | pass | 6641 |  |
| 522 | `policies_conditionalaccesspolicy_policies_listconditionalaccesspolicies` | pass | 11184 |  |
| 523 | `policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_getdefault` | pass | 8712 |  |
| 524 | `policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_gettemplates` | bad_request | 8107 | Request_BadRequest: Exception of type 'Microsoft.Online.RestServices.Common.BadRequestException' was thrown. |
| 525 | `policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_listpartners` | pass | 8541 |  |
| 526 | `policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_templates_getmultitenantorganizationidentitysynchronization` | pass | 9233 |  |
| 527 | `policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_templates_getmultitenantorganizationpartnerconfiguration` | pass | 9205 |  |
| 528 | `policies_crosstenantaccesspolicy_policies_getcrosstenantaccesspolicy` | pass | 9148 |  |
| 529 | `policies_deviceregistrationpolicy_policies_getdeviceregistrationpolicy` | auth | 8563 | authorization_error: Failed to authorize, token doesn't have the required permissions. |
| 530 | `policies_featurerolloutpolicy_policies_listfeaturerolloutpolicies` | pass | 9757 |  |
| 531 | `policies_federatedtokenvalidationpolicy_policies_getfederatedtokenvalidationpolicy` | not_found | 8495 | Request_ResourceNotFound: Resource '' does not exist or one of its queried reference-property objects are not presen |
| 532 | `policies_homerealmdiscoverypolicy_policies_listhomerealmdiscoverypolicies` | pass | 8876 |  |
| 533 | `policies_identitysecuritydefaultsenforcementpolicy_policies_getidentitysecuritydefaultsenforcementpolicy` | auth | 10527 | AccessDenied: You cannot perform the requested operation, required scopes are missing in the token. |
| 534 | `policies_ownerlessgrouppolicy_policies_getownerlessgrouppolicy` | not_found | 16526 | UnknownError: {\ |
| 535 | `policies_permissiongrantpolicy_policies_listpermissiongrantpolicies` | pass | 9502 |  |
| 536 | `policies_policyroot_policies_policyroot_getpolicyroot` | bad_request | 6591 | Request_InvalidRequestUrl: Request url was invalid. The request should be like /tenantdomainname/Entity or /$metadata |
| 537 | `policies_tenantappmanagementpolicy_policies_getdefaultappmanagementpolicy` | pass | 4090 |  |
| 538 | `policies_tokenissuancepolicy_policies_listtokenissuancepolicies` | pass | 8656 |  |
| 539 | `policies_tokenlifetimepolicy_policies_listtokenlifetimepolicies` | pass | 6880 |  |
| 540 | `policies_unifiedrolemanagementpolicy_policies_listrolemanagementpolicies` | bad_request | 9067 | UnknownError: {\ |
| 541 | `policies_unifiedrolemanagementpolicyassignment_policies_listrolemanagementpolicyassignments` | bad_request | 8852 | UnknownError: {\ |
| 542 | `print_print_print_print_getprint` | not_found | 8215 | UnknownError:  |
| 543 | `print_printconnector_print_listconnectors` | auth | 7302 | UnknownError: {\ |
| 544 | `print_printer_print_listprinters` | auth | 8132 | UnknownError: {\ |
| 545 | `print_printershare_print_listshares` | auth | 7666 | UnknownError: {\ |
| 546 | `print_printoperation_print_listoperations` | not_found | 8214 | UnknownError:  |
| 547 | `print_printservice_print_listservices` | auth | 8636 | UnknownError: {\ |
| 548 | `print_printtaskdefinition_print_listtaskdefinitions` | auth | 8182 | UnknownError: {\ |
| 549 | `privacy_privacy_privacy_privacy_getprivacy` | pass | 8368 |  |
| 550 | `privacy_subjectrightsrequest_privacy_listsubjectrightsrequests` | not_found | 11438 | HostNotFound: Target 'privacy.trafficmanager.net' is not found. |
| 551 | `reports_authenticationmethodsroot_reports_authenticationmethods_listuserregistrationdetails` | auth | 14510 | Authentication_RequestFromNonPremiumTenantOrB2CTenant: Tenant is not a B2C tenant and doesn't have premium license |
| 552 | `reports_authenticationmethodsroot_reports_authenticationmethods_usersregisteredbyfeature_07f2` | auth | 9852 | Authentication_RequestFromNonPremiumTenantOrB2CTenant: Tenant is not a B2C tenant and doesn't have premium license |
| 553 | `reports_authenticationmethodsroot_reports_authenticationmethods_usersregisteredbymethod_d25d` | auth | 9412 | Authentication_RequestFromNonPremiumTenantOrB2CTenant: Tenant is not a B2C tenant and doesn't have premium license |
| 554 | `reports_authenticationmethodsroot_reports_getauthenticationmethods` | pass | 4809 |  |
| 555 | `reports_partners_reports_getpartners` | unsupported | 11140 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,Fa |
| 556 | `reports_partners_reports_partners_billing_getreconciliation` | unsupported | 7468 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,Fa |
| 557 | `reports_partners_reports_partners_billing_getusage` | unsupported | 10179 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,Fa |
| 558 | `reports_partners_reports_partners_billing_listmanifests` | not_found | 9815 | UnknownError:  |
| 559 | `reports_partners_reports_partners_billing_listoperations` | not_found | 10374 | UnknownError:  |
| 560 | `reports_partners_reports_partners_billing_reconciliation_getbilled` | unsupported | 9687 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,Fa |
| 561 | `reports_partners_reports_partners_billing_reconciliation_getunbilled` | unsupported | 9473 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,Fa |
| 562 | `reports_partners_reports_partners_billing_usage_getbilled` | unsupported | 8552 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,Fa |
| 563 | `reports_partners_reports_partners_billing_usage_getunbilled` | unsupported | 9037 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,Fa |
| 564 | `reports_partners_reports_partners_getbilling` | unsupported | 9001 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,Fa |
| 565 | `reports_printusagebyprinter_reports_listdailyprintusagebyprinter` | auth | 9533 | UnknownError: {\ |
| 566 | `reports_printusagebyprinter_reports_listmonthlyprintusagebyprinter` | auth | 9219 | UnknownError: {\ |
| 567 | `reports_printusagebyuser_reports_listdailyprintusagebyuser` | auth | 8776 | UnknownError: {\ |
| 568 | `reports_printusagebyuser_reports_listmonthlyprintusagebyuser` | auth | 10442 | UnknownError: {\ |
| 569 | `reports_reportroot_functions_reports_deviceconfigurationdeviceactivity` | bad_request | 9545 | BadRequest: Request not applicable to target tenant. |
| 570 | `reports_reportroot_functions_reports_deviceconfigurationuseractivity` | bad_request | 8616 | BadRequest: Request not applicable to target tenant. |
| 571 | `reports_reportroot_functions_reports_manageddeviceenrollmentfailuredetails_8191` | bad_request | 10357 | BadRequest: Request not applicable to target tenant. |
| 572 | `reports_reportroot_functions_reports_manageddeviceenrollmenttopfailures_9ce7` | bad_request | 8154 | BadRequest: Request not applicable to target tenant. |
| 573 | `reports_reportroot_reports_reportroot_getreportroot` | pass | 5174 |  |
| 574 | `reports_securityreportsroot_reports_getsecurity` | auth | 8305 | UnknownError:  |
| 575 | `reports_securityreportsroot_reports_security_getattacksimulationrepeatoffenders` | auth | 9137 | UnknownError:  |
| 576 | `reports_securityreportsroot_reports_security_getattacksimulationsimulationusercoverage` | auth | 8887 | UnknownError:  |
| 577 | `reports_securityreportsroot_reports_security_getattacksimulationtrainingusercoverage` | auth | 10602 | UnknownError:  |
| 578 | `rolemanagement_rbacapplication_rolemanagement_directory_listresourcenamespaces` | pass | 9122 |  |
| 579 | `rolemanagement_rbacapplication_rolemanagement_directory_listroleassignments` | pass | 8910 |  |
| 580 | `rolemanagement_rbacapplication_rolemanagement_directory_listroleassignmentscheduleinstances` | auth | 9302 | UnknownError: {\ |
| 581 | `rolemanagement_rbacapplication_rolemanagement_directory_listroleassignmentschedulerequests` | auth | 10220 | UnknownError: {\ |
| 582 | `rolemanagement_rbacapplication_rolemanagement_directory_listroleassignmentschedules` | auth | 10245 | UnknownError: {\ |
| 583 | `rolemanagement_rbacapplication_rolemanagement_directory_listroledefinitions` | pass | 7841 |  |
| 584 | `rolemanagement_rbacapplication_rolemanagement_directory_listroleeligibilityscheduleinstances` | auth | 9728 | UnknownError: {\ |
| 585 | `rolemanagement_rbacapplication_rolemanagement_directory_listroleeligibilityschedulerequests` | auth | 9367 | UnknownError: {\ |
| 586 | `rolemanagement_rbacapplication_rolemanagement_directory_listroleeligibilityschedules` | auth | 10676 | UnknownError: {\ |
| 587 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listresourcenamespaces` | error | 18511 | UnknownError: <!DOCTYPE html>\r\n<html>\r\n    <head>\r\n        <title>Runtime Error</title>\r\n        |
| 588 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleassignments` | auth | 8594 | UnAuthorized: User is not authorized to perform the operation. Reason: The caller is not authorized. |
| 589 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleassignmentscheduleinstances` | unsupported | 8432 | UnknownError: {\ |
| 590 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleassignmentschedulerequests` | unsupported | 7937 | UnknownError: {\ |
| 591 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleassignmentschedules` | unsupported | 8300 | UnknownError: {\ |
| 592 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroledefinitions` | auth | 8566 | UnAuthorized: User is not authorized to perform the operation. Reason: The caller is not authorized. |
| 593 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleeligibilityscheduleinstances` | unsupported | 7520 | UnknownError: {\ |
| 594 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleeligibilityschedulerequests` | unsupported | 9274 | UnknownError: {\ |
| 595 | `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleeligibilityschedules` | unsupported | 10850 | UnknownError: {\ |
| 596 | `rolemanagement_rbacapplication_rolemanagement_getdirectory` | bad_request | 9036 | Request_InvalidRequestUrl: Request url was invalid. The request should be like /tenantdomainname/Entity or /$metadata |
| 597 | `rolemanagement_rbacapplication_rolemanagement_getentitlementmanagement` | error | 18580 | UnknownError:  |
| 598 | `rolemanagement_rolemanagement_rolemanagement_rolemanagement_getrolemanagement` | bad_request | 9152 | Request_InvalidRequestUrl: Request url was invalid. The request should be like /tenantdomainname/Entity or /$metadata |
| 599 | `schemaextensions_schemaextension_schemaextensions_schemaextension_listschemaextension` | pass | 10516 |  |
| 600 | `scopedrolememberships_scopedrolemembership_scopedrolememberships_scopedrolemembership_listscopedrolemembership` | unsupported | 5442 | Request_UnsupportedQuery: Direct queries to this resource type are not supported. |
| 601 | `security_alert_security_listalerts` | auth | 7142 | UnknownError: Auth token does not contain valid permissions or user does not have valid roles. |
| 602 | `security_alert_security_listalerts_v2` | auth | 7269 | Unauthorized: Unauthorized request - Account is not provisioned. |
| 603 | `security_attacksimulationroot_security_attacksimulation_listendusernotifications` | auth | 12086 | UnknownError:  |
| 604 | `security_attacksimulationroot_security_attacksimulation_listlandingpages` | auth | 12128 | UnknownError:  |
| 605 | `security_attacksimulationroot_security_attacksimulation_listloginpages` | auth | 18494 | UnknownError:  |
| 606 | `security_attacksimulationroot_security_attacksimulation_listoperations` | auth | 9958 | UnknownError:  |
| 607 | `security_attacksimulationroot_security_attacksimulation_listpayloads` | auth | 22942 | UnknownError:  |
| 608 | `security_attacksimulationroot_security_attacksimulation_listsimulationautomations` | auth | 16230 | UnknownError:  |
| 609 | `security_attacksimulationroot_security_attacksimulation_listsimulations` | auth | 28124 | UnknownError:  |
| 610 | `security_attacksimulationroot_security_attacksimulation_listtrainings` | auth | 13047 | UnknownError:  |
| 611 | `security_attacksimulationroot_security_getattacksimulation` | auth | 23863 | UnknownError:  |
| 612 | `security_auditcoreroot_security_auditlog_listqueries` | auth | 11916 | UnknownError: {\ |
| 613 | `security_auditcoreroot_security_getauditlog` | auth | 18820 | UnknownError: {\ |
| 614 | `security_casesroot_security_cases_listediscoverycases` | auth | 21053 | Unauthorized: ServiceFabricGraphAuthenticationMiddleware.ValidateToken: Invalid scopes. Scopes = [\ |
| 615 | `security_casesroot_security_getcases` | pass | 21106 |  |
| 616 | `security_collaborationroot_security_collaboration_listanalyzedemails` | auth | 14125 | Auth failed.: For details, use inner error to correlate with Core Auth telemetry. |
| 617 | `security_collaborationroot_security_getcollaboration` | auth | 18341 | Auth failed.: For details, use inner error to correlate with Core Auth telemetry. |
| 618 | `security_identitycontainer_security_getidentities` | auth | 18876 | Forbidden: Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, fi |
| 619 | `security_identitycontainer_security_identities_getsensorcandidateactivationconfiguration` | auth | 17758 | Forbidden: Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, fi |
| 620 | `security_identitycontainer_security_identities_getsettings` | auth | 24418 | Forbidden: Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, fi |
| 621 | `security_identitycontainer_security_identities_listhealthissues` | auth | 10096 | Forbidden: Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, fi |
| 622 | `security_identitycontainer_security_identities_listidentityaccounts` | auth | 24246 | Forbidden: Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, fi |
| 623 | `security_identitycontainer_security_identities_listsensorcandidates` | auth | 28807 | Forbidden: Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, fi |
| 624 | `security_identitycontainer_security_identities_listsensors` | auth | 25310 | Forbidden: Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, fi |
| 625 | `security_identitycontainer_security_identities_sensors_getdeploymentaccesskey` | auth | 21681 | Forbidden: Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, fi |
| 626 | `security_identitycontainer_security_identities_sensors_getdeploymentpackageuri` | auth | 19034 | Forbidden: Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, fi |
| 627 | `security_identitycontainer_security_identities_settings_getautoauditingconfiguration` | auth | 18134 | Forbidden: Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, fi |
| 628 | `security_incident_security_listincidents` | auth | 19192 | Unauthorized: Unauthorized request - Account is not provisioned. |
| 629 | `security_labelsroot_security_getlabels` | auth | 20124 | UnknownError:  |
| 630 | `security_labelsroot_security_labels_listauthorities` | auth | 20033 | UnknownError:  |
| 631 | `security_labelsroot_security_labels_listcategories` | auth | 21020 | UnknownError:  |
| 632 | `security_labelsroot_security_labels_listcitations` | auth | 21173 | UnknownError:  |
| 633 | `security_labelsroot_security_labels_listdepartments` | auth | 21373 | UnknownError:  |
| 634 | `security_labelsroot_security_labels_listfileplanreferences` | auth | 20880 | UnknownError:  |
| 635 | `security_labelsroot_security_labels_listretentionlabels` | auth | 20041 | UnknownError:  |
| 636 | `security_securescore_security_listsecurescores` | auth | 20804 | UnknownError: Auth token does not contain valid permissions or user does not have valid roles. |
| 637 | `security_securescorecontrolprofile_security_listsecurescorecontrolprofiles` | auth | 20105 | UnknownError: Auth token does not contain valid permissions or user does not have valid roles. |
| 638 | `security_security_security_security_getsecurity` | pass | 17144 |  |
| 639 | `security_subjectrightsrequest_security_listsubjectrightsrequests` | not_found | 20422 | HostNotFound: Target 'privacy.trafficmanager.net' is not found. |
| 640 | `security_tenantdatasecurityandgovernance_security_datasecurityandgovernance_getprotectionscopes` | not_found | 14045 | UnknownError:  |
| 641 | `security_tenantdatasecurityandgovernance_security_datasecurityandgovernance_listsensitivitylabels` | auth | 16630 | Unauthorized: Authorization is failed with code: InsufficientGraphPermissions. |
| 642 | `security_tenantdatasecurityandgovernance_security_getdatasecurityandgovernance` | not_found | 12119 | UnknownError:  |
| 643 | `security_threatintelligence_security_getthreatintelligence` | pass | 16189 |  |
| 644 | `security_threatintelligence_security_threatintelligence_listarticleindicators` | not_found | 15272 | UnknownError:  |
| 645 | `security_threatintelligence_security_threatintelligence_listarticles` | auth | 14955 | notAllowed: The organization has not been onboarded to Microsoft Defender. |
| 646 | `security_threatintelligence_security_threatintelligence_listhostcomponents` | not_found | 15879 | UnknownError:  |
| 647 | `security_threatintelligence_security_threatintelligence_listhostcookies` | not_found | 18060 | UnknownError:  |
| 648 | `security_threatintelligence_security_threatintelligence_listhostpairs` | not_found | 18024 | UnknownError:  |
| 649 | `security_threatintelligence_security_threatintelligence_listhostports` | not_found | 18983 | UnknownError:  |
| 650 | `security_threatintelligence_security_threatintelligence_listhosts` | not_found | 10428 | UnknownError:  |
| 651 | `security_threatintelligence_security_threatintelligence_listhostsslcertificates` | not_found | 18747 | UnknownError:  |
| 652 | `security_threatintelligence_security_threatintelligence_listhosttrackers` | not_found | 12202 | UnknownError:  |
| 653 | `security_threatintelligence_security_threatintelligence_listintelligenceprofileindicators` | not_found | 18627 | UnknownError:  |
| 654 | `security_threatintelligence_security_threatintelligence_listintelprofiles` | auth | 18039 | notAllowed: The organization has not been onboarded to Microsoft Defender. |
| 655 | `security_threatintelligence_security_threatintelligence_listpassivednsrecords` | not_found | 17943 | UnknownError:  |
| 656 | `security_threatintelligence_security_threatintelligence_listsslcertificates` | auth | 17510 | notAllowed: The organization has not been onboarded to Microsoft Defender. |
| 657 | `security_threatintelligence_security_threatintelligence_listsubdomains` | not_found | 11769 | UnknownError:  |
| 658 | `security_threatintelligence_security_threatintelligence_listvulnerabilities` | not_found | 15669 | UnknownError:  |
| 659 | `security_threatintelligence_security_threatintelligence_listwhoishistoryrecords` | not_found | 9438 | UnknownError:  |
| 660 | `security_threatintelligence_security_threatintelligence_listwhoisrecords` | auth | 16265 | notAllowed: The organization has not been onboarded to Microsoft Defender. |
| 661 | `security_triggersroot_security_gettriggers` | auth | 17435 | UnknownError:  |
| 662 | `security_triggersroot_security_triggers_listretentionevents` | auth | 17392 | UnknownError:  |
| 663 | `security_triggertypesroot_security_gettriggertypes` | auth | 15828 | UnknownError:  |
| 664 | `security_triggertypesroot_security_triggertypes_listretentioneventtypes` | auth | 15340 | UnknownError:  |
| 665 | `serviceprincipals_serviceprincipal_functions_serviceprincipals_delta` | pass | 18813 |  |
| 666 | `serviceprincipals_serviceprincipal_serviceprincipals_serviceprincipal_listserviceprincipal` | pass | 17389 |  |
| 667 | `shares_shareddriveitem_shares_shareddriveitem_listshareddriveitem` | bad_request | 16847 | invalidRequest: The request is malformed or incorrect. |
| 668 | `sites_site_functions_sites_delta` | auth | 13189 | accessDenied: Access denied |
| 669 | `sites_site_functions_sites_getallsites` | auth | 15890 | accessDenied: Access denied |
| 670 | `sites_site_sites_site_listsite` | pass | 18922 |  |
| 671 | `solutions_backuprestoreroot_solutions_backuprestore_getemailnotificationssetting` | auth | 18787 | UnknownError:  |
| 672 | `solutions_backuprestoreroot_solutions_backuprestore_listbrowsesessions` | auth | 18248 | UnknownError:  |
| 673 | `solutions_backuprestoreroot_solutions_backuprestore_listdriveinclusionrules` | auth | 14381 | UnknownError:  |
| 674 | `solutions_backuprestoreroot_solutions_backuprestore_listdriveprotectionunits` | auth | 14382 | UnknownError:  |
| 675 | `solutions_backuprestoreroot_solutions_backuprestore_listdriveprotectionunitsbulkadditionjobs` | auth | 13909 | UnknownError:  |
| 676 | `solutions_backuprestoreroot_solutions_backuprestore_listexchangeprotectionpolicies` | auth | 15415 | UnknownError:  |
| 677 | `solutions_backuprestoreroot_solutions_backuprestore_listexchangerestoresessions` | auth | 15446 | UnknownError:  |
| 678 | `solutions_backuprestoreroot_solutions_backuprestore_listmailboxinclusionrules` | auth | 15385 | UnknownError:  |
| 679 | `solutions_backuprestoreroot_solutions_backuprestore_listmailboxprotectionunits` | auth | 14982 | UnknownError:  |
| 680 | `solutions_backuprestoreroot_solutions_backuprestore_listmailboxprotectionunitsbulkadditionjobs` | auth | 14909 | UnknownError:  |
| 681 | `solutions_backuprestoreroot_solutions_backuprestore_listonedriveforbusinessbrowsesessions` | auth | 15160 | UnknownError:  |
| 682 | `solutions_backuprestoreroot_solutions_backuprestore_listonedriveforbusinessprotectionpolicies` | auth | 17331 | UnknownError:  |
| 683 | `solutions_backuprestoreroot_solutions_backuprestore_listonedriveforbusinessrestoresessions` | auth | 17350 | UnknownError:  |
| 684 | `solutions_backuprestoreroot_solutions_backuprestore_listprotectionpolicies` | auth | 19409 | UnknownError:  |
| 685 | `solutions_backuprestoreroot_solutions_backuprestore_listprotectionunits` | auth | 18825 | UnknownError:  |
| 686 | `solutions_backuprestoreroot_solutions_backuprestore_listprotectionunits_asdriveprotectionunit` | auth | 18835 | UnknownError:  |
| 687 | `solutions_backuprestoreroot_solutions_backuprestore_listprotectionunits_asmailboxprotectionunit` | auth | 18898 | UnknownError:  |
| 688 | `solutions_backuprestoreroot_solutions_backuprestore_listprotectionunits_assiteprotectionunit` | auth | 19930 | UnknownError:  |
| 689 | `solutions_backuprestoreroot_solutions_backuprestore_listrestorepoints` | auth | 19864 | UnknownError:  |
| 690 | `solutions_backuprestoreroot_solutions_backuprestore_listrestoresessions` | auth | 20359 | UnknownError:  |
| 691 | `solutions_backuprestoreroot_solutions_backuprestore_listserviceapps` | auth | 23131 | UnknownError:  |
| 692 | `solutions_backuprestoreroot_solutions_backuprestore_listsharepointbrowsesessions` | auth | 23088 | UnknownError:  |
| 693 | `solutions_backuprestoreroot_solutions_backuprestore_listsharepointprotectionpolicies` | auth | 23592 | UnknownError:  |
| 694 | `solutions_backuprestoreroot_solutions_backuprestore_listsharepointrestoresessions` | auth | 20019 | UnknownError:  |
| 695 | `solutions_backuprestoreroot_solutions_backuprestore_listsiteinclusionrules` | auth | 20010 | UnknownError:  |
| 696 | `solutions_backuprestoreroot_solutions_backuprestore_listsiteprotectionunits` | auth | 16618 | UnknownError:  |
| 697 | `solutions_backuprestoreroot_solutions_backuprestore_listsiteprotectionunitsbulkadditionjobs` | auth | 16153 | UnknownError:  |
| 698 | `solutions_backuprestoreroot_solutions_getbackuprestore` | auth | 16085 | UnknownError:  |
| 699 | `solutions_bookingbusiness_solutions_listbookingbusinesses` | auth | 18045 | UnknownError:  |
| 700 | `solutions_bookingcurrency_solutions_listbookingcurrencies` | auth | 21661 | UnknownError:  |
| 701 | `solutions_solutionsroot_solutions_solutionsroot_getsolutionsroot` | pass | 21434 |  |
| 702 | `solutions_virtualeventsroot_solutions_getvirtualevents` | not_found | 23833 | UnknownError: {\ |
| 703 | `solutions_virtualeventsroot_solutions_virtualevents_listevents` | not_found | 21498 | UnknownError: {\ |
| 704 | `solutions_virtualeventsroot_solutions_virtualevents_listtownhalls` | auth | 22161 | Forbidden: Insufficient permissions |
| 705 | `solutions_virtualeventsroot_solutions_virtualevents_listwebinars` | auth | 18651 | Forbidden: Insufficient permissions |
| 706 | `storage_filestorage_storage_filestorage_listcontainers` | auth | 18995 | accessDenied: Caller does not have required permissions for this API |
| 707 | `storage_filestorage_storage_filestorage_listcontainertyperegistrations` | auth | 18140 | accessDenied: Caller does not have required permissions for this API |
| 708 | `storage_filestorage_storage_filestorage_listcontainertypes` | auth | 24989 | accessDenied: Caller does not have required permissions for this API |
| 709 | `storage_filestorage_storage_filestorage_listdeletedcontainers` | auth | 11569 | accessDenied: Caller does not have required permissions for this API |
| 710 | `storage_filestorage_storage_getfilestorage` | unsupported | 28001 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.FileServices,False |
| 711 | `storage_storage_storage_storage_getstorage` | pass | 30632 |  |
| 712 | `storage_storagesettings_storage_getsettings` | unsupported | 28788 | BadRequest: This API is not supported for AAD accounts (no addressUrl for Microsoft.UnifiedStorageQuot |
| 713 | `storage_storagesettings_storage_settings_getquota` | error | 33837 | InternalServerError: Invalid URI: The hostname could not be parsed. |
| 714 | `storage_storagesettings_storage_settings_quota_listservices` | error | 33239 | InternalServerError: Invalid URI: The hostname could not be parsed. |
| 715 | `subscribedskus_subscribedsku_subscribedskus_subscribedsku_listsubscribedsku` | pass | 28771 |  |
| 716 | `subscriptions_subscription_subscriptions_subscription_listsubscription` | pass | 22134 |  |
| 717 | `teams_team_functions_teams_getallmessages` | not_found | 29243 | UnknownError:  |
| 718 | `teams_team_teams_team_listteam` | auth | 24232 | Forbidden: Missing scope permissions on the request. API requires one of 'Team.ReadBasic.All, TeamSet |
| 719 | `teamstemplates_teamstemplate_teamstemplates_teamstemplate_listteamstemplate` | not_found | 27121 | NotFound: Requested API is not supported. Please check the path. |
| 720 | `teamwork_deletedchat_teamwork_listdeletedchats` | auth | 26589 | Forbidden: Missing scope permissions on the request. API requires one of 'Chat.ManageDeletion.All'. S |
| 721 | `teamwork_deletedteam_teamwork_deletedteams_getallmessages` | not_found | 26214 | NotFound: Requested API is not supported. Please check the path. |
| 722 | `teamwork_deletedteam_teamwork_listdeletedteams` | auth | 28994 | Forbidden: Missing scope permissions on the request. API requires one of 'Team.ReadBasic.All'. Scopes |
| 723 | `teamwork_teamsappsettings_teamwork_getteamsappsettings` | auth | 10656 | Forbidden: Missing scope permissions on the request. API requires one of 'TeamworkAppSettings.Read.Al |
| 724 | `teamwork_teamwork_teamwork_teamwork_getteamwork` | auth | 28595 | Forbidden: Missing scope permissions on the request. API requires one of 'Teamwork.Read.All, Director |
| 725 | `teamwork_workforceintegration_teamwork_listworkforceintegrations` | auth | 16851 | Forbidden: Missing scope permissions on the request. API requires one of 'WorkforceIntegration.Read.A |
| 726 | `tenantrelationships_delegatedadmincustomer_tenantrelationships_listdelegatedadmincustomers` | pass | 27151 |  |
| 727 | `tenantrelationships_delegatedadminrelationship_tenantrelationships_listdelegatedadminrelationships` | pass | 27197 |  |
| 728 | `tenantrelationships_multitenantorganization_tenantrelationships_getmultitenantorganization` | pass | 26545 |  |
| 729 | `tenantrelationships_multitenantorganization_tenantrelationships_multitenantorganization_getjoinrequest` | pass | 28710 |  |
| 730 | `tenantrelationships_multitenantorganization_tenantrelationships_multitenantorganization_listtenants` | pass | 32189 |  |
| 731 | `tenantrelationships_tenantrelationship_tenantrelationships_tenantrelationship_gettenantrelationship` | pass | 31762 |  |
| 732 | `users_user_functions_users_delta` | pass | 31143 |  |
| 733 | `users_user_users_user_listuser` | pass | 24787 |  |

---

## 📁 Files

- `/tmp/coral_sql_results_2026-08-04-licensed-everything-clean.json` — final all-scope results (733 tables, noise-cleared)
- `/tmp/coral_sql_results_2026-08-04-licensed-everything.json` — raw all-scope battery (44 tables hit the trace race)
- `/tmp/coral_sql_results_2026-08-04-licensed-sweep.json` — prior 9-scope run (comparison baseline)
- `/tmp/run_everything.py`, `/tmp/run_noise_serial.py` — drivers

Author: Vicky Kumar <algsoch@gmail.com> · Repo: https://github.com/FiscalMindset/coral_specs_testing