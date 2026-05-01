# Business: mark Booking no-show within 24h

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Within 24 hours after a Booking's end time, the Business can mark it `no-show` from the Bookings inbox or detail view (per ADR-0012). After 24h, the action is no longer available — the Booking has already auto-completed. Marking writes a BookingHistoryEvent and (for online-paid Bookings) feeds Deposit forfeit (issue #34) and NoShowRisk (issue #35).

## Acceptance criteria

- [ ] "Mark no-show" action visible on Bookings between (end + 0) and (end + 24h)
- [ ] Marking transitions status to `no-show` and writes BookingHistoryEvent
- [ ] After 24h the action is no longer available
- [ ] Idempotent — second click does nothing
- [ ] Tests cover: 24h window, state transition, idempotency

## Blocked by

- [#19 — Client books pay-at-venue, Practitioner-first](./19-client-books-pay-at-venue-practitioner-first.md)
