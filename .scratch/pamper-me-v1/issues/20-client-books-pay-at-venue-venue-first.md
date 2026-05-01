# Client books pay-at-venue, Venue-first journey

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

A second entry point into the Booking flow: Client lands on a Venue, picks an Offering, picks a Practitioner (or any-available — covered separately in issue #21), picks a slot, books. The Booking is created with `BookingIntent.venue-locked = true`, ensuring later reassignment policy never silently moves the Booking to a different Venue (per ADR-0013).

## Acceptance criteria

- [ ] Marketplace UI offers Venue → Offering → Practitioner → slot → confirm
- [ ] Venue is inferred from the chosen Practitioner's Schedule block at the chosen time
- [ ] BookingIntent recorded: `venue-locked = true`
- [ ] All other Booking semantics identical to issue #19
- [ ] Tests cover the Venue-first flow and the intent capture

## Blocked by

- [#19 — Client books pay-at-venue, Practitioner-first](./19-client-books-pay-at-venue-practitioner-first.md)
