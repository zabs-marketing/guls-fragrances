'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ShowcaseCategory {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  isActive?: boolean;
}

interface EditionsShowcaseProps {
  categories?: ShowcaseCategory[];
}

export default function EditionsShowcase({ categories: initialCategories }: EditionsShowcaseProps) {
  const [categories, setCategories] = useState<ShowcaseCategory[]>(initialCategories || []);
  const [loading, setLoading] = useState(!initialCategories || initialCategories.length === 0);

  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setCategories(initialCategories.filter((c) => c.isActive !== false));
      setLoading(false);
      return;
    }

    let isMounted = true;
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch((err) => console.error('Failed to load categories for showcase:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [initialCategories]);

  if (loading) {
    return (
      <section className="py-8 md:py-12 bg-brand-green-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null; // Gracefully hide if no active categories
  }

  return (
    <section className="py-6 md:py-12 bg-brand-green-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-brand-gold font-medium block mb-2">
            Signature Collections
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-white">
            Discover Our <span className="italic text-brand-gold">Editions</span>
          </h2>
        </div>

        {/* Categories Grid - Responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const bgImg = category.image || '/images/placeholder-image.jpg';
            const editionNumber = `EDITION ${['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT'][index] || index + 1}`;

            return (
              <Link key={category.id} href={`/fragrance?collection=${category.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative h-[340px] lg:h-[420px] w-full overflow-hidden rounded-sm cursor-pointer shadow-lg"
                >
                  {/* Background Image */}
                  <Image
                    src={bgImg}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/95 via-brand-green-dark/45 to-black/20 transition-opacity duration-500 group-hover:opacity-85" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                      <p className="text-brand-gold text-[9px] uppercase tracking-[0.25em] font-semibold mb-2">
                        {editionNumber}
                      </p>
                      <h3 className="font-serif text-xl lg:text-2xl text-white mb-3 leading-snug">
                        {category.name}
                      </h3>

                      {/* Action CTA */}
                      <div className={cn('flex items-center space-x-2 text-brand-gold pt-2')}>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Explore Collection</span>
                        <ArrowRight size={14} className="transform transition-transform duration-300 group-hover:translate-x-2" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}