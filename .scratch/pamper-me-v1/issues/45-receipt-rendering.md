# Receipt rendering across Client + Business views

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Render a Booking receipt with HT, TVA, and TTC for both the Client (in marketplace-web) and the Business (in business-web), using the frozen TVA snapshot stored on the Booking per ADR-0025. Receipt content adapts to `Business.taxRegime`: `reel` shows TVA line; `forfaitaire` shows zero TVA but TTC equal to HT. The Pamper Me commission line is NOT shown to the Client — it's a separate B2B concern.

## Acceptance criteria

- [ ] Marketplace-web shows a receipt page for any of the Client's `confirmed` / `completed` Bookings
- [ ] Business-web shows a receipt for any of its Bookings
- [ ] Both views show HT, TVA (or 0 if `forfaitaire`), TTC; commission line absent from Client view
- [ ] Receipt uses the frozen TVA snapshot — never recomputed from current Offering price
- [ ] Tests cover: rendering for `reel` and `forfaitaire`, commission line absence on Client view

## Blocked by

- [#19 — Client books pay-at-venue, Practitioner-first](./19-client-books-pay-at-venue-practitioner-first.md)
