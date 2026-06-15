"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Identifiants incorrects.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-[100dvh] bg-[#06080f] flex items-center justify-center px-4">
      {/* Background radial */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="font-heading text-2xl font-light tracking-widest text-[#f0ece3]">
            AL3X <em className="text-[#C9A84C]">Photos</em>
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#f0ece3]/30">
            Administration
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0d1117] p-8 shadow-2xl shadow-black/60">
          <h1 className="text-lg font-semibold text-[#f0ece3] mb-1">Connexion</h1>
          <p className="text-xs text-[#f0ece3]/35 mb-7">
            Accès réservé aux administrateurs.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-[10px] uppercase tracking-[0.12em] text-[#f0ece3]/40 font-medium"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@al3x-photos.fr"
                className="flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f0ece3] placeholder:text-[#f0ece3]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/40 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-[10px] uppercase tracking-[0.12em] text-[#f0ece3]/40 font-medium"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#f0ece3] placeholder:text-[#f0ece3]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/40 transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full h-10 rounded-lg bg-[#C9A84C] text-[#06080f] text-sm font-semibold hover:bg-[#e8d48b] transition-all duration-150 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-[10px] text-[#f0ece3]/20 tracking-[0.05em]">
          &copy; {new Date().getFullYear()} AL3X Photos
        </p>
      </div>
    </div>
  );
}
