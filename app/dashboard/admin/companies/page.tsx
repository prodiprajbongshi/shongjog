"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { MOCK_COMPANIES } from "@/lib/mock-data";
import { Building2, CheckCircle2, XCircle, Search, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState(MOCK_COMPANIES);
  const [search, setSearch] = useState("");

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );

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
      title="Company Verification & Compliance"
      subtitle="Verify employer legitimacy, business registration, and engineering authenticity."
    >
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase text-slate-400">
            <tr>
              <th className="py-3.5 px-5">Company</th>
              <th className="py-3.5 px-4">Industry</th>
              <th className="py-3.5 px-4">Size</th>
              <th className="py-3.5 px-4">Verification</th>
              <th className="py-3.5 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((comp) => (
              <tr key={comp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-5">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={comp.logo}
                      alt={comp.name}
                      className="h-9 w-9 rounded-xl object-contain border p-1"
                    />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        {comp.name}
                        {comp.verified && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                        )}
                      </p>
                      <p className="text-[11px] text-slate-400">{comp.location}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                  {comp.industry}
                </td>
                <td className="py-3 px-4 text-slate-500">{comp.size}</td>
                <td className="py-3 px-4">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      comp.verified
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                    }`}
                  >
                    {comp.verified ? "Verified" : "Pending Review"}
                  </span>
                </td>
                <td className="py-3 px-5 text-right">
                  <button
                    onClick={() => toggleVerification(comp.id, comp.name)}
                    className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
                  >
                    {comp.verified ? "Revoke Badge" : "Grant Verified Badge"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

