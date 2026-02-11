"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function OnboardingStudyPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[#FAFAFA] px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[430px] text-center"
      >
        <div className="mb-6 flex items-center justify-start">
          <button
            onClick={() => router.back()}
            className="text-sm font-medium text-black/60 hover:text-black"
          >
            ← Back
          </button>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
          <h1 className="text-2xl font-bold text-black">Welcome Aboard! 🚀</h1>
          <p className="mt-4 text-black/60">We're setting up your profile...</p>
        </div>
      </motion.div>
    </main>
  );
}
