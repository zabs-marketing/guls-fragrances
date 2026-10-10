'use client';

import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-green-dark text-white">
      <Navbar />

      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20">
          
          {/* Contact Details */}
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-gold mb-3">
                Get In Touch
              </p>
              <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-6">
                Contact <span className="italic text-brand-gold">Gul&apos;s</span>
              </h1>
              <p className="text-white/60 mb-12 text-sm leading-relaxed max-w-md">
                Whether you have a question about our collections, need assistance with an order, or wish to explore our WhatsApp boutique, we are here to assist you.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/40 mb-2">Order Channels</h3>
                  <p className="text-white font-serif italic text-lg">Official Website & Instagram</p>
                  <p className="text-white font-serif italic text-lg">WhatsApp Boutique</p>
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/40 mb-2">Headquarters</h3>
                  <p className="text-white font-serif italic text-lg">Karachi, Pakistan</p>
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/40 mb-2">Delivery Information</h3>
                  <p className="text-white font-serif italic text-lg">Same-day / Next-day delivery across Karachi</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Inquiry Form */}
          <div className="md:w-1/2 bg-[#0a1f11] p-8 md:p-12 shadow-2xl border border-brand-gold/10 rounded-sm">
            <motion.form 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-white/60 mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full border-b border-white/20 bg-transparent py-2 text-white placeholder-white/20 focus:outline-none focus:border-brand-gold transition-colors" 
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-white/60 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full border-b border-white/20 bg-transparent py-2 text-white placeholder-white/20 focus:outline-none focus:border-brand-gold transition-colors" 
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-white/60 mb-2">Subject</label>
                <select className="w-full border-b border-white/20 bg-transparent py-2 text-white focus:outline-none focus:border-brand-gold transition-colors text-sm appearance-none cursor-pointer">
                  <option className="bg-brand-green-dark">Order Support</option>
                  <option className="bg-brand-green-dark">Fragrance Consultation</option>
                  <option className="bg-brand-green-dark">Wholesale Inquiry</option>
                  <option className="bg-brand-green-dark">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-white/60 mb-2">Message</label>
                <textarea 
                  rows={4} 
                  className="w-full border-b border-white/20 bg-transparent py-2 text-white placeholder-white/20 focus:outline-none focus:border-brand-gold transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button className="w-full py-4 bg-brand-gold text-brand-green-dark text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors rounded-sm mt-4">
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}