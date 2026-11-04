"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JobCard } from "@/components/ui/JobCard";
import { useAppStore } from "@/stores/useAppStore";
import { JOB_CATEGORIES, JOB_TYPES } from "@/lib/constants";
import { MOCK_COMPANIES } from "@/lib/mock-data";
import {
  Search,
  MapPin,
  Briefcase,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Terminal,
  Code2,
  Cpu,
  Layers,
  Server,
  Cloud,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
} from "lucide-react";

const successStories = [
  {
    quote: "Shongjog eliminated the black-box application mystery. I saw my application move through screening directly to a technical interview at Stripe within 48 hours.",
    author: "Farhan Hossain",
    role: "Staff Infrastructure Engineer",
    company: "Stripe",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
  },
  {
    quote: "As a recruiting leader, the Kanban pipeline and automated AI match score cut our engineering candidate screening time by over 60%. The candidate quality is outstanding.",
    author: "Sarah Lin",
    role: "Head of Tech Talent",
    company: "Vercel",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
  },
  {
    quote: "The built-in ATS resume score analyzer and interview prep questions gave me the exact confidence needed for the executive architecture round.",
    author: "Aditi Roy",
    role: "Lead Cloud Architect",
    company: "Brain Station 23",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
  },
];

export default function HomePage() {
  const router = useRouter();
  const { jobs } = useAppStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [jobTypeQuery, setJobTypeQuery] = useState("all");
  const [activeStory, setActiveStory] = useState(0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    // Leave empty filters out so they don't narrow the results.
    if (searchQuery) params.set("q", searchQuery);
    if (locationQuery) params.set("location", locationQuery);
    if (jobTypeQuery !== "all") params.set("type", jobTypeQuery);
    router.push(`/jobs?${params.toString()}`);
  };

  const featuredJobs = jobs.filter((j) => j.isFeatured).slice(0, 4);
  const recentJobs = jobs.slice(0, 6);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Layout": return Code2;
      case "Server": return Server;
      case "Layers": return Layers;
      case "Cpu": return Cpu;
      case "Cloud": return Cloud;
      default: return Terminal;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1">
        <section className="relative isolate overflow-hidden pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/70 via-slate-50 to-slate-50 dark:from-indigo-950/40 dark:via-slate-950 dark:to-slate-950" />
          <div className="pointer-events-none absolute -right-32 top-12 -z-10 h-80 w-80 rounded-full bg-violet-400/10 blur-3xl sm:right-0" />
          <div className="pointer-events-none absolute -left-40 top-64 -z-10 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-indigo-700 shadow-sm shadow-indigo-950/5 backdrop-blur dark:border-indigo-900/60 dark:bg-slate-900/80 dark:text-indigo-300">
               
              <span>Good people. Great tech teams.</span>
            </div>

            <h1 className="mx-auto mt-7 max-w-5xl text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
              Your next chapter
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                starts in tech.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
              Find a role that fits your skills, or meet the people who can help your team grow. A better tech career can start with one search.
            </p>

            <div className="mx-auto mt-10 max-w-5xl">
              <form
                onSubmit={handleSearch}
                className="rounded-3xl border border-white/80 bg-white/90 p-2 shadow-2xl shadow-indigo-950/10 ring-1 ring-slate-200/70 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/20 dark:ring-slate-800"
              >
                <div className="grid grid-cols-1 gap-1 md:grid-cols-12 md:items-center md:gap-0">
                  <div className="flex items-center gap-3 rounded-2xl px-4 py-3 md:col-span-5 md:border-r md:border-slate-200 dark:md:border-slate-800">
                    <Search className="h-4 w-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      aria-label="Job title, skill, or keyword"
                      placeholder="Role, skill, or keyword (e.g. Next.js, Go, AI)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none dark:text-white"
                    />
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl px-4 py-3 md:col-span-3 md:border-r md:border-slate-200 dark:md:border-slate-800">
                    <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      aria-label="Job location"
                      placeholder="Location or 'Remote'"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none dark:text-white"
                    />
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl px-4 py-3 md:col-span-2">
                    <Briefcase className="h-4 w-4 text-slate-400 shrink-0" />
                    <select
                      aria-label="Job type"
                      value={jobTypeQuery}
                      onChange={(e) => setJobTypeQuery(e.target.value)}
                      className="w-full bg-transparent text-sm text-slate-700 outline-none dark:text-slate-300"
                    >
                      {JOB_TYPES.map((t) => (
                        <option key={t.value} value={t.value} className="dark:bg-slate-900">
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-0"
                    >
                      <Search className="h-4 w-4" />
                      <span>Find a job</span>
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="mr-1 font-medium">Popular searches</span>
                {["Next.js", "Full Stack", "DevOps", "AI / LLM", "Remote US", "Dhaka"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      router.push(`/jobs?q=${encodeURIComponent(tag)}`);
                    }}
                    className="rounded-full border border-slate-200/80 bg-white/70 px-3 py-1.5 text-[11px] font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-5 border-t border-slate-200/70 pt-8 sm:grid-cols-4 sm:gap-4 dark:border-slate-800/70">
              <div className="text-center">
                <p className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-white">12,500+</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Active IT Positions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-white">850+</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Verified Tech Companies</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black tracking-tight text-indigo-600 sm:text-3xl dark:text-indigo-400">94.8%</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Placement Match Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-white">14 Days</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Average Time to Offer</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200/80 bg-white py-16 sm:py-20 dark:border-slate-800/80 dark:bg-slate-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                  Roles worth a closer look
                </div>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                  Find your next opportunity
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Explore roles from teams looking for their next great engineer.
                </p>
              </div>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:border-indigo-200 hover:bg-indigo-50 sm:self-auto dark:border-slate-700 dark:bg-slate-900 dark:text-indigo-300 dark:hover:bg-slate-800"
              >
                <span>View all {jobs.length} jobs</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Use recent listings when there aren't any featured roles yet. */}
              {(featuredJobs.length > 0 ? featuredJobs : recentJobs).map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
                Explore your options
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                Find work in your field
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Discover high-growth engineering domains and specialized roles tailored to your stack.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {JOB_CATEGORIES.slice(0, 8).map((cat) => {
                const Icon = getCategoryIcon(cat.icon);
                return (
                  <Link
                    key={cat.id}
                    href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.02] transition duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-950/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-700 dark:focus-visible:ring-offset-slate-950"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-100 text-indigo-600 transition duration-200 group-hover:scale-105 group-hover:from-indigo-600 group-hover:to-violet-600 group-hover:text-white dark:from-indigo-950/70 dark:to-violet-950/50 dark:text-indigo-400 dark:group-hover:from-indigo-600 dark:group-hover:to-violet-600 dark:group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-base font-bold text-slate-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                      {cat.name}
                    </h3>
                    <p className="mt-1 min-h-5 line-clamp-1 text-sm text-slate-500 dark:text-slate-400">
                      {cat.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5 text-xs font-semibold transition-colors dark:border-slate-800">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-indigo-950/60 dark:group-hover:text-indigo-300">
                        {cat.openJobsCount} open jobs
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200/80 bg-white py-16 sm:py-20 dark:border-slate-800/80 dark:bg-slate-900/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
                  Meet the teams
                </span>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                  Companies building what’s next
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Get to know the engineering teams with open roles right now.
                </p>
              </div>
              <Link
                href="/companies"
                className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:border-indigo-200 hover:bg-indigo-50 sm:self-auto dark:border-slate-700 dark:bg-slate-900 dark:text-indigo-300 dark:hover:bg-slate-800"
              >
                <span>View all companies</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {MOCK_COMPANIES.map((company) => (
                <div
                  key={company.id}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.02] transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-950/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 transition group-hover:border-indigo-200 group-hover:bg-indigo-50/50 dark:border-slate-700 dark:bg-slate-800 dark:group-hover:bg-indigo-950/30">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="h-full w-full object-contain rounded-lg"
                        />
                      </div>
                      <div>
                        <h3 className="flex items-center gap-1.5 text-base font-bold text-slate-900 dark:text-white">
                          {company.name}
                          {company.verified && (
                            <CheckCircle2 aria-label="Verified company" className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
                          )}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {company.industry}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {company.rating}
                    </span>
                  </div>

                  <p className="mt-4 min-h-10 line-clamp-2 text-sm leading-5 text-slate-600 dark:text-slate-400">
                    {company.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {company.techStack.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-slate-200/80 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs dark:border-slate-800">
                    <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                      {company.openPositionsCount} open positions
                    </span>
                    <Link
                      href="/companies"
                      className="inline-flex items-center gap-1 font-semibold text-slate-500 transition group-hover:text-indigo-600 hover:text-indigo-700 dark:text-slate-400 dark:group-hover:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      Company profile <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
                A better way to hire
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                Hiring should feel more human
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Clearer expectations for candidates, and a simpler way for teams to find the right people.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm shadow-slate-900/[0.02] transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-base font-bold text-slate-900 dark:text-white">
                  AI-Powered Match Engine
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed dark:text-slate-400">
                  Deeply parses candidate technical proficiencies, open-source repositories, and company stacks to provide accurate fit scores, eliminating resume spam.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm shadow-slate-900/[0.02] transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-base font-bold text-slate-900 dark:text-white">
                  100% Verified Employers
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed dark:text-slate-400">
                  Every company on Shongjog is verified for legitimate incorporation, real funding, and genuine engineering openings. No ghost job postings.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm shadow-slate-900/[0.02] transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-base font-bold text-slate-900 dark:text-white">
                  Real-time ATS Pipeline
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed dark:text-slate-400">
                  Transparent application tracking with Kanban pipeline stages, automated interview calendar invites, and direct feedback loops.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200/80 bg-slate-100/60 py-16 sm:py-20 dark:border-slate-800/80 dark:bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
                From search to offer
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                Your next move, made simple
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "01", title: "Create Your Profile", desc: "Build a verified developer profile, link GitHub & LinkedIn, and upload your ATS-ready resume." },
                { step: "02", title: "Get AI Matched", desc: "Our algorithm calculates compatibility scores and surfaces jobs matching your exact stack & salary goals." },
                { step: "03", title: "1-Click Direct Apply", desc: "Submit directly to company engineering hiring managers with full status transparency." },
                { step: "04", title: "Interview & Get Hired", desc: "Manage interview links, complete technical rounds, and receive formal offer packages." },
              ].map((item) => (
                <div key={item.step} className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 font-mono text-sm font-black text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-950/60 dark:text-indigo-400 dark:group-hover:bg-indigo-500 dark:group-hover:text-white">
                    {item.step}
                  </span>
                  <h4 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed dark:text-slate-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
                In their own words
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                Better connections make a difference
              </h2>
            </div>

            <div
              aria-roledescription="carousel"
              aria-label="Success stories"
              className="mx-auto max-w-4xl"
            >
              <article
                aria-live="polite"
                className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xl shadow-indigo-950/[0.04] sm:p-10 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-indigo-100/70 blur-3xl dark:bg-indigo-950/50" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-amber-400" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star key={index} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-slate-400">
                      {String(activeStory + 1).padStart(2, "0")} / {String(successStories.length).padStart(2, "0")}
                    </span>
                  </div>

                  <Quote className="mt-7 h-8 w-8 text-indigo-300 dark:text-indigo-700" />
                  <p className="mt-3 min-h-28 text-left text-lg font-medium leading-8 text-slate-800 sm:text-xl dark:text-slate-100">
                    “{successStories[activeStory].quote}”
                  </p>

                  <div className="mt-8 flex flex-col gap-5 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      {/* These profile photos are remote, so use a plain img for now. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={successStories[activeStory].avatar}
                        alt=""
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-900"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {successStories[activeStory].author}
                        </h3>
                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                          {successStories[activeStory].role} ·{" "}
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                            {successStories[activeStory].company}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <div className="flex items-center gap-2" aria-label="Choose a success story">
                        {successStories.map((story, index) => (
                          <button
                            key={story.author}
                            type="button"
                            onClick={() => setActiveStory(index)}
                            aria-label={`Show story from ${story.author}`}
                            aria-current={activeStory === index ? "true" : undefined}
                            className={`h-2.5 rounded-full transition-all ${
                              activeStory === index
                                ? "w-7 bg-indigo-600 dark:bg-indigo-400"
                                : "w-2.5 bg-slate-300 hover:bg-indigo-300 dark:bg-slate-700 dark:hover:bg-indigo-700"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveStory((activeStory - 1 + successStories.length) % successStories.length)
                          }
                          aria-label="Previous success story"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveStory((activeStory + 1) % successStories.length)}
                          aria-label="Next success story"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 p-8 text-white shadow-2xl shadow-indigo-950/20 sm:p-12 lg:p-14">
              <div className="pointer-events-none absolute right-0 top-0 z-0 h-80 w-80 translate-x-1/3 -translate-y-1/3 rounded-full border-[40px] border-white/10" />
              <div className="pointer-events-none absolute bottom-0 right-1/3 z-0 h-80 w-80 translate-y-1/2 rounded-full bg-violet-400/30 blur-3xl" />
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl font-extrabold sm:text-4xl tracking-tight">
                  Ready to accelerate your tech career?
                </h2>
                <p className="mt-3 text-sm text-indigo-100 leading-relaxed">
                  Join thousands of software engineers and high-impact technology firms building the future on Shongjog.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/register"
                    className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-md transition hover:-translate-y-0.5 hover:bg-indigo-50 active:translate-y-0"
                  >
                    Join as Candidate
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-xl border border-white/30 bg-indigo-600/30 px-5 py-3 text-sm font-bold text-white backdrop-blur-xs transition hover:bg-indigo-600/50"
                  >
                    Post Tech Jobs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
