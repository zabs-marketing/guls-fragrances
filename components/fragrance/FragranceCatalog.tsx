'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, SlidersHorizontal, ShoppingBag, ArrowRight, X,
  ChevronLeft, ChevronRight, Check
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { cn } from '@/lib/utils';
import EditionsShowcase, { ShowcaseCategory } from '@/components/EditionsShowcase';

export interface CatalogProduct {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageURL: string | null;
  categoryId: number;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  topNote: string | null;
  heartNote: string | null;
  baseNote: string | null;
  isSpecialEdition: boolean;
  specialEditionType: string | null;
}

interface FragranceCatalogProps {
  products: CatalogProduct[];
  categories: ShowcaseCategory[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  selectedCollection: string;
  searchQuery: string;
  sortBy: string;
}

export default function FragranceCatalog({
  products,
  categories,
  totalProducts,
  totalPages,
  currentPage,
  selectedCollection,
  searchQuery: initialSearch,
  sortBy: initialSort,
}: FragranceCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { addToCart } = useStore();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(initialSearch);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Update url helper
  const updateQueryParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || value === 'All') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (search !== initialSearch) {
        updateQueryParams({ search: search || null, page: '1' });
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  const handleCategorySelect = (slug: string) => {
    updateQueryParams({ collection: slug === 'All' ? null : slug, page: '1' });
    setIsFilterDrawerOpen(false);
  };

  const handleSortChange = (newSort: string) => {
    updateQueryParams({ sort: newSort, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage.toString() });
    const grid = document.getElementById('products-section');
    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
  };

  const clearAllFilters = () => {
    setSearch('');
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const selectedCategoryObj = categories.find((c) => c.slug === selectedCollection);
  const selectedCategoryTitle = selectedCategoryObj ? selectedCategoryObj.name : 'All Fragrances';

  return (
    <>
      {/* Visual Category Showcase Component */}
      <EditionsShowcase categories={categories} />

      {/* Main Catalog Section */}
      <section id="products-section" className="py-12 px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        {/* Toolbar Header */}
        <div className="bg-brand-green-rich/80 backdrop-blur-md p-4 sm:p-6 rounded-lg border border-brand-gold/15 mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={16} />
            <input
              type="text"
              placeholder="Search by name, brand, or notes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 pl-10 pr-9 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-brand-gold/50 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Controls: Filter Drawer Toggle & Sort */}
          <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4">
            {/* Filter Toggle (Mobile & Desktop) */}
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-white/5 hover:bg-white/10 border border-brand-gold/25 text-brand-gold text-[10px] sm:text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors"
            >
              <SlidersHorizontal size={14} />
              <span>Filter Categories {selectedCollection && selectedCollection !== 'All' ? `(1)` : ''}</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs text-white/60">
              <span className="hidden sm:inline uppercase tracking-widest text-[10px]">Sort:</span>
              <select
                value={initialSort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-white/5 border border-white/10 text-white rounded-sm py-2 px-3 text-xs uppercase tracking-wider focus:outline-none focus:border-brand-gold/50 cursor-pointer"
              >
                <option value="Featured" className="bg-brand-green-dark">Featured</option>
                <option value="Price: Low to High" className="bg-brand-green-dark">Price: Low to High</option>
                <option value="Price: High to Low" className="bg-brand-green-dark">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Selected Filter Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white">
              {selectedCategoryTitle}
            </h2>
            <p className="text-white/50 text-xs mt-1">
              Showing {products.length} of {totalProducts} fragrances
              {isPending && <span className="ml-2 text-brand-gold animate-pulse">Updating…</span>}
            </p>
          </div>

          {(selectedCollection || initialSearch) && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-brand-gold hover:underline flex items-center gap-1 font-medium"
            >
              <X size={13} /> Reset Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product, index) => {
              const displayImage = product.imageURL || '/images/placeholder-image.jpg';

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.4) }}
                  className="group flex flex-col justify-between"
                >
                  <div>
                    {/* Image Card */}
                    <Link
                      href={`/product/${product.id}`}
                      className="block relative aspect-[4/5] overflow-hidden mb-4 bg-brand-green-rich rounded-sm border border-brand-gold/10"
                    >
                      {product.isSpecialEdition && (
                        <div className="absolute top-3 right-3 z-20 bg-brand-gold text-brand-green-dark text-[9px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 rounded-xs shadow-md">
                          {product.specialEditionType ? `${product.specialEditionType} Edition` : 'Special Edition'}
                        </div>
                      )}

                      <Image
                        src={displayImage}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

                      {/* Quick Add To Cart button on Hover */}
                      <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product.id.toString(), 1, {
                              name: product.name,
                              price: product.price,
                              image: displayImage,
                            });
                          }}
                          className="w-full bg-brand-gold text-brand-green-dark py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 rounded-xs shadow-lg"
                        >
                          <ShoppingBag size={14} />
                          Add to Bag
                        </button>
                      </div>
                    </Link>

                    {/* Meta info */}
                    <div className="flex justify-between items-start mb-1.5">
                      <div>
                        <h3 className="text-lg font-serif text-white group-hover:text-brand-gold transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-[9px] uppercase tracking-widest text-brand-gold/80 font-medium">
                          {product.category?.name}
                        </p>
                      </div>
                      <span className="text-sm font-semibold tracking-wider text-brand-gold">
                        PKR {product.price.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs text-white/60 line-clamp-2 italic mb-3">
                      {product.description}
                    </p>
                  </div>

                  <Link
                    href={`/product/${product.id}`}
                    className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-white/70 group-hover:text-brand-gold transition-colors pt-1"
                  >
                    View Details
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center border border-white/10 rounded-sm bg-white/5 my-6 px-4">
            <h3 className="text-2xl font-serif text-white mb-3">No Fragrances Found</h3>
            <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
              We couldn&apos;t find any perfumes matching your current filter criteria.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-8 py-3.5 bg-brand-gold text-brand-green-dark text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-colors rounded-xs"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Server-Side Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-white/50">
              Page {currentPage} of {totalPages}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1 || isPending}
                className="p-2 border border-white/20 text-white rounded-xs hover:border-brand-gold hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous Page"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => handlePageChange(pg)}
                  disabled={isPending}
                  className={cn(
                    'w-8 h-8 text-xs font-semibold rounded-xs transition-colors',
                    currentPage === pg
                      ? 'bg-brand-gold text-brand-green-dark font-bold'
                      : 'border border-white/10 text-white/70 hover:border-brand-gold/50 hover:text-white'
                  )}
                >
                  {pg}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages || isPending}
                className="p-2 border border-white/20 text-white rounded-xs hover:border-brand-gold hover:text-brand-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Next Page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Slide-out Category Filter Drawer (Responsive for Mobile & Desktop) */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
              onClick={() => setIsFilterDrawerOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-brand-green-dark border-l border-brand-gold/20 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={18} className="text-brand-gold" />
                    <h3 className="font-serif text-xl text-white">Filter Categories</h3>
                  </div>
                  <button
                    onClick={() => setIsFilterDrawerOpen(false)}
                    className="p-1.5 text-white/60 hover:text-white rounded-sm hover:bg-white/5"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="py-6 space-y-2">
                  <button
                    onClick={() => handleCategorySelect('All')}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-3 rounded-xs text-xs uppercase tracking-wider transition-all',
                      !selectedCollection || selectedCollection === 'All'
                        ? 'bg-brand-gold text-brand-green-dark font-bold'
                        : 'text-white/80 hover:bg-white/5'
                    )}
                  >
                    <span>All Collections</span>
                    {(!selectedCollection || selectedCollection === 'All') && <Check size={16} />}
                  </button>

                  {categories.map((cat) => {
                    const isSelected = selectedCollection === cat.slug;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.slug)}
                        className={cn(
                          'w-full flex items-center justify-between px-4 py-3 rounded-xs text-xs uppercase tracking-wider transition-all',
                          isSelected
                            ? 'bg-brand-gold text-brand-green-dark font-bold'
                            : 'text-white/80 hover:bg-white/5'
                        )}
                      >
                        <span>{cat.name}</span>
                        {isSelected && <Check size={16} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex gap-3">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 py-3 text-[10px] uppercase tracking-widest font-bold border border-white/20 text-white hover:bg-white/5 rounded-xs"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="flex-1 py-3 text-[10px] uppercase tracking-widest font-bold bg-brand-gold text-brand-green-dark hover:bg-white rounded-xs"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

