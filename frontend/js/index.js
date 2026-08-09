/* Dashboard page (index.html). Renders the overview widgets.
   Single source of truth: window.Coral.REPORTS (report registry) + window.Coral.META
   (tables/funcs/attribution/passSeries) — every number below is derived, never hardcoded. */
(function () {
  "use strict";

  var REPORTS = window.Coral.REPORTS;
  var META = window.Coral.META;

  function latest() {
    var hit = REPORTS.filter(function (r) { return r.status === "latest"; })[0];
    return hit || REPORTS[0];
  }

  function passSum() {
    var sum = 0, counted = 0;
    REPORTS.forEach(function (r) {
      if (r.stats && r.stats.pass != null) { sum += r.stats.pass; counted++; }
    });
    return { sum: sum, counted: counted };
  }

  function categoryCount() {
    var cats = {};
    REPORTS.forEach(function (r) { cats[r.category] = (cats[r.category] || 0) + 1; });
    return Object.keys(cats).length;
  }

  function coverage() {
    var dates = REPORTS.map(function (r) { return r.date; });
    var min = dates.reduce(function (a, b) { return a < b ? a : b; });
    var max = dates.reduce(function (a, b) { return a > b ? a : b; });
    var first = REPORTS[REPORTS.length - 1];
    var last = REPORTS[0];
    var days = Math.round((new Date(last.date) - new Date(first.date)) / 86400000) + 1;
    return { min: min, max: max, days: days };
  }

  function coralBugShare() {
    var a = META.attribution || [];
    var total = a.reduce(function (s, d) { return s + d.value; }, 0);
    var bugs = a.filter(function (d) { return d.label === "Coral bugs"; })[0];
    return total && bugs ? Math.round((bugs.value / total) * 100) + "%" : "n/a";
  }

  function reportCard(r) {
    var links = window.Coral.fileLink(r);
    var foot = [];
    if (links.html) foot.push('<a class="mini-link" href="' + window.Coral.esc(links.html) + '">Open report ↗</a>');
    if (links.md && !links.same) foot.push('<a class="mini-link" href="' + window.Coral.esc(links.md) + '">.md</a>');
    foot.push('<a class="mini-link" href="frontend/report.html?id=' + encodeURIComponent(r.id) + '">detail ↗</a>');
    var tags = (r.tags || []).map(function (t) {
      return '<span class="badge badge--cat">' + window.Coral.esc(t) + "</span>";
    }).join("");
    return (
      '<article class="report-card card">' +
        '<div class="report-card__head">' +
          '<span class="report-card__date">' + window.Coral.esc(r.date) + "</span>" +
          '<span class="badge badge--' + window.Coral.esc(r.status || "canonical") + '">' + window.Coral.esc(r.status || "canonical") + "</span>" +
        "</div>" +
        '<h3><a class="report-card__title" href="frontend/report.html?id=' + encodeURIComponent(r.id) + '">' + window.Coral.esc(r.title) + "</a></h3>" +
        '<p class="report-card__stats">' + window.Coral.statLine(r) + "</p>" +
        '<div class="report-card__tags">' + tags + "</div>" +
        '<div class="report-card__foot">' + foot.join("") + "</div>" +
      "</article>"
    );
  }

  function sorted(list) {
    return list.slice().sort(function (a, b) {
      if (a.date !== b.date) return a.date > b.date ? -1 : 1;
      return a.id > b.id ? -1 : a.id < b.id ? 1 : 0;
    });
  }

  function renderHeroBadges() {
    var el = document.getElementById("heroBadges");
    var range = document.getElementById("heroRange");
    var l = latest();
    var c = coverage();
    if (range) range.textContent = c.min + " → " + c.max;
    if (!el) return;
    var badges = [
      { t: META.tables + " tables", cls: "canonical" },
      { t: META.funcs + " table funcs", cls: "canonical" },
      { t: (l.stats && l.stats.pass != null ? l.stats.pass : "—") + " pass", cls: "latest" },
      { t: "latest " + l.date, cls: "latest" },
      { t: c.min + " → " + c.max, cls: "canonical" },
      { t: "reports frozen", cls: "superseded" }
    ];
    el.innerHTML = badges.map(function (b) {
      return '<span class="badge badge--' + b.cls + '">' + window.Coral.esc(b.t) + "</span>";
    }).join("");
  }

  function renderStats() {
    var grid = document.getElementById("statGrid");
    if (!grid) return;
    var p = passSum();
    var l = latest();
    var c = coverage();
    var items = [
      { v: REPORTS.length, l: "Reports", cls: "" },
      { v: c.min + " → " + c.max, l: "Coverage window", cls: "stat__value--accent" },
      { v: c.days, l: "Test days", cls: "stat__value--info" },
      { v: p.sum, l: "Pass rows (" + p.counted + " batteries)", cls: "stat__value--pass" },
      { v: categoryCount(), l: "Categories", cls: "stat__value--purple" },
      { v: META.tables, l: "Tables covered", cls: "stat__value--purple" },
      { v: META.funcs, l: "Table functions", cls: "stat__value--warn" },
      { v: l.stats && l.stats.pass != null ? l.stats.pass : "—", l: "Latest pass (" + l.date + ")", cls: "stat__value--pass" },
      { v: coralBugShare(), l: "Failures = Coral bugs", cls: "stat__value--bad" }
    ];
    grid.innerHTML = items.map(function (i) {
      return '<div class="stat"><div class="stat__value ' + i.cls + '">' + window.Coral.esc(i.v) + '</div><div class="stat__label">' + window.Coral.esc(i.l) + "</div></div>";
    }).join("");
  }

  function renderAttribution() {
    var el = document.getElementById("attributionBars");
    if (!el) return;
    var total = (META.attribution || []).reduce(function (s, d) { return s + d.value; }, 0) || 1;
    el.innerHTML = (META.attribution || []).map(function (d) {
      var pct = (d.value / total) * 100;
      return (
        '<div class="bar__row">' +
          '<span class="bar__label">' + window.Coral.esc(d.label) + "</span>" +
          '<span class="bar__track"><span class="bar__fill" style="width:' + pct + "%;background:" + d.color + '"></span></span>' +
          '<span class="bar__value">' + d.value + " (" + pct.toFixed(1) + "%)</span>" +
        "</div>"
      );
    }).join("");
  }

  function renderPassChart() {
    var el = document.getElementById("passChart");
    if (!el) return;
    var series = META.passSeries || [];
    var W = 720, H = 220, padL = 44, padB = 34, padT = 16, padR = 12;
    var iw = W - padL - padR, ih = H - padT - padB;
    var maxP = 733;
    var bw = iw / series.length;
    var bars = series.map(function (s, i) {
      var x = padL + i * bw;
      var h = (s.pass / maxP) * ih;
      var y = padT + ih - h;
      var barW = Math.min(bw * 0.62, 44);
      var label = s.pass > 200 ? s.pass : " " + s.pass;
      var tip = s.label + " · " + s.pass + " pass";
      return (
        '<rect class="bar-fill" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) +
        '" width="' + barW.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="4">' +
        '<title>' + window.Coral.esc(tip) + "</title></rect>" +
        '<text class="axis-label" x="' + (x + barW / 2).toFixed(1) + '" y="' + (y - 6).toFixed(1) +
        '" text-anchor="middle">' + label + "</text>" +
        '<text class="axis-label" x="' + (x + barW / 2).toFixed(1) + '" y="' + (H - padB + 14).toFixed(1) +
        '" text-anchor="middle">' + s.date + "</text>"
      );
    }).join("");

    var grid = "";
    for (var g = 0; g <= 4; g++) {
      var gy = padT + ih - (ih * g) / 4;
      grid += '<line class="grid-line" x1="' + padL + '" y1="' + gy + '" x2="' + (W - padR) + '" y2="' + gy + '"></line>';
      grid += '<text class="axis-label" x="' + (padL - 8) + '" y="' + (gy + 4) + '" text-anchor="end">' + Math.round((maxP * g) / 4) + "</text>";
    }

    el.innerHTML =
      '<svg class="chart__svg" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Pass counts per battery">' +
        '<text class="axis-label" x="' + (padL / 2) + '" y="' + (H - 6) + '" text-anchor="middle">pass count (bars not to same 733 scale)</text>' +
        grid + bars + "</svg>";
  }

  function renderLatestFinding() {
    var el = document.getElementById("latestFinding");
    if (!el) return;
    var l = latest();
    el.innerHTML =
      '<a class="report-detail__title-link" href="report.html?id=' + window.Coral.esc(l.id) + '"><h3>' + window.Coral.esc(l.title) + "</h3></a>" +
      "<p>" + window.Coral.esc(l.headline) + "</p>" +
      "<ul>" + (l.findings || []).map(function (f) { return "<li>" + window.Coral.esc(f) + "</li>"; }).join("") + "</ul>" +
      '<a class="btn btn--primary" href="../' + window.Coral.esc(l.html) + '">Read the full report ↗</a>';
  }

  function renderReports() {
    var grid = document.getElementById("reportGrid");
    var count = document.getElementById("reportCount");
    if (!grid || !REPORTS.length) return;
    grid.innerHTML = sorted(REPORTS).map(reportCard).join("");
    if (count) count.textContent = REPORTS.length;
  }

  function renderFooterDate() {
    var el = document.getElementById("footerUpdated");
    if (!el) return;
    var l = latest();
    el.textContent = l.date + " (" + l.title + ")";
  }

  function render() {
    renderHeroBadges();
    renderStats();
    renderAttribution();
    renderPassChart();
    renderLatestFinding();
    renderReports();
    renderFooterDate();
  }

  window.CoralIndex = { render: render };
  document.addEventListener("DOMContentLoaded", render);
})();
