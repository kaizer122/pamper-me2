import { describe, it, expect } from "bun:test";
import { app } from "./src/index.js";

describe("GET /healthz", () => {
  it("returns 200 OK with status:ok", async () => {
    const res = await app.request("/healthz");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ status: "ok" });
  });
});
