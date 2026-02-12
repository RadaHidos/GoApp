"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const MOCK_UNIVERSITIES = [
  "University of Barcelona",
  "Universitat Pompeu Fabra (UPF)",
  "Universitat Politècnica de Catalunya (UPC)",
  "ESADE Business School",
  "IE University",
  "EADA Business School",
  "Universitat Autònoma de Barcelona (UAB)",
  "TBS Education - Barcelona",
];

export default function OnboardingStudyPage() {
  const router = useRouter();
  const [university, setUniversity] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUniversity(value);
    setError("");

    if (value.length > 0) {
      const filtered = MOCK_UNIVERSITIES.filter((uni) =>
        uni.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (uni: string) => {
    setUniversity(uni);
    setShowSuggestions(false);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!university.trim()) {
      setError("Please enter your university.");
      return;
    }

    setIsLoading(true);
    // Mock network request
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
          className="mb-10 px-1"
        >
          <h1 className="mb-3 text-[32px] font-bold leading-tight tracking-tight text-black">
            One last thing...
          </h1>
          <p className="text-[17px] leading-relaxed text-black/60">
            Find your university to connect with your campus community.
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex min-h-[400px] flex-col">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
            className="relative"
          >
            <label
              htmlFor="university"
              className="ml-1 mb-2 block text-[13px] font-medium text-black/60"
            >
              Where do you study?
            </label>

            <div className="relative group z-20">
              <div
                className={`flex w-full items-center overflow-hidden rounded-[20px] bg-[#F3F4F6] px-4 py-3 ring-1 ring-inset ring-transparent transition-all focus-within:bg-white focus-within:ring-[#8E7AF6] focus-within:shadow-sm
                  ${error ? "ring-red-500/50 bg-red-50" : ""}
                `}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center text-black/40 group-focus-within:text-[#8E7AF6]">
                  <SchoolIcon />
                </div>
                <input
                  id="university"
                  type="text"
                  value={university}
                  onChange={handleInputChange}
                  className="h-full w-full bg-transparent py-2 pl-2 pr-1 text-[16px] text-black placeholder:text-black/30 focus:outline-none"
                  placeholder="University name"
                  autoComplete="off"
                />
              </div>

              {/* Error Message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-1 ml-4 text-[13px] font-medium text-red-500"
                >
                  {error}
                </motion.p>
              )}

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-full overflow-hidden rounded-[20px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] ring-1 ring-black/5 z-30"
                  >
                    <ul>
                      {suggestions.map((uni, index) => (
                        <li key={index}>
                          <button
                            type="button"
                            onClick={() => handleSelectSuggestion(uni)}
                            className="w-full px-5 py-4 text-left text-[15px] font-medium text-black transition-colors hover:bg-[#F3F4F6]"
                          >
                            {uni}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="flex-1" />

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={`mt-4 w-full rounded-full bg-[#0B0C0F] py-[18px] text-[17px] font-semibold text-white shadow-lg shadow-black/5 transition-all relative z-10
              ${isLoading ? "cursor-not-allowed opacity-80" : "hover:bg-black/90"}
            `}
          >
            {isLoading ? "Creating account..." : "Create account →"}
          </motion.button>
        </form>

        <div className="flex-1" />

        {/* Footer Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 text-center text-[15px] font-medium text-black/60 relative z-10"
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

// --- Icons ---

function SchoolIcon() {
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
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
