import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { healthz } from "./routes/healthz.js";

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
  }),
);

app.route("/healthz", healthz);

app.on(["GET", "POST"], "/api/auth/**", async (c) => {
  const { auth } = await import("./auth.js");
  return auth.handler(c.req.raw);
});

const port = Number(process.env["PORT"] ?? 3000);
if (process.env["NODE_ENV"] !== "test") {
  Bun.serve({ port, fetch: app.fetch });
  console.log(`API running on http://localhost:${port}`);
}

export default app;
export type AppType = typeof app;
