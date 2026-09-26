'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

export default function CategorySplit() {
  return (
    <section className="flex flex-col md:flex-row h-screen min-h-[600px] w-full overflow-hidden">
      {/* For Him */}
      <Link href="#for-him" className="relative flex-1 group overflow-hidden">
        <Image
          src="/images/WhatsApp Image 2026-09-26 at 3.25.56 PM.jpeg"
          alt="For Him"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-6 tracking-tight">For Him</h2>
            <p className="text-xs uppercase tracking-[0.4em] font-light mb-8 max-w-xs opacity-80">
              Powerful, refined, and undeniably masculine.
            </p>
            <span className="inline-block px-8 py-3 border border-white text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-black transition-all duration-300">
              Discover
            </span>
          </motion.div>
        </div>
      </Link>

      {/* For Her */}
      <Link href="#for-her" className="relative flex-1 group overflow-hidden border-t md:border-t-0 md:border-l border-white/20">
        <Image
          src="/images/WhatsApp Image 2026-09-26 at 3.25.58 PM (2).jpeg"
          alt="For Her"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-6 tracking-tight">For Her</h2>
            <p className="text-xs uppercase tracking-[0.4em] font-light mb-8 max-w-xs opacity-80">
              Elegant, graceful, and timelessly feminine.
            </p>
            <span className="inline-block px-8 py-3 border border-white text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-black transition-all duration-300">
              Discover
            </span>
          </motion.div>
        </div>
      </Link>
    </section>
  );
}
