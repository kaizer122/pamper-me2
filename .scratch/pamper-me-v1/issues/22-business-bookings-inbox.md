# Business: Bookings inbox with 15s polling

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Business-web inbox view listing incoming and upcoming Bookings across all Practitioners of the Business. The view auto-refreshes every 15 seconds via polling (per ADR-0023). Filters: today, this week, this month. Each row shows date/time, Client (name + NoShowRisk band when issue #35 lands), Practitioner, Offering, status.

## Acceptance criteria

- [ ] Inbox lists Bookings sorted by start time
- [ ] Filter chips: today / this week / this month / custom range
- [ ] Auto-refresh every 15 seconds via TanStack Query
- [ ] New Bookings created externally appear within 15s
- [ ] Each row shows date/time, Client, Practitioner, Offering, status
- [ ] Tests cover: list rendering, polling refresh, filter behavior

## Blocked by

- [#19 — Client books pay-at-venue, Practitioner-first](./19-client-books-pay-at-venue-practitioner-first.md)
