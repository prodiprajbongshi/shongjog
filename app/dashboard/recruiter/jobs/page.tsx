"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { RelativeTime } from "@/components/ui/RelativeTime";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useAppStore } from "@/stores/useAppStore";
import { formatCurrency } from "@/lib/utils";
import type { JobStatus } from "@/types";
import {
  Briefcase,
  PlusCircle,
  Search,
  Users,
  Eye,
  Trash2,
  MapPin,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

const statusFilters = ["all", "active", "draft", "closed"] as const;

export default function RecruiterJobsPage() {
  const { jobs, deleteJob, updateJob } = useAppStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.category.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || j.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: jobs.length,
    active: jobs.filter((job) => job.status === "active").length,
    draft: jobs.filter((job) => job.status === "draft").length,
    closed: jobs.filter((job) => job.status === "closed").length,
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteJob(id);
      toast.success("Job posting deleted.");
    }
  };

  const toggleJobStatus = (id: string, current: string) => {
    const next: JobStatus = current === "active" ? "closed" : "active";
    updateJob(id, { status: next });
    toast.success(`Job marked as ${next}`);
  };

  return (
    <DashboardLayout
      role="recruiter"
      title="Job Management"
      subtitle="Your openings, all in one place. See how each one is doing and keep things moving."
      actions={
        <Link
          href="/dashboard/recruiter/jobs/create"
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Post a job</span>
        </Link>
      }
    >
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter jobs by status">
            {statusFilters.map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                aria-pressed={statusFilter === st}
                className={`rounded-lg px-3 py-2 text-sm font-medium capitalize transition-colors ${
                  statusFilter === st
                    ? "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                {st} <span className="ml-1 text-xs opacity-70">{statusCounts[st]}</span>
              </button>
            ))}
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              aria-label="Search jobs"
              placeholder="Search title, category, or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:bg-slate-900 dark:focus:ring-violet-950"
            />
          </div>
        </div>
        <p className="mt-3 px-1 text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
          Showing {filteredJobs.length} of {jobs.length} {jobs.length === 1 ? "job" : "jobs"}
        </p>
      </div>

      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <Briefcase className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
              {jobs.length === 0 ? "Ready to find your next great hire?" : "No jobs match that search"}
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              {jobs.length === 0
                ? "Post an opening and interested candidates can start applying."
                : "Try another title, category, or location, or choose a different status."}
            </p>
            {jobs.length === 0 && (
              <Link
                href="/dashboard/recruiter/jobs/create"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
              >
                <PlusCircle className="h-4 w-4" />
                Post your first job
              </Link>
            )}
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 sm:p-6"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={job.status} size="sm" />
                    <StatusBadge status={job.workMode} size="sm" />
                    <span className="text-xs text-slate-400">{job.category}</span>
                  </div>
                  <h3 className="text-lg font-semibold leading-snug text-slate-900 dark:text-white">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                      {job.location}
                    </span>
                    <span className="font-medium text-slate-600 dark:text-slate-300">
                      {formatCurrency(job.salaryMin)} – {formatCurrency(job.salaryMax)} / year
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 shrink-0 text-slate-400" />
                      Posted <RelativeTime dateString={job.postedAt} />
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4 dark:border-slate-800 md:justify-end md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                      <Users className="h-4 w-4" />
                    </span>
                    <span>
                      <strong className="font-semibold text-slate-900 dark:text-white">{job.applicantsCount}</strong>{" "}
                      {job.applicantsCount === 1 ? "applicant" : "applicants"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/jobs/${job.id}`}
                      aria-label={`View ${job.title} posting`}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="hidden lg:inline">View post</span>
                    </Link>

                    <button
                      onClick={() => toggleJobStatus(job.id, job.status)}
                      aria-label={`${job.status === "active" ? "Pause" : "Activate"} ${job.title}`}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      {job.status === "active" ? "Pause" : "Activate"}
                    </button>

                    <button
                      onClick={() => handleDelete(job.id, job.title)}
                      aria-label={`Delete ${job.title}`}
                      className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-rose-900 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
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
