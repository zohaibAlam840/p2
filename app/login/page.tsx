"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/authContext";
import Link from "next/link";

export default function LoginPage() {
  const { adminLogin, studentLogin } = useAuth();
  const router = useRouter();

  const [tab, setTab] = useState<"admin" | "student">("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminLogin(email, password);
      router.push("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleStudentLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await studentLogin(studentId.trim(), password.trim());
      router.push("/student");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 grid place-items-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 rounded-2xl bg-slate-900 text-white items-center justify-center text-xl font-bold mb-4 shadow-xl shadow-slate-900/20">
            L
          </div>
          <div className="text-2xl font-bold text-slate-900">LSIT LIBRARY</div>
          <div className="text-sm text-slate-500 mt-1">Sign in to continue</div>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2">
            <button
              onClick={() => { setTab("admin"); setError(""); }}
              className={`py-4 text-sm font-semibold transition-colors border-b-2 ${
                tab === "admin"
                  ? "bg-slate-900 text-white border-slate-900"
                  : "text-slate-500 hover:bg-slate-50 border-slate-100"
              }`}
            >
              Admin / Librarian
            </button>
            <button
              onClick={() => { setTab("student"); setError(""); }}
              className={`py-4 text-sm font-semibold transition-colors border-b-2 ${
                tab === "student"
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "text-slate-500 hover:bg-slate-50 border-slate-100"
              }`}
            >
              Student Portal
            </button>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            )}

            {tab === "admin" ? (
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@lsitlibrary.com"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-slate-900 text-white py-2.5 text-sm font-semibold hover:bg-black transition-colors disabled:opacity-60 shadow-lg shadow-slate-900/20 active:scale-[0.98]"
                >
                  {loading ? "Signing in…" : "Sign In as Admin"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Student ID
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="e.g. 2024-BSIT-042"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-indigo-600 text-white py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60 shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
                >
                  {loading ? "Verifying…" : "Enter Student Portal"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-5 text-center">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
