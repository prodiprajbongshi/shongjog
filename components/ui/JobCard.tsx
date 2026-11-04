"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Job } from "@/types";
import { useAppStore } from "@/stores/useAppStore";
import { StatusBadge } from "./StatusBadge";
import { ApplyModal } from "./ApplyModal";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import {
  Bookmark,
  MapPin,
  DollarSign,
  Clock,
  Sparkles,
  ArrowUpRight,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

interface JobCardProps {
  job: Job;
  compact?: boolean;
}

export function JobCard({ job, compact = false }: JobCardProps) {
  const { savedJobIds, toggleSaveJob, seekerProfile, applications } = useAppStore();
  const isSaved = savedJobIds.includes(job.id);
  const alreadyApplied = applications.some((a) => a.jobId === job.id);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Compute skill match
  const jobSkills = job.skills || [];
  const seekerSkills = seekerProfile.skills || [];
  const matched = jobSkills.filter((s) =>
    seekerSkills.some((sk) => sk.toLowerCase() === s.toLowerCase())
  );
  const matchScore = Math.min(
    98,
    Math.max(70, Math.round((matched.length / Math.max(1, jobSkills.length)) * 100) + 12)
  );

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowSaved = toggleSaveJob(job.id);
    if (nowSaved) {
      toast.success("Job bookmarked!", {
        description: `Saved "${job.title}" to your saved jobs list.`,
      });
    } else {
      toast.info("Removed from saved jobs.");
    }
  };

  return (
    <>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-950/[0.03] transition-all duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-950/[0.07] sm:p-6 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-indigo-800/80">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3.5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 p-2 transition duration-200 group-hover:border-indigo-200 group-hover:bg-indigo-50/50 dark:border-slate-700 dark:bg-slate-800 dark:group-hover:bg-indigo-950/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={job.companyLogo}
                alt={job.companyName}
                className="h-full w-full object-contain rounded-lg"
              />
            </div>
            <div className="min-w-0 pt-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {job.companyName}
                </span>
                {job.isFeatured && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/70 bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/60 dark:text-amber-300">
                   Featured
                  </span>
                )}
              </div>
              <Link
                href={`/jobs/${job.id}`}
                className="mt-1.5 inline-block text-lg font-bold leading-snug tracking-tight text-slate-900 transition-colors hover:text-indigo-600 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-white dark:hover:text-indigo-400"
              >
                {job.title}
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={handleBookmark}
            aria-label={isSaved ? `Remove ${job.title} from saved jobs` : `Save ${job.title}`}
            aria-pressed={isSaved}
            title={isSaved ? "Remove from saved" : "Save this job"}
            className={`shrink-0 rounded-xl border p-2.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              isSaved
                ? "border-indigo-100 bg-indigo-50 text-indigo-600 dark:border-indigo-900/70 dark:bg-indigo-950/60 dark:text-indigo-400"
                : "border-transparent text-slate-400 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-700 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <Bookmark
              className={`h-4 w-4 ${isSaved ? "fill-indigo-600 dark:fill-indigo-400" : ""}`}
            />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <StatusBadge status={job.workMode} size="sm" />
          <StatusBadge status={job.type} size="sm" />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">
            <MapPin className="h-3.5 w-3.5 text-slate-400" /> {job.location}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            <DollarSign className="h-3.5 w-3.5" />
            {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
          </span>
        </div>

        {!compact && (
          <>
            <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {job.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {jobSkills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-slate-200/80 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300"
                >
                  {skill}
                </span>
              ))}
              {jobSkills.length > 4 && (
                <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  +{jobSkills.length - 4}
                </span>
              )}
            </div>
          </>
        )}

        <div className="mt-auto flex flex-col gap-4 border-t border-slate-100 pt-4 sm:mt-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800/80">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 text-xs text-slate-400">
              <Clock className="h-3 w-3" /> {formatRelativeTime(job.postedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50/70 px-2.5 py-1 text-[10px] font-semibold text-indigo-700 dark:border-indigo-900/70 dark:bg-indigo-950/50 dark:text-indigo-300">
              <Sparkles className="h-3 w-3" /> {matchScore}% AI Match
            </span>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <Link
              href={`/jobs/${job.id}`}
              className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:flex-none dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Details <ArrowUpRight className="h-3 w-3" />
            </Link>

            {alreadyApplied ? (
              <span className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-emerald-50 px-3 py-2.5 text-xs font-semibold text-emerald-700 sm:flex-none dark:bg-emerald-950/60 dark:text-emerald-300">
                <CheckCircle className="h-3 w-3" /> Applied
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:translate-y-0 sm:flex-none dark:focus-visible:ring-offset-slate-900"
              >
                Quick Apply
              </button>
            )}
          </div>
        </div>
      </article>

      <ApplyModal
        job={job}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </>
  );
}
