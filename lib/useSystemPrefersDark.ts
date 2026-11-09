import { useSyncExternalStore } from "react";

const colorSchemeQuery = "(prefers-color-scheme: dark)";

function subscribe(onChange: () => void) {
  const mediaQuery = window.matchMedia(colorSchemeQuery);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(colorSchemeQuery).matches;
}

function getServerSnapshot() {
  return false;
}

export function useSystemPrefersDark() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
