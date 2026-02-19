"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// High-fidelity spring physics for a premium "Liquid" feel
const springConfig = { type: "spring" as const, stiffness: 400, damping: 26 };

export default function HomePage() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black font-sans text-white">
      {/* Background Layer with subtle zoom effect */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background-go.png')" }}
      />

      {/* Dark Overlay for depth */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

      {/* Content Container */}
      <div className="relative z-20 flex h-full w-full flex-col justify-between px-8 py-14 safe-area-view">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mt-5"
        >
          <p className="max-w-[280px] text-center text-[12px] font-black uppercase tracking-[0.3em] text-white/50">
            Plan your next <span className="text-white/80">adventure</span> in
            10 minutes
          </p>
        </motion.div>

        {/* Bottom Section */}
        <div className="flex w-full items-end justify-between pb-12">
          {/* Headline block - Fixed clipping with improved leading and padding */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col leading-[0.9] select-none py-2"
          >
            <span className="text-[64px] font-bold tracking-tighter text-white/90 sm:text-[80px]">
              let’s
            </span>
            <span className="text-[110px] font-black tracking-tighter sm:text-[140px] bg-clip-text text-transparent bg-gradient-to-br from-[#9B7CFF] via-[#8E7AF6] to-[#7C62E3] block">
              GO
            </span>
          </motion.div>

          {/* CTA Button Wrapper */}
          <Link href="/auth" className="group outline-none pb-4">
            <div className="relative flex items-center justify-center">
              {/* Outer Pulse Rings */}
              <motion.div
                animate={{ scale: [1, 1.85], opacity: [0.4, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute h-full w-full rounded-full border border-[#9B7CFF]/40 bg-[#9B7CFF]/5"
              />
              <motion.div
                animate={{ scale: [1, 1.5], opacity: [0.25, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.6,
                }}
                className="absolute h-full w-full rounded-full border border-white/20"
              />

              {/* Main Button */}
              <motion.div
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 40px rgba(155,124,255,0.4)",
                }}
                whileTap={{ scale: 0.92 }}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{
                  scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                  default: springConfig,
                }}
                className="relative z-30 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-white shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              >
                <ArrowRightIcon className="h-11 w-11 text-black transition-transform duration-500 ease-out group-hover:translate-x-1" />
              </motion.div>
            </div>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .safe-area-view {
          padding-top: calc(env(safe-area-inset-top) + 2rem);
          padding-bottom: calc(env(safe-area-inset-bottom) + 2rem);
        }
      `}</style>
    </main>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
