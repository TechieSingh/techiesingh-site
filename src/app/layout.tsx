import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${profile.name} — ${profile.headline}`, template: `%s · ${profile.name}` },
  description: `${profile.name}: ${profile.headline}. Projects, writing and what I'm learning.`,
  openGraph: { type: "website", siteName: profile.name },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
