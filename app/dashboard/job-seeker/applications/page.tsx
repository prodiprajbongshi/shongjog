"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Modal } from "@/components/ui/Modal";
import { RelativeTime } from "@/components/ui/RelativeTime";
import { useAppStore } from "@/stores/useAppStore";
import { Application } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Search,
  ChevronRight,
  MapPin,
  DollarSign,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Clock,
  Layers,
  Star,
  ArrowUpRight,
} from "lucide-react";

// Tab definitions — "rejected" shows as "Archived" in the UI
const STATUSES: { value: string; label: string }[] = [
  { value: "all",         label: "All"         },
  { value: "applied",     label: "Applied"     },
  { value: "screening",   label: "Screening"   },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interview",   label: "Interview"   },
  { value: "offer",       label: "Offer"       },
  { value: "hired",       label: "Hired"       },
  { value: "rejected",    label: "Archived"    },
];

// Left border colour per status — gives each card a subtle identity at a glance
const STATUS_BORDER: Record<string, string> = {
  applied:     "border-l-blue-400",
  screening:   "border-l-indigo-400",
  shortlisted: "border-l-purple-400",
  interview:   "border-l-amber-400",
  offer:       "border-l-emerald-500",
  hired:       "border-l-teal-500",
  rejected:    "border-l-slate-300",
};

// Gradient chip behind the top-of-card match score
const STATUS_SCORE_STYLE: Record<string, string> = {
  applied:     "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  screening:   "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300",
  shortlisted: "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300",
  interview:   "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  offer:       "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  hired:       "bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300",
  rejected:    "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
};

// The ordered pipeline stages shown as a mini stepper inside the card
const PIPELINE_STAGES = ["applied", "screening", "shortlisted", "interview", "offer", "hired"];

function PipelineStepper({ currentStatus }: { currentStatus: string }) {
  const currentIdx = PIPELINE_STAGES.indexOf(currentStatus);
  const isRejected = currentStatus === "rejected";

  return (
    <div className="mt-3 flex items-center gap-0.5">
      {PIPELINE_STAGES.map((stage, i) => {
        const done   = !isRejected && i <= currentIdx;
        const active = !isRejected && i === currentIdx;

        return (
          <React.Fragment key={stage}>
            <div
              title={stage.charAt(0).toUpperCase() + stage.slice(1)}
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold transition",
                done && !active
                  ? "border-indigo-500 bg-indigo-500 text-white"
                  : active
                  ? "border-indigo-600 bg-indigo-600 text-white ring-2 ring-indigo-100 dark:ring-indigo-900"
                  : isRejected
                  ? "border-slate-200 bg-slate-100 text-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-600"
                  : "border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500"
              )}
            >
              {done && !active ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            {i < PIPELINE_STAGES.length - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1 rounded-full",
                  done && !active
                    ? "bg-indigo-400"
                    : "bg-slate-200 dark:bg-slate-700"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// Summary strip — four quick numbers shown above the list
function SummaryStrip({ applications }: { applications: Application[] }) {
  const active      = applications.filter((a) => !["rejected", "hired"].includes(a.status)).length;
  const inReview    = applications.filter((a) => ["screening", "shortlisted"].includes(a.status)).length;
  const interviews  = applications.filter((a) => a.status === "interview").length;
  const offers      = applications.filter((a) => ["offer", "hired"].includes(a.status)).length;

  const stats = [
    { label: "Total",      value: applications.length, icon: Layers,    color: "text-slate-600 dark:text-slate-300" },
    { label: "Active",     value: active,              icon: Clock,     color: "text-indigo-600 dark:text-indigo-400" },
    { label: "Interviews", value: interviews,           icon: Calendar,  color: "text-amber-600 dark:text-amber-400" },
    { label: "Offers",     value: offers,               icon: Star,      color: "text-emerald-600 dark:text-emerald-400" },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 dark:border-slate-800 dark:bg-slate-900"
        >
          <span className={cn("shrink-0", color)}>
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <p className="text-lg font-black leading-none text-slate-900 dark:text-white">{value}</p>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ApplicationsPage() {
  const { applications } = useAppStore();

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch]             = useState("");
  const [selectedApp, setSelectedApp]   = useState<Application | null>(null);

  const filteredApps = applications.filter((app) => {
    const matchStatus = filterStatus === "all" || app.status === filterStatus;
    const matchSearch =
      app.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      app.companyName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Per-tab count so users can see at a glance how full each bucket is
  const countFor = (status: string) =>
    status === "all"
      ? applications.length
      : applications.filter((a) => a.status === status).length;

  return (
    <DashboardLayout
      role="job_seeker"
      title="Application Tracker"
      subtitle="Every submission, stage change, and offer — all in one place."
      actions={
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 dark:shadow-none"
        >
          <Search className="h-3.5 w-3.5" />
          Find more jobs
        </Link>
      }
    >
      {/* Quick summary numbers */}
      <SummaryStrip applications={applications} />

      {/* Filter tabs + search row */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {STATUSES.map((s) => {
            const count    = countFor(s.value);
            const isActive = filterStatus === s.value;
            return (
              <button
                key={s.value}
                onClick={() => setFilterStatus(s.value)}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition",
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                )}
              >
                {s.label}
                {count > 0 && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-56">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search role or company…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Results count */}
      {filteredApps.length > 0 && (
        <p className="mb-3 text-[11px] font-medium text-slate-400 dark:text-slate-500">
          Showing {filteredApps.length} application{filteredApps.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Application cards */}
      <div className="space-y-3">
        {filteredApps.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
              <Briefcase className="h-6 w-6 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-200">
              Nothing here
            </p>
            <p className="mt-1 max-w-[260px] text-xs text-slate-500 dark:text-slate-400">
              {search
                ? `No results for "${search}". Clear your search or try a different filter.`
                : "Start applying to jobs and they'll all show up here with live status updates."}
            </p>
            <Link
              href="/jobs"
              className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              Browse jobs <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          filteredApps.map((app) => (
            <div
              key={app.id}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-slate-200/80 border-l-4 bg-white transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900",
                STATUS_BORDER[app.status] ?? "border-l-slate-300"
              )}
            >
              <div className="p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                  {/* Company logo + job info */}
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={app.companyLogo}
                        alt={app.companyName}
                        className="h-full w-full rounded-lg object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {app.companyName}
                      </p>
                      <h3 className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
                        {app.jobTitle}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {app.jobLocation}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3 shrink-0" />
                          {formatCurrency(app.salaryMin)} – {formatCurrency(app.salaryMax)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 shrink-0" />
                          Applied <RelativeTime dateString={app.appliedAt} />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status badge + timeline button */}
                  <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
                    <StatusBadge status={app.status} size="md" />
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      View timeline <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Inline pipeline stepper — skipped for rejected apps */}
                {app.status !== "rejected" && (
                  <PipelineStepper currentStatus={app.status} />
                )}
              </div>

              {/* Match score chip — top-right corner */}
              {app.matchScore !== undefined && (
                <span
                  className={cn(
                    "absolute right-4 top-4 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold",
                    STATUS_SCORE_STYLE[app.status] ?? "bg-slate-100 text-slate-500"
                  )}
                >
                  <TrendingUp className="h-2.5 w-2.5" />
                  {app.matchScore}% match
                </span>
              )}
            </div>
          ))
        )}
      </div>

      {/* Timeline detail modal */}
      <Modal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        title={
          selectedApp && (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-1 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedApp.companyLogo}
                  alt={selectedApp.companyName}
                  className="h-full w-full rounded-lg object-contain"
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {selectedApp.jobTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedApp.companyName}
                </p>
              </div>
            </div>
          )
        }
      >
        {selectedApp && (
          <div className="space-y-5 pt-1">

            {/* Status + match score snapshot */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Current status
                </p>
                <div className="mt-2">
                  <StatusBadge status={selectedApp.status} size="md" />
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Match score
                </p>
                <p className="mt-1 text-3xl font-black leading-none text-indigo-600 dark:text-indigo-400">
                  {selectedApp.matchScore}
                  <span className="text-sm font-semibold text-slate-400">%</span>
                </p>
              </div>
            </div>

            {/* Job meta row */}
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                {selectedApp.jobLocation}
              </span>
              <span className="text-slate-200 dark:text-slate-700">|</span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                {formatCurrency(selectedApp.salaryMin)} – {formatCurrency(selectedApp.salaryMax)}
              </span>
              <span className="text-slate-200 dark:text-slate-700">|</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                Applied <RelativeTime dateString={selectedApp.appliedAt} />
              </span>
            </div>

            {/* Full pipeline stepper inside the modal */}
            {selectedApp.status !== "rejected" && (
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Pipeline progress
                </p>
                <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <PipelineStepper currentStatus={selectedApp.status} />
                  <div className="mt-2 flex justify-between px-0.5">
                    {PIPELINE_STAGES.map((s) => (
                      <span key={s} className="text-[9px] font-medium capitalize text-slate-400 dark:text-slate-500">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Application history timeline */}
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Activity log
              </p>
              <div className="relative space-y-4 pl-6 before:absolute before:bottom-2 before:left-2.5 before:top-2 before:w-px before:bg-slate-200 dark:before:bg-slate-800">
                {selectedApp.timeline.map((event, idx) => (
                  <div key={idx} className="relative">
                    {/* Timeline dot */}
                    <span className="absolute -left-[22px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-white bg-indigo-500 dark:border-slate-900" />
                    <div className="rounded-xl border border-slate-100 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {event.title}
                        </span>
                        <span className="shrink-0 font-mono text-[10px] text-slate-400">
                          {event.date}
                        </span>
                      </div>
                      {event.note && (
                        <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                          {event.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter note — only shown when available */}
            {selectedApp.recruiterNotes && (
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/30">
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Hiring team note
                </p>
                <p className="text-xs leading-relaxed text-indigo-900 dark:text-indigo-200">
                  &ldquo;{selectedApp.recruiterNotes}&rdquo;
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
