"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import LiquidTabBar from "@/components/LiquidTabBar";

const easeOut = [0.22, 1, 0.36, 1] as const;

// Mock Data for Past Trips with Reviews
const PAST_TRIPS = [
  {
    id: "trip-1",
    destination: "Barcelona, ES",
    date: "Feb 10 - Feb 13, 2026",
    totalSpent: 285,
    image: "bg-orange-100",
    highlights: [
      {
        id: "h1",
        name: "Sagrada Família",
        type: "Museum",
        rated: true,
        score: 5,
      },
      {
        id: "h2",
        name: "Cervecería Catalana",
        type: "Restaurant",
        rated: false,
        score: 0,
      },
      {
        id: "h3",
        name: "Picasso Museum",
        type: "Museum",
        rated: false,
        score: 0,
      },
    ],
  },
  {
    id: "trip-2",
    destination: "Amsterdam, NL",
    date: "Jan 15 - Jan 18, 2026",
    totalSpent: 420,
    image: "bg-blue-100",
    highlights: [
      { id: "h4", name: "Rijksmuseum", type: "Museum", rated: true, score: 4 },
      {
        id: "h5",
        name: "The Pancake Bakery",
        type: "Restaurant",
        rated: true,
        score: 5,
      },
    ],
  },
];

export default function PastTripsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] text-[#1D1D1F] flex flex-col items-center font-sans selection:bg-[#8E7AF6]/20">
      <div className="w-full max-w-[430px] flex-1 flex flex-col relative bg-[#FAFAFA] min-h-screen pb-[140px]">
        {/* --- Unified Header: Exact Match to Home Page --- */}
        <header className="px-6 pt-12 pb-6 flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-[32px] font-bold tracking-tight text-black leading-tight">
              Your Travels
            </h1>
            <p className="text-[16px] font-medium text-black/40">
              Review your adventures
            </p>
          </div>

          {/* Global Profile Anchor */}
          <div className="relative">
            <button
              onClick={() => router.push("/profile")}
              className="h-12 w-12 rounded-full bg-white shadow-sm ring-1 ring-black/5 overflow-hidden flex items-center justify-center active:scale-95 transition-all"
            >
              <span className="font-bold text-[#8E7AF6]">RH</span>
            </button>
            <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-[#FAFAFA]" />
          </div>
        </header>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
          }}
          className="px-6 space-y-10" // Matches Home Page spacing
        >
          <div className="space-y-4">
            {PAST_TRIPS.map((trip) => (
              <TripHistoryCard key={trip.id} trip={trip} />
            ))}
          </div>

          {/* --- Empty State --- */}
          {PAST_TRIPS.length === 0 && (
            <div className="flex flex-col items-center justify-center pt-20 text-center opacity-30">
              <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center mb-4">
                <PlaneIcon className="h-8 w-8" />
              </div>
              <p className="font-bold text-[17px]">No past adventures yet.</p>
            </div>
          )}
        </motion.div>

        <LiquidTabBar />
      </div>
    </main>
  );
}

function TripHistoryCard({ trip }: { trip: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: easeOut },
        },
      }}
      className="bg-white rounded-[28px] border border-black/5 shadow-sm overflow-hidden"
    >
      <div className="p-5 flex items-center gap-4">
        <div
          className={`h-14 w-14 rounded-[20px] ${trip.image} flex items-center justify-center text-xl shadow-inner`}
        >
          {trip.destination.includes("Barcelona") ? "☀️" : "☁️"}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-[17px] text-black leading-tight">
            {trip.destination}
          </h3>
          <p className="text-[14px] font-medium text-black/40">{trip.date}</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8E7AF6] block mb-0.5">
            Spent
          </span>
          <p className="font-bold text-[17px] text-black">€{trip.totalSpent}</p>
        </div>
      </div>

      <div className="px-5 pb-5">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2.5 rounded-xl bg-[#FAFAFA] text-[13px] font-bold text-black/60 flex items-center justify-center gap-2 active:scale-[0.98] transition-all border border-black/[0.03]"
        >
          {isExpanded
            ? "Hide Details"
            : `Review ${trip.highlights.length} Highlights`}
          <ChevronDownIcon
            className={`h-3.5 w-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-3">
                {trip.highlights.map((item: any) => (
                  <HighlightReviewItem key={item.id} item={item} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function HighlightReviewItem({ item }: { item: any }) {
  const [rating, setRating] = useState(item.score);

  return (
    <div className="flex items-center justify-between p-3 rounded-[18px] bg-[#FAFAFA] border border-black/[0.02]">
      <div>
        <span className="text-[9px] font-black uppercase tracking-widest text-[#8E7AF6]/80">
          {item.type}
        </span>
        <p className="font-bold text-[14px] text-black">{item.name}</p>
      </div>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="transition-all active:scale-125 p-0.5"
          >
            <StarIcon
              className={`h-3.5 w-3.5 ${star <= rating ? "text-[#8E7AF6] fill-[#8E7AF6]" : "text-black/10"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Icons ---
function StarIcon(props: any) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
function ChevronDownIcon(props: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
function PlaneIcon(p: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...p}
    >
      <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );
}
