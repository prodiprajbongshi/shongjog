"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/stores/useAppStore";
import { UserRole } from "@/types";
import {
  User,
  Mail,
  Lock,
  Building,
  ArrowRight,
  UserCheck,
  Building2,
} from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const { setRole, setCurrentUser } = useAppStore();

  const [selectedRole, setSelectedRole] = useState<UserRole>("job_seeker");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      toast.error("Please accept the terms to continue.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setRole(selectedRole);

      if (selectedRole === "job_seeker") {
        toast.success("Account created successfully! Welcome to Shongjog.");
        router.push("/dashboard/job-seeker");
      } else {
        toast.success("Recruiter workspace created! Welcome aboard.");
        router.push("/dashboard/recruiter");
      }
      setIsLoading(false);
    }, 700);
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
        <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
          {/* Role selector tabs */}
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800 mb-6">
            <button
              type="button"
              onClick={() => setSelectedRole("job_seeker")}
              className={`flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold transition ${
                selectedRole === "job_seeker"
                  ? "bg-white text-indigo-600 shadow-xs dark:bg-slate-900 dark:text-indigo-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <UserCheck className="h-4 w-4" />
              <span>Job Seeker</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("recruiter")}
              className={`flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold transition ${
                selectedRole === "recruiter"
                  ? "bg-white text-violet-600 shadow-xs dark:bg-slate-900 dark:text-violet-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Employer / Recruiter</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
                />
              </div>
            </div>

            {selectedRole === "recruiter" && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Company Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Tech Labs"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder={
                    selectedRole === "recruiter"
                      ? "you@company.com"
                      : "you@example.com"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Create Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
                />
              </div>
            </div>

            <label className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500 mt-0.5"
              />
              <span>
                I agree to Shongjog's{" "}
                <a href="#terms" className="text-indigo-600 underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#privacy" className="text-indigo-600 underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-98 disabled:opacity-70"
            >
              {isLoading ? (
                <span>Setting up your account...</span>
              ) : (
                <>
                  <span>
                    Create{" "}
                    {selectedRole === "job_seeker" ? "Candidate" : "Recruiter"}{" "}
                    Account
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
