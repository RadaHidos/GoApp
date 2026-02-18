"use client";

import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion"; // <-- Add Variants here
import { ReactNode } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function AuthPage() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  // Around line 25 in app/auth/page.tsx
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const, // <--- Add 'as const' here
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] text-[#1D1D1F]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-6 py-6 font-sans"
      >
        {/* Unified Navigation Header */}
        <motion.header variants={itemVariants} className="mb-8">
          <button
            onClick={() => router.push("/")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-sm ring-1 ring-black/5 transition-transform active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeftIcon />
          </button>
        </motion.header>

        <motion.div variants={itemVariants} className="mb-12 px-1">
          <h1 className="mb-3 text-[34px] font-bold leading-[1.1] tracking-tight text-black">
            Your next journey <br /> starts here.
          </h1>
          <p className="text-[17px] leading-relaxed text-black/50">
            Sign up to personalize your trips and access campus hidden gems.
          </p>
        </motion.div>

        {/* Action List - High Recognition Over Recall */}
        <div className="flex w-full flex-col gap-4">
          <motion.div variants={itemVariants} className="w-full">
            <SocialButton
              onClick={() => router.push("/onboarding/study")}
              icon={<AppleIcon />}
              label="Continue with Apple"
              variant="dark"
            />
          </motion.div>
          <motion.div variants={itemVariants} className="w-full">
            <SocialButton
              onClick={() => router.push("/onboarding/study")}
              icon={<GoogleIcon />}
              label="Continue with Google"
              variant="light"
            />
          </motion.div>
          <motion.div variants={itemVariants} className="w-full">
            <SocialButton
              onClick={() => router.push("/auth/email")}
              icon={<EmailIcon />}
              label="Sign Up with Email"
              variant="light"
            />
          </motion.div>
        </div>

        <div className="flex-1" />

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col items-center gap-6 pb-4"
        >
          <p className="text-[16px] font-medium text-black/60">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/auth/login")}
              className="font-bold text-[#8E7AF6] hover:underline underline-offset-4"
            >
              Log in
            </button>
          </p>
          <div className="text-center text-[12px] leading-relaxed text-black/30 px-6">
            By continuing, you agree to our{" "}
            <span className="underline">Terms</span> &{" "}
            <span className="underline">Privacy Policy</span>.
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}

// --- Components ---
function SocialButton({
  label,
  icon,
  onClick,
  variant,
}: {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  variant: "dark" | "light";
}) {
  const isDark = variant === "dark";
  return (
    <button
      onClick={onClick}
      className={`relative flex w-full items-center justify-center rounded-full py-[18px] text-[17px] font-bold transition-all active:scale-[0.98] ${
        isDark
          ? "bg-[#0B0C0F] text-white shadow-xl"
          : "bg-white text-black shadow-sm ring-1 ring-black/5"
      }`}
    >
      <span className="absolute left-6">{icon}</span>
      {label}
    </button>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18L9 12L15 6" />
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.96.95-2.06 1.72-3.1 1.72-1.2 0-1.6-.74-3.1-.74s-1.9.74-3.1.74c-1.1 0-2.3-.9-3.3-2.1-2-2.5-3.1-6.1-3.1-9.3 0-5.1 3.2-7.8 6.1-7.8 1.5 0 2.8.9 3.7.9.9 0 2.4-.9 4-.9 1.4 0 4.6.4 6.2 4.1-3 .4-3.6 5.1-.1 6.6-1 2.3-2.3 4.8-3.3 5.9zM12 2c0-1.1.9-2 2-2 1.1 0 2 .9 2 2 0 1.1-.9 2-2 2-1.1 0-2-.9-2-2z" />
    </svg>
  );
}
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
