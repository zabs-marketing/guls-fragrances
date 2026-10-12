'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';
import PremiumCard from '@/components/ui/PremiumCard';
import { useStore } from '@/context/StoreContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();

  return (
    <main className="min-h-screen bg-brand-white text-brand-black selection:bg-brand-green/10 selection:text-brand-green">
      <Navbar />

      <section className="pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.3em] text-brand-muted mb-2 inline-block">
              Your Selection
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-black tracking-tight">
              Shopping Bag
            </h1>
          </div>

          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Cart Items List */}
              <div className="lg:col-span-8">
                <div className="border-t border-brand-black/10 divide-y divide-brand-black/10">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                        transition={{ duration: 0.3 }}
                        className="py-7 flex gap-5 sm:gap-7 items-center group"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-20 sm:w-24 aspect-[4/5] bg-brand-offwhite rounded-xs overflow-hidden shrink-0 border border-brand-black/5">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            sizes="96px"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between h-full">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="font-serif text-lg sm:text-xl text-brand-black group-hover:text-brand-green transition-colors">
                                {item.name}
                              </h3>
                              <p className="text-[10px] uppercase tracking-widest text-brand-muted font-sans mt-0.5">
                                Extrait de Parfum &bull; 50ml
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              aria-label="Remove item"
                              className="text-brand-muted hover:text-brand-black transition-colors p-1 cursor-pointer"
                            >
                              <X size={17} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-6">
                            {/* Quantity Controls */}
                            <div className="inline-flex items-center border border-brand-black/15 rounded-xs px-2 py-1 bg-brand-white">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 text-brand-charcoal hover:text-brand-green transition-colors cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="mx-3 text-xs font-semibold font-sans w-5 text-center text-brand-black">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 text-brand-charcoal hover:text-brand-green transition-colors cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus size={13} />
                              </button>
                            </div>

                            {/* Price */}
                            <span className="font-sans font-semibold text-sm sm:text-base text-brand-black tracking-wide">
                              Rs. {(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="pt-6">
                  <Link
                    href="/fragrance"
                    className="inline-flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-green transition-colors font-sans"
                  >
                    <span>&larr; Discover more fragrances</span>
                  </Link>
                </div>
              </div>

              {/* Order Summary in PremiumCard */}
              <div className="lg:col-span-4 sticky top-28">
                <PremiumCard
                  elevation="elevated"
                  hoverLift={false}
                  className="p-8 sm:p-9"
                >
                  <h2 className="font-serif text-2xl text-brand-black mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-8 text-xs font-sans">
                    <div className="flex justify-between text-brand-charcoal">
                      <span>Subtotal</span>
                      <span className="font-semibold text-brand-black">
                        Rs. {cartTotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-brand-charcoal">
                      <span>Shipping & Packaging</span>
                      <span className="text-brand-green font-semibold uppercase tracking-wider text-[10px]">
                        Complimentary
                      </span>
                    </div>

                    <div className="pt-5 border-t border-brand-black/10 flex justify-between items-baseline">
                      <span className="font-serif text-base text-brand-black">Estimated Total</span>
                      <span className="font-sans text-2xl font-bold text-brand-black tracking-wide">
                        Rs. {cartTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    href="/checkout"
                    variant="primary"
                    size="lg"
                    fullWidth
                    rightIcon={<ArrowRight size={14} />}
                    className="text-[11px] tracking-[0.25em] py-4 shadow-soft-md"
                  >
                    Proceed to Checkout
                  </Button>

                  <div className="mt-6 pt-6 border-t border-brand-black/5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-brand-muted font-sans text-center">
                    <ShieldCheck size={14} className="text-brand-green" />
                    <span>Complimentary signature presentation box</span>
                  </div>
                </PremiumCard>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="py-28 text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-brand-offwhite border border-brand-black/5 flex items-center justify-center mx-auto mb-6 text-brand-muted">
                <ShoppingBag size={28} strokeWidth={1.5} />
              </div>
              <h2 className="font-serif text-3xl text-brand-black mb-3">Your Bag is Empty</h2>
              <p className="text-xs sm:text-sm text-brand-muted font-sans mb-10 leading-relaxed">
                Explore our artisanal repertoire and find a signature composition that speaks to your era.
              </p>
              <Button
                href="/fragrance"
                variant="primary"
                size="lg"
                className="tracking-[0.25em] text-[11px] px-9 py-4 font-semibold"
              >
                Explore Collection
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
