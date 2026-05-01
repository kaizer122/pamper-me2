# Business: configure Practitioner Schedule (Venue-tagged working blocks)

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Practitioner Schedule editor in business-web. The owner defines recurring working blocks per Practitioner; each block has a day-of-week, start time, end time, and a Venue from the Business's Venues (per ADR-0013). The Practitioner's calendar is the union of these blocks. Schedule changes take effect from a configurable effective-from date and never retroactively affect existing Bookings.

## Acceptance criteria

- [ ] Calendar editor lets the owner add, edit, and remove working blocks per Practitioner
- [ ] Each block must reference a Venue belonging to the same Business (validated)
- [ ] Effective-from date enforces no-retroactive edits
- [ ] Practitioner's calendar view reflects the configured Schedule
- [ ] Existing Bookings remain visible and unaffected by schedule edits
- [ ] Tests cover: configure, edit, validate Venue ownership, effective-from semantics

## Blocked by

- [#06 — Business: create Venues](./06-business-create-venues.md)
- [#07 — Business: create Practitioners](./07-business-create-practitioners.md)
