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

  // Unified state to prevent state collision "bugs"
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const togglePlace = (id: string) => {
    setSelectedPlaces((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  // Calculations & System Status
  const flight = FLIGHTS.find((f) => f.id === selectedFlightId)!;
  const stay = STAYS.find((s) => s.id === selectedStayId)!;

  // Calculate cost of selected activities
  const allOptions = Object.values(DISCOVERY_DATA).flatMap((cat) =>
    Object.values(cat).flatMap((arr) => arr),
  );
  const placesCost = selectedPlaces.reduce((acc, id) => {
    const option = allOptions.find((o) => o.id === id);
    return acc + (option?.price || 0);
  }, 0);

  const totalCost = flight.price + stay.price * days + placesCost;
  const isOverBudget = totalCost > budget;
  const diff = Math.abs(budget - totalCost);
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
    <main className="min-h-screen w-full bg-[#FAFAFA] text-[#1D1D1F] flex flex-col items-center font-sans pb-5">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full max-w-[430px] bg-[#FAFAFA]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between border-b border-black/5">
        <button
          onClick={() => router.back()}
          className="h-10 w-10 rounded-full bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center text-black/60 active:scale-95 transition-all"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#8E7AF6]">
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
        {/* --- Hero: Budget Status pattern --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-8 rounded-[36px] shadow-2xl relative overflow-hidden transition-colors duration-500 ${isOverBudget ? "bg-red-950" : "bg-[#1D1D1F]"} text-white`}
        >
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <p className="text-[12px] font-bold text-white/40 uppercase tracking-widest">
                  Estimated Total
                </p>
                <h2 className="text-[48px] font-black tracking-tighter">
                  €{totalCost}
                </h2>
              </div>
              <div
                className={`px-4 py-2 rounded-2xl text-[13px] font-black shadow-lg ${isOverBudget ? "bg-red-500" : "bg-[#8E7AF6]"}`}
              >
                €{budget} Budget
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-[13px] font-bold text-white/60">
                  {isOverBudget
                    ? `⚠️ €${diff} over budget`
                    : `🔥 Saving €${diff}`}
                </span>
                <span className="text-[13px] font-bold">
                  {Math.round(progressPercent)}%
                </span>
              </div>
              <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className={`h-full rounded-full ${isOverBudget ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" : "bg-[#8E7AF6] shadow-[0_0_15px_rgba(142,122,246,0.5)]"}`}
                />
              </div>
            </div>

            {isOverBudget && (
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[16px] text-white">
                    Over the limit
                  </h3>
                  <p className="text-[13px] text-white/40 font-medium max-w-[140px] leading-tight mt-1">
                    Adjust choices or increase budget
                  </p>
                </div>
                <button
                  onClick={() => router.push("/trips/new")}
                  className="bg-white text-black px-6 py-3 rounded-[16px] font-black text-[13px] shadow-lg active:scale-95 transition-transform"
                >
                  Edit <br /> Budget
                </button>
              </div>
            )}
          </div>
          <div
            className={`absolute -right-20 -top-20 w-64 h-64 blur-[100px] rounded-full opacity-20 ${isOverBudget ? "bg-red-500" : "bg-[#8E7AF6]"}`}
          />
        </motion.div>

        {/* Transport & Stays remain same */}
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
                title={f.airline}
                subtitle={f.time}
                price={`€${f.price}`}
                tag={f.stops}
              />
            ))}
          </div>
        </section>

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
                title={s.name}
                subtitle={s.distance}
                price={`€${s.price}`}
                tag="/night"
                imageColor={s.image}
              />
            ))}
          </div>
        </section>

        {/* --- Timeline with Fixed Selection Pattern --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 px-1">
            <div className="h-8 w-8 rounded-xl bg-[#8E7AF6]/10 flex items-center justify-center">
              <CalendarIcon className="h-4 w-4 text-[#8E7AF6]" />
            </div>
            <h3 className="text-[20px] font-bold">Your Timeline</h3>
          </div>

          <div className="relative pl-6 border-l-2 border-[#8E7AF6]/20 ml-4 space-y-12">
            {ITINERARY.map((item, i) => {
              const isOpen = activeAccordion === item.id;
              const options =
                DISCOVERY_DATA[item.id as keyof typeof DISCOVERY_DATA]?.[
                  selectedStayId as keyof (typeof DISCOVERY_DATA)["brunch"]
                ];

              return (
                <div key={i} className="relative">
                  <div className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-white border-4 border-[#8E7AF6]" />
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-black uppercase tracking-widest text-black/30">
                        Day {item.day} • {item.period}
                      </span>
                      <p className="text-[17px] font-bold text-black">
                        {item.activity}
                      </p>
                    </div>

                    {options && (
                      <div className="space-y-2">
                        <button
                          onClick={() =>
                            setActiveAccordion(isOpen ? null : item.id)
                          }
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8E7AF6]/10 border border-[#8E7AF6]/20 active:scale-95 transition-all shadow-sm"
                        >
                          <span className="text-[12px] font-bold text-[#8E7AF6]">
                            Suggested Picks
                          </span>
                          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                            <ChevronDownIcon className="h-3 w-3 text-[#8E7AF6]" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-2 grid gap-3">
                                {options.map((option) => (
                                  <motion.div
                                    key={option.id}
                                    className={`p-4 rounded-[24px] border-2 transition-all flex flex-col justify-between ${
                                      selectedPlaces.includes(option.id)
                                        ? "border-[#8E7AF6] bg-white shadow-lg"
                                        : "border-black/5 bg-white"
                                    }`}
                                  >
                                    <div className="flex justify-between items-start mb-2">
                                      <div
                                        onClick={() => togglePlace(option.id)}
                                        className="cursor-pointer pr-4"
                                      >
                                        <h4 className="font-bold text-[16px] leading-tight text-black">
                                          {option.name}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1">
                                          <p className="text-[13px] text-black/40 font-medium">
                                            {option.vibe}
                                          </p>
                                          <span className="text-[12px] font-black tracking-tighter text-[#8E7AF6] bg-[#8E7AF6]/10 px-2 py-0.5 rounded-md">
                                            {option.price > 0
                                              ? `~€${option.price}`
                                              : "Free"}
                                          </span>
                                        </div>
                                      </div>
                                      <div
                                        onClick={() => togglePlace(option.id)}
                                        className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                                          selectedPlaces.includes(option.id)
                                            ? "bg-[#8E7AF6] border-[#8E7AF6]"
                                            : "border-black/10"
                                        }`}
                                      >
                                        {selectedPlaces.includes(option.id) && (
                                          <CheckIcon />
                                        )}
                                      </div>
                                    </div>

                                    <div className="flex items-end justify-between mt-2">
                                      <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#8E7AF6]">
                                        <MapPinIcon className="h-3 w-3" />
                                        {option.dist}
                                      </div>

                                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-black/5 text-[11px] font-bold text-black/60 active:scale-95 transition-all hover:bg-[#8E7AF6]/5 hover:text-[#8E7AF6] hover:border-[#8E7AF6]/20">
                                        <MapIcon className="h-3 w-3" />
                                        See in Google Maps
                                      </button>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Primary Action Footer */}
      <div className="w-full max-w-[430px] px-6 mt-10 mb-[100px] pointer-events-none">
        <div className="pointer-events-auto">
          <button className="w-full bg-[#1D1D1F] text-white font-black h-16 rounded-[24px] shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all">
            Save Adventure
          </button>
        </div>
      </div>
      <LiquidTabBar />
    </main>
  );
}

// Components & Data remain same structure to ensure no breakage
function SelectCard({
  active,
  onClick,
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
      className={`relative p-5 rounded-[28px] bg-white border-2 transition-all cursor-pointer flex items-center gap-4 ${active ? "border-[#8E7AF6] shadow-xl" : "border-transparent shadow-sm"}`}
    >
      {imageColor && (
        <div
          className={`h-14 w-14 rounded-2xl ${imageColor} shrink-0 shadow-inner`}
        />
      )}
      <div className="flex-1">
        <h4 className="font-bold text-[16px]">{title}</h4>
        <p className="text-[13px] font-medium text-black/40">{subtitle}</p>
      </div>
      <div className="text-right">
        <p className="font-black tracking-tighter text-[18px]">{price}</p>
        <p className="text-[11px] font-bold text-black/20 uppercase tracking-wide">
          {tag}
        </p>
      </div>
    </motion.div>
  );
}

function ChevronLeftIcon(p: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      {...p}
    >
      <path d="M15 19l-7-7 7-7" />
    </svg>
  );
}
function ChevronDownIcon(p: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
      {...p}
    >
      <path d="M19 9l-7 7-7-7" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="4"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function MapIcon(p: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...p}
    >
      <path d="M9 20l-5 4V4l5 4 6-4 5 4v20l-5-4-6 4z" />
    </svg>
  );
}
function MapPinIcon(p: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      {...p}
    >
      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <circle cx="12" cy="11" r="3" />
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
function BedIcon(p: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...p}
    >
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10h3m10-11l2 2m-2-2v10" />
    </svg>
  );
}
function CalendarIcon(p: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...p}
    >
      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14" />
    </svg>
  );
}

const FLIGHTS = [
  {
    id: "f1",
    airline: "StudentAir",
    time: "07:30 - 09:45",
    price: 85,
    stops: "Direct",
  },
  {
    id: "f2",
    airline: "BudgetFly",
    time: "14:00 - 16:30",
    price: 110,
    stops: "Direct",
  },
];
const STAYS = [
  {
    id: "s1",
    name: "Youth City Hub",
    distance: "0.5km center",
    price: 35,
    image: "bg-orange-400/20",
  },
  {
    id: "s2",
    name: "Budget Inn Central",
    distance: "1.2km center",
    price: 65,
    image: "bg-blue-400/20",
  },
];
const ITINERARY = [
  {
    id: "brunch",
    day: 1,
    period: "Morning",
    activity: "Arrival & Local Brunch",
  },
  { id: "walking", day: 1, period: "Afternoon", activity: "Walking Around" },
  {
    id: "tourist",
    day: 2,
    period: "Morning",
    activity: "Visiting Touristic Attractions",
  },
  {
    id: "hike",
    day: 2,
    period: "Afternoon",
    activity: "Sunset Hike / Viewpoint",
  },
];

const DISCOVERY_DATA = {
  brunch: {
    s1: [
      {
        id: "b1",
        name: "Federal Café",
        vibe: "Great coffee",
        dist: "200m away",
        price: 15,
      },
      {
        id: "b2",
        name: "Milk Bar",
        vibe: "Budget friendly",
        dist: "350m away",
        price: 12,
      },
      {
        id: "b3",
        name: "Caravelle",
        vibe: "Tex-Mex fusion",
        dist: "500m away",
        price: 18,
      },
      {
        id: "b4",
        name: "Tropico",
        vibe: "Exotic fruits",
        dist: "600m away",
        price: 20,
      },
    ],
    s2: [
      {
        id: "b5",
        name: "EatMyTrip",
        vibe: "Fancy waffles",
        dist: "400m away",
        price: 22,
      },
      {
        id: "b6",
        name: "Brunch & Cake",
        vibe: "Healthy options",
        dist: "150m away",
        price: 18,
      },
      {
        id: "b7",
        name: "Billy Brunch",
        vibe: "Cozy atmosphere",
        dist: "300m away",
        price: 15,
      },
      {
        id: "b8",
        name: "Ugot",
        vibe: "Vintage cakes",
        dist: "450m away",
        price: 10,
      },
    ],
  },
  walking: {
    s1: [
      {
        id: "w1",
        name: "Gothic Quarter",
        vibe: "History & Mystery",
        dist: "2km walk",
        price: 0,
      },
      {
        id: "w2",
        name: "Port Vell",
        vibe: "Seafront stroll",
        dist: "1 km walk",
        price: 0,
      },
      {
        id: "w3",
        name: "El Born",
        vibe: "Bohemian vibes",
        dist: "600m walk",
        price: 0,
      },
      {
        id: "w4",
        name: "Ciutadella Park",
        vibe: "Green oasis",
        dist: "900m walk",
        price: 0,
      },
    ],
    s2: [
      {
        id: "w5",
        name: "Modernisme Route",
        vibe: "Gaudi Architecture",
        dist: "1.5km walk",
        price: 0,
      },
      {
        id: "w6",
        name: "Raval Art",
        vibe: "Urban street art",
        dist: "300m walk",
        price: 0,
      },
      {
        id: "w7",
        name: "Passeig de Gràcia",
        vibe: "Luxury shopping",
        dist: "100m walk",
        price: 0,
      },
      {
        id: "w8",
        name: "Plaza Catalunya",
        vibe: "City center hub",
        dist: "400m walk",
        price: 0,
      },
    ],
  },
  tourist: {
    s1: [
      {
        id: "t1",
        name: "Sagrada Família",
        vibe: "Masterpiece",
        dist: "Metro 12m",
        price: 26,
      },
      {
        id: "t2",
        name: "Park Güell",
        vibe: "Mosaic gardens",
        dist: "Bus 20m",
        price: 10,
      },
      {
        id: "t3",
        name: "Picasso Museum",
        vibe: "Art history",
        dist: "Walk 15m",
        price: 15,
      },
      {
        id: "t4",
        name: "Barceloneta Beach",
        vibe: "Sunny vibes",
        dist: "Walk 20m",
        price: 0,
      },
    ],
    s2: [
      {
        id: "t5",
        name: "Sagrada Família",
        vibe: "Masterpiece",
        dist: "Metro 8m",
        price: 26,
      },
      {
        id: "t6",
        name: "Casa Batlló",
        vibe: "Dragon house",
        dist: "Walk 5m",
        price: 35,
      },
      {
        id: "t7",
        name: "La Pedrera",
        vibe: "Quarry facade",
        dist: "Walk 10m",
        price: 25,
      },
      {
        id: "t8",
        name: "Magic Fountain",
        vibe: "Light show",
        dist: "Metro 15m",
        price: 0,
      },
    ],
  },
  hike: {
    s1: [
      {
        id: "h1",
        name: "Bunkers del Carmel",
        vibe: "Best 360° views",
        dist: "Bus 25m",
        price: 0,
      },
      {
        id: "h2",
        name: "Tibidabo",
        vibe: "Theme park & views",
        dist: "Bus 40m",
        price: 0,
      },
      {
        id: "h3",
        name: "Collserola Park",
        vibe: "Nature trails",
        dist: "Train 30m",
        price: 0,
      },
      {
        id: "h4",
        name: "Carretera de les Aigües",
        vibe: "Flat walking path",
        dist: "Train 25m",
        price: 0,
      },
    ],
    s2: [
      {
        id: "h5",
        name: "Montjuïc Castle",
        vibe: "Sea views",
        dist: "Metro 15m",
        price: 9,
      },
      {
        id: "h6",
        name: "Olympic Stadium",
        vibe: "Sports history",
        dist: "Metro 18m",
        price: 0,
      },
      {
        id: "h7",
        name: "Botanical Gardens",
        vibe: "Diverse flora",
        dist: "Bus 20m",
        price: 5,
      },
      {
        id: "h8",
        name: "Mirador de l'Alcalde",
        vibe: "Port views",
        dist: "Metro 15m",
        price: 0,
      },
    ],
  },
};
