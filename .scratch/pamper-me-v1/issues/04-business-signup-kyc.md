# Business signup + KYC submission

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Public signup flow on business-web. The Business owner fills a multi-step form capturing legal entity info (raison sociale, matricule fiscal, RNE), TaxRegime (`reel` or `forfaitaire` per ADR-0025), owner contact details, and the bank account that future payouts will land in. Submission creates a Business record with status `pending-kyc` and the first staff User (the owner) with the `staff` user kind and email + password authentication (per ADR-0022). The owner can immediately log in to a placeholder dashboard that shows "KYC under review."

## Acceptance criteria

- [ ] Business-web signup form captures all required KYC fields with validation
- [ ] Submission creates a Business with status `pending-kyc` and a Staff owner User
- [ ] Owner can log in to a "KYC under review" placeholder dashboard
- [ ] Owner cannot create Venues, Practitioners, or Offerings while the Business is `pending-kyc`
- [ ] TaxRegime selection is required and stored on the Business
- [ ] Bank account details are captured and stored
- [ ] Tests cover: happy path, validation rejection, pending-kyc gating on downstream actions

## Blocked by

- [#01 — Bootstrap + Admin login](./01-bootstrap-admin-login.md)
