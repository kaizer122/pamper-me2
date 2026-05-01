# Business: create ServiceOfferings linked to ServiceTypes

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Owner creates ServiceOfferings — what the Business actually sells (per ADR-0003). Each Offering has a name, duration in minutes, price in TND TTC, eligible Practitioners (multi-select from the Business's roster), and one or more ServiceType categories from the global catalog. Offerings are searchable on the Marketplace via their ServiceTypes.

## Acceptance criteria

- [ ] Owner can create an Offering with name, duration, priceTtc, eligible Practitioners, ServiceTypes
- [ ] Validation: duration is a positive integer; price > 0; at least one Practitioner; at least one ServiceType
- [ ] Offering appears in business-web Offering list
- [ ] Owner can edit and archive Offerings
- [ ] Archived Offerings disappear from Marketplace but preserve historical Bookings
- [ ] Tests cover: create, edit, archive, validation

## Blocked by

- [#03 — Admin: ServiceType catalog CRUD](./03-admin-servicetype-catalog.md)
- [#07 — Business: create Practitioners](./07-business-create-practitioners.md)
