# Client books with "any available Practitioner"

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

A third entry point: when browsing a Business or a Venue, the Client can pick "any available Practitioner" for an Offering. The system resolves a specific Practitioner with a free slot at the chosen time at booking creation (per ADR-0004). The Booking is created with `BookingIntent.practitioner-locked = false`, so reassignment policy may silently swap the Practitioner if needed.

## Acceptance criteria

- [ ] Marketplace UI exposes an "any available Practitioner" option on Offering pages
- [ ] Resolution selects a Practitioner with a free slot at the requested time and Venue
- [ ] Booking is created with `BookingIntent.practitioner-locked = false`
- [ ] No nullable Practitioner state is ever persisted — resolution happens before insert
- [ ] Tests cover: resolution behavior, intent capture, no-availability empty state

## Blocked by

- [#19 — Client books pay-at-venue, Practitioner-first](./19-client-books-pay-at-venue-practitioner-first.md)
