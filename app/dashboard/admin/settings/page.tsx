"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Settings, Shield, Server, Database, Save } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [platformName, setPlatformName] = useState("Shongjog");
  const [requireJobApproval, setRequireJobApproval] = useState(true);
  const [aiMatchThreshold, setAiMatchThreshold] = useState(70);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Platform global settings saved!");
  };

  return (
    <DashboardLayout
      role="admin"
      title="Platform Settings & Governance"
      subtitle="Configure AI matching parameters, employer moderation policies, and maintenance state."
    >
      <form onSubmit={handleSave} className="max-w-3xl space-y-6">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Core Engine Configuration
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Platform Brand Name
            </label>
            <input
              type="text"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Minimum AI Match Threshold for Recruiter Auto-Highlight</span>
              <span className="font-bold text-amber-600">{aiMatchThreshold}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={aiMatchThreshold}
              onChange={(e) => setAiMatchThreshold(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Mandatory Job Approval Workflow
                </p>
                <p className="text-[11px] text-slate-500">
                  Require admin review before newly created recruiter jobs appear in public search.
                </p>
              </div>
              <input
                type="checkbox"
                checked={requireJobApproval}
                onChange={(e) => setRequireJobApproval(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  System Maintenance Mode
                </p>
                <p className="text-[11px] text-slate-500">
                  Show temporary maintenance banner for scheduled database migrations.
                </p>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-700 transition"
        >
          <Save className="h-4 w-4" />
          <span>Save Platform Governance</span>
        </button>
      </form>
    </DashboardLayout>
  );
}

