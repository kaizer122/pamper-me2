# Reviews: auto-publish + Marketplace display + aggregate rating

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Per ADR-0015: submitted Reviews auto-publish (no pre-moderation); they appear on the Business detail page (issue #17). Aggregate ratings are computed for Business, Practitioner, and Venue. The Practitioner aggregate follows the Practitioner across Business changes — aggregate is computed across all of that Practitioner's `completed` Bookings regardless of which Business they were employed by at the time. Review text remains permanently attributed to the (Business, Practitioner, Venue) at the time of the Booking.

## Acceptance criteria

- [ ] Submitted Reviews appear on the Business detail page
- [ ] Business aggregate rating shown next to Business name
- [ ] Each Practitioner's aggregate shown on their profile, computed across all `completed` Bookings regardless of Business
- [ ] Review text stays attributed to the original (Business, Practitioner, Venue) tuple
- [ ] Aggregate computation handles cold-start (0 reviews) sensibly
- [ ] Tests cover: aggregate math, cross-Business Practitioner aggregate, cold-start

## Blocked by

- [#17 — Marketplace: Business detail page](./17-marketplace-business-detail-page.md)
- [#39 — Reviews: Client writes](./39-reviews-client-writes.md)
