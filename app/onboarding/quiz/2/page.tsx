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
  { id: "street-food", label: "Street Food Hunting", icon: <TacoIcon /> },
  { id: "museums", label: "Museums & Culture", icon: <MuseumIcon /> },
  { id: "beach", label: "Beach & Chill", icon: <BeachIcon /> },
  { id: "party", label: "Party All Night", icon: <PartyIcon /> },
  { id: "nature", label: "Nature & Hiking", icon: <TreeIcon /> },
  { id: "cafe", label: "Café Hopping", icon: <CoffeeIcon /> },
  { id: "luxury", label: "Luxury Experiences", icon: <StarIcon /> },
  { id: "hidden-gems", label: "Local Hidden Gems", icon: <MapIcon /> },
];

export default function OnboardingQuizPage2() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

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
          <div className="flex h-1.5 w-24 overflow-hidden rounded-full bg-gray-200">
            <motion.div
              initial={{ width: "33%" }}
              animate={{ width: "66%" }}
              transition={{ duration: 0.8, ease: easeOut }}
              className="h-full bg-[#8E7AF6]"
            />
          </div>

          <button
            onClick={() => router.push("/onboarding/quiz/3")}
            className="text-[15px] font-medium text-black/40 transition-colors hover:text-black"
          >
            Skip
          </button>
        </header>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
          className="mb-8 px-1"
        >
          <h1 className="mb-2 text-[32px] font-bold leading-[1.1] tracking-tight text-black">
            How do you want to spend your days?
          </h1>
          <p className="text-[17px] leading-relaxed text-black/60">
            Pick up to 3. We'll tailor your trips around this.
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
                animate={{ opacity: isDisabled ? 0.6 : 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + index * 0.05,
                  ease: easeOut,
                }}
                whileHover={isDisabled ? {} : { scale: 1.02 }}
                whileTap={isDisabled ? {} : { scale: 0.98 }}
                className={`relative flex min-h-[120px] flex-col justify-between rounded-[24px] p-5 text-left transition-all duration-300
                  ${
                    isSelected
                      ? "bg-[#F3F0FF] text-[#5B21B6] ring-2 ring-[#8E7AF6] shadow-[0_8px_30px_rgba(142,122,246,0.25)]"
                      : "bg-white text-black ring-1 ring-black/5 shadow-sm"
                  }
                  ${
                    isDisabled
                      ? "cursor-not-allowed"
                      : "cursor-pointer hover:ring-[#E5E7EB]"
                  }
                `}
              >
                <div className="flex w-full items-start justify-between">
                  {/* Icon */}
                  <div
                    className={`transition-colors duration-300 ${
                      isSelected ? "text-[#8E7AF6]" : "text-black"
                    }`}
                  >
                    {option.icon}
                  </div>

                  {/* Checkmark */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8E7AF6] text-white shadow-md"
                      >
                        <CheckIcon className="h-3 w-3" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <span
                  className={`text-[15px] font-bold leading-tight ${
                    isSelected ? "text-[#5B21B6]" : "text-black"
                  }`}
                >
                  {option.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 flex gap-3 rounded-[20px] bg-[#F3F0FF] p-4 text-[#6D28D9]"
        >
          <InfoIcon className="mt-0.5 shrink-0" />
          <p className="text-[13px] font-medium leading-relaxed">
            You can always refine your preferences later.
          </p>
        </motion.div>

        <div className="flex-1" />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8"
        >
          <button
            onClick={handleNext}
            disabled={selected.length === 0}
            className={`w-full rounded-full py-[18px] text-[17px] font-semibold text-white shadow-lg transition-all duration-300
              ${
                selected.length > 0
                  ? "bg-[#0B0C0F] shadow-black/10 hover:scale-[1.02] hover:bg-black"
                  : "cursor-not-allowed bg-gray-300 opacity-50"
              }
            `}
          >
            Continue {selected.length > 0 ? `(${selected.length}/3)` : ""}
          </button>
        </motion.div>
      </div>
    </main>
  );
}

// --- Icons ---

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
      <path d="M7 10h1" />
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
      <path d="M12 4v3" />
      <path d="M9 7h6" />
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
      <path d="M7 17l4 4" />
      <path d="M14 3l7 7-7 7-7-7z" />
      <path d="M14 3v7h7" />
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
      <path d="M9 21h6" />
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
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
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
      <line x1="8" x2="8" y1="2" y2="18" />
      <line x1="16" x2="16" y1="6" y2="22" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
