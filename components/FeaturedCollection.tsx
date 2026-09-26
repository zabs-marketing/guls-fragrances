'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { products } from '@/lib/data';
import { ShoppingBag } from 'lucide-react';

export default function FeaturedCollection() {
  // Show a few key items in an editorial layout
  const featured = products.slice(0, 3);

  return (
    <section id="shop" className="py-24 md:py-40 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-burgundy/60 uppercase tracking-[0.4em] text-xs mb-4 block">Curated Selection</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-black">Featured Collection</h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-brand-black border-b border-brand-burgundy pb-2 hover:text-brand-burgundy transition-colors"
          >
            View All Products
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
          {featured.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-8 bg-brand-cream">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-burgundy/0 group-hover:bg-brand-burgundy/10 transition-colors duration-500" />
                
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-8 right-8 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                >
                  <ShoppingBag size={20} className="text-brand-burgundy" />
                </motion.button>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-serif text-brand-black mb-2">{product.name}</h3>
                  <p className="text-sm text-brand-charcoal/60 italic mb-4">{product.description}</p>
                  <p className="text-brand-burgundy font-medium tracking-widest">{product.price}</p>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-brand-charcoal/40 border border-brand-charcoal/10 px-2 py-1">
                  {product.category}
                </span>
              </div>
              
              <button className="mt-6 w-full py-4 border border-brand-burgundy/10 text-[10px] uppercase tracking-[0.3em] text-brand-black hover:bg-brand-burgundy hover:text-white transition-all duration-500">
                Quick View
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
