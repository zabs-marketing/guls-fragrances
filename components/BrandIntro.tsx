'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function BrandIntro() {
  return (
    <section className="py-24 md:py-40 px-6 bg-brand-green-rich overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-brand-gold/60 uppercase tracking-[0.4em] text-xs mb-6 block">The House of Gul&apos;s</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
              More Than Just <br />
              <span className="italic text-brand-gold">a Fragrance.</span>
            </h2>
            <div className="space-y-6 text-white/70 leading-relaxed max-w-lg text-base">
              <p>
                Fragrance is the most intense form of memory. At Gul&apos;s, we believe a scent is not just an accessory, but an extension of your identity, a silent story told to those around you.
              </p>
              <p>
                Each bottle is a testament to the art of niche perfumery, combining traditional craftsmanship with modern sophistication to create olfactive experiences that linger long after you leave the room.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="h-full w-full relative"
          >
            <Image
              src="/images/placeholder-image.jpg"
              alt="Gul's Craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 border border-brand-gold/20 m-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -bottom-10 -left-10 bg-brand-green-dark p-10 hidden md:block border border-brand-gold/20"
          >
            <p className="text-brand-gold font-serif text-2xl italic tracking-tight">&ldquo;The signature of elegance.&rdquo;</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
