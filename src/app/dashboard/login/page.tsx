"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = (await res.json()) as { message?: string };
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#08184A] px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-8 shadow-2xl">
        <p className="text-xs font-bold uppercase tracking-wider text-[#D39B35]">
          Admin
        </p>
        <h1 className="mt-2 text-2xl font-extrabold text-[#08184A]">
          Dashboard login
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to manage products, orders, and leads.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#D39B35] focus:ring-2 focus:ring-[#D39B35]/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#D39B35] focus:ring-2 focus:ring-[#D39B35]/20"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#08184A] py-3 text-sm font-semibold text-white transition hover:bg-[#0a2160] disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <Link
          href="/"
          className="mt-6 block text-center text-sm font-medium text-[#D39B35] hover:underline"
        >
          ← Back to website
        </Link>
      </div>
    </div>
  );
}

export default function DashboardLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08184A]" />}>
      <LoginForm />
    </Suspense>
  );
}
