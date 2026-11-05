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
  FileCheck,
  Calendar,
  Bookmark,
  Sparkles,
  ArrowRight,
  User,
  Clock,
  Video,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { month: "Sep", applications: 2, views: 14 },
  { month: "Oct", applications: 5, views: 28 },
  { month: "Nov", applications: 8, views: 45 },
  { month: "Dec", applications: 6, views: 52 },
  { month: "Jan", applications: 12, views: 88 },
  { month: "Feb", applications: 15, views: 120 },
];

export default function JobSeekerDashboard() {
  const { applications, savedJobIds, interviews, seekerProfile, jobs } = useAppStore();

  const totalApps = applications.length;
  const shortlistedApps = applications.filter((a) =>
    ["shortlisted", "interview", "offer", "hired"].includes(a.status)
  ).length;
  const scheduledInterviews = interviews.filter((i) => i.status === "scheduled").length;
  const savedCount = savedJobIds.length;

  const upcomingInterviews = interviews.filter((i) => i.status === "scheduled");
  const recommendedJobs = jobs.slice(0, 3);

  return (
    <DashboardLayout
      role="job_seeker"
      title={`Welcome back, ${seekerProfile.fullName.split(" ")[0]} 👋`}
      subtitle="Here is what's happening with your job applications and upcoming interviews."
      actions={
        <Link
          href="/jobs"
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-700"
        >
          <Briefcase className="h-3.5 w-3.5" />
          <span>Browse Jobs</span>
        </Link>
      }
    >
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Applications"
          value={totalApps}
          change="+3 this month"
          trend="up"
          subtitle="Submitted to top tech firms"
          icon={Briefcase}
          iconBg="bg-indigo-50 dark:bg-indigo-950/60"
          iconColor="text-indigo-600 dark:text-indigo-400"
        />
        <StatCard
          title="Shortlisted / In Review"
          value={shortlistedApps}
          change="80% progression"
          trend="up"
          subtitle="Advancing to hiring managers"
          icon={FileCheck}
          iconBg="bg-purple-50 dark:bg-purple-950/60"
          iconColor="text-purple-600 dark:text-purple-400"
        />
        <StatCard
          title="Interview Invitations"
          value={scheduledInterviews}
          change="Active rounds"
          trend="up"
          subtitle="Upcoming technical & HR calls"
          icon={Calendar}
          iconBg="bg-amber-50 dark:bg-amber-950/60"
          iconColor="text-amber-600 dark:text-amber-400"
        />
        <StatCard
          title="Saved Jobs"
          value={savedCount}
          subtitle="Saved for future apply"
          icon={Bookmark}
          iconBg="bg-emerald-50 dark:bg-emerald-950/60"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
      </div>

      {/* Main Grid: Activity Chart & Profile Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Activity Chart (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Application & Profile Telemetry
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Monthly recruiter profile views vs applications sent
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" /> Views
              </span>
              <span className="flex items-center gap-1.5 text-violet-500 font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-500" /> Applications
              </span>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="appsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#viewsGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#appsGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profile Completion & Quick AI Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Profile Health
              </span>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {seekerProfile.profileCompletion}% Complete
              </span>
            </div>

            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500"
                style={{ width: `${seekerProfile.profileCompletion}%` }}
              />
            </div>

            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Your profile is almost fully optimized for ATS scanners and technical recruiters.
            </p>

            <Link
              href="/dashboard/job-seeker/profile"
              className="mt-4 flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition"
            >
              <User className="h-3.5 w-3.5" />
              <span>Edit Profile Details</span>
            </Link>
          </div>

          {/* AI Resume Score Card */}
          <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 to-purple-50/70 p-5 shadow-xs dark:border-indigo-900/60 dark:from-indigo-950/40 dark:to-purple-950/30">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
                  AI ATS Score: {seekerProfile.resumeAtsScore}/100
                </h4>
                <p className="text-[10px] text-indigo-700/80 dark:text-indigo-300/80">
                  Ranked top 8% for Senior Full Stack roles
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/job-seeker/resume"
              className="mt-3 flex items-center justify-between text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              <span>View Resume Suggestions</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Applications & Upcoming Interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Applications Table (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Recent Applications
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Live statuses across hiring pipelines
              </p>
            </div>
            <Link
              href="/dashboard/job-seeker/applications"
              className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              View all ({applications.length}) &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800">
                  <th className="pb-3">Job & Company</th>
                  <th className="pb-3">Applied Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Match</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {applications.slice(0, 4).map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800 shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={app.companyLogo}
                            alt={app.companyName}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">
                            {app.jobTitle}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {app.companyName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-slate-500 dark:text-slate-400">
                      <RelativeTime dateString={app.appliedAt} />
                    </td>
                    <td className="py-3">
                      <StatusBadge status={app.status} size="sm" />
                    </td>
                    <td className="py-3 text-right">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {app.matchScore}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Interviews Widget (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Upcoming Interviews
            </h3>
            <Link
              href="/dashboard/job-seeker/interviews"
              className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Calendar &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingInterviews.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">
                No interviews scheduled yet.
              </p>
            ) : (
              upcomingInterviews.map((intv) => (
                <div
                  key={intv.id}
                  className="rounded-2xl border border-slate-200/80 p-3.5 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 capitalize">
                        {intv.type} Round
                      </span>
                      <h4 className="mt-1 text-xs font-bold text-slate-900 dark:text-white">
                        {intv.companyName}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {intv.interviewerName} ({intv.interviewerRole})
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200/60 pt-2.5 dark:border-slate-700/60">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {intv.date} @ {intv.time}
                    </span>
                    <a
                      href={intv.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs hover:bg-indigo-700"
                    >
                      <Video className="h-3 w-3" /> Join Call
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
