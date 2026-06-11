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
