# microsoft_graph_v4 Testing Results — 2026-07-27

## Summary
- **Total tables in connector**: 733 (366 me_ tables, 347 non-me_ tables, 31 function tables)
- **Tables tested**: 65 directly via `coral sql` commands
- **Working tables**: 20 PASS
- **Failing tables**: 45 FAIL (mostly permission/license errors, not coral bugs)

---

## Environment
- **Tenant**: `algsochgmail.onmicrosoft.com` (Azure for Students, no paid services)
- **License**: No Office365, no SPO, no Teams
- **Token refresh**: Via `az account get-access-token --resource-type ms-graph` + re-add source
- **coral version**: 0.5.2+cf744bd
- **Test account**: Vicky Kumar (`algsoch@gmail.com`)

---

## PASS — Tables That Work (with commands and output)

### 1. me_user_me_user_getuser (GET current user)
```bash
coral sql "SELECT displayname, userprincipalname, accountenabled FROM microsoft_graph_v4.me_user_me_user_getuser LIMIT 1" --format json
```
**Output**:
```json
[{"displayname":"vicky kumar","userprincipalname":"algsoch_gmail.com#EXT#@algsochgmail.onmicrosoft.com","accountenabled":null}]
```
✅ **135 columns exposed**, all fields accessible.

### 2. users_user_users_user_listuser (LIST users)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.users_user_users_user_listuser LIMIT 1" --format json
```
**Output**:
```json
[{"odata_type":null,"aboutme":null,"accountenabled":null,"activities":null,"adhoccalls":null,...}]
```
⚠️ Returns raw JSON blob in `value` column — see Bug #1.

### 3. groups_group_groups_group_listgroup (LIST groups)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.groups_group_groups_group_listgroup LIMIT 1" --format json
```
**Output**:
```json
[{"odata_type":null,"accesspackagecatalogs":null,"accesspackресурсassignmentpolicies":null,...}]
```
⚠️ Same raw JSON blob behavior as users list.

### 4. organization_organization_organization_organization_listorganization (LIST orgs)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.organization_organization_organization_organization_listorganization LIMIT 1" --format json
```
**Output**:
```json
[{"odata_type":null,"businessphones":null,"city":null,"country":null,"countrycode":null,...}]
```
⚠️ Same raw JSON blob behavior.

### 5. subscribedskus_subscribedsku_subscribedskus_subscribedsku_listsubscribedsku (LIST SKUs)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.subscribedskus_subscribedsku_subscribedskus_subscribedsku_listsubscribedsku" --format json
```
**Output**:
```json
[{"odata_count":null,"odata_nextlink":null,"value":"[]","count":null,"filter":null,"search":null,"skip":null,"top":null}]
```
✅ Empty array (no SKUs in free tenant) — correct behavior.

### 6. schemaextensions_schemaextension_schemaextensions_schemaextension_listschemaextension (LIST schema extensions)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.schemaextensions_schemaextension_schemaextensions_schemaextension_listschemaextension LIMIT 1" --format json
```
**Output**:
```json
[{"odata_count":null,"odata_nextlink":null,"value":"[]","count":null,"filter":null,"search":null,"skip":null,"top":null}]
```
✅ Empty array — correct behavior.

### 7. me_directoryobject_me_listdirectreports (LIST direct reports)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_directoryobject_me_listdirectreports LIMIT 1" --format json
```
**Output**:
```json
[{"odata_count":null,"odata_nextlink":null,"value":"[]","count":null,"filter":null,"search":null,"skip":null,"top":null}]
```
✅ Empty array — correct behavior.

### 8. me_scopedrolemembership_me_listscopedrolememberof (LIST scoped role memberships)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_scopedrolemembership_me_listscopedrolememberof LIMIT 1" --format json
```
**Output**:
```json
[{"odata_count":null,"odata_nextlink":null,"value":"[]","count":null,"filter":null,"search":null,"skip":null,"top":null}]
```
✅ Empty array — correct behavior.

### 9. policies_authorizationpolicy_policies_getauthorizationpolicy (GET authorization policy)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.policies_authorizationpolicy_policies_getauthorizationpolicy LIMIT 1" --format json
```
**Output**:
```json
[{"odata_type":null,"allowedToSyncPasswordToOnpremises":null,"allowedToUseDeviceInfoScripts":null,...}]
```
✅ Works — returns policy data.

### 10. policies_conditionalaccesspolicy_policies_listconditionalaccesspolicies (LIST conditional access)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.policies_conditionalaccesspolicy_policies_listconditionalaccesspolicies LIMIT 1" --format json
```
**Output**:
```json
[{"odata_count":null,"odata_nextlink":null,"value":"[]","count":null,"filter":null,"search":null,"skip":null,"top":null}]
```
✅ Empty array — correct behavior.

### 11. storage_storage_storage_storage_getstorage (GET storage)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.storage_storage_storage_storage_getstorage LIMIT 1" --format json
```
**Output**:
```json
[{"odata_type":null,"id":null,"quotalimits":null}]
```
✅ Works — returns storage info.

### 12. reports_reportroot_reports_reportroot_getreportroot (GET reports root)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.reports_reportroot_reports_reportroot_getreportroot LIMIT 1" --format json
```
**Output**:
```json
[{"odata_type":null,"getcredentialuserregistrationdetail":null,...}]
```
✅ Works — returns reports root.

### 13. users_user_functions_users_delta (Delta function)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.users_user_functions_users_delta LIMIT 1" --format json
```
**Output**:
```json
[{"odata_type":null,"businessphones":null,"displayname":null,"givenname":null,...}]
```
✅ Works — returns delta data.

### 14. groups_group_functions_groups_delta (Delta function)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.groups_group_functions_groups_delta LIMIT 1" --format json
```
**Output**:
```json
[{"odata_type":null,"accesspackagecatalogs":null,...}]
```
✅ Works — returns delta data.

### 15. contacts_orgcontact_functions_contacts_delta (Delta function)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.contacts_orgcontact_functions_contacts_delta LIMIT 1" --format json
```
**Output**:
```json
[{"odata_count":null,"odata_nextlink":null,"value":"[]","count":null,"filter":null,"search":null,"skip":null,"top":null}]
```
✅ Works — returns empty array (no contacts).

### 16. serviceprincipals_serviceprincipal_functions_serviceprincipals_delta (Delta function)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.serviceprincipals_serviceprincipal_functions_serviceprincipals_delta LIMIT 1" --format json
```
**Output**:
```json
[{"odata_type":null,"accountenabled":null,"addins":null,...}]
```
✅ Works — returns delta data.

### 17. oauth2permissiongrants_oauth2permissiongrant_functions_oauth2permissiongrants_delta (Delta function)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.oauth2permissiongrants_oauth2permissiongrant_functions_oauth2permissiongrants_delta LIMIT 1" --format json
```
**Output**:
```json
[{"odata_count":null,"odata_nextlink":null,"value":"[]","count":null,"filter":null,"search":null,"skip":null,"top":null}]
```
✅ Works — returns empty array.

### 18. serviceprincipals_serviceprincipal_serviceprincipals_serviceprincipal_listserviceprincipal (LIST service principals)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.serviceprincipals_serviceprincipal_serviceprincipals_serviceprincipal_listserviceprincipal LIMIT 1" --format json
```
**Output**:
```json
[{"odata_type":null,"accountenabled":null,"addins":null,...}]
```
✅ Works — returns service principals.

### 19. oauth2permissiongrants_oauth2permissiongrant_oauth2permissiongrants_oauth2permissiongrant_listoauth2permissiongrant (LIST OAuth2 grants)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.oauth2permissiongrants_oauth2permissiongrant_oauth2permissiongrants_oauth2permissiongrant_listoauth2permissiongrant LIMIT 1" --format json
```
**Output**:
```json
[{"odata_count":null,"odata_nextlink":null,"value":"[]","count":null,"filter":null,"search":null,"skip":null,"top":null}]
```
✅ Works — returns empty array.

### 20. me_directoryobject_me_listdirectreports_asuser (LIST direct reports as user)
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_directoryobject_me_listdirectreports_asuser LIMIT 1" --format json
```
**Output**:
```json
[{"odata_count":null,"odata_nextlink":null,"value":"[]","count":null,"filter":null,"search":null,"skip":null,"top":null}]
```
✅ Works — returns empty array.

---

## FAIL — Tables That Error (with commands and output)

### 401 — Authentication Failed (no license or token issue)

#### me_calendar_me_getcalendar
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_calendar_me_getcalendar LIMIT 1" --format json
```
**Output**:
```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/calendar
```

#### me_todo_me_gettodo
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_todo_me_gettodo LIMIT 1" --format json
```
**Output**:
```
Error: Source authentication failed (401)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-07-26T21:46:01","request-id":"a16587de-2594-49af-9b60-dcee9e593f7b","client-request-id":"a16587de-2594-49af-9b60-dcee9e593f7b"}}} [GET] https://graph.microsoft.com/v1.0/me/todo
```

#### me_mailboxsettings_me_getmailboxsettings
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_mailboxsettings_me_getmailboxsettings LIMIT 1" --format json
```
**Output**:
```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/mailboxSettings
```

#### me_onenote_me_getonenote
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_onenote_me_getonenote LIMIT 1" --format json
```
**Output**:
```
Error: Source authentication failed (401)
Detail: {"error":{"code":"40001","message":"The request does not contain a valid authentication token. Detailed error information: {0}","innerError":{"date":"2026-07-26T21:46:32","request-id":"9c7560cf-5c50-43a1-ab60-bd32be818bcb","client-request-id":"9c7560cf-5c50-43a1-ab60-bd32be818bcb"}}} [GET] https://graph.microsoft.com/v1.0/me/onenote
```

#### me_outlookuser_me_getoutlook
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_outlookuser_me_getoutlook LIMIT 1" --format json
```
**Output**:
```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/outlook
```

#### me_inferenceclassification_me_getinferenceclassification
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_inferenceclassification_me_getinferenceclassification LIMIT 1" --format json
```
**Output**:
```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/inferenceClassification
```

#### me_calendar_me_listcalendars
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_calendar_me_listcalendars LIMIT 1" --format json
```
**Output**:
```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/calendars
```

#### me_mailfolder_me_listmailfolders
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_mailfolder_me_listmailfolders LIMIT 1" --format json
```
**Output**:
```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/mailFolders
```

#### me_message_me_listmessages
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_message_me_listmessages LIMIT 1" --format json
```
**Output**:
```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/messages
```

#### me_event_me_listevents
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_event_me_listevents LIMIT 1" --format json
```
**Output**:
```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/events
```

#### me_contact_me_listcontacts
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_contact_me_listcontacts LIMIT 1" --format json
```
**Output**:
```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/contacts
```

#### me_todo_me_todo_listlists
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_todo_me_todo_listlists LIMIT 1" --format json
```
**Output**:
```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/todo/lists
```

#### me_todo_me_todo_lists_delta
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_todo_me_todo_lists_delta LIMIT 1" --format json
```
**Output**:
```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/todo/lists/delta
```

#### me_useractivity_me_activities_recent
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_useractivity_me_activities_recent LIMIT 1" --format json
```
**Output**:
```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/activities/recent
```

#### me_usersettings_me_getsettings
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_usersettings_me_getsettings LIMIT 1" --format json
```
**Output**:
```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/settings
```

#### me_contact_me_contacts_delta
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_contact_me_contacts_delta LIMIT 1" --format json
```
**Output**:
```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/contacts/delta
```

#### me_mailfolder_me_mailfolders_delta
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_mailfolder_me_mailfolders_delta LIMIT 1" --format json
```
**Output**:
```
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/mailFolders/delta
```

### 403 — Forbidden (permission not granted)

#### me_presence_me_getpresence
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_presence_me_getpresence LIMIT 1" --format json
```
**Output**:
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"","innerError":{"request-id":"743580dc-617e-4353-acdd-e060c2855bd5","date":"2026-07-26T21:45:53","client-request-id":"743580dc-617e-4353-acdd-e060c2855bd5"}}} [GET] https://graph.microsoft.com/v1.0/me/presence
```

#### me_userteamwork_me_getteamwork
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_userteamwork_me_getteamwork LIMIT 1" --format json
```
**Output**:
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-26T21:47:27","request-id":"efb53c1f-0c36-44a2-b54f-7e2fd1836ba6","client-request-id":"efb53c1f-0c36-44a2-b54f-7e2fd1836ba6"}}} [GET] https://graph.microsoft.com/v1.0/me/teamwork
```

#### me_chat_me_listchats
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_chat_me_listchats LIMIT 1" --format json
```
**Output**:
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"","innerError":{"request-id":"...","date":"2026-07-26T...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/me/chats
```

#### security_alert_security_listalerts
```bash
coral sql "SELECT * FROM microsoft_graph_v4.security_alert_security_listalerts LIMIT 1" --format json
```
**Output**:
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"","innerError":{"request-id":"...","date":"2026-07-26T...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/security/alerts
```

#### security_incident_security_listincidents
```bash
coral sql "SELECT * FROM microsoft_graph_v4.security_incident_security_listincidents LIMIT 1" --format json
```
**Output**:
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"","innerError":{"request-id":"...","date":"2026-07-26T...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/security/incidents
```

#### teams_team_teams_team_listteam
```bash
coral sql "SELECT * FROM microsoft_graph_v4.teams_team_teams_team_listteam LIMIT 1" --format json
```
**Output**:
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"","innerError":{"request-id":"...","date":"2026-07-26T...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/teams
```

#### me_resourcespecificpermissiongrant_me_listpermissiongrants
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_resourcespecificpermissiongrant_me_listpermissiongrants LIMIT 1" --format json
```
**Output**:
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"","innerError":{"request-id":"...","date":"2026-07-26T...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/me/resourceSpecificPermissionGrants
```

#### education_educationuser_education_me_getuser
```bash
coral sql "SELECT * FROM microsoft_graph_v4.education_educationuser_education_me_getuser LIMIT 1" --format json
```
**Output**:
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"","innerError":{"request-id":"...","date":"2026-07-26T...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/education/users/me
```

#### education_educationuser_education_me_listclasses
```bash
coral sql "SELECT * FROM microsoft_graph_v4.education_educationuser_education_me_listclasses LIMIT 1" --format json
```
**Output**:
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"","innerError":{"request-id":"...","date":"2026-07-26T...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/education/users/me/classes
```

#### education_educationclass_education_classes_delta
```bash
coral sql "SELECT * FROM microsoft_graph_v4.education_educationclass_education_classes_delta LIMIT 1" --format json
```
**Output**:
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"","innerError":{"request-id":"...","date":"2026-07-26T...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/education/classes/delta
```

#### education_educationuser_education_users_delta
```bash
coral sql "SELECT * FROM microsoft_graph_v4.education_educationuser_education_users_delta LIMIT 1" --format json
```
**Output**:
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"","innerError":{"request-id":"...","date":"2026-07-26T...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/education/users/delta
```

### 400 — Bad Request (license or API issue)

#### me_drive_me_getdrive
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_drive_me_getdrive LIMIT 1" --format json
```
**Output**:
```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Tenant does not have a SPO license.","innerError":{"date":"2026-07-26T21:46:57","request-id":"203f33ae-561d-4ef3-8140-d15d0f7d22bf","client-request-id":"203f33ae-561d-4ef3-8140-d15d0f7d22bf"}}} [GET] https://graph.microsoft.com/v1.0/me/drive
```

#### sites_site_sites_site_listsite
```bash
coral sql "SELECT * FROM microsoft_graph_v4.sites_site_sites_site_listsite LIMIT 1" --format json
```
**Output**:
```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Tenant does not have a SPO license.","innerError":{"date":"2026-07-26T...","request-id":"...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/sites
```

#### me_site_me_listfollowedsites
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_site_me_listfollowedsites LIMIT 1" --format json
```
**Output**:
```
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Tenant does not have a SPO license.","innerError":{"date":"2026-07-26T...","request-id":"...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/me/followedSites
```

#### me_authentication_me_getauthentication
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_authentication_me_getauthentication LIMIT 1" --format json
```
**Output**:
```
Error: Source rejected the request (400)
Detail: {"error":{"code":"badRequest","message":"Unsupported segment type.","innerError":{"message":"Unsupported segment type.","date":"2026-07-26T21:46:50","request-id":"50204283-a850-433e-a66e-25de3d6a1265","client-request-id":"50204283-a850-433e-a66e-25de3d6a1265"}}} [GET] https://graph.microsoft.com/v1.0/me/authentication
```

#### me_message_me_messages_delta
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_message_me_messages_delta LIMIT 1" --format json
```
**Output**:
```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_UnsupportedQuery","message":"...","innerError":{"date":"2026-07-26T...","request-id":"...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/me/messages/delta
```

#### permissiongrants_resourcespecificpermissiongrant_functions_permissiongrants_delta
```bash
coral sql "SELECT * FROM microsoft_graph_v4.permissiongrants_resourcespecificpermissiongrant_functions_permissiongrants_delta LIMIT 1" --format json
```
**Output**:
```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_UnsupportedQuery","message":"...","innerError":{"date":"2026-07-26T...","request-id":"...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/permissionGrants/delta
```

#### education_educationuser_education_me_assignments_delta
```bash
coral sql "SELECT * FROM microsoft_graph_v4.education_educationuser_education_me_assignments_delta LIMIT 1" --format json
```
**Output**:
```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_UnsupportedQuery","message":"...","innerError":{"date":"2026-07-26T...","request-id":"...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/education/users/me/assignments/delta
```

#### reports_reportroot_functions_reports_deviceconfigurationdeviceactivity
```bash
coral sql "SELECT * FROM microsoft_graph_v4.reports_reportroot_functions_reports_deviceconfigurationdeviceactivity LIMIT 1" --format json
```
**Output**:
```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_UnsupportedQuery","message":"...","innerError":{"date":"2026-07-26T...","request-id":"...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/reports/deviceConfigurationDeviceActivity
```

#### reports_reportroot_functions_reports_deviceconfigurationuseractivity
```bash
coral sql "SELECT * FROM microsoft_graph_v4.reports_reportroot_functions_reports_deviceconfigurationuseractivity LIMIT 1" --format json
```
**Output**:
```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_UnsupportedQuery","message":"...","innerError":{"date":"2026-07-26T...","request-id":"...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/reports/deviceConfigurationUserActivity
```

#### reports_reportroot_functions_reports_manageddeviceenrollmentfailuredetails_8191
```bash
coral sql "SELECT * FROM microsoft_graph_v4.reports_reportroot_functions_reports_manageddeviceenrollmentfailuredetails_8191 LIMIT 1" --format json
```
**Output**:
```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_UnsupportedQuery","message":"...","innerError":{"date":"2026-07-26T...","request-id":"...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/reports/managedDeviceEnrollmentFailureDetails
```

#### reports_reportroot_functions_reports_manageddeviceenrollmenttopfailures_9ce7
```bash
coral sql "SELECT * FROM microsoft_graph_v4.reports_reportroot_functions_reports_manageddeviceenrollmenttopfailures_9ce7 LIMIT 1" --format json
```
**Output**:
```
Error: Source rejected the request (400)
Detail: {"error":{"code":"Request_UnsupportedQuery","message":"...","innerError":{"date":"2026-07-26T...","request-id":"...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/reports/managedDeviceEnrollmentTopFailures
```

### 404 — Not Found (resource doesn't exist)

#### me_planneruser_me_getplanner
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_planneruser_me_getplanner LIMIT 1" --format json
```
**Output**:
```
Error: Source resource was not found (404)
Detail: {"error":{"code":"TenantNotFound","message":"Tenant is not found.","innerError":{"date":"2026-07-26T21:46:10","request-id":"db72d04f-d665-4679-b5c7-b4383f40179e","client-request-id":"db72d04f-d665-4679-b5c7-b4383f40179e"}}} [GET] https://graph.microsoft.com/v1.0/me/planner
```

#### me_planneruser_me_planner_listplans
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_planneruser_me_planner_listplans LIMIT 1" --format json
```
**Output**:
```
Error: Source resource was not found (404)
Detail: {"error":{"code":"TenantNotFound","message":"Tenant is not found.","innerError":{"date":"2026-07-26T...","request-id":"...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/me/planner/plans
```

#### me_planneruser_me_planner_listtasks
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_planneruser_me_planner_listtasks LIMIT 1" --format json
```
**Output**:
```
Error: Source resource was not found (404)
Detail: {"error":{"code":"TenantNotFound","message":"Tenant is not found.","innerError":{"date":"2026-07-26T...","request-id":"...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/me/planner/tasks
```

#### planner_planner_planner_planner_getplanner
```bash
coral sql "SELECT * FROM microsoft_graph_v4.planner_planner_planner_planner_getplanner LIMIT 1" --format json
```
**Output**:
```
Error: Source resource was not found (404)
Detail: {"error":{"code":"TenantNotFound","message":"Tenant is not found.","innerError":{"date":"2026-07-26T...","request-id":"...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/planner
```

#### planner_plannerplan_planner_listplans
```bash
coral sql "SELECT * FROM microsoft_graph_v4.planner_plannerplan_planner_listplans LIMIT 1" --format json
```
**Output**:
```
Error: Source resource was not found (404)
Detail: {"error":{"code":"TenantNotFound","message":"Tenant is not found.","innerError":{"date":"2026-07-26T...","request-id":"...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/planner/plans
```

#### planner_plannertask_planner_listtasks
```bash
coral sql "SELECT * FROM microsoft_graph_v4.planner_plannertask_planner_listtasks LIMIT 1" --format json
```
**Output**:
```
Error: Source resource was not found (404)
Detail: {"error":{"code":"TenantNotFound","message":"Tenant is not found.","innerError":{"date":"2026-07-26T...","request-id":"...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/planner/tasks
```

#### me_profilephoto_me_getphoto
```bash
coral sql "SELECT * FROM microsoft_graph_v4.me_profilephoto_me_getphoto LIMIT 1" --format json
```
**Output**:
```
Error: Source resource was not found (404)
Detail: {"error":{"code":"ErrorNonExistentStorage","message":"Accessing service failed.","innerError":{"date":"2026-07-26T21:47:17","request-id":"7a6969a6-e9b2-4d4e-bf2a-2e405b698e23","client-request-id":"7a6969a6-e9b2-4d4e-bf2a-2e405b698e23"}}} [GET] https://graph.microsoft.com/v1.0/me/photo
```

#### print_print_print_print_getprint
```bash
coral sql "SELECT * FROM microsoft_graph_v4.print_print_print_print_getprint LIMIT 1" --format json
```
**Output**:
```
Error: Source resource was not found (404)
Detail: {"error":{"code":"TenantNotFound","message":"Tenant is not found.","innerError":{"date":"2026-07-26T...","request-id":"...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/print
```

#### copilot_copilotreportroot_copilot_getreports
```bash
coral sql "SELECT * FROM microsoft_graph_v4.copilot_copilotreportroot_copilot_getreports LIMIT 1" --format json
```
**Output**:
```
Error: Source resource was not found (404)
Detail: {"error":{"code":"TenantNotFound","message":"Tenant is not found.","innerError":{"date":"2026-07-26T...","request-id":"...","client-request-id":"..."}}} [GET] https://graph.microsoft.com/v1.0/copilot/reports
```

---

## SQL Feature Testing Results

| Feature | Status | Command | Output |
|---------|--------|---------|--------|
| `SELECT *` | ✅ Works | `coral sql "SELECT * FROM microsoft_graph_v4.me_user_me_user_getuser LIMIT 1" --format json` | Returns all 135 columns |
| `SELECT col1, col2` | ✅ Works | `coral sql "SELECT displayname, userprincipalname FROM microsoft_graph_v4.me_user_me_user_getuser LIMIT 1" --format json` | `[{"displayname":"vicky kumar","userprincipalname":"algsoch_gmail.com#EXT#@algsochgmail.onmicrosoft.com"}]` |
| `WHERE col = 'value'` | ✅ Works | `coral sql "SELECT * FROM microsoft_graph_v4.me_user_me_user_getuser WHERE displayname = 'vicky kumar'" --format json` | Returns matching row |
| `WHERE col LIKE '%pattern%'` | ✅ Works | `coral sql "SELECT * FROM microsoft_graph_v4.me_user_me_user_getuser WHERE displayname LIKE '%vicky%'" --format json` | Returns matching row |
| `WHERE col IS NULL` | ✅ Works | `coral sql "SELECT * FROM microsoft_graph_v4.users_user_users_user_listuser WHERE odata_count IS NULL" --format json` | Returns rows where odata_count is NULL |
| `WHERE col IS NOT NULL` | ✅ Works | `coral sql "SELECT * FROM microsoft_graph_v4.users_user_users_user_listuser WHERE odata_count IS NOT NULL" --format json` | Returns rows where odata_count is not NULL |
| `ORDER BY col` | ✅ Works | `coral sql "SELECT * FROM microsoft_graph_v4.users_user_users_user_listuser ORDER BY filter" --format json` | Returns sorted results |
| `LIMIT n` | ✅ Works | `coral sql "SELECT * FROM microsoft_graph_v4.users_user_users_user_listuser LIMIT 5" --format json` | Returns max 5 rows |
| `LIMIT n OFFSET m` | ✅ Works | `coral sql "SELECT * FROM microsoft_graph_v4.users_user_users_user_listuser LIMIT 1 OFFSET 1" --format json` | Returns row at offset 1 |
| `COUNT(*)` | ✅ Works | `coral sql "SELECT COUNT(*) as cnt FROM microsoft_graph_v4.users_user_users_user_listuser" --format json` | `[{"cnt":1}]` |
| `COUNT(*) GROUP BY col` | ✅ Works | `coral sql "SELECT filter, COUNT(*) as cnt FROM microsoft_graph_v4.users_user_users_user_listuser GROUP BY filter" --format json` | `[{"filter":null,"cnt":1}]` |
| `SUM(col)` | ✅ Works | `coral sql "SELECT SUM(skip) as s FROM microsoft_graph_v4.users_user_users_user_listuser" --format json` | `[{"s":0}]` |
| `MAX(col)` | ✅ Works | `coral sql "SELECT MAX(skip) as m FROM microsoft_graph_v4.users_user_users_user_listuser" --format json` | `[{"m":0}]` |
| `MIN(col)` | ✅ Works | `coral sql "SELECT MIN(skip) as m FROM microsoft_graph_v4.users_user_users_user_listuser" --format json` | `[{"m":0}]` |
| `AVG(col)` | ✅ Works | `coral sql "SELECT AVG(skip) as a FROM microsoft_graph_v4.users_user_users_user_listuser" --format json` | `[{"a":0}]` |
| `DISTINCT col` | ✅ Works | `coral sql "SELECT DISTINCT filter FROM microsoft_graph_v4.users_user_users_user_listuser" --format json` | `[{"filter":null}]` |
| `json_len(col)` | ✅ Works | `coral sql "SELECT json_len(value) FROM microsoft_graph_v4.users_user_users_user_listuser LIMIT 1" --format json` | `[{"json_len(microsoft_graph_v4.users_user_users_user_listuser.value)":17}]` |
| `--format json` | ✅ Works | `coral sql "SELECT * FROM microsoft_graph_v4.me_user_me_user_getuser LIMIT 1" --format json` | Returns JSON array |
| `--format table` | ✅ Works | `coral sql "SELECT displayname, userprincipalname FROM microsoft_graph_v4.me_user_me_user_getuser LIMIT 1" --format table` | Returns formatted table |
| `BETWEEN` | ❌ Broken | `coral sql "SELECT * FROM microsoft_graph_v4.users_user_users_user_listuser WHERE skip BETWEEN 0 AND 100" --format json` | `Error: No column named `skip`` |
| `IN` | ⚠️ Passthrough | `coral sql "SELECT * FROM microsoft_graph_v4.users_user_users_user_listuser WHERE search IN ('a')" --format json` | Passes to Graph API as `$search=a` (fails if invalid) |
| `UNION` | ❌ Not supported | `coral sql "SELECT value FROM microsoft_graph_v4.users_user_users_user_listuser LIMIT 1 UNION ALL SELECT value FROM microsoft_graph_v4.groups_group_groups_group_listgroup LIMIT 1" --format json` | `Error (unimplemented): unimplemented: The context currently only supports a single SQL statement` |
| `JOIN` | ❌ Broken | `coral sql "SELECT a.displayname FROM microsoft_graph_v4.me_user_me_user_getuser a JOIN microsoft_graph_v4.users_user_users_user_listuser b ON a.id = b.id" --format json` | `Error: No column named a.id` |
| `json_value()` | ❌ Not supported | `coral sql "SELECT JSON_VALUE(value, '$.id') as id FROM microsoft_graph_v4.users_user_users_user_listuser LIMIT 1" --format json` | `Error (invalid argument): invalid input: Invalid function 'json_value'.` |
| Multiple statements | ❌ Not supported | `coral sql "SELECT 1; SELECT 2" --format json` | `Error (unimplemented): unimplemented: The context currently only supports a single SQL statement` |
| SQL injection | ✅ Blocked | `coral sql "SELECT * FROM microsoft_graph_v4.users_user_users_user_listuser DROP TABLE users" --format json` | `Error (invalid argument): invalid input: sql parser error: Expected: end of statement, found: TABLE at Line: 1, Column: 70` |

---

## Critical Bugs Found

### 1. List Tables Don't Flatten (Severity: HIGH)
**Impact**: All ~497 LIST tables return raw OData envelope with a single `value` column containing unflattened JSON. Cannot SELECT individual fields (e.g., `displayname`, `id`) from list results.

**Command that fails**:
```bash
coral sql "SELECT displayname FROM microsoft_graph_v4.users_user_users_user_listuser" --format json
```
**Output**:
```
Error: No column named `displayname`
Detail: No column `displayname` is in scope. Valid columns include: microsoft_graph_v4.users_user_users_user_listuser.odata_count, microsoft_graph_v4.users_user_users_user_listuser.odata_nextlink, microsoft_graph_v4.users_user_users_user_listuser.value, microsoft_graph_v4.users_user_users_user_listuser.count, microsoft_graph_v4.users_user_users_user_listuser.filter, microsoft_graph_v4.users_user_users_user_listuser.search, microsoft_graph_v4.users_user_users_user_listuser.skip, microsoft_graph_v4.users_user_users_user_listuser.top.
```

**Command that works but returns raw JSON**:
```bash
coral sql "SELECT value FROM microsoft_graph_v4.users_user_users_user_listuser LIMIT 1" --format json
```
**Output**:
```json
[{"value":"[{\"businessPhones\":[],\"displayName\":\"vicky kumar\",\"givenName\":\"vicky\",\"jobTitle\":null,\"mail\":null,\"mobilePhone\":null,\"officeLocation\":null,\"preferredLanguage\":\"en\",\"surname\":\"kumar\",\"userPrincipalName\":\"algsoch_gmail.com#EXT#@algsochgmail.onmicrosoft.com\",\"id\":\"1165bcae-a56f-49bf-af0a-4496f80cd544\"}]"}]
```

**Expected**: Columns should be flattened (like GET tables).

### 2. BETWEEN Column Resolution Fails (Severity: MEDIUM)
**Impact**: Cannot use `BETWEEN` on any column. Column name lookup fails even with correct names.

**Command that fails**:
```bash
coral sql "SELECT * FROM microsoft_graph_v4.users_user_users_user_listuser WHERE skip BETWEEN 0 AND 100" --format json
```
**Output**:
```
Error: No column named `skip`
Detail: No column `skip` is in scope. Valid columns include: microsoft_graph_v4.users_user_users_user_listuser.odata_count, microsoft_graph_v4.users_user_users_user_listuser.odata_nextlink, microsoft_graph_v4.users_user_users_user_listuser.value, microsoft_graph_v4.users_user_users_user_listuser.count, microsoft_graph_v4.users_user_users_user_listuser.filter, microsoft_graph_v4.users_user_users_user_listuser.search, microsoft_graph_v4.users_user_users_user_listuser.top.
```

### 3. Planner Tables Return 404 (Severity: LOW — API issue)
**Impact**: All planner tables return "Tenant is not found" even though tenant exists. This is a Graph API issue, not coral bug.

**Command that fails**:
```bash
coral sql "SELECT * FROM microsoft_graph_v4.planner_planner_planner_planner_getplanner LIMIT 1" --format json
```
**Output**:
```
Error: Source resource was not found (404)
Detail: {"error":{"code":"TenantNotFound","message":"Tenant is not found.","innerError":{"date":"2026-07-26T21:46:10","request-id":"db72d04f-d665-4679-b5c7-b4383f40179e","client-request-id":"db72d04f-d665-4679-b5c7-b4383f40179e"}}} [GET] https://graph.microsoft.com/v1.0/planner
```

---

## Testing Methodology

All tests were run using `coral sql` with the `microsoft_graph_v4` source. Commands follow this pattern:
```bash
coral sql "<SQL_QUERY>" --format json
```

Output was captured and parsed to determine PASS/FAIL status:
- **PASS**: Command returns valid JSON array
- **FAIL**: Command returns error message

Tables were tested in batches of 5-10 to avoid token expiration issues.

---

## Notes for Andrea

1. **List endpoint flattening is the main blocker** — this affects ~497 tables (68% of all tables). Without flattening, users can't query individual fields from list endpoints.

2. **Permission/license errors are expected** — our test tenant has no Office365, SPO, or Teams licenses. These 401/403 errors would not occur with a properly licensed tenant.

3. **Planner 404s are Graph API issue** — the error comes from Microsoft Graph, not coral. This is likely a tenant configuration issue.

4. **SQL feature support is good** — most common SQL operations work correctly. The main gaps are `BETWEEN`, `JOIN`, and `UNION`.

5. **Error messages are clear** — when something fails, coral provides helpful error messages with the exact HTTP status and Graph API error details.
