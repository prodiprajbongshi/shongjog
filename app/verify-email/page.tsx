"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (index: number, val: string) => {
    if (val.length > 1) val = val[0];
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);

    // auto advance
    if (val && index < 5) {
      const nextInput = document.getElementById(`code-digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Email verified successfully! Welcome.");
    router.push("/dashboard/job-seeker");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md">
              <span className="font-mono text-lg font-black">SJ</span>
            </div>
            <span className="text-xl font-black text-slate-900 dark:text-white">
              Shongjog
            </span>
          </Link>
          <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
            Verify Your Email
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            We sent a 6-digit confirmation code to your email
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 mb-6">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-2">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  id={`code-digit-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  className="h-12 w-11 rounded-xl border border-slate-200 bg-slate-50 text-center text-lg font-bold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              ))}
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700"
            >
              <span>Verify & Continue</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
            Didn't receive the code?{" "}
            <button
              onClick={() => toast.info("New verification code dispatched.")}
              className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Resend Code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

