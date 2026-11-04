"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Modal } from "@/components/ui/Modal";
import { useAppStore } from "@/stores/useAppStore";
import { JOB_CATEGORIES, JOB_TYPES, WORK_MODES, EXPERIENCE_LEVELS } from "@/lib/constants";
import {
  Sparkles,
  Save,
  Eye,
  Send,
  Plus,
  Trash2,
  DollarSign,
  Briefcase,
  Layers,
  ArrowLeft,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

export default function CreateJobPage() {
  const router = useRouter();
  const { createJob, currentUser } = useAppStore();

  const [title, setTitle] = useState("Staff Platform & Systems Engineer");
  const [category, setCategory] = useState("Backend & Systems");
  const [companyName, setCompanyName] = useState("Stripe");
  const [workMode, setWorkMode] = useState("remote");
  const [type, setType] = useState("full_time");
  const [experienceLevel, setExperienceLevel] = useState("senior");
  const [salaryMin, setSalaryMin] = useState(150000);
  const [salaryMax, setSalaryMax] = useState(200000);
  const [location, setLocation] = useState("San Francisco, CA (or Remote)");
  const [deadline, setDeadline] = useState("2025-06-30");
  const [vacancies, setVacancies] = useState(2);
  const [department, setDepartment] = useState("Core Infrastructure");

  const [description, setDescription] = useState(
    "Join our Core Platform Engineering team to build mission-critical distributed ledger systems and multi-region Kubernetes infrastructure. You will own architecture decisions impacting millions of transactions daily."
  );

  const [responsibilities, setResponsibilities] = useState<string[]>([
    "Architect and scale highly available distributed microservices in Go and Rust.",
    "Partner with SRE and security teams to maintain five-nines uptime SLAs.",
    "Mentor junior and mid-level engineers across international hubs.",
  ]);

  const [requirements, setRequirements] = useState<string[]>([
    "6+ years building low-latency distributed systems.",
    "Proficiency in Go, Rust, or modern C++ with deep memory optimization knowledge.",
    "Experience deploying production workloads on AWS and Kubernetes.",
  ]);

  const [skills, setSkills] = useState<string[]>(["Go", "Kubernetes", "PostgreSQL", "Docker", "Distributed Systems"]);
  const [newSkill, setNewSkill] = useState("");
  const [benefits, setBenefits] = useState<string[]>([
    "Unlimited PTO",
    "Health, Dental & Vision 100% covered",
    "Annual Learning Stipend ($2,500)",
    "Home Office Setup Allowance",
  ]);

  // AI Generator state
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleAiGenerate = () => {
    setAiGenerating(true);
    setTimeout(() => {
      setDescription(
        `We are looking for an exceptional ${title} to spearhead high-impact engineering initiatives at ${companyName}. You will drive software reliability, build clean type-safe abstractions, and collaborate closely with cross-functional product and infrastructure teams.`
      );
      setResponsibilities([
        `Design, implement, and benchmark scalable architectures for our ${department} initiatives.`,
        "Author clean, maintainable, production-ready code with rigorous automated testing.",
        "Perform architectural reviews and establish engineering standards across the department.",
        "Participate in high-severity incident resolution drills and telemetry reviews.",
      ]);
      setRequirements([
        `5+ years of production experience in modern ${category.toLowerCase()} workflows.`,
        "Demonstrated ability to deliver high-scale distributed systems or modern UI architecture.",
        "Deep understanding of cloud infrastructure, automated CI/CD, and database indexing.",
        "Strong written and verbal technical communication skills.",
      ]);
      setSkills(["TypeScript", "Go", "Kubernetes", "PostgreSQL", "System Design", "AWS"]);

      setAiGenerating(false);
      setIsAiModalOpen(false);
      toast.success("AI generated job description & responsibilities applied!");
    }, 1200);
  };

  const handleSubmit = (status: "active" | "draft") => {
    if (!title.trim()) {
      toast.error("Please enter a job title.");
      return;
    }

    const newJob = createJob({
      title,
      category,
      companyName,
      companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80",
      workMode: workMode as any,
      type: type as any,
      experienceLevel: experienceLevel as any,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      location,
      deadline,
      description,
      responsibilities,
      requirements,
      skills,
      benefits,
      status: status,
      department,
      isFeatured: true,
    });

    toast.success(`Job requisition "${title}" ${status === "active" ? "published successfully!" : "saved as draft!"}`);
    router.push("/dashboard/recruiter/jobs");
  };

  return (
    <DashboardLayout
      role="recruiter"
      title="Create New Job Requisition"
      subtitle="Define role specifications, qualifications, and publish to tech candidates."
      actions={
        <button
          type="button"
          onClick={() => setIsAiModalOpen(true)}
          className="flex items-center gap-1.5 rounded-xl border border-violet-200 bg-violet-50 px-3.5 py-2 text-xs font-semibold text-violet-700 hover:bg-violet-100 dark:border-violet-850 dark:bg-violet-950/60 dark:text-violet-300 transition"
        >
          <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          <span>AI Description Generator</span>
        </button>
      }
    >
      <div className="max-w-4xl space-y-8">
        {/* Basic Information */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Core Position Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Architect"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-violet-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Job Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
              >
                {JOB_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Department / Team
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Core Infrastructure"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Work Mode
              </label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
              >
                {WORK_MODES.filter((w) => w.value !== "all").map((w) => (
                  <option key={w.value} value={w.value}>
                    {w.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Job Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
              >
                {JOB_TYPES.filter((t) => t.value !== "all").map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Experience Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
              >
                {EXPERIENCE_LEVELS.filter((e) => e.value !== "all").map((e) => (
                  <option key={e.value} value={e.value}>
                    {e.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Location Details
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA (or Remote US)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Compensation & Deadlines */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Salary Band & Requisition Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Salary Min ($ USD)
              </label>
              <input
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Salary Max ($ USD)
              </label>
              <input
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Application Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Job Description & AI Assistant */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Job Description & Overview
            </h3>
            <button
              type="button"
              onClick={() => setIsAiModalOpen(true)}
              className="text-xs font-semibold text-violet-600 hover:underline flex items-center gap-1 dark:text-violet-400"
            >
              <Sparkles className="h-3.5 w-3.5" /> AI Enhance
            </button>
          </div>

          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-900 focus:border-violet-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-white leading-relaxed"
          />
        </div>

        {/* Required Skills */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Required Technical Proficiencies
          </h3>
          <div className="flex flex-wrap gap-2 pt-1">
            {skills.map((s) => (
              <span
                key={s}
                className="flex items-center gap-1.5 rounded-xl border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/60 dark:text-violet-300"
              >
                <span>{s}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(s)}
                  className="hover:text-rose-600"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 max-w-sm pt-2">
            <input
              type="text"
              placeholder="Add skill (e.g. Terraform, Next.js)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs focus:outline-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
            >
              Add
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800">
          <button
            type="button"
            onClick={() => handleSubmit("draft")}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit("active")}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-600/20 hover:bg-violet-700 active:scale-95 transition"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Publish Job Requisition</span>
          </button>
        </div>
      </div>

      {/* AI Job Description Generator Modal */}
      <Modal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        title={
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400">
            <Sparkles className="h-5 w-5" />
            <span>AI Job Description Generator</span>
          </div>
        }
        description="Automatically craft an enterprise-grade job specification, responsibilities, and skill requirements based on your role title."
      >
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Position Title & Context
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="rounded-xl bg-violet-50 p-3 text-xs text-violet-900 dark:bg-violet-950/40 dark:text-violet-200">
            <p className="font-semibold mb-1">AI Assistant will generate:</p>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-violet-800/90 dark:text-violet-300/90">
              <li>High-converting executive summary for candidate attraction</li>
              <li>4 concrete engineering responsibilities aligned with the role</li>
              <li>Required technical competencies and stack keywords</li>
            </ul>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAiModalOpen(false)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAiGenerate}
              disabled={aiGenerating}
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-violet-700 disabled:opacity-70"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>{aiGenerating ? "Generating Specs..." : "Generate & Apply"}</span>
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

