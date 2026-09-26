'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, CreditCard, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, cartTotal, placeOrder } = useStore();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
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
      <main className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-serif mb-6">Your bag is empty</h1>
        <Link href="/shop" className="text-xs uppercase tracking-widest font-bold text-brand-burgundy border-b border-brand-burgundy pb-1">
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
      <main className="min-h-screen bg-brand-cream flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white p-12 md:p-20 text-center shadow-2xl"
        >
          <div className="flex justify-center mb-8">
            <CheckCircle2 size={80} className="text-brand-burgundy" strokeWidth={1} />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-brand-black mb-6">Thank You.</h1>
          <p className="text-brand-charcoal/60 mb-12 italic leading-relaxed">
            Your order has been placed successfully. A confirmation email has been sent to {formData.email || 'your email'}. Our artisans are now preparing your signature fragrances.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/account" className="w-full sm:w-auto px-10 py-5 bg-brand-black text-white text-[10px] uppercase tracking-widest font-bold hover:bg-brand-burgundy transition-colors">
              View Order History
            </Link>
            <Link href="/" className="w-full sm:w-auto px-10 py-5 border border-brand-burgundy/10 text-brand-black text-[10px] uppercase tracking-widest font-bold hover:bg-brand-cream transition-colors">
              Return Home
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-cream pt-12 md:pt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Checkout Form */}
        <div className="py-12">
          <Link href="/cart" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-brand-charcoal/40 hover:text-brand-burgundy mb-12 transition-colors">
            <ArrowLeft size={14} />
            Back to Bag
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-serif text-brand-black mb-12">Checkout</h1>
          
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-brand-burgundy mb-8 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-burgundy text-white flex items-center justify-center text-[10px]">1</span>
                Contact Information
              </h2>
              <input 
                required
                type="email" 
                name="email"
                placeholder="Email Address" 
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white border border-brand-burgundy/10 p-5 text-sm focus:outline-none focus:border-brand-burgundy transition-colors"
              />
            </div>

            {/* Shipping Information */}
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-brand-burgundy mb-8 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-burgundy text-white flex items-center justify-center text-[10px]">2</span>
                Shipping Details
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input required type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} className="bg-white border border-brand-burgundy/10 p-5 text-sm focus:outline-none focus:border-brand-burgundy transition-colors" />
                <input required type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} className="bg-white border border-brand-burgundy/10 p-5 text-sm focus:outline-none focus:border-brand-burgundy transition-colors" />
              </div>
              <input required type="text" name="address" placeholder="Shipping Address" value={formData.address} onChange={handleInputChange} className="w-full bg-white border border-brand-burgundy/10 p-5 text-sm mb-4 focus:outline-none focus:border-brand-burgundy transition-colors" />
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className="bg-white border border-brand-burgundy/10 p-5 text-sm focus:outline-none focus:border-brand-burgundy transition-colors" />
                <input required type="text" name="zipCode" placeholder="ZIP / Postal Code" value={formData.zipCode} onChange={handleInputChange} className="bg-white border border-brand-burgundy/10 p-5 text-sm focus:outline-none focus:border-brand-burgundy transition-colors" />
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-brand-burgundy mb-8 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-burgundy text-white flex items-center justify-center text-[10px]">3</span>
                Payment Method
              </h2>
              <div className="bg-white border border-brand-burgundy p-6 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CreditCard className="text-brand-burgundy" />
                  <span className="text-sm font-bold uppercase tracking-widest">Credit or Debit Card</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-5 bg-gray-100 rounded" />
                  <div className="w-8 h-5 bg-gray-100 rounded" />
                </div>
              </div>
              <div className="space-y-4">
                <input required type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange} className="w-full bg-white border border-brand-burgundy/10 p-5 text-sm focus:outline-none focus:border-brand-burgundy transition-colors" />
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" name="expiry" placeholder="MM / YY" value={formData.expiry} onChange={handleInputChange} className="bg-white border border-brand-burgundy/10 p-5 text-sm focus:outline-none focus:border-brand-burgundy transition-colors" />
                  <input required type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleInputChange} className="bg-white border border-brand-burgundy/10 p-5 text-sm focus:outline-none focus:border-brand-burgundy transition-colors" />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-brand-burgundy text-white py-6 text-xs uppercase tracking-[0.4em] font-bold hover:bg-brand-black transition-all duration-500 shadow-xl">
              Place Signature Order
            </button>
            
            <div className="flex items-center justify-center gap-8 py-8 border-t border-brand-burgundy/10">
              <div className="flex items-center gap-2 text-[8px] uppercase tracking-widest font-bold text-brand-charcoal/40">
                <ShieldCheck size={14} />
                Secure Encryption
              </div>
              <div className="flex items-center gap-2 text-[8px] uppercase tracking-widest font-bold text-brand-charcoal/40">
                <Truck size={14} />
                White Glove Delivery
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white min-h-screen p-8 md:p-16 lg:sticky lg:top-0">
          <h2 className="text-2xl font-serif text-brand-black mb-12">Signature Bag</h2>
          <div className="space-y-8 mb-12 max-h-[50vh] overflow-y-auto pr-4 scrollbar-thin">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-6">
                <div className="relative w-20 h-24 bg-brand-cream overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-brand-black">{item.name}</h4>
                      <p className="text-[10px] text-brand-charcoal/40">Quantity: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-serif text-brand-burgundy">${item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6 pt-12 border-t border-brand-burgundy/5">
            <div className="flex justify-between text-sm">
              <span className="text-brand-charcoal/60">Subtotal</span>
              <span className="font-medium">${cartTotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-charcoal/60">Shipping & Delivery</span>
              <span className="text-brand-burgundy font-bold uppercase tracking-widest text-[10px]">Complimentary</span>
            </div>
            <div className="pt-6 border-t border-brand-burgundy flex justify-between">
              <span className="text-xl font-serif uppercase tracking-widest">Total</span>
              <span className="text-3xl font-serif text-brand-burgundy font-bold">${cartTotal}</span>
            </div>
          </div>
          
          <div className="mt-12 bg-brand-cream/50 p-6 italic text-[10px] leading-relaxed text-brand-charcoal/60">
            "We believe that luxury lies in the details. Your order will be packed by hand in our signature burgundy fluted boxes, lined with cream silk satin."
          </div>
        </div>

      </div>
    </main>
  );
}
