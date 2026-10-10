'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { products, collections, formatPrice } from '@/lib/data';
import { Search, SlidersHorizontal, ShoppingBag, ArrowRight, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EditionsShowcase from '@/components/EditionsShowcase';
import { useStore } from '@/context/StoreContext';
import { cn } from '@/lib/utils';

// Extracted into its own component so useSearchParams is safely inside <Suspense>
function FragrancePageContent() {
  const { addToCart } = useStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', ...collections.map((c) => c.id)];
  const collectionParam = searchParams.get('collection');
  const selectedCategory = collectionParam && categories.includes(collectionParam) ? collectionParam : 'All';
  const [sortBy, setSortBy] = useState('Featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (collectionParam && categories.includes(collectionParam)) {
      const productsSection = document.getElementById('products-grid');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    if (category === 'All') {
      router.push('/fragrance', { scroll: false });
    } else {
      router.push(`/fragrance?collection=${category}`, { scroll: false });
    }
  };

  const getCategoryTitle = (categoryId: string) => {
    if (categoryId === 'All') return 'All Fragrances';
    const coll = collections.find((c) => c.id === categoryId);
    return coll ? coll.title : categoryId;
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        return 0;
      });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <main className="min-h-screen bg-brand-green-dark text-white">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-12 px-6 md:px-14 bg-gradient-to-b from-black/80 to-brand-green-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-white/40 mb-4">
                <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
                <span>/</span>
                <span className="text-brand-gold">Fragrance</span>
              </nav>
              <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-white">
                Our <span className="italic text-brand-gold">Collections</span>
              </h1>
            </div>
           
          </motion.div>
        </div>
      </section>

      {/* Editions Showcase */}
      <EditionsShowcase />

      {/* Toolbar / Filters */}
      <section id="products-grid" className="sticky top-[80px] z-30 bg-brand-green-dark/95 backdrop-blur-md border-y border-white/10 px-6 md:px-14 py-4 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={16} />
            <input
              type="text"
              placeholder="Search fragrances..."
              className="w-full bg-white/5 py-3 pl-12 pr-4 text-xs text-white placeholder-white/40 border border-transparent focus:outline-none focus:border-brand-gold/30 rounded-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filters & Sort */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full md:w-auto gap-6 sm:gap-8">

            <div className="md:hidden flex items-center space-x-2 text-[10px] uppercase tracking-widest text-brand-gold">
              <span>Viewing:</span>
              <span className="font-bold">{getCategoryTitle(selectedCategory)}</span>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
              <span className="text-[10px] uppercase tracking-widest text-white/40">Sort:</span>
              <select
                className="bg-transparent text-[10px] uppercase tracking-widest font-bold text-white focus:outline-none cursor-pointer appearance-none pr-4"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="Featured" className="bg-brand-green-dark">Featured</option>
                <option value="Price: Low to High" className="bg-brand-green-dark">Price: Low to High</option>
                <option value="Price: High to Low" className="bg-brand-green-dark">Price: High to Low</option>
              </select>
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-white hover:text-brand-gold transition-colors"
            >
              <SlidersHorizontal size={14} />
              <span>{isFilterOpen ? 'Close Filters' : 'Collections Filter'}</span>
            </button>
          </div>
        </div>

        {/* Filter Drawer */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="max-w-7xl mx-auto pt-6 pb-2 flex flex-wrap gap-3 md:gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={cn(
                      'px-4 md:px-6 py-2 text-[9px] md:text-[10px] uppercase tracking-widest border transition-all duration-300 rounded-sm',
                      selectedCategory === cat
                        ? 'bg-brand-gold text-brand-green-dark border-brand-gold font-bold'
                        : 'bg-transparent text-white/70 border-white/10 hover:border-brand-gold/50 hover:text-white'
                    )}
                  >
                    {getCategoryTitle(cat)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Product Grid */}
      <section className="py-16 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">

          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-serif text-white">
              {getCategoryTitle(selectedCategory)}
            </h2>
            <p className="text-white/50 text-sm mt-2">
              Showing {filteredProducts.length} results
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-14">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden mb-5 bg-brand-green-rich rounded-sm">
                    {product.isSpecialEdition && (
                      <div className="absolute top-4 right-4 z-20 bg-brand-gold text-brand-green-dark text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-sm shadow-md">
                        Special Edition
                      </div>
                    )}

                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

                    {/* Hover Add to Cart */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product.id);
                        }}
                        className="w-full bg-brand-gold text-brand-green-dark py-3.5 text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 rounded-sm"
                      >
                        <ShoppingBag size={14} />
                        Add to Cart
                      </button>
                    </div>
                  </Link>

                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-serif text-white group-hover:text-brand-gold transition-colors">{product.name}</h3>
                      <p className="text-[9px] uppercase tracking-widest text-white/40 font-semibold mt-1">
                        {getCategoryTitle(product.category)}
                      </p>
                    </div>
                    <span className="text-sm font-medium tracking-widest text-brand-gold">{formatPrice(product.price)}</span>
                  </div>

                  <p className="text-xs text-white/60 line-clamp-2 italic mb-3 mt-2">
                    {product.description}
                  </p>

                  <Link
                    href={`/product/${product.id}`}
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/70 group-hover:text-brand-gold transition-colors"
                  >
                    View Details
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-28 text-center border border-white/5 rounded-sm bg-white/5">
              <h2 className="text-3xl font-serif text-white mb-4">No results found</h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                We couldn&apos;t find any fragrances matching your search for &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                onClick={() => { setSearchQuery(''); router.push('/fragrance', { scroll: false }); }}
                className="px-10 py-4 bg-brand-gold text-brand-green-dark text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-colors rounded-sm"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Suspense boundary is required here because FragrancePageContent uses useSearchParams()
export default function FragrancePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-green-dark" />}>
      <FragrancePageContent />
    </Suspense>
  );
}