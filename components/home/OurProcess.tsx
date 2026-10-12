'use client';

import React from 'react';
import { motion } from 'motion/react';
import PremiumCard from '@/components/ui/PremiumCard';

interface Step {
  step: string;
  title: string;
  description: string;
  detail: string;
}

const STEPS: Step[] = [
  {
    step: '01',
    title: 'Sourcing',
    description: 'Procuring ethical, grade-A pure fragrance extracts from leading European aromachemical ateliers.',
    detail: 'Rare Florals & Resins',
  },
  {
    step: '02',
    title: 'Formulation',
    description: 'Masterfully blending harmonious accords, balancing top, heart, and base notes for optimal sillage.',
    detail: 'Precision Olfactory Math',
  },
  {
    step: '03',
    title: 'Maceration',
    description: 'Allowing the concentrated elixir to mature in controlled dark environments for 6 to 8 weeks.',
    detail: 'Deep Harmonization',
  },
  {
    step: '04',
    title: 'Testing',
    description: 'Evaluating stability, evaporation curves, and humidity persistence tailored to climate resilience.',
    detail: 'Climate Verification',
  },
  {
    step: '05',
    title: 'Bottling',
    description: 'Hand-inspected, precision-crimped atomizers, and packaged in artisanal minimalist flacons.',
    detail: 'Extrait de Parfum',
  },
];

export default function OurProcess() {
  return (
    <section className="relative w-full bg-brand-white py-28 md:py-36 px-6 border-t border-brand-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.3em] text-brand-muted mb-3 inline-block"
          >
            The Atelier Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-black tracking-tight"
          >
            From Nature to Nostalgia
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-xs sm:text-sm text-brand-muted tracking-wide max-w-lg mx-auto"
          >
            A journey of craftsmanship, where every detail creates a lasting impression.
          </motion.p>
        </div>

        {/* Process Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {STEPS.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="relative h-full"
            >
              <PremiumCard
                elevation="sm"
                hoverLift={true}
                className="h-full p-7 flex flex-col justify-between group"
              >
                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-2xl text-brand-black/30 group-hover:text-brand-green transition-colors">
                      {item.step}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-brand-muted group-hover:text-brand-green transition-colors font-medium">
                      Phase
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-brand-black mb-2 group-hover:text-brand-black transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-brand-green font-medium block mb-3">
                    {item.detail}
                  </span>
                  <p className="text-xs text-brand-muted leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Subtle Progress Bar bottom accent */}
                <div className="w-full bg-brand-black/5 h-[2px] mt-8 overflow-hidden rounded-full">
                  <div
                    className="h-full bg-brand-green transition-all duration-500 ease-out"
                    style={{ width: `${(idx + 1) * 20}%` }}
                  />
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

