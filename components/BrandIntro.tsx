'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function BrandIntro() {
  return (
    <section className="py-24 md:py-40 px-6 bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-brand-burgundy/60 uppercase tracking-[0.4em] text-xs mb-6 block">The House of Gul's</span>
            <h2 className="text-4xl md:text-6xl font-serif text-brand-black mb-8 leading-tight">
              More Than Just <br />
              <span className="italic">a Fragrance.</span>
            </h2>
            <div className="space-y-6 text-brand-charcoal/80 leading-relaxed max-w-lg text-lg">
              <p>
                Fragrance is the most intense form of memory. At Gul's, we believe a scent is not just an accessory, but an extension of your identity, a silent story told to those around you.
              </p>
              <p>
                Each bottle is a testament to the art of niche perfumery, combining traditional craftsmanship with modern sophistication to create olfactive experiences that linger long after you leave the room.
              </p>
            </div>
          </motion.div>
        </div>
        
        <div className="w-full lg:w-1/2 relative h-[500px] md:h-[700px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="h-full w-full relative"
          >
            <Image
              src="/images/WhatsApp Image 2026-09-26 at 3.25.59 PM.jpeg"
              alt="Gul's Craftsmanship"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border-[1px] border-brand-burgundy/10 m-6" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -bottom-10 -left-10 bg-white p-12 hidden md:block border border-brand-burgundy/5"
          >
            <p className="text-brand-burgundy font-serif text-3xl italic tracking-tight">"The signature of elegance."</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
