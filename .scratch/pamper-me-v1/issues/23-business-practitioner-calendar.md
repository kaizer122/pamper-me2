# Business: Practitioner calendar view

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Calendar view per Practitioner in business-web showing all confirmed Bookings, working blocks, breaks, and time off. Day, week, and month views. Clicking a Booking opens a detail panel with all fields and the BookingHistoryEvent log.

## Acceptance criteria

- [ ] Calendar grid renders working blocks, breaks, time off, and Bookings
- [ ] Day, week, month toggles work
- [ ] Clicking a Booking opens a detail panel
- [ ] Detail panel shows Client, Offering, Practitioner, time, status, and history events
- [ ] Calendar respects `bufferAfter` and renders blocked time accordingly
- [ ] Tests cover: rendering against fixtures, view-toggle behavior, detail-panel content

## Blocked by

- [#19 — Client books pay-at-venue, Practitioner-first](./19-client-books-pay-at-venue-practitioner-first.md)
