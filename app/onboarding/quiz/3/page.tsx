"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function OnboardingQuizPage3() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFinish = () => {
    if (selectedOption) {
      router.push("/onboarding/success");
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
          <div className="flex-1 mx-6 flex h-1.5 overflow-hidden rounded-full bg-gray-200">
            <motion.div
              initial={{ width: "66%" }}
              animate={{ width: "100%" }}
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
            Who's <span className="text-[#8E7AF6]">coming along</span>?
          </h1>
          <p className="text-[17px] leading-relaxed text-black/50">
            This helps us suggest the best stays.
          </p>
        </motion.div>

        {/* Options */}
        <div className="flex flex-col gap-4">
          <QuizOptionCard
            id="solo"
            title="Solo Adventurer"
            description="Just me and the open road. I'm looking for social vibes and easy logistics."
            selected={selectedOption === "solo"}
            onSelect={() => setSelectedOption("solo")}
            delay={0.2}
            icon={<UserIcon />}
          />

          <QuizOptionCard
            id="partner"
            title="Couples Trip"
            description="Romantic spots, nice dinners, and a bit more privacy than a hostel dorm."
            selected={selectedOption === "partner"}
            onSelect={() => setSelectedOption("partner")}
            delay={0.3}
            icon={<HeartIcon />}
          />

          <QuizOptionCard
            id="friends"
            title="Group of Friends"
            description="We need space for the whole squad and activities that everyone will love."
            selected={selectedOption === "friends"}
            onSelect={() => setSelectedOption("friends")}
            delay={0.4}
            icon={<UsersIcon />}
          />
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
            onClick={handleFinish}
            disabled={!selectedOption}
            className={`w-full rounded-full py-[20px] text-[17px] font-bold text-white shadow-lg transition-all duration-300
              ${selectedOption ? "bg-[#0B0C0F] shadow-black/10 scale-[1.02]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}
            `}
          >
            Finish & Explore
          </button>

          <button
            onClick={() => router.push("/onboarding/success")}
            className="text-[14px] font-bold text-black/30 hover:text-black/60 transition-colors uppercase tracking-widest"
          >
            I'll decide later
          </button>
        </motion.div>
      </div>
    </main>
  );
}

// --- Card Component ---
function QuizOptionCard({
  title,
  description,
  selected,
  onSelect,
  delay,
  icon,
}: {
  id: string;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  delay: number;
  icon: React.ReactNode;
}) {
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
      <div className="mb-4 flex items-center justify-between">
        <div
          className={`h-10 w-10 flex items-center justify-center rounded-xl ${selected ? "bg-[#F3F0FF] text-[#8E7AF6]" : "bg-gray-50 text-black/40"}`}
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
      <h3 className="mb-1 text-[18px] font-bold text-black">{title}</h3>
      <p className="text-[14px] leading-relaxed text-black/50">{description}</p>
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function HeartIcon() {
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
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function UsersIcon() {
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
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
