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
          subtitle="User Data Deletion Instructions"
          description="At Dashupp, we are committed to providing a transparent experience. Users have the right to request the deletion of their personal and advertising data at any time."
        />
      </div>
      {/* outerbox */}
      <div className="mt-4 border-t border-[var(--border)] w-full max-w-4xl ">
        <div className="mt-6">
          {/* main*/}
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
              <h3 className="font-semibold mb-2 ">
                {" "}
                Method 1: Revoking Facebook Business Integration
              </h3>
              <p className="text-gray-400 text-sm">
                Since Dashupp uses official Meta APIs, you can remove our access
                and request data deletion through your Facebook settings:
              </p>
              <ul className="list-disc ml-6 mb-4 text-gray-400 text-sm">
                <li>Navigate to your Facebook Settings & Privacy Settings.</li>
                <li>Select "Business Integrations" from the sidebar.</li>
                <li>Locate Dashupp and click "Remove".</li>
                <li>
                  Once the integration is removed, Dashupp will no longer have
                  access to your data.
                </li>
              </ul>
            </motion.div>

            {/*   mwthod 2 */}

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 mt-6 border border-[var(--border)] rounded-2xl hover:shadow-lg transition h-full"
            >
              <h3 className="font-semibold mb-2 ">
                {" "}
                Method 2: Email Deletion Request
              </h3>
              <p className="text-gray-400 text-sm">
                If you wish for us to manually purge your account and all
                associated cached performance data from our database, please
                contact our support team:
              </p>
              <ul className="list-disc ml-6 mb-4 text-gray-400 text-sm">
                <li>Email: help@dashupp.com</li>
                <li>Subject: Data Deletion Request - [Your Email Address]</li>
                <li>
                  Process: Upon receiving your request, we will verify your
                  identity and purge your user profile and cached ad data from
                  our Supabase records within 48 hours.
                </li>
              </ul>
            </motion.div>
          </motion.div>
          {/* after deletion */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="p-6 mt-6   transition h-full"
          >
            <h3 className="font-semibold mb-2 "> Data Purge Policy</h3>
            <p className="text-gray-400 ">
              When a deletion request is processed through either method:
            </p>
            <ul className="list-disc ml-6 mb-4 text-gray-400">
              <li>
                Your user authentication record (linked to your email) is
                removed.
              </li>
              <li>
                All stored campaign metrics and dashboard preferences are
                permanently deleted.
              </li>
              <li>
                Dashupp retains no residual data from your advertising accounts.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
