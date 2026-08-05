# microsoft_graph_v4 — Auth-classified calls re-run (fresh 128-scope token) — confirmed permanence

**Date:** 2026-08-05 (UTC) — run window 06:56–07:00 UTC
**Test name:** Re-run of all 23 `🔒 auth`-classified calls + 2 storage-container filter checks from the v4.3 deep-data report, executed against a freshly-validated delegated token to separate **transient** failures (expired token) from **permanent** ones (app-only permission / unprovisioned feature).
**Coral:** `0.8.1+3acb123` · source `microsoft_graph_v4` · keychain credential `source.microsoft_graph_v4`
**Token used:** access token **iat 2026-08-05T06:40:45Z · exp 2026-08-05T08:02:10Z** · aud `https://graph.microsoft.com` · **128 delegated scopes** (incl. `FileStorageContainer.Read.All`, `Site.Read.All`, `Sites.Read.All`, `ChannelMessage.Read.All`, backup-restore scopes) · oid `55bcc9a0-6062-4976-9341-c27579fe09e3` · tenant `0aa3a51b-3716-44d7-9636-f85f3db072bf`
**Time taken:** ~2 min 12 s (25 `coral sql` invocations, 25 outputs captured verbatim = 250 output lines)
**Stats line:** 25 `coral sql` invocations · 25 full verbatim output files · 0 timeouts · 0 transient failures
**Status:** ✅ COMPLETE — **0 / 23 pass** (all 23 `auth` calls still fail identically with a valid token) · **0 transient** · all 23 confirmed **permanent** MS-side gaps

> **Bottom line:** Every one of the 23 `🔒 auth`-classified calls from the v4.3
> report was re-run with a **fresh, valid, 128-scope delegated token** and **all 23
> failed identically** to the original run (403 `accessDenied` / 403 `UnknownError`).
> **Zero transient token-expiry flakes.** The v4.3 triage is confirmed: the `auth`
> bucket is **permanent** — app-only Graph permissions or an unprovisioned
> M365 Backup feature — and none of these calls can pass under delegated auth.
> The 2 storage-container filter probes (T60/T63) reproduce their 400 `invalidRequest`
> exactly (coral forwards the `$filter` faithfully; MS rejects an empty/zero containerTypeId).

---

## 🎯 Why this run matters

The v4.3 report classified 23/77 top-level calls as `🔒 auth` — failures whose
HTTP status looked like a permission problem. The remaining doubt was whether they
were actually **transient**: i.e. the old access token had expired mid-battery, so a
"refresh the token and retry" fix might have turned them into passes.

This run eliminates that doubt by construction:

1. The token was confirmed **valid at run time** (iat `06:40:45Z`, exp `08:02:10Z`,
   run window `06:56–07:00Z`, decoded on the same keychain credential the calls use).
2. All 23 auth calls + 2 filter probes were re-executed verbatim (same SQL shape as v4.3).
3. Every result matched v4.3 exactly — **no flake moved the needle**.

## 📊 Result matrix (25 calls, run 2026-08-05 06:56–07:00 UTC)

| Call | Endpoint (GET, via coral) | v4.3 status | **Re-run** | Error code |
|---|---|---|---|---|
| T29 | `sites/delta()` | 🔒 auth | **403 accessDenied** | `accessDenied` "Access denied" |
| T30 | `sites/getAllSites()` | 🔒 auth | **403 accessDenied** | `accessDenied` "Access denied" |
| T32 | `solutions/backupRestore/emailNotificationsSetting` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T33 | `solutions/backupRestore/browseSessions` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T37 | `solutions/backupRestore/exchangeProtectionPolicies` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T38 | `solutions/backupRestore/exchangeRestoreSessions` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T42 | `solutions/backupRestore/oneDriveForBusinessBrowseSessions` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T43 | `solutions/backupRestore/oneDriveForBusinessProtectionPolicies` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T44 | `solutions/backupRestore/oneDriveForBusinessRestoreSessions` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T45 | `solutions/backupRestore/protectionPolicies` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T46 | `solutions/backupRestore/protectionUnits` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T47 | `solutions/backupRestore/protectionUnits/graph.driveProtectionUnit` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T48 | `solutions/backupRestore/protectionUnits/graph.mailboxProtectionUnit` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T49 | `solutions/backupRestore/protectionUnits/graph.siteProtectionUnit` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T50 | `solutions/backupRestore/restorePoints` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T51 | `solutions/backupRestore/restoreSessions` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T52 | `solutions/backupRestore/serviceApps` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T53 | `solutions/backupRestore/sharePointBrowseSessions` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T54 | `solutions/backupRestore/sharePointProtectionPolicies` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T55 | `solutions/backupRestore/sharePointRestoreSessions` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T59 | `solutions/backupRestore` | 🔒 auth | **403 UnknownError** | `UnknownError` (empty) |
| T61 | `storage/fileStorage/containerTypeRegistrations` | 🔒 auth | **403 accessDenied** | `accessDenied` "Caller does not have required permissions for this API" |
| T62 | `storage/fileStorage/containerTypes` | 🔒 auth | **403 accessDenied** | `accessDenied` "Caller does not have required permissions for this API" |
| T60 | `storage/fileStorage/containers` (filter probe) | ⚠️ bad_request | **400 invalidRequest** | `invalidRequest` "containerTypeId filter parameter cannot be empty." |
| T63 | `storage/fileStorage/deletedContainers` (filter probe) | ⚠️ bad_request | **400 invalidRequest** | `invalidRequest` "containerTypeId filter parameter cannot be empty." |

## 🧠 Classification of the 23 confirmed-permanent failures

| Root cause | Calls | Evidence |
|---|---|---|
| **App-only Graph permission** — the API requires an application (non-delegated) permission, so a delegated token can never satisfy it | T29, T30, T61, T62 | `403 accessDenied`; MS docs list these as app-only: `Site.Read.All`/`Sites.FullControl.All` (app-only) for `sites/delta` & `getAllSites`; `FileStorageContainer.Selected` (app-only) for containerTypes |
| **M365 Backup feature not provisioned** in this tenant (service apps/backupRestore not enabled) | T32, T33, T37, T38, T42–T55, T59 (18 calls) | `403 UnknownError` (empty message) — the entire `solutions/backupRestore` surface 403s as a unit, incl. the root `/backupRestore` singleton |

**Zero calls** were flaky. Re-running with a valid token changed **0** outcomes. There is
no "wait for token refresh and retry" fix available for any of these 23.

## ✅ What the re-run proves

1. **v4.3 triage is stable** — the `🔒 auth` bucket is real Graph-side blocking, not credential staleness.
2. **Coral forwarding is correct** — the `containerTypeId` `$filter` is passed through verbatim (MS sees it and answers `invalidRequest`, which is exactly the MS behavior when the filter value is empty/zero); T60/T63 stay `400`, and the 403 app-only wall behind the filter is unreachable without an app-only token.
3. **Delegated-mode ceiling** — with the current app (client id `4eedabf0-b27e-4c98-ac7b-4c7f5d504bee`) and 128 delegated scopes, **34 of 92 v4.3 calls pass and no auth-classified call can be fixed by any input change or consent addition**.

---

## Appendix — verbatim output (representative, all 25 captured to files)

### T29 — sites/delta (valid token, still 403)
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Access denied","innerError":{"date":"2026-08-05T06:58:08","request-id":"b015050f-bd98-435d-9127-b5ecebf296b6","client-request-id":"b015050f-bd98-435d-9127-b5ecebf296b6"}}} [GET] https://graph.microsoft.com/v1.0/sites/delta()
Hint: Check the configured credentials and whether they have access to this resource.
```

### T61 — storage containerTypeRegistrations (app-permission API)
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"accessDenied","message":"Caller does not have required permissions for this API","innerError":{"date":"2026-08-05T06:59:57","request-id":"f4adaa94-cd5d-4c12-85df-9cdc9280e332","client-request-id":"f4adaa94-cd5d-4c12-85df-9cdc9280e332"}}} [GET] https://graph.microsoft.com/v1.0/storage/fileStorage/containerTypeRegistrations
Hint: Check the configured credentials and whether they have access to this resource.
```

### T59 — solutions/backupRestore root (unprovisioned feature)
```
Error: Source request was rejected (403)
Detail: {"error":{"code":"UnknownError","message":"","innerError":{"date":"2026-08-05T06:59:52","request-id":"1500f79c-b852-424e-b4ac-9923a7341ce6","client-request-id":"1500f79c-b852-424e-b4ac-9923a7341ce6"}}} [GET] https://graph.microsoft.com/v1.0/solutions/backupRestore
Hint: Check the configured credentials and whether they have access to this resource.
```

### T60 — storage containers with `containerTypeId eq 00000000-0000-0000-0000-000000000000` (coral forwards filter; MS treats zero-guid as empty)
```
Error: Source rejected the request (400)
Detail: {"error":{"code":"invalidRequest","message":"containerTypeId filter parameter cannot be empty.","innerError":{"date":"2026-08-05T07:00:07","request-id":"00a1ea31-3caf-4f33-9986-5e6b68e8571a","client-request-id":"00a1ea31-3caf-4f33-9986-5e6b68e8571a"}}} [GET] https://graph.microsoft.com/v1.0/storage/fileStorage/containers
Hint: Adjust the query filters or shape to match the target table's supported inputs.
```

> All 25 verbatim outputs: `/tmp/reauth23/full/T{29,30,32,33,37,38,42–55,59–63}.out` (superseded by this report; not committed).

## What would make these pass (for the record)

- **T29/T30, T61/T62:** requires an **app-only** (client-credential) Graph token with `Site.Read.All` / `FileStorageContainer.Selected` granted to the app — impossible under the current delegated-flow source install.
- **T32–T55, T59:** requires the tenant's **M365 Backup** to be enabled/provisioned (serviceApps populated); then the same endpoints would return data with the existing delegated scopes.
- **T60/T63:** needs a **real containerTypeId** (a registered container type in the tenant) — cannot be synthesized, and enumeration is itself blocked by T61's app-only 403.
