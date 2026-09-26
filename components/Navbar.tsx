'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useStore();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/shop?collection=signature' },
    { name: 'About', href: '/about' },
    { name: 'Journal', href: '/journal' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-6 md:px-14',
        isScrolled
          ? 'bg-[#070b08]/95 backdrop-blur-md border-b border-white/10'
          : 'bg-gradient-to-b from-black/80 to-transparent border-b border-white/10'
      )}
    >
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="font-serif text-2xl md:text-3xl tracking-wide text-[#d6be96] hover:opacity-90 transition-opacity"
        >
          Gul&apos;s
        </Link>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10 h-full">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname?.startsWith(link.href.split('?')[0]);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'relative h-full flex items-center text-[10px] uppercase tracking-[0.25em] font-medium transition-colors',
                  isActive
                    ? 'text-[#d6be96]'
                    : 'text-white/75 hover:text-[#d6be96]'
                )}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d6be96]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-6 text-white/80">
          <button
            aria-label="Search"
            className="hover:text-[#d6be96] transition-colors"
          >
            <Search size={17} strokeWidth={1.5} />
          </button>

          <Link
            href="/account"
            aria-label="Account"
            className="hidden md:block hover:text-[#d6be96] transition-colors"
          >
            <User size={17} strokeWidth={1.5} />
          </Link>

          <Link
            href="/cart"
            aria-label="Shopping Bag"
            className="relative hover:text-[#d6be96] transition-colors"
          >
            <ShoppingBag size={17} strokeWidth={1.5} />
            <span className="absolute -top-1.5 -right-2 bg-[#d6be96] text-[#070b08] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </Link>

          <button
            className="md:hidden hover:text-[#d6be96] transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#070b08] text-white z-[60] flex flex-col p-10"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl text-[#d6be96]">
                Gul&apos;s
              </span>
              <button
                className="text-white/80 hover:text-[#d6be96]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={28} />
              </button>
            </div>

            <div className="mt-14 flex flex-col space-y-7">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-3xl font-serif text-white/90 hover:text-[#d6be96] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto flex flex-col space-y-5 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.2em] text-white/70">
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#d6be96]"
              >
                Account
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#d6be96]"
              >
                Shopping Bag ({cartCount})
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}