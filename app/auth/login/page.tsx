"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    // Mock network delay (optional, feels more real)
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsLoading(false);
    router.push("/home"); // Mock success route
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
          className="mb-8 px-1"
        >
          <h1 className="mb-2 text-[32px] font-bold leading-tight tracking-tight text-black">
            Welcome back!
          </h1>
          <p className="text-[17px] text-black/60">
            Please enter your details to sign in.
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email Input */}
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
              Email or Username
            </label>
            <input
              id="email"
              type="text" // 'text' allows username or email
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[20px] border-0 bg-white px-5 py-4 text-[16px] text-black shadow-sm ring-1 ring-inset ring-[#E6E7EE] transition-all placeholder:text-black/30 focus:ring-2 focus:ring-[#8E7AF6] focus:outline-none"
              placeholder="Enter your email"
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
            className="space-y-1"
          >
            <label
              htmlFor="password"
              className="ml-1 text-[13px] font-medium text-black/60"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[20px] border-0 bg-white px-5 py-4 pr-12 text-[16px] text-black shadow-sm ring-1 ring-inset ring-[#E6E7EE] transition-all placeholder:text-black/30 focus:ring-2 focus:ring-[#8E7AF6] focus:outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-black/40 transition-colors hover:text-black/70"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Forgot Password Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-end px-1"
          >
            <button
              type="button"
              onClick={() => router.push("/auth/forgot")}
              className="text-[14px] font-medium text-[#8E7AF6] transition-opacity hover:opacity-80"
            >
              Forgot password?
            </button>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-center text-[14px] font-medium text-red-500"
            >
              {error}
            </motion.p>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: easeOut }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={`mt-4 w-full rounded-full bg-[#0B0C0F] py-[18px] text-[17px] font-semibold text-white shadow-lg shadow-black/5 transition-all
              ${isLoading ? "cursor-not-allowed opacity-80" : "hover:bg-black/90"}
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner className="h-5 w-5 animate-spin" />
                Logging in...
              </span>
            ) : (
              "Log in"
            )}
          </motion.button>
        </form>

        {/* Footer Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 text-center text-[15px] font-medium text-black/60"
        >
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/auth")}
            className="font-semibold text-[#8E7AF6] transition-opacity hover:opacity-80"
          >
            Sign up
          </button>
        </motion.div>
      </div>
    </main>
  );
}

// --- Icons ---

function EyeIcon({ className }: { className?: string }) {
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
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
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
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07-2.3 2.3" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
