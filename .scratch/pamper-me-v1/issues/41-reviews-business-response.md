# Reviews: Business response

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Per ADR-0015: Business can post one public response per Review. Once posted, the response is visible publicly under the Review on the Business detail page. No editing once posted — the constraint is one response per Review, period.

## Acceptance criteria

- [ ] Business sees Reviews on their Business in business-web
- [ ] Business can submit one response per Review
- [ ] Subsequent attempts to respond are rejected (one-response enforcement)
- [ ] Response is visible publicly under the Review on Business detail page
- [ ] Tests cover: response post, one-response enforcement, public display

## Blocked by

- [#40 — Reviews: auto-publish + Marketplace display + aggregate rating](./40-reviews-publish-display-aggregate.md)
