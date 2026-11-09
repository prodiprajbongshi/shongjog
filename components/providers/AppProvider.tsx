"use client";

import React, { Suspense, useEffect } from "react";
import { Toaster } from "sonner";
import { useAppStore } from "@/stores/useAppStore";
import RoleSwitcherModal from "@/components/layout/RoleSwitcherModal";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useAppStore();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => {
      const isDark = theme === "dark" || (theme === "system" && mediaQuery.matches);
      document.documentElement.classList.toggle("dark", isDark);
    };

    syncTheme();
    if (theme === "system") {
      mediaQuery.addEventListener("change", syncTheme);
      return () => mediaQuery.removeEventListener("change", syncTheme);
    }
  }, [theme]);

  return (
    <>
      {children}
      <Suspense fallback={null}>
        <RoleSwitcherModal />
      </Suspense>
      <Toaster
        position="top-right"
        richColors
        closeButton
        theme={theme}
      />
    </>
  );
}
