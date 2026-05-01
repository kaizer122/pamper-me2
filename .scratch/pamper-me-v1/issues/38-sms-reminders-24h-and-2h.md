# SMS reminders 24h + 2h before Booking

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Scheduler in `apps/api` enqueues SMS reminders 24 hours and 2 hours before each `confirmed` Booking's start time. If a Booking is cancelled, the pending reminders are cancelled. If a Booking is rescheduled, the reminders rebind to the new time. Templates in French.

## Acceptance criteria

- [ ] Scheduler enqueues 24h and 2h reminders on Booking confirmation
- [ ] Reminder sent at the scheduled time via MessageBird
- [ ] Cancelled Booking: pending reminders are cancelled (not sent)
- [ ] Rescheduled Booking: reminders rebind to new time
- [ ] Idempotent: scheduler does not double-send
- [ ] Tests cover: scheduling, rebinding on reschedule, cancellation, idempotency

## Blocked by

- [#37 — SMS Booking confirmation on creation](./37-sms-booking-confirmation.md)
