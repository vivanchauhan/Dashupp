"use client";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12 flex flex-col items-center">
      {/* HERO */}
      <div className="flex flex-col items-center px-6">
        <Hero
          subtitle="About"
          description="We build high-performance tools for modern marketers to bridge the gap between complex ad data and actionable insights."
        />
      </div>
      {/* about */}
      <div className="mt-4 border-t border-[var(--border)] w-full max-w-4xl ">
        <div className="mt-6">
          {/* The Mission Container */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="p-6 border border-[var(--border)] rounded-2xl"
          >
            <h3 className="font-semibold mb-6 text-center">🚀 The Mission</h3>

            {/* THIS IS THE GRID WRAPPER */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition h-full"
              >
                <h3 className="font-semibold mb-2 text-rose-500">
                  The Problem
                </h3>
                <p className="text-gray-400 text-sm">
                  Marketers are drowning in tabs, switching between Meta and
                  Google Ads to compare performance.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition h-full"
              >
                <h3 className="font-semibold mb-2 text-emerald-400">
                  The Solution
                </h3>
                <p className="text-gray-400 text-sm">
                  Dashupp was built to unify marketing data into a single,
                  high-performance dashboard that provides real-time insights at
                  a glance.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="mt-6 p-6 border border-[var(--border)] rounded-2xl"
          >
            <h3 className="font-semibold mb-6 text-center">🛠️ Key Features</h3>

            {/* Grid Wrapper for the 3 Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition h-full"
              >
                <h3 className="font-semibold mb-2">📊 Unified Analytics</h3>
                <p className="text-gray-400 text-sm">
                  View KPIs from different platforms in one centralized view.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition h-full"
              >
                <h3 className="font-semibold mb-2">⚡ Real-Time Data</h3>
                <p className="text-gray-400 text-sm">
                  Fetch live campaign metrics instantly using direct API
                  integrations.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition h-full"
              >
                <h3 className="font-semibold mb-2">🔒 Secure Integration</h3>
                <p className="text-gray-400 text-sm">
                  Your data is yours; we use industry-standard encryption and
                  secure API protocols.
                </p>
              </motion.div>
            </div>
          </motion.div>
          {/* Tech Stack Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className=" mt-6 p-6 border border-[var(--border)] rounded-2xl"
          >
            <h3 className="font-semibold mb-6 text-center text-xl">
              💻 The Tech Stack
            </h3>

            {/* Grid Wrapper: Stacks on mobile, 2 columns on tablet, 4 on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition h-full"
              >
                <h3 className="font-semibold mb-2">Frontend</h3>
                <p className="text-gray-400 text-sm">
                  Built with Next.js and React for a seamless, single-page
                  experience.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition h-full"
              >
                <h3 className="font-semibold mb-2">Styling</h3>
                <p className="text-gray-400 text-sm">
                  Powered by Tailwind CSS (v4) and Modern UI principles for a
                  responsive, dark-mode first design.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition h-full"
              >
                <h3 className="font-semibold mb-2">Backend & Auth</h3>
                <p className="text-gray-400 text-sm">
                  Utilizing Supabase for secure database management and OAuth
                  for seamless ad account integration.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition h-full"
              >
                <h3 className="font-semibold mb-2">Visualization</h3>
                <p className="text-gray-400 text-sm">
                  Charts and KPIs rendered via Tremor and Recharts to make
                  complex data easy to digest.
                </p>
              </motion.div>
            </div>
          </motion.div>
          {/* About the founder developer */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="mt-6"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-8 border border-[var(--border)] rounded-2xl hover:shadow-lg transition bg-[var(--card-bg)]"
            >
              <h3 className="font-semibold mb-10 text-center text-xl tracking-tight">
                👤 About the Developer
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-x-12 gap-y-8 items-start">
                <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 pt-1">
                  Name
                </h4>
                <p className=" font-semibold text-lg">Vivan Chauhan</p>

                <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 pt-1">
                  Background
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  A developer focused on building modern, data-driven web
                  applications with a passion for React and user-centric design.
                </p>

                <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 pt-1">
                  Motivation
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Created Dashupp to solve the common pain point of fragmented
                  ad performance data and empower marketers with a unified
                  dashboard.
                </p>

                <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 pt-1">
                  Portfolio
                </h4>
                <div className="flex gap-4">
                  <a
                    href="https://vivan-portfolio-one.vercel.app/"
                    target="_blank"
                    className="px-4 py-1.5 bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#6366f1] text-xs font-semibold rounded-full hover:bg-[#6366f1]/20 transition"
                  >
                    vivanchauhan.dev ↗
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
          <p className="text-xs text-emerald-400  mt-4 mb-8 text-right font-medium">
            Last Updated: May 1, 2026
          </p>
        </div>
      </div>
    </div>
  );
}
