# Marketplace: Schedule preview with next-available slots

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

On the Business detail page, each Offering shows a "next available" widget — the next N slots across the next 7 days, computed from the eligible Practitioners' Schedules, breaks, time off, and existing Bookings, quantized to the platform-wide 15-minute slot grid (per ADR-0014). Includes the slot-grid arithmetic in `packages/domain` as a deep, isolated module per the PRD's testing decisions.

## Acceptance criteria

- [ ] Each Offering shows up to N next-available slots in the 15-minute grid
- [ ] Computation respects working blocks, breaks, time off, existing Bookings, and `bufferAfter`
- [ ] Slots refresh on next page load (no real-time per ADR-0023)
- [ ] Slot-grid arithmetic lives in `packages/domain` with no I/O dependencies
- [ ] Unit tests on the domain module cover quantization, intersection, edge cases
- [ ] Integration test: slots correctly exclude Bookings, breaks, time off

## Blocked by

- [#08 — Business: configure Practitioner Schedule](./08-business-configure-schedule.md)
- [#17 — Marketplace: Business detail page](./17-marketplace-business-detail-page.md)
