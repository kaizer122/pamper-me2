# Client cancel pre-cutoff

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Before the cancellation cutoff (Business-configurable, default 24h before Booking start per ADR-0011), Client can cancel a Booking from marketplace-web. Booking moves to `cancelled` and writes a BookingHistoryEvent. For pay-at-venue Bookings there is no money flow. The cancellation-cutoff check is a domain rule in `packages/domain`.

## Acceptance criteria

- [ ] Cancel button visible on Bookings only before the cutoff
- [ ] Cancellation transitions status to `cancelled` with `cancelledBy = client`
- [ ] Writes BookingHistoryEvent of kind `cancelled`
- [ ] Cutoff check is a pure function in `packages/domain`, fully unit-tested
- [ ] After the cutoff, the cancel button is hidden / API rejects
- [ ] Tests cover: pre-cutoff happy path, post-cutoff rejection, cutoff edge

## Blocked by

- [#19 — Client books pay-at-venue, Practitioner-first](./19-client-books-pay-at-venue-practitioner-first.md)
