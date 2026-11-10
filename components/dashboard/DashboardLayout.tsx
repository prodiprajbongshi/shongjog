"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/stores/useAppStore";
import { useSystemPrefersDark } from "@/lib/useSystemPrefersDark";
import type { UserRole } from "@/types";
import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  LayoutDashboard,
  User,
  FileText,
  Bookmark,
  Calendar,
  MessageSquare,
  Settings,
  PlusCircle,
  Users,
  GitPullRequest,
  Building,
  BarChart3,
  Shield,
  Layers,
  FileCheck,
  Bell,
  Sun,
  Moon,
  LogOut,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function DashboardLayout({
  children,
  role,
  title,
  subtitle,
  actions,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    currentUser,
    currentRole,
    theme,
    toggleTheme,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    applications,
    savedJobIds,
    interviews,
  } = useAppStore();
  const systemPrefersDark = useSystemPrefersDark();
  const isDark = theme === "dark" || (theme === "system" && systemPrefersDark);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read);

  // Define sidebar navigation items based on current role
  const seekerNavItems: NavItem[] = [
    { label: "Overview", href: "/dashboard/job-seeker", icon: LayoutDashboard },
    {
      label: "Profile Builder",
      href: "/dashboard/job-seeker/profile",
      icon: User,
    },
    {
      label: "Resume & ATS",
      href: "/dashboard/job-seeker/resume",
      icon: FileText,
    },
    {
      label: "Applications",
      href: "/dashboard/job-seeker/applications",
      icon: Briefcase,
      badge: applications.length,
    },
    {
      label: "Saved Jobs",
      href: "/dashboard/job-seeker/saved-jobs",
      icon: Bookmark,
      badge: savedJobIds.length,
    },
    {
      label: "Interviews",
      href: "/dashboard/job-seeker/interviews",
      icon: Calendar,
      badge:
        interviews.filter((i) => i.status === "scheduled").length || undefined,
    },
    {
      label: "AI Interview Prep",
      href: "/dashboard/job-seeker/interview-prep",
      icon: Sparkles,
    },
    {
      label: "Messages",
      href: "/dashboard/job-seeker/messages",
      icon: MessageSquare,
    },
    {
      label: "Settings",
      href: "/dashboard/job-seeker/settings",
      icon: Settings,
    },
  ];

  const recruiterNavItems: NavItem[] = [
    { label: "Overview", href: "/dashboard/recruiter", icon: LayoutDashboard },
    {
      label: "Manage Jobs",
      href: "/dashboard/recruiter/jobs",
      icon: Briefcase,
    },
    {
      label: "Post New Job",
      href: "/dashboard/recruiter/jobs/create",
      icon: PlusCircle,
    },
    {
      label: "Applicant Directory",
      href: "/dashboard/recruiter/applicants",
      icon: Users,
      badge: applications.length,
    },
    {
      label: "Hiring Pipeline",
      href: "/dashboard/recruiter/pipeline",
      icon: GitPullRequest,
    },
    {
      label: "Interviews",
      href: "/dashboard/recruiter/interviews",
      icon: Calendar,
      badge: interviews.length,
    },
    {
      label: "Company Profile",
      href: "/dashboard/recruiter/company",
      icon: Building,
    },
    {
      label: "Hiring Analytics",
      href: "/dashboard/recruiter/analytics",
      icon: BarChart3,
    },
    {
      label: "Settings",
      href: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ];

  const adminNavItems: NavItem[] = [
    {
      label: "System Overview",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    {
      label: "Company Verification",
      href: "/dashboard/admin/companies",
      icon: Building,
    },
    { label: "Job Approvals", href: "/dashboard/admin/jobs", icon: FileCheck },
    {
      label: "Categories & Skills",
      href: "/dashboard/admin/categories",
      icon: Layers,
    },
    {
      label: "Platform Analytics",
      href: "/dashboard/admin/analytics",
      icon: BarChart3,
    },
    { label: "Reports & Logs", href: "/dashboard/admin/reports", icon: Shield },
    {
      label: "Platform Settings",
      href: "/dashboard/admin/settings",
      icon: Settings,
    },
  ];

  const navItems =
    role === "job_seeker"
      ? seekerNavItems
      : role === "recruiter"
        ? recruiterNavItems
        : adminNavItems;

  const roleLabels = {
    job_seeker: {
      name: "Job Seeker Portal",
      badge: "Candidate Workspace",
      color: "indigo",
    },
    recruiter: {
      name: "Recruiter ATS",
      badge: "Employer Workspace",
      color: "violet",
    },
    admin: { name: "Admin Command", badge: "Platform Control", color: "amber" },
  };

  const handleSignOut = () => {
    toast.info("Logged out from dashboard.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="flex md:hidden items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {mobileSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              Shongjog
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Sidebar (Desktop + Mobile Drawer) */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 shrink-0 flex-col border-r border-slate-200/80 bg-white transition-all dark:border-slate-800 dark:bg-slate-900/95 ${
          mobileSidebarOpen ? "flex" : "hidden md:flex"
        }`}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5 dark:border-slate-800/80">
          <Link href="/" className="flex items-center gap-2.5">
            <div>
              <span className="text-base font-black tracking-tight text-slate-900 dark:text-white block leading-none">
                Shongjog
              </span>
              <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                {roleLabels[role].badge}
              </span>
            </div>
          </Link>
        </div>

        {/* Current User Quick Card */}
        <div className="p-3 mx-2 mt-3 rounded-2xl bg-slate-50 border border-slate-150/60 dark:bg-slate-800/50 dark:border-slate-800 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="h-9 w-9 rounded-xl object-cover ring-2 ring-indigo-500/20"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {currentUser.name}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 capitalize truncate">
              {currentUser.role.replace("_", " ")}
            </p>
          </div>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Workspace Navigation
          </p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                    : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`h-4 w-4 transition ${
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-200/70 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom utility */}
        <div className="border-t border-slate-100 p-3 dark:border-slate-800/80 space-y-1">
          <Link
            href="/jobs"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <Briefcase className="h-4 w-4 text-slate-400" />
            <span>Public Job Board</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 transition"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 hidden md:flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-xs font-semibold text-slate-400">
                {roleLabels[role].name}
              </span>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white capitalize">
                {pathname.split("/").pop()?.replace("-", " ") || "Dashboard"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition"
              title="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            {/* Notification Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Bell className="h-4 w-4" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-800 dark:bg-slate-900 z-50 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Notifications
                    </span>
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-[11px] text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="mt-2 space-y-1.5 max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="py-4 text-center text-xs text-slate-400">
                        No notifications
                      </p>
                    ) : (
                      notifications.slice(0, 4).map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`rounded-xl p-2.5 text-xs transition cursor-pointer ${
                            n.read
                              ? "bg-transparent text-slate-500"
                              : "bg-indigo-50/70 font-medium text-slate-800 dark:bg-indigo-950/40 dark:text-slate-200"
                          }`}
                        >
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {n.title}
                          </p>
                          <p className="mt-0.5 text-[11px] line-clamp-2 leading-relaxed">
                            {n.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar / Menu */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-8 w-8 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
              />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden lg:inline">
                {currentUser.name}
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            {(title || actions) && (
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  {title && (
                    <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                      {title}
                    </h1>
                  )}

                  {subtitle && (
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {subtitle}
                    </p>
                  )}
                </div>

                {actions && (
                  <div className="flex items-center gap-2">{actions}</div>
                )}
              </div>
            )}

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
