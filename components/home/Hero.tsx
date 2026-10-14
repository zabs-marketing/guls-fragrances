'use client';

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[100dvh] flex items-center pt-[91px] overflow-hidden bg-brand-green-dark">
      
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
        {/* Gradient Overlay: Darker on mobile, fading out towards the right on desktop */}
        {/* <div className="absolute inset-0 bg-brand-green-dark/60 md:bg-gradient-to-r md:from-brand-green-dark/90 md:via-brand-green-dark/50 md:to-transparent z-10" /> */}
      </div>

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-14 relative z-20 flex justify-center md:justify-start mt-10 md:mt-0">
        
        {/* Content Block: Positioned Left (md:justify-start), Internal Text Centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-[620px]"
        >
          {/* Top Brand Icon (Increased size, no extra CSS ring) */}
          <div className="mb-6 flex flex-col items-center">
            <Image
              src="/images/brand-logo-icon.png"
              alt="Brand Icon"
              width={75}
              height={75}
              className="object-contain mb-4 drop-shadow-md"
            />
            <span className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] text-brand-gold uppercase font-medium">
              Decades of Scents &bull; A Signature of You
            </span>
          </div>

          {/* Main H1 Heading */}
          <h1 className="font-serif font-bold text-[45px] md:text-[64px] leading-[1.1] md:leading-[70px] tracking-[3.2px] text-gradient-gold uppercase mb-6 drop-shadow-lg">
            WEAR YOUR ERA
          </h1>

          {/* Paragraph */}
          <p className="font-sans font-normal text-[16px] md:text-[22px] lg:text-[24px] leading-[1.6] md:leading-[32px] tracking-[0.01em] text-brand-offwhite/90 mb-10 drop-shadow-sm">
            Gul&apos;s Collection is not just a fragrance house it&apos;s a time capsule. Born from the idea that every decade has a scent, and every person has an era, Decades by Gul&apos;s was created to let you WEAR YOUR ERA.
          </p>

          {/* Global CTA Button */}
          <div className="mt-2">
            <Button href="#collections" className="w-full md:w-auto">
              Explore Collection
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}