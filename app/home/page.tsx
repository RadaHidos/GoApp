"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LiquidTabBar from "@/components/LiquidTabBar";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function HomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "Home", icon: <HomeIcon /> },
    { id: "explore", label: "Explore", icon: <SearchIcon /> },
    { id: "trips", label: "Trips", icon: <PlaneIcon /> },
    { id: "profile", label: "Profile", icon: <UserIcon /> },
  ];

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    if (id !== "home") {
      // You can implement routing here if pages exist
      // router.push(`/${id}`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] text-[#1D1D1F] flex flex-col items-center font-sans selection:bg-[#8E7AF6]/20">
      {/* Mobile Container */}
      <div className="w-full max-w-[430px] flex-1 flex flex-col relative bg-[#FAFAFA] min-h-screen pb-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="px-6 pt-12 space-y-10"
        >
          {/* --- 1. Refined Header --- */}
          <motion.header
            variants={itemVariants}
            className="flex flex-col gap-5"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-[32px] font-bold tracking-tight text-black">
                  Hey Rada
                </h1>
                <p className="text-[16px] font-medium text-black/40">
                  Where to next?
                </p>
              </div>

              {/* Avatar with Status Signifier */}
              <div className="relative">
                <button className="h-12 w-12 rounded-full bg-white shadow-sm ring-1 ring-black/5 overflow-hidden flex items-center justify-center">
                  <span className="font-bold text-[#8E7AF6]">RH</span>
                </button>
                <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-[#FAFAFA]" />
              </div>
            </div>

            {/* Vibe Badge - Better Proximity */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8E7AF6]/5 border border-[#8E7AF6]/10 self-start">
              <SparkleSmallIcon className="h-3 w-3 text-[#8E7AF6]" />
              <span className="text-[11px] font-bold text-[#8E7AF6] uppercase tracking-widest">
                Street Food · Beach
              </span>
            </div>
          </motion.header>

          {/* --- 2. Prominent Hero Action --- */}
          <motion.div variants={itemVariants}>
            <button
              onClick={() => router.push("/onboarding/quiz")}
              className="group relative w-full overflow-hidden rounded-[32px] bg-[#0B0C0F] p-8 text-left shadow-2xl shadow-black/20 transition-all active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1d1d1f] to-black opacity-50" />

              <div className="relative z-10 space-y-4">
                <div className="h-11 w-11 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                  <PlusIcon className="h-6 w-6 text-white" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-[24px] font-bold text-white tracking-tight">
                    Plan a New Trip
                  </h2>
                  <p className="text-[15px] text-white/50 max-w-[220px] leading-relaxed">
                    Custom itineraries based on your budget and vibe.
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2 text-[#8E7AF6] font-bold text-[15px]">
                  Get Started
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          </motion.div>

          {/* --- 3. Quick Picks - Recognition Over Recall --- */}
          <motion.div variants={itemVariants} className="space-y-5">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[20px] font-bold text-black tracking-tight">
                Trending Escapes
              </h3>
              <button className="text-[14px] font-bold text-[#8E7AF6] hover:opacity-70 transition-opacity">
                See all
              </button>
            </div>

            <div className="-mx-6 px-6 overflow-x-auto no-scrollbar flex gap-5 pb-2 snap-x snap-mandatory">
              {QUICK_PICKS.map((item, i) => (
                <div
                  key={i}
                  className="snap-center shrink-0 w-[200px] space-y-3 cursor-pointer group"
                >
                  <div className="relative aspect-[4/5] w-full bg-[#E5E5E5] rounded-[28px] overflow-hidden shadow-sm">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/40" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[12px] font-bold text-white border border-white/20">
                        {item.price}
                      </span>
                    </div>
                  </div>
                  <div className="px-1">
                    <h4 className="text-[17px] font-bold text-black group-hover:text-[#8E7AF6] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[14px] font-medium text-black/40">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* --- 4. Made For You --- */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-[20px] font-bold text-black tracking-tight px-1">
              Made for You
            </h3>
            <div className="space-y-3">
              {FOR_YOU.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-white rounded-[24px] border border-black/5 shadow-sm active:scale-[0.99] transition-transform cursor-pointer"
                >
                  <div className="h-16 w-16 rounded-[18px] bg-gray-100 shrink-0" />
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#8E7AF6]">
                      {item.tag}
                    </span>
                    <h4 className="text-[16px] font-bold text-black">
                      {item.title}
                    </h4>
                    <p className="text-[13px] font-medium text-black/40">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* --- iOS Glass NavBar --- */}
        <LiquidTabBar
          tabs={tabs}
          activeTab={activeTab}
          onChange={handleTabChange}
        />
      </div>
    </main>
  );
}

// --- Data ---
const QUICK_PICKS = [
  { title: "Bali, Indonesia", desc: "Tropical paradise", price: "$45/day" },
  { title: "Kyoto, Japan", desc: "Cultural heritage", price: "$80/day" },
  { title: "Lisbon, Portugal", desc: "City of light", price: "$65/day" },
];

const FOR_YOU = [
  {
    title: "Best Digital Nomad Hubs",
    desc: "Work hard, play hard.",
    tag: "Lifestyle",
  },
  { title: "Hidden Beach Towns", desc: "Escape the crowds.", tag: "Nature" },
];

// --- Icons ---
function HomeIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}
function PlaneIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
}
function SparkleSmallIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
    </svg>
  );
}
