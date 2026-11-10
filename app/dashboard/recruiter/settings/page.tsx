"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Save, Mail, Bell } from "lucide-react";
import { toast } from "sonner";

export default function RecruiterSettingsPage() {
  const [emailDigest, setEmailDigest] = useState(true);
  const [autoRejectNotification, setAutoRejectNotification] = useState(true);
  const [teamEmail, setTeamEmail] = useState("hiring-eng@stripe.com");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Recruiter workspace settings updated!");
  };

  return (
    <DashboardLayout
      role="recruiter"
      title="Your hiring preferences"
      subtitle="Choose how your team hears about new applicants and candidate updates."
    >
      <form onSubmit={handleSave} className="mx-auto max-w-3xl space-y-5">
        <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="flex items-start gap-3 border-b border-slate-100 pb-5 dark:border-slate-800">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Keep your team in the loop
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Send hiring updates to the people helping you find your next teammate.
              </p>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Team email address
            </label>
            <input
              type="email"
              required
              value={teamEmail}
              onChange={(e) => setTeamEmail(e.target.value)}
              placeholder="hiring@yourcompany.com"
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
            />
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              We’ll send team notifications to this address.
            </p>
          </div>
        </div>

        <div className="space-y-1 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="mb-4 flex items-start gap-3 border-b border-slate-100 pb-5 dark:border-slate-800">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
              <Bell className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Notifications
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Pick the updates that are useful to you and your team.
              </p>
            </div>
          </div>
          <label className="flex cursor-pointer items-center justify-between gap-5 rounded-lg px-3 py-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60">
            <span>
              <span className="block text-sm font-medium text-slate-800 dark:text-slate-200">
                A daily applicant roundup
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Get one morning email with new applicants whose skills match the role closely.
              </span>
            </span>
            <span className="relative inline-flex shrink-0 items-center">
              <input
                type="checkbox"
                checked={emailDigest}
                onChange={(e) => setEmailDigest(e.target.checked)}
                className="peer sr-only"
              />
              <span className="h-6 w-11 rounded-full bg-slate-300 transition-colors peer-checked:bg-violet-600 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-violet-500 dark:bg-slate-600" />
              <span className="pointer-events-none absolute left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
            </span>
          </label>

          <label className="flex cursor-pointer items-center justify-between gap-5 rounded-lg border-t border-slate-100 px-3 py-4 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60">
            <span>
              <span className="block text-sm font-medium text-slate-800 dark:text-slate-200">
                Let candidates know when it’s not a fit
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Send a considerate update when you decline an application.
              </span>
            </span>
            <span className="relative inline-flex shrink-0 items-center">
              <input
                type="checkbox"
                checked={autoRejectNotification}
                onChange={(e) => setAutoRejectNotification(e.target.checked)}
                className="peer sr-only"
              />
              <span className="h-6 w-11 rounded-full bg-slate-300 transition-colors peer-checked:bg-violet-600 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-violet-500 dark:bg-slate-600" />
              <span className="pointer-events-none absolute left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
            </span>
          </label>
        </div>

        <div className="flex justify-end border-t border-slate-200 pt-5 dark:border-slate-800">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
          >
            <Save className="h-4 w-4" />
            <span>Save preferences</span>
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}
