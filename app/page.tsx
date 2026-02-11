"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function SplashPage() {
  const router = useRouter();
  const goToAuth = () => router.push("/auth");

  return (
    <main className="min-h-screen w-full bg-[#F6F3EF]">
      <div className="mx-auto min-h-screen w-full max-w-[430px] px-3 py-3">
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="relative flex min-h-[calc(100dvh-24px)] flex-col overflow-hidden rounded-[32px] shadow-2xl"
        >
          {/* Background Layer */}
          <div className="absolute inset-0 z-0">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: easeOut }}
              src="/images/travel-hero.jpg"
              alt="Travel background"
              className="h-full w-full object-cover blur-[2px]"
            />
            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />
          </div>

          {/* Content Layer */}
          <div className="relative z-10 flex flex-1 flex-col justify-between px-8 pb-12 pt-20">
            {/* Header Section */}
            <div className="flex flex-col items-center pt-24">
              <motion.h1
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
                className="text-center text-[100px] font-bold leading-none tracking-tighter text-white"
                style={{ textShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
              >
                GO
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
                className="mt-4 text-center text-[20px] font-medium leading-[1.4] tracking-wide text-white/90"
              >
                Stop Researching.
                <br />
                Start Going.
              </motion.p>
            </div>

            {/* Actions Section */}
            <div className="flex w-full flex-col items-center gap-5">
              <motion.button
                type="button"
                onClick={goToAuth}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.5, ease: easeOut }}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className="group relative w-full overflow-hidden rounded-full bg-white py-[18px] shadow-sm
             transition-colors duration-200 hover:bg-white/95
             will-change-transform transform-gpu"
              >
                <span className="relative z-10 text-[17px] font-bold tracking-wide text-black">
                  Get Started
                </span>
              </motion.button>

              <motion.button
                type="button"
                onClick={goToAuth}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-[15px] font-medium text-white/80 transition-colors hover:text-white"
              >
                I already have an account
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mt-2 text-[11px] font-medium text-white/40"
              >
                By continuing you agree to our Terms
              </motion.p>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
