# Deposit forfeit + commission split on late cancel/no-show

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

When an online-paid Booking is late-cancelled (post-cutoff) or marked `no-show`, the Deposit is forfeited per ADR-0011. The forfeit splits per the same commission rules as a completed Booking — Business gets the larger share, platform takes commission. The split is recorded for later payout settlement (issue #47) and B2B commission invoice generation (issue #48). The Deposit & cancellation calculator in `packages/domain` holds the math as a pure, unit-tested module.

## Acceptance criteria

- [ ] Domain module: Deposit & cancellation calculator computes forfeit + commission split, fully unit-tested
- [ ] Late cancel triggers forfeit recording (no Konnect call needed — funds already held)
- [ ] No-show mark triggers forfeit recording
- [ ] BookingHistoryEvent records `deposit-forfeited` with the split breakdown
- [ ] Forfeit ledger entries created for downstream payout / invoice
- [ ] Tests cover: forfeit math at multiple price points, both trigger paths, idempotency

## Blocked by

- [#25 — Business: mark Booking no-show within 24h](./25-business-mark-no-show.md)
- [#32 — Client books online via Konnect Deposit charge](./32-konnect-deposit-charge.md)
