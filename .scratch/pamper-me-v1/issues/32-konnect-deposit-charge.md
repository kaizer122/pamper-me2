# Client books online via Konnect Deposit charge

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Add online payment as a checkout option on the Marketplace booking flow per ADR-0008 / ADR-0010 / ADR-0011. When the Business has online enabled and the Offering has a Deposit configured, the Client can pick "online" at checkout. The system creates a `PendingPayment` (Booking is in `pending-payment` state holding the slot) and redirects to Konnect for the Deposit charge. On webhook success, the Booking transitions to `confirmed`. PendingPayment TTL is ~15 minutes; if no webhook arrives the Booking moves to `expired` and the slot releases.

This includes the Konnect adapter behind a `PaymentProvider` interface, the Payment + PendingPayment schema, and idempotent webhook handling. Pamper Me is the Merchant of Record (per ADR-0010).

## Acceptance criteria

- [ ] Client checkout offers online when Business + Offering both support it
- [ ] PendingPayment created; Booking in `pending-payment` state holds the slot
- [ ] Konnect adapter implements `PaymentProvider` (charge, refund, webhook verify)
- [ ] Konnect redirect / hosted-checkout flow integrated
- [ ] Webhook receiver verifies signature, idempotently confirms the Booking
- [ ] Pending TTL (~15 min): expired Booking moves to `expired` and slot releases
- [ ] BookingHistoryEvent emitted on each transition
- [ ] Slot integrity: concurrent pending-payment attempts on the same slot collide via the EXCLUDE constraint, only one succeeds
- [ ] Integration tests against Konnect sandbox: happy path, webhook verification, TTL expiry
- [ ] Unit tests on the adapter for retries and idempotency

## Blocked by

- [#19 — Client books pay-at-venue, Practitioner-first](./19-client-books-pay-at-venue-practitioner-first.md)
