'use client';

import React from 'react';
import { motion } from 'motion/react';

export default function OurMission() {
  return (
    <section className="relative w-full bg-brand-white py-24 md:py-36 px-6 border-t border-brand-black/5 overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Subtle Mission Pre-heading */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.3em] text-brand-muted mb-4 inline-block"
        >
          Our Core Purpose
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-black tracking-tight mb-4"
        >
          Our Mission
        </motion.h2>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xs sm:text-sm font-sans tracking-[0.25em] uppercase text-brand-green font-semibold mb-8"
        >
          Luxury. Craftsmanship. Accessibility.
        </motion.p>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="w-12 h-[1px] bg-brand-green/30 mb-8"
        />

        {/* Body Statement */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-xl sm:text-2xl md:text-3xl text-brand-charcoal leading-[1.65] font-light max-w-2xl tracking-tight"
        >
          &ldquo;To deliver high-quality, long-lasting, luxurious fragrances with
          authentic craftsmanship, at an accessible price.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}

