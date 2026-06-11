# Bootstrap + Admin Login (Issue 01) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Take the repo from documentation-only to a fully working monorepo with Bun workspaces + Turborepo, all four apps booting, and a working admin login flow (email + password + mandatory TOTP) backed by Better Auth + Drizzle + Postgres.

**Architecture:** Bun workspaces + Turborepo monorepo with `apps/api` (Hono on Bun), `apps/admin-web` (TanStack Router + Vite SPA), and four stub apps total. Better Auth handles auth with a single `user` table discriminated by `kind` (`client` | `staff` | `admin`). Admin login requires email + password + TOTP; sessions are DB-backed via Drizzle adapter.

**Tech Stack:** Bun, Turborepo, Hono 4.x, Better Auth 1.x (`twoFactor` plugin), Drizzle ORM 0.41.x + postgres.js, TanStack Router 1.x, TanStack Start 1.x (marketplace-web), Vite 6.x, React 19, Playwright, TypeScript 5.7, Zod 3.x.

---

## Phase A — Monorepo Root Scaffold

**Files:** Create `package.json`, `turbo.json`, `docker-compose.yml`, `.env.example`, `.gitignore`

- [ ] **A.1 Create `/package.json`**

```json
{
  "name": "pamper-me",
  "private": true,
  "workspaces": ["apps/*", "packages/*", "e2e"],
  "scripts": {
    "dev": "turbo run dev --parallel",
    "build": "turbo run build",
    "typecheck": "turbo run typecheck",
    "lint": "turbo run lint",
    "format": "turbo run format",
    "test": "turbo run test",
    "seed": "bun scripts/seed.ts"
  },
  "devDependencies": {
    "turbo": "^2.3.3",
    "typescript": "^5.7.3",
    "prettier": "^3.4.2"
  }
}
```

- [ ] **A.2 Create `/turbo.json`**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", ".vinxi/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "typecheck": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "lint": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "format": {
      "outputs": []
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": []
    }
  }
}
```

- [ ] **A.3 Create `/docker-compose.yml`**

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: pamper
      POSTGRES_PASSWORD: pamper
      POSTGRES_DB: pamper_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U pamper"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

- [ ] **A.4 Create `/.env.example`**

```dotenv
# Database
DATABASE_URL=postgres://pamper:pamper@localhost:5432/pamper_dev

# Auth
BETTER_AUTH_SECRET=change-me-at-least-32-characters-long
BETTER_AUTH_URL=http://localhost:3000

# App origins (CORS)
ADMIN_WEB_URL=http://localhost:3003
MARKETPLACE_WEB_URL=http://localhost:3001
BUSINESS_WEB_URL=http://localhost:3002

# Seed (API must be running when seed is executed)
BOOTSTRAP_ADMIN_EMAIL=admin@pamper.me
BOOTSTRAP_ADMIN_PASSWORD=change-me-on-first-login
```

- [ ] **A.5 Create `/.gitignore`**

```
node_modules
.turbo
dist
.env
.env.local
```

Note: `bun.lockb` is intentionally NOT gitignored — commit it for reproducible installs.

- [ ] **A.6 Run `bun install` and verify workspace wiring**

```bash
bun install
```

Expected: `bun install v1.x.x ... done`, `bun.lockb` created.

- [ ] **A.7 Commit A**

```bash
git add package.json turbo.json docker-compose.yml .env.example .gitignore bun.lockb
git commit -m "chore: bootstrap monorepo root — Bun workspaces + Turborepo"
```

---

## Phase B — `packages/config`

**Files:** Create `packages/config/package.json`, `tsconfig.base.json`, `tsconfig.app.json`, `eslint.config.js`, `.prettierrc`, `index.ts`, `tsconfig.json`

- [ ] **B.1 Create `packages/config/package.json`**

```json
{
  "name": "@pamper-me/config",
  "version": "0.0.1",
  "private": true,
  "exports": {
    ".": "./index.ts",
    "./tsconfig.base": "./tsconfig.base.json",
    "./tsconfig.app": "./tsconfig.app.json",
    "./eslint": "./eslint.config.js",
    "./prettier": "./.prettierrc"
  },
  "devDependencies": {
    "typescript": "^5.7.3"
  }
}
```

- [ ] **B.2 Create `packages/config/tsconfig.base.json`**

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2022"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true
  }
}
```

- [ ] **B.3 Create `packages/config/tsconfig.app.json`** (for Vite SPAs)

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "noEmit": true
  }
}
```

- [ ] **B.4 Create `packages/config/eslint.config.js`**

```js
// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
    },
  }
);
```

- [ ] **B.5 Create `packages/config/.prettierrc`**

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "plugins": []
}
```

- [ ] **B.6 Create `packages/config/index.ts`**

```ts
export {};
```

- [ ] **B.7 Create `packages/config/tsconfig.json`**

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": { "outDir": "dist", "rootDir": "." },
  "include": ["index.ts"]
}
```

- [ ] **B.8 Install config devDependencies**

```bash
bun add -D @eslint/js typescript-eslint --filter @pamper-me/config
```

- [ ] **B.9 Commit B**

```bash
git add packages/config
git commit -m "feat(config): shared tsconfig, eslint, prettier base config"
```

---

## Phase C — Package Stubs (domain, contracts, ui, validation)

Each stub has: `package.json`, `tsconfig.json`, `src/index.ts`. Must typecheck clean.

- [ ] **C.1 Create `packages/domain/package.json`**

```json
{
  "name": "@pamper-me/domain",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "exports": { ".": "./src/index.ts" },
  "scripts": { "typecheck": "tsc --noEmit" },
  "devDependencies": {
    "@pamper-me/config": "workspace:*",
    "typescript": "^5.7.3"
  }
}
```

- [ ] **C.2 Create `packages/domain/tsconfig.json`**

```json
{
  "extends": "@pamper-me/config/tsconfig.base",
  "compilerOptions": { "outDir": "dist", "rootDir": "src" },
  "include": ["src"]
}
```

- [ ] **C.3 Create `packages/domain/src/index.ts`**

```ts
export {};
```

- [ ] **C.4 Create `packages/contracts/package.json`**

```json
{
  "name": "@pamper-me/contracts",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "exports": { ".": "./src/index.ts" },
  "scripts": { "typecheck": "tsc --noEmit" },
  "devDependencies": {
    "@pamper-me/config": "workspace:*",
    "typescript": "^5.7.3"
  }
}
```

- [ ] **C.5 Create `packages/contracts/tsconfig.json`**

```json
{
  "extends": "@pamper-me/config/tsconfig.base",
  "compilerOptions": { "outDir": "dist", "rootDir": "src" },
  "include": ["src"]
}
```

- [ ] **C.6 Create `packages/contracts/src/index.ts`**

```ts
export {};
```

- [ ] **C.7 Create `packages/ui/package.json`**

```json
{
  "name": "@pamper-me/ui",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "exports": { ".": "./src/index.ts" },
  "scripts": { "typecheck": "tsc --noEmit" },
  "devDependencies": {
    "@pamper-me/config": "workspace:*",
    "typescript": "^5.7.3"
  }
}
```

- [ ] **C.8 Create `packages/ui/tsconfig.json`**

```json
{
  "extends": "@pamper-me/config/tsconfig.app",
  "compilerOptions": { "outDir": "dist", "rootDir": "src" },
  "include": ["src"]
}
```

- [ ] **C.9 Create `packages/ui/src/index.ts`**

```ts
export {};
```

- [ ] **C.10 Create `packages/validation/package.json`**

```json
{
  "name": "@pamper-me/validation",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "exports": { ".": "./src/index.ts" },
  "scripts": { "typecheck": "tsc --noEmit" },
  "dependencies": { "zod": "^3.24.1" },
  "devDependencies": {
    "@pamper-me/config": "workspace:*",
    "typescript": "^5.7.3"
  }
}
```

- [ ] **C.11 Create `packages/validation/tsconfig.json`**

```json
{
  "extends": "@pamper-me/config/tsconfig.base",
  "compilerOptions": { "outDir": "dist", "rootDir": "src" },
  "include": ["src"]
}
```

- [ ] **C.12 Create `packages/validation/src/index.ts`**

```ts
export {};
```

- [ ] **C.13 Install and typecheck stubs**

```bash
bun install
bun run typecheck --filter "@pamper-me/domain" --filter "@pamper-me/contracts" --filter "@pamper-me/ui" --filter "@pamper-me/validation"
```

Expected: `0 errors` for each.

- [ ] **C.14 Commit C**

```bash
git add packages/domain packages/contracts packages/ui packages/validation
git commit -m "feat: scaffold domain, contracts, ui, validation package stubs"
```

---

## Phase D — `packages/db` (Drizzle Schema + Better Auth Tables + First Migration)

**Files:** `packages/db/package.json`, `tsconfig.json`, `drizzle.config.ts`, `src/client.ts`, `src/schema/user.ts`, `src/schema/auth.ts`, `src/schema/index.ts`, `src/index.ts`, `migrations/0000_initial.sql` (generated)

- [ ] **D.1 Create `packages/db/package.json`**

```json
{
  "name": "@pamper-me/db",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./client": "./src/client.ts",
    "./schema": "./src/schema/index.ts"
  },
  "scripts": {
    "typecheck": "tsc --noEmit",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate"
  },
  "dependencies": {
    "drizzle-orm": "^0.41.0",
    "postgres": "^3.4.5"
  },
  "devDependencies": {
    "@pamper-me/config": "workspace:*",
    "drizzle-kit": "^0.30.4",
    "typescript": "^5.7.3"
  }
}
```

- [ ] **D.2 Create `packages/db/tsconfig.json`**

```json
{
  "extends": "@pamper-me/config/tsconfig.base",
  "compilerOptions": { "outDir": "dist", "rootDir": "src" },
  "include": ["src", "drizzle.config.ts"]
}
```

- [ ] **D.3 Create `packages/db/drizzle.config.ts`**

```ts
import type { Config } from "drizzle-kit";

const url = process.env["DATABASE_URL"];
if (!url) throw new Error("DATABASE_URL environment variable is required");

export default {
  schema: "./src/schema/index.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: { url },
} satisfies Config;
```

- [ ] **D.4 Create `packages/db/src/client.ts`**

```ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/index.js";

export type Database = ReturnType<typeof drizzle<typeof schema>>;

let _db: Database | undefined;

export function getDb(): Database {
  if (!_db) {
    const url = process.env["DATABASE_URL"];
    if (!url) throw new Error("DATABASE_URL environment variable is required");
    _db = drizzle(postgres(url), { schema });
  }
  return _db;
}
```

- [ ] **D.5 Create `packages/db/src/schema/user.ts`**

The User table with the `kind` discriminator per ADR-0022. This is the primary domain table.

```ts
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userKindEnum = pgEnum("user_kind", ["client", "staff", "admin"]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { withTimezone: true }),
  image: text("image"),
  kind: userKindEnum("kind").notNull().default("client"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
```

- [ ] **D.6 Create `packages/db/src/schema/auth.ts`**

Better Auth tables written manually to exactly match the Drizzle adapter's expectations. Column names are snake_case; Better Auth adapter maps them to camelCase internally.

```ts
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user.js";

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const twoFactor = pgTable("two_factor", {
  id: text("id").primaryKey(),
  secret: text("secret").notNull(),
  backupCodes: text("backup_codes").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
});

export type Session = typeof session.$inferSelect;
export type Account = typeof account.$inferSelect;
export type Verification = typeof verification.$inferSelect;
export type TwoFactor = typeof twoFactor.$inferSelect;
```

- [ ] **D.7 Create `packages/db/src/schema/index.ts`**

```ts
export * from "./user.js";
export * from "./auth.js";
```

- [ ] **D.8 Create `packages/db/src/index.ts`**

```ts
export { getDb } from "./client.js";
export type { Database } from "./client.js";
export * from "./schema/index.js";
```

- [ ] **D.9 Start Postgres and generate first migration**

```bash
# Start Postgres
docker compose up -d postgres

# Copy env
cp .env.example .env

# Install db deps
bun install

# Generate SQL migration
cd packages/db
bunx drizzle-kit generate
```

Expected: `migrations/0000_initial_user_and_auth_tables.sql` created. Review it to confirm `user_kind` enum, `user`, `session`, `account`, `verification`, `two_factor` tables are all present.

- [ ] **D.10 Run migration to verify SQL is valid**

```bash
cd packages/db
bunx drizzle-kit migrate
```

Expected: `Running 1 migrations... Done!`

- [ ] **D.11 Typecheck packages/db**

```bash
bun run typecheck --filter @pamper-me/db
```

Expected: `0 errors`

- [ ] **D.12 Commit D**

```bash
git add packages/db
git commit -m "feat(db): Drizzle schema — user table with kind discriminator + Better Auth tables + first migration"
```

---

## Phase E — `apps/api` (Hono + /healthz TDD + Better Auth)

**Files:** `apps/api/package.json`, `tsconfig.json`, `src/index.ts`, `src/auth.ts`, `src/routes/healthz.ts`, `bun.test.ts`

- [ ] **E.1 Create `apps/api/package.json`**

```json
{
  "name": "@pamper-me/api",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "bun --watch src/index.ts",
    "start": "bun src/index.ts",
    "typecheck": "tsc --noEmit",
    "test": "bun test",
    "lint": "eslint src --max-warnings 0"
  },
  "dependencies": {
    "@pamper-me/db": "workspace:*",
    "better-auth": "^1.2.7",
    "hono": "^4.7.4",
    "@hono/zod-validator": "^0.4.3",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@pamper-me/config": "workspace:*",
    "@types/bun": "latest",
    "typescript": "^5.7.3"
  }
}
```

- [ ] **E.2 Create `apps/api/tsconfig.json`**

```json
{
  "extends": "@pamper-me/config/tsconfig.base",
  "compilerOptions": {
    "types": ["bun-types"],
    "noEmit": true
  },
  "include": ["src", "bun.test.ts"]
}
```

- [ ] **E.3 Write the failing test — TDD Red**

**File: `apps/api/bun.test.ts`**

```ts
import { describe, it, expect } from "bun:test";
import app from "./src/index.js";

describe("GET /healthz", () => {
  it("returns 200 OK with status:ok", async () => {
    const res = await app.request("/healthz");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ status: "ok" });
  });
});
```

Run it — must fail because `src/index.ts` does not exist yet:

```bash
cd apps/api
bun test
```

Expected output: `error: Cannot find module './src/index.js'` — this is the intentional red state.

- [ ] **E.4 Create `apps/api/src/routes/healthz.ts`**

```ts
import { Hono } from "hono";

const healthz = new Hono();

healthz.get("/", (c) => c.json({ status: "ok" } as const));

export { healthz };
```

- [ ] **E.5 Create `apps/api/src/auth.ts`**

```ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor } from "better-auth/plugins";
import { getDb } from "@pamper-me/db/client";
import * as schema from "@pamper-me/db/schema";

const db = getDb();

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    twoFactor({
      issuer: "Pamper Me",
    }),
  ],
  trustedOrigins: [
    process.env["ADMIN_WEB_URL"] ?? "http://localhost:3003",
    process.env["MARKETPLACE_WEB_URL"] ?? "http://localhost:3001",
    process.env["BUSINESS_WEB_URL"] ?? "http://localhost:3002",
  ],
  user: {
    additionalFields: {
      kind: {
        type: "string",
        required: true,
        defaultValue: "client",
        input: false,
      },
    },
  },
});

export type Auth = typeof auth;
```

- [ ] **E.6 Create `apps/api/src/index.ts`**

```ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { healthz } from "./routes/healthz.js";
import { auth } from "./auth.js";

const app = new Hono();

app.use("*", logger());
app.use(
  "/api/auth/*",
  cors({
    origin: [
      process.env["ADMIN_WEB_URL"] ?? "http://localhost:3003",
      process.env["MARKETPLACE_WEB_URL"] ?? "http://localhost:3001",
      process.env["BUSINESS_WEB_URL"] ?? "http://localhost:3002",
    ],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.route("/healthz", healthz);

app.on(["GET", "POST"], "/api/auth/**", (c) => auth.handler(c.req.raw));

const port = Number(process.env["PORT"] ?? 3000);
if (process.env["NODE_ENV"] !== "test") {
  Bun.serve({ port, fetch: app.fetch });
  console.log(`API running on http://localhost:${port}`);
}

export default app;
export type AppType = typeof app;
```

- [ ] **E.7 Run test — TDD Green**

```bash
cd apps/api
bun test
```

Expected output:
```
bun test v1.x.x
  GET /healthz
    ✓ returns 200 OK with status:ok [Xms]

1 pass, 0 fail
```

- [ ] **E.8 Verify API starts**

```bash
# Terminal 1
cd apps/api && bun run dev
# Terminal 2
curl http://localhost:3000/healthz
```

Expected: `{"status":"ok"}`

- [ ] **E.9 Typecheck apps/api**

```bash
bun run typecheck --filter @pamper-me/api
```

Expected: `0 errors`

- [ ] **E.10 Commit E**

```bash
git add apps/api
git commit -m "feat(api): Hono app with /healthz (TDD), Better Auth email+password+TOTP, DB-backed sessions"
```

---

## Phase F — `apps/marketplace-web` and `apps/business-web` Stubs

These must boot with `bun run dev` and typecheck. No features.

- [ ] **F.1 Create `apps/marketplace-web/package.json`**

```json
{
  "name": "@pamper-me/marketplace-web",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vinxi dev --port 3001",
    "build": "vinxi build",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src --max-warnings 0"
  },
  "dependencies": {
    "@tanstack/react-router": "^1.114.6",
    "@tanstack/start": "^1.114.6",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@pamper-me/config": "workspace:*",
    "@types/react": "^19.1.3",
    "@types/react-dom": "^19.1.3",
    "typescript": "^5.7.3",
    "vinxi": "^0.5.3"
  }
}
```

- [ ] **F.2 Create `apps/marketplace-web/tsconfig.json`**

```json
{
  "extends": "@pamper-me/config/tsconfig.app",
  "compilerOptions": { "outDir": "dist", "rootDir": "." },
  "include": ["src", "app.config.ts"]
}
```

- [ ] **F.3 Create `apps/marketplace-web/app.config.ts`**

```ts
import { defineConfig } from "@tanstack/start/config";

export default defineConfig({
  server: { preset: "bun" },
});
```

- [ ] **F.4 Create `apps/marketplace-web/src/router.tsx`**

```tsx
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.js";

export function createRouter() {
  return createTanStackRouter({ routeTree });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
```

- [ ] **F.5 Create `apps/marketplace-web/src/routes/__root.tsx`**

```tsx
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <title>Pamper Me</title>
      </head>
      <body>
        <Outlet />
      </body>
    </html>
  ),
});
```

- [ ] **F.6 Create `apps/marketplace-web/src/routes/index.tsx`**

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <main><h1>Pamper Me — Marketplace</h1></main>,
});
```

- [ ] **F.7 Create `apps/marketplace-web/src/routeTree.gen.ts`** (initial scaffold — overwritten by dev server)

```ts
import { Route as rootRoute } from "./routes/__root.js";
import { Route as IndexRoute } from "./routes/index.js";

const routeTree = rootRoute.addChildren([IndexRoute]);
export { routeTree };
```

- [ ] **F.8 Create `apps/business-web/package.json`**

```json
{
  "name": "@pamper-me/business-web",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --port 3002",
    "build": "vite build",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src --max-warnings 0"
  },
  "dependencies": {
    "@tanstack/react-router": "^1.114.6",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@pamper-me/config": "workspace:*",
    "@vitejs/plugin-react": "^4.5.0",
    "@types/react": "^19.1.3",
    "@types/react-dom": "^19.1.3",
    "typescript": "^5.7.3",
    "vite": "^6.3.4"
  }
}
```

- [ ] **F.9 Create `apps/business-web/tsconfig.json`**

```json
{
  "extends": "@pamper-me/config/tsconfig.app",
  "compilerOptions": { "outDir": "dist", "rootDir": "." },
  "include": ["src", "vite.config.ts"]
}
```

- [ ] **F.10 Create `apps/business-web/vite.config.ts`**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 3002 },
});
```

- [ ] **F.11 Create `apps/business-web/index.html`**

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pamper Me — Business</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **F.12 Create `apps/business-web/src/main.tsx`**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.js";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register { router: typeof router; }
}

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");
createRoot(root).render(
  <StrictMode><RouterProvider router={router} /></StrictMode>
);
```

- [ ] **F.13 Create `apps/business-web/src/routeTree.gen.ts`**

```ts
import { Route as rootRoute } from "./routes/__root.js";
import { Route as IndexRoute } from "./routes/index.js";

const routeTree = rootRoute.addChildren([IndexRoute]);
export { routeTree };
```

- [ ] **F.14 Create `apps/business-web/src/routes/__root.tsx`**

```tsx
import { createRootRoute, Outlet } from "@tanstack/react-router";
export const Route = createRootRoute({ component: () => <Outlet /> });
```

- [ ] **F.15 Create `apps/business-web/src/routes/index.tsx`**

```tsx
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/")({ component: () => <h1>Pamper Me — Business</h1> });
```

- [ ] **F.16 Install and typecheck**

```bash
bun install
bun run typecheck --filter @pamper-me/marketplace-web --filter @pamper-me/business-web
```

Expected: `0 errors`

- [ ] **F.17 Commit F**

```bash
git add apps/marketplace-web apps/business-web
git commit -m "feat: scaffold marketplace-web (TanStack Start) and business-web (TanStack Router SPA) stubs"
```

---

## Phase G — `apps/admin-web` (TanStack Router + Login Screen with TOTP)

**Files:** `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/auth-client.ts`, `src/routeTree.gen.ts`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routes/login.tsx`

- [ ] **G.1 Create `apps/admin-web/package.json`**

```json
{
  "name": "@pamper-me/admin-web",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --port 3003",
    "build": "vite build",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src --max-warnings 0"
  },
  "dependencies": {
    "@pamper-me/contracts": "workspace:*",
    "@tanstack/react-router": "^1.114.6",
    "@tanstack/react-query": "^5.74.4",
    "better-auth": "^1.2.7",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@pamper-me/config": "workspace:*",
    "@vitejs/plugin-react": "^4.5.0",
    "@types/react": "^19.1.3",
    "@types/react-dom": "^19.1.3",
    "typescript": "^5.7.3",
    "vite": "^6.3.4"
  }
}
```

- [ ] **G.2 Create `apps/admin-web/tsconfig.json`**

```json
{
  "extends": "@pamper-me/config/tsconfig.app",
  "compilerOptions": { "outDir": "dist", "rootDir": "." },
  "include": ["src", "vite.config.ts"]
}
```

- [ ] **G.3 Create `apps/admin-web/vite.config.ts`**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 3003 },
});
```

- [ ] **G.4 Create `apps/admin-web/index.html`**

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pamper Me — Admin</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **G.5 Create `apps/admin-web/src/auth-client.ts`**

```ts
import { createAuthClient } from "better-auth/react";
import { twoFactorClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env["VITE_API_URL"] ?? "http://localhost:3000",
  plugins: [twoFactorClient()],
});

export const { signIn, signOut, useSession } = authClient;
```

- [ ] **G.6 Create `apps/admin-web/src/routes/__root.tsx`**

```tsx
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  ),
});
```

- [ ] **G.7 Create `apps/admin-web/src/routes/index.tsx`**

Redirects to `/login` if no session.

```tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { authClient } from "../auth-client.js";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (!session.data) throw redirect({ to: "/login" });
  },
  component: () => (
    <main>
      <h1>Pamper Me — Admin Dashboard</h1>
      <p>Bienvenue, admin.</p>
    </main>
  ),
});
```

- [ ] **G.8 Create `apps/admin-web/src/routes/login.tsx`**

Two-stage login: credentials → TOTP → dashboard redirect.

```tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "../auth-client.js";

type LoginStage = "credentials" | "totp";

function LoginPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<LoginStage>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totp, setTotp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await authClient.signIn.email({ email, password });
      if (result.error) {
        setError(result.error.message ?? "Identifiants invalides");
        return;
      }
      if (result.data?.twoFactorRedirect) {
        setStage("totp");
        return;
      }
      await navigate({ to: "/" });
    } finally {
      setLoading(false);
    }
  }

  async function handleTotp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await authClient.twoFactor.verifyTotp({ code: totp });
      if (result.error) {
        setError(result.error.message ?? "Code TOTP invalide");
        return;
      }
      await navigate({ to: "/" });
    } finally {
      setLoading(false);
    }
  }

  if (stage === "totp") {
    return (
      <main style={{ maxWidth: 400, margin: "100px auto", padding: 24 }}>
        <h1>Authentification à deux facteurs</h1>
        <form onSubmit={handleTotp}>
          <label htmlFor="totp">Code TOTP</label>
          <br />
          <input
            id="totp"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            value={totp}
            onChange={(e) => setTotp(e.target.value)}
            autoFocus
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <br />
          <button type="submit" disabled={loading}>
            {loading ? "Vérification..." : "Vérifier"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 400, margin: "100px auto", padding: 24 }}>
      <h1>Connexion Admin</h1>
      <form onSubmit={handleCredentials}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />
        <br />
        <label htmlFor="password">Mot de passe</label>
        <br />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </main>
  );
}

export const Route = createFileRoute("/login")({ component: LoginPage });
```

- [ ] **G.9 Create `apps/admin-web/src/routeTree.gen.ts`**

```ts
import { Route as rootRoute } from "./routes/__root.js";
import { Route as IndexRoute } from "./routes/index.js";
import { Route as LoginRoute } from "./routes/login.js";

const routeTree = rootRoute.addChildren([IndexRoute, LoginRoute]);
export { routeTree };
```

- [ ] **G.10 Create `apps/admin-web/src/main.tsx`**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.js";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register { router: typeof router; }
}

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");
createRoot(root).render(
  <StrictMode><RouterProvider router={router} /></StrictMode>
);
```

- [ ] **G.11 Typecheck and verify**

```bash
bun install
bun run typecheck --filter @pamper-me/admin-web
```

Expected: `0 errors`

- [ ] **G.12 Commit G**

```bash
git add apps/admin-web
git commit -m "feat(admin-web): TanStack Router SPA with email+password+TOTP login screen"
```

---

## Phase H — Seed Script

The seed script calls the live API to create the bootstrap admin and enable TOTP. **The API must be running on `BETTER_AUTH_URL` before executing the seed.**

- [ ] **H.1 Create `scripts/seed.ts`**

```ts
import { getDb } from "../packages/db/src/client.js";
import * as schema from "../packages/db/src/schema/index.js";
import { eq } from "drizzle-orm";

const BOOTSTRAP_ADMIN_EMAIL =
  process.env["BOOTSTRAP_ADMIN_EMAIL"] ?? "admin@pamper.me";
const BOOTSTRAP_ADMIN_PASSWORD = process.env["BOOTSTRAP_ADMIN_PASSWORD"];
const API_URL = process.env["BETTER_AUTH_URL"] ?? "http://localhost:3000";

if (!BOOTSTRAP_ADMIN_PASSWORD) {
  console.error("BOOTSTRAP_ADMIN_PASSWORD environment variable is required");
  process.exit(1);
}

const db = getDb();

async function seed() {
  console.log(`Seeding bootstrap admin: ${BOOTSTRAP_ADMIN_EMAIL}`);

  const existing = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.email, BOOTSTRAP_ADMIN_EMAIL))
    .limit(1);

  if (existing.length > 0 && existing[0]) {
    console.log("Bootstrap admin already exists — skipping. User ID:", existing[0].id);
    process.exit(0);
  }

  // Create user via live API so Better Auth handles password hashing
  const signupRes = await fetch(`${API_URL}/api/auth/sign-up/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Bootstrap Admin",
      email: BOOTSTRAP_ADMIN_EMAIL,
      password: BOOTSTRAP_ADMIN_PASSWORD,
    }),
  });

  if (!signupRes.ok) {
    console.error("Failed to create user:", await signupRes.text());
    process.exit(1);
  }

  // Set kind = 'admin' (bypasses Better Auth's additionalFields input:false guard)
  const newUser = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.email, BOOTSTRAP_ADMIN_EMAIL))
    .limit(1);

  if (!newUser[0]) { console.error("User not found after creation"); process.exit(1); }

  await db.update(schema.user).set({ kind: "admin" }).where(eq(schema.user.id, newUser[0].id));
  console.log("Admin kind set. User ID:", newUser[0].id);

  // Sign in to get session cookie for TOTP enable call
  const signinRes = await fetch(`${API_URL}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: BOOTSTRAP_ADMIN_EMAIL, password: BOOTSTRAP_ADMIN_PASSWORD }),
  });

  const sessionCookie = signinRes.headers.get("set-cookie");
  if (!sessionCookie) { console.error("No session cookie after sign-in"); process.exit(1); }

  // Enable TOTP
  const totpRes = await fetch(`${API_URL}/api/auth/two-factor/enable`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: sessionCookie },
    body: JSON.stringify({ password: BOOTSTRAP_ADMIN_PASSWORD }),
  });

  if (!totpRes.ok) {
    console.error("Failed to enable TOTP:", await totpRes.text());
    process.exit(1);
  }

  const totpData = (await totpRes.json()) as { totpURI?: string; backupCodes?: string[] };

  console.log("\n=== TOTP Setup ===");
  console.log("Scan this URI with your authenticator app:");
  console.log(`\nTOTP URI: ${totpData.totpURI}\n`);
  if (totpData.backupCodes) {
    console.log("Backup codes (store securely):");
    for (const code of totpData.backupCodes) console.log(`  ${code}`);
  }
  console.log("\nSeed complete.");
}

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });
```

- [ ] **H.2 Verify seed script runs (API must be running)**

```bash
# Terminal 1: start API
cd apps/api && bun run dev

# Terminal 2: run seed
bun run seed
```

Expected: TOTP URI printed to terminal. Scan it with an authenticator app.

- [ ] **H.3 Commit H**

```bash
git add scripts/seed.ts package.json
git commit -m "feat: one-shot seed script — creates bootstrap admin with TOTP registration"
```

---

## Phase I — CI (GitHub Actions)

- [ ] **I.1 Create `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

env:
  BUN_VERSION: "1.2.x"

jobs:
  typecheck:
    name: Typecheck
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with: { bun-version: "${{ env.BUN_VERSION }}" }
      - run: bun install --frozen-lockfile
      - run: bun run typecheck

  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with: { bun-version: "${{ env.BUN_VERSION }}" }
      - run: bun install --frozen-lockfile
      - run: bun run lint

  format:
    name: Format
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with: { bun-version: "${{ env.BUN_VERSION }}" }
      - run: bun install --frozen-lockfile
      - run: bunx prettier --check "**/*.{ts,tsx,json,md}" --ignore-path .gitignore

  test-api:
    name: API Tests + Migration
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: pamper
          POSTGRES_PASSWORD: pamper
          POSTGRES_DB: pamper_test
        ports: ["5432:5432"]
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    env:
      DATABASE_URL: postgres://pamper:pamper@localhost:5432/pamper_test
      BETTER_AUTH_SECRET: ci-test-secret-at-least-32-characters-long
      BETTER_AUTH_URL: http://localhost:3000
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with: { bun-version: "${{ env.BUN_VERSION }}" }
      - run: bun install --frozen-lockfile
      - name: Run Drizzle migrations
        run: bunx drizzle-kit migrate
        working-directory: packages/db
      - name: Run API tests
        run: bun test
        working-directory: apps/api

  e2e:
    name: E2E Smoke Tests
    runs-on: ubuntu-latest
    needs: [typecheck, lint, test-api]
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: pamper
          POSTGRES_PASSWORD: pamper
          POSTGRES_DB: pamper_e2e
        ports: ["5432:5432"]
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    env:
      DATABASE_URL: postgres://pamper:pamper@localhost:5432/pamper_e2e
      BETTER_AUTH_SECRET: ci-e2e-secret-at-least-32-characters-long
      BETTER_AUTH_URL: http://localhost:3000
      ADMIN_WEB_URL: http://localhost:3003
      BOOTSTRAP_ADMIN_EMAIL: admin@pamper.me
      BOOTSTRAP_ADMIN_PASSWORD: e2e-test-password-123!
      VITE_API_URL: http://localhost:3000
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with: { bun-version: "${{ env.BUN_VERSION }}" }
      - run: bun install --frozen-lockfile
      - run: bunx playwright install --with-deps chromium
      - name: Run migrations
        run: bunx drizzle-kit migrate
        working-directory: packages/db
      - name: Start API
        run: bun run start &
        working-directory: apps/api
        env: { PORT: 3000 }
      - name: Wait for API
        run: |
          for i in $(seq 1 30); do
            curl -sf http://localhost:3000/healthz && echo "API ready" && break
            sleep 1
          done
      - run: bun run seed
      - name: Build admin-web
        run: bun run build
        working-directory: apps/admin-web
      - name: Serve admin-web
        run: bunx serve dist -p 3003 &
        working-directory: apps/admin-web
      - name: Wait for admin-web
        run: |
          for i in $(seq 1 30); do
            curl -sf http://localhost:3003 && echo "admin-web ready" && break
            sleep 1
          done
      - run: bunx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

- [ ] **I.2 Commit I**

```bash
git add .github
git commit -m "ci: GitHub Actions — typecheck, lint, format, API tests + migration, Playwright E2E"
```

---

## Phase J — Playwright E2E Smoke Test

**Files:** `playwright.config.ts`, `e2e/package.json`, `e2e/admin-login.spec.ts`

- [ ] **J.1 Create `playwright.config.ts`** (at repo root)

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: false,
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 2 : 0,
  workers: 1,
  reporter: [["html", { open: "never" }]],
  use: {
    baseURL: process.env["ADMIN_WEB_URL"] ?? "http://localhost:3003",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
```

- [ ] **J.2 Create `e2e/package.json`**

```json
{
  "name": "@pamper-me/e2e",
  "version": "0.0.1",
  "private": true,
  "scripts": { "test": "playwright test" },
  "devDependencies": {
    "@pamper-me/db": "workspace:*",
    "@playwright/test": "^1.52.0",
    "otplib": "^12.0.1"
  }
}
```

- [ ] **J.3 Create `e2e/admin-login.spec.ts`**

The test reads the TOTP secret directly from the DB to generate a live code. This avoids hardcoding secrets in env vars while keeping CI deterministic.

```ts
import { test, expect } from "@playwright/test";
import { authenticator } from "otplib";
import { getDb } from "../packages/db/src/client.js";
import * as schema from "../packages/db/src/schema/index.js";
import { eq } from "drizzle-orm";

async function getAdminTotpSecret(): Promise<string> {
  const db = getDb();
  const email = process.env["BOOTSTRAP_ADMIN_EMAIL"] ?? "admin@pamper.me";

  const userRow = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.email, email))
    .limit(1);

  if (!userRow[0]) throw new Error(`Admin user not found: ${email}`);

  const tfRow = await db
    .select()
    .from(schema.twoFactor)
    .where(eq(schema.twoFactor.userId, userRow[0].id))
    .limit(1);

  if (!tfRow[0]) throw new Error("TOTP secret not found — did you run the seed?");

  return tfRow[0].secret;
}

test.describe("Admin login flow", () => {
  test("bootstrap admin can log in with email + password + TOTP", async ({ page }) => {
    const email = process.env["BOOTSTRAP_ADMIN_EMAIL"] ?? "admin@pamper.me";
    const password = process.env["BOOTSTRAP_ADMIN_PASSWORD"];
    if (!password) throw new Error("BOOTSTRAP_ADMIN_PASSWORD env var required");

    await page.goto("/login");
    await expect(page.getByRole("heading", { name: /Connexion Admin/i })).toBeVisible();

    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Mot de passe").fill(password);
    await page.getByRole("button", { name: /Se connecter/i }).click();

    await expect(
      page.getByRole("heading", { name: /Authentification à deux facteurs/i })
    ).toBeVisible();

    const secret = await getAdminTotpSecret();
    const code = authenticator.generate(secret);

    await page.getByLabel("Code TOTP").fill(code);
    await page.getByRole("button", { name: /Vérifier/i }).click();

    await expect(page.getByRole("heading", { name: /Admin Dashboard/i })).toBeVisible();
    await expect(page).toHaveURL("/");
  });
});
```

- [ ] **J.4 Install e2e deps**

```bash
bun install
```

- [ ] **J.5 Run Playwright E2E locally (API + admin-web must be running)**

```bash
# Ensure Postgres is up and migrations applied
docker compose up -d postgres
cd packages/db && bunx drizzle-kit migrate && cd ../..

# Terminal 1: start API
cd apps/api && bun run dev &

# Seed (first time only)
bun run seed

# Build admin-web
cd apps/admin-web && bun run build && cd ../..

# Serve admin-web
bunx serve apps/admin-web/dist -p 3003 &

# Run E2E
bunx playwright test
```

Expected output:
```
Running 1 test using 1 worker
  ✓ Admin login flow > bootstrap admin can log in with email + password + TOTP (Xms)
1 passed (Xs)
```

- [ ] **J.6 Commit J**

```bash
git add e2e playwright.config.ts
git commit -m "test(e2e): Playwright smoke test — full admin login flow with TOTP"
```

---

## Final Verification

- [ ] **Full dev stack boots**

```bash
docker compose up -d postgres
bun run dev
```

Expected — Turborepo launches all four apps in parallel:
```
api:dev: API running on http://localhost:3000
marketplace-web:dev: Local: http://localhost:3001
business-web:dev: Local: http://localhost:3002
admin-web:dev: Local: http://localhost:3003
```

- [ ] **Verify /healthz**

```bash
curl http://localhost:3000/healthz
# {"status":"ok"}
```

- [ ] **Verify typecheck passes across the full workspace**

```bash
bun run typecheck
# 0 errors
```

---

## Acceptance Criteria Checklist

| Criterion | How satisfied |
|---|---|
| `bun run dev` boots all four apps | Turborepo `dev` pipeline; all four apps have `dev` scripts on ports 3000–3003 |
| `/healthz` returns 200 OK | `apps/api/src/routes/healthz.ts` + TDD unit test in `bun.test.ts` |
| Drizzle migrations run from CI; first migration creates User table | `packages/db/migrations/` committed SQL; CI `test-api` job runs `drizzle-kit migrate` |
| Seed script creates bootstrap admin | `scripts/seed.ts` — idempotent, calls live API, outputs TOTP URI |
| Bootstrap admin can log in with email + password + TOTP | `apps/admin-web` login screen + Better Auth `twoFactor` plugin + `signIn.email` → `twoFactor.verifyTotp` |
| Session is DB-backed and revocable | Better Auth Drizzle adapter; `session` table in `packages/db/src/schema/auth.ts` |
| CI typechecks every package and app | `ci.yml` `typecheck` job runs `bun run typecheck` (Turborepo fan-out) |
| Playwright smoke test exercises admin login | `e2e/admin-login.spec.ts` covers all three stages |
| Lint + format checks pass | `ci.yml` `lint` and `format` jobs |

---

## Critical Files Reference

- `packages/db/src/schema/user.ts` — User table with `kind` enum; foundational domain schema
- `packages/db/src/schema/auth.ts` — Manual Drizzle definitions for all five Better Auth tables; column names must exactly match the Drizzle adapter's expectations
- `packages/db/migrations/0000_initial_user_and_auth_tables.sql` — First committed migration; generated by `drizzle-kit generate` in Phase D
- `apps/api/src/auth.ts` — Better Auth instance: `twoFactor` plugin, Drizzle adapter wiring, `additionalFields` for `kind`, trusted origins
- `apps/admin-web/src/routes/login.tsx` — Two-stage login component; the primary vertical feature UI
- `.github/workflows/ci.yml` — Full CI pipeline: typecheck → lint → format → migration + tests → Playwright E2E

## Architectural Notes for the Implementer

**TOTP enforcement is currently client-enforced**: the login screen shows the TOTP step when Better Auth signals `twoFactorRedirect`. Server-side TOTP gate middleware (checking `session.user.twoFactorEnabled` before granting access to protected admin routes) should be added in issue 02 when the first protected route appears.

**Seed requires live API**: Better Auth's argon2 password hashing runs server-side. The seed calls `/api/auth/sign-up/email` via HTTP, so the API must be running before `bun run seed`. In CI, the `seed` step follows the health-check wait step.
