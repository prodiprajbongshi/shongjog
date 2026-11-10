"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Save, SlidersHorizontal, ShieldCheck, Wrench } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [platformName, setPlatformName] = useState("Shongjog");
  const [requireJobApproval, setRequireJobApproval] = useState(true);
  const [aiMatchThreshold, setAiMatchThreshold] = useState(70);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your platform settings have been saved.");
  };

  return (
    <DashboardLayout
      role="admin"
      title="How your platform works"
      subtitle="Set the defaults for job reviews, candidate matching, and planned maintenance."
    >
      <form onSubmit={handleSave} className="mx-auto max-w-3xl space-y-5">
        <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="flex items-start gap-3 border-b border-slate-100 pb-5 dark:border-slate-800">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
              <SlidersHorizontal className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Platform basics
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Set your platform name and how closely a candidate’s skills should match.
              </p>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Platform name
            </label>
            <input
              type="text"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-amber-700 dark:focus:ring-amber-950"
            />
          </div>

          <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
              <div>
                <label htmlFor="match-threshold" className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  Candidate match threshold
                </label>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Highlight applicants at or above this skills match.
                </p>
              </div>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                {aiMatchThreshold}%
              </span>
            </div>
            <input
              id="match-threshold"
              type="range"
              min="50"
              max="95"
              step="5"
              value={aiMatchThreshold}
              onChange={(e) => setAiMatchThreshold(Number(e.target.value))}
              className="w-full cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>50% · More candidates</span>
              <span>95% · Closer matches</span>
            </div>
          </div>
        </div>

        <div className="space-y-1 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="mb-4 flex items-start gap-3 border-b border-slate-100 pb-5 dark:border-slate-800">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Keep listings trustworthy
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Choose whether new job posts need a quick review before they’re public.
              </p>
            </div>
          </div>

          <label className="flex cursor-pointer items-center justify-between gap-5 rounded-lg px-3 py-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60">
            <span>
              <span className="block text-sm font-medium text-slate-800 dark:text-slate-200">
                Review jobs before they go live
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                New listings stay out of public search until an admin approves them.
              </span>
            </span>
            <span className="relative inline-flex shrink-0 items-center">
              <input
                type="checkbox"
                checked={requireJobApproval}
                onChange={(e) => setRequireJobApproval(e.target.checked)}
                className="peer sr-only"
              />
              <span className="h-6 w-11 rounded-full bg-slate-300 transition-colors peer-checked:bg-amber-600 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber-500 dark:bg-slate-600" />
              <span className="pointer-events-none absolute left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
            </span>
          </label>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900/60 dark:bg-amber-950/20 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
              <Wrench className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Maintenance mode
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Let people know the platform is temporarily unavailable while you carry out planned work.
              </p>
              <label className="mt-4 inline-flex cursor-pointer items-center gap-3">
                <span className="relative inline-flex shrink-0 items-center">
                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                    className="peer sr-only"
                  />
                  <span className="h-6 w-11 rounded-full bg-slate-300 transition-colors peer-checked:bg-amber-600 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber-500 dark:bg-slate-600" />
                  <span className="pointer-events-none absolute left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
                </span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {maintenanceMode ? "Maintenance mode is on" : "Turn on maintenance mode"}
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-200 pt-5 dark:border-slate-800">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-700"
          >
            <Save className="h-4 w-4" />
            <span>Save changes</span>
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}
