import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, ArrowRight } from 'lucide-react';

export default function Footer() {
  const collections = [
    {
      title: 'WOMEN',
      subtitle: 'COLLECTION',
      href: '/shop?category=her',
      image:
        'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'MEN',
      subtitle: 'COLLECTION',
      href: '/shop?category=him',
      image:
        'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'UNISEX',
      subtitle: 'COLLECTION',
      href: '/shop?category=unisex',
      image:
        'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <footer className="relative bg-[#f3efe6] text-[#1a1a1a] pt-7 pb-8 px-6 md:px-14 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top 4-Card Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 mb-8">
          {/* First 3 Collection Cards */}
          {collections.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative h-36 md:h-40 lg:col-span-3 overflow-hidden bg-[#0a0f0b] flex items-end p-5"
            >
              <Image
                src={item.image}
                alt={`${item.title} ${item.subtitle}`}
                fill
                unoptimized
                className="object-cover opacity-65 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="relative z-10 text-white">
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase">
                  {item.title}
                </h3>
                <p className="text-[9px] text-white/75 tracking-[0.2em] uppercase flex items-center gap-1.5 mt-1">
                  <span>{item.subtitle}</span>
                  <ArrowRight
                    size={11}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </p>
              </div>
            </Link>
          ))}

          {/* 4th Card: The Art of Fragrance */}
          <Link
            href="/about"
            className="group relative h-36 md:h-40 lg:col-span-3 overflow-hidden bg-[#121c16] flex flex-col items-center justify-center text-center p-5"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(214,190,150,0.12),_transparent_70%)]" />
            <div className="relative z-10">
              <span className="block text-[#d6be96] text-xs md:text-sm font-serif tracking-[0.25em] uppercase leading-relaxed">
                The Art <br /> Of Fragrance
              </span>
              <div className="mt-2 flex items-center justify-center text-[#d6be96]/70 group-hover:text-[#d6be96] transition-colors">
                <span className="w-8 h-px bg-[#d6be96]/50" />
                <ArrowRight
                  size={11}
                  className="-ml-1 group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom Minimalist Footer Row */}
        <div className="pt-4 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand Name */}
          <Link href="/" className="flex items-baseline gap-2.5">
            <span className="font-serif text-2xl md:text-3xl text-[#1a1a1a]">
              Gul&apos;s
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-black/50 font-semibold">
              Fragrances
            </span>
          </Link>

          {/* Center: Footer Navigation */}
          <ul className="flex flex-wrap items-center justify-center gap-8 text-[10px] uppercase tracking-[0.25em] text-black/70 font-medium">
            <li>
              <Link href="/shop" className="hover:text-black transition-colors">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-black transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/journal"
                className="hover:text-black transition-colors"
              >
                Journal
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-black transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Right: Social Icons & Tagline */}
          <div className="flex items-center gap-5 text-black/75">
            <div className="flex items-center gap-4">
              <Link
                href="#"
                aria-label="Instagram"
                className="hover:text-black transition-colors"
              >
                <Instagram size={14} strokeWidth={1.7} />
              </Link>
              <Link
                href="#"
                aria-label="Facebook"
                className="hover:text-black transition-colors"
              >
                <Facebook size={14} strokeWidth={1.7} />
              </Link>
              {/* Pinterest Icon */}
              <Link
                href="#"
                aria-label="Pinterest"
                className="hover:text-black transition-colors text-xs font-serif font-bold"
              >
                P
              </Link>
              {/* TikTok SVG Icon */}
              <Link
                href="#"
                aria-label="TikTok"
                className="hover:text-black transition-colors"
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

            <span className="h-3.5 w-px bg-black/20" />

            <p className="text-xs font-serif italic text-black/75 tracking-wide">
              Luxury in Every Detail
            </p>
          </div>
        </div>
      </div>

      {/* Right Corner Floral Botanical Line-Art Illustration */}
      <svg
        className="pointer-events-none absolute right-2 bottom-0 w-28 md:w-36 h-48 text-[#8c7a5b]/35"
        viewBox="0 0 120 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 200C45 150 65 100 95 25"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M65 100C50 90 45 75 55 65C65 75 70 90 65 100Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M78 68C92 62 102 70 98 82C86 82 78 75 78 68Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M52 135C36 128 30 112 40 104C50 112 55 125 52 135Z"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="95"
          cy="25"
          r="8"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </footer>
  );
}