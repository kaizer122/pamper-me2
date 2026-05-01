# Business: add breaks within working blocks

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Within each working block, the owner can mark unbookable break ranges (e.g. lunch, prep). Breaks are visible on the Practitioner's calendar and excluded from Marketplace availability searches. Bookings cannot land on or overlap a break.

## Acceptance criteria

- [ ] Owner can add break ranges within a working block (start/end times)
- [ ] Breaks render visually on the Practitioner calendar
- [ ] Marketplace slot search excludes time inside a break
- [ ] Booking creation API rejects attempts to book inside a break
- [ ] Tests cover: configure break, slot search excludes, API rejection

## Blocked by

- [#08 — Business: configure Practitioner Schedule](./08-business-configure-schedule.md)
