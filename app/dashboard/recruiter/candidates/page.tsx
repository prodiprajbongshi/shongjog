"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAppStore } from "@/stores/useAppStore";
import { Search, MapPin, Sparkles, Filter, Mail, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function CandidatesDirectoryPage() {
  const { applications } = useAppStore();
  const [search, setSearch] = useState("");

  const candidates = applications.map((a) => ({
    id: a.seekerId,
    name: a.seekerName,
    title: a.seekerTitle || "Software Engineer",
    avatar: a.seekerAvatar,
    location: a.seekerLocation,
    skills: a.seekerSkills,
    matchScore: a.matchScore,
    lastRole: a.jobTitle,
  }));

  const filteredCandidates = candidates.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout
      role="recruiter"
      title="Talent Search & Candidate Pool"
      subtitle="Search and discover vetted engineering talent across all active applications."
    >
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by skill (e.g. Next.js, Go) or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCandidates.map((c, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-violet-300 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-violet-500/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {c.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {c.title}
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-1 rounded bg-violet-50 px-2 py-0.5 text-[10px] font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                <Sparkles className="h-2.5 w-2.5" /> {c.matchScore}%
              </span>
            </div>

            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <MapPin className="h-3 w-3 text-slate-400" /> {c.location}
            </p>

            <div className="mt-3.5 flex flex-wrap gap-1">
              {c.skills.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
              <span className="text-[11px] text-slate-400">
                Applied for: <strong className="text-slate-700 dark:text-slate-300">{c.lastRole}</strong>
              </span>
              <Link
                href="/dashboard/recruiter/applicants"
                className="font-semibold text-violet-600 hover:underline dark:text-violet-400"
              >
                Review Profile &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

