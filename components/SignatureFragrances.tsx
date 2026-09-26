'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { products } from '@/lib/data';
import { useRef } from 'react';

export default function SignatureFragrances() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="collections" className="py-24 md:py-40 bg-[#121212] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-brand-gold/60 uppercase tracking-[0.4em] text-xs mb-4 block">The Elite Range</span>
          <h2 className="text-4xl md:text-5xl font-serif">Signature Fragrances</h2>
        </motion.div>
        <p className="max-w-md text-white/50 text-sm leading-relaxed">
          Our most coveted creations, housed in masterfully crafted flacons and designed to evoke profound emotional landscapes.
        </p>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto pb-12 hide-scrollbar px-6 md:px-[calc((100vw-1280px)/2+24px)] gap-8 md:gap-12 cursor-grab active:cursor-grabbing"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="flex-shrink-0 w-[280px] md:w-[400px] group"
          >
            <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-white/5">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
            </div>
            <h3 className="text-2xl font-serif mb-2 tracking-tight group-hover:text-brand-gold transition-colors">{product.name}</h3>
            <p className="text-brand-gold uppercase tracking-[0.2em] text-[10px] font-medium mb-4">{product.category}</p>
            <div className="w-0 group-hover:w-full h-px bg-brand-gold transition-all duration-700" />
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
