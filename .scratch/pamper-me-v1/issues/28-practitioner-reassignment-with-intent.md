# Business: Practitioner reassignment with BookingIntent consent

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Business reassigns a Booking to another Practitioner at the same Venue and time. Per ADR-0013, the silent-vs-consent decision is driven by `BookingIntent`: if `practitioner-locked = false`, the swap is silent; if `true`, Client consent is required (via a `pending-reassignment` flag-state on the Booking with a TTL until the Client accepts or declines). The `BookingIntent` reassignment policy is a domain rule in `packages/domain`.

## Acceptance criteria

- [ ] Reassign action available in business-web Booking detail
- [ ] Domain rule: silent vs requires-consent based on intent + change kind, unit-tested
- [ ] Silent reassignment writes BookingHistoryEvent of kind `practitioner-reassigned`
- [ ] Consent-required reassignment puts Booking in `pending-reassignment` with a TTL
- [ ] Client receives an in-app + SMS notification to accept or decline
- [ ] Decline reverts; accept commits and writes the history event
- [ ] TTL expiry auto-declines
- [ ] Tests cover: both flows, TTL behavior, intent-driven branching

## Blocked by

- [#19 — Client books pay-at-venue, Practitioner-first](./19-client-books-pay-at-venue-practitioner-first.md)
