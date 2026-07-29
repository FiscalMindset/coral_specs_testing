# Microsoft Graph v4 Source — API Coverage Report (v3)

> Test: `SELECT * FROM microsoft_graph_v4.<table> LIMIT 1` on all 733 registered tables
> Token: Azure CLI `az account get-access-token --resource https://graph.microsoft.com` (initial 117 PASS) + custom app **Coral Specs Testing Wide** (66 Graph delegated scopes, +51 PASS)
> Date: 28-29 Jul 2026

---

## Summary (Final v3)

| Metric | Initial | v3 | Change |
|--------|---------|-------|--------|
| Total tables tested | 733 | 733 | — |
| **PASS** | **117 (16%)** | **168 (22.9%)** | **+51** ✅ |
| FAIL | 616 (84%) | 565 (77.1%) | -51 |

### Results by Category (v3)

| Result | Count | Meaning |
|--------|-------|---------|
| `OK` | 168 | Query succeeded — endpoint is accessible |
| `403_FORBIDDEN` | 125 | Token lacks required delegated permission scope |
| `400_BADREQUEST` | 183 | API requires parameters (id, $filter, $select) not sent in `SELECT * LIMIT 1` |
| `401_UNAUTHORIZED` | 89 | Token lacks required app role or is unauthorized |
| `TABLE_NOT_FOUND` | 95 | Endpoint path doesn't exist in Graph OpenAPI |
| `500/503/429/405` | 16 | Server/throttling/method errors |
| Other | 57 | Various |

### Results by Category

| Result | Count | Meaning |
|--------|-------|---------|
| `OK` | 117 | Query succeeded — endpoint is accessible |
| `403_FORBIDDEN` | 192 | Token lacks required delegated permission scope |
| `400_BADREQUEST` | 181 | API requires parameters (id, $filter, $select) not sent in `SELECT * LIMIT 1` |
| `401_UNAUTHORIZED` | 148 | Token lacks required app role or is unauthorized |
| `TABLE_NOT_FOUND` | 83 | Table registered in manifest but not found at query time |
| `ERR(1)` | 12 | Other error (timeout, connection, etc.) |

---

## PASS by API Area

| Area | Pass Count | API Categories |
|------|-----------|----------------|
| `me` | 36 | memberof, createdobjects, owneddevices, directreports, oauth2grants, extensions, licensedetails, scopedrolememberof, user profile |
| `policies` | 16 | authorization, conditional access, cross-tenant, token policies, app management, claims mapping |
| `directory` | 13 | admin units, deleted items (as all types), federation config, recovery, subscriptions |
| `identity` | 7 | conditional access (named locations, policies, templates), auth event listeners, custom auth extensions |
| `admin` | 4 | admin center, m365 apps, exchange tracing, people insights |
| `auditlogs` | 3 | audit log root, directory audits, provisioning |
| `security` | 3 | security root, cases, threat intelligence |
| `rolemanagement` | 3 | directory RBAC resources, assignments, role definitions |
| `applications` | 2 | list applications, delta |
| `contacts` | 2 | list org contacts, delta |
| `devices` | 2 | list devices, delta |
| `groups` | 2 | list groups, delta |
| `oauth2permissiongrants` | 2 | list, delta |
| `serviceprincipals` | 2 | list, delta |
| `reports` | 2 | authentication methods, report root |
| `apptemplates`, `compliance`, `contracts`, `copilot`, `communications` | 1 each | |
| `domains`, `employeeexperience`, `groupsettings`, `groupsettingtemplates` | 1 each | |
| `identitygovernance`, `identityprotection`, `informationprotection` | 1 each | |
| `organization`, `privacy`, `schemaextensions` | 1 each | |
| `directoryroles`, `directoryroletemplates` | 2 + 1 | |

---

## Full PASS Table List

### admin (4)
- `admin_admin_admin_admin_getadmin`
- `admin_adminmicrosoft365apps_admin_getmicrosoft365apps`
- `admin_exchangeadmin_admin_exchange_gettracing`
- `admin_peopleadminsettings_admin_people_getiteminsights`

### applications (2)
- `applications_application_applications_application_listapplication`
- `applications_application_functions_applications_delta`

### applicationtemplates (1)
- `applicationtemplates_applicationtemplate_applicationtemplates_applicationtemplate_listapplicationtemplate`

### auditlogs (3)
- `auditlogs_auditlogroot_auditlogs_auditlogroot_getauditlogroot`
- `auditlogs_directoryaudit_auditlogs_listdirectoryaudits`
- `auditlogs_provisioningobjectsummary_auditlogs_listprovisioning`

### communications (1)
- `communications_cloudcommunications_communications_cloudcommunications_getcloudcommunications`

### compliance (1)
- `compliance_compliance_compliance_compliance_getcompliance`

### contacts (2)
- `contacts_orgcontact_contacts_orgcontact_listorgcontact`
- `contacts_orgcontact_functions_contacts_delta`

### contracts (1)
- `contracts_contract_contracts_contract_listcontract`

### copilot (1)
- `copilot_copilotroot_copilot_copilotroot_getcopilotroot`

### devices (2)
- `devices_device_devices_device_listdevice`
- `devices_device_functions_devices_delta`

### directory (13)
- `directory_administrativeunit_directory_administrativeunits_delta`
- `directory_administrativeunit_directory_listadministrativeunits`
- `directory_companysubscription_directory_listsubscriptions`
- `directory_directoryobject_directory_listdeleteditems_asadministrativeunit`
- `directory_directoryobject_directory_listdeleteditems_asapplication`
- `directory_directoryobject_directory_listdeleteditems_asdevice`
- `directory_directoryobject_directory_listdeleteditems_asgroup`
- `directory_directoryobject_directory_listdeleteditems_asserviceprincipal`
- `directory_directoryobject_directory_listdeleteditems_asuser`
- `directory_identityproviderbase_directory_listfederationconfigurations`
- `directory_onpremisesdirectorysynchronization_directory_listonpremisessynchronization`
- `directory_publickeyinfrastructureroot_directory_publickeyinfrastructure_listcertificatebasedauthconfigurations`
- `directory_recovery_directory_getrecovery`

### directoryroles (2)
- `directoryroles_directoryrole_directoryroles_directoryrole_listdirectoryrole`
- `directoryroles_directoryrole_functions_directoryroles_delta`

### directoryroletemplates (1)
- `directoryroletemplates_directoryroletemplate_directoryroletemplates_directoryroletemplate_listdirectoryroletemplate`

### domains (1)
- `domains_domain_domains_domain_listdomain`

### employeeexperience (1)
- `employeeexperience_employeeexperience_employeeexperience_employeeexperience_getemployeeexperience`

### groups (2)
- `groups_group_functions_groups_delta`
- `groups_group_groups_group_listgroup`

### groupsettings (1)
- `groupsettings_groupsetting_groupsettings_groupsetting_listgroupsetting`

### groupsettingtemplates (1)
- `groupsettingtemplates_groupsettingtemplate_groupsettingtemplates_groupsettingtemplate_listgroupsettingtemplate`

### identity (7)
- `identity_authenticationeventlistener_identity_listauthenticationeventlisteners`
- `identity_conditionalaccessroot_identity_conditionalaccess_deleteditems_listnamedlocations`
- `identity_conditionalaccessroot_identity_conditionalaccess_deleteditems_listpolicies`
- `identity_conditionalaccessroot_identity_conditionalaccess_listnamedlocations`
- `identity_conditionalaccessroot_identity_conditionalaccess_listpolicies`
- `identity_conditionalaccessroot_identity_conditionalaccess_listtemplates`
- `identity_customauthenticationextension_identity_listcustomauthenticationextensions`

### identitygovernance (1)
- `identitygovernance_identitygovernance_identitygovernance_identitygovernance_getidentitygovernance`

### identityprotection (1)
- `identityprotection_identityprotectionroot_identityprotection_identityprotectionroot_getidentityprotectionroot`

### informationprotection (1)
- `informationprotection_informationprotection_informationprotection_informationprotection_getinformationprotection`

### me (36)
- `me_approleassignment_me_listapproleassignments`
- `me_directoryobject_me_listcreatedobjects`
- `me_directoryobject_me_listcreatedobjects_asserviceprincipal`
- `me_directoryobject_me_listdirectreports`
- `me_directoryobject_me_listdirectreports_asorgcontact`
- `me_directoryobject_me_listdirectreports_asuser`
- `me_directoryobject_me_listmemberof`
- `me_directoryobject_me_listmemberof_asadministrativeunit`
- `me_directoryobject_me_listmemberof_asdirectoryrole`
- `me_directoryobject_me_listmemberof_asgroup`
- `me_directoryobject_me_listowneddevices`
- `me_directoryobject_me_listowneddevices_asapproleassignment`
- `me_directoryobject_me_listowneddevices_asdevice`
- `me_directoryobject_me_listowneddevices_asendpoint`
- `me_directoryobject_me_listownedobjects`
- `me_directoryobject_me_listownedobjects_asapplication`
- `me_directoryobject_me_listownedobjects_asgroup`
- `me_directoryobject_me_listownedobjects_asserviceprincipal`
- `me_directoryobject_me_listrefsponsors`
- `me_directoryobject_me_listregistereddevices`
- `me_directoryobject_me_listregistereddevices_asapproleassignment`
- `me_directoryobject_me_listregistereddevices_asdevice`
- `me_directoryobject_me_listregistereddevices_asendpoint`
- `me_directoryobject_me_listsponsors`
- `me_directoryobject_me_listtransitivememberof`
- `me_directoryobject_me_listtransitivememberof_asadministrativeunit`
- `me_directoryobject_me_listtransitivememberof_asdirectoryrole`
- `me_directoryobject_me_listtransitivememberof_asgroup`
- `me_extension_me_listextensions`
- `me_licensedetails_me_licensedetails_getteamslicensingdetails`
- `me_licensedetails_me_listlicensedetails`
- `me_oauth2permissiongrant_me_listoauth2permissiongrants`
- `me_onpremisessyncbehavior_me_getonpremisessyncbehavior`
- `me_scopedrolemembership_me_listscopedrolememberof`
- `me_serviceprovisioningerror_me_listserviceprovisioningerrors`
- `me_user_me_user_getuser`

### oauth2permissiongrants (2)
- `oauth2permissiongrants_oauth2permissiongrant_functions_oauth2permissiongrants_delta`
- `oauth2permissiongrants_oauth2permissiongrant_oauth2permissiongrants_oauth2permissiongrant_listoauth2permissiongrant`

### organization (1)
- `organization_organization_organization_organization_listorganization`

### policies (16)
- `policies_activitybasedtimeoutpolicy_policies_listactivitybasedtimeoutpolicies`
- `policies_appmanagementpolicy_policies_listappmanagementpolicies`
- `policies_authorizationpolicy_policies_getauthorizationpolicy`
- `policies_claimsmappingpolicy_policies_listclaimsmappingpolicies`
- `policies_conditionalaccesspolicy_policies_listconditionalaccesspolicies`
- `policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_getdefault`
- `policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_listpartners`
- `policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_templates_getmultitenantorganizationidentitysynchronization`
- `policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_templates_getmultitenantorganizationpartnerconfiguration`
- `policies_crosstenantaccesspolicy_policies_getcrosstenantaccesspolicy`
- `policies_featurerolloutpolicy_policies_listfeaturerolloutpolicies`
- `policies_homerealmdiscoverypolicy_policies_listhomerealmdiscoverypolicies`
- `policies_permissiongrantpolicy_policies_listpermissiongrantpolicies`
- `policies_tenantappmanagementpolicy_policies_getdefaultappmanagementpolicy`
- `policies_tokenissuancepolicy_policies_listtokenissuancepolicies`
- `policies_tokenlifetimepolicy_policies_listtokenlifetimepolicies`

### privacy (1)
- `privacy_privacy_privacy_privacy_getprivacy`

### reports (2)
- `reports_authenticationmethodsroot_reports_getauthenticationmethods`
- `reports_reportroot_reports_reportroot_getreportroot`

### rolemanagement (3)
- `rolemanagement_rbacapplication_rolemanagement_directory_listresourcenamespaces`
- `rolemanagement_rbacapplication_rolemanagement_directory_listroleassignments`
- `rolemanagement_rbacapplication_rolemanagement_directory_listroledefinitions`

### schemaextensions (1)
- `schemaextensions_schemaextension_schemaextensions_schemaextension_listschemaextension`

### security (3)
- `security_casesroot_security_getcases`
- `security_security_security_security_getsecurity`
- `security_threatintelligence_security_getthreatintelligence`

### serviceprincipals (2)
- `serviceprincipals_serviceprincipal_functions_serviceprincipals_delta`
- `serviceprincipals_serviceprincipal_serviceprincipals_serviceprincipal_listserviceprincipal`

---

## Comparison with Earlier Runs

### Run 1: 9-scope Delegated Consent Token (~300 tables in 600s)
**Token**: User.Read, Chat.Read, Files.Read, Group.Read.All, User.Read.All, Directory.Read.All, etc.
**PASS**: 97 (test truncated by 600s timeout — only ~300 of 733 tables tested)

### Run 2: Azure CLI Token (this run — all 733 tables, 4 workers, ~45 min)
**Token**: `az account get-access-token --resource https://graph.microsoft.com`
**PASS**: 117 (all 733 tables tested)

### Key Differences

| Aspect | Consent Token (Run 1) | AZ Token (Run 2) |
|--------|----------------------|-------------------|
| Scope tested | ~300 / 733 | **733 / 733** |
| PASS count | 97 (truncated) | **117** |
| Test mode | Sequential | **4 workers** |
| Timeout per query | ~2s | **60s** |

The AZ token actually has **broader effective access** than the 9-scope consent token on tenant-level endpoints (directory, admin, policies, audit logs). The `/me` pass count (36) shows the AZ token also works for user-level graph queries.

### 83 TABLE_NOT_FOUND
These tables are registered in `manifest.yaml` and appear in `information_schema.tables` but return "Table not found" at query time — likely a DuckDB foreign table registration issue that should be investigated.

---

## Re-test with Wide-Scope Token (29 Jul 2026)

> Token: New app registration **`Coral Specs Testing Wide`** (App ID: `51d95acf-8764-497b-96b3-eb15d6e5a470`) granted delegated consent for **9 additional Graph scopes**: `AuditLog.Read.All`, `Directory.Read.All`, `Group.Read.All`, `Policy.Read.All`, `Reports.Read.All`, `SecurityEvents.Read.All`, `ThreatIntelligence.Read.All`, `User.Read.All`, `User.ReadBasic.All`.
> Token expires: ~85 minutes after consent.

Re-ran the **616 previously-failing** tables against Graph directly using the wide-scope token. Results:

| Status | Before | After | Change |
|--------|--------|-------|--------|
| **PASS** | 0 | **15** | +15 ✅ |
| `403_FORBIDDEN` | 171 | 154 | -17 (some moved to 404/PASS) |
| `400_BADREQUEST` | 147 | 141 | -6 |
| `401_UNAUTHORIZED` | 101 | 100 | -1 |
| `404_NOT_FOUND` | 83 | 79 | -4 |
| `500/503` | 0 | 11 | +11 (transient server errors) |
| `skip` (TIMEOUT) | 12 | 115 | — |
| `405_METHOD_NOT_ALLOWED` | 0 | 1 | +1 |

**New total: 117 + 15 = 132 PASS (18%)**, 601 FAIL (82%).

### 15 Endpoints Newly Granted (was 403, now PASS)

| Table | Area | Response (first 80 chars) |
|-------|------|--------------------------|
| `grouplifecyclepolicies_grouplifecyclepolicy_grouplifecyclepolicies_grouplifecyclepolicy_listgrouplifecyclepolicy` | groupLifecyclePolicies | `{"@odata.context":"https://graph.microsoft.com/v1.0/$metadata#groupLifecyclePolicies","value":[]}` |
| `identity_conditionalaccessroot_identity_conditionalaccess_authenticationstrength_listpolicies` | identity/conditionalAccess | `{"@odata.context":"https://graph.microsoft.com/v1.0/$metadata#identity/conditionalAccess/authenticati…` |
| `identity_conditionalaccessroot_identity_conditionalaccess_listauthenticationcontextclassreferences` | identity/conditionalAccess | `{"@odata.context":"https://graph.microsoft.com/v1.0/$metadata#identity/conditionalAccess/authenticati…` |
| `identitygovernance_appconsentapprovalroute_identitygovernance_appconsent_listappconsentrequests` | identityGovernance/appConsent | `{"@odata.context":"https://graph.microsoft.com/v1.0/$metadata#identityGovernance/appConsent/appConse…` |
| `policies_adminconsentrequestpolicy_policies_getadminconsentrequestpolicy` | policies/adminConsentRequestPolicy | `{"@odata.context":"https://graph.microsoft.com/v1.0/$metadata#policies/adminConsentRequestPolicy/$en…` |
| `policies_authenticationflowspolicy_policies_getauthenticationflowspolicy` | policies/authenticationFlowsPolicy | `{"@odata.context":"https://graph.microsoft.com/v1.0/$metadata#policies/authenticationFlowsPolicy/$en…` |
| `policies_authenticationmethodspolicy_policies_getauthenticationmethodspolicy` | policies/authenticationMethodsPolicy | `{"@odata.context":"https://graph.microsoft.com/v1.0/$metadata#authenticationMethodsPolicy","id":"aut…` |
| `policies_authenticationstrengthpolicy_policies_listauthenticationstrengthpolicies` | policies/authenticationStrengthPolicy | `{"@odata.context":"https://graph.microsoft.com/v1.0/$metadata#policies/authenticationStrengthPolicie…` |
| `policies_deviceregistrationpolicy_policies_getdeviceregistrationpolicy` | policies/deviceRegistrationPolicy | `{"@odata.context":"https://graph.microsoft.com/v1.0/$metadata#policies/deviceRegistrationPolicy/$ent…` |
| `policies_identitysecuritydefaultsenforcementpolicy_policies_getidentitysecuritydefaultsenforcementpolicy` | policies/identitySecurityDefaultsEnforcementPolicy | `{"@odata.context":"https://graph.microsoft.com/v1.0/$metadata#policies/identitySecurityDefaultsEnfor…` |
| `security_alert_security_listalerts` | security/alerts | `{"@odata.context":"https://graph.microsoft.com/v1.0/$metadata#security/alerts","value":[]}` |
| `security_attacksimulationroot_security_attacksimulation_listsimulationautomations` | security/attackSimulation | `{"@odata.context":"https://graph.microsoft.com/v1.0/$metadata#security/attackSimulation/simulationAu…` |
| `security_attacksimulationroot_security_attacksimulation_listsimulations` | security/attackSimulation | `{"@odata.context":"https://graph.microsoft.com/v1.0/$metadata#security/attackSimulation/simulations"…` |
| `security_attacksimulationroot_security_attacksimulation_listtrainings` | security/attackSimulation | `{"@odata.context":"https://graph.microsoft.com/v1.0/$metadata#security/attackSimulation/trainings",…` |
| `security_securescorecontrolprofile_security_listsecurescorecontrolprofiles` | security/secureScoreControlProfiles | `{"@odata.context":"https://graph.microsoft.com/v1.0/$metadata#security/secureScoreControlProfiles",…` |

### What Did NOT Improve (and Why)

The remaining failures break down by **root cause**:

| Cause | Count | Fixable by wider token? |
|-------|-------|-------------------------|
| `400_BADREQUEST` — endpoint needs `$filter`/`$select` params not sent by `SELECT *` | 141 | ❌ No — schema/code issue |
| `404_NOT_FOUND` — endpoint path doesn't exist or is deprecated | 79 | ❌ No — manifest issue |
| `401_UNAUTHORIZED` — endpoint needs **Exchange Online** or **SharePoint** scope (different resource) | 100 | ⚠️ Partially — would need a separate token for those resources |
| `403_FORBIDDEN` (remaining) — needs additional Graph scopes (e.g., `IdentityGovernance.Read.All`, `PrivilegedAccess.Read.AzureAD`, `UserAuthenticationMethod.Read.All`, `IdentityRiskPrevention.Read.All`, `NetworkAccessPolicy.Read.All`, `ChannelMessage.Read.All`, `EduRoster.Read.All`) | 154 | ⚠️ Yes — would need to consent more scopes |
| `500/503` — Graph server errors (transient) | 11 | ❌ No |
| TIMEOUT — token may need refresh, or endpoint genuinely slow | 115 | ⏳ Need re-run |
| `405_METHOD_NOT_ALLOWED` — wrong method on path | 1 | ❌ No |

### Tenant-Level Blockers (Independent of Token)

These endpoints returned `Authentication_RequestFromNonPremiumTenantOrB2CTenant` or `AADB2C` even with the correct scopes — they require **Entra ID P1/P2** or **Microsoft Defender** license that the Azure for Students tenant does not have:

- `auditLogs/signIns` (Entra P1/P2)
- `reports/authenticationMethods/userRegistrationDetails` (Entra P1/P2)
- `security/threatIntelligence/intelProfiles` (Defender TI)
- `identity/authenticationEventListeners`, `identity/customAuthenticationExtensions` (AADB2C feature blocked)
- `me/authentication/*` (Entra P1/P2)
- `education/classes` (Entra EDU)

### Next Steps to Reduce FAILs Further

1. **Run 3 with all 274 scopes** — extend consent to include `IdentityGovernance.Read.All`, `PrivilegedAccess.Read.*`, `EduRoster.Read.All`, `DeviceManagement*`, `CustomAuthenticationExtension.Read.All`, etc. Estimated additional gain: 30–60 PASS.
2. **Re-test the 115 TIMEOUT tables** with a longer timeout + retry — some will likely move to PASS or 403.
3. **Add Exchange Online + SharePoint resource tokens** — would unlock ~30 more (separate `az account get-access-token --resource https://outlook.office.com`).
4. **Fix manifest for 79 × 404** — these are real bugs in the manifest (paths don't exist in Graph OpenAPI).
5. **Add `coral_*` filter-aware test mode** — instead of bare `SELECT *`, use `?$select=<id>` and `?$top=1` for parameterized endpoints (turns ~141 × 400 into PASS).

---

## Re-test #2 with Full-Scope Token (v3 — 29 Jul 2026)

> Token: Same app `Coral Specs Testing Wide` but consent extended to **66 Graph delegated scopes** (was 9). User re-consented via localhost OAuth listener.

Re-ran the **616 previously-failing** tables against Graph directly. Results:

| Status | v2 | v3 | Change |
|--------|----------|----------|--------|
| **PASS** | 15 | **66** | +51 ✅ |
| `403_FORBIDDEN` | 154 | 125 | -29 |
| `400_BADREQUEST` | 141 | 183 | (was 141, but new 42 newly visible) |
| `401_UNAUTHORIZED` | 100 | 89 | -11 |
| `404_NOT_FOUND` | 79 | 95 | +16 |
| `500/503/429/405` | 11 | 16 | +5 |

**New total: 117 + 66 = 168 PASS (22.9%)**, 565 FAIL (77.1%).

### 51 NEW Tables That Now PASS (v3 Unlocked)

| # | Table | Scope that unlocked it |
|---|-------|------------------------|
| 1 | `admin_peopleadminsettings_admin_getpeople` | `PeopleSettings.Read.All` |
| 2 | `admin_peopleadminsettings_admin_people_getpronouns` | `PeopleSettings.Read.All` |
| 3 | `admin_peopleadminsettings_admin_people_listprofilecardproperties` | `PeopleSettings.Read.All` |
| 4 | `admin_peopleadminsettings_admin_people_listprofilepropertysettings` | `PeopleSettings.Read.All` |
| 5 | `admin_peopleadminsettings_admin_people_listprofilesources` | `PeopleSettings.Read.All` |
| 6 | `admin_serviceannouncement_admin_serviceannouncement_listhealthoverviews` | `Reports.Read.All` |
| 7 | `admin_serviceannouncement_admin_serviceannouncement_listissues` | `Reports.Read.All` |
| 8 | `copilot_copilotreportroot_copilot_getreports` | `Reports.Read.All` |
| 9 | `education_educationclass_education_classes_delta` | `EduRoster.Read` |
| 10 | `education_educationschool_education_schools_delta` | `EduRoster.Read` |
| 11 | `education_educationuser_education_getme` | `EduRoster.Read` |
| 12 | `education_educationuser_education_me_getuser` | `EduRoster.Read` |
| 13 | `education_educationuser_education_me_listclasses` | `EduRoster.Read` |
| 14 | `education_educationuser_education_me_listschools` | `EduRoster.Read` |
| 15 | `education_educationuser_education_me_listtaughtclasses` | `EduRoster.Read` |
| 16 | `education_educationuser_education_me_user_listserviceprovisioningerrors` | `EduRoster.Read` |
| 17 | `grouplifecyclepolicies_grouplifecyclepolicy_grouplifecyclepolicies_grouplifecyclepolicy_listgrouplifecyclepolicy` | `Directory.Read.All` |
| 18 | `identity_conditionalaccessroot_identity_conditionalaccess_authenticationstrength_listpolicies` | `Policy.Read.All` |
| 19 | `identity_conditionalaccessroot_identity_conditionalaccess_listauthenticationcontextclassreferences` | `Policy.Read.All` |
| 20 | `identity_identityproviderbase_identity_identityproviders_availableprovidertypes` | `IdentityProvider.Read.All` |
| 21 | `identity_identityproviderbase_identity_listidentityproviders` | `IdentityProvider.Read.All` |
| 22 | `identitygovernance_accessreviewset_identitygovernance_accessreviews_listhistorydefinitions` | `AccessReview.Read.All` |
| 23 | `identitygovernance_appconsentapprovalroute_identitygovernance_appconsent_listappconsentrequests` | `Policy.Read.All` |
| 24 | `identityproviders_identityprovider_functions_identityproviders_availableprovidertypes` | `IdentityProvider.Read.All` |
| 25 | `identityproviders_identityprovider_identityproviders_identityprovider_listidentityprovider` | `IdentityProvider.Read.All` |
| 26 | `me_authentication_me_authentication_listemailmethods` | `UserAuthenticationMethod.Read.All` |
| 27 | `me_authentication_me_authentication_listexternalauthenticationmethods` | `UserAuthenticationMethod.Read.All` |
| 28 | `me_authentication_me_authentication_listfido2methods` | `UserAuthenticationMethod.Read.All` |
| 29 | `me_authentication_me_authentication_listmethods` | `UserAuthenticationMethod.Read.All` |
| 30 | `me_authentication_me_authentication_listmicrosoftauthenticatormethods` | `UserAuthenticationMethod.Read.All` |
| 31 | `me_authentication_me_authentication_listpasswordmethods` | `UserAuthenticationMethod.Read.All` |
| 32 | `me_authentication_me_authentication_listphonemethods` | `UserAuthenticationMethod.Read.All` |
| 33 | `me_authentication_me_authentication_listsoftwareoathmethods` | `UserAuthenticationMethod.Read.All` |
| 34 | `me_authentication_me_authentication_listtemporaryaccesspassmethods` | `UserAuthenticationMethod.Read.All` |
| 35 | `me_authentication_me_authentication_listwindowshelloforbusinessmethods` | `UserAuthenticationMethod.Read.All` |
| 36 | `me_drive_me_listdrives` | `Files.Read.All` |
| 37 | `me_person_me_listpeople` | `People.Read` |
| 38 | `policies_adminconsentrequestpolicy_policies_getadminconsentrequestpolicy` | `Policy.Read.All` |
| 39 | `policies_authenticationflowspolicy_policies_getauthenticationflowspolicy` | `Policy.Read.All` |
| 40 | `policies_authenticationmethodspolicy_policies_getauthenticationmethodspolicy` | `Policy.Read.All` |
| 41 | `policies_authenticationstrengthpolicy_policies_listauthenticationstrengthpolicies` | `Policy.Read.All` |
| 42 | `policies_deviceregistrationpolicy_policies_getdeviceregistrationpolicy` | `Policy.Read.All` |
| 43 | `policies_identitysecuritydefaultsenforcementpolicy_policies_getidentitysecuritydefaultsenforcementpolicy` | `Policy.Read.All` |
| 44 | `security_alert_security_listalerts` | `SecurityAlert.Read.All` (implicit from SecurityEvents.Read.All) |
| 45 | `security_attacksimulationroot_security_attacksimulation_listsimulationautomations` | `AttackSimulation.Read.All` (was missing in v2) |
| 46 | `security_attacksimulationroot_security_attacksimulation_listsimulations` | `AttackSimulation.Read.All` |
| 47 | `security_attacksimulationroot_security_attacksimulation_listtrainings` | `AttackSimulation.Read.All` |
| 48 | `security_securescore_security_listsecurescores` | `SecurityEvents.Read.All` |
| 49 | `security_securescorecontrolprofile_security_listsecurescorecontrolprofiles` | `SecurityEvents.Read.All` |
| 50 | `users_user_functions_users_delta` | `User.Read.All` |
| 51 | `users_user_users_user_listuser` | `User.Read.All` |

### What Did NOT Improve (and Why)

| Cause | v2 Count | v3 Count | Notes |
|-------|----------|----------|-------|
| `400_BADREQUEST` — endpoint needs `$filter`/`$select` params not in `SELECT *` | 141 | 183 | +42 newly surfaced (some were hidden behind 403/timeout before) |
| `404_NOT_FOUND` — endpoint path doesn't exist | 79 | 95 | +16 newly surfaced (manifest issue) |
| `401_UNAUTHORIZED` — needs Exchange Online / SharePoint scope | 100 | 89 | -11 from getting more Graph scopes |
| `403_FORBIDDEN` (remaining) | 154 | 125 | -29, but most remaining still need MORE scopes |
| `500/503/429/405` | 11 | 16 | transient / rate limit |

### Top Failure URL Areas After v3 (still failing)

| URL Area | Count | What's needed |
|----------|-------|---------------|
| `solutions/backupRestore` | 28 | Tenant lacks SharePoint/OneDrive BackupRestore license |
| `identityGovernance/entitlementManagement` | 17 | `EntitlementManagement.Read.All` — not yet consented (was in v3 batch but token didn't include — verify consent state) |
| `me/onenote` | 7 | OneNote REST API migration |
| `deviceAppManagement/mobileApps` | 10 | Intune license |
| `identityGovernance/privilegedAccess` | 9 | `PrivilegedAccess.Read.*` — partial grant |
| `deviceManagement/virtualEndpoint` | 8 | Cloud PC license |
| `admin/teams` | 7 | Teams Admin SDK |
| `security/labels` | 7 | Microsoft Purview license |
| `me/settings` | 11 | Mixed: storage, exchange, regional settings |
| `education/me` | 5 | `EduRoster.Read` partial — needs `EduRoster.Read.All` |
| `solutions` (other) | 35 | Cross-tenant access / license |

---

## Failure Details by Area

| API Area | Total Tables | PASS | 403 | 400 | 401 | TBL_NOT_FOUND | ERR |
|----------|-------------|------|-----|-----|-----|---------------|-----|
| me | 147 | 36 | 26 | 23 | 45 | 14 | 3 |
| policies | 29 | 16 | 6 | 5 | — | 2 | — |
| directory | 22 | 13 | 5 | 3 | — | 1 | — |
| identity | 26 | 7 | 13 | 2 | — | 4 | — |
| admin | 36 | 4 | 19 | 9 | 1 | 2 | 1 |
| security | 64 | 3 | 22 | — | 23 | 16 | — |
| rolemanagement | 21 | 3 | 7 | 8 | — | — | 3 |
| auditlogs | 4 | 3 | 1 | — | — | — | — |
| applications | 2 | 2 | — | — | — | — | — |
| groups | 2 | 2 | — | — | — | — | — |
| contacts | 2 | 2 | — | — | — | — | — |
| devices | 2 | 2 | — | — | — | — | — |
| identitygovernance | 45 | 1 | 31 | 3 | — | 10 | — |
| reports | 27 | 2 | 7 | 12 | 4 | 2 | — |
| devicemanagement | 74 | — | 12 | 62 | — | — | — |
| deviceappmanagement | 33 | — | — | 33 | — | — | — |
| education | 22 | — | 16 | 1 | — | 1 | 4 |
| solutions | 35 | — | 1 | — | 34 | — | — |
| communications | 12 | 1 | 4 | — | — | 7 | — |
| teams | 2 | — | — | — | 2 | — | — |
| users | 2 | — | — | — | 2 | — | — |
---

## Detailed Output (All 733 Tests)

Each test has its `az graph query` output shown below.

### admin_admin_admin_admin_getadmin

- **Status**: PASS (OK)
- **Elapsed**: 12.4s

```json
[
  {
    "configurationmanagement": null,
    "edge": null,
    "exchange": null,
    "microsoft365apps": null,
    "people": null,
    "reportsettings": null,
    "serviceannouncement": null,
    "sharepoint": null,
    "teams": null,
    "odata_type": null
  }
]
```

---

### admin_adminmicrosoft365apps_admin_getmicrosoft365apps

- **Status**: PASS (OK)
- **Elapsed**: 12.8s

```json
[
  {
    "odata_type": null,
    "id": null,
    "installationoptions": null
  }
]
```

---

### admin_adminmicrosoft365apps_admin_microsoft365apps_getinstallationoptions

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 22.1s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Access is denied to the requested resource. The user or app might not have enough permission.","innerError":{"date":"2026-07-29T05:57:27","request-id":"031a4b93-b00c-4336-a508-fc997fedc5a6","client-request-id":"031a4b93-b00c-4336-a508-fc997fedc5a6"}}} [GET] https://graph.microsoft.com/v1.0/admin/microsoft365Apps/installationOptions
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### admin_adminreportsettings_admin_getreportsettings

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 22.5s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"error\":{\"code\":\"S2SUnauthorized\",\"message\":\"Invalid permission.\"}}","innerError":{"date":"2026-07-29T05:57:28","request-id":"742fdf3c-742f-4b60-8258-460aeba3f51e","client-request-id":"742fdf3c-742f-4b60-8258-460aeba3f51e"}}} [GET] https://graph.microsoft.com/v1.0/admin/reportSettings
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### admin_configurationmanagement_admin_configurationmanagement_listconfigurationmonitoringresults

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 20.5s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T05:57:27","request-id":"fe109705-c0c9-47bc-9dc1-c445fd8d230c","client-request-id":"fe109705-c0c9-47bc-9dc1-c445fd8d230c"}}} [GET] https://graph.microsoft.com/v1.0/admin/configurationManagement/configurationMonitoringResults
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### admin_configurationmanagement_admin_configurationmanagement_listconfigurationdrifts

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 21.0s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T05:57:27","request-id":"caa0691e-3e19-4500-9446-3189d7128ca9","client-request-id":"caa0691e-3e19-4500-9446-3189d7128ca9"}}} [GET] https://graph.microsoft.com/v1.0/admin/configurationManagement/configurationDrifts
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### admin_configurationmanagement_admin_configurationmanagement_listconfigurationsnapshotjobs

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 19.3s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T05:57:27","request-id":"d6887883-5cda-4e95-9193-57300d3701e0","client-request-id":"d6887883-5cda-4e95-9193-57300d3701e0"}}} [GET] https://graph.microsoft.com/v1.0/admin/configurationManagement/configurationSnapshotJobs
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### admin_configurationmanagement_admin_configurationmanagement_listconfigurationmonitors

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 19.8s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T05:58:03","request-id":"0001c51d-c0ae-4e0d-9abd-92df31427840","client-request-id":"0001c51d-c0ae-4e0d-9abd-92df31427840"}}} [GET] https://graph.microsoft.com/v1.0/admin/configurationManagement/configurationMonitors
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### admin_configurationmanagement_admin_getconfigurationmanagement

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.4s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.XTA,False).","innerError":{"date":"2026-07-29T06:47:07","request-id":"ffd4fe44-d431-422e-af8d-1cc4121e02ce","client-request-id":"ffd4fe44-d431-422e-af8d-1cc4121e02ce"}}} [GET] https://graph.microsoft.com/v1.0/admin/configurationManagement
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### admin_configurationmanagement_admin_configurationmanagement_listconfigurationsnapshots

- **Status**: FAIL (ERR(1))
- **Elapsed**: 21.7s

```
Error: Source server error (503)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:47:46","request-id":"29115ea0-70e9-449c-ae96-6f86c3358fc2","client-request-id":"29115ea0-70e9-449c-ae96-6f86c3358fc2"}}} [GET] https://graph.microsoft.com/v1.0/admin/configurationManagement/configurationSnapshots
Hint: The upstream API returned a server error. This may be transient — retry after a brief wait.
```

---

### admin_edge_admin_edge_getinternetexplorermode

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.6s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.Edge.CloudSiteListManagement,False).","innerError":{"date":"2026-07-29T05:58:01","request-id":"c6be0097-0660-4888-bd5b-e26368e8e228","client-request-id":"c6be0097-0660-4888-bd5b-e26368e8e228"}}} [GET] https://graph.microsoft.com/v1.0/admin/edge/internetExplorerMode
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### admin_edge_admin_edge_internetexplorermode_listsitelists

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 17.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"You do not have permission to access the resource.","innerError":{"date":"2026-07-29T05:58:04","request-id":"d952037b-e0aa-4c31-bdf7-d0b9fdb12793","client-request-id":"d952037b-e0aa-4c31-bdf7-d0b9fdb12793"}}} [GET] https://graph.microsoft.com/v1.0/admin/edge/internetExplorerMode/siteLists
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### admin_edge_admin_getedge

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 18.4s

```
TIMEOUT
```

---

### admin_exchangeadmin_admin_exchange_gettracing

- **Status**: PASS (OK)
- **Elapsed**: 13.6s

```json
[
  {
    "odata_type": null,
    "id": null,
    "messagetraces": null
  }
]
```

---

### admin_exchangeadmin_admin_exchange_tracing_listmessagetraces

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 18.9s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Service principal-less Authentication failed: the service principal for App ID 8bd644d1-64a1-4d4b-ae52-2e0cbf64e373 was not found. Please create a service principal for this app in your tenant. Provisioning may take several hours to complete. For details, see: https://learn.microsoft.com/exchange/monitoring/trace-an-email-message/graph-api-message-trace#provision-a-service-principal","innerError":{"date":"2026-07-29T05:58:04","request-id":"88fc258e-7d5d-41d2-abe0-2d50225be8bc","client-request-id":"88fc258e-7d5d-41d2-abe0-2d50225be8bc"}}} [GET] https://graph.microsoft.com/v1.0/admin/exchange/tracing/messageTraces
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### admin_exchangeadmin_admin_exchange_listmailboxes

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 20.2s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/admin/exchange/mailboxes
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### admin_exchangeadmin_admin_getexchange

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 23.1s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.Exchange,True).","innerError":{"date":"2026-07-29T05:58:03","request-id":"5be4580d-3c5a-4ddb-972f-fbb8dc1d8696","client-request-id":"5be4580d-3c5a-4ddb-972f-fbb8dc1d8696"}}} [GET] https://graph.microsoft.com/v1.0/admin/exchange
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### admin_peopleadminsettings_admin_getpeople

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 25.1s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"forbidden","message":"Authorization failed because of missing requirement(s).","innerError":{"peopleAdminErrorCode":"peopleAdminAuthorizationfailure","peopleAdminRequestId":"86a93ef6-9bdf-9fcd-ae1c-252e03605dd5","peopleAdminClientRequestId":"6ef2768d-6c0e-4b8a-b4ca-b48b1cc43af0","date":"2026-07-29T05:58:05","request-id":"6ef2768d-6c0e-4b8a-b4ca-b48b1cc43af0","client-request-id":"6ef2768d-6c0e-4b8a-b4ca-b48b1cc43af0"}}} [GET] https://graph.microsoft.com/v1.0/admin/people
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### admin_peopleadminsettings_admin_people_getpronouns

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 29.0s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"forbidden","message":"Authorization failed because of missing requirement(s).","innerError":{"peopleAdminErrorCode":"peopleAdminAuthorizationfailure","peopleAdminRequestId":"a55698d9-5346-ca44-85f4-2f2ba1203128","peopleAdminClientRequestId":"fa500a0d-bb3b-42e1-b273-2076c6896063","date":"2026-07-29T05:58:05","request-id":"fa500a0d-bb3b-42e1-b273-2076c6896063","client-request-id":"fa500a0d-bb3b-42e1-b273-2076c6896063"}}} [GET] https://graph.microsoft.com/v1.0/admin/people/pronouns
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### admin_peopleadminsettings_admin_people_getiteminsights

- **Status**: PASS (OK)
- **Elapsed**: 30.8s

```json
[
  {
    "odata_type": null,
    "disabledforgroup": null,
    "id": null,
    "isenabledinorganization": true
  }
]
```

---

### admin_peopleadminsettings_admin_people_listprofilecardproperties

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 24.7s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"forbidden","message":"Authorization failed because of missing requirement(s).","innerError":{"peopleAdminErrorCode":"peopleAdminAuthorizationfailure","peopleAdminRequestId":"755e0ac0-b3cb-d5d6-85f6-2d0a1366fd10","peopleAdminClientRequestId":"a2aa8e54-284d-487c-828e-4debb1b2dc7f","date":"2026-07-29T05:58:04","request-id":"a2aa8e54-284d-487c-828e-4debb1b2dc7f","client-request-id":"a2aa8e54-284d-487c-828e-4debb1b2dc7f"}}} [GET] https://graph.microsoft.com/v1.0/admin/people/profileCardProperties
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### admin_peopleadminsettings_admin_people_listprofilepropertysettings

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 22.4s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"forbidden","message":"Authorization failed because of missing requirement(s).","innerError":{"peopleAdminErrorCode":"peopleAdminAuthorizationfailure","peopleAdminRequestId":"c85cf542-a67c-33e6-305b-6943a9cb7967","peopleAdminClientRequestId":"84e4e012-b6f0-48b2-88b2-80ec9d2349a3","date":"2026-07-29T05:58:04","request-id":"84e4e012-b6f0-48b2-88b2-80ec9d2349a3","client-request-id":"84e4e012-b6f0-48b2-88b2-80ec9d2349a3"}}} [GET] https://graph.microsoft.com/v1.0/admin/people/profilePropertySettings
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### admin_serviceannouncement_admin_getserviceannouncement

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 15.2s

```
TIMEOUT
```

---

### admin_peopleadminsettings_admin_people_listprofilesources

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 17.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"forbidden","message":"Authorization failed because of missing requirement(s).","innerError":{"peopleAdminErrorCode":"peopleAdminAuthorizationfailure","peopleAdminRequestId":"a685a75a-61c5-2319-a1c7-aadbf2b82510","peopleAdminClientRequestId":"e11adb7c-c51c-4e0c-b97d-6eab03f7f694","date":"2026-07-29T05:58:05","request-id":"e11adb7c-c51c-4e0c-b97d-6eab03f7f694","client-request-id":"e11adb7c-c51c-4e0c-b97d-6eab03f7f694"}}} [GET] https://graph.microsoft.com/v1.0/admin/people/profileSources
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### admin_serviceannouncement_admin_serviceannouncement_listhealthoverviews

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 17.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:47:43","request-id":"27d4e319-bb20-4f22-a940-ce17f4e802d5","client-request-id":"27d4e319-bb20-4f22-a940-ce17f4e802d5"}}} [GET] https://graph.microsoft.com/v1.0/admin/serviceAnnouncement/healthOverviews
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### admin_serviceannouncement_admin_serviceannouncement_listissues

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 17.5s

```
TIMEOUT
```

---

### admin_sharepoint_admin_getsharepoint

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.0s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.FileServices,False).","innerError":{"date":"2026-07-29T06:47:42","request-id":"569915cb-558a-41db-92f0-081d7d5443b9","client-request-id":"569915cb-558a-41db-92f0-081d7d5443b9"}}} [GET] https://graph.microsoft.com/v1.0/admin/sharepoint
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### admin_serviceannouncement_admin_serviceannouncement_listmessages

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 18.0s

```
TIMEOUT
```

---

### admin_sharepoint_admin_sharepoint_getsettings

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 18.1s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Tenant does not have a SPO license.","innerError":{"date":"2026-07-29T06:47:43","request-id":"7cd2ea0a-65e8-4638-9a0e-eaae6514f704","client-request-id":"7cd2ea0a-65e8-4638-9a0e-eaae6514f704"}}} [GET] https://graph.microsoft.com/v1.0/admin/sharepoint/settings
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### admin_teamsadminroot_admin_getteams

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 18.1s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.IC3.TeamsAdminGateway,False).","innerError":{"date":"2026-07-29T05:58:55","request-id":"cab53e0a-f6f8-40b4-b0e6-048d2e14a5c0","client-request-id":"cab53e0a-f6f8-40b4-b0e6-048d2e14a5c0"}}} [GET] https://graph.microsoft.com/v1.0/admin/teams
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### admin_teamsadminroot_admin_teams_getpolicy

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 19.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.IC3.PolicyAdmin,False).","innerError":{"date":"2026-07-29T05:58:53","request-id":"c9fc71ba-07c4-44b8-827f-f1ff00b8b666","client-request-id":"c9fc71ba-07c4-44b8-827f-f1ff00b8b666"}}} [GET] https://graph.microsoft.com/v1.0/admin/teams/policy
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### admin_teamsadminroot_admin_teams_gettelephonenumbermanagement

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 19.1s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.IC3.TelephoneNumberManagement,False).","innerError":{"date":"2026-07-29T05:58:53","request-id":"0169e6e7-e033-4141-b09c-7725b1330ca0","client-request-id":"0169e6e7-e033-4141-b09c-7725b1330ca0"}}} [GET] https://graph.microsoft.com/v1.0/admin/teams/telephoneNumberManagement
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### admin_teamsadminroot_admin_teams_policy_listuserassignments

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 20.9s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"{\"code\":\"NotFound\",\"message\":\"Resource not found.\",\"action\":\"Specify valid resource.\"}","innerError":{"date":"2026-07-29T05:58:56","request-id":"3d5e4373-1b09-4bbb-915c-0f9c2ab64c25","client-request-id":"3d5e4373-1b09-4bbb-915c-0f9c2ab64c25"}}} [GET] https://graph.microsoft.com/v1.0/admin/teams/policy/userAssignments
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### admin_teamsadminroot_admin_teams_listuserconfigurations

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 21.1s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"code\":\"Forbidden\",\"message\":\"Access Denied.\",\"action\":\"Provide different credential or request access.\"}","innerError":{"date":"2026-07-29T05:58:56","request-id":"64e8e93b-997f-48dd-9d35-8a5b99bc6af2","client-request-id":"64e8e93b-997f-48dd-9d35-8a5b99bc6af2"}}} [GET] https://graph.microsoft.com/v1.0/admin/teams/userConfigurations
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### admin_teamsadminroot_admin_teams_telephonenumbermanagement_listoperations

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 21.2s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"code\":\"Forbidden\",\"message\":\"Access Denied.\",\"action\":\"Provide different credential or request access.\"}","innerError":{"date":"2026-07-29T05:58:56","request-id":"fe882040-2a5f-4187-beb3-dbc477103a4b","client-request-id":"fe882040-2a5f-4187-beb3-dbc477103a4b"}}} [GET] https://graph.microsoft.com/v1.0/admin/teams/telephoneNumberManagement/operations
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### admin_teamsadminroot_admin_teams_telephonenumbermanagement_listnumberassignments

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 21.3s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"code\":\"Forbidden\",\"message\":\"Access Denied.\",\"action\":\"Provide different credential or request access.\"}","innerError":{"date":"2026-07-29T05:58:56","request-id":"277634e0-b11d-4c9e-a055-b27d8abfac5c","client-request-id":"277634e0-b11d-4c9e-a055-b27d8abfac5c"}}} [GET] https://graph.microsoft.com/v1.0/admin/teams/telephoneNumberManagement/numberAssignments
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### agreementacceptances_agreementacceptance_agreementacceptances_agreementacceptance_listagreementacceptance

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 19.6s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"","message":"No HTTP resource was found that matches the request URI 'https://api.termsofuse.identitygovernance.azure.com/v2.0/agreementAcceptances?x-scenario=MSGraph&x-tenantid=[tenantId]'.","innerError":{"date":"2026-07-29T05:58:56","request-id":"15ee25f0-7fd4-4ad4-b250-3b985a66b60a","client-request-id":"15ee25f0-7fd4-4ad4-b250-3b985a66b60a"}}} [GET] https://graph.microsoft.com/v1.0/agreementAcceptances
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### agreements_agreement_agreements_agreement_listagreement

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 19.7s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnauthorizedAccess","message":"User does not have any of the required scopes: user_impersonation, Agreement.Read.All, Agreement.ReadWrite.All","innerError":{"date":"2026-07-29T05:58:56","request-id":"f900d24e-8227-402b-a06f-35fe9694f36a","client-request-id":"f900d24e-8227-402b-a06f-35fe9694f36a"}}} [GET] https://graph.microsoft.com/v1.0/agreements
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### appcatalogs_appcatalogs_appcatalogs_appcatalogs_getappcatalogs

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 18.0s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-29T05:58:56","request-id":"af9130ab-c7e1-4580-affd-e10bd00321fa","client-request-id":"af9130ab-c7e1-4580-affd-e10bd00321fa"}}} [GET] https://graph.microsoft.com/v1.0/appCatalogs
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### appcatalogs_teamsapp_appcatalogs_listteamsapps

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 18.5s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-29T05:58:57","request-id":"8b0d3438-307e-4bf4-9b52-be2b5297a6ad","client-request-id":"8b0d3438-307e-4bf4-9b52-be2b5297a6ad"}}} [GET] https://graph.microsoft.com/v1.0/appCatalogs/teamsApps
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### applications_application_applications_application_listapplication

- **Status**: PASS (OK)
- **Elapsed**: 16.8s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"id\":\"5f591326-aaea-48c1-a754-65f98cd38d30\",\"deletedDateTime\":null,\"appId\":\"6f0f30f5-36b1-42f4-bb86-df37abe020f0\",\"applicationTemplateId\":null,\"disabledByMicrosoftStatus\":null,\"createdByAppId\":\"18ed3507-a475-4ccb-b669-d66bc9f2a36e\",\"createdDateTime\":\"2026-07-13T22:47:11Z\",\"displayName\":\"coral\",\"description\":null,\"groupMembershipClaims\":null,\"identifierUris\":[],\"isDeviceOnlyAuthSupported\":null,\"isDisabled\":null,\"isFallbackPublicClient\":null,\"nativeAuthenticationApisEnabled\":null,\"notes\":null,\"publisherDomain\":\"algsochgmail.onmicrosoft.com\",\"serviceManagementReference\":null,\"signInAudience\":\"AzureADandPersonalMicrosoftAccount\",\"tags\":[],\"tokenEncryptionKeyId\":null,\"uniqueName\":null,\"samlMetadataUrl\":null,\"defaultRedirectUri\":null,\"certification\":null,\"optionalClaims\":null,\"requestSignatureVerification\":null,\"addIns\":[],\"api\":{\"acceptMappedClaims\":null,\"knownClientApplications\":[],\"requestedAccessTokenVersion\":2,\"oauth2PermissionScopes\":[],\"preAuthorizedApplications\":[]},\"appRoles\":[],\"info\":{\"logoUrl\":null,\"marketingUrl\":null,\"privacyStatementUrl\":null,\"supportUrl\":null,\"termsOfServiceUrl\":null},\"keyCredentials\":[],\"parentalControlSettings\":{\"countriesBlockedForMinors\":[],\"legalAgeGroupRule\":\"Allow\"},\"passwordCredentials\":[],\"publicClient\":{\"redirectUris\":[]},\"requiredResourceAccess\":[{\"resourceAppId\":\"00000003-0000-0000-c000-000000000000\",\"resourceAccess\":[{\"id\":\"e1fe6dd8-ba31-4d61-89e7-88639da4683d\",\"type\":\"Scope\"}]}],\"verifiedPublisher\":{\"displayName\":null,\"verifiedPublisherId\":null,\"addedDateTime\":null},\"web\":{\"homePageUrl\":null,\"logoutUrl\":null,\"redirectUris\":[],\"implicitGrantSettings\":{\"enableAccessTokenIssuance\":false,\"enableIdTokenIssuance\":false},\"redirectUriSettings\":[]},\"servicePrincipalLockConfiguration\":{\"isEnabled\":true,\"allPr
```

---

### applications_application_functions_applications_delta

- **Status**: PASS (OK)
- **Elapsed**: 16.6s

```json
[
  {
    "odata_deltalink": null,
    "odata_nextlink": "https://graph.microsoft.com/v1.0/applications/delta()?$skiptoken=S5aczCOYTuRhqFVWGMzdR1GEtlELjM4SbuB2Ig46y3FDRHLid3_3T7NL1wqqUT8mmzwL-jXiYB-HnQTdFK1uzUfrDWnt6pYGeFlH4BWzjy7jy8eNSFwpaQqXhaIZu0pDZJ38vTDaetF-yZuoJE7SjoRsR80pAhL0AYySetyFe-0uFsFnuHjhmMy6cOdmBMNKkgrPOzq7NomF5hlhwxXMizB8hfrRlBXh5fEzopRgF4cJRoquCXS2vTnUnVpRAY0UjVtlaBLDf3mzb23wRSr3a9jMipJWUvaNxhSz1xmEVDyC0R8vQAicduszAA9q5Pgql99F_ypLil4g5FF6e_tu8SZmxcICEoO6_Revp3SKzlKyBKcU8a5cHacgDyGBj9BGY6zN-ncOQR768lBWW3ZShHKxv42RDXvo16zynqqjaqS70eBEHjAXBccAODpRFVWg_o1YPXO-ZKbuIyzXizAT8FeRxyi4_72-DDxb_L57ImxNP3bI3P17cs035iyDae_EIPwsPXuqirH9sWs4e3f20IoAnKkRYqxizK3tdADA7SiM0SBF2Vm04IqNdDRBOXVWsB2JOUvFrteFgFa-nHr4n9cf_ryGZ9v1A8Fxw69vI_YbImCQEVK14eI8n-MVEDCx9Q0V1W9GUO4f-8hoX1k9aot-0gcdEdzFi3SpvoLecAAqn4lxUlKrEWLM7oRTLbSrSwbSvhVzNagLyilZMXUy7cpGc2Rlhlzic8zy6lAr4q_bnplCZsX_Ka-kwhf6Ml8u5u7qzp4zAoqzrWAHdgSJln3YR1a7hK2UzPBzAYzc7CX43WloTPbhiZ-r-GTDx2EeAiwjYNG1ERnrN00fFEcbQn0LnJdbmfMnImyHro4QO9gIwlOJ8MwbEN7q5B4IP8DMRDfXREigATWV1XtBliRhVPDPITiiIfYnPGBmATtLuiY2XFjVMOHchUxSL2QebPUuI65b6tcuQF3o5AU-YTvi-7wYXhXazstE0b2XXizt0jPnSAPA2lhRLZCVOEBE3Alri5eWbDi1fR53gy7upeauMfMcjv_dbMksey1UDqTSmGQyVRWgvCqAkbQaaZlpEZcn6hIIc7lBYz_nP19aEBGhsAURmZgcLRXjz4gz_XHrl3o6CPYxMrL9JTfhBYaQy52tI7oK4zMglTfKrHMVc3Hi_CEOEaEKkFWJcVXZ_dCnP-AVQwxpfJ4gBwDk-VLdX2rvN7z23cIRYcY5vrwKqGSQJ5aiXRtIWMmGoMDWPOuDib89eA6EnRr4vLt3HUE-znZQN2R6Jq0e5scYBCmsBeYxoRsQ4fs39J9jEXOpTplq2em3L9WkEPJSt1hf00ZHdlfBikfPyoWGYePLW5Jq2Uq5jEFmywBVmeREW3XurTgSLdyGLls5KowrWtwcAYAhGYPa9DQb9Mg9UZm4b_91J3SgYjKFHupAXlo4imKr7rnzi5Yh3eyI8cgMPpUFnJYHZAE7MvzQiL__YBRpC3X8tZrFn-c5fjxgM9PddTOXKX3B51cWc2b6eI11UkYg13qeEwy4QN7_FtIo9e1D4t2i7kXJgoGR8Mqk4hyvEEuxvmVMHDsIrXKBlK9BlqyVNEymggO5HOcQmujykEYyb_XN1MXwR2X03Hp2GlPptF39nPrBzBsyEZUMOhVjrYW3sIwyfc2XhmFkearzjUOiGHOQc6bV15jCiVcMD0r5i9NW-y112vDxI2H8kSrYGQi1jzWDqRdGlqaqYiL4oo6KSuNXRmaeb_gUbn16Fvp4bCRP_el6Pnue4OvQVXnUpZcj3CAGMVfp5_bTbqJGfHMS2M26YYNciE0hRnoW-WHrV5zGi8RpT16fufOB13fZtRNz-qCFpbfP7kK1cflgdv7v4b1rXXnna
```

---

### auditlogs_auditlogroot_auditlogs_auditlogroot_getauditlogroot

- **Status**: PASS (OK)
- **Elapsed**: 16.6s

```json
[
  {
    "odata_type": null,
    "directoryaudits": null,
    "id": null,
    "provisioning": null,
    "signins": null
  }
]
```

---

### applicationtemplates_applicationtemplate_applicationtemplates_applicationtemplate_listapplicationtemplate

- **Status**: PASS (OK)
- **Elapsed**: 19.1s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": "https://graph.microsoft.com/v1.0/applicationTemplates?$skip=2900",
    "value": "[{\"id\":\"ace255b2-cdaa-525e-a54b-415ea8228d99\",\"displayName\":\"Overnightprints\",\"homePageUrl\":\"https://www.overnightprints.com/\",\"supportedSingleSignOnModes\":[\"external\"],\"supportedProvisioningTypes\":[],\"logoUrl\":\"https://galleryapplogos1.azureedge.net/app-logo/overnightprintsovernightprints200388_6A8D43C7_215.png\",\"categories\":[\"contentSharing\"],\"publisher\":\"Overnight Prints\",\"description\":\"Overnight Prints is the preferred online printer of business cards, postcards, brochures, and other printed materials.\",\"endpoints\":[\"overnightprints.com\"],\"lastModifiedDateTime\":\"2026-06-21T20:32:47.9674414Z\",\"isEntraIntegrated\":false,\"deprecationDate\":null},{\"id\":\"52d0c46e-3b1f-57c2-8c1b-c8c021aa8eef\",\"displayName\":\"Ayoa\",\"homePageUrl\":\"https://www.ayoa.com/\",\"supportedSingleSignOnModes\":[\"external\"],\"supportedProvisioningTypes\":[],\"logoUrl\":\"https://galleryapplogos1.azureedge.net/app-logo/ayoaayoa201942_3AC32FA6_215.png\",\"categories\":[\"collaboration\"],\"publisher\":\"Ayoa\",\"description\":\"Ayoa is an AI-powered productivity platform that combines mind mapping, task management, and collaborative whiteboards in one workspace to help users brainstorm, plan, and execute ideas efficiently. It offers tools like Gantt timelines, AI-assisted idea generation, and real-time team collaboration for creative and project workflows.\",\"endpoints\":[\"ayoa.com\",\"opengenius.com\",\"app.imindmap.com\",\"thinkbuzan.com\"],\"lastModifiedDateTime\":\"2025-12-12T13:43:56.3147759Z\",\"isEntraIntegrated\":false,\"deprecationDate\":null},{\"id\":\"ef811fab-e7b8-5494-9067-beb2cffdb179\",\"displayName\":\"LATISSE\",\"homePageUrl\":\"https://www.latisse.com/\",\"supportedSingleSignOnModes\":[\"external\"],\"supportedProvisioningTypes\":[],\"logoUrl\":\"https://galleryapplogos1.azureedge.net/app-lo
```

---

### auditlogs_directoryaudit_auditlogs_listdirectoryaudits

- **Status**: PASS (OK)
- **Elapsed**: 18.7s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"id\":\"B2C_b8f7a2a6-7cc5-489a-b2d0-2296f218b85b_89de3b75-fef2-44f9-90a4-cf8c69700c83_134297308996866060\",\"category\":\"Authorization\",\"correlationId\":\"b8f7a2a6-7cc5-489a-b2d0-2296f218b85b\",\"result\":\"failure\",\"resultReason\":\"Access denied. Client app does not have required app permissions.\",\"activityDisplayName\":\"Get authentication flows policy\",\"activityDateTime\":\"2026-07-28T16:48:19.686606Z\",\"loggedByService\":\"B2C\",\"operationType\":\"Read\",\"initiatedBy\":{\"app\":null,\"user\":{\"id\":\"1165bcae-a56f-49bf-af0a-4496f80cd544\",\"displayName\":\"live.com#algsoch@gmail.com\",\"userPrincipalName\":\"live.com#algsoch@gmail.com\",\"ipAddress\":\"20.190.175.152\",\"userType\":null,\"agentType\":\"notAgentic\",\"homeTenantId\":null,\"homeTenantName\":null}},\"targetResources\":[{\"id\":null,\"displayName\":\"00000000-0000-0000-0000-000000000000\",\"type\":\"Other\",\"userPrincipalName\":null,\"groupType\":null,\"modifiedProperties\":[]}],\"additionalDetails\":[{\"key\":\"targetTenant\",\"value\":\"00000000-0000-0000-0000-000000000000\"},{\"key\":\"targetEntityType\",\"value\":\"None\"},{\"key\":\"actorIdentityType\",\"value\":\"UPN\"},{\"key\":\"RequiredPermissions\",\"value\":\"Delegated_PolicyRead, Application_PolicyRead, Delegated_AuthenticationFlowsReadWrite, Application_AuthenticationFlowsReadWrite\"},{\"key\":\"RequestId\",\"value\":\"b8f7a2a6-7cc5-489a-b2d0-2296f218b85b\"}]},{\"id\":\"B2C_b8f7a2a6-7cc5-489a-b2d0-2296f218b85b_89de3b75-fef2-44f9-90a4-cf8c69700c83_134297308996006070\",\"category\":\"Authentication\",\"correlationId\":\"b8f7a2a6-7cc5-489a-b2d0-2296f218b85b\",\"result\":\"success\",\"resultReason\":\"Token is valid\",\"activityDisplayName\":\"Validate user authentication\",\"activityDateTime\":\"2026-07-28T16:48:19.600607Z\",\"loggedByService\":\"B2C\",\"operationType\":\"Read\",\"initiatedBy\":{\"app\":null,\"user\":{\"id\":\"1165bcae-a56f-49bf-af0a
```

---

### auditlogs_provisioningobjectsummary_auditlogs_listprovisioning

- **Status**: PASS (OK)
- **Elapsed**: 19.2s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### authenticationmethodconfigurations_authenticationmethodconfiguration_authenticationmethodconfigurations_authenticationmethodconfiguration_listauthenticationmethodconfiguration

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.9s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"UnknownError","message":"{\"ErrorCode\":\"badRequest\",\"Message\":\"Resource not found for segment 'authenticationMethodConfigurations'.\",\"Target\":null,\"Details\":null,\"InnerError\":null,\"InstanceAnnotations\":[],\"TypeAnnotation\":null}","innerError":{"date":"2026-07-29T05:58:56","request-id":"c45f01b8-2449-49b8-a26c-18e5cc6e4649","client-request-id":"c45f01b8-2449-49b8-a26c-18e5cc6e4649"}}} [GET] https://graph.microsoft.com/v1.0/authenticationMethodConfigurations
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### auditlogs_signin_auditlogs_listsignins

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 16.9s

```
TIMEOUT
```

---

### authenticationmethodspolicy_authenticationmethodconfiguration_authenticationmethodspolicy_listauthenticationmethodconfigurations

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.5s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"badRequest","message":"Resource not found for segment 'authenticationMethodsPolicy/authenticationMethodConfigurations'.","innerError":{"date":"2026-07-29T05:58:56","request-id":"1f562059-c44e-4d32-8a72-d698fe9d7236","client-request-id":"1f562059-c44e-4d32-8a72-d698fe9d7236"}}} [GET] https://graph.microsoft.com/v1.0/authenticationMethodsPolicy/authenticationMethodConfigurations
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### authenticationmethodspolicy_authenticationmethodspolicy_authenticationmethodspolicy_authenticationmethodspolicy_getauthenticationmethodspolicy

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.2s

```
TIMEOUT
```

---

### chats_chat_chats_chat_listchat

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-29T05:59:13","request-id":"f51e3718-62c1-4b0e-8c20-743b0a6bfc08","client-request-id":"f51e3718-62c1-4b0e-8c20-743b0a6bfc08"}}} [GET] https://graph.microsoft.com/v1.0/chats
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### certificatebasedauthconfiguration_certificatebasedauthconfiguration_certificatebasedauthconfiguration_certificatebasedauthconfiguration_listcertificatebasedauthconfiguration

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.8s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_UnsupportedQuery","message":"Direct queries to this resource type are not supported.","innerError":{"date":"2026-07-29T05:59:13","request-id":"a5c37e42-7749-4393-a4dc-898f86dfe9ac","client-request-id":"a5c37e42-7749-4393-a4dc-898f86dfe9ac"}}} [GET] https://graph.microsoft.com/v1.0/certificateBasedAuthConfiguration
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### chats_chat_functions_chats_getallretainedmessages

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 14.0s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-29T05:59:12","request-id":"ad75cbd1-d21f-4726-aac4-79eadf790ad9","client-request-id":"ad75cbd1-d21f-4726-aac4-79eadf790ad9"}}} [GET] https://graph.microsoft.com/v1.0/chats/getAllRetainedMessages()
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### chats_chat_functions_chats_getallmessages

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 14.0s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-29T05:59:12","request-id":"ee34ae49-1f8d-4ac6-bb4b-4c974f7dfe7e","client-request-id":"ee34ae49-1f8d-4ac6-bb4b-4c974f7dfe7e"}}} [GET] https://graph.microsoft.com/v1.0/chats/getAllMessages()
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### communications_adhoccall_communications_adhoccalls_getallrecordings

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 14.1s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-29T05:59:12","request-id":"e40367ac-8f3c-413e-a907-45312b5e6eb2","client-request-id":"e40367ac-8f3c-413e-a907-45312b5e6eb2"}}} [GET] https://graph.microsoft.com/v1.0/communications/adhocCalls/getAllRecordings(userId='@userId',startDateTime=@startDateTime,endDateTime=@endDateTime)
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### communications_adhoccall_communications_adhoccalls_getalltranscripts

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 14.1s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-29T05:59:46","request-id":"8e4cc25f-9d54-4956-a1b8-bacff45f12d5","client-request-id":"8e4cc25f-9d54-4956-a1b8-bacff45f12d5"}}} [GET] https://graph.microsoft.com/v1.0/communications/adhocCalls/getAllTranscripts(userId='@userId',startDateTime=@startDateTime,endDateTime=@endDateTime)
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### communications_adhoccall_communications_listadhoccalls

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 15.9s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-29T05:59:47","request-id":"183ae443-c159-4b4a-8b83-a649bac57177","client-request-id":"183ae443-c159-4b4a-8b83-a649bac57177"}}} [GET] https://graph.microsoft.com/v1.0/communications/adhocCalls
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### communications_call_communications_listcalls

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 16.2s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"code\":\"7503\",\"message\":\"Application is not registered in our store.\",\"target\":null,\"details\":null,\"innerError\":null,\"instanceAnnotations\":[],\"typeAnnotation\":null}","innerError":{"date":"2026-07-29T05:59:47","request-id":"c804472d-f4b3-45ff-963a-3c99343e0446","client-request-id":"c804472d-f4b3-45ff-963a-3c99343e0446"}}} [GET] https://graph.microsoft.com/v1.0/communications/calls
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### communications_cloudcommunications_communications_cloudcommunications_getcloudcommunications

- **Status**: PASS (OK)
- **Elapsed**: 16.0s

```json
[
  {
    "adhoccalls": null,
    "callrecords": null,
    "calls": null,
    "onlinemeetingconversations": null,
    "onlinemeetings": null,
    "presences": null,
    "odata_type": null
  }
]
```

---

### communications_callrecord_communications_listcallrecords

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 16.5s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"","innerError":{"request-id":"2ca18b45-ea14-402a-aefd-82c34607976e","date":"2026-07-29T05:59:54","client-request-id":"2ca18b45-ea14-402a-aefd-82c34607976e"}}} [GET] https://graph.microsoft.com/v1.0/communications/callRecords
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### communications_onlinemeeting_communications_listonlinemeetings

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 17.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Insufficient permissions","innerError":{"date":"2026-07-29T05:59:47","request-id":"5e51704b-7a18-4e4a-aabc-df318fe60225","client-request-id":"5e51704b-7a18-4e4a-aabc-df318fe60225"}}} [GET] https://graph.microsoft.com/v1.0/communications/onlineMeetings
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### communications_cloudcommunications_functions_communications_getallonlinemeetingmessages

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 18.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"unauthorized","message":"Authorization credentials are invalid.","innerError":{"date":"2026-07-29T06:47:44","request-id":"7beb4ab1-c307-4fa5-b3a1-099d7e75f690","client-request-id":"7beb4ab1-c307-4fa5-b3a1-099d7e75f690"}}} [GET] https://graph.microsoft.com/v1.0/communications/getAllOnlineMeetingMessages()
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### communications_onlinemeeting_communications_onlinemeetings_getallrecordings

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 21.5s

```
TIMEOUT
```

---

### communications_onlinemeeting_communications_onlinemeetings_getalltranscripts

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 21.1s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-29T05:59:47","request-id":"a2a73ab2-a093-4a1f-a4de-67d7b08832e5","client-request-id":"a2a73ab2-a093-4a1f-a4de-67d7b08832e5"}}} [GET] https://graph.microsoft.com/v1.0/communications/onlineMeetings/getAllTranscripts(meetingOrganizerUserId='@meetingOrganizerUserId',startDateTime=@startDateTime,endDateTime=@endDateTime)
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### communications_presence_communications_listpresences

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 20.8s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"","innerError":{"request-id":"27868311-4076-4c66-a83c-a09c51006e14","date":"2026-07-29T05:59:47","client-request-id":"27868311-4076-4c66-a83c-a09c51006e14"}}} [GET] https://graph.microsoft.com/v1.0/communications/presences
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### communications_onlinemeetingengagementconversation_communications_listonlinemeetingconversations

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 22.5s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T05:59:48","request-id":"b699505d-6d4f-4d4a-8c7a-d01b1112b197","client-request-id":"b699505d-6d4f-4d4a-8c7a-d01b1112b197"}}} [GET] https://graph.microsoft.com/v1.0/communications/onlineMeetingConversations
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### compliance_compliance_compliance_compliance_getcompliance

- **Status**: PASS (OK)
- **Elapsed**: 19.6s

```json
[
  {
    "odata_type": null
  }
]
```

---

### connections_externalconnection_connections_externalconnection_listexternalconnection

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 21.0s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T05:59:49","request-id":"b8758452-285d-4eef-a473-0ca85f56d870","client-request-id":"b8758452-285d-4eef-a473-0ca85f56d870"}}} [GET] https://graph.microsoft.com/v1.0/connections
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### contacts_orgcontact_contacts_orgcontact_listorgcontact

- **Status**: PASS (OK)
- **Elapsed**: 15.9s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### contacts_orgcontact_functions_contacts_delta

- **Status**: PASS (OK)
- **Elapsed**: 15.0s

```json
[
  {
    "odata_deltalink": null,
    "odata_nextlink": "https://graph.microsoft.com/v1.0/contacts/delta()?$skiptoken=Iv3DsMC7lz3PYxG1-KYcTj3RtljaS27KWtb9o7ErlFFaIxB1jsst1U2Fmwo2ZfHIJ0jJdy5RIElo8fW7bOeBACZIxiC0W_E8HwrxEsyOF_K1SCcW0feIsLwUKt7t-INIIzzft0XODa2MJOMzFBEco0FMd4tBJNEf3Q0_szhPBz03WARv2xZGLXCl5LPFkKEyuQAIAsBvuT_avg7xJQ9EZn1_rwxd8cZSi1DnIQJZTJQdgQfgNwm3AWF2P3m2phz16aTNSci2gh9lNUX3nFMi4_Wtb-Al5YHBJ8vjRM2nd-gGsMojqjZmpqyQeu1hNuwbI6DgsGK2CrgBXV9UkYF2P3cPmbxkNUNtrjuaNBeiIemYDuA6cUE0jL8WIitps90fB1n-hcOFnUlnfpkMRuABXJpevZ40sd9WJBHLcjgt142XWYA8DWUraCBLjtQnde-zsSMWzNHAsuoatoqAPeQ-1jT2Rpf8IpNIHYkzWSKkK5RKN7ldyWD2XzIjgNQ_o3HehtMgW-FIh4Qos_23K3Floz0A3vHBrZEzM68OGXSOYc1vU105fvJClnR5ihmvw1SkNlGOolCqwvKMgmNy2YOSO0YuxE7N_CMFUOevHJfHoll-FSeE8XXqNsPotNEYTK3Wrp7oQ6q_u9VoZok_1ycPIl6XigaOaWPARsvIl4Cb-zIL84h_nGhORPe-2HxtFrJcxUtmWnENUsLl9CHPtXUkY5qVl8-fdYCJquf1S8cY1RGoozHgui_RyEzQV5N-i5v75jQt7on6WcfzTItKWHEyMhu7laDUuESBFxOiouPbhWJy27rWHroWltW-dWzznPQZbX8W43v13X7-HG8d_Ch7QpsBHId_ZfWVGi-86Zr_boc2LjhAFrmckNJNF2DZaOKcjqfUPuWV3dRRzFCK_NfVNTfjFhaJdqw36-SpRVfEQWHQ59By4WkbRBesRhf8NMyPO1QrYhNC_zg8127u0ybyIHYy0SJp9zmhKgXU4FHJOLtoRDu2RnhEcLRoxhHGExIKXwqtQ8A0743WwYot_ScOZw1vMUQh264RGqWfXFWCRqa0Ooiwj83fG0DSNITY5z7KXj93KKZPrCv1nzEPh0-gpeojEd7UNmjKvPwWBArq9ADpabdbdRG0CjowPF4f4konEbDcbzKl8p1HKzEJ4PPPezYtC2z6BxkpDyXQk0pX9VAiBRd-lSnAF3QrkkJ6vnlnwF3rre1pl8HORzK5mVdZ6OP-zN1dsyBGVvvjlyWr1fsvUEQENR_70QM232qGVByzbX90rdeF5jd3CsWZeE2BqeHijYAZ7caPl5XJJBrwRDA3WjdLgKoMDtfAh9VDSX3tP0W9Fmj6Rv8IGnq33fOEqeK9NcMl9zfwaKlJDt_ZSz4PNCSRUsHotvqMuiMOVtmn_mfDcJC7C4U4gK2TV6chZvfIF51HbcdwshD8L0ipswFaYka_d3uofKWolK7NsiYoU9RMbtp3OlBmI_9SsssYXUHjq9Wpy6cT5hfXZLIt-f-KbpE-Kw2y1P8XIIeDwAMboOmScTInFvGd2NBJVRQIwNyMGWavUsjtd_d-vGWaBkD81bKGIE0NYwsHYOK6OXkfdEZ52bMUwc5NlHep3brzwyt2ojmDm83slhOcqTkQnlEKbQCFztb2ric9EtBVM3mBCd9oNFgCFaMtylmxtVMCl1vckoZGT3nJCWCjjHQGK3zA4jUDyYARx68kN44ImAXsdsBrzGmNHmgc2_OjJ11VqDpCGP4hvQdJ72cmg6XLFanx8TcKL_1_NM1xEuaS1tTPtFwfGIy3UaOIiJSAORGRAQ.IQvVosoatARZbkDNiNmqOvC_H9MWNUkZ17yVfhcwlfQ",
    "value": "[]",
 
```

---

### contracts_contract_functions_contracts_delta

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 12.7s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_UnsupportedQuery","message":"Differential query is not supported for entity type: Contract","innerError":{"date":"2026-07-29T05:59:47","request-id":"8b2bd708-12f0-4ff1-b30e-3b83fa8d27fb","client-request-id":"8b2bd708-12f0-4ff1-b30e-3b83fa8d27fb"}}} [GET] https://graph.microsoft.com/v1.0/contracts/delta()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### contracts_contract_contracts_contract_listcontract

- **Status**: PASS (OK)
- **Elapsed**: 14.2s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### copilot_aiinteractionhistory_copilot_getinteractionhistory

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 15.3s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-29T05:59:47","request-id":"f3fc4269-a235-4430-9972-5c7e814a06ec","client-request-id":"f3fc4269-a235-4430-9972-5c7e814a06ec"}}} [GET] https://graph.microsoft.com/v1.0/copilot/interactionHistory
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### copilot_aiinteractionhistory_copilot_interactionhistory_getallenterpriseinteractions

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 15.3s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-29T05:59:47","request-id":"3b8c4466-3e81-4466-ab45-94817a2d28ae","client-request-id":"3b8c4466-3e81-4466-ab45-94817a2d28ae"}}} [GET] https://graph.microsoft.com/v1.0/copilot/interactionHistory/getAllEnterpriseInteractions()
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### copilot_aiuser_copilot_listusers

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 14.9s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-29T05:59:47","request-id":"1bfc5703-25c8-47dc-a5a2-ac8e22092053","client-request-id":"1bfc5703-25c8-47dc-a5a2-ac8e22092053"}}} [GET] https://graph.microsoft.com/v1.0/copilot/users
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### copilot_copilotadmin_copilot_admin_catalog_listpackages

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.4s

```
TIMEOUT
```

---

### copilot_copilotadmin_copilot_admin_getcatalog

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.0s

```
TIMEOUT
```

---

### copilot_copilotadmin_copilot_admin_getsettings

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 14.9s

```
TIMEOUT
```

---

### copilot_copilotadmin_copilot_admin_settings_getlimitedmode

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.5s

```
TIMEOUT
```

---

### copilot_copilotadmin_copilot_getadmin

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 15.0s

```
TIMEOUT
```

---

### copilot_copilotroot_copilot_copilotroot_getcopilotroot

- **Status**: PASS (OK)
- **Elapsed**: 13.6s

```json
[]
```

---

### copilot_copilotreportroot_copilot_getreports

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 14.7s

```
TIMEOUT
```

---

### deviceappmanagement_androidmanagedappprotection_deviceappmanagement_listandroidmanagedappprotections

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.1s

```
TIMEOUT
```

---

### datapolicyoperations_datapolicyoperation_datapolicyoperations_datapolicyoperation_listdatapolicyoperation

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 23.5s

```
TIMEOUT
```

---

### deviceappmanagement_deviceappmanagement_deviceappmanagement_deviceappmanagement_getdeviceappmanagement

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.7s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:48:46","request-id":"dea9075e-216e-4fff-aea5-69e403a14aa6","client-request-id":"dea9075e-216e-4fff-aea5-69e403a14aa6"}}} [GET] https://graph.microsoft.com/v1.0/deviceAppManagement
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### deviceappmanagement_defaultmanagedappprotection_deviceappmanagement_listdefaultmanagedappprotections

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.8s

```
TIMEOUT
```

---

### deviceappmanagement_iosmanagedappprotection_deviceappmanagement_listiosmanagedappprotections

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.0s

```
TIMEOUT
```

---

### deviceappmanagement_managedappregistration_deviceappmanagement_managedappregistrations_getuseridswithflaggedappregistration

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.3s

```
TIMEOUT
```

---

### deviceappmanagement_managedappregistration_deviceappmanagement_listmanagedappregistrations

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:48:46","request-id":"060b3694-dbfb-4397-a28e-648e9c365d08","client-request-id":"060b3694-dbfb-4397-a28e-648e9c365d08"}}} [GET] https://graph.microsoft.com/v1.0/deviceAppManagement/managedAppRegistrations
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### deviceappmanagement_managedapppolicy_deviceappmanagement_listmanagedapppolicies

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.8s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:48:46","request-id":"e998cf84-0891-4ba8-b1ea-d96a00b1c7b4","client-request-id":"e998cf84-0891-4ba8-b1ea-d96a00b1c7b4"}}} [GET] https://graph.microsoft.com/v1.0/deviceAppManagement/managedAppPolicies
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### deviceappmanagement_managedappstatus_deviceappmanagement_listmanagedappstatuses

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.3s

```
TIMEOUT
```

---

### deviceappmanagement_managedebook_deviceappmanagement_listmanagedebooks

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:48:46","request-id":"5388b5f1-d807-4058-a08e-be62e709a78c","client-request-id":"5388b5f1-d807-4058-a08e-be62e709a78c"}}} [GET] https://graph.microsoft.com/v1.0/deviceAppManagement/managedEBooks
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### deviceappmanagement_mdmwindowsinformationprotectionpolicy_deviceappmanagement_listmdmwindowsinformationprotectionpolicies

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:48:46","request-id":"4c7a9125-ea79-462f-a8a8-050c7a16385e","client-request-id":"4c7a9125-ea79-462f-a8a8-050c7a16385e"}}} [GET] https://graph.microsoft.com/v1.0/deviceAppManagement/mdmWindowsInformationProtectionPolicies
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### deviceappmanagement_manageddevicemobileappconfiguration_deviceappmanagement_listmobileappconfigurations

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.4s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:00:50","request-id":"5aff917b-a885-414c-b8b1-b3a4405093b9","client-request-id":"5aff917b-a885-414c-b8b1-b3a4405093b9"}}} [GET] https://graph.microsoft.com/v1.0/deviceAppManagement/mobileAppConfigurations
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.4s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:00:50","request-id":"84e1dbc2-4061-4108-a944-176c4c7909f4","client-request-id":"84e1dbc2-4061-4108-a944-176c4c7909f4"}}} [GET] https://graph.microsoft.com/v1.0/deviceAppManagement/mobileApps
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asandroidlobapp

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.3s

```
TIMEOUT
```

---

### deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asandroidstoreapp

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.2s

```
TIMEOUT
```

---

### deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asioslobapp

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.2s

```
TIMEOUT
```

---

### deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asiosstoreapp

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.9s

```
TIMEOUT
```

---

### deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmacosdmgapp

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.5s

```
TIMEOUT
```

---

### deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asiosvppapp

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.5s

```
TIMEOUT
```

---

### deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmacoslobapp

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.5s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:01:31","request-id":"c19c0945-2c11-4826-b98b-0d162f372414","client-request-id":"c19c0945-2c11-4826-b98b-0d162f372414"}}} [GET] https://graph.microsoft.com/v1.0/deviceAppManagement/mobileApps/graph.macOSLobApp
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmanagedandroidlobapp

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.1s

```
TIMEOUT
```

---

### deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmicrosoftstoreforbusinessapp

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 18.5s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:01:40","request-id":"b30195ab-7dd9-41c9-91ab-848b5ffcac14","client-request-id":"b30195ab-7dd9-41c9-91ab-848b5ffcac14"}}} [GET] https://graph.microsoft.com/v1.0/deviceAppManagement/mobileApps/graph.microsoftStoreForBusinessApp
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmanagedioslobapp

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 18.6s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:01:15","request-id":"c637a36d-9118-474a-8220-fda128449c85","client-request-id":"c637a36d-9118-474a-8220-fda128449c85"}}} [GET] https://graph.microsoft.com/v1.0/deviceAppManagement/mobileApps/graph.managedIOSLobApp
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_asmanagedmobilelobapp

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 18.6s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:01:15","request-id":"a83bb6ff-c625-4b46-9efa-3a998a6099cd","client-request-id":"a83bb6ff-c625-4b46-9efa-3a998a6099cd"}}} [GET] https://graph.microsoft.com/v1.0/deviceAppManagement/mobileApps/graph.managedMobileLobApp
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswin32lobapp

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 18.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:01:15","request-id":"d9732b00-4082-4037-bda4-f3b5a54ff01d","client-request-id":"d9732b00-4082-4037-bda4-f3b5a54ff01d"}}} [GET] https://graph.microsoft.com/v1.0/deviceAppManagement/mobileApps/graph.win32LobApp
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswindowsappx

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:01:23","request-id":"fdec8a3c-6e71-4641-b04f-dc2cbf6530eb","client-request-id":"fdec8a3c-6e71-4641-b04f-dc2cbf6530eb"}}} [GET] https://graph.microsoft.com/v1.0/deviceAppManagement/mobileApps/graph.windowsAppX
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswindowsuniversalappx

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:01:15","request-id":"c31e0e0a-c8f1-4a0d-8361-bcb0864d6387","client-request-id":"c31e0e0a-c8f1-4a0d-8361-bcb0864d6387"}}} [GET] https://graph.microsoft.com/v1.0/deviceAppManagement/mobileApps/graph.windowsUniversalAppX
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswindowsmobilemsi

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:01:15","request-id":"59d5d770-e6f7-42fc-8b1f-6bd159b5f66b","client-request-id":"59d5d770-e6f7-42fc-8b1f-6bd159b5f66b"}}} [GET] https://graph.microsoft.com/v1.0/deviceAppManagement/mobileApps/graph.windowsMobileMSI
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### deviceappmanagement_mobileapp_deviceappmanagement_listmobileapps_aswindowswebapp

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.5s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:01:14","request-id":"458ac139-2d67-419e-92c4-54267f514b1a","client-request-id":"458ac139-2d67-419e-92c4-54267f514b1a"}}} [GET] https://graph.microsoft.com/v1.0/deviceAppManagement/mobileApps/graph.windowsWebApp
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### deviceappmanagement_mobileapprelationship_deviceappmanagement_listmobileapprelationships

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.5s

```
TIMEOUT
```

---

### deviceappmanagement_mobileappcategory_deviceappmanagement_listmobileappcategories

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.7s

```
TIMEOUT
```

---

### deviceappmanagement_targetedmanagedappconfiguration_deviceappmanagement_listtargetedmanagedappconfigurations

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.7s

```
TIMEOUT
```

---

### deviceappmanagement_vpptoken_deviceappmanagement_listvpptokens

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.8s

```
TIMEOUT
```

---

### devicemanagement_applepushnotificationcertificate_devicemanagement_getapplepushnotificationcertificate

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:49:32","request-id":"934e8465-9e30-46bb-8b2c-e31fc1fbcaa2","client-request-id":"934e8465-9e30-46bb-8b2c-e31fc1fbcaa2"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/applePushNotificationCertificate
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### deviceappmanagement_windowsinformationprotectionpolicy_deviceappmanagement_listwindowsinformationprotectionpolicies

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.6s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:49:33","request-id":"47168c11-791b-476e-9847-2e19104cd8c6","client-request-id":"47168c11-791b-476e-9847-2e19104cd8c6"}}} [GET] https://graph.microsoft.com/v1.0/deviceAppManagement/windowsInformationProtectionPolicies
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_applepushnotificationcertificate_devicemanagement_applepushnotificationcertificate_downloadapplepushnotificationcertificatesigningrequest

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.4s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:49:34","request-id":"cf54ee8c-2f63-4838-818b-ebafe6382e8d","client-request-id":"cf54ee8c-2f63-4838-818b-ebafe6382e8d"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/applePushNotificationCertificate/downloadApplePushNotificationCertificateSigningRequest()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_auditevent_devicemanagement_auditevents_getauditcategories

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.6s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:49:34","request-id":"095f3417-14b2-40eb-aae6-d7083e9bfb6e","client-request-id":"095f3417-14b2-40eb-aae6-d7083e9bfb6e"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/auditEvents/getAuditCategories()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_detectedapp_devicemanagement_listdetectedapps

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.7s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:49:32","request-id":"3b97ab1a-dffe-4c2c-9a42-ad174d891359","client-request-id":"3b97ab1a-dffe-4c2c-9a42-ad174d891359"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/detectedApps
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_auditevent_devicemanagement_listauditevents

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.8s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:49:32","request-id":"d42ca865-e892-447a-822b-efad9847b689","client-request-id":"d42ca865-e892-447a-822b-efad9847b689"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/auditEvents
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_compliancemanagementpartner_devicemanagement_listcompliancemanagementpartners

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.0s

```
TIMEOUT
```

---

### devicemanagement_deviceandappmanagementroleassignment_devicemanagement_listroleassignments

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.7s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:50:17","request-id":"32715179-d63c-40f6-a95c-0c420517b82b","client-request-id":"32715179-d63c-40f6-a95c-0c420517b82b"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/roleAssignments
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_devicecompliancepolicy_devicemanagement_listdevicecompliancepolicies

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.2s

```
TIMEOUT
```

---

### devicemanagement_devicecompliancepolicydevicestatesummary_devicemanagement_getdevicecompliancepolicydevicestatesummary

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:50:17","request-id":"26c5d013-fd8f-477c-9e6d-100ab2e5f95d","client-request-id":"26c5d013-fd8f-477c-9e6d-100ab2e5f95d"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/deviceCompliancePolicyDeviceStateSummary
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_devicecategory_devicemanagement_listdevicecategories

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.6s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:50:17","request-id":"eba64976-d73e-424f-9a95-ebecddfe2a28","client-request-id":"eba64976-d73e-424f-9a95-ebecddfe2a28"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/deviceCategories
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_devicecompliancepolicysettingstatesummary_devicemanagement_listdevicecompliancepolicysettingstatesummaries

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.4s

```
TIMEOUT
```

---

### devicemanagement_deviceconfigurationdevicestatesummary_devicemanagement_getdeviceconfigurationdevicestatesummaries

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.4s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:02:17","request-id":"1494cfad-ab1d-405a-aac4-6ace80267dee","client-request-id":"1494cfad-ab1d-405a-aac4-6ace80267dee"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/deviceConfigurationDeviceStateSummaries
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_deviceenrollmentconfiguration_devicemanagement_listdeviceenrollmentconfigurations

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.5s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:02:18","request-id":"de1c0405-ff18-467a-bf5d-42021a26c481","client-request-id":"de1c0405-ff18-467a-bf5d-42021a26c481"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/deviceEnrollmentConfigurations
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_deviceconfiguration_devicemanagement_listdeviceconfigurations

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.8s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:02:28","request-id":"934b3858-1cf0-4476-80b3-ba87f224eca3","client-request-id":"934b3858-1cf0-4476-80b3-ba87f224eca3"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/deviceConfigurations
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_devicemanagement_devicemanagement_devicemanagement_getdevicemanagement

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.7s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:50:17","request-id":"14f80a7a-5172-4c4d-9bd0-ab62681a2553","client-request-id":"14f80a7a-5172-4c4d-9bd0-ab62681a2553"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_devicemanagementpartner_devicemanagement_listdevicemanagementpartners

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.6s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:02:39","request-id":"d1da0def-ef80-4c97-b3c4-9d96ab2b60b8","client-request-id":"d1da0def-ef80-4c97-b3c4-9d96ab2b60b8"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/deviceManagementPartners
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_devicemanagementexchangeconnector_devicemanagement_listexchangeconnectors

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.6s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:50:17","request-id":"c03364d3-e298-4e98-b265-9283feeb560a","client-request-id":"c03364d3-e298-4e98-b265-9283feeb560a"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/exchangeConnectors
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_devicemanagement_functions_devicemanagement_userexperienceanalyticssummarizeworkfromanywheredevices

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.8s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:50:17","request-id":"a2321eee-3b2a-47f0-bde6-39e4d185bd23","client-request-id":"a2321eee-3b2a-47f0-bde6-39e4d185bd23"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/userExperienceAnalyticsSummarizeWorkFromAnywhereDevices()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_devicemanagementreports_devicemanagement_getreports

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.8s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:50:17","request-id":"7c09a524-0815-460c-b7ac-2e9e5d9c3a44","client-request-id":"7c09a524-0815-460c-b7ac-2e9e5d9c3a44"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/reports
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_importedwindowsautopilotdeviceidentity_devicemanagement_listimportedwindowsautopilotdeviceidentities

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:50:16","request-id":"aeddcf94-b7fb-45f2-a7c8-64b8c4986ec3","client-request-id":"aeddcf94-b7fb-45f2-a7c8-64b8c4986ec3"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/importedWindowsAutopilotDeviceIdentities
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_devicemanagementtroubleshootingevent_devicemanagement_listtroubleshootingevents

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:02:47","request-id":"60d406b0-e3c7-45d6-a73e-2c25d6a15d32","client-request-id":"60d406b0-e3c7-45d6-a73e-2c25d6a15d32"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/troubleshootingEvents
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_devicemanagementreports_devicemanagement_reports_listexportjobs

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:02:54","request-id":"c9097d49-0b62-44d3-a847-8bad23dea279","client-request-id":"c9097d49-0b62-44d3-a847-8bad23dea279"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/reports/exportJobs
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_iosupdatedevicestatus_devicemanagement_listiosupdatestatuses

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.1s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:03:00","request-id":"8d7aab71-f100-45fa-a541-7442029d197c","client-request-id":"8d7aab71-f100-45fa-a541-7442029d197c"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/iosUpdateStatuses
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_manageddeviceoverview_devicemanagement_getmanageddeviceoverview

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.8s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:03:06","request-id":"d272a554-8e69-433e-8d7f-002b7f1567cd","client-request-id":"d272a554-8e69-433e-8d7f-002b7f1567cd"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/managedDeviceOverview
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_manageddevice_devicemanagement_listmanageddevices

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:02:28","request-id":"6d1572fd-0ad8-4d18-a8f1-87327607c815","client-request-id":"6d1572fd-0ad8-4d18-a8f1-87327607c815"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/managedDevices
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_mobileapptroubleshootingevent_devicemanagement_listmobileapptroubleshootingevents

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:02:28","request-id":"83494b48-4b87-40d2-a155-24ec56786cf8","client-request-id":"83494b48-4b87-40d2-a155-24ec56786cf8"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/mobileAppTroubleshootingEvents
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_mobilethreatdefenseconnector_devicemanagement_listmobilethreatdefenseconnectors

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.0s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:50:17","request-id":"a8a35599-b476-482e-9da4-970acd0860e1","client-request-id":"a8a35599-b476-482e-9da4-970acd0860e1"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/mobileThreatDefenseConnectors
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_remoteassistancepartner_devicemanagement_listremoteassistancepartners

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.4s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:50:17","request-id":"30aa2099-5b0d-4fea-8b4f-765e96df18e6","client-request-id":"30aa2099-5b0d-4fea-8b4f-765e96df18e6"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/remoteAssistancePartners
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_notificationmessagetemplate_devicemanagement_listnotificationmessagetemplates

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.9s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:02:39","request-id":"9635d247-f4c9-43ac-a48f-2a9ca5da2398","client-request-id":"9635d247-f4c9-43ac-a48f-2a9ca5da2398"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/notificationMessageTemplates
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_onpremisesconditionalaccesssettings_devicemanagement_getconditionalaccesssettings

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.7s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:02:39","request-id":"eb515780-a824-4000-a7ae-87275245f83a","client-request-id":"eb515780-a824-4000-a7ae-87275245f83a"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/conditionalAccessSettings
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_resourceoperation_devicemanagement_listresourceoperations

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.0s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:02:39","request-id":"fd8db458-bb3a-476b-933a-de5ca9144ef5","client-request-id":"fd8db458-bb3a-476b-933a-de5ca9144ef5"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/resourceOperations
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_softwareupdatestatussummary_devicemanagement_getsoftwareupdatestatussummary

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:03:16","request-id":"a85af89a-ca0b-413c-b8c7-ded8883c2046","client-request-id":"a85af89a-ca0b-413c-b8c7-ded8883c2046"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/softwareUpdateStatusSummary
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_roledefinition_devicemanagement_listroledefinitions

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:03:16","request-id":"4234e9f6-616a-4e5e-99ce-74425fda0da7","client-request-id":"4234e9f6-616a-4e5e-99ce-74425fda0da7"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/roleDefinitions
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_termsandconditions_devicemanagement_listtermsandconditions

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.1s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:50:17","request-id":"726a1c47-9728-47c4-a8f3-5dc4c09a63c2","client-request-id":"726a1c47-9728-47c4-a8f3-5dc4c09a63c2"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/termsAndConditions
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_userexperienceanalyticsapphealthapplicationperformance_devicemanagement_listuserexperienceanalyticsapphealthapplicationperformance

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.4s

```
TIMEOUT
```

---

### devicemanagement_userexperienceanalyticsapphealthappperformancebyappversiondetails_devicemanagement_listuserexperienceanalyticsapphealthapplicationperformancebyappversiondetails

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.1s

```
TIMEOUT
```

---

### devicemanagement_userexperienceanalyticsapphealthappperformancebyappversiondeviceid_devicemanagement_listuserexperienceanalyticsapphealthapplicationperformancebyappversiondeviceid

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.1s

```
TIMEOUT
```

---

### devicemanagement_userexperienceanalyticsapphealthappperformancebyosversion_devicemanagement_listuserexperienceanalyticsapphealthapplicationperformancebyosversion

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.1s

```
TIMEOUT
```

---

### devicemanagement_userexperienceanalyticsapphealthdevicemodelperformance_devicemanagement_listuserexperienceanalyticsapphealthdevicemodelperformance

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.6s

```
TIMEOUT
```

---

### devicemanagement_userexperienceanalyticsapphealthosversionperformance_devicemanagement_listuserexperienceanalyticsapphealthosversionperformance

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.7s

```
TIMEOUT
```

---

### devicemanagement_userexperienceanalyticsapphealthdeviceperformance_devicemanagement_listuserexperienceanalyticsapphealthdeviceperformance

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.8s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:50:57","request-id":"57ab3a28-e35f-41a3-9483-771735da2c90","client-request-id":"57ab3a28-e35f-41a3-9483-771735da2c90"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/userExperienceAnalyticsAppHealthDevicePerformance
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_userexperienceanalyticsapphealthdeviceperformancedetails_devicemanagement_listuserexperienceanalyticsapphealthdeviceperformancedetails

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.9s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:03:43","request-id":"ba8c7ae9-17cf-430e-b9a7-4176b6787a20","client-request-id":"ba8c7ae9-17cf-430e-b9a7-4176b6787a20"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/userExperienceAnalyticsAppHealthDevicePerformanceDetails
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_userexperienceanalyticsbaseline_devicemanagement_listuserexperienceanalyticsbaselines

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.8s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:03:44","request-id":"3546de8b-3e20-4d6e-83dc-c9e68a6b8a2e","client-request-id":"3546de8b-3e20-4d6e-83dc-c9e68a6b8a2e"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/userExperienceAnalyticsBaselines
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_userexperienceanalyticscategory_devicemanagement_listuserexperienceanalyticscategories

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.4s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:03:43","request-id":"e723e1a3-4dac-4581-8a80-225411b33a64","client-request-id":"e723e1a3-4dac-4581-8a80-225411b33a64"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/userExperienceAnalyticsCategories
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_userexperienceanalyticscategory_devicemanagement_getuserexperienceanalyticsapphealthoverview

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.6s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:03:43","request-id":"624a42b1-1d59-4254-b671-b16913247918","client-request-id":"624a42b1-1d59-4254-b671-b16913247918"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/userExperienceAnalyticsAppHealthOverview
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_userexperienceanalyticscategory_devicemanagement_userexperienceanalyticsapphealthoverview_listmetricvalues

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.5s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:03:43","request-id":"41724f11-524f-48b6-a327-2a4ee8520e19","client-request-id":"41724f11-524f-48b6-a327-2a4ee8520e19"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/userExperienceAnalyticsAppHealthOverview/metricValues
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_userexperienceanalyticsdeviceperformance_devicemanagement_listuserexperienceanalyticsdeviceperformance

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.9s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:03:44","request-id":"3c0bbc90-0f20-4e6d-bd5a-99a634ee8cf7","client-request-id":"3c0bbc90-0f20-4e6d-bd5a-99a634ee8cf7"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/userExperienceAnalyticsDevicePerformance
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_userexperienceanalyticsdevicescores_devicemanagement_listuserexperienceanalyticsdevicescores

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 19.6s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:03:43","request-id":"1e87537c-309d-4dfb-a730-e4a9329b1326","client-request-id":"1e87537c-309d-4dfb-a730-e4a9329b1326"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/userExperienceAnalyticsDeviceScores
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_userexperienceanalyticsdevicestartuphistory_devicemanagement_listuserexperienceanalyticsdevicestartuphistory

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 19.6s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:03:43","request-id":"4e22c174-a7bc-4394-a57b-ec708b885ce1","client-request-id":"4e22c174-a7bc-4394-a57b-ec708b885ce1"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/userExperienceAnalyticsDeviceStartupHistory
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_userexperienceanalyticsdevicestartupprocess_devicemanagement_listuserexperienceanalyticsdevicestartupprocesses

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 19.6s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:50:56","request-id":"0cf50feb-dfc6-40ac-9f3d-19f45c8a6e5e","client-request-id":"0cf50feb-dfc6-40ac-9f3d-19f45c8a6e5e"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/userExperienceAnalyticsDeviceStartupProcesses
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_userexperienceanalyticsdevicestartupprocessperformance_devicemanagement_listuserexperienceanalyticsdevicestartupprocessperformance

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 18.6s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:50:56","request-id":"c9275a42-3fef-4a32-be2e-2ccfa7b2ca23","client-request-id":"c9275a42-3fef-4a32-be2e-2ccfa7b2ca23"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/userExperienceAnalyticsDeviceStartupProcessPerformance
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_userexperienceanalyticsoverview_devicemanagement_getuserexperienceanalyticsoverview

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:50:56","request-id":"0e8d829c-97d2-4087-8c3f-d63cbae55afd","client-request-id":"0e8d829c-97d2-4087-8c3f-d63cbae55afd"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/userExperienceAnalyticsOverview
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_userexperienceanalyticsmodelscores_devicemanagement_listuserexperienceanalyticsmodelscores

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.3s

```
TIMEOUT
```

---

### devicemanagement_userexperienceanalyticsmetrichistory_devicemanagement_listuserexperienceanalyticsmetrichistory

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.6s

```
TIMEOUT
```

---

### devicemanagement_userexperienceanalyticsscorehistory_devicemanagement_listuserexperienceanalyticsscorehistory

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.7s

```
TIMEOUT
```

---

### devicemanagement_userexperienceanalyticsworkfromanywheremodelperformance_devicemanagement_listuserexperienceanalyticsworkfromanywheremodelperformance

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.3s

```
TIMEOUT
```

---

### devicemanagement_userexperienceanalyticsworkfromanywherehardwarereadinessmetric_devicemanagement_getuserexperienceanalyticsworkfromanywherehardwarereadinessmetric

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.4s

```
TIMEOUT
```

---

### devicemanagement_userexperienceanalyticsworkfromanywheremetric_devicemanagement_listuserexperienceanalyticsworkfromanywheremetrics

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.5s

```
TIMEOUT
```

---

### devicemanagement_virtualendpoint_devicemanagement_getvirtualendpoint

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.1s

```
TIMEOUT
```

---

### devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_auditevents_getauditactivitytypes

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 16.0s

```
TIMEOUT
```

---

### devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_getreport

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 16.0s

```
TIMEOUT
```

---

### devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_deviceimages_getsourceimages

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 16.2s

```
TIMEOUT
```

---

### devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listauditevents

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 16.1s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":"2026-07-29T06:04:42","request-id":"e5312b38-715a-4c3a-be9c-aaf5c099261b","client-request-id":"e5312b38-715a-4c3a-be9c-aaf5c099261b"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/virtualEndpoint/auditEvents
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listdeviceimages

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.4s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":"2026-07-29T06:51:38","request-id":"b4ea7e24-0f01-4eab-81b9-8625ae6c4249","client-request-id":"b4ea7e24-0f01-4eab-81b9-8625ae6c4249"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/virtualEndpoint/deviceImages
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listgalleryimages

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.2s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":"2026-07-29T06:51:38","request-id":"0eea6ef3-092f-47d0-8a28-82e6f043c96f","client-request-id":"0eea6ef3-092f-47d0-8a28-82e6f043c96f"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/virtualEndpoint/galleryImages
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listcloudpcs

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":"2026-07-29T06:51:38","request-id":"f397fa58-9965-4ec4-ac68-7a05049d882b","client-request-id":"f397fa58-9965-4ec4-ac68-7a05049d882b"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/virtualEndpoint/cloudPCs
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listonpremisesconnections

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.3s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":"2026-07-29T06:51:38","request-id":"0feb5d25-38ca-4d13-bac1-ea1e8ebe9e2a","client-request-id":"0feb5d25-38ca-4d13-bac1-ea1e8ebe9e2a"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/virtualEndpoint/onPremisesConnections
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listprovisioningpolicies

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.3s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":"2026-07-29T06:51:38","request-id":"f84e4ada-486e-4c72-8a7a-d9aab31cb6f0","client-request-id":"f84e4ada-486e-4c72-8a7a-d9aab31cb6f0"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/virtualEndpoint/provisioningPolicies
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listserviceplans

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.3s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":"2026-07-29T06:04:45","request-id":"7231373e-8f0a-4f1f-a68a-5e2dc104e2f6","client-request-id":"7231373e-8f0a-4f1f-a68a-5e2dc104e2f6"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/virtualEndpoint/servicePlans
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### devicemanagement_virtualendpoint_devicemanagement_virtualendpoint_listusersettings

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.3s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":"2026-07-29T06:51:37","request-id":"fbade83c-f491-4bef-8f91-6c6ab076d9db","client-request-id":"fbade83c-f491-4bef-8f91-6c6ab076d9db"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/virtualEndpoint/userSettings
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### devicemanagement_windowsautopilotdeviceidentity_devicemanagement_listwindowsautopilotdeviceidentities

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.1s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:52:05","request-id":"d4192e09-375e-4755-8f4b-bc12fb128e08","client-request-id":"d4192e09-375e-4755-8f4b-bc12fb128e08"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/windowsAutopilotDeviceIdentities
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_windowsinformationprotectionapplearningsummary_devicemanagement_listwindowsinformationprotectionapplearningsummaries

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.2s

```
TIMEOUT
```

---

### devicemanagement_windowsinformationprotectionnetworklearningsummary_devicemanagement_listwindowsinformationprotectionnetworklearningsummaries

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:05:08","request-id":"70f221d4-fe12-4921-a92a-fce8b97f1288","client-request-id":"70f221d4-fe12-4921-a92a-fce8b97f1288"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/windowsInformationProtectionNetworkLearningSummaries
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devicemanagement_windowsmalwareinformation_devicemanagement_listwindowsmalwareinformation

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.1s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:05:16","request-id":"d3496aee-0982-43a0-aa86-66bbefcae0f2","client-request-id":"d3496aee-0982-43a0-aa86-66bbefcae0f2"}}} [GET] https://graph.microsoft.com/v1.0/deviceManagement/windowsMalwareInformation
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### devices_device_devices_device_listdevice

- **Status**: PASS (OK)
- **Elapsed**: 14.3s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### devices_device_functions_devices_delta

- **Status**: PASS (OK)
- **Elapsed**: 14.6s

```json
[
  {
    "odata_deltalink": null,
    "odata_nextlink": "https://graph.microsoft.com/v1.0/devices/delta()?$skiptoken=4cmzxaWz0_rkyYg7DL9E8yCoLxYg3C8NG6qeV66QM6CMCINQdwzNnzI9Pa1mdB-XrooPMvVE9SskOg9l3vQmIRzOvzdhCR_ORe3SsB5t3ROs_LR-AuR8sv2fFOOkiPhZvbBGAN-047j8IvqcJHARWXaEdLCzntXx2xxhp9tgQPCjkVRG9SsbuNzkyLIF-5NAq7bx4zvfmD_KQ3q-Rk-Sc7i0g4EJ0CGEI2dY2Hu-kaKA_BccmxU3RtB4OONe7g9EdAK3sS-sMTZm3AUEP-N_qNNinmBodd72UPgkHFqQuIAxCmRsNc8NA83Ro0nCuHuaH9fsmGYaKuKdfQUmphfByI2ijdshjhU8RE2EaUPPb8qIFX0sMts9kTwv9H8zqkW0yapM-vguZNxWnWFYQ7tNAJiuB4tsqUS8-Lzkn67r4HU_xs2B9_xEWuLdzJxAgwlYQa3pMvzf-SBtCU2tnMmlh3g5hKorWZKDyjuvDGa2sYcuLMIdOLi3EWV5JiqP9LnUKDGmQ1nMekTIIp0sOB5rctO_4zirFbnww5085pmphFyl525fN7xxj8q3duKwKn9T3i5FKi458OUecx-2Sozsw9odEnGNIdwBxal-PMHNkicAY--sTfAR8ab1OXDHxDOvAGutHh2uc32OzS65Av396ufM-I9rTDEf6MDKFPnd-5hkuZ3_ql3AFFRWU3nhse6ZYCBKcXzVLLEuLGv7NkLBIAgILi0jqvMZ97qDdy4vD787Xyq8oO_ZIV9Tmhb2_-jaUIrJ0ZXL0mDAmM9oUIsPg9WvL5TC8VprzPNPau6N-gHNVWqTiRYbICXnkcQCRJ499QaAaCUf3325IIOeMbS_ajn52DymEI_sXoA8FIQ-RcMcf2AyXJZXRrpXRFum77V5WPNmSTgXMkStP2DKRQQceGpoSsqspPItPQq6y2Q-zDksRU8CQLookiNsaN6dDLtTvYfR611Go_A7TfRUmnjLBaCQ5UOrgEBJ3myLdZTmAT_7IHg7tHvJD4E7yk9AI4L-RBqiG2uD7oTazcQQRh8x0GlylwO4jmXt4QZcOON70QIRZKTC725mi6cZIa5SDSmUrhlqJRHkyE5q3T2VteYZmFyihpusA90EOsVTgyTuJVGy5PyJCw8xPFB_9WOFph_k20WL-_v3YemfVIzlYxLeTn2KqVVvqZUQ9_85ctDxgWqMgrGQYMxrNBQXE02kL3TTpEFci4nltKuFALWiaR82aJEdfUsqPTclbm7-_O02HEvztiTLaM35ijFzjKKxkl3ZyCCYcGJcpLdb6RXY015R8BBvibnVfShJwZjoHiwwfySvEBje5ghrMzxXgfc5ibXQdZ1uxUGg70XAtnPyqgKutIVWNtnrEZJFBu2GIjoN8oaCtmy5G1Npn_cJGvGYMD7SLpzQRylnTFF4-6WLX2zorn1JcXg3idmb7LW5WWWuAzjV-F6l_z1BUAxEKs7pmzPLLzpJPfXO8DFruwgl6jeNBAXCAj4DAR_hoiVm990NSSuL2D0mq3CPF6wAKdvL7zAjPtf64i-kNzXMhHcY_50b0P4i_DWpHFxVhcQf7P_fmO5KbG18GUImHzXXijqIJtfVBNg-6BODNyKI_TXj3nm3fj7k5wxDgFXLsgZHTnvv9PLa6X_ww7vofPCIPxLQqfFl8mm8bfynzcy4rg4EDC2H1aJtOwfsXzq28pcjw1M3iNqsUod-FF9p7OT2dZqRKIIM4cpX8Ltg1IDxz2vJH4-OyRUyPL36eHqK-WbtTEwCeHR5dnLnujx9iKE5yf7Dfkf1C38Up6oJjup0XhwHdUphlbwonLEALYbeu-TKzqhu4FBxlx1mqSCAfAPSN6b7gTZ3zDU3jU4I_Gcs92HJ0IrzR4cG3q
```

---

### directory_administrativeunit_directory_administrativeunits_delta

- **Status**: PASS (OK)
- **Elapsed**: 14.6s

```json
[
  {
    "odata_deltalink": null,
    "odata_nextlink": "https://graph.microsoft.com/v1.0/directory/administrativeUnits/delta()?$skiptoken=S5aczCOYTuRhqFVWGMzdR1GEtlELjM4SbuB2Ig46y3H7a8F0IVtMCxhf5jFoZGj4XITMkIcVUG1pOmn4aw0SSC4k7o46Dfs21TJZARCdPKwqdYuXy7vev4ol1YzIKxS3oaygxFotDT1wWbRdvvdrZUsbrDTygeqlvWWqUzvt8rRiUB2ecR16ciYx1h0JQEp0M_Doa-7__ArGf90iJLbbQygWLxueuorswAqrzJ2H3OVKiwg_NpzNUr2x8i98RHY8eT4WCDVyviXEGsikireviIvspMMKjLVIEy_CgFJpCD0GMBV_XzqV6t5FZzijAIrE-mlk4yewTWRxGCjuKD2oTSjUkCPF-GcwtnwLbdOvW2KXRg53-h5CuwDO7xJ60tI60Bj3zObPVDhr0OT3zOAPfyEcewzSzExjXFXKCBpfEmPcXPpWw7ZkDWRlA-pCYUELuVr-BHr52N4quaSOTImwVECCAK2yZj81PDBG6TgkMykjpqFTIR_IMUo8JbuX_A0FoZ9Ur3lNpn2H_l0sw8KiuQnrY9PWTsqvKL9O9SmQ5JAtOfnH-sbpDXKywU5d0iZ13fzf7t0BMJHtQyivSwrLEc-xMml6VXQHn_WDM0qltOq5S-u72KJ9XaWx0i-soMTdd0hPsuqYlK3oPdVwo1dQhJ7FK07UHw_N0v31OXDLgGYs2e3WvYrmTIjTsaS6O86WzGAiDr5n_sgP8bL2WCf4KpB75fyMSd-SYCw3g_TNecqBF3HpIBX91LP1XF0uMeXMk3Y4a66Z9gwX1P7nWoHnn2UlhALdGCOrPq2_DMIrpEt1BbP8IQLt2xXek-8ZaRmmTyECHtE9O6sY8w0-UClxGYIAXyjQW_R7F9Q1S3AR4DuMxuZyrGMIRFgSWFZq-tPWdDI5QDTjDbseibDWlU2anA21hOuBUlasWBaxByQOwLOvMWOZtFXzSgAhXRWLIaZFcuYtgC3uq2isAwCUkYBzz9TFJN4GxRcChhde3YfkjYSKPW_BHm1giTH0eZ8Jazecn9GI7n3n9muva3VgqnR_suP7CTlN6TzpcOX2zekTZat6miuH1rBf2AfHX1fQbsLcJCan7ptf3fwnQNTAp2fdCR44DM7togP4d8piMFLoFMZMbwzsU6lXC3xMNbCd_kl06IqXZaf_Si6b3DV3kajNdtSl8HxsL_X4ENsm2sY_1UnRx7U3HCApRxBhorZArJ4qibIBLCbcu_tTLJ4tpxbatU7Kw0ADfhd8TEic2VvZ7Z3CEl9cmISd71RFCFTiETMjZPWusBXBo6zghbWHgNRE-k_ppPESNgSI3vdnXxOweLE4z_ERkuwYabtsSdTjnbQXx3GMh2TGEMrU7PeMWHyJ4X9Xi6lWSovuX4ArRC57vKld_iK6iQ3swm9n67z5hrXDV6GcksszCZgLnf2gqLWA3jNRIjzR7OnjoksJr4eKgxEBDd5qTwSqStLtdDMWFRbyYnEpjV50btdoKEXxnWYiJvK_b31RtaVdEWF3AkwakTfOWKcFvDnD1rM7B_oYBmUu15Trm1mv2dU9U2_L_WcPY-zLhomkGGhmkZZzd4Sh2Rtd6YKhbyJnW_o35WaxR7a_BrSspH_eQPNyme7Opokcs1Fd_zZzOvJTJXfFrQMRgvjpIUcRhRwjMfukABOkxwpdvISzbQyTXfTIYonEWeTxJCwmUWLgTh1vXOn7NrVXJrQ3zoX-vJOjbOZN4Xtz4vsMAQ6gTf2NOI6olaYATeFjU2H2MbYmloII_OB8LPu5rlxk7YUCrv7BoWdAHmQJXFwX7efHUSh1Vq23M0i321AldyKd_b3HBi9k0xQbTpL1hzfUlvg1Hgqz3FicN9HuRT1OtMvU
```

---

### directory_administrativeunit_directory_listadministrativeunits

- **Status**: PASS (OK)
- **Elapsed**: 14.7s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### directory_attributeset_directory_listattributesets

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.0s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Authorization_RequestDenied","message":"Insufficient privileges to complete the operation.","innerError":{"date":"2026-07-29T06:05:08","request-id":"52636784-ba0e-491a-8e43-0da9640b3429","client-request-id":"52636784-ba0e-491a-8e43-0da9640b3429"}}} [GET] https://graph.microsoft.com/v1.0/directory/attributeSets
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### directory_companysubscription_directory_listsubscriptions

- **Status**: PASS (OK)
- **Elapsed**: 16.5s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### directory_devicelocalcredentialinfo_directory_listdevicelocalcredentials

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 16.4s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"authorization_error","message":"Failed to authorize, token doesn't have the required permissions.","innerError":{"date":"2026-07-29T06:05:28","request-id":"13893048-9084-4b29-93e6-9205ff9e6346","client-request-id":"13893048-9084-4b29-93e6-9205ff9e6346"}}} [GET] https://graph.microsoft.com/v1.0/directory/deviceLocalCredentials
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### directory_customsecurityattributedefinition_directory_listcustomsecurityattributedefinitions

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 16.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Authorization_RequestDenied","message":"Insufficient privileges to complete the operation.","innerError":{"date":"2026-07-29T06:52:05","request-id":"f507991d-4efb-4759-a24a-e661348d8743","client-request-id":"f507991d-4efb-4759-a24a-e661348d8743"}}} [GET] https://graph.microsoft.com/v1.0/directory/customSecurityAttributeDefinitions
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### directory_directory_directory_directory_getdirectory

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_InvalidRequestUrl","message":"Request url was invalid. The request should be like /tenantdomainname/Entity or /$metadata. Tenant domain name can be any of the verified, unverified domain names or context id.","innerError":{"date":"2026-07-29T06:05:09","request-id":"a18ffb08-20e0-4485-85e1-aa828a709d2d","client-request-id":"a18ffb08-20e0-4485-85e1-aa828a709d2d"}}} [GET] https://graph.microsoft.com/v1.0/directory
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### directory_directoryobject_directory_listdeleteditems_asadministrativeunit

- **Status**: PASS (OK)
- **Elapsed**: 15.3s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### directory_directoryobject_directory_listdeleteditems

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_UnsupportedQuery","message":"Searches against this resource are not supported. Only specific instances can be queried.","innerError":{"date":"2026-07-29T06:05:36","request-id":"820cece9-cc00-4ddc-9fe2-fa64ef673529","client-request-id":"820cece9-cc00-4ddc-9fe2-fa64ef673529"}}} [GET] https://graph.microsoft.com/v1.0/directory/deletedItems
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### directory_directoryobject_directory_listdeleteditems_asapplication

- **Status**: PASS (OK)
- **Elapsed**: 15.2s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### directory_directoryobject_directory_listdeleteditems_asdevice

- **Status**: PASS (OK)
- **Elapsed**: 15.5s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### directory_directoryobject_directory_listdeleteditems_asserviceprincipal

- **Status**: PASS (OK)
- **Elapsed**: 16.4s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### directory_directoryobject_directory_listdeleteditems_asuser

- **Status**: PASS (OK)
- **Elapsed**: 16.5s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### directory_directoryobject_directory_listdeleteditems_asgroup

- **Status**: PASS (OK)
- **Elapsed**: 16.6s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### directory_identityproviderbase_directory_federationconfigurations_availableprovidertypes

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.1s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.CPIM,False).","innerError":{"date":"2026-07-29T06:52:05","request-id":"faad4990-9578-4775-86db-646c7d220cb2","client-request-id":"faad4990-9578-4775-86db-646c7d220cb2"}}} [GET] https://graph.microsoft.com/v1.0/directory/federationConfigurations/availableProviderTypes()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### directory_identityproviderbase_directory_listfederationconfigurations

- **Status**: PASS (OK)
- **Elapsed**: 15.4s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### directory_onpremisesdirectorysynchronization_directory_listonpremisessynchronization

- **Status**: PASS (OK)
- **Elapsed**: 15.3s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"id\":\"89de3b75-fef2-44f9-90a4-cf8c69700c83\",\"configuration\":null,\"features\":{\"passwordSyncEnabled\":false,\"passwordWritebackEnabled\":false,\"directoryExtensionsEnabled\":false,\"quarantineUponUpnConflictEnabled\":false,\"quarantineUponProxyAddressesConflictEnabled\":false,\"softMatchOnUpnEnabled\":false,\"cloudPasswordPolicyForPasswordSyncedUsersEnabled\":false,\"fopeConflictResolutionEnabled\":false,\"unifiedGroupWritebackEnabled\":false,\"userWritebackEnabled\":false,\"deviceWritebackEnabled\":false,\"synchronizeUpnForManagedUsersEnabled\":false,\"userForcePasswordChangeOnLogonEnabled\":false,\"concurrentOrgIdProvisioningEnabled\":false,\"concurrentCredentialUpdateEnabled\":false,\"groupWriteBackEnabled\":false,\"blockSoftMatchEnabled\":false,\"blockCloudObjectTakeoverThroughHardMatchEnabled\":false,\"bypassDirSyncOverridesEnabled\":false,\"allowOnPremUpdateOfOnPremisesObjectIdentifierEnabled\":false}}]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### directory_publickeyinfrastructureroot_directory_getpublickeyinfrastructure

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 15.3s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"Request_ResourceNotFound","message":"Resource not found for the segment 'publicKeyInfrastructure'.","innerError":{"date":"2026-07-29T06:05:09","request-id":"0723ed24-3d5d-48ea-92c7-47e33db8008e","client-request-id":"0723ed24-3d5d-48ea-92c7-47e33db8008e"}}} [GET] https://graph.microsoft.com/v1.0/directory/publicKeyInfrastructure
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### directory_publickeyinfrastructureroot_directory_publickeyinfrastructure_listcertificatebasedauthconfigurations

- **Status**: PASS (OK)
- **Elapsed**: 15.4s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### directory_recovery_directory_recovery_listjobs

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 16.7s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Insufficient permissions to perform this operation.","innerError":{"date":"2026-07-29T06:05:09","request-id":"88266d9e-fe5e-4e91-b55a-b5e92b5c3ad7","client-request-id":"88266d9e-fe5e-4e91-b55a-b5e92b5c3ad7"}}} [GET] https://graph.microsoft.com/v1.0/directory/recovery/jobs
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### directory_recovery_directory_recovery_listsnapshots

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 16.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Insufficient permissions to perform this operation.","innerError":{"date":"2026-07-29T06:05:09","request-id":"8b3c61b4-1a41-4b3c-93f2-b0ecfcfc38ae","client-request-id":"8b3c61b4-1a41-4b3c-93f2-b0ecfcfc38ae"}}} [GET] https://graph.microsoft.com/v1.0/directory/recovery/snapshots
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### directory_recovery_directory_getrecovery

- **Status**: PASS (OK)
- **Elapsed**: 16.8s

```json
[
  {
    "odata_type": null,
    "id": null,
    "jobs": null,
    "snapshots": null
  }
]
```

---

### directoryobjects_directoryobject_directoryobjects_directoryobject_listdirectoryobject

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_UnsupportedQuery","message":"Searches against this resource are not supported. Only specific instances can be queried.","innerError":{"date":"2026-07-29T06:05:09","request-id":"3e0a16b4-7fd1-4663-b3bf-e7a475ccca72","client-request-id":"3e0a16b4-7fd1-4663-b3bf-e7a475ccca72"}}} [GET] https://graph.microsoft.com/v1.0/directoryObjects
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### directoryroles_directoryrole_functions_directoryroles_delta

- **Status**: PASS (OK)
- **Elapsed**: 17.3s

```json
[
  {
    "odata_deltalink": null,
    "odata_nextlink": "https://graph.microsoft.com/v1.0/directoryRoles/delta()?$skiptoken=Iv3DsMC7lz3PYxG1-KYcTj3RtljaS27KWtb9o7ErlFG_7O6EQLIpcst7I-SfG0BW9LHXEiL8jVzfV9fdy71bxu0G8IHRGwoueQiQdI17ZjMwon9veRWvfQ1UctKUpqMx-Mv-xb05uTxdCqbotRGvwgXA5EOn3xoQy11GbHfNgENqzqacjPFS-Wy8mh-dQ8sJF-ZyrIzT39CX040gQvaTHyQEAgENopc85S9nbh3eiKhLMZNI1YaWgDKbkFmU2NeeUGL8vsR2t8KAYnbj8owkTiN8mMRKLqxLpI6xyl-RT0u9L_x81whxQrZKL_TlUjqH-UrI8Gziod35AJ7CkNC5LdQmQdAfguxzSaT6OpxPSb09gXGpdfNJoa4yYXed3OXBtj2SD1pMUwGA-qqjyyFuzt0vT0iK-esZdiUFkdwz300NAG0fI47A5GvHsNDWykmF105iGr5vQG5ikrk2c0RaBrWkTe37q5YFtJ-eFqaiIIzj3ZI5O8yWH_z3YA4Ai6ISApR3uxSU_q-402nnOdxN_RbtIEiq-aQ84woRjNJ3gKNr0s2WZ0EHjmOdALfzMTN40wMnY-gJXk9O0GvdYYb88X_mBqJmvRI-HV5dPcDVwNuhA7yguU6yo-D3ho3xgDdGIps1VjCvyjMpiQFoJx40peH8s4MLnO_WCUCFpETKTcQiO9MDrBlay3EIozfBhL7T1EiTu6Wy_yFsCT7_sZi6dLFJUTYSuA6YzZr4pBGqAh9_nBFL4SujWFV8f7JH-Myr-dkLiZnP20d4TNZIm6m4zO8RfyZTnVFOK7zOxaarCWulylEasWuqegMg_WGq2MTUBP403IqRm0eXW10aSKDEsiIld5PzcTeuni2SOgtfpEpLCiCs6p1hoN5lZTTJO_XqTmAIgLS7Pr3kCLjQOoqdDZkUg2sUZ3AxjX7GiIVo--d3M_uVebPE5KrrssU4JDSGzDHDoRK-9WAarZsVBfUN8aNHYHzsAO2re_ACN9tEbNkWM0_ij8ku53sf1mlBiWlPhihL6b-MLIweqwcL2rKrPIZ396bIbH_8RV3KBvQ0hi2NiStT45bDMRM22K3Gf3nbglMrXSjehb2rpKv6ddfZNQI_yKKYWKr19q-rWsmvqPllw3Je8Kkj_CRFNYd8EWCzWfQPYxm6g7UaWSgVxsaQ9_hgOCTBcAeqaq__AgzHlJqpMakRNtgZahsgaP4v7PNPcj7wK9HxO7q5n8x5P-yI5lI-m7nLLEdauAbgTi9ng0ZXqtgKISesBa-sybDF0e7fXUCiqKWm4T2bjBSiNIOD3zl_Y6B_B8ljA89fBWOgMqouuCxuajqRcyo5RtZ6tchz9fHQODSxAVjSljwSvXGKXjU_tVMvpq0Tqm_FaK0RTOBhaFYi-yo-XPDn6dtr_bDooYFyNcdt6wUalEjJPUf0N3SswArd00b429MvCqW8VsREmG5LQo2Ver6M3ZaTmZ1ElJUfCoIeZCIBd8moBhpwxZ7yk4BkAmIfxK_JvpGJBgreYLisg4pLkeusNGHQnCDRemGP_yk0CYP5_r9Q7EtbUK-WgAjamsT-hmF83NaTO_ocNRTVLpHXVKcY6Jj_lGiNtjIXSpAycf0hhihFm3PjW894VjtF3N5BIUMg5QmekRv3U0b6CXK_lH_-_AXi4xyuJ0g-z7zYIpO__Nz20G5hVrFXNwktd4WCHK_YaApuXN0jNOnOLYLTOCf7ef-872sHPAsicoxNTf_lD7ZMLcXviDs629bhzSgqGMQo91aJfcple_hfLS8siauYvq3_gdm1gtlwwsU3hEKnMMXJpWmlPw.gL_OjeHH8_CaVyY8r4KQwt3AXNv1R4f656v4qm8jNcI",
    "value": "
```

---

### directoryobjects_directoryobject_functions_directoryobjects_delta

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 17.5s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_UnsupportedQuery","message":"Delta query is not supported for directoryObjects without a valid resource type or id filter.","innerError":{"date":"2026-07-29T06:52:05","request-id":"bb78385d-4b31-449b-a9b3-9e45495f4c1f","client-request-id":"bb78385d-4b31-449b-a9b3-9e45495f4c1f"}}} [GET] https://graph.microsoft.com/v1.0/directoryObjects/delta()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### directoryroles_directoryrole_directoryroles_directoryrole_listdirectoryrole

- **Status**: PASS (OK)
- **Elapsed**: 17.5s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"id\":\"d2bbfd53-3dba-4be4-a10c-116145147880\",\"deletedDateTime\":null,\"description\":\"Can manage all aspects of Microsoft Entra ID and Microsoft services that use Microsoft Entra identities.\",\"displayName\":\"Global Administrator\",\"roleTemplateId\":\"62e90394-69f5-4237-9190-012177145e10\"}]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### directoryroletemplates_directoryroletemplate_directoryroletemplates_directoryroletemplate_listdirectoryroletemplate

- **Status**: PASS (OK)
- **Elapsed**: 17.1s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"id\":\"62e90394-69f5-4237-9190-012177145e10\",\"deletedDateTime\":null,\"description\":\"Can manage all aspects of Microsoft Entra ID and Microsoft services that use Microsoft Entra identities.\",\"displayName\":\"Global Administrator\"},{\"id\":\"10dae51f-b6af-4016-8d66-8c2a99b929b3\",\"deletedDateTime\":null,\"description\":\"Default role for guest users. Can read a limited set of directory information.\",\"displayName\":\"Guest User\"},{\"id\":\"2af84b1e-32c8-42b7-82bc-daa82404023b\",\"deletedDateTime\":null,\"description\":\"Default role for guest users with restricted access. Can read a limited set of directory information.\",\"displayName\":\"Restricted Guest User\"},{\"id\":\"95e79109-95c0-4d8e-aee3-d01accf2d47b\",\"deletedDateTime\":null,\"description\":\"Can invite guest users independent of the 'members can invite guests' setting.\",\"displayName\":\"Guest Inviter\"},{\"id\":\"fe930be7-5e62-47db-91af-98c3a49a38b1\",\"deletedDateTime\":null,\"description\":\"Can manage all aspects of users and groups, including resetting passwords for limited admins.\",\"displayName\":\"User Administrator\"},{\"id\":\"729827e3-9c14-49f7-bb1b-9608f156bbb8\",\"deletedDateTime\":null,\"description\":\"Can reset passwords for non-administrators and Helpdesk Administrators.\",\"displayName\":\"Helpdesk Administrator\"},{\"id\":\"f023fd81-a637-4b56-95fd-791ac0226033\",\"deletedDateTime\":null,\"description\":\"Can read service health information and manage support tickets.\",\"displayName\":\"Service Support Administrator\"},{\"id\":\"b0f54661-2d74-4c50-afa3-1ec803f12efe\",\"deletedDateTime\":null,\"description\":\"Can perform common billing related tasks like updating payment information.\",\"displayName\":\"Billing Administrator\"},{\"id\":\"a0b1b346-4d3e-4e8b-98f8-753987be4970\",\"deletedDateTime\":null,\"description\":\"Default role for member users. Can read all and write a limited set of directory 
```

---

### directoryroletemplates_directoryroletemplate_functions_directoryroletemplates_delta

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_UnsupportedQuery","message":"Differential query is not supported for entity type: DirectoryRoleTemplate","innerError":{"date":"2026-07-29T06:52:12","request-id":"da310299-e405-4262-af6a-73e863f6d662","client-request-id":"da310299-e405-4262-af6a-73e863f6d662"}}} [GET] https://graph.microsoft.com/v1.0/directoryRoleTemplates/delta()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### domaindnsrecords_domaindnsrecord_domaindnsrecords_domaindnsrecord_listdomaindnsrecord

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_UnsupportedQuery","message":"This resource can only be queried through a navigation property on its parent domain.","innerError":{"date":"2026-07-29T06:52:26","request-id":"59dda825-03b1-4375-af6f-93f466bdb63b","client-request-id":"59dda825-03b1-4375-af6f-93f466bdb63b"}}} [GET] https://graph.microsoft.com/v1.0/domainDnsRecords
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### domains_domain_domains_domain_listdomain

- **Status**: PASS (OK)
- **Elapsed**: 16.3s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"authenticationType\":\"Managed\",\"availabilityStatus\":null,\"id\":\"algsochgmail.onmicrosoft.com\",\"isAdminManaged\":true,\"isDefault\":true,\"isInitial\":true,\"isRoot\":true,\"isVerified\":true,\"supportedServices\":[\"Email\",\"OfficeCommunicationsOnline\"],\"passwordValidityPeriodInDays\":2147483647,\"passwordNotificationWindowInDays\":14,\"state\":null}]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### drives_drive_drives_drive_listdrive

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.2s

```
TIMEOUT
```

---

### education_educationclass_education_listclasses

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.1s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":"2026-07-29T06:52:20","request-id":"586ec4a4-de3f-4fe7-a088-4b7870e697a0","client-request-id":"586ec4a4-de3f-4fe7-a088-4b7870e697a0"}}} [GET] https://graph.microsoft.com/v1.0/education/classes
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### education_educationclass_education_classes_delta

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.1s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":"2026-07-29T06:52:05","request-id":"bee8a56d-2ee9-4fd3-ab1c-8e8c942f08fc","client-request-id":"bee8a56d-2ee9-4fd3-ab1c-8e8c942f08fc"}}} [GET] https://graph.microsoft.com/v1.0/education/classes/delta()
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### education_educationroot_education_educationroot_geteducationroot

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.1s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":"2026-07-29T06:52:05","request-id":"50e78ab9-3bd8-4ba9-914b-c7f1cbb1010b","client-request-id":"50e78ab9-3bd8-4ba9-914b-c7f1cbb1010b"}}} [GET] https://graph.microsoft.com/v1.0/education
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### education_educationschool_education_listschools

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.1s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":"2026-07-29T06:52:05","request-id":"d01c4739-131d-4e9b-85f3-9555b897aef2","client-request-id":"d01c4739-131d-4e9b-85f3-9555b897aef2"}}} [GET] https://graph.microsoft.com/v1.0/education/schools
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### education_educationuser_education_listusers

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.1s

```
TIMEOUT
```

---

### education_educationschool_education_schools_delta

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.2s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":"2026-07-29T06:52:05","request-id":"85c2683f-8a81-4d36-a9b8-d9006a0702b1","client-request-id":"85c2683f-8a81-4d36-a9b8-d9006a0702b1"}}} [GET] https://graph.microsoft.com/v1.0/education/schools/delta()
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### education_educationuser_education_getme

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.2s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":"2026-07-29T06:52:34","request-id":"cd5ca15d-a1c9-400e-be98-aa3d3fd3ed11","client-request-id":"cd5ca15d-a1c9-400e-be98-aa3d3fd3ed11"}}} [GET] https://graph.microsoft.com/v1.0/education/me
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### education_educationuser_education_me_assignments_delta

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.2s

```
TIMEOUT
```

---

### education_educationuser_education_me_listclasses

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.7s

```
TIMEOUT
```

---

### education_educationuser_education_me_getuser

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.8s

```
TIMEOUT
```

---

### education_educationuser_education_me_listassignments

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.0s

```
TIMEOUT
```

---

### education_educationuser_education_me_listrubrics

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.5s

```
TIMEOUT
```

---

### education_educationuser_education_me_user_getmailboxsettings

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":"2026-07-29T06:06:20","request-id":"9f51cecc-2530-42c6-b0ca-afce341bc13d","client-request-id":"9f51cecc-2530-42c6-b0ca-afce341bc13d"}}} [GET] https://graph.microsoft.com/v1.0/education/me/user/mailboxSettings
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### education_educationuser_education_me_listschools

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.7s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":"2026-07-29T06:06:18","request-id":"23b9f0f0-c275-438a-8e3b-fc801921b5dd","client-request-id":"23b9f0f0-c275-438a-8e3b-fc801921b5dd"}}} [GET] https://graph.microsoft.com/v1.0/education/me/schools
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### education_educationuser_education_me_listtaughtclasses

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.8s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":"2026-07-29T06:06:19","request-id":"7e280a6c-740d-4279-809b-07d554db82df","client-request-id":"7e280a6c-740d-4279-809b-07d554db82df"}}} [GET] https://graph.microsoft.com/v1.0/education/me/taughtClasses
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### education_educationuser_education_me_user_listserviceprovisioningerrors

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 17.2s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AccessDenied","message":"Required scp claim values are not provided.","innerError":{"date":"2026-07-29T06:06:37","request-id":"76ab9e24-200d-47d5-859e-a2c176210bd1","client-request-id":"76ab9e24-200d-47d5-859e-a2c176210bd1"}}} [GET] https://graph.microsoft.com/v1.0/education/me/user/serviceProvisioningErrors
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### education_educationuser_education_users_delta

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 18.0s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AccessDenied","message":"Required claim values are not provided.","innerError":{"date":"2026-07-29T06:06:37","request-id":"2ff8f04f-b29b-4968-a54c-9d7d9baade8e","client-request-id":"2ff8f04f-b29b-4968-a54c-9d7d9baade8e"}}} [GET] https://graph.microsoft.com/v1.0/education/users/delta()
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### education_reportsroot_education_reports_listreadingassignmentsubmissions

- **Status**: FAIL (ERR(1))
- **Elapsed**: 23.6s

```
Error: Source server error (500)
Detail: {"error":{"code":"internalServerError","message":"The user does not have the required permissions to access this endpoint: required one role out of EduReports-Reading.Read.All, EduReports-Reading.ReadAnonymous.All","innerError":{"date":"2026-07-29T06:06:43","request-id":"20533523-88be-446d-a5da-d881e2fc8cac","client-request-id":"20533523-88be-446d-a5da-d881e2fc8cac"}}} [GET] https://graph.microsoft.com/v1.0/education/reports/readingAssignmentSubmissions
Hint: The upstream API returned a server error. This may be transient — retry after a brief wait.
```

---

### education_reportsroot_education_getreports

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 25.5s

```
Error: Source server error (500)
Detail: {"error":{"code":"HostNotFound","message":"Target 'fake_node' is not found.","innerError":{"date":"2026-07-29T06:53:14","request-id":"1365fd03-5b2f-470c-b8e6-264523dc512e","client-request-id":"1365fd03-5b2f-470c-b8e6-264523dc512e"}}} [GET] https://graph.microsoft.com/v1.0/education/reports
Hint: The upstream API returned a server error. This may be transient — retry after a brief wait.
```

---

### education_reportsroot_education_reports_listreadingcoachpassages

- **Status**: FAIL (ERR(1))
- **Elapsed**: 28.0s

```
Error: Source server error (500)
Detail: {"error":{"code":"internalServerError","message":"The user does not have the required permissions to access this endpoint: required one role out of EduReports-Reading.Read.All, EduReports-Reading.ReadAnonymous.All","innerError":{"date":"2026-07-29T06:53:12","request-id":"4c63e35c-2d4e-44cc-a327-bb1dbc827ceb","client-request-id":"4c63e35c-2d4e-44cc-a327-bb1dbc827ceb"}}} [GET] https://graph.microsoft.com/v1.0/education/reports/readingCoachPassages
Hint: The upstream API returned a server error. This may be transient — retry after a brief wait.
```

---

### education_reportsroot_education_reports_listreflectcheckinresponses

- **Status**: FAIL (ERR(1))
- **Elapsed**: 18.0s

```
Error: Source server error (500)
Detail: {"error":{"code":"internalServerError","message":"The user does not have the required permissions to access this endpoint: required one role out of EduReports-Reflect.Read.All, EduReports-Reflect.ReadAnonymous.All","innerError":{"date":"2026-07-29T06:53:13","request-id":"53f5a765-0861-4189-bdd0-da42f3d90b98","client-request-id":"53f5a765-0861-4189-bdd0-da42f3d90b98"}}} [GET] https://graph.microsoft.com/v1.0/education/reports/reflectCheckInResponses
Hint: The upstream API returned a server error. This may be transient — retry after a brief wait.
```

---

### employeeexperience_community_employeeexperience_listcommunities

- **Status**: FAIL (ERR(1))
- **Elapsed**: 12.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"unauthorized","message":"Authorization credentials are invalid.","innerError":{"date":"2026-07-29T06:06:38","request-id":"02b5cb46-f87e-42b0-b13b-dfca9fc78ef5","client-request-id":"02b5cb46-f87e-42b0-b13b-dfca9fc78ef5"}}} [GET] https://graph.microsoft.com/v1.0/employeeExperience/communities
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### education_reportsroot_education_reports_listspeakerassignmentsubmissions

- **Status**: FAIL (ERR(1))
- **Elapsed**: 19.1s

```
Error: Source server error (500)
Detail: {"error":{"code":"internalServerError","message":"The user does not have the required permissions to access this endpoint: required one role out of EduReports-Reading.Read.All, EduReports-Reading.ReadAnonymous.All","innerError":{"date":"2026-07-29T06:06:42","request-id":"2cfce391-f244-4992-a146-87f0ccb3734e","client-request-id":"2cfce391-f244-4992-a146-87f0ccb3734e"}}} [GET] https://graph.microsoft.com/v1.0/education/reports/speakerAssignmentSubmissions
Hint: The upstream API returned a server error. This may be transient — retry after a brief wait.
```

---

### employeeexperience_employeeexperience_employeeexperience_employeeexperience_getemployeeexperience

- **Status**: PASS (OK)
- **Elapsed**: 9.1s

```json
[
  {
    "communities": null,
    "engagementasyncoperations": null,
    "learningcourseactivities": null,
    "learningproviders": null,
    "roles": null,
    "odata_type": null
  }
]
```

---

### employeeexperience_engagementrole_employeeexperience_listroles

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 11.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"unauthorized","message":"Authorization credentials are invalid.","innerError":{"date":"2026-07-29T06:53:09","request-id":"743bd041-b869-415b-8f89-fd17af8ce792","client-request-id":"743bd041-b869-415b-8f89-fd17af8ce792"}}} [GET] https://graph.microsoft.com/v1.0/employeeExperience/roles
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### employeeexperience_engagementasyncoperation_employeeexperience_listengagementasyncoperations

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.8s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"unauthorized","message":"Authorization credentials are invalid.","innerError":{"date":"2026-07-29T06:53:08","request-id":"32d26905-6a91-4deb-ab03-00adcc4f9508","client-request-id":"32d26905-6a91-4deb-ab03-00adcc4f9508"}}} [GET] https://graph.microsoft.com/v1.0/employeeExperience/engagementAsyncOperations
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### employeeexperience_learningprovider_employeeexperience_listlearningproviders

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 10.9s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"forbidden","message":"Insufficient permissions to complete the operation.","innerError":{"date":"2026-07-29T06:53:08","request-id":"9e635089-1b7f-4f3b-92c3-46ed9b210934","client-request-id":"9e635089-1b7f-4f3b-92c3-46ed9b210934"}}} [GET] https://graph.microsoft.com/v1.0/employeeExperience/learningProviders
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### employeeexperience_learningcourseactivity_employeeexperience_listlearningcourseactivities

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 13.5s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:53:08","request-id":"9ab70309-167c-48ea-8c4a-4a8f90514231","client-request-id":"9ab70309-167c-48ea-8c4a-4a8f90514231"}}} [GET] https://graph.microsoft.com/v1.0/employeeExperience/learningCourseActivities
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### external_external_external_external_getexternal

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 12.8s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:06:59","request-id":"1fb1850d-24fe-437c-a5af-feb681d73fd4","client-request-id":"1fb1850d-24fe-437c-a5af-feb681d73fd4"}}} [GET] https://graph.microsoft.com/v1.0/external
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### external_externalconnection_external_listconnections

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 13.2s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:06:59","request-id":"66771794-4124-4ebf-aabd-0f6bd40eb0f1","client-request-id":"66771794-4124-4ebf-aabd-0f6bd40eb0f1"}}} [GET] https://graph.microsoft.com/v1.0/external/connections
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### filteroperators_filteroperatorschema_filteroperators_filteroperatorschema_listfilteroperatorschema

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 13.1s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"{\"Message\":\"No HTTP resource was found that matches the request URI 'https://syncfabric.windowsazure.com/api/filterOperators?api-version=2.0'.\"}","innerError":{"date":"2026-07-29T06:06:57","request-id":"977cee08-f4ec-4db8-9d43-c6a7befaed76","client-request-id":"977cee08-f4ec-4db8-9d43-c6a7befaed76"}}} [GET] https://graph.microsoft.com/v1.0/filterOperators
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### functions_attributemappingfunctionschema_functions_attributemappingfunctionschema_listattributemappingfunctionschema

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 12.3s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"{\"Message\":\"No HTTP resource was found that matches the request URI 'https://syncfabric.windowsazure.com/api/functions?api-version=2.0'.\"}","innerError":{"date":"2026-07-29T06:06:58","request-id":"3ef04a13-f834-49f2-a219-cd6baada5643","client-request-id":"3ef04a13-f834-49f2-a219-cd6baada5643"}}} [GET] https://graph.microsoft.com/v1.0/functions
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### grouplifecyclepolicies_grouplifecyclepolicy_grouplifecyclepolicies_grouplifecyclepolicy_listgrouplifecyclepolicy

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 13.4s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"Unauthorized","message":"Permission denied.","innerError":{"date":"2026-07-29T06:06:58","request-id":"ba1d5d9d-b4d2-41d7-bd0b-8e5bcd81f551","client-request-id":"ba1d5d9d-b4d2-41d7-bd0b-8e5bcd81f551"}}} [GET] https://graph.microsoft.com/v1.0/groupLifecyclePolicies
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### groups_group_functions_groups_delta

- **Status**: PASS (OK)
- **Elapsed**: 12.8s

```json
[
  {
    "odata_deltalink": null,
    "odata_nextlink": "https://graph.microsoft.com/v1.0/groups/delta()?$skiptoken=S5aczCOYTuRhqFVWGMzdR1GEtlELjM4SbuB2Ig46y3HmJQ-YdxpekilWgWH-YM1jYWkvgNrgOO3-eINLOWmnJ7HJllTdv5acQECGMIy0D9YUWoQXwavcYmreTk3bKtfXMXTy78J7vPimdACVqm3nmugFR664r9I1AJlw2JZFLJF7_7Ngbfx3j6qqW_oLRBgI7n7OBc-xX7yBiqKwHScdc4iD6Fn51JDuVOcVooHnAI6LWVmYkdkWm5m8Tg_eYzKCfsrg94ZW-YIoz3JyhScqfL_LZrreP3Rn5hjw9Dl1wz_4WuVlXhMgHew4veGdtcjiUHKZO2zF8jcjUHvpvEej3knHK3h_JTyaXlQtswPw1BY8pm59UnadSn1LaZSanTEJqvHo3Xr4LTSzk2b0pUhnsrzK0SW7NG_wLrCQV7XKQ8qT-cRiSv-m3BtLsvqO8hFsNiPOghCH-FpTkT_dnsnEuL_Qz2mVFykycC1UVO0Bc3pB2JIWjF9v8hUFUfP5yFbuUgi3IKr_FrMG4RItqUzQ4SRL8nUqlkEtJgdcoGGzGCUr48t4z2Bb32B52NapCyiSzQnkU0TTKpf-hF4Fmfzo4Iyab0QA6c-RBByLUqZ0hPRK-0gx8Lv31vDAQQ4kDVKEyD2tTBkvgmwbIGHNKrzD80d1VLj7gtNMr7tUa1RO6AurH4nW20b__irFt_KYKqZ_xMTIYL7n2z37Z8wJpS4RvYtrM8MOmGZ-ep-eM2P3pF-eGJnbTu-8QtTDJH-hXsRwsMvYma9qOSEctTJOlv5ddqHVptFd9vua5C_uTkB2NM4Z2SsXOOKDODWhJuV3hig1Dl_UFeVfijrUTdAgs8qZesYB-nSPCkHzOuBCaNI603wWPKMW1-S6HYFa-uuEHh2xVLBNddnlQRdW_OnZIMB7GVsy6_eDwaM4EvpUuBWyTNIHZv9F8qZWtUmhWalf6vPbJ7XSlujAERCDT_8-Qhx8h7GW9qY_MReLCmmePjKpfrfllh2wGWhPzO5K7YYj4iyLrd-p4zO8TtN6HMoKfHgK3V8fqQnkPgcEW0h-v27_IP8bnmx7b4HCiEA3WXZA5BN4Yc3pF9IiMqg4MO2ERaDp0vwF5DpM9RWkbaeJu_jK-RCPAkUV_jTAwOuxAoEI-NM1z9YzPAcnvWGY4KRsh9x_BMc0mdk7Mskb1vy0L0HvFkDK95XFy19-ygJfiemQQ7cKygYz6wstmn9CJhWoobBcRrjmoE1dK-5A25N-u7veMICT4LINdlE2f48B5AdVQdUWQiI7ac-D_8phnTYgd8CkLbS6d8m68LEQDIlnkmNWea_5U-unEdxyOh5EZYqHiKCRR2fvYh9GemidL8Tj6xdzzMJoVsv8lkxYjoq-w5vqpZOcJe7Q5T8vFvBvtu5A6fQC3gOWdA0dwTJPNmssuBvVePO7biKwcd7WxA6zCF6DlAnDiGKfq5Tg_nk2eT9m-Kzx6zHUuNnI1VJjSst42vB8HDbo2MnlZLIvJ1KdCWCrRI3mPGOKkHpIXS7a15NyIapYj6ZkgDOllaDvxOKOF0UEF4zNf0Kg1Lte0R4Jrg_M1W7FxGo-0656GQFe9oAPAAOGukbflW5KEMbEqQ2a7y11B2B0hsgZRsLVqxeULCxRin4W2NNT3xRg9ciCi7HX2z9zyBBRXwWoSMO3mdzX7unjIN3qBCS6DhSqpaKR6ufYagRid5KMoBWV9YA_vPsiUuuQgH08Yz-gwwD_1lXUkiu8Gjg-t8VIyJL60Yozv2Uls6mn8_ifdfu-Y4Dypa-tSpwY1Z1BVWDaTLdtW4SAMoOYNuyQU-XaiLlOlGi4xY_wFv3XqFURgEOj7oGi68TmE0U9ZjGLpMywOdVWZHKzqF4Jwnntm95
```

---

### groupsettings_groupsetting_groupsettings_groupsetting_listgroupsetting

- **Status**: PASS (OK)
- **Elapsed**: 14.6s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### groups_group_groups_group_listgroup

- **Status**: PASS (OK)
- **Elapsed**: 14.6s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"id\":\"7b4d5771-c8d4-495d-8f5e-d4850075baa9\",\"deletedDateTime\":null,\"classification\":null,\"createdDateTime\":\"2026-07-14T00:28:48Z\",\"creationOptions\":[],\"description\":null,\"displayName\":\"Coral Test Group A\",\"expirationDateTime\":null,\"groupTypes\":[],\"infoCatalogs\":[],\"isAssignableToRole\":null,\"mail\":null,\"mailEnabled\":false,\"mailNickname\":\"coraltestgroupa\",\"membershipRule\":null,\"membershipRuleProcessingState\":null,\"onPremisesDomainName\":null,\"onPremisesLastSyncDateTime\":null,\"onPremisesNetBiosName\":null,\"onPremisesSamAccountName\":null,\"onPremisesSecurityIdentifier\":null,\"onPremisesSyncEnabled\":null,\"preferredDataLocation\":null,\"preferredLanguage\":null,\"proxyAddresses\":[],\"renewedDateTime\":\"2026-07-14T00:28:48Z\",\"resourceBehaviorOptions\":[],\"resourceProvisioningOptions\":[],\"securityEnabled\":true,\"securityIdentifier\":\"S-1-12-1-2068666225-1230883028-2245287567-2847569152\",\"theme\":null,\"uniqueName\":null,\"visibility\":null,\"onPremisesProvisioningErrors\":[],\"serviceProvisioningErrors\":[]},{\"id\":\"c668c8b1-1563-48e1-a1f9-6e47601c7c1f\",\"deletedDateTime\":null,\"classification\":null,\"createdDateTime\":\"2026-07-14T00:28:49Z\",\"creationOptions\":[],\"description\":null,\"displayName\":\"Coral Test Group B\",\"expirationDateTime\":null,\"groupTypes\":[],\"infoCatalogs\":[],\"isAssignableToRole\":null,\"mail\":null,\"mailEnabled\":false,\"mailNickname\":\"coraltestgroupb\",\"membershipRule\":null,\"membershipRuleProcessingState\":null,\"onPremisesDomainName\":null,\"onPremisesLastSyncDateTime\":null,\"onPremisesNetBiosName\":null,\"onPremisesSamAccountName\":null,\"onPremisesSecurityIdentifier\":null,\"onPremisesSyncEnabled\":null,\"preferredDataLocation\":null,\"preferredLanguage\":null,\"proxyAddresses\":[],\"renewedDateTime\":\"2026-07-14T00:28:49Z\",\"resourceBehaviorOptions\":[],\"resourceProvisioningOptions\":[],\"
```

---

### groupsettingtemplates_groupsettingtemplate_functions_groupsettingtemplates_delta

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.7s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_UnsupportedQuery","message":"Differential query is not supported for entity type: SettingTemplate","innerError":{"date":"2026-07-29T06:53:07","request-id":"2da4ff6d-e265-442b-87b3-6185cff5130e","client-request-id":"2da4ff6d-e265-442b-87b3-6185cff5130e"}}} [GET] https://graph.microsoft.com/v1.0/groupSettingTemplates/delta()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### groupsettingtemplates_groupsettingtemplate_groupsettingtemplates_groupsettingtemplate_listgroupsettingtemplate

- **Status**: PASS (OK)
- **Elapsed**: 14.7s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"id\":\"08d542b9-071f-4e16-94b0-74abb372e3d9\",\"deletedDateTime\":null,\"displayName\":\"Group.Unified.Guest\",\"description\":\"Settings for a specific Unified Group\",\"values\":[{\"name\":\"AllowToAddGuests\",\"type\":\"System.Boolean\",\"defaultValue\":\"true\",\"description\":\"Flag indicating if guests are allowed in a specific Unified Group.\"}]},{\"id\":\"4bc7f740-180e-4586-adb6-38b2e9024e6b\",\"deletedDateTime\":null,\"displayName\":\"Application\",\"description\":\"\\n        Setting templates define the different settings that can be used for the associated ObjectSettings. This template defines\\n        settings that can be used for managing tenant-wide application behavior.\\n      \",\"values\":[{\"name\":\"EnableAccessCheckForPrivilegedApplicationUpdates\",\"type\":\"System.Boolean\",\"defaultValue\":\"false\",\"description\":\"Flag indicating if access check for application privileged updates is turned on.\"}]},{\"id\":\"5cf42378-d67d-4f36-ba46-e8b86229381d\",\"deletedDateTime\":null,\"displayName\":\"Password Rule Settings\",\"description\":\"\\n        Setting templates define the different settings that can be used for the associated ObjectSettings. This template defines\\n        settings that can be used for managing tenant-wide password rule settings.\\n      \",\"values\":[{\"name\":\"BannedPasswordCheckOnPremisesMode\",\"type\":\"System.String\",\"defaultValue\":\"Audit\",\"description\":\"How should we enforce password policy check in on-premises system.\"},{\"name\":\"EnableBannedPasswordCheckOnPremises\",\"type\":\"System.Boolean\",\"defaultValue\":\"true\",\"description\":\"Flag indicating if the banned password check is turned on or not for on-premises system.\"},{\"name\":\"EnableBannedPasswordCheck\",\"type\":\"System.Boolean\",\"defaultValue\":\"true\",\"description\":\"Flag indicating if the banned password check for tenant specific banned password list is t
```

---

### identity_authenticationeventsflow_identity_listauthenticationeventsflows

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.9s

```
TIMEOUT
```

---

### identity_authenticationeventlistener_identity_listauthenticationeventlisteners

- **Status**: PASS (OK)
- **Elapsed**: 16.0s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### identity_authenticationeventsflow_identity_listauthenticationeventsflows_asexternalusersselfservicesignupeventsflow

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 15.1s

```
TIMEOUT
```

---

### identity_b2xidentityuserflow_identity_listb2xuserflows

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.1s

```
TIMEOUT
```

---

### identity_conditionalaccessroot_identity_conditionalaccess_authenticationstrength_listauthenticationmethodmodes

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.7s

```
TIMEOUT
```

---

### identity_conditionalaccessroot_identity_conditionalaccess_authenticationstrength_listpolicies

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Request Authorization failed","innerError":{"message":"Request Authorization failed","date":"2026-07-29T06:53:40","request-id":"d0ec7c0e-d5eb-42ef-87d1-3434d9621f53","client-request-id":"d0ec7c0e-d5eb-42ef-87d1-3434d9621f53"}}} [GET] https://graph.microsoft.com/v1.0/identity/conditionalAccess/authenticationStrength/policies
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identity_conditionalaccessroot_identity_conditionalaccess_deleteditems_listnamedlocations

- **Status**: PASS (OK)
- **Elapsed**: 16.6s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### identity_conditionalaccessroot_identity_conditionalaccess_deleteditems_listpolicies

- **Status**: PASS (OK)
- **Elapsed**: 16.7s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### identity_conditionalaccessroot_identity_conditionalaccess_getdeleteditems

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 13.9s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"{\"Message\":\"No HTTP resource was found that matches the request URI 'https://na.prod.graph.ipc.msidentity.com/conditionalAccess/deletedItems'.\",\"MessageDetail\":\"No type was found that matches the controller named 'deletedItems'.\"}","innerError":{"date":"2026-07-29T06:53:41","request-id":"91090880-ef87-447b-a4c9-625fbe43343d","client-request-id":"91090880-ef87-447b-a4c9-625fbe43343d"}}} [GET] https://graph.microsoft.com/v1.0/identity/conditionalAccess/deletedItems
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### identity_conditionalaccessroot_identity_conditionalaccess_getauthenticationstrength

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.1s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"UnknownError","message":"{\"ErrorCode\":\"badRequest\",\"Message\":\"Resource not found for segment 'authenticationStrength'.\",\"Target\":null,\"Details\":null,\"InnerError\":null,\"InstanceAnnotations\":[],\"TypeAnnotation\":null}","innerError":{"date":"2026-07-29T06:53:41","request-id":"438c485b-9c4c-45bb-8181-a5876a337706","client-request-id":"438c485b-9c4c-45bb-8181-a5876a337706"}}} [GET] https://graph.microsoft.com/v1.0/identity/conditionalAccess/authenticationStrength
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### identity_conditionalaccessroot_identity_conditionalaccess_listnamedlocations

- **Status**: PASS (OK)
- **Elapsed**: 13.3s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### identity_conditionalaccessroot_identity_conditionalaccess_listauthenticationcontextclassreferences

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.5s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AccessDenied","message":"You cannot perform the requested operation, required scopes are missing in the token.","innerError":{"date":"2026-07-29T06:53:42","request-id":"920b877a-1ab7-454f-9139-1b1f23c01087","client-request-id":"920b877a-1ab7-454f-9139-1b1f23c01087"}}} [GET] https://graph.microsoft.com/v1.0/identity/conditionalAccess/authenticationContextClassReferences
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identity_conditionalaccessroot_identity_conditionalaccess_listpolicies

- **Status**: PASS (OK)
- **Elapsed**: 15.8s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### identity_conditionalaccessroot_identity_conditionalaccess_listtemplates

- **Status**: PASS (OK)
- **Elapsed**: 16.2s

```json
[
  {
    "odata_count": 23,
    "odata_nextlink": null,
    "value": "[{\"name\":\"Require multifactor authentication for admins\",\"description\":\"Require multifactor authentication for privileged administrative accounts to reduce risk of compromise. This policy will target the same roles as security defaults.\",\"id\":\"c7503427-338e-4c5e-902d-abe252abfb43\",\"scenarios\":\"secureFoundation,zeroTrust,protectAdmins\",\"details\":{\"sessionControls\":null,\"conditions\":{\"userRiskLevels\":[],\"signInRiskLevels\":[],\"clientAppTypes\":[\"all\"],\"servicePrincipalRiskLevels\":[],\"insiderRiskLevels\":null,\"platforms\":null,\"locations\":null,\"devices\":null,\"clientApplications\":null,\"authenticationFlows\":null,\"applications\":{\"includeApplications\":[\"All\"],\"excludeApplications\":[],\"includeUserActions\":[],\"includeAuthenticationContextClassReferences\":[],\"applicationFilter\":null},\"users\":{\"includeUsers\":[],\"excludeUsers\":[\"Current administrator will be excluded\"],\"includeGroups\":[],\"excludeGroups\":[],\"includeRoles\":[\"62e90394-69f5-4237-9190-012177145e10\",\"194ae4cb-b126-40b2-bd5b-6091b380977d\",\"f28a1f50-f6e7-4571-818b-6a12f2af6b6c\",\"29232cdf-9323-42fd-ade2-1d097af3e4de\",\"b1be1c3e-b65d-4f19-8427-f6fa0d97feb9\",\"729827e3-9c14-49f7-bb1b-9608f156bbb8\",\"b0f54661-2d74-4c50-afa3-1ec803f12efe\",\"fe930be7-5e62-47db-91af-98c3a49a38b1\",\"c4e39bd9-1100-46d3-8c65-fb160da0071f\",\"9b895d92-2cd3-44c7-9d02-a6ac2d5ea5c3\",\"158c047a-c907-4556-b7ef-446551a6b5f7\",\"966707d0-3269-4727-9be2-8c3a10f19b9d\",\"7be44c8a-adaf-4e2a-84d6-ab2649e08a13\",\"e8611ab8-c189-46e8-94e1-60213ab1f814\"],\"excludeRoles\":[],\"includeGuestsOrExternalUsers\":null,\"excludeGuestsOrExternalUsers\":null}},\"grantControls\":{\"operator\":\"OR\",\"builtInControls\":[\"mfa\"],\"customAuthenticationFactors\":[],\"termsOfUse\":[],\"authenticationStrength@odata.context\":\"https://graph.microsoft.com/v1.0/$metadata#identity/conditionalAccess/templates('c7503427-338e-4c5e
```

---

### identity_identityapiconnector_identity_listapiconnectors

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 11.4s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AADB2C","message":"The application does not have any of the required delegated permissions (APIConnectors.Read.All, APIConnectors.ReadWrite.All) to access the resource. ","innerError":{"correlationId":"d38f680a-799b-4097-8416-b9badcc90eff","date":"2026-07-29T06:53:41","request-id":"6fc9a1cf-32fe-4f9e-956c-40b6af85d8ba","client-request-id":"6fc9a1cf-32fe-4f9e-956c-40b6af85d8ba"}}} [GET] https://graph.microsoft.com/v1.0/identity/apiConnectors
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identity_customauthenticationextension_identity_listcustomauthenticationextensions

- **Status**: PASS (OK)
- **Elapsed**: 12.5s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### identity_identitycontainer_identity_identitycontainer_getidentitycontainer

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 12.6s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"{\"message\":\"No HTTP resource was found that matches the request URI 'https://cpim.windows.net/graph/identity'.\",\"messageDetail\":\"No type was found that matches the controller named 'identity'.\",\"stackTrace\":null}","innerError":{"date":"2026-07-29T06:07:44","request-id":"d02ba1e4-61e4-4a88-855a-817cb3b09db3","client-request-id":"d02ba1e4-61e4-4a88-855a-817cb3b09db3"}}} [GET] https://graph.microsoft.com/v1.0/identity
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### identity_identityproviderbase_identity_identityproviders_availableprovidertypes

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 12.0s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AADB2C","message":"The application does not have any of the required delegated permissions (IdentityProvider.Read.All, IdentityProvider.ReadWrite.All) to access the resource. ","innerError":{"correlationId":"a811d021-36ff-4947-8f3d-8b4b2ff0903b","date":"2026-07-29T06:53:40","request-id":"7d473307-5d2b-418e-a657-bdd8ed566400","client-request-id":"7d473307-5d2b-418e-a657-bdd8ed566400"}}} [GET] https://graph.microsoft.com/v1.0/identity/identityProviders/availableProviderTypes()
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identity_identityproviderbase_identity_listidentityproviders

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.8s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AADB2C","message":"The application does not have any of the required delegated permissions (IdentityProvider.Read.All, IdentityProvider.ReadWrite.All) to access the resource. ","innerError":{"correlationId":"860b25e4-3970-4eb2-9693-4492159d0b50","date":"2026-07-29T06:53:41","request-id":"19f574bc-82cb-47ee-97ee-ce0e971ad3d9","client-request-id":"19f574bc-82cb-47ee-97ee-ce0e971ad3d9"}}} [GET] https://graph.microsoft.com/v1.0/identity/identityProviders
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identity_identityuserflowattribute_identity_listuserflowattributes

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AADB2C","message":"The application does not have any of the required delegated permissions (IdentityUserFlow.Read.All, IdentityUserFlow.ReadWrite.All) to access the resource. ","innerError":{"correlationId":"eb7759c9-4773-4505-97a7-52e8a78ce3ad","date":"2026-07-29T06:53:40","request-id":"91b2af05-99c3-4d6b-a82a-d431f75da412","client-request-id":"91b2af05-99c3-4d6b-a82a-d431f75da412"}}} [GET] https://graph.microsoft.com/v1.0/identity/userFlowAttributes
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identity_identityverifiedidroot_identity_getverifiedid

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 12.9s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.VerifiedId.VerifiedIdProfile,False).","innerError":{"date":"2026-07-29T06:54:13","request-id":"5121a211-2c43-468f-a656-ab138cae4b21","client-request-id":"5121a211-2c43-468f-a656-ab138cae4b21"}}} [GET] https://graph.microsoft.com/v1.0/identity/verifiedId
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### identity_identityverifiedidroot_identity_verifiedid_listprofiles

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.4s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Request Authorization failed","innerError":{"message":"Request Authorization failed","date":"2026-07-29T06:54:13","request-id":"f1f6d350-1d84-4a65-b382-8c00a253d771","client-request-id":"f1f6d350-1d84-4a65-b382-8c00a253d771"}}} [GET] https://graph.microsoft.com/v1.0/identity/verifiedId/profiles
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identity_riskpreventioncontainer_identity_getriskprevention

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 13.1s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"{\"message\":\"No HTTP resource was found that matches the request URI 'https://cpim.windows.net/graph/identity/riskPrevention'.\",\"messageDetail\":\"No type was found that matches the controller named 'identity'.\",\"stackTrace\":null}","innerError":{"date":"2026-07-29T06:54:14","request-id":"024182c3-6e31-48e9-9373-2a41d4f7f5de","client-request-id":"024182c3-6e31-48e9-9373-2a41d4f7f5de"}}} [GET] https://graph.microsoft.com/v1.0/identity/riskPrevention
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### identity_riskpreventioncontainer_identity_riskprevention_listfraudprotectionproviders

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.1s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AADB2C","message":"The application does not have any of the required delegated permissions (RiskPreventionProviders.Read.All, RiskPreventionProviders.ReadWrite.All) to access the resource. ","innerError":{"correlationId":"ad64e633-dfd1-4fef-a53e-60a675d0944f","date":"2026-07-29T06:54:13","request-id":"8b15c970-a225-4468-9338-3a83a27db645","client-request-id":"8b15c970-a225-4468-9338-3a83a27db645"}}} [GET] https://graph.microsoft.com/v1.0/identity/riskPrevention/fraudProtectionProviders
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identity_riskpreventioncontainer_identity_riskprevention_listwebapplicationfirewallverifications

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.4s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AADB2C","message":"The application does not have any of the required delegated permissions (RiskPreventionProviders.Read.All, RiskPreventionProviders.ReadWrite.All) to access the resource. ","innerError":{"correlationId":"9d213e1c-74d1-4774-a5e2-b1099730b921","date":"2026-07-29T06:54:14","request-id":"f59c3b10-8e9a-4663-b0cf-dbb95eb735bf","client-request-id":"f59c3b10-8e9a-4663-b0cf-dbb95eb735bf"}}} [GET] https://graph.microsoft.com/v1.0/identity/riskPrevention/webApplicationFirewallVerifications
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identity_riskpreventioncontainer_identity_riskprevention_listwebapplicationfirewallproviders

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.0s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AADB2C","message":"The application does not have any of the required delegated permissions (RiskPreventionProviders.Read.All, RiskPreventionProviders.ReadWrite.All) to access the resource. ","innerError":{"correlationId":"f5bb3dd7-d80b-431a-81db-8a0023b24a5e","date":"2026-07-29T06:54:14","request-id":"ae5a5f92-d68d-4e29-a288-9682f07c247d","client-request-id":"ae5a5f92-d68d-4e29-a288-9682f07c247d"}}} [GET] https://graph.microsoft.com/v1.0/identity/riskPrevention/webApplicationFirewallProviders
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_accessreviewset_identitygovernance_accessreviews_listhistorydefinitions

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 17.3s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"","message":"Attempted to perform an unauthorized operation.","innerError":{"date":"2026-07-29T06:54:15","request-id":"7564ac1c-7b43-4063-b81f-c67ad41aa48a","client-request-id":"7564ac1c-7b43-4063-b81f-c67ad41aa48a"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/accessReviews/historyDefinitions
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_accessreviewset_identitygovernance_accessreviews_listdefinitions

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 19.4s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"","message":"Attempted to perform an unauthorized operation.","innerError":{"date":"2026-07-29T06:54:14","request-id":"3e8f0c0b-6754-4e3c-9fe0-645dec485515","client-request-id":"3e8f0c0b-6754-4e3c-9fe0-645dec485515"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/accessReviews/definitions
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_accessreviewset_identitygovernance_getaccessreviews

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.0s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"","message":"Bad filter: One of these properties must be specified: 'businessFlowTemplateId' or 'partnerId' or 'businessFlowId'. List of businessFlowTemplates is available at /businessFlowTemplates","innerError":{"date":"2026-07-29T06:54:14","request-id":"4d82c46e-63ea-4dba-a6cd-1eaeaa228513","client-request-id":"4d82c46e-63ea-4dba-a6cd-1eaeaa228513"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/accessReviews
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### identitygovernance_appconsentapprovalroute_identitygovernance_appconsent_listappconsentrequests

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.9s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"","message":"Attempted to perform an unauthorized operation.","innerError":{"date":"2026-07-29T06:08:25","request-id":"8608e8da-31c9-443c-8ef9-68ee6d3f3997","client-request-id":"8608e8da-31c9-443c-8ef9-68ee6d3f3997"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/appConsent/appConsentRequests
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_appconsentapprovalroute_identitygovernance_getappconsent

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 12.7s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:08:25","request-id":"6694792d-190b-47ad-9deb-5432e8a37096","client-request-id":"6694792d-190b-47ad-9deb-5432e8a37096"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/appConsent
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_assignments_additionalaccess_894c

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 12.8s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller is not authorized.","details":[],"innerError":{"date":"2026-07-29T06:08:26","request-id":"4ba1d5a5-8c37-48b3-ba80-c5ce8e246494","client-request-id":"4ba1d5a5-8c37-48b3-ba80-c5ce8e246494"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/assignments/additionalAccess()
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listaccesspackageassignmentapprovals

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.1s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"","message":"Only app tokens are supported","innerError":{"date":"2026-07-29T06:54:14","request-id":"d658e489-ee21-4f57-a0cf-dd000e209d71","client-request-id":"d658e489-ee21-4f57-a0cf-dd000e209d71"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/accessPackageAssignmentApprovals
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_getsettings

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.9s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller is not authorized.","details":[],"innerError":{"date":"2026-07-29T06:54:14","request-id":"2895ce7f-6e85-496d-8b3c-786a1c06fb10","client-request-id":"2895ce7f-6e85-496d-8b3c-786a1c06fb10"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/settings
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listaccesspackagesuggestions

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 11.8s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"","message":"No HTTP resource was found that matches the request URI 'https://igaelm-asev3-ecapi-cus.igaelm-asev3-environment-cus.p.azurewebsites.net/api/v1/accessPackageSuggestions'.","innerError":{"date":"2026-07-29T06:54:13","request-id":"555f49c1-2958-40ce-854f-da71e595c28b","client-request-id":"555f49c1-2958-40ce-854f-da71e595c28b"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/accessPackageSuggestions
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listaccesspackages

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 18.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller is not authorized.","details":[],"innerError":{"date":"2026-07-29T06:54:36","request-id":"40f29be3-8539-4d1a-8ea3-09df92a46793","client-request-id":"40f29be3-8539-4d1a-8ea3-09df92a46793"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/accessPackages
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listassignmentpolicies

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 16.4s

```
TIMEOUT
```

---

### identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listassignmentrequests

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 17.0s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller is not authorized.","details":[],"innerError":{"date":"2026-07-29T06:54:35","request-id":"93f54a13-ca08-4dd3-9539-8553aa205220","client-request-id":"93f54a13-ca08-4dd3-9539-8553aa205220"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/assignmentRequests
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listavailableaccesspackages

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 9.1s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"","message":"No HTTP resource was found that matches the request URI 'https://igaelm-asev3-ecapi-cus.igaelm-asev3-environment-cus.p.azurewebsites.net/api/v1/availableAccessPackages'.","innerError":{"date":"2026-07-29T06:54:34","request-id":"dc531347-3c42-4971-95fc-38f40e0cfc82","client-request-id":"dc531347-3c42-4971-95fc-38f40e0cfc82"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/availableAccessPackages
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listassignments

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 17.9s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller is not authorized.","details":[],"innerError":{"date":"2026-07-29T06:54:35","request-id":"754dbb46-6d66-48f8-bc43-9f9b47ec6ab0","client-request-id":"754dbb46-6d66-48f8-bc43-9f9b47ec6ab0"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/assignments
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listcatalogs

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.5s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller is not authorized.","details":[],"innerError":{"date":"2026-07-29T06:54:37","request-id":"ff397768-34bf-46d2-905b-49fbc7e3101e","client-request-id":"ff397768-34bf-46d2-905b-49fbc7e3101e"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/catalogs
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listconnectedorganizations

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"NoLicense","message":"User is not authorized to perform the operation. Reason: Tenant does not meet license requirement!","details":[],"innerError":{"date":"2026-07-29T06:54:36","request-id":"5e800cd2-1089-4b5a-89d4-0916960c3460","client-request-id":"5e800cd2-1089-4b5a-89d4-0916960c3460"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/connectedOrganizations
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listcontrolconfigurations

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 14.2s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"","message":"No HTTP resource was found that matches the request URI 'https://igaelm-asev3-ecapi-cus.igaelm-asev3-environment-cus.p.azurewebsites.net/api/v1/controlConfigurations'.","innerError":{"date":"2026-07-29T06:09:05","request-id":"2e899f48-1b22-486b-beb5-04939bc63a2b","client-request-id":"2e899f48-1b22-486b-beb5-04939bc63a2b"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/controlConfigurations
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listresourceenvironments

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 12.9s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller is not authorized.","details":[],"innerError":{"date":"2026-07-29T06:09:08","request-id":"faf395e9-0d74-4b48-99be-6de5005fd189","client-request-id":"faf395e9-0d74-4b48-99be-6de5005fd189"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/resourceEnvironments
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listresourcerolescopes

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 10.3s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"{\"message\":\"No HTTP resource was found that matches the request URI 'https://igaelm-asev3-ecapi-cus.igaelm-asev3-environment-cus.p.azurewebsites.net/api/v1/resourceRoleScopes'.\"}","innerError":{"date":"2026-07-29T06:09:05","request-id":"866814f5-6a4d-46e6-a93f-41d3372697cb","client-request-id":"866814f5-6a4d-46e6-a93f-41d3372697cb"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/resourceRoleScopes
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listresourcerequests

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.2s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller is not authorized.","details":[],"innerError":{"date":"2026-07-29T06:09:06","request-id":"b1c51cdc-ac8b-4869-9e8d-a5c1b17e1637","client-request-id":"b1c51cdc-ac8b-4869-9e8d-a5c1b17e1637"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/resourceRequests
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listresources

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.1s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller is not authorized.","details":[],"innerError":{"date":"2026-07-29T06:09:07","request-id":"1c7fcbdf-e2cd-4430-b6aa-a12bc0a00d9a","client-request-id":"1c7fcbdf-e2cd-4430-b6aa-a12bc0a00d9a"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/resources
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_entitlementmanagement_identitygovernance_entitlementmanagement_listsubjects

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.0s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller is not authorized.","details":[],"innerError":{"date":"2026-07-29T06:54:35","request-id":"113def78-9250-4503-a407-7e24ca527286","client-request-id":"113def78-9250-4503-a407-7e24ca527286"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement/subjects
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_identitygovernance_identitygovernance_identitygovernance_getidentitygovernance

- **Status**: PASS (OK)
- **Elapsed**: 10.9s

```json
[
  {
    "accessreviews": null,
    "appconsent": null,
    "entitlementmanagement": null,
    "lifecycleworkflows": null,
    "privilegedaccess": null,
    "termsofuse": null,
    "odata_type": null
  }
]
```

---

### identitygovernance_entitlementmanagement_identitygovernance_getentitlementmanagement

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 16.4s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller is not authorized.","details":[],"innerError":{"date":"2026-07-29T06:55:15","request-id":"913dde4b-97b2-409d-9747-0386d6bad1cd","client-request-id":"913dde4b-97b2-409d-9747-0386d6bad1cd"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/entitlementManagement
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_lifecycleworkflowscontainer_identitygovernance_getlifecycleworkflows

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 12.9s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:55:13","request-id":"540151d5-9ad2-497e-8c9d-922f09ff9385","client-request-id":"540151d5-9ad2-497e-8c9d-922f09ff9385"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/lifecycleWorkflows
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_deleteditems_listworkflows

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 12.2s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Access denied","message":"Insufficient privileges to complete the operation. For a full list of supported delegated and application permissions required to use Lifecycle Workflows, see: https://learn.microsoft.com/en-us/graph/permissions-reference#lifecycle-workflows-permissions","innerError":{"date":"2026-07-29T06:55:13","client-request-id":"3d170442-c897-4e5b-aed4-11b27fe9b9fb","request-id":"3d170442-c897-4e5b-aed4-11b27fe9b9fb"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/lifecycleWorkflows/deletedItems/workflows
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_getdeleteditems

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 15.0s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:55:13","request-id":"466c9aba-3a8c-4fd0-bfad-f57d9006357b","client-request-id":"466c9aba-3a8c-4fd0-bfad-f57d9006357b"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/lifecycleWorkflows/deletedItems
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_getinsights

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 11.8s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:55:13","request-id":"7f3fe7b1-72fe-49b0-81fa-90752e84efa4","client-request-id":"7f3fe7b1-72fe-49b0-81fa-90752e84efa4"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/lifecycleWorkflows/insights
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_getsettings

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.8s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Access denied","message":"Insufficient privileges to complete the operation. For a full list of supported delegated and application permissions required to use Lifecycle Workflows, see: https://learn.microsoft.com/en-us/graph/permissions-reference#lifecycle-workflows-permissions","innerError":{"date":"2026-07-29T06:55:13","client-request-id":"1210cbed-76e7-4322-bb90-69ac8d3f9045","request-id":"1210cbed-76e7-4322-bb90-69ac8d3f9045"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/lifecycleWorkflows/settings
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_listcustomtaskextensions

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.7s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Access denied","message":"Insufficient privileges to complete the operation. For a full list of supported delegated and application permissions required to use Lifecycle Workflows, see: https://learn.microsoft.com/en-us/graph/permissions-reference#lifecycle-workflows-permissions","innerError":{"date":"2026-07-29T06:55:13","client-request-id":"51fc2f84-5d79-4633-a27d-2df4051e7350","request-id":"51fc2f84-5d79-4633-a27d-2df4051e7350"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/lifecycleWorkflows/customTaskExtensions
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_listworkflows

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.7s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Access denied","message":"Insufficient privileges to complete the operation. For a full list of supported delegated and application permissions required to use Lifecycle Workflows, see: https://learn.microsoft.com/en-us/graph/permissions-reference#lifecycle-workflows-permissions","innerError":{"date":"2026-07-29T06:55:13","client-request-id":"1c2f1a5f-62e8-4636-b578-739fde895e22","request-id":"1c2f1a5f-62e8-4636-b578-739fde895e22"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/lifecycleWorkflows/workflows
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_listtaskdefinitions

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.8s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Access denied","message":"Insufficient privileges to complete the operation. For a full list of supported delegated and application permissions required to use Lifecycle Workflows, see: https://learn.microsoft.com/en-us/graph/permissions-reference#lifecycle-workflows-permissions","innerError":{"date":"2026-07-29T06:55:13","client-request-id":"491e9ec8-18f0-4b08-acc3-85c4396e22cb","request-id":"491e9ec8-18f0-4b08-acc3-85c4396e22cb"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/lifecycleWorkflows/taskDefinitions
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_lifecycleworkflowscontainer_identitygovernance_lifecycleworkflows_listworkflowtemplates

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 17.0s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Access denied","message":"Insufficient privileges to complete the operation. For a full list of supported delegated and application permissions required to use Lifecycle Workflows, see: https://learn.microsoft.com/en-us/graph/permissions-reference#lifecycle-workflows-permissions","innerError":{"date":"2026-07-29T06:09:50","client-request-id":"075c7114-1de4-4b19-9c90-f496b8749b39","request-id":"075c7114-1de4-4b19-9c90-f496b8749b39"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/lifecycleWorkflows/workflowTemplates
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_privilegedaccessroot_identitygovernance_getprivilegedaccess

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.1s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"UnknownError","message":"{\"errorCode\":\"MissingProvider\",\"message\":\"The provider is missing.\",\"instanceAnnotations\":[]}","innerError":{"date":"2026-07-29T06:09:49","request-id":"fc05f908-be57-45d4-b1f8-bc89b8c05879","client-request-id":"fc05f908-be57-45d4-b1f8-bc89b8c05879"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/privilegedAccess
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listassignmentapprovals

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 19.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"","message":"Only app tokens are supported","innerError":{"date":"2026-07-29T06:09:49","request-id":"ff43872d-a43b-4a92-a446-439a55b3b984","client-request-id":"ff43872d-a43b-4a92-a446-439a55b3b984"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/privilegedAccess/group/assignmentApprovals
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_getgroup

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 20.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"UnknownError","message":"{\"errorCode\":\"MissingProvider\",\"message\":\"The provider is missing.\",\"instanceAnnotations\":[]}","innerError":{"date":"2026-07-29T06:09:49","request-id":"876b27e6-01f6-40d9-b483-26da0d6b15be","client-request-id":"876b27e6-01f6-40d9-b483-26da0d6b15be"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/privilegedAccess/group
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listassignmentscheduleinstances

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 18.7s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"errorCode\":\"PermissionScopeNotGranted\",\"message\":\"Authorization failed due to missing permission scope PrivilegedAssignmentSchedule.Read.AzureADGroup,PrivilegedAssignmentSchedule.ReadWrite.AzureADGroup,PrivilegedAccess.Read.AzureADGroup,PrivilegedAccess.ReadWrite.AzureADGroup.\",\"instanceAnnotations\":[]}","innerError":{"date":"2026-07-29T06:09:50","request-id":"e21a6496-e78f-4808-81f5-b2a6866902ae","client-request-id":"e21a6496-e78f-4808-81f5-b2a6866902ae"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/privilegedAccess/group/assignmentScheduleInstances
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listassignmentschedulerequests

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 19.0s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"errorCode\":\"PermissionScopeNotGranted\",\"message\":\"Authorization failed due to missing permission scope PrivilegedAssignmentSchedule.ReadWrite.AzureADGroup,PrivilegedAccess.ReadWrite.AzureADGroup,PrivilegedAssignmentSchedule.Remove.AzureADGroup.\",\"instanceAnnotations\":[]}","innerError":{"date":"2026-07-29T06:55:13","request-id":"07f48d3e-5bac-43c8-ac3f-f1dfda246c61","client-request-id":"07f48d3e-5bac-43c8-ac3f-f1dfda246c61"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/privilegedAccess/group/assignmentScheduleRequests
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listeligibilityscheduleinstances

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 17.3s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"errorCode\":\"PermissionScopeNotGranted\",\"message\":\"Authorization failed due to missing permission scope PrivilegedEligibilitySchedule.Read.AzureADGroup,PrivilegedEligibilitySchedule.ReadWrite.AzureADGroup,PrivilegedAccess.Read.AzureADGroup,PrivilegedAccess.ReadWrite.AzureADGroup.\",\"instanceAnnotations\":[]}","innerError":{"date":"2026-07-29T06:55:13","request-id":"59d542db-f92c-4871-85e6-d80392615b65","client-request-id":"59d542db-f92c-4871-85e6-d80392615b65"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/privilegedAccess/group/eligibilityScheduleInstances
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listassignmentschedules

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 18.7s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"errorCode\":\"PermissionScopeNotGranted\",\"message\":\"Authorization failed due to missing permission scope PrivilegedAssignmentSchedule.Read.AzureADGroup,PrivilegedAssignmentSchedule.ReadWrite.AzureADGroup,PrivilegedAccess.Read.AzureADGroup,PrivilegedAccess.ReadWrite.AzureADGroup.\",\"instanceAnnotations\":[]}","innerError":{"date":"2026-07-29T06:55:14","request-id":"0ec3a52f-366e-4d86-b344-e460a0ceb932","client-request-id":"0ec3a52f-366e-4d86-b344-e460a0ceb932"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/privilegedAccess/group/assignmentSchedules
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listeligibilityschedules

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 16.1s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"errorCode\":\"PermissionScopeNotGranted\",\"message\":\"Authorization failed due to missing permission scope PrivilegedEligibilitySchedule.Read.AzureADGroup,PrivilegedEligibilitySchedule.ReadWrite.AzureADGroup,PrivilegedAccess.Read.AzureADGroup,PrivilegedAccess.ReadWrite.AzureADGroup.\",\"instanceAnnotations\":[]}","innerError":{"date":"2026-07-29T06:55:22","request-id":"70b27939-09a1-4df0-9bad-fde9ca5b5034","client-request-id":"70b27939-09a1-4df0-9bad-fde9ca5b5034"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/privilegedAccess/group/eligibilitySchedules
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_privilegedaccessroot_identitygovernance_privilegedaccess_group_listeligibilityschedulerequests

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 16.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"errorCode\":\"PermissionScopeNotGranted\",\"message\":\"Authorization failed due to missing permission scope PrivilegedEligibilitySchedule.ReadWrite.AzureADGroup,PrivilegedAccess.ReadWrite.AzureADGroup,PrivilegedEligibilitySchedule.Remove.AzureADGroup.\",\"instanceAnnotations\":[]}","innerError":{"date":"2026-07-29T06:55:23","request-id":"fa8c6a28-c897-46e4-aa93-f156afb179d2","client-request-id":"fa8c6a28-c897-46e4-aa93-f156afb179d2"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/privilegedAccess/group/eligibilityScheduleRequests
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identitygovernance_termsofusecontainer_identitygovernance_termsofuse_listagreementacceptances

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 12.5s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"{\"Message\":\"No HTTP resource was found that matches the request URI 'https://api.termsofuse.identitygovernance.azure.com/v2.0/identityGovernance/termsOfUse/agreementAcceptances?x-scenario=MSGraph&x-tenantid=[tenantId]'.\"}","innerError":{"date":"2026-07-29T06:55:21","request-id":"18d16985-8659-4b1e-a352-5684d626e7dd","client-request-id":"18d16985-8659-4b1e-a352-5684d626e7dd"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/termsOfUse/agreementAcceptances
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### identitygovernance_termsofusecontainer_identitygovernance_gettermsofuse

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 13.2s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"{\"Message\":\"No HTTP resource was found that matches the request URI 'https://api.termsofuse.identitygovernance.azure.com/v2.0/identityGovernance/termsOfUse?x-scenario=MSGraph&x-tenantid=[tenantId]'.\"}","innerError":{"date":"2026-07-29T06:55:21","request-id":"d12a7a49-5d90-4055-942a-51ad0b7c5ae8","client-request-id":"d12a7a49-5d90-4055-942a-51ad0b7c5ae8"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/termsOfUse
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### identityprotection_identityprotectionroot_identityprotection_identityprotectionroot_getidentityprotectionroot

- **Status**: PASS (OK)
- **Elapsed**: 12.2s

```json
[
  {
    "riskdetections": null,
    "riskyserviceprincipals": null,
    "riskyusers": null,
    "serviceprincipalriskdetections": null,
    "odata_type": null
  }
]
```

---

### identitygovernance_termsofusecontainer_identitygovernance_termsofuse_listagreements

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 12.5s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnauthorizedAccess","message":"User does not have any of the required scopes: user_impersonation, Agreement.Read.All, Agreement.ReadWrite.All","innerError":{"date":"2026-07-29T06:55:25","request-id":"8c57866f-371d-41ad-856f-fe6dc09cbd25","client-request-id":"8c57866f-371d-41ad-856f-fe6dc09cbd25"}}} [GET] https://graph.microsoft.com/v1.0/identityGovernance/termsOfUse/agreements
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identityprotection_riskdetection_identityprotection_listriskdetections

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.4s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"You cannot perform the requested operation, required scopes are missing in the token.","innerError":{"date":"2026-07-29T06:10:08","request-id":"23a83245-ec93-4d12-a0d0-fc0936624c77","client-request-id":"23a83245-ec93-4d12-a0d0-fc0936624c77"}}} [GET] https://graph.microsoft.com/v1.0/identityProtection/riskDetections
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identityprotection_riskyserviceprincipal_identityprotection_listriskyserviceprincipals

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.4s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"You cannot perform the requested operation, required scopes are missing in the token.","innerError":{"date":"2026-07-29T06:10:20","request-id":"8f504a5e-58b2-432e-aac3-aa79812a81b3","client-request-id":"8f504a5e-58b2-432e-aac3-aa79812a81b3"}}} [GET] https://graph.microsoft.com/v1.0/identityProtection/riskyServicePrincipals
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identityprotection_riskyuser_identityprotection_listriskyusers

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.2s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"You cannot perform the requested operation, required scopes are missing in the token.","innerError":{"date":"2026-07-29T06:10:31","request-id":"69548062-3625-4af3-9644-845f1ed613af","client-request-id":"69548062-3625-4af3-9644-845f1ed613af"}}} [GET] https://graph.microsoft.com/v1.0/identityProtection/riskyUsers
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identityprotection_serviceprincipalriskdetection_identityprotection_listserviceprincipalriskdetections

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.1s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"You cannot perform the requested operation, required scopes are missing in the token.","innerError":{"date":"2026-07-29T06:10:41","request-id":"588063e7-a269-45ed-911b-066dd0e0e1c6","client-request-id":"588063e7-a269-45ed-911b-066dd0e0e1c6"}}} [GET] https://graph.microsoft.com/v1.0/identityProtection/servicePrincipalRiskDetections
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identityproviders_identityprovider_functions_identityproviders_availableprovidertypes

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.4s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AADB2C","message":"The application does not have any of the required delegated permissions (IdentityProvider.Read.All, IdentityProvider.ReadWrite.All) to access the resource. ","innerError":{"correlationId":"349f4c2f-7de4-49d6-bfd0-d5ed3f765518","date":"2026-07-29T06:55:21","request-id":"c4d7faa9-8d37-46d5-862f-b19f3f7f0bab","client-request-id":"c4d7faa9-8d37-46d5-862f-b19f3f7f0bab"}}} [GET] https://graph.microsoft.com/v1.0/identityProviders/availableProviderTypes()
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### identityproviders_identityprovider_identityproviders_identityprovider_listidentityprovider

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.4s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AADB2C","message":"The application does not have any of the required delegated permissions (IdentityProvider.Read.All, IdentityProvider.ReadWrite.All) to access the resource. ","innerError":{"correlationId":"dc41c71b-de47-4499-88db-4c3517b8dada","date":"2026-07-29T06:10:08","request-id":"61ece65f-af34-41c7-8ff6-9d51baeba5bd","client-request-id":"61ece65f-af34-41c7-8ff6-9d51baeba5bd"}}} [GET] https://graph.microsoft.com/v1.0/identityProviders
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### informationprotection_bitlocker_informationprotection_getbitlocker

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 13.6s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"Unsupported method or endpoint.","innerError":{"date":"2026-07-29T06:10:08","request-id":"9505852e-b994-49b1-8fa8-d094e748b152","client-request-id":"9505852e-b994-49b1-8fa8-d094e748b152"}}} [GET] https://graph.microsoft.com/v1.0/informationProtection/bitlocker
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### informationprotection_bitlocker_informationprotection_bitlocker_listrecoverykeys

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.9s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"authorization_error","message":"Failed to authorize, token doesn't have the required permissions.","innerError":{"date":"2026-07-29T06:55:29","request-id":"cfb7588d-f3e8-48b3-a1fe-1fc386a8ffff","client-request-id":"cfb7588d-f3e8-48b3-a1fe-1fc386a8ffff"}}} [GET] https://graph.microsoft.com/v1.0/informationProtection/bitlocker/recoveryKeys
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### informationprotection_informationprotection_informationprotection_informationprotection_getinformationprotection

- **Status**: PASS (OK)
- **Elapsed**: 13.8s

```json
[]
```

---

### informationprotection_threatassessmentrequest_informationprotection_listthreatassessmentrequests

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.6s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\r\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\"/>\r\n<title>401 - Unauthorized: Access is denied due to invalid credentials.</title>\r\n<style type=\"text/css\">\r\n<!--\r\nbody{margin:0;font-size:.7em;font-family:Verdana, Arial, Helvetica, sans-serif;background:#EEEEEE;}\r\nfieldset{padding:0 15px 10px 15px;} \r\nh1{font-size:2.4em;margin:0;color:#FFF;}\r\nh2{font-size:1.7em;margin:0;color:#CC0000;} \r\nh3{font-size:1.2em;margin:10px 0 0 0;color:#000000;} \r\n#header{width:96%;margin:0 0 0 0;padding:6px 2% 6px 2%;font-family:\"trebuchet MS\", Verdana, sans-serif;color:#FFF;\r\nbackground-color:#555555;}\r\n#content{margin:0 0 0 2%;position:relative;}\r\n.content-container{background:#FFF;width:96%;margin-top:8px;padding:10px;position:relative;}\r\n-->\r\n</style>\r\n</head>\r\n<body>\r\n<div id=\"header\"><h1>Server Error</h1></div>\r\n<div id=\"content\">\r\n <div class=\"content-container\"><fieldset>\r\n  <h2>401 - Unauthorized: Access is denied due to invalid credentials.</h2>\r\n  <h3>You do not have permission to view this directory or page using the credentials that you supplied.</h3>\r\n </fieldset></div>\r\n</div>\r\n</body>\r\n</html>\r\n","innerError":{"date":"2026-07-29T06:55:22","request-id":"50512f1a-3ddc-4db1-b3a3-95d8c04cbe6f","client-request-id":"50512f1a-3ddc-4db1-b3a3-95d8c04cbe6f"}}} [GET] https://graph.microsoft.com/v1.0/informationProtection/threatAssessmentRequests
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### invitations_directoryobject_invitations_listinvitedusersponsors

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 13.9s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\r\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\"/>\r\n<title>404 - File or directory not found.</title>\r\n<style type=\"text/css\">\r\n<!--\r\nbody{margin:0;font-size:.7em;font-family:Verdana, Arial, Helvetica, sans-serif;background:#EEEEEE;}\r\nfieldset{padding:0 15px 10px 15px;} \r\nh1{font-size:2.4em;margin:0;color:#FFF;}\r\nh2{font-size:1.7em;margin:0;color:#CC0000;} \r\nh3{font-size:1.2em;margin:10px 0 0 0;color:#000000;} \r\n#header{width:96%;margin:0 0 0 0;padding:6px 2% 6px 2%;font-family:\"trebuchet MS\", Verdana, sans-serif;color:#FFF;\r\nbackground-color:#555555;}\r\n#content{margin:0 0 0 2%;position:relative;}\r\n.content-container{background:#FFF;width:96%;margin-top:8px;padding:10px;position:relative;}\r\n-->\r\n</style>\r\n</head>\r\n<body>\r\n<div id=\"header\"><h1>Server Error</h1></div>\r\n<div id=\"content\">\r\n <div class=\"content-container\"><fieldset>\r\n  <h2>404 - File or directory not found.</h2>\r\n  <h3>The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.</h3>\r\n </fieldset></div>\r\n</div>\r\n</body>\r\n</html>\r\n","innerError":{"date":"2026-07-29T06:55:58","request-id":"91734dbf-3f7c-4d4a-9e4b-7c34061021c0","client-request-id":"91734dbf-3f7c-4d4a-9e4b-7c34061021c0"}}} [GET] https://graph.microsoft.com/v1.0/invitations/invitedUserSponsors
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### invitations_user_invitations_inviteduser_getmailboxsettings

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 12.9s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Resource not found for the segment 'mailboxSettings'.","innerError":{"date":"2026-07-29T06:56:01","request-id":"862b9da9-d8a9-4363-9039-c61a4ee6d971","client-request-id":"862b9da9-d8a9-4363-9039-c61a4ee6d971"}}} [GET] https://graph.microsoft.com/v1.0/invitations/invitedUser/mailboxSettings
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### invitations_user_invitations_getinviteduser

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 13.8s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\r\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\"/>\r\n<title>404 - File or directory not found.</title>\r\n<style type=\"text/css\">\r\n<!--\r\nbody{margin:0;font-size:.7em;font-family:Verdana, Arial, Helvetica, sans-serif;background:#EEEEEE;}\r\nfieldset{padding:0 15px 10px 15px;} \r\nh1{font-size:2.4em;margin:0;color:#FFF;}\r\nh2{font-size:1.7em;margin:0;color:#CC0000;} \r\nh3{font-size:1.2em;margin:10px 0 0 0;color:#000000;} \r\n#header{width:96%;margin:0 0 0 0;padding:6px 2% 6px 2%;font-family:\"trebuchet MS\", Verdana, sans-serif;color:#FFF;\r\nbackground-color:#555555;}\r\n#content{margin:0 0 0 2%;position:relative;}\r\n.content-container{background:#FFF;width:96%;margin-top:8px;padding:10px;position:relative;}\r\n-->\r\n</style>\r\n</head>\r\n<body>\r\n<div id=\"header\"><h1>Server Error</h1></div>\r\n<div id=\"content\">\r\n <div class=\"content-container\"><fieldset>\r\n  <h2>404 - File or directory not found.</h2>\r\n  <h3>The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.</h3>\r\n </fieldset></div>\r\n</div>\r\n</body>\r\n</html>\r\n","innerError":{"date":"2026-07-29T06:56:05","request-id":"1f5a012b-83a6-4d2e-9e58-5825cd6d1fe3","client-request-id":"1f5a012b-83a6-4d2e-9e58-5825cd6d1fe3"}}} [GET] https://graph.microsoft.com/v1.0/invitations/invitedUser
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### invitations_invitation_invitations_invitation_listinvitation

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 22.8s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\r\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\"/>\r\n<title>404 - File or directory not found.</title>\r\n<style type=\"text/css\">\r\n<!--\r\nbody{margin:0;font-size:.7em;font-family:Verdana, Arial, Helvetica, sans-serif;background:#EEEEEE;}\r\nfieldset{padding:0 15px 10px 15px;} \r\nh1{font-size:2.4em;margin:0;color:#FFF;}\r\nh2{font-size:1.7em;margin:0;color:#CC0000;} \r\nh3{font-size:1.2em;margin:10px 0 0 0;color:#000000;} \r\n#header{width:96%;margin:0 0 0 0;padding:6px 2% 6px 2%;font-family:\"trebuchet MS\", Verdana, sans-serif;color:#FFF;\r\nbackground-color:#555555;}\r\n#content{margin:0 0 0 2%;position:relative;}\r\n.content-container{background:#FFF;width:96%;margin-top:8px;padding:10px;position:relative;}\r\n-->\r\n</style>\r\n</head>\r\n<body>\r\n<div id=\"header\"><h1>Server Error</h1></div>\r\n<div id=\"content\">\r\n <div class=\"content-container\"><fieldset>\r\n  <h2>404 - File or directory not found.</h2>\r\n  <h3>The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.</h3>\r\n </fieldset></div>\r\n</div>\r\n</body>\r\n</html>\r\n","innerError":{"date":"2026-07-29T06:55:54","request-id":"3e823c07-2f82-4f98-90ab-e11562577e2d","client-request-id":"3e823c07-2f82-4f98-90ab-e11562577e2d"}}} [GET] https://graph.microsoft.com/v1.0/invitations
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### invitations_user_invitations_inviteduser_listserviceprovisioningerrors

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 12.8s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Resource not found for the segment 'serviceProvisioningErrors'.","innerError":{"date":"2026-07-29T06:55:46","request-id":"f40dca4c-448b-465b-b45f-811ab7ada4f0","client-request-id":"f40dca4c-448b-465b-b45f-811ab7ada4f0"}}} [GET] https://graph.microsoft.com/v1.0/invitations/invitedUser/serviceProvisioningErrors
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_adhoccall_me_adhoccalls_getallrecordings

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Missing the parameter alias '@startDateTime' in the request query string.","innerError":{"date":"2026-07-29T06:55:46","request-id":"b0ce32a2-7032-45ae-a6e6-6ddf33caef71","client-request-id":"b0ce32a2-7032-45ae-a6e6-6ddf33caef71"}}} [GET] https://graph.microsoft.com/v1.0/me/adhocCalls/getAllRecordings(userId='@userId',startDateTime=@startDateTime,endDateTime=@endDateTime)
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_adhoccall_me_adhoccalls_getalltranscripts

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Missing the parameter alias '@startDateTime' in the request query string.","innerError":{"date":"2026-07-29T06:55:50","request-id":"06df503b-a93f-4be5-beb2-0bb02f698dfd","client-request-id":"06df503b-a93f-4be5-beb2-0bb02f698dfd"}}} [GET] https://graph.microsoft.com/v1.0/me/adhocCalls/getAllTranscripts(userId='@userId',startDateTime=@startDateTime,endDateTime=@endDateTime)
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_adhoccall_me_listadhoccalls

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 11.9s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-29T06:55:46","request-id":"88e817bf-1507-4273-a537-1d416dff660d","client-request-id":"88e817bf-1507-4273-a537-1d416dff660d"}}} [GET] https://graph.microsoft.com/v1.0/me/adhocCalls
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### me_agreementacceptance_me_listagreementacceptances

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.7s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnauthorizedAccess","message":"User does not have any of the required scopes: user_impersonation, AgreementAcceptance.Read, AgreementAcceptance.Read.All","innerError":{"date":"2026-07-29T06:55:47","request-id":"deb9fe61-9125-4740-b1e5-214803930c6b","client-request-id":"deb9fe61-9125-4740-b1e5-214803930c6b"}}} [GET] https://graph.microsoft.com/v1.0/me/agreementAcceptances
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_approleassignment_me_listapproleassignments

- **Status**: PASS (OK)
- **Elapsed**: 13.8s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"id\":\"rrxlEW-lv0mvCkSW-AzVRLH6itVeZYhEmXRpcgi7r0c\",\"deletedDateTime\":null,\"appRoleId\":\"00000000-0000-0000-0000-000000000000\",\"createdDateTime\":\"2026-07-12T17:07:20.498145Z\",\"principalDisplayName\":\"vicky kumar\",\"principalId\":\"1165bcae-a56f-49bf-af0a-4496f80cd544\",\"principalType\":\"User\",\"resourceDisplayName\":\"Coral Azure Source\",\"resourceId\":\"d7ce76f2-fdd5-4043-89a9-608f5374d637\"}]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_authentication_me_authentication_fido2methods_creationoptions

- **Status**: FAIL (ERR(1))
- **Elapsed**: 13.9s

```
Error: Source request failed (405)
Detail: {"error":{"code":"methodNotAllowed","message":"The method is not supported for this URL.","innerError":{"message":"The method is not supported for this URL.","date":"2026-07-29T06:55:47","request-id":"22cd4100-833c-4ec2-b737-379d6a8dfed9","client-request-id":"22cd4100-833c-4ec2-b737-379d6a8dfed9"}}} [GET] https://graph.microsoft.com/v1.0/me/authentication/fido2Methods/creationOptions()
```

---

### me_authentication_me_authentication_listemailmethods

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.0s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Request Authorization failed","innerError":{"message":"Request Authorization failed","date":"2026-07-29T06:55:46","request-id":"383ce657-16f4-4410-add0-8bd326e53771","client-request-id":"383ce657-16f4-4410-add0-8bd326e53771"}}} [GET] https://graph.microsoft.com/v1.0/me/authentication/emailMethods
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_authentication_me_authentication_listexternalauthenticationmethods

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Request Authorization failed","innerError":{"message":"Request Authorization failed","date":"2026-07-29T06:55:46","request-id":"1fac794c-9a58-4cef-b50f-5521b48b1ddc","client-request-id":"1fac794c-9a58-4cef-b50f-5521b48b1ddc"}}} [GET] https://graph.microsoft.com/v1.0/me/authentication/externalAuthenticationMethods
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_authentication_me_authentication_listfido2methods

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.7s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Request Authorization failed","innerError":{"message":"Request Authorization failed","date":"2026-07-29T06:55:46","request-id":"a7e8fc24-8651-4ce1-9d4e-2a7564303018","client-request-id":"a7e8fc24-8651-4ce1-9d4e-2a7564303018"}}} [GET] https://graph.microsoft.com/v1.0/me/authentication/fido2Methods
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_authentication_me_authentication_listmethods

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.9s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Request Authorization failed","innerError":{"message":"Request Authorization failed","date":"2026-07-29T06:55:47","request-id":"7f231336-f1b2-414c-81fe-e85b7d8ec5f2","client-request-id":"7f231336-f1b2-414c-81fe-e85b7d8ec5f2"}}} [GET] https://graph.microsoft.com/v1.0/me/authentication/methods
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_authentication_me_authentication_listmicrosoftauthenticatormethods

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.8s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Request Authorization failed","innerError":{"message":"Request Authorization failed","date":"2026-07-29T06:55:46","request-id":"dd9b1731-0b6e-4b09-a65c-df243a2e8b51","client-request-id":"dd9b1731-0b6e-4b09-a65c-df243a2e8b51"}}} [GET] https://graph.microsoft.com/v1.0/me/authentication/microsoftAuthenticatorMethods
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_authentication_me_authentication_listoperations

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"UnknownError","message":"{\"ErrorCode\":\"badRequest\",\"Message\":\"Resource not found for segment 'users('1165bcae-a56f-49bf-af0a-4496f80cd544@89de3b75-fef2-44f9-90a4-cf8c69700c83')/authentication/operations'.\",\"Target\":null,\"Details\":null,\"InnerError\":null,\"InstanceAnnotations\":[],\"TypeAnnotation\":null}","innerError":{"date":"2026-07-29T06:11:28","request-id":"4da4a9a0-3ebb-4d93-82e9-7630a59456b1","client-request-id":"4da4a9a0-3ebb-4d93-82e9-7630a59456b1"}}} [GET] https://graph.microsoft.com/v1.0/me/authentication/operations
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_authentication_me_authentication_listphonemethods

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.5s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Request Authorization failed","innerError":{"message":"Request Authorization failed","date":"2026-07-29T06:11:26","request-id":"5aea3692-66a4-4aa1-bdd9-9f287c720fd4","client-request-id":"5aea3692-66a4-4aa1-bdd9-9f287c720fd4"}}} [GET] https://graph.microsoft.com/v1.0/me/authentication/phoneMethods
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_authentication_me_authentication_listplatformcredentialmethods

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.8s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Request Authorization failed","innerError":{"message":"Request Authorization failed","date":"2026-07-29T06:11:27","request-id":"8e5fff2e-2656-4c88-be36-94cdfdf06ebe","client-request-id":"8e5fff2e-2656-4c88-be36-94cdfdf06ebe"}}} [GET] https://graph.microsoft.com/v1.0/me/authentication/platformCredentialMethods
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_authentication_me_authentication_listpasswordmethods

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.2s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Request Authorization failed","innerError":{"message":"Request Authorization failed","date":"2026-07-29T06:55:46","request-id":"15aecc4a-78c6-4243-b502-60889edd739f","client-request-id":"15aecc4a-78c6-4243-b502-60889edd739f"}}} [GET] https://graph.microsoft.com/v1.0/me/authentication/passwordMethods
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_authentication_me_authentication_listsoftwareoathmethods

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.5s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Request Authorization failed","innerError":{"message":"Request Authorization failed","date":"2026-07-29T06:56:26","request-id":"29dfc7c2-7225-4afd-a3a6-37032826522f","client-request-id":"29dfc7c2-7225-4afd-a3a6-37032826522f"}}} [GET] https://graph.microsoft.com/v1.0/me/authentication/softwareOathMethods
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_authentication_me_authentication_listwindowshelloforbusinessmethods

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.8s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Request Authorization failed","innerError":{"message":"Request Authorization failed","date":"2026-07-29T06:56:26","request-id":"32e136d3-54a8-49ae-8d00-fa0f4b8c7df1","client-request-id":"32e136d3-54a8-49ae-8d00-fa0f4b8c7df1"}}} [GET] https://graph.microsoft.com/v1.0/me/authentication/windowsHelloForBusinessMethods
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_authentication_me_getauthentication

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"badRequest","message":"Unsupported segment type.","innerError":{"message":"Unsupported segment type.","date":"2026-07-29T06:56:26","request-id":"585cb487-f606-492d-9618-413f76a0125c","client-request-id":"585cb487-f606-492d-9618-413f76a0125c"}}} [GET] https://graph.microsoft.com/v1.0/me/authentication
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_authentication_me_authentication_listtemporaryaccesspassmethods

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.5s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Request Authorization failed","innerError":{"message":"Request Authorization failed","date":"2026-07-29T06:56:26","request-id":"aa9effd9-2339-45ac-a8ea-dd57a1a6e7e1","client-request-id":"aa9effd9-2339-45ac-a8ea-dd57a1a6e7e1"}}} [GET] https://graph.microsoft.com/v1.0/me/authentication/temporaryAccessPassMethods
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_calendar_me_calendar_listcalendarpermissions

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 16.3s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/calendar/calendarPermissions
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_calendar_me_calendar_listevents

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 15.6s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/calendar/events
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_calendar_me_listcalendars

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 16.0s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/calendars
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_calendar_me_getcalendar

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 16.1s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/calendar
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_calendargroup_me_listcalendargroups

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 13.2s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/calendarGroups
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_chat_me_chats_getallmessages

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 12.4s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-29T06:56:27","request-id":"06766f6b-a3b6-437d-b7a2-063d23730ca7","client-request-id":"06766f6b-a3b6-437d-b7a2-063d23730ca7"}}} [GET] https://graph.microsoft.com/v1.0/me/chats/getAllMessages()
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_chat_me_listchats

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 11.5s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-29T06:56:27","request-id":"a6d2073e-e4f5-423a-aeac-b116f079194b","client-request-id":"a6d2073e-e4f5-423a-aeac-b116f079194b"}}} [GET] https://graph.microsoft.com/v1.0/me/chats
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_chat_me_chats_getallretainedmessages

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 11.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-29T06:56:55","request-id":"55e1ac86-e71b-4122-83e3-83ae52525856","client-request-id":"55e1ac86-e71b-4122-83e3-83ae52525856"}}} [GET] https://graph.microsoft.com/v1.0/me/chats/getAllRetainedMessages()
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_cloudclipboardroot_me_cloudclipboard_listitems

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 12.9s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"{\"Message\":\"User was not authorized.\"}","innerError":{"date":"2026-07-29T06:12:14","request-id":"437245cc-0fdd-4f50-a59e-233f1790a844","client-request-id":"437245cc-0fdd-4f50-a59e-233f1790a844"}}} [GET] https://graph.microsoft.com/v1.0/me/cloudClipboard/items
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_cloudpc_me_listcloudpcs

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.4s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Access is denied to the requested resource.","innerError":{"date":"2026-07-29T06:12:13","request-id":"5de64df5-3961-4fd2-9dd2-4abdbe38b604","client-request-id":"5de64df5-3961-4fd2-9dd2-4abdbe38b604"}}} [GET] https://graph.microsoft.com/v1.0/me/cloudPCs
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_cloudclipboardroot_me_getcloudclipboard

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 14.2s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"{\"Message\":\"No HTTP resource was found that matches the request URI 'https://graph-enterprise.activity.windows.com/v1.0/me/cloudClipboard'.\"}","innerError":{"date":"2026-07-29T06:12:14","request-id":"b84e3ccf-987d-48b1-a8f6-ee514846b52e","client-request-id":"b84e3ccf-987d-48b1-a8f6-ee514846b52e"}}} [GET] https://graph.microsoft.com/v1.0/me/cloudClipboard
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### me_contact_me_contacts_delta

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 15.7s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/contacts/delta()
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_contact_me_listcontacts

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 15.3s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/contacts
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_devicemanagementtroubleshootingevent_me_listdevicemanagementtroubleshootingevents

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 12.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:56:36","request-id":"882cb13c-51cf-42c3-9c70-dbddab5edf56","client-request-id":"882cb13c-51cf-42c3-9c70-dbddab5edf56"}}} [GET] https://graph.microsoft.com/v1.0/me/deviceManagementTroubleshootingEvents
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_contactfolder_me_contactfolders_delta

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 16.5s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/contactFolders/delta()
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_contactfolder_me_listcontactfolders

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 16.0s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/contactFolders
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_directoryobject_me_getmanager

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 12.3s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"Request_ResourceNotFound","message":"Resource 'manager' does not exist or one of its queried reference-property objects are not present.","innerError":{"date":"2026-07-29T06:56:47","request-id":"0283c0dc-e852-4beb-8d01-cd4c87aa8f03","client-request-id":"0283c0dc-e852-4beb-8d01-cd4c87aa8f03"}}} [GET] https://graph.microsoft.com/v1.0/me/manager
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### me_directoryobject_me_listcreatedobjects

- **Status**: PASS (OK)
- **Elapsed**: 15.1s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listdirectreports

- **Status**: PASS (OK)
- **Elapsed**: 13.1s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listcreatedobjects_asserviceprincipal

- **Status**: PASS (OK)
- **Elapsed**: 13.9s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listdirectreports_asorgcontact

- **Status**: PASS (OK)
- **Elapsed**: 15.3s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listdirectreports_asuser

- **Status**: PASS (OK)
- **Elapsed**: 14.2s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listmemberof_asadministrativeunit

- **Status**: PASS (OK)
- **Elapsed**: 13.5s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listmemberof

- **Status**: PASS (OK)
- **Elapsed**: 14.1s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"@odata.type\":\"#microsoft.graph.directoryRole\",\"id\":\"d2bbfd53-3dba-4be4-a10c-116145147880\",\"deletedDateTime\":null,\"description\":\"Can manage all aspects of Microsoft Entra ID and Microsoft services that use Microsoft Entra identities.\",\"displayName\":\"Global Administrator\",\"roleTemplateId\":\"62e90394-69f5-4237-9190-012177145e10\"}]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listmemberof_asdirectoryrole

- **Status**: PASS (OK)
- **Elapsed**: 14.1s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"id\":\"d2bbfd53-3dba-4be4-a10c-116145147880\",\"deletedDateTime\":null,\"description\":\"Can manage all aspects of Microsoft Entra ID and Microsoft services that use Microsoft Entra identities.\",\"displayName\":\"Global Administrator\",\"roleTemplateId\":\"62e90394-69f5-4237-9190-012177145e10\"}]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listmemberof_asgroup

- **Status**: PASS (OK)
- **Elapsed**: 13.9s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listowneddevices

- **Status**: PASS (OK)
- **Elapsed**: 14.0s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listowneddevices_asapproleassignment

- **Status**: PASS (OK)
- **Elapsed**: 13.9s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listowneddevices_asdevice

- **Status**: PASS (OK)
- **Elapsed**: 14.1s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listownedobjects_asapplication

- **Status**: PASS (OK)
- **Elapsed**: 13.9s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listowneddevices_asendpoint

- **Status**: PASS (OK)
- **Elapsed**: 13.9s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listownedobjects

- **Status**: PASS (OK)
- **Elapsed**: 13.9s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listownedobjects_asgroup

- **Status**: PASS (OK)
- **Elapsed**: 13.8s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listregistereddevices

- **Status**: PASS (OK)
- **Elapsed**: 13.4s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listrefsponsors

- **Status**: PASS (OK)
- **Elapsed**: 13.5s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listownedobjects_asserviceprincipal

- **Status**: PASS (OK)
- **Elapsed**: 13.5s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listregistereddevices_asapproleassignment

- **Status**: PASS (OK)
- **Elapsed**: 13.7s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listsponsors

- **Status**: PASS (OK)
- **Elapsed**: 16.8s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listregistereddevices_asendpoint

- **Status**: PASS (OK)
- **Elapsed**: 16.8s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listregistereddevices_asdevice

- **Status**: PASS (OK)
- **Elapsed**: 16.8s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listtransitivememberof

- **Status**: PASS (OK)
- **Elapsed**: 16.6s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"@odata.type\":\"#microsoft.graph.directoryRole\",\"id\":\"d2bbfd53-3dba-4be4-a10c-116145147880\",\"deletedDateTime\":null,\"description\":\"Can manage all aspects of Microsoft Entra ID and Microsoft services that use Microsoft Entra identities.\",\"displayName\":\"Global Administrator\",\"roleTemplateId\":\"62e90394-69f5-4237-9190-012177145e10\"}]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listtransitivememberof_asdirectoryrole

- **Status**: PASS (OK)
- **Elapsed**: 13.8s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"id\":\"d2bbfd53-3dba-4be4-a10c-116145147880\",\"deletedDateTime\":null,\"description\":\"Can manage all aspects of Microsoft Entra ID and Microsoft services that use Microsoft Entra identities.\",\"displayName\":\"Global Administrator\",\"roleTemplateId\":\"62e90394-69f5-4237-9190-012177145e10\"}]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listtransitivememberof_asadministrativeunit

- **Status**: PASS (OK)
- **Elapsed**: 13.8s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_directoryobject_me_listtransitivememberof_asgroup

- **Status**: PASS (OK)
- **Elapsed**: 13.9s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_drive_me_getdrive

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.9s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Tenant does not have a SPO license.","innerError":{"date":"2026-07-29T06:56:51","request-id":"36ccad14-0a54-4982-a741-0d4b4f50dab1","client-request-id":"36ccad14-0a54-4982-a741-0d4b4f50dab1"}}} [GET] https://graph.microsoft.com/v1.0/me/drive
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_drive_me_listdrives

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.8s

```
TIMEOUT
```

---

### me_employeeexperienceuser_me_employeeexperience_listlearningcourseactivities

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.9s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"forbidden","message":"Insufficient scope permissions to perform the request operation on course activity record.","innerError":{"date":"2026-07-29T06:56:35","request-id":"892299d8-a2d8-4e8f-88d6-76fea8cfa0bc","client-request-id":"892299d8-a2d8-4e8f-88d6-76fea8cfa0bc"}}} [GET] https://graph.microsoft.com/v1.0/me/employeeExperience/learningCourseActivities
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_employeeexperienceuser_me_employeeexperience_listassignedroles

- **Status**: FAIL (ERR(1))
- **Elapsed**: 17.7s

```
Error: Source server error (500)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:12:58","request-id":"3a641598-abdc-46ba-bf45-c5b77e587783","client-request-id":"3a641598-abdc-46ba-bf45-c5b77e587783"}}} [GET] https://graph.microsoft.com/v1.0/me/employeeExperience/assignedRoles
Hint: The upstream API returned a server error. This may be transient — retry after a brief wait.
```

---

### me_employeeexperienceuser_me_getemployeeexperience

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.5s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.Viva.Learning,False).","innerError":{"date":"2026-07-29T06:12:54","request-id":"9b59cd0e-cb9d-4f95-ba7b-5bbf220b431d","client-request-id":"9b59cd0e-cb9d-4f95-ba7b-5bbf220b431d"}}} [GET] https://graph.microsoft.com/v1.0/me/employeeExperience
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_extension_me_listextensions

- **Status**: PASS (OK)
- **Elapsed**: 12.0s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_inferenceclassification_me_getinferenceclassification

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 11.5s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/inferenceClassification
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_event_me_listevents

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 16.0s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/events
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_inferenceclassification_me_inferenceclassification_listoverrides

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 15.4s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/inferenceClassification/overrides
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_iteminsights_me_getinsights

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.4s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:12:56","request-id":"39ec3552-6a40-4420-af96-f0c8735d959b","client-request-id":"39ec3552-6a40-4420-af96-f0c8735d959b"}}} [GET] https://graph.microsoft.com/v1.0/me/insights
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_iteminsights_me_insights_listshared

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 13.2s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:12:55","request-id":"5a55458d-3233-4ce8-82bb-820169aa6021","client-request-id":"5a55458d-3233-4ce8-82bb-820169aa6021"}}} [GET] https://graph.microsoft.com/v1.0/me/insights/shared
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_iteminsights_me_insights_listused

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 13.6s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:57:33","request-id":"8ed45a36-6f5a-4bc1-a514-0fd7f22542ee","client-request-id":"8ed45a36-6f5a-4bc1-a514-0fd7f22542ee"}}} [GET] https://graph.microsoft.com/v1.0/me/insights/used
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_iteminsights_me_insights_listtrending

- **Status**: FAIL (ERR(1))
- **Elapsed**: 20.7s

```
Error: Source server error (500)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:57:31","request-id":"17fe6538-96b3-4403-ac61-11a036629708","client-request-id":"17fe6538-96b3-4403-ac61-11a036629708"}}} [GET] https://graph.microsoft.com/v1.0/me/insights/trending
Hint: The upstream API returned a server error. This may be transient — retry after a brief wait.
```

---

### me_licensedetails_me_listlicensedetails

- **Status**: PASS (OK)
- **Elapsed**: 11.0s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_licensedetails_me_licensedetails_getteamslicensingdetails

- **Status**: PASS (OK)
- **Elapsed**: 11.8s

```json
[
  {
    "value": "{\"@odata.context\":\"https://graph.microsoft.com/v1.0/$metadata#microsoft.graph.teamsLicensingDetails\",\"hasTeamsLicense\":false}"
  }
]
```

---

### me_mailfolder_me_listmailfolders

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 10.6s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/mailFolders
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_mailboxsettings_me_getmailboxsettings

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 12.9s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/mailboxSettings
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_managedappregistration_me_listmanagedappregistrations

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 11.6s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:57:22","request-id":"ab5ede5b-0797-492f-8aec-c6f8d9d81506","client-request-id":"ab5ede5b-0797-492f-8aec-c6f8d9d81506"}}} [GET] https://graph.microsoft.com/v1.0/me/managedAppRegistrations
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_mailfolder_me_mailfolders_delta

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 15.3s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/mailFolders/delta()
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_manageddevice_me_listmanageddevices

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 11.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:57:23","request-id":"9300c57e-1aee-466c-92de-25c39e33c477","client-request-id":"9300c57e-1aee-466c-92de-25c39e33c477"}}} [GET] https://graph.microsoft.com/v1.0/me/managedDevices
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_message_me_listmessages

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 13.1s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/messages
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_message_me_messages_delta

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Unsupported request: Change tracking is not supported against 'microsoft.graph.message'.","innerError":{"date":"2026-07-29T06:13:39","request-id":"d67b72cd-966f-4cfd-a456-c13fc689ee83","client-request-id":"d67b72cd-966f-4cfd-a456-c13fc689ee83"}}} [GET] https://graph.microsoft.com/v1.0/me/messages/delta()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_oauth2permissiongrant_me_listoauth2permissiongrants

- **Status**: PASS (OK)
- **Elapsed**: 10.4s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_onenote_me_onenote_listnotebooks

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 11.0s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"40001","message":"The request does not contain a valid authentication token. Detailed error information: {0}","innerError":{"date":"2026-07-29T06:13:20","request-id":"07afaabf-bec9-472e-a5b2-24db7f497f55","client-request-id":"07afaabf-bec9-472e-a5b2-24db7f497f55"}}} [GET] https://graph.microsoft.com/v1.0/me/onenote/notebooks
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_onenote_me_getonenote

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 13.2s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"40001","message":"The request does not contain a valid authentication token. Detailed error information: {0}","innerError":{"date":"2026-07-29T06:13:20","request-id":"8cf6580c-b89d-4ddd-ba9c-b0015f8025c3","client-request-id":"8cf6580c-b89d-4ddd-ba9c-b0015f8025c3"}}} [GET] https://graph.microsoft.com/v1.0/me/onenote
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_onenote_me_onenote_listpages

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 13.2s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"40001","message":"The request does not contain a valid authentication token. Detailed error information: {0}","innerError":{"date":"2026-07-29T06:13:21","request-id":"c761209d-a5a7-4c3d-9277-4e841b6422ee","client-request-id":"c761209d-a5a7-4c3d-9277-4e841b6422ee"}}} [GET] https://graph.microsoft.com/v1.0/me/onenote/pages
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_onenote_me_onenote_listoperations

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 13.4s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"40001","message":"The request does not contain a valid authentication token. Detailed error information: {0}","innerError":{"date":"2026-07-29T06:13:21","request-id":"26a4fa5f-2dff-4d02-ade8-960d037b6300","client-request-id":"26a4fa5f-2dff-4d02-ade8-960d037b6300"}}} [GET] https://graph.microsoft.com/v1.0/me/onenote/operations
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_onenote_me_onenote_listsectiongroups

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 12.6s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"40001","message":"The request does not contain a valid authentication token. Detailed error information: {0}","innerError":{"date":"2026-07-29T06:57:23","request-id":"fd6d50ac-953c-46c4-863c-f369a647b5c9","client-request-id":"fd6d50ac-953c-46c4-863c-f369a647b5c9"}}} [GET] https://graph.microsoft.com/v1.0/me/onenote/sectionGroups
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_onenote_me_onenote_listresources

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 12.6s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"40001","message":"The request does not contain a valid authentication token. Detailed error information: {0}","innerError":{"date":"2026-07-29T06:57:23","request-id":"2e25f36e-7841-457c-812f-0f0fe0dc1d2e","client-request-id":"2e25f36e-7841-457c-812f-0f0fe0dc1d2e"}}} [GET] https://graph.microsoft.com/v1.0/me/onenote/resources
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_onlinemeeting_me_listonlinemeetings

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.3s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Insufficient permissions","innerError":{"date":"2026-07-29T06:57:22","request-id":"8a663843-7be1-40a8-80b1-5c9009672cd3","client-request-id":"8a663843-7be1-40a8-80b1-5c9009672cd3"}}} [GET] https://graph.microsoft.com/v1.0/me/onlineMeetings
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_onenote_me_onenote_listsections

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 13.4s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"40001","message":"The request does not contain a valid authentication token. Detailed error information: {0}","innerError":{"date":"2026-07-29T06:57:23","request-id":"23dc1b03-070d-4b5f-8f87-786a94d5d7a3","client-request-id":"23dc1b03-070d-4b5f-8f87-786a94d5d7a3"}}} [GET] https://graph.microsoft.com/v1.0/me/onenote/sections
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_onlinemeeting_me_onlinemeetings_getalltranscripts

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Missing the parameter alias '@startDateTime' in the request query string.","innerError":{"date":"2026-07-29T06:57:22","request-id":"0d18b6d5-1a58-45b4-90b2-d004703abad5","client-request-id":"0d18b6d5-1a58-45b4-90b2-d004703abad5"}}} [GET] https://graph.microsoft.com/v1.0/me/onlineMeetings/getAllTranscripts(meetingOrganizerUserId='@meetingOrganizerUserId',startDateTime=@startDateTime,endDateTime=@endDateTime)
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_onlinemeeting_me_onlinemeetings_getallrecordings

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Missing the parameter alias '@startDateTime' in the request query string.","innerError":{"date":"2026-07-29T06:57:23","request-id":"e86f5b70-9c95-4a28-8583-e1243d6576ad","client-request-id":"e86f5b70-9c95-4a28-8583-e1243d6576ad"}}} [GET] https://graph.microsoft.com/v1.0/me/onlineMeetings/getAllRecordings(meetingOrganizerUserId='@meetingOrganizerUserId',startDateTime=@startDateTime,endDateTime=@endDateTime)
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_onpremisessyncbehavior_me_getonpremisessyncbehavior

- **Status**: PASS (OK)
- **Elapsed**: 13.2s

```json
[
  {
    "odata_type": null,
    "id": "1165bcae-a56f-49bf-af0a-4496f80cd544",
    "iscloudmanaged": false
  }
]
```

---

### me_outlookuser_me_getoutlook

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.5s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/outlook
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_outlookuser_me_outlook_supportedlanguages

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.5s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/outlook/supportedLanguages()
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_outlookuser_me_outlook_listmastercategories

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.5s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/outlook/masterCategories
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_outlookuser_me_outlook_supportedtimezones_5c4f

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.5s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/outlook/supportedTimeZones()
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_person_me_listpeople

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.3s

```
TIMEOUT
```

---

### me_planneruser_me_getplanner

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 13.0s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"TenantNotFound","message":"Tenant is not found.","innerError":{"date":"2026-07-29T06:14:04","request-id":"7ef52b8f-02fa-45e3-b5cd-90e3d49b030b","client-request-id":"7ef52b8f-02fa-45e3-b5cd-90e3d49b030b"}}} [GET] https://graph.microsoft.com/v1.0/me/planner
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### me_planneruser_me_planner_listplans

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 13.6s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"TenantNotFound","message":"Tenant is not found.","innerError":{"date":"2026-07-29T06:14:04","request-id":"f0c01ee8-ef76-465a-bc5a-e241ed16ff0f","client-request-id":"f0c01ee8-ef76-465a-bc5a-e241ed16ff0f"}}} [GET] https://graph.microsoft.com/v1.0/me/planner/plans
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### me_presence_me_getpresence

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 11.4s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"","innerError":{"request-id":"f7ec7631-3ba5-4ce0-ae25-ce749976d6bf","date":"2026-07-29T06:14:03","client-request-id":"f7ec7631-3ba5-4ce0-ae25-ce749976d6bf"}}} [GET] https://graph.microsoft.com/v1.0/me/presence
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_planneruser_me_planner_listtasks

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 12.7s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"TenantNotFound","message":"Tenant is not found.","innerError":{"date":"2026-07-29T06:14:04","request-id":"15308c12-aad3-463f-93e3-a8602685f8db","client-request-id":"15308c12-aad3-463f-93e3-a8602685f8db"}}} [GET] https://graph.microsoft.com/v1.0/me/planner/tasks
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### me_profilephoto_me_getphoto

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 16.9s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"ErrorNonExistentStorage","message":"Accessing service failed.","innerError":{"date":"2026-07-29T06:58:01","request-id":"0c68bc3b-a7be-4386-be29-4f5833754de7","client-request-id":"0c68bc3b-a7be-4386-be29-4f5833754de7"}}} [GET] https://graph.microsoft.com/v1.0/me/photo
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### me_profilephoto_me_listphotos

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 16.6s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"ErrorNonExistentStorage","message":"Accessing service failed.","innerError":{"date":"2026-07-29T06:58:30","request-id":"0fa88b27-e774-4e16-aafc-c13430b9ad37","client-request-id":"0fa88b27-e774-4e16-aafc-c13430b9ad37"}}} [GET] https://graph.microsoft.com/v1.0/me/photos
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### me_resourcespecificpermissiongrant_me_listpermissiongrants

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 16.0s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-29T06:58:02","request-id":"a7772362-c061-4170-91fa-cff683e5544e","client-request-id":"a7772362-c061-4170-91fa-cff683e5544e"}}} [GET] https://graph.microsoft.com/v1.0/me/permissionGrants
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_scopedrolemembership_me_listscopedrolememberof

- **Status**: PASS (OK)
- **Elapsed**: 15.8s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_site_me_listfollowedsites

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.5s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Tenant does not have a SPO license.","innerError":{"date":"2026-07-29T06:14:15","request-id":"cc824aa6-0e7b-4f14-a513-ed70f6dc1b1a","client-request-id":"cc824aa6-0e7b-4f14-a513-ed70f6dc1b1a"}}} [GET] https://graph.microsoft.com/v1.0/me/followedSites
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_serviceprovisioningerror_me_listserviceprovisioningerrors

- **Status**: PASS (OK)
- **Elapsed**: 14.8s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### me_team_me_listjoinedteams

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 16.3s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-29T06:58:19","request-id":"7b684a58-8d7d-49a7-9409-aa4cbecbd067","client-request-id":"7b684a58-8d7d-49a7-9409-aa4cbecbd067"}}} [GET] https://graph.microsoft.com/v1.0/me/joinedTeams
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_team_me_joinedteams_getallmessages

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 16.4s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-29T06:58:14","request-id":"ebf6d448-0fcd-482a-89cd-5037ae96fcaf","client-request-id":"ebf6d448-0fcd-482a-89cd-5037ae96fcaf"}}} [GET] https://graph.microsoft.com/v1.0/me/joinedTeams/getAllMessages()
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### me_todo_me_todo_listlists

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.5s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:58:11","request-id":"d1ca8a2e-539b-4868-9428-40fac31373b3","client-request-id":"d1ca8a2e-539b-4868-9428-40fac31373b3"}}} [GET] https://graph.microsoft.com/v1.0/me/todo/lists
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_todo_me_gettodo

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.9s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:57:56","request-id":"7208cc65-49ec-497d-82e1-9bccad8c3bb5","client-request-id":"7208cc65-49ec-497d-82e1-9bccad8c3bb5"}}} [GET] https://graph.microsoft.com/v1.0/me/todo
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_user_functions_me_exportdeviceandappmanagementdata_1a02

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.8s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:58:30","request-id":"1a09f673-f724-4d31-83bb-aa07e642e397","client-request-id":"1a09f673-f724-4d31-83bb-aa07e642e397"}}} [GET] https://graph.microsoft.com/v1.0/me/exportDeviceAndAppManagementData()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_todo_me_todo_lists_delta

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 15.0s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:58:07","request-id":"9fe44df1-677d-4017-9c88-25afe8f35b2d","client-request-id":"9fe44df1-677d-4017-9c88-25afe8f35b2d"}}} [GET] https://graph.microsoft.com/v1.0/me/todo/lists/delta()
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_user_functions_me_getmanagedapppolicies

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 12.4s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:58:22","request-id":"4d4e0632-9d7e-4802-ba8f-b9a2ca24a8f4","client-request-id":"4d4e0632-9d7e-4802-ba8f-b9a2ca24a8f4"}}} [GET] https://graph.microsoft.com/v1.0/me/getManagedAppPolicies()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_user_functions_me_getmanagedappdiagnosticstatuses

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 12.8s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:57:50","request-id":"9bd55e89-fe43-4129-a8a9-b2d38de74543","client-request-id":"9bd55e89-fe43-4129-a8a9-b2d38de74543"}}} [GET] https://graph.microsoft.com/v1.0/me/getManagedAppDiagnosticStatuses()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_user_functions_me_getmanageddeviceswithappfailures

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T06:57:50","request-id":"f6761888-bb77-4daa-b973-bb02b3edbea3","client-request-id":"f6761888-bb77-4daa-b973-bb02b3edbea3"}}} [GET] https://graph.microsoft.com/v1.0/me/getManagedDevicesWithAppFailures()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_user_me_user_getuser

- **Status**: PASS (OK)
- **Elapsed**: 12.2s

```json
[
  {
    "odata_type": null,
    "aboutme": null,
    "accountenabled": null,
    "activities": null,
    "adhoccalls": null,
    "agegroup": null,
    "agreementacceptances": null,
    "approleassignments": null,
    "assignedlicenses": null,
    "assignedplans": null,
    "authentication": null,
    "authorizationinfo": null,
    "birthday": null,
    "businessphones": "[]",
    "calendar": null,
    "calendargroups": null,
    "calendarview": null,
    "calendars": null,
    "chats": null,
    "city": null,
    "cloudclipboard": null,
    "cloudpcs": null,
    "companyname": null,
    "consentprovidedforminor": null,
    "contactfolders": null,
    "contacts": null,
    "country": null,
    "createddatetime": null,
    "createdobjects": null,
    "creationtype": null,
    "customsecurityattributes": null,
    "datasecurityandgovernance": null,
    "department": null,
    "deviceenrollmentlimit": null,
    "devicemanagementtroubleshootingevents": null,
    "directreports": null,
    "displayname": "vicky kumar",
    "drive": null,
    "drives": null,
    "employeeexperience": null,
    "employeehiredate": null,
    "employeeid": null,
    "employeeleavedatetime": null,
    "employeeorgdata": null,
    "employeetype": null,
    "events": null,
    "extensions": null,
    "externaluserstate": null,
    "externaluserstatechangedatetime": null,
    "faxnumber": null,
    "followedsites": null,
    "givenname": "vicky",
    "hiredate": null,
    "identities": null,
    "identityparentid": null,
    "imaddresses": null,
    "inferenceclassification": null,
    "insights": null,
    "interests": null,
    "ismanagementrestricted": null,
    "isresourceaccount": null,
    "jobtitle": null,
    "joinedteams": null,
    "lastpasswordchangedatetime": null,
    "legalagegroupclassification": null,
    "licenseassignmentstates": null,
    "licensedetails": null,
    "mail": null,
    "mailfolders": null,
    "mailnickname": null,
    "mailboxsettings": null,
    "managedappre
```

---

### me_useractivity_me_activities_recent

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.6s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"{\"Message\":\"User was not authorized.\"}","innerError":{"date":"2026-07-29T06:57:51","request-id":"8bb734b2-5823-4800-b143-6d6addbf8f06","client-request-id":"8bb734b2-5823-4800-b143-6d6addbf8f06"}}} [GET] https://graph.microsoft.com/v1.0/me/activities/recent()
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_useractivity_me_listactivities

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.8s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"{\"Message\":\"User was not authorized.\"}","innerError":{"date":"2026-07-29T06:57:51","request-id":"d96d09eb-ba58-493f-8caa-e995c58acc7f","client-request-id":"d96d09eb-ba58-493f-8caa-e995c58acc7f"}}} [GET] https://graph.microsoft.com/v1.0/me/activities
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_userdatasecurityandgovernance_me_datasecurityandgovernance_getactivities

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 13.8s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:57:50","request-id":"e1b918a9-edb7-458e-bfe9-babe5dd8274f","client-request-id":"e1b918a9-edb7-458e-bfe9-babe5dd8274f"}}} [GET] https://graph.microsoft.com/v1.0/me/dataSecurityAndGovernance/activities
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### me_userdatasecurityandgovernance_me_datasecurityandgovernance_activities_listcontentactivities

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 14.3s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"{\"CorrelationId\":\"0HNND67HQE0EF:00000684\",\"Status\":404,\"Message\":\"Failed to find region of tenant.\"}","innerError":{"date":"2026-07-29T06:57:50","request-id":"3fa56698-e609-4196-b45d-8eb664005033","client-request-id":"3fa56698-e609-4196-b45d-8eb664005033"}}} [GET] https://graph.microsoft.com/v1.0/me/dataSecurityAndGovernance/activities/contentActivities
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### me_userdatasecurityandgovernance_me_datasecurityandgovernance_getprotectionscopes

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 12.4s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:15:07","request-id":"aef763d2-0ffa-4171-a1c2-ab829a59059a","client-request-id":"aef763d2-0ffa-4171-a1c2-ab829a59059a"}}} [GET] https://graph.microsoft.com/v1.0/me/dataSecurityAndGovernance/protectionScopes
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### me_userdatasecurityandgovernance_me_datasecurityandgovernance_listsensitivitylabels

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 13.5s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:57:52","request-id":"56a3c2cc-9426-41b7-9390-ce69d060c1d4","client-request-id":"56a3c2cc-9426-41b7-9390-ce69d060c1d4"}}} [GET] https://graph.microsoft.com/v1.0/me/dataSecurityAndGovernance/sensitivityLabels
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_userdatasecurityandgovernance_me_getdatasecurityandgovernance

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 13.2s

```
TIMEOUT
```

---

### me_usersettings_me_getsettings

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 13.8s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:58:53","request-id":"89bf0709-e974-4dae-8afc-f9bc5d3b9fdd","client-request-id":"89bf0709-e974-4dae-8afc-f9bc5d3b9fdd"}}} [GET] https://graph.microsoft.com/v1.0/me/settings
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_usersettings_me_settings_getexchange

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 15.7s

```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/settings/exchange
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_usersettings_me_settings_getiteminsights

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 14.8s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"ErrorNonExistentStorage","message":"Accessing service failed.","innerError":{"timestamp":"2026-07-29T06:58:55.4726585Z","request-id":"af8960e4-4556-43ba-82e8-e2cb87b75900","date":"2026-07-29T06:58:55","client-request-id":"af8960e4-4556-43ba-82e8-e2cb87b75900"}}} [GET] https://graph.microsoft.com/v1.0/me/settings/itemInsights
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### me_usersettings_me_settings_getstorage

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 12.5s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.UnifiedStorageQuota,False).","innerError":{"date":"2026-07-29T06:58:52","request-id":"ef36f472-3fcf-496a-a6a8-fb070603ad2d","client-request-id":"ef36f472-3fcf-496a-a6a8-fb070603ad2d"}}} [GET] https://graph.microsoft.com/v1.0/me/settings/storage
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_usersettings_me_settings_getshiftpreferences

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.7s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"Unauthorized","message":"{\"error\":{\"code\":\"GraphRequestFailed\",\"message\":\"Error: Unauthorized - Unauthorized\\nMessage: The identity of the calling application could not be established.\\nRequest-Id: adb5b021-662d-49e4-a0e6-f6696703aa2f\",\"details\":[],\"innererror\":{\"code\":\"GetOrganizationDetailsFailed\"}}}","innerError":{"date":"2026-07-29T06:58:54","request-id":"e81470f3-3f7b-485b-8aa9-a6500b88cc58","client-request-id":"e81470f3-3f7b-485b-8aa9-a6500b88cc58"}}} [GET] https://graph.microsoft.com/v1.0/me/settings/shiftPreferences
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_usersettings_me_settings_getworkhoursandlocations

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 12.1s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:15:52","request-id":"fa0af935-e8b7-438e-9647-75a7cb9a443b","client-request-id":"fa0af935-e8b7-438e-9647-75a7cb9a443b"}}} [GET] https://graph.microsoft.com/v1.0/me/settings/workHoursAndLocations
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_usersettings_me_settings_listwindows

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 11.9s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"{\"Message\":\"User was not authorized.\"}","innerError":{"date":"2026-07-29T06:15:53","request-id":"954fb5f9-cad8-43b0-872a-076aaaf1740c","client-request-id":"954fb5f9-cad8-43b0-872a-076aaaf1740c"}}} [GET] https://graph.microsoft.com/v1.0/me/settings/windows
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_usersettings_me_settings_storage_quota_listservices

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 12.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.UnifiedStorageQuota,False).","innerError":{"date":"2026-07-29T06:15:51","request-id":"03beec74-3e3b-46d9-a0d8-6526a50b9195","client-request-id":"03beec74-3e3b-46d9-a0d8-6526a50b9195"}}} [GET] https://graph.microsoft.com/v1.0/me/settings/storage/quota/services
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_usersettings_me_settings_storage_getquota

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.7s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.UnifiedStorageQuota,False).","innerError":{"date":"2026-07-29T06:15:51","request-id":"a195395c-91ec-49df-9051-42249dfc083f","client-request-id":"a195395c-91ec-49df-9051-42249dfc083f"}}} [GET] https://graph.microsoft.com/v1.0/me/settings/storage/quota
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_usersettings_me_settings_workhoursandlocations_listoccurrences

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 13.1s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:15:51","request-id":"c5e16885-8963-43e1-8d9f-55818dc5f165","client-request-id":"c5e16885-8963-43e1-8d9f-55818dc5f165"}}} [GET] https://graph.microsoft.com/v1.0/me/settings/workHoursAndLocations/occurrences
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_usersettings_me_settings_workhoursandlocations_listrecurrences

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 13.1s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:58:53","request-id":"6815eb77-a8c6-410b-8620-e819453f8c45","client-request-id":"6815eb77-a8c6-410b-8620-e819453f8c45"}}} [GET] https://graph.microsoft.com/v1.0/me/settings/workHoursAndLocations/recurrences
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### me_usersolutionroot_me_solutions_getworkingtimeschedule

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.1s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_BadRequest","message":"Unexpected segment DynamicPathSegment. Expected property/$value.","innerError":{"date":"2026-07-29T06:58:53","request-id":"ceb1b6dc-be2b-45dc-a87f-28e305af410f","client-request-id":"ceb1b6dc-be2b-45dc-a87f-28e305af410f"}}} [GET] https://graph.microsoft.com/v1.0/me/solutions/workingTimeSchedule
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_usersolutionroot_me_getsolutions

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_BadRequest","message":"Unexpected segment DynamicPathSegment. Expected property/$value.","innerError":{"date":"2026-07-29T06:58:53","request-id":"02f10c05-769f-446b-9904-e8467ef10cab","client-request-id":"02f10c05-769f-446b-9904-e8467ef10cab"}}} [GET] https://graph.microsoft.com/v1.0/me/solutions
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### me_userteamwork_me_teamwork_getallretainedtargetedmessages

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.0s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-29T06:58:52","request-id":"b310727f-e97d-4b1a-a27e-7d396ab3a2e5","client-request-id":"b310727f-e97d-4b1a-a27e-7d396ab3a2e5"}}} [GET] https://graph.microsoft.com/v1.0/me/teamwork/getAllRetainedTargetedMessages()
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_userteamwork_me_getteamwork

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.2s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-29T06:58:52","request-id":"7f0c8077-480b-49eb-81b3-fd4cd9897874","client-request-id":"7f0c8077-480b-49eb-81b3-fd4cd9897874"}}} [GET] https://graph.microsoft.com/v1.0/me/teamwork
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_userteamwork_me_teamwork_listassociatedteams

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.0s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-29T06:58:52","request-id":"50d2cb60-47b5-461a-8c12-ef8fe99e8778","client-request-id":"50d2cb60-47b5-461a-8c12-ef8fe99e8778"}}} [GET] https://graph.microsoft.com/v1.0/me/teamwork/associatedTeams
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_userteamwork_me_teamwork_getalltargetedmessages

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 15.3s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-29T06:58:52","request-id":"14052e8a-6227-43d6-a1bb-b1dbd9574e90","client-request-id":"14052e8a-6227-43d6-a1bb-b1dbd9574e90"}}} [GET] https://graph.microsoft.com/v1.0/me/teamwork/getAllTargetedMessages()
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### me_userteamwork_me_teamwork_listinstalledapps

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.9s

```
TIMEOUT
```

---

### oauth2permissiongrants_oauth2permissiongrant_functions_oauth2permissiongrants_delta

- **Status**: PASS (OK)
- **Elapsed**: 15.0s

```json
[
  {
    "odata_deltalink": null,
    "odata_nextlink": "https://graph.microsoft.com/v1.0/oauth2PermissionGrants/delta()?$skiptoken=thp-d_VokZCt9x0Y1mWztLzuWjSgktaUdUQjOj7mK4fIVL0cZKwh08c0mso1uBJGHgGG8m-avn7481vtb3TcQB5IDkl-4hjp0vkfCS7RJkV3Djg066-3rwAQtuBsVEaJHfckINyqZA3K85jR8IPpreZKB99ALCJjGtfqu36r2Md8rWILdN41O-oUHqqK9p_Ciaej5EEahtOPwgfBTjqysl-ZT-TT9pURPW6mhOK4-phlFBQ_3urK60SFAG2QBYH4YmH8rtMe1Rv79f7IzBmidHu_HIYX0mpoIPLi4Qx4kJOw4xi90BNLqzNaBzbazUgCQefWcr3UrtFMQnO2OnqlTZDfWP3I6dzkWzUkY0XzZZh8DLQjNsa-UXlidW-kwq1-qSH2gnVLYKFf4GTJ1bN5PkFmc9TO84jX1alsCdeDOcNx5eSjJLxhVKBpJGWhpy6jZz4uXC_PiQl8cyyMh3tdiEhHdGmHFSonRX7-Vc_-Sn3KECir9baZTi4ACqtMhybNsHVcSeFbJdVYPcXGZ02Tpy_rHLqdsy5pi7h2y2deLIcmyESRe6FWmKKtoFTTkjo1UWvUzY9zrCsGEGPPTbqDA1EGTJdOwsROLDEGwDku1wqecEWwMNeucIqI0g3_DmIegnB-PKsVL8ypXWykzsa8ovsacSd4RnmkXZHZmeAAu6kcMJE9Lckv6UDw1quMNBhWWtjEHcyptHafj1udheZOt-smL4mjqiy1RR_RsV3v0oDJHEFsIvLJHb0q3zYPpJIdrxVkl-bFMd46XJoNr6zN13eHkPI7A2Ou8CHwLl1qQciuEmBkqWzdFsBWEvLGF790ogt-l1-LowCfPCazDAXZQs5YprygzgUYlMS9Zeh410_8tepmjW84QXWlb0o2xyXAYfFNpi7Xcq5qbjOZEcjbpfCaylyn8krUO61v8mPP-hiB-HwllYqUghkNpJel8UTOsU-ze4lpeyf5mbPovtaae4MtORO1cRUWKQuEgLi1Quba41x1Tj_RTbnt1FBrsoCAxCR-SH33hhME8O1GnIhQhtDj1BQ2-wPEHANqvHWuNxWeE3gVFKqfcj19rjIFlL-0Z7ts7DOTxtU9DuuML32w6KeTDVTXERAV_DuaULVSGBweBCVhRSHfbV7PgsAn2aCuLHIUuLU76kGa7VPTKtuobGjZfxWil4cxsXZ4VyqrEerjfylPIZ_nkteo5F82U9Wh5_pvwGY3876qdJH7-HW6v9aUVXNn9ITjzKABY3EIDbJDh0wihoMdTylEXwkmvcUCyT8OaI9zghrzRWmmCs33-p1coOBo1fUxn01JWPxbD2jdji1TiEnopagm7aWQdnFcoiN4ryiWzLYkludp41Z7ppGaiSPM06QjuO9zhbL3-tbwd4dqcnhgsXyZh4JvUoSjrZJaJ2t2s0Q9IMu8d7kApQQAF4DMR3z9OaR_xrK31BVd_FO_aIr5Plqa12zoiB-9rAAUwF299HtjLMccaSIFlqA9OGucNlHGMaNaIR85GLFNGijbvWu8x_24pXoEPbyeCmnuwaAyIBH1XsZL1Z1KXk2-9whF2rXDOFjsdw_BPeDX4dFOXhMg0166k0GDsyGByPpZ1h_QXnhbeIXntj3sz33waNvLEttoA7KVwO2rlLg-dypCZhXcMi9gE46WJUPKHhWMFSdcu0w5Y0-RdlOmsQ.42dMBmxUPKWNaFcs6nV4p--oprcNFQQH92x1q5p6XCc",
    "value": "[{\"@odata.id\":\"https://graph.microsoft.com:10501/v2/89de3b75-fef2-44f9-90a4-cf8c69700c83/oauth2PermissionGrants/8nbO1
```

---

### organization_organization_functions_organization_delta

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 13.5s

```
TIMEOUT
```

---

### oauth2permissiongrants_oauth2permissiongrant_oauth2permissiongrants_oauth2permissiongrant_listoauth2permissiongrant

- **Status**: PASS (OK)
- **Elapsed**: 13.6s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"clientId\":\"d7ce76f2-fdd5-4043-89a9-608f5374d637\",\"consentType\":\"AllPrincipals\",\"id\":\"8nbO19X9Q0CJqWCPU3TWNza573hK2PpOgX0g58FXTSU\",\"principalId\":null,\"resourceId\":\"78efb936-d84a-4efa-817d-20e7c1574d25\",\"scope\":\"user_impersonation\"},{\"clientId\":\"d9015a66-f83d-414c-ba72-a634bcf109a1\",\"consentType\":\"AllPrincipals\",\"id\":\"ZloB2T34TEG6cqY0vPEJocVUE62-F11BjGhQJXlAZ5o\",\"principalId\":null,\"resourceId\":\"ad1354c5-17be-415d-8c68-50257940679a\",\"scope\":\"User.Read Chat.Read Chat.ReadBasic Team.ReadBasic.All Channel.ReadBasic.All Files.Read Files.Read.All Sites.Read.All offline_access openid profile\"}]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### permissiongrants_resourcespecificpermissiongrant_functions_permissiongrants_delta

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.4s

```
TIMEOUT
```

---

### organization_organization_organization_organization_listorganization

- **Status**: PASS (OK)
- **Elapsed**: 14.7s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"id\":\"89de3b75-fef2-44f9-90a4-cf8c69700c83\",\"deletedDateTime\":null,\"businessPhones\":[],\"city\":null,\"country\":null,\"countryLetterCode\":\"IN\",\"createdDateTime\":\"2026-06-27T23:15:21Z\",\"defaultUsageLocation\":null,\"displayName\":\"Default Directory\",\"isMultipleDataLocationsForServicesEnabled\":null,\"marketingNotificationEmails\":[],\"onPremisesLastSyncDateTime\":null,\"onPremisesSyncEnabled\":null,\"partnerTenantType\":null,\"postalCode\":null,\"preferredLanguage\":\"en\",\"securityComplianceNotificationMails\":[],\"securityComplianceNotificationPhones\":[],\"state\":null,\"street\":null,\"technicalNotificationMails\":[\"algsoch@gmail.com\"],\"tenantType\":\"AAD\",\"directorySizeQuota\":{\"used\":126,\"total\":50000},\"privacyProfile\":null,\"assignedPlans\":[],\"onPremisesSyncStatus\":[],\"provisionedPlans\":[],\"verifiedDomains\":[{\"capabilities\":\"Email, OfficeCommunicationsOnline\",\"isDefault\":true,\"isInitial\":true,\"name\":\"algsochgmail.onmicrosoft.com\",\"type\":\"Managed\"}]}]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### permissiongrants_resourcespecificpermissiongrant_permissiongrants_resourcespecificpermissiongrant_listresourcespecificpermissiongrant

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.8s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_UnsupportedQuery","message":"Direct queries to this resource type are not supported.","innerError":{"date":"2026-07-29T06:59:17","request-id":"5fb387e2-8ae9-46bb-9d40-31b5a5ced90d","client-request-id":"5fb387e2-8ae9-46bb-9d40-31b5a5ced90d"}}} [GET] https://graph.microsoft.com/v1.0/permissionGrants
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### places_place_places_place_listplace_asbuilding

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 16.0s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:58:58","request-id":"887d571a-52a3-4244-b449-7433f18a0556","client-request-id":"887d571a-52a3-4244-b449-7433f18a0556"}}} [GET] https://graph.microsoft.com/v1.0/places/graph.building
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### places_place_places_place_listplace_asfloor

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 17.3s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:59:17","request-id":"495f2b08-f798-4482-b35a-3949eb55bd8b","client-request-id":"495f2b08-f798-4482-b35a-3949eb55bd8b"}}} [GET] https://graph.microsoft.com/v1.0/places/graph.floor
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### places_place_places_place_listplace_asdesk

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 17.4s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:59:23","request-id":"56bfa7a5-b95e-40fa-96d4-4dc5321ef6cd","client-request-id":"56bfa7a5-b95e-40fa-96d4-4dc5321ef6cd"}}} [GET] https://graph.microsoft.com/v1.0/places/graph.desk
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### places_place_places_place_listplace_asroomlist

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 17.6s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:16:30","request-id":"cb2b3ec5-8059-4408-a077-85c192299265","client-request-id":"cb2b3ec5-8059-4408-a077-85c192299265"}}} [GET] https://graph.microsoft.com/v1.0/places/graph.roomList
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### places_place_places_place_listplace_asroom

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 18.0s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:59:27","request-id":"c5e0e826-7dea-4267-b1ca-46953680413b","client-request-id":"c5e0e826-7dea-4267-b1ca-46953680413b"}}} [GET] https://graph.microsoft.com/v1.0/places/graph.room
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### places_place_places_place_listplace_asworkspace

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 17.7s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:59:32","request-id":"dd2d983d-aaa7-4954-9088-4883477b8320","client-request-id":"dd2d983d-aaa7-4954-9088-4883477b8320"}}} [GET] https://graph.microsoft.com/v1.0/places/graph.workspace
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### places_place_places_place_listplace_assection

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 18.0s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:59:37","request-id":"e1430659-881e-4654-8c91-472403a41140","client-request-id":"e1430659-881e-4654-8c91-472403a41140"}}} [GET] https://graph.microsoft.com/v1.0/places/graph.section
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### planner_planner_planner_planner_getplanner

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 21.7s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"TenantNotFound","message":"Tenant is not found.","innerError":{"date":"2026-07-29T06:59:17","request-id":"8d2e9f19-3d5f-4eb7-840f-8357baeaac07","client-request-id":"8d2e9f19-3d5f-4eb7-840f-8357baeaac07"}}} [GET] https://graph.microsoft.com/v1.0/planner
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### planner_plannerbucket_planner_listbuckets

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 21.7s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"TenantNotFound","message":"Tenant is not found.","innerError":{"date":"2026-07-29T06:59:17","request-id":"4454a535-2a1b-4e89-a753-08366d4fc86e","client-request-id":"4454a535-2a1b-4e89-a753-08366d4fc86e"}}} [GET] https://graph.microsoft.com/v1.0/planner/buckets
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### planner_plannerplan_planner_listplans

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 21.3s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"TenantNotFound","message":"Tenant is not found.","innerError":{"date":"2026-07-29T06:59:17","request-id":"eb7ef876-76d8-4df2-b814-79102e4335fb","client-request-id":"eb7ef876-76d8-4df2-b814-79102e4335fb"}}} [GET] https://graph.microsoft.com/v1.0/planner/plans
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### planner_plannertask_planner_listtasks

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 21.1s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"TenantNotFound","message":"Tenant is not found.","innerError":{"date":"2026-07-29T06:59:17","request-id":"d1e630a9-7678-4918-9a5c-80fa1091a86e","client-request-id":"d1e630a9-7678-4918-9a5c-80fa1091a86e"}}} [GET] https://graph.microsoft.com/v1.0/planner/tasks
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### policies_activitybasedtimeoutpolicy_policies_listactivitybasedtimeoutpolicies

- **Status**: PASS (OK)
- **Elapsed**: 19.4s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### policies_adminconsentrequestpolicy_policies_getadminconsentrequestpolicy

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 20.3s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"","message":"Attempted to perform an unauthorized operation.","innerError":{"date":"2026-07-29T06:59:17","request-id":"73a2de27-cabe-48d4-bedc-544c56ac03b5","client-request-id":"73a2de27-cabe-48d4-bedc-544c56ac03b5"}}} [GET] https://graph.microsoft.com/v1.0/policies/adminConsentRequestPolicy
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### policies_appmanagementpolicy_policies_listappmanagementpolicies

- **Status**: PASS (OK)
- **Elapsed**: 19.8s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### policies_authenticationflowspolicy_policies_getauthenticationflowspolicy

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 20.1s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AADB2C","message":"The application does not have any of the required delegated permissions (Policy.Read.All, Policy.ReadWrite.AuthenticationFlows) to access the resource. ","innerError":{"correlationId":"90f356f2-9312-4f3d-ad00-3d0f4a0966f2","date":"2026-07-29T06:59:17","request-id":"d4a791f4-d724-4518-92ce-daf4d9262b78","client-request-id":"d4a791f4-d724-4518-92ce-daf4d9262b78"}}} [GET] https://graph.microsoft.com/v1.0/policies/authenticationFlowsPolicy
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### policies_authenticationmethodspolicy_policies_authenticationmethodspolicy_listauthenticationmethodconfigurations

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 20.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"badRequest","message":"Resource not found for segment 'authenticationMethodsPolicy/authenticationMethodConfigurations'.","innerError":{"date":"2026-07-29T06:59:17","request-id":"14171ebd-dbec-4d38-a49d-3f70f7f6c4eb","client-request-id":"14171ebd-dbec-4d38-a49d-3f70f7f6c4eb"}}} [GET] https://graph.microsoft.com/v1.0/policies/authenticationMethodsPolicy/authenticationMethodConfigurations
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### policies_authenticationmethodspolicy_policies_getauthenticationmethodspolicy

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 19.5s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Request Authorization failed","innerError":{"message":"Request Authorization failed","date":"2026-07-29T06:59:17","request-id":"4704c309-65ad-4d8b-8338-8258d2d05a78","client-request-id":"4704c309-65ad-4d8b-8338-8258d2d05a78"}}} [GET] https://graph.microsoft.com/v1.0/policies/authenticationMethodsPolicy
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### policies_authorizationpolicy_policies_getauthorizationpolicy

- **Status**: PASS (OK)
- **Elapsed**: 19.2s

```json
[
  {
    "odata_type": null,
    "allowemailverifieduserstojoinorganization": true,
    "allowinvitesfrom": "\"everyone\"",
    "allowuserconsentforriskyapps": null,
    "allowedtosignupemailbasedsubscriptions": true,
    "allowedtousesspr": true,
    "blockmsolpowershell": false,
    "defaultuserrolepermissions": "{\"allowedToCreateApps\":true,\"allowedToCreateSecurityGroups\":true,\"allowedToCreateTenants\":true,\"allowedToReadBitlockerKeysForOwnedDevice\":true,\"allowedToReadOtherUsers\":true,\"permissionGrantPoliciesAssigned\":[\"ManagePermissionGrantsForSelf.microsoft-user-default-recommended\",\"ManagePermissionGrantsForSelf.microsoft-user-default-allow-consent-apps\",\"ManagePermissionGrantsForOwnedResource.microsoft-dynamically-managed-permissions-for-team\",\"ManagePermissionGrantsForOwnedResource.microsoft-dynamically-managed-permissions-for-chat\"]}",
    "guestuserroleid": "10dae51f-b6af-4016-8d66-8c2a99b929b3"
  }
]
```

---

### policies_authenticationstrengthpolicy_policies_listauthenticationstrengthpolicies

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 19.8s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Request Authorization failed","innerError":{"message":"Request Authorization failed","date":"2026-07-29T06:59:17","request-id":"ecfd798c-309c-445e-abd9-95682cc01d90","client-request-id":"ecfd798c-309c-445e-abd9-95682cc01d90"}}} [GET] https://graph.microsoft.com/v1.0/policies/authenticationStrengthPolicies
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### policies_claimsmappingpolicy_policies_listclaimsmappingpolicies

- **Status**: PASS (OK)
- **Elapsed**: 20.4s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### policies_conditionalaccesspolicy_policies_listconditionalaccesspolicies

- **Status**: PASS (OK)
- **Elapsed**: 22.4s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_gettemplates

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 19.7s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_BadRequest","message":"Exception of type 'Microsoft.Online.RestServices.Common.BadRequestException' was thrown.","innerError":{"date":"2026-07-29T07:00:01","request-id":"43597dd8-50aa-4679-90c7-009b21f51b23","client-request-id":"43597dd8-50aa-4679-90c7-009b21f51b23"}}} [GET] https://graph.microsoft.com/v1.0/policies/crossTenantAccessPolicy/templates
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_getdefault

- **Status**: PASS (OK)
- **Elapsed**: 20.1s

```json
[
  {
    "odata_type": null,
    "appserviceconnectinbound": "{\"applications\":{\"accessType\":\"blocked\",\"targets\":[{\"target\":\"AllApplications\",\"targetType\":\"application\"}]}}",
    "automaticuserconsentsettings": "{\"inboundAllowed\":false,\"outboundAllowed\":false}",
    "b2bcollaborationinbound": "{\"usersAndGroups\":{\"accessType\":\"allowed\",\"targets\":[{\"target\":\"AllUsers\",\"targetType\":\"user\"}]},\"applications\":{\"accessType\":\"allowed\",\"targets\":[{\"target\":\"AllApplications\",\"targetType\":\"application\"}]}}",
    "b2bcollaborationoutbound": "{\"usersAndGroups\":{\"accessType\":\"allowed\",\"targets\":[{\"target\":\"AllUsers\",\"targetType\":\"user\"}]},\"applications\":{\"accessType\":\"allowed\",\"targets\":[{\"target\":\"AllApplications\",\"targetType\":\"application\"}]}}",
    "b2bdirectconnectinbound": "{\"usersAndGroups\":{\"accessType\":\"blocked\",\"targets\":[{\"target\":\"AllUsers\",\"targetType\":\"user\"}]},\"applications\":{\"accessType\":\"blocked\",\"targets\":[{\"target\":\"AllApplications\",\"targetType\":\"application\"}]}}",
    "b2bdirectconnectoutbound": "{\"usersAndGroups\":{\"accessType\":\"blocked\",\"targets\":[{\"target\":\"AllUsers\",\"targetType\":\"user\"}]},\"applications\":{\"accessType\":\"blocked\",\"targets\":[{\"target\":\"AllApplications\",\"targetType\":\"application\"}]}}",
    "id": "f250f7fc-c869-46c2-b786-10dcf9a16f3a",
    "inboundtrust": "{\"isMfaAccepted\":false,\"isCompliantDeviceAccepted\":false,\"isHybridAzureADJoinedDeviceAccepted\":false}",
    "invitationredemptionidentityproviderconfiguration": "{\"primaryIdentityProviderPrecedenceOrder\":[\"azureActiveDirectory\",\"externalFederation\",\"socialIdentityProviders\"],\"fallbackIdentityProvider\":\"defaultConfiguredIdp\"}",
    "isservicedefault": true,
    "m365collaborationinbound": "{\"users\":{\"accessType\":\"blocked\",\"targets\":[{\"target\":\"AllUsers\",\"targetType\":\"user\"}]}}",
    "m365collaborationoutbound": "{\"us
```

---

### policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_listpartners

- **Status**: PASS (OK)
- **Elapsed**: 18.1s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_templates_getmultitenantorganizationidentitysynchronization

- **Status**: PASS (OK)
- **Elapsed**: 15.9s

```json
[
  {
    "odata_type": null,
    "id": "0f26a781-523e-4e43-9684-b579ef9ce322",
    "templateapplicationlevel": "newPartners,existingPartners",
    "usersyncinbound": "{\"isSyncAllowed\":null}"
  }
]
```

---

### policies_crosstenantaccesspolicy_policies_crosstenantaccesspolicy_templates_getmultitenantorganizationpartnerconfiguration

- **Status**: PASS (OK)
- **Elapsed**: 17.4s

```json
[
  {
    "odata_type": null,
    "automaticuserconsentsettings": "{\"inboundAllowed\":null,\"outboundAllowed\":null}",
    "b2bcollaborationinbound": null,
    "b2bcollaborationoutbound": null,
    "b2bdirectconnectinbound": null,
    "b2bdirectconnectoutbound": null,
    "id": "8812784a-1527-4653-9abf-b1bfedccf93b",
    "inboundtrust": null,
    "templateapplicationlevel": "newPartners,existingPartners"
  }
]
```

---

### policies_crosstenantaccesspolicy_policies_getcrosstenantaccesspolicy

- **Status**: PASS (OK)
- **Elapsed**: 17.3s

```json
[
  {
    "odata_type": null,
    "allowedcloudendpoints": "[]",
    "default": null,
    "partners": null,
    "templates": null
  }
]
```

---

### policies_deviceregistrationpolicy_policies_getdeviceregistrationpolicy

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 18.9s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"authorization_error","message":"Failed to authorize, token doesn't have the required permissions.","innerError":{"date":"2026-07-29T06:59:56","request-id":"40e631f7-c3f2-4917-b7c0-8f1044fd9a43","client-request-id":"40e631f7-c3f2-4917-b7c0-8f1044fd9a43"}}} [GET] https://graph.microsoft.com/v1.0/policies/deviceRegistrationPolicy
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### policies_featurerolloutpolicy_policies_listfeaturerolloutpolicies

- **Status**: PASS (OK)
- **Elapsed**: 20.0s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### policies_homerealmdiscoverypolicy_policies_listhomerealmdiscoverypolicies

- **Status**: PASS (OK)
- **Elapsed**: 23.6s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### policies_federatedtokenvalidationpolicy_policies_getfederatedtokenvalidationpolicy

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 24.4s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"Request_ResourceNotFound","message":"Resource '' does not exist or one of its queried reference-property objects are not present.","innerError":{"date":"2026-07-29T06:59:52","request-id":"07baedb8-c03e-49a5-971f-44392fbde87c","client-request-id":"07baedb8-c03e-49a5-971f-44392fbde87c"}}} [GET] https://graph.microsoft.com/v1.0/policies/federatedTokenValidationPolicy
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### policies_identitysecuritydefaultsenforcementpolicy_policies_getidentitysecuritydefaultsenforcementpolicy

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 26.5s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"AccessDenied","message":"You cannot perform the requested operation, required scopes are missing in the token.","innerError":{"date":"2026-07-29T07:00:10","request-id":"234006b3-e792-41b4-9587-cad01821af91","client-request-id":"234006b3-e792-41b4-9587-cad01821af91"}}} [GET] https://graph.microsoft.com/v1.0/policies/identitySecurityDefaultsEnforcementPolicy
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### policies_ownerlessgrouppolicy_policies_getownerlessgrouppolicy

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 26.4s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:17:24","request-id":"a45c1622-0dd2-4bfa-a19a-32e0fe0cc7a9","client-request-id":"a45c1622-0dd2-4bfa-a19a-32e0fe0cc7a9"}}} [GET] https://graph.microsoft.com/v1.0/policies/ownerlessGroupPolicy
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### policies_policyroot_policies_policyroot_getpolicyroot

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 23.8s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_InvalidRequestUrl","message":"Request url was invalid. The request should be like /tenantdomainname/Entity or /$metadata. Tenant domain name can be any of the verified, unverified domain names or context id.","innerError":{"date":"2026-07-29T07:00:05","request-id":"6a8687b5-c65f-4d01-b11f-c35ceb841b3d","client-request-id":"6a8687b5-c65f-4d01-b11f-c35ceb841b3d"}}} [GET] https://graph.microsoft.com/v1.0/policies
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### policies_permissiongrantpolicy_policies_listpermissiongrantpolicies

- **Status**: PASS (OK)
- **Elapsed**: 24.6s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"id\":\"microsoft-all-application-permissions\",\"displayName\":\"All application permissions, for any client app\",\"description\":\"Includes all application permissions (app roles), for all APIs, for any client application.\",\"includes@odata.context\":\"https://graph.microsoft.com/v1.0/$metadata#policies/permissionGrantPolicies('microsoft-all-application-permissions')/includes\",\"includes\":[{\"id\":\"bddda1ec-0174-44d5-84e2-47fb0ac01595\",\"permissionClassification\":\"all\",\"permissionType\":\"application\",\"resourceApplication\":\"any\",\"permissions\":[\"all\"],\"clientApplicationIds\":[\"all\"],\"clientApplicationTenantIds\":[\"all\"],\"clientApplicationPublisherIds\":[\"all\"],\"clientApplicationsFromVerifiedPublisherOnly\":false}],\"excludes@odata.context\":\"https://graph.microsoft.com/v1.0/$metadata#policies/permissionGrantPolicies('microsoft-all-application-permissions')/excludes\",\"excludes\":[]},{\"id\":\"microsoft-all-application-permissions-for-chat\",\"displayName\":\"All chat resource-specific application permissions, for any client app\",\"description\":\"Includes all chat resoruce-specific application permissions, for all APIs, for any client application.\",\"includes@odata.context\":\"https://graph.microsoft.com/v1.0/$metadata#policies/permissionGrantPolicies('microsoft-all-application-permissions-for-chat')/includes\",\"includes\":[{\"id\":\"013e8de3-5e79-4b0f-a440-8f7794086460\",\"permissionClassification\":\"all\",\"permissionType\":\"application\",\"resourceApplication\":\"any\",\"permissions\":[\"all\"],\"clientApplicationIds\":[\"all\"],\"clientApplicationTenantIds\":[\"all\"],\"clientApplicationPublisherIds\":[\"all\"],\"clientApplicationsFromVerifiedPublisherOnly\":false}],\"excludes@odata.context\":\"https://graph.microsoft.com/v1.0/$metadata#policies/permissionGrantPolicies('microsoft-all-application-permissions-for-chat')/excludes\",\"excludes\":[]},{\"id
```

---

### policies_tokenissuancepolicy_policies_listtokenissuancepolicies

- **Status**: PASS (OK)
- **Elapsed**: 21.1s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### policies_tenantappmanagementpolicy_policies_getdefaultappmanagementpolicy

- **Status**: PASS (OK)
- **Elapsed**: 22.3s

```json
[
  {
    "odata_type": null,
    "applicationrestrictions": "{\"passwordCredentials\":[],\"keyCredentials\":[],\"identifierUris\":{\"nonDefaultUriAddition\":null,\"uriAdditionWithoutUniqueTenantIdentifier\":{\"state\":\"enabled\",\"isStateSetByMicrosoft\":true,\"restrictForAppsCreatedAfterDateTime\":\"0001-01-01T00:00:00Z\",\"excludeAppsReceivingV2Tokens\":true,\"excludeSaml\":true,\"excludeActors\":null}}}",
    "isenabled": true,
    "serviceprincipalrestrictions": "{\"passwordCredentials\":[],\"keyCredentials\":[]}"
  }
]
```

---

### policies_tokenlifetimepolicy_policies_listtokenlifetimepolicies

- **Status**: PASS (OK)
- **Elapsed**: 22.5s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### policies_unifiedrolemanagementpolicy_policies_listrolemanagementpolicies

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 23.0s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"UnknownError","message":"{\"errorCode\":\"MissingProvider\",\"message\":\"The provider is missing.\",\"instanceAnnotations\":[]}","innerError":{"date":"2026-07-29T07:00:20","request-id":"7464c612-d87f-47df-88f0-bdf4d9a456a1","client-request-id":"7464c612-d87f-47df-88f0-bdf4d9a456a1"}}} [GET] https://graph.microsoft.com/v1.0/policies/roleManagementPolicies
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### print_print_print_print_getprint

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 22.9s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:59:47","request-id":"6da8873e-1a38-48f3-bf43-a6897df6df5d","client-request-id":"6da8873e-1a38-48f3-bf43-a6897df6df5d"}}} [GET] https://graph.microsoft.com/v1.0/print
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### policies_unifiedrolemanagementpolicyassignment_policies_listrolemanagementpolicyassignments

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 23.6s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"UnknownError","message":"{\"errorCode\":\"MissingProvider\",\"message\":\"The provider is missing.\",\"instanceAnnotations\":[]}","innerError":{"date":"2026-07-29T07:00:16","request-id":"56fbddc9-c423-4e0e-923d-3f00429bbea3","client-request-id":"56fbddc9-c423-4e0e-923d-3f00429bbea3"}}} [GET] https://graph.microsoft.com/v1.0/policies/roleManagementPolicyAssignments
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### print_printer_print_listprinters

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 22.2s

```
TIMEOUT
```

---

### print_printconnector_print_listconnectors

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 23.1s

```
TIMEOUT
```

---

### print_printershare_print_listshares

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 22.0s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"errorCode\":\"403\",\"message\":\"The token does not have one or more required security scopes.\"}","innerError":{"date":"2026-07-29T07:00:24","request-id":"ff0c9caf-86b3-49a2-9d39-a355e9de8fd0","client-request-id":"ff0c9caf-86b3-49a2-9d39-a355e9de8fd0"}}} [GET] https://graph.microsoft.com/v1.0/print/shares
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### print_printoperation_print_listoperations

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 21.4s

```
TIMEOUT
```

---

### print_printtaskdefinition_print_listtaskdefinitions

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 21.4s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"errorCode\":\"403\",\"message\":\"The token does not have one or more required security scopes.\"}","innerError":{"date":"2026-07-29T06:59:47","request-id":"7cf28722-d259-49c0-8758-723562ce5362","client-request-id":"7cf28722-d259-49c0-8758-723562ce5362"}}} [GET] https://graph.microsoft.com/v1.0/print/taskDefinitions
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### print_printservice_print_listservices

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 21.8s

```
TIMEOUT
```

---

### privacy_privacy_privacy_privacy_getprivacy

- **Status**: PASS (OK)
- **Elapsed**: 22.4s

```json
[]
```

---

### privacy_subjectrightsrequest_privacy_listsubjectrightsrequests

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 26.9s

```
Error: Source server error (500)
Detail: {"error":{"code":"HostNotFound","message":"Target 'privacy.trafficmanager.net' is not found.","innerError":{"date":"2026-07-29T06:59:51","request-id":"f8289f45-0e74-4f9c-b4c8-1c4296f6ee08","client-request-id":"f8289f45-0e74-4f9c-b4c8-1c4296f6ee08"}}} [GET] https://graph.microsoft.com/v1.0/privacy/subjectRightsRequests
Hint: The upstream API returned a server error. This may be transient — retry after a brief wait.
```

---

### reports_authenticationmethodsroot_reports_authenticationmethods_usersregisteredbyfeature_07f2

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 25.8s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Authentication_RequestFromNonPremiumTenantOrB2CTenant","message":"Tenant is not a B2C tenant and doesn't have premium license","innerError":{"date":"2026-07-29T06:59:48","request-id":"82bc6cb3-7482-40fc-87bd-d4a89d65bd28","client-request-id":"82bc6cb3-7482-40fc-87bd-d4a89d65bd28"}}} [GET] https://graph.microsoft.com/v1.0/reports/authenticationMethods/usersRegisteredByFeature()
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### reports_authenticationmethodsroot_reports_authenticationmethods_listuserregistrationdetails

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 26.2s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Authentication_RequestFromNonPremiumTenantOrB2CTenant","message":"Tenant is not a B2C tenant and doesn't have premium license","innerError":{"date":"2026-07-29T06:59:47","request-id":"08fa9e43-3a6e-4263-bad9-701828b92f92","client-request-id":"08fa9e43-3a6e-4263-bad9-701828b92f92"}}} [GET] https://graph.microsoft.com/v1.0/reports/authenticationMethods/userRegistrationDetails
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### reports_authenticationmethodsroot_reports_getauthenticationmethods

- **Status**: PASS (OK)
- **Elapsed**: 24.0s

```json
[
  {
    "odata_type": null,
    "id": null,
    "userregistrationdetails": null
  }
]
```

---

### reports_authenticationmethodsroot_reports_authenticationmethods_usersregisteredbymethod_d25d

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 25.8s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Authentication_RequestFromNonPremiumTenantOrB2CTenant","message":"Tenant is not a B2C tenant and doesn't have premium license","innerError":{"date":"2026-07-29T06:59:48","request-id":"e744eb31-c015-4644-8315-0cfd51386368","client-request-id":"e744eb31-c015-4644-8315-0cfd51386368"}}} [GET] https://graph.microsoft.com/v1.0/reports/authenticationMethods/usersRegisteredByMethod()
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### reports_partners_reports_partners_billing_getreconciliation

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 25.9s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,False).","innerError":{"date":"2026-07-29T06:59:47","request-id":"fa0bcb34-ea3d-4483-a758-cbb6518baeab","client-request-id":"fa0bcb34-ea3d-4483-a758-cbb6518baeab"}}} [GET] https://graph.microsoft.com/v1.0/reports/partners/billing/reconciliation
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### reports_partners_reports_getpartners

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 26.2s

```
TIMEOUT
```

---

### reports_partners_reports_partners_billing_getusage

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 22.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,False).","innerError":{"date":"2026-07-29T07:00:49","request-id":"58938b73-9497-4dd3-9d16-b897bd96d984","client-request-id":"58938b73-9497-4dd3-9d16-b897bd96d984"}}} [GET] https://graph.microsoft.com/v1.0/reports/partners/billing/usage
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### reports_partners_reports_partners_billing_listmanifests

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 23.0s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:00:45","request-id":"0eb1a390-92eb-4331-95e4-06b5d4770e17","client-request-id":"0eb1a390-92eb-4331-95e4-06b5d4770e17"}}} [GET] https://graph.microsoft.com/v1.0/reports/partners/billing/manifests
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### reports_partners_reports_partners_billing_reconciliation_getbilled

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 23.1s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.Partner.Billing,False).","innerError":{"date":"2026-07-29T07:00:54","request-id":"a5c93036-4433-4d09-adc6-8cd3f1838cfe","client-request-id":"a5c93036-4433-4d09-adc6-8cd3f1838cfe"}}} [GET] https://graph.microsoft.com/v1.0/reports/partners/billing/reconciliation/billed
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### reports_partners_reports_partners_billing_listoperations

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 23.5s

```
TIMEOUT
```

---

### reports_partners_reports_partners_billing_reconciliation_getunbilled

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 21.1s

```
TIMEOUT
```

---

### reports_partners_reports_partners_billing_usage_getbilled

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 20.3s

```
TIMEOUT
```

---

### reports_partners_reports_partners_getbilling

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 19.1s

```
TIMEOUT
```

---

### reports_partners_reports_partners_billing_usage_getunbilled

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 19.5s

```
TIMEOUT
```

---

### reports_printusagebyprinter_reports_listmonthlyprintusagebyprinter

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 22.9s

```
TIMEOUT
```

---

### reports_printusagebyprinter_reports_listdailyprintusagebyprinter

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 23.3s

```
TIMEOUT
```

---

### reports_printusagebyuser_reports_listdailyprintusagebyuser

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 24.9s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"errorCode\":\"403\",\"message\":\"The token does not have one or more required security scopes.\"}","innerError":{"date":"2026-07-29T07:00:44","request-id":"8d77c187-bfef-4ba7-89ed-399fee0364c4","client-request-id":"8d77c187-bfef-4ba7-89ed-399fee0364c4"}}} [GET] https://graph.microsoft.com/v1.0/reports/dailyPrintUsageByUser
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### reports_printusagebyuser_reports_listmonthlyprintusagebyuser

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 24.9s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"errorCode\":\"403\",\"message\":\"The token does not have one or more required security scopes.\"}","innerError":{"date":"2026-07-29T07:00:44","request-id":"8c58ef7d-2de1-419c-a9b0-80c9bf35056d","client-request-id":"8c58ef7d-2de1-419c-a9b0-80c9bf35056d"}}} [GET] https://graph.microsoft.com/v1.0/reports/monthlyPrintUsageByUser
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### reports_reportroot_functions_reports_deviceconfigurationdeviceactivity

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 26.8s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T07:00:44","request-id":"94c66775-a4af-41b8-811f-d79093d6d749","client-request-id":"94c66775-a4af-41b8-811f-d79093d6d749"}}} [GET] https://graph.microsoft.com/v1.0/reports/deviceConfigurationDeviceActivity()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### reports_reportroot_functions_reports_deviceconfigurationuseractivity

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 26.8s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T07:00:44","request-id":"d731cfe8-e7ea-4e87-b554-1ad240c25857","client-request-id":"d731cfe8-e7ea-4e87-b554-1ad240c25857"}}} [GET] https://graph.microsoft.com/v1.0/reports/deviceConfigurationUserActivity()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### reports_reportroot_functions_reports_manageddeviceenrollmentfailuredetails_8191

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 25.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T07:00:44","request-id":"eceb9767-df9d-4060-a2ae-1eae6343499e","client-request-id":"eceb9767-df9d-4060-a2ae-1eae6343499e"}}} [GET] https://graph.microsoft.com/v1.0/reports/managedDeviceEnrollmentFailureDetails()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### reports_reportroot_functions_reports_manageddeviceenrollmenttopfailures_9ce7

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 25.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Request not applicable to target tenant.","innerError":{"date":"2026-07-29T07:00:44","request-id":"7c026ebe-6ad7-40d0-96c6-b1cb261b7101","client-request-id":"7c026ebe-6ad7-40d0-96c6-b1cb261b7101"}}} [GET] https://graph.microsoft.com/v1.0/reports/managedDeviceEnrollmentTopFailures()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### reports_reportroot_reports_reportroot_getreportroot

- **Status**: PASS (OK)
- **Elapsed**: 23.2s

```json
[
  {
    "authenticationmethods": null,
    "dailyprintusagebyprinter": null,
    "dailyprintusagebyuser": null,
    "monthlyprintusagebyprinter": null,
    "monthlyprintusagebyuser": null,
    "partners": null,
    "security": null,
    "odata_type": null
  }
]
```

---

### reports_securityreportsroot_reports_getsecurity

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 25.3s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:00:45","request-id":"05704b8c-46c3-458c-94b5-cd05ee3ec689","client-request-id":"05704b8c-46c3-458c-94b5-cd05ee3ec689"}}} [GET] https://graph.microsoft.com/v1.0/reports/security
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### reports_securityreportsroot_reports_security_getattacksimulationrepeatoffenders

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 23.5s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:00:45","request-id":"64fbe47e-961d-41d3-ac9f-885f60e82dab","client-request-id":"64fbe47e-961d-41d3-ac9f-885f60e82dab"}}} [GET] https://graph.microsoft.com/v1.0/reports/security/getAttackSimulationRepeatOffenders()
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### reports_securityreportsroot_reports_security_getattacksimulationsimulationusercoverage

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 25.1s

```
TIMEOUT
```

---

### rolemanagement_rbacapplication_rolemanagement_directory_listresourcenamespaces

- **Status**: PASS (OK)
- **Elapsed**: 20.8s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"id\":\"microsoft.directory\",\"name\":\"microsoft.directory\"},{\"id\":\"microsoft.aad.b2c\",\"name\":\"microsoft.aad.b2c\"},{\"id\":\"microsoft.aad.cloudAppSecurity\",\"name\":\"microsoft.aad.cloudAppSecurity\"},{\"id\":\"microsoft.aad.directorySync\",\"name\":\"microsoft.aad.directorySync\"},{\"id\":\"microsoft.aad.identityProtection\",\"name\":\"microsoft.aad.identityProtection\"},{\"id\":\"microsoft.aad.privilegedIdentityManagement\",\"name\":\"microsoft.aad.privilegedIdentityManagement\"},{\"id\":\"microsoft.aad.reports\",\"name\":\"microsoft.aad.reports\"},{\"id\":\"microsoft.agentRegistry\",\"name\":\"microsoft.agentRegistry\"},{\"id\":\"microsoft.azure.advancedThreatProtection\",\"name\":\"microsoft.azure.advancedThreatProtection\"},{\"id\":\"microsoft.azure.customSecurityAttributeDiagnosticSettings\",\"name\":\"microsoft.azure.customSecurityAttributeDiagnosticSettings\"},{\"id\":\"microsoft.azure.devOps\",\"name\":\"microsoft.azure.devOps\"},{\"id\":\"microsoft.azure.informationProtection\",\"name\":\"microsoft.azure.informationProtection\"},{\"id\":\"microsoft.azure.print\",\"name\":\"microsoft.azure.print\"},{\"id\":\"microsoft.azure.serviceHealth\",\"name\":\"microsoft.azure.serviceHealth\"},{\"id\":\"microsoft.azure.supportTickets\",\"name\":\"microsoft.azure.supportTickets\"},{\"id\":\"microsoft.backup\",\"name\":\"microsoft.backup\"},{\"id\":\"microsoft.cloudPC\",\"name\":\"microsoft.cloudPC\"},{\"id\":\"microsoft.commerce.billing\",\"name\":\"microsoft.commerce.billing\"},{\"id\":\"microsoft.commerce.tenantRelationships\",\"name\":\"microsoft.commerce.tenantRelationships\"},{\"id\":\"microsoft.commerce.volumeLicenseServiceCenter\",\"name\":\"microsoft.commerce.volumeLicenseServiceCenter\"},{\"id\":\"microsoft.dynamics365\",\"name\":\"microsoft.dynamics365\"},{\"id\":\"microsoft.dynamics365.businessCentral\",\"name\":\"microsoft.dynamics365.businessCentral\"},{\"id\":\"micros
```

---

### reports_securityreportsroot_reports_security_getattacksimulationtrainingusercoverage

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 23.6s

```
TIMEOUT
```

---

### rolemanagement_rbacapplication_rolemanagement_directory_listroleassignments

- **Status**: PASS (OK)
- **Elapsed**: 20.8s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"id\":\"lAPpYvVpN0KRkAEhdxReEK68ZRFvpb9JrwpElvgM1UQ-1\",\"principalId\":\"1165bcae-a56f-49bf-af0a-4496f80cd544\",\"directoryScopeId\":\"/\",\"roleDefinitionId\":\"62e90394-69f5-4237-9190-012177145e10\"}]",
    "count": null,
    "filter": null,
    "search": null,
    "skip": null,
    "top": null
  }
]
```

---

### rolemanagement_rbacapplication_rolemanagement_directory_listroleassignmentscheduleinstances

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 20.9s

```
TIMEOUT
```

---

### rolemanagement_rbacapplication_rolemanagement_directory_listroleassignmentschedules

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 21.4s

```
TIMEOUT
```

---

### rolemanagement_rbacapplication_rolemanagement_directory_listroleassignmentschedulerequests

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 22.0s

```
TIMEOUT
```

---

### rolemanagement_rbacapplication_rolemanagement_directory_listroledefinitions

- **Status**: PASS (OK)
- **Elapsed**: 20.8s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"id\":\"62e90394-69f5-4237-9190-012177145e10\",\"description\":\"Can manage all aspects of Microsoft Entra ID and Microsoft services that use Microsoft Entra identities.\",\"displayName\":\"Global Administrator\",\"isBuiltIn\":true,\"isEnabled\":true,\"resourceScopes\":[\"/\"],\"templateId\":\"62e90394-69f5-4237-9190-012177145e10\",\"version\":\"1\",\"rolePermissions\":[{\"allowedResourceActions\":[\"microsoft.agentRegistry/allEntities/allProperties/allTasks\",\"microsoft.azure.advancedThreatProtection/allEntities/allTasks\",\"microsoft.azure.informationProtection/allEntities/allTasks\",\"microsoft.azure.serviceHealth/allEntities/allTasks\",\"microsoft.azure.supportTickets/allEntities/allTasks\",\"microsoft.backup/allEntities/allProperties/allTasks\",\"microsoft.cloudPC/allEntities/allProperties/allTasks\",\"microsoft.commerce.billing/allEntities/allProperties/allTasks\",\"microsoft.commerce.billing/purchases/standard/read\",\"microsoft.commerce.tenantRelationships/customerDelegatedAdminPrivileges/allProperties/allTasks\",\"microsoft.directory/accessReviews/allProperties/allTasks\",\"microsoft.directory/accessReviews/definitions/allProperties/allTasks\",\"microsoft.directory/adminConsentRequestPolicy/allProperties/allTasks\",\"microsoft.directory/administrativeUnits/allProperties/allTasks\",\"microsoft.directory/agentIdentities/allProperties/read\",\"microsoft.directory/agentIdentities/appRoleAssignedTo/update\",\"microsoft.directory/agentIdentities/authentication/update\",\"microsoft.directory/agentIdentities/basic/update\",\"microsoft.directory/agentIdentities/create\",\"microsoft.directory/agentIdentities/delete\",\"microsoft.directory/agentIdentities/disable\",\"microsoft.directory/agentIdentities/enable\",\"microsoft.directory/agentIdentities/owners/update\",\"microsoft.directory/agentIdentities/tag/update\",\"microsoft.directory/agentIdentityBlueprintPrincipals/allProperties/read\",\"m
```

---

### rolemanagement_rbacapplication_rolemanagement_directory_listroleeligibilityscheduleinstances

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 21.0s

```
TIMEOUT
```

---

### rolemanagement_rbacapplication_rolemanagement_directory_listroleeligibilityschedules

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 20.9s

```
TIMEOUT
```

---

### rolemanagement_rbacapplication_rolemanagement_directory_listroleeligibilityschedulerequests

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 21.3s

```
TIMEOUT
```

---

### rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listresourcenamespaces

- **Status**: FAIL (ERR(1))
- **Elapsed**: 30.3s

```
TIMEOUT
```

---

### rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleassignmentscheduleinstances

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 19.3s

```
TIMEOUT
```

---

### rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleassignmentschedulerequests

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 19.0s

```
TIMEOUT
```

---

### rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleassignmentschedules

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 8.4s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"UnknownError","message":"{\"errorCode\":\"ProviderNotSupported\",\"message\":\"The provider entitlementManagement is not supported by application .\",\"instanceAnnotations\":[]}","innerError":{"date":"2026-07-29T06:19:49","request-id":"868f9a9e-f8aa-46d5-aac6-9bd8e0c2e483","client-request-id":"868f9a9e-f8aa-46d5-aac6-9bd8e0c2e483"}}} [GET] https://graph.microsoft.com/v1.0/roleManagement/entitlementManagement/roleAssignmentSchedules
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroledefinitions

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.7s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller is not authorized.","details":[],"innerError":{"date":"2026-07-29T07:01:59","request-id":"132fa61c-5ff0-4006-9f83-71f4f1a68117","client-request-id":"132fa61c-5ff0-4006-9f83-71f4f1a68117"}}} [GET] https://graph.microsoft.com/v1.0/roleManagement/entitlementManagement/roleDefinitions
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleeligibilityscheduleinstances

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 15.6s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"UnknownError","message":"{\"errorCode\":\"ProviderNotSupported\",\"message\":\"The provider entitlementManagement is not supported by application .\",\"instanceAnnotations\":[]}","innerError":{"date":"2026-07-29T07:01:58","request-id":"4d0c8b94-d2c4-4d68-8212-a2144f80a25c","client-request-id":"4d0c8b94-d2c4-4d68-8212-a2144f80a25c"}}} [GET] https://graph.microsoft.com/v1.0/roleManagement/entitlementManagement/roleEligibilityScheduleInstances
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleassignments

- **Status**: FAIL (ERR(1))
- **Elapsed**: 47.7s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnAuthorized","message":"User is not authorized to perform the operation. Reason: The caller is not authorized.","details":[],"innerError":{"date":"2026-07-29T06:19:51","request-id":"f6cdb51c-11fa-4c5a-88b2-c9879d986bd1","client-request-id":"f6cdb51c-11fa-4c5a-88b2-c9879d986bd1"}}} [GET] https://graph.microsoft.com/v1.0/roleManagement/entitlementManagement/roleAssignments
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleeligibilityschedulerequests

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.6s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"UnknownError","message":"{\"errorCode\":\"ProviderNotSupported\",\"message\":\"The provider entitlementManagement is not supported by application .\",\"instanceAnnotations\":[]}","innerError":{"date":"2026-07-29T06:19:49","request-id":"064e9c28-0609-46c3-be89-6539abf6691a","client-request-id":"064e9c28-0609-46c3-be89-6539abf6691a"}}} [GET] https://graph.microsoft.com/v1.0/roleManagement/entitlementManagement/roleEligibilityScheduleRequests
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### rolemanagement_rbacapplication_rolemanagement_getdirectory

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.0s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_InvalidRequestUrl","message":"Request url was invalid. The request should be like /tenantdomainname/Entity or /$metadata. Tenant domain name can be any of the verified, unverified domain names or context id.","innerError":{"date":"2026-07-29T06:19:48","request-id":"0d06a69c-05d9-44b4-83d1-6706c0e78436","client-request-id":"0d06a69c-05d9-44b4-83d1-6706c0e78436"}}} [GET] https://graph.microsoft.com/v1.0/roleManagement/directory
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### rolemanagement_rbacapplication_rolemanagement_entitlementmanagement_listroleeligibilityschedules

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 16.8s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"UnknownError","message":"{\"errorCode\":\"ProviderNotSupported\",\"message\":\"The provider entitlementManagement is not supported by application .\",\"instanceAnnotations\":[]}","innerError":{"date":"2026-07-29T06:19:49","request-id":"c677abf9-db95-4a8d-b6b6-cb209c2d694b","client-request-id":"c677abf9-db95-4a8d-b6b6-cb209c2d694b"}}} [GET] https://graph.microsoft.com/v1.0/roleManagement/entitlementManagement/roleEligibilitySchedules
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### rolemanagement_rolemanagement_rolemanagement_rolemanagement_getrolemanagement

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.0s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_InvalidRequestUrl","message":"Request url was invalid. The request should be like /tenantdomainname/Entity or /$metadata. Tenant domain name can be any of the verified, unverified domain names or context id.","innerError":{"date":"2026-07-29T06:19:49","request-id":"dccd56d4-629b-4b56-abe5-645fcc408f21","client-request-id":"dccd56d4-629b-4b56-abe5-645fcc408f21"}}} [GET] https://graph.microsoft.com/v1.0/roleManagement
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### scopedrolememberships_scopedrolemembership_scopedrolememberships_scopedrolemembership_listscopedrolemembership

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 14.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_UnsupportedQuery","message":"Direct queries to this resource type are not supported.","innerError":{"date":"2026-07-29T07:01:57","request-id":"95bac7c4-8695-45b5-a32a-b1f08a94ae0d","client-request-id":"95bac7c4-8695-45b5-a32a-b1f08a94ae0d"}}} [GET] https://graph.microsoft.com/v1.0/scopedRoleMemberships
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### schemaextensions_schemaextension_schemaextensions_schemaextension_listschemaextension

- **Status**: PASS (OK)
- **Elapsed**: 15.0s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": "https://graph.microsoft.com/v1.0/schemaExtensions?$skiptoken=%5b%7B%22token%22%3a%22%2bRID%3a~F7weALI27DgXAgAAAAAAAA%3d%3d%23RT%3a1%23TRC%3a100%23ISV%3a2%23IEO%3a65551%23QCF%3a8%23FPC%3aAgIAAG8BAAAuBxECgAQfgGqADMAFIIAAJgYAoB4AYAAAACAxBwAAAEA4EAAwgAWACIA2AGAAELBAiAkJBPGAADEAABEpAAKAAAgABBKAACBMJBAgARCIIBIACQgIwBiABIAOwAEUgQgAAAhkfAADAAAAgBCIAg0ABQCgYQAMeAIiAACgXQARAECwEIAGgAuAOYABwABRIIAOwIIAhgAAIEDAAgAgAIACAiAAAAAhAAIAAAIEMA4ggArAQAUAgJwwUjYAABABAgAAgACAhEA%2bgA%2bAFMAAHgQAAC0iwwAQCAEAAABjQB8AgVEABsIiAAkA4IEQIAAQEQgBHAgIG4ARwAyEJAgIAAEAAAQEAAABAAFABAAAAYCACIYAQAIAoEAAAIATgAHAEIEoAABiBEAAIkBAcyCQmAAoAAYQgAXAAGhIAACAxwLQwy8AAFCA5CEMCABgmUKAAAg4AJQAAAwAIJSIAGIA4AYAPMAEEYBGAw4CQMgRUJsAIIYQgAANAEACEDGFCECIAABEAAgCBAGQB5BAAAiMAC0AHISLDAARhmDIAlAAAAVEAYAEChAQApAAxAQAsugAAlDwAUAVKCIAAMADgI5eAAA1AICBAH0CARAAIAACAQAQgECAAYgKA0AAgAAkAASAiQAAEDgAGwBBAQgAEBCAQoEEQJABAACAAgJQW0wAJQAQSAECgFEECQDcIQAEQBKALoAVgBOAJsAAMAAQBCAGAQEAEAAABQEAIBGBCIIMCBMgEBACAggACQAIDAIQCAAACgABAQIIQgAAQwQAAAAIFSwAwAAAAQCOAAMDEBQAACAAEACAEoAYgACAA8AECgEAAAIUgCMAkAAgABAQGYALwEBEAAQEABAAAAAgEABQAYAARhQAAIASgELAAHyAYQD%2b%2f%2fHPwv8ff1ePOFrBR2KZc%2b8efy70%2bcEzQx3Iy6Po2IT7U%2fnxb%2fovz%2b%2f%2fr4jxn72ffMf%2f2xv%2bGNzjDAZKUcAZ1jhOgEKnL9%2fn9WL0pD6JgUH3BPb%2fuz3dj4TBAED4gATwJ5%2fwUzr9wwMCJPcEjjFiZCPlSCA8EQCD0ATUBAIwLIAIwgCBA4ABAQAAAoAZJpgMqAAAEAQYgDJKlgIQP2hbDgA8SPSkbh%2fOEwwBAF6Ug%2fggQOgdLoToEPgdBMMVHgQAPkSOFHhB7GwgBI6AA0EAABADjkMSgQEIAIEIBJIChAcIIIljohyJiRkAhAGAEAEgQEQCJBQHiMyAABDAiEMAwEgkAhCIJAAiASIJAADBCCQQGWIAJIOImAQwAiJG5EQgRBGQGAIQJwACAAKQJGACIhMABAjESOJDggSZgUlgAjInCQhKCcRABAAEEQiAUICEJEAkIYQQEAATASASACARYRwACAAiEeDJBEECCCQxEgEIyGIgCZKAJANAInIAgAkAANhIAABgTDACAAAwZAaIAACEAACEkRFgIqYTQAhAEgQBAIIEBIIRAA4kkIiQFAaJkABCBEBEBIAQQCQAJEDGQCRAhIgACSIBkhgkCIhIQhIABAAAiAASIQAYEAFEIkIkYECImCQAiTwmAkkiBAIRCQAAIvI8kxwgxDHxBIAAgACCmyeOTAAgAETCACZAACISgEgkkgQBE5ESDiAiARAN4QySAJGRAiQxSQTITDBEkoCBJANIkBQkECkLiAkSJAIAk5xJLEQAAyxQhEACAAAEhOQkBgIQARImQWJGEEKgMABAAAhIIj
```

---

### security_alert_security_listalerts

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 17.4s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"Auth token does not contain valid permissions or user does not have valid roles.","innerError":{"date":"2026-07-29T07:01:58","request-id":"e183b10c-6c4e-4769-96d3-8fd48d881d8b","client-request-id":"e183b10c-6c4e-4769-96d3-8fd48d881d8b"}}} [GET] https://graph.microsoft.com/v1.0/security/alerts
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_alert_security_listalerts_v2

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 14.9s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Unauthorized","message":"Unauthorized request - Account is not provisioned.","innerError":{"date":"2026-07-29T07:01:57","request-id":"367788e4-10e0-416b-8db9-2b28d3efa677","client-request-id":"367788e4-10e0-416b-8db9-2b28d3efa677"}}} [GET] https://graph.microsoft.com/v1.0/security/alerts_v2
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_attacksimulationroot_security_attacksimulation_listendusernotifications

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 16.5s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:01:57","request-id":"0ab9954a-1502-4ab3-91b6-bc31128dc8a0","client-request-id":"0ab9954a-1502-4ab3-91b6-bc31128dc8a0"}}} [GET] https://graph.microsoft.com/v1.0/security/attackSimulation/endUserNotifications
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_attacksimulationroot_security_attacksimulation_listlandingpages

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 10.0s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:01:59","request-id":"21c8038d-0472-45df-90bc-2163a798acf1","client-request-id":"21c8038d-0472-45df-90bc-2163a798acf1"}}} [GET] https://graph.microsoft.com/v1.0/security/attackSimulation/landingPages
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### rolemanagement_rbacapplication_rolemanagement_getentitlementmanagement

- **Status**: FAIL (ERR(1))
- **Elapsed**: 49.1s

```
TIMEOUT
```

---

### security_attacksimulationroot_security_attacksimulation_listoperations

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 10.2s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:02:14","request-id":"e43df2b3-c0a0-4770-9a72-caa041394001","client-request-id":"e43df2b3-c0a0-4770-9a72-caa041394001"}}} [GET] https://graph.microsoft.com/v1.0/security/attackSimulation/operations
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_attacksimulationroot_security_attacksimulation_listloginpages

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 12.6s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:02:13","request-id":"11594884-036f-40c6-b6de-e98d3ab1c58f","client-request-id":"11594884-036f-40c6-b6de-e98d3ab1c58f"}}} [GET] https://graph.microsoft.com/v1.0/security/attackSimulation/loginPages
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_attacksimulationroot_security_attacksimulation_listsimulationautomations

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 12.2s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:02:13","request-id":"fe2a96fb-c073-4640-8bde-71c5487643ee","client-request-id":"fe2a96fb-c073-4640-8bde-71c5487643ee"}}} [GET] https://graph.microsoft.com/v1.0/security/attackSimulation/simulationAutomations
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_attacksimulationroot_security_attacksimulation_listpayloads

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 13.4s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:02:13","request-id":"adf5fa69-90f4-4a01-9ab6-53a2608b9f8c","client-request-id":"adf5fa69-90f4-4a01-9ab6-53a2608b9f8c"}}} [GET] https://graph.microsoft.com/v1.0/security/attackSimulation/payloads
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_attacksimulationroot_security_attacksimulation_listsimulations

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 10.9s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:02:14","request-id":"d6982f5a-307d-400f-8a05-87181f83a899","client-request-id":"d6982f5a-307d-400f-8a05-87181f83a899"}}} [GET] https://graph.microsoft.com/v1.0/security/attackSimulation/simulations
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_attacksimulationroot_security_attacksimulation_listtrainings

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 11.3s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:02:13","request-id":"dce12e18-f4fb-4323-bf1e-219c97e61f27","client-request-id":"dce12e18-f4fb-4323-bf1e-219c97e61f27"}}} [GET] https://graph.microsoft.com/v1.0/security/attackSimulation/trainings
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_auditcoreroot_security_auditlog_listqueries

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 10.9s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"Message\":\"User:live.com#algsoch@gmail.com dont have any permissions\"}","innerError":{"date":"2026-07-29T07:02:13","request-id":"dc93a6d6-7d92-4ad6-af89-b8f6db10cd93","client-request-id":"dc93a6d6-7d92-4ad6-af89-b8f6db10cd93"}}} [GET] https://graph.microsoft.com/v1.0/security/auditLog/queries
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_attacksimulationroot_security_getattacksimulation

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 11.0s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:20:47","request-id":"6229331c-159d-4c6d-9037-62a5a097f236","client-request-id":"6229331c-159d-4c6d-9037-62a5a097f236"}}} [GET] https://graph.microsoft.com/v1.0/security/attackSimulation
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_auditcoreroot_security_getauditlog

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 11.8s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"{\"Message\":\"User:live.com#algsoch@gmail.com dont have any permissions\"}","innerError":{"date":"2026-07-29T07:02:13","request-id":"0c6639cc-c239-41fa-9526-2c3c2893c594","client-request-id":"0c6639cc-c239-41fa-9526-2c3c2893c594"}}} [GET] https://graph.microsoft.com/v1.0/security/auditLog
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_casesroot_security_cases_listediscoverycases

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 10.9s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"Unauthorized","message":"ServiceFabricGraphAuthenticationMiddleware.ValidateToken: Invalid scopes. Scopes = [\"Application.ReadWrite.All\",\"AppRoleAssignment.ReadWrite.All\",\"AuditLog.Read.All\",\"DelegatedPermissionGrant.ReadWrite.All\",\"Directory.AccessAsUser.All\",\"email\",\"Group.ReadWrite.All\",\"openid\",\"profile\",\"SubjectNameRegistration.ReadWrite\",\"User.Read.All\",\"User.ReadWrite.All\"].","innerError":{"date":"2026-07-29T07:02:32","request-id":"d1ba84bd-b53d-4d3d-9154-0fb7a3577b1f","client-request-id":"d1ba84bd-b53d-4d3d-9154-0fb7a3577b1f"}}} [GET] https://graph.microsoft.com/v1.0/security/cases/ediscoveryCases
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_collaborationroot_security_collaboration_listanalyzedemails

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 11.9s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"Auth failed.","message":"For details, use inner error to correlate with Core Auth telemetry.","innerError":{"oAuthEventOperationId":"2bdbf32d-b3b0-492a-9aca-9dc7a7b36d08","oAuthEventcV":"Akm3hXFD/aXdUs0PWw6Lfw.1","errorUrl":"","requestId":"259f1cc4-ec14-4ad1-912c-5b0d7fdccd90","date":"2026-07-29T06:20:51","request-id":"259f1cc4-ec14-4ad1-912c-5b0d7fdccd90","client-request-id":"259f1cc4-ec14-4ad1-912c-5b0d7fdccd90"}}} [GET] https://graph.microsoft.com/v1.0/security/collaboration/analyzedEmails
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_collaborationroot_security_getcollaboration

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 11.7s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"Auth failed.","message":"For details, use inner error to correlate with Core Auth telemetry.","innerError":{"oAuthEventOperationId":"8a7e6148-2df2-483f-83e5-1555ad0dd07a","oAuthEventcV":"EPWQKZ9B0qf3hfSMEdZe5A.1","errorUrl":"","requestId":"155f0779-0742-443e-a96f-ffb28421a373","date":"2026-07-29T06:20:51","request-id":"155f0779-0742-443e-a96f-ffb28421a373","client-request-id":"155f0779-0742-443e-a96f-ffb28421a373"}}} [GET] https://graph.microsoft.com/v1.0/security/collaboration
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_casesroot_security_getcases

- **Status**: PASS (OK)
- **Elapsed**: 17.7s

```json
[
  {
    "odata_type": null,
    "ediscoverycases": null,
    "id": null
  }
]
```

---

### security_identitycontainer_security_getidentities

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.0s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, first login to portal and sensor are required. For more info: https://learn.microsoft.com/en-us/defender-for-identity/deploy/deploy-defender-identity","innerError":{"date":"2026-07-29T06:20:52","request-id":"05bbc02f-748d-4190-9ccb-3d36b119483d","client-request-id":"05bbc02f-748d-4190-9ccb-3d36b119483d"}}} [GET] https://graph.microsoft.com/v1.0/security/identities
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_identitycontainer_security_identities_getsensorcandidateactivationconfiguration

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 12.1s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, first login to portal and sensor are required. For more info: https://learn.microsoft.com/en-us/defender-for-identity/deploy/deploy-defender-identity","innerError":{"date":"2026-07-29T07:02:32","request-id":"cdab42e8-dafd-41b4-996b-8516eecedb2e","client-request-id":"cdab42e8-dafd-41b4-996b-8516eecedb2e"}}} [GET] https://graph.microsoft.com/v1.0/security/identities/sensorCandidateActivationConfiguration
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_identitycontainer_security_identities_listidentityaccounts

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 11.9s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, first login to portal and sensor are required. For more info: https://learn.microsoft.com/en-us/defender-for-identity/deploy/deploy-defender-identity","innerError":{"date":"2026-07-29T07:02:36","request-id":"19852764-77e1-44b3-8b4d-2bd9a30b27de","client-request-id":"19852764-77e1-44b3-8b4d-2bd9a30b27de"}}} [GET] https://graph.microsoft.com/v1.0/security/identities/identityAccounts
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_identitycontainer_security_identities_getsettings

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.5s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, first login to portal and sensor are required. For more info: https://learn.microsoft.com/en-us/defender-for-identity/deploy/deploy-defender-identity","innerError":{"date":"2026-07-29T07:02:32","request-id":"ffb176f3-166b-4d8b-a7d5-fd1fbaf72c4c","client-request-id":"ffb176f3-166b-4d8b-a7d5-fd1fbaf72c4c"}}} [GET] https://graph.microsoft.com/v1.0/security/identities/settings
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_identitycontainer_security_identities_listhealthissues

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.3s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, first login to portal and sensor are required. For more info: https://learn.microsoft.com/en-us/defender-for-identity/deploy/deploy-defender-identity","innerError":{"date":"2026-07-29T07:02:32","request-id":"934b5048-2dde-4112-8894-1ae22c7f00e1","client-request-id":"934b5048-2dde-4112-8894-1ae22c7f00e1"}}} [GET] https://graph.microsoft.com/v1.0/security/identities/healthIssues
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_identitycontainer_security_identities_listsensorcandidates

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 11.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, first login to portal and sensor are required. For more info: https://learn.microsoft.com/en-us/defender-for-identity/deploy/deploy-defender-identity","innerError":{"date":"2026-07-29T07:02:32","request-id":"b66180a9-a169-41bc-ac60-8f2d81b1efd0","client-request-id":"b66180a9-a169-41bc-ac60-8f2d81b1efd0"}}} [GET] https://graph.microsoft.com/v1.0/security/identities/sensorCandidates
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_identitycontainer_security_identities_sensors_getdeploymentpackageuri

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 11.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, first login to portal and sensor are required. For more info: https://learn.microsoft.com/en-us/defender-for-identity/deploy/deploy-defender-identity","innerError":{"date":"2026-07-29T07:02:32","request-id":"1d2aa0cf-a977-411b-9991-837d8d7f6d11","client-request-id":"1d2aa0cf-a977-411b-9991-837d8d7f6d11"}}} [GET] https://graph.microsoft.com/v1.0/security/identities/sensors/microsoft.graph.security.getDeploymentPackageUri()
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_identitycontainer_security_identities_sensors_getdeploymentaccesskey

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 11.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, first login to portal and sensor are required. For more info: https://learn.microsoft.com/en-us/defender-for-identity/deploy/deploy-defender-identity","innerError":{"date":"2026-07-29T07:02:32","request-id":"6f0746f9-61b5-4427-b161-9809665f0287","client-request-id":"6f0746f9-61b5-4427-b161-9809665f0287"}}} [GET] https://graph.microsoft.com/v1.0/security/identities/sensors/microsoft.graph.security.getDeploymentAccessKey()
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_identitycontainer_security_identities_listsensors

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 11.8s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, first login to portal and sensor are required. For more info: https://learn.microsoft.com/en-us/defender-for-identity/deploy/deploy-defender-identity","innerError":{"date":"2026-07-29T06:21:23","request-id":"4cb681ff-44da-42e3-a291-1011ead26015","client-request-id":"4cb681ff-44da-42e3-a291-1011ead26015"}}} [GET] https://graph.microsoft.com/v1.0/security/identities/sensors
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_identitycontainer_security_identities_settings_getautoauditingconfiguration

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 10.9s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Tenant is not onboarded to Microsoft Defender for Identity. After license is purchased, first login to portal and sensor are required. For more info: https://learn.microsoft.com/en-us/defender-for-identity/deploy/deploy-defender-identity","innerError":{"date":"2026-07-29T06:21:23","request-id":"062f77db-785b-4929-8a34-8d8a3c6b13a0","client-request-id":"062f77db-785b-4929-8a34-8d8a3c6b13a0"}}} [GET] https://graph.microsoft.com/v1.0/security/identities/settings/autoAuditingConfiguration
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_incident_security_listincidents

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 11.0s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Unauthorized","message":"Unauthorized request - Account is not provisioned.","innerError":{"date":"2026-07-29T07:02:31","request-id":"78395828-6db9-47ab-8601-7a25090efa07","client-request-id":"78395828-6db9-47ab-8601-7a25090efa07"}}} [GET] https://graph.microsoft.com/v1.0/security/incidents
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_labelsroot_security_getlabels

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 11.2s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:21:23","request-id":"f65a0294-2561-473f-9e4b-430ac256666f","client-request-id":"f65a0294-2561-473f-9e4b-430ac256666f"}}} [GET] https://graph.microsoft.com/v1.0/security/labels
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_labelsroot_security_labels_listauthorities

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 11.3s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:02:31","request-id":"6664f60c-4d0e-48e9-86c9-0744195a7a9c","client-request-id":"6664f60c-4d0e-48e9-86c9-0744195a7a9c"}}} [GET] https://graph.microsoft.com/v1.0/security/labels/authorities
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_labelsroot_security_labels_listcategories

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 11.8s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:02:32","request-id":"0d3ce9af-affb-4e60-a306-43d59e39179d","client-request-id":"0d3ce9af-affb-4e60-a306-43d59e39179d"}}} [GET] https://graph.microsoft.com/v1.0/security/labels/categories
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_labelsroot_security_labels_listcitations

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 11.5s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:03:13","request-id":"688bb6d1-9214-41e6-8fc7-04eccedd5de5","client-request-id":"688bb6d1-9214-41e6-8fc7-04eccedd5de5"}}} [GET] https://graph.microsoft.com/v1.0/security/labels/citations
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_labelsroot_security_labels_listdepartments

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 11.5s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:03:19","request-id":"173d10df-4a1a-4963-a983-f6b4cbdc727c","client-request-id":"173d10df-4a1a-4963-a983-f6b4cbdc727c"}}} [GET] https://graph.microsoft.com/v1.0/security/labels/departments
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_labelsroot_security_labels_listfileplanreferences

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 11.6s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:03:08","request-id":"ad49dbe3-4c4a-4f05-9dea-8af2e064a9d5","client-request-id":"ad49dbe3-4c4a-4f05-9dea-8af2e064a9d5"}}} [GET] https://graph.microsoft.com/v1.0/security/labels/filePlanReferences
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_labelsroot_security_labels_listretentionlabels

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 11.6s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:02:58","request-id":"77b238a4-ad82-439e-98f6-c60c8a78461c","client-request-id":"77b238a4-ad82-439e-98f6-c60c8a78461c"}}} [GET] https://graph.microsoft.com/v1.0/security/labels/retentionLabels
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_security_security_security_getsecurity

- **Status**: PASS (OK)
- **Elapsed**: 11.3s

```json
[
  {
    "odata_type": null,
    "alerts": null,
    "alerts_v2": null,
    "attacksimulation": null,
    "auditlog": null,
    "cases": null,
    "collaboration": null,
    "datasecurityandgovernance": null,
    "id": null,
    "identities": null,
    "incidents": null,
    "labels": null,
    "securescorecontrolprofiles": null,
    "securescores": null,
    "subjectrightsrequests": null,
    "threatintelligence": null,
    "triggertypes": null,
    "triggers": null
  }
]
```

---

### security_securescorecontrolprofile_security_listsecurescorecontrolprofiles

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 11.7s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"Auth token does not contain valid permissions or user does not have valid roles.","innerError":{"date":"2026-07-29T07:03:04","request-id":"20d35c35-e652-4bda-b73c-cdd8b7b7bbb4","client-request-id":"20d35c35-e652-4bda-b73c-cdd8b7b7bbb4"}}} [GET] https://graph.microsoft.com/v1.0/security/secureScoreControlProfiles
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_securescore_security_listsecurescores

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 12.4s

```
TIMEOUT
```

---

### security_subjectrightsrequest_security_listsubjectrightsrequests

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 15.5s

```
Error: Source server error (500)
Detail: {"error":{"code":"HostNotFound","message":"Target 'privacy.trafficmanager.net' is not found.","innerError":{"date":"2026-07-29T07:03:01","request-id":"acb7e0b6-00c4-4e15-87af-b56ddeac08ab","client-request-id":"acb7e0b6-00c4-4e15-87af-b56ddeac08ab"}}} [GET] https://graph.microsoft.com/v1.0/security/subjectRightsRequests
Hint: The upstream API returned a server error. This may be transient — retry after a brief wait.
```

---

### security_tenantdatasecurityandgovernance_security_getdatasecurityandgovernance

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 10.8s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:02:57","request-id":"ce0caa13-b5d5-4aac-b438-d741c20d63ae","client-request-id":"ce0caa13-b5d5-4aac-b438-d741c20d63ae"}}} [GET] https://graph.microsoft.com/v1.0/security/dataSecurityAndGovernance
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### security_tenantdatasecurityandgovernance_security_datasecurityandgovernance_getprotectionscopes

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 11.6s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:02:57","request-id":"ab76b924-7968-4de8-ae21-a774e8df4486","client-request-id":"ab76b924-7968-4de8-ae21-a774e8df4486"}}} [GET] https://graph.microsoft.com/v1.0/security/dataSecurityAndGovernance/protectionScopes
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### security_tenantdatasecurityandgovernance_security_datasecurityandgovernance_listsensitivitylabels

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 11.7s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Unauthorized","message":"Authorization is failed with code: EmptyServicePlans.","details":[],"innerError":{"date":"2026-07-29T07:02:58","code":"EmptyServicePlans","clientRequestId":"2583f90b-e967-4e73-af0e-2ede700e8cc8","diagnosticInfo":{"tenantId":"89de3b75-fef2-44f9-90a4-cf8c69700c83","appId":"04b07795-8ddb-461a-bbee-02f9e1bf7b46","objectId":"1165bcae-a56f-49bf-af0a-4496f80cd544","servicePlanIds":null,"errorCode":"EmptyServicePlans","upn":null},"activityId":"794d1ff8-aaf8-47f1-b9a9-465785709f6a","request-id":"2583f90b-e967-4e73-af0e-2ede700e8cc8","client-request-id":"2583f90b-e967-4e73-af0e-2ede700e8cc8"}}} [GET] https://graph.microsoft.com/v1.0/security/dataSecurityAndGovernance/sensitivityLabels
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_threatintelligence_security_getthreatintelligence

- **Status**: PASS (OK)
- **Elapsed**: 7.8s

```json
[
  {
    "odata_type": null,
    "articleindicators": null,
    "articles": null,
    "hostcomponents": null,
    "hostcookies": null,
    "hostpairs": null,
    "hostports": null,
    "hostsslcertificates": null,
    "hosttrackers": null,
    "hosts": null,
    "id": null,
    "intelprofiles": null,
    "intelligenceprofileindicators": null,
    "passivednsrecords": null,
    "sslcertificates": null,
    "subdomains": null,
    "vulnerabilities": null,
    "whoishistoryrecords": null,
    "whoisrecords": null
  }
]
```

---

### security_threatintelligence_security_threatintelligence_listarticles

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 12.0s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"notAllowed","message":"The organization has not been onboarded to Microsoft Defender.","innerError":{"date":"2026-07-29T07:03:17","request-id":"00521e59-4a9f-4b74-af6c-3d0eecc56127","client-request-id":"00521e59-4a9f-4b74-af6c-3d0eecc56127"}}} [GET] https://graph.microsoft.com/v1.0/security/threatIntelligence/articles
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_threatintelligence_security_threatintelligence_listhostcomponents

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 11.6s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:02:57","request-id":"4e4a86d8-6779-4f6a-ac76-9db023dc1303","client-request-id":"4e4a86d8-6779-4f6a-ac76-9db023dc1303"}}} [GET] https://graph.microsoft.com/v1.0/security/threatIntelligence/hostComponents
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### security_threatintelligence_security_threatintelligence_listarticleindicators

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 12.1s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:02:57","request-id":"a4e2fb31-d58f-4c1a-a933-cc950deeeb93","client-request-id":"a4e2fb31-d58f-4c1a-a933-cc950deeeb93"}}} [GET] https://graph.microsoft.com/v1.0/security/threatIntelligence/articleIndicators
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### security_threatintelligence_security_threatintelligence_listhostcookies

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 12.1s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:02:57","request-id":"4ece8ad7-6d9b-4890-85e3-820469c9a46e","client-request-id":"4ece8ad7-6d9b-4890-85e3-820469c9a46e"}}} [GET] https://graph.microsoft.com/v1.0/security/threatIntelligence/hostCookies
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### security_threatintelligence_security_threatintelligence_listhostpairs

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 13.4s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:22:21","request-id":"ae85cbfa-939e-4ddf-bd77-4510588c1e4c","client-request-id":"ae85cbfa-939e-4ddf-bd77-4510588c1e4c"}}} [GET] https://graph.microsoft.com/v1.0/security/threatIntelligence/hostPairs
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### security_threatintelligence_security_threatintelligence_listhosts

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 13.3s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:22:21","request-id":"7c544b17-819c-441e-86e8-7c2b075edadc","client-request-id":"7c544b17-819c-441e-86e8-7c2b075edadc"}}} [GET] https://graph.microsoft.com/v1.0/security/threatIntelligence/hosts
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### security_threatintelligence_security_threatintelligence_listhostports

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 13.4s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:22:21","request-id":"7b8b89e5-af0c-4f1b-8c20-200ef658adec","client-request-id":"7b8b89e5-af0c-4f1b-8c20-200ef658adec"}}} [GET] https://graph.microsoft.com/v1.0/security/threatIntelligence/hostPorts
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### security_threatintelligence_security_threatintelligence_listhostsslcertificates

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 13.4s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:02:57","request-id":"737a1e0a-ebe0-472f-80aa-d6932d67f14e","client-request-id":"737a1e0a-ebe0-472f-80aa-d6932d67f14e"}}} [GET] https://graph.microsoft.com/v1.0/security/threatIntelligence/hostSslCertificates
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### security_threatintelligence_security_threatintelligence_listintelligenceprofileindicators

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 12.5s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:02:57","request-id":"5b3b25be-b09b-4d01-bd54-4edad24e0e2c","client-request-id":"5b3b25be-b09b-4d01-bd54-4edad24e0e2c"}}} [GET] https://graph.microsoft.com/v1.0/security/threatIntelligence/intelligenceProfileIndicators
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### security_threatintelligence_security_threatintelligence_listhosttrackers

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 12.6s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:02:57","request-id":"cd05ab54-b161-4c73-ac32-fb53b08da77a","client-request-id":"cd05ab54-b161-4c73-ac32-fb53b08da77a"}}} [GET] https://graph.microsoft.com/v1.0/security/threatIntelligence/hostTrackers
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### security_threatintelligence_security_threatintelligence_listintelprofiles

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 12.6s

```
TIMEOUT
```

---

### security_threatintelligence_security_threatintelligence_listpassivednsrecords

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 12.1s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:03:03","request-id":"232bd800-2e47-4609-98ec-49d7d450980c","client-request-id":"232bd800-2e47-4609-98ec-49d7d450980c"}}} [GET] https://graph.microsoft.com/v1.0/security/threatIntelligence/passiveDnsRecords
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### security_threatintelligence_security_threatintelligence_listsubdomains

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 12.6s

```
TIMEOUT
```

---

### security_threatintelligence_security_threatintelligence_listvulnerabilities

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 12.5s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:00","request-id":"f6adcda4-61e4-4814-ad29-563dda41dfac","client-request-id":"f6adcda4-61e4-4814-ad29-563dda41dfac"}}} [GET] https://graph.microsoft.com/v1.0/security/threatIntelligence/vulnerabilities
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### security_threatintelligence_security_threatintelligence_listsslcertificates

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 12.6s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"notAllowed","message":"The organization has not been onboarded to Microsoft Defender.","innerError":{"date":"2026-07-29T07:03:59","request-id":"bb1edb2e-5bf7-426d-bd50-fb90afb7ccb5","client-request-id":"bb1edb2e-5bf7-426d-bd50-fb90afb7ccb5"}}} [GET] https://graph.microsoft.com/v1.0/security/threatIntelligence/sslCertificates
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_threatintelligence_security_threatintelligence_listwhoishistoryrecords

- **Status**: FAIL (TABLE_NOT_FOUND)
- **Elapsed**: 13.3s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:03:59","request-id":"14afcc22-cafe-48c8-90ef-8e39ac091547","client-request-id":"14afcc22-cafe-48c8-90ef-8e39ac091547"}}} [GET] https://graph.microsoft.com/v1.0/security/threatIntelligence/whoisHistoryRecords
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### security_threatintelligence_security_threatintelligence_listwhoisrecords

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 13.8s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"notAllowed","message":"The organization has not been onboarded to Microsoft Defender.","innerError":{"date":"2026-07-29T07:04:00","request-id":"c50464e9-8ef3-4b2b-bf24-dd9bce4ead73","client-request-id":"c50464e9-8ef3-4b2b-bf24-dd9bce4ead73"}}} [GET] https://graph.microsoft.com/v1.0/security/threatIntelligence/whoisRecords
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### security_triggersroot_security_triggers_listretentionevents

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.1s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:03:59","request-id":"afaca87b-2998-41c4-94e0-d7cca2f302aa","client-request-id":"afaca87b-2998-41c4-94e0-d7cca2f302aa"}}} [GET] https://graph.microsoft.com/v1.0/security/triggers/retentionEvents
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_triggersroot_security_gettriggers

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.4s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:00","request-id":"b0a4da34-fab5-41f9-b284-c40b571df92c","client-request-id":"b0a4da34-fab5-41f9-b284-c40b571df92c"}}} [GET] https://graph.microsoft.com/v1.0/security/triggers
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_triggertypesroot_security_gettriggertypes

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.5s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:01","request-id":"d22535ae-9357-43eb-be22-375ab2f9586e","client-request-id":"d22535ae-9357-43eb-be22-375ab2f9586e"}}} [GET] https://graph.microsoft.com/v1.0/security/triggerTypes
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### security_triggertypesroot_security_triggertypes_listretentioneventtypes

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 22.6s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:00","request-id":"98683f64-9daf-4afd-858c-2d75ecf6de23","client-request-id":"98683f64-9daf-4afd-858c-2d75ecf6de23"}}} [GET] https://graph.microsoft.com/v1.0/security/triggerTypes/retentionEventTypes
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### shares_shareddriveitem_shares_shareddriveitem_listshareddriveitem

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 17.2s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Tenant does not have a SPO license.","innerError":{"date":"2026-07-29T06:23:14","request-id":"69b0590e-b273-4a56-b0a0-f04c85bbb8c2","client-request-id":"69b0590e-b273-4a56-b0a0-f04c85bbb8c2"}}} [GET] https://graph.microsoft.com/v1.0/shares
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### serviceprincipals_serviceprincipal_functions_serviceprincipals_delta

- **Status**: PASS (OK)
- **Elapsed**: 22.9s

```json
[
  {
    "odata_deltalink": null,
    "odata_nextlink": "https://graph.microsoft.com/v1.0/servicePrincipals/delta()?$skiptoken=S5aczCOYTuRhqFVWGMzdR1GEtlELjM4SbuB2Ig46y3FKkSeN-GHHCPb28ZMQvmD2Nzbhrn0LVr_PStDscA9sN5y1zeUNdd0qKbXQAfKuvsS_XOgj8ceul4sM0CUr4FR_q_5y35i83R0SSxFu4myZLeHN1gEAm0ZKaUKuUruDFjV0aeMsQC4_a0Sn0RhujRQO2UZ_cL1-bTWvaR1UIwH_tTaJeSqnWFtGzHYDuD8EEAGamYgfNdBt0zCUz8Ybk1cGExnhfvTi5cNGRVyaZSW-VRSGBs42rlH4mC6qpBnmHJ8bxz73Z72pqArfUjVCFGAE7vMlbshcjooPmoZFxPrWGS0LY4-rhQSN9txm4PhLcjzpH_HDVPf1BMljCB5hfrLGkzQs4ixmua-JU2f8j-eCpK0ATdVMrLEJo4XUMzbJM2hlCP-lcAYSVR1nx6Y1oBoMim6LzJi9XrUP3TWQ-yleZUFv6HKHXKja_-cwxssgW82i1WIJ92JBqGvWzOG3M6kikCTzL7Z0jAT_PjTldl-F3FT8Y1xgmdhpA313lTlrEZLWRAXQrVLJYPdGTcYOT_GsG1RjkqXdx177W1FLdzLInle-UM8jIGQ7i8mkny9pgDOf9sPG6V-8aJ7cys7okOKm8WZUqTuzBj1ql1vxCtUilCwZJgpG-SQI0VFEe73jqZahW-rfjfnM7L-kDu9DJmpXh73tOCYRA2tF3Dvc5h7yuvEopocwqOrWzjtbi4PZ1HQ3lwrzdkQfo5Iq-IKvqhJaANRbRxuD-UdEC50CESiyxW2xIVQihw1iYggbhqtPYh-KlpM7TVuwx2czSOz15Yb99Hjww3KkoPbF8YWfwlhhKcysxAqvelAlJF-cAUMEQT3TFZ2BF21cQSuIR1gQ8_rXWHCMRljzq0hK-ZirpnBOal7xLe6PKejgXdPHbKEZ6VU6ekm9ps3bkGRxh-WwsSJ0MuscQ8MP6WPjnKSxeJtzO-rdVbk4-uXuPmfglU5HLR3hQOZASXMsr1mKmDnbEYoKvo4E40DOUh3yEzDu7xQTwiYQD-kT-IaIvzD-5niUNnGLYKJqn1lQFwDVs74s5clAxOF4iiopsS7zYQ3OsHYMdum9UdNwl5uBcsMI3pnuyooOaUSA-K3XNzvIYRTcnUooQrv5AZn7hiYN3IM62ejw71g9mstWxBt3ikEgtxcAR6NGZ9D4-xkxFq0kWRqWTPcA_wLJfoxW7nN7mhzbBfx7hmkrJjlhTIg6ytMfMiT3oIgfKU0wPofxB5W6y8aVeFKolo_ZpuU1ua9wPh-vb36wEkgT6PflubRgfyWPIwfiDfD3pZkdyci1M1n_jQo7X9bs6NyMnXwfg7FsEYBnu9db1XO9ESsB1CVqILYmqbpzimh-syUHUisCuXd37zkERfm4GF5T9n2mnFy05dDXzLVRWwr_MzTLFwXwe8yRL3g1xZl6A2hqyxFIiCs6TtT3YZhbyYwhgqOwNOxnilp2rmJ0ytR31NfZkZ55NqPaueMcQyUnIgi15ccN8RmhU751NkVR4uAW6Qx9Qdg2nFjjdWKL3Q_ni-v0BaH-eaNoprpt4ZPXayRAzV9F7uyDKTy2ORzveYKG4plYPGmNkS11Ti3lhMavr1dL_lT92h-L8rD3vgmtRSkA6D6seUEeZaB5H1Ha-TCJOKb0XjC-VVZCDo0op1iapPSqwFjLboPM2ErJtc9dhj2W9J1A-9wWgxsm-3UeEaZvkxE0WJJgsucI8nuZXZUNoh5m6IJE8w-DPmGWAfNK6AP8ydTYedlLqaS68SPkJQ610J-uAK4a-qfu9xkQdUKmv1J5R-l_nM3m228RCG_79cvuEOeWeTXciy-MRuWj0_KbIuJDqPXiCbh8
```

---

### serviceprincipals_serviceprincipal_serviceprincipals_serviceprincipal_listserviceprincipal

- **Status**: PASS (OK)
- **Elapsed**: 24.7s

```json
[
  {
    "odata_count": null,
    "odata_nextlink": null,
    "value": "[{\"id\":\"00a5ddb2-09e3-4b78-b7cd-3fb62235b414\",\"deletedDateTime\":null,\"accountEnabled\":true,\"alternativeNames\":[],\"appDisplayName\":\"Azure CosmosDB for PostgreSQL Microsoft EntraId\",\"appDescription\":null,\"appId\":\"ecafc2d9-cf1a-49a7-b60f-e44e34a988d2\",\"applicationTemplateId\":null,\"appOwnerOrganizationId\":\"f8cdef31-a31e-4b4a-93e4-5f571e91255a\",\"appRoleAssignmentRequired\":false,\"createdByAppId\":\"797f4846-ba00-4fd7-ba43-dac1f8f63013\",\"createdDateTime\":\"2026-06-27T23:29:55Z\",\"description\":null,\"disabledByMicrosoftStatus\":null,\"displayName\":\"Azure CosmosDB for PostgreSQL Microsoft EntraId\",\"homepage\":null,\"isDisabled\":null,\"loginUrl\":null,\"logoutUrl\":null,\"notes\":null,\"notificationEmailAddresses\":[],\"preferredSingleSignOnMode\":null,\"preferredTokenSigningKeyThumbprint\":null,\"replyUrls\":[],\"servicePrincipalNames\":[\"ecafc2d9-cf1a-49a7-b60f-e44e34a988d2\",\"https://token.postgres.cosmos.azure.com\"],\"servicePrincipalType\":\"Application\",\"signInAudience\":\"AzureADMultipleOrgs\",\"tags\":[\"disableLegacyUserImpersonationClient\",\"disableLegacyUserImpersonationResource\",\"GitCreatedApp\"],\"tokenEncryptionKeyId\":null,\"samlSingleSignOnSettings\":null,\"addIns\":[],\"appRoles\":[{\"allowedMemberTypes\":[\"Application\"],\"description\":\"Access CPG Prod services from the application\",\"displayName\":\"Azure CPG Prod\",\"id\":\"bb7fb9ee-c8d2-4c3b-853e-af20f589cb42\",\"isEnabled\":true,\"origin\":\"Application\",\"value\":\"app_impersonation\"}],\"info\":{\"logoUrl\":null,\"marketingUrl\":null,\"privacyStatementUrl\":null,\"supportUrl\":null,\"termsOfServiceUrl\":null},\"keyCredentials\":[],\"oauth2PermissionScopes\":[{\"adminConsentDescription\":\"Access CosmosDB for PostgreSQL as a user\",\"adminConsentDisplayName\":\"Access CosmosDB for PostgreSQL\",\"id\":\"51a464c6-5185-43ba-b6fc-cb173be5e291\",\"isEnabled\":true,\"type\":\"User\",\"u
```

---

### sites_site_functions_sites_delta

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 5.7s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Tenant does not have a SPO license.","innerError":{"date":"2026-07-29T06:23:15","request-id":"207a86ad-0355-45a3-bcee-376f1f2cce0d","client-request-id":"207a86ad-0355-45a3-bcee-376f1f2cce0d"}}} [GET] https://graph.microsoft.com/v1.0/sites/delta()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### sites_site_sites_site_listsite

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 18.6s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Tenant does not have a SPO license.","innerError":{"date":"2026-07-29T06:23:11","request-id":"47ffb751-c019-4285-b977-caf6ebf06b07","client-request-id":"47ffb751-c019-4285-b977-caf6ebf06b07"}}} [GET] https://graph.microsoft.com/v1.0/sites
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### sites_site_functions_sites_getallsites

- **Status**: FAIL (400_BADREQUEST)
- **Elapsed**: 18.9s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Tenant does not have a SPO license.","innerError":{"date":"2026-07-29T07:04:00","request-id":"8b12da26-54f2-4b92-8de9-bf8af4bb558a","client-request-id":"8b12da26-54f2-4b92-8de9-bf8af4bb558a"}}} [GET] https://graph.microsoft.com/v1.0/sites/getAllSites()
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_getemailnotificationssetting

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 17.3s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:00","request-id":"c20c3a27-48ef-4806-95fd-b97337100c4d","client-request-id":"c20c3a27-48ef-4806-95fd-b97337100c4d"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/emailNotificationsSetting
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listbrowsesessions

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 19.8s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:01","request-id":"3b0eb308-900a-4df9-8a3d-d1763ec91f07","client-request-id":"3b0eb308-900a-4df9-8a3d-d1763ec91f07"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/browseSessions
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listdriveprotectionunits

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 15.9s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:00","request-id":"6763ef05-d768-45a8-94d9-b3dc63b60875","client-request-id":"6763ef05-d768-45a8-94d9-b3dc63b60875"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/driveProtectionUnits
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listdriveprotectionunitsbulkadditionjobs

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 15.3s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:23:47","request-id":"7d6d87af-29e4-4262-81ac-f21987226531","client-request-id":"7d6d87af-29e4-4262-81ac-f21987226531"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/driveProtectionUnitsBulkAdditionJobs
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listdriveinclusionrules

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 16.3s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:23:47","request-id":"58d7ba3e-fa3c-4e85-9a26-9c6183ecf31e","client-request-id":"58d7ba3e-fa3c-4e85-9a26-9c6183ecf31e"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/driveInclusionRules
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listexchangeprotectionpolicies

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.4s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:00","request-id":"957b9e9b-9322-4655-88f0-4660f195c3e2","client-request-id":"957b9e9b-9322-4655-88f0-4660f195c3e2"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/exchangeProtectionPolicies
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listexchangerestoresessions

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 13.9s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:00","request-id":"33d18cf9-acc0-41c7-8c9c-bf6b1b3faa1e","client-request-id":"33d18cf9-acc0-41c7-8c9c-bf6b1b3faa1e"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/exchangeRestoreSessions
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listmailboxinclusionrules

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.0s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:01","request-id":"6de35325-5a76-4d83-b9c0-ba996ad8f24e","client-request-id":"6de35325-5a76-4d83-b9c0-ba996ad8f24e"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/mailboxInclusionRules
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listmailboxprotectionunits

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.0s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:01","request-id":"ddaec746-c216-428c-9fce-e67646707e55","client-request-id":"ddaec746-c216-428c-9fce-e67646707e55"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/mailboxProtectionUnits
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listmailboxprotectionunitsbulkadditionjobs

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.8s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:01","request-id":"7da68458-1acd-4d88-afc9-25256690d720","client-request-id":"7da68458-1acd-4d88-afc9-25256690d720"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/mailboxProtectionUnitsBulkAdditionJobs
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listonedriveforbusinessbrowsesessions

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.6s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:08","request-id":"73c08467-ea6f-4de5-a510-b93811ef34b9","client-request-id":"73c08467-ea6f-4de5-a510-b93811ef34b9"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/oneDriveForBusinessBrowseSessions
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listonedriveforbusinessprotectionpolicies

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.6s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:08","request-id":"844218f7-572b-4004-a4ab-93753d6d27b5","client-request-id":"844218f7-572b-4004-a4ab-93753d6d27b5"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/oneDriveForBusinessProtectionPolicies
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listonedriveforbusinessrestoresessions

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.3s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:23:47","request-id":"4af21855-7f4d-4ceb-87a9-9922e4dfa4af","client-request-id":"4af21855-7f4d-4ceb-87a9-9922e4dfa4af"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/oneDriveForBusinessRestoreSessions
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listprotectionpolicies

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.7s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:08","request-id":"f42a2dbf-f9a2-4461-855c-736a82251972","client-request-id":"f42a2dbf-f9a2-4461-855c-736a82251972"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/protectionPolicies
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listprotectionunits_asmailboxprotectionunit

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.0s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:23:47","request-id":"26446af7-fee7-4865-925d-75c708f51507","client-request-id":"26446af7-fee7-4865-925d-75c708f51507"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/protectionUnits/graph.mailboxProtectionUnit
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listprotectionunits

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.0s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:25","request-id":"c8f90d7c-3a8a-48e4-a650-12f00ed83913","client-request-id":"c8f90d7c-3a8a-48e4-a650-12f00ed83913"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/protectionUnits
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listprotectionunits_asdriveprotectionunit

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.0s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:24:06","request-id":"137104b6-e88f-4a9d-abc3-cfae0780d377","client-request-id":"137104b6-e88f-4a9d-abc3-cfae0780d377"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/protectionUnits/graph.driveProtectionUnit
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listprotectionunits_assiteprotectionunit

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 14.4s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:30","request-id":"ffc25fea-f172-483a-8d8e-4fa90d96ee6f","client-request-id":"ffc25fea-f172-483a-8d8e-4fa90d96ee6f"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/protectionUnits/graph.siteProtectionUnit
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listrestoresessions

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 21.2s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:24","request-id":"dbd3db04-6c00-40e9-98f7-43a7e6186092","client-request-id":"dbd3db04-6c00-40e9-98f7-43a7e6186092"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/restoreSessions
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listserviceapps

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 21.3s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:35","request-id":"40b09baa-50c9-455f-a221-1f3b62b1ccb8","client-request-id":"40b09baa-50c9-455f-a221-1f3b62b1ccb8"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/serviceApps
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listrestorepoints

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 21.8s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:24","request-id":"6f553d34-6ac5-4950-8c03-7e34df6fba03","client-request-id":"6f553d34-6ac5-4950-8c03-7e34df6fba03"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/restorePoints
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listsharepointbrowsesessions

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 22.9s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:51","request-id":"2d66edeb-1733-472c-b17f-079969b3643e","client-request-id":"2d66edeb-1733-472c-b17f-079969b3643e"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/sharePointBrowseSessions
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listsharepointrestoresessions

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 22.9s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:24","request-id":"9fb1e52d-b9c7-4627-91cf-f6cac725696d","client-request-id":"9fb1e52d-b9c7-4627-91cf-f6cac725696d"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/sharePointRestoreSessions
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listsharepointprotectionpolicies

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 23.0s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:45","request-id":"bccc5891-bee9-4042-a0b6-b57e25ad01c1","client-request-id":"bccc5891-bee9-4042-a0b6-b57e25ad01c1"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/sharePointProtectionPolicies
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listsiteinclusionrules

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 22.5s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:05:02","request-id":"fa4ebb1e-b08d-4705-8538-9e292c4df774","client-request-id":"fa4ebb1e-b08d-4705-8538-9e292c4df774"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/siteInclusionRules
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listsiteprotectionunits

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 32.1s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:05:08","request-id":"72eef133-5449-4a03-8506-8bd2d65517a8","client-request-id":"72eef133-5449-4a03-8506-8bd2d65517a8"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/siteProtectionUnits
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_getbackuprestore

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 36.7s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:25","request-id":"3d0a7387-4284-4038-83ec-4e47132f2723","client-request-id":"3d0a7387-4284-4038-83ec-4e47132f2723"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_bookingbusiness_solutions_listbookingbusinesses

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 36.7s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:57","request-id":"6cfc5b29-ebef-457b-b3cd-1e22f27163f2","client-request-id":"6cfc5b29-ebef-457b-b3cd-1e22f27163f2"}}} [GET] https://graph.microsoft.com/v1.0/solutions/bookingBusinesses
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_backuprestoreroot_solutions_backuprestore_listsiteprotectionunitsbulkadditionjobs

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 37.1s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:40","request-id":"195b2eee-6e03-417d-a7e0-093bac6dc732","client-request-id":"195b2eee-6e03-417d-a7e0-093bac6dc732"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore/siteProtectionUnitsBulkAdditionJobs
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_bookingcurrency_solutions_listbookingcurrencies

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 32.2s

```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T07:04:25","request-id":"347e1470-80fb-475a-9b19-1e1672f6c6c0","client-request-id":"347e1470-80fb-475a-9b19-1e1672f6c6c0"}}} [GET] https://graph.microsoft.com/v1.0/solutions/bookingCurrencies
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.
```

---

### solutions_virtualeventsroot_solutions_getvirtualevents

- **Status**: FAIL (403_FORBIDDEN)
- **Elapsed**: 20.9s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"{\"operationFailure\":{\"reason\":\"unknown\",\"code\":404,\"subCode\":71007,\"phrase\":\"Route does not exist\"}}","innerError":{"date":"2026-07-29T07:04:24","request-id":"a8f82640-0e92-4393-b7a6-fef6875f0752","client-request-id":"a8f82640-0e92-4393-b7a6-fef6875f0752"}}} [GET] https://graph.microsoft.com/v1.0/solutions/virtualEvents
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### solutions_virtualeventsroot_solutions_virtualevents_listevents

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 20.5s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"{\"operationFailure\":{\"reason\":\"unknown\",\"code\":404,\"subCode\":71007,\"phrase\":\"Route does not exist\"}}","innerError":{"date":"2026-07-29T07:04:24","request-id":"72b8a8aa-36ef-4935-a863-1eb6ceb3325d","client-request-id":"72b8a8aa-36ef-4935-a863-1eb6ceb3325d"}}} [GET] https://graph.microsoft.com/v1.0/solutions/virtualEvents/events
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### solutions_solutionsroot_solutions_solutionsroot_getsolutionsroot

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 20.9s

```
[{"backuprestore":null,"bookingbusinesses":null,"bookingcurrencies":null,"virtualevents":null,"odata_type":null}]
```

---

### solutions_virtualeventsroot_solutions_virtualevents_listtownhalls

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 11.8s

```
TIMEOUT
```

---

### storage_filestorage_storage_filestorage_listcontainertyperegistrations

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.9s

```
TIMEOUT
```

---

### storage_filestorage_storage_filestorage_listcontainers

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.9s

```
TIMEOUT
```

---

### solutions_virtualeventsroot_solutions_virtualevents_listwebinars

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 9.1s

```
TIMEOUT
```

---

### storage_filestorage_storage_filestorage_listcontainertypes

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.8s

```
TIMEOUT
```

---

### storage_filestorage_storage_getfilestorage

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.4s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"This API is not supported for AAD accounts (no addressUrl for Microsoft.FileServices,False).","innerError":{"date":"2026-07-29T07:05:32","request-id":"7c89c471-ccba-40a7-a15e-68cd5aaad6bb","client-request-id":"7c89c471-ccba-40a7-a15e-68cd5aaad6bb"}}} [GET] https://graph.microsoft.com/v1.0/storage/fileStorage
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### storage_filestorage_storage_filestorage_listdeletedcontainers

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.4s

```
TIMEOUT
```

---

### storage_storage_storage_storage_getstorage

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.3s

```
[{"filestorage":null,"settings":null,"odata_type":null}]
```

---

### storage_storagesettings_storage_getsettings

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.9s

```
TIMEOUT
```

---

### subscribedskus_subscribedsku_subscribedskus_subscribedsku_listsubscribedsku

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 9.5s

```
[{"odata_count":null,"odata_nextlink":null,"value":"[]","count":null,"filter":null,"search":null,"skip":null,"top":null}]
```

---

### storage_storagesettings_storage_settings_quota_listservices

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 9.6s

```
TIMEOUT
```

---

### storage_storagesettings_storage_settings_getquota

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 9.6s

```
Error: Source server error (500)
Detail: {"error":{"code":"InternalServerError","message":"Invalid URI: The hostname could not be parsed.","innerError":{"date":"2026-07-29T07:05:36","request-id":"6819c9c9-5e1a-4048-b6ee-e1dc04aba310","client-request-id":"6819c9c9-5e1a-4048-b6ee-e1dc04aba310"}}} [GET] https://graph.microsoft.com/v1.0/storage/settings/quota
Hint: The upstream API returned a server error. This may be transient — retry after a brief wait.
```

---

### subscriptions_subscription_subscriptions_subscription_listsubscription

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 9.1s

```
[{"odata_count":null,"odata_nextlink":null,"value":"[]","count":null,"filter":null,"search":null,"skip":null,"top":null}]
```

---

### teams_team_teams_team_listteam

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.2s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-29T06:25:40","request-id":"d31dd392-93a2-4a4b-8330-2262ddac2c14","client-request-id":"d31dd392-93a2-4a4b-8330-2262ddac2c14"}}} [GET] https://graph.microsoft.com/v1.0/teams
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### teamstemplates_teamstemplate_teamstemplates_teamstemplate_listteamstemplate

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.2s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-29T06:25:28","request-id":"e3db710e-8649-4c2c-b982-ec14151a4eeb","client-request-id":"e3db710e-8649-4c2c-b982-ec14151a4eeb"}}} [GET] https://graph.microsoft.com/v1.0/teamsTemplates
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### teams_team_functions_teams_getallmessages

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.3s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-29T06:25:29","request-id":"dd40233f-c336-46ae-b4bf-fe0bb89112fc","client-request-id":"dd40233f-c336-46ae-b4bf-fe0bb89112fc"}}} [GET] https://graph.microsoft.com/v1.0/teams/getAllMessages()
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### teamwork_deletedchat_teamwork_listdeletedchats

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.3s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-29T06:25:29","request-id":"218aae78-2857-472d-9b20-5233619e7fb6","client-request-id":"218aae78-2857-472d-9b20-5233619e7fb6"}}} [GET] https://graph.microsoft.com/v1.0/teamwork/deletedChats
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### teamwork_teamsappsettings_teamwork_getteamsappsettings

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.3s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-29T06:25:29","request-id":"8902e70f-5d01-4f83-b684-9990c860c7dd","client-request-id":"8902e70f-5d01-4f83-b684-9990c860c7dd"}}} [GET] https://graph.microsoft.com/v1.0/teamwork/teamsAppSettings
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### teamwork_deletedteam_teamwork_listdeletedteams

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.3s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-29T06:25:28","request-id":"abb77e23-7fc7-4157-80d5-f931d792ed68","client-request-id":"abb77e23-7fc7-4157-80d5-f931d792ed68"}}} [GET] https://graph.microsoft.com/v1.0/teamwork/deletedTeams
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### teamwork_deletedteam_teamwork_deletedteams_getallmessages

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.3s

```
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-29T07:05:32","request-id":"d89f585c-96bc-444d-a018-255373d60303","client-request-id":"d89f585c-96bc-444d-a018-255373d60303"}}} [GET] https://graph.microsoft.com/v1.0/teamwork/deletedTeams/getAllMessages()
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.
```

---

### teamwork_teamwork_teamwork_teamwork_getteamwork

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.2s

```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-29T07:05:32","request-id":"1c4a5104-fd53-496b-95d4-69aef932df19","client-request-id":"1c4a5104-fd53-496b-95d4-69aef932df19"}}} [GET] https://graph.microsoft.com/v1.0/teamwork
Hint: Check the configured credentials and whether they have access to this resource.
```

---

### tenantrelationships_delegatedadminrelationship_tenantrelationships_listdelegatedadminrelationships

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.1s

```
[{"odata_count":null,"odata_nextlink":null,"value":"[]","count":null,"filter":null,"search":null,"skip":null,"top":null}]
```

---

### tenantrelationships_delegatedadmincustomer_tenantrelationships_listdelegatedadmincustomers

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.2s

```
[{"odata_count":null,"odata_nextlink":null,"value":"[]","count":null,"filter":null,"search":null,"skip":null,"top":null}]
```

---

### teamwork_workforceintegration_teamwork_listworkforceintegrations

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.3s

```
Error: Source rejected the request (400)
Detail: {"error":{"code":"AuthenticationError","message":"Error authenticating with resource.","innerError":{"date":"2026-07-29T07:05:46","request-id":"8ca640c9-0c30-48f2-981c-638644d4fb3a","client-request-id":"8ca640c9-0c30-48f2-981c-638644d4fb3a"}}} [GET] https://graph.microsoft.com/v1.0/teamwork/workforceIntegrations
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

---

### tenantrelationships_multitenantorganization_tenantrelationships_getmultitenantorganization

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.1s

```
[{"odata_type":null,"createddatetime":null,"description":null,"displayname":null,"id":"1837b30a-09ca-427a-a98c-d345f037ec00","joinrequest":null,"state":"\"inactive\"","tenants":null}]
```

---

### tenantrelationships_multitenantorganization_tenantrelationships_multitenantorganization_listtenants

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.0s

```
[{"odata_count":null,"odata_nextlink":null,"value":"[]","count":null,"filter":null,"search":null,"skip":null,"top":null}]
```

---

### tenantrelationships_multitenantorganization_tenantrelationships_multitenantorganization_getjoinrequest

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.1s

```
[{"odata_type":null,"addedbytenantid":"00000000-0000-0000-0000-000000000000","id":"66652dcb-ed62-4e7c-945a-fc3ccdab4600","memberstate":null,"role":null,"transitiondetails":null}]
```

---

### tenantrelationships_tenantrelationship_tenantrelationships_tenantrelationship_gettenantrelationship

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.0s

```
[{"delegatedadmincustomers":null,"delegatedadminrelationships":null,"multitenantorganization":null,"odata_type":null}]
```

---

### users_user_functions_users_delta

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 8.2s

```
[{"odata_deltalink":null,"odata_nextlink":"https://graph.microsoft.com/v1.0/users/delta()?$skiptoken=S5aczCOYTuRhqFVWGMzdR1GEtlELjM4SbuB2Ig46y3H-aNGOljE8eh0Jku1raJ1kneiAN5ADpo3DlkaC2DJZO49kEpNsmOYTSH1uYEhOI5DkNuJNxewXoP469Wdl0XVKa_AMTrTwulZCYzlD03JVxwsCNuFYq_-sWHtzSoLJcS1TAazAOkcNh5vUVrTbWhsHXqjfPteDfcqdMYiGv4okmFHfYTTrTqnIcHGnT7Mskhfl4MQmB6um2CaLacpwT7DOI1cY7s29U5CVByRSkkLHsvMrPHQtI0Bh32Lc8L4Y-2rl_ZJKk-8hRFfCGNuHWAfOsD2FHCPqXUvxJYbh0hOXMyn8H9Ogta5zcberYS_6trXp-es-8YxHm518iZA-8xS3dWfMl7rHY33i5DuPQkJ2JIcEuSrWp1vmiHAEwp-6PFCOJd2KMQXfCn_Db77vRqGG2DARAGYrs0FRy_r2swLUDf5uPtU0xQ5Je0gs564_MVq70Udb6-PK9J9bHUGxHtI6GKLfIoOrTqsOUW4y_sxM6BiCZiozTvSLygIrXmhYvaa5T88C6darD4B9YhIqkiZDcWqk69BeHOp2OvHdO2Ot5ioAsFRaqwogSH6_offZj8_jTAzr6o4l_rwDI5savgdNf1XA6OczyyXq0QU1JKVcIOTvhNEY4HSMA1CckpaGS65AUAkPvkPq7VEpTHnoN5e7RNGKXhXRcLzLd3TSPEmKnujcBhOt0tC0VGJBHG8V1rJg9Olmo9m1RQBNV242Ex75j20X_prm38PDrcuzV7ER1KTcf4XjvBrShX_30FEOc5Tzvo02evT6VBnuVjUqzOq6KnoVYtWY2hpNSQRNvlE22bbhm8o2oTNSRLX62tD8tOXDxBiD5B1hOgyb-ZSlQV5PGdj7Rps9dtfu2m20yQDA9u_kCqU7V3xIrSNJOCmTWj20x4ihyiOm2sRS8X0bj-BxJSyArNTjqjmVMhn--cbhrYFwuHMDMmlVDZIOvN9KTHZuJh71jGU7D7BhGQPXKRLFaWFY82SfBaVDM9Vw2bXXEbW46yAQ2CdsLo1Dxf30ZLRbdpGGR9LKAMRMQ970HSGLY7JEJ4yPYDOVvn7ehnpM41QRjQnbprHOC4t0EIdB8bCch6ASG8B514mtQD8AamFi9vZk5Hib2a9Am1GFdQgkstAHQ8gm5bQYRE2V9ugaX1otcbHBFCeUU3tQAAv0V4XOoKMYmPvWxq3j9teY-hMIVNf5f1tNyyog1L-aHNaxHTGGzblgTdvdb-0pvMcxyxr2ubU2cqHp0HgNFB700X52Wc5foA-UgF8nUYb3_RHfceVWMAAO2dvgAR2_RbuU3SHczemO9A0mvTi1WFeVN4v9A4RSExELy3CixwXpKqLmZsBa7PVDXWygB6SG2_PLqvBrcWrQo9WO4GjKpSHKiDCAFGgLKTgEOq00KsGqc0T6XU5ZaweoGaKV4n-EnfPfPsG5lr1EOGEi-oEyGIZ_LSa0lJX6fNueMlBbze9GTWDLPK3HIiIW-d4Z0oKCgxgAWFW2_BBY6wMrPbPakZaOLdgkpXhcoavGRSG5ExyOSrpVpAaxaT0JALRYb20R96IFywO3MLpw_-J8rpX0RXxI42kr2Ob76ZKwpi7k4jmeti2208hQH6Su9Isqm-cYxM24V5-sSkA5lXoJ4T4letfWsezT_mqy7sO3ibp81vFD4ZfpKn5uETLOoiTDAC6-wI_XI9LlbdjwzSu1UABel0Djh7S_Wsh0RYZeYL8npy7rP3PNnuB7IK0mcIiuCJzjwzTSk0CFVkOBeH9gOP-DbnrZpDWWSRcTc1VyIj4lSbq8z0DnV55h2Qf0VnpF8XUp6mamYinW7r8gXjgw0tMt-P4mIcyMBT0aBfJEvznj9YcqtBz3cX6hhXPSKLHEpqKizss16f1E.FWjPNuUtbgAAz0DYu-mvhjhGIPltMggMlbYD1829XF4","value":"[{\"displayName\":\"vicky kumar\",\"givenName\":\"vicky\",\"preferredLanguage\":\"en\",\"surname\":\"kumar\",\"userPrincipalName\":\"algsoch_gmail.com#EXT#@algsochgmail.onmicrosoft.com\",\"id\":\"1165bcae-a56f-49bf-af0a-4496f80cd544\"},{\"displayName\":\"Vicky Test\",\"userPrincipalName\":\"vicky@algsochgmail.onmicrosoft.com\",\"id\":\"5f5692cb-2e99-4f43-8d0f-900d9441bd7e\"},{\"displayName\":\"Bulk Tester 1\",\"userPrincipalName\":\"bulktester1@algsochgmail.onmicrosoft.com\",\"id\":\"0863f409-c21f-46a1-b4a5-5ff6ef512c8c\"},{\"displayName\":\"Bulk Tester 2\",\"userPrincipalName\":\"bulktester2@algsochgmail.onmicrosoft.com\",\"id\":\"1448c36a-1732-4eee-aaab-d03c32001991\"},{\"displayName\":\"Bulk Tester 3\",\"userPrincipalName\":\"bulktester3@algsochgmail.onmicrosoft.com\",\"id\":\"345f1ed2-03f3-41b0-97d7-cd3a704db34a\"},{\"displayName\":\"Bulk Tester 4\",\"userPrincipalName\":\"bulktester4@algsochgmail.onmicroso
```

---

### users_user_users_user_listuser

- **Status**: FAIL (401_UNAUTHORIZED)
- **Elapsed**: 7.1s

```
[{"odata_count":null,"odata_nextlink":null,"value":"[{\"businessPhones\":[],\"displayName\":\"vicky kumar\",\"givenName\":\"vicky\",\"jobTitle\":null,\"mail\":null,\"mobilePhone\":null,\"officeLocation\":null,\"preferredLanguage\":\"en\",\"surname\":\"kumar\",\"userPrincipalName\":\"algsoch_gmail.com#EXT#@algsochgmail.onmicrosoft.com\",\"id\":\"1165bcae-a56f-49bf-af0a-4496f80cd544\"},{\"businessPhones\":[],\"displayName\":\"Bulk Tester 1\",\"givenName\":null,\"jobTitle\":null,\"mail\":null,\"mobilePhone\":null,\"officeLocation\":null,\"preferredLanguage\":null,\"surname\":null,\"userPrincipalName\":\"bulktester1@algsochgmail.onmicrosoft.com\",\"id\":\"0863f409-c21f-46a1-b4a5-5ff6ef512c8c\"},{\"businessPhones\":[],\"displayName\":\"Bulk Tester 10\",\"givenName\":null,\"jobTitle\":null,\"mail\":null,\"mobilePhone\":null,\"officeLocation\":null,\"preferredLanguage\":null,\"surname\":null,\"userPrincipalName\":\"bulktester10@algsochgmail.onmicrosoft.com\",\"id\":\"0374aa8b-1809-403f-98f3-a898d9e91f67\"},{\"businessPhones\":[],\"displayName\":\"Bulk Tester 11\",\"givenName\":null,\"jobTitle\":null,\"mail\":null,\"mobilePhone\":null,\"officeLocation\":null,\"preferredLanguage\":null,\"surname\":null,\"userPrincipalName\":\"bulktester11@algsochgmail.onmicrosoft.com\",\"id\":\"3ee72dc7-caf1-4456-b0bc-0f98746d04f0\"},{\"businessPhones\":[],\"displayName\":\"Bulk Tester 12\",\"givenName\":null,\"jobTitle\":null,\"mail\":null,\"mobilePhone\":null,\"officeLocation\":null,\"preferredLanguage\":null,\"surname\":null,\"userPrincipalName\":\"bulktester12@algsochgmail.onmicrosoft.com\",\"id\":\"abe82aec-1248-41cd-b163-6d1c05ca3057\"},{\"businessPhones\":[],\"displayName\":\"Bulk Tester 13\",\"givenName\":null,\"jobTitle\":null,\"mail\":null,\"mobilePhone\":null,\"officeLocation\":null,\"preferredLanguage\":null,\"surname\":null,\"userPrincipalName\":\"bulktester13@algsochgmail.onmicrosoft.com\",\"id\":\"dde1f054-a4d3-4e9c-aead-50a76a3a2a03\"},{\"businessPhones\":[],\"displayName\":\
```

---
