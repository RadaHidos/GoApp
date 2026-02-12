"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function OnboardingQuizPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedOption) {
      router.push("/onboarding/quiz/2");
    }
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
          {/* Progress Bar - Visibility of System Status */}
          <div className="flex-1 mx-6 flex h-1.5 overflow-hidden rounded-full bg-gray-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "33%" }}
              transition={{ duration: 0.8, ease: easeOut }}
              className="h-full bg-[#8E7AF6]"
            />
          </div>
          <div className="w-10" /> {/* Spacer for balance */}
        </header>

        {/* Title Section - Hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
          className="mb-8 px-1"
        >
          <h1 className="mb-3 text-[32px] font-bold leading-[1.1] tracking-tight text-black">
            What’s your <span className="text-[#8E7AF6]">money vibe</span>?
          </h1>
          <p className="text-[17px] leading-relaxed text-black/50">
            We'll suggest trips that fit your budget.
          </p>
        </motion.div>

        {/* Options - Affordance & Feedback */}
        <div className="flex flex-col gap-4">
          <QuizOptionCard
            id="student-loan"
            title="Student Loan Traveler"
            description="I’m here for a good time, not a long time. Hostels and street food are my best friends."
            tags={["Budget", "Hostels"]}
            selected={selectedOption === "student-loan"}
            onSelect={() => setSelectedOption("student-loan")}
            delay={0.2}
            icon={<BackpackIcon />}
            iconBg="bg-orange-50 text-orange-600"
          />

          <QuizOptionCard
            id="part-time-hustler"
            title="Comfort Hunter"
            description="I want a nice bed and a direct flight. I've saved up and I'm ready to spend it."
            tags={["Mid-range", "Hotels"]}
            selected={selectedOption === "part-time-hustler"}
            onSelect={() => setSelectedOption("part-time-hustler")}
            delay={0.3}
            icon={<BriefcaseIcon />}
            iconBg="bg-purple-50 text-[#8E7AF6]"
          />
        </div>

        <div className="flex-1" />

        {/* Bottom CTA - Hierarchy & Constraints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`w-full rounded-full py-[20px] text-[17px] font-bold text-white shadow-lg transition-all duration-300
              ${selectedOption ? "bg-[#0B0C0F] shadow-black/10 scale-[1.02]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}
            `}
          >
            Continue
          </button>

          <button
            onClick={() => router.push("/onboarding/quiz/2")}
            className="text-[14px] font-bold text-black/30 hover:text-black/60 transition-colors uppercase tracking-widest"
          >
            Skip for now
          </button>
        </motion.div>
      </div>
    </main>
  );
}

// --- Components ---
interface QuizOptionCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  selected: boolean;
  onSelect: () => void;
  delay: number;
  icon: React.ReactNode;
  iconBg: string;
}

function QuizOptionCard({
  title,
  description,
  tags,
  selected,
  onSelect,
  delay,
  icon,
  iconBg,
}: QuizOptionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: easeOut }}
      onClick={onSelect}
      className={`relative cursor-pointer rounded-[28px] border-2 p-6 transition-all duration-300
        ${selected ? "border-[#8E7AF6] bg-white shadow-xl shadow-[#8E7AF6]/10 translate-y-[-2px]" : "border-transparent bg-white shadow-sm hover:shadow-md"}
      `}
    >
      <div className="mb-5 flex items-center justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg}`}
        >
          {icon}
        </div>
        <div
          className={`h-6 w-6 rounded-full border-2 transition-all flex items-center justify-center
          ${selected ? "bg-[#8E7AF6] border-[#8E7AF6]" : "border-black/5"}
        `}
        >
          {selected && <CheckIcon />}
        </div>
      </div>

      <h3 className="mb-2 text-[19px] font-bold text-black">{title}</h3>
      <p className="mb-4 text-[14px] leading-relaxed text-black/50">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg bg-gray-50 px-3 py-1 text-[11px] font-bold text-black/40 uppercase tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
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

function BackpackIcon() {
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
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
      <path d="M2 10h20" />
    </svg>
  );
}

function BriefcaseIcon() {
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
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
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
