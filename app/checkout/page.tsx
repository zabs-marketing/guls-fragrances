'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, CreditCard, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import type { OrderFormData } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function CheckoutPage() {
  const { cart, cartTotal, placeOrder } = useStore();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<OrderFormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  if (cart.length === 0 && !isSuccess) {
    return (
      <main className="min-h-screen bg-brand-green-dark text-white flex flex-col items-center justify-center p-6 text-center">
        <Navbar />
        <h1 className="text-3xl font-serif mb-6">Your bag is empty</h1>
        <Link
          href="/fragrance"
          className="text-xs uppercase tracking-widest font-bold text-brand-gold border-b border-brand-gold pb-1"
        >
          Back to Collection
        </Link>
      </main>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder(formData);
    setIsSuccess(true);
    window.scrollTo(0, 0);
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-brand-green-dark text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-brand-green-rich border border-brand-gold/20 p-12 md:p-20 text-center"
        >
          <div className="flex justify-center mb-8">
            <CheckCircle2 size={72} className="text-brand-gold" strokeWidth={1} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Thank You.</h1>
          <p className="text-white/60 mb-12 italic leading-relaxed">
            Your order has been placed successfully. A confirmation will be sent to{' '}
            <span className="text-brand-gold">{formData.email || 'your email'}</span>. Our artisans are now preparing your signature fragrances.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/account"
              className="w-full sm:w-auto px-10 py-4 bg-brand-gold text-brand-green-dark text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-colors"
            >
              View Order History
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-10 py-4 border border-white/20 text-white text-[10px] uppercase tracking-widest font-bold hover:border-brand-gold hover:text-brand-gold transition-colors"
            >
              Return Home
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  const inputClass =
    'w-full bg-brand-green-rich border border-white/15 p-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-brand-gold/50 transition-colors';

  return (
    <main className="min-h-screen bg-brand-green-dark text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-14">

        {/* Checkout Form */}
        <div>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-brand-gold mb-10 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Bag
          </Link>

          <h1 className="text-4xl md:text-5xl font-serif text-white mb-10">Checkout</h1>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Contact */}
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold mb-6 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-gold text-brand-green-dark flex items-center justify-center text-[10px] font-bold">1</span>
                Contact Information
              </h2>
              <input
                required
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>

            {/* Shipping */}
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold mb-6 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-gold text-brand-green-dark flex items-center justify-center text-[10px] font-bold">2</span>
                Shipping Details
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input required type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} className={inputClass} />
                <input required type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} className={inputClass} />
              </div>
              <input required type="text" name="address" placeholder="Shipping Address" value={formData.address} onChange={handleInputChange} className={`${inputClass} mb-4`} />
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className={inputClass} />
                <input required type="text" name="zipCode" placeholder="ZIP / Postal Code" value={formData.zipCode} onChange={handleInputChange} className={inputClass} />
              </div>
            </div>

            {/* Payment */}
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold mb-6 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-gold text-brand-green-dark flex items-center justify-center text-[10px] font-bold">3</span>
                Payment Method
              </h2>
              <div className="bg-brand-green-rich border border-brand-gold/30 p-5 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CreditCard className="text-brand-gold" size={20} />
                  <span className="text-sm font-bold uppercase tracking-widest">Credit or Debit Card</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-5 bg-white/10 rounded" />
                  <div className="w-8 h-5 bg-white/10 rounded" />
                </div>
              </div>
              <div className="space-y-4">
                <input required type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange} className={inputClass} />
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" name="expiry" placeholder="MM / YY" value={formData.expiry} onChange={handleInputChange} className={inputClass} />
                  <input required type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleInputChange} className={inputClass} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-gold text-brand-green-dark py-5 text-xs uppercase tracking-[0.4em] font-bold hover:bg-white transition-all duration-500"
            >
              Place Signature Order
            </button>

            <div className="flex items-center justify-center gap-8 py-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-[8px] uppercase tracking-widest font-bold text-white/40">
                <ShieldCheck size={14} />
                Secure Encryption
              </div>
              <div className="flex items-center gap-2 text-[8px] uppercase tracking-widest font-bold text-white/40">
                <Truck size={14} />
                White Glove Delivery
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-brand-green-rich border border-white/10 p-8 md:p-12 lg:sticky lg:top-28 self-start">
          <h2 className="text-2xl font-serif text-white mb-10">Signature Bag</h2>
          <div className="space-y-6 mb-10 max-h-[45vh] overflow-y-auto pr-2 hide-scrollbar">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-5">
                <div className="relative w-20 h-24 bg-brand-green-dark overflow-hidden flex-shrink-0 border border-white/10">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-white">{item.name}</h4>
                      <p className="text-[10px] text-white/40 mt-1">Quantity: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-serif text-brand-gold">${item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-5 pt-8 border-t border-white/10">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Subtotal</span>
              <span className="font-medium">${cartTotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Shipping & Delivery</span>
              <span className="text-brand-gold font-bold uppercase tracking-widest text-[10px]">Complimentary</span>
            </div>
            <div className="pt-5 border-t border-white/10 flex justify-between">
              <span className="text-xl font-serif uppercase tracking-widest">Total</span>
              <span className="text-2xl font-serif text-brand-gold font-bold">${cartTotal}</span>
            </div>
          </div>

          <div className="mt-10 bg-brand-gold/10 border border-brand-gold/20 p-5 italic text-[10px] leading-relaxed text-white/60">
            &ldquo;We believe that luxury lies in the details. Your order will be packed by hand in our signature boxes, lined with cream silk satin.&rdquo;
          </div>
        </div>

      </div>
    </main>
  );
}
