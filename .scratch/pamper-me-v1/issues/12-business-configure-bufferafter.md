# Business: configure `bufferAfter` on Offerings

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Add a `bufferAfter` field (in minutes) to ServiceOffering (per ADR-0014). The Practitioner's calendar consumes `duration + bufferAfter` for any Booking of that Offering. The Client never sees the buffer; the Marketplace shows only `duration` to the Client.

## Acceptance criteria

- [ ] Owner can set `bufferAfter` (0–N minutes) on an Offering
- [ ] Practitioner calendar block for a Booking spans `duration + bufferAfter`
- [ ] Marketplace UI shows only `duration` to the Client
- [ ] Slot availability computation respects the buffered block
- [ ] Tests cover: bufferAfter applied to slot computation; client-vs-business display divergence

## Blocked by

- [#11 — Business: create ServiceOfferings](./11-business-create-serviceofferings.md)
