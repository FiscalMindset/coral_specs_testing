/* Guides page (guides.html). Step-by-step how-tos & repros, filed under ../reports/.
   Data lives in data.js (window.CORAL_META.guides) so the hub has a single
   source of truth. */
(function () {
  "use strict";

  function render() {
    var el = document.getElementById("guidesGrid");
    if (!el) return;
    var guides = (window.Coral && window.Coral.META && window.Coral.META.guides) || [];
    el.innerHTML = guides.map(function (g) {
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
