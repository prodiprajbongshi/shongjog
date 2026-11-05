"use client";

import { useEffect, useState } from "react";
import { formatRelativeTime } from "@/lib/utils";

interface RelativeTimeProps {
  dateString: string;
}

export function RelativeTime({ dateString }: RelativeTimeProps) {
  const [relativeTime, setRelativeTime] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setRelativeTime(formatRelativeTime(dateString));
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [dateString]);

  return <time dateTime={dateString}>{relativeTime ?? "—"}</time>;
}
