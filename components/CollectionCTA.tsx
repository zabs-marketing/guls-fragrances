'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function CollectionCTA() {
  return (
    <section className="relative py-32 md:py-48 px-6 overflow-hidden bg-brand-black">
      <div className="absolute inset-0 opacity-40">
        <Image
          src="/images/placeholder-image.jpg"
          alt="Fragrance Selection"
          fill
          className="object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-8xl font-serif text-white mb-12 tracking-tight leading-none">
            FIND YOUR <br />
            <span className="italic text-brand-gold">SIGNATURE.</span>
          </h2>
          <button className="px-16 py-6 bg-brand-cream text-brand-black uppercase tracking-[0.4em] text-xs font-bold hover:bg-brand-burgundy hover:text-white transition-all duration-500 shadow-2xl">
            Explore All Fragrances
          </button>
        </motion.div>
      </div>
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-brand-gold/0 to-brand-gold/40" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-brand-gold/0 to-brand-gold/40" />
    </section>
  );
}
