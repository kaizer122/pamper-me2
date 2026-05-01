# Payouts: settlement records + Business payout view

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Periodic settlement of online-paid `completed` Bookings and forfeit allocations into Business payouts. Each Payout record links to its underlying Bookings/forfeits and shows the gross, commission deduction, and net amount. Business-web payout view lists past and pending payouts with full itemization for reconciliation.

## Acceptance criteria

- [ ] Settlement scheduler runs at a configurable cadence (e.g. weekly)
- [ ] Eligible: `completed` online Bookings + late-cancel and no-show Deposit forfeits since the previous settlement
- [ ] Payout record links to all underlying Bookings and forfeits
- [ ] Itemization shows gross, commission, net
- [ ] Business-web payout view lists past and pending payouts; clicking expands itemization
- [ ] Idempotent — re-running the scheduler does not double-pay
- [ ] Tests cover: settlement math, payout record correctness, idempotency

## Blocked by

- [#32 — Client books online via Konnect Deposit charge](./32-konnect-deposit-charge.md)
