# Microsoft Graph V4 — Spec-Bug Audit Report

**Date:** 2026-08-04 (UTC)  
**Tenant:** `89de3b75-fef2-44f9-90a4-cf8c69700c83`  
**Token:** keychain OAuth (36 scopes, Coral app `6a1a84df-...`)  
**Tables tested:** 733  
**Spec-fixable bugs:** 246  
**Not fixable in spec:** 40  

---

## Summary — what Coral can fix

Of the 733 tables tested, **246** fail because of issues in the manifest/spec that can be fixed by editing the source definition. These are grouped below with exact table names and fix recommendations.

The remaining **40** fail due to Graph API server errors, transient outages, missing licenses, or Graph routing issues — these cannot be resolved by changing the spec.

## Summary — all failure classes

| # | Bug class | Count | Coral can fix? | Fix action |
|---|-----------|------:|:--------------:|------------|
| 1 | Consumer/MSA-only endpoints (wrong audience for AAD tenant) | 131 | Yes | Remove from spec (consumer/MSA-only, cannot work on AAD tenants) |
| 2 | Endpoint not found (404 — URL does not exist in Graph v1.0) | 58 | Yes | Remove from spec (endpoint does not exist in Graph v1.0) |
| 3 | Wrong base URL path in manifest | 19 | Yes | Fix base URL path in manifest |
| 4 | Deprecated/removed endpoints | 15 | Yes | Remove from spec (endpoint removed from Graph API) |
| 5 | Missing entity-ID parameter | 3 | Yes | Add table function with entity-ID parameter, or remove |
| 6 | Unsupported query type ($search/$delta) | 3 | Yes | Remove unsupported $search/$delta query hint from manifest |
| 7 | Delta functions on entities that do not support delta | 7 | Yes | Remove delta table function (entity does not support delta) |
| 8 | Invalid root URL path in manifest | 4 | Yes | Fix root path in manifest (maps to wrong URL) |
| 9 | Cannot query standalone — requires parent entity | 1 | Yes | Remove standalone table (requires parent entity navigation) |
| 10 | Missing required @startDateTime parameter | 4 | Yes | Add @startDateTime required parameter to table definition |
| 11 | Wrong HTTP method in manifest | 1 | Yes | Fix HTTP method in manifest (GET vs POST mismatch) |
| 12 | Graph API routing (MissingProvider) — not fixable in spec | 10 | No | Not a spec bug — Graph API routing issue (MissingProvider) |
| 13 | Graph API server error (500) — not fixable in spec | 14 | No | Not a spec bug — Graph API server error or missing license |
| 14 | Entra ID P1/P2 license required — reclassify as license | 4 | No | Not a spec bug — reclassify as license (Entra ID P1/P2 needed) |
| 15 | Graph API transient outage (503) — not fixable in spec | 3 | No | Not a spec bug — Graph API transient outage during test |
| 16 | Malformed response (decode failed) — transient | 1 | No | Not a spec bug — Graph returned empty/malformed JSON (transient) |
| 17 | Unsupported dynamic path segment — not fixable in spec | 2 | No | Not a spec bug — manifest uses unsupported dynamic path segment |
| 18 | Resource segment not found — not fixable in spec | 2 | No | Not a spec bug — resource segment not found on this entity |
| 19 | Other Graph API errors — not fixable in spec | 4 | No | Not a spec bug — Graph API error outside spec control |
| | **Total** | **733** | | |

---

## 1. Consumer/MSA-only endpoints (wrong audience for AAD tenant) (131 tables) — ✅ Coral can fix

**Fix:** Remove from spec (consumer/MSA-only, cannot work on AAD tenants)

| Table | Error |
|-------|-------|
| `admin_configurationmanagement_admin_getconfigurationmanagement` | This API is not supported for AAD accounts (no addressUrl for Microsoft.XTA,False). |
| `admin_edge_admin_edge_getinternetexplorermode` | This API is not supported for AAD accounts (no addressUrl for Microsoft.Edge.CloudSiteListManagement,False). |
| `admin_edge_admin_getedge` | This API is not supported for AAD accounts (no addressUrl for Microsoft.Edge.CloudSiteListManagement,False). |
| `admin_exchangeadmin_admin_getexchange` | This API is not supported for AAD accounts (no addressUrl for Microsoft.Exchange,True). |
| `admin_sharepoint_admin_getsharepoint` | This API is not supported for AAD accounts (no addressUrl for Microsoft.FileServices,False). |
| `admin_teamsadminroot_admin_getteams` | This API is not supported for AAD accounts (no addressUrl for Microsoft.IC3.TeamsAdminGateway,False). |
| `admin_teamsadminroot_admin_teams_getpolicy` | This API is not supported for AAD accounts (no addressUrl for Microsoft.IC3.PolicyAdmin,False). |
| `admin_teamsadminroot_admin_teams_gettelephonenumbermanagement` | This API is not supported for AAD accounts (no addressUrl for Microsoft.IC3.TelephoneNumberManagement,False). |
| `copilot_copilotadmin_copilot_admin_getcatalog` | This API is not supported for AAD accounts (no addressUrl for Microsoft.CopilotPackage,False). |
| `deviceappmanagement_androidmanagedappprotection_deviceappmanagement_listandroidmanagedappprotections` | Request not applicable to target tenant. |
| `deviceappmanagement_defaultmanagedappprotection_deviceappmanagement_listdefaultmanagedappprotections` | Request not applicable to target tenant. |
| `deviceappmanagement_deviceappmanagement_deviceappmanagement_deviceappmanagement_getdeviceappmanagement` | Request not applicable to target tenant. |
| `deviceappmanagement_iosmanagedappprotection_deviceappmanagement_listiosmanagedappprotections` | Request not applicable to target tenant. |
| `deviceappmanagement_managedapppolicy_deviceappmanagement_listmanagedapppolicies` | Request not applicable to target tenant. |
| `deviceappmanagement_managedappregistration_deviceappmanagement_listmanagedappregistrations` | Request not applicable to target tenant. |
| `deviceappmanagement_managedappregistration_deviceappmanagement_managedappregistrations_getuseridswithflaggedappregistration` | Request not applicable to target tenant. |
| `deviceappmanagement_managedappstatus_deviceappmanagement_listmanagedappstatuses` | Request not applicable to target tenant. |
| `deviceappmanagement_manageddevicemobileappconfiguration_deviceappmanagement_listmobileappconfigurations` | Request not applicable to target tenant. |
| `deviceappmanagement_managedebook_deviceappmanagement_listmanagedebooks` | Request not applicable to target tenant. |
| `deviceappmanagement_mdmwindowsinformationprotectionpolicy_deviceappmanagement_listmdmwindowsinformationprotectionpolicies` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asandroidlobapp` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asandroidstoreapp` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asioslobapp` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asiosstoreapp` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asiosvppapp` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmacosdmgapp` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmacoslobapp` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmanagedandroidlobapp` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmanagedioslobapp` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmanagedmobilelobapp` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmicrosoftstoreforbusinessapp` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswin32lobapp` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswindowsappx` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswindowsmobilemsi` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswindowsuniversalappx` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswindowswebapp` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileappcategory_deviceappmanagement_listmobileappcategories` | Request not applicable to target tenant. |
| `deviceappmanagement_mobileapprelationship_deviceappmanagement_listmobileapprelationships` | Request not applicable to target tenant. |
| `deviceappmanagement_targetedmanagedappconfiguration_deviceappmanagement_listtargetedmanagedappconfigurations` | Request not applicable to target tenant. |
| `deviceappmanagement_vpptoken_deviceappmanagement_listvpptokens` | Request not applicable to target tenant. |
| `deviceappmanagement_windowsinformationprotectionpolicy_deviceappmanagement_listwindowsinformationprotectionpolicies` | Request not applicable to target tenant. |
| `devicemanagement_applepushnotificationcertificate_devicemanagement_applepushnotificationcertificate_downloadapplepushnotificationcertificatesigningrequest` | Request not applicable to target tenant. |
| `devicemanagement_applepushnotificationcertificate_devicemanagement_getapplepushnotificationcertificate` | Request not applicable to target tenant. |
| `devicemanagement_auditevent_devicemanagement_auditevents_getauditcategories` | Request not applicable to target tenant. |
| `devicemanagement_auditevent_devicemanagement_listauditevents` | Request not applicable to target tenant. |
| `devicemanagement_compliancemanagementpartner_devicemanagement_listcompliancemanagementpartners` | Request not applicable to target tenant. |
| `devicemanagement_detectedapp_devicemanagement_listdetectedapps` | Request not applicable to target tenant. |
| `devicemanagement_deviceandappmanagementroleassignment_devicemanagement_listroleassignments` | Request not applicable to target tenant. |
| `devicemanagement_devicecategory_devicemanagement_listdevicecategories` | Request not applicable to target tenant. |
| `devicemanagement_devicecompliancepolicy_devicemanagement_listdevicecompliancepolicies` | Request not applicable to target tenant. |
| `devicemanagement_devicecompliancepolicydevicestatesummary_devicemanagement_getdevicecompliancepolicydevicestatesummary` | Request not applicable to target tenant. |
| `devicemanagement_devicecompliancepolicysettingstatesummary_devicemanagement_listdevicecompliancepolicysettingstatesummaries` | Request not applicable to target tenant. |
| `devicemanagement_deviceconfiguration_devicemanagement_listdeviceconfigurations` | Request not applicable to target tenant. |
| `devicemanagement_deviceconfigurationdevicestatesummary_devicemanagement_getdeviceconfigurationdevicestatesummaries` | Request not applicable to target tenant. |
| `devicemanagement_deviceenrollmentconfiguration_devicemanagement_listdeviceenrollmentconfigurations` | Request not applicable to target tenant. |
| `devicemanagement_devicemanagement_devicemanagement_devicemanagement_getdevicemanagement` | Request not applicable to target tenant. |
| `devicemanagement_devicemanagement_functions_devicemanagement_userexperienceanalyticssummarizeworkfromanywheredevices` | Request not applicable to target tenant. |
| `devicemanagement_devicemanagementexchangeconnector_devicemanagement_listexchangeconnectors` | Request not applicable to target tenant. |
| `devicemanagement_devicemanagementpartner_devicemanagement_listdevicemanagementpartners` | Request not applicable to target tenant. |
| `devicemanagement_devicemanagementreports_devicemanagement_getreports` | Request not applicable to target tenant. |
| `devicemanagement_devicemanagementreports_devicemanagement_reports_listexportjobs` | Request not applicable to target tenant. |
| `devicemanagement_devicemanagementtroubleshootingevent_devicemanagement_listtroubleshootingevents` | Request not applicable to target tenant. |
| `devicemanagement_importedwindowsautopilotdeviceidentity_devicemanagement_listimportedwindowsautopilotdeviceidentities` | Request not applicable to target tenant. |
| `devicemanagement_iosupdatedevicestatus_devicemanagement_listiosupdatestatuses` | Request not applicable to target tenant. |
| `devicemanagement_manageddevice_devicemanagement_listmanageddevices` | Request not applicable to target tenant. |
| `devicemanagement_manageddeviceoverview_devicemanagement_getmanageddeviceoverview` | Request not applicable to target tenant. |
| `devicemanagement_mobileapptroubleshootingevent_devicemanagement_listmobileapptroubleshootingevents` | Request not applicable to target tenant. |
| `devicemanagement_mobilethreatdefenseconnector_devicemanagement_listmobilethreatdefenseconnectors` | Request not applicable to target tenant. |
| `devicemanagement_notificationmessagetemplate_devicemanagement_listnotificationmessagetemplates` | Request not applicable to target tenant. |
| `devicemanagement_onpremisesconditionalaccesssettings_devicemanagement_getconditionalaccesssettings` | Request not applicable to target tenant. |
| `devicemanagement_remoteassistancepartner_devicemanagement_listremoteassistancepartners` | Request not applicable to target tenant. |
| `devicemanagement_resourceoperation_devicemanagement_listresourceoperations` | Request not applicable to target tenant. |
| `devicemanagement_roledefinition_devicemanagement_listroledefinitions` | Request not applicable to target tenant. |
| `devicemanagement_softwareupdatestatussummary_devicemanagement_getsoftwareupdatestatussummary` | Request not applicable to target tenant. |
| `devicemanagement_termsandconditions_devicemanagement_listtermsandconditions` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsapphealthapplicationperformance_devicemanagement_listuserexperienceanalyticsapphealthapplicationperformance` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsapphealthappperformancebyappversiondetails_devicemanagement_listuserexperienceanalyticsapphealthapplicationperformancebyappversiondetails` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsapphealthappperformancebyappversiondeviceid_devicemanagement_listuserexperienceanalyticsapphealthapplicationperformancebyappversiondeviceid` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsapphealthappperformancebyosversion_devicemanagement_listuserexperienceanalyticsapphealthapplicationperformancebyosversion` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsapphealthdevicemodelperformance_devicemanagement_listuserexperienceanalyticsapphealthdevicemodelperformance` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsapphealthdeviceperformance_devicemanagement_listuserexperienceanalyticsapphealthdeviceperformance` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsapphealthdeviceperformancedetails_devicemanagement_listuserexperienceanalyticsapphealthdeviceperformancedetails` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsapphealthosversionperformance_devicemanagement_listuserexperienceanalyticsapphealthosversionperformance` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsbaseline_devicemanagement_listuserexperienceanalyticsbaselines` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticscategory_devicemanagement_getuserexperienceanalyticsapphealthoverview` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticscategory_devicemanagement_listuserexperienceanalyticscategories` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticscategory_devicemanagement_userexperienceanalyticsapphealthoverview_listmetricvalues` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsdeviceperformance_devicemanagement_listuserexperienceanalyticsdeviceperformance` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsdevicescores_devicemanagement_listuserexperienceanalyticsdevicescores` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsdevicestartuphistory_devicemanagement_listuserexperienceanalyticsdevicestartuphistory` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsdevicestartupprocess_devicemanagement_listuserexperienceanalyticsdevicestartupprocesses` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsdevicestartupprocessperformance_devicemanagement_listuserexperienceanalyticsdevicestartupprocessperformance` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsmetrichistory_devicemanagement_listuserexperienceanalyticsmetrichistory` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsmodelscores_devicemanagement_listuserexperienceanalyticsmodelscores` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsoverview_devicemanagement_getuserexperienceanalyticsoverview` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsscorehistory_devicemanagement_listuserexperienceanalyticsscorehistory` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsworkfromanywherehardwarereadinessmetric_devicemanagement_getuserexperienceanalyticsworkfromanywherehardwarereadinessmetric` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsworkfromanywheremetric_devicemanagement_listuserexperienceanalyticsworkfromanywheremetrics` | Request not applicable to target tenant. |
| `devicemanagement_userexperienceanalyticsworkfromanywheremodelperformance_devicemanagement_listuserexperienceanalyticsworkfromanywheremodelperformance` | Request not applicable to target tenant. |
| `devicemanagement_windowsautopilotdeviceidentity_devicemanagement_listwindowsautopilotdeviceidentities` | Request not applicable to target tenant. |
| `devicemanagement_windowsinformationprotectionapplearningsummary_devicemanagement_listwindowsinformationprotectionapplearningsummaries` | Request not applicable to target tenant. |
| `devicemanagement_windowsinformationprotectionnetworklearningsummary_devicemanagement_listwindowsinformationprotectionnetworklearningsummaries` | Request not applicable to target tenant. |
| `devicemanagement_windowsmalwareinformation_devicemanagement_listwindowsmalwareinformation` | Request not applicable to target tenant. |
| `directory_identityproviderbase_directory_federationconfigurations_availableprovidertypes` | This API is not supported for AAD accounts (no addressUrl for Microsoft.CPIM,False). |
| `identity_identityverifiedidroot_identity_getverifiedid` | This API is not supported for AAD accounts (no addressUrl for Microsoft.VerifiedId.VerifiedIdProfile,False). |
| `me_devicemanagementtroubleshootingevent_me_listdevicemanagementtroubleshootingevents` | Request not applicable to target tenant. |
| `me_employeeexperienceuser_me_getemployeeexperience` | This API is not supported for AAD accounts (no addressUrl for Microsoft.Viva.Learning,False). |
| `me_managedappregistration_me_listmanagedappregistrations` | Request not applicable to target tenant. |
| `me_manageddevice_me_listmanageddevices` | Request not applicable to target tenant. |
| `me_user_functions_me_exportdeviceandappmanagementdata_1a02` | Request not applicable to target tenant. |
| `me_user_functions_me_getmanagedappdiagnosticstatuses` | Request not applicable to target tenant. |
| `me_user_functions_me_getmanagedapppolicies` | Request not applicable to target tenant. |
| `me_user_functions_me_getmanageddeviceswithappfailures` | Request not applicable to target tenant. |
| `me_usersettings_me_settings_getstorage` | This API is not supported for AAD accounts (no addressUrl for Microsoft.UnifiedStorageQuota,False). |
| `me_usersettings_me_settings_storage_getquota` | This API is not supported for AAD accounts (no addressUrl for Microsoft.UnifiedStorageQuota,False). |
| `me_usersettings_me_settings_storage_quota_listservices` | This API is not supported for AAD accounts (no addressUrl for Microsoft.UnifiedStorageQuota,False). |
| `reports_partners_reports_getpartners` | This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,False). |
| `reports_partners_reports_partners_billing_getreconciliation` | This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,False). |
| `reports_partners_reports_partners_billing_getusage` | This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,False). |
| `reports_partners_reports_partners_billing_reconciliation_getbilled` | This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,False). |
| `reports_partners_reports_partners_billing_reconciliation_getunbilled` | This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,False). |
| `reports_partners_reports_partners_billing_usage_getbilled` | This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,False). |
| `reports_partners_reports_partners_billing_usage_getunbilled` | This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,False). |
| `reports_partners_reports_partners_getbilling` | This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,False). |
| `reports_reportroot_functions_reports_deviceconfigurationdeviceactivity` | Request not applicable to target tenant. |
| `reports_reportroot_functions_reports_deviceconfigurationuseractivity` | Request not applicable to target tenant. |
| `reports_reportroot_functions_reports_manageddeviceenrollmentfailuredetails_8191` | Request not applicable to target tenant. |
| `reports_reportroot_functions_reports_manageddeviceenrollmenttopfailures_9ce7` | Request not applicable to target tenant. |
| `storage_filestorage_storage_getfilestorage` | This API is not supported for AAD accounts (no addressUrl for Microsoft.FileServices,False). |
| `storage_storagesettings_storage_getsettings` | This API is not supported for AAD accounts (no addressUrl for Microsoft.UnifiedStorageQuota,False). |

## 2. Endpoint not found (404 — URL does not exist in Graph v1.0) (58 tables) — ✅ Coral can fix

**Fix:** Remove from spec (endpoint does not exist in Graph v1.0)

| Table | Error |
|-------|-------|
| `admin_serviceannouncement_admin_getserviceannouncement` | Error: Source resource was not found (404) |
| `admin_teamsadminroot_admin_teams_policy_listuserassignments` | Error: Source resource was not found (404) |
| `communications_onlinemeetingengagementconversation_communications_listonlinemeetingconversations` | Error: Source resource was not found (404) |
| `communications_presence_communications_listpresences` | Error: Source resource was not found (404) |
| `copilot_copilotadmin_copilot_admin_getsettings` | Error: Source resource was not found (404) |
| `copilot_copilotadmin_copilot_getadmin` | Error: Source resource was not found (404) |
| `copilot_copilotreportroot_copilot_getreports` | <!DOCTYPE html PUBLIC \ |
| `directory_publickeyinfrastructureroot_directory_getpublickeyinfrastructure` | Resource not found for the segment 'publicKeyInfrastructure'. |
| `employeeexperience_learningcourseactivity_employeeexperience_listlearningcourseactivities` | Error: Source resource was not found (404) |
| `identitygovernance_appconsentapprovalroute_identitygovernance_getappconsent` | Error: Source resource was not found (404) |
| `identitygovernance_lifecycleworkflowscontainer_identitygovernance_getlifecycleworkflows` | Error: Source resource was not found (404) |
| `identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_getdeleteditems` | Error: Source resource was not found (404) |
| `identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_getinsights` | Error: Source resource was not found (404) |
| `informationprotection_bitlocker_informationprotection_getbitlocker` | Unsupported method or endpoint. |
| `informationprotection_threatassessmentrequest_informationprotection_listthreatassessmentrequests` | Error: Source resource was not found (404) |
| `invitations_directoryobject_invitations_listinvitedusersponsors` | <!DOCTYPE html PUBLIC \ |
| `invitations_invitation_invitations_invitation_listinvitation` | <!DOCTYPE html PUBLIC \ |
| `invitations_user_invitations_getinviteduser` | <!DOCTYPE html PUBLIC \ |
| `me_directoryobject_me_getmanager` | Resource 'manager' does not exist or one of its queried reference-property objects are not present. |
| `me_planneruser_me_getplanner` | Tenant is not found. |
| `me_planneruser_me_planner_listplans` | Tenant is not found. |
| `me_planneruser_me_planner_listtasks` | Tenant is not found. |
| `me_profilephoto_me_getphoto` | Accessing service failed. |
| `me_profilephoto_me_listphotos` | Accessing service failed. |
| `me_userdatasecurityandgovernance_me_datasecurityandgovernance_activities_listcontentactivities` | Error: Source resource was not found (404) |
| `me_userdatasecurityandgovernance_me_datasecurityandgovernance_getactivities` | Error: Source resource was not found (404) |
| `me_userdatasecurityandgovernance_me_datasecurityandgovernance_getprotectionscopes` | Error: Source resource was not found (404) |
| `me_userdatasecurityandgovernance_me_getdatasecurityandgovernance` | Error: Source resource was not found (404) |
| `me_usersettings_me_settings_getiteminsights` | Accessing service failed. |
| `planner_planner_planner_planner_getplanner` | Tenant is not found. |
| `planner_plannerbucket_planner_listbuckets` | Tenant is not found. |
| `planner_plannerplan_planner_listplans` | Tenant is not found. |
| `planner_plannertask_planner_listtasks` | Tenant is not found. |
| `print_print_print_print_getprint` | Error: Source resource was not found (404) |
| `print_printoperation_print_listoperations` | Error: Source resource was not found (404) |
| `reports_partners_reports_partners_billing_listmanifests` | Error: Source resource was not found (404) |
| `reports_partners_reports_partners_billing_listoperations` | Error: Source resource was not found (404) |
| `reports_securityreportsroot_reports_getsecurity` | Error: Source resource was not found (404) |
| `security_attacksimulationroot_security_attacksimulation_listoperations` | Error: Source resource was not found (404) |
| `security_attacksimulationroot_security_getattacksimulation` | Error: Source resource was not found (404) |
| `security_tenantdatasecurityandgovernance_security_datasecurityandgovernance_getprotectionscopes` | Error: Source resource was not found (404) |
| `security_tenantdatasecurityandgovernance_security_getdatasecurityandgovernance` | Error: Source resource was not found (404) |
| `security_threatintelligence_security_threatintelligence_listarticleindicators` | Error: Source resource was not found (404) |
| `security_threatintelligence_security_threatintelligence_listhostcomponents` | Error: Source resource was not found (404) |
| `security_threatintelligence_security_threatintelligence_listhostcookies` | Error: Source resource was not found (404) |
| `security_threatintelligence_security_threatintelligence_listhostpairs` | Error: Source resource was not found (404) |
| `security_threatintelligence_security_threatintelligence_listhostports` | Error: Source resource was not found (404) |
| `security_threatintelligence_security_threatintelligence_listhosts` | Error: Source resource was not found (404) |
| `security_threatintelligence_security_threatintelligence_listhostsslcertificates` | Error: Source resource was not found (404) |
| `security_threatintelligence_security_threatintelligence_listhosttrackers` | Error: Source resource was not found (404) |
| `security_threatintelligence_security_threatintelligence_listintelligenceprofileindicators` | Error: Source resource was not found (404) |
| `security_threatintelligence_security_threatintelligence_listpassivednsrecords` | Error: Source resource was not found (404) |
| `security_threatintelligence_security_threatintelligence_listsubdomains` | Error: Source resource was not found (404) |
| `security_threatintelligence_security_threatintelligence_listvulnerabilities` | Error: Source resource was not found (404) |
| `security_threatintelligence_security_threatintelligence_listwhoishistoryrecords` | Error: Source resource was not found (404) |
| `solutions_virtualeventsroot_solutions_getvirtualevents` | Error: Source resource was not found (404) |
| `solutions_virtualeventsroot_solutions_virtualevents_listevents` | Error: Source resource was not found (404) |
| `teams_team_functions_teams_getallmessages` | Error: Source resource was not found (404) |

## 3. Wrong base URL path in manifest (19 tables) — ✅ Coral can fix

**Fix:** Fix base URL path in manifest

| Table | Error |
|-------|-------|
| `agreementacceptances_agreementacceptance_agreementacceptances_agreementacceptance_listagreementacceptance` | Error: Source resource was not found (404) |
| `authenticationmethodconfigurations_authenticationmethodconfiguration_authenticationmethodconfigurations_authenticationmethodconfiguration_listauthenticationmethodconfiguration` | Error: Source rejected the request (400) |
| `authenticationmethodspolicy_authenticationmethodconfiguration_authenticationmethodspolicy_listauthenticationmethodconfigurations` | Resource not found for segment 'authenticationMethodsPolicy/authenticationMethodConfigurations'. |
| `filteroperators_filteroperatorschema_filteroperators_filteroperatorschema_listfilteroperatorschema` | Error: Source resource was not found (404) |
| `functions_attributemappingfunctionschema_functions_attributemappingfunctionschema_listattributemappingfunctionschema` | Error: Source resource was not found (404) |
| `identity_authenticationeventsflow_identity_listauthenticationeventsflows_asexternalusersselfservicesignupeventsflow` | Error: Source resource was not found (404) |
| `identity_conditionalaccessroot_identity_conditionalaccess_getauthenticationstrength` | Error: Source rejected the request (400) |
| `identity_conditionalaccessroot_identity_conditionalaccess_getdeleteditems` | Error: Source resource was not found (404) |
| `identity_identitycontainer_identity_identitycontainer_getidentitycontainer` | Error: Source resource was not found (404) |
| `identity_riskpreventioncontainer_identity_getriskprevention` | Error: Source resource was not found (404) |
| `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listaccesspackagesuggestions` | Error: Source resource was not found (404) |
| `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listavailableaccesspackages` | Error: Source resource was not found (404) |
| `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listcontrolconfigurations` | Error: Source resource was not found (404) |
| `identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listresourcerolescopes` | Error: Source resource was not found (404) |
| `identitygovernance_termsofusecontainer_identitygovernance_gettermsofuse` | Error: Source resource was not found (404) |
| `identitygovernance_termsofusecontainer_identitygovernance_termsofuse_listagreementacceptances` | Error: Source resource was not found (404) |
| `me_authentication_me_authentication_listoperations` | Error: Source rejected the request (400) |
| `me_cloudclipboardroot_me_getcloudclipboard` | Error: Source resource was not found (404) |
| `policies_authenticationmethodspolicy_policies_authenticationmethodspolicy_listauthenticationmethodconfigurations` | Resource not found for segment 'authenticationMethodsPolicy/authenticationMethodConfigurations'. |

## 4. Deprecated/removed endpoints (15 tables) — ✅ Coral can fix

**Fix:** Remove from spec (endpoint removed from Graph API)

| Table | Error |
|-------|-------|
| `appcatalogs_appcatalogs_appcatalogs_appcatalogs_getappcatalogs` | Requested API is not supported. Please check the path. |
| `chats_chat_functions_chats_getallmessages` | Requested API is not supported. Please check the path. |
| `chats_chat_functions_chats_getallretainedmessages` | Requested API is not supported. Please check the path. |
| `communications_adhoccall_communications_adhoccalls_getallrecordings` | Requested API is not supported. Please check the path. |
| `communications_adhoccall_communications_adhoccalls_getalltranscripts` | Requested API is not supported. Please check the path. |
| `communications_adhoccall_communications_listadhoccalls` | Requested API is not supported. Please check the path. |
| `communications_onlinemeeting_communications_onlinemeetings_getallrecordings` | Requested API is not supported. Please check the path. |
| `communications_onlinemeeting_communications_onlinemeetings_getalltranscripts` | Requested API is not supported. Please check the path. |
| `copilot_aiinteractionhistory_copilot_getinteractionhistory` | Requested API is not supported. Please check the path. |
| `copilot_aiinteractionhistory_copilot_interactionhistory_getallenterpriseinteractions` | Requested API is not supported. Please check the path. |
| `copilot_aiuser_copilot_listusers` | Requested API is not supported. Please check the path. |
| `me_adhoccall_me_listadhoccalls` | Requested API is not supported. Please check the path. |
| `me_team_me_joinedteams_getallmessages` | Requested API is not supported. Please check the path. |
| `teamstemplates_teamstemplate_teamstemplates_teamstemplate_listteamstemplate` | Requested API is not supported. Please check the path. |
| `teamwork_deletedteam_teamwork_deletedteams_getallmessages` | Requested API is not supported. Please check the path. |

## 5. Missing entity-ID parameter (3 tables) — ✅ Coral can fix

**Fix:** Add table function with entity-ID parameter, or remove

| Table | Error |
|-------|-------|
| `certificatebasedauthconfiguration_certificatebasedauthconfiguration_certificatebasedauthconfiguration_certificatebasedauthconfiguration_listcertificatebasedauthconfiguration` | Direct queries to this resource type are not supported. |
| `permissiongrants_resourcespecificpermissiongrant_permissiongrants_resourcespecificpermissiongrant_listresourcespecificpermissiongrant` | Direct queries to this resource type are not supported. |
| `scopedrolememberships_scopedrolemembership_scopedrolememberships_scopedrolemembership_listscopedrolemembership` | Direct queries to this resource type are not supported. |

## 6. Unsupported query type ($search/$delta) (3 tables) — ✅ Coral can fix

**Fix:** Remove unsupported $search/$delta query hint from manifest

| Table | Error |
|-------|-------|
| `directory_directoryobject_directory_listdeleteditems` | Searches against this resource are not supported. Only specific instances can be queried. |
| `directoryobjects_directoryobject_directoryobjects_directoryobject_listdirectoryobject` | Searches against this resource are not supported. Only specific instances can be queried. |
| `directoryobjects_directoryobject_functions_directoryobjects_delta` | Delta query is not supported for directoryObjects without a valid resource type or id filter. |

## 7. Delta functions on entities that do not support delta (7 tables) — ✅ Coral can fix

**Fix:** Remove delta table function (entity does not support delta)

| Table | Error |
|-------|-------|
| `contracts_contract_functions_contracts_delta` | Differential query is not supported for entity type: Contract |
| `directoryroletemplates_directoryroletemplate_functions_directoryroletemplates_delta` | Differential query is not supported for entity type: DirectoryRoleTemplate |
| `education_educationuser_education_me_assignments_delta` | Unsupported request: Change tracking is not supported against 'microsoft.graph.educationAssignment'. |
| `groupsettingtemplates_groupsettingtemplate_functions_groupsettingtemplates_delta` | Differential query is not supported for entity type: SettingTemplate |
| `me_message_me_messages_delta` | Unsupported request: Change tracking is not supported against 'microsoft.graph.message'. |
| `organization_organization_functions_organization_delta` | Differential query is not supported for entity type: Organization |
| `permissiongrants_resourcespecificpermissiongrant_functions_permissiongrants_delta` | Differential query is not supported for entity type: ResourceSpecificPermissionGrant |

## 8. Invalid root URL path in manifest (4 tables) — ✅ Coral can fix

**Fix:** Fix root path in manifest (maps to wrong URL)

| Table | Error |
|-------|-------|
| `directory_directory_directory_directory_getdirectory` | Error: Source rejected the request (400) |
| `policies_policyroot_policies_policyroot_getpolicyroot` | Error: Source rejected the request (400) |
| `rolemanagement_rbacapplication_rolemanagement_getdirectory` | Error: Source rejected the request (400) |
| `rolemanagement_rolemanagement_rolemanagement_rolemanagement_getrolemanagement` | Error: Source rejected the request (400) |

## 9. Cannot query standalone — requires parent entity (1 tables) — ✅ Coral can fix

**Fix:** Remove standalone table (requires parent entity navigation)

| Table | Error |
|-------|-------|
| `domaindnsrecords_domaindnsrecord_domaindnsrecords_domaindnsrecord_listdomaindnsrecord` | This resource can only be queried through a navigation property on its parent domain. |

## 10. Missing required @startDateTime parameter (4 tables) — ✅ Coral can fix

**Fix:** Add @startDateTime required parameter to table definition

| Table | Error |
|-------|-------|
| `me_adhoccall_me_adhoccalls_getallrecordings` | Missing the parameter alias '@startDateTime' in the request query string. |
| `me_adhoccall_me_adhoccalls_getalltranscripts` | Missing the parameter alias '@startDateTime' in the request query string. |
| `me_onlinemeeting_me_onlinemeetings_getallrecordings` | Missing the parameter alias '@startDateTime' in the request query string. |
| `me_onlinemeeting_me_onlinemeetings_getalltranscripts` | Missing the parameter alias '@startDateTime' in the request query string. |

## 11. Wrong HTTP method in manifest (1 tables) — ✅ Coral can fix

**Fix:** Fix HTTP method in manifest (GET vs POST mismatch)

| Table | Error |
|-------|-------|
| `me_authentication_me_authentication_fido2methods_creationoptions` | The method is not supported for this URL. |

## 12. Graph API routing (MissingProvider) — not fixable in spec (10 tables) — ❌ Not fixable in spec

**Fix:** Not a spec bug — Graph API routing issue (MissingProvider)

| Table | Error |
|-------|-------|
| `identitygovernance_privilegedaccessroot_identitygovernance_getprivilegedaccess` | Error: Source rejected the request (400) |
| `identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_getgroup` | Error: Source rejected the request (400) |
| `policies_unifiedrolemanagementpolicy_policies_listrolemanagementpolicies` | Error: Source rejected the request (400) |
| `policies_unifiedrolemanagementpolicyassignment_policies_listrolemanagementpolicyassignments` | Error: Source rejected the request (400) |
| `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleassignmentscheduleinstances` | Error: Source rejected the request (400) |
| `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleassignmentschedulerequests` | Error: Source rejected the request (400) |
| `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleassignmentschedules` | Error: Source rejected the request (400) |
| `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleeligibilityscheduleinstances` | Error: Source rejected the request (400) |
| `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleeligibilityschedulerequests` | Error: Source rejected the request (400) |
| `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleeligibilityschedules` | Error: Source rejected the request (400) |

## 13. Graph API server error (500) — not fixable in spec (14 tables) — ❌ Not fixable in spec

**Fix:** Not a spec bug — Graph API server error or missing license

| Table | Error |
|-------|-------|
| `education_reportsroot_education_getreports` | Target 'fake_node' is not found. |
| `education_reportsroot_education_reports_listreadingassignmentsubmissions` | Error: Source server error (500) |
| `education_reportsroot_education_reports_listreadingcoachpassages` | Error: Source server error (500) |
| `education_reportsroot_education_reports_listreflectcheckinresponses` | Error: Source server error (500) |
| `education_reportsroot_education_reports_listspeakerassignmentsubmissions` | Error: Source server error (500) |
| `me_employeeexperienceuser_me_employeeexperience_listassignedroles` | Error: Source server error (500) |
| `me_iteminsights_me_insights_listtrending` | Error: Source server error (500) |
| `me_usersettings_me_settings_workhoursandlocations_listrecurrences` | Error: Source server error (500) |
| `privacy_subjectrightsrequest_privacy_listsubjectrightsrequests` | Target 'privacy.trafficmanager.net' is not found. |
| `rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listresourcenamespaces` | <!DOCTYPE html>\r\n<html>\r\n    <head>\r\n        <title>Runtime Error</title>\r\n        <meta name=\ |
| `rolemanagement_rbacapplication_rolemanagement_getentitlementmanagement` | Error: Source server error (500) |
| `security_subjectrightsrequest_security_listsubjectrightsrequests` | Target 'privacy.trafficmanager.net' is not found. |
| `storage_storagesettings_storage_settings_getquota` | Invalid URI: The hostname could not be parsed. |
| `storage_storagesettings_storage_settings_quota_listservices` | Invalid URI: The hostname could not be parsed. |

## 14. Entra ID P1/P2 license required — reclassify as license (4 tables) — ❌ Not fixable in spec

**Fix:** Not a spec bug — reclassify as license (Entra ID P1/P2 needed)

| Table | Error |
|-------|-------|
| `rolemanagement_rbacapplication_rolemanagement_directory_listroleassignmentscheduleinstances` | The tenant needs to have Microsoft Entra ID P2 or Microsoft Entra ID Governance license. |
| `rolemanagement_rbacapplication_rolemanagement_directory_listroleassignmentschedules` | The tenant needs to have Microsoft Entra ID P2 or Microsoft Entra ID Governance license. |
| `rolemanagement_rbacapplication_rolemanagement_directory_listroleeligibilityscheduleinstances` | The tenant needs to have Microsoft Entra ID P2 or Microsoft Entra ID Governance license. |
| `rolemanagement_rbacapplication_rolemanagement_directory_listroleeligibilityschedules` | The tenant needs to have Microsoft Entra ID P2 or Microsoft Entra ID Governance license. |

## 15. Graph API transient outage (503) — not fixable in spec (3 tables) — ❌ Not fixable in spec

**Fix:** Not a spec bug — Graph API transient outage during test

| Table | Error |
|-------|-------|
| `admin_configurationmanagement_admin_configurationmanagement_listconfigurationsnapshots` | Error: Source server error (503) |
| `connections_externalconnection_connections_externalconnection_listexternalconnection` | <!DOCTYPE HTML PUBLIC \ |
| `external_external_external_external_getexternal` | <!DOCTYPE HTML PUBLIC \ |

## 16. Malformed response (decode failed) — transient (1 tables) — ❌ Not fixable in spec

**Fix:** Not a spec bug — Graph returned empty/malformed JSON (transient)

| Table | Error |
|-------|-------|
| `security_attacksimulationroot_security_attacksimulation_listsimulations` | Error: Source response decode failed |

## 17. Unsupported dynamic path segment — not fixable in spec (2 tables) — ❌ Not fixable in spec

**Fix:** Not a spec bug — manifest uses unsupported dynamic path segment

| Table | Error |
|-------|-------|
| `me_usersolutionroot_me_getsolutions` | Unexpected segment DynamicPathSegment. Expected property/$value. |
| `me_usersolutionroot_me_solutions_getworkingtimeschedule` | Unexpected segment DynamicPathSegment. Expected property/$value. |

## 18. Resource segment not found — not fixable in spec (2 tables) — ❌ Not fixable in spec

**Fix:** Not a spec bug — resource segment not found on this entity

| Table | Error |
|-------|-------|
| `invitations_user_invitations_inviteduser_getmailboxsettings` | Resource not found for the segment 'mailboxSettings'. |
| `invitations_user_invitations_inviteduser_listserviceprovisioningerrors` | Resource not found for the segment 'serviceProvisioningErrors'. |

## 19. Other Graph API errors — not fixable in spec (4 tables) — ❌ Not fixable in spec

**Fix:** Not a spec bug — Graph API error outside spec control

| Table | Error |
|-------|-------|
| `identitygovernance_accessreviewset_identitygovernance_getaccessreviews` | Error: Source rejected the request (400) |
| `me_authentication_me_getauthentication` | Unsupported segment type. |
| `me_usersettings_me_settings_getworkhoursandlocations` | Error: Source rejected the request (400) |
| `me_usersettings_me_settings_workhoursandlocations_listoccurrences` | Error: Source request failed (405) |

---

## Recommendations (ordered by impact)

### Tier 1 — biggest lever (131 tables)

**Remove 131 consumer/MSA-only tables from the spec.** These are Intune, Exchange Admin, Edge Admin, SharePoint Admin, and Teams Admin endpoints that require a consumer (personal Microsoft) account, not an AAD business/education tenant. They will never pass on any AAD tenant.

### Tier 2 — clean up dead endpoints (73 tables)

- **58 not_found** — remove or correct URL (endpoint does not exist in Graph v1.0)
- **15 deprecated** — remove (endpoint removed from Graph API)

### Tier 3 — fix wrong URLs (23 tables)

- **19 wrong_url** — fix base URL path in manifest
- **4 invalid_request_url** — fix root path

### Tier 4 — add missing parameters/functions (7 tables)

- **3 needs_entityId** — add table function with entity-ID parameter
- **3 unsupported_query** — remove unsupported search/delta hint
- **1 needs_navigation_parent** — add parent entity reference or remove

### Tier 5 — fix manifest technical details (14 tables)

- **7 delta_unsupported** — remove delta table functions
- **4 missing_required_param** — add @startDateTime to table definition
- **3 method_not_allowed** — fix HTTP method in manifest

### Tier 6 — reclassify misclassified errors (12 tables)

- **8 missing_provider** → reclassify as `other` (Graph routing bug)
- **4 aad_premium_required** → reclassify as `license`
- **4 500_permission_error** → reclassify as `auth`

### After all spec fixes: expected impact

If all 248 spec-fixable tables are removed/fixed, the pass count rises from **109** (current) to roughly **357 ≈ 357** — assuming the fix does not introduce new failures. The remaining ~376 failures are auth (282), license (56+4), and Graph server errors (14+3+1+1) — fixable by granting scopes, adding licenses, or waiting for Graph API fixes.

---
*Generated 2026-08-04 13:30 UTC from `/tmp/coral_sql_results_2026-08-04.json`*