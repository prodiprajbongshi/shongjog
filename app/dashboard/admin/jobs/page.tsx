"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useAppStore } from "@/stores/useAppStore";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import { Briefcase, Search, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function AdminJobsPage() {
  const { jobs, updateJob, deleteJob } = useAppStore();
  const [search, setSearch] = useState("");

  const filtered = jobs.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.companyName.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFeatured = (id: string, current?: boolean) => {
    updateJob(id, { isFeatured: !current });
    toast.success(`Job feature status updated.`);
  };

  const setStatus = (id: string, status: "active" | "closed") => {
    updateJob(id, { status });
    toast.success(`Job marked as ${status}.`);
  };

  return (
    <DashboardLayout
      role="admin"
      title="Job Moderation & Syndication"
      subtitle="Approve, reject, feature, or archive engineering openings across the platform."
    >
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase text-slate-400">
            <tr>
              <th className="py-3.5 px-5">Job Details</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Featured</th>
              <th className="py-3.5 px-5 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((job) => (
              <tr key={job.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-5">
                  <p className="font-bold text-slate-900 dark:text-white">{job.title}</p>
                  <p className="text-[11px] text-slate-400">
                    {job.companyName} • {job.location} ({job.workMode})
                  </p>
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{job.category}</td>
                <td className="py-3 px-4">
                  <StatusBadge status={job.status} size="sm" />
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => toggleFeatured(job.id, job.isFeatured)}
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      job.isFeatured
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                    }`}
                  >
                    {job.isFeatured ? "★ Featured" : "Standard"}
                  </button>
                </td>
                <td className="py-3 px-5 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {job.status !== "active" && (
                      <button
                        onClick={() => setStatus(job.id, "active")}
                        className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300"
                      >
                        Approve
                      </button>
                    )}
                    {job.status === "active" && (
                      <button
                        onClick={() => setStatus(job.id, "closed")}
                        className="rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:bg-rose-950 dark:text-rose-300"
                      >
                        Close
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

