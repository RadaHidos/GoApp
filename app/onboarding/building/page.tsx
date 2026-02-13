"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

// Progressive Disclosure: Showing the user what's happening
const LOADING_STEPS = [
  "Analyzing your vibe...",
  "Finding hidden gems...",
  "Tailoring your budget...",
  "Finalizing your journey..."
];

export default function BuildingProfilePage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"loading" | "success">("loading");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    // 1. Animate counter 0 -> 100%
    const controls = animate(count, 100, { duration: 3.5, ease: "easeInOut" });

    // 2. Switch from Loading -> Success
    const phaseTimer = setTimeout(() => {
      setPhase("success");
    }, 4000);

    // 3. Redirect to Home (Consistency with common app patterns)
    const redirectTimer = setTimeout(() => {
      router.push("/home");
    }, 9500);

    return () => {
      controls.stop();
      clearTimeout(phaseTimer);
      clearTimeout(redirectTimer);
    };
  }, [count, router]);

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#FAFAFA] font-sans text-[#1D1D1F]">
      {/* Ambient Background Glows - Visual Weight */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] h-[600px] w-[600px] rounded-full bg-[#8E7AF6] blur-[120px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-[430px] px-8 text-center flex flex-col items-center justify-center min-h-[450px]">
        <AnimatePresence mode="wait">
          {phase === "loading" ? (
            <LoadingState key="loading" countValue={rounded} />
          ) : (
            <SuccessState key="success" />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

// --- Loading Component: Improved Feedback & Animation ---

function LoadingState({ countValue }: { countValue: any }) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 900);
    return () => clearInterval(stepInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="flex flex-col items-center"
    >
      <div className="relative mb-12 h-52 w-52 flex items-center justify-center">
        {/* Animated Outer Glow Pulse - Feedback */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-4 rounded-full bg-[#8E7AF6]/10 blur-xl"
        />

        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#E5E5E5"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#8E7AF6"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3.8, ease: "easeInOut" }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mb-1 text-[12px] font-bold uppercase tracking-[0.2em] text-[#8E7AF6]"
          >
            Vibe Check
          </motion.span>
          <div className="flex items-baseline">
            <motion.span className="text-[48px] font-black tracking-tighter text-[#1D1D1F] tabular-nums">
              {countValue}
            </motion.span>
            <span className="text-[22px] font-bold text-[#1D1D1F]/30">%</span>
          </div>
        </div>
      </div>

      {/* Dynamic Loading Steps: Progressive Disclosure */}
      <div className="h-20 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={LOADING_STEPS[stepIndex]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="mb-2 text-[22px] font-bold text-[#1D1D1F]"
          >
            {LOADING_STEPS[stepIndex]}
          </motion.h2>
        </AnimatePresence>
        <p className="text-[16px] font-medium text-[#1D1D1F]/40">
          Hang tight, we’re almost there.
        </p>
      </div>
    </motion.div>
  );
}

// --- Success Component: Enhanced Senior Design Version ---

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center"
    >
      {/* Icon Section - Hierarchy & Visual Weight */}
      <div className="relative mb-12 flex h-32 w-32 items-center justify-center">
        {/* Layered Glimmer Effect */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.1, 1], opacity: 1 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8E7AF6] to-[#A78BFA] blur-3xl opacity-30"
        />

        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="relative z-10 text-[#8E7AF6]"
        >
           <SparkleIcon className="h-24 w-24 drop-shadow-lg" />
        </motion.div>

        {/* Dynamic Particles - Occam's Razor: Simplicity in visual delight */}
        <ConfettiBurst delay={0.3} x={-60} y={-50} color="#8E7AF6" size={10} />
        <ConfettiBurst delay={0.45} x={70} y={-40} color="#A78BFA" size={8} />
        <ConfettiBurst delay={0.4} x={50} y={60} color="#DDD6FE" size={12} />
        <ConfettiBurst delay={0.5} x={-50} y={40} color="#8E7AF6" size={6} />
      </div>

      {/* Success Messaging - Hierarchy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: easeOut }}
        className="space-y-4"
      >
        <h2 className="text-[34px] font-bold tracking-tight text-[#1D1D1F] leading-tight">
          Your profile is <span className="text-[#8E7AF6]">ready</span>.
        </h2>
        <p className="text-[18px] font-medium text-[#1D1D1F]/50 max-w-[280px] mx-auto leading-relaxed">
           Your personalized travel vibe is locked in. Let's find your first trip.
        </p>
      </motion.div>
      
      {/* Bottom Signifier - Feedback */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-16 flex items-center gap-2 text-[#8E7AF6] font-bold text-[14px] uppercase tracking-widest"
      >
        <span className="w-8 h-[2px] bg-[#8E7AF6]/20" />
        Entering Go App
        <span className="w-8 h-[2px] bg-[#8E7AF6]/20" />
      </motion.div>
    </motion.div>
  );
}

// --- Helper Components ---

function ConfettiBurst({ delay, x, y, color, size }: { delay: number; x: number; y: number; color: string; size: number; }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.5], x, y }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      className="absolute rounded-full"
      style={{ width: size, height: size, backgroundColor: color }}
    />
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.39 9.61L22 12L14.39 14.39L12 22L9.61 14.39L2 12L9.61 9.61L12 2Z" />
    </svg>
  );
}