"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/stores/useAppStore";
import {
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { currentRole, theme, toggleTheme } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Find Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "About", href: "/about" },
  ];

  const dashboardHref =
    currentRole === "job_seeker"
      ? "/dashboard/job-seeker"
      : currentRole === "recruiter"
      ? "/dashboard/recruiter"
      : "/dashboard/admin";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-white/85 shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl transition-colors dark:border-slate-800/80 dark:bg-slate-950/85">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          
          <span className="flex flex-col">
            <span className="flex items-center gap-1 text-2xl tracking-wider font-black  text-slate-900 dark:text-white">
              Shongjog
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-600" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Tech Recruitment
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-1 md:flex dark:border-slate-800/80 dark:bg-slate-900/70">
          {navLinks.map((link) => {
            // Keep nested pages highlighted with their main section.
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(`${link.href}/`));
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-800 dark:text-indigo-300 dark:ring-slate-700"
                    : "text-slate-600 hover:bg-white/80 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <Link
            href={dashboardHref}
            className="ml-1 flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition hover:border-indigo-200 hover:bg-indigo-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Dashboard</span>
            <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold capitalize text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {currentRole.replace("_", " ")}
            </span>
          </Link>

          <Link
            href="/login"
            className="rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 transition hover:text-indigo-700 dark:text-slate-300 dark:hover:text-indigo-300"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-0"
          >
            <span>Get Started</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="animate-fade-in border-b border-slate-200 bg-white px-4 py-4 shadow-lg shadow-slate-900/5 md:hidden dark:border-slate-800 dark:bg-slate-950">
          <nav aria-label="Mobile navigation" className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(`${link.href}/`))
                    ? "page"
                    : undefined
                }
                className={`block rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(`${link.href}/`))
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">
            <Link
              href={dashboardHref}
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-xs font-semibold text-slate-800 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Go to {currentRole.replace("_", " ")} Dashboard
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-xl bg-indigo-600 py-2 text-xs font-semibold text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
