# Microsoft Graph v4 Source — API Coverage Report

> Test: `SELECT * FROM microsoft_graph_v4.<table> LIMIT 1` on all 733 registered tables
> Token: Azure CLI `az account get-access-token --resource https://graph.microsoft.com`
> Date: 28 Jul 2026

---

## Summary

| Metric | Value |
|--------|-------|
| Total tables tested | 733 |
| **PASS** | **117 (16%)** |
| FAIL | 616 (84%) |

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
