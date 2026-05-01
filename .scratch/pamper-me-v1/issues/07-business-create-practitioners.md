# Business: create Practitioners

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Approved Business owner can add Practitioner records (name, photo, bio, optional specialties text). A Practitioner belongs to exactly one Business at a time (per ADR-0002). Optionally, a Practitioner can be linked to a Staff User account so they can log in to business-web and see their own schedule.

## Acceptance criteria

- [ ] Owner can submit a Practitioner form (name, photo, bio)
- [ ] Practitioner appears in the Business's roster
- [ ] Owner can optionally invite the Practitioner as a Staff user with `practitioner` role
- [ ] Owner can edit and archive a Practitioner; archive removes them from new bookings but preserves history
- [ ] Photos upload to R2
- [ ] Tests cover: create, list, edit, archive, optional Staff link

## Blocked by

- [#05 — Admin: review + approve Business KYC](./05-admin-approve-business-kyc.md)
