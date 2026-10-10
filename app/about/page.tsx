'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-green-dark text-white overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/images/new-launch.jpeg" // Replaced placeholder with an actual existing image
          alt="The House of Gul's"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-brand-green-dark/70" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 md:mb-6 block text-brand-gold font-medium">
              Decades of Scents
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-none text-white">
              WEAR YOUR <span className="italic text-brand-gold">ERA.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* About Us / Story Section */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-16 bg-[#0a1f11]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-gold mb-3">
                01. About Us
              </p>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">
                A Time Capsule in <br />
                <span className="italic text-brand-gold">Every Bottle.</span>
              </h2>
              <div className="space-y-6 text-white/70 leading-relaxed text-sm md:text-base font-light">
                <p>
                  Gul&apos;s Collection is not just a fragrance house - it&apos;s a time capsule. Born from the idea that every decade has a scent, and every person has an era, Decades by Gul&apos;s was created to let you wear your era.
                </p>
                <p>
                  We craft premium, long-lasting, impression-based perfumes that bring luxury niche fragrances within reach. From bold masculine to soft feminine, from unisex modern to deep arabesque—our scents are designed to become your identity.
                </p>
                
                {/* Vision & Mission Mini-Stats */}
                <div className="pt-6 grid grid-cols-2 gap-6 border-t border-brand-gold/10 mt-8">
                  <div>
                    <span className="block text-brand-gold font-serif text-xl mb-1">Our Vision</span>
                    <span className="text-xs text-white/60">Defining generations through scent.</span>
                  </div>
                  <div>
                    <span className="block text-brand-gold font-serif text-xl mb-1">Our Mission</span>
                    <span className="text-xs text-white/60">Luxury. Craftsmanship. Accessibility.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/2 relative aspect-square max-w-md mx-auto lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-full w-full"
            >
              <Image
                src="/images/brand-bags.jpeg"
                alt="Brand Heritage"
                fill
                className="object-cover rounded-sm"
              />
              <div className="absolute inset-0 border border-brand-gold/20 m-4 md:m-8 rounded-sm pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-gold mb-3">
              04. Our Core Values
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">A Scent For Every Era</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            <div className="text-center group">
              <div className="mb-6 mx-auto w-16 h-16 border border-brand-gold/20 rounded-full flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold/5 transition-all duration-300">
                <span className="text-xl font-serif text-brand-gold">Q</span>
              </div>
              <h3 className="text-lg font-serif mb-3 text-white">Quality First.</h3>
              <p className="text-xs text-white/60 leading-relaxed px-4">
                Only the finest ingredients. Always. Carefully selected notes crafted for a lasting impression.
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-6 mx-auto w-16 h-16 border border-brand-gold/20 rounded-full flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold/5 transition-all duration-300">
                <span className="text-xl font-serif text-brand-gold">L</span>
              </div>
              <h3 className="text-lg font-serif mb-3 text-white">Longevity Guaranteed.</h3>
              <p className="text-xs text-white/60 leading-relaxed px-4">
                Scents that stay with you. High concentration formula for a fragrance that lasts 10+ hours.
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-6 mx-auto w-16 h-16 border border-brand-gold/20 rounded-full flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold/5 transition-all duration-300">
                <span className="text-xl font-serif text-brand-gold">E</span>
              </div>
              <h3 className="text-lg font-serif mb-3 text-white">Era Defined.</h3>
              <p className="text-xs text-white/60 leading-relaxed px-4">
                More than a scent—it&apos;s a time capsule. Timeless scents for every mood, moment and personality.
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-6 mx-auto w-16 h-16 border border-brand-gold/20 rounded-full flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold/5 transition-all duration-300">
                <span className="text-xl font-serif text-brand-gold">C</span>
              </div>
              <h3 className="text-lg font-serif mb-3 text-white">Customer Obsessed.</h3>
              <p className="text-xs text-white/60 leading-relaxed px-4">
                Your experience matters most. From premium imported oils to exquisite packaging.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}