# Auto-merge unverified Client on later OTP

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

When a Client signs up via marketplace OTP (issue #13) and the verified phone matches an existing unverified Client (created via walk-in or phone channel), merge the records (per ADR-0027). All Bookings, ClientRelationships, NoShowRiskEvents (when issue #35 lands), and BookingHistoryEvents now point to the verified Client; the unverified record is consolidated. The merge is recorded as a `BookingHistoryEvent` of kind `client-merged` on each affected Booking.

## Acceptance criteria

- [ ] During OTP signup, lookup by phone finds matching unverified Client(s)
- [ ] Merge logic preserves all Bookings, ClientRelationships, history
- [ ] Verified Client's id is canonical; unverified record is consolidated
- [ ] BookingHistoryEvent of kind `client-merged` written on each affected Booking
- [ ] Idempotent — re-running the merge with no new unverified record is a no-op
- [ ] Tests cover: merge correctness, idempotency, edge cases (multiple unverified records on same phone)

## Blocked by

- [#13 — Client signup via phone OTP + MessageBird SMS](./13-client-signup-otp-sms.md)
- [#30 — Walk-in Booking by Business with unverified Client](./30-walk-in-booking-with-unverified-client.md)
