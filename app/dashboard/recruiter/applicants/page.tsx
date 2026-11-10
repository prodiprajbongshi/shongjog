"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { RelativeTime } from "@/components/ui/RelativeTime";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Modal } from "@/components/ui/Modal";
import { useAppStore } from "@/stores/useAppStore";
import type { Application, InterviewType } from "@/types";
import {
  Search,
  CheckCircle2,
  XCircle,
  Calendar,
  MessageSquare,
  FileText,
  Sparkles,
  Send,
} from "lucide-react";
import { toast } from "sonner";

const applicantStatuses = [
  { value: "all", label: "Everyone" },
  { value: "applied", label: "New" },
  { value: "screening", label: "Screening" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "hired", label: "Hired" },
  { value: "rejected", label: "Rejected" },
] as const;

export default function RecruiterApplicantsPage() {
  const {
    applications,
    updateApplicationStatus,
    scheduleInterview,
    currentUser,
  } = useAppStore();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modals state
  const [selectedCandidate, setSelectedCandidate] = useState<Application | null>(null);
  const [interviewModalCandidate, setInterviewModalCandidate] = useState<Application | null>(null);
  const [messageModalCandidate, setMessageModalCandidate] = useState<Application | null>(null);

  // Interview form state
  const [interviewType, setInterviewType] = useState<InterviewType>("technical");
  const [interviewDate, setInterviewDate] = useState("2025-03-12");
  const [interviewTime, setInterviewTime] = useState("14:00");
  const [meetingLink, setMeetingLink] = useState("https://meet.google.com/xyz-shongjog-interview");
  const [interviewNotes, setInterviewNotes] = useState("Technical live coding & architecture review in Go / Next.js.");

  // Message form state
  const [messageText, setMessageText] = useState("");

  const filteredApplicants = applications.filter((app) => {
    const matchesSearch =
      app.seekerName.toLowerCase().includes(search.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      app.seekerSkills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleShortlist = (app: Application) => {
    updateApplicationStatus(app.id, "shortlisted", "Moved to shortlist by recruiter.");
    toast.success(`${app.seekerName} moved to Shortlisted stage!`);
  };

  const handleReject = (app: Application) => {
    updateApplicationStatus(app.id, "rejected", "Candidate does not meet requirements.");
    toast.info(`${app.seekerName} moved to Rejected.`);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interviewModalCandidate) return;

    scheduleInterview({
      applicationId: interviewModalCandidate.id,
      jobId: interviewModalCandidate.jobId,
      jobTitle: interviewModalCandidate.jobTitle,
      companyName: interviewModalCandidate.companyName,
      candidateId: interviewModalCandidate.seekerId,
      candidateName: interviewModalCandidate.seekerName,
      candidateEmail: interviewModalCandidate.seekerEmail,
      candidateAvatar: interviewModalCandidate.seekerAvatar,
      interviewerName: currentUser.name,
      interviewerRole: "Director of Technical Recruiting",
      type: interviewType,
      date: interviewDate,
      time: interviewTime,
      durationMinutes: 60,
      meetingLink,
      notes: interviewNotes,
    });

    toast.success(`Interview scheduled with ${interviewModalCandidate.seekerName}!`, {
      description: `${interviewType.toUpperCase()} round on ${interviewDate} at ${interviewTime}. Candidate notified.`,
    });
    setInterviewModalCandidate(null);
  };

  const handleSendMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageModalCandidate || !messageText.trim()) return;

    toast.success(`Message dispatched to ${messageModalCandidate.seekerName}!`);
    setMessageText("");
    setMessageModalCandidate(null);
  };

  return (
    <DashboardLayout
      role="recruiter"
      title="Meet your applicants"
      subtitle="Take a look at who’s interested, get to know their experience, and keep each conversation moving."
    >
      <div className="mb-5 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="flex flex-wrap items-center gap-1"
            role="group"
            aria-label="Filter applicants by stage"
          >
            {applicantStatuses.map(({ value, label }) => {
              const count =
                value === "all"
                  ? applications.length
                  : applications.filter((app) => app.status === value).length;

              return (
                <button
                  key={value}
                  onClick={() => setStatusFilter(value)}
                  aria-pressed={statusFilter === value}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    statusFilter === value
                      ? "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300"
                      : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                  }`}
                >
                  {label}
                  <span className="ml-1.5 text-xs opacity-70">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              aria-label="Search applicants"
              placeholder="Search people, roles, or skills"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:bg-slate-900 dark:focus:ring-violet-950"
            />
          </div>
        </div>
        <p className="mt-3 px-1 text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
          Showing {filteredApplicants.length} of {applications.length}{" "}
          {applications.length === 1 ? "applicant" : "applicants"}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
              <tr className="text-xs font-medium text-slate-500 dark:text-slate-400">
                <th scope="col" className="px-5 py-3.5">Applicant</th>
                <th scope="col" className="px-4 py-3.5">Applied for</th>
                <th scope="col" className="px-4 py-3.5">Skills match</th>
                <th scope="col" className="px-4 py-3.5">Stage</th>
                <th scope="col" className="px-4 py-3.5">Application date</th>
                <th scope="col" className="px-5 py-3.5 text-right">Next step</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredApplicants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {applications.length === 0
                        ? "No applications yet"
                        : "No applicants match those filters"}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {applications.length === 0
                        ? "When someone applies to one of your jobs, you’ll find them here."
                        : "Try another search or choose a different stage."}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredApplicants.map((app) => (
                  <tr
                    key={app.id}
                    className="cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    onClick={() => setSelectedCandidate(app)}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={app.seekerAvatar}
                          alt={app.seekerName}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
                        />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {app.seekerName}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                            {app.seekerTitle || "Software Engineer"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-medium text-slate-800 dark:text-slate-200">
                        {app.jobTitle}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        {app.companyName}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
                        <Sparkles className="h-3.5 w-3.5" /> {app.matchScore}% match
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <StatusBadge status={app.status} size="sm" />
                    </td>

                    <td className="px-4 py-4 text-slate-500 dark:text-slate-400">
                      <RelativeTime dateString={app.appliedAt} />
                    </td>

                    <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleShortlist(app)}
                          aria-label={`Shortlist ${app.seekerName}`}
                          className="rounded-lg p-2 text-emerald-700 transition-colors hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/60"
                          title="Move to shortlist"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => setInterviewModalCandidate(app)}
                          aria-label={`Schedule an interview with ${app.seekerName}`}
                          className="rounded-lg p-2 text-amber-700 transition-colors hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/60"
                          title="Schedule interview"
                        >
                          <Calendar className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => setMessageModalCandidate(app)}
                          aria-label={`Message ${app.seekerName}`}
                          className="rounded-lg p-2 text-violet-700 transition-colors hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-950/60"
                          title="Send a message"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleReject(app)}
                          aria-label={`Decline ${app.seekerName}`}
                          className="rounded-lg p-2 text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/60"
                          title="Decline application"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Profile Preview Modal */}
      <Modal
        isOpen={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        maxWidth="2xl"
        title={
          selectedCandidate && (
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedCandidate.seekerAvatar}
                alt={selectedCandidate.seekerName}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-violet-500/20"
              />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {selectedCandidate.seekerName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedCandidate.seekerTitle || "Engineering Professional"} • {selectedCandidate.seekerLocation}
                </p>
              </div>
            </div>
          )
        }
      >
        {selectedCandidate && (
          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
              <div>
                <span className="mb-1 block text-xs text-slate-500 dark:text-slate-400">
                  Applied for
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {selectedCandidate.jobTitle}
                </p>
                <div className="mt-1">
                  <StatusBadge status={selectedCandidate.status} size="sm" />
                </div>
              </div>

              <div className="text-right">
                <span className="mb-1 block text-xs text-slate-500 dark:text-slate-400">
                  Skills match
                </span>
                <span className="text-xl font-semibold text-violet-700 dark:text-violet-300">
                  {selectedCandidate.matchScore}% match
                </span>
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                Skills and experience
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCandidate.seekerSkills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700 dark:bg-violet-950/60 dark:text-violet-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {selectedCandidate.coverLetter && (
              <div>
                <h4 className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  A note from {selectedCandidate.seekerName.split(" ")[0]}
                </h4>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300">
                  {selectedCandidate.coverLetter}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <h5 className="text-sm font-medium text-slate-900 dark:text-white">
                    {selectedCandidate.resumeName || "Resume"}
                  </h5>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    Resume attached to application
                  </p>
                </div>
              </div>
              <button
                onClick={() => toast.success("Opening resume preview.")}
                className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-violet-700 transition-colors hover:bg-violet-50 dark:text-violet-300 dark:hover:bg-violet-950/50"
              >
                Preview
              </button>
            </div>

            <div className="flex flex-col-reverse justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-row">
              <button
                onClick={() => {
                  handleShortlist(selectedCandidate);
                  setSelectedCandidate(null);
                }}
                className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Shortlist</span>
              </button>
              <button
                onClick={() => {
                  setInterviewModalCandidate(selectedCandidate);
                  setSelectedCandidate(null);
                }}
                className="flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Schedule Interview</span>
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Schedule Interview Modal */}
      <Modal
        isOpen={!!interviewModalCandidate}
        onClose={() => setInterviewModalCandidate(null)}
        title={
          interviewModalCandidate && (
            <span>Set up an interview with {interviewModalCandidate.seekerName}</span>
          )
        }
      >
        <form onSubmit={handleScheduleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              What kind of conversation?
            </label>
            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value as any)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
            >
              <option value="technical">Technical Round (Live Coding / Architecture)</option>
              <option value="hr">HR & Culture Fit Round</option>
              <option value="screening">Initial Screening Call</option>
              <option value="final">Final Executive Round</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Date
              </label>
              <input
                type="date"
                required
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Time
              </label>
              <input
                type="time"
                required
                value={interviewTime}
                onChange={(e) => setInterviewTime(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Video call link
            </label>
            <input
              type="url"
              required
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              placeholder="https://"
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              A note for the candidate
            </label>
            <textarea
              rows={2}
              value={interviewNotes}
              onChange={(e) => setInterviewNotes(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
            />
          </div>

          <div className="flex flex-col-reverse justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-row">
            <button
              type="button"
              onClick={() => setInterviewModalCandidate(null)}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Schedule interview</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Message Modal */}
      <Modal
        isOpen={!!messageModalCandidate}
        onClose={() => setMessageModalCandidate(null)}
        title={
          messageModalCandidate && (
            <span>Send a note to {messageModalCandidate.seekerName}</span>
          )
        }
      >
        <form onSubmit={handleSendMessageSubmit} className="space-y-4 pt-2">
          <textarea
            rows={4}
            required
            aria-label="Message to candidate"
            placeholder="Write a friendly note to the candidate..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white p-3.5 text-sm leading-relaxed text-slate-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setMessageModalCandidate(null)}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send message</span>
            </button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
