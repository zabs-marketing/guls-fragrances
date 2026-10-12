'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-brand-white text-brand-black selection:bg-brand-green/10 selection:text-brand-green">
      <Navbar />

      <section className="pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <span className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.3em] text-brand-muted mb-3 inline-block">
              Connect With The Atelier
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-black tracking-tight mb-4">
              Get in Touch
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted font-sans leading-relaxed tracking-wide">
              Whether you seek bespoke consultation, gift curation, or assistance with your signature order, our concierge is at your service.
            </p>
          </div>

          {/* 2-Column Clean Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-10 pr-0 lg:pr-8"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-green font-semibold block mb-2">
                  Atelier Concierge
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-black mb-3">
                  Gul&apos;s Fragrances
                </h2>
                <p className="text-xs sm:text-sm text-brand-muted font-sans leading-relaxed">
                  Decades of scents. Crafted to leave an enduring memory in every room you enter.
                </p>
              </div>

              <div className="space-y-6 pt-4 border-t border-brand-black/5 font-sans">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-brand-offwhite flex items-center justify-center text-brand-charcoal shrink-0 border border-brand-black/5">
                    <Mail size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-charcoal">
                      Direct Email
                    </h3>
                    <p className="text-xs text-brand-muted mt-0.5">support@gulsfragrances.com</p>
                    <p className="text-xs text-brand-muted">orders@gulsfragrances.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-brand-offwhite flex items-center justify-center text-brand-charcoal shrink-0 border border-brand-black/5">
                    <Phone size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-charcoal">
                      WhatsApp Concierge
                    </h3>
                    <p className="text-xs text-brand-muted mt-0.5">+92 (300) 827-4192</p>
                    <p className="text-[11px] text-brand-green font-medium">Available for real-time recommendations</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-brand-offwhite flex items-center justify-center text-brand-charcoal shrink-0 border border-brand-black/5">
                    <MapPin size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-charcoal">
                      House Location
                    </h3>
                    <p className="text-xs text-brand-muted mt-0.5">Karachi, Pakistan</p>
                    <p className="text-[11px] text-brand-muted">Nationwide Express Delivery</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-brand-offwhite flex items-center justify-center text-brand-charcoal shrink-0 border border-brand-black/5">
                    <Clock size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-charcoal">
                      Hours of Operation
                    </h3>
                    <p className="text-xs text-brand-muted mt-0.5">Monday &ndash; Saturday: 10:00 &ndash; 20:00 PKT</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Refined Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-7 bg-brand-white p-8 sm:p-12 rounded-md shadow-soft-elevated border border-brand-black/5"
            >
              {isSubmitted ? (
                <div className="py-16 text-center">
                  <div className="w-14 h-14 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-serif text-2xl text-brand-black mb-2">Message Sent</h3>
                  <p className="text-xs text-brand-muted font-sans max-w-sm mx-auto mb-8 leading-relaxed">
                    Thank you for reaching out. A dedicated fragrance consultant will respond to your inquiry within 24 business hours.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    Send Another Note
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-charcoal mb-2 font-sans">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ayesha Siddiqui"
                      className="w-full bg-transparent border-b border-brand-black/15 py-3 text-xs sm:text-sm text-brand-black placeholder-brand-muted focus:outline-none focus:border-brand-green focus:ring-0 transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-charcoal mb-2 font-sans">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-transparent border-b border-brand-black/15 py-3 text-xs sm:text-sm text-brand-black placeholder-brand-muted focus:outline-none focus:border-brand-green focus:ring-0 transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-charcoal mb-2 font-sans">
                      Inquiry Subject
                    </label>
                    <div className="relative">
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-transparent border-b border-brand-black/15 py-3 text-xs sm:text-sm text-brand-black focus:outline-none focus:border-brand-green focus:ring-0 transition-colors font-sans cursor-pointer"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Fragrance Consultation">Personal Fragrance Consultation</option>
                        <option value="Order Tracking & Support">Order Tracking & Support</option>
                        <option value="Bespoke & Gifting">Bespoke & Corporate Gifting</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-charcoal mb-2 font-sans">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How may our house assist you today?"
                      className="w-full bg-transparent border-b border-brand-black/15 py-3 text-xs sm:text-sm text-brand-black placeholder-brand-muted focus:outline-none focus:border-brand-green focus:ring-0 transition-colors font-sans resize-none"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      className="tracking-[0.25em] text-[11px] py-4"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}