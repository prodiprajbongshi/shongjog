"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Code2,
  Cpu,
  Layers,
  MapPin,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button, buttonStyles } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { JobCard } from "@/components/ui/JobCard";
import { TextField } from "@/components/ui/TextField";
import { JOB_CATEGORIES, JOB_TYPES } from "@/lib/constants";
import { MOCK_COMPANIES } from "@/lib/mock-data";
import { useAppStore } from "@/stores/useAppStore";

const categoryIcons: Record<string, LucideIcon> = {
  Layout: Code2,
  Server,
  Layers,
  Cpu,
  Cloud,
};

const popularSearches = ["Next.js", "Full Stack", "DevOps", "AI / LLM", "Remote US", "Dhaka"];

const stats = [
  { value: "12,500+", label: "Active tech roles" },
  { value: "850+", label: "Verified companies" },
  { value: "94.8%", label: "Placement match rate", highlight: true },
  { value: "14 days", label: "Average time to offer" },
];

const benefits = [
  {
    icon: Sparkles,
    title: "Smarter matches",
    description:
      "Find roles that fit your skills, experience, and goals with relevant recommendations.",
    color: "indigo",
  },
  {
    icon: ShieldCheck,
    title: "Verified employers",
    description:
      "Explore opportunities from teams reviewed for genuine companies and real openings.",
    color: "violet",
  },
  {
    icon: Zap,
    title: "A clearer process",
    description:
      "Keep applications moving with transparent status updates and direct feedback loops.",
    color: "emerald",
  },
];

const steps = [
  {
    number: "01",
    title: "Build your profile",
    description: "Share your experience, skills, and the kind of work you want to do.",
  },
  {
    number: "02",
    title: "Discover a fit",
    description: "Find relevant roles and teams aligned with your strengths and goals.",
  },
  {
    number: "03",
    title: "Apply with confidence",
    description: "Send your application directly and keep track of what happens next.",
  },
  {
    number: "04",
    title: "Move forward",
    description: "Stay connected through interviews, feedback, and the offer stage.",
  },
];

const successStories = [
  {
    quote:
      "Shongjog eliminated the black-box application mystery. I saw my application move through screening directly to a technical interview at Stripe within 48 hours.",
    author: "Farhan Hossain",
    role: "Staff Infrastructure Engineer",
    company: "Stripe",
  },
  {
    quote:
      "As a recruiting leader, the Kanban pipeline and automated AI match score cut our engineering candidate screening time by over 60%. The candidate quality is outstanding.",
    author: "Sarah Lin",
    role: "Head of Tech Talent",
    company: "Vercel",
  },
  {
    quote:
      "The built-in ATS resume score analyzer and interview prep questions gave me the exact confidence needed for the executive architecture round.",
    author: "Aditi Roy",
    role: "Lead Cloud Architect",
    company: "Brain Station 23",
  },
];

const containerClass = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
const cardClass =
  "rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-950/[0.03] transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900";
const sectionHeadingClass =
  "text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white";

export default function HomePage() {
  const router = useRouter();
  const { jobs } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [jobTypeQuery, setJobTypeQuery] = useState("all");
  const [activeStory, setActiveStory] = useState(0);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (locationQuery.trim()) params.set("location", locationQuery.trim());
    if (jobTypeQuery !== "all") params.set("type", jobTypeQuery);
    const query = params.toString();
    router.push(query ? `/jobs?${query}` : "/jobs");
  };

  const featuredJobs = jobs.filter((job) => job.isFeatured).slice(0, 4);
  const recentJobs = jobs.slice(0, 6);
  const visibleJobs = featuredJobs.length > 0 ? featuredJobs : recentJobs;

  const searchForTag = (tag: string) => {
    setSearchQuery(tag);
    router.push(`/jobs?q=${encodeURIComponent(tag)}`);
  };

  const changeStory = (offset: number) => {
    setActiveStory((current) => (current + offset + successStories.length) % successStories.length);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <Navbar />

      <main id="main-content" className="flex-1">
        <section
          aria-labelledby="hero-title"
          className="relative isolate overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-indigo-50/80 via-slate-50 to-slate-50 py-14 sm:py-20 lg:py-24 dark:border-slate-800 dark:from-indigo-950/30 dark:via-slate-950 dark:to-slate-950"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-36 top-8 -z-10 h-80 w-80 rounded-full bg-violet-400/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl"
          />

          <div className={`${containerClass} relative text-center`}>
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3.5 py-2 text-xs font-semibold text-indigo-800 shadow-sm dark:border-indigo-900/80 dark:bg-slate-900/80 dark:text-indigo-200">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-600" />
              Good people. Great tech teams.
            </p>
            <h1
              id="hero-title"
              className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white"
            >
              Your next chapter
              <br className="hidden sm:block" />
              <span className="text-indigo-700 dark:text-indigo-300">
                {" "}starts in tech.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
              Find a role that fits your skills, or meet the people who can help your team grow.
              A better tech career can start with one search.
            </p>

            <form
              onSubmit={handleSearch}
              aria-label="Search technology jobs"
              className="mx-auto mt-9 grid max-w-5xl grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-xl shadow-indigo-950/[0.06] sm:p-5 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.85fr_auto] lg:items-end dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
            >
              <TextField
                label="Role or skill"
                placeholder="e.g. Frontend Engineer, React"
                leadingIcon={Search}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                autoComplete="off"
              />
              <TextField
                label="Location"
                placeholder="City, country, or remote"
                leadingIcon={MapPin}
                value={locationQuery}
                onChange={(event) => setLocationQuery(event.target.value)}
                autoComplete="off"
              />
              <div>
                <label
                  htmlFor="job-type"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  Job type
                </label>
                <select
                  id="job-type"
                  value={jobTypeQuery}
                  onChange={(event) => setJobTypeQuery(event.target.value)}
                  className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-800 hover:border-slate-400 focus-visible:border-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/25 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-slate-600 dark:focus-visible:border-indigo-400 dark:focus-visible:ring-indigo-400/25"
                >
                  {JOB_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit" size="lg" className="w-full lg:min-w-36">
                <Search aria-hidden="true" className="h-4 w-4" />
                Find jobs
              </Button>
            </form>

            <div className="mx-auto mt-5 flex max-w-4xl flex-wrap items-center justify-center gap-2">
              <span className="mr-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                Popular searches
              </span>
              {popularSearches.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => searchForTag(tag)}
                  className="min-h-8 rounded-full border border-slate-200 bg-white/80 px-3 text-xs font-medium text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-200"
                >
                  {tag}
                </button>
              ))}
            </div>

            <dl className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-6 border-t border-slate-200/80 pt-7 sm:grid-cols-4 sm:gap-4 dark:border-slate-800">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <dt className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</dt>
                  <dd
                    className={`mt-1 text-xl font-bold tracking-tight sm:text-2xl ${
                      stat.highlight
                        ? "text-indigo-700 dark:text-indigo-300"
                        : "text-slate-950 dark:text-white"
                    }`}
                  >
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          aria-labelledby="jobs-title"
          className="border-b border-slate-200 bg-white py-14 sm:py-18 dark:border-slate-800 dark:bg-slate-900/40"
        >
          <div className={containerClass}>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700 dark:text-indigo-300">
                  Roles worth a closer look
                </p>
                <h2 id="jobs-title" className={`${sectionHeadingClass} mt-2`}>
                  Find your next opportunity
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Explore roles from teams looking for their next great engineer.
                </p>
              </div>
              <Link
                href="/jobs"
                className={buttonStyles({
                  variant: "outline",
                  size: "md",
                  className: "self-start sm:self-auto",
                })}
              >
                View all {jobs.length} jobs
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            {visibleJobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {visibleJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Search}
                title="No jobs to show yet"
                description="Check back soon or browse all open opportunities."
                className="border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
              />
            )}
          </div>
        </section>

        <section aria-labelledby="categories-title" className="py-14 sm:py-20">
          <div className={containerClass}>
            <div className="mx-auto mb-9 max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700 dark:text-indigo-300">
                Explore your options
              </p>
              <h2 id="categories-title" className={`${sectionHeadingClass} mt-2`}>
                Find work in your field
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Discover growing engineering domains and roles that match your stack.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {JOB_CATEGORIES.slice(0, 8).map((category) => {
                const Icon = categoryIcons[category.icon] ?? Terminal;
                return (
                  <Link
                    key={category.id}
                    href={`/jobs?category=${encodeURIComponent(category.name)}`}
                    className={`${cardClass} group p-5 hover:border-indigo-300 hover:shadow-md dark:hover:border-indigo-800`}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-slate-950 dark:text-white">
                      {category.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-slate-600 dark:text-slate-400">
                      {category.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
                      <span className="font-medium text-slate-600 dark:text-slate-300">
                        {category.openJobsCount} open jobs
                      </span>
                      <ChevronRight
                        aria-hidden="true"
                        className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-700 dark:group-hover:text-indigo-300"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="companies-title"
          className="border-y border-slate-200 bg-white py-14 sm:py-20 dark:border-slate-800 dark:bg-slate-900/40"
        >
          <div className={containerClass}>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700 dark:text-indigo-300">
                  Meet the teams
                </p>
                <h2 id="companies-title" className={`${sectionHeadingClass} mt-2`}>
                  Companies building what&apos;s next
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Get to know the engineering teams with open roles right now.
                </p>
              </div>
              <Link
                href="/companies"
                className={buttonStyles({
                  variant: "outline",
                  size: "md",
                  className: "self-start sm:self-auto",
                })}
              >
                View all companies
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {MOCK_COMPANIES.map((company) => (
                <article
                  key={company.id}
                  className={`${cardClass} p-5 hover:border-indigo-200 hover:shadow-md dark:hover:border-slate-700`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={company.logo}
                          alt={`${company.name} logo`}
                          className="h-full w-full rounded-md object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="flex items-center gap-1.5 truncate text-sm font-semibold text-slate-950 dark:text-white">
                          {company.name}
                          {company.verified && (
                            <>
                              <CheckCircle2
                                aria-hidden="true"
                                className="h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400"
                              />
                              <span className="sr-only">Verified company</span>
                            </>
                          )}
                        </h3>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          {company.industry}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
                      <Star aria-hidden="true" className="h-3 w-3 fill-amber-500 text-amber-500" />
                      {company.rating}
                    </span>
                  </div>
                  <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-slate-600 dark:text-slate-400">
                    {company.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {company.techStack.slice(0, 3).map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      {company.openPositionsCount} open positions
                    </span>
                    <Link
                      href="/companies"
                      className="inline-flex min-h-9 items-center gap-1 text-xs font-semibold text-indigo-700 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-indigo-200"
                    >
                      Company profile
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="benefits-title" className="py-14 sm:py-20">
          <div className={containerClass}>
            <div className="mx-auto mb-9 max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700 dark:text-indigo-300">
                A better way to hire
              </p>
              <h2 id="benefits-title" className={`${sectionHeadingClass} mt-2`}>
                Hiring should feel more human
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Clearer expectations for candidates and a simpler way for teams to find the right people.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {benefits.map(({ icon: Icon, title, description, color }) => (
                <article key={title} className={`${cardClass} p-6`}>
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      color === "emerald"
                        ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                        : color === "violet"
                          ? "bg-violet-50 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300"
                          : "bg-indigo-50 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300"
                    }`}
                  >
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-slate-950 dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="steps-title"
          className="border-y border-slate-200 bg-slate-100/70 py-14 sm:py-20 dark:border-slate-800 dark:bg-slate-900/50"
        >
          <div className={containerClass}>
            <div className="mx-auto mb-9 max-w-xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700 dark:text-indigo-300">
                From search to offer
              </p>
              <h2 id="steps-title" className={`${sectionHeadingClass} mt-2`}>
                Your next move, made simple
              </h2>
            </div>
            <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <li key={step.number} className={`${cardClass} p-5`}>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 font-mono text-xs font-bold text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-200">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-slate-950 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-5 text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="stories-title" className="py-14 sm:py-20">
          <div className={containerClass}>
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700 dark:text-indigo-300">
                In their own words
              </p>
              <h2 id="stories-title" className={`${sectionHeadingClass} mt-2`}>
                Better connections make a difference
              </h2>
            </div>

            <div
              aria-label="Success stories"
              aria-roledescription="carousel"
              className="mx-auto max-w-4xl"
            >
              <article
                aria-live="polite"
                className={`${cardClass} p-6 sm:p-9`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-500" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} aria-hidden="true" className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {String(activeStory + 1).padStart(2, "0")} /{" "}
                    {String(successStories.length).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-6 text-lg font-medium leading-8 text-slate-800 sm:text-xl dark:text-slate-100">
                  “{successStories[activeStory].quote}”
                </p>
                <div className="mt-7 flex flex-col gap-5 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200"
                    >
                      {successStories[activeStory].author
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
                        {successStories[activeStory].author}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                        {successStories[activeStory].role} ·{" "}
                        <span className="font-medium text-indigo-700 dark:text-indigo-300">
                          {successStories[activeStory].company}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <div className="flex items-center gap-2" aria-label="Choose a success story">
                      {successStories.map((story, index) => (
                        <button
                          key={story.author}
                          type="button"
                          onClick={() => setActiveStory(index)}
                          aria-label={`Show story from ${story.author}`}
                          aria-pressed={activeStory === index}
                          className={`h-3 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                            activeStory === index
                              ? "w-7 bg-indigo-700 dark:bg-indigo-300"
                              : "w-3 bg-slate-300 hover:bg-indigo-300 dark:bg-slate-700 dark:hover:bg-indigo-700"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => changeStory(-1)}
                        aria-label="Previous success story"
                        className="h-10 w-10 p-0"
                      >
                        <ChevronLeft aria-hidden="true" className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => changeStory(1)}
                        aria-label="Next success story"
                        className="h-10 w-10 p-0"
                      >
                        <ChevronRight aria-hidden="true" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section aria-labelledby="cta-title" className="pb-14 sm:pb-20">
          <div className={containerClass}>
            <div className="relative isolate overflow-hidden rounded-3xl bg-indigo-800 px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-14 dark:bg-indigo-950">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-32 h-80 w-80 rounded-full border-[36px] border-white/10"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-1/3 h-48 w-48 rounded-full bg-violet-400/20 blur-3xl"
              />
              <div className="relative max-w-2xl">
                <h2 id="cta-title" className="text-2xl font-bold tracking-tight sm:text-4xl">
                  Ready to accelerate your tech career?
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                  Join software professionals and forward-thinking teams building the future on
                  Shongjog.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/register"
                    className={buttonStyles({
                      variant: "outline",
                      size: "lg",
                      className: "border-white bg-white text-indigo-900 hover:bg-indigo-50",
                    })}
                  >
                    Join as a candidate
                  </Link>
                  <Link
                    href="/register"
                    className={buttonStyles({
                      variant: "ghost",
                      size: "lg",
                      className:
                        "border border-white/40 text-white hover:bg-white/10 hover:text-white",
                    })}
                  >
                    Post a tech job
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
