'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function Craftsmanship() {
  const details = [
    { title: 'The Flacon', desc: 'Custom designed glass, weighted for a premium feel in hand.' },
    { title: 'The Cap', desc: 'Textured leather and gold foil detailing, magnetically sealed.' },
    { title: 'The Box', desc: 'Rigid structural packaging lined with luxury silk satin.' },
  ];

  return (
    <section className="py-24 md:py-32 bg-brand-green-rich px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-20">
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sticky top-40"
          >
            <span className="text-brand-gold/60 uppercase tracking-[0.4em] text-xs mb-4 block">Excellence in Detail</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-12">
              Crafted to be <br />
              <span className="italic text-brand-gold">Remembered.</span>
            </h2>

            <div className="space-y-10">
              {details.map((item, i) => (
                <div key={i} className="group border-l border-brand-gold/20 pl-8 hover:border-brand-gold transition-colors duration-500">
                  <h3 className="text-xl font-serif mb-2 text-white group-hover:text-brand-gold transition-colors">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] col-span-2 overflow-hidden"
          >
            <Image
              src="/images/placeholder-image.jpg"
              alt="Gul's Packaging"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative aspect-square overflow-hidden"
          >
            <Image
              src="/images/placeholder-image.jpg"
              alt="Packaging Detail"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative aspect-square overflow-hidden"
          >
            <Image
              src="/images/placeholder-image.jpg"
              alt="Gift Bag"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
