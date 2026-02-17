"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LiquidTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isHomeActive = pathname?.startsWith("/home");
  const isTripsActive =
    pathname?.startsWith("/trips") && pathname !== "/trips/new";

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none px-6">
      <div className="pointer-events-auto relative flex items-center justify-between px-2 h-[72px] w-full max-w-[340px] rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/30 overflow-hidden">
        {/* Liquid Glass Background */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-50 pointer-events-none" />

        {/* Home Tab */}
        <button
          onClick={() => router.push("/home")}
          className="relative z-10 flex flex-1 flex-col items-center justify-center gap-1 h-full active:scale-90 transition-all group"
        >
          {isHomeActive && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-1 rounded-full bg-white/90 shadow-sm ring-1 ring-black/5"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          <div
            className={`relative z-20 transition-colors ${isHomeActive ? "text-[#8E7AF6]" : "text-black/30"}`}
          >
            <HomeIcon
              className="h-6 w-6"
              strokeWidth={isHomeActive ? 2.5 : 2}
            />
          </div>
          <span
            className={`relative z-20 text-[10px] font-bold tracking-tight ${isHomeActive ? "text-black" : "text-black/30"}`}
          >
            Home
          </span>
        </button>

        {/* Center Lavender Primary Action */}
        <div className="relative z-30 flex-none mx-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push("/trips/new")}
            className="h-[60px] w-[60px] rounded-full bg-[#8E7AF6] flex items-center justify-center text-white shadow-[0_12px_30px_rgba(142,122,246,0.4)] active:shadow-none transition-all"
          >
            <PlusIcon className="h-8 w-8" />
          </motion.button>
        </div>

        {/* History Tab */}
        <button
          onClick={() => router.push("/trips")}
          className="relative z-10 flex flex-1 flex-col items-center justify-center gap-1 h-full active:scale-90 transition-all group"
        >
          {isTripsActive && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-1 rounded-full bg-white/90 shadow-sm ring-1 ring-black/5"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          <div
            className={`relative z-20 transition-colors ${isTripsActive ? "text-[#8E7AF6]" : "text-black/30"}`}
          >
            <ClockIcon
              className="h-6 w-6"
              strokeWidth={isTripsActive ? 2.5 : 2}
            />
          </div>
          <span
            className={`relative z-20 text-[10px] font-bold tracking-tight ${isTripsActive ? "text-black" : "text-black/30"}`}
          >
            History
          </span>
        </button>
      </div>
    </div>
  );
}

function HomeIcon(p: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...p}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}
function ClockIcon(p: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...p}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
function PlusIcon(p: any) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
      {...p}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}
