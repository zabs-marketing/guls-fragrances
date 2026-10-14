'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

export default function OurMission() {
  return (
    <section className="relative w-full min-h-[700px] md:h-[800px] flex items-center overflow-hidden" id="mission-vision">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/mission-vision-bg.png"
          alt="Mission and Vision Background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Subtle dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/30 z-10" />
      </div>

      {/* Main Content Container: Side by side on Desktop, Stacked on Mobile */}
      <div className="relative z-20 w-full h-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-center">
        
        {/* --- Left Half: OUR VISION --- */}
        <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center text-center p-10 md:p-16 border-b md:border-b-0 md:border-r border-brand-gold/20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center max-w-[420px]"
          >
            {/* Vision Icon */}
            <div className="mb-6 relative w-10 h-10">
              <Image 
                src="/images/vision-icon.png" 
                alt="Vision Icon" 
                fill 
                className="object-contain" 
              />
            </div>

            {/* Heading */}
            <h2 className="font-serif text-[32px] md:text-[40px] font-bold text-brand-gold uppercase tracking-[0.1em] mb-4 drop-shadow-md">
              Our Vision
            </h2>

            {/* Subheading */}
            <p className="font-serif italic text-[18px] md:text-[22px] text-brand-offwhite mb-6 drop-shadow-sm">
              Defining Generations Through Scent.
            </p>

            {/* Paragraph */}
            <p className="font-sans text-[14px] md:text-[15px] leading-[1.8] text-brand-offwhite/85">
              To become Pakistan&apos;s most loved homegrown perfume house that
              defines generations through scent and creates an eternal sensory legacy
            </p>
          </motion.div>
        </div>

        {/* --- Right Half: OUR MISSION --- */}
        <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center text-center p-10 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center max-w-[420px]"
          >
            {/* Mission Icon */}
            <div className="mb-6 relative w-10 h-10">
              <Image 
                src="/images/mission-icon.png" 
                alt="Mission Icon" 
                fill 
                className="object-contain" 
              />
            </div>

            {/* Heading */}
            <h2 className="font-serif text-[32px] md:text-[40px] font-bold text-brand-gold uppercase tracking-[0.1em] mb-4 drop-shadow-md">
              Our Mission
            </h2>

            {/* Subheading */}
            <p className="font-serif italic text-[18px] md:text-[22px] text-brand-offwhite mb-6 drop-shadow-sm">
              Luxury. Craftsmanship. Accessibility.
            </p>

            {/* Paragraph */}
            <p className="font-sans text-[14px] md:text-[15px] leading-[1.8] text-brand-offwhite/85">
              To deliver high quality, long lasting, luxurious fragrances with
              authentic craftsmanship, made available at an accessible price point
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}