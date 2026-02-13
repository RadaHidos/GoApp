"use client";

import { motion } from "framer-motion";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface LiquidTabBarProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function LiquidTabBar({
  tabs,
  activeTab,
  onChange,
}: LiquidTabBarProps) {
  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto relative flex items-center justify-between gap-1 p-2 h-[68px] min-w-[320px] w-[92vw] max-w-[380px] rounded-[34px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)]">
        {/* --- Glass Background Layers --- */}

        {/* Blur Layer */}
        <div className="absolute inset-0 rounded-[34px] bg-white/60 backdrop-blur-2xl border border-white/20 ring-1 ring-black/5" />

        {/* Gloss Gradient (Top Highlight) */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-80" />
        <div className="absolute inset-0 rounded-[34px] bg-gradient-to-b from-white/40 via-white/10 to-transparent opacity-50 pointer-events-none" />

        {/* --- Tabs --- */}
        <div className="relative z-10 flex w-full items-center justify-between px-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className="group relative flex flex-1 flex-col items-center justify-center gap-[3px] py-1 cursor-pointer outline-none tap-highlight-transparent"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {/* Active Capsule Background */}
                {isActive && (
                  <motion.div
                    layoutId="active-capsule"
                    className="absolute inset-0 rounded-[24px] bg-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-black/5"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}

                {/* Icon Container */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    y: isActive ? -1 : 0,
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative z-10 transition-colors duration-300 ${
                    isActive
                      ? "text-[#8E7AF6]"
                      : "text-[#1D1D1F]/40 group-hover:text-[#1D1D1F]/60"
                  }`}
                >
                  <div className="h-[22px] w-[22px]">{tab.icon}</div>
                </motion.div>

                {/* Label */}
                <motion.span
                  animate={{
                    color: isActive ? "#8E7AF6" : "rgba(29, 29, 31, 0.4)",
                    fontWeight: isActive ? 600 : 500,
                  }}
                  className="relative z-10 text-[10px] tracking-wide"
                >
                  {tab.label}
                </motion.span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
