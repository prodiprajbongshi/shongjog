"use client";

import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { useAppStore } from "@/stores/useAppStore";
import RoleSwitcherModal from "@/components/layout/RoleSwitcherModal";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Sync dark class on html
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      {children}
      <RoleSwitcherModal />
      <Toaster
        position="top-right"
        richColors
        closeButton
        theme={mounted ? theme : "system"}
      />
    </>
  );
}

