"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ShieldAlert, AlertTriangle, CheckCircle2, Clock, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ReportItem {
  id: string;
  type: "spam_job" | "misleading_salary" | "user_behavior";
  reporter: string;
  target: string;
  details: string;
  date: string;
  status: "open" | "resolved";
}

const INITIAL_REPORTS: ReportItem[] = [
  {
    id: "rep-1",
    type: "misleading_salary",
    reporter: "Farhan Hossain",
    target: "Job: Apex Distributed Lead",
    details: "Salary posted was $120k-$150k but recruiter stated lower cap during screen.",
    date: "2025-02-12",
    status: "open",
  },
  {
    id: "rep-2",
    type: "spam_job",
    reporter: "Aditi Roy",
    target: "Job: External Staff Consultant",
    details: "Posting is a generic agency scrape with invalid company website.",
    date: "2025-02-10",
    status: "resolved",
  },
];

export default function AdminReportsPage() {
  const [reports, setReports] = useState(INITIAL_REPORTS);

  const resolveReport = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "resolved" } : r))
    );
    toast.success("Moderation ticket resolved.");
  };

  return (
    <DashboardLayout
      role="admin"
      title="Compliance & Moderation Reports"
      subtitle="Investigate community flags, misleading job postings, and audit logs."
    >
      <div className="space-y-4 max-w-4xl">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                  <AlertTriangle className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white capitalize">
                    {rep.type.replace("_", " ")}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Reported by {rep.reporter} on {rep.date}
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                  rep.status === "open"
                    ? "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                    : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                }`}
              >
                {rep.status}
              </span>
            </div>

            <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
              <span className="font-semibold block mb-0.5">Target: {rep.target}</span>
              "{rep.details}"
            </div>

            {rep.status === "open" && (
              <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                <button
                  onClick={() => resolveReport(rep.id)}
                  className="rounded-xl bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700"
                >
                  Mark as Resolved & Warn Employer
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

