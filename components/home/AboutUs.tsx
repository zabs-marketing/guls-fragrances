'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

export default function AboutUs() {
  return (
   <section className="relative w-full min-h-[750px] md:min-h-0 md:aspect-[1920/800] flex items-center overflow-hidden bg-brand-offwhite" id="about">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about-bg.png"
          alt="About Gul's Collection"
          fill
          /* Mobile par focus left (curtain) par rakhega, desktop par perfectly fit ho jayega */
          className="object-cover object-[15%_center] md:object-center" 
          sizes="100vw"
        />
      </div>

      {/* Content Container - Pushed to the right on desktop */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-14 relative z-10 flex justify-center md:justify-end">
        
        {/* Text Block */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[550px] lg:max-w-[600px] flex flex-col items-center text-center md:items-start md:text-left pt-32 md:pt-0"
        >
          {/* Heading */}
          <h2 className="font-serif text-3xl md:text-[40px] font-bold text-brand-gold tracking-[0.05em] uppercase mb-6 md:mb-8 drop-shadow-sm">
            About Us
          </h2>

          {/* First Paragraph */}
          <p className="font-sans text-[15px] md:text-[17px] leading-[1.8] md:leading-[2] text-brand-black mb-6 md:mb-8">
            Gul&apos;s Collection is not just a fragrance house it&apos;s a time
            capsule. Born from the idea that every decade has a scent, and
            every person has an era, <strong className="font-semibold">Decades by Gul&apos;s</strong> was created to let you
            <span className="italic uppercase font-semibold ml-1">WEAR YOUR ERA.</span>
          </p>

          {/* Blockquote with Gold Left Border */}
          <blockquote className="relative pl-5 py-1 mb-6 md:mb-8 border-l-[3px] border-brand-gold font-serif italic text-[18px] md:text-[20px] text-brand-black/90">
            &quot;You don&apos;t just wear a perfume. You wear a memory, a mood, a decade.&quot;
          </blockquote>

          {/* Final Paragraph */}
          <p className="font-sans text-[15px] md:text-[17px] leading-[1.8] md:leading-[2] text-brand-black">
            We craft premium, long lasting, impression based perfumes
            that bring luxury niche fragrances within reach. From bold
            masculine to soft feminine, from unisex modern to deep
            arabesque our scents are designed to become your identity.
          </p>
        </motion.div>
      </div>
    </section>
  );
}