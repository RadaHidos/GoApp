"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function AuthPage() {
  const router = useRouter();

  const handleBack = () => {
    // Back is nicer, but if there is no history it can feel broken.
    // Fallback to "/" in case back doesn't change route.
    try {
      router.back();
      setTimeout(() => {
        // If still on /auth after a beat, go home
        if (window.location.pathname === "/auth") router.push("/");
      }, 120);
    } catch {
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] text-[#1D1D1F]">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-6 py-6 font-sans">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: easeOut }}
          onClick={handleBack}
          className="group mb-8 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-black/5 transition-all active:scale-95"
          aria-label="Go back"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black/70 transition-colors group-hover:text-black"
          >
            <path d="M15 18L9 12L15 6" />
          </svg>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
          className="mb-10 px-1"
        >
          <h1 className="mb-3 text-[34px] font-bold leading-[1.1] tracking-tight text-black">
            Unlock your
            <br />
            next adventure.
          </h1>
          <p className="text-[17px] leading-relaxed text-black/60">
            Log in or sign up to personalize your journey, track your progress,
            and get tailored recommendations.
          </p>
        </motion.div>

        {/* Buttons */}
        <div className="flex w-full flex-col gap-4">
          <AuthButton
            onClick={() => router.push("/onboarding/study")}
            icon={<AppleIcon className="h-[18px] w-[18px]" />}
            label="Continue with Apple"
            variant="dark"
            delay={0.2}
          />
          <AuthButton
            onClick={() => router.push("/onboarding/study")}
            icon={<GoogleIcon className="h-[20px] w-[20px]" />}
            label="Continue with Google"
            variant="light"
            delay={0.3}
          />
          <AuthButton
            onClick={() => router.push("/auth/email")}
            icon={<MailIcon className="h-[20px] w-[20px]" />}
            label="Sign up with Email"
            variant="light"
            delay={0.4}
          />
        </div>

        <div className="flex-1" />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex flex-col items-center gap-8 pb-4"
        >
          <div className="text-center text-[13px] leading-relaxed text-black/40">
            By continuing, you agree to our{" "}
            <a
              href="#"
              className="underline decoration-black/10 underline-offset-2 hover:text-black/60"
            >
              Terms
            </a>{" "}
            &{" "}
            <a
              href="#"
              className="underline decoration-black/10 underline-offset-2 hover:text-black/60"
            >
              Privacy Policy
            </a>
          </div>

          <div className="text-[16px] font-medium text-black/60">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/auth/login")}
              className="font-semibold text-[#8E7AF6] transition-opacity hover:opacity-80"
            >
              Log in
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

// --- Components ---

interface AuthButtonProps {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  variant: "dark" | "light";
  delay: number;
}

function AuthButton({ label, icon, onClick, variant, delay }: AuthButtonProps) {
  const isDark = variant === "dark";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay, ease: easeOut }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={[
        "relative flex h-[58px] w-full items-center justify-center rounded-full",
        "px-6",
        "transition-colors duration-200",
        "will-change-transform transform-gpu",
        isDark
          ? "bg-[#0B0C0F] text-white shadow-[0_10px_26px_rgba(0,0,0,0.18)] ring-1 ring-inset ring-white/10"
          : "bg-white text-[#1D1D1F] shadow-[0_6px_18px_rgba(0,0,0,0.06)] ring-1 ring-inset ring-[#E6E7EE] hover:ring-[#D1D1D6]",
      ].join(" ")}
    >
      {/* Icon slot (does not affect centering of label) */}
      <span
        className={[
          "absolute left-6 flex items-center justify-center",
          // ensures icons inherit correct color in dark button
          isDark ? "text-white" : "text-[#1D1D1F]",
        ].join(" ")}
      >
        {icon}
      </span>

      {/* Centered label */}
      <span className="text-[16px] font-semibold tracking-wide">{label}</span>
    </motion.button>
  );
}

// --- Icons ---

function AppleIcon({ className = "h-5 w-5" }: { className?: string }) {
  // Clean Apple mark SVG, consistent across browsers
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.365 1.43c0 1.14-.455 2.19-1.227 2.98-.833.86-2.17 1.52-3.34 1.43-.15-1.11.39-2.24 1.15-3.04.84-.9 2.3-1.55 3.42-1.37zm3.76 16.75c-.53 1.23-.78 1.78-1.47 2.86-.96 1.48-2.31 3.33-3.99 3.35-1.49.02-1.88-.98-3.9-.97-2.02.01-2.46.99-3.95.95-1.68-.03-2.96-1.69-3.92-3.17-2.68-4.12-2.96-8.96-1.31-11.49 1.17-1.8 3.02-2.86 4.75-2.86 1.76 0 2.87 1 3.89 1 1 0 1.63-1 3.87-1 1.55 0 3.2.85 4.36 2.32-3.84 2.12-3.22 7.63 1.67 9.06z" />
    </svg>
  );
}

function GoogleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function MailIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
