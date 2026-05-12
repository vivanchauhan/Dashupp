import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashupp - Marketing Analytics Dashboard",
  description: "Track your marketing performance with Dashupp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta
          name="facebook-domain-verification"
          content="q4r63591xr47gohv6t5zhwydg6ikw8"
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}

          <main className="flex-1">{children}</main>

          {/* Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
