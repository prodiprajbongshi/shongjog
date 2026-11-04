import React from "react";
import Link from "next/link";
import { JOB_CATEGORIES } from "@/lib/constants";
import { Shield, Sparkles, Globe, MessageSquare, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-slate-200/80 bg-gradient-to-b from-white to-slate-50 text-slate-600 dark:border-slate-800 dark:from-slate-950 dark:to-slate-900/80 dark:text-slate-400">
      <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-500/10" />
      <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-14 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="space-y-5 lg:col-span-2">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                  Shongjog
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 inline-block"></span>
                </span>
                <span className="text-[10px] font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400">
                  Tech Recruitment
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-6 text-justify text-slate-500 dark:text-slate-400">
             Bringing great people and great tech teams together, from the first search to the final offer. We simplify recruitment, connect talented professionals with exciting opportunities, and empower businesses to build exceptional teams.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-900 dark:text-white">
              Tech Roles
            </h4>
            <ul className="space-y-2 text-sm">
              {/* A short list keeps the footer easy to scan. */}
              {JOB_CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                    className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-900 dark:text-white">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/jobs"
                  className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Browse Tech Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Company Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/job-seeker"
                  className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Candidate Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/recruiter"
                  className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Recruiter ATS
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/admin"
                  className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Admin Command
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-900 dark:text-white">
              Company & Trust
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  About Shongjog
                </Link>
              </li>

              <li>
                <a
                  href="#privacy"
                  className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200/80 pt-6 text-xs text-slate-500 dark:border-slate-800/80 dark:text-slate-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Shongjog Technologies Inc. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1 text-[11px]">
            Made for better connections in tech hiring.
          </p>
        </div>
      </div>
    </footer>
  );
}
