'use client';

import React from 'react';
import { motion } from 'motion/react';
import PremiumCard from '@/components/ui/PremiumCard';
import { Sparkles, Clock, Globe2, SunMedium, Gem } from 'lucide-react';

interface FeatureItem {
  number: string;
  title: string;
  highlight: string;
  description: string;
  icon: React.ElementType;
}

const FEATURES: FeatureItem[] = [
  {
    number: '01',
    title: '40%+ Concentration',
    highlight: 'Inspired Luxury',
    description: 'Richer notes. Longer presence. Extrait de Parfum strength formulated for elevated distinction.',
    icon: Sparkles,
  },
  {
    number: '02',
    title: '10+ Hours',
    highlight: 'Long Lasting',
    description: 'From morning meetings to midnight moments. Unbroken performance that evolves with your skin.',
    icon: Clock,
  },
  {
    number: '03',
    title: 'Premium Imported Oils',
    highlight: 'World-class ingredients',
    description: 'Directly sourced from premier European and French fragrance houses for authentic depth.',
    icon: Globe2,
  },
  {
    number: '04',
    title: 'Designed for Pakistani Climate',
    highlight: 'Heat & Humidity Tested',
    description: 'Stays with you through heat and humidity without breaking down or losing its complex top notes.',
    icon: SunMedium,
  },
  {
    number: '05',
    title: 'Affordable Luxury',
    highlight: 'High-end Quality',
    description: 'High-end niche quality within your reach, eliminating inflated retail markups.',
    icon: Gem,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative w-full bg-brand-light py-28 md:py-36 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.3em] text-brand-muted mb-3 inline-block"
          >
            The Gul&apos;s Standard
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-black tracking-tight"
          >
            Luxury that makes sense.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-xs sm:text-sm text-brand-muted tracking-wide max-w-md mx-auto"
          >
            Every bottle is an uncompromised commitment to longevity, pure ingredients, and climate endurance.
          </motion.p>
        </div>

        {/* Feature Grid with PremiumCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            // 5th item can stretch elegantly on 3-col desktop
            const isLastOnDesktop = idx === 4;

            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={isLastOnDesktop ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                <PremiumCard
                  elevation="elevated"
                  hoverLift={true}
                  className="h-full p-8 md:p-9 flex flex-col justify-between group relative"
                >
                  {/* Subtle Background Watermark Number */}
                  <span className="absolute top-4 right-6 font-serif text-5xl md:text-6xl text-brand-black/[0.04] select-none pointer-events-none group-hover:text-brand-green/[0.08] transition-colors">
                    {item.number}
                  </span>

                  <div>
                    {/* Top Row: Icon + Number Pill */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-10 h-10 rounded-sm bg-brand-offwhite flex items-center justify-center text-brand-black group-hover:bg-brand-green group-hover:text-brand-white transition-all duration-300">
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                      <span className="text-[11px] font-sans tracking-widest text-brand-muted group-hover:text-brand-green transition-colors font-medium">
                        {item.number}
                      </span>
                    </div>

                    {/* Content */}
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-brand-green font-semibold block mb-2">
                      {item.highlight}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-brand-black mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* Subtle Bottom Accent Indicator */}
                  <div className="w-6 h-[1.5px] bg-brand-black/10 group-hover:w-12 group-hover:bg-brand-green transition-all duration-300 mt-8" />
                </PremiumCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

