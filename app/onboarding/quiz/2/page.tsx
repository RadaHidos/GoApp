"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

interface QuizOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const OPTIONS: QuizOption[] = [
  { id: "street-food", label: "Street Food", icon: <TacoIcon /> },
  { id: "museums", label: "Museums", icon: <MuseumIcon /> },
  { id: "beach", label: "Beach & Chill", icon: <BeachIcon /> },
  { id: "party", label: "Nightlife", icon: <PartyIcon /> },
  { id: "nature", label: "Nature", icon: <TreeIcon /> },
  { id: "cafe", label: "Café Hopping", icon: <CoffeeIcon /> },
  { id: "luxury", label: "Luxury", icon: <StarIcon /> },
  { id: "hidden-gems", label: "Hidden Gems", icon: <MapIcon /> },
];

export default function OnboardingQuizPage2() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  // Scroll to top on mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleOption = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
      return;
    }
    if (selected.length < 3) setSelected([...selected, id]);
  };

  const handleNext = () => {
    if (selected.length > 0) router.push("/onboarding/quiz/3");
  };

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] text-[#1D1D1F]">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-6 py-6 font-sans">
        {/* Navigation Header */}
        <header className="mb-8 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-sm ring-1 ring-black/5 transition-transform active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeftIcon />
          </button>

          {/* Progress Bar */}
          <div className="flex-1 mx-6 flex h-1.5 overflow-hidden rounded-full bg-gray-200">
            <motion.div
              initial={{ width: "33%" }}
              animate={{ width: "66%" }}
              transition={{ duration: 0.8, ease: easeOut }}
              className="h-full bg-[#8E7AF6]"
            />
          </div>

          <div className="w-10" />
        </header>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
          className="mb-8 px-1"
        >
          <h1 className="mb-3 text-[32px] font-bold leading-[1.1] tracking-tight text-black">
            How do you want to{" "}
            <span className="text-[#8E7AF6]">spend your days</span>?
          </h1>
          <p className="text-[17px] leading-relaxed text-black/50">
            Pick up to 3 options.
          </p>
        </motion.div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-4">
          {OPTIONS.map((option, index) => {
            const isSelected = selected.includes(option.id);
            const isDisabled = !isSelected && selected.length >= 3;

            return (
              <motion.button
                key={option.id}
                onClick={() => !isDisabled && toggleOption(option.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isDisabled ? 0.4 : 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + index * 0.05,
                  ease: easeOut,
                }}
                whileHover={isDisabled ? {} : { scale: 1.02 }}
                whileTap={isDisabled ? {} : { scale: 0.98 }}
                className={`relative flex min-h-[140px] flex-col justify-between rounded-[28px] p-5 text-left transition-all duration-300 border-2
                  ${
                    isSelected
                      ? "border-[#8E7AF6] bg-white shadow-lg shadow-[#8E7AF6]/10"
                      : "border-transparent bg-white shadow-sm"
                  }
                  ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
                `}
              >
                <div className="flex w-full items-start justify-between">
                  <div
                    className={`transition-colors duration-300 ${isSelected ? "text-[#8E7AF6]" : "text-black/40"}`}
                  >
                    {option.icon}
                  </div>
                  <div
                    className={`h-6 w-6 rounded-full border-2 transition-all flex items-center justify-center
                    ${isSelected ? "bg-[#8E7AF6] border-[#8E7AF6]" : "border-black/5"}
                  `}
                  >
                    {isSelected && <CheckIcon />}
                  </div>
                </div>

                <span
                  className={`text-[15px] font-bold leading-tight ${isSelected ? "text-black" : "text-black/60"}`}
                >
                  {option.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="flex-1" />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <button
            onClick={handleNext}
            disabled={selected.length === 0}
            className={`w-full rounded-full py-[20px] text-[17px] font-bold text-white shadow-lg transition-all duration-300
              ${selected.length > 0 ? "bg-[#0B0C0F] shadow-black/10 scale-[1.02]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}
            `}
          >
            Continue {selected.length > 0 ? `(${selected.length}/3)` : ""}
          </button>

          <button
            onClick={() => router.push("/onboarding/quiz/3")}
            className="text-[14px] font-bold text-black/30 hover:text-black/60 transition-colors uppercase tracking-widest"
          >
            Skip for now
          </button>
        </motion.div>
      </div>
    </main>
  );
}

// --- Icons (Simplified/Unified) ---
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
function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function TacoIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 15a10 10 0 0 1 20 0" />
      <path d="M13 14H19" />
      <path d="M13 10H17" />
      <path d="M5 14H9" />
      <path d="M12 15v5" />
    </svg>
  );
}
function MuseumIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 22h16" />
      <path d="M8 22v-8" />
      <path d="M16 22v-8" />
      <path d="M12 22v-8" />
      <path d="M22 9 12 4 2 9" />
      <path d="M3 14h18" />
    </svg>
  );
}
function BeachIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20c4-2 12-2 16 0" />
      <path d="M7 19c0-6 3-12 5-12s5 6 5 12" />
    </svg>
  );
}
function PartyIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21l5-5" />
      <path d="M14 3l7 7-7 7-7-7z" />
    </svg>
  );
}
function TreeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3 4 15h16L12 3Z" />
      <path d="M12 15v6" />
    </svg>
  );
}
function CoffeeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function MapIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    </svg>
  );
}
