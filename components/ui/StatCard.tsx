import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  trend = "up",
  subtitle,
  icon: Icon,
  iconBg = "bg-indigo-50 dark:bg-indigo-950/60",
  iconColor = "text-indigo-600 dark:text-indigo-400",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </p>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl transition",
            iconBg,
            iconColor
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </span>
        {change && (
          <span
            className={cn(
              "inline-flex items-center text-xs font-semibold",
              trend === "up" && "text-emerald-600 dark:text-emerald-400",
              trend === "down" && "text-rose-600 dark:text-rose-400",
              trend === "neutral" && "text-slate-500 dark:text-slate-400"
            )}
          >
            {trend === "up" && <TrendingUp className="mr-0.5 h-3 w-3" />}
            {trend === "down" && <TrendingDown className="mr-0.5 h-3 w-3" />}
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}

