# Bookings auto-complete after end + grace

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Scheduler in `apps/api` transitions confirmed Bookings to `completed` after their end time plus a grace window (default 6 hours), unless already marked `no-show` (per ADR-0012). Writes a `BookingHistoryEvent` of kind `auto-completed`. This is what makes Reviews (issue #39) eligible.

## Acceptance criteria

- [ ] Scheduler runs at a configurable interval (e.g. every 15 minutes)
- [ ] Transitions eligible Bookings (status = `confirmed`, end + grace passed, not `no-show`) to `completed`
- [ ] Writes BookingHistoryEvent of kind `auto-completed`
- [ ] Bookings already marked `no-show` are not affected
- [ ] Idempotent — running twice in the grace window has no extra effect
- [ ] Tests cover: time-injected transition, no-show preservation, idempotency

## Blocked by

- [#19 — Client books pay-at-venue, Practitioner-first](./19-client-books-pay-at-venue-practitioner-first.md)
