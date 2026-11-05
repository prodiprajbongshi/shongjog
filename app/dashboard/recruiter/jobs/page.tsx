"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { RelativeTime } from "@/components/ui/RelativeTime";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useAppStore } from "@/stores/useAppStore";
import { formatCurrency } from "@/lib/utils";
import {
  Briefcase,
  PlusCircle,
  Search,
  Users,
  Eye,
  Trash2,
  Edit,
  ExternalLink,
  MapPin,
  Clock,
  MoreVertical,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function RecruiterJobsPage() {
  const { jobs, deleteJob, updateJob } = useAppStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || j.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteJob(id);
      toast.success("Job posting deleted.");
    }
  };

  const toggleJobStatus = (id: string, current: string) => {
    const next = current === "active" ? "closed" : "active";
    updateJob(id, { status: next as any });
    toast.success(`Job marked as ${next}`);
  };

  return (
    <DashboardLayout
      role="recruiter"
      title="Job Management"
      subtitle="Publish, modify, and monitor open engineering requisitions."
      actions={
        <Link
          href="/dashboard/recruiter/jobs/create"
          className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-violet-700 transition"
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span>Post New Vacancy</span>
        </Link>
      }
    >
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          {["all", "active", "draft", "closed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold capitalize transition ${
                statusFilter === st
                  ? "bg-violet-600 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search job requisitions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <Briefcase className="h-10 w-10 text-slate-300 mx-auto" />
            <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
              No jobs found
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Create your first job posting to start receiving qualified applications.
            </p>
            <Link
              href="/dashboard/recruiter/jobs/create"
              className="mt-4 inline-block rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-xs"
            >
              Post a Job Now
            </Link>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <StatusBadge status={job.status} size="sm" />
                    <StatusBadge status={job.workMode} size="sm" />
                    <span className="text-xs text-slate-400">
                      ID: {job.id}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" /> {job.location}
                    </span>
                    <span>
                      {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)} / yr
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" /> Posted{" "}
                      <RelativeTime dateString={job.postedAt} />
                    </span>
                  </div>
                </div>

                {/* Metrics & Actions */}
                <div className="flex items-center gap-4 md:border-l md:border-slate-100 md:pl-6 dark:md:border-slate-800">
                  <div className="text-center pr-3">
                    <span className="text-xl font-black text-violet-600 dark:text-violet-400">
                      {job.applicantsCount}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                      Applicants
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      title="View Public Post"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>

                    <button
                      onClick={() => toggleJobStatus(job.id, job.status)}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      {job.status === "active" ? "Pause" : "Activate"}
                    </button>

                    <button
                      onClick={() => handleDelete(job.id, job.title)}
                      className="rounded-xl border border-slate-200 p-2 text-rose-500 hover:bg-rose-50 dark:border-slate-700 dark:hover:bg-rose-950/40"
                      title="Delete Requisition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
