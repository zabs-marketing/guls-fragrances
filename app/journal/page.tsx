'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';

const categories = ['All', 'Fragrance Notes', 'Behind the Craft', 'Editorial', 'Art of Living'];

export default function JournalPage() {
  const { journalPosts } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = journalPosts.filter(
    (post) => activeCategory === 'All' || post.category === activeCategory
  );

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal font-serif">
      {/* Hero Banner */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center bg-brand-black text-brand-cream">
        <Image
          src="/images/hero-sections-reference.jpeg"
          alt="The Olfactive Journal"
          fill
          className="object-cover opacity-40"
          unoptimized
        />
        <div className="relative z-10 text-center px-4">
          <p className="text-brand-gold uppercase tracking-[0.2em] text-sm mb-4">
            THE OLFACTIVE JOURNAL
          </p>
          <h1 className="text-5xl md:text-7xl mb-6">Stories Behind the Scent</h1>
        </div>
      </section>

      {/* Category Filter Bar */}
      <nav className="border-b border-[#d6be96]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex flex-wrap justify-center space-x-8 py-6">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`uppercase tracking-wider text-sm transition-colors ${
                    activeCategory === category
                      ? 'text-brand-charcoal font-semibold border-b-2 border-brand-charcoal pb-1'
                      : 'text-gray-500 hover:text-brand-charcoal'
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Story */}
        {featuredPost && (
          <div className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center space-x-4 text-sm text-gray-500 uppercase tracking-wider mb-4">
                  <span>{featuredPost.date}</span>
                  <span>|</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <h2 className="text-4xl md:text-5xl mb-6">{featuredPost.title}</h2>
                <p className="text-lg text-gray-600 mb-8 font-sans">
                  {featuredPost.excerpt}
                </p>
                <Link
                  href={`/journal/${featuredPost.slug}`}
                  className="inline-block text-brand-black uppercase tracking-widest text-sm font-semibold hover:text-brand-gold transition-colors"
                >
                  READ STORY →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        {gridPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {gridPosts.map((post) => (
              <article key={post.slug} className="group cursor-pointer">
                <Link href={`/journal/${post.slug}`}>
                  <div className="relative aspect-[3/4] mb-6 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-gray-500 uppercase tracking-widest mb-3">
                    <span>{post.category}</span>
                  </div>
                  <h3 className="text-2xl mb-3 group-hover:text-brand-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 font-sans text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
