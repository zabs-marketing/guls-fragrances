'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

const FEATURES = [
  {
    number: '01',
    title: '40%+ Concentration',
    description: 'Inspired luxury. Richer notes, longer presence and a lasting impression.',
  },
  {
    number: '02',
    title: '10+ Hours Longevity',
    description: 'Engineered to stay from early morning meetings to late midnight moments.',
  },
  {
    number: '03',
    title: 'Premium Imported Oils',
    description: 'Sourced internationally with pure accords for a sophisticated fragrance profile.',
  },
  {
    number: '04',
    title: 'Pakistani Climate Ready',
    description: 'Specially formulated to withstand extreme heat, humidity and changing seasons.',
  },
  {
    number: '05',
    title: 'Affordable Luxury',
    description: 'Delivering uncompromised niche quality at a price point within reach.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative w-full min-h-[1100px] sm:min-h-[900px] md:min-h-0 md:aspect-[1920/800] flex items-center justify-center overflow-hidden bg-brand-green-dark" id="why-choose-us">
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <Image
          src="/images/why-choose-us-bg.png"
          alt="Why Choose Us Velvet Background"
          fill
          /* object-contain aur w-full, h-full ko use kar ke ensure kiya hai ke corner flowers hamesha visible rahein */
          className="object-cover md:object-contain object-center w-full h-full"
          sizes="100vw"
        />
        {/* Subtle overlay to ensure text contrast across all devices */}
        <div className="absolute inset-0 bg-brand-green-dark/40 md:bg-brand-green-dark/20 z-10" />
      </div>

      <div className="relative z-20 max-w-[1400px] mx-auto px-6 w-full flex flex-col items-center text-center">
        
        {/* Headers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 flex flex-col items-center"
        >
          <p className="font-sans text-[16px] md:text-[11px] tracking-[0.25em] text-brand-gold uppercase font-bold mb-4">
            Why Choose Us
          </p>
          <h2 className="font-serif text-[32px] md:text-[44px] lg:text-[50px] font-bold text-brand-gold uppercase tracking-wide leading-tight mb-4 drop-shadow-md">
            Luxury That Make Sense
          </h2>
          <p className="font-sans text-[11px] md:text-[12px] tracking-[0.2em] text-brand-offwhite uppercase">
            Quality & Integrity
          </p>
        </motion.div>

        {/* 5-Column Grid for Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 w-full mb-6">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-brand-green backdrop-blur-md border border-brand-gold/20 p-8 flex flex-col items-center text-center hover:bg-brand-green-dark/80 transition-colors duration-300"
            >
              <span className="font-serif text-[24px] md:text-[28px] text-brand-gold mb-4">
                {feature.number}
              </span>
              <h3 className="font-serif text-[15px] md:text-[17px] text-brand-offwhite tracking-wide mb-3">
                {feature.title}
              </h3>
              <p className="font-sans text-[12px] md:text-[13px] text-brand-offwhite/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer Quote Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="w-full bg-brand-green backdrop-blur-md border border-brand-gold/20 p-6 md:p-8 flex items-center justify-center"
        >
          <p className="font-serif italic text-[20px] md:text-[26px] text-brand-gold tracking-wide drop-shadow-sm">
            &quot;More than a fragrance, it&apos;s a feeling.&quot;
          </p>
        </motion.div>

      </div>
    </section>
  );
}