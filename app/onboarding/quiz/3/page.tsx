"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function QuizStep3Page() {
  const router = useRouter();
  const [selected, setSelected] = useState<"solo" | "duo" | "group" | null>(
    null,
  );
  const [groupSize, setGroupSize] = useState(4);
  const [progress, setProgress] = useState(66); // Start partially filled to animate

  // Animate progress on mount
  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (id: "solo" | "duo" | "group") => {
    setSelected(id);
  };

  const updateGroupSize = (delta: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card toggle
    setGroupSize((prev) => {
      const next = prev + delta;
      if (next < 3) return 3;
      if (next > 12) return 12;
      return next;
    });
  };

  const handleFinish = () => {
    if (!selected) return;
    // Here you would save the data
    router.push("/home");
  };

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] text-[#1D1D1F] flex flex-col items-center font-sans selection:bg-[#8E7AF6]/20">
      {/* Mobile Container */}
      <div className="w-full max-w-[430px] flex-1 flex flex-col px-6 py-6 relative">
        {/* --- Header --- */}
        <header className="flex items-center justify-between mb-8">
          {/* Back Button */}
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
              className="h-full bg-[#8E7AF6]"
              initial={{ width: "66%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: easeOut }}
            />
          </div>

          {/* Skip */}
          <button
            onClick={() => router.push("/home")}
            className="text-[15px] font-medium text-[#1D1D1F]/40 hover:text-[#1D1D1F]/60 transition-colors"
          >
            Skip
          </button>
        </header>

        {/* --- Title Section --- */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
            className="text-[28px] font-bold leading-tight tracking-tight text-[#1D1D1F] mb-3"
          >
            Who are you dragging with you?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
            className="text-[17px] text-[#1D1D1F]/60 leading-relaxed"
          >
            Trips hit different depending on the crew.
          </motion.p>
        </div>

        {/* --- Options List --- */}
        <div className="space-y-4 flex-1">
          <OptionCard
            id="solo"
            title="Solo Wolf"
            description="I move at my own pace."
            selected={selected === "solo"}
            onSelect={() => handleSelect("solo")}
            delay={0.3}
            icon={<AvatarSolo />}
          />
          <OptionCard
            id="duo"
            title="Dynamic Duo"
            description="Just me and my favorite human."
            selected={selected === "duo"}
            onSelect={() => handleSelect("duo")}
            delay={0.4}
            icon={<AvatarDuo />}
          />
          <OptionCard
            id="group"
            title="The Group Chat"
            description="The more chaotic, the better."
            selected={selected === "group"}
            onSelect={() => handleSelect("group")}
            delay={0.5}
            icon={<AvatarGroup />}
          >
            {/* Expanded Content for Group */}
            <AnimatePresence>
              {selected === "group" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-[#8E7AF6]/15 flex items-center justify-between">
                    <span className="text-[15px] font-medium text-[#1D1D1F]/70">
                      Party Size
                    </span>

                    <div className="flex items-center gap-4">
                      <CounterButton
                        icon="minus"
                        disabled={groupSize <= 3}
                        onClick={(e) => updateGroupSize(-1, e)}
                      />
                      <span className="min-w-[70px] text-center font-semibold text-[17px] tabular-nums">
                        {groupSize}{" "}
                        {/* <span className="text-sm font-medium text-black/40">
                          People
                        </span> */}
                      </span>
                      <CounterButton
                        icon="plus"
                        disabled={groupSize >= 12}
                        onClick={(e) => updateGroupSize(1, e)}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </OptionCard>
        </div>

        {/* --- Footer CTA --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: easeOut }}
          className="mt-8 pt-4 pb-2"
        >
          <button
            onClick={handleFinish}
            disabled={!selected}
            className={`
              w-full py-[18px] rounded-full text-[17px] font-semibold tracking-wide shadow-lg
              flex items-center justify-center gap-2 transform transition-all duration-300
              ${
                selected
                  ? "bg-[#0B0C0F] text-white hover:scale-[1.02] active:scale-[0.98] shadow-black/10"
                  : "bg-[#E5E5E5] text-[#A1A1AA] cursor-not-allowed shadow-none"
              }
            `}
          >
            Finish & Build my profile →
          </button>
        </motion.div>
      </div>
    </main>
  );
}

// --- Sub Components ---

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

function OptionCard({
  id,
  title,
  description,
  selected,
  onSelect,
  delay,
  icon,
  children,
}: {
  id: string;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  delay: number;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: easeOut }}
      onClick={onSelect}
      className={`
        relative overflow-hidden rounded-[24px] p-5 cursor-pointer transition-all duration-300
        ${
          selected
            ? "bg-[#F3F0FF] ring-2 ring-[#8E7AF6] shadow-[0_8px_24px_rgba(142,122,246,0.12)]"
            : "bg-white ring-1 ring-black/5 shadow-sm hover:ring-black/10 hover:shadow-md"
        }
      `}
    >
      <div className="flex items-center gap-4">
        {/* Avatar/Icon */}
        <div
          className={`
            flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center
            transition-colors duration-300
            ${selected ? "bg-[#8E7AF6]/10" : "bg-[#FAFAFA]"}
        `}
        >
          {icon}
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3
            className={`text-[17px] font-bold mb-0.5 transition-colors ${selected ? "text-[#8E7AF6]" : "text-[#1D1D1F]"}`}
          >
            {title}
          </h3>
          <p className="text-[14px] text-[#1D1D1F]/60 leading-tight">
            {description}
          </p>
        </div>

        {/* Radio Indicator */}
        <div
          className={`
            w-6 h-6 rounded-full border-[2px] flex items-center justify-center transition-all duration-300
            ${selected ? "border-[#8E7AF6] bg-[#8E7AF6]" : "border-[#E5E5E5] bg-transparent"}
        `}
        >
          {selected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-white"
            >
              <CheckIcon className="w-3.5 h-3.5" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Expandable Group Content */}
      {children}
    </motion.div>
  );
}

function CounterButton({
  icon,
  disabled,
  onClick,
}: {
  icon: "plus" | "minus";
  disabled: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all
                ${
                  disabled
                    ? "bg-[#E5E5E5]/50 text-[#A1A1AA] cursor-not-allowed"
                    : "bg-white shadow-sm ring-1 ring-black/5 text-[#1D1D1F] hover:shadow-md active:scale-90"
                }
            `}
    >
      {icon === "minus" ? (
        <MinusIcon className="w-5 h-5" />
      ) : (
        <PlusIcon className="w-5 h-5" />
      )}
    </button>
  );
}

// --- Icons ---

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
  );
}

// Avatar Icons

function AvatarSolo() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="8" r="4" fill="#1D1D1F" fillOpacity="0.8" />
      <path
        d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
        stroke="#1D1D1F"
        strokeOpacity="0.8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AvatarDuo() {
  return (
    <svg
      width="28"
      height="24"
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.4">
        <circle cx="19" cy="8" r="3.5" fill="#1D1D1F" />
        <path
          d="M13 18.5C13 15.7386 15.6863 13.5 19 13.5C22.3137 13.5 25 15.7386 25 18.5"
          stroke="#1D1D1F"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <g>
        <circle cx="9" cy="9" r="4" fill="#1D1D1F" fillOpacity="0.8" />
        <path
          d="M2.5 20.5C2.5 17.4624 5.41015 15 9 15C12.5899 15 15.5 17.4624 15.5 20.5"
          stroke="#1D1D1F"
          strokeOpacity="0.8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

function AvatarGroup() {
  return (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.3">
        <circle cx="21" cy="7" r="3" fill="#1D1D1F" />
        <path
          d="M16.5 16.5C16.5 14.2909 18.5147 12.5 21 12.5C23.4853 12.5 25.5 14.2909 25.5 16.5"
          stroke="#1D1D1F"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <g opacity="0.3">
        <circle cx="26" cy="9" r="2.5" fill="#1D1D1F" />
        <path
          d="M22.5 17C22.5 15.6193 24.067 14.5 26 14.5C27.933 14.5 29.5 15.6193 29.5 17"
          stroke="#1D1D1F"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <g>
        <circle cx="10" cy="9" r="4" fill="#1D1D1F" fillOpacity="0.8" />
        <path
          d="M3 20.5C3 17.1863 6.13401 14.5 10 14.5C13.866 14.5 17 17.1863 17 20.5"
          stroke="#1D1D1F"
          strokeOpacity="0.8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
