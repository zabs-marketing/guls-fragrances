'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useStore();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/fragrance?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Fragrances', href: '/fragrance' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-6 md:px-14',
        isScrolled
          ? 'bg-brand-white/95 backdrop-blur-md border-b border-brand-black/5 shadow-soft-sm'
          : 'bg-brand-white/80 backdrop-blur-sm border-b border-brand-black/5'
      )}
    >
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="font-serif text-2xl md:text-3xl tracking-wide text-brand-black hover:text-brand-green transition-colors"
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
                  'relative h-full flex items-center text-[10px] uppercase tracking-[0.25em] font-medium transition-all duration-200 active:scale-95 cursor-pointer',
                  isActive
                    ? 'text-brand-green font-semibold'
                    : 'text-brand-charcoal/70 hover:text-brand-green'
                )}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-green" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-6 text-brand-charcoal">
          {/* Actionable Search Button & Expandable Popover */}
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen((prev) => !prev)}
              aria-label="Search Fragrances"
              className="hover:text-brand-green transition-colors cursor-pointer flex items-center"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* Desktop Quick Search dropdown */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-10 w-72 bg-brand-white rounded-md shadow-soft-xl border border-brand-black/10 p-2 z-50"
                >
                  <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search notes, perfume, era..."
                      className="w-full text-xs bg-brand-offwhite px-3 py-2 rounded-sm text-brand-black placeholder-brand-muted outline-none focus:ring-1 focus:ring-brand-green"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-brand-black text-brand-white text-[10px] uppercase tracking-wider rounded-sm hover:bg-brand-green transition-colors shrink-0"
                    >
                      Go
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/cart"
            aria-label="Shopping Bag"
            className="relative hover:text-brand-green transition-colors"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-brand-green text-brand-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className="md:hidden hover:text-brand-green transition-colors cursor-pointer"
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
            className="fixed inset-0 bg-brand-white text-brand-black z-[60] flex flex-col p-10"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl text-brand-black">
                Gul&apos;s
              </span>
              <button
                className="text-brand-black/70 hover:text-brand-green cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={26} />
              </button>
            </div>

            {/* Mobile Search Input */}
            <form onSubmit={handleSearchSubmit} className="mt-8 flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scents..."
                className="w-full text-xs bg-brand-offwhite px-4 py-3 rounded-sm text-brand-black placeholder-brand-muted outline-none border border-brand-black/10 focus:border-brand-green"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-brand-black text-brand-white text-[11px] uppercase tracking-wider rounded-sm hover:bg-brand-green transition-colors shrink-0"
              >
                Search
              </button>
            </form>

            <div className="mt-10 flex flex-col space-y-7">
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
                      'text-2xl font-serif transition-all duration-200 active:scale-95 flex items-center justify-between',
                      isActive ? 'text-brand-green font-semibold' : 'text-brand-black hover:text-brand-green'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-brand-green" />}
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto flex flex-col space-y-5 border-t border-brand-black/10 pt-8 text-xs uppercase tracking-[0.2em] text-brand-muted">
              <Link
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-brand-green"
              >
                Shopping Bag {cartCount > 0 && `(${cartCount})`}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}