# Reviews: Client writes (3-dim + text, 14-day window, completion gate)

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Per ADR-0015: within 14 days after a Booking's end time, if the Booking is `completed` (auto-completed via issue #24), the Client can submit a Review with three numeric ratings (Business, Practitioner, Venue) plus a free-text comment. One Review per Booking. The completion gate and 14-day window are enforced by domain rules in `packages/domain`.

## Acceptance criteria

- [ ] Review form on marketplace-web exposed only when Booking is `completed` and within the 14-day window
- [ ] Form validates 1–5 stars on each of Business, Practitioner, Venue
- [ ] Free-text comment optional; max length enforced
- [ ] Submission rejected if window expired or one Review already exists for the Booking
- [ ] Window enforcement is a pure function in `packages/domain`, unit-tested
- [ ] Tests cover: happy path, window expiry rejection, double-submit rejection, completion-gate rejection

## Blocked by

- [#24 — Bookings auto-complete after end + grace](./24-bookings-auto-complete.md)
