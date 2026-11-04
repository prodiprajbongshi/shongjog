"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAppStore } from "@/stores/useAppStore";
import {
  Calendar,
  Clock,
  Video,
  User,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function SeekerInterviewsPage() {
  const { interviews } = useAppStore();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const upcoming = interviews.filter((i) => i.status === "scheduled");
  const past = interviews.filter((i) => i.status !== "scheduled");

  const displayed = activeTab === "upcoming" ? upcoming : past;

  return (
    <DashboardLayout
      role="job_seeker"
      title="Interview Schedule"
      subtitle="Upcoming technical rounds, system design discussions, and cultural interviews."
    >
      <div className="flex items-center gap-2 border-b border-slate-200 pb-4 dark:border-slate-800 mb-6">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
            activeTab === "upcoming"
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          }`}
        >
          Upcoming Rounds ({upcoming.length})
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
            activeTab === "past"
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          }`}
        >
          Completed & Feedback ({past.length})
        </button>
      </div>

      <div className="space-y-4 max-w-4xl">
        {displayed.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <Calendar className="h-10 w-10 text-slate-300 mx-auto" />
            <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
              No {activeTab} interviews
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              When recruiters shortlist your profile, scheduled technical sessions will appear here.
            </p>
          </div>
        ) : (
          displayed.map((intv) => (
            <div
              key={intv.id}
              className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 capitalize">
                      {intv.type} Interview
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {intv.companyName}
                    </span>
                  </div>
                  <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                    {intv.jobTitle}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" /> {intv.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" /> {intv.time} ({intv.durationMinutes} mins)
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-slate-400" /> {intv.interviewerName} ({intv.interviewerRole})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:self-center">
                  {intv.status === "scheduled" ? (
                    <a
                      href={intv.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700"
                    >
                      <Video className="h-4 w-4" />
                      <span>Join Meeting</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                    </span>
                  )}
                </div>
              </div>

              {intv.notes && (
                <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-800/60 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">
                    Preparation Instructions:
                  </span>
                  {intv.notes}
                </div>
              )}

              {intv.feedbackComments && (
                <div className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 text-xs text-emerald-900 dark:border-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-200">
                  <span className="font-semibold block mb-0.5">
                    Interviewer Feedback (Score: {intv.feedbackScore}/5):
                  </span>
                  "{intv.feedbackComments}"
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

