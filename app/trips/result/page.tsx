"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

import LiquidTabBar from "@/components/LiquidTabBar";

// --- Icons ---
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

function TagIcon(props: any) {
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
        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
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
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function CheckCircleIcon(props: any) {
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
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function StarIcon(props: any) {
  return (
    <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

// --- Mock Data ---
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
  {
    id: "f3",
    airline: "HopSkip",
    time: "06:00 - 10:15",
    duration: "4h 15m",
    price: 65,
    stops: "1 Stop",
    deal: false,
  },
];

const STAYS = [
  {
    id: "s1",
    type: "Hostel",
    name: "Youth City Hub",
    rating: 4.8,
    distance: "0.5km from center",
    price: 35,
    image: "bg-orange-100",
    deal: true,
  },
  {
    id: "s2",
    type: "Hotel",
    name: "Budget Inn Central",
    rating: 4.2,
    distance: "1.2km from center",
    price: 65,
    image: "bg-blue-100",
    deal: false,
  },
  {
    id: "s3",
    type: "Apartment",
    name: "Cozy Studio",
    rating: 4.5,
    distance: "2.0km from center",
    price: 55,
    image: "bg-green-100",
    deal: false,
  },
];

const DISCOUNTS = [
  { id: "d1", title: "Student Pass (Transport)", amount: 15 },
  { id: "d2", title: "Museum Free Entry", amount: 22 },
  { id: "d3", title: "10% Off Hostel", amount: 12 }, // Calculated dynamically usually
];

const ITINERARY = [
  { day: 1, period: "Morning", activity: "Arrival & Check-in" },
  { day: 1, period: "Afternoon", activity: "Explore City Center" },
  { day: 1, period: "Evening", activity: "Local Street Food Tour" },
  { day: 2, period: "Morning", activity: "Museum Visit (Free)" },
  { day: 2, period: "Afternoon", activity: "Park Picnic" },
  { day: 2, period: "Evening", activity: "Student Bar Crawl" },
  { day: 3, period: "Morning", activity: "Shopping at Flea Market" },
  { day: 3, period: "Afternoon", activity: "Departure" },
];

function TripResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- Url Params with Fallbacks ---
  const budget = Number(searchParams.get("budget")) || 300;
  const days = Number(searchParams.get("days")) || 3;
  const destination = searchParams.get("destination") || "Barcelona";
  const departure = searchParams.get("departure") || "Amsterdam";

  // --- State ---
  const [loading, setLoading] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState(FLIGHTS[0].id);
  const [selectedStay, setSelectedStay] = useState(STAYS[0].id);
  const [stayType, setStayType] = useState("Hostel");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // --- Calculations ---
  const flightCost = FLIGHTS.find((f) => f.id === selectedFlight)?.price || 0;
  const stayCostPerNight = STAYS.find((s) => s.id === selectedStay)?.price || 0;
  const totalStayCost = stayCostPerNight * days;
  const estimatedExtras = 25 * days; // Food + transport per day
  const totalCost = flightCost + totalStayCost + estimatedExtras;
  const savings = budget - totalCost;
  const progressPercent = Math.min((totalCost / budget) * 100, 100);

  // --- Variants ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA] space-y-4">
        <div className="w-16 h-16 border-4 border-[#8E7AF6]/20 border-t-[#8E7AF6] rounded-full animate-spin"></div>
        <p className="text-[#1D1D1F]/50 font-medium animate-pulse">
          Designing your perfect trip...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] text-[#1D1D1F] flex flex-col items-center font-sans pb-[200px]">
      {/* --- Sticky Header --- */}
      <header className="sticky top-0 z-40 bg-[#FAFAFA]/80 backdrop-blur-md px-6 pt-6 pb-4 flex items-center justify-between border-b border-black/5 w-full max-w-[430px]">
        <button
          onClick={() => router.back()}
          className="h-10 w-10 rounded-full bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center text-black/60 active:scale-95 transition-all"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <span className="text-[17px] font-bold tracking-tight">Your Trip</span>
        <button
          onClick={() => router.push("/trips/new")}
          className="text-[14px] font-bold text-[#8E7AF6]"
        >
          Edit
        </button>
      </header>

      <motion.div
        className="w-full max-w-[430px] px-6 pt-6 space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- Hero: Budget Summary --- */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-[28px] shadow-sm border border-black/5 relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-[14px] font-medium text-black/40">
                Total Estimated
              </p>
              <h2 className="text-[32px] font-black text-[#1D1D1F] leading-tight">
                €{totalCost}
              </h2>
            </div>
            <div className="flex flex-col items-end">
              <span className="bg-[#8E7AF6]/10 text-[#8E7AF6] px-3 py-1 rounded-full text-[12px] font-bold">
                Avg Budget: €{budget}
              </span>
              {savings > 0 && (
                <span className="mt-1 text-[#8E7AF6] text-[12px] font-bold animate-pulse">
                  You save €{savings}!
                </span>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 mb-6">
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-black/30 mb-1.5">
              <span>Spending</span>
              <span>
                {progressPercent < 100 ? "Under Budget ✅" : "On Budget"}
              </span>
            </div>
            <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="h-full bg-[#8E7AF6] rounded-full"
              />
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-4 gap-2 border-t border-black/5 pt-4">
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-black/40">
                Flights
              </p>
              <p className="text-[13px] font-bold">€{flightCost}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-black/40">
                Stay
              </p>
              <p className="text-[13px] font-bold">€{totalStayCost}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-black/40">
                Daily
              </p>
              <p className="text-[13px] font-bold">€{estimatedExtras}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-black/40">
                Disc.
              </p>
              <p className="text-[13px] font-bold text-[#8E7AF6]">
                -€{DISCOUNTS.reduce((acc, curr) => acc + curr.amount, 0)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* --- Flights Section --- */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <PlaneIcon className="h-5 w-5 text-black/30" />
            <h3 className="text-[18px] font-bold">Flights to {destination}</h3>
          </div>

          <div className="space-y-3">
            {FLIGHTS.map((flight, index) => (
              <motion.div
                key={flight.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedFlight(flight.id)}
                className={`relative p-4 rounded-[20px] bg-white border transition-all cursor-pointer ${selectedFlight === flight.id ? "border-[#8E7AF6] shadow-[0_0_0_1px_#8E7AF6]" : "border-black/5 shadow-sm"}`}
              >
                {flight.deal && (
                  <div className="absolute -top-2 right-4 bg-[#8E7AF6] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    Student Deal
                  </div>
                )}
                {index === 0 && !flight.deal && (
                  <div className="absolute -top-2 right-4 bg-black/5 text-black/60 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    Recommended
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center">
                      <PlaneIcon className="h-5 w-5 text-black/40" />
                    </div>
                    <div>
                      <p className="font-bold text-[15px]">{flight.airline}</p>
                      <p className="text-[12px] text-black/40 font-medium">
                        {flight.time} • {flight.duration}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[18px]">€{flight.price}</p>
                    <p className="text-[11px] text-black/40 font-medium">
                      {flight.stops}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- Stays Section --- */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <BedIcon className="h-5 w-5 text-black/30" />
              <h3 className="text-[18px] font-bold">Where to Sleep</h3>
            </div>
            {/* Mini Segmented Control for Stay Type (Mock) */}
            <div className="flex bg-black/5 rounded-full p-1">
              {["Hostel", "Hotel"].map((type) => (
                <button
                  key={type}
                  onClick={() => setStayType(type)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${stayType === type ? "bg-white shadow-sm text-black" : "text-black/40"}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {STAYS.map((stay, index) => (
              <motion.div
                key={stay.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedStay(stay.id)}
                className={`relative p-3 rounded-[24px] bg-white border transition-all cursor-pointer flex gap-3 ${selectedStay === stay.id ? "border-[#8E7AF6] shadow-[0_0_0_1px_#8E7AF6]" : "border-black/5 shadow-sm"}`}
              >
                {/* Image Placeholder */}
                <div
                  className={`h-24 w-24 rounded-[18px] ${stay.image} flex-shrink-0 flex items-center justify-center text-black/10`}
                >
                  Image
                </div>

                <div className="flex-1 flex flex-col justify-center py-1">
                  <div className="flex gap-1 mb-1">
                    {stay.deal && (
                      <span className="text-[10px] font-bold text-[#8E7AF6] bg-[#8E7AF6]/10 px-1.5 py-0.5 rounded-md">
                        Student discount
                      </span>
                    )}
                    {stay.rating > 4.5 && (
                      <span className="text-[10px] font-bold text-black/50 bg-black/5 px-1.5 py-0.5 rounded-md">
                        Top Rated
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-[15px]">{stay.name}</h4>
                  <div className="flex items-center gap-1 text-[12px] font-medium text-black/50 my-1">
                    <StarIcon className="h-3 w-3 text-yellow-400" />
                    <span>{stay.rating}</span>
                    <span>•</span>
                    <span>{stay.type}</span>
                  </div>
                  <p className="text-[11px] text-black/40">{stay.distance}</p>
                </div>

                <div className="flex flex-col justify-between items-end py-2 pr-1">
                  {selectedStay === stay.id ? (
                    <CheckCircleIcon className="h-5 w-5 text-[#8E7AF6]" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border border-black/10" />
                  )}
                  <div className="text-right">
                    <span className="block font-black text-[16px]">
                      €{stay.price}
                    </span>
                    <span className="text-[10px] text-black/40">/night</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- Student Discounts Section --- */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <TagIcon className="h-5 w-5 text-black/30" />
            <h3 className="text-[18px] font-bold">Unprocked Discounts</h3>
          </div>
          <div className="bg-white rounded-[24px] border border-black/5 shadow-sm divide-y divide-black/5 overflow-hidden">
            {DISCOUNTS.map((discount) => (
              <div
                key={discount.id}
                className="p-4 flex items-center justify-between"
              >
                <span className="text-[14px] font-medium">
                  {discount.title}
                </span>
                <span className="font-bold text-[14px] text-[#8E7AF6]">
                  -€{discount.amount}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* --- Itinerary Preview --- */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <CalendarIcon className="h-5 w-5 text-black/30" />
            <h3 className="text-[18px] font-bold">Itinerary Preview</h3>
          </div>
          <div className="relative pl-4 border-l-2 border-black/5 space-y-6 py-2 ml-2">
            {ITINERARY.slice(0, days * 2).map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-white border-2 border-[#8E7AF6]" />
                <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-0.5">
                  Day {item.day} • {item.period}
                </p>
                <p className="text-[14px] font-medium">{item.activity}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* --- Sticky CTA Footer --- */}
      <div className="fixed bottom-[90px] left-0 right-0 px-6 max-w-[430px] mx-auto z-50 pointer-events-none">
        <div className="pointer-events-auto flex flex-col gap-3 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/90 to-transparent pt-10 pb-4">
          <button className="w-full bg-[#1D1D1F] text-white font-bold h-14 rounded-[24px] shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all">
            Save this Itinerary
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-white text-black text-[13px] font-bold h-10 rounded-[24px] border border-black/5 shadow-sm active:scale-95 transition-all"
          >
            Regenerate
          </button>
        </div>
      </div>

      {/* --- Liquid Tab Bar --- */}
      <LiquidTabBar
        tabs={[
          { id: "home", label: "Home", icon: <HomeIcon className="w-6 h-6" /> },
          {
            id: "explore",
            label: "Explore",
            icon: <SearchIcon className="w-6 h-6" />,
          },
          {
            id: "trips",
            label: "Trips",
            icon: <PlaneIcon className="w-6 h-6" />,
          },
          {
            id: "profile",
            label: "Profile",
            icon: <UserIcon className="w-6 h-6" />,
          },
        ]}
        activeTab="trips"
        onChange={() => {}} // Do nothing for now as per requirements
      />
    </div>
  );
}

export default function TripResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA]" />}>
      <TripResultContent />
    </Suspense>
  );
}
