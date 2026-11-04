"use client";

import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import { Users, Building, Briefcase, Zap, Globe, TrendingUp } from "lucide-react";
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
      title="Platform Macro Analytics"
      subtitle="High-level platform usage, traffic trajectories, and ecosystem metrics."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Monthly Active Visits"
          value="210,000+"
          change="+31.2% MoM"
          trend="up"
          subtitle="Software engineers & recruiters"
          icon={Globe}
          iconBg="bg-amber-50 dark:bg-amber-950/60"
          iconColor="text-amber-600 dark:text-amber-400"
        />
        <StatCard
          title="Daily Application Run Rate"
          value="416"
          change="+18.5%"
          trend="up"
          subtitle="Submissions every 24h"
          icon={Briefcase}
          iconBg="bg-indigo-50 dark:bg-indigo-950/60"
          iconColor="text-indigo-600 dark:text-indigo-400"
        />
        <StatCard
          title="Avg Application Match"
          value="88.7%"
          change="AI Filtered"
          trend="up"
          subtitle="Skill compatibility index"
          icon={Zap}
          iconBg="bg-emerald-50 dark:bg-emerald-950/60"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
        <StatCard
          title="Offer Closure Rate"
          value="94.2%"
          change="Top percentile"
          trend="up"
          subtitle="Candidates accepting offers"
          icon={TrendingUp}
          iconBg="bg-violet-50 dark:bg-violet-950/60"
          iconColor="text-violet-600 dark:text-violet-400"
        />
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          Visitor Engagement vs Applications Growth
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Global platform visits converted to verified candidate submissions
        </p>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={platformTraffic} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
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
                dataKey="visits"
                stroke="#f59e0b"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#trafficGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}

