'use client';

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[100dvh] flex items-center pt-[10px] overflow-hidden bg-brand-green-dark">
      
      {/* Static Background Image from Figma */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Gul's Collection Hero Background"
          fill
          priority
          /* Mobile par bottle ko mazeed right shift karne ke liye object-[15%_center] use kiya hai */
          className="object-cover object-[15%_center] md:object-center"
          sizes="100vw"
        />
        {/* Stronger Gradient Overlay for Mobile Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#183629]/90 via-[#183629]/70 to-[#183629]/40 z-10 md:hidden" />
        <div className="absolute inset-0 bg-brand-green-dark/20 z-10 hidden md:block" />
      </div>

      {/* Main Layout Container */}
      <div className="max-w-[1400px] mx-auto w-full px-5 md:px-14 relative z-20 flex justify-center md:justify-start mt-12 md:mt-0">
        
        {/* Content Block: Internally Centered across all devices */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-[620px]"
        >
          {/* Top Brand Icon */}
          <div className="mb-4 md:mb-6 flex flex-col items-center">
            <Image
              src="/images/brand-logo-icon.png"
              alt="Brand Icon"
              width={65} // Slightly smaller on mobile
              height={65}
              className="object-contain mb-4 md:mb-6 drop-shadow-md md:w-[75px] md:h-[75px]"
            />
            {/* Top Subheading - Scaled for mobile */}
            <span className="font-sans text-[9px] md:text-[13px] tracking-[0.2em] md:tracking-[0.3em] text-[#C9A66B] uppercase font-medium">
              Decades of Scents &bull; A Signature of You
            </span>
          </div>

          {/* Main H1 Heading - Scaled for mobile */}
          <h1 className="font-serif font-bold text-[40px] sm:text-[50px] md:text-[72px] leading-[1.05] md:leading-[1.1] tracking-[0.02em] text-gradient-gold uppercase mb-3 md:mb-5 drop-shadow-lg">
            WEAR YOUR ERA
          </h1>

          {/* Italic Tagline - Scaled for mobile */}
          <h2 className="font-serif italic text-[16px] sm:text-[18px] md:text-[24px] text-[#C9A66B] mb-4 md:mb-6 font-medium tracking-wide drop-shadow-sm px-2">
            &quot;Gul&apos;s Collection Luxury Fragrances Within Reach&quot;
          </h2>

          {/* Paragraph - Scaled for mobile */}
          <p className="font-sans font-light text-[13px] sm:text-[14px] md:text-[17px] leading-[1.6] md:leading-[1.7] tracking-[0.02em] text-[#F3E9D7]/90 mb-6 md:mb-8 drop-shadow-sm px-2 md:px-0">
            Premium fragrances crafted for identity. Made to last. Bringing luxury niche impressions, timeless memories, and captivating sillage straight to you.
          </p>

          {/* Edition Info Box - Scaled padding and text for mobile */}
          <div className="border border-[#C9A66B]/60 px-4 py-2 md:px-6 md:py-3 mb-6 md:mb-8 backdrop-blur-sm bg-[#183629]/40">
            <span className="font-sans text-[9px] md:text-[12px] tracking-[0.2em] md:tracking-[0.25em] text-[#C9A66B] uppercase font-medium">
              Edition One To Four &bull; 50 ML Eau De Parfum
            </span>
          </div>

          {/* Updated CTA Button */}
          <div className="mt-2 w-full sm:w-auto flex justify-center">
            <Button href="#collections" className="w-full sm:w-auto text-[11px] md:text-[13px] tracking-[0.15em] px-6 py-3.5 md:px-8 md:py-4">
              DISCOVER THE COLLECTION
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}