'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'SOURCING',
    description: 'We carefully source the finest natural and premium ingredients from around the world.',
  },
  {
    number: '02',
    title: 'FORMULATION',
    description: 'Our expert perfumers blend tradition with innovation to craft unique, balanced accords.',
  },
  {
    number: '03',
    title: 'MACERATION',
    description: 'The blend rests in aged barrels, allowing ingredients to infuse and reveal character.',
  },
  {
    number: '04',
    title: 'TESTING',
    description: 'Rigorous quality checks for pure sillage, projection, stability and skin performance.',
  },
  {
    number: '05',
    title: 'BOTTLING',
    description: 'Bottled with utmost precision to preserve precious essence and bespoke elegance.',
  },
];

export default function OurProcess() {
  return (
    <section className="relative w-full min-h-[900px] md:min-h-0 md:aspect-[1920/800] flex items-center justify-center overflow-hidden bg-[#EFE8DE]" id="our-process">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <Image
          src="/images/process-bg.png"
          alt="Our Process Background"
          fill
          className="object-cover md:object-contain object-center w-full h-full"
          sizes="100vw"
        />
      </div>

      <div className="relative z-20 max-w-[1400px] mx-auto px-6 w-full flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="font-sans text-[14px] md:text-[16px] tracking-[0.25em] text-[#C9A66B] uppercase font-bold mb-4">
            Our Process
          </p>
          <h2 className="font-serif text-[28px] md:text-[44px] lg:text-[48px] font-bold text-[#C9A66B] uppercase tracking-wide leading-tight mb-4 drop-shadow-sm">
            From Nature To Nostalgia
          </h2>
          <p className="font-sans text-[13px] md:text-[15px] text-[#29251D]">
            A journey of craftsmanship, where every detail creates a lasting impression.
          </p>
        </motion.div>

        {/* Timeline Section */}
        <div className="relative w-full max-w-6xl mx-auto mb-20 md:mb-32">
          
          {/* Horizontal Line for Desktop (Centered accurately at top-8 i.e., 32px) */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[1px] bg-[#C9A66B]/60 z-0" />
          
          {/* Vertical Line for Mobile (Centered accurately at left-7 i.e., 28px) */}
          <div className="md:hidden absolute top-8 bottom-8 left-7 w-[1px] bg-[#C9A66B]/60 z-0" />

          <div className="flex flex-col md:flex-row justify-between items-start relative z-10 space-y-12 md:space-y-0">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
                className="flex flex-row md:flex-col items-start md:items-center md:text-center w-full md:w-[18%] group"
              >
                {/* Number Circle */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#183629] text-[#C9A66B] flex items-center justify-center font-serif text-[16px] md:text-[18px] shadow-md border-2 border-transparent group-hover:border-[#C9A66B] transition-colors duration-300 shrink-0 md:mb-6 z-10">
                  {step.number}
                </div>

                {/* Text Content */}
                <div className="ml-6 md:ml-0 mt-1 md:mt-0 flex flex-col items-start md:items-center">
                  <h3 className="font-serif text-[15px] md:text-[17px] text-[#C9A66B] font-bold uppercase tracking-widest mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[12px] md:text-[13px] text-[#29251D]/90 leading-relaxed max-w-[250px] md:max-w-none">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

           <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="text-center px-4 mt-4 md:mt-12"
        >
          <p className="font-serif italic text-[18px] md:text-[22px] text-[#29251D] font-medium drop-shadow-sm">
            &quot;We don&apos;t just bottle perfume. We bottle performance, precision and prestige.&quot;
          </p>
        </motion.div>


        </div>       

      </div>
    </section>
  );
}