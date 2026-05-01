# Walk-in Booking by Business with unverified Client

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Business adds a walk-in Booking from business-web by entering Client name + phone (and optional email). Per ADR-0027, if the phone matches an existing Client, attach the Booking to that record; otherwise create a new Client with `identityVerified = false`. The Booking is created with `BookingChannel = walk-in` and `paymentMethod = pay-at-venue` (online payment is blocked for unverified Clients).

## Acceptance criteria

- [ ] Walk-in form on business-web (name, phone, optional email)
- [ ] Phone lookup: exact match attaches to existing Client; no match creates an unverified Client (`identityVerified = false`)
- [ ] Booking is created with `channel = walk-in`, `paymentMethod = pay-at-venue`
- [ ] Online payment is rejected for unverified Clients
- [ ] BookingHistoryEvent of kind `created` written with `actorRole = staff`
- [ ] Tests cover: existing match, new walk-in, online-payment-blocked, history event content

## Blocked by

- [#19 — Client books pay-at-venue, Practitioner-first](./19-client-books-pay-at-venue-practitioner-first.md)
