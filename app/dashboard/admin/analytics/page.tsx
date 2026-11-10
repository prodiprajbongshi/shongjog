"use client";

import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import { Briefcase, Zap, Globe, TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const platformTraffic = [
  { month: "Sep", visits: 45000, apps: 1200 },
  { month: "Oct", visits: 68000, apps: 2100 },
  { month: "Nov", visits: 92000, apps: 3800 },
  { month: "Dec", visits: 115000, apps: 5400 },
  { month: "Jan", visits: 160000, apps: 8900 },
  { month: "Feb", visits: 210000, apps: 12500 },
];

export default function AdminAnalyticsPage() {
  return (
    <DashboardLayout
      role="admin"
      title="How the platform is growing"
      subtitle="See how people are finding us and turning that interest into applications."
    >
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Monthly visits"
          value="210,000+"
          change="31.2% more this month"
          trend="up"
          subtitle="From candidates and recruiters"
          icon={Globe}
          iconBg="bg-amber-50 dark:bg-amber-950/60"
          iconColor="text-amber-600 dark:text-amber-400"
        />
        <StatCard
          title="Applications each day"
          value="416"
          change="18.5% increase"
          trend="up"
          subtitle="On average"
          icon={Briefcase}
          iconBg="bg-indigo-50 dark:bg-indigo-950/60"
          iconColor="text-indigo-600 dark:text-indigo-400"
        />
        <StatCard
          title="Average skills match"
          value="88.7%"
          change="Strong alignment"
          trend="up"
          subtitle="Across applications"
          icon={Zap}
          iconBg="bg-emerald-50 dark:bg-emerald-950/60"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
        <StatCard
          title="Offers accepted"
          value="94.2%"
          change="A strong close rate"
          trend="up"
          subtitle="Candidates saying yes"
          icon={TrendingUp}
          iconBg="bg-violet-50 dark:bg-violet-950/60"
          iconColor="text-violet-600 dark:text-violet-400"
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Visits and applications over time
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              See how visits translate into people applying for roles.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Visits
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-violet-600" />
              Applications
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={platformTraffic} margin={{ top: 10, right: 4, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="applicationsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="visits" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis yAxisId="applications" orientation="right" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
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
                yAxisId="visits"
                type="monotone"
                dataKey="visits"
                name="Visits"
                stroke="#f59e0b"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#trafficGrad)"
              />
              <Area
                yAxisId="applications"
                type="monotone"
                dataKey="apps"
                name="Applications"
                stroke="#7c3aed"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#applicationsGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
