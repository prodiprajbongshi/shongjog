"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Modal } from "@/components/ui/Modal";
import { useAppStore } from "@/stores/useAppStore";
import { Interview, InterviewType } from "@/types";
import {
  Calendar,
  Clock,
  Video,
  User,
  Plus,
  CheckCircle2,
  XCircle,
  FileText,
  Star,
} from "lucide-react";
import { toast } from "sonner";

export default function RecruiterInterviewsPage() {
  const { interviews, updateInterview, scheduleInterview, applications, currentUser } =
    useAppStore();

  const [activeTab, setActiveTab] = useState<"scheduled" | "completed">("scheduled");
  const [feedbackModalInterview, setFeedbackModalInterview] = useState<Interview | null>(null);
  const [feedbackScore, setFeedbackScore] = useState(5);
  const [feedbackComments, setFeedbackComments] = useState("Candidate demonstrated strong problem-solving capabilities.");

  const filteredInterviews = interviews.filter((i) =>
    activeTab === "scheduled" ? i.status === "scheduled" : i.status !== "scheduled"
  );

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackModalInterview) return;

    updateInterview(feedbackModalInterview.id, {
      status: "completed",
      feedbackScore,
      feedbackComments,
    });

    toast.success("Interview marked completed & evaluation saved!");
    setFeedbackModalInterview(null);
  };

  return (
    <DashboardLayout
      role="recruiter"
      title="Interview Management"
      subtitle="Schedule technical screens, manage calendars, and submit post-interview candidate feedback."
    >
      <div className="flex items-center gap-2 border-b border-slate-200 pb-4 dark:border-slate-800 mb-6">
        <button
          onClick={() => setActiveTab("scheduled")}
          className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
            activeTab === "scheduled"
              ? "bg-violet-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          }`}
        >
          Scheduled Calls ({interviews.filter((i) => i.status === "scheduled").length})
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
            activeTab === "completed"
              ? "bg-violet-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          }`}
        >
          Completed & Feedback ({interviews.filter((i) => i.status !== "scheduled").length})
        </button>
      </div>

      <div className="space-y-4 max-w-4xl">
        {filteredInterviews.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <Calendar className="h-10 w-10 text-slate-300 mx-auto" />
            <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
              No {activeTab} interviews
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Schedule technical or HR rounds directly from your applicant directory.
            </p>
          </div>
        ) : (
          filteredInterviews.map((intv) => (
            <div
              key={intv.id}
              className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={intv.candidateAvatar}
                    alt={intv.candidateName}
                    className="h-11 w-11 rounded-full object-cover shrink-0 ring-2 ring-violet-500/20"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-violet-50 px-2 py-0.5 text-[10px] font-bold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 capitalize">
                        {intv.type} Round
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {intv.candidateEmail}
                      </span>
                    </div>
                    <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                      {intv.candidateName} • {intv.jobTitle}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" /> {intv.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-400" /> {intv.time} ({intv.durationMinutes} mins)
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-slate-400" /> Interviewer: {intv.interviewerName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:self-center">
                  <a
                    href={intv.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Video className="h-3.5 w-3.5 text-violet-600" />
                    <span>Video Room</span>
                  </a>

                  {intv.status === "scheduled" && (
                    <button
                      onClick={() => setFeedbackModalInterview(intv)}
                      className="rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-violet-700"
                    >
                      Log Feedback
                    </button>
                  )}
                </div>
              </div>

              {intv.notes && (
                <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">
                    Pre-Interview Notes:
                  </span>
                  {intv.notes}
                </div>
              )}

              {intv.feedbackComments && (
                <div className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 text-xs text-emerald-900 dark:border-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold">Interviewer Assessment</span>
                    <span className="flex items-center gap-1 font-bold text-amber-600">
                      <Star className="h-3.5 w-3.5 fill-amber-500" /> {intv.feedbackScore} / 5
                    </span>
                  </div>
                  <p>"{intv.feedbackComments}"</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Log Feedback Modal */}
      <Modal
        isOpen={!!feedbackModalInterview}
        onClose={() => setFeedbackModalInterview(null)}
        title={
          feedbackModalInterview && (
            <span>Post-Interview Evaluation: {feedbackModalInterview.candidateName}</span>
          )
        }
      >
        <form onSubmit={handleFeedbackSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Rating Score (1 to 5)
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setFeedbackScore(num)}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold text-xs transition ${
                    feedbackScore === num
                      ? "bg-violet-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {num} ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Assessment Comments & Recommendation
            </label>
            <textarea
              rows={4}
              required
              value={feedbackComments}
              onChange={(e) => setFeedbackComments(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setFeedbackModalInterview(null)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-violet-700"
            >
              Save Feedback & Complete Round
            </button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

