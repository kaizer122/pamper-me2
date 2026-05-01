# Four apps in a monorepo: marketplace-web, business-web, admin-web, api

The product ships as four separately-deployable apps inside one monorepo: `marketplace-web` (Client-facing, SSR-heavy, SEO-critical), `business-web` (Business SaaS — Schedule, Bookings inbox, ClientRelationship, Offerings, Reviews, payouts), `admin-web` (internal Pamper Me staff — ServiceType catalog, KYC, disputes, moderation), and `api` (the backend service that owns all domain logic, persistence, payments, schedulers, webhooks). Shared code lives in `packages/*` (types, db client, domain logic, ui kit). We rejected a single role-routed app because the three web surfaces have materially different bundle, SSR, deploy, and auth-context needs that are hostile to a unified shell. We also rejected co-locating the backend inside a frontend framework's API routes: the domain is stateful and operationally heavy (Konnect webhooks, no-show schedulers, payout reconciliation, NoShowRisk decay) — that work belongs in a standalone Bun service, not in a Next.js handler.

## Consequences

- Four CI pipelines, four deploy targets, four DNS records (`pamper.me`, `pro.pamper.me`, `admin.pamper.me`, `api.pamper.me`).
- Auth across surfaces needs an explicit story: Client (phone OTP) vs Business staff vs internal admin. Separate auth contexts, possibly separate session stores.
- The transport between web apps and the API is a real architectural decision (REST vs tRPC vs gRPC), captured in a follow-up ADR.
