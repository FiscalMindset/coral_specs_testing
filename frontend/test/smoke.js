/* Headless smoke test for the multi-page report hub (no jsdom required).
   Loads data.js + common.js + each page script with a minimal DOM shim, fires
   DOMContentLoaded, and asserts generated HTML + link integrity.
   Run: node frontend/test/smoke.js */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..", "..");
const FRONTEND = path.join(ROOT, "frontend");

function makeEl(id) {
  const listeners = {};
  return {
    id,
    children: [],
    attrs: {},
    dataset: {},
    style: {},
    classList: {
      _set: new Set(),
      add(c) { this._set.add(c); },
      remove(c) { this._set.delete(c); },
      toggle(c, on) { on ? this._set.add(c) : this._set.delete(c); },
      contains(c) { return this._set.has(c); },
    },
    setAttribute(k, v) { this.attrs[k] = v; },
    getAttribute(k) { return this.attrs[k]; },
    appendChild(c) { this.children.push(c); },
    addEventListener(evt, cb) { listeners[evt] = cb; },
    _listeners: listeners,
    innerHTML: "",
    textContent: "",
    hidden: false,
  };
}

function makeContext(extra) {
  const elements = {};
  const documentShim = {
    documentElement: makeEl("html"),
    createElement: () => makeEl(null),
    getElementById: (id) => (elements[id] || (elements[id] = makeEl(id))),
    querySelectorAll: () => [],
    readyState: "loading",
    _dcl: null,
    addEventListener(evt, cb) { if (evt === "DOMContentLoaded") this._dcl = cb; },
  };
  documentShim.documentElement.getAttribute = () => null;
  const win = Object.assign({
    document: documentShim,
    localStorage: { getItem: () => null, setItem: () => {} },
    matchMedia: () => ({ matches: false }),
    scrollTo: () => {},
  }, extra);
  const ctx = vm.createContext({ window: win, document: documentShim, localStorage: win.localStorage });
  return { ctx, win, elements };
}

function load(ctx, rel) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, rel), "utf8"), ctx);
}

let failed = 0;
function assert(cond, msg) {
  if (cond) console.log("  ok  " + msg);
  else { failed++; console.error("  FAIL " + msg); }
}

const reportFiles = new Set(
  fs.readdirSync(path.join(ROOT, "reports")).filter(f => f.endsWith(".html") || f.endsWith(".md"))
);

/* ---------------- shared render sanity (index.js pipeline) ---------------- */
console.log("== Overview (index.js) ==");
{
  const { ctx, win, elements } = makeContext();
  load(ctx, "frontend/js/data.js");
  load(ctx, "frontend/js/common.js");
  load(ctx, "frontend/js/index.js");
  documentShimOf(ctx)._dcl();
  const check = (id, expect, label) => {
    const el = elements[id];
    const hay = (el ? el.innerHTML + "\n" + el.textContent : "");
    assert(hay.indexOf(expect) !== -1, label);
  };
  check("statGrid", "27", "stat grid shows report count");
  check("statGrid", "733", "stat grid shows 733 tables");
  check("statGrid", "5776", "stat grid shows 5,776 functions");
  check("statGrid", "56%", "stat grid shows Coral-bug share");
  check("heroRange", "2026-07-14 → 2026-08-06", "hero range spans all dates");
  check("attributionBars", "338 (56.0%)", "Coral bugs bar");
  check("attributionBars", "185 (30.6%)", "our setup bar");
  check("attributionBars", "49 (8.1%)", "ambiguous bar");
  check("passChart", "<svg", "SVG chart rendered");
  check("passChart", "229", "95-scope peak shown");
  check("passChart", "146", "all-scope pass shown");
  check("latestFinding", "Every surface function probed", "v6 headline present");
  check("latestFinding", "report.html?id=2026-08-06-sharepoint-teams-coral-sql-data-report-v6", "v6 links to detail page");
}

/* ---------------- reports catalog ---------------- */
console.log("== Reports (reports.js) ==");
{
  const { ctx, win, elements } = makeContext();
  load(ctx, "frontend/js/data.js");
  load(ctx, "frontend/js/common.js");
  load(ctx, "frontend/js/reports.js");
  documentShimOf(ctx)._dcl();
  const grid = elements["reportGrid"];
  assert(grid && grid.innerHTML.indexOf("report-card") !== -1, "report cards rendered");
  assert(String(elements["reportCount"].textContent) === "27", "report count set to 27");
  assert(grid.innerHTML.indexOf("report.html?id=") !== -1, "cards link to detail pages");
  assert(grid.innerHTML.indexOf("Open report") !== -1, "cards keep raw ../reports/ links");
  const catHtml = elements["categoryFilter"].innerHTML;
  ["sharepoint-teams", "scopes", "licensed", "reauth", "spec-bugs", "security", "triage", "guide", "coverage", "baseline", "auth"]
    .forEach(c => assert(catHtml.indexOf('value="' + c + '"') !== -1, "category option present: " + c));
  // exercise filter + sort through the exposed state API
  win.CoralReports._state.category = "sharepoint-teams";
  win.CoralReports._state.search = "exhaustive";
  win.CoralReports.render();
  assert(grid.innerHTML.indexOf("2026-08-06-sharepoint-teams-coral-sql-data-report-v6") !== -1, "search+category filter narrows correctly");
  win.CoralReports._state.category = "all";
  win.CoralReports._state.search = "zzz-nothing";
  win.CoralReports.render();
  assert(elements["emptyState"].hidden === false, "empty state shown when nothing matches");
}

/* ---------------- timeline ---------------- */
console.log("== Timeline (timeline.js) ==");
{
  const { ctx, win, elements } = makeContext();
  load(ctx, "frontend/js/data.js");
  load(ctx, "frontend/js/common.js");
  load(ctx, "frontend/js/timeline.js");
  documentShimOf(ctx)._dcl();
  const hay = elements["timeline"].innerHTML;
  assert(hay.indexOf("2026-07-14") !== -1, "timeline starts at first date");
  assert(hay.indexOf("2026-08-06") !== -1, "timeline ends at latest date");
  assert(hay.indexOf("report.html?id=") !== -1, "timeline entries link to detail pages");
  assert(hay.indexOf("../reports/") !== -1, "timeline keeps raw report links");
}

/* ---------------- findings ---------------- */
console.log("== Findings (findings.js) ==");
{
  const { ctx, win, elements } = makeContext();
  load(ctx, "frontend/js/data.js");
  load(ctx, "frontend/js/common.js");
  load(ctx, "frontend/js/findings.js");
  documentShimOf(ctx)._dcl();
  const hay = elements["findingsGrid"].innerHTML;
  ["338 of 604 failures", "0 → 146 passing", "7 personal emails", "0 timeouts"].forEach(t =>
    assert(hay.indexOf(t) !== -1, "finding present: " + t));
  assert(hay.indexOf("report.html?id=") !== -1, "finding cards link to detail pages");
}

/* ---------------- guides ---------------- */
console.log("== Guides (guides.js) ==");
{
  const { ctx, win, elements } = makeContext();
  load(ctx, "frontend/js/data.js");
  load(ctx, "frontend/js/common.js");
  load(ctx, "frontend/js/guides.js");
  documentShimOf(ctx)._dcl();
  const hay = elements["guidesGrid"].innerHTML;
  assert(hay.indexOf("How to consent to all 36") !== -1, "oauth consent guide");
  assert(hay.indexOf("Scope unlock test") !== -1, "scope guide");
  assert(hay.indexOf("../reports/2026-07-31-oauth-consent-guide.md") !== -1, "guide links to ../reports/");
}

/* ---------------- report detail ---------------- */
console.log("== Report detail (report.js) ==");
{
  const { ctx, win, elements } = makeContext({ location: { search: "" } });
  load(ctx, "frontend/js/data.js");
  load(ctx, "frontend/js/common.js");
  load(ctx, "frontend/js/report.js");
  win.CoralTestId = "2026-08-06-sharepoint-teams-coral-sql-data-report-v6";
  documentShimOf(ctx)._dcl();
  let hay = elements["reportDetail"].innerHTML;
  assert(hay.indexOf("<h1>Exhaustive SharePoint + Teams retest (v6)</h1>") !== -1, "detail page renders the right title");
  assert(hay.indexOf("SP hierarchy fully walkable") !== -1, "detail page renders findings");
  assert(hay.indexOf('href="../reports/2026-08-06-sharepoint-teams-coral-sql-data-report-v6.html"') !== -1, "detail page links raw report");
  assert(hay.indexOf('class="pager"') !== -1, "pager rendered");

  win.CoralTestId = "no-such-report";
  win.CoralReport.render();
  hay = elements["reportDetail"].innerHTML;
  assert(hay.indexOf("Report not found") !== -1, "unknown id shows not-found state");

  win.CoralTestId = "2026-08-06-sharepoint-teams-coral-sql-data-report";
  win.CoralReport.render();
  hay = elements["reportDetail"].innerHTML;
  assert(hay.indexOf("rel=\"next\"") !== -1 || hay.indexOf("rel=\"prev\"") !== -1, "pager prev/next points at real neighbours");
}

/* ---------------- every rendered ../reports/ link resolves ---------------- */
console.log("== Links resolve to real files ==");
{
  const refs = new Set();
  const { ctx, win, elements } = makeContext();
  load(ctx, "frontend/js/data.js");
  load(ctx, "frontend/js/common.js");
  ["index", "reports", "report", "timeline", "findings", "guides"].forEach(p => load(ctx, "frontend/js/" + p + ".js"));
  win.CoralTestId = "2026-08-06-sharepoint-teams-coral-sql-data-report-v6";
  documentShimOf(ctx)._dcl();
  Object.values(elements).forEach(el => {
    const m = (el.innerHTML || "").matchAll(/href="(\.\.\/reports\/[^"]+)"/g);
    for (const x of m) refs.add(x[1]);
  });
  let bad = 0;
  [...refs].forEach(r => {
    const base = path.basename(r);
    if (!reportFiles.has(base)) { bad++; console.error("  BROKEN LINK -> " + r); }
  });
  assert(bad === 0, "all ../reports/* links resolve (" + refs.size + " unique)");
}

/* ---------------- static pages reference existing assets ---------------- */
console.log("== Static pages reference real assets ==");
{
  const pages = fs.readdirSync(FRONTEND).filter(f => f.endsWith(".html"));
  assert(pages.length === 8, "8 pages present: " + pages.join(", "));
  let bad = 0;
  pages.forEach(p => {
    const html = fs.readFileSync(path.join(FRONTEND, p), "utf8");
    const refs = [...html.matchAll(/(?:href|src)="([^"#?]+\.(?:html|css|js))"/g)].map(m => m[1]);
    const navTargets = [...html.matchAll(/href="(index|reports|report|timeline|findings|guides|about)\.html"/g)].map(m => m[1] + ".html");
    refs.forEach(r => {
      const local = r.startsWith("../");
      const full = local ? path.join(ROOT, r.replace("../", "")) : path.join(FRONTEND, r);
      if (!fs.existsSync(full)) { bad++; console.error("  MISSING ASSET on " + p + ": " + r); }
    });
    navTargets.forEach(t => {
      if (t !== p && !pages.includes(t)) { bad++; console.error("  BROKEN NAV on " + p + ": " + t); }
    });
  });
  assert(bad === 0, "every static page references existing files + valid nav");
}

console.log(failed === 0 ? "\nALL SMOKE TESTS PASSED" : "\n" + failed + " TEST(S) FAILED");
process.exit(failed === 0 ? 0 : 1);

function documentShimOf(ctx) { return ctx.document; }
