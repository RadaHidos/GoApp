"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const UNIVERSITIES = [
  "University of Barcelona",
  "Harbour Space University",
  "ESADE Business School",
  "IE University",
  "EADA Business School",
  "UPF Barcelona",
];

export default function OnboardingStudyPage() {
  const router = useRouter();
  const [university, setUniversity] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filteredSuggestions = UNIVERSITIES.filter((u) =>
    u.toLowerCase().includes(university.toLowerCase()),
  );
  const isValidSelection = UNIVERSITIES.includes(university);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidSelection) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/onboarding/success");
  };

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] text-[#1D1D1F]">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-6 py-6 font-sans">
        <header className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-sm ring-1 ring-black/5 active:scale-95"
          >
            <ArrowLeftIcon />
          </button>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 px-1"
        >
          <h1 className="mb-3 text-[32px] font-bold leading-tight tracking-tight text-black">
            One last thing...
          </h1>
          <p className="text-[17px] text-black/50">
            Where do you study? We'll show you trips popular on your campus.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          <div className="relative">
            <input
              type="text"
              value={university}
              onChange={(e) => {
                setUniversity(e.target.value);
                setShowSuggestions(true);
              }}
              placeholder="Search your university..."
              className="w-full rounded-[24px] border-0 bg-white px-6 py-5 text-[17px] text-black shadow-sm ring-1 ring-black/5 focus:ring-2 focus:ring-[#8E7AF6] focus:outline-none transition-all"
            />

            <AnimatePresence>
              {showSuggestions && university && !isValidSelection && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full left-0 right-0 z-20 mt-2 overflow-hidden rounded-[20px] bg-white shadow-2xl ring-1 ring-black/5"
                >
                  {filteredSuggestions.map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => {
                        setUniversity(u);
                        setShowSuggestions(false);
                      }}
                      className="w-full px-6 py-4 text-left text-[16px] font-medium hover:bg-[#F5F3FF] transition-colors"
                    >
                      {u}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-1" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <button
              type="submit"
              disabled={!isValidSelection || isLoading}
              className={`w-full rounded-full py-[20px] text-[17px] font-bold text-white shadow-lg transition-all ${
                isValidSelection
                  ? "bg-[#0B0C0F] shadow-black/10 scale-[1.02]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Saving..." : "Create Account"}
            </button>
          </motion.div>
        </form>
      </div>
    </main>
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