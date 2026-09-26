'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full h-screen h-[100dvh] min-h-[560px] bg-[#070b08] flex flex-col justify-between overflow-hidden pt-20">
      {/* Background / Right Bottle Visual */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        {/* Placeholder image: Isay apni main hero image path se replace kar lein */}
        <Image
          src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2000&auto=format&fit=crop"
          alt="Gul's Eau De Parfum"
          fill
          unoptimized
          priority
          className="object-cover object-center md:object-right opacity-80"
        />
        {/* Dark moody gradient overlays matching the reference design */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060a07] via-[#060a07]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060a07]/90 via-transparent to-[#060a07]/50" />
      </motion.div>

      {/* Top Spacer for vertical balance */}
      <div className="hidden sm:block" />

      {/* Main Left Content (Vertically Centered in Remaining Viewport) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-14 my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="max-w-xl"
        >
          <span className="block text-[#d6be96] text-[10px] md:text-xs uppercase tracking-[0.35em] mb-3 md:mb-4 font-medium">
            Luxury Perfumes
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-serif leading-[1.1] tracking-tight mb-4 md:mb-6">
            More Than <br />
            Just a Fragrance
          </h1>

          <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-8 md:mb-10 max-w-sm font-light tracking-wide">
            Each scent is a story — crafted for those <br className="hidden sm:block" />
            who seek more than the ordinary.
          </p>

          <Link
            href="/shop"
            className="inline-flex items-center gap-4 px-7 py-3.5 border border-white/35 text-white text-[10px] uppercase tracking-[0.25em] hover:bg-[#d6be96] hover:border-[#d6be96] hover:text-[#070b08] transition-all duration-300"
          >
            <span>Explore Collections</span>
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </motion.div>
      </div>

      {/* Bottom-Left Slide Pagination (01 — 02 03) Aligned with Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-14 pb-6 md:pb-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center space-x-6 text-[10px] tracking-[0.2em] font-medium">
            <span className="text-white">01</span>
            <span className="w-6 h-px bg-white/20" />
            <span className="text-white/40 hover:text-white/70 cursor-pointer transition-colors">
              02
            </span>
            <span className="text-white/40 hover:text-white/70 cursor-pointer transition-colors">
              03
            </span>
          </div>
          {/* Active progress indicator line */}
          <div className="w-28 h-[1.5px] bg-white/15 relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-10 bg-[#d6be96]" />
          </div>
        </div>
      </div>

      {/* Right Edge Vertical Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-4 text-white/50"
      >
        <span
          className="text-[9px] uppercase tracking-[0.35em]"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <div className="w-px h-14 bg-white/25 relative overflow-hidden">
          <motion.div
            animate={{ top: ['-40%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-0 w-full h-1/3 bg-[#d6be96]"
          />
        </div>
      </motion.div>
    </section>
  );
}