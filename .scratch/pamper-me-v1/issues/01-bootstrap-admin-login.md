# Bootstrap + Admin login

Status: needs-triage

## Parent

[Pamper Me v1 PRD](../PRD.md)

## What to build

Bootstrap the monorepo and ship the first vertical feature: an Admin can log in to admin-web. Stand up Bun workspaces and Turborepo, scaffold all four apps (`api`, `marketplace-web`, `business-web`, `admin-web`) and all six packages (`db`, `domain`, `contracts`, `ui`, `validation`, `config`), wire shared tsconfig / eslint / prettier, and stand up CI typechecking. On the API side: Hono on Bun with a `/healthz` route, Drizzle + Postgres connection, Better Auth with the admin user `kind` per ADR-0022 (email + password + mandatory TOTP), database-backed sessions. On admin-web: TanStack Router + Vite SPA with a login screen. A one-shot seed script creates the bootstrap admin so the first login is possible.

## Acceptance criteria

- [ ] `bun run dev` boots all four apps without errors
- [ ] `apps/api`'s `/healthz` returns 200 OK
- [ ] Drizzle migrations run from CI; first migration creates the User table
- [ ] A seed script creates a bootstrap admin user
- [ ] Bootstrap admin can log in to admin-web with email + password + TOTP
- [ ] The session is database-backed and revocable
- [ ] CI typechecks every package and app via Turborepo
- [ ] Playwright smoke test exercises the admin login flow
- [ ] Lint + format checks pass across the workspace

## Blocked by

None - can start immediately
