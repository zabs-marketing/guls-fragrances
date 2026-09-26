'use client';

import { use } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/data';
import { ShoppingBag, Heart, Shield, RotateCcw, Truck, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useStore();
  
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-brand-charcoal/40 hover:text-brand-burgundy transition-colors mb-12"
          >
            <ArrowLeft size={14} />
            Back to Collection
          </Link>

          <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
            {/* Image Gallery */}
            <div className="w-full lg:w-3/5">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-[4/5] bg-brand-cream overflow-hidden"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-2/5 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-burgundy/60 font-bold mb-4 block">
                  {product.category}
                </span>
                <h1 className="text-5xl md:text-6xl font-serif text-brand-black mb-6 leading-tight tracking-tight">
                  {product.name}
                </h1>
                <p className="text-2xl font-serif text-brand-burgundy mb-8 tracking-widest">
                  {product.price}
                </p>
                
                <div className="space-y-6 mb-12">
                  <p className="text-brand-charcoal/80 leading-relaxed font-light text-lg">
                    {product.description}
                  </p>
                  <p className="text-sm text-brand-charcoal/60 leading-relaxed italic">
                    Inspired by the timeless landscapes and the silent whispers of memory, {product.name} is a masterfully balanced fragrance that evolves with your unique skin chemistry.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <button 
                    onClick={() => addToCart(product.id)}
                    className="flex-1 bg-brand-black text-white py-5 text-xs uppercase tracking-widest font-bold hover:bg-brand-burgundy transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <ShoppingBag size={18} />
                    Add to Bag
                  </button>
                  <button className="px-6 py-5 border border-brand-burgundy/10 text-brand-black hover:bg-brand-cream transition-colors">
                    <Heart size={18} />
                  </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-brand-burgundy/5">
                  <div className="flex flex-col items-center text-center">
                    <Truck size={20} className="text-brand-burgundy/40 mb-3" />
                    <span className="text-[9px] uppercase tracking-widest font-bold">Complimentary Shipping</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <RotateCcw size={20} className="text-brand-burgundy/40 mb-3" />
                    <span className="text-[9px] uppercase tracking-widest font-bold">30-Day Returns</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Shield size={20} className="text-brand-burgundy/40 mb-3" />
                    <span className="text-[9px] uppercase tracking-widest font-bold">Secure Checkout</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-20 bg-brand-cream px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif text-brand-black mb-12 text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.filter(p => p.id !== product.id).slice(0, 4).map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="group">
                <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-white">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="font-serif text-lg text-brand-black group-hover:text-brand-burgundy transition-colors">{p.name}</h3>
                <p className="text-xs text-brand-burgundy font-medium tracking-widest">{p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
