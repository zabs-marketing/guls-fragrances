'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Minus, Plus, ChevronDown, ArrowLeft } from 'lucide-react';
import { products, collections, formatPrice } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import { cn } from '@/lib/utils';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('notes');

  const productId = params?.id as string;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <main className="min-h-screen bg-brand-green-dark text-white flex flex-col items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="font-serif text-4xl text-brand-gold mb-4">Product Not Found</h1>
          <p className="text-white/60 mb-8">The fragrance you are looking for does not exist.</p>
          <Link
            href="/fragrance"
            className="px-8 py-3 border border-brand-gold text-brand-gold text-[10px] uppercase tracking-widest font-bold hover:bg-brand-gold hover:text-brand-green-dark transition-colors"
          >
            Back to Collection
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Get collection title for breadcrumbs
  const collection = collections.find((c) => c.id === product.category);
  const categoryTitle = collection ? collection.title : product.category;

  const handleAddToCart = () => {
    addToCart(product.id, quantity); // Pass quantity directly — no loop needed
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <main className="min-h-screen bg-brand-green-dark text-white selection:bg-brand-gold selection:text-brand-green-dark">
      <Navbar />

      <div className="pt-28 pb-20 px-6 md:px-14 max-w-7xl mx-auto">
        {/* Back Button & Breadcrumbs */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-white/60 hover:text-brand-gold transition-colors text-[10px] uppercase tracking-widest font-bold"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>

          <nav className="hidden md:flex items-center space-x-2 text-[10px] uppercase tracking-widest text-white/40">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <span>/</span>
            <Link href="/fragrance" className="hover:text-brand-gold transition-colors">Fragrance</Link>
            <span>/</span>
            <span className="text-brand-gold">{product.name}</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/5] w-full bg-brand-green-rich rounded-sm overflow-hidden">
              {product.isSpecialEdition && (
                <div className="absolute top-6 right-6 z-20 bg-brand-gold text-brand-green-dark text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-sm shadow-xl">
                  {product.specialEditionType} Special Edition
                </div>
              )}
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </motion.div>

          {/* Right: Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2 flex flex-col pt-4 md:pt-8"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-gold mb-3">
              {categoryTitle}
            </p>
            <h1 className="text-3xl md:text-5xl font-serif text-white mb-4">
              {product.name}
            </h1>
            <p className="text-lg md:text-xl font-serif text-white/90 mb-6">
              {formatPrice(product.price)}
            </p>

            <p className="text-sm text-white/70 italic leading-relaxed mb-10">
              &ldquo;{product.description}&rdquo;
            </p>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
              <div className="flex items-center justify-between border border-white/20 rounded-sm w-full sm:w-1/3 px-4 py-3 bg-white/5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-white/60 hover:text-brand-gold transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-white/60 hover:text-brand-gold transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 w-full flex items-center justify-center space-x-2 bg-brand-gold text-brand-green-dark py-4 text-[11px] uppercase tracking-widest font-bold hover:bg-white transition-colors rounded-sm"
              >
                <ShoppingBag size={16} />
                <span>Add to Cart — {formatPrice(product.price * quantity)}</span>
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-white/10">

              {/* Fragrance Notes */}
              <div className="border-b border-white/10">
                <button
                  onClick={() => toggleAccordion('notes')}
                  className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold group-hover:text-brand-gold transition-colors">
                    Fragrance Notes
                  </span>
                  <ChevronDown
                    size={16}
                    className={cn(
                      'text-white/40 transition-transform duration-300',
                      activeAccordion === 'notes' ? 'rotate-180 text-brand-gold' : ''
                    )}
                  />
                </button>
                <AnimatePresence>
                  {activeAccordion === 'notes' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 space-y-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-1">Top Notes</p>
                          <p className="text-sm text-white/70">{product.topNote}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-1">Heart Notes</p>
                          <p className="text-sm text-white/70">{product.heartNote}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-1">Base Notes</p>
                          <p className="text-sm text-white/70">{product.baseNote}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Ingredients */}
              <div className="border-b border-white/10">
                <button
                  onClick={() => toggleAccordion('ingredients')}
                  className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold group-hover:text-brand-gold transition-colors">
                    Ingredients
                  </span>
                  <ChevronDown
                    size={16}
                    className={cn(
                      'text-white/40 transition-transform duration-300',
                      activeAccordion === 'ingredients' ? 'rotate-180 text-brand-gold' : ''
                    )}
                  />
                </button>
                <AnimatePresence>
                  {activeAccordion === 'ingredients' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <p className="text-sm text-white/60 leading-relaxed">{product.ingredients}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shipping */}
              <div className="border-b border-white/10">
                <button
                  onClick={() => toggleAccordion('delivery')}
                  className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold group-hover:text-brand-gold transition-colors">
                    Shipping & Returns
                  </span>
                  <ChevronDown
                    size={16}
                    className={cn(
                      'text-white/40 transition-transform duration-300',
                      activeAccordion === 'delivery' ? 'rotate-180 text-brand-gold' : ''
                    )}
                  />
                </button>
                <AnimatePresence>
                  {activeAccordion === 'delivery' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <p className="text-sm text-white/60 leading-relaxed">
                          Same-day and next-day delivery available exclusively across Karachi. Due to the personal nature of fragrances, we currently do not accept returns once the packaging has been opened.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}