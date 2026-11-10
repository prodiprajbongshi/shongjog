"use client";

import React from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import { RelativeTime } from "@/components/ui/RelativeTime";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useAppStore } from "@/stores/useAppStore";
import { formatCurrency } from "@/lib/utils";
import {
  Briefcase,
  Users,
  CheckCircle2,
  Calendar,
  PlusCircle,
  ArrowRight,
  GitPullRequest,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const hiringData = [
  { stage: "Applied", candidates: 48 },
  { stage: "Screening", candidates: 26 },
  { stage: "Shortlist", candidates: 18 },
  { stage: "Interview", candidates: 9 },
  { stage: "Offer", candidates: 4 },
  { stage: "Hired", candidates: 2 },
];

export default function RecruiterDashboard() {
  const { jobs, applications, interviews, currentUser } = useAppStore();

  const activeJobs = jobs.filter((j) => j.status === "active").length;
  const totalApplicants = applications.length;
  const shortlisted = applications.filter((a) =>
    ["shortlisted", "interview", "offer", "hired"].includes(a.status)
  ).length;
  const scheduledInterviews = interviews.filter((i) => i.status === "scheduled").length;

  const recentApplicants = applications.slice(0, 5);
  const recentJobs = jobs.slice(0, 4);

  return (
    <DashboardLayout
      role="recruiter"
      title="Recruiter Command Center"
      subtitle="Overview of your active tech job openings, candidate pipeline, and interview calendar."
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/recruiter/pipeline"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-800  px-3.5 py-2 text-xs font-semibold text-slate-700   dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            <GitPullRequest className="h-3.5 w-3.5 text-violet-600" />
            <span>Kanban Pipeline</span>
          </Link>
          <Link
            href="/dashboard/recruiter/jobs/create"
            className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-violet-700 transition"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Post New Job</span>
          </Link>
        </div>
      }
    >
      {/* 4 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Active IT Jobs"
          value={activeJobs}
          change="+2 published"
          trend="up"
          subtitle="Open engineering positions"
          icon={Briefcase}
          iconBg="bg-violet-50 dark:bg-violet-950/60"
          iconColor="text-violet-600 dark:text-violet-400"
        />
        <StatCard
          title="Total Applicants"
          value={totalApplicants}
          change="+18% this week"
          trend="up"
          subtitle="Active candidates in funnel"
          icon={Users}
          iconBg="bg-indigo-50 dark:bg-indigo-950/60"
          iconColor="text-indigo-600 dark:text-indigo-400"
        />
        <StatCard
          title="Shortlisted Candidates"
          value={shortlisted}
          change="High quality fit"
          trend="up"
          subtitle="AI score 85%+ qualified"
          icon={CheckCircle2}
          iconBg="bg-emerald-50 dark:bg-emerald-950/60"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
        <StatCard
          title="Scheduled Interviews"
          value={scheduledInterviews}
          change="Next 7 days"
          trend="neutral"
          subtitle="Technical & executive calls"
          icon={Calendar}
          iconBg="bg-amber-50 dark:bg-amber-950/60"
          iconColor="text-amber-600 dark:text-amber-400"
        />
      </div>

      {/* Main Grid: Pipeline Funnel Chart & Recent Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Pipeline Distribution Chart (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Candidate Pipeline Conversion Funnel
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Number of candidates advancing across each recruitment milestone
              </p>
            </div>
            <Link
              href="/dashboard/recruiter/pipeline"
              className="text-xs font-semibold text-violet-600 hover:underline dark:text-violet-400 flex items-center gap-1"
            >
              <span>Interactive Kanban</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hiringData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="stage" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(124, 58, 237, 0.05)" }}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="candidates" fill="#7c3aed" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Job Postings (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Open Vacancies
            </h3>
            <Link
              href="/dashboard/recruiter/jobs"
              className="text-xs font-semibold text-violet-600 hover:underline dark:text-violet-400"
            >
              All &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {recentJobs.map((j) => (
              <div
                key={j.id}
                className="rounded-2xl border border-slate-100 p-3 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0 pr-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {j.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {j.applicantsCount} applicants • {j.workMode}
                    </p>
                  </div>
                  <StatusBadge status={j.status} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applicants Table */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Recent Engineering Candidates
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Applications received and matched by AI Fit Score
            </p>
          </div>
          <Link
            href="/dashboard/recruiter/applicants"
            className="text-xs font-semibold text-violet-600 hover:underline dark:text-violet-400"
          >
            Manage all candidates &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800">
                <th className="pb-3">Candidate</th>
                <th className="pb-3">Applied Position</th>
                <th className="pb-3">Stage</th>
                <th className="pb-3">AI Match</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {recentApplicants.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={app.seekerAvatar}
                        alt={app.seekerName}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          {app.seekerName}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {app.seekerLocation}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {app.jobTitle}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Applied <RelativeTime dateString={app.appliedAt} />
                    </p>
                  </td>
                  <td className="py-3">
                    <StatusBadge status={app.status} size="sm" />
                  </td>
                  <td className="py-3">
                    <span className="font-bold text-violet-600 dark:text-violet-400">
                      {app.matchScore}%
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      href="/dashboard/recruiter/applicants"
                      className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-600 dark:text-slate-200"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
