'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PremiumCard from '@/components/ui/PremiumCard';
import { Sparkles, Clock, Compass, Heart } from 'lucide-react';

const VALUES = [
  {
    icon: Sparkles,
    letter: 'Q',
    title: 'Quality First',
    subtitle: 'Finest Ingredients',
    description: 'Only the finest ingredients. Always. Pure, premium imported oils formulated for authentic olfactory depth and high-end niche appeal.',
  },
  {
    icon: Clock,
    letter: 'L',
    title: 'Longevity Guaranteed',
    subtitle: '40%+ Concentration',
    description: 'Scents that stay with you. Formulated with high-strength Extrait de Parfum to ensure an unbroken 10+ hour sillage from morning to midnight.',
  },
  {
    icon: Compass,
    letter: 'E',
    title: 'Era Defined',
    subtitle: 'Nostalgic Time Capsule',
    description: 'More than a scent—it’s a time capsule. Distinct olfactory realms crafted to embody distinct moods, characters, and defining generations.',
  },
  {
    icon: Heart,
    letter: 'C',
    title: 'Customer Obsessed',
    subtitle: 'Crafted for Distinction',
    description: 'Your experience matters most. From climate-tested formulations to luxurious packaging, every detail is engineered for pure satisfaction.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-white text-brand-black selection:bg-brand-green/10 selection:text-brand-green">
      <Navbar />

      {/* ─── Section 1: Hero Philosophy ───────────────────────────────────── */}
      <section className="relative w-full pt-36 md:pt-44 pb-20 md:pb-28 px-6 bg-brand-white border-b border-brand-black/5 overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-green/[0.025] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.35em] text-brand-muted mb-6 inline-block"
          >
            The House Philosophy
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-brand-black tracking-tight mb-6"
          >
            WEAR YOUR <span className="italic text-brand-green font-light">ERA.</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-12 h-[1px] bg-brand-green/40 mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-serif text-lg sm:text-xl md:text-2xl text-brand-charcoal font-light max-w-2xl leading-relaxed italic"
          >
            &ldquo;You don’t just wear a perfume. You wear a memory, a mood, a decade.&rdquo;
          </motion.p>
        </div>
      </section>

      {/* ─── Section 2: Our Story (Text & Visual Block) ──────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-brand-light border-b border-brand-black/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Story Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 pr-0 lg:pr-6"
          >
            <span className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.3em] text-brand-green font-semibold mb-3 inline-block">
              01 &bull; The Genesis
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-black tracking-tight mb-8 leading-[1.18]">
              Gul&apos;s Collection is not just a fragrance house &mdash;{' '}
              <span className="italic font-light">it&apos;s a time capsule.</span>
            </h2>

            <div className="space-y-6 text-sm sm:text-base text-brand-charcoal/80 font-sans leading-relaxed">
              <p>
                Born from the idea that every decade has a scent, and every person has an era, Decades by Gul&apos;s was created to let you wear your era.
              </p>
              <p>
                We craft premium, long-lasting, impression-based perfumes that bring luxury niche fragrances within reach. From bold masculine to soft feminine, from modern unisex to deep oriental arabesques &mdash; our scents are designed to become your identity.
              </p>
              <p className="text-xs text-brand-muted tracking-wide pt-2">
                Hand-formulated with Grade-A imported essences, cold-macerated for optimal harmony, and calibrated for heat resilience in the Pakistani climate.
              </p>
            </div>
          </motion.div>

          {/* Visual Flacon Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <PremiumCard
              elevation="elevated"
              hoverLift={false}
              className="relative aspect-[4/5] w-full overflow-hidden p-0"
            >
              <Image
                src="/images/brand-bags.jpeg"
                alt="Gul's Fragrances Heritage & Flacon packaging"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white font-sans">
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/80 block mb-1">
                  Artisanal Presentation
                </span>
                <p className="font-serif text-lg">Every bottle is an uncompromised work of art.</p>
              </div>
            </PremiumCard>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 3: Vision & Mission (2-Column Grid) ────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-brand-white border-b border-brand-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <span className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.3em] text-brand-muted mb-3 inline-block">
              02 &bull; Purpose & Horizons
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-black tracking-tight">
              Vision & Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <PremiumCard
                elevation="elevated"
                hoverLift={true}
                className="h-full p-8 md:p-12 flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-brand-green font-semibold block mb-3 font-sans">
                    Our Vision
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-brand-black mb-4 group-hover:text-brand-green transition-colors">
                    Defining Generations Through Scent
                  </h3>
                  <div className="w-8 h-[1px] bg-brand-green/30 mb-6" />
                  <p className="text-sm sm:text-base text-brand-charcoal/80 font-sans leading-relaxed">
                    To become Pakistan&apos;s most loved homegrown perfume house, celebrated worldwide for redefining accessible luxury without compromising on quality, presence, or character.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-brand-black/5 text-[11px] uppercase tracking-widest text-brand-muted font-sans font-medium">
                  National Distinction &bull; Global Horizons
                </div>
              </PremiumCard>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <PremiumCard
                elevation="elevated"
                hoverLift={true}
                className="h-full p-8 md:p-12 flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-brand-green font-semibold block mb-3 font-sans">
                    Our Mission
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-brand-black mb-4 group-hover:text-brand-green transition-colors">
                    Luxury. Craftsmanship. Accessibility.
                  </h3>
                  <div className="w-8 h-[1px] bg-brand-green/30 mb-6" />
                  <p className="text-sm sm:text-base text-brand-charcoal/80 font-sans leading-relaxed">
                    To deliver high-quality, long-lasting fragrances at an accessible price. We eliminate excessive luxury markups, investing directly in superior ingredients, longer maceration, and unforgettable sillage.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-brand-black/5 text-[11px] uppercase tracking-widest text-brand-muted font-sans font-medium">
                  Accessible Luxury &bull; High Concentration
                </div>
              </PremiumCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Section 4: Our Core Values (4-Column Grid) ─────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-brand-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <span className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.3em] text-brand-muted mb-3 inline-block">
              03 &bull; Guiding Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-black tracking-tight">
              Our Core Values
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-brand-muted tracking-wide max-w-md mx-auto font-sans">
              The four foundational pillars embedded in every drop of perfume we formulate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="h-full"
                >
                  <PremiumCard
                    elevation="elevated"
                    hoverLift={true}
                    className="h-full p-8 flex flex-col justify-between group relative"
                  >
                    <div>
                      {/* Top Header with Icon and Watermark Letter */}
                      <div className="flex items-center justify-between mb-8">
                        <div className="w-10 h-10 rounded-xs bg-brand-offwhite flex items-center justify-center text-brand-black group-hover:bg-brand-green group-hover:text-brand-white transition-all duration-300">
                          <Icon size={18} strokeWidth={1.5} />
                        </div>
                        <span className="font-serif text-2xl text-brand-black/20 group-hover:text-brand-green transition-colors">
                          {val.letter}
                        </span>
                      </div>

                      <span className="text-[9px] uppercase tracking-[0.2em] text-brand-green font-semibold block mb-2 font-sans">
                        {val.subtitle}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-brand-black mb-3">
                        {val.title}
                      </h3>
                      <p className="text-xs text-brand-muted leading-relaxed font-sans">
                        {val.description}
                      </p>
                    </div>

                    <div className="w-6 h-[1.5px] bg-brand-black/10 group-hover:w-12 group-hover:bg-brand-green transition-all duration-300 mt-8" />
                  </PremiumCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}