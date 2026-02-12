"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function SplashPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-black">
      <div className="mx-auto min-h-screen w-full max-w-[430px] relative overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 1.6, ease: easeOut }}
            src="/images/travel-hero.jpg"
            alt="Travel background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-1 flex-col h-screen justify-between px-8 pb-14 pt-20">
          <div className="flex flex-col items-center pt-32">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
              className="text-center text-[110px] font-black leading-none tracking-tighter text-white"
            >
              GO
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-4 text-center text-[18px] font-medium tracking-wide text-white/70"
            >
              Adventure is calling.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: easeOut }}
            className="w-full"
          >
            <button
              onClick={() => router.push("/auth")}
              className="w-full rounded-full bg-white py-[20px] text-[18px] font-bold text-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started
            </button>
            <p className="mt-6 text-center text-[14px] font-medium text-white/40">
              Join 10k+ travelers today
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
