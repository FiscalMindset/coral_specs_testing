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

### 4.1 Concrete example commit

The same commit exists on both repos and returns the author's personal email over the public, **unauthenticated** GitHub API. The commit object SHA is identical on origin and fork.

- **Commit SHA (full):** `e6e0607bf4bb5e5ce4c0534f0189e10363046155`
- **Message:** `feat(mcp): require task lifecycle (#1941)`
- **Author:** James Summerfield
- **Email:** `james@withcoral.com`
- **Date:** 2026-07-26T10:19:03Z

### 4.2 Origin — public API response (no auth)

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

### 4.3 Fork — public API response (no auth)

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

> Note: the API requires the **full 40-character SHA**. A short SHA (e.g. `e6e0607`) returns `404 Not Found`:
> `{"message": "Not Found", "documentation_url": "https://docs.github.com/rest/git/commits#get-a-commit-object", "status": "404"}`

### 4.4 Local clone proof

```
$ git log --format='%an <%ae>' | sort -u
James Summerfield <james@withcoral.com>
Andrea Ambu <andrea@withcoral.com>
Saúl Hernández <saul@withcoral.com>
Simon Whitaker <simonw@withcoral.com>
Ilia Aphtsiauri <ilia@phoebe.ai>
...
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
