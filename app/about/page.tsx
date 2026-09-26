'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/images/WhatsApp Image 2026-09-26 at 3.25.58 PM.jpeg"
          alt="The House of Gul's"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] mb-6 block opacity-80">Established in Excellence</span>
            <h1 className="text-5xl md:text-8xl font-serif tracking-tight leading-none">
              OUR <span className="italic">HERITAGE</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-brand-cream">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-serif text-brand-black mb-12 leading-tight">
                The Essence of <br />
                <span className="italic text-brand-burgundy">Gul's.</span>
              </h2>
              <div className="space-y-8 text-brand-charcoal/70 leading-relaxed text-lg font-light">
                <p>
                  Born from a passion for the olfactive arts, Gul's is a boutique fragrance house dedicated to the creation of scents that transcend time and trend. Our journey began with a simple belief: that a fragrance should be more than just a pleasant aroma—it should be a profound emotional experience.
                </p>
                <p>
                  We source the rarest botanicals and the finest synthetics from around the globe, blending them with meticulous precision in our atelier. Every flacon is a masterpiece of design, every drop a tribute to the craft of niche perfumery.
                </p>
                <div className="pt-8 flex items-center gap-6">
                  <div className="text-center">
                    <span className="block text-3xl font-serif text-brand-burgundy mb-2">100%</span>
                    <span className="text-[9px] uppercase tracking-widest font-bold">Pure Craft</span>
                  </div>
                  <div className="w-px h-12 bg-brand-burgundy/10" />
                  <div className="text-center">
                    <span className="block text-3xl font-serif text-brand-burgundy mb-2">Global</span>
                    <span className="text-[9px] uppercase tracking-widest font-bold">Inspiration</span>
                  </div>
                  <div className="w-px h-12 bg-brand-burgundy/10" />
                  <div className="text-center">
                    <span className="block text-3xl font-serif text-brand-burgundy mb-2">Niche</span>
                    <span className="text-[9px] uppercase tracking-widest font-bold">Quality</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="w-full lg:w-1/2 relative aspect-square">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-full w-full"
            >
              <Image
                src="/images/WhatsApp Image 2026-09-26 at 3.25.59 PM.jpeg"
                alt="Brand Heritage"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 border border-brand-burgundy/10 m-8" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-brand-black mb-6">Our Philosophy</h2>
            <p className="text-brand-charcoal/60 max-w-xl mx-auto italic">"Excellence is not an act, but a habit of the soul."</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center group">
              <div className="mb-8 relative mx-auto w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-brand-cream group-hover:scale-110 group-hover:bg-brand-burgundy transition-all duration-500 rounded-full" />
                <span className="relative z-10 text-2xl font-serif text-brand-burgundy group-hover:text-white transition-colors">01</span>
              </div>
              <h3 className="text-xl font-serif mb-4">Uncompromising Quality</h3>
              <p className="text-sm text-brand-charcoal/60 leading-relaxed">
                We never compromise on the ingredients or the process. If it isn't perfect, it isn't Gul's.
              </p>
            </div>
            <div className="text-center group">
              <div className="mb-8 relative mx-auto w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-brand-cream group-hover:scale-110 group-hover:bg-brand-burgundy transition-all duration-500 rounded-full" />
                <span className="relative z-10 text-2xl font-serif text-brand-burgundy group-hover:text-white transition-colors">02</span>
              </div>
              <h3 className="text-xl font-serif mb-4">Artistic Expression</h3>
              <p className="text-sm text-brand-charcoal/60 leading-relaxed">
                Fragrance is art. We provide our perfumers with total creative freedom to explore the unknown.
              </p>
            </div>
            <div className="text-center group">
              <div className="mb-8 relative mx-auto w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-brand-cream group-hover:scale-110 group-hover:bg-brand-burgundy transition-all duration-500 rounded-full" />
                <span className="relative z-10 text-2xl font-serif text-brand-burgundy group-hover:text-white transition-colors">03</span>
              </div>
              <h3 className="text-xl font-serif mb-4">Lasting Impression</h3>
              <p className="text-sm text-brand-charcoal/60 leading-relaxed">
                We design scents that linger, creating a powerful presence that remains long after you depart.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
