'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, ArrowRight } from 'lucide-react';

export default function Footer() {
  const imageCards = [
    {
      title: 'WOMEN',
      subtitle: 'COLLECTION',
      href: '/fragrance?collection=women',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'MEN',
      subtitle: 'COLLECTION',
      href: '/fragrance?collection=men',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'UNISEX',
      subtitle: 'COLLECTION',
      href: '/fragrance?collection=unisex',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const navLinks = [
    { name: 'FRAGRANCE', href: '/fragrance' },
    { name: 'ABOUT', href: '/about' },
    { name: 'JOURNAL', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <footer className="relative bg-brand-white text-brand-black pt-10 pb-8 px-6 md:px-14 border-t border-brand-black/10">
      <div className="max-w-7xl mx-auto">
        {/* 1. Top Section: 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10">
          {/* Columns 1, 2, 3: Image Cards */}
          {imageCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative h-40 md:h-44 overflow-hidden rounded-sm bg-brand-charcoal flex items-end p-5 shadow-soft-sm hover:shadow-soft-md transition-shadow"
            >
              <Image
                src={card.image}
                alt={`${card.title} ${card.subtitle}`}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {/* Soft dark gradient overlay at bottom so white text pops */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

              <div className="relative z-10 text-white">
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase flex items-center gap-1.5 group-hover:text-brand-gold-light transition-colors">
                  <span>{card.title} {card.subtitle}</span>
                  <ArrowRight
                    size={12}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </h3>
              </div>
            </Link>
          ))}

          {/* Column 4: Text Block (The Art of Fragrance) */}
          <Link
            href="/about"
            className="group relative h-40 md:h-44 overflow-hidden rounded-sm bg-brand-offwhite border border-brand-black/10 flex flex-col items-center justify-center text-center p-5 hover:border-brand-green/30 hover:shadow-soft-sm transition-all"
          >
            <div className="flex flex-col items-center">
              <span className="font-serif text-lg md:text-xl text-brand-black tracking-[0.2em] uppercase leading-snug group-hover:text-brand-green transition-colors">
                The Art <br /> Of Fragrance
              </span>
              <div className="mt-2.5 flex items-center justify-center text-brand-charcoal group-hover:text-brand-green transition-colors">
                <span className="w-6 h-px bg-current" />
                <ArrowRight
                  size={12}
                  className="-ml-0.5 group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          </Link>
        </div>

        {/* 2. Bottom Section: Horizontal Navigation Bar */}
        <div className="pt-6 border-t border-brand-black/10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-baseline gap-2 group">
            <span className="font-serif text-2xl md:text-3xl text-brand-black tracking-tight group-hover:text-brand-green transition-colors">
              Gul&apos;s
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-brand-charcoal/60 font-semibold group-hover:text-brand-green transition-colors">
              FRAGRANCES
            </span>
          </Link>

          {/* Center: Inline Navigation Links */}
          <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-[10px] uppercase tracking-[0.25em] text-brand-charcoal font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-brand-green transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: Social Icons + Tagline */}
          <div className="flex items-center gap-5 text-brand-charcoal">
            {/* Social Icons */}
            <div className="flex items-center gap-3.5">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-brand-green transition-colors"
              >
                <Instagram size={15} strokeWidth={1.5} />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-brand-green transition-colors"
              >
                <Facebook size={15} strokeWidth={1.5} />
              </Link>
              <Link
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="hover:text-brand-green transition-colors text-[13px] font-serif font-bold leading-none"
              >
                P
              </Link>
              <Link
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="hover:text-brand-green transition-colors"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </Link>
            </div>

            {/* Vertical Divider */}
            <span className="h-3.5 w-px bg-brand-black/20" />

            {/* Italic Serif Tagline */}
            <p className="font-serif italic text-xs text-brand-charcoal/80 tracking-wide">
              Luxury in Every Detail
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}