"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button, buttonStyles } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { useAppStore } from "@/stores/useAppStore";
import { toast } from "sonner";

const highlights = [
  "Pick up where your applications left off",
  "Stay connected to the teams you want to join",
  "Keep every next step in one place",
];

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useAppStore();

  const [email, setEmail] = useState("tanvir.ahmed@example.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email.includes("stripe") || email.includes("recruiter")) {
        setRole("recruiter");
        toast.success("Welcome back, Elena! (Recruiter)");
        router.push("/dashboard/recruiter");
      } else if (email.includes("admin")) {
        setRole("admin");
        toast.success("Welcome back, Admin!");
        router.push("/dashboard/admin");
      } else {
        setRole("job_seeker");
        toast.success("Welcome back, Tanvir! (Job Seeker)");
        router.push("/dashboard/job-seeker");
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -right-32 h-96 w-96 rounded-full bg-violet-400/10 blur-3xl"
      />

      <div className="relative w-full max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-medium text-slate-600 transition-colors hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:text-slate-300 dark:hover:text-indigo-200"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to Shongjog
        </Link>

        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-950/[0.06] lg:min-h-[590px] lg:grid-cols-[1fr_0.92fr] dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <section
            aria-labelledby="welcome-title"
            className="relative isolate hidden overflow-hidden bg-indigo-800 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-12 dark:bg-indigo-950"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full border-[36px] border-white/[0.08]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-20 -z-10 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl"
            />

            <Link href="/" className="inline-flex w-fit flex-col rounded-lg focus-visible:outline-none">
              <span className="flex items-center gap-1 text-2xl font-black tracking-tight">
                Shongjog
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-200">
                Tech recruitment
              </span>
            </Link>

            <div className="max-w-md py-10">
        
              <h1
                id="welcome-title"
                className="mt-7 text-4xl font-bold leading-tight tracking-tight xl:text-5xl"
              >
                Good to see you again.
              </h1>
              <p className="mt-4 text-base leading-7 text-indigo-100">
                Your next opportunity—or your next great hire—is just around the corner.
              </p>

              <ul className="mt-8 space-y-4">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm text-indigo-50">
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 border-t border-white/15 pt-5 text-xs text-indigo-200">
              <ShieldCheck aria-hidden="true" className="h-4 w-4" />
              A clearer, more connected tech hiring experience
            </div>
          </section>

          <section
            aria-labelledby="login-title"
            className="flex items-center justify-center p-6 sm:p-10 lg:p-12"
          >
            <div className="w-full max-w-md">
              <Link href="/" className="inline-flex flex-col rounded-lg lg:hidden">
                <span className="flex items-center gap-1 text-xl font-black tracking-tight text-slate-950 dark:text-white">
                  Shongjog
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                </span>
                <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Tech recruitment
                </span>
              </Link>

              <div className="mt-8 lg:mt-0">
                <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                  Welcome back
                </p>
                <h2
                  id="login-title"
                  className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white"
                >
                  Sign in to Shongjog
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Access your applications, job listings, and hiring workspace.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <TextField
                  id="login-email"
                  label="Email address"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  leadingIcon={Mail}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@company.com"
                />

                <div>
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <label
                      htmlFor="login-password"
                      className="text-xs font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="rounded text-xs font-semibold text-indigo-700 hover:text-indigo-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:text-indigo-300 dark:hover:text-indigo-200"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <LockKeyhole
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      className="min-h-11 w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-12 text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-400 focus-visible:border-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/25 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus-visible:border-indigo-400 dark:focus-visible:ring-indigo-400/25"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff aria-hidden="true" className="h-4 w-4" />
                      ) : (
                        <Eye aria-hidden="true" className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  isLoading={isLoading}
                  className="w-full"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                  {!isLoading && <ArrowRight aria-hidden="true" className="h-4 w-4" />}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                New to Shongjog?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-indigo-700 hover:text-indigo-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:text-indigo-300 dark:hover:text-indigo-200"
                >
                  Create an account
                </Link>
              </p>

              <div className="mt-8 flex items-center justify-center gap-2 border-t border-slate-100 pt-5 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <ShieldCheck aria-hidden="true" className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                Your account, your next move.
              </div>
            </div>
          </section>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
          <span>© 2026 Shongjog</span>
          <Link
            href="/jobs"
            className={buttonStyles({
              variant: "ghost",
              size: "sm",
              className: "min-h-8 px-2 text-xs text-slate-500 dark:text-slate-400",
            })}
          >
            Browse jobs
          </Link>
        </div>
      </div>
    </main>
  );
}
