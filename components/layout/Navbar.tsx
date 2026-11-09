"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";
import { buttonStyles } from "@/components/ui/Button";
import { useSystemPrefersDark } from "@/lib/useSystemPrefersDark";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Find jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { currentRole, currentUser, theme, toggleTheme } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const systemPrefersDark = useSystemPrefersDark();
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const accountButtonRef = useRef<HTMLButtonElement>(null);

  const dashboardHref =
    currentRole === "job_seeker"
      ? "/dashboard/job-seeker"
      : currentRole === "recruiter"
        ? "/dashboard/recruiter"
        : "/dashboard/admin";
  const isDark = theme === "dark" || (theme === "system" && systemPrefersDark);
  const initials = currentUser.name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  useEffect(() => {
    if (!mobileMenuOpen && !accountMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (accountMenuOpen) {
        setAccountMenuOpen(false);
        accountButtonRef.current?.focus();
      }
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [accountMenuOpen, mobileMenuOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setAccountMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={closeMenus}
          className="group flex shrink-0 items-center rounded-lg focus-visible:outline-none"
        >
          <span className="flex flex-col">
            <span className="flex items-center gap-1 text-xl font-black tracking-tight text-slate-950 dark:text-white">
              Shongjog
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Tech recruitment
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={buttonStyles({
                variant: isActive(link.href) ? "outline" : "ghost",
                size: "sm",
                className: isActive(link.href)
                  ? "border-slate-200 bg-slate-50 text-indigo-800 shadow-none dark:border-slate-700 dark:bg-slate-800 dark:text-indigo-200"
                  : "text-slate-600 dark:text-slate-300",
              })}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
            className={buttonStyles({
              variant: "outline",
              size: "sm",
              className: "h-10 w-10 p-0",
            })}
          >
            {isDark ? (
              <Sun aria-hidden="true" className="h-4 w-4 text-amber-500" />
            ) : (
              <Moon aria-hidden="true" className="h-4 w-4" />
            )}
          </button>

          <Link
            href={dashboardHref}
            className={buttonStyles({
              variant: "outline",
              size: "sm",
              className: "gap-2",
            })}
          >
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-600" />
            Dashboard
          </Link>

          <div className="relative">
            <button
              ref={accountButtonRef}
              type="button"
              onClick={() => setAccountMenuOpen((open) => !open)}
              aria-label={`Account menu for ${currentUser.name}`}
              aria-expanded={accountMenuOpen}
              aria-controls="account-menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-800 transition-colors hover:bg-indigo-200 dark:bg-indigo-950 dark:text-indigo-200 dark:hover:bg-indigo-900"
            >
              {initials}
            </button>
            {accountMenuOpen && (
              <div
                id="account-menu"
                className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-950/10 dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="border-b border-slate-100 px-3 py-2.5 dark:border-slate-800">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {currentUser.name}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {currentUser.email}
                  </p>
                </div>
                <Link
                  href={dashboardHref}
                  onClick={closeMenus}
                  className={buttonStyles({
                    variant: "ghost",
                    size: "md",
                    className: "mt-1 w-full justify-start",
                  })}
                >
                  Go to dashboard
                </Link>
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className={buttonStyles({
                    variant: "ghost",
                    size: "md",
                    className: "w-full justify-start",
                  })}
                >
                  Sign in to another account
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/register"
            className={buttonStyles({ size: "sm", className: "gap-1.5" })}
          >
            Get started
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className={buttonStyles({
              variant: "outline",
              size: "sm",
              className: "h-10 w-10 p-0",
            })}
          >
            {isDark ? (
              <Sun aria-hidden="true" className="h-4 w-4 text-amber-500" />
            ) : (
              <Moon aria-hidden="true" className="h-4 w-4" />
            )}
          </button>
          <button
            ref={mobileMenuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className={buttonStyles({
              variant: "outline",
              size: "sm",
              className: "h-10 w-10 p-0",
            })}
          >
            {mobileMenuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg shadow-slate-900/5 md:hidden dark:border-slate-800 dark:bg-slate-950"
        >
          <nav aria-label="Mobile navigation" className="mx-auto max-w-7xl space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={buttonStyles({
                  variant: isActive(link.href) ? "outline" : "ghost",
                  size: "md",
                  className: `w-full justify-start ${
                    isActive(link.href)
                      ? "border-indigo-100 bg-indigo-50 text-indigo-800 dark:border-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-200"
                      : ""
                  }`,
                })}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 border-t border-slate-100 pt-3 dark:border-slate-800">
              <p className="px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white">
                {currentUser.name}
              </p>
              <Link
                href={dashboardHref}
                onClick={closeMenus}
                className={buttonStyles({
                  variant: "outline",
                  size: "md",
                  className: "w-full",
                })}
              >
                Open {currentRole.replace("_", " ")} dashboard
              </Link>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className={buttonStyles({
                    variant: "outline",
                    size: "md",
                    className: "w-full",
                  })}
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenus}
                  className={buttonStyles({ size: "md", className: "w-full" })}
                >
                  Get started
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
