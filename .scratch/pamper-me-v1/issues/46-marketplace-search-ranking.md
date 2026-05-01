# Marketplace search ranking with full signal weighting

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Per ADR-0028: apply the v1 ranking to Marketplace search results. Hard filters (ServiceType match, day/time availability, price range, Practitioner constraint if set) gate the candidate set; ranking signals (distance, aggregate Business rating, recency of activity in last 30 days, profile completeness) order the survivors. **No paid promotion in v1.** Cold-start: new Businesses with 0 reviews surface in their distance band, not deranked below the world.

## Acceptance criteria

- [ ] Hard filters: ServiceType, availability, price range, optional Practitioner — Businesses without availability are excluded entirely (not deranked)
- [ ] Ranking signals: distance, rating, recency (Bookings in last 30 days), profile completeness — composed with reasonable weights
- [ ] Cold-start: new Businesses (0 reviews) surface in their distance band
- [ ] No paid promotion / sponsored slots
- [ ] API exposes the ranked result set
- [ ] Tests cover: ranking against fixtures with controlled signals; cold-start; hard-filter exclusions

## Blocked by

- [#15 — Marketplace: search by location with distance](./15-marketplace-search-by-location.md)
- [#40 — Reviews: auto-publish + Marketplace display + aggregate rating](./40-reviews-publish-display-aggregate.md)
