"use client";

import React, { useState } from "react";
import { Modal } from "./Modal";
import { Job } from "@/types";
import { useAppStore } from "@/stores/useAppStore";
import {
  Briefcase,
  FileText,
  Sparkles,
  Send,
  CheckCircle2,
  Paperclip,
  Building2,
  MapPin,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";

interface ApplyModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplyModal({ job, isOpen, onClose }: ApplyModalProps) {
  const { seekerProfile, applyForJob, applications } = useAppStore();
  const [coverLetter, setCoverLetter] = useState(
    "I am very excited about this role and feel my background in scalable web applications and distributed architecture makes me a great fit for your team."
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!job) return null;

  const alreadyApplied = applications.some((a) => a.jobId === job.id);

  // Calculate matching skills
  const jobSkills = job.skills || [];
  const seekerSkills = seekerProfile.skills || [];
  const matchedSkills = jobSkills.filter((s) =>
    seekerSkills.some((sk) => sk.toLowerCase() === s.toLowerCase())
  );
  const matchPercent = Math.min(
    100,
    Math.max(68, Math.round((matchedSkills.length / Math.max(1, jobSkills.length)) * 100) + 12)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      applyForJob(job.id, {
        coverLetter,
        resumeUrl: seekerProfile.resumeUrl || "/mock-resume.pdf",
        resumeName: seekerProfile.resumeName || "Tanvir_Ahmed_Resume.pdf",
      });

      setIsSubmitting(false);
      toast.success(`Application sent to ${job.companyName}!`, {
        description: `Position: ${job.title}. Track status in your Job Seeker dashboard.`,
      });
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      title={
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="h-full w-full object-contain rounded-lg"
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Apply to {job.companyName}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {job.title}
            </p>
          </div>
        </div>
      }
    >
      {alreadyApplied ? (
        <div className="py-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h4 className="mt-3 text-base font-semibold text-slate-900 dark:text-white">
            You Already Applied!
          </h4>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            You have already submitted an application for this position. You can track your progress in your dashboard.
          </p>
          <button
            onClick={onClose}
            className="mt-5 rounded-xl bg-slate-900 px-5 py-2 text-xs font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* AI Match Banner */}
          <div className="flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50/70 p-3.5 dark:border-indigo-950/80 dark:bg-indigo-950/40">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-indigo-950 dark:text-indigo-200">
                  AI Fit Score: <strong className="text-indigo-600 dark:text-indigo-400">{matchPercent}% Match</strong>
                </p>
                <p className="text-[11px] text-indigo-800/80 dark:text-indigo-300/80">
                  {matchedSkills.length} of {jobSkills.length} key skills matched from your profile
                </p>
              </div>
            </div>
            <div className="h-8 w-16 overflow-hidden rounded-full bg-indigo-200/50 p-1 dark:bg-indigo-900/50">
              <div
                className="h-full rounded-full bg-indigo-600"
                style={{ width: `${matchPercent}%` }}
              />
            </div>
          </div>

          {/* Job summary chips */}
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-600 dark:text-slate-300">
            <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
              <Building2 className="h-3 w-3 text-slate-400" /> {job.companyName}
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
              <MapPin className="h-3 w-3 text-slate-400" /> {job.location} ({job.workMode})
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
              <DollarSign className="h-3 w-3 text-emerald-600" />
              {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)} / yr
            </span>
          </div>

          {/* Resume Attachment */}
          <div className="rounded-xl border border-slate-200 p-3.5 dark:border-slate-800">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Resume to Submit
            </label>
            <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    {seekerProfile.resumeName || "Tanvir_Ahmed_Resume_2025.pdf"}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    ATS Score: {seekerProfile.resumeAtsScore || 92}/100 • Updated recently
                  </p>
                </div>
              </div>
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                Attached
              </span>
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Personal Note / Cover Letter (Optional)
            </label>
            <textarea
              rows={3}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Highlight your relevant experience and enthusiasm for this role..."
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-100"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>Sending...</>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" /> Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

