"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  getTripById,
  deleteTrip,
  updateTrip,
  type Trip,
} from "@/lib/tripsStore";
import LiquidTabBar from "@/components/LiquidTabBar";

const easeOut = [0.22, 1, 0.36, 1] as const;

// --- Constants for data lookup ---
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

const DISCOVERY_DATA: any = {
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

export default function TripDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const [editingPlaceId, setEditingPlaceId] = useState<string | null>(null);
  const [placeNoteContent, setPlaceNoteContent] = useState("");
  const [placeRatingValue, setPlaceRatingValue] = useState(0);

  useEffect(() => {
    if (params.id) {
      const foundTrip = getTripById(params.id as string);
      setTrip(foundTrip || null);
      if (foundTrip?.notes) setNoteContent(foundTrip.notes);
    }
    setLoading(false);
  }, [params.id]);

  const handleSaveNotes = () => {
    if (!trip) return;
    const updatedTrip = { ...trip, notes: noteContent };
    updateTrip(updatedTrip);
    setTrip(updatedTrip);
    setShowNotesModal(false);
  };

  const openPlaceModal = (placeId: string) => {
    if (!trip) return;
    setEditingPlaceId(placeId);
    setPlaceNoteContent(trip.placeNotes?.[placeId] || "");
    setPlaceRatingValue(trip.placeRatings?.[placeId] || 0);
  };

  const handleSavePlaceDetails = () => {
    if (!trip || !editingPlaceId) return;
    const updatedTrip = {
      ...trip,
      placeNotes: {
        ...(trip.placeNotes || {}),
        [editingPlaceId]: placeNoteContent,
      },
      placeRatings: {
        ...(trip.placeRatings || {}),
        [editingPlaceId]: placeRatingValue,
      },
    };
    if (!placeNoteContent.trim())
      delete updatedTrip.placeNotes![editingPlaceId];
    if (placeRatingValue === 0)
      delete updatedTrip.placeRatings![editingPlaceId];
    updateTrip(updatedTrip);
    setTrip(updatedTrip);
    setEditingPlaceId(null);
  };

  if (loading) return <div className="min-h-screen bg-[#FAFAFA]" />;

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center text-black">
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

  const allOptions = Object.values(DISCOVERY_DATA).flatMap((cat: any) =>
    Object.values(cat).flatMap((arr: any) => arr),
  );

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] text-[#1D1D1F] flex flex-col items-center font-sans pb-[140px]">
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
        {/* Budget Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-8 rounded-[36px] shadow-2xl relative overflow-hidden ${trip.isOverBudget ? "bg-[#2D0A0A]" : "bg-[#0B0C0F]"} text-white`}
        >
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <p className="text-[12px] font-bold text-white/40 uppercase tracking-widest">
                  Total Cost
                </p>
                <h2
                  className={`text-[48px] font-black tracking-tighter ${trip.isOverBudget ? "text-red-400" : "text-white"}`}
                >
                  €{Math.round(trip.totalCost)}
                </h2>
              </div>
              <div
                className={`px-4 py-2 rounded-2xl text-[13px] font-black shadow-lg ${trip.isOverBudget ? "bg-red-500" : "bg-[#8E7AF6]"}`}
              >
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
              <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden p-[2px]">
                <div
                  style={{ width: `${trip.progressPercent}%` }}
                  className={`h-full rounded-full ${trip.isOverBudget ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" : "bg-[#8E7AF6] shadow-[0_0_15px_rgba(142,122,246,0.5)]"}`}
                />
              </div>
            </div>
          </div>
          <div
            className={`absolute -right-20 -top-20 w-64 h-64 blur-[100px] rounded-full opacity-10 ${trip.isOverBudget ? "bg-red-500" : "bg-[#8E7AF6]"}`}
          />
        </motion.div>

        {/* Selected Logistics */}
        <section className="space-y-4">
          <h3 className="text-[20px] font-bold px-1 text-black">Logistics</h3>
          <div className="space-y-3">
            <div className="p-5 rounded-[28px] bg-white border border-black/[0.03] shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-[#8E7AF6]/10 flex items-center justify-center shrink-0">
                <PlaneIcon className="h-6 w-6 text-[#8E7AF6]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[15px] truncate text-black">
                  {trip.selectedFlight.airline}
                </h4>
                <p className="text-[13px] font-medium text-black/40">
                  {trip.selectedFlight.time}
                </p>
              </div>
              <p className="font-black text-[17px] text-black">
                €{trip.selectedFlight.price}
              </p>
            </div>
            <div className="p-5 rounded-[28px] bg-white border border-black/[0.03] shadow-sm flex items-center gap-4">
              {trip.selectedStay.image ? (
                <div
                  className={`h-12 w-12 rounded-xl ${trip.selectedStay.image} shrink-0 shadow-inner`}
                />
              ) : (
                <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <BedIcon className="h-6 w-6 text-orange-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[15px] truncate text-black">
                  {trip.selectedStay.name}
                </h4>
                <p className="text-[13px] font-medium text-black/40">
                  {trip.selectedStay.distance}
                </p>
              </div>
              <p className="font-black text-[17px] text-black">
                €{trip.selectedStay.price}
              </p>
            </div>
          </div>
        </section>

        {/* --- Itinerary Section (UPDATED CARD DESIGN) --- */}
        <section className="space-y-6">
          <h3 className="text-[20px] font-bold px-1 text-black">
            Your Itinerary
          </h3>
          <div className="relative pl-6 border-l-2 border-[#8E7AF6]/20 ml-4 space-y-12">
            {ITINERARY.map((item, i) => {
              const allItemOptions = Object.values(
                DISCOVERY_DATA[item.id as keyof typeof DISCOVERY_DATA] || {},
              ).flatMap((a: any) => a);
              const selectedPlaceIds = trip.selectedPlaces.filter((id) =>
                allItemOptions.some((o: any) => o.id === id),
              );
              const selectedPlacesForItem = allOptions.filter((o: any) =>
                selectedPlaceIds.includes(o.id),
              );

              return (
                <div key={i} className="relative">
                  <div className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-white border-4 border-[#8E7AF6]" />
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-black uppercase tracking-widest text-black/30">
                        Day {item.day} • {item.period}
                      </span>
                      <p className="text-[17px] font-bold text-black leading-tight">
                        {item.activity}
                      </p>
                    </div>

                    {selectedPlacesForItem.map((place: any) => {
                      const hasNote = !!trip.placeNotes?.[place.id];
                      const rating = trip.placeRatings?.[place.id] || 0;

                      return (
                        <div
                          key={place.id}
                          className="p-5 rounded-[28px] bg-white border border-[#8E7AF6]/30 shadow-xl shadow-[#8E7AF6]/5 space-y-4"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0 pr-4">
                              <h4 className="font-bold text-[16px] text-black truncate mb-1">
                                {place.name}
                              </h4>
                              <p className="text-[13px] text-black/40 font-medium leading-relaxed">
                                {place.vibe}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-[11px] font-black uppercase tracking-widest text-[#8E7AF6] bg-[#8E7AF6]/5 px-2 py-1 rounded-md">
                                {place.price > 0 ? `€${place.price}` : "Free"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase text-[#8E7AF6]">
                                <MapPinIcon className="h-3 w-3" /> {place.dist}
                              </div>
                              {rating > 0 && (
                                <div className="flex gap-0.5">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <StarIcon
                                      key={s}
                                      filled={s <= rating}
                                      className={`h-3 w-3 ${s <= rating ? "text-yellow-400" : "text-gray-200"}`}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Text Buttons instead of Icons */}
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => openPlaceModal(place.id)}
                                className={`px-4 py-2 rounded-full text-[12px] font-bold transition-all active:scale-90 ${hasNote || rating > 0 ? "bg-[#8E7AF6] text-white shadow-md shadow-[#8E7AF6]/20" : "bg-gray-100 text-black/50 border border-black/5"}`}
                              >
                                notes
                              </button>
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + trip.destination)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-full bg-gray-100 text-black/50 text-[12px] font-bold active:scale-90 transition-all border border-black/5"
                              >
                                maps
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Global Actions */}
        <div className="pt-8 pb-4 space-y-3">
          <button
            onClick={() => {
              setNoteContent(trip.notes || "");
              setShowNotesModal(true);
            }}
            className="w-full flex items-center justify-center gap-2 p-4 text-[#8E7AF6] font-bold bg-[#8E7AF6]/10 rounded-[22px] active:scale-95 transition-all"
          >
            {trip.notes ? "Edit Trip Notes" : "Add Trip Notes"}
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-bold bg-red-50 rounded-[22px] active:scale-95 transition-all border border-red-100"
          >
            Delete Trip
          </button>
        </div>
      </div>

      {/* --- Modals remain with existing functionality --- */}
      <AnimatePresence>
        {showNotesModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowNotesModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-[430px] p-6 rounded-[32px] shadow-2xl relative z-10 space-y-4"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-black">Trip Notes</h3>
                </div>
                <button
                  onClick={() => setShowNotesModal(false)}
                  className="h-8 w-8 rounded-full bg-black/5 flex items-center justify-center text-black/40"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Write down ideas, packing lists, or reminders..."
                className="w-full h-40 p-4 bg-gray-50 rounded-[20px] text-[15px] font-medium text-black placeholder:text-black/30 outline-none border border-transparent focus:border-[#8E7AF6]/30 focus:bg-white transition-all resize-none"
              />
              <button
                onClick={handleSaveNotes}
                className="w-full py-4 rounded-[20px] font-black text-white bg-[#8E7AF6] shadow-lg active:scale-95 transition-all"
              >
                Save Notes
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowDeleteModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-[430px] p-6 rounded-[32px] shadow-2xl relative z-10 text-center space-y-4"
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center mb-2">
                ⚠️
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">
                  Delete this trip?
                </h3>
                <p className="text-[15px] font-medium text-black/40 mt-1">
                  This action cannot be undone.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="w-full py-4 rounded-[20px] font-bold text-black bg-gray-100 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (trip) {
                      deleteTrip(trip.id);
                      router.push("/trips");
                    }
                  }}
                  className="w-full py-4 rounded-[20px] font-black text-white bg-red-500 active:scale-95"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editingPlaceId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setEditingPlaceId(null)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-[430px] p-6 rounded-[32px] shadow-2xl relative z-10 space-y-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-black">Rate & Note</h3>
                <button
                  onClick={() => setEditingPlaceId(null)}
                  className="h-8 w-8 rounded-full bg-black/5 flex items-center justify-center text-black/40"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="flex justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setPlaceRatingValue(star)}
                    className="focus:outline-none transition-transform active:scale-110"
                  >
                    <StarIcon
                      filled={star <= placeRatingValue}
                      className={`h-8 w-8 ${star <= placeRatingValue ? "text-yellow-400" : "text-gray-200"}`}
                    />
                  </button>
                ))}
              </div>
              <textarea
                value={placeNoteContent}
                onChange={(e) => setPlaceNoteContent(e.target.value)}
                placeholder="What did you think of this place?"
                className="w-full h-32 p-4 bg-gray-50 rounded-[20px] text-[15px] font-medium text-black placeholder:text-black/30 outline-none border border-transparent focus:border-[#8E7AF6]/30 focus:bg-white transition-all resize-none"
              />
              <button
                onClick={handleSavePlaceDetails}
                className="w-full py-4 rounded-[20px] font-black text-white bg-[#8E7AF6] shadow-lg active:scale-95 transition-all"
              >
                Save Review
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <LiquidTabBar />
    </main>
  );
}

// --- Icons ---
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
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="4"
    >
      <polyline points="20 6 9 17 4 12" />
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
function XIcon(p: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      {...p}
    >
      <path
        d="M6 18L18 6M6 6l12 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function StarIcon({
  filled,
  className,
}: {
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      fill={filled ? "currentColor" : "none"}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      className={className}
    >
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}
