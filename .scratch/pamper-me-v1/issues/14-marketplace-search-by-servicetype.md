# Marketplace: search by ServiceType

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Marketplace home page exposes a search bar driven by ServiceType (the global catalog from issue #03). Selecting a ServiceType returns Businesses that have at least one active ServiceOffering categorized under it. Each result shows Business name, headline Venue, photo, and the lowest matching Offering price.

## Acceptance criteria

- [ ] Marketplace exposes a ServiceType picker on the home page
- [ ] Selecting a ServiceType returns Businesses with at least one matching active Offering
- [ ] Result cards show Business name, Venue (headline), photo, lowest matching price
- [ ] Empty results render a helpful empty state
- [ ] Tests cover: search returns expected Businesses; empty state

## Blocked by

- [#03 — Admin: ServiceType catalog CRUD](./03-admin-servicetype-catalog.md)
- [#11 — Business: create ServiceOfferings](./11-business-create-serviceofferings.md)
