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
        {/* --- Senior Header: Recognition Focus --- */}
        <header className="sticky top-0 z-40 bg-[#FAFAFA]/80 backdrop-blur-md px-6 pt-6 pb-4 flex items-center justify-between border-b border-black/5">
          <h1 className="text-[24px] font-black tracking-tight text-black">
            Your Travels
          </h1>
          <button
            onClick={() => router.push("/trips/new")}
            className="h-10 w-10 rounded-full bg-[#8E7AF6] shadow-lg flex items-center justify-center text-white active:scale-90 transition-all"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </header>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="px-6 pt-8 space-y-8"
        >
          {PAST_TRIPS.map((trip) => (
            <TripHistoryCard key={trip.id} trip={trip} />
          ))}

          {/* --- Empty State: Constraints --- */}
          {PAST_TRIPS.length === 0 && (
            <div className="flex flex-col items-center justify-center pt-20 text-center opacity-40">
              <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center mb-4">
                <PlaneIcon className="h-8 w-8" />
              </div>
              <p className="font-bold">No past adventures yet.</p>
              <p className="text-[14px]">
                Your finished trips will appear here.
              </p>
            </div>
          )}
        </motion.div>

        <LiquidTabBar />
      </div>
    </main>
  );
}

// --- Multi-Step Experience Component ---
function TripHistoryCard({ trip }: { trip: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="bg-white rounded-[32px] border border-black/5 shadow-sm overflow-hidden"
    >
      {/* Header Info */}
      <div className="p-6 flex items-center gap-4">
        <div
          className={`h-16 w-16 rounded-[24px] ${trip.image} flex items-center justify-center text-2xl shadow-inner`}
        >
          {trip.destination.includes("Barcelona") ? "☀️" : "☁️"}
        </div>
        <div className="flex-1">
          <h3 className="font-black text-[18px] leading-tight">
            {trip.destination}
          </h3>
          <p className="text-[13px] font-medium text-black/40">{trip.date}</p>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#8E7AF6] block mb-1">
            Spent
          </span>
          <p className="font-black text-[17px]">€{trip.totalSpent}</p>
        </div>
      </div>

      {/* Highlights & Reviews: Progressive Disclosure */}
      <div className="px-6 pb-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 rounded-2xl bg-[#F3F4F6] text-[13px] font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          {isExpanded
            ? "Hide Highlights"
            : `Review ${trip.highlights.length} Places`}
          <ChevronDownIcon
            className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
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
              <div className="pt-4 space-y-4">
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
    <div className="flex items-center justify-between p-3 rounded-2xl border border-black/[0.03]">
      <div>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#8E7AF6]/60">
          {item.type}
        </span>
        <p className="font-bold text-[14px]">{item.name}</p>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="transition-transform active:scale-125"
          >
            <StarIcon
              className={`h-4 w-4 ${star <= rating ? "text-orange-400 fill-orange-400" : "text-black/10"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Icons ---
function PlusIcon(props: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}
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
      strokeWidth={2.5}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
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
function PlaneIcon(props: any) {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
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
      strokeWidth="1.5"
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
function UserIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
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
