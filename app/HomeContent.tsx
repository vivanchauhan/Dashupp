"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";

export default function HomeContent() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Choose image based on the current resolved theme
  const dashboardImg =
    resolvedTheme === "dark" ? "/darkdashboard.png" : "/lightdashboard.png";

  return (
    <>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12 flex flex-col items-center">
        {/* HERO */}
        <div className="flex flex-col items-center px-6">
          <Hero
            subtitle="Ads Performance Dashboard"
            description="Track, analyze and optimize your Facebook and Google Ads in one clean dashboard."
          />
        </div>

        {/* dashboard preview */}
        <div className="mt-4 border-t border-[var(--border)] w-full max-w-4xl"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 w-full max-w-6xl"
        >
          <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--background)] p-2 shadow-lg">
            {/* glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl blur opacity-30"></div>

            <img
              src={dashboardImg}
              alt="Dashboard preview"
              className="relative rounded-xl w-full transition-all duration-500"
            />
          </div>
        </motion.div>

        {/* FEATURES */}
        <div className="mt-20 max-w-5xl w-full">
          <h2 className="text-2xl font-semibold mb-8 text-center">Features</h2>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="grid md:grid-cols-3 gap-6"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">📊 Analytics Dashboard</h3>
              <p className="text-gray-400 text-sm">
                Get clear insights into your ad performance with KPIs and
                charts.
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">🔗 Easy Integrations</h3>
              <p className="text-gray-400 text-sm">
                Connect Facebook and Google Ads seamlessly using OAuth.
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">⚡ Real-time Data</h3>
              <p className="text-gray-400 text-sm">
                Fetch and display live campaign data instantly.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
