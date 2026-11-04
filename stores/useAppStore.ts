import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  User,
  UserRole,
  JobSeekerProfile,
  Job,
  Application,
  Interview,
  NotificationItem,
  ApplicationStatus,
} from "@/types";
import {
  MOCK_USERS,
  MOCK_SEEKER_PROFILE,
  MOCK_JOBS,
  MOCK_APPLICATIONS,
  MOCK_INTERVIEWS,
  MOCK_NOTIFICATIONS,
} from "@/lib/mock-data";

interface AppState {
  // Auth & Role
  currentUser: User;
  currentRole: UserRole;
  theme: "light" | "dark";

  // Data
  seekerProfile: JobSeekerProfile;
  jobs: Job[];
  applications: Application[];
  savedJobIds: string[];
  interviews: Interview[];
  notifications: NotificationItem[];

  // Actions
  setRole: (role: UserRole) => void;
  setCurrentUser: (user: User) => void;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;

  // Profile
  updateSeekerProfile: (profile: Partial<JobSeekerProfile>) => void;

  // Jobs
  toggleSaveJob: (jobId: string) => boolean;
  createJob: (job: Partial<Job>) => Job;
  updateJob: (jobId: string, updates: Partial<Job>) => void;
  deleteJob: (jobId: string) => void;

  // Applications
  applyForJob: (
    jobId: string,
    details: {
      coverLetter?: string;
      resumeUrl?: string;
      resumeName?: string;
      skills?: string[];
    }
  ) => Application;
  updateApplicationStatus: (
    applicationId: string,
    newStatus: ApplicationStatus,
    note?: string
  ) => void;
  updateApplicationNotes: (applicationId: string, notes: string) => void;

  // Interviews
  scheduleInterview: (interview: Omit<Interview, "id" | "status">) => Interview;
  updateInterview: (id: string, updates: Partial<Interview>) => void;
  cancelInterview: (id: string) => void;

  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Reset
  resetToMockData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: MOCK_USERS.seeker,
      currentRole: "job_seeker",
      theme: "light",

      seekerProfile: MOCK_SEEKER_PROFILE,
      jobs: MOCK_JOBS,
      applications: MOCK_APPLICATIONS,
      savedJobIds: ["job-1", "job-2"],
      interviews: MOCK_INTERVIEWS,
      notifications: MOCK_NOTIFICATIONS,

      setRole: (role) => {
        const user = MOCK_USERS[role === "job_seeker" ? "seeker" : role === "recruiter" ? "recruiter" : "admin"];
        set({ currentRole: role, currentUser: user });
      },

      setCurrentUser: (user) => set({ currentUser: user, currentRole: user.role }),

      toggleTheme: () =>
        set((state) => {
          const next = state.theme === "light" ? "dark" : "light";
          if (typeof document !== "undefined") {
            if (next === "dark") {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
          }
          return { theme: next };
        }),

      setTheme: (theme) => {
        if (typeof document !== "undefined") {
          if (theme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
        set({ theme });
      },

      updateSeekerProfile: (profileUpdate) =>
        set((state) => ({
          seekerProfile: { ...state.seekerProfile, ...profileUpdate },
        })),

      toggleSaveJob: (jobId) => {
        const { savedJobIds } = get();
        const exists = savedJobIds.includes(jobId);
        const next = exists
          ? savedJobIds.filter((id) => id !== jobId)
          : [...savedJobIds, jobId];
        set({ savedJobIds: next });
        return !exists;
      },

      createJob: (jobData) => {
        const newJob: Job = {
          id: `job-${Date.now()}`,
          title: jobData.title || "Untitled Job",
          slug: (jobData.title || "untitled-job").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          companyId: jobData.companyId || "comp-stripe",
          companyName: jobData.companyName || "Stripe",
          companyLogo: jobData.companyLogo || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80",
          category: jobData.category || "Full Stack Engineering",
          location: jobData.location || "Remote",
          workMode: jobData.workMode || "remote",
          type: jobData.type || "full_time",
          experienceLevel: jobData.experienceLevel || "senior",
          salaryMin: Number(jobData.salaryMin) || 80000,
          salaryMax: Number(jobData.salaryMax) || 130000,
          currency: jobData.currency || "USD",
          description: jobData.description || "",
          responsibilities: jobData.responsibilities || [],
          requirements: jobData.requirements || [],
          skills: jobData.skills || [],
          benefits: jobData.benefits || [],
          status: jobData.status || "active",
          applicantsCount: 0,
          viewsCount: 1,
          deadline: jobData.deadline || "2025-06-30",
          postedAt: new Date().toISOString(),
          isFeatured: jobData.isFeatured || false,
          department: jobData.department || "Engineering",
        };

        set((state) => ({ jobs: [newJob, ...state.jobs] }));
        return newJob;
      },

      updateJob: (jobId, updates) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === jobId ? { ...job, ...updates } : job
          ),
        })),

      deleteJob: (jobId) =>
        set((state) => ({
          jobs: state.jobs.filter((j) => j.id !== jobId),
          applications: state.applications.filter((a) => a.jobId !== jobId),
        })),

      applyForJob: (jobId, details) => {
        const { jobs, seekerProfile, currentUser, applications } = get();
        const targetJob = jobs.find((j) => j.id === jobId);

        // Calculate skill match score
        const jobSkills = targetJob?.skills || [];
        const seekerSkills = seekerProfile.skills || [];
        const matched = jobSkills.filter((s) =>
          seekerSkills.some((sk) => sk.toLowerCase() === s.toLowerCase())
        );
        const matchScore = jobSkills.length > 0
          ? Math.min(100, Math.max(65, Math.round((matched.length / jobSkills.length) * 100) + 15))
          : 85;

        const newApp: Application = {
          id: `app-${Date.now()}`,
          jobId: jobId,
          jobTitle: targetJob?.title || "Role",
          companyId: targetJob?.companyId || "comp-unknown",
          companyName: targetJob?.companyName || "Company",
          companyLogo: targetJob?.companyLogo || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80",
          jobLocation: targetJob?.location || "Remote",
          jobType: targetJob?.type || "full_time",
          salaryMin: targetJob?.salaryMin || 80000,
          salaryMax: targetJob?.salaryMax || 120000,
          seekerId: currentUser.id,
          seekerName: seekerProfile.fullName || currentUser.name,
          seekerEmail: currentUser.email,
          seekerAvatar: seekerProfile.avatar || currentUser.avatar,
          seekerTitle: seekerProfile.title,
          seekerLocation: seekerProfile.location,
          seekerSkills: seekerProfile.skills,
          resumeUrl: details.resumeUrl || seekerProfile.resumeUrl || "/mock-resume.pdf",
          resumeName: details.resumeName || seekerProfile.resumeName || "Resume.pdf",
          coverLetter: details.coverLetter,
          appliedAt: new Date().toISOString(),
          status: "applied",
          matchScore,
          timeline: [
            {
              status: "applied",
              title: "Application Submitted",
              date: new Date().toLocaleString(),
              note: "Application received and placed in review pipeline.",
            },
          ],
        };

        // Increment job applicants count
        set((state) => ({
          applications: [newApp, ...state.applications],
          jobs: state.jobs.map((j) =>
            j.id === jobId ? { ...j, applicantsCount: j.applicantsCount + 1 } : j
          ),
          notifications: [
            {
              id: `notif-${Date.now()}`,
              userId: currentUser.id,
              title: "Application Submitted!",
              message: `You successfully applied for ${targetJob?.title} at ${targetJob?.companyName}.`,
              type: "application",
              read: false,
              createdAt: new Date().toISOString(),
              link: "/dashboard/job-seeker/applications",
            },
            ...state.notifications,
          ],
        }));

        return newApp;
      },

      updateApplicationStatus: (applicationId, newStatus, note) =>
        set((state) => ({
          applications: state.applications.map((app) => {
            if (app.id !== applicationId) return app;
            const updatedTimeline = [
              ...app.timeline,
              {
                status: newStatus,
                title: `Status changed to ${newStatus.toUpperCase()}`,
                date: new Date().toLocaleString(),
                note,
              },
            ];
            return {
              ...app,
              status: newStatus,
              timeline: updatedTimeline,
            };
          }),
        })),

      updateApplicationNotes: (applicationId, notes) =>
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === applicationId ? { ...app, recruiterNotes: notes } : app
          ),
        })),

      scheduleInterview: (interviewData) => {
        const newInterview: Interview = {
          id: `int-${Date.now()}`,
          ...interviewData,
          status: "scheduled",
        };

        set((state) => ({
          interviews: [newInterview, ...state.interviews],
          // update corresponding application status to interview
          applications: state.applications.map((app) => {
            if (app.id === interviewData.applicationId) {
              return {
                ...app,
                status: "interview",
                timeline: [
                  ...app.timeline,
                  {
                    status: "interview",
                    title: `${interviewData.type.toUpperCase()} Interview Scheduled`,
                    date: `${interviewData.date} ${interviewData.time}`,
                    note: `Interviewer: ${interviewData.interviewerName}`,
                  },
                ],
              };
            }
            return app;
          }),
          notifications: [
            {
              id: `notif-${Date.now()}`,
              userId: interviewData.candidateId,
              title: `Interview Scheduled with ${interviewData.companyName}`,
              message: `Your ${interviewData.type} interview has been set for ${interviewData.date} at ${interviewData.time}.`,
              type: "interview",
              read: false,
              createdAt: new Date().toISOString(),
              link: "/dashboard/job-seeker/interviews",
            },
            ...state.notifications,
          ],
        }));

        return newInterview;
      },

      updateInterview: (id, updates) =>
        set((state) => ({
          interviews: state.interviews.map((intv) =>
            intv.id === id ? { ...intv, ...updates } : intv
          ),
        })),

      cancelInterview: (id) =>
        set((state) => ({
          interviews: state.interviews.map((intv) =>
            intv.id === id ? { ...intv, status: "cancelled" } : intv
          ),
        })),

      markNotificationAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAllNotificationsAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      resetToMockData: () =>
        set({
          currentUser: MOCK_USERS.seeker,
          currentRole: "job_seeker",
          seekerProfile: MOCK_SEEKER_PROFILE,
          jobs: MOCK_JOBS,
          applications: MOCK_APPLICATIONS,
          savedJobIds: ["job-1", "job-2"],
          interviews: MOCK_INTERVIEWS,
          notifications: MOCK_NOTIFICATIONS,
        }),
    }),
    {
      name: "shongjog-app-storage",
      partialize: (state) => ({
        currentRole: state.currentRole,
        currentUser: state.currentUser,
        theme: state.theme,
        seekerProfile: state.seekerProfile,
        jobs: state.jobs,
        applications: state.applications,
        savedJobIds: state.savedJobIds,
        interviews: state.interviews,
        notifications: state.notifications,
      }),
    }
  )
);

