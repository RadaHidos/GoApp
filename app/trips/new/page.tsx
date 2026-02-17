"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import LiquidTabBar from "@/components/LiquidTabBar";

const easeOut = [0.22, 1, 0.36, 1] as const;

// Mock Data for Autocomplete
const LOCATIONS = [
  "Amsterdam, NL",
  "Barcelona, ES",
  "Bali, ID",
  "Bangkok, TH",
  "Berlin, DE",
  "Kyoto, JP",
  "Lisbon, PT",
  "London, UK",
  "Madrid, ES",
  "New York, US",
  "Paris, FR",
  "Rome, IT",
  "Singapore, SG",
  "Tokyo, JP",
];

export default function NewTripPage() {
  const router = useRouter();

  // --- State ---
  const [activeTab, setActiveTab] = useState("home");
  const [budget, setBudget] = useState(300);
  const [days, setDays] = useState(3);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [people, setPeople] = useState(2);
  const [isCouple, setIsCouple] = useState(false);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([
    "Explore",
    "Food",
  ]);

  const canSubmit = departure.trim().length > 0;

  const handleVibeToggle = (vibe: string) => {
    setSelectedVibes((prev) =>
      prev.includes(vibe) ? prev.filter((v) => v !== vibe) : [...prev, vibe],
    );
  };

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] text-[#1D1D1F] flex flex-col items-center font-sans selection:bg-[#8E7AF6]/20">
      <div className="w-full max-w-[430px] flex-1 flex flex-col relative bg-[#FAFAFA] min-h-screen pb-[240px]">
        <header className="sticky top-0 z-40 bg-[#FAFAFA]/80 backdrop-blur-md px-6 pt-6 pb-4 flex items-center justify-between border-b border-black/5">
          <button
            onClick={() => router.back()}
            className="h-10 w-10 rounded-full bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center text-black/60 active:scale-95 transition-all"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <span className="text-[17px] font-bold tracking-tight">
            Plan Adventure
          </span>
          <button
            onClick={() => setBudget(300)}
            className="text-[14px] font-bold text-[#8E7AF6]"
          >
            Reset
          </button>
        </header>

        <motion.div
          initial="hidden"
          animate="visible"
          className="px-6 pt-6 space-y-10"
        >
          {/* 1. Money & Time Section */}
          <section className="space-y-8 bg-white p-6 rounded-[28px] shadow-sm border border-black/5">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[11px] font-black uppercase tracking-widest text-black/30">
                  Budget
                </label>
                <span className="text-[28px] font-black text-[#8E7AF6]">
                  €{budget}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-1.5 bg-[#8E7AF6]/10 rounded-full appearance-none cursor-pointer accent-[#8E7AF6] touch-none"
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[11px] font-black uppercase tracking-widest text-black/30">
                  Duration
                </label>
                <span className="text-[28px] font-black text-[#8E7AF6]">
                  {days} <span className="text-[14px]">days</span>
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="14"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full h-1.5 bg-[#8E7AF6]/10 rounded-full appearance-none cursor-pointer accent-[#8E7AF6] touch-none"
              />
            </div>
          </section>

          {/* 2. Destination with Autocomplete */}
          <section className="space-y-4">
            <label className="text-[11px] font-black uppercase tracking-widest text-black/30 ml-2">
              Where to?
            </label>
            <div className="space-y-3 relative">
              <AutocompleteInput
                value={departure}
                setValue={setDeparture}
                placeholder="Departure: Amsterdam"
                icon={<MapPinIcon className="h-5 w-5" />}
              />
              <AutocompleteInput
                value={destination}
                setValue={setDestination}
                placeholder="Destination: AI Surprise Me"
                icon={<SearchIcon className="h-5 w-5" />}
              />
            </div>
          </section>

          {/* 3. Vibe Grid */}
          <section className="space-y-4">
            <label className="text-[11px] font-black uppercase tracking-widest text-black/30 ml-2">
              The Vibe
            </label>
            <div className="flex flex-wrap gap-2">
              {["Explore", "Party", "Chill", "Culture", "Nature", "Food"].map(
                (vibe) => (
                  <button
                    key={vibe}
                    onClick={() => handleVibeToggle(vibe)}
                    className={`px-6 py-3 rounded-full text-[14px] font-bold transition-all ${selectedVibes.includes(vibe) ? "bg-[#8E7AF6] text-white shadow-lg" : "bg-white text-black/40 border border-black/5"}`}
                  >
                    {vibe}
                  </button>
                ),
              )}
            </div>
          </section>

          {/* 4. Travelers */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-black/30">
                Travelers
              </label>
              <div className="flex items-center gap-5 bg-white px-4 py-2 rounded-full shadow-sm border border-black/5 select-none">
                <button
                  onClick={() => setPeople((p) => Math.max(1, p - 1))}
                  className="text-[#8E7AF6] font-bold text-xl active:scale-75 transition-transform p-2 disabled:opacity-30"
                  disabled={people <= 1}
                >
                  −
                </button>
                <span className="font-black text-lg w-4 text-center tabular-nums">
                  {people}
                </span>
                <button
                  onClick={() => setPeople((p) => p + 1)}
                  className="text-[#8E7AF6] font-bold text-xl active:scale-75 transition-transform p-2 disabled:opacity-30"
                  disabled={people >= 10}
                >
                  +
                </button>
              </div>
            </div>
            <AnimatePresence>
              {people === 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-4 rounded-[24px] border transition-all flex items-center justify-between ${isCouple ? "bg-red-50/50 border-red-100" : "bg-white border-black/5 shadow-sm"}`}
                >
                  <div className="flex items-center gap-3">
                    <HeartIcon
                      className={`h-5 w-5 ${isCouple ? "text-red-500 fill-red-500" : "text-black/20"}`}
                    />
                    <span className="font-bold text-[15px]">Couple trip?</span>
                  </div>
                  <button
                    onClick={() => setIsCouple(!isCouple)}
                    className={`w-12 h-7 rounded-full p-1 transition-colors ${isCouple ? "bg-red-500" : "bg-black/10"}`}
                  >
                    <motion.div
                      animate={{ x: isCouple ? 20 : 0 }}
                      className="h-5 w-5 bg-white rounded-full shadow-sm"
                    />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </motion.div>

        {/* --- Fixed CTA Section --- */}
        <div className="fixed bottom-[110px] left-0 right-0 px-6 max-w-[430px] mx-auto z-50 pointer-events-none">
          <div className="pointer-events-auto">
            <button
              disabled={!canSubmit}
              onClick={() => router.push("/trips/result")}
              className="w-full bg-[#1D1D1F] text-white font-black h-16 rounded-[24px] shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-20"
            >
              Generate Itinerary{" "}
              <SparklesIcon className="h-5 w-5 text-[#8E7AF6]" />
            </button>
          </div>
        </div>

        <LiquidTabBar
          tabs={[
            { id: "home", label: "Home", icon: <HomeIcon /> },
            { id: "explore", label: "Explore", icon: <SearchIcon /> },
            { id: "trips", label: "Trips", icon: <PlaneIcon /> },
            { id: "profile", label: "Profile", icon: <UserIcon /> },
          ]}
          activeTab={activeTab}
          onChange={(id) => {
            setActiveTab(id);
            router.push(`/${id === "home" ? "home" : id}`);
          }}
        />
      </div>
    </main>
  );
}

// --- Internal Autocomplete Component ---
function AutocompleteInput({ value, setValue, placeholder, icon }: any) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = LOCATIONS.filter(
    (l) => l.toLowerCase().includes(value.toLowerCase()) && l !== value,
  );

  return (
    <div className="relative group w-full" ref={containerRef}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-[#8E7AF6] z-10">
        {icon}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        className="w-full bg-white h-14 pl-12 pr-4 rounded-[20px] font-bold text-[16px] border border-black/5 shadow-sm focus:ring-2 focus:ring-[#8E7AF6]/20 transition-all outline-none"
      />
      <AnimatePresence>
        {showSuggestions && value && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 right-0 z-[60] mt-2 overflow-hidden rounded-[20px] bg-white shadow-2xl ring-1 ring-black/5 max-h-48 overflow-y-auto no-scrollbar"
          >
            {filtered.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setValue(loc);
                  setShowSuggestions(false);
                }}
                className="w-full px-6 py-4 text-left text-[15px] font-bold hover:bg-[#F5F3FF] transition-colors flex items-center gap-3"
              >
                <MapPinIcon className="h-4 w-4 text-[#8E7AF6]/40" /> {loc}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Icons ---
function ChevronLeftIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}
function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <circle cx="12" cy="11" r="3" />
    </svg>
  );
}
function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}
function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}
function SparklesIcon(props: any) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
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
function PlaneIcon() {
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
