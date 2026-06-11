import { createRoute, redirect } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root.js";
import { authClient } from "../auth-client.js";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
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
