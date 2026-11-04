"use client";

import React from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useAppStore } from "@/stores/useAppStore";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import {
  ShieldAlert,
  Users,
  Building,
  Briefcase,
  FileCheck,
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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
    toast.success(`Job approved and published to public directory: "${title}"`);
  };

  const handleReject = (id: string, title: string) => {
    updateJob(id, { status: "closed" });
    toast.info(`Job rejected: "${title}"`);
  };

  return (
    <DashboardLayout
      role="admin"
      title="Platform Governance & Command"
      subtitle="Global telemetry, user verification, job approval queue, and system health."
    >
      {/* 4 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Registered Users"
          value={totalUsers.toLocaleString()}
          change="+14.8% MoM"
          trend="up"
          subtitle="9,200 engineers • 3,340 recruiters"
          icon={Users}
          iconBg="bg-amber-50 dark:bg-amber-950/60"
          iconColor="text-amber-600 dark:text-amber-400"
        />
        <StatCard
          title="Verified Tech Companies"
          value={totalCompanies}
          change="+32 verified this mo"
          trend="up"
          subtitle="Global software & IT organizations"
          icon={Building}
          iconBg="bg-indigo-50 dark:bg-indigo-950/60"
          iconColor="text-indigo-600 dark:text-indigo-400"
        />
        <StatCard
          title="Total Job Requisitions"
          value={totalJobs}
          change="Verified salaries"
          trend="up"
          subtitle="Across 10 tech domains"
          icon={Briefcase}
          iconBg="bg-violet-50 dark:bg-violet-950/60"
          iconColor="text-violet-600 dark:text-violet-400"
        />
        <StatCard
          title="Applications Processed"
          value={totalApplications}
          change="94% match rate"
          trend="up"
          subtitle="Active pipeline submissions"
          icon={FileCheck}
          iconBg="bg-emerald-50 dark:bg-emerald-950/60"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
      </div>

      {/* Main Grid: User & Job Growth Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-8 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Platform Scale & Acquisition Velocity
              </h3>
              <p className="text-xs text-slate-500">
                Monthly registered tech candidates vs verified job listings
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-amber-600 font-medium">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> Users
              </span>
              <span className="flex items-center gap-1.5 text-indigo-600 font-medium">
                <span className="h-2 w-2 rounded-full bg-indigo-500" /> Jobs
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="jobs"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Health Card (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Security & System Integrity
          </h3>

          <div className="space-y-3 pt-2">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-xs text-emerald-950 dark:border-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <div>
                  <strong className="block font-semibold">AI Match Engine: Healthy</strong>
                  Latency: 120ms • 99.98% uptime
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-3.5 text-xs text-indigo-950 dark:border-indigo-950 dark:bg-indigo-950/40 dark:text-indigo-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                <div>
                  <strong className="block font-semibold">ATS Parser: Online</strong>
                  Processed 1,420 resumes today
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <span>Database Sync</span>
                <span className="font-mono text-emerald-600 font-bold">PostgreSQL Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Moderation Queue Table */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Recent Job Postings Moderation Queue
            </h3>
            <p className="text-xs text-slate-500">
              Verify employer specifications and compliance before syndication
            </p>
          </div>
          <Link
            href="/dashboard/admin/jobs"
            className="text-xs font-semibold text-amber-600 hover:underline dark:text-amber-400"
          >
            Manage all jobs &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800">
                <th className="pb-3">Company & Job</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Salary Band</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {jobs.slice(0, 5).map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={job.companyLogo}
                        alt={job.companyName}
                        className="h-8 w-8 rounded-lg object-contain border p-0.5"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          {job.title}
                        </p>
                        <p className="text-[11px] text-slate-500">{job.companyName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">
                    {job.category}
                  </td>
                  <td className="py-3 font-semibold text-emerald-600">
                    {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
                  </td>
                  <td className="py-3">
                    <StatusBadge status={job.status} size="sm" />
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleApprove(job.id, job.title)}
                        className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(job.id, job.title)}
                        className="rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:bg-rose-950 dark:text-rose-300"
                      >
                        Reject
                      </button>
                    </div>
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

