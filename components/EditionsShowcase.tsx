'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { collections } from '@/lib/data';

// Derived from lib/data.ts — single source of truth
const editionCategories = collections.map((c) => ({
  id: c.id,
  title: c.title,
  edition: c.edition,
  description: c.subtitle,
  href: `/fragrance?collection=${c.id}`,
  // Ensure we use the actual image from collections if available
  bgImage: `url(${c.image || '/images/placeholder-image.jpg'})`, 
}));

export default function EditionsShowcase() {
  return (
    <section className="py-5 md:py-10 bg-brand-green-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        
        {/* Categories Grid - Now 4 columns on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {editionCategories.map((category, index) => (
            <Link key={category.id} href={category.href}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                // Slimmer, elegant height for the 4-column layout
                className="group relative h-[320px] lg:h-[400px] w-full overflow-hidden rounded-sm cursor-pointer"
              >
                {/* Background Image & Overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: category.bgImage, backgroundColor: '#0a1f11' }}
                />
                {/* Slightly darker gradient at the bottom to ensure text readability on narrow cards */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/95 via-brand-green-dark/40 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                {/* Content - Scaled down paddings and text sizes */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <p className="text-brand-gold text-[9px] uppercase tracking-[0.25em] font-semibold mb-2">
                      {category.edition}
                    </p>
                    <h3 className="font-serif text-xl lg:text-2xl text-white mb-2 leading-snug">
                      {category.title}
                    </h3>
                    <p className="text-white/70 italic text-xs mb-4 line-clamp-2">
                      {category.description}
                    </p>

                    {/* Action */}
                    <div className={cn('flex items-center space-x-2 text-brand-gold')}>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Explore</span>
                      <ArrowRight size={14} className="transform transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}