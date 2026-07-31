# How to consent to all 36 Coral app scopes

## What you need to do

The admin grant for the Coral app has been updated to 36 scopes (was 13).
Now you need to acquire a NEW OAuth token that uses these scopes.

## Option A: Coral CLI interactive (recommended)

This is the cleanest way and will work with the same Coral CLI you're using.

```bash
# Remove the current source
coral source remove microsoft_graph_v4

# Re-add with interactive OAuth flow
coral source add microsoft_graph_v4 --interactive
```

When the browser opens, you'll see Microsoft asking for consent. **Accept all 36 scopes**.

The new token will be stored in your keychain with all 36 scopes.

## Option B: Use a different tool

If you prefer not to use Coral CLI's interactive flow, you can use any OAuth device code flow tool:

1. Open https://login.microsoftonline.com/89de3b75-fef2-44f9-90a4-cf8c69700c83/oauth2/v2.0/devicecode
2. POST with body:
   - `client_id=4eedabf0-b27e-4c98-ac7b-4c7f5d504bee`
   - `scope=<the 36 scopes space-separated>`
3. Visit https://login.microsoft.com/device and enter the code
4. Accept all scopes
5. Use the returned `access_token` as `MS_GRAPH_ACCESS_TOKEN`

## The 36 scopes you need to consent to

(These are the 23 new scopes added beyond the original 13. The 13 originals should already be pre-consented due to the existing AllPrincipals admin grant.)

**Original 13 (probably already consented):**
1. User.Read
2. Chat.Read
3. Chat.ReadBasic
4. Team.ReadBasic.All
5. Channel.ReadBasic.All
6. Files.Read
7. Files.Read.All
8. Sites.Read.All
9. offline_access
10. openid
11. profile
12. email
13. (reserved)

**New 23 (need to consent):**
1. Calendars.Read
2. Contacts.Read
3. Mail.Read
4. Reports.Read.All
5. EduRoster.Read.All
6. ThreatIntelligence.Read.All
7. SecurityEvents.Read.All
8. IdentityUserFlow.Read.All
9. APIConnectors.Read.All
10. RiskPreventionProviders.Read.All
11. IdentityProvider.Read.All
12. AccessReview.Read.All
13. LifecycleWorkflows.Read.All
14. EntitlementManagement.Read.All
15. Policy.Read.All
16. RoleManagement.Read.All
17. CustomSecAttributeDefinition.Read.All
18. PrivilegedAccess.Read.AzureResources
19. Agreement.Read.All
20. DeviceManagementApps.Read.All
21. CloudPC.Read.All
22. CallRecords.Read.All
23. OnlineMeetings.Read.All
24. Directory.Read.All

## What to expect during consent

When the consent screen appears, Microsoft will show all 36 permissions in a list. Some will be:
- "Read your calendars" (Calendars.Read)
- "Read your contacts" (Contacts.Read)
- "Read your mail" (Mail.Read)
- "Read all usage reports" (Reports.Read.All)
- "Read all education rosters" (EduRoster.Read.All)
- "Read all threat intelligence" (ThreatIntelligence.Read.All)
- "Read all security events" (SecurityEvents.Read.All)
- ... and 29 more

Click **Accept** to grant all of them.

Some may require you to "Accept on behalf of your organization" if you're an admin.

## After consent

Run the battery again:

```bash
python3 -u /tmp/run_battery.py > /tmp/battery_v2.log 2>&1 &
```

Then run the 120s timeout retry sweep:

```bash
python3 -u /tmp/run_long_timeout.py > /tmp/long_timeout_v2.log 2>&1 &
```

## Expected outcome

- Before: 129 PASS / 604 FAIL
- After (best case): 236 PASS / 497 FAIL (107 tables unlocked by scopes)
- After (realistic): Some tables will unlock, others will hit license/role issues

If a table still fails after consent, check the new error message — it should now be precise (not the empty-body 401).
