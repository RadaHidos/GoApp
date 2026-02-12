"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function EmailSignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const validate = () => {
    const newErrors = {
      name: formData.name ? "" : "Name is required.",
      email: formData.email ? "" : "Email is required.",
      password: formData.password ? "" : "Password is required.",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Mock network request
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoading(false);
    router.push("/onboarding/study");
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
            Sign Up with Email
          </h1>
          <p className="text-[17px] text-black/60">
            Log in or sign up to personalize your journey and access features.
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputRow
            label="Full Name"
            value={formData.name}
            onChange={(val) => setFormData({ ...formData, name: val })}
            error={errors.name}
            icon={<UserIcon />}
            placeholder="John Doe"
            delay={0.2}
          />
          <InputRow
            label="Email Address"
            value={formData.email}
            onChange={(val) => setFormData({ ...formData, email: val })}
            error={errors.email}
            icon={<MailIcon />}
            type="email"
            placeholder="name@example.com"
            delay={0.3}
          />
          <InputRow
            label="Password"
            value={formData.password}
            onChange={(val) => setFormData({ ...formData, password: val })}
            error={errors.password}
            icon={<LockIcon />}
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            delay={0.4}
            isPassword
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword(!showPassword)}
          />

          {/* Spacer to push content down for bottom layout */}
          <div className="flex-1 min-h-[40px]" />

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
            {isLoading ? "Creating account..." : "Continue →"}
          </motion.button>
        </form>

        <div className="flex-1" />

        {/* Footer Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 text-center text-[15px] font-medium text-black/60"
        >
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="font-semibold text-[#8E7AF6] transition-opacity hover:opacity-80"
          >
            Log in
          </button>
        </motion.div>
      </div>
    </main>
  );
}

// --- Components ---

interface InputRowProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  icon: React.ReactNode;
  type?: string;
  placeholder?: string;
  error?: string;
  delay: number;
  isPassword?: boolean;
  showPassword?: boolean;
  toggleShowPassword?: () => void;
}

function InputRow({
  label,
  value,
  onChange,
  icon,
  type = "text",
  placeholder,
  error,
  delay,
  isPassword,
  showPassword,
  toggleShowPassword,
}: InputRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: easeOut }}
      className="w-full"
    >
      <div className="relative group">
        {/* Input Wrapper */}
        <div
          className={`flex w-full items-center overflow-hidden rounded-[20px] bg-[#F3F4F6] px-4 py-3 ring-1 ring-inset ring-transparent transition-all focus-within:bg-white focus-within:ring-[#8E7AF6] focus-within:shadow-sm
            ${error ? "ring-red-500/50 bg-red-50" : ""}
          `}
        >
          {/* Left Icon Area */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center text-black/40 group-focus-within:text-[#8E7AF6]">
            {icon}
          </div>

          {/* Input Field */}
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-full w-full bg-transparent py-2 pl-2 pr-1 text-[16px] text-black placeholder:text-black/30 focus:outline-none"
            placeholder={placeholder}
            aria-label={label}
          />

          {/* Password Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={toggleShowPassword}
              className="flex h-10 w-10 shrink-0 items-center justify-center text-black/40 hover:text-black/70 focus:outline-none"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          )}
        </div>

        {/* Error Text */}
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-1 ml-4 text-[13px] font-medium text-red-500"
          >
            {error}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

// --- Icons ---

function UserIcon() {
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailIcon() {
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
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LockIcon() {
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
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon() {
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
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
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
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07-2.3 2.3" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}
