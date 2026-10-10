'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full h-screen h-[100dvh] min-h-[560px] bg-brand-green-dark flex flex-col justify-between overflow-hidden pt-20">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2000&auto=format&fit=crop"
          alt="Gul's Eau De Parfum"
          fill
          priority
          className="object-cover object-center md:object-right opacity-80"
          sizes="100vw"
        />
        {/* Dark moody gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark via-brand-green-dark/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/90 via-transparent to-brand-green-dark/50" />
      </motion.div>

      {/* Top spacer for vertical balance */}
      <div className="hidden sm:block" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-14 my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="max-w-xl"
        >
          <span className="block text-brand-gold text-[10px] md:text-xs uppercase tracking-[0.35em] mb-3 md:mb-4 font-medium">
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
            href="/fragrance"
            className="inline-flex items-center gap-4 px-7 py-3.5 border border-white/35 text-white text-[10px] uppercase tracking-[0.25em] hover:bg-brand-gold hover:border-brand-gold hover:text-brand-green-dark transition-all duration-300"
          >
            <span>Explore Collections</span>
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </motion.div>
      </div>

      {/* Bottom Slide Pagination */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-14 pb-6 md:pb-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center space-x-6 text-[10px] tracking-[0.2em] font-medium">
            <span className="text-white">01</span>
            <span className="w-6 h-px bg-white/20" />
            <span className="text-white/40">02</span>
            <span className="text-white/40">03</span>
          </div>
          <div className="w-28 h-[1.5px] bg-white/15 relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-10 bg-brand-gold" />
          </div>
        </div>
      </div>

      {/* Right Edge Scroll Indicator */}
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
            className="absolute left-0 w-full h-1/3 bg-brand-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}