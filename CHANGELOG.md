# Changelog

All notable changes to the Coral Specs Testing hub (the static report hub at `frontend/` + the smoke-test suite at `frontend/test/smoke.js`). Report content in `reports/` is dated and frozen per the [reporting rules](README.md#-reporting-rules-enforced) — this changelog tracks the **hub itself**, not the reports.

The format is [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.0] — 2026-08-08

First tagged release of the 8-page hub. Marks the transition from "ad-hoc reports in `reports/`" to "frozen report registry + derived dashboard + CI-gated deploy".

### Added
- **`frontend/` hub** — 8 static pages (overview, reports catalog, report detail, timeline, findings, guides, about, 404) with shared design system + dark/light toggle.
- **`frontend/js/data.js`** — single source of truth: `CORAL_REPORTS` registry (30 entries) and `CORAL_META` (tables/funcs/attribution/passSeries). All dashboard numbers are derived from these — nothing hardcoded in renderers.
- **`frontend/js/common.js`** — shared helpers (`esc`, `fileLink`, `statLine`, `catLabel`) consumed by every page controller.
- **`frontend/test/smoke.js`** — headless render + integrity suite (40+ checks): render sanity per page, registry integrity (unique ids, exactly one `latest`, `REPORTS[0]` is latest, every `r.md`/`r.html` on disk, stats buckets ≤ `total` and complete sets sum to total, attribution sums to 604, passSeries in-bounds), link resolution, static-asset presence.
- **CI** — `.github/workflows/pr.yml` (PR checks) + `.github/workflows/pages.yml` (Pages deploy gated on `npm test`); Dependabot for npm + GitHub Actions.
- **`package.json`** — `npm test` script and Node 18+ engine pin.
- **README** — `## 🏃 Running this hub` section (install, run tests, preview locally, architecture, script-tag order).
- **CHANGELOG.md** — this file.

### Schema rules for `CORAL_REPORTS` entries

Required (runtime `data.js` will throw at load if missing):

- `id` — string, unique across the registry, used as `?id=` query param by `report.html`
- `date` — string, `YYYY-MM-DD`
- `title` — string
- `category` — string (used to populate the reports-page filter)
- `status` — one of `latest` | `addendum` | `superseded` | `canonical` | `guide`
- `md` — string, repo-relative path to the `.md` (or `.html` for HTML-only reports)
- `html` — string, repo-relative path to the `.html` (or `.md` for md-only reports)
- `stats.total` — number, sum of the per-bucket stats (`pass`/`error`/`not_found`/`gated`/`catalog`) when all are numeric; otherwise must be ≥ the sum of any numeric subset

Optional: `short`, `headline`, `findings` (array of strings), `tags` (array of strings), `addendum` (id of an addendum entry).

### Security note

The repo is public and intentionally documents the test tenant (`algsoch762.onmicrosoft.com`), the Coral app client ID, and the admin email in `README.md` — these are required for full reproduction of the test runs (Andrea and Matt need them to re-execute the batteries). Real secrets (`eyJ...` access tokens, Bearer strings, the test-user password) are **never** committed. See [`reports/2026-08-02-commit-email-exposure.md`](reports/2026-08-02-commit-email-exposure.md) for an investigation of email exposure via upstream maintainer commit metadata.

[1.0.0]: https://github.com/FiscalMindset/coral_specs_testing/releases/tag/v1.0.0
