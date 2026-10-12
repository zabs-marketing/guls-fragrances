'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Truck, ArrowLeft, Lock } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import type { OrderFormData } from '@/context/StoreContext';
import Button from '@/components/ui/Button';
import PremiumCard from '@/components/ui/PremiumCard';

export default function CheckoutPage() {
  const { cart, cartTotal, placeOrder } = useStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [placedOrderNumber, setPlacedOrderNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState('');

  const [formData, setFormData] = useState<OrderFormData>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setOrderError('');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: `${formData.firstName} ${formData.lastName}`.trim(),
          customerEmail: formData.email,
          customerPhone: formData.phone || '+92 300 0000000',
          shippingAddress: `${formData.address}, ${formData.city} ${formData.zipCode}`.trim(),
          items: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to place order');

      setPlacedOrderNumber(data.orderNumber);
      placeOrder(formData);
      setIsSuccess(true);
      window.scrollTo(0, 0);
    } catch (err: any) {
      setOrderError(err.message || 'Error processing checkout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Success Confirmation Screen ──────────────────────────────────────────
  if (isSuccess) {
    return (
      <main className="min-h-screen bg-brand-white text-brand-black flex flex-col items-center justify-center p-6 selection:bg-brand-green/10 selection:text-brand-green">
        {/* Minimal Distraction-Free Header */}
        <div className="mb-12">
          <Link href="/" className="font-serif text-3xl tracking-tight text-brand-black hover:text-brand-green transition-colors">
            Gul&apos;s
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl w-full bg-brand-white border border-brand-black/10 p-8 sm:p-14 text-center rounded-md shadow-soft-elevated"
        >
          <div className="w-16 h-16 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={36} strokeWidth={1.5} />
          </div>
          <span className="text-[10px] uppercase tracking-[0.35em] text-brand-green font-semibold block mb-2 font-sans">
            Order #{placedOrderNumber}
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-brand-black mb-4">
            Thank You for Your Order
          </h1>
          <p className="text-brand-muted mb-8 text-xs sm:text-sm font-sans leading-relaxed">
            Your signature order <strong>#{placedOrderNumber}</strong> has been confirmed. Confirmation details and dispatch updates will be sent directly to{' '}
            <strong className="text-brand-black font-semibold">{formData.email}</strong>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              href="/fragrance"
              variant="primary"
              size="md"
              fullWidth
              className="text-[11px] tracking-widest"
            >
              Continue Shopping
            </Button>
            <Button
              href="/"
              variant="secondary"
              size="md"
              fullWidth
              className="text-[11px] tracking-widest"
            >
              Return Home
            </Button>
          </div>
        </motion.div>
      </main>
    );
  }

  // ─── Empty Cart Fallback ──────────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-brand-white text-brand-black flex flex-col items-center justify-center p-6 text-center font-sans">
        <Link href="/" className="font-serif text-3xl tracking-tight text-brand-black mb-10 block">
          Gul&apos;s
        </Link>
        <h1 className="text-3xl font-serif mb-4 text-brand-black">Your bag is empty</h1>
        <p className="text-xs text-brand-muted mb-8 max-w-sm leading-relaxed">
          Select your signature perfume before proceeding to checkout.
        </p>
        <Button href="/fragrance" variant="primary" size="md">
          Explore Fragrances
        </Button>
      </main>
    );
  }

  // Input field classes for refined transparent/border styling
  const inputClass =
    'w-full bg-transparent border-b border-brand-black/15 py-3 text-xs sm:text-sm text-brand-black placeholder-brand-muted focus:outline-none focus:border-brand-green focus:ring-0 transition-colors font-sans';

  return (
    <main className="min-h-screen bg-brand-white text-brand-black selection:bg-brand-green/10 selection:text-brand-green pb-24">
      {/* ─── Distraction-Free Header (Logo only, centered) ────────────────── */}
      <header className="w-full border-b border-brand-black/5 py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold text-brand-muted hover:text-brand-black transition-colors font-sans"
          >
            <ArrowLeft size={14} />
            <span>Return to Bag</span>
          </Link>

          <Link href="/" className="font-serif text-3xl tracking-tight text-brand-black">
            Gul&apos;s
          </Link>

          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-brand-muted font-sans font-medium">
            <Lock size={12} className="text-brand-green" />
            <span className="hidden sm:inline">Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* ─── Main 2-Column Checkout Layout ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 lg:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Guest Checkout Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-12">
            {orderError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xs text-xs text-red-600 font-sans">
                {orderError}
              </div>
            )}

            {/* Step 1: Customer Info */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-brand-black/5">
                <span className="w-5 h-5 rounded-full bg-brand-black text-brand-white flex items-center justify-center text-[10px] font-sans font-semibold">
                  1
                </span>
                <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-black font-sans">
                  Guest Contact Details
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-muted font-sans font-semibold mb-1">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="For order tracking updates"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-muted font-sans font-semibold mb-1">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    placeholder="e.g. +92 300 1234567"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-brand-black/5">
                <span className="w-5 h-5 rounded-full bg-brand-black text-brand-white flex items-center justify-center text-[10px] font-sans font-semibold">
                  2
                </span>
                <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-black font-sans">
                  Shipping Destination
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-muted font-sans font-semibold mb-1">
                    First Name *
                  </label>
                  <input
                    required
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-muted font-sans font-semibold mb-1">
                    Last Name *
                  </label>
                  <input
                    required
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-muted font-sans font-semibold mb-1">
                  Complete Street Address *
                </label>
                <input
                  required
                  type="text"
                  name="address"
                  placeholder="House/Apartment #, Street, Area"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-muted font-sans font-semibold mb-1">
                    City *
                  </label>
                  <input
                    required
                    type="text"
                    name="city"
                    placeholder="Karachi, Lahore, etc."
                    value={formData.city}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-muted font-sans font-semibold mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Postal / ZIP"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-brand-black/5">
                <span className="w-5 h-5 rounded-full bg-brand-black text-brand-white flex items-center justify-center text-[10px] font-sans font-semibold">
                  3
                </span>
                <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-black font-sans">
                  Payment
                </h2>
              </div>
              <div className="bg-brand-offwhite border border-brand-black/10 p-4 rounded-xs mb-6 flex items-center justify-between text-xs font-sans">
                <span className="font-semibold text-brand-black uppercase tracking-wider text-[11px]">
                  Cash on Delivery / Direct Card Processing
                </span>
                <span className="text-[10px] uppercase tracking-wider text-brand-green font-semibold">
                  Verified Safe
                </span>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-muted font-sans font-semibold mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="4000 1234 5678 9010"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-muted font-sans font-semibold mb-1">
                      Expiry
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM / YY"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-muted font-sans font-semibold mb-1">
                      CVV / Security Code
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submission CTA */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                className="py-4 text-[11px] tracking-[0.25em] shadow-soft-md"
              >
                {isSubmitting ? 'Securing Your Order…' : 'Place Order'}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-8 pt-6 border-t border-brand-black/5 text-[9px] uppercase tracking-widest text-brand-muted font-sans font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-brand-green" />
                <span>Encrypted Security</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck size={14} className="text-brand-green" />
                <span>Complimentary Delivery</span>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 sticky top-12">
          <PremiumCard
            elevation="elevated"
            hoverLift={false}
            className="p-8 sm:p-10"
          >
            <h2 className="font-serif text-2xl text-brand-black mb-8">
              Order Summary
            </h2>

            {/* Item List */}
            <div className="space-y-5 mb-8 max-h-[350px] overflow-y-auto pr-1 hide-scrollbar divide-y divide-brand-black/5">
              {cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                  <div className="relative w-14 aspect-[4/5] bg-brand-offwhite rounded-xs overflow-hidden shrink-0 border border-brand-black/5">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="flex-1 flex justify-between items-center text-xs font-sans">
                    <div>
                      <h4 className="font-serif text-sm text-brand-black">{item.name}</h4>
                      <p className="text-[10px] text-brand-muted">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-brand-black">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-4 pt-6 border-t border-brand-black/10 text-xs font-sans">
              <div className="flex justify-between text-brand-charcoal">
                <span>Subtotal</span>
                <span className="font-semibold text-brand-black">
                  Rs. {cartTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-brand-charcoal">
                <span>Delivery & Insurance</span>
                <span className="text-brand-green font-semibold uppercase tracking-wider text-[10px]">
                  Complimentary
                </span>
              </div>
              <div className="pt-4 border-t border-brand-black/10 flex justify-between items-baseline">
                <span className="font-serif text-base text-brand-black">Total</span>
                <span className="font-sans text-2xl font-bold text-brand-black tracking-wide">
                  Rs. {cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-brand-offwhite rounded-xs text-[11px] text-brand-muted font-sans leading-relaxed italic border border-brand-black/5">
              &ldquo;Every signature order is hand-packaged with our bespoke emerald presentation seals.&rdquo;
            </div>
          </PremiumCard>
        </div>
      </div>
    </main>
  );
}
