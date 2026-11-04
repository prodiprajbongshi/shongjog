"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAppStore } from "@/stores/useAppStore";
import {
  FileText,
  Upload,
  Download,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  RefreshCw,
  Eye,
  Trash2,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

export default function ResumePage() {
  const { seekerProfile, updateSeekerProfile } = useAppStore();

  const [atsScore, setAtsScore] = useState(seekerProfile.resumeAtsScore || 92);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(seekerProfile.resumeName || null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      updateSeekerProfile({
        resumeName: file.name,
        resumeLastUpdated: new Date().toISOString().split("T")[0],
      });
      toast.success(`Uploaded: ${file.name}`, {
        description: "Resume saved and attached to your candidate profile.",
      });
    }
  };

  const handleReanalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const newScore = Math.floor(Math.random() * 5) + 93;
      setAtsScore(newScore);
      updateSeekerProfile({ resumeAtsScore: newScore });
      setIsAnalyzing(false);
      toast.success("AI ATS Analysis Complete!", {
        description: `Your resume scored ${newScore}/100 with 14 key engineering keywords matched.`,
      });
    }, 1200);
  };

  return (
    <DashboardLayout
      role="job_seeker"
      title="Resume Management & AI ATS Analyzer"
      subtitle="Optimize your resume for applicant tracking systems (ATS) and recruiter screening."
      actions={
        <button
          onClick={handleReanalyze}
          disabled={isAnalyzing}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 disabled:opacity-70 transition"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isAnalyzing ? "animate-spin" : ""}`} />
          <span>{isAnalyzing ? "Analyzing..." : "Run AI Analysis"}</span>
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl">
        {/* Left Column: Upload & Preview (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Upload card */}
          <div className="rounded-3xl border border-dashed border-indigo-200 bg-white p-6 sm:p-8 text-center shadow-xs dark:border-indigo-900/60 dark:bg-slate-900">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Upload className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
              Upload Latest Resume (PDF)
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              Supports PDF, DOCX up to 10MB. ATS parses your skills and work history automatically.
            </p>

            <label className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 cursor-pointer">
              <Upload className="h-4 w-4" />
              <span>Choose Resume File</span>
              <input
                type="file"
                accept=".pdf,.docx"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {/* Active Resume Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Primary Active Resume
            </span>
            <div className="mt-3 flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-xs">
                    {seekerProfile.resumeName || "Tanvir_Ahmed_Senior_Resume.pdf"}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Last updated: {seekerProfile.resumeLastUpdated || "Recent"} • 142 KB
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toast.info("Opening PDF preview mode.")}
                  className="rounded-lg p-2 text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700"
                  title="Preview"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => toast.success("Downloaded resume file.")}
                  className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/60"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Extracted ATS Keywords */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Extracted ATS Keywords
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {[
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
              ].map((kw) => (
                <span
                  key={kw}
                  className="rounded-lg bg-indigo-50/80 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                >
                  ✓ {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Resume Analysis Report (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    AI ATS Evaluation Report
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Benchmark for Senior Full Stack & Lead Engineer roles
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                  {atsScore}
                </span>
                <span className="text-xs text-slate-400 block font-semibold">/ 100</span>
              </div>
            </div>

            {/* Score Breakdown Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Technical Keyword Match</span>
                  <span className="text-emerald-600 font-bold">96%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "96%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Quantifiable Impact (Metrics & Numbers)</span>
                  <span className="text-indigo-600 font-bold">90%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: "90%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>ATS Formatting & Header Hierarchy</span>
                  <span className="text-emerald-600 font-bold">95%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "95%" }} />
                </div>
              </div>
            </div>

            {/* Suggestions & Actionable Improvements */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                AI Recommendations
              </h4>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-xs text-emerald-900 dark:border-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-200">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Strong Action Verbs Found</strong>
                    "Spearheaded", "Architected", "Engineered", and "Optimized" are prominently featured in your experience bullet points.
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-3.5 text-xs text-amber-900 dark:border-amber-950 dark:bg-amber-950/40 dark:text-amber-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Suggested Enhancement</strong>
                    Consider adding explicit metrics for latency reduction (e.g. "reduced p99 API response times by 35% using Redis caching").
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-3.5 text-xs text-indigo-900 dark:border-indigo-950 dark:bg-indigo-950/40 dark:text-indigo-200">
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Trending Keywords to Include</strong>
                    Adding "Distributed Tracing" and "OpenTelemetry" will boost your match for Observability and SRE roles by an estimated +8%.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

