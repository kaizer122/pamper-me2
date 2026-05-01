# Marketplace: search by location with distance

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Add a location picker to Marketplace search. Client picks a Tunis neighborhood by name (Mapbox autocomplete) or uses their current location (browser geolocation). Results filter to Businesses with at least one Venue inside a sensible radius (default 10 km) and each card shows the distance from the chosen point.

## Acceptance criteria

- [ ] Location picker autocompletes via Mapbox
- [ ] "Use current location" works via browser geolocation
- [ ] Results filter to Businesses whose Venues are within the radius
- [ ] Each result card shows distance from the chosen location
- [ ] Filters compose with the ServiceType filter from issue #14
- [ ] Tests cover: location selection, radius filter, distance display

## Blocked by

- [#06 — Business: create Venues](./06-business-create-venues.md)
- [#14 — Marketplace: search by ServiceType](./14-marketplace-search-by-servicetype.md)
