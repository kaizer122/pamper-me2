# Pamper Me v1 — Launch PRD

Status: needs-triage

## Problem Statement

In Tunis today, booking a beauty or wellness service means calling a salon, hoping they answer, and trusting that the slot they verbally hold is still there when you arrive. Salons run their schedules in WhatsApp threads and paper books, miss double-bookings on busy days, lose revenue to no-shows with no recourse, and have no online presence beyond a Facebook page that may or may not be up to date. Clients can't compare options on price, distance, or availability without making a round of phone calls. There's no concept of a verified booking, a deposit, or a paper trail when something goes wrong.

For independent and small Businesses — the dominant supply segment in Tunis — there is also no affordable scheduling SaaS that fits how they actually work: bilingual Tunisian staff, walk-in clients alongside scheduled ones, a tax regime split between `régime réel` and `régime forfaitaire`, and a payment culture that strongly defaults to pay-at-venue.

## Solution

Pamper Me is one bundled product: a Marketplace where Clients discover and book beauty and wellness services in real time, plus the SaaS that Businesses use to manage their Schedule, Bookings, ClientRelationships, and Offerings. Listing on the Marketplace requires using the SaaS — the Marketplace's promise of real-time availability is only honest because every Practitioner's calendar lives in our system.

The Client app lets people search by service or location, see actually-bookable slots, book instantly, optionally pay a Deposit online via Konnect (or pay at the Venue), and get SMS confirmations and reminders. The Business app lets owners configure Venues, Practitioners, Schedules, and ServiceOfferings, accept or manage incoming Bookings, handle walk-ins at the counter, see ClientRelationship history with their own notes, and respond to Reviews. The platform handles deposits, cancellations, no-show risk tracking, TVA decomposition, and a B2B commission invoice each month.

V1 launches in Tunis only, in French only, with two payment methods (pay-at-venue and online via Konnect), Pamper Me as the Merchant of Record, and instant-book everywhere.

## User Stories

### Client discovery and booking

1. As a Client, I want to search for a ServiceType in a chosen Tunis neighborhood, so that I can find Businesses near me that offer what I need.
2. As a Client, I want to filter results by day, time-of-day, and price range, so that I only see Businesses that are actually bookable in my window.
3. As a Client, I want to see a list of Businesses sorted by distance, rating, and recent activity, so that I'm not wading through dormant or far-away listings.
4. As a Client, I want to land on a Business page that shows their Venue address, photos, ServiceOfferings, available Practitioners, and Reviews, so that I can decide whether to book.
5. As a Client, I want to start a booking from a specific Practitioner's profile, so that I can pick a person whose work I trust.
6. As a Client, I want to start a booking from a specific Venue, so that I can pick a place whose location I trust even if I don't know the Practitioners.
7. As a Client, I want to start a booking from a marketplace search result and then pick the Venue/Practitioner combination, so that I can find any open slot quickly.
8. As a Client, I want to choose "any available Practitioner" at a Venue, so that I can grab the soonest slot without scrolling individual calendars.
9. As a Client, I want a 15-minute slot grid I can read at a glance, so that I'm not staring at a wall of awkward 13:47 start times.
10. As a Client, I want to see ServiceOffering names and prices in TTC, so that the price I'm shown is the price I'll pay.
11. As a Client, I want a Booking attempt that someone else just took to fail cleanly with a "this slot was just booked, pick another" message, so that I never end up with a phantom or duplicate Booking.

### Client identity and OTP

12. As a Client booking for the first time, I want to enter only my phone number and verify via SMS OTP, so that I don't have to invent and remember a password just to book a haircut.
13. As a Client, I want to optionally set a password after my first Booking, so that future logins are faster than re-doing OTP every time.
14. As a Client, I want my single Pamper Me account to work across every Business I book with, so that I never have to manage multiple logins.
15. As a Client, I want to know that my notes at one salon (allergies, color formulas) are not visible to other salons, so that I trust giving honest info.

### Client payment

16. As a Client, I want to choose between pay-at-venue and pay online when both are offered, so that I can pay the way I'm comfortable.
17. As a Client paying online, I want to pay only the Deposit at booking time and the balance at the Venue, so that I'm not committing the full amount to a salon I haven't been to.
18. As a Client, I want a clear receipt showing service HT, TVA, and TTC after a paid Booking, so that I have what I need for personal or business records.
19. As a Client cancelling within the cancellation cutoff, I want my Deposit refunded automatically to the same card, so that I don't have to chase a refund.
20. As a Client cancelling past the cancellation cutoff, I want to be told clearly that my Deposit will be forfeited before I confirm, so that I'm not surprised.

### Client lifecycle: reschedule, cancel, reminders, reviews

21. As a Client, I want to reschedule a Booking within the cancellation cutoff without paying anything new, so that small calendar changes are friction-free.
22. As a Client, I want to receive an SMS confirmation immediately after booking, so that I have proof and a reminder.
23. As a Client, I want SMS reminders 24 hours and 2 hours before my Booking, so that I don't forget.
24. As a Client whose Practitioner is unavailable on the day, I want to be offered another Practitioner at the same Venue and same time silently if I asked for "any available", or asked for consent if I picked the specific Practitioner, so that the swap respects my original intent.
25. As a Client whose Booking required a Venue change, I want to be asked for explicit consent before the Venue is moved, so that I never get sent across the city without warning.
26. As a Client, I want to write one Review per completed Booking with three ratings (Business, Practitioner, Venue) plus free text, within 14 days of the Booking ending, so that my feedback is verified and timely.

### Business onboarding

27. As a Business owner, I want to register on Pamper Me with my company information, choose my TaxRegime (`reel` or `forfaitaire`), and submit KYC, so that I can be approved to list.
28. As a Business owner, I want to define one or more Venues with addresses, photos, and Mapbox-pinned coordinates, so that Clients can find me.
29. As a Business owner, I want to add Practitioners as employees of my Business, with their names, photos, bios, so that Clients can recognize who they'll see.
30. As a Business owner, I want to define ServiceOfferings — name, duration, price TTC, optional `bufferAfter`, optional Deposit amount, accepted PaymentMethods, eligible Practitioners, and one or more ServiceType categories — so that Clients can search and book.
31. As a Business owner, I want to set my CancellationCutoff (default 24 hours), so that my refund and forfeit policy is configurable.
32. As a Business owner, I want to configure each Practitioner's Schedule as recurring working blocks, each tagged with a Venue, so that the same Practitioner can split time across my multiple Venues without double-booking.
33. As a Business owner, I want to add break times (lunch, prep) within working blocks, so that Bookings can't land on top of them.
34. As a Business owner, I want to mark time off (vacation, sick), so that the Practitioner's calendar reflects reality.

### Business operations

35. As a Business staff member, I want to log in with email + password (with optional phone OTP as second factor), so that my login is independent of my Client identity.
36. As a Business owner, I want to see incoming Bookings in an inbox view that auto-refreshes (polling) every 15 seconds, so that I notice new bookings quickly without having to refresh.
37. As a Business owner, I want a calendar view per Practitioner showing all Bookings, breaks, and time off, so that I can see the day's shape.
38. As a Business owner, I want to add a walk-in Booking by entering the Client's name and phone number directly, with no OTP friction at the counter, so that I can serve someone who walked in.
39. As a Business owner, I want to look up an existing Client by phone number for repeat walk-ins, so that I don't create duplicate records.
40. As a Business owner, I want to reschedule a confirmed Booking to a new time, with Client consent required if past the cancellation cutoff, so that I can adapt to operational changes without abusing the Client's trust.
41. As a Business owner, I want to reassign a Booking to another Practitioner at the same Venue and time, silent if the Client picked "any available" and with consent otherwise, so that I can handle a Practitioner being unavailable.
42. As a Business owner, I want to mark a Booking as no-show within 24 hours of the end time, so that the Deposit is forfeited (where applicable) and the Client's NoShowRisk reflects reality.
43. As a Business owner, I want a Booking to auto-complete after its end time + a grace window unless I marked it no-show, so that I don't have to manually close every Booking.
44. As a Business owner viewing an incoming Client, I want to see their NoShowRisk band (low / medium / high), so that I can make an informed decision on a high-risk customer without seeing their actual booking history at other Businesses.

### Business client relationship

45. As a Business owner, I want a ClientRelationship view per Client containing my own notes (allergies, formulas, preferences) and only my Booking history, so that I can give consistent service.
46. As a Business owner, I trust that my ClientRelationship notes do not leak to other Businesses, so that I can store commercially sensitive notes honestly.
47. As a Business owner, I want a Client's full Booking history at *my* Business to inform repeat-Client recognition, so that I can offer better service.

### Business reviews

48. As a Business owner, I want to see all Reviews left on my completed Bookings, so that I can monitor reputation.
49. As a Business owner, I want to post one public response per Review, so that I can address concerns without thread wars.
50. As a Business owner, I want my Practitioner's portable rating to follow them if they leave my Business, but the original Review text to stay associated with my Business at the time of the Booking, so that the historical record stays honest.

### Business payments and payouts

51. As a Business owner, I want to choose which PaymentMethods I accept (pay-at-venue, online via Konnect, or both), so that I can match how my customers prefer to pay.
52. As a Business owner accepting online payments, I want Pamper Me to act as Merchant of Record so that my onboarding requires no Konnect KYC of my own, so that I can list quickly.
53. As a Business owner, I want a payout schedule that settles online-paid Bookings to my bank account on a predictable cadence, with each payout itemizing the underlying Bookings and commission, so that I can reconcile.
54. As a Business owner under `régime réel`, I want a monthly B2B commission invoice from Pamper Me showing commission HT + TVA, so that I can deduct the commission TVA on my own return.
55. As a Business owner, I want forfeited Deposits (from late cancellation or no-show) to settle into my payout under the same commission-split rules as a completed Booking, so that the no-show economics are predictable.

### Practitioner

56. As a Practitioner, I want to log in to the Business app and see my own Schedule and my own Bookings, so that I know my day.
57. As a Practitioner, I want to see Client notes and ClientRelationship history that my Business has stored about repeat Clients, so that I can give continuous service.
58. As a Practitioner, I do not have permission to edit Offerings, Schedules, or Business settings — only my Business owner can, so that the operational boundaries are clear.

### Admin (Pamper Me staff)

59. As a Pamper Me Admin, I want to log in with email + password + mandatory TOTP, so that internal access is gated.
60. As an Admin, I want to curate the global ServiceType catalog (create, edit, retire), so that the Marketplace search taxonomy stays honest.
61. As an Admin, I want to review and approve Business KYC submissions, so that only legitimate Businesses list.
62. As an Admin, I want to review flagged Reviews and hide ones that violate policy (slurs, fake claims, PII), so that the Marketplace stays trustworthy.
63. As an Admin, I want to handle disputes — refund a Booking against policy, override a no-show mark, reassign to a different Business — with a full audit trail of every action, so that I can resolve customer issues.
64. As an Admin, I want to provision other Admin accounts manually (no public signup), so that internal access remains controlled.

### Cross-cutting platform behavior

65. As any user, I want every Booking action (create, reschedule, reassign, cancel, mark no-show, auto-complete) to be recorded as an immutable BookingHistoryEvent, so that there is always a clear audit trail.
66. As any user, I want the platform to never double-book a Practitioner, even under concurrent booking attempts, so that I can trust the calendar.
67. As a Client whose phone number was first used as a walk-in by a Business and who later signs up properly via the Marketplace, I want my walk-in history to merge into my verified account automatically, so that my NoShowRisk and Booking history are unified.

## Implementation Decisions

### Architecture shape

- The repo is a single Bun + TypeScript monorepo using Bun workspaces and Turborepo for task orchestration with content-hash caching (per ADR-0018, 0014).
- Four separately-deployable apps live in `apps/`: `api` (Hono on Bun, the backend service), `marketplace-web` (TanStack Start, SSR-heavy, SEO-critical), `business-web` (TanStack Router on Vite, SPA), and `admin-web` (TanStack Router on Vite, SPA). Per ADR-0017, 0020.
- Shared code lives in `packages/`: `db`, `domain`, `contracts`, `ui`, `validation`, `config`. Per ADR-0018.
- The `domain` package has zero I/O dependencies and contains the pure rules; the `api` app composes `domain` with `db` (Drizzle) and HTTP transport. Per ADR-0018.
- The `contracts` package re-exports the inferred Hono `hc` client type, giving end-to-end type safety between web apps and the API. Per ADR-0019.

### Persistence

- Postgres is the only data store, accessed via Drizzle. Migrations are SQL files generated by Drizzle Kit, committed to the repo, and applied in CI before deploy. No `db push` against production. Per ADR-0021.
- A Postgres `EXCLUDE` constraint using `gist` on `(practitioner_id, occupied_range)` with `tsrange` overlap makes double-booking the same Practitioner physically impossible. The Booking write path uses a transaction with row-level locking on the Schedule for the relevant window. Per ADR-0023.

### Domain modules (deep, isolated, unit-testable)

The following are extracted as deep modules in `packages/domain` with small, stable interfaces:

- **Booking lifecycle state machine** — pure transitions across `pending-payment`, `confirmed`, `completed`, `no-show`, `cancelled`, `expired`. Per ADR-0012.
- **Deposit & cancellation calculator** — given a Booking, the cancellation cutoff, and the actor, returns the forfeit/refund decision and split per the commission rules. Per ADR-0011.
- **NoShowRisk computer** — given a Client's no-show event history and a decay function, returns score and band (low/medium/high). Per ADR-0009.
- **Slot grid & buffer arithmetic** — 15-minute Client-facing quantization, `duration + bufferAfter` calendar block math, working-block intersection. Per ADR-0014.
- **BookingIntent reassignment policy** — given an intent (`practitioner-locked|flexible`, `venue-locked|flexible`) and a proposed change, returns silent-vs-requires-consent. Per ADR-0013.
- **TVA decomposer** — given a TTC price and a `Business.taxRegime`, returns HT and TVA components. The `Money` type carries amount + currency only and never carries a tax rate. Per ADR-0025.

### Auth and identity

- Better Auth, single User table with a `kind` discriminator (`client` | `staff` | `admin`). Per ADR-0022.
- Client identity is anchored on a phone number with an `identityVerified` flag, true after OTP. Marketplace-channel features (online booking, online payment, Reviews, marketing email) require `identityVerified = true`. Walk-in and phone channels create unverified Clients without OTP and auto-merge into a verified Client when the same phone later completes OTP. Per ADR-0007 (refined by ADR-0027).
- Sessions are database-backed, not stateless JWTs, so revocation is cheap and reliable. Per ADR-0022.
- Business roles in v1: `owner`, `practitioner`, placeholder `member`. Per ADR-0022.

### Payments

- Two PaymentMethods: `pay-at-venue` and `online` (Konnect). Each Business toggles which methods they accept; the Client picks at checkout. Per ADR-0008.
- Pamper Me is Merchant of Record for online payments; funds land in the Pamper Me Konnect merchant account and settle to Businesses via a payout schedule. Per ADR-0010.
- Online payment is Deposit-based with a Business-configurable amount per Offering, between a platform-defined floor and the full price. Setting Deposit equal to price is full prepayment. Per ADR-0011.
- Cancellation policy: free cancel before the Business-set cutoff (default 24 h); forfeit on late cancel and no-show. Forfeited Deposits split per the same commission rules as a completed Booking. Per ADR-0011.

### Booking model

- Every Booking is bound to exactly one Practitioner from creation; `BookingIntent` records whether the Practitioner and Venue were specifically chosen or flexible. The Booking does not carry an independent `venueId` — Venue is derived from the Schedule block the time falls in. Per ADR-0004, ADR-0013.
- Instant-book everywhere in v1; `requiresApproval` per-Offering is forward-compatible but deferred. Per ADR-0012.
- Lifecycle: `pending-payment` (online only, ~15 min TTL) → `confirmed` → `completed` (auto, after end time + grace) | `no-show` (manual, 24 h deadline) | `cancelled` (any prior state) | `expired` (only from `pending-payment`). Per ADR-0012.
- Reschedule mutates the Booking row in place; an immutable `BookingHistoryEvent` log is the audit trail. Per ADR-0026.
- `BookingChannel` (`marketplace` | `walk-in` | `phone` | `admin`) is recorded on every Booking. Per ADR-0027.

### Service catalog

- ServiceType is a globally curated catalog owned by the platform, used for Marketplace search. Per ADR-0003.
- ServiceOffering is per-Business: name, duration, price TTC, optional Deposit, optional `bufferAfter`, eligible Practitioners, ServiceType category links. ServiceOffering has a single price and duration in v1; per-Practitioner overrides are deferred. Per ADR-0003, ADR-0005.

### Domain boundaries and privacy

- Provider is split into Business (contractual entity), Venue (location), Practitioner (person with a calendar). The word "Provider" is marketing/UI only and does not appear in domain code. Per ADR-0002.
- Client identity is platform-owned; per-Business data lives on a separate `ClientRelationship`. ClientRelationship data never crosses Business boundaries. Per ADR-0006.
- NoShowRisk is the single deliberate exception: a platform-level risk score on Client, surfaced to Businesses as a band, never as the underlying history. Per ADR-0009.
- Reviews are public marketplace content; Practitioner aggregates follow the Practitioner across Business moves; Review text stays attributed to the (Business, Practitioner, Venue) tuple at the time of the Booking. Per ADR-0015.

### Real-time

- No WebSocket or SSE in v1. Business calendars and Bookings inboxes refresh via 15-second polling. Slot integrity is a database guarantee, not a transport one. Per ADR-0023. SSE for live calendar updates is planned for v1.5.

### Marketplace search

- Hard filters: ServiceType match, day/time availability (Businesses with no slot are excluded entirely), price range, Practitioner constraint. Per ADR-0028.
- Ranking signals: distance, aggregate Business rating, recency of activity, profile completeness. No paid promotion in v1. Per ADR-0028.
- Geocoding via Mapbox.

### Localization and tax

- French only in v1; no translation infrastructure, no per-field locale columns. Schema carries `Money { amount, currency }` for forward-compatibility but text is single-column French. Per ADR-0016.
- Tunisian TVA modeled via `Business.taxRegime` (`reel` | `forfaitaire`). Prices are TTC; HT and TVA are decomposed and frozen on the Booking at creation; Pamper Me commission is independently TVA-able. Per ADR-0025.

### Provider stack

- Cloudflare R2 for object storage. Resend for email. MessageBird (or Vonage) for SMS, with a `SmsProvider` interface designed for a v1.5 swap to a local Tunisian aggregator. Mapbox for maps and geocoding. Per ADR-0024.
- Konnect is the only online payment provider in v1. Per ADR-0008.

### API contract

- The `api` app exposes Hono routes with `@hono/zod-validator` for request validation. The `packages/contracts` package re-exports the inferred client type from `hc<typeof app>`, consumed by all three web apps. Hand-maintained API types are forbidden — auto-generation prevents the silent type drift that always poisons hand-maintained contract packages. Per ADR-0019.

### Audit

- Every Booking transition writes a `BookingHistoryEvent` with `(bookingId, kind, actor, actorRole, occurredAt, payload)`. Append-only; never mutated or deleted. Source of truth for audit, analytics, and dispute resolution. Per ADR-0026.

### Schema highlights

The persistence model centers on these aggregates:

- **Business** with `taxRegime`, `acceptedPaymentMethods`, payout details.
- **Venue** with address, geo, photos; FK to Business.
- **Practitioner** with profile and `kind = staff` user link; FK to Business.
- **Schedule** as Practitioner-owned recurring working blocks, each block carrying `(venueId, start, end, breaks)`.
- **ServiceType** with name, slug, taxonomy parent (platform-owned).
- **ServiceOffering** with name, duration, priceTtc, depositAmount nullable, bufferAfterMinutes, eligiblePractitionerIds; FK to Business; many-to-many with ServiceType.
- **Client** with phone, identityVerified, optional email/password, optional displayName.
- **ClientRelationship** with notes, allergies, formulas, marketingConsent; (clientId, businessId) unique.
- **Booking** with `(clientId, practitionerId, serviceOfferingId, startsAt, endsAt, bookingChannel, paymentMethod, depositAmount, depositStatus, bookingIntent, status)`. Postgres EXCLUDE constraint on `(practitionerId, occupiedRange)` with `tsrange` and `&&` overlap operator under `gist`.
- **BookingHistoryEvent** with `(bookingId, kind, actor, actorRole, occurredAt, payload)`. Append-only.
- **Review** with `(bookingId, businessRating, practitionerRating, venueRating, comment, businessResponse, hiddenAt)`. One per Booking.
- **NoShowRiskEvent** on Client; aggregate score and band derived.
- **Payment** records linked to Booking when PaymentMethod is online: Konnect transaction id, status, idempotency key.
- **PendingPayment** transient record holding a slot during the Konnect window.
- **Payout** records linking settled Bookings to a Business bank transfer.
- **CommissionInvoice** monthly B2B invoice from Pamper Me to Business.

## Testing Decisions

### What makes a good test in this codebase

- **Test external behavior, not implementation details.** A test should fail when the user-visible or contract-visible behavior changes, not when an internal helper moves files.
- **Domain rules are tested as pure functions.** No database, no HTTP, no mocking. Inputs in, outputs out. Branch coverage of state-transition cases.
- **Slot integrity is tested against a real Postgres**, not a mock. The EXCLUDE constraint is part of the system under test (per ADR-0023); a mock erases the very thing the test is meant to verify.
- **Konnect and external providers are tested against a sandbox** where one exists, with a fake adapter for unit-style tests. Idempotency keys, retry behavior, and webhook reconciliation are first-class test targets.
- **End-to-end smoke tests cover the cross-app booking flow**: Marketplace search → Booking creation → Business calendar update. One pass per release; fast enough to gate CI.
- **No contract testing at the runtime level.** The auto-generated `packages/contracts` makes type errors at build time the contract test (per ADR-0019); runtime contract tests would calcify the wrong thing.

### Modules covered by tests in v1

Unit tests (in `packages/domain`, run by `bun test`):

- Booking lifecycle state machine — every legal and illegal transition.
- Deposit & cancellation calculator — refund/forfeit decisions across cutoff edges, all PaymentMethod combinations, commission split arithmetic.
- NoShowRisk computer — score across event sequences, band thresholds, decay over time.
- Slot grid & buffer arithmetic — quantization, block math, intersection edges.
- BookingIntent reassignment policy — every intent x change-kind combination.
- TVA decomposer — both `taxRegime` values, edge cases around floor and rounding.

Integration tests (in `apps/api`, run against a real Postgres via Testcontainers or a docker-compose fixture):

- Slot integrity layer — concurrent Booking write attempts must produce exactly one success, the EXCLUDE constraint is the load-bearing guarantee.
- Konnect payment adapter — Deposit charge, refund, webhook reconciliation, idempotency on retry. Tested against the Konnect sandbox plus a fake-adapter unit pass for edge-case coverage.
- Auth context handler — three user-kind login flows, session revocation, walk-in unverified-Client merge mechanics.

End-to-end (Playwright, run on a dev stack):

- One smoke suite per app.
- One cross-app booking flow: Client searches the Marketplace, books a slot, the Business calendar reflects the new Booking on next poll.

### Modules deliberately not covered by dedicated tests in v1

- Notification dispatcher — thin orchestration over tested primitives; integration is covered by the cross-app E2E flow.
- Schedule & availability engine — heavy coverage by domain unit tests of the slot arithmetic; the engine is composition over those primitives.
- Marketplace search ranker — signal-tuning territory; tests would calcify weights that should evolve from real-traffic data.
- BookingHistoryEvent log — emission is exercised in every Booking integration test; no dedicated suite needed.

### Prior art

This is a fresh repo; there is no in-repo prior art yet. The first feature shipping should establish the testing patterns above (a unit test in `packages/domain`, an integration test in `apps/api` against Postgres, a Playwright smoke) and subsequent work should follow those examples.

## Out of Scope

The following are deliberately not in v1. The full deferred-decision register is in `OPEN.md` at the repo root. High-level summary:

- **Markets:** Tunis only; no other Tunisian cities, no other countries.
- **Languages:** French only; Arabic and RTL support are a v2 workstream.
- **Real-time transport:** No WebSocket or SSE; polling everywhere. SSE planned for v1.5.
- **Booking complexity:** No multi-stage processing-time Offerings, no `bufferBefore`, no per-Practitioner price overrides, no request-to-book mode, no multi-Practitioner Bookings, no packages, no memberships, no gift cards, no discounts or promo codes.
- **Communications:** SMS + email only. No push notifications, no native mobile apps, no WhatsApp Business.
- **Search:** No paid promotion or sponsored slots in v1; ranking weight schedule is intentionally not committed and tunes from data.
- **Payments:** Konnect only as the online provider; no Paymee, Flouci, or others. No Practitioner-as-Konnect-sub-merchant model (the Pamper Me Konnect account is the single MoR).
- **Mobile:** Web-first PWA; native iOS/Android apps deferred.
- **Hosting and OTel backend:** Deployment provider and OTel receiver are deferred decisions (see OPEN.md).

## Further Notes

- 29 ADRs in `docs/adr/` capture the *why* for every load-bearing or surprising decision. The PRD references them inline; the ADRs are the durable record.
- `CONTEXT.md` at the repo root is the canonical glossary. New code, issues, and discussions should use the terms defined there. The marketing-only terms `Salon` and `Provider` are explicitly forbidden in code per ADR-0002.
- `OPEN.md` tracks every deferred decision with the ADR that deferred it. Engineering should consult it before assuming something is missing — many "why doesn't this exist" gaps are deliberate.
- Three regulatory items must be resolved before launch and are tracked in `OPEN.md`: BCT registration of Pamper Me as the marketplace handling third-party funds, TVA collection and remittance model, and verification of Konnect's marketplace / sub-merchant API capabilities (which informs whether v2 evolves toward sub-merchants).
- The Pamper Me corporate entity (likely a Tunisian SARL) and its BCT registration are prerequisites of the production launch, not engineering deliverables — flagging here so the dependency is visible in this PRD.
