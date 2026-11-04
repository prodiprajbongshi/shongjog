"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAppStore } from "@/stores/useAppStore";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Globe,
  Code2,
  Share2,
  Plus,
  Trash2,
  Save,
  Sparkles,
  GraduationCap,
  Award,
} from "lucide-react";
import { toast } from "sonner";

export default function SeekerProfilePage() {
  const { seekerProfile, updateSeekerProfile } = useAppStore();

  const [fullName, setFullName] = useState(seekerProfile.fullName);
  const [title, setTitle] = useState(seekerProfile.title);
  const [bio, setBio] = useState(seekerProfile.bio);
  const [email, setEmail] = useState(seekerProfile.email);
  const [phone, setPhone] = useState(seekerProfile.phone);
  const [location, setLocation] = useState(seekerProfile.location);
  const [githubUrl, setGithubUrl] = useState(seekerProfile.githubUrl);
  const [linkedinUrl, setLinkedinUrl] = useState(seekerProfile.linkedinUrl);
  const [portfolioUrl, setPortfolioUrl] = useState(seekerProfile.portfolioUrl);
  const [skills, setSkills] = useState<string[]>(seekerProfile.skills);
  const [newSkill, setNewSkill] = useState("");
  const [experience, setExperience] = useState(seekerProfile.experience);
  const [education, setEducation] = useState(seekerProfile.education);
  const [certifications, setCertifications] = useState(seekerProfile.certifications);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: "New Company",
      role: "Software Engineer",
      location: "Remote",
      startDate: "2023",
      endDate: "Present",
      current: true,
      description: "Implemented high-performance features and collaborated with product teams.",
    };
    setExperience([newExp, ...experience]);
  };

  const handleRemoveExperience = (id: string) => {
    setExperience(experience.filter((e) => e.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      updateSeekerProfile({
        fullName,
        title,
        bio,
        email,
        phone,
        location,
        githubUrl,
        linkedinUrl,
        portfolioUrl,
        skills,
        experience,
        education,
        certifications,
        profileCompletion: 98,
      });

      setIsSaving(false);
      toast.success("Profile updated successfully!", {
        description: "Your updated details are now live and synced across your applications.",
      });
    }, 600);
  };

  return (
    <DashboardLayout
      role="job_seeker"
      title="Professional Profile Builder"
      subtitle="Craft your engineering profile to match against top tech vacancies."
    >
      <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
        {/* Basic Information */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={seekerProfile.avatar}
              alt={seekerProfile.fullName}
              className="h-20 w-20 rounded-2xl object-cover ring-4 ring-indigo-500/20"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Profile Photo & Primary Info
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Visible to verified tech recruiters and hiring teams.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Professional Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Location & Relocation Preference
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Dhaka, Bangladesh (Remote Worldwide)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                About Me / Executive Bio
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Technical Skills & Tools
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Used by the AI Match Engine to calculate your job compatibility score.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/80 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/60 dark:text-indigo-300"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="rounded hover:text-rose-600"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 max-w-sm pt-2">
            <input
              type="text"
              placeholder="Add skill (e.g. Rust, Kafka, GraphQL)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900"
            >
              Add
            </button>
          </div>
        </div>

        {/* Work Experience */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Work Experience
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detail your engineering roles and measurable technical achievements.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddExperience}
              className="flex items-center gap-1 rounded-xl bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300"
            >
              <Plus className="h-3.5 w-3.5" /> Add Experience
            </button>
          </div>

          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div
                key={exp.id}
                className="relative rounded-2xl border border-slate-200/80 p-4 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30"
              >
                <button
                  type="button"
                  onClick={() => handleRemoveExperience(exp.id)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400">Role</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => {
                        const copy = [...experience];
                        copy[idx].role = e.target.value;
                        setExperience(copy);
                      }}
                      className="w-full font-bold text-xs bg-transparent border-b border-slate-200 dark:border-slate-700 py-1"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const copy = [...experience];
                        copy[idx].company = e.target.value;
                        setExperience(copy);
                      }}
                      className="w-full font-bold text-xs bg-transparent border-b border-slate-200 dark:border-slate-700 py-1"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Description</label>
                  <textarea
                    rows={2}
                    value={exp.description}
                    onChange={(e) => {
                      const copy = [...experience];
                      copy[idx].description = e.target.value;
                      setExperience(copy);
                    }}
                    className="w-full text-xs bg-transparent border border-slate-200 dark:border-slate-750 rounded-lg p-2 mt-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links & Social */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Developer Links & Portfolio
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Code2 className="h-3.5 w-3.5 text-indigo-600" /> GitHub Profile
              </label>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Share2 className="h-3.5 w-3.5 text-indigo-600" /> LinkedIn Profile
              </label>
              <input
                type="text"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" /> Portfolio Website
              </label>
              <input
                type="text"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-800/60 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-95 disabled:opacity-70"
          >
            <Save className="h-4 w-4" />
            <span>{isSaving ? "Saving..." : "Save Profile Changes"}</span>
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}
