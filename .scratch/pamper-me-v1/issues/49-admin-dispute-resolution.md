# Admin dispute resolution with full audit trail

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Admin can resolve disputes via admin-web by overriding a `no-show` mark, refunding a Deposit against policy, reassigning a Booking, or cancelling a Booking outside the normal window. Every action writes a `BookingHistoryEvent` with `actorRole = admin` and a free-text reason. Underlying state transitions (status, payment refund via Konnect, etc.) follow the dispute action.

## Acceptance criteria

- [ ] Admin-web Booking detail view exposes dispute actions: override-no-show, refund Deposit, reassign Practitioner, cancel against policy
- [ ] Each action requires a free-text reason
- [ ] Actions write BookingHistoryEvent with `actorRole = admin`, reason in payload
- [ ] Override-no-show transitions status appropriately
- [ ] Refund-against-policy triggers a Konnect refund call regardless of cutoff
- [ ] Reassign by admin operates with admin authority (no Client consent required, but recorded)
- [ ] Tests cover: each action, audit log integrity, Konnect refund happy path

## Blocked by

- [#19 — Client books pay-at-venue, Practitioner-first](./19-client-books-pay-at-venue-practitioner-first.md)
- [#32 — Client books online via Konnect Deposit charge](./32-konnect-deposit-charge.md)
