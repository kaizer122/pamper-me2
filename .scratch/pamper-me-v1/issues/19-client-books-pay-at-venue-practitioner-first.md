# Client books pay-at-venue, Practitioner-first

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

The first end-to-end Booking flow. From a Practitioner's profile (or directly from the Business detail page), the Client picks an Offering, picks a slot from the 15-minute grid, picks pay-at-venue as PaymentMethod, and confirms. The Booking is created and confirmed instantly per ADR-0012.

This is the central Booking slice and unavoidably the largest tracer bullet. It includes the Booking schema (with the Postgres `EXCLUDE` constraint on `(practitionerId, occupiedRange)` using `tsrange` and `gist` per ADR-0023), the BookingHistoryEvent table (per ADR-0026), the Booking write path with row-level locking and conflict-violation translation, the TVA decomposer in `packages/domain` and the frozen-on-Booking TVA snapshot per ADR-0025, BookingIntent capture (`practitioner-locked`, `venue-locked`), and the Practitioner-first UI flow.

## Acceptance criteria

- [ ] Schema: Booking, BookingHistoryEvent, EXCLUDE constraint on (practitionerId, tsrange) using gist
- [ ] Domain: Booking lifecycle state machine in `packages/domain`, fully unit-tested
- [ ] Domain: TVA decomposer in `packages/domain`, fully unit-tested
- [ ] API: booking write path uses a transaction with row-level lock; conflict violation translates to a clean "this slot was just booked" response
- [ ] Frozen TVA snapshot (HT, TVA, TTC) stored on the Booking using `Business.taxRegime`
- [ ] BookingIntent recorded: `practitioner-locked = true`, `venue-locked` per entry point
- [ ] BookingHistoryEvent of kind `created` written for every Booking
- [ ] Marketplace UI: Practitioner profile → Offering → slot → pay-at-venue → confirm
- [ ] Integration test against real Postgres: 1000 concurrent booking attempts on the same slot result in exactly one success
- [ ] Unit tests cover the lifecycle state machine and TVA decomposer
- [ ] Playwright E2E covers the full Practitioner-first flow

## Blocked by

- [#08 — Business: configure Practitioner Schedule](./08-business-configure-schedule.md)
- [#11 — Business: create ServiceOfferings](./11-business-create-serviceofferings.md)
- [#13 — Client signup via phone OTP + MessageBird SMS](./13-client-signup-otp-sms.md)
- [#17 — Marketplace: Business detail page](./17-marketplace-business-detail-page.md)
