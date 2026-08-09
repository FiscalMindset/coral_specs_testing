/* Coral Specs Testing — shared helpers + theme for the multi-page hub.
   Load after js/data.js. Exposes window.Coral.
   Data lives in js/data.js (window.CORAL_REPORTS) — never invent values. */
(function () {
  "use strict";

  var REPORTS = window.CORAL_REPORTS || [];
  var META = window.CORAL_META || {};
  var REPO_URL = "https://github.com/FiscalMindset/coral_specs_testing";
  var PAGES_URL = "https://fiscalmindset.github.io/coral_specs_testing/";
  var RENDER_URL = "https://coral-specs-testing.onrender.com/frontend/";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function fileLink(r) {
    var html = r.html, md = r.md;
    if (!html || html === md) return { html: html || null, md: md || null, same: true };
    return { html: html, md: md, same: false };
  }

  function statLine(r) {
    var s = r.stats || {};
    var bits = [];
    if (s.pass != null) bits.push("<strong>" + s.pass + "</strong> pass");
    if (s.error != null) bits.push("<strong>" + s.error + "</strong> errors");
    if (s.not_found != null) bits.push("<strong>" + s.not_found + "</strong> not found");
    if (s.gated != null) bits.push("<strong>" + s.gated + "</strong> gated");
    if (s.total != null && bits.length) bits.push("of <strong>" + s.total + "</strong>");
    return bits.join(" · ");
  }

  function catLabel(c) {
    return c.split("-").map(function (w) { return w[0].toUpperCase() + w.slice(1); }).join(" ");
  }

  function findById(id) {
    for (var i = 0; i < REPORTS.length; i++) if (REPORTS[i].id === id) return REPORTS[i];
    return null;
  }

  function statChips(r) {
    var s = r.stats || {};
    var defs = [
      { k: "pass", label: "pass", cls: "pass" },
      { k: "error", label: "errors", cls: "bad" },
      { k: "not_found", label: "not found", cls: "warn" },
      { k: "gated", label: "gated", cls: "info" },
      { k: "total", label: "total", cls: "" }
    ];
    return defs.filter(function (d) { return s[d.k] != null; }).map(function (d) {
      return '<span class="stat-chip stat-chip--' + d.cls + '"><strong>' + esc(s[d.k]) + "</strong> " + d.label + "</span>";
    }).join("");
  }

  /* Shared report-card markup, parameterised so the dashboard (index.html) and
     reports.html (catalog) can produce byte-for-byte equivalent output despite
     living at different relative paths in the site.
       opts.rawPrefix    prefix prepended to links.html / links.md hrefs
                         ("" when the page is at the repo root, "../" when it's
                         one directory down — frontend/reports.html).
       opts.detailPath   path stem for the detail-page link
                         ("frontend/report.html" from index.html, "report.html"
                         from frontend/reports.html).
       opts.showDetail   whether to append a "detail ↗" mini-link to the footer
                         (default true; reports.html suppresses it).
       opts.formatId     encoder for the report id in the detail href
                         (default encodeURIComponent; reports.html historically
                         used esc() — preserved here for byte-for-byte parity). */
  function reportCard(r, opts) {
    opts = opts || {};
    var rawPrefix = opts.rawPrefix || "";
    var detailPath = opts.detailPath || "report.html";
    var showDetail = opts.showDetail !== false;
    var formatId = opts.formatId || encodeURIComponent;
    var links = fileLink(r);
    var foot = [];
    if (links.html) foot.push('<a class="mini-link" href="' + rawPrefix + esc(links.html) + '">Open report ↗</a>');
    if (links.md && !links.same) foot.push('<a class="mini-link" href="' + rawPrefix + esc(links.md) + '">.md</a>');
    if (showDetail) foot.push('<a class="mini-link" href="' + detailPath + '?id=' + formatId(r.id) + '">detail ↗</a>');
    var tags = (r.tags || []).map(function (t) {
      return '<span class="badge badge--cat">' + esc(t) + "</span>";
    }).join("");
    return (
      '<article class="report-card card">' +
        '<div class="report-card__head">' +
          '<span class="report-card__date">' + esc(r.date) + "</span>" +
          '<span class="badge badge--' + esc(r.status || "canonical") + '">' + esc(r.status || "canonical") + "</span>" +
        "</div>" +
        '<h3><a class="report-card__title" href="' + detailPath + '?id=' + formatId(r.id) + '">' + esc(r.title) + "</a></h3>" +
        '<p class="report-card__stats">' + statLine(r) + "</p>" +
        '<div class="report-card__tags">' + tags + "</div>" +
        '<div class="report-card__foot">' + foot.join("") + "</div>" +
      "</article>"
    );
  }

  window.Coral = {
    REPORTS: REPORTS,
    META: META,
    REPO_URL: REPO_URL,
    PAGES_URL: PAGES_URL,
    RENDER_URL: RENDER_URL,
    esc: esc,
    fileLink: fileLink,
    statLine: statLine,
    catLabel: catLabel,
    findById: findById,
    statChips: statChips,
    reportCard: reportCard
  };
})();

/* Theme toggle — explicit choice stored in localStorage; falls back to OS preference. */
(function () {
  "use strict";
  function initTheme() {
    var toggle = document.getElementById("themeToggle");
    var stored = null;
    try { stored = localStorage.getItem("coral-hub-theme"); } catch (e) {}
    if (stored === "light" || stored === "dark") document.documentElement.setAttribute("data-theme", stored);
    if (!toggle) return;
    toggle.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme") ||
        (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("coral-hub-theme", next); } catch (e) {}
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initTheme);
  else initTheme();
})();
