'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function BrandStory() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/placeholder-image.jpg"
        alt="The Soul of Gul's"
        fill
        className="object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-brand-burgundy/40" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <span className="text-white/80 uppercase tracking-[0.5em] text-xs mb-8 block font-light">The Sensory Journey</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif mb-12 leading-[1.1]">
            WEAR YOUR <br />
            <span className="italic">SIGNATURE.</span>
          </h2>
          <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto italic">
            &quot;A fragrance is like a signature, so that even after a woman leaves the room, her perfume should reveal she&apos;s been there.&quot;
          </p>
          <button className="px-12 py-5 border border-white text-white uppercase tracking-widest text-[10px] font-semibold hover:bg-white hover:text-brand-burgundy transition-all duration-500">
            Read Our Journal
          </button>
        </motion.div>
      </div>
    </section>
  );
}
