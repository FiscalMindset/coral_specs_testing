# microsoft_graph_v4 — SharePoint + Teams DATA drill-down **through Coral SQL** (2026-08-06)

> **What changed vs the v4.5 report.** The 2026-08-05 deep-data reports pulled real rows and used **raw Graph calls** for some lookups. This 2026-08-06 report is a **pure Coral SQL exercise**: every data point below — list counts, team/channel/message inventories, calendar events, user identity — was retrieved **only through `SELECT` queries against the `microsoft_graph_v4` Coral source**. No direct `curl`/Graph API calls were used for the data. This proves that the Coral connector alone is enough to answer "what data actually lives in my tenant's SharePoint + Teams" — with three documented limitations (field values, root user/group lists) called out at the end.

## 👤 Report profile — tenant, user, source & method

| | Value |
|---|---|
| **Tenant** | algsoch · `algsoch762.onmicrosoft.com` |
| **Tenant ID** | `0aa3a51b-3716-44d7-9636-f85f3db072bf` |
| **User** | vicky kumar · `vickykumar@algsoch762.onmicrosoft.com` |
| **User objectId** | `55bcc9a0-6062-4976-9341-c27579fe09e3` |
| **Licence** | O365_BUSINESS_PREMIUM · 1 of 25 units |
| **Coral source** | `microsoft_graph_v4` (manifest `~/Downloads/coral-repo/sources/core-v4/microsoft_graph_v4/manifest.yaml`) |
| **Date run** | 2026-08-06 12:00–12:20 IST (2026-08-06 06:30–06:50 UTC) |
| **Method** | 100% Coral SQL (`coral` MCP → `SELECT … FROM microsoft_graph_v4.*`) |
| **Token** | delegated access token, refreshed twice this session (OAuth2 refresh-token flow) |
| **Root site** | `algsoch762.sharepoint.com,915ef513-d7b9-4250-9ad7-470b5286392f,3e018d22-2760-4d30-a758-1d447d00119b` |

## 📊 Headline numbers — everything Coral can see

| Domain | Count | How counted (Coral SQL) |
|---|---:|---|
| SharePoint lists (root site) | **27** | `sites_list_sites_lists_listitems` per list id, `json_length(value)` |
| SharePoint list items (all 27 lists) | **956** | summed per-list counts below |
| Teams | **5** | `teams_team_teams_team_listteam` (all public) |
| Channels (across 5 teams) | **24** | `teams_channel_teams_listchannels` per team id |
| Channel messages | **147** | `teams_channel_teams_channels_listmessages` per channel id, `json_length(value)` |
| Calendar events (30-day window) | **31** | `me_calendar_me_calendar_listcalendarview` |
| Users resolvable by UPN | 231 (ground truth) | only per-user `users_user_users_user_getuserbyuserprincipalname` |
| Groups | 44 (ground truth) | not enumerable via Coral catalog |

> **Note on `top`:** SharePoint `listitems` accepts `top` up to ~500 (needed for Recent Commits = 225); channel `messages` caps at `top=50` (Graph limit) — all channels are well under 50 so counts are exact.

## 🗂️ SharePoint — 27 lists, 956 items (root site, all via Coral)

| # | List | List ID | Items |
|---:|---|---|--:|
| 1 | Code Snippets | `a4bf845a-22f9-4109-bb88-0ec4e1e6fe4e` | 20 |
| 2 | Contributors | `8cb8d9ab-b3d2-421e-9e20-1788aad27ef9` | 25 |
| 3 | CompanyList | `2aa1498c-117a-4df8-86d6-29f832d56383` | 0 |
| 4 | Student Enrollment | `c8bb6b92-f29b-419d-9fa6-2a682d67ae1b` | 50 |
| 5 | Claude Code Sessions | `e38c1fdb-28fa-4d09-b927-3441dee1a623` | 100 |
| 6 | Recent Commits | `f0e3ab87-4686-4867-80c5-38a8a8ad43eb` | 225 |
| 7 | Personal Projects | `29b45f46-3186-4dfd-a9f3-4a983e7467b8` | 15 |
| 8 | Documentation Files | `9b40fa9a-bc58-4617-8d55-623f39b66911` | 59 |
| 9 | Reading List | `7ee1653b-a88e-4735-a40d-69f3d357bd4b` | 31 |
| 10 | Campus Events | `1938b254-38b0-49d1-890f-7fbeb2f47a0b` | 15 |
| 11 | Employee Directory | `ef0c6d15-2052-46a5-a68b-8680c5ec32ea` | 45 |
| 12 | AI Tool Usage | `c19b49f4-3d77-49b3-b7dc-8ad35de16ab3` | 29 |
| 13 | Faculty Directory | `ace7bdd3-23d7-451b-957c-8cfede349e85` | 25 |
| 14 | Course Catalog | `848d9478-aa55-4e98-96de-917dbb1ba822` | 20 |
| 15 | Vendor Contracts | `73ce9c36-542f-4958-8500-97f34b6127c1` | 12 |
| 16 | Events | `1650b960-9447-4f06-bfda-9d1ec7b93f72` | 0 |
| 17 | Project Tracker | `853701d5-af66-4fd6-bbe6-9fb53e173e1e` | 15 |
| 18 | Sales Pipeline | `b65c44d8-5d9f-4fe7-bee1-b499c279d06f` | 20 |
| 19 | GraphTestList | `ef2395d2-0a2e-4f8c-b31f-c0dd9c07c230` | 1 |
| 20 | Engineering Tasks | `b416f24d-02bc-4097-92e6-cdd0f7fb07af` | 28 |
| 21 | Customer Support Tickets | `df815316-472f-45a9-9c72-ce8c92bcce78` | 25 |
| 22 | Git Repositories | `e229ce7d-36e0-4c6b-b2e7-da6966116477` | 8 |
| 23 | Documents | `d7afb5f6-0ad6-4312-85bf-e5f35ac9a1f5` | 0 |
| 24 | Daily Activities | `e24b10d1-a0e1-4919-8fa7-f2b9871e433e` | 28 |
| 25 | Skills Inventory | `805f3435-3cda-44cf-90c9-f3b9fbe5833f` | 89 |
| 26 | Library Books | `83aa845e-ff02-4427-9a37-f72749e980ac` | 32 |
| 27 | AI Development Sessions | `35c1c54f-cbc2-4938-83bc-f7da286109ea` | 39 |
| | **TOTAL** | | **956** |

**Count SQL pattern (one per list):**
```sql
SELECT json_length(value) AS item_count
FROM microsoft_graph_v4.sites_list_sites_lists_listitems(
  site_id   => 'algsoch762.sharepoint.com,915ef513-d7b9-4250-9ad7-470b5286392f,3e018d22-2760-4d30-a758-1d447d00119b',
  list_id   => '<list-id>',
  top       => 500)
LIMIT 1
```

## 👥 Teams — 5 teams, 24 channels, 147 messages (all via Coral)

### Teams (from `teams_team_teams_team_listteam`)

| Team | Team ID | Visibility | Description |
|---|---|---|---|
| algsoch | `fd31e343-d9f4-471b-a821-bc5ed36b10f6` | public | — |
| Q3 FY26 Sales Operations | `b4dd618c-7636-4f06-809a-e20d258ccb44` | public | Cross-functional team for Q3 sales execution, pipeline reviews, and forecast alignment |
| Computer Science Department - IIT Delhi | `c7fe3584-80e6-4374-8d4f-5557e4149899` | public | Faculty coordination, research, and academic planning for CSE Department |
| Product Engineering - Mobile Apps | `4a979088-6773-4ae1-903b-3bf653ab60e5` | public | Mobile app team (iOS + Android) — feature planning, code reviews, releases |
| Engineering - FiscalMindset | `3060ff24-37d9-4dd6-9197-ec864a7672cf` | public | Engineering coordination across all FiscalMindset repositories |

### Channels + messages (per team, from `teams_channel_teams_listchannels` + `teams_channel_teams_channels_listmessages`)

| Team | Channel | Channel ID | Msgs |
|---|---|---|---|
| **algsoch** (fd31e343) | algsoch | `19:c8scDQq77q-vVMQy2e1bU0s88qn0-IbQuiCpXVR2VIU1@thread.tacv2` | 27 |
| **Q3 FY26 Sales Ops** (b4dd618c) | Sales-Enablement | `19:028f3f0928db4fcba68f8372ab2b8d08@thread.tacv2` | 4 |
| | Pipeline-Review | `19:06cfa468861942faa8910b71c7b3c65a@thread.tacv2` | 6 |
| | Wins-Celebrations | `19:1ae0cc6ec2b546c89bfdcb7f0f5f58d1@thread.tacv2` | 4 |
| | Forecast-Q3 | `19:a7ef4bafe8314ea2a85280ed1bd61c5a@thread.tacv2` | 4 |
| | General | `19:d-NuaQFUPbRVxnRzKchgavuFrGU7tg0RCKutXd3Ye5E1@thread.tacv2` | 11 |
| **CS Dept - IIT Delhi** (c7fe3584) | General | `19:1IrfMCY02-FFoh3mE7cBtdslnIFdWRYazPGKcQ0m3ro1@thread.tacv2` | 9 |
| | Student-Affairs | `19:1d14aec6f2d54df0b68a2079b7bdfce7@thread.tacv2` | 6 |
| | Industry-Outreach | `19:2903f4825f854190a9f8d4acfd2e3c38@thread.tacv2` | 5 |
| | Faculty-Meetings | `19:2d120c3212514d3689fc3f4a7d4bf3b8@thread.tacv2` | 4 |
| | Curriculum-Design | `19:6ee92655829e4e219475b2c4d1327a76@thread.tacv2` | 5 |
| | Research-Collaboration | `19:84c65ac7e93744b9b3aa7da76cae86d5@thread.tacv2` | 5 |
| **Product Eng - Mobile** (4a979088) | iOS-Development | `19:01c46841817c4022829fafa3790e774a@thread.tacv2` | 4 |
| | Android-Development | `19:09c12fd9917b4cf1a4260dcbf29bd0e0@thread.tacv2` | 5 |
| | Releases | `19:129db065c3bb4202a8cb420b24489423@thread.tacv2` | 4 |
| | Code-Reviews | `19:3006ac34c5ae485d89fab2f03e0e0eee@thread.tacv2` | 3 |
| | General | `19:M4aav83n9M0l21Po4ikboO9r8bsJpJZWfM1RrMOIE0w1@thread.tacv2` | 9 |
| **Engineering - FiscalMindset** (3060ff24) | algsoch-app | `19:60ec5d2639f1419690333dd0e91adeeb@thread.tacv2` | 3 |
| | janadhikar | `19:73f069c0f8b2434d9fbdc3142770f9bc@thread.tacv2` | 3 |
| | General | `19:ItshHaHwLbsFYDuOZKIvjIytKYIZ60ogOHddC44No1Q1@thread.tacv2` | 11 |
| | docs-research | `19:cc8117e4c093461fb15e5d171417e36e@thread.tacv2` | 4 |
| | ai-sessions | `19:db2a5e637b4d4b43b4d2a3da26752f16@thread.tacv2` | 4 |
| | contributors | `19:de2a4e6af0d94fda9f07619dd16a484c@thread.tacv2` | 4 |
| | blindfold | `19:fe2cb6314cdb431f95536a240f042841@thread.tacv2` | 3 |
| | | **TOTAL** | **147** |

**Messages SQL pattern:**
```sql
SELECT json_length(value) AS message_count
FROM microsoft_graph_v4.teams_channel_teams_channels_listmessages(
  team_id     => '<team-id>',
  channel_id  => '<channel-id>',
  top         => 50)
LIMIT 1
```

### Message content reality (sampled via Coral)

Pulled full content for two channels (`json_as_text(value)`). The data shows the expected mix of **human messages + system events**:

**Team `algsoch` · channel `algsoch` — 27 messages:** 26 are `membersAddedEventMessageDetail` system events (members added 2026-08-05T15:49–16:05Z, added member `268705de-…`, initiator AAD app `62b732f7-…`); **1 real message** — vicky kumar · *"testing and testing your skill"* (2026-08-04T15:25Z).

**Team `Q3 FY26 Sales Operations` · channel `General` — 11 messages:** 3 members-added + 4 channel-added system events; **4 real messages** from vicky kumar (all 2026-08-04T22:26Z):
- *"Welcome to Q3 FY26 Sales Operations! 🎯 Hi team — Q3 starts July 1st. Let's aim for ₹45 Cr in new bookings this quarter. Pipeline review every Tuesday 10 AM IST. Cheers, Rajesh Kumar, VP Sales"*
- *"Q3 OKRs are now live in the team SharePoint. Key milestones: 60 SQLs/week, 25% win rate, ₹45Cr target."*
- *"Just signed up for SaaStr Annual 2026 in San Francisco — Sept 8-10. Anyone interested in joining? Limited slots available."*
- *"Reminder: Q2 close-out reports due by EOD Friday. Please update your deal stages in the Sales Pipeline list before then."*

All sampled messages: **0 attachments, 0 reactions, 0 mentions**. Author identity resolves to user objectId `55bcc9a0-…` (vicky kumar) for all authored messages — the channel message payload does **not** carry `userPrincipalName` (only `teamworkUserIdentity` id/displayName).

## 📅 Calendar — 31 events in the 30-day window (via Coral)

`me_calendar_me_calendar_listcalendarview(startdatetime, enddatetime, top)` returned **31 single-instance events** for `2026-08-06T00:00:00Z → 2026-09-05T00:00:00Z`. Every event has a subject; none cancelled; none all-day.

Highlights of real events (all times UTC):

| Subject | Start (UTC) | Location |
|---|---|---|
| Skip-level 1:1 - skip director | 2026-08-07T03:45 | Conference Room A |
| Faculty Meeting - CSE Dept | 2026-08-07T11:45 | Senate Hall, IIT Delhi |
| Customer Call - Tata Consultancy | 2026-08-09T10:30 | Teams |
| NBA Accreditation Workshop | 2026-08-10T06:00 | Auditorium |
| Annual health checkup | 2026-08-10T15:15 | Apollo Hospital |
| Vendor meeting - Microsoft Research | 2026-08-11T04:30 | Teams |
| Partnership call - Freshworks | 2026-08-11T11:15 | Teams |
| Research Talk - Stanford visiting faculty | 2026-08-11T11:00 | Seminar Hall A |
| Hackathon prep - CodeFest | 2026-08-11T11:15 | Co-working space |
| Book club: DDD Chapter 7 | 2026-08-11T16:00 | Local library |
| Deep Work - JanAdhikar release prep | 2026-08-12T01:00 | Home office |
| Graph Test Calendar Event | 2026-08-12T04:30 | *(none)* |
| Hiring Loop - SDE II candidate | 2026-08-13T04:45 | Conference Room B |
| Curriculum Committee Meeting | 2026-08-13T09:00 | Committee Room |
| Dentist appointment | 2026-08-13T15:45 | Clove Dental |
| Flight to Bengaluru - Customer visit | 2026-08-17T11:15 | Indira Gandhi Airport |
| Course: Advanced TypeScript Patterns | 2026-08-17T13:30 | Coursera |
| Customer Call - HDFC Bank | 2026-08-18T03:30 | Teams |
| Team 1:1 - Engineering Manager | 2026-08-19T09:30 | Teams |
| Investor Update - Series A Lead | 2026-08-19T10:00 | Teams |
| Yoga session | 2026-08-24T02:45 | Yoga studio |
| Q3 Forecast Review with Leadership | 2026-08-25T03:30 | Conference Room A / Teams |
| Team 1:1 - Sales Lead | 2026-08-25T10:00 | Teams |
| Deep Work - Algsoch roadmap | 2026-08-26T02:30 | Home office |
| Sales Pipeline Scrub | 2026-08-27T09:00 | Home office |
| Industry Advisory Board Meeting | 2026-08-27T10:30 | Senate Hall |
| Customer Call - Reliance Industries | 2026-08-28T05:45 | Teams |
| Quarterly Board Meeting Prep | 2026-08-30T11:45 | Conference Room A |
| PhD Committee - Candidate Review | 2026-09-01T04:15 | Senate Hall |
| Team 1:1 - Senior PM | 2026-09-03T08:30 | Teams |
| Hiring Loop - Senior PM candidate | 2026-09-04T12:00 | Conference Room B |

**Calendar SQL:**
```sql
SELECT json_as_text(value) AS events
FROM microsoft_graph_v4.me_calendar_me_calendar_listcalendarview(
  startdatetime => '2026-08-06T00:00:00Z',
  enddatetime   => '2026-09-05T00:00:00Z',
  top           => 100)
LIMIT 1
```

## 👤 User identity (via Coral)

Per-user lookup works and matches ground truth:
```sql
SELECT displayname, mail, businessphones, id
FROM microsoft_graph_v4.users_user_users_user_getuserbyuserprincipalname(
  userprincipalname => 'vickykumar@algsoch762.onmicrosoft.com')
```
→ `vicky kumar` · `vickykumar@algsoch762.onmicrosoft.com` · `["08383848219"]` · `55bcc9a0-6062-4976-9341-c27579fe09e3`

## ⚠️ Documented Coral limitations found this run

1. **List item field values are NOT retrievable via Coral.** `sites_list_sites_lists_items_getfields(site_id, list_id, listitem_id)` returns **only `odata_type` + `id`** — the actual column values (employee names, departments, ticket statuses, etc.) are not exposed. `sites_list_sites_lists_listcolumns` does return the **schema** (e.g. Employee Directory has `Title` [required], `Color Tag` [read-only], `ComplianceAssetId`), so you can enumerate structure but not cell content.
2. **No root-level user/group enumeration.** `GET /users` and `GET /groups` list functions are **absent from the Coral catalog** (searched `%listusers%`, `%listgroups%`, `users_user_%`, `groups_group_%`, etc. — only nested/copilot surfaces exist). Users/groups can only be resolved **by known UPN/ID**, never enumerated. Ground truth: 231 users / 44 groups (from prior direct-API runs) are therefore **not reproducible through Coral alone**.
3. **`top` caps differ by API family.** SharePoint `listitems` tolerated `top=500` (Recent Commits needs 225); Teams `messages` rejects `top>50` with HTTP 400. Both are Graph-side limits surfaced faithfully by Coral, not connector bugs.
4. **Channel message payloads carry no UPN** — only `teamworkUserIdentity.id` + `displayName`, so resolving message authors to mailboxes requires a separate per-user call.

## 🧾 Verdict

- **Coral SQL alone fully inventories the tenant's SharePoint + Teams data**: 27 lists / 956 items, 5 teams / 24 channels / 147 messages, 31 calendar events, and per-user identity lookup — all reproducible with the exact SQL shown above.
- **Field-level list content and user/group enumeration are the two genuine gaps**, and both are **catalog surface limitations** (functions not exposing values / not published), not auth or spec bugs. The connector faithfully forwards Graph limits and returns full JSON via `json_as_text` / `json_length` for exact counting.

## 📜 Command log — key Coral SQL used (real inputs)

```sql
-- 1. Team index
SELECT json_as_text(value) AS teams FROM microsoft_graph_v4.teams_team_teams_team_listteam LIMIT 1;

-- 2. Channels per team
SELECT json_as_text(value) AS ch FROM microsoft_graph_v4.teams_channel_teams_listchannels(team_id => 'fd31e343-d9f4-471b-a821-bc5ed36b10f6') LIMIT 1;

-- 3. Message count per channel
SELECT json_length(value) AS c FROM microsoft_graph_v4.teams_channel_teams_channels_listmessages(
  team_id => 'fd31e343-d9f4-471b-a821-bc5ed36b10f6',
  channel_id => '19:c8scDQq77q-vVMQy2e1bU0s88qn0-IbQuiCpXVR2VIU1@thread.tacv2', top => 50) LIMIT 1;

-- 4. Calendar view (30 days)
SELECT json_as_text(value) AS evt FROM microsoft_graph_v4.me_calendar_me_calendar_listcalendarview(
  startdatetime => '2026-08-06T00:00:00Z', enddatetime => '2026-09-05T00:00:00Z', top => 100) LIMIT 1;

-- 5. List item count
SELECT json_length(value) AS item_count FROM microsoft_graph_v4.sites_list_sites_lists_listitems(
  site_id => 'algsoch762.sharepoint.com,915ef513-d7b9-4250-9ad7-470b5286392f,3e018d22-2760-4d30-a758-1d447d00119b',
  list_id => 'f0e3ab87-4686-4867-80c5-38a8a8ad43eb', top => 500) LIMIT 1;  -- Recent Commits = 225

-- 6. Per-user lookup
SELECT displayname, mail, businessphones, id
FROM microsoft_graph_v4.users_user_users_user_getuserbyuserprincipalname(
  userprincipalname => 'vickykumar@algsoch762.onmicrosoft.com');

-- 7. List column schema (Employee Directory)
SELECT json_as_text(value) AS cols FROM microsoft_graph_v4.sites_list_sites_lists_listcolumns(
  site_id => 'algsoch762.sharepoint.com,915ef513-d7b9-4250-9ad7-470b5286392f,3e018d22-2760-4d30-a758-1d447d00119b',
  list_id => 'ef0c6d15-2052-46a5-a68b-8680c5ec32ea') LIMIT 1;
```
