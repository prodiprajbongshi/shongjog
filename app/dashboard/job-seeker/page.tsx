"use client";

import React from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { RelativeTime } from "@/components/ui/RelativeTime";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useAppStore } from "@/stores/useAppStore";
import {
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  Clock3,
  FileText,
  MapPin,
  Search,
  UserRound,
  TrendingUp,
  Zap,
  Star,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Target,
  Flame,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Month formatter reused across interview date displays
const monthFmt = new Intl.DateTimeFormat("en-US", { month: "short" });

// Map each application status to a color family for the pipeline funnel
const STATUS_COLORS: Record<string, string> = {
  applied: "bg-blue-500",
  screening: "bg-indigo-500",
  shortlisted: "bg-purple-500",
  interview: "bg-amber-500",
  offer: "bg-emerald-500",
  hired: "bg-teal-500",
  rejected: "bg-rose-400",
};

// A tiny gradient chip used behind metric icons
const METRIC_GRADIENTS = [
  "from-indigo-500 to-blue-500",
  "from-violet-500 to-purple-500",
  "from-amber-400 to-orange-500",
  "from-teal-400 to-emerald-500",
];

export default function JobSeekerDashboard() {
  const { applications, savedJobIds, interviews, seekerProfile, jobs } = useAppStore();

  // Break down applications into the states we care about for the overview
  const activeApplications = applications.filter((a) => a.status !== "rejected");
  const inProgressApplications = applications.filter((a) =>
    ["screening", "shortlisted", "interview"].includes(a.status)
  );
  const scheduledInterviews = interviews
    .filter((i) => i.status === "scheduled")
    .sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}`).getTime() -
        new Date(`${b.date}T${b.time}`).getTime()
    );

  // The four most recent applications to show in the main table
  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
    .slice(0, 4);

  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id)).slice(0, 3);

  // Profile completion clamped to a valid 0–100 range
  const profileCompletion = Math.min(100, Math.max(0, seekerProfile.profileCompletion));

  // Success rate — percentage of active applications out of total
  const successRate = applications.length > 0
    ? Math.round((activeApplications.length / applications.length) * 100)
    : 0;

  const metrics = [
    {
      label: "Total Applied",
      value: applications.length,
      detail: `${activeApplications.length} still active`,
      icon: BriefcaseBusiness,
      gradient: METRIC_GRADIENTS[0],
      trend: "+3 this week",
      trendUp: true,
    },
    {
      label: "In Review",
      value: inProgressApplications.length,
      detail: "Employers looking",
      icon: Clock3,
      gradient: METRIC_GRADIENTS[1],
      trend: "Being screened",
      trendUp: null,
    },
    {
      label: "Interviews",
      value: scheduledInterviews.length,
      detail: "Scheduled rounds",
      icon: CalendarDays,
      gradient: METRIC_GRADIENTS[2],
      trend: scheduledInterviews.length > 0 ? "Next up soon" : "Nothing yet",
      trendUp: scheduledInterviews.length > 0,
    },
    {
      label: "Saved Jobs",
      value: savedJobIds.length,
      detail: "Waiting for you",
      icon: Bookmark,
      gradient: METRIC_GRADIENTS[3],
      trend: "Revisit anytime",
      trendUp: null,
    },
  ];

  // Pipeline counts for the funnel visual — only stages we want to show
  const pipelineStages = [
    { label: "Applied", key: "applied", icon: FileText },
    { label: "Screening", key: "screening", icon: Search },
    { label: "Shortlisted", key: "shortlisted", icon: Star },
    { label: "Interview", key: "interview", icon: CalendarDays },
    { label: "Offer", key: "offer", icon: Trophy },
  ];
  const pipelineData = pipelineStages.map((s) => ({
    ...s,
    count: applications.filter((a) => a.status === s.key).length,
  }));
  const pipelineMax = Math.max(1, ...pipelineData.map((s) => s.count));

  return (
    <DashboardLayout
      role="job_seeker"
      title={`Hey, ${seekerProfile.fullName.split(" ")[0]} `}
      subtitle="Here's where your job search stands today."
      actions={
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 dark:shadow-none"
        >
          <Search className="h-4 w-4" />
          Browse Jobs
        </Link>
      }
    >

      {/* ── Stat Cards  */}
      <section
        aria-label="Job search overview"
        className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {metrics.map(({ label, value, detail, icon: Icon, gradient, trend, trendUp }) => (

          <div
            key={label}
            className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
          >
            {/* Icon */}
            <div
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
                gradient
              )}
            >
              <Icon className="h-5 w-5" />
            </div>

            {/* Information */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {label}
                </p>

                {trendUp !== null && (
                  <span
                    className={cn(
                      "flex shrink-0 items-center gap-1 text-[10px] font-semibold",
                      trendUp
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-500 dark:text-slate-400"
                    )}
                  >
                    {trendUp && <TrendingUp className="h-3 w-3" />}
                    {trend}
                  </span>
                )}
              </div>

              <p className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {value}
              </p>

              <p className="mt-0.5 truncate text-[11px] text-slate-400 dark:text-slate-500">
                {detail}
              </p>
            </div>
          </div>

        ))}
      </section>

      {/* ── Main two-column grid  */}
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-5">

        {/* Recent Applications — 3-of-5 columns */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white xl:col-span-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Recent Applications
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Your latest submissions and their current status
              </p>
            </div>
            <Link
              href="/dashboard/job-seeker/applications"
              className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-indigo-100 bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:border-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-400"
            >
              All <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {recentApplications.length === 0 ? (
            <div className="flex flex-col items-center px-5 py-14 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                <BriefcaseBusiness className="h-6 w-6 text-slate-400 dark:text-slate-500" />
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-200">
                No applications yet
              </p>
              <p className="mt-1 max-w-xs text-xs text-slate-500 dark:text-slate-400">
                Start applying and all your submissions will show up here — with live status updates.
              </p>
              <Link
                href="/jobs"
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                Find a role <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentApplications.map((application) => (
                <li
                  key={application.id}
                  className="flex flex-col gap-3 px-5 py-4 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between dark:hover:bg-slate-800/30"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {/* Company logo with a subtle border frame */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={application.companyLogo}
                        alt={`${application.companyName}`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {application.jobTitle}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                        {application.companyName}
                        <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
                        <RelativeTime dateString={application.appliedAt} />
                      </p>
                    </div>
                  </div>
                  <StatusBadge
                    status={application.status}
                    size="sm"
                    className="w-fit sm:ml-3"
                  />
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Upcoming Interviews — 2-of-5 columns */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white xl:col-span-2 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Upcoming Interviews
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Get ready for your next conversation
              </p>
            </div>
            <Link
              href="/dashboard/job-seeker/interviews"
              aria-label="View full interview schedule"
              className="rounded-xl border border-slate-200 p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {scheduledInterviews.length === 0 ? (
            <div className="flex flex-col items-center px-5 py-14 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                <CalendarDays className="h-6 w-6 text-slate-400 dark:text-slate-500" />
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-200">
                Calendar&apos;s clear for now
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Scheduled interviews will appear here once confirmed.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {scheduledInterviews.slice(0, 3).map((interview) => {
                const interviewDate = new Date(`${interview.date}T12:00:00`);
                return (
                  <li key={interview.id} className="px-5 py-4">
                    <div className="flex gap-3">
                      {/* Date block acting as a visual calendar chip */}
                      <div className="flex w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-indigo-50 py-2 text-center dark:bg-indigo-950/40">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
                          {monthFmt.format(interviewDate)}
                        </p>
                        <p className="mt-0.5 text-lg font-black leading-tight text-indigo-700 dark:text-indigo-300">
                          {interviewDate.getDate()}
                        </p>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                          {interview.jobTitle}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                          {interview.companyName}
                          <span className="mx-1 text-slate-300 dark:text-slate-600">·</span>
                          {interview.type} round
                        </p>
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                          <Clock3 className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                          {interview.time} · {interview.durationMinutes} min
                        </p>
                      </div>
                    </div>

                    {interview.meetingLink && (
                      <a
                        href={interview.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-14 mt-3 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
                      >
                        Join meeting <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      {/* ── Second row: Profile + Saved Jobs */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">

        {/* Profile completion card */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-sm">
                <UserRound className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Your Profile
                </h2>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  A complete profile gets noticed faster
                </p>
              </div>
            </div>
            {/* Completion percentage badge */}
            <span
              className={cn(
                "shrink-0 rounded-xl px-2.5 py-1 text-sm font-black tabular-nums",
                profileCompletion >= 80
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                  : profileCompletion >= 50
                    ? "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
                    : "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400"
              )}
            >
              {profileCompletion}%
            </span>
          </div>

          {/* Progress bar with coloured fill */}
          <div
            className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
            role="progressbar"
            aria-label="Profile completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={profileCompletion}
          >
            <div
              className={cn(
                "h-full rounded-full transition-[width] duration-700",
                profileCompletion >= 80
                  ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                  : profileCompletion >= 50
                    ? "bg-gradient-to-r from-amber-400 to-orange-500"
                    : "bg-gradient-to-r from-rose-400 to-pink-500"
              )}
              style={{ width: `${profileCompletion}%` }}
            />
          </div>

          {/* Quick health indicators below the bar */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              {
                label: "Bio",
                done: !!seekerProfile.bio,
              },
              {
                label: "Skills",
                done: seekerProfile.skills?.length > 0,
              },
              {
                label: "Resume",
                done: seekerProfile.resumeAtsScore !== undefined,
              },
            ].map(({ label, done }) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-medium",
                  done
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                )}
              >
                {done
                  ? <CheckCircle2 className="h-3 w-3 shrink-0" />
                  : <AlertCircle className="h-3 w-3 shrink-0" />
                }
                {label}
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            {seekerProfile.resumeAtsScore !== undefined && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ATS score{" "}
                <span className="font-bold text-slate-700 dark:text-slate-200">
                  {seekerProfile.resumeAtsScore}/100
                </span>
              </p>
            )}
            <Link
              href="/dashboard/job-seeker/profile"
              className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Update profile <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Saved jobs card */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Saved for Later
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Roles you bookmarked — don&apos;t forget to apply
              </p>
            </div>
            <Link
              href="/dashboard/job-seeker/saved-jobs"
              className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              View all <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {savedJobs.length === 0 ? (
            <div className="flex flex-col items-center px-5 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                <Bookmark className="h-5 w-5 text-slate-400 dark:text-slate-500" />
              </div>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Tap the bookmark icon on any job to save it here.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {savedJobs.map((job) => (
                <li key={job.id}>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="flex items-center justify-between gap-4 px-5 py-3.5 transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {job.title}
                      </span>
                      <span className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500 dark:text-slate-400">
                        {job.companyName}
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                        <MapPin className="h-3 w-3 shrink-0" />
                        {job.location}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* ── Application Pipeline Funnel  */}
      <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-sm">
              <BarChart3 className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Application Pipeline
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                How your applications are spread across stages
              </p>
            </div>
          </div>
          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
            {applications.length} total
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-end justify-between gap-2">
            {pipelineData.map(({ label, key, count }) => {
              const barHeight = pipelineMax > 0 ? Math.round((count / pipelineMax) * 100) : 0;
              return (
                <div key={key} className="flex flex-1 flex-col items-center gap-2">
                  {/* Bar with animated height using inline style */}
                  <div className="relative flex w-full justify-center">
                    <div
                      className="w-full max-w-[40px] overflow-hidden rounded-t-lg transition-all duration-700"
                      style={{ height: `${Math.max(barHeight, 4)}px`, minHeight: "4px" }}
                    >
                      <div
                        className={cn(
                          "h-full w-full rounded-t-lg",
                          STATUS_COLORS[key] || "bg-slate-300"
                        )}
                      />
                    </div>
                    {count > 0 && (
                      <span className="absolute -top-5 text-xs font-bold text-slate-700 dark:text-slate-200">
                        {count}
                      </span>
                    )}
                  </div>
                  <span className="text-center text-[10px] font-medium leading-tight text-slate-500 dark:text-slate-400">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Quick actions strip at the bottom  */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

        {/* Resume nudge */}
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
              <FileText className="h-4 w-4" />
            </span>
            <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Keep your resume fresh
            </p>
          </div>
          <Link
            href="/dashboard/job-seeker/resume"
            className="shrink-0 text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Review →
          </Link>
        </div>

        {/* Interview prep nudge */}
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-amber-100 bg-amber-50/50 px-5 py-4 dark:border-amber-900/40 dark:bg-amber-950/20">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <Zap className="h-4 w-4" />
            </span>
            <p className="text-xs font-medium text-amber-800 dark:text-amber-200">
              Practice interview questions
            </p>
          </div>
          <Link
            href="/dashboard/job-seeker/interview-prep"
            className="shrink-0 text-xs font-semibold text-amber-700 hover:underline dark:text-amber-400"
          >
            Prep now →
          </Link>
        </div>

        {/* Success rate chip */}
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 px-5 py-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <Flame className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-medium text-emerald-800 dark:text-emerald-200">
                Active rate
              </p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
                {successRate}% of your applications are live
              </p>
            </div>
          </div>
          <span className="shrink-0 text-sm font-black text-emerald-600 dark:text-emerald-400">
            {successRate}%
          </span>
        </div>
      </div>

    </DashboardLayout>
  );
}
