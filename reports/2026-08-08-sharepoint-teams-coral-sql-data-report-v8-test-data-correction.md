# microsoft_graph_v4 — v8 test-data correction addendum (2026-08-08)

> **🧭 Addendum to v8.** The v8 consolidated battery (161 probes, 79 pass / 80 error / 2 catalog facts) labeled **7 probes as `test-data`** — stale/bogus probe IDs. This addendum **re-runs the two `item 15` probes that had never been retested** against valid, live-verified seeds, and reclassifies the 7-bucket error taxonomy. v8 and all earlier reports remain frozen; this dated file records the correction. Net change: **`test-data` 7 → 5, `ms-upstream` 22 → 23, `spec / catalog` 4 → 5** — the counts still sum to **80 errors**.

## 👤 Report profile — same tenant, user, licence & scope as v8

| | Value |
|---|---|
| **Tenant** | algsoch (`AAD`) · verified domain `algsoch762.onmicrosoft.com` · country `IN` |
| **Tenant ID** | `0aa3a51b-3716-44d7-9636-f85f3db072bf` |
| **User** | vicky kumar · `vickykumar@algsoch762.onmicrosoft.com` |
| **User objectId** | `55bcc9a0-6062-4976-9341-c27579fe09e3` |
| **Licence (SKU)** | **O365_BUSINESS_PREMIUM** · skuId `f245ecc8-75af-4f8e-b61f-27d8114de5f3` · 1 of 25 units consumed |
| **Token scopes** | 128 delegated scopes · audience `https://graph.microsoft.com` |
| **Date run** | 2026-08-08 (re-verification, 12:13–12:20 UTC) |
| **Scope** | Corrective re-run of the 2 untested `item 15` probes from the v8 `test-data` bucket + verification of the corrected seeds |

## 📊 What changed

**v8 said:** `test-data 7` (bogus version id, stale item 15 ×3, wrong team/group seeds, file-not-folder getChildren).

**The correction:**

| Probe | v8 cls | Re-run with valid seed | Corrected cls |
|---|---|---|---|
| `v6-item versions getfields` | test-data | ✅ **pass** — version `1.0` (was bogus `1`) | **test-data (agent-fixable)** |
| `v6-drive listchildren` | test-data | ✅ pass — root (file was not a folder) | **test-data (agent-fixable)** |
| `v6-drive-as-list item getfields` | test-data | ✅ **pass** — OneDrive list item 3 (was stale item 15 on empty Documents drive) | **test-data (agent-fixable)** |
| `v6-getteam` | test-data | ✅ pass — team `b4dd618c` (was wrong seed) | **test-data (agent-fixable)** |
| `v6-getgroup` | test-data | ✅ pass — team `b4dd618c` (was wrong seed) | **test-data (agent-fixable)** |
| `v6-list lastmodifiedby` | test-data | ❌ **500 lastModifiedByUser** — drive-as-list AND site-list routes, valid items | **ms-upstream** |
| `v6-drive-as-list item permissions` | test-data | ❌ **404 itemNotFound** — valid OneDrive items 1/3; site-list variant returns 4 | **spec / catalog** |

**Corrected 7-bucket taxonomy (still sums to 80):**

| Root cause | v8 count | Corrected | Who can fix |
|---|---|---|---|
| 🔒 ms-scope | 24 | **24** | Microsoft / consent update |
| 🌀 ms-upstream | 22 | **23** (+ `lastModifiedByUser` 500) | Microsoft |
| 🚧 graph-constraint | 10 | **10** | Microsoft / connector docs |
| 👤 aad-account | 8 | **8** | Microsoft |
| 🧪 test-data | 7 | **5** | Retest with valid IDs |
| 🔄 delegated-context | 5 | **5** | Microsoft |
| 🐛 spec / catalog | 4 | **5** (+ drive-as-list item permissions 404) | Coral maintainers |
| **Total** | **80** | **80** | |

**Net: 70 of 80 errors are Microsoft-side; only 5 are test-side stale IDs; 3–4 are Coral-fixable catalog issues.**

## 🧯 Why the two probes were NOT test-side

### `v6-list lastmodifiedby` → 500, not a stale-ID pass

The v8 probe used `listitem_id 15` on the **Documents drive** (`b!E_Vekbn…`) — which is empty. Retesting on the **OneDrive** drive-as-list (15 real items) with valid item 3:

```
SELECT * FROM microsoft_graph_v4.drives_list_drives_list_items_getlastmodifiedbyuser(
  drive_id => 'b!TXxe8XfJbEq8f4l8HyCQUsDRiv_kCIlBlaXT1WUG3h9Zge__MON7QaUkoB7leFDq',
  listitem_id => '3')
→ 500 InternalServerError "Error processing response from backend service."
  [GET] /drives/{id}/list/items/3/lastModifiedByUser
```

And the site-list route (valid item 1) also 500s:

```
SELECT * FROM microsoft_graph_v4.sites_list_sites_lists_items_getlastmodifiedbyuser(
  site_id => 'algsoch762.sharepoint.com,915ef513-…,3e018d22-…',
  list_id => 'a4bf845a-22f9-4109-bb88-0ec4e1e6fe4e', listitem_id => '1')
→ 500 InternalServerError [GET] /sites/{id}/lists/{id}/items/1/lastModifiedByUser
```

Both routes 500 on valid items → **upstream Graph backend failure**, same family as the existing `createdByUser` 500s (F4). Not test-side.

### `v6-drive-as-list item permissions` → 404 on valid items, while site-list works

On the valid OneDrive item 3 (and item 1) the route still 404s:

```
SELECT * FROM microsoft_graph_v4.drives_list_drives_list_items_listpermissions(
  drive_id => 'b!TXxe8XfJbEq8f4l8HyCQUsDRiv_kCIlBlaXT1WUG3h9Zge__MON7QaUkoB7leFDq',
  listitem_id => '3')
→ 404 itemNotFound "Item not found" [GET] /drives/{id}/list/items/3/permissions
```

Control — the **site-list** variant returns real rows:

```
SELECT json_length(value) AS n FROM microsoft_graph_v4.sites_list_sites_lists_items_listpermissions(
  site_id => 'algsoch762.sharepoint.com,915ef513-…,3e018d22-…',
  list_id => 'a4bf845a-22f9-4109-bb88-0ec4e1e6fe4e', listitem_id => '1')
→ n=4
```

Valid item, one route family works and the drive-as-list route doesn't → **route-level failure** (join the existing `v6-drive-as-list permissions` 404 in the spec/catalog row). Not test-side.

## ✅ The 5 confirmed test-side probes (all pass with valid seeds)

| Probe | Valid seed | Verbatim result |
|---|---|---|
| `v6-item versions getfields` | version `1.0` | `id=1` |
| `v6-drive listchildren` | root | pass (retest with root: works) |
| `v6-drive-as-list item getfields` | OneDrive item 3 | `id=3` |
| `v6-getteam` | team `b4dd618c` | pass |
| `v6-getgroup` | team `b4dd618c` | pass |

## 🗂️ Seeds verified during this addendum

- **OneDrive (user) drive** `b!TXxe8XfJbEq8f4l8HyCQUsDRiv_kCIlBlaXT1WUG3h9Zge__MON7QaUkoB7leFDq` — drive-as-list has **15 real list items**; item 3 `getfields` → `id=3`; item `lastModifiedByUser` → 500; item `permissions` → 404.
- **Documents drive** `b!E_VekbnXUEKa10cLUoY5LyKNAT5gJzBNp1gdRH0AEZv2ta_X1goSQ4W_5fNayaH1` — drive-as-list is **empty** (`json_length(value)=0`); the v8 `item 15` probes were stale *and* on the wrong (empty) drive.
- **Code Snippets list** `a4bf845a-22f9-4109-bb88-0ec4e1e6fe4e` — site item 1 has a real version `1.0` (getfields `id=1`), and site item permissions return 4 rows.
- `drives_driveitem_drives_listitems` still requires a `filter` arg (400 invalidRequest "The 'filter' query option must be provided") — unchanged from v8, graph-constraint.

## 📜 Re-run command log (verbatim)

#### `v6-item versions getfields` (corrected seed) — `✅ pass`

```sql
SELECT * FROM microsoft_graph_v4.sites_list_sites_lists_items_versions_getfields(
  site_id => 'algsoch762.sharepoint.com,915ef513-d7b9-4250-9ad7-470b5286392f,3e018d22-2760-4d30-a758-1d447d00119b',
  list_id => 'a4bf845a-22f9-4109-bb88-0ec4e1e6fe4e',
  listitem_id => '1', listitemversion_id => '1.0')
```

```
odata_type=null  id=1
```

#### `v6-drive-as-list item getfields` (corrected seed) — `✅ pass`

```sql
SELECT * FROM microsoft_graph_v4.drives_list_drives_list_items_getfields(
  drive_id => 'b!TXxe8XfJbEq8f4l8HyCQUsDRiv_kCIlBlaXT1WUG3h9Zge__MON7QaUkoB7leFDq',
  listitem_id => '3')
```

```
odata_type=null  id=3
```

#### `v6-drive-as-list item listitems` (seed discovery) — `✅ pass`

```sql
SELECT json_length(value) AS n FROM microsoft_graph_v4.drives_list_drives_list_listitems(
  drive_id => 'b!TXxe8XfJbEq8f4l8HyCQUsDRiv_kCIlBlaXT1WUG3h9Zge__MON7QaUkoB7leFDq')
```

```
n=15
```

#### `v6-list lastmodifiedby` (corrected seed) — `❌ 500 ms-upstream`

```sql
SELECT * FROM microsoft_graph_v4.drives_list_drives_list_items_getlastmodifiedbyuser(
  drive_id => 'b!TXxe8XfJbEq8f4l8HyCQUsDRiv_kCIlBlaXT1WUG3h9Zge__MON7QaUkoB7leFDq',
  listitem_id => '3')
```

```
500 InternalServerError "Error processing response from backend service." [GET] /drives/{id}/list/items/3/lastModifiedByUser
```

Site-list control (also 500):

```sql
SELECT * FROM microsoft_graph_v4.sites_list_sites_lists_items_getlastmodifiedbyuser(
  site_id => 'algsoch762.sharepoint.com,915ef513-d7b9-4250-9ad7-470b5286392f,3e018d22-2760-4d30-a758-1d447d00119b',
  list_id => 'a4bf845a-22f9-4109-bb88-0ec4e1e6fe4e', listitem_id => '1')
```

```
500 InternalServerError [GET] /sites/{id}/lists/{id}/items/1/lastModifiedByUser
```

#### `v6-drive-as-list item permissions` (corrected seed) — `❌ 404 spec/catalog`

```sql
SELECT * FROM microsoft_graph_v4.drives_list_drives_list_items_listpermissions(
  drive_id => 'b!TXxe8XfJbEq8f4l8HyCQUsDRiv_kCIlBlaXT1WUG3h9Zge__MON7QaUkoB7leFDq',
  listitem_id => '3')
```

```
404 itemNotFound "Item not found" [GET] /drives/{id}/list/items/3/permissions
```

Site-list control (works — 4 permissions):

```sql
SELECT json_length(value) AS n FROM microsoft_graph_v4.sites_list_sites_lists_items_listpermissions(
  site_id => 'algsoch762.sharepoint.com,915ef513-d7b9-4250-9ad7-470b5286392f,3e018d22-2760-4d30-a758-1d447d00119b',
  list_id => 'a4bf845a-22f9-4109-bb88-0ec4e1e6fe4e', listitem_id => '1')
```

```
n=4
```

#### `v6-drive listitems` (re-confirmed, graph-constraint) — `❌ 400`

```sql
SELECT * FROM microsoft_graph_v4.drives_driveitem_drives_listitems(drive_id => 'b!E_VekbnXUEKa10cLUoY5LyKNAT5gJzBNp1gdRH0AEZv2ta_X1goSQ4W_5fNayaH1', top => 10)
```

```
400 invalidRequest The 'filter' query option must be provided [GET] drives/{id}/items
```

## 🎯 Bottom line

**The v8 headline holds and is now sharpened:** the 80 errors are **70 Microsoft-side, 5 test-side, 3–4 Coral-fixable** — not "69 / 7". Retesting the two never-retested `item 15` probes proved one is an upstream Graph 500 (`lastModifiedByUser`) and one is a route-level failure (drive-as-list item permissions), so **only 5 of 80 are fixed by retesting with valid IDs**. v8's pass/error tallies are unaffected; only the error-class attribution moved. Records updated: this addendum + the `coral-specs-reviewer` skill taxonomy.

- **[HTML](2026-08-08-sharepoint-teams-coral-sql-data-report-v8-test-data-correction.html)** — this addendum, formatted.
- **[MD](2026-08-08-sharepoint-teams-coral-sql-data-report-v8-test-data-correction.md)** — raw.
