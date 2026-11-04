"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MOCK_COMPANIES } from "@/lib/mock-data";
import { useAppStore } from "@/stores/useAppStore";
import {
  Building2,
  Search,
  MapPin,
  Users,
  CheckCircle2,
  Star,
  ExternalLink,
  Briefcase,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function CompaniesPage() {
  const { jobs } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");

  const industries = [
    "all",
    "Fintech & Developer Infrastructure",
    "Cloud & Developer Tooling",
    "Observability & Cloud Monitoring",
    "Super App, Logistics & FinTech",
    "Enterprise Software & Cloud Engineering",
    "Mobile Financial Services (MFS)",
  ];

  const filteredCompanies = MOCK_COMPANIES.filter((comp) => {
    const matchesSearch =
      comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.techStack.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      comp.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry =
      selectedIndustry === "all" || comp.industry === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300">
              <Building2 className="h-3.5 w-3.5" />
              <span>Verified Employers</span>
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Tech Company Directory
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Explore leading global software engineering hubs, startups, and enterprises hiring IT talent.
            </p>

            {/* Search and Industry bar */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by company name, technology, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 shadow-xs focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-700 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                <option value="all">All Industries</option>
                {industries.filter((i) => i !== "all").map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => {
              const openJobs = jobs.filter((j) => j.companyId === company.id);

              return (
                <div
                  key={company.id}
                  className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="h-14 w-14 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="h-full w-full object-contain rounded-xl"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          {company.name}
                          {company.verified && (
                            <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                          )}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {company.industry}
                        </p>
                      </div>
                    </div>

                    <span className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {company.rating}
                    </span>
                  </div>

                  <p className="mt-4 line-clamp-2 text-xs text-slate-600 leading-relaxed dark:text-slate-400">
                    {company.description}
                  </p>

                  <div className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{company.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{company.size}</span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Engineering Stack
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {company.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Open Jobs Link */}
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {openJobs.length || company.openPositionsCount} Open Roles
                    </span>
                    <Link
                      href={`/jobs?q=${encodeURIComponent(company.name)}`}
                      className="flex items-center gap-1 font-semibold text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition"
                    >
                      <span>Explore Jobs</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

