# Open Decisions & Deferred Items

Decisions deliberately deferred from the v1 grilling session. Each entry should resolve into an ADR (or be re-deferred with a fresh reason) before the relevant feature ships.

## Tech / infrastructure

- **Deployment & hosting** — Fly.io vs Cloudflare Pages vs split. Postgres host (Neon vs Fly Managed). Resolve before first production deploy.
- **OpenTelemetry backend** — Honeycomb / Tempo / Datadog / self-host. Instrument with OTel from day one (per ADR-0029); pick the receiver later.
- **CI/CD pipeline shape** — assumed GitHub Actions, not yet specified.
- **Local SMS aggregator swap** — v1 ships on MessageBird; plan a swap to a Tunisian local provider once volume justifies the integration cost (per ADR-0024).

## Real-time

- **SSE for Business calendar live updates** — planned for v1.5. v1 polls. (Per ADR-0023.)

## Domain / product

- **Multi-stage processing-time Offerings** — chemical color services where the Practitioner is free during processing. Important for full salons; deliberately deferred for v1 (per ADR-0014).
- **`bufferBefore` per Offering** — symmetric counterpart to `bufferAfter`. Forward-compatible add (per ADR-0014).
- **Per-Practitioner price overrides** — senior/junior pricing as a single Offering with a price grid, instead of two separate Offerings. Deferred (per ADR-0005); workaround is to model as two Offerings.
- **Request-to-book mode** (per-Offering approval) — `requiresApproval` flag on Offering. Deferred (per ADR-0012); v1 is instant-book everywhere.
- **Arabic localization** — French-only in v1 (per ADR-0016). Schema, content pipeline, and RTL frontend audit needed when added.
- **Push notifications & native mobile apps** — web-first PWA in v1; defer.
- **WhatsApp Business as a comms channel** — Meta WABA onboarding cost. Defer; SMS covers the case.
- **Packages / multi-service bundles** — model as a `Package` aggregating Offerings when needed.
- **Memberships / subscriptions** — recurring service plans. v2.
- **Gift cards** — v2.
- **Multi-Practitioner Bookings** (one Booking, multiple people) — the wash-by-junior, color-by-senior pattern. v2.
- **Discounts / promo codes** — v2.
- **Paid promotion / sponsored marketplace slots** — deliberately excluded in v1 to avoid biasing ranking signal collection (per ADR-0028).
- **Search ranking weight schedule** — structure committed in v1 (per ADR-0028); the actual weights tune from real-traffic data.

## Regulatory

- **BCT registration** of Pamper Me as the marketplace handling third-party funds — required before launch (per ADR-0010). Needs concrete legal sign-off.
- **TVA collection and remittance** — Pamper Me's commission TVA registration; client-money / segregated-balance accounting model. Needs legal sign-off (per ADR-0010, ADR-0025).
- **Konnect marketplace / sub-merchant API capabilities** — verify what split-payment flows Konnect supports today; informs whether we evolve from MoR-platform toward sub-merchants (per ADR-0010).
