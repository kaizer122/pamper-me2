import { createRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Route as rootRoute } from "./__root.js";
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
      if (result.data?.redirect) {
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

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});
