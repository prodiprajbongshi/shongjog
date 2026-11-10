"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Search, UserRound, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface MockUserItem {
  id: string;
  name: string;
  email: string;
  role: "job_seeker" | "recruiter" | "admin";
  avatar: string;
  status: "active" | "suspended";
  joined: string;
}

const INITIAL_USERS: MockUserItem[] = [
  {
    id: "u-1",
    name: "Tanvir Ahmed",
    email: "tanvir.ahmed@example.com",
    role: "job_seeker",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    status: "active",
    joined: "Jan 15, 2024",
  },
  {
    id: "u-2",
    name: "Elena Rostova",
    email: "elena.recruiter@stripe.com",
    role: "recruiter",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    status: "active",
    joined: "Oct 10, 2023",
  },
  {
    id: "u-3",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@example.com",
    role: "job_seeker",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    status: "active",
    joined: "Feb 02, 2024",
  },
  {
    id: "u-4",
    name: "Marcus Vance",
    email: "marcus.vance@example.com",
    role: "job_seeker",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    status: "active",
    joined: "Feb 05, 2024",
  },
  {
    id: "u-5",
    name: "System Administrator",
    email: "admin@shongjog.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    status: "active",
    joined: "Jan 01, 2023",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<MockUserItem[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roleFilters = [
    { value: "all", label: "Everyone" },
    { value: "job_seeker", label: "Candidates" },
    { value: "recruiter", label: "Recruiters" },
    { value: "admin", label: "Admins" },
  ];

  const toggleUserStatus = (id: string, name: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const next = u.status === "active" ? "suspended" : "active";
          toast.success(`User ${name} is now ${next}.`);
          return { ...u, status: next };
        }
        return u;
      })
    );
  };

  return (
    <DashboardLayout
      role="admin"
      title="People on your platform"
      subtitle="Get to know your members and manage account access when needed."
    >
      <div className="mb-5 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="flex flex-wrap items-center gap-1"
            role="group"
            aria-label="Filter members by role"
          >
            {roleFilters.map(({ value, label }) => {
              const count =
                value === "all"
                  ? users.length
                  : users.filter((user) => user.role === value).length;

              return (
                <button
                  key={value}
                  onClick={() => setRoleFilter(value)}
                  aria-pressed={roleFilter === value}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    roleFilter === value
                      ? "bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
                      : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                  }`}
                >
                  {label}
                  <span className="ml-1.5 text-xs opacity-70">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              aria-label="Search members"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-amber-300 focus:bg-white focus:ring-2 focus:ring-amber-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-amber-700 dark:focus:bg-slate-900 dark:focus:ring-amber-950"
            />
          </div>
        </div>
        <p className="mt-3 px-1 text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
          Showing {filteredUsers.length} of {users.length} {users.length === 1 ? "person" : "people"}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
              <tr className="text-xs font-medium text-slate-500 dark:text-slate-400">
                <th scope="col" className="px-5 py-3.5">Member</th>
                <th scope="col" className="px-4 py-3.5">Role</th>
                <th scope="col" className="px-4 py-3.5">Account</th>
                <th scope="col" className="px-4 py-3.5">Joined</th>
                <th scope="col" className="px-5 py-3.5 text-right">Account access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center">
                    <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      <UserRound className="h-5 w-5" />
                    </span>
                    <p className="mt-3 text-sm font-medium text-slate-800 dark:text-slate-200">
                      No members found
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Try a different name, email, or role.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
                        />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{u.name}</p>
                          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {u.role === "admin" && <ShieldCheck className="h-3.5 w-3.5" />}
                        {u.role === "job_seeker" ? "Candidate" : u.role === "recruiter" ? "Recruiter" : "Admin"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                          u.status === "active"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${u.status === "active" ? "bg-emerald-500" : "bg-rose-500"}`} />
                        {u.status === "active" ? "Active" : "Paused"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-300">{u.joined}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => toggleUserStatus(u.id, u.name)}
                        aria-label={`${u.status === "active" ? "Pause" : "Reactivate"} ${u.name}'s account`}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                          u.status === "active"
                            ? "border-slate-200 text-slate-700 hover:border-rose-300 hover:bg-rose-100 hover:text-rose-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-rose-800 dark:hover:bg-rose-900/50 dark:hover:text-rose-200"
                            : "border-emerald-200 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-900 dark:text-emerald-300 dark:hover:bg-emerald-900/50"
                        }`}
                      >
                        {u.status === "active" ? "Pause account" : "Reactivate"}
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
