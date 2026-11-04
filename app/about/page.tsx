import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Code2, ShieldCheck, Sparkles, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1">
        <section className="relative isolate overflow-hidden border-b border-slate-200/70 py-16 sm:py-24 dark:border-slate-800/80">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-slate-50 to-violet-50/60 dark:from-indigo-950/40 dark:via-slate-950 dark:to-violet-950/20" />
          <div className="pointer-events-none absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl" />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-indigo-700 shadow-sm shadow-indigo-950/5 backdrop-blur dark:border-indigo-900/60 dark:bg-slate-900/80 dark:text-indigo-300">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <span>A little about us</span>
              </div>
              <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl dark:text-white">
                Better connections,
                <span className="block bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                  better tech careers.
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
                Shongjog means <em>connection</em> or <em>bridge</em>. We built
                this platform to make finding a tech role—or the right person
                for your team—a more open and straightforward experience.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                >
                  Explore open roles <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-white hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-900 dark:focus-visible:ring-offset-slate-950"
                >
                  Join the community
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
                What matters to us
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                Hiring with people in mind
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="group rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm shadow-slate-950/[0.03] transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-950/60 dark:text-indigo-400 dark:group-hover:bg-indigo-600 dark:group-hover:text-white">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                  A clearer process
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Candidates deserve to know where they stand. We make it
                  easier to follow an application from the first review through
                  the next steps.
                </p>
              </div>

              <div className="group rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm shadow-slate-950/[0.03] transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white dark:bg-violet-950/60 dark:text-violet-400 dark:group-hover:bg-violet-600 dark:group-hover:text-white">
                  <Code2 className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                  Built around tech
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Skills and real-world experience matter. We help teams look
                  beyond job titles and candidates show the work they can do.
                </p>
              </div>

              <div className="group rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm shadow-slate-950/[0.03] transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950/60 dark:text-emerald-400 dark:group-hover:bg-emerald-600 dark:group-hover:text-white">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                  Trust on both sides
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  A good connection starts with confidence. We focus on genuine
                  opportunities and a process that respects everyone’s time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 p-7 text-white shadow-xl shadow-indigo-950/15 sm:p-10">
              <div className="pointer-events-none absolute -right-16 -top-32 -z-10 h-72 w-72 rounded-full border-[36px] border-white/10" />
              <div className="pointer-events-none absolute -bottom-40 left-1/3 -z-10 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
              <div className="relative">
                <div className="mb-8 max-w-xl">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-200">
                    A growing community
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    Connections that move careers forward
                  </h2>
                </div>
                {/* Keep these figures in sync with the homepage stats. */}
                <div className="grid grid-cols-2 gap-6 border-t border-white/20 pt-7 text-center sm:grid-cols-4">
                  <div>
                    <p className="text-3xl font-black tracking-tight">12,500+</p>
                    <p className="mt-1 text-xs text-indigo-100">IT Jobs Listed</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black tracking-tight">850+</p>
                    <p className="mt-1 text-xs text-indigo-100">
                      Companies Onboarded
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-black tracking-tight">94.8%</p>
                    <p className="mt-1 text-xs text-indigo-100">
                      Hiring Match Accuracy
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-black tracking-tight">14 Days</p>
                    <p className="mt-1 text-xs text-indigo-100">
                      Avg. Time to Offer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm sm:flex-row sm:items-center sm:p-9 dark:border-slate-800 dark:bg-slate-900">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Your next connection starts here.
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Take a look at the roles on offer or create an account to get
                  started.
                </p>
              </div>
              <div className="flex w-full flex-wrap gap-3 sm:w-auto sm:shrink-0">
                <Link
                  href="/jobs"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:flex-none dark:focus-visible:ring-offset-slate-900"
                >
                  Browse jobs <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:flex-none dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
                >
                  Create account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
