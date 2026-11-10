"use client";

import React from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useAppStore } from "@/stores/useAppStore";
import { formatCurrency } from "@/lib/utils";
import {
  Users,
  Building,
  Briefcase,
  FileCheck,
  CheckCircle2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { toast } from "sonner";

const growthData = [
  { month: "Sep", users: 1200, jobs: 450 },
  { month: "Oct", users: 2100, jobs: 620 },
  { month: "Nov", users: 3800, jobs: 940 },
  { month: "Dec", users: 5400, jobs: 1300 },
  { month: "Jan", users: 8900, jobs: 1950 },
  { month: "Feb", users: 12500, jobs: 2800 },
];

export default function AdminDashboard() {
  const { jobs, applications, updateJob } = useAppStore();

  const totalUsers = 12540;
  const totalCompanies = 852;
  const totalJobs = jobs.length;
  const totalApplications = applications.length;

  const pendingJobs = jobs.filter((j) => j.status === "draft" || j.status === "pending_approval");

  const handleApprove = (id: string, title: string) => {
    updateJob(id, { status: "active" });
    toast.success(`"${title}" is approved and now live.`);
  };

  const handleReject = (id: string, title: string) => {
    updateJob(id, { status: "closed" });
    toast.info(`"${title}" was declined.`);
  };

  return (
    <DashboardLayout
      role="admin"
      title="Platform overview"
      subtitle="A quick look at the people, companies, and jobs shaping your community."
    >
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="People in the community"
          value={totalUsers.toLocaleString()}
          change="14.8% more this month"
          trend="up"
          subtitle="9,200 candidates · 3,340 recruiters"
          icon={Users}
          iconBg="bg-amber-50 dark:bg-amber-950/60"
          iconColor="text-amber-600 dark:text-amber-400"
        />
        <StatCard
          title="Verified companies"
          value={totalCompanies}
          change="32 added this month"
          trend="up"
          subtitle="Technology teams around the world"
          icon={Building}
          iconBg="bg-indigo-50 dark:bg-indigo-950/60"
          iconColor="text-indigo-600 dark:text-indigo-400"
        />
        <StatCard
          title="Job openings"
          value={totalJobs}
          change="Across 10 tech categories"
          trend="up"
          subtitle="Listed across the platform"
          icon={Briefcase}
          iconBg="bg-violet-50 dark:bg-violet-950/60"
          iconColor="text-violet-600 dark:text-violet-400"
        />
        <StatCard
          title="Applications received"
          value={totalApplications}
          change="94% skills match"
          trend="up"
          subtitle="Candidates taking the next step"
          icon={FileCheck}
          iconBg="bg-emerald-50 dark:bg-emerald-950/60"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:col-span-8">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Growing the community
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                People joining and job opportunities posted each month.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-amber-700 dark:text-amber-400">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> Users
              </span>
              <span className="flex items-center gap-1.5 font-medium text-indigo-700 dark:text-indigo-400">
                <span className="h-2 w-2 rounded-full bg-indigo-500" /> Jobs
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData} margin={{ top: 10, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="users" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis yAxisId="jobs" orientation="right" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "10px",
                    color: "#0f172a",
                    fontSize: "13px",
                  }}
                />
                <Line
                  yAxisId="users"
                  type="monotone"
                  dataKey="users"
                  name="Users"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#f59e0b" }}
                />
                <Line
                  yAxisId="jobs"
                  type="monotone"
                  dataKey="jobs"
                  name="Jobs"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#4f46e5" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:col-span-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Everything’s running smoothly
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              A quick check on the services behind the scenes.
            </p>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border border-emerald-100 bg-emerald-50/60 p-3.5 text-sm text-emerald-950 dark:border-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <div>
                  <strong className="block font-semibold">AI Match Engine: Healthy</strong>
                  120ms response · 99.98% uptime
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-indigo-100 bg-indigo-50/60 p-3.5 text-sm text-indigo-950 dark:border-indigo-950 dark:bg-indigo-950/40 dark:text-indigo-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                <div>
                  <strong className="block font-semibold">ATS Parser: Online</strong>
                  Processed 1,420 resumes today
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <span>Database Sync</span>
                <span className="font-mono font-semibold text-emerald-600">PostgreSQL active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Jobs waiting for a review
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Take a look at new listings before they go live.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
              {pendingJobs.length} to review
            </span>
            <Link
              href="/dashboard/admin/jobs"
              className="inline-flex items-center gap-1 text-sm font-medium text-violet-700 transition-colors hover:text-violet-800 dark:text-violet-300 dark:hover:text-violet-200"
            >
              See all jobs <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th scope="col" className="pb-3">Company and role</th>
                <th scope="col" className="pb-3">Category</th>
                <th scope="col" className="pb-3">Salary range</th>
                <th scope="col" className="pb-3">Status</th>
                <th scope="col" className="pb-3 text-right">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {pendingJobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      You’re all caught up
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      New job listings that need a review will appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                pendingJobs.slice(0, 5).map((job) => (
                  <tr key={job.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-4">
                      <div className="flex items-center gap-2.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={job.companyLogo}
                          alt={job.companyName}
                          className="h-9 w-9 rounded-lg border border-slate-200 bg-white p-1 object-contain dark:border-slate-700 dark:bg-slate-800"
                        />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {job.title}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                            {job.companyName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-slate-600 dark:text-slate-300">
                      {job.category}
                    </td>
                    <td className="py-4 font-medium text-slate-700 dark:text-slate-300">
                      {formatCurrency(job.salaryMin)} – {formatCurrency(job.salaryMax)}
                    </td>
                    <td className="py-4">
                      <StatusBadge status={job.status} size="sm" />
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleApprove(job.id, job.title)}
                          className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 dark:hover:bg-emerald-900"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(job.id, job.title)}
                          className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-100 dark:bg-rose-950 dark:text-rose-300 dark:hover:bg-rose-900"
                        >
                          Decline
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
    </DashboardLayout>
  );
}
