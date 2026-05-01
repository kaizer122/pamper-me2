# Pamper Me

A two-sided beauty & wellness platform: a marketplace where clients discover and book services, plus a bundled SaaS that providers must use to manage their calendar and inventory. Listing on the marketplace is not possible without using the SaaS — the marketplace's promise of real-time availability depends on the calendar living in our system.

## Scope (v1)

- **Market**: Tunisia, Tunis only.
- **Currency**: Tunisian Dinar (TND).
- **Language**: French only. Arabic is deferred — we accept that this excludes an Arabic-first segment of the market in v1.
- **Payment landscape**: Stripe is unavailable; FX controls apply. Local rails (Konnect, Paymee, Flouci, Clictopay) exist but pay-at-venue is the dominant consumer expectation.
- **Schema** carries `Money { amount, currency }` to keep multi-currency forward-compatible, but text fields are stored as a single canonical French value — no translation infrastructure in v1.

## Language

**Business**:
The contractual and billing entity on the platform. Owns one or more Venues and employs one or more Practitioners. For a freelancer, a Business is a venue-of-one. Has a `taxRegime` of either `reel` (TVA-registered, charges 19% TVA on services) or `forfaitaire` (Tunisian flat-tax regime for small businesses, charges no TVA on services).
_Avoid_: Provider, Vendor, Merchant, Salon (when referring to the contractual entity)

**TaxRegime**:
A Business's Tunisian tax classification. `reel` = TVA-registered (charges 19% TVA on service prices, remits to the State); `forfaitaire` = small-business flat-tax regime (no TVA on services). The classification affects how the Booking decomposes the Client's payment on receipts; Pamper Me's commission is independently TVA-able regardless of the Business's regime.
_Avoid_: VATStatus, TaxStatus (use TaxRegime — it matches the legal Tunisian terminology)

**Venue**:
The physical location where a service is performed — a salon address, a home studio, or a mobile pseudo-location. Belongs to exactly one Business.
_Avoid_: Salon (when referring to the address), Location, Site

**Practitioner**:
The person who performs the service. Always has their own calendar. Employed by exactly one Business at a time. Can work at multiple Venues of that Business via a Schedule whose blocks are each tagged with a Venue — no double-booking is possible by construction.
_Avoid_: Provider, Stylist, Therapist, Staff, Employee

**Schedule**:
A Practitioner's working time, expressed as a recurring pattern of working blocks. Each block carries a Venue, a start, an end, and optional breaks. Bookings can only be created inside a working block; the Booking inherits its Venue from the block it falls in.
_Avoid_: Roster, Shift, Availability (use Availability only for the *derived* set of free-vs-busy slots, not for the configured pattern)

**ServiceType**:
A globally curated category that powers marketplace search and filtering (e.g. "Women's haircut", "Balayage", "Swedish massage 60min"). Owned by the platform, not by any Business.
_Avoid_: Category, Tag, Skill (when referring to the catalog entry)

**ServiceOffering**:
What a Business actually sells, with its own name, duration, price, and Practitioner eligibility. Each Offering is categorized under one or more ServiceTypes for search. Belongs to exactly one Business. May carry an optional Deposit amount (a Money value between a platform-defined floor and the full price); setting Deposit equal to the price means full prepayment. Has an optional `bufferAfter` (calendar time consumed after the service ends, invisible to the Client, used for cleanup/reset).
_Avoid_: Service (ambiguous — clarify Type vs Offering), Product, SKU, Treatment

**Deposit**:
A Money amount the Client pays online when booking an Offering whose Business has online payment enabled and a Deposit configured. The Deposit is forfeited on late cancellation or no-show, refunded automatically on cancellation before the cancellation cutoff. Forfeited Deposits are split per the same commission rules as a completed Booking.
_Avoid_: Hold, PreAuth, Reservation fee, DownPayment

**CancellationCutoff**:
The Business-configurable time-before-Booking after which a Client cancellation is "late" and the Deposit is forfeited. Default 24 hours.
_Avoid_: CancellationWindow (ambiguous — could mean either side of the cutoff), DeadlineToCancel

**Booking**:
A scheduled appointment between a Client and exactly one Practitioner for one ServiceOffering at a specific time. The Practitioner is bound from the moment the Booking is created — never floats until check-in. A Booking moves through a lifecycle: optionally `pending-payment` (online only, short TTL), `confirmed`, then auto-transitions to `completed` after the end time + grace window unless marked `no-show`. `cancelled` is reachable from any prior state; `expired` is reachable only from `pending-payment`.
_Avoid_: Appointment (UI synonym only), Reservation, Slot

**BookingStatus**:
The lifecycle state of a Booking. Values: `pending-payment`, `confirmed`, `completed`, `no-show`, `cancelled`, `expired`. Auto-transitions: `pending-payment` → `expired` after TTL with no payment webhook; `confirmed` → `completed` after end time + grace unless `no-show` marked.
_Avoid_: BookingState (we standardize on Status across the codebase)

**BookingHistoryEvent**:
An immutable record of any change to a Booking — created, rescheduled, practitioner-reassigned, cancelled, marked-no-show, auto-completed, etc. Carries `(bookingId, kind, actor, actorRole, occurredAt, payload)`. Source of truth for the audit trail, analytics, and dispute resolution. Never mutated or deleted.
_Avoid_: BookingLog, BookingAudit, ChangeRecord

**BookingChannel**:
The origin of a Booking: `marketplace` (Client booked via the Client app), `walk-in` (Business added a Client physically at the Venue), `phone` (Business added after a phone-call booking), `admin` (Pamper Me staff created — fraud/dispute resolution). Affects which features apply (e.g. Reviews require marketplace channel or a verified walk-in Client) and drives Business-side attribution reporting.
_Avoid_: BookingSource, Origin, BookingType (BookingType is reserved for a possible future product/membership distinction)

**BookingIntent**:
Captured at booking time to record what the Client locked in by their choice. Two orthogonal flags: (a) Practitioner intent — `practitioner-locked` (specific person) or `practitioner-flexible` ("any available"); (b) Venue intent — `venue-locked` (Client picked a specific Venue) or `venue-flexible`. Drives the reassignment policy: a Practitioner change is silent only if `practitioner-flexible`; a Venue change always requires Client consent regardless of intent.
_Avoid_: Preference, Hint

**Client**:
A human who books services on the platform. Owned by the platform: identity, login, contact info, and payment methods live globally. Exists once across the entire platform regardless of how many Businesses they book with. Anchored on a phone number; carries an `identityVerified` flag that is true once the phone has been OTP-verified. Marketplace-channel features (online booking, Reviews, marketing email, online payment) require `identityVerified = true`; walk-in and Business-created records may exist as unverified and auto-merge into a verified Client when the same phone later completes OTP.
_Avoid_: Customer (overloaded — also the Business's own customer base), User (overloaded — Practitioners are also Users), Guest (a Client without a password yet — never a separate domain concept)

**ClientRelationship**:
The per-Business view of a Client: notes, allergies, color formulas, marketing consent, and the Booking history at *this* Business. Created the first time a Client books with a Business. Commercial data of the Business — never crosses Business boundaries, never visible to other Businesses or used by the platform.
_Avoid_: ClientProfile, BusinessClient, Customer (within a Business)

**PaymentMethod**:
How a Booking is paid: either *pay-at-venue* (no online payment; Business collects in-venue with their existing TPE/cash setup) or *online* (paid through the platform via Konnect). Each Business toggles which methods they accept; the Client picks one at checkout from the methods the Business has enabled.
_Avoid_: PaymentChannel, BillingMethod, Tender

**NoShowRisk**:
A platform-level risk score attached to a Client that increments on no-shows and decays over time. Cross-Business by design: a Client who burned Salon X is flagged when booking at Salon Y. Surfaced to Businesses as a single score and a high/medium/low band — never as the underlying Booking history. A deliberate, narrow exception to the rule that ClientRelationship data does not cross Business boundaries.
_Avoid_: ClientReputation, TrustScore, BlacklistFlag

**Review**:
A Client's public assessment of a completed Booking, captured as three ratings (Business, Practitioner, Venue) plus a free-text comment. One Review per Booking; only Clients with a `completed` Booking can submit; review window is 14 days after the Booking ends; auto-published with post-moderation. The Business may post one public response. Review text stays attributed to the Business and Practitioner at the time of the Booking, even if the Practitioner later moves Businesses; aggregate Practitioner ratings follow the Practitioner across moves.
_Avoid_: Rating (use only for the numeric component), Feedback, Testimonial

**Salon**:
Marketing/UI term only. Not a domain concept. In code and design discussions, use Business + Venue.
_Avoid using in code._

**Provider**:
Marketing/UI term only. Not a domain concept. In code and design discussions, use Business / Venue / Practitioner depending on what's meant.
_Avoid using in code._

## Relationships

- A **Business** owns one or more **Venues**
- A **Business** employs one or more **Practitioners** (a freelancer is a Business with one Practitioner)
- A **Practitioner** has their own calendar; **Venues** do not have calendars
- A **Practitioner** has a **Schedule** of working blocks; each block is tagged with a single **Venue**
- A **Booking** inherits its **Venue** from the **Schedule** block it falls inside; Booking does not carry an independent `venueId`
- A **Business** publishes one or more **ServiceOfferings**
- A **ServiceOffering** is categorized under one or more **ServiceTypes**
- The **ServiceType** catalog is owned by the platform, not by Businesses
- A **Booking** is for exactly one **ServiceOffering** and exactly one **Practitioner**
- A **Booking** carries a **BookingIntent** that records whether the Practitioner was specifically chosen or auto-assigned
- A **Client** is owned by the platform; one Client exists per human across the whole platform
- A **ClientRelationship** is the per-Business view of a Client; notes and consent live on the relationship, not on the Client
- **ClientRelationship** data never crosses Business boundaries — except for **NoShowRisk**, which is a platform-level signal on Client and is the sole deliberate exception
- A **Business** enables one or both **PaymentMethods** (pay-at-venue, online); each **Booking** records which method the Client picked at checkout

## Flagged ambiguities

- "Provider" was used to mean Business, Venue, or Practitioner depending on context — resolved: it's a marketing term only, not a domain concept. Pick the precise term in code.
- "Salon" was used to mean both the contractual entity and the physical location — resolved: split into Business (entity) and Venue (location).
