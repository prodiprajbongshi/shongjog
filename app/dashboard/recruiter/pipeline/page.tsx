"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { RelativeTime } from "@/components/ui/RelativeTime";
import { useAppStore } from "@/stores/useAppStore";
import type { ApplicationStatus } from "@/types";
import {
  Search,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";

export default function HiringPipelinePage() {
  const { applications, updateApplicationStatus } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const stages = [
    {
      id: "applied",
      label: "New applications",
      tone: "border-blue-200 bg-blue-50/70 dark:border-blue-900/70 dark:bg-blue-950/20",
      card: "border-blue-100 bg-blue-50/80 hover:border-blue-200 dark:border-blue-900/60 dark:bg-slate-800 dark:hover:border-blue-800",
      count: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    },
    {
      id: "screening",
      label: "Screening",
      tone: "border-indigo-200 bg-indigo-50/70 dark:border-indigo-900/70 dark:bg-indigo-950/20",
      card: "border-indigo-100 bg-indigo-50/80 hover:border-indigo-200 dark:border-indigo-900/60 dark:bg-slate-800 dark:hover:border-indigo-800",
      count: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
    },
    {
      id: "shortlisted",
      label: "Shortlisted",
      tone: "border-violet-200 bg-violet-50/70 dark:border-violet-900/70 dark:bg-violet-950/20",
      card: "border-violet-100 bg-violet-50/80 hover:border-violet-200 dark:border-violet-900/60 dark:bg-slate-800 dark:hover:border-violet-800",
      count: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    },
    {
      id: "interview",
      label: "Interview",
      tone: "border-amber-200 bg-amber-50/70 dark:border-amber-900/70 dark:bg-amber-950/20",
      card: "border-amber-100 bg-amber-50/80 hover:border-amber-200 dark:border-amber-900/60 dark:bg-slate-800 dark:hover:border-amber-800",
      count: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    },
    {
      id: "offer",
      label: "Offer",
      tone: "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/70 dark:bg-emerald-950/20",
      card: "border-emerald-100 bg-emerald-50/80 hover:border-emerald-200 dark:border-emerald-900/60 dark:bg-slate-800 dark:hover:border-emerald-800",
      count: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    },
    {
      id: "hired",
      label: "Hired",
      tone: "border-teal-200 bg-teal-50/70 dark:border-teal-900/70 dark:bg-teal-950/20",
      card: "border-teal-100 bg-teal-50/80 hover:border-teal-200 dark:border-teal-900/60 dark:bg-slate-800 dark:hover:border-teal-800",
      count: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
    },
  ] as const;

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredApps = applications.filter(
    (app) =>
      app.seekerName.toLowerCase().includes(normalizedSearch) ||
      app.jobTitle.toLowerCase().includes(normalizedSearch) ||
      app.seekerSkills.some((skill) => skill.toLowerCase().includes(normalizedSearch))
  );

  const moveCandidate = (appId: string, currentStatus: ApplicationStatus, direction: "next" | "prev") => {
    const stageIds: ApplicationStatus[] = ["applied", "screening", "shortlisted", "interview", "offer", "hired"];
    const currentIndex = stageIds.indexOf(currentStatus);
    if (currentIndex === -1) return;

    const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < stageIds.length) {
      const newStatus = stageIds[nextIndex];
      updateApplicationStatus(appId, newStatus, `Advanced on Kanban pipeline to ${newStatus}`);
      toast.success(`Candidate shifted to ${newStatus.toUpperCase()}`);
    }
  };

  const handleDragStart = (e: React.DragEvent, appId: string) => {
    e.dataTransfer.setData("text/plain", appId);
    setDraggingId(appId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: ApplicationStatus) => {
    e.preventDefault();
    const appId = e.dataTransfer.getData("text/plain") || draggingId;
    if (appId) {
      updateApplicationStatus(appId, targetStatus, `Dragged to ${targetStatus}`);
      toast.success(`Candidate moved to ${targetStatus.toUpperCase()}`);
    }
    setDraggingId(null);
  };

  const totalInPipeline = filteredApps.filter((app) => app.status !== "rejected").length;

  return (
    <DashboardLayout
      role="recruiter"
      title="Your hiring pipeline"
      subtitle="Keep track of every candidate, from their first application to the final decision."
    >
      <div className="mb-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="search"
            aria-label="Search candidates, jobs, or skills"
            placeholder="Search people, jobs, or skills"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:bg-slate-900 dark:focus:ring-violet-950"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end">
          <p className="text-sm text-slate-600 dark:text-slate-300" aria-live="polite">
            <span className="font-semibold text-slate-900 dark:text-white">{totalInPipeline}</span>{" "}
            {totalInPipeline === 1 ? "candidate" : "candidates"} in progress
          </p>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Drag a card or use its arrows to move it
          </span>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6">
        {stages.map((stage) => {
          const stageApps = filteredApps.filter((a) => a.status === stage.id);

          return (
            <div
              key={stage.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id as ApplicationStatus)}
              className={`w-72 shrink-0 rounded-xl border p-3 ${stage.tone}`}
            >
              <div className="flex items-center justify-between px-1 pb-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {stage.label}
                  </h4>
                  <span className={`flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${stage.count}`}>
                    {stageApps.length}
                  </span>
                </div>
              </div>

              <div className="min-h-[450px] space-y-3">
                {stageApps.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-white/80 bg-white/40 px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/30 dark:text-slate-400">
                    {normalizedSearch
                      ? "No matches in this stage"
                      : "No candidates here yet"}
                  </div>
                ) : (
                  stageApps.map((app) => (
                    <div
                      key={app.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, app.id)}
                      onDragEnd={() => setDraggingId(null)}
                      className={`group cursor-grab rounded-xl border p-4 shadow-sm transition-all active:cursor-grabbing ${
                        stage.card
                      } ${
                        draggingId === app.id
                          ? "scale-[0.98] opacity-50"
                          : "hover:-translate-y-0.5 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={app.seekerAvatar}
                            alt={app.seekerName}
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-white/80 dark:ring-slate-700"
                          />
                          <div className="min-w-0">
                            <h5 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                              {app.seekerName}
                            </h5>
                            <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                              {app.seekerTitle || app.seekerLocation}
                            </p>
                          </div>
                        </div>

                        <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-xs font-medium text-violet-700 dark:bg-slate-900/70 dark:text-violet-300">
                          <Sparkles className="h-3 w-3" /> {app.matchScore}% match
                        </span>
                      </div>

                      <p className="mt-3 line-clamp-2 text-sm font-medium leading-snug text-slate-800 dark:text-slate-200">
                        {app.jobTitle}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {app.seekerSkills.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-900/60 dark:text-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-slate-200/70 pt-3 text-xs text-slate-500 dark:border-slate-700">
                        <span>
                          Applied <RelativeTime dateString={app.appliedAt} />
                        </span>

                        <div className="flex items-center gap-1">
                          {stage.id !== "applied" && (
                            <button
                              onClick={() => moveCandidate(app.id, app.status, "prev")}
                              aria-label={`Move ${app.seekerName} back a stage`}
                              className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-white/80 hover:text-slate-900 dark:hover:bg-slate-900/70 dark:hover:text-white"
                              title="Move back a stage"
                            >
                              <ChevronLeft className="h-3 w-3" />
                            </button>
                          )}
                          {stage.id !== "hired" && (
                            <button
                              onClick={() => moveCandidate(app.id, app.status, "next")}
                              aria-label={`Move ${app.seekerName} to the next stage`}
                              className="rounded-md p-1.5 text-violet-700 transition-colors hover:bg-white/80 dark:text-violet-300 dark:hover:bg-slate-900/70"
                              title="Move to next stage"
                            >
                              <ChevronRight className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
