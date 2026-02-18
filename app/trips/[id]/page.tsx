"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getTripById, type Trip } from "@/lib/tripsStore";

// Re-using constants from result page for lookup purposes 
// (In a real app, these would come from a database or API)
const ITINERARY = [
  { id: "brunch", day: 1, period: "Morning", activity: "Arrival & Local Brunch" },
  { id: "walking", day: 1, period: "Afternoon", activity: "Walking Around" },
  { id: "tourist", day: 2, period: "Morning", activity: "Visiting Touristic Attractions" },
  { id: "hike", day: 2, period: "Afternoon", activity: "Sunset Hike / Viewpoint" },
];

const DISCOVERY_DATA: any = {
  brunch: {
    s1: [
      { id: "b1", name: "Federal Café", vibe: "Great coffee", dist: "200m away", price: 15 },
      { id: "b2", name: "Milk Bar", vibe: "Budget friendly", dist: "350m away", price: 12 },
      { id: "b3", name: "Caravelle", vibe: "Tex-Mex fusion", dist: "500m away", price: 18 },
      { id: "b4", name: "Tropico", vibe: "Exotic fruits", dist: "600m away", price: 20 },
    ],
    s2: [
      { id: "b5", name: "EatMyTrip", vibe: "Fancy waffles", dist: "400m away", price: 22 },
      { id: "b6", name: "Brunch & Cake", vibe: "Healthy options", dist: "150m away", price: 18 },
      { id: "b7", name: "Billy Brunch", vibe: "Cozy atmosphere", dist: "300m away", price: 15 },
      { id: "b8", name: "Ugot", vibe: "Vintage cakes", dist: "450m away", price: 10 },
    ],
  },
  walking: {
    s1: [
      { id: "w1", name: "Gothic Quarter", vibe: "History & Mystery", dist: "2km walk", price: 0 },
      { id: "w2", name: "Port Vell", vibe: "Seafront stroll", dist: "1 km walk", price: 0 },
      { id: "w3", name: "El Born", vibe: "Bohemian vibes", dist: "600m walk", price: 0 },
      { id: "w4", name: "Ciutadella Park", vibe: "Green oasis", dist: "900m walk", price: 0 },
    ],
    s2: [
      { id: "w5", name: "Modernisme Route", vibe: "Gaudi Architecture", dist: "1.5km walk", price: 0 },
      { id: "w6", name: "Raval Art", vibe: "Urban street art", dist: "300m walk", price: 0 },
      { id: "w7", name: "Passeig de Gràcia", vibe: "Luxury shopping", dist: "100m walk", price: 0 },
      { id: "w8", name: "Plaza Catalunya", vibe: "City center hub", dist: "400m walk", price: 0 },
    ],
  },
  tourist: {
    s1: [
      { id: "t1", name: "Sagrada Família", vibe: "Masterpiece", dist: "Metro 12m", price: 26 },
      { id: "t2", name: "Park Güell", vibe: "Mosaic gardens", dist: "Bus 20m", price: 10 },
      { id: "t3", name: "Picasso Museum", vibe: "Art history", dist: "Walk 15m", price: 15 },
      { id: "t4", name: "Barceloneta Beach", vibe: "Sunny vibes", dist: "Walk 20m", price: 0 },
    ],
    s2: [
      { id: "t5", name: "Sagrada Família", vibe: "Masterpiece", dist: "Metro 8m", price: 26 },
      { id: "t6", name: "Casa Batlló", vibe: "Dragon house", dist: "Walk 5m", price: 35 },
      { id: "t7", name: "La Pedrera", vibe: "Quarry facade", dist: "Walk 10m", price: 25 },
      { id: "t8", name: "Magic Fountain", vibe: "Light show", dist: "Metro 15m", price: 0 },
    ],
  },
  hike: {
    s1: [
      { id: "h1", name: "Bunkers del Carmel", vibe: "Best 360° views", dist: "Bus 25m", price: 0 },
      { id: "h2", name: "Tibidabo", vibe: "Theme park & views", dist: "Bus 40m", price: 0 },
      { id: "h3", name: "Collserola Park", vibe: "Nature trails", dist: "Train 30m", price: 0 },
      { id: "h4", name: "Carretera de les Aigües", vibe: "Flat walking path", dist: "Train 25m", price: 0 },
    ],
    s2: [
      { id: "h5", name: "Montjuïc Castle", vibe: "Sea views", dist: "Metro 15m", price: 9 },
      { id: "h6", name: "Olympic Stadium", vibe: "Sports history", dist: "Metro 18m", price: 0 },
      { id: "h7", name: "Botanical Gardens", vibe: "Diverse flora", dist: "Bus 20m", price: 5 },
      { id: "h8", name: "Mirador de l'Alcalde", vibe: "Port views", dist: "Metro 15m", price: 0 },
    ],
  },
};


export default function TripDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const foundTrip = getTripById(params.id as string);
      setTrip(foundTrip || null);
    }
    setLoading(false);
  }, [params.id]);

  if (loading) return <div className="min-h-screen bg-[#FAFAFA]" />;

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Trip not found</h2>
        <button 
          onClick={() => router.push("/trips")}
          className="text-[#8E7AF6] font-bold"
        >
          Back to Trips
        </button>
      </div>
    );
  }

  // Lookup selected places (simple version reusing constant data)
  // In a real app we'd probably have saved the full object in the trip
  const allOptions = Object.values(DISCOVERY_DATA).flatMap((cat: any) =>
    Object.values(cat).flatMap((arr: any) => arr),
  );

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] text-[#1D1D1F] flex flex-col items-center font-sans pb-10">
      <header className="sticky top-0 z-50 w-full max-w-[430px] bg-[#FAFAFA]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between border-b border-black/5">
        <button
          onClick={() => router.push("/trips")}
          className="h-10 w-10 rounded-full bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center text-black/60 active:scale-95 transition-all"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#8E7AF6]">
            Trip Details
          </span>
          <span className="text-[17px] font-bold text-black">
            {trip.destination}
          </span>
        </div>
        <div className="w-10" />
      </header>

      <div className="w-full max-w-[430px] px-6 mt-6 space-y-8">
        {/* --- Budget Hero (Read Only) --- */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className={`p-8 rounded-[36px] shadow-2xl relative overflow-hidden ${trip.isOverBudget ? "bg-red-950" : "bg-[#1D1D1F]"} text-white`}
        >
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <p className="text-[12px] font-bold text-white/40 uppercase tracking-widest">
                  Total Cost
                </p>
                <h2 className="text-[48px] font-black tracking-tighter">
                  €{Math.round(trip.totalCost)}
                </h2>
              </div>
              <div className={`px-4 py-2 rounded-2xl text-[13px] font-black shadow-lg ${trip.isOverBudget ? "bg-red-500" : "bg-[#8E7AF6]"}`}>
                €{trip.budget} Budget
              </div>
            </div>

             <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-[13px] font-bold text-white/60">
                  {trip.isOverBudget
                    ? `⚠️ Over budget`
                    : `🔥 Saving €${Math.round(trip.savings)}`}
                </span>
                <span className="text-[13px] font-bold">
                  {Math.round(trip.progressPercent)}%
                </span>
              </div>
              <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  style={{ width: `${trip.progressPercent}%` }}
                  className={`h-full rounded-full ${trip.isOverBudget ? "bg-red-500" : "bg-[#8E7AF6] shadow-[0_0_15px_rgba(142,122,246,0.5)]"}`}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Selected Flight & Stay */}
        <section className="space-y-5">
          <h3 className="text-[20px] font-bold px-1">Your Selections</h3>
          <div className="space-y-3">
            <div className="p-5 rounded-[28px] bg-white border border-[#8E7AF6] shadow-xl flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-[#8E7AF6]/10 flex items-center justify-center shrink-0">
                <PlaneIcon className="h-6 w-6 text-[#8E7AF6]" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[16px]">{trip.selectedFlight.airline}</h4>
                <p className="text-[13px] font-medium text-black/40">{trip.selectedFlight.time}</p>
              </div>
              <div className="text-right">
                <p className="font-black tracking-tighter text-[18px]">€{trip.selectedFlight.price}</p>
                <p className="text-[11px] font-bold text-black/20 uppercase tracking-wide">{trip.selectedFlight.stops}</p>
              </div>
            </div>

            <div className="p-5 rounded-[28px] bg-white border border-[#8E7AF6] shadow-xl flex items-center gap-4">
               {trip.selectedStay.image && (
                <div className={`h-14 w-14 rounded-2xl ${trip.selectedStay.image} shrink-0 shadow-inner`} />
               )}
              <div className="flex-1">
                <h4 className="font-bold text-[16px]">{trip.selectedStay.name}</h4>
                <p className="text-[13px] font-medium text-black/40">{trip.selectedStay.distance}</p>
              </div>
              <div className="text-right">
                <p className="font-black tracking-tighter text-[18px]">€{trip.selectedStay.price}</p>
                <p className="text-[11px] font-bold text-black/20 uppercase tracking-wide">/night</p>
              </div>
            </div>
          </div>
        </section>

        {/* Itinerary Timeline */}
        <section className="space-y-6">
          <h3 className="text-[20px] font-bold px-1">Your Itinerary</h3>
          <div className="relative pl-6 border-l-2 border-[#8E7AF6]/20 ml-4 space-y-12 pb-10">
            {ITINERARY.map((item, i) => {
              // Find selected places for this item
               const options = DISCOVERY_DATA[item.id as keyof typeof DISCOVERY_DATA]?.[
                  // We need to use the selectedStay.id from the trip but mapped to s1/s2 if possible, 
                  // OR simplify lookup. Ideally we saved the FULL object
                  // For this simpler version, we assume 's1'/'s2' mapping still holds.
                  // Since we only saved selectedPlaces IDs, let's find if any selected place belongs to this activity category
                  // This is a bit hacky because we don't know which stay ID maps to which set easily without the original logic
                  // BUT we can just search all selectedPlaces and see if any match the options available for this item
                  Object.keys(DISCOVERY_DATA[item.id as keyof typeof DISCOVERY_DATA] || {})[0] 
                  // Just grabbing any options list to find the item detials, assuming IDs are unique globally
                ];
              
              // Find the specific selected place object for this timeline item
              const allItemOptions = Object.values(DISCOVERY_DATA[item.id as keyof typeof DISCOVERY_DATA] || {}).flatMap((a: any) => a);
              const selectedPlaceId = trip.selectedPlaces.find(id => allItemOptions.find((o: any) => o.id === id));
              const selectedPlace = allOptions.find((o:any) => o.id === selectedPlaceId);

              return (
                <div key={i} className="relative">
                  <div className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-white border-4 border-[#8E7AF6]" />
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-black uppercase tracking-widest text-black/30">
                        Day {item.day} • {item.period}
                      </span>
                      <p className="text-[17px] font-bold text-black">
                        {item.activity}
                      </p>
                    </div>

                    {selectedPlace && (
                      <div className="p-4 rounded-[24px] bg-white border border-[#8E7AF6] shadow-sm">
                         <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-[16px] leading-tight text-black">
                                {selectedPlace.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <p className="text-[13px] text-black/40 font-medium">
                                  {selectedPlace.vibe}
                                </p>
                                <span className="text-[12px] font-black tracking-tighter text-[#8E7AF6] bg-[#8E7AF6]/10 px-2 py-0.5 rounded-md">
                                  {selectedPlace.price > 0 ? `€${selectedPlace.price}` : "Free"}
                                </span>
                              </div>
                            </div>
                            <div className="h-6 w-6 rounded-full bg-[#8E7AF6] flex items-center justify-center">
                              <CheckIcon />
                            </div>
                          </div>
                           <div className="flex items-end justify-between mt-2">
                              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#8E7AF6]">
                                <MapPinIcon className="h-3 w-3" />
                                {selectedPlace.dist}
                              </div>
                              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-black/5 text-[11px] font-bold text-black/60 active:scale-95 transition-all">
                                <MapIcon className="h-3 w-3" />
                                Google Maps
                              </button>
                            </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </main>
  );
}

function ChevronLeftIcon(p: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} {...p}>
      <path d="M15 19l-7-7 7-7" />
    </svg>
  );
}
function PlaneIcon(p: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...p}>
      <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function MapIcon(p: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...p}>
      <path d="M9 20l-5 4V4l5 4 6-4 5 4v20l-5-4-6 4z" />
    </svg>
  );
}
function MapPinIcon(p: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} {...p}>
      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <circle cx="12" cy="11" r="3" />
    </svg>
  );
}
