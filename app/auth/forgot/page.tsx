"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Mock network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSent(true);
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

        {isSent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-10 text-center"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#8E7AF6]/10 text-[#8E7AF6]">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-black">
              Check your email
            </h2>
            <p className="mb-8 text-black/60">
              We've sent a password reset link to
              <br />
              <span className="font-medium text-black">{email}</span>
            </p>
            <button
              onClick={() => router.push("/auth/login")}
              className="w-full rounded-full bg-[#FAFAFA] py-[14px] font-semibold text-black ring-1 ring-inset ring-black/10 transition-colors hover:bg-white"
            >
              Back to Log in
            </button>
          </motion.div>
        ) : (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
              className="mb-8 px-1"
            >
              <h1 className="mb-2 text-[32px] font-bold leading-tight tracking-tight text-black">
                Reset password.
              </h1>
              <p className="text-[17px] text-black/60">
                Enter the email address associated with your account.
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
                className="space-y-1"
              >
                <label
                  htmlFor="email"
                  className="ml-1 text-[13px] font-medium text-black/60"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-[20px] border-0 bg-white px-5 py-4 text-[16px] text-black shadow-sm ring-1 ring-inset ring-[#E6E7EE] transition-all placeholder:text-black/30 focus:ring-2 focus:ring-[#8E7AF6] focus:outline-none"
                  placeholder="Enter your email"
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isLoading}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full rounded-full bg-[#0B0C0F] py-[18px] text-[17px] font-semibold text-white shadow-lg shadow-black/5 transition-all
                  ${isLoading ? "cursor-not-allowed opacity-80" : "hover:bg-black/90"}
                `}
              >
                {isLoading ? "Sending..." : "Send reset link"}
              </motion.button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
