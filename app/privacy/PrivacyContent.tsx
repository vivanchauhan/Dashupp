"use client";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Hero from "@/components/Hero";

export default function PrivacyContent() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12 flex flex-col items-center">
      <div className="flex flex-col items-center px-6">
        <Hero
          subtitle="Privacy Policy"
          description="Learn how Dashupp handles and protects your marketing data."
        />
      </div>

      {/* privacy policy */}
      <div className="mt-4  border-t border-[var(--border)] w-full max-w-4xl ">
        <div className="mt-6">
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
              <h3 className="font-semibold mb-2">🔒 Information We Collect:</h3>
              <p className="text-gray-400 text-sm">
                We collect your name, email, and authentication credentials
                through providers like Google or GitHub to create your account.
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">🔌 API & Integration Data</h3>
              <p className="text-gray-400 text-sm">
                Dashupp securely fetches marketing metrics, spend data, and
                campaign names from your connected Meta and Google Ads accounts.
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">⚙️ How We Use Data</h3>
              <p className="text-gray-400 text-sm">
                Your information is used to process and display real-time
                performance charts and to optimize your dashboard experience.
              </p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">☁️ Secure Storage</h3>
              <p className="text-gray-400 text-sm">
                All data is hosted on Vercel and stored in Supabase with full
                encryption in transit and at rest.
              </p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">🛠️ Your Control:</h3>
              <p className="text-gray-400 text-sm">
                You have the right to access your data, request deletion, or
                revoke API permissions at any time through your settings.
              </p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">🍪 Cookies & Preferences:</h3>
              <p className="text-gray-400 text-sm">
                We use essential cookies to keep you logged in and to remember
                your theme preferences (Dark/Light mode).
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">🛡️ Third-Party Sharing</h3>
              <p className="text-gray-400 text-sm">
                We do not sell your personal or marketing data. We only share
                information with essential service providers like Stripe for
                payments and Vercel for hosting.
              </p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">
                🌍 International Transfers:
              </h3>
              <p className="text-gray-400 text-sm">
                As a global service, your data may be transferred to and
                processed in countries outside of your own, where data
                protection laws may differ.
              </p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">📩 Policy Updates</h3>
              <p className="text-gray-400 text-sm">
                We may update this policy from time to time. We will notify you
                of any significant changes by posting a notice within the
                dashboard.
              </p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">🤝 Data Processing Role</h3>
              <p className="text-gray-400 text-sm">
                Dashupp acts as a [Data Processor] for the marketing data you
                connect, while you remain the [Data Controller.] We only process
                this data based on your direct instructions and for the purposes
                of providing your analytics.
              </p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">📡 API Usage Transparency</h3>
              <p className="text-gray-400 text-sm">
                We use the Google Ads and Meta Graph APIs solely to fetch your
                campaign performance metrics for reporting. We do not use this
                data for any purposes other than displaying it in your
                dashboard, and we never scrape or store data from Google
                properties beyond what is explicitly provided via the API.
              </p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">🤖 AI Transparency</h3>
              <p className="text-gray-400 text-sm">
                If Dashupp uses AI for predictive analytics or automated
                insights, we disclose that these systems process your marketing
                data to generate forecasts. You have the right to request a
                human review of any automated decisions that significantly
                impact your account.
              </p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">⏳Data Retention</h3>
              <p className="text-gray-400 text-sm">
                We only keep your marketing data for as long as your account is
                active. If you delete your account or disconnect an API
                integration, all associated marketing data is permanently purged
                from our servers within 30 days.
              </p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">🚨Incident Response</h3>
              <p className="text-gray-400 text-sm">
                In the unlikely event of a data breach, we are committed to
                notifying all affected users within 72 hours of discovery, as
                required by law.
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
