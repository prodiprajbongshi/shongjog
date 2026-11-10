"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
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
  const [activeFilter, setActiveFilter] = useState<"open" | "resolved">("open");

  const openCount = reports.filter((report) => report.status === "open").length;
  const resolvedCount = reports.length - openCount;
  const visibleReports = reports.filter((report) => report.status === activeFilter);

  const reportTypeLabels: Record<ReportItem["type"], string> = {
    spam_job: "Possible spam listing",
    misleading_salary: "Salary concern",
    user_behavior: "Member behavior",
  };

  const resolveReport = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "resolved" } : r))
    );
    toast.success("Report marked as reviewed.");
  };

  return (
    <DashboardLayout
      role="admin"
      title="Community reports"
      subtitle="Review concerns raised by members and keep the job board helpful and trustworthy."
    >
      <div className="mb-5 flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-white p-1.5 dark:border-slate-800 dark:bg-slate-900">
        <button
          onClick={() => setActiveFilter("open")}
          aria-pressed={activeFilter === "open"}
          className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            activeFilter === "open"
              ? "bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
              : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
          }`}
        >
          Needs a look <span className="ml-1 text-xs opacity-70">({openCount})</span>
        </button>
        <button
          onClick={() => setActiveFilter("resolved")}
          aria-pressed={activeFilter === "resolved"}
          className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            activeFilter === "resolved"
              ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
              : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
          }`}
        >
          Looked at <span className="ml-1 text-xs opacity-70">({resolvedCount})</span>
        </button>
      </div>

      <div className="max-w-4xl space-y-4">
        {visibleReports.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
            <span className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
              activeFilter === "open"
                ? "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
            }`}>
              {activeFilter === "open" ? <AlertTriangle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            </span>
            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
              {activeFilter === "open" ? "You’re all caught up" : "No reviewed reports yet"}
            </h3>
            <p className="mx-auto mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
              {activeFilter === "open"
                ? "New concerns from the community will show up here."
                : "Reports you’ve marked as reviewed will be saved here."}
            </p>
          </div>
        ) : visibleReports.map((rep) => (
          <div
            key={rep.id}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    rep.status === "open"
                      ? "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                      : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                  }`}>
                    {rep.status === "open" ? <AlertTriangle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                      {reportTypeLabels[rep.type]}
                    </h4>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Shared by <span className="font-medium text-slate-700 dark:text-slate-300">{rep.reporter}</span>
                      {" · "}
                      {new Date(`${rep.date}T00:00:00`).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                    rep.status === "open"
                      ? "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                      : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                  }`}
                >
                  {rep.status === "open" ? <Clock className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                  {rep.status === "open" ? "Needs review" : "Reviewed"}
                </span>
              </div>

              <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  About: {rep.target}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {rep.details}
                </p>
              </div>
            </div>

            {rep.status === "open" && (
              <div className="flex justify-end border-t border-slate-100 bg-slate-50/60 px-5 py-3 dark:border-slate-800 dark:bg-slate-800/20 sm:px-6">
                <button
                  onClick={() => resolveReport(rep.id)}
                  className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                >
                  Mark as reviewed
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
