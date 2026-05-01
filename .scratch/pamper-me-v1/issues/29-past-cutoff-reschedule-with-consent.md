# Past-cutoff reschedule with Client consent flow

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

When the Business needs to reschedule a Booking past the cancellation cutoff, the Booking enters a `pending-reschedule` flag-state with the proposed new time. The Client receives an in-app + SMS notification and accepts or declines in marketplace-web. Acceptance mutates the Booking to the new time; decline keeps the original time. A TTL (e.g. 24h) auto-declines if the Client doesn't respond. Per ADR-0012 / ADR-0026.

## Acceptance criteria

- [ ] Business can propose a new time past the cutoff from business-web
- [ ] Booking enters `pending-reschedule` with the proposed new time and a TTL
- [ ] Client receives notifications (in-app + SMS)
- [ ] Client accept mutates the Booking to the new time and writes BookingHistoryEvent
- [ ] Client decline keeps the original time and writes BookingHistoryEvent
- [ ] TTL expiry auto-declines
- [ ] Tests cover: full flow, TTL expiry, accept/decline branches

## Blocked by

- [#27 — Client reschedule pre-cutoff](./27-client-reschedule-pre-cutoff.md)
- [#28 — Business: Practitioner reassignment with BookingIntent consent](./28-practitioner-reassignment-with-intent.md)
