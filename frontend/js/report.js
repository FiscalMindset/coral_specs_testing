/* Report detail page (report.html). Reads ?id=<report-id> and renders one report. */
(function () {
  "use strict";

  var REPORTS = window.Coral.REPORTS;

  function queryParam(name) {
    var q = window.CoralTestId !== undefined ? String(window.CoralTestId) : null;
    if (q !== null) return q;
    var m = (window.location.search || "").match(new RegExp("[?&]" + name + "=([^&]*)"));
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : null;
  }

  function pager(r) {
    var chrono = REPORTS.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    var idx = chrono.indexOf(r);
    var prev = idx > 0 ? chrono[idx - 1] : null;
    var next = idx < chrono.length - 1 ? chrono[idx + 1] : null;
    function link(dir, item, label) {
      return '<a class="mini-link" href="report.html?id=' + window.Coral.esc(item.id) + '" rel="' + dir + '">' +
        label + " · " + window.Coral.esc(item.date) + " " + window.Coral.esc(item.title) + "</a>";
    }
    var html = '<nav class="pager" aria-label="Adjacent reports">';
    html += prev ? link("prev", prev, "← Older") : '<span class="pager__spacer"></span>';
    html += next ? link("next", next, "Newer →") : '<span class="pager__spacer"></span>';
    return html + "</nav>";
  }

  function render() {
    var el = document.getElementById("reportDetail");
    if (!el) return;
    var id = queryParam("id");
    var r = id ? window.Coral.findById(id) : null;
    if (!r) {
      el.innerHTML =
        '<div class="not-found">' +
          "<h2>Report not found</h2>" +
          "<p>No report has the id <code>" + window.Coral.esc(id || "(none)") + "</code>.</p>" +
          '<a class="btn btn--primary" href="reports.html">Browse all reports</a>' +
        "</div>";
      return;
    }
    var links = window.Coral.fileLink(r);
    var foot = [];
    if (links.html) foot.push('<a class="btn btn--primary" href="../' + window.Coral.esc(links.html) + '">Open full report ↗</a>');
    if (links.md && !links.same) foot.push('<a class="btn" href="../' + window.Coral.esc(links.md) + '">Markdown</a>');
    var tags = (r.tags || []).map(function (t) {
      return '<span class="badge badge--cat">' + window.Coral.esc(t) + "</span>";
    }).join("");

    el.innerHTML =
      '<nav class="breadcrumb" aria-label="Breadcrumb"><a href="reports.html">Reports</a><span aria-hidden="true">/</span><span>' + window.Coral.esc(window.Coral.catLabel(r.category)) + "</span></nav>" +
      '<div class="report-detail">' +
        '<div class="report-detail__head">' +
          '<span class="report-card__date">' + window.Coral.esc(r.date) + "</span>" +
          '<span class="badge badge--' + window.Coral.esc(r.status || "canonical") + '">' + window.Coral.esc(r.status || "canonical") + "</span>" +
          '<code class="report-detail__id">' + window.Coral.esc(r.id) + "</code>" +
        "</div>" +
        "<h1>" + window.Coral.esc(r.title) + "</h1>" +
        '<div class="report-detail__stats">' + window.Coral.statChips(r) + "</div>" +
        '<p class="report-detail__short">' + window.Coral.esc(r.short || "") + "</p>" +
        '<p class="report-detail__headline">' + window.Coral.esc(r.headline || "") + "</p>" +
        (r.findings && r.findings.length
          ? '<div class="report-detail__findings"><h2>Key findings</h2><ul>' +
            r.findings.map(function (f) { return "<li>" + window.Coral.esc(f) + "</li>"; }).join("") + "</ul></div>"
          : "") +
        '<div class="report-detail__tags">' + tags + "</div>" +
        '<div class="report-detail__foot">' + foot.join("") + "</div>" +
      "</div>" +
      pager(r);
  }

  window.CoralReport = { render: render };
  document.addEventListener("DOMContentLoaded", render);
})();
