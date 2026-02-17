"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LiquidTabBar from "@/components/LiquidTabBar";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] text-[#1D1D1F] flex flex-col items-center font-sans selection:bg-[#8E7AF6]/20">
      <div className="w-full max-w-[430px] flex-1 flex flex-col relative bg-[#FAFAFA] min-h-screen pb-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="px-6 pt-12 space-y-10"
        >
          {/* Header */}
          <motion.header
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex items-center justify-between"
          >
            <div className="space-y-1">
              <h1 className="text-[32px] font-bold tracking-tight text-black leading-tight">
                Hey Rada
              </h1>
              <p className="text-[16px] font-medium text-black/40">
                Where to next?
              </p>
            </div>
            <div className="relative">
              <button className="h-12 w-12 rounded-full bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center">
                <span className="font-bold text-[#8E7AF6]">RH</span>
              </button>
              <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-[#FAFAFA]" />
            </div>
          </motion.header>

          {/* Hero Action */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <button
              onClick={() => router.push("/trips/new")}
              className="group relative w-full overflow-hidden rounded-[32px] bg-[#8E7AF6] p-8 text-left shadow-2xl active:scale-[0.98] transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#8E7AF6] to-black opacity-50" />
              <div className="relative z-10 space-y-4">
                <div className="h-11 w-11 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                  <PlusIcon className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-[24px] font-bold text-white tracking-tight">
                    Plan a New Trip
                  </h2>
                  <p className="text-[15px] text-white/50 max-w-[220px]">
                    Custom itineraries based on your budget.
                  </p>
                </div>
              </div>
            </button>
          </motion.div>

          {/* Trending Escapes - Now with unique images */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
            className="space-y-5"
          >
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[20px] font-bold text-black tracking-tight">
                Trending Escapes
              </h3>
              <button className="text-[14px] font-bold text-[#8E7AF6]">
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
                    {/* Unique Image assigned per item */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/60" />
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

          {/* Made For You - Now with unique images */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
            className="space-y-4"
          >
            <h3 className="text-[20px] font-bold text-black tracking-tight px-1">
              Made for You
            </h3>
            <div className="space-y-3">
              {FOR_YOU.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-4 p-4 bg-white rounded-[24px] border border-black/5 shadow-sm active:scale-[0.99] transition-transform cursor-pointer"
                >
                  <div className="h-16 w-16 rounded-[18px] bg-gray-100 shrink-0 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#8E7AF6]">
                      {item.tag}
                    </span>
                    <h4 className="text-[16px] font-bold text-black group-hover:text-[#8E7AF6] transition-colors">
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

        <LiquidTabBar />
      </div>
    </main>
  );
}

// --- Dynamic Data Mapping ---
const QUICK_PICKS = [
  {
    title: "Bali, Indonesia",
    desc: "Tropical paradise",
    price: "$45/day",
    image: "/images/bali.jpg",
  },
  {
    title: "Kyoto, Japan",
    desc: "Cultural heritage",
    price: "$80/day",
    image: "/images/kyoto.jpg",
  }, // Add kyoto.jpg here
  {
    title: "Lisbon, Portugal",
    desc: "City of light",
    price: "$65/day",
    image: "/images/lisbon.jpg",
  }, // Add lisbon.jpg here
];

const FOR_YOU = [
  {
    title: "Party time",
    desc: "Work hard, play hard.",
    tag: "Lifestyle",
    image: "/images/party.jpg",
  },
  {
    title: "Hidden Beaches",
    desc: "Escape the crowds.",
    tag: "Nature",
    image: "/images/beach.jpg",
  },
];

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}
