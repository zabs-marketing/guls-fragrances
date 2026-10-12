'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out px-6 md:px-14',
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
                        className="w-full text-xs bg-brand-offwhite px-3 py-2 rounded-sm text-brand-black placeholder-brand-muted outline-none focus:ring-1 focus:ring-brand-green font-sans"
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 bg-brand-black text-brand-white text-[10px] uppercase tracking-wider rounded-sm hover:bg-brand-green transition-colors shrink-0 cursor-pointer font-sans"
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
              className="relative hover:text-brand-green transition-colors active:scale-95"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-brand-green text-brand-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden hover:text-brand-green transition-colors cursor-pointer p-1 active:scale-95"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Modern Slide-out Mobile Navigation Drawer ───────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            {/* Subtle Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Solid Slide-out Side Drawer Container */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="relative w-[85%] max-w-sm h-full bg-brand-white shadow-2xl flex flex-col justify-between p-8 z-10 border-l border-brand-black/10 overflow-y-auto"
              style={{ backgroundColor: '#ffffff' }}
            >
              <div>
                {/* Header with Logo & Visible Close Button */}
                <div className="flex items-center justify-between pb-6 border-b border-brand-black/10">
                  <span className="font-serif text-2xl tracking-tight text-brand-black">
                    Gul&apos;s
                  </span>
                  <button
                    className="w-9 h-9 rounded-full bg-brand-offwhite flex items-center justify-center text-brand-charcoal hover:text-brand-green hover:bg-brand-green/10 transition-colors cursor-pointer active:scale-90"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close Menu"
                  >
                    <X size={20} strokeWidth={1.8} />
                  </button>
                </div>

                {/* Mobile Scents Search Bar */}
                <form onSubmit={handleSearchSubmit} className="mt-8 flex items-center gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search fragrance, notes…"
                    className="w-full text-xs bg-brand-offwhite px-4 py-3 rounded-xs text-brand-black placeholder-brand-muted outline-none border border-brand-black/10 focus:border-brand-green font-sans"
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 bg-brand-black text-brand-white text-[10px] uppercase tracking-wider font-semibold rounded-xs hover:bg-brand-green transition-colors shrink-0 cursor-pointer font-sans"
                  >
                    Search
                  </button>
                </form>

                {/* Staggered Navigation Links */}
                <nav className="mt-10 flex flex-col space-y-2">
                  {navLinks.map((link, idx) => {
                    const isActive =
                      link.href === '/'
                        ? pathname === '/'
                        : pathname?.startsWith(link.href.split('?')[0]);

                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.06, duration: 0.35, ease: 'easeOut' }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            'py-3.5 px-2 flex items-center justify-between font-serif text-2xl tracking-tight transition-all duration-200 active:scale-95 rounded-xs',
                            isActive
                              ? 'text-brand-green font-normal pl-4 border-l-2 border-brand-green bg-brand-green/[0.04]'
                              : 'text-brand-black hover:text-brand-green hover:pl-3'
                          )}
                        >
                          <span>{link.name}</span>
                          {isActive ? (
                            <span className="w-2 h-2 rounded-full bg-brand-green" />
                          ) : (
                            <ArrowRight size={16} className="text-brand-muted/40" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Drawer Footer */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="mt-12 pt-6 border-t border-brand-black/10 space-y-4 font-sans text-xs"
              >
                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 px-4 bg-brand-offwhite border border-brand-black/10 rounded-xs flex items-center justify-between text-brand-black hover:border-brand-green transition-colors active:scale-95"
                >
                  <span className="uppercase tracking-[0.2em] font-semibold text-[10px]">
                    Shopping Bag
                  </span>
                  <span className="font-semibold text-brand-green">
                    {cartCount > 0 ? `${cartCount} items` : 'Empty'}
                  </span>
                </Link>

                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted text-center pt-2 font-medium">
                  Decades by Gul&apos;s &bull; Wear Your Era
                </p>
              </motion.div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}