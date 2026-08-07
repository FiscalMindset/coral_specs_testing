/* Findings page (findings.html). Everything proven, grouped by theme.
   Groups reference report ids from js/data.js — keep in sync, never invent. */
(function () {
  "use strict";

  var REPORTS = window.Coral.REPORTS;

  var FINDING_GROUPS = [
    {
      title: "Coral connector bugs",
      stat: "338 of 604 failures (56%)",
      color: "var(--bad)",
      reports: ["2026-07-31-failure-attribution", "2026-07-30-msgraph-spec-bugs", "2026-08-04-spec-bug-tables"],
      items: [
        "45 genuine OpenAPI spec bugs: 13 wrong URL, 13 deprecated, 12 wrong audience, 4 needs entityId, 3 unsupported query",
        "131 consumer-only tables that should be removed (Tier 1 fix)",
        "List-tables expose raw OData envelope (value JSON) instead of flattened rows",
        "No skiptoken input → pagination can't continue past page 1",
        "248 tables fixable in the manifest · 30 not fixable (Graph-side)"
      ]
    },
    {
      title: "License unlocks",
      stat: "0 → 146 passing tables after licensing",
      color: "var(--pass)",
      reports: ["2026-08-04-licensed-msgraph-test-report", "2026-08-05-licensed-allscope-test-report"],
      items: [
        "Business Premium unlocked 23 tables (Teams, chats, drives, sites, insights, planner)",
        "Full 18-scope token: 87 more tables unlocked (70 → 146 passing)",
        "15 remaining real errors: Edu 500s ×4, planner 405 ×2, storage URI spec bug ×2, MS-side ×7",
        "10 chat/Teams/files/sites tables flipped pass→auth (admin token lacks OAuth scopes)"
      ]
    },
    {
      title: "Scope unlocks",
      stat: "13 → 36 → 95 scopes",
      color: "var(--purple)",
      reports: ["2026-07-31-scope-unlock-test", "2026-08-05-union-scope-test-report", "2026-07-31-oauth-consent-guide"],
      items: [
        "Admin grant expanded 13 → 36 scopes via Graph PATCH (HTTP 204)",
        "95-scope union token unlocked exactly the 8 predicted tables (221 → 229)",
        "0 pass→non-pass regressions — all prior passes stayed passes",
        "auth→bad_request flips = feature-gated APIs now return 400 instead of 403"
      ]
    },
    {
      title: "Auth / token behavior",
      stat: "0 timeouts, 0 expired-token (keychain OAuth)",
      color: "var(--info)",
      reports: ["2026-08-04-msgraph-reauth-test-report", "2026-08-05-auth-rerun-confirmed"],
      items: [
        "Keychain OAuth auto-refresh eliminates expired-token + timeout failures",
        "0/23 auth-classified calls pass even with a fresh valid 128-scope token",
        "sites/delta, getAllSites, containerTypes = app-only permissions (permanent MS-side)",
        "Entire solutions/backupRestore surface (18 calls) 403s — M365 Backup not provisioned"
      ]
    },
    {
      title: "SharePoint + Teams data",
      stat: "27 lists · 956 items · 31 events · 5 teams",
      color: "var(--accent)",
      reports: ["2026-08-06-sharepoint-teams-coral-sql-data-report", "2026-08-06-sharepoint-teams-coral-sql-data-report-v6"],
      items: [
        "Pure Coral SQL inventories tenant SharePoint + Teams data — 100% SELECT, no curl",
        "v6: 29/48 probes pass; SP hierarchy fully walkable from 2 seeds",
        "Teams/chats/groups/filestorage unexecutable-from-zero — no listing roots, no exposed user id",
        "0 Coral bugs in 92-call deep-data battery (corrected triage, MS OpenAPI in hand)"
      ]
    },
    {
      title: "Security / privacy",
      stat: "7 personal emails exposed via commit metadata",
      color: "var(--warn)",
      reports: ["2026-08-02-commit-email-exposure"],
      items: [
        "Maintainer emails retrievable by anyone via GET /repos/{owner}/{repo}/git/commits/{sha}",
        "12 commits / 7 identities curl-verified on origin + fork (14 requests, 0 failures)",
        "100% reproducible via Coral alone (github.commits MCP)",
        "Fix: GitHub 'Keep my email private' → noreply commits"
      ]
    }
  ];

  function render() {
    var el = document.getElementById("findingsGrid");
    if (!el) return;
    el.innerHTML = FINDING_GROUPS.map(function (g) {
      var links = (g.reports || []).map(function (id) {
        var r = REPORTS.filter(function (x) { return x.id === id; })[0];
        if (!r) return "";
        return '<a class="mini-link" href="report.html?id=' + window.Coral.esc(r.id) + '">' + window.Coral.esc(r.date) + " ↗</a>";
      }).join("");
      return (
        '<article class="card">' +
          "<h3>" + window.Coral.esc(g.title) + "</h3>" +
          '<p class="report-card__stats" style="color:' + g.color + ';font-weight:700;">' + window.Coral.esc(g.stat) + "</p>" +
          "<ul>" + g.items.map(function (i) { return "<li>" + window.Coral.esc(i) + "</li>"; }).join("") + "</ul>" +
          '<div class="report-card__foot">' + links + "</div>" +
        "</article>"
      );
    }).join("");
  }

  window.CoralFindings = { render: render };
  document.addEventListener("DOMContentLoaded", render);
})();
