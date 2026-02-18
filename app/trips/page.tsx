"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getTrips, type Trip } from "@/lib/tripsStore";
import LiquidTabBar from "@/components/LiquidTabBar";

// 1. Create a separate component for the content that uses useSearchParams
function TripsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newTripId = searchParams.get("newTripId");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTrips(getTrips());
    setLoading(false);
  }, []);

  if (loading) return <div className="min-h-screen bg-[#FAFAFA]" />;

  return (
    <>
      <header className="sticky top-0 z-50 w-full max-w-[430px] bg-[#FAFAFA]/80 backdrop-blur-xl px-6 py-6 flex items-center justify-between border-b border-black/5">
        <h1 className="text-[28px] font-black tracking-tight">Your Trips</h1>
        <div className="h-10 w-10 bg-[#8E7AF6]/10 rounded-full flex items-center justify-center text-[#8E7AF6] font-bold shadow-sm">
          {trips.length}
        </div>
      </header>

      <div className="w-full max-w-[430px] px-6 mt-6 flex-1 flex flex-col gap-4">
        {trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-2">🌍</div>
            <div>
              <h2 className="text-[20px] font-bold mb-2">No trips yet</h2>
              <p className="text-black/40 font-medium max-w-[200px] mx-auto">Start planning your first adventure now.</p>
            </div>
            <button onClick={() => router.push("/trips/new")} className="px-8 py-4 bg-[#1D1D1F] text-white font-black rounded-[20px] shadow-xl active:scale-95 transition-all">
              Plan a new trip
            </button>
          </div>
        ) : (
          <AnimatePresence>
            {trips.map((trip, i) => {
              const isNew = trip.id === newTripId;
              return (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => router.push(`/trips/${trip.id}`)}
                  className={`relative p-6 rounded-[28px] bg-white border cursor-pointer active:scale-[0.98] transition-all shadow-sm group ${
                    isNew ? "border-[#8E7AF6] ring-4 ring-[#8E7AF6]/10" : "border-black/5 hover:border-black/10"
                  }`}
                >
                  {isNew && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-3 -right-3 bg-[#8E7AF6] text-white text-[11px] font-black px-3 py-1.5 rounded-full shadow-lg z-10">
                      JUST SAVED
                    </motion.div>
                  )}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-[22px] font-black tracking-tight leading-none mb-1">{trip.destination}</h3>
                      <p className="text-[13px] font-bold text-black/40 uppercase tracking-wide">{trip.days} Days • {trip.people} {trip.people === 1 ? "Person" : "People"}</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-[20px] font-black tracking-tighter">€{Math.round(trip.totalCost)}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {trip.vibes.slice(0, 3).map((vibe) => (
                      <span key={vibe} className="text-[11px] font-bold bg-gray-50 border border-black/5 px-3 py-1.5 rounded-full text-black/60">{vibe}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </>
  );
}

// 2. Main Page component wraps the content in Suspense
export default function TripsPage() {
  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] text-[#1D1D1F] flex flex-col items-center font-sans pb-[120px]">
      <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA]" />}>
        <TripsContent />
      </Suspense>
      <LiquidTabBar />
    </main>
  );
}