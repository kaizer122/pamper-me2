# Deposit refund via Konnect on pre-cutoff cancel/reschedule

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

When a Client cancels an online-paid Booking before the cancellation cutoff, the Deposit is refunded automatically via the Konnect adapter (per ADR-0011). When a Client reschedules pre-cutoff, the Deposit stays attached (no refund); only Booking time changes. Refund completion is webhook-confirmed and recorded as a BookingHistoryEvent.

## Acceptance criteria

- [ ] Pre-cutoff cancel triggers a Konnect refund call for the full Deposit
- [ ] Refund is webhook-confirmed
- [ ] BookingHistoryEvent of kind `deposit-refunded` written on confirmation
- [ ] Pre-cutoff reschedule does NOT refund; Deposit stays attached
- [ ] UI shows refund pending / completed status to the Client
- [ ] Idempotent — duplicate cancel does not double-refund
- [ ] Tests cover: refund happy path against sandbox, reschedule keeps Deposit, idempotency

## Blocked by

- [#26 — Client cancel pre-cutoff](./26-client-cancel-pre-cutoff.md)
- [#27 — Client reschedule pre-cutoff](./27-client-reschedule-pre-cutoff.md)
- [#32 — Client books online via Konnect Deposit charge](./32-konnect-deposit-charge.md)
