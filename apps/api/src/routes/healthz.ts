import { Hono } from "hono";

const healthz = new Hono();

healthz.get("/", (c) => c.json({ status: "ok" } as const));

export { healthz };
