"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { JOB_CATEGORIES } from "@/lib/constants";
import { Layers, Plus, Trash2, Edit, CheckCircle2 } from "lucide-react";
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
      title="Job Categories & Tech Taxonomies"
      subtitle="Organize job classification trees, technical skills tagging, and search filters."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Categories List (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Active IT Categories ({categories.length})
          </h3>

          <div className="space-y-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {cat.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {cat.openJobsCount} jobs
                  </span>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Delete Category"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Category Form (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 h-fit">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Add New Category
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Create a new tech taxonomy for jobs and seeker skills.
          </p>

          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Distributed Database Eng"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Skills / Description
              </label>
              <input
                type="text"
                placeholder="e.g. Spanner, CockroachDB, Raft"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-amber-600 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-amber-700 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Create Category</span>
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

