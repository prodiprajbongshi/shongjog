"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/stores/useAppStore";
import { MOCK_USERS } from "@/lib/mock-data";
import { UserRole } from "@/types";
import {
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  Building2,
  UserCheck,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { setRole, setCurrentUser } = useAppStore();

  const [email, setEmail] = useState("tanvir.ahmed@example.com");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Check if email belongs to recruiter or admin, else default to seeker
      if (email.includes("stripe") || email.includes("recruiter")) {
        setRole("recruiter");
        toast.success("Welcome back, Elena! (Recruiter)");
        router.push("/dashboard/recruiter");
      } else if (email.includes("admin")) {
        setRole("admin");
        toast.success("Welcome back, Admin!");
        router.push("/dashboard/admin");
      } else {
        setRole("job_seeker");
        toast.success("Welcome back, Tanvir! (Job Seeker)");
        router.push("/dashboard/job-seeker");
      }
      setIsLoading(false);
    }, 600);
  };

  const quickLoginAs = (role: UserRole) => {
    setIsLoading(true);
    setRole(role);
    setTimeout(() => {
      if (role === "job_seeker") {
        toast.success("Logged in as Tanvir Ahmed (Job Seeker)");
        router.push("/dashboard/job-seeker");
      } else if (role === "recruiter") {
        toast.success("Logged in as Elena Rostova (Recruiter @ Stripe)");
        router.push("/dashboard/recruiter");
      } else {
        toast.success("Logged in as Platform Admin");
        router.push("/dashboard/admin");
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
        {/* Brand header */}
        <div className="text-center mb-8">
          {/* Brand Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                Shongjog
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 inline-block"></span>
              </span>
              <span className="text-[10px] font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400">
                Tech Recruitment
              </span>
            </div>
          </Link>
          <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Access your applications, job listings, and hiring workflows
          </p>
        </div>

        {/* Card */}
        <div className="">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Work or Personal Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl cursor-pointer bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-98 disabled:opacity-70"
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Don't have an account yet?{" "}
            <Link
              href="/register"
              className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400 cursor-pointer"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
