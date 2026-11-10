"use client";

import React from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { RelativeTime } from "@/components/ui/RelativeTime";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useAppStore } from "@/stores/useAppStore";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  MapPin,
  Search,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

export default function SavedJobsPage() {
  const { jobs, savedJobIds, toggleSaveJob, applications } = useAppStore();
  const savedJobs = jobs.filter((job) => savedJobIds.includes(job.id));

  const handleRemove = (jobId: string, title: string) => {
    toggleSaveJob(jobId);
    toast.info("Removed from saved jobs", { description: title });
  };

  return (
    <DashboardLayout
      role="job_seeker"
      title="Saved jobs"
      subtitle="A shortlist of roles you wanted to come back to."
      actions={
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <Search className="h-4 w-4" />
          Browse jobs
        </Link>
      }
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Your shortlist
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {savedJobs.length === 1
                ? "1 role saved"
                : `${savedJobs.length} roles saved`}
              {" · "}
              Remove a role whenever it is no longer a fit.
            </p>
          </div>
          {savedJobs.length > 0 && (
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Find another role <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        {savedJobs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <Bookmark className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
              No jobs on your shortlist yet
            </h2>
            <p className="mx-auto mt-1.5 max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-400">
              When a role catches your eye, save it and it will be waiting here
              when you are ready to take a closer look.
            </p>
            <Link
              href="/jobs"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Search className="h-3.5 w-3.5" />
              Explore open roles
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {savedJobs.map((job) => {
              const alreadyApplied = applications.some(
                (application) => application.jobId === job.id
              );

              return (
                <li
                  key={job.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 sm:p-5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3.5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white p-1.5 dark:border-slate-700 dark:bg-slate-800">
                        {job.companyLogo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={job.companyLogo}
                            alt={`${job.companyName} logo`}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <Building2 className="h-5 w-5 text-slate-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          {job.companyName}
                        </p>
                        <Link
                          href={`/jobs/${job.id}`}
                          className="mt-1 inline-block text-base font-semibold leading-snug text-slate-900 hover:text-indigo-700 dark:text-white dark:hover:text-indigo-300"
                        >
                          {job.title}
                        </Link>
                        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-600 dark:text-slate-300">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-slate-400" />
                            {job.location}
                          </span>
                          <span className="font-medium text-slate-800 dark:text-slate-200">
                            {formatCurrency(job.salaryMin, job.currency)} –{" "}
                            {formatCurrency(job.salaryMax, job.currency)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(job.id, job.title)}
                      aria-label={`Remove ${job.title} from saved jobs`}
                      className="inline-flex w-fit items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:text-slate-400 dark:hover:bg-rose-950/40 dark:hover:text-rose-300"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3.5 dark:border-slate-800">
                    <StatusBadge status={job.workMode} size="sm" />
                    <StatusBadge status={job.type} size="sm" />
                    {alreadyApplied && (
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                        Application sent
                      </span>
                    )}
                    <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <CalendarDays className="h-3.5 w-3.5" />
                      Closes {formatDate(job.deadline)}
                    </span>
                  </div>

                  {job.description && (
                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
                      {job.description}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                      <BriefcaseBusiness className="h-3.5 w-3.5" />
                      Posted <RelativeTime dateString={job.postedAt} />
                    </p>
                    <Link
                      href={`/jobs/${job.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
                    >
                      View job <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
}
