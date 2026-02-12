"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
      name: formData.name ? "" : "Full name is required",
      email: formData.email ? "" : "Email address is required",
      password: formData.password ? "" : "Password is required",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Mock network request
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    router.push("/onboarding/study");
  };

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] text-[#1D1D1F]">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-6 py-6 font-sans">
        {/* Navigation - Standardized consistency */}
        <header className="mb-8">
          <button
            onClick={handleBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-sm ring-1 ring-black/5 transition-transform active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeftIcon />
          </button>
        </header>

        {/* Header - Hierarchy & Visual Weight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
          className="mb-8 px-1"
        >
          <h1 className="mb-2 text-[32px] font-bold leading-tight tracking-tight text-black">
            Create account
          </h1>
          <p className="text-[17px] text-black/50">
            Let's get your journey started.
          </p>
        </motion.div>

        {/* Form - Error Prevention & Recognition */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <InputGroup
            label="Full Name"
            value={formData.name}
            onChange={(val: string) => setFormData({ ...formData, name: val })}
            error={errors.name}
            placeholder="e.g. Alex Rivera"
            delay={0.2}
          />
          <InputGroup
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(val: string) => setFormData({ ...formData, email: val })}
            error={errors.email}
            placeholder="name@example.com"
            delay={0.3}
          />
          <InputGroup
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(val: string) =>
              setFormData({ ...formData, password: val })
            }
            error={errors.password}
            placeholder="Create a password"
            delay={0.4}
            isPassword
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
          />

          <div className="flex-1" />

          {/* Submit - Unified Signifier */}
          <motion.button
            type="submit"
            disabled={isLoading}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: easeOut }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={`mt-4 w-full rounded-full bg-[#0B0C0F] py-[20px] text-[17px] font-bold text-white shadow-lg transition-all
              ${isLoading ? "opacity-80 cursor-wait" : "hover:bg-black"}
            `}
          >
            {isLoading ? "Creating account..." : "Continue"}
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 text-center text-[15px] font-medium text-black/40"
        >
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="font-bold text-[#8E7AF6] hover:underline"
          >
            Log in
          </button>
        </motion.div>
      </div>
    </main>
  );
}

// --- Reusable Components ---
function InputGroup({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  delay,
  isPassword,
  showPassword,
  togglePassword,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: easeOut }}
      className="space-y-1"
    >
      <label className="ml-1 text-[13px] font-bold text-black/50 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-[20px] border-0 bg-white px-6 py-4 text-[16px] text-black shadow-sm ring-1 ring-inset transition-all placeholder:text-black/20 focus:ring-2 focus:ring-[#8E7AF6] focus:outline-none
            ${error ? "ring-red-500" : "ring-black/5"}
          `}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/60"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="ml-1 text-[13px] font-medium text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
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
