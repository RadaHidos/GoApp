'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const router = useRouter();

  const goToAuth = () => {
    router.push('/auth');
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="flex min-h-screen w-full items-center justify-center bg-[#f5f2ef] px-3 py-4 font-['Inter','SF_Pro_Text','-apple-system','BlinkMacSystemFont','Segoe_UI','sans-serif']"
    >
      <section
        className="relative flex min-h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden rounded-[28px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,20,24,0.54), rgba(20,20,24,0.54)), url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80'), linear-gradient(180deg, #efebe7 0%, #e6e1dc 100%)",
          backgroundSize: 'cover, cover, cover',
          backgroundPosition: 'center, center, center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/60" />

        <div className="relative z-10 flex min-h-[100dvh] flex-col items-center px-7 pb-10 pt-24 text-center text-white">
          <div className="mt-20 flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(4.5rem,22vw,8rem)] font-black leading-none tracking-[-0.04em]"
            >
              GO
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35, ease: 'easeOut' }}
              className="mt-4 max-w-[290px] text-[2.1rem] leading-tight text-white/95 sm:text-[2.2rem]"
            >
              Stop Researching. Start Going
            </motion.p>
          </div>

          <div className="mt-auto flex w-full flex-col items-center gap-5">
            <motion.button
              type="button"
              onClick={goToAuth}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-full bg-[#222328]/95 px-7 py-5 text-center text-[1.95rem] font-semibold tracking-[0.02em] text-white shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition-all duration-200 hover:shadow-[0_0_0_4px_rgba(196,181,253,0.28),0_12px_28px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c4b5fd]/60"
            >
              <span className="inline-flex items-center justify-center gap-3">
                GET STARTED <span aria-hidden>→</span>
              </span>
            </motion.button>

            <motion.button
              type="button"
              onClick={goToAuth}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.68, ease: 'easeOut' }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="text-[1.85rem] font-medium text-white/90 transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white"
            >
              I already have an account
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.82, ease: 'easeOut' }}
            className="mt-12 text-[1.2rem] leading-relaxed text-white/65"
          >
            By continuing you agree to our Terms and Conditions
          </motion.p>
        </div>
      </section>
    </motion.main>
  );
}
