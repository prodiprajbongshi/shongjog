export type UserRole = "job_seeker" | "recruiter" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  location?: string;
  companyId?: string;
  createdAt: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface JobSeekerProfile {
  id: string;
  userId: string;
  fullName: string;
  title: string;
  bio: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  resumeUrl?: string;
  resumeName?: string;
  resumeLastUpdated?: string;
  resumeAtsScore?: number;
  profileCompletion: number;
  expectedSalaryMin?: number;
  expectedSalaryMax?: number;
  noticePeriod?: string;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  logo: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  description: string;
  founded: number;
  techStack: string[];
  verified: boolean;
  benefits: string[];
  featured?: boolean;
  rating: number;
  reviewsCount: number;
  openPositionsCount: number;
  bannerImage?: string;
}

export type JobType = "full_time" | "part_time" | "contract" | "internship";
export type WorkMode = "remote" | "hybrid" | "onsite";
export type ExperienceLevel = "entry" | "mid" | "senior" | "lead" | "executive";
export type JobStatus = "active" | "draft" | "closed" | "pending_approval";

export interface Job {
  id: string;
  title: string;
  slug: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  category: string;
  location: string;
  workMode: WorkMode;
  type: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  status: JobStatus;
  applicantsCount: number;
  viewsCount: number;
  deadline: string;
  postedAt: string;
  isFeatured?: boolean;
  department?: string;
}

export type ApplicationStatus =
  | "applied"
  | "screening"
  | "shortlisted"
  | "interview"
  | "offer"
  | "hired"
  | "rejected";

export interface ApplicationTimelineEvent {
  status: ApplicationStatus;
  title: string;
  date: string;
  note?: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  jobLocation: string;
  jobType: JobType;
  salaryMin: number;
  salaryMax: number;
  seekerId: string;
  seekerName: string;
  seekerEmail: string;
  seekerAvatar: string;
  seekerTitle: string;
  seekerLocation: string;
  seekerSkills: string[];
  resumeUrl: string;
  resumeName: string;
  coverLetter?: string;
  appliedAt: string;
  status: ApplicationStatus;
  matchScore: number;
  rating?: number;
  recruiterNotes?: string;
  timeline: ApplicationTimelineEvent[];
}

export type InterviewType =
  | "technical"
  | "hr"
  | "screening"
  | "final";

export type InterviewStatus =
  | "scheduled"
  | "completed"
  | "cancelled"
  | "rescheduled";

export interface Interview {
  id: string;
  applicationId: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidateAvatar: string;
  interviewerName: string;
  interviewerRole: string;
  type: InterviewType;
  date: string;
  time: string;
  durationMinutes: number;
  meetingLink: string;
  status: InterviewStatus;
  notes?: string;
  feedbackScore?: number;
  feedbackComments?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "application" | "interview" | "system" | "job_alert";
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  openJobsCount: number;
  description: string;
}

export interface FilterState {
  search: string;
  category: string;
  location: string;
  workMode: string;
  jobType: string;
  experienceLevel: string;
  salaryMin: number;
  sortBy: "newest" | "salary_high" | "salary_low" | "relevance";
}

