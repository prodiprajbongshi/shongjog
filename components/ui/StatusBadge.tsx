import React from "react";
import { ApplicationStatus, JobStatus, WorkMode, JobType } from "@/types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: ApplicationStatus | JobStatus | WorkMode | JobType | string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StatusBadge({ status, size = "md", className }: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  const styles: Record<string, { bg: string; text: string; label: string; dot?: string }> = {
    // Application statuses
    applied: {
      bg: "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800",
      text: "text-blue-700 dark:text-blue-300",
      label: "Applied",
      dot: "bg-blue-500",
    },
    screening: {
      bg: "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800",
      text: "text-indigo-700 dark:text-indigo-300",
      label: "Screening",
      dot: "bg-indigo-500",
    },
    shortlisted: {
      bg: "bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800",
      text: "text-purple-700 dark:text-purple-300",
      label: "Shortlisted",
      dot: "bg-purple-500",
    },
    interview: {
      bg: "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800",
      text: "text-amber-700 dark:text-amber-300",
      label: "Interview",
      dot: "bg-amber-500",
    },
    offer: {
      bg: "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800",
      text: "text-emerald-700 dark:text-emerald-300",
      label: "Offer Extended",
      dot: "bg-emerald-500",
    },
    hired: {
      bg: "bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-800",
      text: "text-teal-700 dark:text-teal-300",
      label: "Hired 🎉",
      dot: "bg-teal-500",
    },
    rejected: {
      bg: "bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800",
      text: "text-rose-700 dark:text-rose-300",
      label: "Rejected",
      dot: "bg-rose-500",
    },

    // Job statuses
    active: {
      bg: "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800",
      text: "text-emerald-700 dark:text-emerald-300",
      label: "Active",
      dot: "bg-emerald-500",
    },
    draft: {
      bg: "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700",
      text: "text-slate-700 dark:text-slate-300",
      label: "Draft",
      dot: "bg-slate-400",
    },
    closed: {
      bg: "bg-zinc-100 dark:bg-zinc-850 border-zinc-200 dark:border-zinc-800",
      text: "text-zinc-600 dark:text-zinc-400",
      label: "Closed",
      dot: "bg-zinc-400",
    },
    pending_approval: {
      bg: "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800",
      text: "text-amber-700 dark:text-amber-300",
      label: "Pending Approval",
      dot: "bg-amber-500",
    },

    // Work modes
    remote: {
      bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/80",
      text: "text-emerald-700 dark:text-emerald-300",
      label: "Remote",
    },
    hybrid: {
      bg: "bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/80",
      text: "text-sky-700 dark:text-sky-300",
      label: "Hybrid",
    },
    onsite: {
      bg: "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700",
      text: "text-slate-700 dark:text-slate-300",
      label: "Onsite",
    },

    // Job types
    full_time: {
      bg: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-850",
      text: "text-indigo-700 dark:text-indigo-300",
      label: "Full Time",
    },
    contract: {
      bg: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-850",
      text: "text-purple-700 dark:text-purple-300",
      label: "Contract",
    },
    part_time: {
      bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-850",
      text: "text-amber-700 dark:text-amber-300",
      label: "Part Time",
    },
    internship: {
      bg: "bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-850",
      text: "text-teal-700 dark:text-teal-300",
      label: "Internship",
    },
  };

  const current = styles[normalized] || {
    bg: "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700",
    text: "text-slate-700 dark:text-slate-300",
    label: status.replace("_", " "),
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full border transition-all select-none",
        current.bg,
        current.text,
        sizeClasses[size],
        className
      )}
    >
      {current.dot && (
        <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", current.dot)} />
      )}
      <span className="capitalize">{current.label}</span>
    </span>
  );
}

