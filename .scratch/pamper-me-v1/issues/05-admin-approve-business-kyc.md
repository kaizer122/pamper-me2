# Admin: review + approve Business KYC

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Admin-web review queue listing Businesses with status `pending-kyc`. Admin opens a Business, reviews the submitted KYC fields, and either approves (Business transitions to `active`) or rejects with a reason. Rejected Businesses can resubmit, with prior rejection reasons visible to the owner.

## Acceptance criteria

- [ ] Admin-web exposes a pending-KYC queue sorted by submission time
- [ ] Admin can view full KYC submission for any pending Business
- [ ] Admin can approve, transitioning Business to `active`
- [ ] Admin can reject with a free-text reason
- [ ] Owner sees rejection reason in business-web and can resubmit (status returns to `pending-kyc`)
- [ ] Approval is required before owner can create Venues, Practitioners, or Offerings
- [ ] Tests cover: approve, reject, resubmit cycle, gating on downstream actions

## Blocked by

- [#03 — Admin: ServiceType catalog CRUD](./03-admin-servicetype-catalog.md)
- [#04 — Business signup + KYC submission](./04-business-signup-kyc.md)
