'use client';

import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-cream">
      <Navbar />

      <section className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-serif text-brand-black tracking-tight mb-8">
                Contact <br />
                <span className="italic text-brand-gold">The Atelier</span>
              </h1>
              <p className="text-brand-charcoal/70 mb-12 text-sm leading-relaxed max-w-md">
                Whether you have a question about our collections, need assistance with an order, or simply wish to share your olfactive journey, our concierges are here for you.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.25em] font-bold text-brand-charcoal mb-2">General Inquiries</h3>
                  <a href="mailto:contact@guls.com" className="text-brand-black font-serif italic hover:text-brand-gold transition-colors text-lg">contact@guls.com</a>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.25em] font-bold text-brand-charcoal mb-2">Boutique</h3>
                  <p className="text-brand-black font-serif italic text-lg">123 Rue de Parfums, Paris, France</p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.25em] font-bold text-brand-charcoal mb-2">Hours</h3>
                  <p className="text-brand-black font-serif italic text-lg">Mon - Sat: 10:00 AM - 7:00 PM</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="md:w-1/2 bg-white p-12 shadow-sm border border-black/5">
            <motion.form 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-brand-charcoal mb-3">Full Name</label>
                <input type="text" className="w-full border-b border-black/20 bg-transparent py-3 focus:outline-none focus:border-brand-gold transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-brand-charcoal mb-3">Email Address</label>
                <input type="email" className="w-full border-b border-black/20 bg-transparent py-3 focus:outline-none focus:border-brand-gold transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-brand-charcoal mb-3">Subject</label>
                <select className="w-full border-b border-black/20 bg-transparent py-3 focus:outline-none focus:border-brand-gold transition-colors text-sm">
                  <option>Order Support</option>
                  <option>Fragrance Consultation</option>
                  <option>Press Inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-brand-charcoal mb-3">Message</label>
                <textarea rows={4} className="w-full border-b border-black/20 bg-transparent py-3 focus:outline-none focus:border-brand-gold transition-colors resize-none"></textarea>
              </div>
              
              <button className="w-full py-5 bg-brand-black text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-brand-gold hover:text-brand-black transition-colors">
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
