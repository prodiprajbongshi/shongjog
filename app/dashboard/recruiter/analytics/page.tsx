"use client";

import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import {
  Clock,
  CheckCircle2,
  Users,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const monthlyVolume = [
  { month: "Sep", applications: 35, hires: 2 },
  { month: "Oct", applications: 58, hires: 4 },
  { month: "Nov", applications: 72, hires: 5 },
  { month: "Dec", applications: 64, hires: 3 },
  { month: "Jan", applications: 95, hires: 7 },
  { month: "Feb", applications: 110, hires: 8 },
];

const sourceDistribution = [
  { source: "AI Job Match", share: 44 },
  { source: "Direct Search", share: 26 },
  { source: "Tech Communities", share: 18 },
  { source: "Employee Referrals", share: 12 },
];

const sourceColors = [
  "bg-violet-500",
  "bg-blue-500",
  "bg-amber-500",
  "bg-emerald-500",
] as const;

export default function RecruiterAnalyticsPage() {
  return (
    <DashboardLayout
      role="recruiter"
      title="How hiring is going"
      subtitle="A clearer picture of your applicants, hiring pace, and where great candidates are finding you."
    >
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Time to hire"
          value="14.2 days"
          change="3.5 days faster"
          trend="up"
          subtitle="From application to accepted offer"
          icon={Clock}
          iconBg="bg-violet-50 dark:bg-violet-950/60"
          iconColor="text-violet-600 dark:text-violet-400"
        />
        <StatCard
          title="Offers accepted"
          value="91.4%"
          change="4.2% higher this quarter"
          trend="up"
          subtitle="Candidates saying yes"
          icon={CheckCircle2}
          iconBg="bg-emerald-50 dark:bg-emerald-950/60"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
        <StatCard
          title="Candidates in pipeline"
          value="434"
          change="24% more than last year"
          trend="up"
          subtitle="Screened this quarter"
          icon={Users}
          iconBg="bg-indigo-50 dark:bg-indigo-950/60"
          iconColor="text-indigo-600 dark:text-indigo-400"
        />
        <StatCard
          title="Skills match"
          value="94.8%"
          change="Strong match"
          trend="up"
          subtitle="Passed technical screens"
          icon={Zap}
          iconBg="bg-amber-50 dark:bg-amber-950/60"
          iconColor="text-amber-600 dark:text-amber-400"
        />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:col-span-8">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Applications and hires over time
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                A month-by-month view of candidates coming in and people joining.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-violet-600" />
                Applications
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Hires
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyVolume} margin={{ top: 10, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="hireGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.24} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="applications" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis yAxisId="hires" orientation="right" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "10px",
                    color: "#0f172a",
                    fontSize: "13px",
                  }}
                />
                <Area
                  yAxisId="applications"
                  type="monotone"
                  dataKey="applications"
                  name="Applications"
                  stroke="#7c3aed"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#volGrad)"
                />
                <Area
                  yAxisId="hires"
                  type="monotone"
                  dataKey="hires"
                  name="Hires"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#hireGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:col-span-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Where applicants find you
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Share of applicants by source.
            </p>
          </div>

          <div className="space-y-5 pt-1">
            {sourceDistribution.map((s, index) => (
              <div key={s.source}>
                <div className="mb-2 flex justify-between gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <span>{s.source}</span>
                  <span className="shrink-0 font-semibold text-slate-900 dark:text-white">
                    {s.share}%
                  </span>
                </div>
                <div
                  className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                  role="progressbar"
                  aria-label={`${s.source} applicants`}
                  aria-valuenow={s.share}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={`h-full rounded-full ${sourceColors[index]}`}
                    style={{ width: `${s.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
