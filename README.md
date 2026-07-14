# Coral Specs Testing

Test reports from real-world testing of [Coral](https://github.com/withcoral/coral) source connectors, by Vicky Kumar ([@FiscalMindset](https://github.com/FiscalMindset)).

## Reports

- [2026-07-14 — microsoft_graph_v4 connector test report](reports/2026-07-14-msgraph-connector-test-report.md) — install, OAuth, materialization, query ergonomics, error UX, performance, and catalog search findings.
- [2026-07-14 — full command & output log](reports/2026-07-14-full-command-output-log.md) — every coral command run verbatim with its actual output and exit code: CLI basics, catalog search/SQL, working queries, envelope shape, license/scope/error behavior, table functions, timings.

## Test environment

- coral built from main (0.5.2+cf744bd), macOS + Linux (Ubuntu droplet)
- Own Microsoft Entra test tenant (Azure for Students), delegated OAuth, admin-consented
- Tenant currently unlicensed for M365 — data-level testing (SharePoint files, Teams chat rows, pagination) is the next phase once a trial license is active
