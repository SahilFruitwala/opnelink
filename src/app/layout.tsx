import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PosthogProvider } from "./PosthogProvider";
import { profile, socialLinks } from "../config/openlink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlink.sahilfruitwala.com"),
  title: "OpenLink – Minimal link page",
  description:
    "OpenLink is a fast, minimal link-in-bio page with UTM and PostHog tracking built-in.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "OpenLink – Minimal link page",
    description:
      "One clean page for your links, content, and widgets, with analytics powered by PostHog.",
    url: "https://openlink.sahilfruitwala.com",
    siteName: "OpenLink",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenLink – Minimal link page",
    description:
      "One clean page for your links, content, and widgets, with analytics powered by PostHog.",
    creator: "@SahilBeingSahil",
  },
  robots: {
    index: true,
    follow: true,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              url: "https://openlink.sahilfruitwala.com",
              jobTitle: profile.role,
              description: profile.bio,
              image: profile.avatarUrl,
              sameAs: socialLinks.map((link) => link.href),
            }),
          }}
        />
      </body>
    </html>
  );
}
