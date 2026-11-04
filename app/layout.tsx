import type { Metadata } from "next";
import "./globals.css";
import AppProvider from "@/components/providers/AppProvider";

export const metadata: Metadata = {
  title: "Shongjog – The Future of Tech Hiring",
  description: "Next-generation IT recruitment platform connecting top software engineers, AI specialists, and cloud architects with premier global tech companies.",
  keywords: [
    "Tech Jobs",
    "IT Recruitment",
    "Software Engineer Jobs",
    "Next.js",
    "Remote Developer Jobs",
    "ATS Platform",
    "Shongjog",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 min-h-screen flex flex-col">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
