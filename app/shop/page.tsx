'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/data';
import { Search, SlidersHorizontal, ShoppingBag, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/context/StoreContext';

export default function ShopPage() {
  const { addToCart } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['All', 'For Him', 'For Her', 'Unisex'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             p.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'Price: Low to High') return parseInt(a.price.slice(1)) - parseInt(b.price.slice(1));
        if (sortBy === 'Price: High to Low') return parseInt(b.price.slice(1)) - parseInt(a.price.slice(1));
        return 0; // Default to Featured
      });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <main className="min-h-screen bg-brand-cream">
      <Navbar />
      
      {/* Page Header */}
      <section className="pt-32 pb-12 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-brand-charcoal/40 mb-4">
                <Link href="/" className="hover:text-brand-burgundy transition-colors">Home</Link>
                <span>/</span>
                <span className="text-brand-burgundy">Shop All</span>
              </nav>
              <h1 className="text-5xl md:text-7xl font-serif text-brand-black tracking-tight">
                The <span className="italic">Collection</span>
              </h1>
            </div>
            <div className="text-brand-charcoal/60 text-sm max-w-xs font-light italic">
              "Every scent tells a story. Discover yours among our masterfully crafted signatures."
            </div>
          </motion.div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="sticky top-[80px] z-30 bg-white border-y border-brand-burgundy/5 px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/40" size={16} />
            <input 
              type="text" 
              placeholder="Search fragrances..."
              className="w-full bg-brand-cream/50 py-3 pl-12 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-brand-burgundy/20 rounded-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between w-full md:w-auto space-x-8">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-widest text-brand-charcoal/40">Sort:</span>
              <select 
                className="bg-transparent text-[10px] uppercase tracking-widest font-bold focus:outline-none cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold hover:text-brand-burgundy transition-colors"
            >
              <SlidersHorizontal size={14} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="max-w-7xl mx-auto pt-6 flex flex-wrap gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 text-[10px] uppercase tracking-widest border transition-all duration-300 ${
                      selectedCategory === cat 
                        ? 'bg-brand-burgundy text-white border-brand-burgundy' 
                        : 'bg-transparent text-brand-black border-brand-burgundy/10 hover:border-brand-burgundy'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Product Grid */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden mb-6 bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-burgundy/0 group-hover:bg-brand-burgundy/10 transition-colors duration-500" />
                    
                    {/* Hover Add to Cart */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product.id);
                        }}
                        className="w-full bg-white text-brand-black py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-brand-burgundy hover:text-white transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={14} />
                        Add to Cart
                      </button>
                    </div>
                  </Link>

                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-serif text-brand-black">{product.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-brand-charcoal/40 font-bold mb-3">{product.category}</p>
                    </div>
                    <span className="text-sm font-medium tracking-widest text-brand-burgundy">{product.price}</span>
                  </div>
                  <p className="text-xs text-brand-charcoal/60 line-clamp-2 italic mb-4">{product.description}</p>
                  
                  <Link 
                    href={`/product/${product.id}`}
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-brand-burgundy group/link"
                  >
                    View Details
                    <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-40 text-center">
              <h2 className="text-3xl font-serif text-brand-black mb-4">No results found</h2>
              <p className="text-brand-charcoal/60 mb-8">We couldn't find any fragrances matching your criteria.</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                className="px-10 py-4 bg-brand-burgundy text-white text-[10px] uppercase tracking-widest font-bold hover:bg-brand-black transition-colors"
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
