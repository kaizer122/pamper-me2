# Reviews: Admin moderation

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Per ADR-0015: post-publication moderation. Admin can hide Reviews that violate policy (slurs, fake claims, PII). Hidden Reviews still exist in the database but are not displayed publicly, and they are excluded from aggregate computations. Admin can unhide.

## Acceptance criteria

- [ ] Admin-web shows a moderation queue (Reviews flagged or browsed)
- [ ] Admin can hide / unhide a Review with a reason
- [ ] Hidden Reviews are excluded from public Business detail page
- [ ] Hidden Reviews are excluded from aggregate computations (Business, Practitioner, Venue)
- [ ] Audit log entry created on hide/unhide
- [ ] Tests cover: hide/unhide, aggregate respects hidden state

## Blocked by

- [#40 — Reviews: auto-publish + Marketplace display + aggregate rating](./40-reviews-publish-display-aggregate.md)
