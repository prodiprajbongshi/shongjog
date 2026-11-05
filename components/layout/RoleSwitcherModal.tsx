"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/stores/useAppStore";
import { UserRole } from "@/types";
import {

  UserCheck,
  Building2,
  ShieldAlert,
  Moon,
  Sun,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";

export default function RoleSwitcherModal() {
  const router = useRouter();
  const pathname = usePathname();
  const { currentRole, setRole, theme, toggleTheme, resetToMockData, currentUser } =
    useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    setRole(role);
    toast.success(`Switched role to: ${role === "job_seeker" ? "Job Seeker (Tanvir)" : role === "recruiter" ? "Recruiter (Elena @ Stripe)" : "Admin"}`);

    // If currently on a dashboard, redirect to appropriate role dashboard
    if (pathname.startsWith("/dashboard")) {
      if (role === "job_seeker") router.push("/dashboard/job-seeker");
      else if (role === "recruiter") router.push("/dashboard/recruiter");
      else if (role === "admin") router.push("/dashboard/admin");
    }
  };

  const handleResetData = () => {
    resetToMockData();
    toast.info("Reset application state to original mock data.");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-80 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md transition-all dark:border-slate-800 dark:bg-slate-900/95">
           

          <div className="mt-3 space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Switch Active Role:
            </p>

            <button
              onClick={() => handleRoleChange("job_seeker")}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition ${
                currentRole === "job_seeker"
                  ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500/20 dark:bg-indigo-950/60 dark:text-indigo-300"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60"
              }`}
            >
              <span className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>Job Seeker (Candidate)</span>
              </span>
              <Link
                href="/dashboard/job-seeker"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRoleChange("job_seeker");
                }}
                className="flex items-center gap-1 rounded bg-indigo-600/10 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-600 hover:bg-indigo-600/20 dark:text-indigo-300"
              >
                Dashboard <ExternalLink className="h-2.5 w-2.5" />
              </Link>
            </button>

            <button
              onClick={() => handleRoleChange("recruiter")}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition ${
                currentRole === "recruiter"
                  ? "bg-violet-50 text-violet-700 ring-1 ring-violet-500/20 dark:bg-violet-950/60 dark:text-violet-300"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60"
              }`}
            >
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                <span>Recruiter (Stripe)</span>
              </span>
              <Link
                href="/dashboard/recruiter"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRoleChange("recruiter");
                }}
                className="flex items-center gap-1 rounded bg-violet-600/10 px-1.5 py-0.5 text-[10px] font-semibold text-violet-600 hover:bg-violet-600/20 dark:text-violet-300"
              >
                Dashboard <ExternalLink className="h-2.5 w-2.5" />
              </Link>
            </button>

            <button
              onClick={() => handleRoleChange("admin")}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition ${
                currentRole === "admin"
                  ? "bg-amber-50 text-amber-700 ring-1 ring-amber-500/20 dark:bg-amber-950/60 dark:text-amber-300"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60"
              }`}
            >
              <span className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>Platform Admin</span>
              </span>
              <Link
                href="/dashboard/admin"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRoleChange("admin");
                }}
                className="flex items-center gap-1 rounded bg-amber-600/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-600 hover:bg-amber-600/20 dark:text-amber-300"
              >
                Dashboard <ExternalLink className="h-2.5 w-2.5" />
              </Link>
            </button>
          </div>

          <div className="mt-3 flex items-center justify-end border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-800">
            
            <Link
              href="/"
              className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Public Home &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Pill Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 rounded-full border border-indigo-200 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-800 shadow-xl backdrop-blur-md transition-all hover:border-indigo-400 hover:shadow-indigo-500/10 dark:border-indigo-900/60 dark:bg-slate-900/90 dark:text-slate-100"
      >
         
         
        <span className="capitalize">
          Role: <strong className="text-indigo-600 dark:text-indigo-400">{currentRole.replace("_", " ")}</strong>
        </span>
        {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
      </button>
    </div>
  );
}

