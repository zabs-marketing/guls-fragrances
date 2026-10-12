'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import Button from '@/components/ui/Button';

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1920&auto=format&fit=crop',
    alt: 'Luxury Artisanal Flacon in ambient light',
  },
  {
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1920&auto=format&fit=crop',
    alt: 'Golden fragrance essence and botanicals',
  },
  {
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1920&auto=format&fit=crop',
    alt: 'Minimalist glass perfume bottle on marble',
  },
  {
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1920&auto=format&fit=crop',
    alt: 'Artisanal perfume oils and amber glass',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center px-6 py-32 md:py-40 overflow-hidden bg-brand-black">
      {/* Background Image Slider with Framer Motion Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[currentSlide].image}
              alt={SLIDES[currentSlide].alt}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Sophisticated Dark Gradient & Radial Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/60 backdrop-blur-[1px] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(10,61,36,0.18)_0%,_transparent_75%)] z-10" />
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto text-center relative z-20 flex flex-col items-center">
        {/* Sub-tag / Monogram Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[10px] md:text-[11px] font-sans tracking-[0.28em] uppercase text-white/90 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
          The Artisanal Fragrance House
        </motion.div>

        {/* Editorial Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.12] mb-6 max-w-3xl drop-shadow-sm"
        >
          Decades of scents. <br className="hidden sm:inline" />
          <span className="italic font-light text-white/95">A signature of you.</span>
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="font-sans text-sm sm:text-base md:text-lg text-white/80 max-w-xl mb-10 leading-relaxed tracking-wide"
        >
          <span className="font-semibold text-white tracking-[0.2em] uppercase text-xs sm:text-sm block mb-1">
            WEAR YOUR ERA.
          </span>
          Premium fragrances crafted for identity. Made to last.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            href="#collections"
            variant="accent"
            size="lg"
            className="tracking-[0.25em] text-[11px] px-9 py-4 font-semibold shadow-soft-lg"
          >
            Explore Collections
          </Button>
          <Button
            href="/fragrance"
            variant="secondary"
            size="lg"
            className="tracking-[0.25em] text-[11px] px-8 py-4 font-semibold border-white/30 text-white hover:text-white hover:bg-white/10 hover:border-white/60"
          >
            View All Fragrances
          </Button>
        </motion.div>

        {/* Minimal Slider Dot Indicators */}
        <div className="flex items-center gap-2 mt-14">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
                currentSlide === idx ? 'w-8 bg-brand-green' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
