"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Modal } from "@/components/ui/Modal";
import { useAppStore } from "@/stores/useAppStore";
import { Application, ApplicationStatus } from "@/types";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import {
  Briefcase,
  Search,
  Clock,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Building2,
  Calendar,
  CheckCircle2,
  Info,
} from "lucide-react";

export default function ApplicationsPage() {
  const { applications } = useAppStore();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const statuses: { value: string; label: string }[] = [
    { value: "all", label: "All Applications" },
    { value: "applied", label: "Applied" },
    { value: "screening", label: "Screening" },
    { value: "shortlisted", label: "Shortlisted" },
    { value: "interview", label: "Interview" },
    { value: "offer", label: "Offer Extended" },
    { value: "hired", label: "Hired" },
    { value: "rejected", label: "Archived" },
  ];

  const filteredApps = applications.filter((app) => {
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      app.companyName.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <DashboardLayout
      role="job_seeker"
      title="Application Tracker"
      subtitle="Track your submission lifecycle, interview stages, and offers with full transparency."
    >
      {/* Search & Tabs */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
            {statuses.map((s) => (
              <button
                key={s.value}
                onClick={() => setFilterStatus(s.value)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  filterStatus === s.value
                    ? "bg-white text-indigo-600 shadow-xs dark:bg-slate-900 dark:text-indigo-400"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Quick search input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search applications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApps.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <Briefcase className="h-10 w-10 text-slate-300 mx-auto" />
            <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
              No applications match this filter
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Browse the job board and apply to roles matching your skillset.
            </p>
            <Link
              href="/jobs"
              className="mt-4 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs"
            >
              Explore Tech Jobs
            </Link>
          </div>
        ) : (
          filteredApps.map((app) => (
            <div
              key={app.id}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-1.5 dark:border-slate-700 dark:bg-slate-800 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={app.companyLogo}
                      alt={app.companyName}
                      className="h-full w-full object-contain rounded-lg"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {app.companyName}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {app.jobTitle}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span>{app.jobLocation}</span>
                      <span>•</span>
                      <span>
                        {formatCurrency(app.salaryMin)} - {formatCurrency(app.salaryMax)}
                      </span>
                      <span>•</span>
                      <span>Applied {formatRelativeTime(app.appliedAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:self-center">
                  <StatusBadge status={app.status} size="md" />

                  <button
                    onClick={() => setSelectedApp(app)}
                    className="flex items-center gap-1 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
                  >
                    <span>View Timeline</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Application Timeline Modal */}
      <Modal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        title={
          selectedApp && (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedApp.companyLogo}
                  alt={selectedApp.companyName}
                  className="h-full w-full object-contain rounded-lg"
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
          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Current Status</span>
                <div className="mt-1">
                  <StatusBadge status={selectedApp.status} size="md" />
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400">AI Match Score</span>
                <p className="mt-1 text-sm font-black text-indigo-600 dark:text-indigo-400">
                  {selectedApp.matchScore}%
                </p>
              </div>
            </div>

            {/* Timeline Flow */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Application Progression History
              </h4>
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                {selectedApp.timeline.map((event, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-indigo-600 ring-2 ring-indigo-200 dark:ring-indigo-950" />
                    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-850">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {event.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {event.date}
                        </span>
                      </div>
                      {event.note && (
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                          {event.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter feedback notes */}
            {selectedApp.recruiterNotes && (
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 dark:border-indigo-950 dark:bg-indigo-950/40">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 block mb-1">
                  Hiring Team Note
                </span>
                <p className="text-xs text-indigo-950 dark:text-indigo-200">
                  "{selectedApp.recruiterNotes}"
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}

