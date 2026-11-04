"use client";

import React from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { JobCard } from "@/components/ui/JobCard";
import { useAppStore } from "@/stores/useAppStore";
import { Bookmark, Briefcase } from "lucide-react";

export default function SavedJobsPage() {
  const { jobs, savedJobIds } = useAppStore();
  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  return (
    <DashboardLayout
      role="job_seeker"
      title="Saved Tech Jobs"
      subtitle="Positions bookmarked for your next career move."
    >
      {savedJobs.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <Bookmark className="h-10 w-10 text-slate-300 mx-auto" />
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            No saved jobs yet
          </h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            Click the bookmark icon on any job card to save it for easy access later.
          </p>
          <Link
            href="/jobs"
            className="mt-5 inline-block rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700"
          >
            Explore Jobs
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

