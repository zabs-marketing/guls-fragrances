'use client';

import React from 'react';
import { motion } from 'motion/react';

export default function AboutUs() {
  return (
    <section className="relative w-full bg-brand-white py-24 md:py-36 px-6 border-t border-b border-brand-black/5 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Subtle Section Label */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.3em] text-brand-muted mb-8"
        >
          The Philosophy & Craft
        </motion.span>

        {/* Brand Statement / Editorial Block */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative"
        >
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-black leading-[1.6] md:leading-[1.7] font-normal tracking-tight">
            Gul&apos;s Collection is not just a fragrance house &mdash; it&apos;s a time capsule.
            Born from the idea that every decade has a scent, and every person has an era,
            Decades by Gul&apos;s was created to let you{' '}
            <span className="font-sans font-semibold text-brand-green tracking-[0.15em] uppercase text-xl sm:text-2xl md:text-3xl inline-block px-1 border-b border-brand-green/30">
              WEAR YOUR ERA
            </span>
            . We craft premium, long-lasting, impression-based perfumes that bring luxury niche
            fragrances within reach.
          </p>
        </motion.div>

        {/* Minimal Editorial Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 pt-12 border-t border-brand-black/5 w-full max-w-2xl"
        >
          <div className="flex flex-col items-center">
            <span className="font-serif text-xl md:text-2xl text-brand-black mb-1">Niche Formulations</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-brand-muted">Extrait de Parfum</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-xl md:text-2xl text-brand-black mb-1">Long-Lasting</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-brand-muted">All-Day Projection</span>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col items-center">
            <span className="font-serif text-xl md:text-2xl text-brand-black mb-1">Affordable Luxury</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-brand-muted">Within Reach</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

