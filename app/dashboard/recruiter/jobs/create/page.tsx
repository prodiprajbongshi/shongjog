"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Modal } from "@/components/ui/Modal";
import { useAppStore } from "@/stores/useAppStore";
import { JOB_CATEGORIES, JOB_TYPES, WORK_MODES, EXPERIENCE_LEVELS } from "@/lib/constants";
import {
  Sparkles,
  Send,
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
      title="Create a job opening"
      subtitle="Tell candidates about the role, the team, and what you’re looking for."
      
    >
      <div className="mx-auto max-w-5xl space-y-5">
        {/* Basic Information */}
        <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              The role
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Start with the essentials so the right people can find this opening.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Job Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-violet-700 dark:focus:ring-violet-950"
              >
                {JOB_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Department / Team
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Core Infrastructure"
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Work Mode
              </label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-violet-700 dark:focus:ring-violet-950"
              >
                {WORK_MODES.filter((w) => w.value !== "all").map((w) => (
                  <option key={w.value} value={w.value}>
                    {w.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Job Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-violet-700 dark:focus:ring-violet-950"
              >
                {JOB_TYPES.filter((t) => t.value !== "all").map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Experience Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-violet-700 dark:focus:ring-violet-950"
              >
                {EXPERIENCE_LEVELS.filter((e) => e.value !== "all").map((e) => (
                  <option key={e.value} value={e.value}>
                    {e.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Location Details
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA (or Remote US)"
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
              />
            </div>
          </div>
        </div>

        {/* Compensation & Deadlines */}
        <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Pay and timing
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              A clear range and deadline help candidates decide if the role is right for them.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Minimum salary (USD)
              </label>
              <input
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Maximum salary (USD)
              </label>
              <input
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Apply by
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
              />
            </div>
          </div>
        </div>

        {/* Job Description & AI Assistant */}
        <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                A little about the work
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Give candidates a genuine feel for what they’ll do and who they’ll work with.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAiModalOpen(true)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-violet-700 transition-colors  bg-violet-800 dark:text-violet-300 dark:hover:bg-violet-700 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" /> Help me write
            </button>
          </div>

          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-label="Job description"
            placeholder="What will this person work on? What’s interesting about the team or the problems they’ll solve?"
            className="w-full rounded-lg border border-slate-200 bg-white p-3.5 text-sm leading-relaxed text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
          />
        </div>

        {/* Required Skills */}
        <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Skills that matter
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Add the skills someone will actually use in this role.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {skills.map((s) => (
              <span
                key={s}
                className="flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/60 dark:text-violet-300"
              >
                <span>{s}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(s)}
                  aria-label={`Remove ${s}`}
                  className="hover:text-rose-600 cursor-pointer"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>

          <div className="flex max-w-sm gap-2 pt-2">
            <input
              type="text"
              placeholder="Add skill (e.g. Terraform, Next.js)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              aria-label="Add a skill"
              className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={() => handleSubmit("draft")}
            className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit("active")}
            className="flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700 cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Publish job</span>
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
            <span>Writing assistant</span>
          </div>
        }
        description="Share a few details about the role and get a first draft you can edit before publishing."
      >
        <div className="space-y-4 pt-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Job title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
            />
          </div>

          <div className="rounded-lg bg-violet-50 p-4 text-sm text-violet-900 dark:bg-violet-950/40 dark:text-violet-200">
            <p className="mb-2 font-medium">Your draft will include</p>
            <ul className="list-inside list-disc space-y-1 text-violet-800/90 dark:text-violet-300/90">
              <li>A role introduction candidates can understand</li>
              <li>Responsibilities tailored to the position</li>
              <li>Relevant experience and skills to look for</li>
            </ul>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAiModalOpen(false)}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAiGenerate}
              disabled={aiGenerating}
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>{aiGenerating ? "Putting a draft together..." : "Create a draft"}</span>
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
