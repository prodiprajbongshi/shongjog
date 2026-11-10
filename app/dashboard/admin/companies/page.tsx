"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { MOCK_COMPANIES } from "@/lib/mock-data";
import { Building2, CheckCircle2, Search } from "lucide-react";
import { toast } from "sonner";

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState(MOCK_COMPANIES);
  const [search, setSearch] = useState("");

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase())
  );
  const verifiedCount = companies.filter((company) => company.verified).length;
  const pendingCount = companies.length - verifiedCount;

  const toggleVerification = (id: string, name: string) => {
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const next = !c.verified;
          toast.success(`${name} verification status: ${next ? "Verified" : "Unverified"}`);
          return { ...c, verified: next };
        }
        return c;
      })
    );
  };

  return (
    <DashboardLayout
      role="admin"
      title="Get to know the companies here"
      subtitle="Review employer profiles and help candidates know which organizations are verified."
    >
      <div className="mb-5 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              <span><strong className="font-semibold">{verifiedCount}</strong> verified</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
              <Building2 className="h-4 w-4" />
              <span><strong className="font-semibold">{pendingCount}</strong> to review</span>
            </div>
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              aria-label="Search companies by name, industry, or location"
              placeholder="Search name, industry, or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-amber-300 focus:bg-white focus:ring-2 focus:ring-amber-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-amber-700 dark:focus:bg-slate-900 dark:focus:ring-amber-950"
            />
          </div>
        </div>
        <p className="mt-3 px-1 text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
          Showing {filtered.length} of {companies.length} {companies.length === 1 ? "company" : "companies"}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
              <tr className="text-xs font-medium text-slate-500 dark:text-slate-400">
                <th scope="col" className="px-5 py-3.5">Company</th>
                <th scope="col" className="px-4 py-3.5">Industry</th>
                <th scope="col" className="px-4 py-3.5">Team size</th>
                <th scope="col" className="px-4 py-3.5">Profile status</th>
                <th scope="col" className="px-5 py-3.5 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center">
                    <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      <Building2 className="h-5 w-5" />
                    </span>
                    <p className="mt-3 text-sm font-medium text-slate-800 dark:text-slate-200">
                      No companies found
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Try searching for a different company, industry, or location.
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((comp) => (
                  <tr key={comp.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={comp.logo}
                          alt={comp.name}
                          className="h-10 w-10 rounded-lg border border-slate-200 bg-white p-1 object-contain dark:border-slate-700 dark:bg-slate-800"
                        />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {comp.name}
                            {comp.verified && (
                              <CheckCircle2 className="ml-1.5 inline h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-label="Verified" />
                            )}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{comp.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-700 dark:text-slate-300">{comp.industry}</td>
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{comp.size}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                          comp.verified
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${comp.verified ? "bg-emerald-500" : "bg-amber-500"}`} />
                        {comp.verified ? "Verified" : "Needs review"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => toggleVerification(comp.id, comp.name)}
                        aria-label={`${comp.verified ? "Remove verification from" : "Verify"} ${comp.name}`}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                          comp.verified
                            ? "border-slate-200 text-slate-700 hover:border-violet-300 hover:bg-violet-100 hover:text-violet-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-violet-800 dark:hover:bg-violet-900/50 dark:hover:text-violet-200"
                            : "border-emerald-200 text-emerald-700 hover:border-violet-300 hover:bg-violet-100 hover:text-violet-800 dark:border-emerald-900 dark:text-emerald-300 dark:hover:border-violet-800 dark:hover:bg-violet-900/50 dark:hover:text-violet-200"
                        }`}
                      >
                        {comp.verified ? "Remove verification" : "Verify company"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
