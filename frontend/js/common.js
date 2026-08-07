/* Coral Specs Testing — shared helpers + theme for the multi-page hub.
   Load after js/data.js. Exposes window.Coral.
   Data lives in js/data.js (window.CORAL_REPORTS) — never invent values. */
(function () {
  "use strict";

  var REPORTS = window.CORAL_REPORTS || [];
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

  window.Coral = {
    REPORTS: REPORTS,
    REPO_URL: REPO_URL,
    PAGES_URL: PAGES_URL,
    RENDER_URL: RENDER_URL,
    esc: esc,
    fileLink: fileLink,
    statLine: statLine,
    catLabel: catLabel,
    findById: findById,
    statChips: statChips
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
