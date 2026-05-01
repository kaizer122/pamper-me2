# Business: add Practitioner time off

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Owner can mark date ranges as time off for a Practitioner — full-day or partial-day blocks (vacation, sick, training). Time off blocks override the recurring Schedule for the affected dates. Bookings cannot be created during time off.

## Acceptance criteria

- [ ] Owner can add a time-off range (start date/time, end date/time, reason optional)
- [ ] Time off renders on the Practitioner's calendar in a distinct style
- [ ] Marketplace slot search excludes time-off ranges
- [ ] Booking creation API rejects attempts to book inside time off
- [ ] Owner can edit and remove a time-off range
- [ ] Tests cover: configure, slot search, API rejection, edit/remove

## Blocked by

- [#08 — Business: configure Practitioner Schedule](./08-business-configure-schedule.md)
