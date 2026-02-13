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
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto relative flex items-center justify-between gap-1 p-1.5 h-[56px] min-w-[280px] w-[88vw] max-w-[420px] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
        {/* --- Glass Layers --- */}

        {/* Base Blur - Thinner & Crisper */}
        <div className="absolute inset-0 rounded-full bg-white/40 backdrop-blur-md" />

        {/* Inner Depth / Inset Shadows (CSS trick for glass feel) */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none border border-white/20"
          style={{
            boxShadow:
              "inset 0 0.5px 0 rgba(255,255,255,0.7), inset 0 -0.5px 0 rgba(0,0,0,0.05)",
          }}
        />

        {/* Specular Highlight (Top Shine) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/50 via-white/10 to-transparent opacity-60 pointer-events-none" />

        {/* --- Tabs --- */}
        <div className="relative z-10 flex w-full items-center justify-between px-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className="group relative flex flex-1 items-center justify-center h-[44px] cursor-pointer outline-none tap-highlight-transparent"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {/* Active Bubble */}
                {isActive && (
                  <motion.div
                    layoutId="activeBubble"
                    className="absolute inset-0 rounded-full bg-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-white/40"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 26,
                    }}
                  >
                    {/* Subtle inner highlight on the bubble too */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/80 to-transparent opacity-50" />
                  </motion.div>
                )}

                {/* Content Container (Center Icon + Label if needed) */}
                <motion.div
                  className="relative z-10 flex flex-col items-center justify-center gap-0.5"
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <motion.div
                    className={`transition-colors duration-300 ${
                      isActive
                        ? "text-[#8E7AF6]"
                        : "text-[#1D1D1F]/50 group-hover:text-[#1D1D1F]/70"
                    }`}
                  >
                    <div className="h-[22px] w-[22px]">{tab.icon}</div>
                  </motion.div>
                  <span
                    className={`text-[10px] font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-[#8E7AF6]"
                        : "text-[#1D1D1F]/50 group-hover:text-[#1D1D1F]/70"
                    }`}
                  >
                    {tab.label}
                  </span>
                </motion.div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
