"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAppStore } from "@/stores/useAppStore";
import { Settings, Bell, Lock, Shield, Eye, Save } from "lucide-react";
import { toast } from "sonner";

export default function SeekerSettingsPage() {
  const { seekerProfile, updateSeekerProfile } = useAppStore();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [interviewReminders, setInterviewReminders] = useState(true);
  const [stealthMode, setStealthMode] = useState(false);
  const [expectedMin, setExpectedMin] = useState(seekerProfile.expectedSalaryMin || 90000);
  const [expectedMax, setExpectedMax] = useState(seekerProfile.expectedSalaryMax || 140000);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeekerProfile({
      expectedSalaryMin: expectedMin,
      expectedSalaryMax: expectedMax,
    });
    toast.success("Preferences saved successfully!");
  };

  return (
    <DashboardLayout
      role="job_seeker"
      title="Candidate Settings & Privacy"
      subtitle="Configure notifications, salary expectations, and profile visibility."
    >
      <form onSubmit={handleSave} className="max-w-3xl space-y-6">
        {/* Salary Expectations */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Target Compensation
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Helps AI filter out positions outside your preferred compensation bandwidth.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Minimum Annual Salary ($ USD)
              </label>
              <input
                type="number"
                value={expectedMin}
                onChange={(e) => setExpectedMin(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target / Ideal Annual Salary ($ USD)
              </label>
              <input
                type="number"
                value={expectedMax}
                onChange={(e) => setExpectedMax(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Notifications & Privacy */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Notifications & Visibility
          </h3>

          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Instant Email Alerts for New Matches
                </p>
                <p className="text-[11px] text-slate-500">
                  Receive notifications when roles matching 85%+ of your skills open.
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Interview Reminders (SMS & Calendar)
                </p>
                <p className="text-[11px] text-slate-500">
                  Get automated calendar sync 24h and 1h before your scheduled calls.
                </p>
              </div>
              <input
                type="checkbox"
                checked={interviewReminders}
                onChange={(e) => setInterviewReminders(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Stealth Mode (Hide from Current Employer)
                </p>
                <p className="text-[11px] text-slate-500">
                  Prevent recruiters from your current listed company from discovering your profile.
                </p>
              </div>
              <input
                type="checkbox"
                checked={stealthMode}
                onChange={(e) => setStealthMode(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
        >
          <Save className="h-4 w-4" />
          <span>Save All Settings</span>
        </button>
      </form>
    </DashboardLayout>
  );
}

