# Two payment methods in v1: pay-at-venue and online via Konnect

A Booking is paid either at the Venue (Business collects with existing TPE/cash) or online via Konnect. Each Business chooses which methods they accept; the Client picks among the enabled methods at checkout. We considered shipping pay-at-venue only in v1 (lower integration cost, faster to ship) but decided the marketplace needs a credible online-payment path from launch to support businesses that already operate that way and to anchor the platform's later commission flow. Stripe is unavailable in Tunisia, so Konnect is the chosen rail; FX controls and BCT regulation make multi-provider integration premature for v1. Booking is still modelled as a *reservation* in the domain (`confirmed`, not `paid`) — payment state is a separate aspect of the Booking, not its identity.

## Consequences

- Konnect integration is a meaningful v1 cost: KYC, settlement timing, refund flow, webhook reconciliation, dispute handling, idempotency. Treat it as one of the load-bearing v1 workstreams, not a side feature.
- Two open sub-decisions remain: (a) merchant of record — does the platform hold the Konnect merchant account and pay out to Businesses, or does each Business hold their own? (b) does "online" mean full prepayment, deposit, or Business-configurable? Both will be recorded in follow-up ADRs.
