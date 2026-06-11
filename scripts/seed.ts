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
    console.log(
      "Bootstrap admin already exists — skipping. User ID:",
      existing[0].id,
    );
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

  if (!newUser[0]) {
    console.error("User not found after creation");
    process.exit(1);
  }

  await db
    .update(schema.user)
    .set({ kind: "admin" })
    .where(eq(schema.user.id, newUser[0].id));
  console.log("Admin kind set. User ID:", newUser[0].id);

  // Sign in to get session cookie for TOTP enable call
  const signinRes = await fetch(`${API_URL}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: BOOTSTRAP_ADMIN_EMAIL,
      password: BOOTSTRAP_ADMIN_PASSWORD,
    }),
  });

  const sessionCookie = signinRes.headers.get("set-cookie");
  if (!sessionCookie) {
    console.error("No session cookie after sign-in");
    process.exit(1);
  }

  // Enable TOTP
  const totpRes = await fetch(`${API_URL}/api/auth/two-factor/enable`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie as string,
    },
    body: JSON.stringify({ password: BOOTSTRAP_ADMIN_PASSWORD }),
  });

  if (!totpRes.ok) {
    console.error("Failed to enable TOTP:", await totpRes.text());
    process.exit(1);
  }

  const totpData = (await totpRes.json()) as {
    totpURI?: string;
    backupCodes?: string[];
  };

  console.log("\n=== TOTP Setup ===");
  console.log("Scan this URI with your authenticator app:");
  console.log(`\nTOTP URI: ${totpData.totpURI}\n`);
  if (totpData.backupCodes) {
    console.log("Backup codes (store securely):");
    for (const code of totpData.backupCodes) console.log(`  ${code}`);
  }
  console.log("\nSeed complete.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
