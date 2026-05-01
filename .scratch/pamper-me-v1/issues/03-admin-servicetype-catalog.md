# Admin: ServiceType catalog CRUD

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

The platform-owned ServiceType catalog is curated by Admins (per ADR-0003). Build admin-web pages to create, edit, and retire ServiceType entries. ServiceType has a name, slug, and optional parent (for taxonomy hierarchy like "Hair > Color > Balayage"). Retiring soft-deletes a ServiceType so it disappears from Marketplace search but existing references remain intact.

## Acceptance criteria

- [ ] Admin can create a ServiceType (name, slug, optional parent)
- [ ] Admin can edit name and slug; cannot change a slug that is already referenced
- [ ] Admin can retire a ServiceType (soft delete)
- [ ] Retired ServiceTypes are excluded from search but still resolve for existing references
- [ ] List view supports search by name and shows the taxonomy tree
- [ ] Slugs are unique; validation prevents collisions
- [ ] Tests cover: CRUD round-trip, retire-keeps-references, slug uniqueness

## Blocked by

- [#01 — Bootstrap + Admin login](./01-bootstrap-admin-login.md)
