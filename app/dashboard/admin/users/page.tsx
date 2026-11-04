"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Search, Shield, UserCheck, Trash2, CheckCircle2, XCircle } from "lucide-react";
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
      title="User Accounts Management"
      subtitle="Oversee candidates, recruiters, and administrative permissions."
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          {["all", "job_seeker", "recruiter", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold capitalize transition ${
                roleFilter === r
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {r.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
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
              <th className="py-3.5 px-5">User</th>
              <th className="py-3.5 px-4">Role</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Member Since</th>
              <th className="py-3.5 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-5">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={u.avatar}
                      alt={u.name}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                      <p className="text-[11px] text-slate-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize dark:bg-slate-800">
                    {u.role.replace("_", " ")}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                      u.status === "active"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                        : "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-500">{u.joined}</td>
                <td className="py-3 px-5 text-right">
                  <button
                    onClick={() => toggleUserStatus(u.id, u.name)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
                  >
                    {u.status === "active" ? "Suspend" : "Activate"}
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

