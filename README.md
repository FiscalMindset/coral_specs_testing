<div align="center">
  <a href="https://github.com/FiscalMindset"><img src="https://github.com/FiscalMindset.png?size=100" width="100" height="100" alt="Vicky Kumar avatar" style="border-radius:50%"></a>
  <h1>🐠 Coral Specs Testing</h1>
  <p><strong>Real-world testing of <a href="https://github.com/withcoral/coral">Coral</a> <code>microsoft_graph_v4</code> source connector</strong></p>
  <p>by <a href="https://github.com/FiscalMindset">Vicky Kumar (@FiscalMindset)</a></p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/tables-733-22c55e" alt="733 tables">
  <img src="https://img.shields.io/badge/table_funcs-5,776-3b82f6" alt="5776 table funcs">
  <img src="https://img.shields.io/badge/identity_tests-6/6_PASS-22c55e" alt="6/6 PASS">
  <img src="https://img.shields.io/badge/timeouts-0-success" alt="0 timeouts">
  <img src="https://img.shields.io/badge/reports_frozen-✓-8b5cf6" alt="reports frozen">
  <img src="https://img.shields.io/badge/last_updated-2026--07--29-6b7280" alt="last updated 2026-07-29">
</p>

---

## 👤 About the tester

| | |
|---|---|
| **Name** | Vicky Kumar |
| **GitHub** | [@FiscalMindset](https://github.com/FiscalMindset) (commits also authored as `npdimagine`) |
| **Email** | `npdimagine@gmail.com` (personal) · `algsoch@gmail.com` (admin / Entra tenant) |
| **Project** | withcoral/coral — testing `microsoft_graph_v4` source connector (Microsoft Graph API via Coral) |
| **Reporting repo** | [FiscalMindset/coral_specs_testing](https://github.com/FiscalMindset/coral_specs_testing) (public) |
| **Contacts** | Matt Henderson (hired) · Andrea Ambu (engineer; receives reports) |

---

## 🔐 Microsoft account in use

| | |
|---|---|
| **Tenant** | `algsochgmail.onmicrosoft.com` (Azure for Students) |
| **Tenant ID** | `89de3b75-fef2-44f9-90a4-cf8c69700c83` |
| **Admin account** | `algsoch@gmail.com` (Global Administrator) |
| **Test user** | `vicky@algsochgmail.onmicrosoft.com` |
| **Sign-in methods** | Interactive OAuth (keychain) · non-interactive `az` admin token (1h) |
| **Coral app client ID** | `4eedabf0-b27e-4c98-ac7b-4c7f5d504bee` |
| **License state** | No M365 license — identity endpoints work, file/Teams/license-gated endpoints return structured errors |

---

## 📊 Reports

> **Frozen** once committed — new testing → new dated file, never modify existing ones.
> Every report has a matching `.md` (raw) and `.html` (responsive) version.

### 🆕 2026-07-29 — Re-auth test: Coral 0.8.1 / surface-singular fix

| | |
|---|---|
| **Date** | 2026-07-29 |
| **Coral** | `0.8.1+3acb123` (homebrew) |
| **Tables** | 733 (+1 from 0.5.2) |
| **Table funcs** | 5,776 (+17 from 0.5.2) |
| **Identity PASS** | 6/6 |
| **License-gated** | 4/4 structured failures (400/403) |
| **Timeouts** | **0** (was 2 in 0.5.2 — improved!) |
| **Manifest fix** | `surfaces` → `surface` (#1791) |

- **[Markdown](reports/2026-07-29-msgraph-reauth-test-report.md)** · **[HTML](reports/2026-07-29-msgraph-reauth-test-report.html)** — full command & output log: CLI basics, schema discovery, identity queries, M365 license-gated, premium failures, feature-specific failures, table functions, error quality assessment, vs-0.5.2 diff.

### 2026-07-14 — Microsoft Graph v4 connector: no-license test battery

| | |
|---|---|
| **Date** | 2026-07-14 (UTC) · 14:32 BST |
| **Time taken** | ~3h 40m |
| **Commands run** | 39 |
| **Output lines** | 612 |
| **Status** | ✅ Complete |

- **[Markdown](reports/2026-07-14-msgraph-connector-test-report.md)** · **[HTML](reports/2026-07-14-msgraph-connector-test-report.html)** — install, OAuth, materialization, query ergonomics, error UX, performance, catalog search findings.
- **[Markdown](reports/2026-07-14-full-command-output-log.md)** · **[HTML](reports/2026-07-14-full-command-output-log.html)** — every coral command run verbatim with actual output and exit code.
- **[Markdown](reports/2026-07-14-directory-data-test-log.md)** · **[HTML](reports/2026-07-14-directory-data-test-log.html)** — real-data testing without M365 license: 18 users + 2 groups queried through the connector.

---

## 🧪 Test environment

- **Coral CLI** `0.5.2+cf744bd` (Jul 14) → `0.8.1+3acb123` (Jul 29) — macOS + Linux (Ubuntu droplet)
- **Microsoft Entra** test tenant (Azure for Students), delegated OAuth, admin-consented
- **No M365 license** — identity queries work; file/Teams/license-gated endpoints return structured 400/403 errors (no timeouts)

---

## 📐 Reporting rules (enforced)

- Responsive HTML renders + matching `.md` source for every report
- **No fake data, no placeholders** — every value from a real run
- **Frozen reports** — never modify existing reports; new testing → new file
- **Author:** `Vicky Kumar <algsoch@gmail.com>` — no AI/Claude co-author trailer

---

<p align="center"><sub>Public on GitHub · maintained by <a href="https://github.com/FiscalMindset">Vicky Kumar</a> · last updated 2026-07-29</sub></p>
