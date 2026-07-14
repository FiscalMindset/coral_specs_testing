# Coral `microsoft_graph_v4` — Full Command & Output Log

Every command run verbatim with its actual output (outputs over ~1800 chars truncated, marked `[...truncated]`).
Environment: coral 0.5.2+cf744bd (built from main), macOS, own Entra test tenant (delegated OAuth, admin-consented, **no M365 license** — so file/SharePoint/Teams data calls show the license-error behavior).


## 1. CLI basics

```
$ coral --version
coral 0.5.2+cf744bd

(exit code: 0)
```

```
$ coral source list
Source                     Version  Origin    Secrets
-------------------------  -------  --------  ----------------
agentmail                  0.1.0    imported  keychain
assemblyai                 0.1.0    imported  keychain
azure                      0.1.0    imported  keychain
blogger                    0.2.0    imported  file (plaintext)
careops_appointments       0.1.0    imported  none
careops_doctor_chats       0.1.0    imported  none
careops_family_notes       0.1.0    imported  none
careops_lab_reports        0.1.0    imported  none
careops_medications        0.1.0    imported  none
careops_patients           0.1.0    imported  none
careops_pharmacy_receipts  0.1.0    imported  none
careops_prescription_ocr   0.1.0    imported  none
careops_symptom_logs       0.1.0    imported  none
claude                     0.1.0    bundled   none
cloudinary                 0.1.0    imported  file (plaintext)
deepgram                   0.2.0    imported  file (plaintext)
elevenlabs                 0.1.0    imported  file (plaintext)
exa                        0.1.0    imported  keychain
firecrawl                  0.1.0    imported  keychain
github                     1.1.8    bundled   file (plaintext)
google_cloud_vision        0.1.0    imported  file (plaintext)
google_sheets              0.1.0    imported  none
groq_ai                    0.1.0    imported  file (plaintext)
kairon_live                0.1.0    imported  none
microsoft_graph_v4         -        imported  keychain
notion                     0.1.0    imported  keychain
ollama                     0.1.0    imported  none
pdf                        0.1.0    imported  none
rclone                     0.1.0    imported  none
render                     0.1.0    imported  keychain
serper                     0.1.0    i
[...truncated]

(exit code: 0)
```

```
$ coral source info microsoft_graph_v4
microsoft_graph_v4
  Status:      installed
  Origin:      imported
  Secrets:     keychain
  Description: Preview Microsoft Graph source generated from the full v1.0 Microsoft Graph OpenAPI description. Uses delegated Microsoft OAuth for work/school accounts.

  Inputs
    MS_GRAPH_TENANT_ID (variable, optional)
      default: organizations
    MS_GRAPH_ACCESS_TOKEN (secret, required)

(exit code: 0)
```

```
$ coral source test microsoft_graph_v4

  ✓ microsoft_graph_v4 connected successfully
  Secrets: keychain

    microsoft_graph_v4 (732 tables)
    ├─ admin_admin_admin_admin_getadmin
    ├─ admin_adminmicrosoft365apps_admin_getmicrosoft365apps
    ├─ admin_adminmicrosoft365apps_admin_microsoft365apps_getinstallationoptions
    ├─ admin_adminreportsettings_admin_getreportsettings
    ├─ admin_configurationmanagement_admin_configurationmanagement_listconfigurationdrifts
    ├─ admin_configurationmanagement_admin_configurationmanagement_listconfigurationmonitoringresults
    ├─ admin_configurationmanagement_admin_configurationmanagement_listconfigurationmonitors
    ├─ admin_configurationmanagement_admin_configurationmanagement_listconfigurationsnapshotjobs
    ├─ admin_configurationmanagement_admin_configurationmanagement_listconfigurationsnapshots
    ├─ admin_configurationmanagement_admin_getconfigurationmanagement
    ├─ admin_edge_admin_edge_getinternetexplorermode
    ├─ admin_edge_admin_edge_internetexplorermode_listsitelists
    ├─ admin_edge_admin_getedge
    ├─ admin_exchangeadmin_admin_exchange_gettracing
    ├─ admin_exchangeadmin_admin_exchange_listmailboxes
    ├─ admin_exchangeadmin_admin_exchange_tracing_listmessagetraces
    ├─ admin_exchangeadmin_admin_getexchange
    ├─ admin_peopleadminsettings_admin_getpeople
    ├─ admin_peopleadminsettings_admin_people_getiteminsights
    ├─ admin_peopleadminsettings_admin_people_getpronouns
    ├─ admin_peopleadminsettings_admin_people_listprofilecardproperties
    ├─ admin_peopleadminsettings_admin_people_listprofilepropertysettings
    ├─ admin_peopleadminsettings_admin_people_listprofilesources
    ├─ admin_serviceannouncement_admin_getserviceannouncement
[...truncated]

(exit code: 0)
```

```
$ coral source lint ~/Downloads/coral-repo/sources/core-v4/microsoft_graph_v4/manifest.yaml
Manifest is valid

(exit code: 0)
```

## 2. Catalog discovery (coral search)

```
$ coral search 'sharepoint files'
Results
1. [catalog_metadata] table function rclone.files
   SQL reference: rclone.files
   Call: rclone.files(fs => '<value>', path => '<value>')
   matched: description, qualified_name, surface_name, title
2. [catalog_metadata] table github.files
   SQL: github.files
   matched: description, qualified_name, surface_name, title
   columns: additions (Int64), blob_url (Utf8), changes (Int64), contents_url (Utf8), deletions (Int64), +9 more
3. [catalog_metadata] table function microsoft_graph_v4.storage_filestorage_storage_filestorage_containers_sharepointgroups_getmembers
   SQL reference: microsoft_graph_v4.storage_filestorage_storage_filestorage_containers_sharepointgroups_getmembers
   Call: microsoft_graph_v4.storage_filestorage_storage_filestorage_containers_sharepointgroups_getmembers(filestoragecontainer_id => '<value>', sharepointgroup_id => '<value>', sharepointgroupmember_id => '<value>')
   matched: description, qualified_name, searchable_text, surface_name, title
4. [catalog_metadata] table function microsoft_graph_v4.storage_filestorage_storage_filestorage_containers_sharepointgroups_listmembers
   SQL reference: microsoft_graph_v4.storage_filestorage_storage_filestorage_containers_sharepointgroups_listmembers
   Call: microsoft_graph_v4.storage_filestorage_storage_filestorage_containers_sharepointgroups_listmembers(filestoragecontainer_id => '<value>', sharepointgroup_id => '<value>')
   matched: description, qualified_name, searchable_text, surface_name, title
5. [catalog_metadata] table function microsoft_graph_v4.storage_filestorage_storage_filestorage_deletedcontainers_sharepointgroups_getmembers
   SQL reference: microsoft_graph_v4.storage_filestorage_storage_filestorage_deletedcontainers_sharepointgroups_getmembers
   Call: microsoft_graph_v4.storage
[...truncated]

(exit code: 0)
```

```
$ coral search 'teams chat messages'
Results
1. [catalog_metadata] table function microsoft_graph_v4.chats_chatmessage_chats_messages_replies_gethostedcontents
   SQL reference: microsoft_graph_v4.chats_chatmessage_chats_messages_replies_gethostedcontents
   Call: microsoft_graph_v4.chats_chatmessage_chats_messages_replies_gethostedcontents(chat_id => '<value>', chatmessage_id => '<value>', chatmessage_id1 => '<value>', chatmessagehostedcontent_id => '<value>')
   matched: description, qualified_name, surface_name, title
2. [catalog_metadata] table function microsoft_graph_v4.chats_chatmessage_chats_messages_replies_listhostedcontents
   SQL reference: microsoft_graph_v4.chats_chatmessage_chats_messages_replies_listhostedcontents
   Call: microsoft_graph_v4.chats_chatmessage_chats_messages_replies_listhostedcontents(chat_id => '<value>', chatmessage_id => '<value>', chatmessage_id1 => '<value>')
   matched: description, qualified_name, surface_name, title
3. [catalog_metadata] table function microsoft_graph_v4.chats_chatmessage_chats_chat_messages_chatmessage_replies_delta
   SQL reference: microsoft_graph_v4.chats_chatmessage_chats_chat_messages_chatmessage_replies_delta
   Call: microsoft_graph_v4.chats_chatmessage_chats_chat_messages_chatmessage_replies_delta(chat_id => '<value>', chatmessage_id => '<value>')
   matched: description, qualified_name, surface_name, title
4. [catalog_metadata] table function microsoft_graph_v4.chats_chatmessage_chats_chat_messages_delta
   SQL reference: microsoft_graph_v4.chats_chatmessage_chats_chat_messages_delta
   Call: microsoft_graph_v4.chats_chatmessage_chats_chat_messages_delta(chat_id => '<value>')
   matched: description, qualified_name, surface_name, title
5. [catalog_metadata] table microsoft_graph_v4.chats_chat_functions_chats_getallmessages
   SQL: microsoft
[...truncated]

(exit code: 0)
```

```
$ coral search 'onedrive'
Results
1. [catalog_metadata] table function microsoft_graph_v4.solutions_backuprestoreroot_solutions_backuprestore_onedriveforbusinessprotectionpolicies_getdriveprotectionunits
   SQL reference: microsoft_graph_v4.solutions_backuprestoreroot_solutions_backuprestore_onedriveforbusinessprotectionpolicies_getdriveprotectionunits
   Call: microsoft_graph_v4.solutions_backuprestoreroot_solutions_backuprestore_onedriveforbusinessprotectionpolicies_getdriveprotectionunits(driveprotectionunit_id => '<value>', onedriveforbusinessprotectionpolicy_id => '<value>')
   matched: description, qualified_name, searchable_text, surface_name, title
2. [catalog_metadata] table function microsoft_graph_v4.solutions_backuprestoreroot_solutions_backuprestore_onedriveforbusinessprotectionpolicies_listdriveprotectionunits
   SQL reference: microsoft_graph_v4.solutions_backuprestoreroot_solutions_backuprestore_onedriveforbusinessprotectionpolicies_listdriveprotectionunits
   Call: microsoft_graph_v4.solutions_backuprestoreroot_solutions_backuprestore_onedriveforbusinessprotectionpolicies_listdriveprotectionunits(onedriveforbusinessprotectionpolicy_id => '<value>')
   matched: description, qualified_name, searchable_text, surface_name, title
3. [catalog_metadata] table function microsoft_graph_v4.solutions_backuprestoreroot_solutions_backuprestore_onedriveforbusinessrestoresessions_getdriverestoreartifacts
   SQL reference: microsoft_graph_v4.solutions_backuprestoreroot_solutions_backuprestore_onedriveforbusinessrestoresessions_getdriverestoreartifacts
   Call: microsoft_graph_v4.solutions_backuprestoreroot_solutions_backuprestore_onedriveforbusinessrestoresessions_getdriverestoreartifacts(driverestoreartifact_id => '<value>', onedriveforbusinessrestoresession_id => '<value>')
   matched: descri
[...truncated]

(exit code: 0)
```

```
$ coral search 'my user profile'
Results
1. [catalog_metadata] table github.profile
   SQL: github.profile
   matched: description, qualified_name, surface_name, title
   columns: content_reports_enabled (Boolean), description (Utf8), documentation (Utf8), files (Utf8), files__code_of_conduct (Utf8), +30 more
2. [catalog_metadata] table github.user
   SQL: github.user
   matched: description, qualified_name, surface_name, title
   columns: account_id (Int64), avatar_url (Utf8), bio (Utf8), blog (Utf8), business_plus (Boolean), +43 more
3. [catalog_metadata] table_column github.user_installations.permissions__profile
   Surface: table github.user_installations
   Type: Utf8
   matched: description, field_name, qualified_name, searchable_text, surface_name, title
4. [catalog_metadata] table function microsoft_graph_v4.users_profilephoto_users_getphoto
   SQL reference: microsoft_graph_v4.users_profilephoto_users_getphoto
   Call: microsoft_graph_v4.users_profilephoto_users_getphoto(user_id => '<value>')
   matched: description, qualified_name, searchable_text, surface_name, title
5. [catalog_metadata] table function microsoft_graph_v4.users_profilephoto_users_getphotos
   SQL reference: microsoft_graph_v4.users_profilephoto_users_getphotos
   Call: microsoft_graph_v4.users_profilephoto_users_getphotos(profilephoto_id => '<value>', user_id => '<value>')
   matched: description, qualified_name, searchable_text, surface_name, title
6. [catalog_metadata] table function microsoft_graph_v4.users_profilephoto_users_listphotos
   SQL reference: microsoft_graph_v4.users_profilephoto_users_listphotos
   Call: microsoft_graph_v4.users_profilephoto_users_listphotos(user_id => '<value>')
   matched: description, qualified_name, searchable_text, surface_name, title
7. [catalog_metadata] table_column github.approvals.u
[...truncated]

(exit code: 0)
```

```
$ coral search 'drive items'
Results
1. [catalog_metadata] table function microsoft_graph_v4.drives_driveitem_drives_drive_items_driveitem_search
   SQL reference: microsoft_graph_v4.drives_driveitem_drives_drive_items_driveitem_search
   Call: microsoft_graph_v4.drives_driveitem_drives_drive_items_driveitem_search(drive_id => '<value>', driveitem_id => '<value>', q => '<value>')
   matched: description, qualified_name, searchable_text, surface_name, title
2. [catalog_metadata] table function microsoft_graph_v4.drives_driveitem_drives_drive_items_driveitem_delta_9846
   SQL reference: microsoft_graph_v4.drives_driveitem_drives_drive_items_driveitem_delta_9846
   Call: microsoft_graph_v4.drives_driveitem_drives_drive_items_driveitem_delta_9846(drive_id => '<value>', driveitem_id => '<value>', token => '<value>')
   matched: qualified_name, searchable_text, surface_name, title
3. [catalog_metadata] table function microsoft_graph_v4.drives_driveitem_drives_drive_items_driveitem_workbook_tables_count
   SQL reference: microsoft_graph_v4.drives_driveitem_drives_drive_items_driveitem_workbook_tables_count
   Call: microsoft_graph_v4.drives_driveitem_drives_drive_items_driveitem_workbook_tables_count(drive_id => '<value>', driveitem_id => '<value>')
   matched: qualified_name, searchable_text, surface_name, title
4. [catalog_metadata] table_column microsoft_graph_v4.me_drive_me_getdrive.items
   Surface: table microsoft_graph_v4.me_drive_me_getdrive
   Type: Json
   matched: description, field_name, qualified_name, searchable_text, surface_name, title
5. [catalog_metadata] table_function_result_column microsoft_graph_v4.drives_drive_drives_drive_getdrive.items
   Surface: table_function microsoft_graph_v4.drives_drive_drives_drive_getdrive
   Type: Json
   matched: description, field_name, qualified_name,
[...truncated]

(exit code: 0)
```

## 3. Catalog SQL (coral.* metadata tables)

```
$ coral sql "SELECT count(*) AS tables FROM coral.tables WHERE schema_name='microsoft_graph_v4'"
+--------+
| tables |
+--------+
| 732    |
+--------+

(exit code: 0)
```

```
$ coral sql "SELECT count(*) AS columns FROM coral.columns WHERE schema_name='microsoft_graph_v4'"
+---------+
| columns |
+---------+
| 6005    |
+---------+

(exit code: 0)
```

```
$ coral sql "SELECT count(*) AS table_functions FROM coral.table_functions WHERE schema_name='microsoft_graph_v4'"
+-----------------+
| table_functions |
+-----------------+
| 5759            |
+-----------------+

(exit code: 0)
```

```
$ coral sql "SELECT table_name FROM coral.tables WHERE schema_name='microsoft_graph_v4' ORDER BY table_name LIMIT 20"
+------------------------------------------------------------------------------------------------+
| table_name                                                                                     |
+------------------------------------------------------------------------------------------------+
| admin_admin_admin_admin_getadmin                                                               |
| admin_adminmicrosoft365apps_admin_getmicrosoft365apps                                          |
| admin_adminmicrosoft365apps_admin_microsoft365apps_getinstallationoptions                      |
| admin_adminreportsettings_admin_getreportsettings                                              |
| admin_configurationmanagement_admin_configurationmanagement_listconfigurationdrifts            |
| admin_configurationmanagement_admin_configurationmanagement_listconfigurationmonitoringresults |
| admin_configurationmanagement_admin_configurationmanagement_listconfigurationmonitors          |
| admin_configurationmanagement_admin_configurationmanagement_listconfigurationsnapshotjobs      |
| admin_configurationmanagement_admin_configurationmanagement_listconfigurationsnapshots         |
| admin_configurationmanagement_admin_getconfigurationmanagement                                 |
| admin_edge_admin_edge_getinternetexplorermode                                                  |
| admin_edge_admin_edge_internetexplorermode_listsitelists                                       |
| admin_edge_admin_getedge                                                                       |
| admin_exchangeadmin_admin_exchange_gettracing                                                  |
| admin_exchangeadmin_admin_exchange_listmailboxes                                               |
| admin_exchangead
[...truncated]

(exit code: 0)
```

```
$ coral sql "SELECT table_name FROM coral.tables WHERE schema_name='microsoft_graph_v4' AND table_name LIKE '%joinedteam%'"
+---------------------------------------+
| table_name                            |
+---------------------------------------+
| me_team_me_joinedteams_getallmessages |
| me_team_me_listjoinedteams            |
+---------------------------------------+

(exit code: 0)
```

```
$ coral sql "SELECT table_name FROM coral.tables WHERE schema_name='microsoft_graph_v4' AND table_name LIKE '%driveitem%' LIMIT 10"
+-------------------------------------------------------------------+
| table_name                                                        |
+-------------------------------------------------------------------+
| shares_shareddriveitem_shares_shareddriveitem_listshareddriveitem |
+-------------------------------------------------------------------+

(exit code: 0)
```

```
$ coral sql "SELECT * FROM coral.filters WHERE schema_name='microsoft_graph_v4' LIMIT 5"
+--------------------+-------------------------------------------------------------------------------------+-------------+-------------+-------------+-----------+---------------------------------+
| schema_name        | table_name                                                                          | filter_name | filter_mode | is_required | data_type | description                     |
+--------------------+-------------------------------------------------------------------------------------+-------------+-------------+-------------+-----------+---------------------------------+
| microsoft_graph_v4 | admin_configurationmanagement_admin_configurationmanagement_listconfigurationdrifts | count       | equality    | false       | Boolean   | Include count of items          |
| microsoft_graph_v4 | admin_configurationmanagement_admin_configurationmanagement_listconfigurationdrifts | filter      | equality    | false       | Utf8      | Filter items by property values |
| microsoft_graph_v4 | admin_configurationmanagement_admin_configurationmanagement_listconfigurationdrifts | search      | equality    | false       | Utf8      | Search items by search phrases  |
| microsoft_graph_v4 | admin_configurationmanagement_admin_configurationmanagement_listconfigurationdrifts | skip        | equality    | false       | Int64     | Skip the first n items          |
| microsoft_graph_v4 | admin_configurationmanagement_admin_configurationmanagement_listconfigurationdrifts | top         | equality    | false       | Int64     | Show only the first n items     |
+--------------------+-------------------------------------------------------------------------------------+-------------+-------------+-------------+-----------+---------------------------------+

(exit code: 0)
```

```
$ coral sql "SELECT * FROM coral.inputs WHERE schema_name='microsoft_graph_v4' LIMIT 10"
+--------------------+-----------------------+----------+---------------+---------------+--------------------------------------------------------------------------------------------------------------------------+----------+--------+
| schema_name        | key                   | kind     | value         | default_value | hint                                                                                                                     | required | is_set |
+--------------------+-----------------------+----------+---------------+---------------+--------------------------------------------------------------------------------------------------------------------------+----------+--------+
| microsoft_graph_v4 | MS_GRAPH_ACCESS_TOKEN | secret   |               |               | Microsoft Graph delegated access token. Choose Sign in with Microsoft during interactive setup.                          | true     | true   |
| microsoft_graph_v4 | MS_GRAPH_TENANT_ID    | variable | organizations | organizations | Microsoft Entra tenant authority. Use organizations for any work/school account, or a tenant GUID for a specific tenant. | false    | true   |
+--------------------+-----------------------+----------+---------------+---------------+--------------------------------------------------------------------------------------------------------------------------+----------+--------+

(exit code: 0)
```

## 4. Working queries (identity — no license needed)

```
$ coral sql "SELECT displayname, userprincipalname, mail, id FROM microsoft_graph_v4.me_user_me_user_getuser"
Error: No column named `id`
Detail: No column `id` is in scope. Valid columns include: microsoft_graph_v4.me_user_me_user_getuser.odata_type, microsoft_graph_v4.me_user_me_user_getuser.aboutme, microsoft_graph_v4.me_user_me_user_getuser.accountenabled, microsoft_graph_v4.me_user_me_user_getuser.activities, microsoft_graph_v4.me_user_me_user_getuser.adhoccalls, microsoft_graph_v4.me_user_me_user_getuser.agegroup, microsoft_graph_v4.me_user_me_user_getuser.agreementacceptances, microsoft_graph_v4.me_user_me_user_getuser.approleassignments, microsoft_graph_v4.me_user_me_user_getuser.assignedlicenses, microsoft_graph_v4.me_user_me_user_getuser.assignedplans.

(exit code: 1)
```

```
$ coral sql "SELECT displayname, jobtitle, officelocation, preferredlanguage, usertype FROM microsoft_graph_v4.me_user_me_user_getuser"
+-------------+----------+----------------+-------------------+----------+
| displayname | jobtitle | officelocation | preferredlanguage | usertype |
+-------------+----------+----------------+-------------------+----------+
| Vicky Test  |          |                |                   |          |
+-------------+----------+----------------+-------------------+----------+

(exit code: 0)
```

```
$ coral sql "SELECT 1+1 AS engine_sanity"
+---------------+
| engine_sanity |
+---------------+
| 2             |
+---------------+

(exit code: 0)
```

## 5. List tables — the OData envelope shape (key ergonomics finding)

```
$ coral sql "SELECT displayname FROM microsoft_graph_v4.users_user_users_user_listuser"
Error: No column named `displayname`
Detail: No column `displayname` is in scope. Valid columns include: microsoft_graph_v4.users_user_users_user_listuser.odata_count, microsoft_graph_v4.users_user_users_user_listuser.odata_nextlink, microsoft_graph_v4.users_user_users_user_listuser.value, microsoft_graph_v4.users_user_users_user_listuser.count, microsoft_graph_v4.users_user_users_user_listuser.filter, microsoft_graph_v4.users_user_users_user_listuser.search, microsoft_graph_v4.users_user_users_user_listuser.top.

(exit code: 1)
```

```
$ coral sql "SELECT column_name FROM coral.columns WHERE schema_name='microsoft_graph_v4' AND table_name='users_user_users_user_listuser'"
+----------------+
| column_name    |
+----------------+
| odata_count    |
| odata_nextlink |
| value          |
| count          |
| filter         |
| search         |
| top            |
+----------------+

(exit code: 0)
```

```
$ coral sql "SELECT value FROM microsoft_graph_v4.users_user_users_user_listuser"
Error: Source request was rejected (403)
Detail: {"error":{"code":"Authorization_RequestDenied","message":"Insufficient privileges to complete the operation.","innerError":{"date":"2026-07-14T00:17:15","request-id":"f59ea674-f80c-44d5-b448-1e908e2726f6","client-request-id":"f59ea674-f80c-44d5-b448-1e908e2726f6"}}} [GET] https://graph.microsoft.com/v1.0/users
Hint: Check the configured credentials and whether they have access to this resource.

(exit code: 1)
```

## 6. Files / OneDrive (license-error behavior)

```
$ coral sql "SELECT drivetype, quota FROM microsoft_graph_v4.me_drive_me_getdrive"
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Tenant does not have a SPO license.","innerError":{"date":"2026-07-14T00:17:25","request-id":"f6b95fe6-ed39-46b0-b3e6-9fb42808db14","client-request-id":"f6b95fe6-ed39-46b0-b3e6-9fb42808db14"}}} [GET] https://graph.microsoft.com/v1.0/me/drive
Hint: Adjust the query filters or shape to match the target table's supported inputs.

(exit code: 1)
```

```
$ coral sql "SELECT value FROM microsoft_graph_v4.me_drive_me_listdrives"
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Tenant does not have a SPO license.","innerError":{"date":"2026-07-14T00:17:35","request-id":"ea9842c4-af5d-45b4-91a6-e61a6f1e331f","client-request-id":"ea9842c4-af5d-45b4-91a6-e61a6f1e331f"}}} [GET] https://graph.microsoft.com/v1.0/me/drives
Hint: Adjust the query filters or shape to match the target table's supported inputs.

(exit code: 1)
```

```
$ coral sql "SELECT value FROM microsoft_graph_v4.drives_drive_drives_drive_listdrive"
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Tenant does not have a SPO license.","innerError":{"date":"2026-07-14T00:17:44","request-id":"e14014c5-12f4-41f8-ba26-adbfb927c347","client-request-id":"e14014c5-12f4-41f8-ba26-adbfb927c347"}}} [GET] https://graph.microsoft.com/v1.0/drives
Hint: Adjust the query filters or shape to match the target table's supported inputs.

(exit code: 1)
```

## 7. SharePoint sites (license-error behavior)

```
$ coral sql "SELECT value FROM microsoft_graph_v4.sites_site_sites_site_listsite"
Error: Source rejected the request (400)
Detail: {"error":{"code":"BadRequest","message":"Tenant does not have a SPO license.","innerError":{"date":"2026-07-14T00:17:53","request-id":"9135b4f9-a621-4c0a-94da-4edc78d1fcb7","client-request-id":"9135b4f9-a621-4c0a-94da-4edc78d1fcb7"}}} [GET] https://graph.microsoft.com/v1.0/sites
Hint: Adjust the query filters or shape to match the target table's supported inputs.

(exit code: 1)
```

```
$ coral sql "SELECT id, displayname FROM microsoft_graph_v4.sites_site_functions_sites_getallsites LIMIT 5"
Error: No column named `id`
Detail: No column `id` is in scope. Valid columns include: microsoft_graph_v4.sites_site_functions_sites_getallsites.odata_count, microsoft_graph_v4.sites_site_functions_sites_getallsites.odata_nextlink, microsoft_graph_v4.sites_site_functions_sites_getallsites.value, microsoft_graph_v4.sites_site_functions_sites_getallsites.count, microsoft_graph_v4.sites_site_functions_sites_getallsites.filter, microsoft_graph_v4.sites_site_functions_sites_getallsites.search, microsoft_graph_v4.sites_site_functions_sites_getallsites.skip, microsoft_graph_v4.sites_site_functions_sites_getallsites.top.

(exit code: 1)
```

## 8. Teams / Chat (license-error behavior)

```
$ coral sql "SELECT value FROM microsoft_graph_v4.me_chat_me_listchats"
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-14T00:18:11","request-id":"3b5d0486-53bf-40ce-bc7c-b48b279b2910","client-request-id":"3b5d0486-53bf-40ce-bc7c-b48b279b2910"}}} [GET] https://graph.microsoft.com/v1.0/me/chats
Hint: Check the configured credentials and whether they have access to this resource.

(exit code: 1)
```

```
$ coral sql "SELECT value FROM microsoft_graph_v4.chats_chat_chats_chat_listchat"
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-14T00:18:19","request-id":"c74f61c6-2ba1-43d1-9976-02ef0f22f45a","client-request-id":"c74f61c6-2ba1-43d1-9976-02ef0f22f45a"}}} [GET] https://graph.microsoft.com/v1.0/chats
Hint: Check the configured credentials and whether they have access to this resource.

(exit code: 1)
```

```
$ coral sql "SELECT * FROM microsoft_graph_v4.me_chat_me_chats_getallmessages LIMIT 3"
Error: Source request was rejected (403)
Detail: {"error":{"code":"Forbidden","message":"Failed to get license information for the user. Ensure user has a valid Office365 license assigned to them.","innerError":{"code":"Forbidden","date":"2026-07-14T00:18:29","request-id":"4cd7e787-6d97-452d-b536-d1f1c7684720","client-request-id":"4cd7e787-6d97-452d-b536-d1f1c7684720"}}} [GET] https://graph.microsoft.com/v1.0/me/chats/getAllMessages()
Hint: Check the configured credentials and whether they have access to this resource.

(exit code: 1)
```

## 9. Scope-not-granted behavior (permissions beyond the consented set)

```
$ coral sql "SELECT value FROM microsoft_graph_v4.groups_group_groups_group_listgroup"
Error: Source request was rejected (403)
Detail: {"error":{"code":"Authorization_RequestDenied","message":"Insufficient privileges to complete the operation.","innerError":{"date":"2026-07-14T00:18:39","request-id":"bf5da46c-5eec-453e-b2aa-392625007b2b","client-request-id":"bf5da46c-5eec-453e-b2aa-392625007b2b"}}} [GET] https://graph.microsoft.com/v1.0/groups
Hint: Check the configured credentials and whether they have access to this resource.

(exit code: 1)
```

```
$ coral sql "SELECT name FROM microsoft_graph_v4.me_calendar_me_listcalendars"
Error: No column named `name`
Detail: No column `name` is in scope. Valid columns include: microsoft_graph_v4.me_calendar_me_listcalendars.odata_count, microsoft_graph_v4.me_calendar_me_listcalendars.odata_nextlink, microsoft_graph_v4.me_calendar_me_listcalendars.value, microsoft_graph_v4.me_calendar_me_listcalendars.count, microsoft_graph_v4.me_calendar_me_listcalendars.filter, microsoft_graph_v4.me_calendar_me_listcalendars.search, microsoft_graph_v4.me_calendar_me_listcalendars.skip, microsoft_graph_v4.me_calendar_me_listcalendars.top.

(exit code: 1)
```

```
$ coral sql "SELECT value FROM microsoft_graph_v4.me_message_me_listmessages"
Error: Source authentication failed (401)
Detail:  [GET] https://graph.microsoft.com/v1.0/me/messages
Hint: Credentials for this source are invalid or expired. Re-install it to refresh: `coral source add microsoft_graph_v4` for bundled sources, or `coral source add --file <manifest-path>` for imported sources.

(exit code: 1)
```

## 10. Error-quality probes

```
$ coral sql "SELECT * FROM microsoft_graph_v4.totally_fake_table"
Error: Table `microsoft_graph_v4.totally_fake_table` not found
Detail: No table `totally_fake_table` exists in schema `microsoft_graph_v4`.

(exit code: 1)
```

```
$ coral sql "SELECT nosuchcolumn FROM microsoft_graph_v4.me_user_me_user_getuser"
Error: No column named `nosuchcolumn`
Detail: No column `nosuchcolumn` is in scope. Valid columns include: microsoft_graph_v4.me_user_me_user_getuser.odata_type, microsoft_graph_v4.me_user_me_user_getuser.aboutme, microsoft_graph_v4.me_user_me_user_getuser.accountenabled, microsoft_graph_v4.me_user_me_user_getuser.activities, microsoft_graph_v4.me_user_me_user_getuser.adhoccalls, microsoft_graph_v4.me_user_me_user_getuser.agegroup, microsoft_graph_v4.me_user_me_user_getuser.agreementacceptances, microsoft_graph_v4.me_user_me_user_getuser.approleassignments, microsoft_graph_v4.me_user_me_user_getuser.assignedlicenses, microsoft_graph_v4.me_user_me_user_getuser.assignedplans.

(exit code: 1)
```

```
$ coral sql "SELECT count(*) AS n FROM microsoft_graph_v4.users_user_users_user_listuser"
Error: Source request was rejected (403)
Detail: {"error":{"code":"Authorization_RequestDenied","message":"Insufficient privileges to complete the operation.","innerError":{"date":"2026-07-14T00:19:36","request-id":"a09792fd-78be-470a-9efa-fa2cc26a2b64","client-request-id":"a09792fd-78be-470a-9efa-fa2cc26a2b64"}}} [GET] https://graph.microsoft.com/v1.0/users
Hint: Check the configured credentials and whether they have access to this resource.

(exit code: 1)
```

## 11. Table functions (parameterized endpoints, dummy IDs — error quality)

```
$ coral sql "SELECT * FROM microsoft_graph_v4.chats_chatmessage_chats_messages_replies_listhostedcontents(chat_id => 'fake-chat', chatmessage_id => 'fake-msg', chatmessage_id1 => 'fake-reply')"
Error: Source resource was not found (404)
Detail: {"error":{"code":"NotFound","message":"Requested API is not supported. Please check the path.","innerError":{"date":"2026-07-14T00:19:48","request-id":"5a2518e3-7288-46ba-96e6-bd358d30ae2d","client-request-id":"5a2518e3-7288-46ba-96e6-bd358d30ae2d"}}} [GET] https://graph.microsoft.com/v1.0/chats/fake-chat/messages/fake-msg/replies/fake-reply/hostedContents
Hint: Verify the identifier or filter values you passed; the upstream resource was not found.

(exit code: 1)
```

## 12. Performance sample (same trivial query, 3 consecutive runs)
run 1: 11.0s
run 2: 10.5s
run 3: 11.1s

---
_Generated 2026-07-14 by scripted battery; each command's exit code shown. Analysis of these results: see [2026-07-14-msgraph-connector-test-report.md](2026-07-14-msgraph-connector-test-report.md)._
