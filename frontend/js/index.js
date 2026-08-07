/* Dashboard page (index.html). Renders the overview widgets. */
(function () {
  "use strict";

  var REPORTS = window.Coral.REPORTS;

  function renderHeroRange() {
    var el = document.getElementById("heroRange");
    if (!el) return;
    var dates = REPORTS.map(function (r) { return r.date; });
    var min = dates.reduce(function (a, b) { return a < b ? a : b; });
    var max = dates.reduce(function (a, b) { return a > b ? a : b; });
    el.textContent = min + " → " + max;
  }

  function renderStats() {
    var grid = document.getElementById("statGrid");
    if (!grid) return;
    var first = REPORTS[REPORTS.length - 1];
    var last = REPORTS[0];
    var days = Math.round((new Date(last.date) - new Date(first.date)) / 86400000) + 1;

    var latest = REPORTS.filter(function (r) { return r.status === "latest"; })[0] || REPORTS[0];
    var passSum = 0, counted = 0;
    REPORTS.forEach(function (r) {
      if (r.stats && r.stats.pass != null) { passSum += r.stats.pass; counted++; }
    });
    var cats = {};
    REPORTS.forEach(function (r) { cats[r.category] = (cats[r.category] || 0) + 1; });

    var items = [
      { v: REPORTS.length, l: "Reports", cls: "" },
      { v: days, l: "Test days", cls: "stat__value--accent" },
      { v: passSum, l: "Pass rows (" + counted + " batteries)", cls: "stat__value--pass" },
      { v: Object.keys(cats).length, l: "Categories", cls: "stat__value--info" },
      { v: 733, l: "Tables covered", cls: "stat__value--purple" },
      { v: 5776, l: "Table functions", cls: "stat__value--warn" },
      { v: latest.stats && latest.stats.pass != null ? latest.stats.pass : "—", l: "Latest pass (" + latest.date + ")", cls: "stat__value--pass" },
      { v: "56%", l: "Failures = Coral bugs", cls: "stat__value--bad" }
    ];
    grid.innerHTML = items.map(function (i) {
      return '<div class="stat"><div class="stat__value ' + i.cls + '">' + window.Coral.esc(i.v) + '</div><div class="stat__label">' + window.Coral.esc(i.l) + "</div></div>";
    }).join("");
  }

  function renderAttribution() {
    var el = document.getElementById("attributionBars");
    if (!el) return;
    var data = [
      { label: "Coral bugs", value: 338, pct: 56.0, color: "var(--bad)" },
      { label: "Our setup", value: 185, pct: 30.6, color: "var(--info)" },
      { label: "Graph limits", value: 24, pct: 4.0, color: "var(--purple)" },
      { label: "Expected", value: 8, pct: 1.3, color: "var(--pass)" },
      { label: "Possibly Coral", value: 49, pct: 8.1, color: "var(--warn)" }
    ];
    el.innerHTML = data.map(function (d) {
      return (
        '<div class="bar__row">' +
          '<span class="bar__label">' + window.Coral.esc(d.label) + "</span>" +
          '<span class="bar__track"><span class="bar__fill" style="width:' + d.pct + '%;background:' + d.color + '"></span></span>' +
          '<span class="bar__value">' + d.value + " (" + d.pct.toFixed(1) + "%)</span>" +
        "</div>"
      );
    }).join("");
  }

  function renderPassChart() {
    var el = document.getElementById("passChart");
    if (!el) return;
    var series = [
      { date: "07-28", label: "07-28 az token", pass: 117, total: 733 },
      { date: "07-31", label: "07-31 reauth v1", pass: 122, total: 733 },
      { date: "07-31", label: "07-31 reauth v2", pass: 129, total: 733 },
      { date: "08-04", label: "08-04 keychain", pass: 109, total: 733 },
      { date: "08-04", label: "08-04 licensed", pass: 70, total: 733 },
      { date: "08-05", label: "08-05 all-scope", pass: 146, total: 733 },
      { date: "08-05", label: "08-05 95-scope", pass: 229, total: 733 },
      { date: "08-06", label: "08-06 SP+Teams v6", pass: 29, total: 48 }
    ];
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
    var v6 = REPORTS.filter(function (r) { return r.id.indexOf("v6") !== -1; })[0];
    if (!v6) return;
    el.innerHTML =
      '<a class="report-detail__title-link" href="report.html?id=' + window.Coral.esc(v6.id) + '"><h3>' + window.Coral.esc(v6.title) + "</h3></a>" +
      "<p>" + window.Coral.esc(v6.headline) + "</p>" +
      "<ul>" + (v6.findings || []).map(function (f) { return "<li>" + window.Coral.esc(f) + "</li>"; }).join("") + "</ul>" +
      '<a class="btn btn--primary" href="../' + window.Coral.esc(v6.html) + '">Read the full report ↗</a>';
  }

  function render() {
    renderHeroRange();
    renderStats();
    renderAttribution();
    renderPassChart();
    renderLatestFinding();
  }

  window.CoralIndex = { render: render };
  document.addEventListener("DOMContentLoaded", render);
})();
