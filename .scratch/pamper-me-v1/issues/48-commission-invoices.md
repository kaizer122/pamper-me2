# B2B commission invoices: monthly generation + Business view

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Per ADR-0010 / ADR-0025: monthly cron generates a B2B commission invoice from Pamper Me to each Business covering all `completed` Bookings and forfeits in the prior month. Invoice shows commission HT, TVA on commission (Pamper Me is `regime reel`), and TTC. Businesses under `regime reel` use these invoices to deduct commission TVA on their own returns. Business-web has an invoice list with PDF download.

## Acceptance criteria

- [ ] Monthly cron generates a CommissionInvoice per Business
- [ ] Invoice covers `completed` Bookings + forfeits in the prior month
- [ ] Invoice shows commission HT, commission TVA, commission TTC
- [ ] PDF rendering with French content and proper Tunisian invoice fields (date, sequence, parties, matricule fiscal)
- [ ] Business-web invoice list with download
- [ ] Idempotent — re-running for the same month does not duplicate
- [ ] Tests cover: invoice math, PDF render, idempotency

## Blocked by

- [#32 — Client books online via Konnect Deposit charge](./32-konnect-deposit-charge.md)
