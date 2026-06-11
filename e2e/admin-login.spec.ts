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
