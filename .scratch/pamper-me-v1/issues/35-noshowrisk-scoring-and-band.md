# NoShowRisk: scoring, decay, cross-Business band display

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Per ADR-0009: NoShowRisk is a platform-level risk score on the Client that increments on no-shows, decays over time, and is the single deliberate cross-Business signal. Add a `NoShowRiskEvent` table that records each no-show. The NoShowRisk computer in `packages/domain` is a pure module that takes event history + decay function and outputs a score and a band (low/medium/high). Business-web inbox surfaces the band on each incoming Client. The underlying Booking history is **never** exposed across Businesses — only the band.

## Acceptance criteria

- [ ] `NoShowRiskEvent` table; row created on every `no-show` mark
- [ ] Domain module: NoShowRisk computer is pure, takes events + decay function, returns score + band
- [ ] Decay function over time (e.g. exponential with ~90-day half-life)
- [ ] API endpoint returns `band` and `score` for a (Client, Business) pair
- [ ] Underlying Booking history is NEVER exposed across Businesses
- [ ] Business inbox surfaces the band on incoming Clients
- [ ] Tests cover: scoring math, decay, band thresholds, cross-Business privacy boundary

## Blocked by

- [#25 — Business: mark Booking no-show within 24h](./25-business-mark-no-show.md)
