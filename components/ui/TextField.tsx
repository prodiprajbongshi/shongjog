import { useId, type InputHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
  leadingIcon?: LucideIcon;
}

export function TextField({
  label,
  helperText,
  error,
  leadingIcon: LeadingIcon,
  id,
  className,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;

  return (
    <div className="min-w-0">
      <label
        htmlFor={inputId}
        className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>
      <div className="relative">
        {LeadingIcon && (
          <LeadingIcon
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          />
        )}
        <input
          {...props}
          id={inputId}
          aria-invalid={error ? true : props["aria-invalid"]}
          aria-describedby={
            error || helperText ? descriptionId : props["aria-describedby"]
          }
          className={cn(
            "min-h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500",
            "border-slate-300 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-600",
            "focus-visible:border-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/25 dark:focus-visible:border-indigo-400 dark:focus-visible:ring-indigo-400/25",
            "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60 dark:disabled:bg-slate-900",
            error &&
              "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-600/20 dark:border-red-400",
            LeadingIcon && "pl-10",
            className
          )}
        />
      </div>
      {(error || helperText) && (
        <p
          id={descriptionId}
          className={cn(
            "mt-1.5 text-xs",
            error
              ? "text-red-700 dark:text-red-300"
              : "text-slate-500 dark:text-slate-400"
          )}
        >
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
