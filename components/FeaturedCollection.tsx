'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/data';
import { formatPrice } from '@/lib/data';
import { ShoppingBag } from 'lucide-react';

export default function FeaturedCollection() {
  const featured = products.slice(0, 3);

  return (
    <section id="shop" className="py-24 md:py-32 bg-brand-green-dark px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-gold/60 uppercase tracking-[0.4em] text-xs mb-4 block">Curated Selection</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Featured Collection</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/fragrance"
              className="text-xs uppercase tracking-[0.3em] text-white/70 border-b border-brand-gold/50 pb-2 hover:text-brand-gold transition-colors"
            >
              View All Products
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {featured.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <Link href={`/product/${product.id}`}>
                <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-brand-green-rich">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/10 transition-colors duration-500" />

                  <div className="absolute bottom-6 right-6 w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <ShoppingBag size={18} className="text-brand-green-dark" />
                  </div>
                </div>
              </Link>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-serif text-white mb-1 group-hover:text-brand-gold transition-colors">{product.name}</h3>
                  <p className="text-sm text-white/50 italic mb-3">{product.description}</p>
                  <p className="text-brand-gold font-medium tracking-widest">{formatPrice(product.price)}</p>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-white/40 border border-white/10 px-2 py-1 flex-shrink-0 ml-4">
                  {product.category}
                </span>
              </div>

              <Link
                href={`/product/${product.id}`}
                className="mt-5 w-full py-3.5 border border-white/15 text-[10px] uppercase tracking-[0.3em] text-white/70 hover:border-brand-gold hover:text-brand-gold transition-all duration-500 flex items-center justify-center"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
