# Client signup via phone OTP + MessageBird SMS

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Phone-based signup on marketplace-web (per ADR-0007). Client enters their Tunisian phone number, receives an SMS OTP via MessageBird, verifies the code, and is logged in. On first verification, a Client record is created with `identityVerified = true`. A password is optional and can be set later. Includes the MessageBird SMS adapter behind a `SmsProvider` interface (per ADR-0024) so a future swap to a local Tunisian aggregator is one config change.

## Acceptance criteria

- [ ] Marketplace-web signup form accepts a phone in Tunisian format with validation
- [ ] OTP request triggers MessageBird (or sandbox) to dispatch the SMS
- [ ] Client enters the code; on success the Client record is created with `identityVerified = true`
- [ ] Session is persistent (database-backed) across reloads
- [ ] Client can later set a password from a settings page
- [ ] OTP retry, expiry, and rate-limiting behave sensibly
- [ ] `SmsProvider` interface in the codebase; MessageBird is one implementation
- [ ] Tests cover: full OTP happy path, retry, invalid code, expiry, rate-limit

## Blocked by

- [#01 — Bootstrap + Admin login](./01-bootstrap-admin-login.md)
