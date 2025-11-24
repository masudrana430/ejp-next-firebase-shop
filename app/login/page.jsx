// app/login/page.jsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegister = searchParams.get("mode") === "register";

  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-xl font-semibold text-slate-900">
        {isRegister ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-1 text-sm text-slate-600">
        {isRegister
          ? "Use Google or email/password to sign up."
          : "Sign in with Google or email/password."}
      </p>

      <button
        onClick={handleGoogle}
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:border-indigo-500 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        Continue with Google
      </button>

      <div className="my-4 flex items-center gap-4 text-xs text-slate-400">
        <div className="h-px flex-1 bg-slate-200" />
        <span>or use email</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <form onSubmit={handleEmailAuth} className="space-y-4 text-sm">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            required
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            required
            minLength={6}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading
            ? "Processing…"
            : isRegister
            ? "Sign up"
            : "Sign in"}
        </button>
      </form>

      <p className="mt-4 text-xs text-slate-500">
        {isRegister ? (
          <>
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="font-medium text-indigo-600 hover:underline"
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            New here?{" "}
            <button
              onClick={() => router.push("/login?mode=register")}
              className="font-medium text-indigo-600 hover:underline"
            >
              Create an account
            </button>
          </>
        )}
      </p>
    </div>
  );
}
