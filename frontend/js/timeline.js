/* Timeline page (timeline.html). Chronological read of the whole program. */
(function () {
  "use strict";

  var REPORTS = window.Coral.REPORTS;

  function render() {
    var el = document.getElementById("timeline");
    if (!el) return;
    var chrono = REPORTS.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    var byDate = {};
    chrono.forEach(function (r) {
      (byDate[r.date] = byDate[r.date] || []).push(r);
    });
    var html = "";
    Object.keys(byDate).forEach(function (d) {
      html += '<div class="tl-item"><div class="tl-item__date">' + window.Coral.esc(d) + "</div>";
      byDate[d].forEach(function (r) {
        var links = window.Coral.fileLink(r);
        var open = links.html ? '<a class="mini-link" href="../' + window.Coral.esc(links.html) + '">full report ↗</a>' : "";
        var md = links.md && !links.same ? '<a class="mini-link" href="../' + window.Coral.esc(links.md) + '">.md</a>' : "";
        var tag = r.status === "latest" ? '<span class="badge badge--latest">latest</span> ' : "";
        var sup = r.status === "superseded" ? '<span class="badge badge--superseded">superseded</span> ' : "";
        html +=
          '<h3><a class="report-card__title" href="report.html?id=' + window.Coral.esc(r.id) + '">' + tag + sup + window.Coral.esc(r.title) + "</a></h3>" +
          "<p>" + window.Coral.esc(r.short || r.headline || "") + "</p>" +
          '<div class="tl-item__links">' + open + md + "</div>";
      });
      html += "</div>";
    });
    el.innerHTML = html;
  }

  window.CoralTimeline = { render: render };
  document.addEventListener("DOMContentLoaded", render);
})();
