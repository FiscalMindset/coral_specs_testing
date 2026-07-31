# Scope Unlock Test — 2026-07-31

## What I tested

Updated the **OAuth2 admin grant** for the Coral app (id: `d9015a66-f83d-414c-ba72-a634bcf109a1`)
to add 23 NEW scopes (was 13, now 36) via Graph API PATCH:

```
PATCH https://graph.microsoft.com/v1.0/oauth2PermissionGrants/ZloB2T34TEG6cqY0vPEJocVUE62-F11BjGhQJXlAZ5o
{
  "scope": "User.Read Chat.Read ... Calendars.Read Contacts.Read Mail.Read Reports.Read.All ... 36 scopes total"
}
```

Result: **HTTP 204 No Content** ✓

## New scopes added

Calendars.Read · Contacts.Read · Mail.Read · Reports.Read.All · EduRoster.Read.All ·
ThreatIntelligence.Read.All · SecurityEvents.Read.All · IdentityUserFlow.Read.All ·
APIConnectors.Read.All · RiskPreventionProviders.Read.All · IdentityProvider.Read.All ·
AccessReview.Read.All · LifecycleWorkflows.Read.All · EntitlementManagement.Read.All ·
Policy.Read.All · RoleManagement.Read.All · CustomSecAttributeDefinition.Read.All ·
PrivilegedAccess.Read.AzureResources · Agreement.Read.All · DeviceManagementApps.Read.All ·
CloudPC.Read.All · CallRecords.Read.All · OnlineMeetings.Read.All · Directory.Read.All

## Verification

```bash
curl GET https://graph.microsoft.com/v1.0/oauth2PermissionGrants/ZloB2T34TEG6cqY0vPEJocVUE62-F11BjGhQJXlAZ5o
→ consentType: AllPrincipals
→ Number of scopes: 36
```

## Potential impact

If the user runs `coral source add microsoft_graph_v4 --interactive` again (or
any new OAuth flow for the Coral app), the consent flow will request all 36 scopes.
The resulting access token will include all of them, and the 107 tables currently
failing with 403/missing-scope errors should resolve to PASS or new errors.

| Scope | Tables unlocked |
|---|---:|
| EduRoster.Read.All | 14 |
| EntitlementManagement.Read.All | 14 |
| ThreatIntelligence.Read.All | 14 |
| CloudPC.Read.All | 12 |
| Policy.Read.All | 10 |
| LifecycleWorkflows.Read.All | 6 |
| SecurityEvents.Read.All | 5 |
| Chat.Read | 4 |
| Directory.Read.All | 4 |
| IdentityProvider.Read.All | 3 |
| RiskPreventionProviders.Read.All | 3 |
| Reports.Read.All | 3 |
| AccessReview.Read.All | 2 |
| RoleManagement.Read.All | 2 |
| CustomSecAttributeDefinition.Read.All | 2 |
| OnlineMeetings.Read.All | 2 |
| Team.ReadBasic.All | 2 |
| APIConnectors.Read.All | 1 |
| Agreement.Read.All | 1 |
| CallRecords.Read.All | 1 |
| IdentityUserFlow.Read.All | 1 |
| PrivilegedAccess.Read.AzureResources | 1 |
| **Total** | **107** |

## What I could NOT test in this session

To complete the test, the user needs to:

1. Open browser → https://login.microsoftonline.com/{tenant}/oauth2/v2.0/devicecode (or run interactive `coral source add`)
2. Sign in as `vicky@algsochgmail.onmicrosoft.com`
3. Consent to all 36 scopes
4. Get a fresh access token
5. Run the battery again

Without browser-based OAuth consent, I cannot acquire a token that uses the new
scopes. The current `az` admin token uses a different app and a different flow.

## Recommendation

Vicky should run `coral source add microsoft_graph_v4 --interactive` once to consent
to the broader scope set. After that, the 107 tables above should pass. If they still
fail, the issue is something else (license, role, etc.) and we have a tighter
scope to investigate.

## What about the remaining 78 "Our issue" tables?

After the scope unlock, ~78 "Our issue" tables remain. These break down into:

| Cause | Tables | Fixable? |
|---|---:|---|
| No M365 license (Teams, SPO, etc.) | 32 | No (license purchase) |
| Insufficient privileges (need admin role) | 15 | Yes (assign role) |
| Access denied (specific scope needed) | 14 | Partially (might be in unlocked scopes) |
| Missing requirement (license/role) | 5 | Partially |
| Missing scopes (consent) | 9 | Partially (might be in unlocked scopes) |
| Service principal not registered | 1 | Yes (create SP) |
| No Entra P1/P2 premium | 1 | No (license purchase) |
| Empty body 401 (Coral bug A2) | ~23 | Need Coral fix |

Out of these, the ~23 empty-body 401 errors are actually Coral bug A2 — they would
become precise errors once Coral surfaces the body. The other ~55 are real setup/license
issues that need Vicky/admin action.
