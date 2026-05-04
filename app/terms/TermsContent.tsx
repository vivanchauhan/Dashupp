"use client";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function TermsContent() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12 flex flex-col items-center">
      {/* HERO */}
      <div className="flex flex-col items-center px-6">
        <Hero
          subtitle="Terms of Service"
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
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition h-full"
            >
              <h3 className="font-semibold mb-2 "> 1. Acceptance of Terms</h3>
              <p className="text-gray-400 text-sm">
                By accessing or using Dashupp, you agree to be bound by these
                Terms of Service. If you are using Dashupp on behalf of a
                business, that business also accepts these terms.
              </p>
            </motion.div>

            {/*   2. Description of Service */}

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 mt-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition h-full"
            >
              <h3 className="font-semibold mb-2 ">
                {" "}
                2. Description of Service
              </h3>
              <p className="text-gray-400 text-sm">
                Dashupp is an Ads Performance Dashboard designed to track,
                analyze, and optimize Facebook and Google Ads in one clean
                interface. We provide data visualization and management tools to
                help you improve your advertising performance.
              </p>
            </motion.div>

            {/*   3. Ad Account Integration */}

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 mt-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition h-full"
            >
              <h3 className="font-semibold mb-2 ">
                {" "}
                3. Ad Account Integration
              </h3>

              <p className="text-gray-400 text-sm">
                To provide our services, Dashupp requires access to your Meta Ad
                Accounts via official APIs.
              </p>
              <ul className="list-disc ml-6 mb-4 text-gray-400 text-sm">
                <li>
                  Permissions: You explicitly grant Dashupp ads_read and
                  ads_management permissions..
                </li>
                <li>
                  Data Usage: We use this access solely to display your
                  analytics and allow you to manage campaigns through our
                  dashboard.
                </li>
                <li>
                  Revocation: You can revoke this access at any time through
                  your Facebook Business Integrations settings.
                </li>
              </ul>
            </motion.div>
            {/*   4. User Responsibilities*/}

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 mt-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition h-full"
            >
              <h3 className="font-semibold mb-2 "> 4. User Responsibilities</h3>

              <ul className="list-disc ml-6 mb-4 text-gray-400 text-sm">
                <li>
                  Account Security: You are responsible for maintaining the
                  security of your account and any actions taken through the
                  dashboard.
                </li>
                <li>
                  Compliance: You agree to comply with all Meta Advertising
                  Policies while using our optimization tools.
                </li>
              </ul>
            </motion.div>
            {/*   5. Limitation of Liability*/}

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 mt-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition h-full"
            >
              <h3 className="font-semibold mb-2 ">
                {" "}
                5. Limitation of Liability
              </h3>

              <p className="text-gray-400 text-sm">
                Dashupp provides tools for optimization; however, we are not
                liable for:
              </p>
              <ul className="list-disc ml-6 mb-4 text-gray-400 text-sm">
                <li>
                  Any financial losses or overspending on your ad campaigns.
                </li>
                <li>
                  Errors or campaign performance issues resulting from manual
                  changes made through the Dashupp interface.
                </li>
                <li>
                  Technical interruptions caused by third-party API providers
                  (Meta/Google).
                </li>
              </ul>
            </motion.div>
            {/*   6. Termination*/}

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 mt-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition h-full"
            >
              <h3 className="font-semibold mb-2 "> 6. Termination</h3>
              <p className="text-gray-400 text-sm">
                We reserve the right to suspend or terminate your access to
                Dashupp if you violate these terms. You may delete your account
                and associated data at any time through the Settings menu.
              </p>
            </motion.div>
            {/*   7. Contact Us*/}

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 mt-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition h-full"
            >
              <h3 className="font-semibold mb-2 "> 7. Contact Us</h3>
              <p className="text-gray-400 text-sm">
                If you have any questions regarding these terms, please contact
                us at help@dashupp.com.
              </p>
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
