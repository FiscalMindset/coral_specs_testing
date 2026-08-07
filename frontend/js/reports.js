/* Reports catalog page (reports.html). Search + filter + sort over all reports. */
(function () {
  "use strict";

  var REPORTS = window.Coral.REPORTS;

  function reportCard(r) {
    var links = window.Coral.fileLink(r);
    var foot = [];
    if (links.html) foot.push('<a class="mini-link" href="../' + window.Coral.esc(links.html) + '">Open report ↗</a>');
    if (links.md && !links.same) foot.push('<a class="mini-link" href="../' + window.Coral.esc(links.md) + '">.md</a>');
    var tags = (r.tags || []).map(function (t) {
      return '<span class="badge badge--cat">' + window.Coral.esc(t) + "</span>";
    }).join("");
    return (
      '<article class="report-card card">' +
        '<div class="report-card__head">' +
          '<span class="report-card__date">' + window.Coral.esc(r.date) + "</span>" +
          '<span class="badge badge--' + window.Coral.esc(r.status || "canonical") + '">' + window.Coral.esc(r.status || "canonical") + "</span>" +
        "</div>" +
        '<h3><a class="report-card__title" href="report.html?id=' + window.Coral.esc(r.id) + '">' + window.Coral.esc(r.title) + "</a></h3>" +
        '<p class="report-card__stats">' + window.Coral.statLine(r) + "</p>" +
        '<div class="report-card__tags">' + tags + "</div>" +
        '<div class="report-card__foot">' + foot.join("") + "</div>" +
      "</article>"
    );
  }

  var state = { search: "", category: "all", status: "all", sort: "date-desc" };

  function populateCategories() {
    var sel = document.getElementById("categoryFilter");
    if (!sel) return;
    var cats = [];
    REPORTS.forEach(function (r) { if (cats.indexOf(r.category) === -1) cats.push(r.category); });
    cats.sort();
    sel.innerHTML = '<option value="all">All categories</option>' +
      cats.map(function (c) { return '<option value="' + window.Coral.esc(c) + '">' + window.Coral.esc(window.Coral.catLabel(c)) + "</option>"; }).join("");
  }

  function matches(r) {
    var q = state.search.toLowerCase();
    var hay = (r.title + " " + r.short + " " + r.headline + " " + r.id + " " + (r.tags || []).join(" ")).toLowerCase();
    if (q && hay.indexOf(q) === -1) return false;
    if (state.category !== "all" && r.category !== state.category) return false;
    if (state.status !== "all" && r.status !== state.status) return false;
    return true;
  }

  function sorted(list) {
    var out = list.slice();
    var s = state.sort;
    out.sort(function (a, b) {
      if (s === "title") return a.title.localeCompare(b.title);
      if (s === "date-asc") return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    });
    return out;
  }

  function render() {
    var grid = document.getElementById("reportGrid");
    var empty = document.getElementById("emptyState");
    var count = document.getElementById("reportCount");
    if (!grid) return;
    var list = sorted(REPORTS.filter(matches));
    if (count) count.textContent = list.length;
    grid.innerHTML = list.map(reportCard).join("");
    if (empty) empty.hidden = list.length !== 0;
  }

  function bindControls() {
    var search = document.getElementById("searchInput");
    var cat = document.getElementById("categoryFilter");
    var status = document.getElementById("statusFilter");
    var sort = document.getElementById("sortSelect");
    if (search) search.addEventListener("input", function () { state.search = search.value; render(); });
    if (cat) cat.addEventListener("change", function () { state.category = cat.value; render(); });
    if (status) status.addEventListener("change", function () { state.status = status.value; render(); });
    if (sort) sort.addEventListener("change", function () { state.sort = sort.value; render(); });
  }

  function init() {
    populateCategories();
    render();
    bindControls();
  }

  window.CoralReports = { render: render, init: init, _state: state };
  document.addEventListener("DOMContentLoaded", init);
})();
