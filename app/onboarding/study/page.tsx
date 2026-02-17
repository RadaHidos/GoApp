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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-6 py-6 font-sans"
      >
        <motion.header variants={itemVariants} className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-sm ring-1 ring-black/5 active:scale-95 transition-transform"
          >
            <ArrowLeftIcon />
          </button>
        </motion.header>

        <motion.div variants={itemVariants} className="mb-10 px-1">
          <h1 className="mb-3 text-[32px] font-bold leading-tight tracking-tight text-black">
            One last thing...
          </h1>
          <p className="text-[17px] text-black/50">
            Where do you study? We'll show you trips popular on your campus.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          <motion.div variants={itemVariants} className="relative">
            <input
              type="text"
              value={university}
              onChange={(e) => {
                setUniversity(e.target.value);
                setShowSuggestions(true);
              }}
              placeholder="Search your university..."
              className="w-full rounded-[24px] border-0 bg-white px-6 py-5 text-[17px] text-black shadow-sm ring-1 ring-black/5 focus:ring-2 focus:ring-[#8E7AF6] focus:outline-none transition-all placeholder:text-black/30"
            />

            <AnimatePresence>
              {showSuggestions && university && !isValidSelection && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
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
                      className="w-full px-6 py-4 text-left text-[16px] font-medium hover:bg-[#F5F3FF] transition-colors text-black/80"
                    >
                      {u}
                    </button>
                  ))}
                  {filteredSuggestions.length === 0 && (
                    <div className="px-6 py-4 text-[15px] text-black/40 italic">
                      No universities found
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="flex-1" />

          <motion.div variants={itemVariants} className="mt-8 pb-4">
            <button
              type="submit"
              disabled={!isValidSelection || isLoading}
              className={`w-full rounded-full py-[20px] text-[17px] font-bold text-white shadow-lg transition-all active:scale-[0.98] ${
                isValidSelection
                  ? "bg-[#0B0C0F] shadow-black/10 hover:shadow-xl"
                  : "bg-[#E5E5E5] text-[#A3A3A3] cursor-not-allowed shadow-none"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="block h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Saving...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
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
