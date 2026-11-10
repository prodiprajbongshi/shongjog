"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Send, X } from "lucide-react";
import { toast } from "sonner";

export default function InterviewPrepPage() {
  const [question, setQuestion] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question.trim()) return;

    toast.info("Your question is ready", {
      description:
        "A response service is not connected yet, so your question has not been sent.",
    });
  };

  return (
    <DashboardLayout role="job_seeker">
      <div className="mx-auto flex min-h-[65vh] w-full max-w-3xl items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:focus-within:border-indigo-500 dark:focus-within:ring-indigo-950"
        >
          <label className="sr-only" htmlFor="interview-question">
            Ask an interview question
          </label>
          <textarea
            id="interview-question"
            rows={3}
            maxLength={1000}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder="Ask a question about your interview..."
            className="max-h-48 min-h-20 w-full resize-y bg-transparent px-2 py-2 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
          />
          <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-2 dark:border-slate-800">
            <p
              aria-live="polite"
              className="text-[11px] text-slate-400 dark:text-slate-500"
            >
              Enter to send · Shift + Enter for a new line
              <span className="ml-2 tabular-nums">
                {question.length}/1000
              </span>
            </p>
            <div className="flex shrink-0 items-center gap-1">
              {question.length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuestion("")}
                  aria-label="Clear question"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                type="submit"
                disabled={!question.trim()}
                aria-label="Send question"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 dark:disabled:bg-slate-700 dark:disabled:text-slate-500"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
