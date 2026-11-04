"use client";

import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import {
  BarChart3,
  Clock,
  CheckCircle2,
  Users,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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

export default function RecruiterAnalyticsPage() {
  return (
    <DashboardLayout
      role="recruiter"
      title="Hiring & Talent Analytics"
      subtitle="Comprehensive metrics on candidate acquisition, pipeline velocity, and team time-to-hire."
    >
      {/* 4 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Avg Time-to-Hire"
          value="14.2 Days"
          change="-3.5 days faster"
          trend="up"
          subtitle="From application to signed offer"
          icon={Clock}
          iconBg="bg-violet-50 dark:bg-violet-950/60"
          iconColor="text-violet-600 dark:text-violet-400"
        />
        <StatCard
          title="Offer Acceptance Rate"
          value="91.4%"
          change="+4.2% QoQ"
          trend="up"
          subtitle="Top engineering candidates"
          icon={CheckCircle2}
          iconBg="bg-emerald-50 dark:bg-emerald-950/60"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
        <StatCard
          title="Total Pipeline Volume"
          value="434"
          change="+24% YoY"
          trend="up"
          subtitle="Candidates screened this quarter"
          icon={Users}
          iconBg="bg-indigo-50 dark:bg-indigo-950/60"
          iconColor="text-indigo-600 dark:text-indigo-400"
        />
        <StatCard
          title="AI Match Accuracy"
          value="94.8%"
          change="High retention"
          trend="up"
          subtitle="Passed technical screens"
          icon={Zap}
          iconBg="bg-amber-50 dark:bg-amber-950/60"
          iconColor="text-amber-600 dark:text-amber-400"
        />
      </div>

      {/* Main Grid: Application Volume Over Time */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-8 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Application Growth vs Successful Hires
              </h3>
              <p className="text-xs text-slate-500">
                Monthly trajectory across all open engineering requisitions
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyVolume} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
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
                  dataKey="applications"
                  stroke="#7c3aed"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#volGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Source Breakdown (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Candidate Influx Channel
          </h3>
          <p className="text-xs text-slate-500">
            Breakdown of primary acquisition channels
          </p>

          <div className="space-y-3 pt-2">
            {sourceDistribution.map((s) => (
              <div key={s.source}>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>{s.source}</span>
                  <span className="font-bold text-violet-600 dark:text-violet-400">{s.share}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-violet-600 rounded-full" style={{ width: `${s.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

