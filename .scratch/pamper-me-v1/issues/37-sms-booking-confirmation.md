# SMS Booking confirmation on creation

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

On Booking confirmation, send an SMS to the Client's phone via the MessageBird `SmsProvider` (per ADR-0024). Template in French; includes date/time, Business name, Venue address, and a brief cancellation policy reminder.

## Acceptance criteria

- [ ] SMS dispatched on `confirmed` transition (both pay-at-venue and online flows)
- [ ] Template includes date, time, Business name, Venue address, cancellation policy reminder
- [ ] Idempotent: duplicate confirmation does not double-send
- [ ] Failures logged; non-blocking for Booking write path
- [ ] Tests cover: hook fires, template rendering, idempotency

## Blocked by

- [#13 — Client signup via phone OTP + MessageBird SMS](./13-client-signup-otp-sms.md)
- [#19 — Client books pay-at-venue, Practitioner-first](./19-client-books-pay-at-venue-practitioner-first.md)
