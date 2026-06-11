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
