"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Modal } from "@/components/ui/Modal";
import { useAppStore } from "@/stores/useAppStore";
import type { Interview } from "@/types";
import {
  Calendar,
  Clock,
  Video,
  UserRound,
  Star,
} from "lucide-react";
import { toast } from "sonner";

export default function RecruiterInterviewsPage() {
  const { interviews, updateInterview } = useAppStore();

  const [activeTab, setActiveTab] = useState<"scheduled" | "completed">("scheduled");
  const [feedbackModalInterview, setFeedbackModalInterview] = useState<Interview | null>(null);
  const [feedbackScore, setFeedbackScore] = useState(5);
  const [feedbackComments, setFeedbackComments] = useState("");

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
      title="Your interviews"
      subtitle="See what’s coming up, meet your candidates, and keep notes after each conversation."
    >
      <div className="mb-6 flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-white p-1.5 dark:border-slate-800 dark:bg-slate-900">
        <button
          onClick={() => setActiveTab("scheduled")}
          aria-pressed={activeTab === "scheduled"}
          className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === "scheduled"
              ? "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300"
              : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
          }`}
        >
          Coming up <span className="ml-1 text-xs opacity-70">({interviews.filter((i) => i.status === "scheduled").length})</span>
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          aria-pressed={activeTab === "completed"}
          className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === "completed"
              ? "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300"
              : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
          }`}
        >
          Past interviews <span className="ml-1 text-xs opacity-70">({interviews.filter((i) => i.status !== "scheduled").length})</span>
        </button>
      </div>

      <div className="max-w-4xl space-y-4">
        {filteredInterviews.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
              <Calendar className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
              {activeTab === "scheduled" ? "Nothing on the calendar just yet" : "No past interviews to look back on"}
            </h3>
            <p className="mx-auto mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
              {activeTab === "scheduled"
                ? "When you schedule a conversation from an applicant’s profile, it’ll show up here."
                : "Once you’ve completed an interview and added your notes, you’ll find it here."}
            </p>
          </div>
        ) : (
          filteredInterviews.map((intv) => (
            <div
              key={intv.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
            >
              <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                <div className="flex min-w-0 items-start gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={intv.candidateAvatar}
                    alt={intv.candidateName}
                    className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 capitalize">
                        {intv.type} conversation
                      </span>
                      {intv.status !== "scheduled" && (
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                          Completed
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-900 dark:text-white">
                      {intv.candidateName}
                    </h3>
                    <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
                      {intv.jobTitle}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {intv.candidateEmail}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-slate-400" /> {intv.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-slate-400" /> {intv.time} · {intv.durationMinutes} min
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <UserRound className="h-4 w-4 text-slate-400" /> With {intv.interviewerName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2 sm:pt-1">
                  <a
                    href={intv.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <Video className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                    <span>Join call</span>
                  </a>

                  {intv.status === "scheduled" && (
                    <button
                      onClick={() => setFeedbackModalInterview(intv)}
                      className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
                    >
                      Add feedback
                    </button>
                  )}
                </div>
              </div>

              {intv.notes && (
                <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/30 sm:px-6">
                  <p className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                    A note for the conversation
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{intv.notes}</p>
                </div>
              )}

              {intv.feedbackComments && (
                <div className="border-t border-emerald-100 bg-emerald-50/50 px-5 py-4 text-sm text-emerald-950 dark:border-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-200 sm:px-6">
                  <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-medium">Your interview notes</span>
                    <span className="flex items-center gap-1 font-medium text-amber-700 dark:text-amber-300">
                      <Star className="h-3.5 w-3.5 fill-amber-500" /> {intv.feedbackScore} / 5
                    </span>
                  </div>
                  <p className="leading-relaxed">{intv.feedbackComments}</p>
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
            <span>How did your conversation with {feedbackModalInterview.candidateName} go?</span>
          )
        }
      >
        <form onSubmit={handleFeedbackSubmit} className="space-y-4 pt-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Your overall impression
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setFeedbackScore(num)}
                  aria-label={`Rate ${num} out of 5`}
                  aria-pressed={feedbackScore === num}
                  className={`flex h-11 w-11 items-center justify-center gap-1 rounded-lg text-sm font-medium transition-colors ${
                    feedbackScore === num
                      ? "bg-amber-100 text-amber-800 ring-1 ring-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:ring-amber-800"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  {num} <Star className={`h-3.5 w-3.5 ${feedbackScore === num ? "fill-current" : ""}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              What stood out? Add notes for your team.
            </label>
            <textarea
              rows={4}
              required
              value={feedbackComments}
              onChange={(e) => setFeedbackComments(e.target.value)}
              placeholder="Share strengths, questions, or anything to follow up on."
              className="w-full rounded-lg border border-slate-200 bg-white p-3.5 text-sm leading-relaxed text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
            />
          </div>

          <div className="flex flex-col-reverse justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-row">
            <button
              type="button"
              onClick={() => setFeedbackModalInterview(null)}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
            >
              Save notes and mark complete
            </button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
