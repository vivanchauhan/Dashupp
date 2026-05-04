"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

interface HeroProps {
  subtitle: string;
  description: string;
}

export default function Hero({ subtitle, description }: HeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl text-center mt-12 group select-none cursor-default"
      >
        <h1 className="text-2xl font-bold mb-4 mt-6">
          <span className="font-achiko text-3xl font-extrabold group-hover:opacity-80 transition cursor-pointer">
            DASHUPP
          </span>
          <br />
          {subtitle}
        </h1>

        <p className="text-gray-400 mb-8 text-lg">{description}</p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-6"
        >
          <a
            href="/dashboard"
            className="p-2 px-4 rounded-lg hover:bg-[var(--muted)] transition-colors"
          >
            Go to Dashboard
          </a>

          {/* New Watch Demo Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 px-4 rounded-lg  hover:bg-[var(--muted)] transition-colors flex items-center gap-2 font-medium"
          >
            <Play size={16} fill="currentColor" />
            Watch Demo
          </button>

          <a
            href="/dashboard/integrations"
            className="p-2 px-4 rounded-lg hover:bg-[var(--muted)] transition-colors"
          >
            Connect Accounts
          </a>
        </motion.div>
      </motion.div>

      {/* Video Modal - Framer Motion for smooth entry/exit */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Header / Close Bar */}
              <div className="flex justify-between items-center p-4 border-b border-white/5">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Dashupp Product Tour
                </span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Video Player */}
              <div className="aspect-video w-full bg-zinc-900">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/xSSq3T3msBM?autoplay=1&mute=1&modestbranding=1&rel=0](https://www.youtube.com/embed/xSSq3T3msBM?autoplay=1&mute=1&modestbranding=1&rel=0"
                  title="Dashupp Walkthrough"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
