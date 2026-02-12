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

          {/* Progress Bar */}
          <div className="flex h-1.5 w-24 overflow-hidden rounded-full bg-gray-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "25%" }}
              transition={{ duration: 0.8, ease: easeOut }}
              className="h-full bg-[#8E7AF6]"
            />
          </div>

          <button
            onClick={() => router.push("/home")}
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
            What’s your{" "}
            <span className="bg-gradient-to-r from-[#8E7AF6] to-[#A78BFA] bg-clip-text text-transparent">
              money
            </span>{" "}
            travel vibe?
          </h1>
          <p className="text-[17px] leading-relaxed text-black/60">
            Be honest. We won’t tell your mom.
          </p>
        </motion.div>

        {/* Options Grid */}
        <div className="flex flex-col gap-4">
          <QuizOptionCard
            id="student-loan"
            title="Student Loan Traveler"
            description="I’m here for a good time, not a long time. My back might hurt, but my wallet won’t."
            tags={["Hostels", "Cheap Eats"]}
            selected={selectedOption === "student-loan"}
            onSelect={() => setSelectedOption("student-loan")}
            delay={0.2}
            icon={<BackpackIcon />}
            iconBg="bg-orange-100 text-orange-600"
          />

          <QuizOptionCard
            id="part-time-hustler"
            title="Part-time Hustler"
            description="I’ve got some savings and I’m not afraid to use them. No 12-hour layovers, please."
            tags={["Private Rooms", "Direct Flights"]}
            selected={selectedOption === "part-time-hustler"}
            onSelect={() => setSelectedOption("part-time-hustler")}
            delay={0.3}
            icon={<BriefcaseIcon />}
            iconBg="bg-purple-100 text-[#8E7AF6]"
          />
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-6 flex gap-3 rounded-[20px] bg-[#F5F3FF] p-4 text-[#6D28D9]"
        >
          <InfoIcon className="shrink-0 mt-0.5" />
          <p className="text-[13px] font-medium leading-relaxed">
            Don’t worry, you can always adjust your preferences later. This just
            sets the vibe.
          </p>
        </motion.div>

        <div className="flex-1" />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`w-full rounded-full py-[18px] text-[17px] font-semibold text-white shadow-lg transition-all duration-300
              ${
                selectedOption
                  ? "bg-[#0B0C0F] shadow-black/10 hover:scale-[1.02] hover:bg-black"
                  : "cursor-not-allowed bg-gray-300 opacity-50"
              }
            `}
          >
            Continue
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
      className={`group relative cursor-pointer overflow-hidden rounded-[24px] border p-5 transition-all duration-300
        ${
          selected
            ? "border-[#8E7AF6] bg-white ring-4 ring-[#8E7AF6]/10 shadow-lg"
            : "border-transparent bg-white shadow-sm ring-1 ring-black/5 hover:scale-[1.01] hover:shadow-md"
        }
      `}
    >
      <div className="mb-4 flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBg}`}
        >
          {icon}
        </div>

        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8E7AF6] text-white"
          >
            <CheckIcon className="h-3.5 w-3.5" />
          </motion.div>
        )}
      </div>

      <h3 className="mb-2 text-[18px] font-bold text-black">{title}</h3>
      <div className="mb-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-600 uppercase tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-[14px] leading-relaxed text-black/60">{description}</p>
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
