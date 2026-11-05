"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { RelativeTime } from "@/components/ui/RelativeTime";
import { useAppStore } from "@/stores/useAppStore";
import { PIPELINE_STAGES } from "@/lib/constants";
import { Application, ApplicationStatus } from "@/types";
import { formatCurrency } from "@/lib/utils";
import {
  GitPullRequest,
  Search,
  Plus,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Calendar,
  MessageSquare,
  MoreVertical,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function HiringPipelinePage() {
  const { applications, updateApplicationStatus } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const stages = [
    { id: "applied", label: "Applied", color: "border-t-blue-500" },
    { id: "screening", label: "Screening", color: "border-t-indigo-500" },
    { id: "shortlisted", label: "Shortlisted", color: "border-t-purple-500" },
    { id: "interview", label: "Interview", color: "border-t-amber-500" },
    { id: "offer", label: "Offer", color: "border-t-emerald-500" },
    { id: "hired", label: "Hired 🎉", color: "border-t-teal-500" },
  ] as const;

  const filteredApps = applications.filter(
    (app) =>
      app.seekerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <DashboardLayout
      role="recruiter"
      title="Hiring Pipeline Kanban"
      subtitle="Visual drag-and-drop ATS pipeline. Move candidates through screening, interview rounds, and offers."
    >
      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidates or jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Tip: You can drag cards between columns or use the &lt; &gt; arrow buttons.
        </p>
      </div>

      {/* Kanban Columns (Horizontal Scroll) */}
      <div className="flex gap-4 overflow-x-auto pb-6">
        {stages.map((stage) => {
          const stageApps = filteredApps.filter((a) => a.status === stage.id);

          return (
            <div
              key={stage.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id as ApplicationStatus)}
              className={`w-72 shrink-0 rounded-3xl border border-slate-200/80 bg-slate-100/60 p-3.5 dark:border-slate-800 dark:bg-slate-900/60 border-t-4 ${stage.color}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 px-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {stage.label}
                  </h4>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-700 shadow-xs dark:bg-slate-800 dark:text-slate-300">
                    {stageApps.length}
                  </span>
                </div>
              </div>

              {/* Cards inside column */}
              <div className="space-y-3 min-h-[450px]">
                {stageApps.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200/80 p-6 text-center text-xs text-slate-400 dark:border-slate-800">
                    Drop candidates here
                  </div>
                ) : (
                  stageApps.map((app) => (
                    <div
                      key={app.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, app.id)}
                      className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition hover:border-violet-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-850 cursor-grab active:cursor-grabbing"
                    >
                      {/* Candidate Avatar & Name */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={app.seekerAvatar}
                            alt={app.seekerName}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <div>
                            <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                              {app.seekerName}
                            </h5>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">
                              {app.seekerLocation}
                            </p>
                          </div>
                        </div>

                        <span className="flex items-center gap-1 rounded bg-violet-50 px-1.5 py-0.5 text-[10px] font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                          <Sparkles className="h-2.5 w-2.5" /> {app.matchScore}%
                        </span>
                      </div>

                      {/* Position Title */}
                      <p className="mt-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                        {app.jobTitle}
                      </p>

                      {/* Top Skills chips */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {app.seekerSkills.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Footer: Date & Advance Arrows */}
                      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-400 dark:border-slate-800">
                        <RelativeTime dateString={app.appliedAt} />

                        <div className="flex items-center gap-1">
                          {stage.id !== "applied" && (
                            <button
                              onClick={() => moveCandidate(app.id, app.status, "prev")}
                              className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                              title="Move back"
                            >
                              <ChevronLeft className="h-3 w-3" />
                            </button>
                          )}
                          {stage.id !== "hired" && (
                            <button
                              onClick={() => moveCandidate(app.id, app.status, "next")}
                              className="rounded p-1 text-violet-600 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-950/60"
                              title="Advance to next stage"
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
