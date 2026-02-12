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
      {/* Confetti Layer */}
      <Confetti />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[430px] flex-col items-center justify-center px-6 py-6 font-sans">
        {/* Fun Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.15, ease: easeOut }}
          className="relative mb-8 flex items-center justify-center"
        >
          {/* Soft glow */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            className="absolute h-44 w-44 rounded-full bg-[#8E7AF6]/18 blur-3xl"
          />

          {/* Big Floating Logo */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -6 }}
            animate={{ scale: 1, opacity: 1, rotate: 0, y: [0, -12, 0] }}
            transition={{
              scale: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.22,
              },
              opacity: { duration: 0.6, delay: 0.22 },
              rotate: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.22,
              },
              y: {
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              },
            }}
            className="relative h-44 w-44 drop-shadow-2xl"
          >
            <img
              src="/images/logo-go.png"
              alt="Go App Logo"
              className="h-full w-full object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 14, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 20,
              delay: 0.28,
            }}
            className="mb-3 text-[36px] font-bold leading-none tracking-tight text-black"
          >
            You’re in The Club!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.42, ease: easeOut }}
            className="mx-auto max-w-[290px] text-[17px] font-medium leading-relaxed text-black/60"
          >
            Now let’s tailor your experience to match your vibe.
          </motion.p>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.6, ease: easeOut }}
          className="mt-12 w-full"
        >
          <motion.button
            onClick={handleContinue}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="w-full rounded-full bg-[#0B0C0F] py-[20px] text-[17px] font-semibold tracking-wide text-white
                       shadow-[0_18px_32px_rgba(0,0,0,0.14)] transition-colors hover:bg-black/90
                       will-change-transform transform-gpu"
          >
            Continue →
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
}

// --- Icons ---

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Main sparkle */}
      <path d="M12 2l1.9 6.3L20 10l-6.1 1.7L12 18l-1.9-6.3L4 10l6.1-1.7L12 2z" />
      {/* Small side sparkle */}
      <path
        d="M19.6 3.9l.7 2.2 2.2.7-2.2.7-.7 2.2-.7-2.2-2.2-.7 2.2-.7.7-2.2z"
        opacity="0.85"
      />
    </svg>
  );
}

// --- Confetti Component ---

const CONFETTI_COLORS = ["#8E7AF6", "#A78BFA", "#DDD6FE", "#F3F4F6"];
const NUM_CONFETTI = 26;

type ConfettiPiece = {
  id: number;
  x: number; // vw
  delay: number;
  duration: number;
  color: string;
  rotation: number;
  scale: number;
  shape: "square" | "pill";
};

function Confetti() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pieces: ConfettiPiece[] = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: NUM_CONFETTI }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.45,
      duration: 2.2 + Math.random() * 1.6,
      color:
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotation: Math.random() * 360,
      scale: 0.65 + Math.random() * 0.7,
      shape: Math.random() > 0.72 ? "pill" : "square",
    }));
  }, [mounted]);

  // one-shot confetti (doesn't loop)
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            y: -24,
            x: `${piece.x}vw`,
            opacity: 0,
            rotate: piece.rotation,
          }}
          animate={{
            y: "110vh",
            x: `${piece.x + (Math.random() - 0.5) * 8}vw`,
            opacity: [0, 0.9, 0.9, 0],
            rotate: piece.rotation + 260,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: [0.25, 0.1, 0.25, 1],
            times: [0, 0.12, 0.82, 1],
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: piece.shape === "pill" ? "12px" : "10px",
            height: "10px",
            backgroundColor: piece.color,
            borderRadius: piece.shape === "pill" ? "999px" : "3px",
            scale: piece.scale,
            filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.06))",
          }}
        />
      ))}
    </div>
  );
}
