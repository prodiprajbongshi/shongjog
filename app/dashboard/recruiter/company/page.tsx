"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAppStore } from "@/stores/useAppStore";
import { Building2, Globe, MapPin, Users, Save, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function RecruiterCompanyPage() {
  const [name, setName] = useState("Stripe");
  const [industry, setIndustry] = useState("Fintech & Developer Infrastructure");
  const [size, setSize] = useState("5,000 - 10,000 employees");
  const [location, setLocation] = useState("San Francisco, CA & Remote Worldwide");
  const [website, setWebsite] = useState("https://stripe.com");
  const [description, setDescription] = useState(
    "Stripe is a technology company that builds economic infrastructure for the internet. Businesses of every size—from new startups to public companies—use our software to accept payments and manage their businesses online."
  );
  const [techStack, setTechStack] = useState<string[]>([
    "Ruby",
    "Go",
    "TypeScript",
    "React",
    "AWS",
    "Kafka",
    "PostgreSQL",
  ]);
  const [benefits, setBenefits] = useState<string[]>([
    "Unlimited PTO",
    "Comprehensive Health, Dental & Vision",
    "Home Office Setup Allowance ($2,000)",
    "Annual Learning Budget ($2,500)",
  ]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Company profile details updated!");
  };

  return (
    <DashboardLayout
      role="recruiter"
      title="Company Profile & Employer Branding"
      subtitle="Showcase your engineering culture, tech stack, and benefits to top candidates."
    >
      <form onSubmit={handleSave} className="max-w-4xl space-y-6">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80"
                alt="Logo"
                className="h-full w-full object-contain rounded-xl"
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {name}
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Verified Employer
                </span>
              </h3>
              <p className="text-xs text-slate-500">Public company profile visible on Shongjog</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Industry Sector
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Company Size
              </label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Headquarters & Locations
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Company Overview & Engineering Culture
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-800 dark:text-white leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Primary Engineering Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-violet-700 transition"
          >
            <Save className="h-4 w-4" />
            <span>Update Company Profile</span>
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}

