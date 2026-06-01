"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";

const GoogleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
    <path fill="#EA4335" d="M12 4.04c1.62 0 3.08.56 4.23 1.65l3.17-3.17C17.45 1.01 14.96 0 12 0 7.68 0 3.94 2.48 2.18 6.06l3.66 2.84C6.71 6.01 9.14 4.04 12 4.04z" />
  </svg>
);

export default function Login() {
  const { user } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(user) {
      router.replace(user.onboarded ? "/dashboard" : "/onboarding");
      return;
    }
  }, [user])

 

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Account created. Please sign in.");
        setMode("signin");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white font-body text-slate-900">
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden p-14 bg-slate-50/70">
        <div className="pointer-events-none absolute inset-0 geo-mesh opacity-70" />
        <Link href="/" className="relative flex items-center gap-2.5" data-testid="login-logo">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900">
            <span className="absolute h-2 w-2 rounded-full bg-gradient-to-tr from-indigo-400 to-orange-300" />
          </span>
          <span className="font-heading text-xl font-medium tracking-tight">GeoAI</span>
        </Link>
        <div className="relative max-w-md">
          <p className="geo-display font-heading text-4xl font-light leading-[1.1] text-slate-900">
            The operating system for{" "}
            <span className="italic bg-gradient-to-r from-indigo-600 to-orange-500 bg-clip-text text-transparent">
              AI discovery.
            </span>
          </p>
          <p className="mt-6 text-lg text-slate-500 font-light leading-relaxed">
            See how AI understands your company, why it may not recommend you, and
            exactly what to improve.
          </p>
        </div>
        <p className="relative text-xs font-mono uppercase tracking-[0.25em] text-slate-400">
          Built for the AI Era
        </p>
      </div>

      <div className="flex items-center justify-center px-6 py-16 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm"
        >
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => { setMode("signin"); setError(""); }}
              className={`pb-2 text-sm font-medium transition-colors ${
                mode === "signin"
                  ? "text-slate-900 border-b-2 border-slate-900"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode("signup"); setError(""); }}
              className={`pb-2 text-sm font-medium transition-colors ${
                mode === "signup"
                  ? "text-slate-900 border-b-2 border-slate-900"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Sign Up
            </button>
          </div>

          <h1 className="font-heading text-3xl font-normal tracking-tight">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {mode === "signin"
              ? "Sign in to your GeoAI workspace."
              : "Get started with GeoAI."}
          </p>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {mode === "signin" && (
            <>
              <button
                onClick={handleGoogle}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-medium text-slate-800 hover:bg-slate-50 transition-colors"
                data-testid="google-login-button"
              >
                <GoogleIcon /> Continue with Google
              </button>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400 font-medium">OR</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
            </>
          )}

          <form
            onSubmit={mode === "signin" ? handleSignin : handleSignup}
            className="mt-6 space-y-4"
          >
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1.5">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading
                ? "Please wait..."
                : mode === "signin"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
