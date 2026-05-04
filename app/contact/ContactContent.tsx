"use client";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactContent() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12 flex flex-col items-center">
      {/* HERO */}
      <div className="flex flex-col items-center px-6">
        <Hero
          subtitle="Contact Support"
          description="Have questions about your integration or need technical assistance? Our team is here to help."
        />
      </div>

      {/* CONTACT GRID SECTION */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="mt-8 pt-12 border-t border-[var(--border)] w-full max-w-4xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="p-8 border border-[var(--border)] bg-[var(--card)] rounded-[var(--radius)] hover:border-[var(--accent)] transition-all group"
          >
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--accent)] mb-4">
              Direct Email
            </h4>
            <p className="text-xl font-semibold text-[var(--foreground)] mb-2">
              hello@dashupp.com
            </p>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              For support, feature requests, or business inquiries. We usually
              respond within 24 hours.
            </p>
            <a
              href="mailto:hello@dashupp.com"
              className="inline-block mt-6 text-xs font-bold text-[var(--accent)] uppercase tracking-wider group-hover:underline"
            >
              Send Email ↗
            </a>
          </motion.div>

          {/* Documentation Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="p-8 border border-[var(--border)] bg-[var(--card)] rounded-[var(--radius)] hover:border-[var(--accent)] transition-all group"
          >
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--accent)] mb-4">
              Resources
            </h4>
            <p className="text-xl font-semibold text-[var(--foreground)] mb-2">
              Help Center
            </p>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Learn how to connect your Meta and Google Ads accounts to your
              unified dashboard.
            </p>
            <a
              href="#"
              className="inline-block mt-6 text-xs font-bold text-[var(--accent)] uppercase tracking-wider group-hover:underline"
            >
              Read Docs ↗
            </a>
          </motion.div>

          {/* Social Presence */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="p-8 border border-[var(--border)] bg-[var(--card)] rounded-[var(--radius)]"
          >
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--accent)] mb-4">
              Follow Progress
            </h4>
            <div className="flex gap-6">
              {["GitHub", "LinkedIn", "X / Twitter"].map((social) => (
                <a
                  key={social}
                  href={
                    social === "GitHub"
                      ? "https://github.com/vivanchauhan"
                      : "#"
                  }
                  className="text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Service Status */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="p-8 border border-[var(--border)] bg-[var(--card)] rounded-[var(--radius)] flex items-center justify-between"
          >
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--muted-foreground)] mb-1">
                Service Status
              </h4>
              <p className="text-sm font-semibold">Systems Operational</p>
            </div>
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
