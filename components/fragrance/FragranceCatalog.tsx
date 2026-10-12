'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  Search, SlidersHorizontal, X,
  ChevronLeft, ChevronRight, Check, Sparkles
} from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import PremiumSelect, { SelectOption } from '@/components/ui/PremiumSelect';

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
  gender?: string | null;
  isSpecialEdition: boolean;
  specialEditionType: string | null;
}

export interface ShowcaseCategory {
  id: number;
  name: string;
  slug: string;
  image?: string | null;
  isActive: boolean;
}

interface FragranceCatalogProps {
  products: CatalogProduct[];
  categories: ShowcaseCategory[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  selectedCollection: string;
  selectedGender?: string;
  searchQuery: string;
  sortBy: string;
}

const GENDER_OPTIONS: SelectOption[] = [
  { value: 'All', label: 'All Genders' },
  { value: 'Men', label: 'Men' },
  { value: 'Women', label: 'Women' },
  { value: 'Unisex', label: 'Unisex' },
];

const SORT_OPTIONS: SelectOption[] = [
  { value: 'Featured', label: 'Featured' },
  { value: 'Newest', label: 'Newest' },
  { value: 'Price: Low to High', label: 'Price: Low to High' },
  { value: 'Price: High to Low', label: 'Price: High to Low' },
];

export default function FragranceCatalog({
  products,
  categories,
  totalProducts,
  totalPages,
  currentPage,
  selectedCollection,
  selectedGender = '',
  searchQuery: initialSearch,
  sortBy: initialSort,
}: FragranceCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(initialSearch);

  // Build category options for PremiumSelect
  const categoryOptions: SelectOption[] = [
    { value: 'All', label: 'All Collections' },
    ...categories.map((c) => ({
      value: c.slug,
      label: c.name,
    })),
  ];

  // Update URL helper without hard page reloads
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

  // Debounced search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (search !== initialSearch) {
        updateQueryParams({ q: search || null, page: '1' });
      }
    }, 350);
    return () => clearTimeout(handler);
  }, [search]);

  const handleCategoryChange = (val: string) => {
    updateQueryParams({ collection: val === 'All' ? null : val, page: '1' });
  };

  const handleGenderChange = (val: string) => {
    updateQueryParams({ gender: val === 'All' ? null : val, page: '1' });
  };

  const handleSortChange = (val: string) => {
    updateQueryParams({ sort: val === 'Featured' ? null : val, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage.toString() });
    const grid = document.getElementById('catalog-products-top');
    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
  };

  const clearAllFilters = () => {
    setSearch('');
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const selectedCategoryObj = categories.find((c) => c.slug === selectedCollection);
  const activeCollectionName = selectedCategoryObj ? selectedCategoryObj.name : null;
  const hasActiveFilters = Boolean(
    (selectedCollection && selectedCollection !== 'All') ||
    (selectedGender && selectedGender !== 'All') ||
    search ||
    (initialSort && initialSort !== 'Featured')
  );

  return (
    <section id="catalog-products-top" className="py-12 px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl mx-auto w-full">
      {/* ─── Premium Filter Bar ────────────────────────────────────────── */}
      <div className="bg-brand-white p-5 md:p-6 rounded-md shadow-soft-elevated border border-brand-black/5 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Box */}
          <div className="md:col-span-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" size={15} />
            <input
              type="text"
              placeholder="Search by scent, brand, notes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-brand-offwhite border border-brand-black/10 rounded-xs py-2.5 pl-10 pr-9 text-xs text-brand-black placeholder-brand-muted focus:outline-none focus:border-brand-green transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-black cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Gender Filter (Custom PremiumSelect) */}
          <div className="md:col-span-2">
            <PremiumSelect
              options={GENDER_OPTIONS}
              value={selectedGender || 'All'}
              onChange={handleGenderChange}
              placeholder="Gender"
            />
          </div>

          {/* Category Filter (Custom PremiumSelect) */}
          <div className="md:col-span-3">
            <PremiumSelect
              options={categoryOptions}
              value={selectedCollection || 'All'}
              onChange={handleCategoryChange}
              placeholder="Collection"
            />
          </div>

          {/* Sort By (Custom PremiumSelect) */}
          <div className="md:col-span-3">
            <PremiumSelect
              options={SORT_OPTIONS}
              value={initialSort || 'Featured'}
              onChange={handleSortChange}
              placeholder="Sort By"
            />
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-brand-black/5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-muted font-semibold font-sans">
                Active Filters:
              </span>

              {activeCollectionName && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-brand-offwhite border border-brand-black/10 text-[11px] text-brand-black font-sans">
                  <span>Collection: {activeCollectionName}</span>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange('All')}
                    className="hover:text-brand-green cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {selectedGender && selectedGender !== 'All' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-brand-offwhite border border-brand-black/10 text-[11px] text-brand-black font-sans">
                  <span>Gender: {selectedGender}</span>
                  <button
                    type="button"
                    onClick={() => handleGenderChange('All')}
                    className="hover:text-brand-green cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {search && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-brand-offwhite border border-brand-black/10 text-[11px] text-brand-black font-sans">
                  <span>Search: &ldquo;{search}&rdquo;</span>
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="hover:text-brand-green cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={clearAllFilters}
              className="text-[11px] font-medium text-brand-green hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              <X size={13} /> Reset All
            </button>
          </div>
        )}
      </div>

      {/* ─── Result Counter & Headline ─────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-brand-black/5">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl text-brand-black">
            {activeCollectionName || (selectedGender && selectedGender !== 'All' ? `${selectedGender} Fragrances` : 'All Fragrances')}
          </h2>
          <p className="text-brand-muted text-xs font-sans mt-0.5">
            Showing {products.length} of {totalProducts} creations
            {isPending && <span className="ml-2 text-brand-green font-medium animate-pulse">Filtering…</span>}
          </p>
        </div>
      </div>

      {/* ─── The Product Grid (2 cols mobile, 3 cols tablet, 4 cols desktop) ─── */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard
                product={{
                  id: product.id,
                  name: product.name,
                  brand: product.brand,
                  price: product.price,
                  imageURL: product.imageURL,
                  category: product.category,
                  topNote: product.topNote,
                  gender: product.gender,
                  isSpecialEdition: product.isSpecialEdition,
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        /* ─── Beautiful Empty State ───────────────────────────────────── */
        <div className="text-center py-24 sm:py-32 px-6 bg-brand-light rounded-md border border-brand-black/5 shadow-soft-sm max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-brand-white border border-brand-black/10 flex items-center justify-center mx-auto mb-4 text-brand-muted">
            <Sparkles size={20} />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-brand-black mb-2">
            No Fragrances Found
          </h3>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans mb-8 max-w-md mx-auto">
            No fragrances found matching your criteria. Try adjusting your filters or clearing your search term.
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="px-8 py-3.5 bg-brand-black text-brand-white text-[11px] uppercase tracking-[0.2em] font-semibold rounded-xs hover:bg-brand-green transition-colors cursor-pointer shadow-soft-sm"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* ─── Server-Side Pagination Bar ───────────────────────────────── */}
      {totalPages > 1 && (
        <div className="mt-16 pt-8 border-t border-brand-black/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
          <span className="text-xs text-brand-muted tracking-wide">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1 || isPending}
              className="p-2 border border-brand-black/10 text-brand-black rounded-xs hover:border-brand-green hover:text-brand-green disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Previous Page"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => handlePageChange(pg)}
                disabled={isPending}
                className={`w-8 h-8 text-xs font-semibold rounded-xs transition-colors cursor-pointer ${
                  currentPage === pg
                    ? 'bg-brand-black text-brand-white font-bold'
                    : 'border border-brand-black/10 text-brand-charcoal hover:border-brand-green hover:text-brand-green'
                }`}
              >
                {pg}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages || isPending}
              className="p-2 border border-brand-black/10 text-brand-black rounded-xs hover:border-brand-green hover:text-brand-green disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Next Page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
