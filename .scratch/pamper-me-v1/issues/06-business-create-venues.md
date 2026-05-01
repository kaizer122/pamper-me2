# Business: create Venues with Mapbox-geocoded address

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Once a Business is `active`, the owner can create one or more Venues. Each Venue captures a name, address (street, neighborhood, city = Tunis for v1, postal code), photos, and contact info. The address is geocoded via Mapbox to lat/lng and stored on the Venue (per ADR-0024). A small map preview lets the owner fine-tune the pin if geocoding misses. Photos are uploaded to Cloudflare R2.

## Acceptance criteria

- [ ] Owner can submit a Venue form with all required fields
- [ ] Address is geocoded by Mapbox; lat/lng stored on the Venue
- [ ] Map preview displays the pin; owner can drag to correct
- [ ] Venue photos upload to R2 and render in business-web
- [ ] Venue list page in business-web shows all Venues for the Business
- [ ] Owner can edit and soft-delete (archive) a Venue
- [ ] Tests cover: create Venue, geocoding (stubbed), list, edit, archive

## Blocked by

- [#05 — Admin: review + approve Business KYC](./05-admin-approve-business-kyc.md)
