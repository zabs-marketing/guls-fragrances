'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/context/StoreContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();

  return (
    <main className="min-h-screen bg-brand-green-dark text-white">
      <Navbar />

      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-12 tracking-tight">
              Shopping <span className="italic text-brand-gold">Bag</span>
            </h1>

            {cart.length > 0 ? (
              <div className="flex flex-col lg:flex-row gap-14">
                {/* Cart Items */}
                <div className="w-full lg:w-2/3">
                  <div className="border-t border-white/10">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex py-8 border-b border-white/10 group"
                      >
                        <div className="relative w-24 h-32 md:w-28 md:h-36 bg-brand-green-rich overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 96px, 112px"
                          />
                        </div>
                        <div className="ml-6 flex-1 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-serif text-white mb-1">{item.name}</h3>
                              <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-4">50ml Eau De Parfum</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-white/40 hover:text-brand-gold transition-colors"
                            >
                              <X size={20} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-white/15 px-3 py-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:text-brand-gold transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="mx-4 text-sm font-medium w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:text-brand-gold transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <span className="text-lg font-serif text-brand-gold">
                              ${item.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-1/3">
                  <div className="bg-brand-green-rich border border-white/10 p-8 md:p-10 sticky top-28">
                    <h2 className="text-2xl font-serif text-white mb-8">Order Summary</h2>
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Subtotal</span>
                        <span className="font-medium">${cartTotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Shipping</span>
                        <span className="text-brand-gold font-bold uppercase tracking-widest text-[10px]">Complimentary</span>
                      </div>
                      <div className="pt-4 border-t border-white/10 flex justify-between">
                        <span className="text-lg font-serif">Total</span>
                        <span className="text-2xl font-serif text-brand-gold font-bold">${cartTotal}</span>
                      </div>
                    </div>

                    <Link href="/checkout">
                      <button className="w-full bg-brand-gold text-brand-green-dark py-5 text-xs uppercase tracking-widest font-bold hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 group">
                        Proceed to Checkout
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </Link>

                    <p className="mt-6 text-[10px] text-center text-white/40 uppercase tracking-widest font-bold leading-relaxed">
                      Complimentary luxury packaging included with every signature order.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-32 text-center max-w-lg mx-auto">
                <div className="mb-8 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold/40">
                    <ShoppingBag size={48} />
                  </div>
                </div>
                <h2 className="text-3xl font-serif text-white mb-4">Your bag is empty</h2>
                <p className="text-white/60 mb-12">Explore our exquisite collection and find the fragrance that speaks to your soul.</p>
                <Link
                  href="/fragrance"
                  className="inline-block px-12 py-5 bg-brand-gold text-brand-green-dark text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
