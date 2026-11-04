export const APP_NAME = "Shongjog";
export const APP_TAGLINE = "The Future of Tech Hiring";

export const JOB_CATEGORIES = [
  { id: "frontend", name: "Frontend Development", slug: "frontend", icon: "Layout", openJobsCount: 142, description: "React, Next.js, Vue, Tailwind, TypeScript" },
  { id: "backend", name: "Backend & Systems", slug: "backend", icon: "Server", openJobsCount: 185, description: "Node.js, Go, Python, Java, PostgreSQL, Microservices" },
  { id: "fullstack", name: "Full Stack Engineering", slug: "fullstack", icon: "Layers", openJobsCount: 220, description: "End-to-end web & cloud application engineering" },
  { id: "ai-ml", name: "AI & Machine Learning", slug: "ai-ml", icon: "Cpu", openJobsCount: 96, description: "LLMs, PyTorch, LangChain, Computer Vision, MLOps" },
  { id: "devops-cloud", name: "DevOps & Cloud Infrastructure", slug: "devops-cloud", icon: "Cloud", openJobsCount: 114, description: "AWS, Kubernetes, Terraform, Docker, CI/CD" },
  { id: "mobile", name: "Mobile App Development", slug: "mobile", icon: "Smartphone", openJobsCount: 68, description: "React Native, Flutter, Swift, Kotlin" },
  { id: "cybersecurity", name: "Cybersecurity & InfoSec", slug: "cybersecurity", icon: "ShieldCheck", openJobsCount: 53, description: "AppSec, PenTesting, SOC, Zero Trust Architecture" },
  { id: "ui-ux", name: "Product Design & UI/UX", slug: "ui-ux", icon: "Palette", openJobsCount: 77, description: "Figma, Design Systems, User Research, Prototyping" },
  { id: "data-engineering", name: "Data Engineering & Analytics", slug: "data-engineering", icon: "Database", openJobsCount: 89, description: "Snowflake, Spark, dbt, BigQuery, Kafka" },
  { id: "engineering-mgmt", name: "Engineering Management & Lead", slug: "engineering-mgmt", icon: "Briefcase", openJobsCount: 44, description: "Tech Lead, VP Engineering, Engineering Manager" },
];

export const WORK_MODES = [
  { value: "all", label: "All Work Modes" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "Onsite" },
];

export const JOB_TYPES = [
  { value: "all", label: "All Job Types" },
  { value: "full_time", label: "Full Time" },
  { value: "contract", label: "Contract" },
  { value: "part_time", label: "Part Time" },
  { value: "internship", label: "Internship" },
];

export const EXPERIENCE_LEVELS = [
  { value: "all", label: "All Experience Levels" },
  { value: "entry", label: "Entry Level (0-2 yrs)" },
  { value: "mid", label: "Mid Level (2-5 yrs)" },
  { value: "senior", label: "Senior Level (5-8 yrs)" },
  { value: "lead", label: "Lead / Staff (8+ yrs)" },
  { value: "executive", label: "Director / Executive" },
];

export const PIPELINE_STAGES = [
  { id: "applied", label: "Applied", color: "bg-blue-500", text: "text-blue-700 dark:text-blue-300", bgLight: "bg-blue-50 dark:bg-blue-950/40" },
  { id: "screening", label: "Screening", color: "bg-indigo-500", text: "text-indigo-700 dark:text-indigo-300", bgLight: "bg-indigo-50 dark:bg-indigo-950/40" },
  { id: "shortlisted", label: "Shortlisted", color: "bg-purple-500", text: "text-purple-700 dark:text-purple-300", bgLight: "bg-purple-50 dark:bg-purple-950/40" },
  { id: "interview", label: "Interview", color: "bg-amber-500", text: "text-amber-700 dark:text-amber-300", bgLight: "bg-amber-50 dark:bg-amber-950/40" },
  { id: "offer", label: "Offer", color: "bg-emerald-500", text: "text-emerald-700 dark:text-emerald-300", bgLight: "bg-emerald-50 dark:bg-emerald-950/40" },
  { id: "hired", label: "Hired", color: "bg-teal-500", text: "text-teal-700 dark:text-teal-300", bgLight: "bg-teal-50 dark:bg-teal-950/40" },
  { id: "rejected", label: "Rejected", color: "bg-rose-500", text: "text-rose-700 dark:text-rose-300", bgLight: "bg-rose-50 dark:bg-rose-950/40" },
] as const;

export const INTERVIEW_TYPES = [
  { value: "technical", label: "Technical Interview", icon: "Code2" },
  { value: "hr", label: "HR & Culture Fit", icon: "Users" },
  { value: "screening", label: "Initial Screening", icon: "PhoneCall" },
  { value: "final", label: "Final Executive Round", icon: "Award" },
];

