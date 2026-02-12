"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function OnboardingSuccessPage() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/onboarding/quiz");
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#FAFAFA] text-[#1D1D1F]">
      <Confetti />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[430px] flex-col items-center justify-center px-8 py-6 font-sans">
        {/* The "Hero" Moment - Visual Weight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 bg-[#8E7AF6]/10 blur-[60px] rounded-full" />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-48 w-48"
          >
            <img
              src="/images/logo-go.png"
              alt="Go App Logo"
              className="h-full w-full object-contain drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Messaging - Hierarchy */}
        <div className="text-center space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[34px] font-bold leading-tight tracking-tight text-black"
          >
            You're in!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[17px] font-medium text-black/50 leading-relaxed"
          >
            Now, let's personalize your vibe to show you the best trips.
          </motion.p>
        </div>

        {/* Action - Unified Affordance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-14 w-full"
        >
          <button
            onClick={handleContinue}
            className="w-full rounded-full bg-[#0B0C0F] py-[22px] text-[18px] font-bold text-white shadow-2xl shadow-black/10 transition-all hover:bg-black active:scale-[0.98]"
          >
            Start Personalizing
          </button>
        </motion.div>
      </div>
    </main>
  );
}

// --- Confetti (Optimized for Senior UX - subtle, not distracting) ---
function Confetti() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const pieces = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      size: 6 + Math.random() * 8,
      color: ["#8E7AF6", "#A78BFA", "#DDD6FE"][Math.floor(Math.random() * 3)],
    }));
  }, [mounted]);

  return (
    <div className="pointer-events-none absolute inset-0">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2.5 + Math.random(),
            delay: p.delay,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
}
