import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PosthogProvider } from "./PosthogProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenLink – Minimal link page",
  description:
    "OpenLink is a fast, minimal link-in-bio page with UTM and PostHog tracking built-in.",
  openGraph: {
    title: "OpenLink – Minimal link page",
    description:
      "One clean page for your links, content, and widgets, with analytics powered by PostHog.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenLink – Minimal link page",
    description:
      "One clean page for your links, content, and widgets, with analytics powered by PostHog.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PosthogProvider>{children}</PosthogProvider>
      </body>
    </html>
  );
}
