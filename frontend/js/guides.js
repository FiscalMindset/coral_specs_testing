/* Guides page (guides.html). Step-by-step how-tos & repros, filed under ../reports/. */
(function () {
  "use strict";

  var GUIDES = [
    {
      title: "How to consent to all 36 Coral app scopes",
      desc: "Step-by-step interactive re-consent walkthrough for acquiring a 36-scope OAuth token (recommended path).",
      file: "reports/2026-07-31-oauth-consent-guide.md"
    },
    {
      title: "Scope unlock test (13 → 36 scopes)",
      desc: "Expand the OAuth2 admin grant via Graph API PATCH — the exact request that returned HTTP 204.",
      file: "reports/2026-07-31-scope-unlock-test.md"
    },
    {
      title: "Full command & output log (07-14)",
      desc: "Every coral command from the original battery, verbatim with output and exit codes.",
      file: "reports/2026-07-14-full-command-output-log.md"
    },
    {
      title: "Directory data test log (07-14)",
      desc: "Real-data testing without an M365 license: 18 users + 2 groups through the connector.",
      file: "reports/2026-07-14-directory-data-test-log.md"
    },
    {
      title: "MS Graph OpenAPI cross-check (v4.5)",
      desc: "How failures were triaged against Microsoft's published OpenAPI to retract phantom Coral bugs.",
      file: "reports/2026-08-05-sharepoint-teams-deep-data-report-v4.5.md"
    },
    {
      title: "OAuth re-auth verification (v5.2)",
      desc: "Re-adding the source via interactive OAuth to fix scope-403s — a proven repro for token issues.",
      file: "reports/2026-08-06-sharepoint-teams-coral-sql-data-report-v5.2.md"
    }
  ];

  function render() {
    var el = document.getElementById("guidesGrid");
    if (!el) return;
    el.innerHTML = GUIDES.map(function (g) {
      return (
        '<article class="card">' +
          "<h3>" + window.Coral.esc(g.title) + "</h3>" +
          "<p>" + window.Coral.esc(g.desc) + "</p>" +
          '<div class="report-card__foot"><a class="mini-link" href="../' + window.Coral.esc(g.file) + '">Open guide ↗</a></div>' +
        "</article>"
      );
    }).join("");
  }

  window.CoralGuides = { render: render };
  document.addEventListener("DOMContentLoaded", render);
})();
