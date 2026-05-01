# Marketplace: Business detail page

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Clicking a Business on the Marketplace search results opens a detail page (`/business/<slug>`). The page shows the Business name, headline Venue address with map pin, photos, all active ServiceOfferings with price and duration, and the Practitioner roster with photos and bios. SSR-rendered for SEO via TanStack Start.

## Acceptance criteria

- [ ] Detail page renders at a stable, SEO-friendly URL
- [ ] Business name, headline Venue, photos, address, map pin all rendered
- [ ] All active Offerings visible with name, price TTC, duration
- [ ] Practitioner roster with photos and bios
- [ ] Page is server-side rendered with appropriate `<title>` and meta tags
- [ ] Tests cover: page renders for a fixture Business; SSR output includes content

## Blocked by

- [#14 — Marketplace: search by ServiceType](./14-marketplace-search-by-servicetype.md)
