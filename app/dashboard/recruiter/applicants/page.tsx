"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { RelativeTime } from "@/components/ui/RelativeTime";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Modal } from "@/components/ui/Modal";
import { useAppStore } from "@/stores/useAppStore";
import { Application, ApplicationStatus, InterviewType } from "@/types";
import { formatCurrency } from "@/lib/utils";
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Calendar,
  MessageSquare,
  FileText,
  Sparkles,
  ExternalLink,
  Eye,
  Send,
  Clock,
  Briefcase,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";

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
      title="Candidate & Applicant Directory"
      subtitle="Review submissions, evaluate technical match scores, and progress candidates."
    >
      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-1.5 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
          {["all", "applied", "screening", "shortlisted", "interview", "offer", "hired", "rejected"].map(
            (st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold capitalize transition ${
                  statusFilter === st
                    ? "bg-white text-violet-600 shadow-xs dark:bg-slate-900 dark:text-violet-400"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {st}
              </button>
            )
          )}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidates or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Candidate Table */}
      <div className="rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
              <tr className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-5">Candidate</th>
                <th className="py-3.5 px-4">Applied Job</th>
                <th className="py-3.5 px-4">AI Fit</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Applied</th>
                <th className="py-3.5 px-5 text-right">Pipeline Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredApplicants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No candidates found for this criteria.
                  </td>
                </tr>
              ) : (
                filteredApplicants.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition cursor-pointer"
                    onClick={() => setSelectedCandidate(app)}
                  >
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={app.seekerAvatar}
                          alt={app.seekerName}
                          className="h-9 w-9 rounded-full object-cover ring-2 ring-violet-500/10"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">
                            {app.seekerName}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {app.seekerTitle || "Software Engineer"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {app.jobTitle}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {app.companyName}
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-bold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
                        <Sparkles className="h-3 w-3" /> {app.matchScore}%
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <StatusBadge status={app.status} size="sm" />
                    </td>

                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                      <RelativeTime dateString={app.appliedAt} />
                    </td>

                    <td className="py-3 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleShortlist(app)}
                          className="rounded-lg p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/60"
                          title="Shortlist Candidate"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => setInterviewModalCandidate(app)}
                          className="rounded-lg p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/60"
                          title="Schedule Interview"
                        >
                          <Calendar className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => setMessageModalCandidate(app)}
                          className="rounded-lg p-1.5 text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/60"
                          title="Direct Message"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleReject(app)}
                          className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/60"
                          title="Reject Application"
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
            {/* Status & Match Pill */}
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Requisition & Stage
                </span>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {selectedCandidate.jobTitle}
                </p>
                <div className="mt-1">
                  <StatusBadge status={selectedCandidate.status} size="sm" />
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  AI Fit Compatibility
                </span>
                <span className="text-xl font-black text-violet-600 dark:text-violet-400">
                  {selectedCandidate.matchScore}%
                </span>
              </div>
            </div>

            {/* Candidate Skills */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Candidate Skills & Technologies
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCandidate.seekerSkills.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Cover Letter */}
            {selectedCandidate.coverLetter && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Candidate Note / Cover Letter
                </h4>
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300 leading-relaxed italic">
                  "{selectedCandidate.coverLetter}"
                </div>
              </div>
            )}

            {/* Attached Resume */}
            <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-violet-600" />
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                    {selectedCandidate.resumeName || "Candidate_Resume.pdf"}
                  </h5>
                  <p className="text-[11px] text-slate-400">
                    ATS-parsed engineering resume
                  </p>
                </div>
              </div>
              <button
                onClick={() => toast.success("Opening resume preview.")}
                className="rounded-xl bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 hover:bg-violet-100 dark:bg-violet-950 dark:text-violet-300"
              >
                Preview Resume
              </button>
            </div>

            {/* Quick Actions Footer */}
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  handleShortlist(selectedCandidate);
                  setSelectedCandidate(null);
                }}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Shortlist</span>
              </button>
              <button
                onClick={() => {
                  setInterviewModalCandidate(selectedCandidate);
                  setSelectedCandidate(null);
                }}
                className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-violet-700"
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
            <span>Schedule Interview with {interviewModalCandidate.seekerName}</span>
          )
        }
      >
        <form onSubmit={handleScheduleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Interview Type
            </label>
            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value as any)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="technical">Technical Round (Live Coding / Architecture)</option>
              <option value="hr">HR & Culture Fit Round</option>
              <option value="screening">Initial Screening Call</option>
              <option value="final">Final Executive Round</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Time
              </label>
              <input
                type="time"
                required
                value={interviewTime}
                onChange={(e) => setInterviewTime(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Meeting Video Link
            </label>
            <input
              type="url"
              required
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Candidate Preparation Notes
            </label>
            <textarea
              rows={2}
              value={interviewNotes}
              onChange={(e) => setInterviewNotes(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setInterviewModalCandidate(null)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-violet-700"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Confirm & Dispatch Invite</span>
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
            <span>Send Direct Message to {messageModalCandidate.seekerName}</span>
          )
        }
      >
        <form onSubmit={handleSendMessageSubmit} className="space-y-4 pt-2">
          <textarea
            rows={4}
            required
            placeholder="Type your message to the candidate..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setMessageModalCandidate(null)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-violet-700"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
