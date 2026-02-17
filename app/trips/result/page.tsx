"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import LiquidTabBar from "@/components/LiquidTabBar";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function TripResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA]" />}>
      <TripResultContent />
    </Suspense>
  );
}

function TripResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- Dynamic URL Params ---
  const budget = Number(searchParams.get("budget")) || 300;
  const days = Number(searchParams.get("days")) || 3;
  const destination = searchParams.get("destination") || "Barcelona";

  // --- State & Selection Logic ---
  const [loading, setLoading] = useState(true);
  const [selectedFlightId, setSelectedFlightId] = useState(FLIGHTS[0].id);
  const [selectedStayId, setSelectedStayId] = useState(STAYS[0].id);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // --- Real-time Calculations (Service Design) ---
  const flight = FLIGHTS.find((f) => f.id === selectedFlightId)!;
  const stay = STAYS.find((s) => s.id === selectedStayId)!;

  const flightCost = flight.price;
  const totalStayCost = stay.price * days;
  const estimatedExtras = 25 * days;
  const totalCost = flightCost + totalStayCost + estimatedExtras;
  const savings = budget - totalCost;
  const progressPercent = Math.min((totalCost / budget) * 100, 100);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA] px-10 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#8E7AF6]/20 border-t-[#8E7AF6] rounded-full mb-6"
        />
        <h2 className="text-[20px] font-bold text-black mb-2">
          Curating {destination}...
        </h2>
        <p className="text-[15px] text-black/40 font-medium">
          Matching your vibe with student deals.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] text-[#1D1D1F] flex flex-col items-center font-sans pb-[120px]">
      {/* --- Sticky Header --- */}
      <header className="sticky top-0 z-50 w-full max-w-[430px] bg-[#FAFAFA]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between border-b border-black/5">
        <button
          onClick={() => router.back()}
          className="h-10 w-10 rounded-full bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center text-black/60 active:scale-95 transition-all"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[13px] font-black uppercase tracking-widest text-[#8E7AF6]">
            Generated Itinerary
          </span>
          <span className="text-[17px] font-bold text-black">
            {destination}
          </span>
        </div>
        <button
          onClick={() => router.push("/trips/new")}
          className="text-[14px] font-bold text-[#8E7AF6]"
        >
          Edit
        </button>
      </header>

      <div className="w-full max-w-[430px] px-6 mt-6 space-y-10">
        {/* --- Hero: Spending Insight (Hierarchy & Visual Weight) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1D1D1F] p-8 rounded-[32px] shadow-2xl relative overflow-hidden text-white"
        >
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <p className="text-[12px] font-bold text-white/40 uppercase tracking-widest">
                  Estimated Total
                </p>
                <h2 className="text-[42px] font-black tracking-tight">
                  €{totalCost}
                </h2>
              </div>
              <div className="bg-[#8E7AF6] text-white px-4 py-2 rounded-2xl text-[13px] font-black shadow-lg">
                €{budget} Budget
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-[13px] font-bold text-white/60">
                  {savings >= 0
                    ? `🔥 Saving €${savings}`
                    : `⚠️ €${Math.abs(savings)} Over`}
                </span>
                <span className="text-[13px] font-bold">
                  {Math.round(progressPercent)}%
                </span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full bg-[#8E7AF6]"
                />
              </div>
            </div>
          </div>
          {/* Subtle background glow */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#8E7AF6]/20 blur-[100px] rounded-full" />
        </motion.div>

        {/* --- Selection Section: Flights --- */}
        <section className="space-y-5">
          <div className="flex items-center gap-3 px-1">
            <div className="h-8 w-8 rounded-xl bg-[#8E7AF6]/10 flex items-center justify-center">
              <PlaneIcon className="h-4 w-4 text-[#8E7AF6]" />
            </div>
            <h3 className="text-[20px] font-bold">Best Flights</h3>
          </div>

          <div className="space-y-3">
            {FLIGHTS.map((f) => (
              <SelectCard
                key={f.id}
                active={selectedFlightId === f.id}
                onClick={() => setSelectedFlightId(f.id)}
                deal={f.deal}
                title={f.airline}
                subtitle={`${f.time} • ${f.duration}`}
                price={`€${f.price}`}
                tag={f.stops}
              />
            ))}
          </div>
        </section>

        {/* --- Selection Section: Stays --- */}
        <section className="space-y-5">
          <div className="flex items-center gap-3 px-1">
            <div className="h-8 w-8 rounded-xl bg-[#8E7AF6]/10 flex items-center justify-center">
              <BedIcon className="h-4 w-4 text-[#8E7AF6]" />
            </div>
            <h3 className="text-[20px] font-bold">Where to Stay</h3>
          </div>

          <div className="space-y-3">
            {STAYS.map((s) => (
              <SelectCard
                key={s.id}
                active={selectedStayId === s.id}
                onClick={() => setSelectedStayId(s.id)}
                deal={s.deal}
                title={s.name}
                subtitle={`${s.rating} ★ • ${s.distance}`}
                price={`€${s.price}`}
                tag="/night"
                imageColor={s.image}
              />
            ))}
          </div>
        </section>

        {/* --- Timeline: Itinerary (Progressive Disclosure) --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 px-1">
            <div className="h-8 w-8 rounded-xl bg-[#8E7AF6]/10 flex items-center justify-center">
              <CalendarIcon className="h-4 w-4 text-[#8E7AF6]" />
            </div>
            <h3 className="text-[20px] font-bold">Your Timeline</h3>
          </div>

          <div className="relative pl-6 border-l-2 border-[#8E7AF6]/20 ml-4 space-y-10 py-2">
            {ITINERARY.slice(0, days * 2).map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-white border-4 border-[#8E7AF6]" />
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-widest text-black/30">
                    Day {item.day} • {item.period}
                  </span>
                  <p className="text-[16px] font-bold text-black">
                    {item.activity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* --- Global Action Footer --- */}
      <div className="w-full px-6 mt-6 z-30 pointer-events-none">
        <div className="pointer-events-auto flex flex-col gap-3">
          <button className="w-full bg-[#1D1D1F] text-white font-black h-16 rounded-[24px] shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all">
            Save this Adventure
          </button>
        </div>
      </div>

      <LiquidTabBar />
    </main>
  );
}

// --- High-Fidelity Components ---

function SelectCard({
  active,
  onClick,
  deal,
  title,
  subtitle,
  price,
  tag,
  imageColor,
}: any) {
  return (
    <motion.div
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`relative p-5 rounded-[28px] bg-white border-2 transition-all cursor-pointer flex items-center gap-4 ${
        active
          ? "border-[#8E7AF6] shadow-xl shadow-[#8E7AF6]/5"
          : "border-transparent shadow-sm"
      }`}
    >
      {imageColor && (
        <div
          className={`h-16 w-16 rounded-2xl ${imageColor} shrink-0 shadow-inner`}
        />
      )}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-bold text-[16px]">{title}</h4>
          {deal && (
            <span className="bg-[#8E7AF6]/10 text-[#8E7AF6] text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md">
              Deal
            </span>
          )}
        </div>
        <p className="text-[13px] font-medium text-black/40">{subtitle}</p>
      </div>
      <div className="text-right">
        <p className="text-[18px] font-black">{price}</p>
        <p className="text-[11px] font-bold text-black/20 uppercase">{tag}</p>
      </div>
    </motion.div>
  );
}

// --- UI Icons ---
function ChevronLeftIcon(props: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}
function PlaneIcon(props: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
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
function BedIcon(props: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}
function CalendarIcon(props: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}
function HomeIcon(props: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}
function SearchIcon(props: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}
function UserIcon(props: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

// --- Static Mock Data ---
const FLIGHTS = [
  {
    id: "f1",
    airline: "StudentAir",
    time: "07:30 - 09:45",
    duration: "2h 15m",
    price: 85,
    stops: "Direct",
    deal: true,
  },
  {
    id: "f2",
    airline: "BudgetFly",
    time: "14:00 - 16:30",
    duration: "2h 30m",
    price: 110,
    stops: "Direct",
    deal: false,
  },
];

const STAYS = [
  {
    id: "s1",
    type: "Hostel",
    name: "Youth City Hub",
    rating: 4.8,
    distance: "0.5km center",
    price: 35,
    image: "bg-orange-400/20",
    deal: true,
  },
  {
    id: "s2",
    type: "Hotel",
    name: "Budget Inn Central",
    rating: 4.2,
    distance: "1.2km center",
    price: 65,
    image: "bg-blue-400/20",
    deal: false,
  },
];

const ITINERARY = [
  { day: 1, period: "Morning", activity: "Arrival & Local Brunch" },
  { day: 1, period: "Afternoon", activity: "Free Walking Tour" },
  { day: 2, period: "Morning", activity: "Cultural Museum (Student Pass)" },
  { day: 2, period: "Afternoon", activity: "Sunset Hike / Viewpoint" },
];
