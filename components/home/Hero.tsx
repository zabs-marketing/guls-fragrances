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
          className="object-cover object-[75%_center] md:object-center"
          sizes="100vw"
        />
        {/* Gradient Overlay for Mobile Readability */}
        <div className="absolute inset-0 bg-brand-green-dark/60 md:bg-brand-green-dark/20 z-10 md:hidden" />
      </div>

      {/* Main Layout Container */}
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-14 relative z-20 flex justify-center md:justify-start mt-10 md:mt-0">
        
        {/* Content Block: Internally Centered across all devices */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-[620px]"
        >
          {/* Top Brand Icon */}
          <div className="mb-6 flex flex-col items-center">
            <Image
              src="/images/brand-logo-icon.png"
              alt="Brand Icon"
              width={75}
              height={75}
              className="object-contain mb-6 drop-shadow-md"
            />
            {/* Top Subheading */}
            <span className="font-sans text-[11px] md:text-[13px] tracking-[0.3em] text-[#C9A66B] uppercase font-medium">
              Decades of Scents &bull; A Signature of You
            </span>
          </div>

          {/* Main H1 Heading */}
          <h1 className="font-serif font-bold text-[50px] md:text-[72px] leading-[1.1] tracking-[0.02em] text-gradient-gold uppercase mb-5 drop-shadow-lg">
            WEAR YOUR ERA
          </h1>

          {/* New Italic Tagline */}
          <h2 className="font-serif italic text-[20px] md:text-[24px] text-[#C9A66B] mb-6 font-medium tracking-wide drop-shadow-sm">
            &quot;Gul&apos;s Collection Luxury Fragrances Within Reach&quot;
          </h2>

          {/* Updated Paragraph */}
          <p className="font-sans font-light text-[15px] md:text-[17px] leading-[1.7] tracking-[0.02em] text-[#F3E9D7]/90 mb-8 drop-shadow-sm">
            Premium fragrances crafted for identity. Made to last. Bringing luxury niche impressions, timeless memories, and captivating sillage straight to you.
          </p>

          {/* Edition Info Box */}
          <div className="border border-[#C9A66B]/60 px-6 py-3 mb-8 backdrop-blur-sm bg-[#183629]/30">
            <span className="font-sans text-[10px] md:text-[12px] tracking-[0.25em] text-[#C9A66B] uppercase font-medium">
              Edition One To Four &bull; 50 ML Eau De Parfum
            </span>
          </div>

          {/* Updated CTA Button */}
          <div className="mt-2 w-full md:w-auto flex justify-center">
            <Button href="#collections" className="w-full md:w-auto text-[13px] tracking-[0.15em] px-8 py-4">
              DISCOVER THE COLLECTION
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}