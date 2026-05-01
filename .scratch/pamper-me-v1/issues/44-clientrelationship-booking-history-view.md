# ClientRelationship: per-Business Booking history view

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

On the Client-detail page in business-web, show all past Bookings of this Client at this Business — date, Practitioner, Offering, status. Bookings at other Businesses are NEVER visible per ADR-0006.

## Acceptance criteria

- [ ] Client-detail page lists past Bookings (status, date, Practitioner, Offering)
- [ ] List filters to Bookings at this Business only
- [ ] Bookings at other Businesses are not visible
- [ ] Empty state handled gracefully for new Clients
- [ ] Tests cover: list filters to this Business, privacy boundary

## Blocked by

- [#43 — ClientRelationship: notes, allergies, formulas, marketing consent](./43-clientrelationship-notes.md)
