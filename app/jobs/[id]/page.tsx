"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ApplyModal } from "@/components/ui/ApplyModal";
import { JobCard } from "@/components/ui/JobCard";
import { useAppStore } from "@/stores/useAppStore";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import {
  MapPin,
  DollarSign,
  Briefcase,
  Building2,
  Clock,
  Sparkles,
  Bookmark,
  Share2,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Calendar,
  Layers,
  Award,
} from "lucide-react";
import { toast } from "sonner";

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id as string;

  const { jobs, savedJobIds, toggleSaveJob, seekerProfile, applications } = useAppStore();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const job = jobs.find((j) => j.id === jobId) || jobs[0];

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div>
            <h2 className="text-xl font-bold">Job Not Found</h2>
            <Link href="/jobs" className="mt-4 inline-block text-indigo-600 font-semibold">
              &larr; Back to Job Board
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isSaved = savedJobIds.includes(job.id);
  const alreadyApplied = applications.some((a) => a.jobId === job.id);

  // Skill match calculation
  const jobSkills = job.skills || [];
  const seekerSkills = seekerProfile.skills || [];
  const matchedSkills = jobSkills.filter((s) =>
    seekerSkills.some((sk) => sk.toLowerCase() === s.toLowerCase())
  );
  const missingSkills = jobSkills.filter(
    (s) => !seekerSkills.some((sk) => sk.toLowerCase() === s.toLowerCase())
  );
  const matchPercent = Math.min(
    100,
    Math.max(68, Math.round((matchedSkills.length / Math.max(1, jobSkills.length)) * 100) + 12)
  );

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Job link copied to clipboard!");
    }
  };

  const handleBookmark = () => {
    const nowSaved = toggleSaveJob(job.id);
    if (nowSaved) {
      toast.success("Job bookmarked!");
    } else {
      toast.info("Removed from saved jobs.");
    }
  };

  const relatedJobs = jobs
    .filter((j) => j.id !== job.id && (j.category === job.category || j.companyId === job.companyId))
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to all jobs</span>
          </Link>

          {/* Top Job Header Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={job.companyLogo}
                    alt={job.companyName}
                    className="h-full w-full object-contain rounded-xl"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {job.companyName}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                      Verified Employer
                    </span>
                  </div>
                  <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {job.title}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" /> {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" /> Posted {formatRelativeTime(job.postedAt)}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <DollarSign className="h-3.5 w-3.5" /> {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)} / yr
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 sm:self-center">
                <button
                  onClick={handleBookmark}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
                    isSaved
                      ? "border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-400"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                  title={isSaved ? "Saved" : "Save Job"}
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition"
                  title="Share"
                >
                  <Share2 className="h-4 w-4" />
                </button>

                {alreadyApplied ? (
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-5 py-3 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" /> Application Submitted
                  </span>
                ) : (
                  <button
                    onClick={() => setIsApplyModalOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-95"
                  >
                    <span>Apply Now</span>
                  </button>
                )}
              </div>
            </div>

            {/* Badges strip */}
            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-5 dark:border-slate-800/80">
              <StatusBadge status={job.workMode} size="md" />
              <StatusBadge status={job.type} size="md" />
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300 capitalize">
                Level: {job.experienceLevel}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Department: {job.department || "Engineering"}
              </span>
            </div>
          </div>

          {/* Main content grid */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Cols: Description, Responsibilities, Requirements */}
            <div className="lg:col-span-8 space-y-8">
              {/* AI Match Overview Card */}
              <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 to-violet-50/80 p-6 dark:border-indigo-900/60 dark:from-indigo-950/40 dark:to-violet-950/30">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        AI Job Match Score: {matchPercent}%
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        Evaluated against your active profile ({seekerProfile.fullName} • {seekerProfile.title})
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white shadow-xs">
                    Strong Candidate Match
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-indigo-100/80 dark:border-indigo-900/40">
                  <div>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">
                      Matched Skills ({matchedSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {matchedSkills.map((s) => (
                        <span
                          key={s}
                          className="rounded bg-emerald-100/70 px-2 py-0.5 text-[11px] font-medium text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                        >
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {missingSkills.length > 0 && (
                    <div>
                      <span className="font-semibold text-amber-700 dark:text-amber-400 block mb-1">
                        Bonus / Learning Opportunities ({missingSkills.length})
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {missingSkills.map((s) => (
                          <span
                            key={s}
                            className="rounded bg-amber-100/70 px-2 py-0.5 text-[11px] font-medium text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                          >
                            + {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description & Overview */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Job Description
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>

                {/* Key Responsibilities */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                      Key Responsibilities
                    </h3>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      {job.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                      Required Qualifications & Skills
                    </h3>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      {job.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills tags */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                    Technologies & Proficiencies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                      Employee Benefits & Perks
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {job.benefits.map((b, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 text-xs text-slate-700 dark:bg-slate-800/60 dark:text-slate-300"
                        >
                          <Award className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right 4 Cols: Company Card & Meta */}
            <div className="lg:col-span-4 space-y-6">
              {/* About Company Widget */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                  About the Company
                </h3>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-1.5 dark:border-slate-700 dark:bg-slate-800 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="h-full w-full object-contain rounded-lg"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {job.companyName}
                    </h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Engineering Hub
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location</span>
                    <span className="font-medium text-slate-900 dark:text-white">{job.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Application Deadline</span>
                    <span className="font-medium text-slate-900 dark:text-white">{job.deadline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Applicants</span>
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">{job.applicantsCount} applied</span>
                  </div>
                </div>

                <Link
                  href="/companies"
                  className="mt-5 flex w-full items-center justify-center rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  View Company Profile
                </Link>
              </div>

              {/* Related Jobs */}
              {relatedJobs.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Similar Tech Roles
                  </h3>
                  {relatedJobs.map((rj) => (
                    <JobCard key={rj.id} job={rj} compact />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <ApplyModal
        job={job}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />

      <Footer />
    </div>
  );
}

