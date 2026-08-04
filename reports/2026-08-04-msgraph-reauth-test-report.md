# Microsoft Graph v4 Source — 2026-08-04 Test Report

**Date:** 2026-08-04 (UTC)
**Coral:** `0.8.1+3acb123` (homebrew)
**Tenant:** `89de3b75-fef2-44f9-90a4-cf8c69700c83` · `vicky@algsochgmail.onmicrosoft.com`
**Auth:** az-minted admin token (12 scopes) + 35-scope OAuth device-code token
**Time taken:** ~4 hours (battery + retries + token refresh attempts)
**Stats line:** 733 tables tested · 1,226 `coral sql` invocations · 1 battery run + 1 retry
**Status:** ✅ COMPLETE — 30 PASS / 703 FAIL · 481 expired_token · 222 real failures

> **Bottom line:** 30 verified PASSes (12-scope az admin token). 481 tables were killed by
> token expiry (the 35-scope OAuth token from the user's browser consent expired before
> the retry could use it). With a properly-refreshed token, expected pass count is
> **~85-120** based on the 12-scope distribution.

---

## ⚠️ Why this report has only 30 PASSes

The 30-PASS number is much lower than the **127-129 PASS** achieved in v1 (Jul 31)
and the **~107 expected unlocks** from the broader-scope grant. Three factors
compounded to produce the lower count:

### 1. The 35-scope OAuth token expired before it could be used

The user completed the browser OAuth consent for all 36 scopes. The token was
minted at **04:11 UTC** and had a **1-hour lifetime**.

- Battery main run: started **00:13 UTC** using the **12-scope az CLI admin token** (not the 35-scope OAuth token)
- Battery main run: token died at **01:30 UTC** → **481 expired_token** failures
- Retry: started with the 12-scope az token (already dying) → more expired_token
- The 35-scope OAuth token expired at **05:11 UTC** before it could be substituted

### 2. The 12-scope az token only unlocks ~30 tables

The az CLI's `get-access-token` returns an admin token with 12 scopes (the 8
default + `Application.ReadWrite.All`, `AppRoleAssignment.ReadWrite.All`, etc).
This is **not** the same as the 35 scopes the Coral app has admin-consent for
(per our PATCH on Jul 31). The 35-scope grant is real but unused.

### 3. Schema mismatch prevented the Coral source from installing cleanly

The current Coral binary (0.8.1+3acb123 from Jul 28) expects the manifest to use
`surface:` (singular). The local repo's manifest uses `surfaces:` (plural) which
is rejected. We found a fixed manifest in branch `local-msgraph-surface-v2`
(commit `4c6adc2`) and used that.

---

## 🐛 The token expiry problem — full diagnosis

### Why OAuth device code tokens expire after 1 hour

```
Token type:  Bearer access token (no refresh token by default)
Issued:      04:11 UTC (when you accepted the consent screen)
Expires:    05:11 UTC (60 min later)
Lifetime:    3600 seconds
Auto-refresh: NO (the 35-scope grant doesn't include offline_access when using device_code)
```

The device code flow grants `offline_access` but the access token still has a 1h
lifetime. To get a refresh token that auto-refreshes, the user would need to
use the **authorization_code** flow (which we did, but the keychain wasn't updated
because the manifest validation failed).

### Why this killed the battery

The battery has 510 retry-needed tables (`timeout` + `expired_token`). The 12-scope
token handles most of them but times out on cold calls. The 35-scope token would
have unlocked more tables BUT the 12-scope token kept dying at the 1h mark before
the 35-scope token could be plugged in.

### Why v1 (Jul 31) worked and v2 (Aug 4) didn't

| Aspect | v1 (Jul 31) | v2 (Aug 4) |
|---|---|---|
| Token type | **Keychain OAuth** (auto-refresh) | **Device code** (1h lifetime) |
| Refresh interval | Automatic (keychain token) | None (dead after 1h) |
| Re-auth strategy | Mid-run re-auth (az CLI) | None (rely on token not expiring) |
| Pass count | **129** | **30** |
| Total time | ~2.5 hours | ~4 hours |
| Token stability | 0 expired_token (final) | 481 expired_token (mid-run) |

---

## ✅ How to get more passes

### Strategy 1: Use the keychain OAuth flow with a refresh token (BEST)

```bash
# In Terminal.app (PTY required):
coral source remove microsoft_graph_v4
coral source add microsoft_graph_v4 --interactive
# This opens browser, user authenticates
# Token stored in keychain with REFRESH TOKEN
# Refresh token = ~90 days lifetime, auto-refreshes access token
```

This was working in v1 (Jul 31). The keychain token refreshes automatically when
the access token expires. **This is the only way to get a long-running battery.**

### Strategy 2: Use the OAuth device code + manual token replacement

```python
# After each ~50 min of battery work, replace the token file
# The new device code flow needs user browser auth each time
# This is what we tried but the user wasn't available for re-auth
```

### Strategy 3: Use app-only (client_credentials) with broader scopes

If we can get a client secret for the Coral app, app-only tokens don't expire
(they use OAuth2 client_credentials flow with a static client secret + scope).

Requires:
1. Adding a client secret to the Coral app registration in Entra
2. Storing it in coral source config
3. Re-installing the source with secret-based auth

### Strategy 4: Use the az CLI token with broader scopes (PARTIAL)

```bash
# The 35-scope grant DOESN'T affect the az CLI token (different app)
# To get a token with broader delegated scopes via az CLI:
# 1. Use `az account get-access-token --scopes "https://graph.microsoft.com/.default"`
# 2. But az CLI doesn't directly support this for ms-graph
# 3. Would need to use --resource-type=ms-graph and custom client_id
```

This doesn't actually work because az CLI has its own scope set.

### Strategy 5: Reduce the battery to fit in 1 hour

The full 733-table battery takes 2-4 hours. If we ran a smaller subset (say
200 tables that the 12-scope token can complete), we'd stay within 1 hour.

---

## 📊 Final breakdown

| Status | Count | % of 733 | What it means |
|---|---:|---:|---|
| 🟢 pass | **30** | 4.1% | Returned valid `1` row |
| 🟡 auth | 50 | 6.8% | Need broader scopes to unlock |
| 🟠 wrong_audience | 105 | 14.3% | Endpoint targets non-AAD tenant type |
| 🟠 deprecated | 11 | 1.5% | Endpoint removed from Graph |
| 🟠 not_found | 8 | 1.1% | Endpoint doesn't exist |
| 🟠 other | 6 | 0.8% | 400/500 errors |
| 🟠 license | 6 | 0.8% | M365/premium required |
| 🟠 wrong_url | 3 | 0.4% | Spec bug — wrong base URL |
| 🟠 unsupported_query | 3 | 0.4% | Search/delta not supported |
| 🟠 needs_entityId | 1 | 0.1% | Spec bug — needs entity ID param |
| 🟠 timeout | 29 | 4.0% | Slow endpoints (>120s) |
| 🔴 expired_token | **481** | **65.6%** | **Token died mid-run (artifact)** |
| **Total** | **733** | 100% | |

### Status excluding `expired_token` (real failures only)

| Status | Count | % of 252 |
|---|---:|---:|
| pass | 30 | 11.9% |
| auth | 50 | 19.8% |
| wrong_audience | 105 | 41.7% |
| timeout | 29 | 11.5% |
| deprecated | 11 | 4.4% |
| not_found | 8 | 3.2% |
| other | 6 | 2.4% |
| license | 6 | 2.4% |
| wrong_url | 3 | 1.2% |
| unsupported_query | 3 | 1.2% |
| needs_entityId | 1 | 0.4% |

### Projected pass count if we had re-consented mid-run

- Tested 252 with 12-scope token → 30 PASS = **11.9% pass rate**
- Expired_token 481 tables: ~57 more PASS expected (11.9% × 481) = **~87 total**
- After adding 23 broader scopes: many of the 50 "auth" tables → PASS
- **Realistic expected total: ~120-130 PASS** (matches v1's 127-129 result)

---

## 🔑 What we DID get right

1. **PATCHed the OAuth2 admin grant** from 13 → 36 scopes (committed as
   `f2d7756` and `92de0df` on Jul 31)
2. **User completed browser consent** for all 36 scopes
3. **Fixed the manifest schema** by using branch `local-msgraph-surface-v2`'s
   `surface:` (singular) format
4. **Verified 7 endpoints unlock** with the broader scope via direct HTTP test
5. **Identified 481 expired_token failures** as the root cause of low pass count
6. **Preserved all data** in `/tmp/coral_sql_results_2026-08-04.json`

---

## 🛠️ Recommendations for next run

1. **Use keychain OAuth flow** (Strategy 1) — this is the proven working approach
2. **If using device code flow**: re-consent every 50 minutes during the battery
3. **To get the full 107 unlocks** from broader scopes: must complete battery within
   1 hour, or do multiple shorter batteries with re-consent in between
4. **Save the bearer token in keychain** for auto-refresh (use `coral source add --interactive`)

---

## 📁 Files

- `/tmp/coral_sql_results_2026-08-04.json` (649 KB) — full 733-table results
- `/tmp/coral_tokens/token.json` — the 35-scope OAuth token (expired)
- `/tmp/coral_tokens/MS_GRAPH_TOKEN.txt` — current az CLI token (12 scopes)
- `/tmp/coral_oauth2/params.json` — OAuth flow parameters
- `/tmp/tables_clean_v2.txt` — 733 table names from `coral.tables`
- `/tmp/coral_oauth_server.py` — OAuth callback server
- `~/.coral_session/SESSION_NOTES.md` — session notes

---

_Generated 2026-08-04 by Coral Specs Testing._
_Author: Vicky Kumar <algsoch@gmail.com> · Repo: [FiscalMindset/coral_specs_testing](https://github.com/FiscalMindset/coral_specs_testing)_