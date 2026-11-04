"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Settings, Bell, Lock, Users, Save } from "lucide-react";
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
      title="Recruiter Workspace Settings"
      subtitle="Configure automated interview dispatch, team notifications, and ATS integration options."
    >
      <form onSubmit={handleSave} className="max-w-3xl space-y-6">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Team Notification Routing
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Hiring Team Group Alias
            </label>
            <input
              type="email"
              value={teamEmail}
              onChange={(e) => setTeamEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Daily Candidate Digest
                </p>
                <p className="text-[11px] text-slate-500">
                  Receive a summary of new applications matching 85%+ score every morning.
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailDigest}
                onChange={(e) => setEmailDigest(e.target.checked)}
                className="rounded text-violet-600 focus:ring-violet-500 h-4 w-4"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Polite Feedback Dispatch on Rejection
                </p>
                <p className="text-[11px] text-slate-500">
                  Automatically send constructive encouragement to rejected candidates.
                </p>
              </div>
              <input
                type="checkbox"
                checked={autoRejectNotification}
                onChange={(e) => setAutoRejectNotification(e.target.checked)}
                className="rounded text-violet-600 focus:ring-violet-500 h-4 w-4"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-violet-700"
        >
          <Save className="h-4 w-4" />
          <span>Save Workspace Settings</span>
        </button>
      </form>
    </DashboardLayout>
  );
}

