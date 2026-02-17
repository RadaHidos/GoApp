"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function LiquidTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isHomeActive = pathname?.startsWith("/home");
  const isTripsActive = pathname?.startsWith("/trips") && pathname !== "/trips/new";
  
  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
      
      {/* 1. Main Glass Capsule */}
      <div className="pointer-events-auto relative flex items-center justify-between px-2 h-[68px] min-w-[280px] w-[90vw] max-w-[340px] rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/20">
        
        {/* iPhone Style Glass Layers */}
        <div className="absolute inset-0 rounded-full bg-white/60 backdrop-blur-[24px]" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-white/5 to-transparent opacity-80 pointer-events-none" />

        {/* --- Home Tab --- */}
        <button
          onClick={() => router.push("/home")}
          className="relative z-10 flex flex-1 flex-col items-center justify-center gap-1 h-full cursor-pointer group active:scale-95 transition-all"
        >
          {isHomeActive && (
            <motion.div 
              layoutId="active-pill"
              className="absolute inset-1 rounded-full bg-white/80 shadow-sm border border-black/5"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          
          <div className={`relative z-20 transition-colors duration-300 ${isHomeActive ? "text-[#8E7AF6]" : "text-black/30 group-hover:text-black/50"}`}>
             <HomeIcon className="h-[22px] w-[22px]" strokeWidth={isHomeActive ? 2.5 : 2} />
          </div>
          <span className={`relative z-20 text-[10px] font-bold tracking-tight transition-colors duration-300 ${isHomeActive ? "text-black" : "text-black/30 group-hover:text-black/50"}`}>
            Home
          </span>
        </button>


        {/* --- 2. Refined Lavender Action (No Border) --- */}
        <div className="relative z-30 flex-none mx-2"> 
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push("/trips/new")}
                className="h-[60px] w-[60px] rounded-full bg-[#8E7AF6] flex items-center justify-center text-white shadow-[0_10px_25px_rgba(142,122,246,0.4)] active:shadow-none transition-all"
            >
                <PlusIcon className="h-7 w-7" />
            </motion.button>
        </div>


        {/* --- Trips History Tab --- */}
        <button
          onClick={() => router.push("/trips")}
          className="relative z-10 flex flex-1 flex-col items-center justify-center gap-1 h-full cursor-pointer group active:scale-95 transition-all"
        >
          {isTripsActive && (
            <motion.div 
              layoutId="active-pill"
              className="absolute inset-1 rounded-full bg-white/80 shadow-sm border border-black/5"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}

          <div className={`relative z-20 transition-colors duration-300 ${isTripsActive ? "text-[#8E7AF6]" : "text-black/30 group-hover:text-black/50"}`}>
             <ClockIcon className="h-[22px] w-[22px]" strokeWidth={isTripsActive ? 2.5 : 2} />
          </div>
          <span className={`relative z-20 text-[10px] font-bold tracking-tight transition-colors duration-300 ${isTripsActive ? "text-black" : "text-black/30 group-hover:text-black/50"}`}>
            History
          </span>
        </button>

      </div>
    </div>
  );
}

// --- Icons remain unchanged ---
function HomeIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function ClockIcon(props: any) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
}

function PlusIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}