# ClientRelationship: notes, allergies, formulas, marketing consent

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Per ADR-0006: for each (Client, Business) pair, the Business can store private commercial data — notes, allergies, color formulas, marketing consent. ClientRelationship is created automatically on first Booking; this slice adds the editable fields and the Client-detail page in business-web. **Privacy boundary is non-negotiable: data NEVER crosses Business boundaries.** A future engineer must not denormalize these fields onto the Client.

## Acceptance criteria

- [ ] ClientRelationship row auto-created on first Booking between (Client, Business)
- [ ] Business can edit notes (free text), allergies (list), color formulas (list), marketing consent (boolean)
- [ ] Client-detail page in business-web shows all ClientRelationship fields
- [ ] API enforces that another Business cannot read this data
- [ ] Integration test verifies privacy boundary: Business B cannot read Business A's ClientRelationship for the same Client
- [ ] Tests cover: CRUD, privacy boundary, auto-creation

## Blocked by

- [#19 — Client books pay-at-venue, Practitioner-first](./19-client-books-pay-at-venue-practitioner-first.md)
