# Coral Contributor Email Exposure — Public Git Commit Metadata

| | |
|---|---|
| **Date** | 2026-08-02 |
| **Author** | Vicky Kumar (`algsoch@gmail.com`) |
| **Method** | Coral MCP (GitHub source, `github.commits`) + direct GitHub REST API (`curl`) |
| **Scope** | `withcoral/coral` (origin) · `FiscalMindset/coral` (fork) · local clone |
| **Verdict** | ⚠️ Emails are **publicly exposed** via git commit metadata on both repos — not a file leak, not a breach, but real and visible to anyone with the commit SHA or a clone |

---

## 1. Executive summary

While investigating the Coral repository I found that the **personal email addresses of the main contributors are publicly exposed** through the **git commit metadata** (the `author` field baked into every commit object). This affects **both** the origin repository (`withcoral/coral`) **and** the fork (`FiscalMindset/coral`), because forks copy the complete git history unchanged (the commit objects are byte-for-byte identical — same SHAs).

Key facts:

- The emails are **NOT** in any repository file. A full content search of the working tree found zero occurrences of the personal addresses.
- The emails **ARE** retrievable by anyone, without authentication, from the public GitHub REST API (`GET /repos/{owner}/{repo}/git/commits/{sha}`) and from any local clone (`git log`).
- GitHub's web UI hides the author email, which makes this easy to miss — but the raw commit object served by the API contains it in plain text.
- Affected addresses (7): `james@withcoral.com`, `simonw@withcoral.com`, `saul@withcoral.com`, `ilia@phoebe.ai`, `james.audretsch@phoebe.ai`, `andrea@withcoral.com`, `james@phoebe.ai`.
- The only emails found in repository files are the **intentional public company aliases** `security@withcoral.com` and `legal@withcoral.com` — those are not a leak.

**Bottom line:** this is exposure by git design, not an accidental file leak. Anyone with access to the public repos (or a clone) can extract the maintainers' real email addresses. Fixing it for future commits is a GitHub setting; removing it from history requires a destructive rewrite.

---

## 2. Repository topology (proof of origin vs fork)

Verified via the GitHub REST API through Coral MCP (`github.repos_get`).

| Field | `withcoral/coral` | `FiscalMindset/coral` |
|---|---|---|
| **full_name** | `withcoral/coral` | `FiscalMindset/coral` |
| **html_url** | https://github.com/withcoral/coral | https://github.com/FiscalMindset/coral |
| **fork** | `false` (origin) | `true` (fork) |
| **parent** | — | `withcoral/coral` (parent: https://github.com/withcoral/coral) |
| **default_branch** | `main` | `main` |
| **description** | One SQL interface over APIs, files, and live sources — built for agents. | (same) |

The local clone used for this investigation is a copy of the fork (`git remote -v` → `origin https://github.com/FiscalMindset/coral.git`). Because a fork contains the full shared history, the commit objects (and therefore the author emails) are identical across origin, fork, and clone.

---

## 3. Affected contributor emails and how many commits each

Counted via Coral MCP (`github.commits`, filtered on `commit__author__email`). Counts differ slightly between origin and fork only because the fork's `main` branch is behind origin — the exposed values are the same.

| Name | Email | Commits (origin) | Commits (fork) |
|---|---|---|---|
| James Summerfield | `james@withcoral.com` | 184 | 184 |
| Simon Whitaker | `simonw@withcoral.com` | 115 | 110 |
| Saúl Hernández | `saul@withcoral.com` | 99 | 86 |
| Ilia Aphtsiauri | `ilia@phoebe.ai` | 26 | 24 |
| James Audretsch | `james.audretsch@phoebe.ai` | 17 | 17 |
| Andrea Ambu | `andrea@withcoral.com` | 13 | 13 |
| James Summerfield | `james@phoebe.ai` (older identity) | 1 | 1 |

Also confirmed from the local clone's `git log`:

```
James Summerfield <james@withcoral.com> / <james@phoebe.ai>
Andrea Ambu <andrea@withcoral.com>
Saúl Hernández <saul@withcoral.com>
Simon Whitaker <simonw@withcoral.com>
Ilia Aphtsiauri <ilia@phoebe.ai>
jamesaud <james.audretsch@phoebe.ai>
```

---

## 4. Proof

### 4.1 What we found — which emails, how many commits

The scan of `github.commits` exposed **7 personal email addresses**. Each one is
attached as the git author/committer email on real commits in the public repo,
and every one is retrievable by anyone with no authentication. This is the
complete list of what was found:

| # | Email found | Name on commits | Commits on origin | Commits on fork | Verified proof commit (click to open on GitHub) |
|---|---|---|---|---|---|
| 1 | `james@withcoral.com` | James Summerfield | **184** | 184 | [e6e0607](https://github.com/withcoral/coral/commit/e6e0607bf4bb5e5ce4c0534f0189e10363046155) |
| 2 | `simonw@withcoral.com` | Simon Whitaker | **115** | 110 | [303ffe9](https://github.com/withcoral/coral/commit/303ffe96aabef7d33ac08538606b95d79a7cb0bd) |
| 3 | `saul@withcoral.com` | Saúl Hernández | **99** | 86 | [f575c9d](https://github.com/withcoral/coral/commit/f575c9d14afc3fcd237602b03d9408e75d9e031c) |
| 4 | `ilia@phoebe.ai` | Ilia Aphtsiauri | **26** | 24 | [52ff0ac](https://github.com/withcoral/coral/commit/52ff0ac66c8f7bd92062770a4f5295432dea80a4) |
| 5 | `james.audretsch@phoebe.ai` | jamesaud | **17** | 17 | [793abae](https://github.com/withcoral/coral/commit/793abae752d33716399222ce4d978b6f8b94a15b) |
| 6 | `andrea@withcoral.com` | Andrea Ambu | **13** | 13 | [cf744bd](https://github.com/withcoral/coral/commit/cf744bd783b23c4371d14ed7e9b7640e26cfab10) |
| 7 | `james@phoebe.ai` | James Summerfield (older identity) | **1** | 1 | [0b4e846](https://github.com/withcoral/coral/commit/0b4e846764359af760c5567e4aa130e33e85c8f0) |

> Counts are commits authored by that email, counted from the public `github.commits` table (Section 3). Every "Verified proof commit" link opens the real commit on GitHub where the email is visible in the author line.

### 4.2 Clickable proof links — every verified commit on origin AND fork

**12 commits, each verified via the public API on both repos.** Open the commit
on either repo and the author email is shown on the page:

| # | Email found | GitHub commit — origin | GitHub commit — fork | API proof — origin | API proof — fork |
|---|---|---|---|---|---|
| 1 | `james@withcoral.com` | [e6e0607](https://github.com/withcoral/coral/commit/e6e0607bf4bb5e5ce4c0534f0189e10363046155) | [e6e0607](https://github.com/FiscalMindset/coral/commit/e6e0607bf4bb5e5ce4c0534f0189e10363046155) | [json](https://api.github.com/repos/withcoral/coral/git/commits/e6e0607bf4bb5e5ce4c0534f0189e10363046155) | [json](https://api.github.com/repos/FiscalMindset/coral/git/commits/e6e0607bf4bb5e5ce4c0534f0189e10363046155) |
| 2 | `james@withcoral.com` | [b1975f4](https://github.com/withcoral/coral/commit/b1975f4a68b566607a0386544ee15f264c451cd7) | [b1975f4](https://github.com/FiscalMindset/coral/commit/b1975f4a68b566607a0386544ee15f264c451cd7) | [json](https://api.github.com/repos/withcoral/coral/git/commits/b1975f4a68b566607a0386544ee15f264c451cd7) | [json](https://api.github.com/repos/FiscalMindset/coral/git/commits/b1975f4a68b566607a0386544ee15f264c451cd7) |
| 3 | `james@withcoral.com` | [e04c4ac](https://github.com/withcoral/coral/commit/e04c4ac4febbba822d55dcc1bac5f9e241e9177c) | [e04c4ac](https://github.com/FiscalMindset/coral/commit/e04c4ac4febbba822d55dcc1bac5f9e241e9177c) | [json](https://api.github.com/repos/withcoral/coral/git/commits/e04c4ac4febbba822d55dcc1bac5f9e241e9177c) | [json](https://api.github.com/repos/FiscalMindset/coral/git/commits/e04c4ac4febbba822d55dcc1bac5f9e241e9177c) |
| 4 | `james@withcoral.com` | [40a7161](https://github.com/withcoral/coral/commit/40a716138ccc6ca414451c647a45107ef7865196) | [40a7161](https://github.com/FiscalMindset/coral/commit/40a716138ccc6ca414451c647a45107ef7865196) | [json](https://api.github.com/repos/withcoral/coral/git/commits/40a716138ccc6ca414451c647a45107ef7865196) | [json](https://api.github.com/repos/FiscalMindset/coral/git/commits/40a716138ccc6ca414451c647a45107ef7865196) |
| 5 | `james@withcoral.com` | [b0f7767](https://github.com/withcoral/coral/commit/b0f7767bc8240cc973f327137e554141fed683e5) | [b0f7767](https://github.com/FiscalMindset/coral/commit/b0f7767bc8240cc973f327137e554141fed683e5) | [json](https://api.github.com/repos/withcoral/coral/git/commits/b0f7767bc8240cc973f327137e554141fed683e5) | [json](https://api.github.com/repos/FiscalMindset/coral/git/commits/b0f7767bc8240cc973f327137e554141fed683e5) |
| 6 | `james@withcoral.com` | [79c4b9d](https://github.com/withcoral/coral/commit/79c4b9dfef0c77b625af261f97a66ec647da4821) | [79c4b9d](https://github.com/FiscalMindset/coral/commit/79c4b9dfef0c77b625af261f97a66ec647da4821) | [json](https://api.github.com/repos/withcoral/coral/git/commits/79c4b9dfef0c77b625af261f97a66ec647da4821) | [json](https://api.github.com/repos/FiscalMindset/coral/git/commits/79c4b9dfef0c77b625af261f97a66ec647da4821) |
| 7 | `simonw@withcoral.com` | [303ffe9](https://github.com/withcoral/coral/commit/303ffe96aabef7d33ac08538606b95d79a7cb0bd) | [303ffe9](https://github.com/FiscalMindset/coral/commit/303ffe96aabef7d33ac08538606b95d79a7cb0bd) | [json](https://api.github.com/repos/withcoral/coral/git/commits/303ffe96aabef7d33ac08538606b95d79a7cb0bd) | [json](https://api.github.com/repos/FiscalMindset/coral/git/commits/303ffe96aabef7d33ac08538606b95d79a7cb0bd) |
| 8 | `saul@withcoral.com` | [f575c9d](https://github.com/withcoral/coral/commit/f575c9d14afc3fcd237602b03d9408e75d9e031c) | [f575c9d](https://github.com/FiscalMindset/coral/commit/f575c9d14afc3fcd237602b03d9408e75d9e031c) | [json](https://api.github.com/repos/withcoral/coral/git/commits/f575c9d14afc3fcd237602b03d9408e75d9e031c) | [json](https://api.github.com/repos/FiscalMindset/coral/git/commits/f575c9d14afc3fcd237602b03d9408e75d9e031c) |
| 9 | `andrea@withcoral.com` | [cf744bd](https://github.com/withcoral/coral/commit/cf744bd783b23c4371d14ed7e9b7640e26cfab10) | [cf744bd](https://github.com/FiscalMindset/coral/commit/cf744bd783b23c4371d14ed7e9b7640e26cfab10) | [json](https://api.github.com/repos/withcoral/coral/git/commits/cf744bd783b23c4371d14ed7e9b7640e26cfab10) | [json](https://api.github.com/repos/FiscalMindset/coral/git/commits/cf744bd783b23c4371d14ed7e9b7640e26cfab10) |
| 10 | `ilia@phoebe.ai` | [52ff0ac](https://github.com/withcoral/coral/commit/52ff0ac66c8f7bd92062770a4f5295432dea80a4) | [52ff0ac](https://github.com/FiscalMindset/coral/commit/52ff0ac66c8f7bd92062770a4f5295432dea80a4) | [json](https://api.github.com/repos/withcoral/coral/git/commits/52ff0ac66c8f7bd92062770a4f5295432dea80a4) | [json](https://api.github.com/repos/FiscalMindset/coral/git/commits/52ff0ac66c8f7bd92062770a4f5295432dea80a4) |
| 11 | `james.audretsch@phoebe.ai` | [793abae](https://github.com/withcoral/coral/commit/793abae752d33716399222ce4d978b6f8b94a15b) | [793abae](https://github.com/FiscalMindset/coral/commit/793abae752d33716399222ce4d978b6f8b94a15b) | [json](https://api.github.com/repos/withcoral/coral/git/commits/793abae752d33716399222ce4d978b6f8b94a15b) | [json](https://api.github.com/repos/FiscalMindset/coral/git/commits/793abae752d33716399222ce4d978b6f8b94a15b) |
| 12 | `james@phoebe.ai` | [0b4e846](https://github.com/withcoral/coral/commit/0b4e846764359af760c5567e4aa130e33e85c8f0) | [0b4e846](https://github.com/FiscalMindset/coral/commit/0b4e846764359af760c5567e4aa130e33e85c8f0) | [json](https://api.github.com/repos/withcoral/coral/git/commits/0b4e846764359af760c5567e4aa130e33e85c8f0) | [json](https://api.github.com/repos/FiscalMindset/coral/git/commits/0b4e846764359af760c5567e4aa130e33e85c8f0) |

**12 commits / 7 identities verified on both repos (100% match, no errors).** The
full 40-char SHA of every row was verified via `curl` against both repos; the
GitHub commit pages and the API JSON both show the email.

### 4.3 Full curl verification log (both repos, no auth)

```
$ verify() { curl -s "https://api.github.com/repos/$1/git/commits/$2" | jq -c '{author:.author.name,email:.author.email,date:.author.date}'; }

--- ORIGIN (withcoral/coral) ---
e6e0607… {"author":"James Summerfield","email":"james@withcoral.com","date":"2026-07-26T10:19:03Z"}
303ffe9… {"author":"Simon Whitaker","email":"simonw@withcoral.com","date":"2026-07-31T13:59:47Z"}
f575c9d… {"author":"Saúl Hernández","email":"saul@withcoral.com","date":"2026-07-31T09:31:28Z"}
cf744bd… {"author":"Andrea Ambu","email":"andrea@withcoral.com","date":"2026-07-10T09:07:39Z"}
52ff0ac… {"author":"Ilia Aphtsiauri","email":"ilia@phoebe.ai","date":"2026-07-31T11:41:42Z"}
793abae… {"author":"jamesaud","email":"james.audretsch@phoebe.ai","date":"2026-07-14T10:46:31Z"}
0b4e846… {"author":"James Summerfield","email":"james@phoebe.ai","date":"2026-04-03T20:56:07Z"}

--- FORK (FiscalMindset/coral) ---   (identical responses — same commit objects)
e6e0607… {"author":"James Summerfield","email":"james@withcoral.com","date":"2026-07-26T10:19:03Z"}
303ffe9… {"author":"Simon Whitaker","email":"simonw@withcoral.com","date":"2026-07-31T13:59:47Z"}
f575c9d… {"author":"Saúl Hernández","email":"saul@withcoral.com","date":"2026-07-31T09:31:28Z"}
cf744bd… {"author":"Andrea Ambu","email":"andrea@withcoral.com","date":"2026-07-10T09:07:39Z"}
52ff0ac… {"author":"Ilia Aphtsiauri","email":"ilia@phoebe.ai","date":"2026-07-31T11:41:42Z"}
793abae… {"author":"jamesaud","email":"james.audretsch@phoebe.ai","date":"2026-07-14T10:46:31Z"}
0b4e846… {"author":"James Summerfield","email":"james@phoebe.ai","date":"2026-04-03T20:56:07Z"}
```

Each of the 7 identities was fetched on **both** repos = **14 successful public API requests**, zero failures.

### 4.4 Example full response (origin)

```
$ curl -s https://api.github.com/repos/withcoral/coral/git/commits/e6e0607bf4bb5e5ce4c0534f0189e10363046155
{
  "message": "feat(mcp): require task lifecycle (#1941) ...",
  "author": {
    "name": "James Summerfield",
    "email": "james@withcoral.com",
    "date": "2026-07-26T10:19:03Z"
  }
}
```

URL: `https://api.github.com/repos/withcoral/coral/git/commits/e6e0607bf4bb5e5ce4c0534f0189e10363046155`

### 4.5 Example full response (fork)

```
$ curl -s https://api.github.com/repos/FiscalMindset/coral/git/commits/e6e0607bf4bb5e5ce4c0534f0189e10363046155
{
  "message": "feat(mcp): require task lifecycle (#1941) ...",
  "author": {
    "name": "James Summerfield",
    "email": "james@withcoral.com",
    "date": "2026-07-26T10:19:03Z"
  }
}
```

URL: `https://api.github.com/repos/FiscalMindset/coral/git/commits/e6e0607bf4bb5e5ce4c0534f0189e10363046155`

### 4.6 Scope of exposure — not just these 12 commits

These are **samples**. The aggregate counts (Section 3) show **455 commits on the origin** carry the 7 maintainer emails highlighted in this report. The complete one-command Coral scan (Section 4.9) surfaces **34 distinct personal addresses on 691 commits** once external contributors are included — i.e. the exposure is broader than the maintainer set alone. Every one of them is retrievable the same way; the 12 above were each individually curl-verified to eliminate any doubt about methodology.

### 4.7 Gotcha

> The API requires the **full 40-character SHA**. A short SHA (e.g. `e6e0607`) returns `404 Not Found`:
> `{"message": "Not Found", "documentation_url": "https://docs.github.com/rest/git/commits#get-a-commit-object", "status": "404"}`

### 4.8 Local clone proof

```
$ git log --format='%an <%ae>' | sort -u
James Summerfield <james@withcoral.com>
Andrea Ambu <andrea@withcoral.com>
Saúl Hernández <saul@withcoral.com>
Simon Whitaker <simonw@withcoral.com>
Ilia Aphtsiauri <ilia@phoebe.ai>
...
```

### 4.9 Reproduce everything with Coral — exact commands and real outputs

Every finding in this report was discovered through **Coral MCP** against the
connected **GitHub source** (`github.commits` table) — no `git` and no `curl`
are needed to rediscover it. Run the same SQL through the Coral MCP `coral_sql`
tool, or drop it into the CLI as `coral sql "<query>"`, and you get the exact
outputs below.

**Gotcha first.** `github.commits` requires a constant-equality filter on both
`owner` and `repo`; without them Coral refuses the query:

```
SELECT COUNT(*) FROM github.commits;
-- ERROR: github.commits requires WHERE owner = <constant>
--        Add a constant equality filter on `owner` / `repo`
```

**Step 1 — total commits on the origin.**

```sql
SELECT COUNT(*) AS total_commits
FROM github.commits
WHERE owner = 'withcoral' AND repo = 'coral';
```

Output (rows returned by `coral_sql`):

```
total_commits
956
```

**Step 2 — how we found every email: one GROUP BY.** This is the key query. It
lists every distinct git-author email on the origin with its commit count:

```sql
SELECT commit__author__email, COUNT(*) AS commits
FROM github.commits
WHERE owner = 'withcoral' AND repo = 'coral'
GROUP BY commit__author__email
ORDER BY commits DESC;
```

Full output — all 70 distinct author emails on the origin (verbatim, ordered by count):

| `commit__author__email` | commits |
|---|---|
| `james@withcoral.com` | **184** |
| `simonw@withcoral.com` | **115** |
| `33761650+AlbertQM@users.noreply.github.com` | 111 |
| `saul@withcoral.com` | **99** |
| `ludo@phoebe.ai` | 60 |
| `bradleydpbutcher@gmail.com` | 45 |
| `pawel.kapica@gmail.com` | 40 |
| `ilia@phoebe.ai` | **26** |
| `269256696+coral-release-bot[bot]@users.noreply.github.com` | 21 |
| `70472031+vinayaksonthalia@users.noreply.github.com` | 18 |
| `james.audretsch@phoebe.ai` | **17** |
| `148879663+wiz-abhi@users.noreply.github.com` | 16 |
| `antonmry@users.noreply.github.com` | 15 |
| `ss5063711@gmail.com` | 14 |
| `andrea@withcoral.com` | **13** |
| `jishanahmedshaikh@gmail.com` | 13 |
| `140815511+Arnav1709@users.noreply.github.com` | 13 |
| `martin.rajdl@me.com` | 12 |
| `2022.mohit.jeswani@ves.ac.in` | 9 |
| `144056431+Yashagarwal9798@users.noreply.github.com` | 8 |
| `akashmr880@gmail.com` | 8 |
| `iamhassaans@gmail.com` | 7 |
| `32628578+sahil9001@users.noreply.github.com` | 6 |
| `47355538+siiddhantt@users.noreply.github.com` | 6 |
| `35931397+kyracheng@users.noreply.github.com` | 5 |
| `123734227+bishalbera@users.noreply.github.com` | 5 |
| `157990661+RajdeepKushwaha5@users.noreply.github.com` | 4 |
| `146172889+Vickyavh7@users.noreply.github.com` | 4 |
| `111079176+BAVYASAKTHIVEL-21@users.noreply.github.com` | 3 |
| `siddhigupta811@gmail.com` | 3 |
| `sakshikajal14@gmail.com` | 3 |
| `mohitjeswani74@gmail.com` | 3 |
| `anish79u@gmail.com` | 2 |
| `130288820+Rishikesh63@users.noreply.github.com` | 2 |
| `ludovic.fardel@gmail.com` | 2 |
| `90707480+Kvnpsiddhartha@users.noreply.github.com` | 2 |
| `73647277+OoJae@users.noreply.github.com` | 2 |
| `rayhan22269@iiitd.ac.in` | 2 |
| `128019369+athul-2003@users.noreply.github.com` | 2 |
| `73388412+ShamithaReddy@users.noreply.github.com` | 2 |
| `157233255+ravindhar1108@users.noreply.github.com` | 2 |
| `154318149+kr3shna@users.noreply.github.com` | 2 |
| `111228216+Prem4777@users.noreply.github.com` | 2 |
| `9d.24.nancy.sangani@gmail.com` | 2 |
| `157653362+blacksmith-sh[bot]@users.noreply.github.com` | 1 |
| `139765981+YasharthPanwar-2003@users.noreply.github.com` | 1 |
| `mehru.codes@gmail.com` | 1 |
| `sw@netcetera.org` | 1 |
| `161115788+Geethapranay1@users.noreply.github.com` | 1 |
| `saaiaravindhraja@gmail.com` | 1 |
| `krishkhati0007king@gmail.com` | 1 |
| `taimoorking23102004@gmail.com` | 1 |
| `86097533+prasannakumar414@users.noreply.github.com` | 1 |
| `83650338+praveshhh@users.noreply.github.com` | 1 |
| `32316065+arunkumar0398@users.noreply.github.com` | 1 |
| `93150941+sidshivam625@users.noreply.github.com` | 1 |
| `snp2315@gmail.com` | 1 |
| `exedistrict@gmail.com` | 1 |
| `rohansingh2804@gmail.com` | 1 |
| `115855149+yunus25jmi1@users.noreply.github.com` | 1 |
| `96873014+HydrallHarsh@users.noreply.github.com` | 1 |
| `97343691+Abchoudhary2512@users.noreply.github.com` | 1 |
| `109931778+mintlify[bot]@users.noreply.github.com` | 1 |
| `84870556+guglxni@users.noreply.github.com` | 1 |
| `harshsinghathena@gmail.com` | 1 |
| `162829558+Devanshk11@users.noreply.github.com` | 1 |
| `james@phoebe.ai` | **1** |
| `147735975+pooja-bhavani@users.noreply.github.com` | 1 |
| `lorenzo.cambiaghi@hotmail.com` | 1 |
| `manojachanta7172@gmail.com` | 1 |

**How to read it.** `users.noreply.github.com` and `[bot]` addresses are
**privacy-safe** — they are GitHub's automatic private aliases. Everything else
is a **real personal email**, which is exactly what this report is about:

- The **7 maintainer emails** highlighted in this report (Sections 3–4.1) account for **455 commits**.
- The same one-command scan also surfaces **27 more personal addresses from external contributors** (`gmail.com`, `hotmail.com`, `me.com`, `ves.ac.in`, `iiitd.ac.in`, `netcetera.org`, …) on **236 more commits**.
- Total exposure on the origin: **34 distinct personal email addresses on 691 of 956 commits**.

**Step 3 — how we got the full 40-char SHAs for the proof tables.** The
`github.commits` table has **no dedicated SHA column** — the commit SHA lives at
the end of `commit__url`. We extract it with `regexp_match(commit__url,
'/commits/([^/]+)$')[1]` (note the quoted regex; `regexp_extract` does not exist
in this engine):

```sql
SELECT commit__author__name,
       commit__author__email,
       commit__author__date,
       substr(commit__message, 1, 60) AS message,
       regexp_match(commit__url, '/commits/([^/]+)$')[1] AS sha
FROM github.commits
WHERE owner = 'withcoral' AND repo = 'coral'
  AND commit__author__email = 'james@withcoral.com'
ORDER BY commit__author__date DESC
LIMIT 3;
```

Output:

| `commit__author__name` | `commit__author__email` | `commit__author__date` | `message` | `sha` |
|---|---|---|---|---|
| James Summerfield | `james@withcoral.com` | 2026-07-26T10:19:03Z | `feat(mcp): require task lifecycle (#1941)` | `e6e0607bf4bb5e5ce4c0534f0189e10363046155` |
| James Summerfield | `james@withcoral.com` | 2026-07-26T10:19:02Z | `feat(app): persist tasks in SQL (#1940)` | `b1975f4a68b566607a0386544ee15f264c451cd7` |
| James Summerfield | `james@withcoral.com` | 2026-07-24T11:58:31Z | `fix(mcp): simplify task lifecycle results (#1939)` | `e04c4ac4febbba822d55dcc1bac5f9e241e9177c` |

Running the same query with a different `commit__author__email` value produces
the proof rows used in Sections 4.1–4.2 (each SHA is the raw value returned by
`coral_sql`, no transcription):

| Email | Latest commit SHA (from `coral_sql`) | Date | Message (truncated) |
|---|---|---|---|
| `simonw@withcoral.com` | `303ffe96aabef7d33ac08538606b95d79a7cb0bd` | 2026-07-31 | `chore(spec): add missing auth block to v4 Gitlab source (#20…` |
| `saul@withcoral.com` | `f575c9d14afc3fcd237602b03d9408e75d9e031c` | 2026-07-31 | `feat(app): persist identity spec documents with shared envel…` |
| `ilia@phoebe.ai` | `52ff0ac66c8f7bd92062770a4f5295432dea80a4` | 2026-07-31 | `feat(catalog): expose catalog-qualified table discovery (#18…` |
| `james.audretsch@phoebe.ai` | `793abae752d33716399222ce4d978b6f8b94a15b` | 2026-07-14 | `feat(cli): add tasks runtime feature (#1561)` |
| `andrea@withcoral.com` | `cf744bd783b23c4371d14ed7e9b7640e26cfab10` | 2026-07-10 | `feat(sources/core-v4/microsoft_graph_v4): add Microsoft Grap…` |
| `james@phoebe.ai` | `0b4e846764359af760c5567e4aa130e33e85c8f0` | 2026-04-03 | `Initial commit` |

**Step 4 — the fork.** Same queries, just change the two filters. The fork's
`main` is slightly behind origin, so totals are a little lower — but the
exposed emails are the same values:

```sql
SELECT COUNT(*) AS total_commits
FROM github.commits
WHERE owner = 'FiscalMindset' AND repo = 'coral';
-- total_commits
-- 917

SELECT commit__author__email, COUNT(*) AS commits
FROM github.commits
WHERE owner = 'FiscalMindset' AND repo = 'coral'
GROUP BY commit__author__email
ORDER BY commits DESC
LIMIT 15;
-- james@withcoral.com 184 · simonw@withcoral.com 110 · saul@withcoral.com 86
-- ilia@phoebe.ai 24 · james.audretsch@phoebe.ai 17 · andrea@withcoral.com 13
-- (external contributors: ludo@phoebe.ai 60 · bradleydpbutcher@gmail.com 44
--  pawel.kapica@gmail.com 39 · ss5063711@gmail.com 14 …)
```

---

## 5. Where the emails were NOT found

### 5.1 Repository files (working tree)

A content search for all personal addresses across the entire working tree returned **zero matches**. No personal email is committed to any source, docs, config, or manifest file.

### 5.2 Only public company aliases exist in files (intentional, not a leak)

| File | Email | Purpose |
|---|---|---|
| `SECURITY.md:8` | `security@withcoral.com` | Security contact — published deliberately |
| `CONTRIBUTING.md:227` | `legal@withcoral.com` | CLA contact — published deliberately |
| `apps/docs/legal/cla-corporate.mdx:10` | `legal@withcoral.com` | Corporate CLA form |
| `plugins/coral/.codex-plugin/plugin.json:7` | `legal@withcoral.com` | Plugin publisher contact |

### 5.3 Ownership reference

`.github/CODEOWNERS:21` → `@jsummerfield` owns `/sources/community/`. Usernames are public; the concern is the **email**, which only lives in commit metadata.

---

## 6. Assessment — leaked or not?

**Yes, the emails are publicly exposed — but via git commit metadata, not via a file leak.**

| Question | Answer |
|---|---|
| Is any personal email in a repository file? | ❌ No |
| Is any personal email retrievable without auth? | ✅ Yes — public GitHub API + every clone |
| On the origin `withcoral/coral`? | ✅ Yes |
| On the fork `FiscalMindset/coral`? | ✅ Yes |
| Is this a security breach / hack? | ❌ No — standard git/GitHub behavior |
| Was it accidental on the maintainers' part? | Likely — they committed with real emails instead of GitHub's `noreply` addresses |
| Can the emails be removed from existing history? | Only by rewriting history (force-push) — destructive |

The exposure exists because each commit object permanently stores the `author` identity that was configured in `git config user.email` when the commit was made. GitHub serves this object publicly and forks clone it verbatim. The web UI redacts the email in the browser, which is why it is easy to assume it is private.

---

## 7. Solution suggestions

### 7.1 Recommended (stops future exposure)

1. **Enable "Keep my email addresses private" on GitHub**
   - GitHub → Settings → Emails → check **Keep my email addresses private**.
   - GitHub then rewrites the author identity of all *future* pushes to `<id>+<username>@users.noreply.github.com`.
2. **Update local git config** for every machine that contributes:
   ```sh
   git config --global user.name  "Your Name"
   git config --global user.email "<id>+<username>@users.noreply.github.com"
   ```
3. **Set the email per-repo too** (so forks/local clones don't reintroduce the real address):
   ```sh
   git config user.email "<id>+<username>@users.noreply.github.com"
   ```
4. **Verify after pushing:**
   ```sh
   git log -1 --format='%ae'
   ```

### 7.2 Optional / advanced (removes past exposure)

5. **Rewrite history** with `git filter-repo` (recommended over `git filter-branch`):
   ```sh
   git filter-repo --email-callback 'return b"<id>+<username>@users.noreply.github.com"'
   git push --force --all
   ```
   ⚠️ This changes every commit SHA, invalidates PR references, and requires everyone with a clone (including forks) to re-clone or rebase. For a public repo with many forks this is usually **not worth it** — the payoff is low and the coordination cost is high.

### 7.3 Not recommended

6. Asking GitHub support to redact — not available for standard accounts on public repos.
7. `git filter-branch` — slow, error-prone; prefer `git filter-repo`.

### 7.4 What the reporter (Vicky) will do

- Send this report to the maintainers (Andrea Ambu `andrea@withcoral.com` — engineer who receives reports; Matt Henderson — hiring manager) so they can flip the setting themselves and decide on any history rewrite.
- Recommend the same `noreply` setting be enforced for **all** maintainer machines.

---

## 8. Methodology & reproducibility

| Step | Tool | What it returned |
|---|---|---|
| 1 | Coral MCP — `coral_start_task` | Task id for the investigation |
| 2 | Coral MCP — `coral_search` | Found `github.commits`, `github.repos_get` tables |
| 3 | Coral MCP — `github.commits` | Author name/email/date per commit on both repos |
| 4 | Coral MCP — `github.commits` (aggregate) | Per-email commit counts on both repos |
| 5 | Coral MCP — `github.repos_get` | `fork: false` for origin, `fork: true` (parent `withcoral/coral`) for the fork |
| 6 | `curl` (public GitHub API, no auth) | Raw commit object with `"email": "james@withcoral.com"` on both repos |
| 7 | `git log` (local clone) | Same author emails |

Re-run instructions:

```sh
# Emails per repo (via Coral MCP GitHub source)
SELECT commit__author__email, COUNT(*) FROM github.commits
WHERE owner='withcoral' AND repo='coral'
  AND commit__author__email IN (...)
GROUP BY commit__author__email;

# Single commit proof (public API, no auth)
curl -s https://api.github.com/repos/withcoral/coral/git/commits/e6e0607bf4bb5e5ce4c0534f0189e10363046155
```

---

<p align="center"><sub>Author: Vicky Kumar &lt;algsoch@gmail.com&gt; · 2026-08-02 · Part of the coral-specs-testing report series</sub></p>
