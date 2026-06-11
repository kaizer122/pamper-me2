import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root.js";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <main><h1>Pamper Me — Marketplace</h1></main>,
});
