"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAppStore } from "@/stores/useAppStore";
import { cn } from "@/lib/utils";
import {
  FileText,
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  Zap,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

// Keywords pulled from the parsed resume — shown as tags in the left panel
const ATS_KEYWORDS = [
  "TypeScript",
  "React 19",
  "Next.js",
  "Go",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "AWS Solutions Architecture",
  "RESTful APIs",
  "GraphQL",
  "CI/CD Pipelines",
  "Microservices",
  "System Design",
];

// Each breakdown metric: label, percentage, and which colour to use for the bar
const SCORE_BREAKDOWN = [
  { label: "Technical keyword match", pct: 96, color: "bg-emerald-500" },
  { label: "Quantifiable impact & numbers", pct: 90, color: "bg-indigo-500" },
  { label: "ATS formatting & structure", pct: 95, color: "bg-teal-500" },
  { label: "Readability & section clarity", pct: 88, color: "bg-violet-500" },
];

// Suggestions shown in the analysis panel — each has a tone (good/warn/tip)
const SUGGESTIONS = [
  {
    tone: "good" as const,
    heading: "Strong action verbs",
    body: '"Spearheaded", "Architected", "Engineered", and "Optimized" appear prominently in your bullet points.',
  },
  {
    tone: "warn" as const,
    heading: "Add quantified results",
    body: 'Try something like "Reduced p99 API latency by 35% using Redis caching" to make impact concrete.',
  },
  {
    tone: "tip" as const,
    heading: "Trending keywords to consider",
    body: '"Distributed Tracing" and "OpenTelemetry" can boost your visibility for Observability and SRE roles by ~8%.',
  },
];

const TONE_STYLES = {
  good: {
    wrapper:
      "border-emerald-100 bg-emerald-50/60 dark:border-emerald-900/60 dark:bg-emerald-950/30",
    icon: (
      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
    ),
    text: "text-emerald-900 dark:text-emerald-200",
    title: "text-emerald-800 dark:text-emerald-300",
  },
  warn: {
    wrapper:
      "border-amber-100 bg-amber-50/60 dark:border-amber-900/60 dark:bg-amber-950/30",
    icon: (
      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
    ),
    text: "text-amber-900 dark:text-amber-200",
    title: "text-amber-800 dark:text-amber-300",
  },
  tip: {
    wrapper:
      "border-indigo-100 bg-indigo-50/60 dark:border-indigo-900/60 dark:bg-indigo-950/30",
    icon: (
      <Zap className="h-4 w-4 shrink-0 mt-0.5 text-indigo-600 dark:text-indigo-400" />
    ),
    text: "text-indigo-900 dark:text-indigo-200",
    title: "text-indigo-800 dark:text-indigo-300",
  },
};

// Score ring — a simple SVG circle that fills based on the ATS score
function ScoreRing({ score }: { score: number }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;

  const ringColor =
    score >= 90 ? "#10b981" : score >= 70 ? "#6366f1" : "#f59e0b";

  return (
    <div className="relative flex h-28 w-28 items-center justify-center">
      <svg
        className="-rotate-90"
        width="112"
        height="112"
        viewBox="0 0 112 112"
      >
        {/* Track */}
        <circle
          cx="56"
          cy="56"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-slate-100 dark:text-slate-800"
        />
        {/* Fill */}
        <circle
          cx="56"
          cy="56"
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black leading-none text-slate-900 dark:text-white">
          {score}
        </span>
        <span className="mt-0.5 text-[10px] font-semibold text-slate-400">
          / 100
        </span>
      </div>
    </div>
  );
}

export default function ResumePage() {
  const { seekerProfile, updateSeekerProfile } = useAppStore();

  const [atsScore, setAtsScore] = useState(seekerProfile.resumeAtsScore ?? 92);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(
    seekerProfile.resumeName ?? null,
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file.name);
    updateSeekerProfile({
      resumeName: file.name,
      resumeLastUpdated: new Date().toISOString().split("T")[0],
    });
    toast.success(`Uploaded: ${file.name}`, {
      description: "Your resume is now attached to your candidate profile.",
    });
  };

  const handleReanalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const newScore = Math.floor(Math.random() * 5) + 93;
      setAtsScore(newScore);
      updateSeekerProfile({ resumeAtsScore: newScore });
      setIsAnalyzing(false);
      toast.success("Analysis complete!", {
        description: `Scored ${newScore}/100 — 14 key engineering keywords matched.`,
      });
    }, 1400);
  };

  const scoreLabel =
    atsScore >= 90 ? "Excellent" : atsScore >= 75 ? "Good" : "Needs work";

  return (
    <DashboardLayout
      role="job_seeker"
      title="Resume & ATS"
      subtitle="Upload your resume, check your ATS score, and see exactly what to improve."
      actions={
        <button
          onClick={handleReanalyze}
          disabled={isAnalyzing}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:opacity-60 dark:shadow-none"
        >
          <RefreshCw
            className={cn("h-3.5 w-3.5", isAnalyzing && "animate-spin")}
          />
          {isAnalyzing ? "Analyzing…" : "Re-run analysis"}
        </button>
      }
    >
      <div className="grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ── Left column ── upload + file info + keywords ── */}
        <div className="space-y-5">
          {/* Drop-zone upload card */}
          <div className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-indigo-200 bg-white p-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-slate-900 dark:hover:border-indigo-700">
            {/* Faint gradient blob for depth */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-100 opacity-40 blur-2xl dark:opacity-10" />

            <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-200 dark:shadow-none">
              <Upload className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
              Drop your resume here
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              PDF or DOCX · up to 10 MB · parsed automatically for ATS keywords
            </p>

            <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700">
              <Upload className="h-4 w-4" />
              Choose file
              <input
                type="file"
                accept=".pdf,.docx"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {/* Active resume file row */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active resume
            </p>
            <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
              <div className="flex items-center gap-3 min-w-0">
                {/* PDF icon chip */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="max-w-[200px] truncate text-xs font-bold text-slate-900 dark:text-white">
                    {selectedFile ??
                      seekerProfile.resumeName ??
                      "Tanvir_Ahmed_Resume.pdf"}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <Clock className="h-3 w-3 shrink-0" />
                    Updated {seekerProfile.resumeLastUpdated ?? "recently"} ·
                    142 KB
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => toast.info("Opening preview…")}
                  title="Preview"
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => toast.success("Download started.")}
                  title="Download"
                  className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/60"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Keyword cloud extracted from the resume */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-indigo-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Detected keywords
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {ATS_KEYWORDS.map((kw) => (
                <span
                  key={kw}
                  className="flex items-center gap-1 rounded-lg border border-indigo-100 bg-indigo-50/80 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/50 dark:text-indigo-300"
                >
                  <CheckCircle2 className="h-3 w-3 shrink-0" />
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right column ── score ring + breakdown bars + suggestions ── */}
        <div className="space-y-5">
          {/* Score hero card */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            {/* Soft blob */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-indigo-100 opacity-30 blur-3xl dark:opacity-10" />

            <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <ScoreRing score={atsScore} />

              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    ATS Score
                  </h3>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Benchmarked for Senior Full Stack & Lead Engineer roles
                </p>
                <span
                  className={cn(
                    "mt-3 inline-block rounded-full px-3 py-1 text-xs font-bold",
                    atsScore >= 90
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                      : atsScore >= 75
                        ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
                  )}
                >
                  {scoreLabel}
                </span>
              </div>
            </div>

            {/* Breakdown bars */}
            <div className="mt-6 space-y-3.5 border-t border-slate-100 pt-5 dark:border-slate-800">
              {SCORE_BREAKDOWN.map(({ label, pct, color }) => (
                <div key={label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {label}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {pct}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-700",
                        color,
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

         

          {/* Improvement Suggestions */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Areas to work on
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  A few things that could make your profile stronger.
                </p>
              </div>

            </div>

            <div className="space-y-4">
              {SUGGESTIONS.map(({ tone, heading, body }, index) => {
                const style = TONE_STYLES[tone];

                return (
                  <div
                    key={heading}
                    className="group flex gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0 dark:border-slate-800"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      {style.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200">
                          {heading}
                        </p>
                      </div>

                      <p className="mt-1 text-xs leading-[1.7] text-slate-500 dark:text-slate-400">
                        {body}
                      </p>
                    </div>

                    <span className="pt-1 text-[10px] font-medium tabular-nums text-slate-300 dark:text-slate-600">
                      0{index + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
