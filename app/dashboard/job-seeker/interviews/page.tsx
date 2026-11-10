"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAppStore } from "@/stores/useAppStore";
import type { Interview } from "@/types";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Video,
  UserRound,
} from "lucide-react";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

function getInterviewTimestamp(interview: Interview) {
  return new Date(`${interview.date}T${interview.time || "00:00"}`).getTime();
}

function formatInterviewDate(interview: Interview) {
  const date = new Date(`${interview.date}T12:00:00`);
  return Number.isNaN(date.getTime()) ? interview.date : dateFormatter.format(date);
}

function FeedbackStars({ score }: { score: number }) {
  const safeScore = Math.min(5, Math.max(0, Math.round(score)));

  return (
    <span
      className="text-sm tracking-wide text-amber-500"
      aria-label={`${safeScore} out of 5 stars`}
    >
      {"★".repeat(safeScore)}
      <span className="text-slate-300 dark:text-slate-600">
        {"★".repeat(5 - safeScore)}
      </span>
    </span>
  );
}

function InterviewDetails({ interview }: { interview: Interview }) {
  return (
    <>
      {interview.notes && (
        <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            A note from the recruiter
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-700 dark:text-slate-300">
            {interview.notes}
          </p>
        </div>
      )}
      {interview.feedbackComments && (
        <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Interview feedback
            </p>
            {interview.feedbackScore !== undefined && (
              <FeedbackStars score={interview.feedbackScore} />
            )}
          </div>
          <p className="mt-1 text-xs leading-5 text-slate-700 dark:text-slate-300">
            {interview.feedbackComments}
          </p>
        </div>
      )}
    </>
  );
}

export default function SeekerInterviewsPage() {
  const { interviews } = useAppStore();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setNow(Date.now()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const upcoming = interviews
    .filter(
      (interview) =>
        ["scheduled", "rescheduled"].includes(interview.status) &&
        (now === null || getInterviewTimestamp(interview) >= now)
    )
    .sort((a, b) => getInterviewTimestamp(a) - getInterviewTimestamp(b));
  const past = interviews
    .filter(
      (interview) =>
        !["scheduled", "rescheduled"].includes(interview.status) ||
        (now !== null && getInterviewTimestamp(interview) < now)
    )
    .sort((a, b) => getInterviewTimestamp(b) - getInterviewTimestamp(a));
  const displayed = activeTab === "upcoming" ? upcoming : past;

  return (
    <DashboardLayout
      role="job_seeker"
      title="Interview schedule"
      subtitle="Know what is coming up, and revisit feedback from past conversations."
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-5 flex gap-5 border-b border-slate-200 dark:border-slate-800">
          {[
            { key: "upcoming", label: "Upcoming", count: upcoming.length },
            { key: "past", label: "Past interviews", count: past.length },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key as "upcoming" | "past")}
              aria-current={activeTab === key ? "page" : undefined}
              className={`-mb-px inline-flex items-center gap-2 border-b-2 px-0.5 pb-3 text-xs font-medium transition ${
                activeTab === key
                  ? "border-indigo-600 text-indigo-700 dark:text-indigo-300"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              {label}
              <span className="text-[11px] tabular-nums text-slate-400 dark:text-slate-500">
                {count}
              </span>
            </button>
          ))}
        </div>

        {displayed.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <CalendarDays className="mx-auto h-6 w-6 text-slate-400" />
            <h2 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
              {activeTab === "upcoming"
                ? "No interviews coming up"
                : "No past interviews yet"}
            </h2>
            <p className="mx-auto mt-1.5 max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-400">
              {activeTab === "upcoming"
                ? "When an employer schedules an interview, the date and joining details will be here."
                : "Completed interview details and any feedback will be easy to find here."}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white px-4 sm:px-5 dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
            {displayed.map((interview, index) => {
              const isUpcoming = activeTab === "upcoming";

              return (
                <li key={interview.id} className="py-5">
                  <article>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex min-w-0 items-start gap-3.5">
                        <div className="w-14 shrink-0 pt-0.5 text-center">
                          <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {formatInterviewDate(interview).split(",")[0]}
                          </p>
                          <p className="mt-0.5 text-base font-semibold leading-tight tabular-nums text-slate-900 dark:text-white">
                            {formatInterviewDate(interview).split(", ")[1] ??
                              interview.date}
                          </p>
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            {index === 0 && isUpcoming && (
                              <span className="text-[10px] font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                                Next up
                              </span>
                            )}
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {interview.companyName}
                            </span>
                          </div>
                          <h2 className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                            {interview.jobTitle}
                          </h2>
                          <p className="mt-1 text-xs capitalize text-slate-500 dark:text-slate-400">
                            {interview.type} interview
                          </p>
                          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600 dark:text-slate-300">
                            <span className="inline-flex items-center gap-1.5">
                              <Clock3 className="h-3.5 w-3.5 text-slate-400" />
                              {interview.time} · {interview.durationMinutes} min
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <UserRound className="h-3.5 w-3.5 text-slate-400" />
                              {interview.interviewerName}
                              {interview.interviewerRole &&
                                ` · ${interview.interviewerRole}`}
                            </span>
                          </div>
                        </div>
                      </div>

                      {isUpcoming ? (
                        interview.meetingLink ? (
                          <a
                            href={interview.meetingLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
                          >
                            <Video className="h-3.5 w-3.5" />
                            Join meeting
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            Meeting link not shared yet
                          </span>
                        )
                      ) : (
                        <span className="inline-flex w-fit items-center gap-1.5 text-xs font-medium capitalize text-slate-500 dark:text-slate-400">
                          {interview.status === "completed" ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                          )}
                          {interview.status === "scheduled"
                            ? "Date passed"
                            : interview.status}
                        </span>
                      )}
                    </div>
                    <InterviewDetails interview={interview} />
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
}
