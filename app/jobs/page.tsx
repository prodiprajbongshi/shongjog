"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JobCard } from "@/components/ui/JobCard";
import { useAppStore } from "@/stores/useAppStore";
import { JOB_CATEGORIES, JOB_TYPES, WORK_MODES, EXPERIENCE_LEVELS } from "@/lib/constants";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

function JobsContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "all";
  const initialType = searchParams.get("type") || "all";
  const initialLocation = searchParams.get("location") || "";

  const { jobs } = useAppStore();

  // Filter states
  const [search, setSearch] = useState(initialQ);
  const [category, setCategory] = useState(initialCategory);
  const [workMode, setWorkMode] = useState("all");
  const [jobType, setJobType] = useState(initialType);
  const [experience, setExperience] = useState("all");
  const [minSalary, setMinSalary] = useState(0);
  const [sortBy, setSortBy] = useState<"newest" | "salary_high" | "salary_low">("newest");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtered jobs calculation
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search keyword filter
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.companyName.toLowerCase().includes(q);
        const matchesSkills = job.skills.some((s) => s.toLowerCase().includes(q));
        const matchesDesc = job.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesSkills && !matchesDesc) return false;
      }

      // Category filter
      if (category !== "all") {
        if (!job.category.toLowerCase().includes(category.toLowerCase())) return false;
      }

      // Work mode filter
      if (workMode !== "all" && job.workMode !== workMode) {
        return false;
      }

      // Job type filter
      if (jobType !== "all" && job.type !== jobType) {
        return false;
      }

      // Experience level filter
      if (experience !== "all" && job.experienceLevel !== experience) {
        return false;
      }

      // Min salary filter
      if (minSalary > 0 && job.salaryMax < minSalary) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "salary_high") return b.salaryMax - a.salaryMax;
      if (sortBy === "salary_low") return a.salaryMin - b.salaryMin;
      // Default: newest
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });
  }, [jobs, search, category, workMode, jobType, experience, minSalary, sortBy]);

  // Paginated items
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setWorkMode("all");
    setJobType("all");
    setExperience("all");
    setMinSalary(0);
    setSortBy("newest");
    setCurrentPage(1);
  };

  const activeFiltersCount = [
    category !== "all",
    workMode !== "all",
    jobType !== "all",
    experience !== "all",
    minSalary > 0,
    search.trim() !== "",
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header & Search Bar */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Explore IT Positions
                </h1>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Showing {filteredJobs.length} verified tech roles matching your preferences
                </p>
              </div>

              {/* Quick Search Input */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by keyword or stack..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800/80 dark:text-white"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Sort & Mobile filter trigger */}
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/80">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 md:hidden dark:border-slate-700 dark:text-slate-200"
                >
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                </button>

                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1 rounded-xl bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-rose-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-rose-400"
                  >
                    <RotateCcw className="h-3 w-3" /> Clear all
                  </button>
                )}
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 dark:text-slate-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                >
                  <option value="newest">Newest First</option>
                  <option value="salary_high">Highest Salary</option>
                  <option value="salary_low">Lowest Salary</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Grid: Sidebar Filters + Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Filter Sidebar (Desktop) */}
            <aside
              className={`md:col-span-4 lg:col-span-3 space-y-6 ${
                mobileFilterOpen ? "block" : "hidden md:block"
              }`}
            >
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    Filters
                  </h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={resetFilters}
                      className="text-[11px] font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Job Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <option value="all">All Categories</option>
                    {JOB_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Work Mode */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Work Mode
                  </label>
                  <div className="space-y-1.5">
                    {WORK_MODES.map((mode) => (
                      <label
                        key={mode.value}
                        className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="workMode"
                          checked={workMode === mode.value}
                          onChange={() => {
                            setWorkMode(mode.value);
                            setCurrentPage(1);
                          }}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>{mode.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Employment Type
                  </label>
                  <div className="space-y-1.5">
                    {JOB_TYPES.map((t) => (
                      <label
                        key={t.value}
                        className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="jobType"
                          checked={jobType === t.value}
                          onChange={() => {
                            setJobType(t.value);
                            setCurrentPage(1);
                          }}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>{t.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Experience Level
                  </label>
                  <div className="space-y-1.5">
                    {EXPERIENCE_LEVELS.map((exp) => (
                      <label
                        key={exp.value}
                        className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="experience"
                          checked={experience === exp.value}
                          onChange={() => {
                            setExperience(exp.value);
                            setCurrentPage(1);
                          }}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>{exp.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Minimum Salary Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Minimum Salary
                    </label>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      ${minSalary / 1000}k+
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="10000"
                    value={minSalary}
                    onChange={(e) => {
                      setMinSalary(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="w-full accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>$0</span>
                    <span>$100k</span>
                    <span>$200k</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Jobs List (Desktop Col-span 8 or 9) */}
            <div className="md:col-span-8 lg:col-span-9 space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    <Search className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                    No matching positions found
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Try adjusting your keyword, work mode, or category filters to discover more open roles.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-4">
                    {paginatedJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-between border-t border-slate-200/80 pt-4 dark:border-slate-800">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                        {Math.min(currentPage * itemsPerPage, filteredJobs.length)} of{" "}
                        {filteredJobs.length} jobs
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                          Page {currentPage} of {totalPages}
                        </span>
                        <button
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading jobs...</div>}>
      <JobsContent />
    </Suspense>
  );
}

