"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { JOB_CATEGORIES } from "@/lib/constants";
import { Layers, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(JOB_CATEGORIES);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newCat = {
      id: `cat-${Date.now()}`,
      name: newName.trim(),
      slug: newName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      icon: "Terminal",
      openJobsCount: 0,
      description: newDesc.trim() || "Technology engineering specialization",
    };

    setCategories([newCat, ...categories]);
    setNewName("");
    setNewDesc("");
    toast.success(`Category "${newCat.name}" created!`);
  };

  const handleDelete = (id: string, name: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    toast.info(`Category "${name}" removed.`);
  };

  return (
    <DashboardLayout
      role="admin"
      title="Keep job categories organized"
      subtitle="Help people find the right roles by keeping your job categories clear and up to date."
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:col-span-8">
          <div className="mb-5 flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
              <Layers className="h-5 w-5" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Browse categories
                </h3>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {categories.length}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Each category helps candidates discover relevant openings.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {categories.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 px-5 py-10 text-center dark:border-slate-700">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  No categories yet
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Add a category to help organize job listings.
                </p>
              </div>
            ) : categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-slate-700"
              >
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {cat.name}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {cat.description}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                    {cat.openJobsCount} {cat.openJobsCount === 1 ? "job" : "jobs"}
                  </span>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    aria-label={`Remove ${cat.name} category`}
                    className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400 cursor-pointer"
                    title="Remove category"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:col-span-4">
          <div className="mb-5 flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
              <Plus className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Add a category
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Give it a name and a short description.
              </p>
            </div>
          </div>

          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Category name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Data Engineering"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                What does it cover?
              </label>
              <input
                type="text"
                placeholder="A short description or example skills"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-violet-700 dark:focus:ring-violet-950"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add category</span>
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
