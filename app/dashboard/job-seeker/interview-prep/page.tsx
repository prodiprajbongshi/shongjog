"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Cpu,
  Terminal,
  Layers,
  Send,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: string;
  type: "technical" | "hr";
  question: string;
  keyPoints: string[];
  modelAnswer: string;
}

const PRESET_ROLES = [
  "Senior Full Stack (Next.js & Go)",
  "Frontend Architecture & Design Systems",
  "DevOps, Kubernetes & Cloud Reliability",
  "AI / Machine Learning & LLM Systems",
  "Fintech Distributed Systems",
];

const MOCK_QUESTIONS: Record<string, Question[]> = {
  "Senior Full Stack (Next.js & Go)": [
    {
      id: "q-1",
      type: "technical",
      question: "How do you design an optimistic UI update in Next.js Server Actions while maintaining consistency with a PostgreSQL database?",
      keyPoints: [
        "Explain useOptimistic hook in React 19 / Next.js",
        "Detail rollback strategies when network or constraint failures occur",
        "Discuss PostgreSQL row versioning (optimistic locking) vs pessimistic locks",
      ],
      modelAnswer: "In Next.js, use the React useOptimistic hook to immediately update client state before the server action settles. On the server side, execute atomic database transactions using version columns or SERIALIZABLE isolation to guarantee consistency. If the action throws, React automatically rolls back the optimistic state.",
    },
    {
      id: "q-2",
      type: "technical",
      question: "Explain your approach to mitigating Goroutine leaks and channel deadlocks in high-throughput Go microservices.",
      keyPoints: [
        "Use context.WithCancel or context.WithTimeout",
        "Ensure buffered channels have appropriate sizing or non-blocking select",
        "Utilize runtime pprof / trace to monitor active goroutines",
      ],
      modelAnswer: "Every background Goroutine should accept a context.Context to facilitate cancellation. Avoid unbounded channel sends by employing select with default cases or timeout contexts. In production, expose pprof endpoints and trigger telemetry alerts when goroutine counts climb monotonically.",
    },
    {
      id: "q-3",
      type: "hr",
      question: "Describe a situation where you had to push back on unrealistic technical deadlines proposed by product management.",
      keyPoints: [
        "Data-driven scoping: break work into MVP vs nice-to-haves",
        "Communicate technical debt risk clearly in business impact terms",
        "Propose phased delivery schedules",
      ],
      modelAnswer: "I presented a detailed breakdown of critical security/compliance work versus peripheral feature polish. By collaborating with the PM to phase the release—launching core transaction flows in Sprint 1 and automated reporting in Sprint 2—we delivered high value on time without compromising production stability.",
    },
  ],
};

export default function AIInterviewPrepPage() {
  const [selectedRole, setSelectedRole] = useState(PRESET_ROLES[0]);
  const [activeFilter, setActiveFilter] = useState<"all" | "technical" | "hr">("all");
  const [expandedId, setExpandedId] = useState<string | null>("q-1");
  const [customRoleInput, setCustomRoleInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const questions = MOCK_QUESTIONS[selectedRole] || MOCK_QUESTIONS[PRESET_ROLES[0]];

  const filteredQuestions = questions.filter((q) =>
    activeFilter === "all" ? true : q.type === activeFilter
  );

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("AI Interview Kit Generated!", {
        description: `Generated 5 tailored questions and rubrics for ${customRoleInput || selectedRole}.`,
      });
    }, 900);
  };

  return (
    <DashboardLayout
      role="job_seeker"
      title="AI Technical & HR Interview Simulator"
      subtitle="Practice tailored interview questions, review model answers, and master high-stakes technical rounds."
    >
      <div className="max-w-5xl space-y-6">
        {/* Role Selector Card */}
        <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 p-6 dark:border-indigo-950 dark:from-indigo-950/40 dark:to-purple-950/30">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Select Your Target Role
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose a pre-configured engineering specialization or type your custom position
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {PRESET_ROLES.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  selectedRole === role
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Or enter specialized role (e.g. Distributed Database Engineer)..."
              value={customRoleInput}
              onChange={(e) => setCustomRoleInput(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 disabled:opacity-70 transition"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>{isGenerating ? "Generating..." : "Generate AI Questions"}</span>
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={`rounded-xl px-3 py-1 text-xs font-semibold ${
              activeFilter === "all"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            All Questions
          </button>
          <button
            onClick={() => setActiveFilter("technical")}
            className={`rounded-xl px-3 py-1 text-xs font-semibold ${
              activeFilter === "technical"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            Technical & Architecture
          </button>
          <button
            onClick={() => setActiveFilter("hr")}
            className={`rounded-xl px-3 py-1 text-xs font-semibold ${
              activeFilter === "hr"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            Behavioral & HR
          </button>
        </div>

        {/* Questions Accordion */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const isExpanded = expandedId === q.id;

            return (
              <div
                key={q.id}
                className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
              >
                <div
                  className="flex items-start justify-between gap-4 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs dark:bg-indigo-950 dark:text-indigo-300">
                      0{idx + 1}
                    </span>
                    <div>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300 capitalize">
                        {q.type} Round
                      </span>
                      <h4 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                        {q.question}
                      </h4>
                    </div>
                  </div>

                  <button className="text-slate-400">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-5 space-y-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Key Points Recruiters Look For:
                      </h5>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {q.keyPoints.map((kp, kIdx) => (
                          <li key={kIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                            <span>{kp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-950 dark:bg-indigo-950/40">
                      <h5 className="text-xs font-bold text-indigo-950 dark:text-indigo-200 mb-1 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                        AI Model Answer & Architecture Rubric:
                      </h5>
                      <p className="text-xs leading-relaxed text-indigo-900/90 dark:text-indigo-200/90">
                        "{q.modelAnswer}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}

