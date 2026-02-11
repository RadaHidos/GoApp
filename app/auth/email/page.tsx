"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function EmailAuthPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[#FAFAFA] px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[430px]"
      >
        <button
          onClick={() => router.back()}
          className="mb-6 text-sm font-medium text-black/60 hover:text-black"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-black">Sign up with Email</h1>
        <p className="mt-2 text-black/60">This feature is coming soon...</p>
      </motion.div>
    </main>
  );
}
