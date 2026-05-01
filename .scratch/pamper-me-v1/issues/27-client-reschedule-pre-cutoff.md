# Client reschedule pre-cutoff

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Before the cancellation cutoff, Client can reschedule a Booking to a different time on the same Practitioner from marketplace-web. Per ADR-0026, the Booking row is mutated in place (time fields only); identity fields (Client, ServiceOffering, Booking ID, Practitioner) are not rewritten. A BookingHistoryEvent of kind `rescheduled` is written. Deposit (when applicable) stays attached untouched.

## Acceptance criteria

- [ ] Reschedule button visible only before the cutoff
- [ ] Client picks a new time within the same Practitioner's availability
- [ ] Booking row mutates: `startsAt`, `endsAt` updated; identity fields unchanged
- [ ] BookingHistoryEvent of kind `rescheduled` written with from/to payload
- [ ] New time conflict-checked via the EXCLUDE constraint
- [ ] Deposit stays attached — no Konnect call
- [ ] Tests cover: state changes, conflict on busy slot, history event content

## Blocked by

- [#19 — Client books pay-at-venue, Practitioner-first](./19-client-books-pay-at-venue-practitioner-first.md)
