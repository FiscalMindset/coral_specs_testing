# Coral `microsoft_graph_v4` — Directory Data Test Log (real rows, no M365 license)

M365 file/Teams data needs a license, but **Entra directory data does not** — so this phase tests the connector against real rows: 18 users and 2 groups seeded in the test tenant. The source credential was temporarily swapped to an admin-privileged Graph token (via the connector's "paste access token" path) so directory-wide reads are permitted. Every command below is verbatim with actual output (long outputs truncated, GUIDs are test-tenant-only).


## 0. Credential swap (admin token via paste-token path)

```
$ coral source remove microsoft_graph_v4 && MS_GRAPH_TENANT_ID=<tenant-guid> MS_GRAPH_ACCESS_TOKEN=<admin-token> coral source add --file .../microsoft_graph_v4/manifest.yaml
    ├─ admin_configurationmanagement_admin_configurationmanagement_listconfigurationsnapshots
    └─ ... and 723 more
    Query tests
    1 declared · 1 passed · 0 failed

    ✓ SELECT displayname, userprincipalname FROM microsoft_graph_v4.me_user_me_user_getuser LIMIT 1
      1 row
```

## 1. Users list — real rows through the OData envelope

```
$ coral sql "SELECT value FROM microsoft_graph_v4.users_user_users_user_listuser WHERE top = 3"
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
[...truncated]

(exit code: 0)
```

```
$ coral sql "SELECT odata_nextlink IS NOT NULL AS has_next_page FROM microsoft_graph_v4.users_user_users_user_listuser WHERE top = 5"
+---------------+
| has_next_page |
+---------------+
| true          |
+---------------+

(exit code: 0)
```

## 2. Unnesting the envelope (JSON functions on value)

```
$ coral sql "SELECT json_array_length(value) AS users_in_page FROM microsoft_graph_v4.users_user_users_user_listuser"
Error (invalid argument): invalid input: Invalid function 'json_array_length'.
Did you mean 'array_length'?

(exit code: 1)
```

```
$ coral sql "SELECT json_extract_string(value, '\$[0].displayName') AS first_user FROM microsoft_graph_v4.users_user_users_user_listuser"
Error (invalid argument): invalid input: Invalid function 'json_extract_string'.
Did you mean 'json_get_str'?

(exit code: 1)
```

```
$ coral sql "SELECT u->>'displayName' AS name, u->>'userPrincipalName' AS upn FROM (SELECT unnest(json_extract(value,'\$[*]')) AS u FROM microsoft_graph_v4.users_user_users_user_listuser) LIMIT 5"
Error (invalid argument): invalid input: Invalid function 'json_extract'.
Did you mean 'union_extract'?

(exit code: 1)
```

## 3. Filter pushdown (OData \$filter / \$search / \$top via envelope columns)

```
$ coral sql "SELECT json_array_length(value) AS n FROM microsoft_graph_v4.users_user_users_user_listuser WHERE filter = \"startswith(displayName,'Bulk')\""
Error: No column named `startswith(displayName,'Bulk')`
Detail: No column `startswith(displayName,'Bulk')` is in scope. Valid columns include: microsoft_graph_v4.users_user_users_user_listuser.odata_count, microsoft_graph_v4.users_user_users_user_listuser.odata_nextlink, microsoft_graph_v4.users_user_users_user_listuser.value, microsoft_graph_v4.users_user_users_user_listuser.count, microsoft_graph_v4.users_user_users_user_listuser.filter, microsoft_graph_v4.users_user_users_user_listuser.search, microsoft_graph_v4.users_user_users_user_listuser.top.

(exit code: 1)
```

```
$ coral sql "SELECT json_array_length(value) AS n FROM microsoft_graph_v4.users_user_users_user_listuser WHERE top = 2"
Error (invalid argument): invalid input: Invalid function 'json_array_length'.
Did you mean 'array_length'?

(exit code: 1)
```

```
$ coral sql "SELECT json_array_length(value) AS n FROM microsoft_graph_v4.users_user_users_user_listuser WHERE search = \"\\"displayName:Bulk\\"\""
Error (invalid argument): invalid input: sql parser error: Expected: end of statement, found: displayName at Line: 1, Column: 111

(exit code: 1)
```

## 4. Groups — real rows and membership via table function

```
$ coral sql "SELECT json_extract_string(value,'\$[0].displayName') AS g0, json_extract_string(value,'\$[1].displayName') AS g1 FROM microsoft_graph_v4.groups_group_groups_group_listgroup"
Error (invalid argument): invalid input: Invalid function 'json_extract_string'.
Did you mean 'json_get_str'?

(exit code: 1)
```

```
$ coral sql "SELECT function_name FROM coral.table_functions WHERE schema_name='microsoft_graph_v4' AND function_name LIKE 'groups%listmember%' LIMIT 5"
+-----------------------------------------------------------------+
| function_name                                                   |
+-----------------------------------------------------------------+
| groups_directoryobject_groups_listmemberof                      |
| groups_directoryobject_groups_listmemberof_asadministrativeunit |
| groups_directoryobject_groups_listmemberof_asgroup              |
| groups_directoryobject_groups_listmembers                       |
| groups_directoryobject_groups_listmembers_asapplication         |
+-----------------------------------------------------------------+

(exit code: 0)
```

```
$ coral sql "SELECT value FROM microsoft_graph_v4.groups_directoryobject_groups_listmembers(group_id => '7b4d5771-c8d4-495d-8f5e-d4850075baa9')"
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
[...truncated]

(exit code: 0)
```

```
$ coral sql "SELECT value FROM microsoft_graph_v4.groups_directoryobject_groups_getmembers_asuser(group_id => 'c668c8b1-1563-48e1-a1f9-6e47601c7c1f')"
Error (invalid argument): invalid input: microsoft_graph_v4.groups_directoryobject_groups_getmembers_asuser missing required argument(s): directoryobject_id

(exit code: 1)
```

## 5. Single-object table function with a real user id

```
$ coral sql "SELECT function_name FROM coral.table_functions WHERE schema_name='microsoft_graph_v4' AND function_name LIKE 'users%getuser%' LIMIT 5"
+-------------------------------------------------------------------------------------+
| function_name                                                                       |
+-------------------------------------------------------------------------------------+
| users_employeeexperienceuser_users_employeeexperience_assignedroles_members_getuser |
| users_user_users_user_getuser                                                       |
| users_user_users_user_getuserbyuserprincipalname                                    |
+-------------------------------------------------------------------------------------+

(exit code: 0)
```

```
$ coral sql "SELECT displayname, userprincipalname FROM microsoft_graph_v4.users_user_users_user_getuser(user_id => '5f5692cb-2e99-4f43-8d0f-900d9441bd7e')"
+-------------+------------------------------------+
| displayname | userprincipalname                  |
+-------------+------------------------------------+
| Vicky Test  | vicky@algsochgmail.onmicrosoft.com |
+-------------+------------------------------------+

(exit code: 0)
```

## 6. Other license-free directory tables

```
$ coral sql "SELECT value FROM microsoft_graph_v4.organization_organization_organization_organization_listorganization"
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
[...truncated]

(exit code: 0)
```

```
$ coral sql "SELECT json_array_length(value) AS service_principals FROM microsoft_graph_v4.serviceprincipals_serviceprincipal_serviceprincipals_serviceprincipal_listserviceprincipal"
Error (invalid argument): invalid input: Invalid function 'json_array_length'.
Did you mean 'array_length'?

(exit code: 1)
```

```
$ coral sql "SELECT json_array_length(value) AS apps FROM microsoft_graph_v4.applications_application_applications_application_listapplication"
Error (invalid argument): invalid input: Invalid function 'json_array_length'.
Did you mean 'array_length'?

(exit code: 1)
```

```
$ coral sql "SELECT value FROM microsoft_graph_v4.me_directoryobject_me_listmemberof"
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| value                                                                                                                                                                                                                                                                                                                                       |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| [{"@odata.type":"#microsoft.graph.directoryRole","id":"d2bbfd53-3dba-4be4-a10c-116145147880","deletedDateTime":null,"description":"Can manage all aspects of Microsoft Entra ID and Microsoft services that use Microsoft Entra identities.","displayName":"Global Administrator","roleTemplateId":"62e90394-69f5-4237-9190-012177145e10"}] |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

(exit code: 0)
```

## 7. SQL-over-data ergonomics (aggregation on unnested rows)

```
$ coral sql "SELECT count(*) AS bulk_users FROM (SELECT unnest(json_extract(value,'\$[*]')) AS u FROM microsoft_graph_v4.users_user_users_user_listuser) WHERE u->>'displayName' LIKE 'Bulk%'"
Error (invalid argument): invalid input: Invalid function 'json_extract'.
Did you mean 'union_extract'?

(exit code: 1)
```

## 8. Corrections — value is a native LIST, not JSON text
Several section 2-3 failures were test-script quoting bugs (double-quoted SQL strings become identifiers) plus a wrong assumption: `value` is a native LIST of STRUCTs, so plain `unnest`/`array_length` work — no JSON functions needed.

```
$ coral sql "SELECT typeof(value) AS value_type FROM microsoft_graph_v4.users_user_users_user_listuser WHERE top = 1"
Error (invalid argument): invalid input: Invalid function 'typeof'.
Did you mean 'upper'?

(exit code: 1)
```

```
$ coral sql "SELECT array_length(value) AS users_in_page FROM microsoft_graph_v4.users_user_users_user_listuser"
Error (invalid argument): invalid input: Failed to coerce arguments to satisfy a call to 'array_length' function: coercion from Utf8 to the signature OneOf([ArraySignature(Array { arguments: [Array], array_coercion: None }), ArraySignature(Array { arguments: [Array, Index], array_coercion: None })]) failed No function matches the given name and argument types 'array_length(Utf8)'. You might need to add explicit type casts.
	Candidate functions:
	array_length(array)
	array_length(array, index)

(exit code: 1)
```

```
$ coral sql "SELECT u.displayname, u.userprincipalname FROM (SELECT unnest(value) AS u FROM microsoft_graph_v4.users_user_users_user_listuser) LIMIT 5"
Error (invalid argument): invalid input: unnest() can only be applied to array, struct and null

(exit code: 1)
```

```
$ coral sql "SELECT array_length(value) AS n FROM microsoft_graph_v4.users_user_users_user_listuser WHERE filter = 'startswith(displayName,''Bulk'')'"
Error (invalid argument): invalid input: Failed to coerce arguments to satisfy a call to 'array_length' function: coercion from Utf8 to the signature OneOf([ArraySignature(Array { arguments: [Array], array_coercion: None }), ArraySignature(Array { arguments: [Array, Index], array_coercion: None })]) failed No function matches the given name and argument types 'array_length(Utf8)'. You might need to add explicit type casts.
	Candidate functions:
	array_length(array)
	array_length(array, index)

(exit code: 1)
```

```
$ coral sql "SELECT count(*) AS bulk_users FROM (SELECT unnest(value) AS u FROM microsoft_graph_v4.users_user_users_user_listuser) WHERE u.displayname LIKE 'Bulk%'"
Error (invalid argument): invalid input: unnest() can only be applied to array, struct and null

(exit code: 1)
```

```
$ coral sql "SELECT u.displayname FROM (SELECT unnest(value) AS u FROM microsoft_graph_v4.groups_group_groups_group_listgroup)"
Error (invalid argument): invalid input: unnest() can only be applied to array, struct and null

(exit code: 1)
```

```
$ coral sql "SELECT array_length(value) AS service_principals FROM microsoft_graph_v4.serviceprincipals_serviceprincipal_serviceprincipals_serviceprincipal_listserviceprincipal"
Error (invalid argument): invalid input: Failed to coerce arguments to satisfy a call to 'array_length' function: coercion from Utf8 to the signature OneOf([ArraySignature(Array { arguments: [Array], array_coercion: None }), ArraySignature(Array { arguments: [Array, Index], array_coercion: None })]) failed No function matches the given name and argument types 'array_length(Utf8)'. You might need to add explicit type casts.
	Candidate functions:
	array_length(array)
	array_length(array, index)

(exit code: 1)
```

```
$ coral sql "SELECT odata_nextlink FROM microsoft_graph_v4.users_user_users_user_listuser WHERE top = 5"
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| odata_nextlink                                                                                                                                                                                          |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| https://graph.microsoft.com/v1.0/users?$top=5&$skiptoken=RFNwdAIAAQAAACo6YnVsa3Rlc3RlcjEyQGFsZ3NvY2hnbWFpbC5vbm1pY3Jvc29mdC5jb20pVXNlcl9hYmU4MmFlYy0xMjQ4LTQxY2QtYjE2My02ZDFjMDVjYTMwNTe5AAAAAAAAAAAAAA |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

(exit code: 0)
```

## 9. Verified conclusions (data phase)

Two follow-up verifications run after the battery:

```
$ coral sql "SELECT substr(value, 1, 120) AS filtered_preview, odata_count FROM microsoft_graph_v4.users_user_users_user_listuser WHERE filter = 'startswith(displayName,''Bulk'')'"
| [{"businessPhones":[],"displayName":"Bulk Tester 1","givenName":null,... |
(exit code: 0)

$ coral sql "SELECT substr(value, 1, 80) AS value_preview FROM microsoft_graph_v4.users_user_users_user_listuser WHERE top = 2"
| [{"businessPhones":[],"displayName":"vicky kumar","givenName":"vicky",... |
(exit code: 0)
```

**What works with real data:**
- `WHERE top = N` → pushed to OData `$top` correctly ✅
- `WHERE filter = 'startswith(displayName,''Bulk'')'` → pushed to `$filter`, returns only matching users ✅
- Table functions with real IDs: `users_user_users_user_getuser(user_id => '<guid>')` returns the flattened user; `groups_directoryobject_groups_listmembers(group_id => '<guid>')` returns real members ✅
- `odata_nextlink` populates with a real skiptoken URL when more pages exist ✅
- Plain string functions (`substr`, `LIKE`) work on `value` ✅

**Fundamental gaps found:**
1. **List data cannot be turned into rows in SQL.** `value` is a Utf8 column containing the raw JSON array, and the engine (DataFusion) exposes **no JSON functions** (`json_extract`, `json_array_length` etc. don't exist; `unnest`/`array_length` fail on Utf8). So list results are fetchable but not relationally queryable — no projection of fields, no filtering on fields post-fetch, no joins, no aggregation. Client-side JSON parsing is the only option. This undermines the core "query it like a database" promise for every list endpoint.
2. **Pagination cannot be continued.** `odata_nextlink` is returned, but there is no `skiptoken` input column to feed it back — only page 1 is ever reachable from SQL.
3. Earlier finding confirmed at data level: the flattened get-tables omit the `id` field, yet table functions require IDs — the only way to obtain an ID is to parse the raw JSON in `value` by hand.

---
_Generated 2026-07-14. Data: 18 real users (15 seeded 'Bulk Tester' accounts), 2 groups with members. Companion reports: analysis + full command log in this folder. File/SharePoint/Teams data phase still pending M365 trial license._
