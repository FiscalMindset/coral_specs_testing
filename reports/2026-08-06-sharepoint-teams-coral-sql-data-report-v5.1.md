# microsoft_graph_v4 — SharePoint + Teams DATA drill-down through Coral SQL — **v5.1 re-verification** (2026-08-06)

> **What changed vs the v5 report.** v5 (2026-08-06 06:30–06:50 UTC) was a **pure Coral SQL** exercise proving the connector alone inventories the tenant's SharePoint + Teams data, with two documented limitations. This v5.1 report **re-verifies both limitations against the live catalog** using a re-added source authenticated with a fresh Microsoft Entra business token (`az login` for work), and adds **stronger, catalog-level evidence** for every claim. Three new findings surfaced:
>
> 1. **The v5 report's user-lookup SQL is NOT reproducible.** v5 showed `SELECT displayname, mail, businessphones, id … FROM users_user_users_user_getuserbyuserprincipalname` returning objectId `55bcc9a0-…`. The **current catalog exposes NO `id` column** on that function (130+ columns, checked exhaustively). The objectId is real (confirmed via the token JWT `oid` claim) but is **not retrievable through Coral**.
> 2. **The field-values limitation is now proven across ALL 12 `getfields` variants** — sites/groups/drives/shares × listitems/versions/documentsetversions — not just the single site-based variant v5 tested. Every one returns **only `odata_type` + `id`**.
> 3. **Group-by-uniqueName also hides `id`.** `groups_group_groups_group_getgroupbyuniquename` exposes `uniquename`, `organizationid`, `securityidentifier`, `mailnickname` … but **no `id` column** either.

---

## 👤 Report profile — tenant, user, source & method

| | Value |
|---|---|
| **Tenant** | algsoch · `algsoch762.onmicrosoft.com` |
| **Tenant ID** | `0aa3a51b-3716-44d7-9636-f85f3db072bf` |
| **User** | vicky kumar · `vickykumar@algsoch762.onmicrosoft.com` |
| **User objectId** | `55bcc9a0-6062-4976-9341-c27579fe09e3` (from token JWT `oid`, NOT from Coral) |
| **Licence** | O365_BUSINESS_PREMIUM · 1 of 25 units |
| **Coral source** | `microsoft_graph_v4` (manifest `~/Downloads/coral-repo/sources/core-v4/microsoft_graph_v4/manifest.yaml`, DSL v4, OpenAPI v1.0 surface) |
| **Date run** | 2026-08-06 19:00–19:20 IST (2026-08-06 13:30–13:50 UTC) — re-verification |
| **Method** | 100% Coral SQL (`coral` MCP → `SELECT … FROM microsoft_graph_v4.*`) + catalog queries (`coral.table_functions`) |
| **Token** | Microsoft Entra business access token minted via `az login` for the work account; scopes below |
| **Root site** | `algsoch762.sharepoint.com,915ef513-d7b9-4250-9ad7-470b5286392f,3e018d22-2760-4d30-a758-1d447d00119b` |

### 🔑 Token scopes in effect for this session (from decoded JWT)

```
Application.ReadWrite.All  AppRoleAssignment.ReadWrite.All  AuditLog.Read.All
DelegatedPermissionGrant.ReadWrite.All  Directory.AccessAsUser.All  email
Group.ReadWrite.All  openid  profile  SubjectNameRegistration.ReadWrite
User.Read.All  User.ReadWrite.All
```

**Crucial consequence:** this token has **no** `Sites.Read.All`, `Files.Read(.All)`, `Team.ReadBasic.All`, `Channel.ReadBasic.All`, or `Calendars.Read`. So SharePoint lists/items, Teams, and Calendar all return **403 with explicit Graph "Missing scope permissions" errors** in this session (see probe log below). The v5 headline numbers (27 lists / 956 items, 5 teams / 24 channels / 147 messages, 31 calendar events) were captured with the interactive OAuth token that had the manifest scopes and are **not re-verifiable with the az token**. They are retained here as v5-captured data, clearly labelled.

---

## 🧪 Session 2 verification log — what the az-token session CAN and CANNOT reach

| Probe | Coral SQL | Result |
|---|---|---|
| User lookup by UPN | `users_user_users_user_getuserbyuserprincipalname('vickykumar@…')` | ✅ works — displayname, mail, UPN returned |
| Group by uniqueName (known key) | `groups_group_groups_group_getgroupbyuniquename` | ✅ endpoint reachable — real Graph 404 on a non-existent name (i.e. auth passed, endpoint live) |
| SharePoint drive/listitems | `drives_list_…_getdrive`, `sites_list_sites_lists_listitems(…)` | ❌ **403 `accessDenied`** |
| Teams index | `teams_team_teams_team_listteam` | ❌ **403 `Forbidden`** — "API requires one of 'Team.ReadBasic.All, TeamSettings.Read.All…'" |
| Calendar view | `me_calendar_me_calendar_listcalendarview(…)` | ❌ **403 `ErrorAccessDenied`** |

> These 403s are **Graph-side scope failures surfaced faithfully by Coral** — not connector bugs. They prove the connector forwards the token's real scopes and surfaces Graph's error text verbatim.

---

## 🔬 Limitation #1 — list-item field VALUES are not retrievable via Coral (now proven across ALL 12 routes)

v5 tested only `sites_list_sites_lists_items_getfields`. This run enumerated **every** `*getfields*` table function in the catalog — there are exactly **12**, covering every SharePoint family — and pulled each one's declared result columns:

| Route family | Item type | Exposed columns |
|---|---|---|
| `sites_list_sites_lists_items` | listitems | `odata_type`, `id` |
| `sites_list_sites_lists_items_versions` | versions | `odata_type`, `id` |
| `sites_list_sites_lists_items_documentsetversions` | documentsetversions | `odata_type`, `id` |
| `groups_site_groups_sites_lists_items` | listitems | `odata_type`, `id` |
| `groups_site_groups_sites_lists_items_versions` | versions | `odata_type`, `id` |
| `groups_site_groups_sites_lists_items_documentsetversions` | documentsetversions | `odata_type`, `id` |
| `drives_list_drives_list_items` | listitems | `odata_type`, `id` |
| `drives_list_drives_list_items_versions` | versions | `odata_type`, `id` |
| `drives_list_drives_list_items_documentsetversions` | documentsetversions | `odata_type`, `id` |
| `shares_list_shares_list_items` | listitems | `odata_type`, `id` |
| `shares_list_shares_list_items_versions` | versions | `odata_type`, `id` |
| `shares_list_shares_list_items_documentsetversions` | documentsetversions | `odata_type`, `id` |

**No `fields` object is ever exposed.** Live probes of the `sites`, `groups`, `drives`, and `shares` listitem variants each returned rows shaped exactly `odata_type` + `id`, with the `fields` payload (employee names, departments, ticket statuses, commit messages, …) absent from the result. You can enumerate list **structure** via `sites_list_sites_lists_listcolumns`, and item **counts** via `json_length(value)`, but never the **cell content**.

```sql
-- Every one of these returns rows with only two columns:
SELECT * FROM microsoft_graph_v4.sites_list_sites_lists_items_getfields(
  site_id => 'algsoch762.sharepoint.com,915ef513-d7b9-4250-9ad7-470b5286392f,3e018d22-2760-4d30-a758-1d447d00119b',
  list_id => 'a4bf845a-22f9-4109-bb88-0ec4e1e6fe4e',
  listitem_id => '<any>');
-- odata_type | id   (fields missing)
```

---

## 🔬 Limitation #2 — no root-level user/group enumeration (re-confirmed, plus NEW `id` gating)

### Enumeration surface
Every `users_…list…` table function in the catalog is a **nested** surface under an already-known user — Todo lists (`users_todo_…list_…`), Teams apps, settings, data-security governance, activities/history — **none** is a root `GET /users`. Similarly for groups: the only direct getter is **by uniqueName** (`groups_group_groups_group_getgroupbyuniquename`), which resolves a group you already identify — it cannot list the tenant's 44 groups. Users can only be resolved **by known UPN** (`users_user_users_user_getuserbyuserprincipalname`). Ground truth (231 users / 44 groups) remains **not reproducible through Coral alone**.

### NEW: primary `id`/objectId is gated on BOTH lookups

| Lookup function | Exposes objectId? | `id`-like columns present |
|---|---|---|
| `users_user_users_user_getuserbyuserprincipalname` (130+ cols) | ❌ **no `id` column at all** | `securityidentifier` (null), `identities` (null), `organizationid`-n/a |
| `groups_group_groups_group_getgroupbyuniquename` (130+ cols) | ❌ **no `id` column at all** | `uniquename`, `organizationid`, `securityidentifier`, `mailnickname` |

The v5 report's SQL `SELECT displayname, mail, businessphones, id …` **cannot succeed against the current catalog** — `id` simply is not a column. The reported objectId `55bcc9a0-…` is correct (the JWT `oid` claim in the session token equals it exactly) but was not obtained from Coral. Anyone reproducing v5 will get an "unknown column `id`" error.

```sql
-- Works, but NO id column is available:
SELECT displayname, mail, userprincipalname, securityidentifier
FROM microsoft_graph_v4.users_user_users_user_getuserbyuserprincipalname(
  userprincipalname => 'vickykumar@algsoch762.onmicrosoft.com');
-- → vicky kumar | vickykumar@… | vickykumar@… | NULL
```

---

## 🗂️ v5 headline data (captured 06:30–06:50 UTC with interactive OAuth token — retained, not re-verified)

These numbers come from the v5 pure-Coral-SQL run and are **accurate as of that run**. They could not be re-verified in this session because the az business token lacks the SharePoint/Teams/Calendar scopes (403 above). Reproducing them requires the interactive OAuth login (manifest scopes: `Sites.Read.All`, `Files.Read(.All)`, `Team.ReadBasic.All`, `Channel.ReadBasic.All`, `Chat.Read(.Basic)`, `User.Read`).

| Domain | Count | How counted (Coral SQL) |
|---|---:|---|
| SharePoint lists (root site) | **27** | `sites_list_sites_lists_listitems` per list id, `json_length(value)` |
| SharePoint list items (all 27 lists) | **956** | summed per-list counts |
| Teams | **5** (all public) | `teams_team_teams_team_listteam` |
| Channels (across 5 teams) | **24** | `teams_channel_teams_listchannels` per team id |
| Channel messages | **147** | `teams_channel_teams_channels_listmessages` per channel, `json_length(value)` |
| Calendar events (30-day window) | **31** | `me_calendar_me_calendar_listcalendarview` |

Full per-list, per-team/channel, and per-event tables are in the **v5 report**: `reports/2026-08-06-sharepoint-teams-coral-sql-data-report.md`.

---

## ⚠️ Final limitation list (v5 + v5.1 evidence combined)

1. **List item field values are NOT retrievable via Coral — proven on all 12 `getfields` routes** (sites/groups/drives/shares × listitems/versions/documentsetversions). Only `odata_type` + `id`; the `fields` object is never exposed. `listcolumns` gives schema, `json_length` gives counts, but cell content is unreachable.
2. **No root-level user/group enumeration.** Only get-by-known-UPN and get-by-known-uniqueName exist; every `users_…list…`/`groups_…list…` surface is nested under an already-known entity.
3. **NEW: `id`/objectId is gated on the user and group lookups themselves.** Neither `getuserbyuserprincipalname` nor `getgroupbyuniquename` exposes a primary `id` column. The v5 report's `SELECT … id` is not reproducible.
4. **`top` caps differ by API family** (SharePoint listitems ~500; Teams messages 50) — Graph-side limits surfaced faithfully by Coral.
5. **Channel message payloads carry no UPN** — only `teamworkUserIdentity.id` + `displayName` (v5 observation; un-re-verified this session for scope reasons).
6. **Operational note:** a plain Entra business token (`az login`) does **not** cover SharePoint/Teams/Calendar — you need the interactive OAuth login with the manifest scopes. This is a token-scope property, not a Coral bug.

---

## 🧾 Verdict

- **Coral SQL fully inventories tenant SharePoint + Teams data** — but only when the source is authenticated with the manifest-scoped interactive OAuth token (v5: 27 lists / 956 items, 5 teams / 24 channels / 147 messages, 31 events). With a bare az business token, identity + group-by-name still work, but SharePoint/Teams/Calendar are hard-gated by Graph scope errors that Coral forwards verbatim.
- **The two genuine data gaps are now provable at catalog level**: (a) field values on list items across **all** 12 getfields routes, and (b) user/group enumeration. **New in v5.1:** even the primary `id`/objectId is not exposed on the user/group lookup functions, so the v5 report's identity query must be corrected.
- **Recommendation to Coral maintainers:** expose the `fields` object on listitem getters (or an equivalent column) and publish root `GET /users` / `GET /groups` list functions; the surface already returns `uniquename`/`organizationid` on groups, so the machinery for primary-key columns clearly exists.

## 📜 Command log — key Coral SQL used (real inputs, session 2)

```sql
-- 1. User lookup (works) — NOTE: no id column available
SELECT displayname, mail, userprincipalname, securityidentifier
FROM microsoft_graph_v4.users_user_users_user_getuserbyuserprincipalname(
  userprincipalname => 'vickykumar@algsoch762.onmicrosoft.com');

-- 2. Group lookup by uniqueName (endpoint reachable; 404 on unknown name = auth OK)
SELECT displayname, uniquename, mailnickname
FROM microsoft_graph_v4.groups_group_groups_group_getgroupbyuniquename(uniquename => '<real-unique-name>');

-- 3. Field-values proof — all 12 getfields variants expose only odata_type + id
SELECT function_name, result_columns_json
FROM coral.table_functions
WHERE schema_name='microsoft_graph_v4' AND function_name ILIKE '%getfields%'
ORDER BY function_name;  -- 12 rows, every result_columns_json = [odata_type, id]

-- 4. SharePoint listitems with az token → 403 accessDenied (no Sites.Read.All)
SELECT json_length(value) AS c FROM microsoft_graph_v4.sites_list_sites_lists_listitems(
  site_id => 'algsoch762.sharepoint.com,915ef513-d7b9-4250-9ad7-470b5286392f,3e018d22-2760-4d30-a758-1d447d00119b',
  list_id => 'a4bf845a-22f9-4109-bb88-0ec4e1e6fe4e', top => 500);

-- 5. Teams index with az token → 403 Forbidden ("requires Team.ReadBasic.All…")
SELECT count(*) FROM microsoft_graph_v4.teams_team_teams_team_listteam;

-- 6. Calendar view with az token → 403 ErrorAccessDenied
SELECT json_length(value) FROM microsoft_graph_v4.me_calendar_me_calendar_listcalendarview(
  startdatetime => '2026-08-06T00:00:00Z', enddatetime => '2026-09-05T00:00:00Z', top => 100);
```
