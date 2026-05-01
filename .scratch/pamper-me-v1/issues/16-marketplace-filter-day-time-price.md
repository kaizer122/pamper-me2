# Marketplace: filter by day, time, price

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Marketplace search results gain filter chips for booking day, time-of-day window, and price range. Filters compose with ServiceType and location filters and narrow the result set on the API side.

## Acceptance criteria

- [ ] Filter chips: day picker (today, tomorrow, this week, custom), time-of-day (morning / afternoon / evening / custom), price range
- [ ] Filters compose with ServiceType and location filters
- [ ] Empty result set renders a clear empty state with filter-clear affordance
- [ ] API computes filtered availability against Schedule, breaks, time off, and existing Bookings
- [ ] Tests cover: each filter individually and composed

## Blocked by

- [#14 — Marketplace: search by ServiceType](./14-marketplace-search-by-servicetype.md)
