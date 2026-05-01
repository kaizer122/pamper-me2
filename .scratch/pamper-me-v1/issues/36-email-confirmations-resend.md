# Email confirmations on Booking via Resend

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

On Booking lifecycle events (`confirmed`, `cancelled`, `rescheduled`, `pending-reschedule` proposal), send an email to the Client (and optionally the Business) via Resend (per ADR-0024). Templates are in French (per ADR-0016). Behind an `EmailProvider` interface so a swap is one config change.

## Acceptance criteria

- [ ] Resend adapter implements `EmailProvider`
- [ ] Hooks fire on Booking events: confirmed, cancelled, rescheduled, pending-reschedule
- [ ] Templates use French copy, include Booking details and Business contact info
- [ ] Idempotent: duplicate event does not double-send
- [ ] Failures logged; non-blocking for the Booking write path
- [ ] Tests cover: hook-fires-on-event, template rendering, idempotency

## Blocked by

- [#19 — Client books pay-at-venue, Practitioner-first](./19-client-books-pay-at-venue-practitioner-first.md)
