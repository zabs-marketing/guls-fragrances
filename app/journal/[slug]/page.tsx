'use client';

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { products } from '@/lib/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function SingleArticlePage({ params }: PageProps) {
  const { journalPosts } = useStore();
  const { slug } = use(params);

  const post = journalPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream text-brand-charcoal font-serif">
        <h1 className="text-3xl">Article not found.</h1>
      </div>
    );
  }

  const featuredProducts = post.featuredScents
    ? products.filter((product) => post.featuredScents?.includes(product.id))
    : [];

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal font-serif">
      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 text-center">
        <p className="text-brand-gold uppercase tracking-widest text-sm mb-6">
          {post.category}
        </p>
        <h1 className="text-5xl md:text-7xl mb-8 leading-tight">{post.title}</h1>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 uppercase tracking-wider font-sans">
          <span>{post.date}</span>
          <span>|</span>
          <span>{post.readTime}</span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative w-full aspect-video">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-stone font-serif mb-24">
        <p className="text-2xl leading-relaxed text-gray-700 italic mb-12 text-center">
          {post.excerpt}
        </p>
        
        {post.content ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <div className="space-y-8 text-gray-800 leading-loose">
            <p>
              The journey of creating a timeless fragrance begins long before the first drop is blended. It starts in the fields, where the finest botanical ingredients are cultivated with care and harvested at the perfect moment to capture their true essence.
            </p>
            <blockquote className="border-l-4 border-brand-gold pl-6 py-2 my-12 text-3xl text-brand-charcoal italic">
              "A great fragrance is not just a scent, but an emotion captured in a bottle."
            </blockquote>
            <p>
              Through meticulous distillation and blending, these raw materials are transformed into complex symphonies of scent. Each note is carefully balanced to create a narrative that unfolds over time, revealing different facets as it interacts with the skin.
            </p>
            <p>
              We invite you to explore the stories behind our creations and discover the artistry that makes each fragrance unique.
            </p>
          </div>
        )}
      </article>

      {/* Featured Scents Strip */}
      {featuredProducts.length > 0 && (
        <section className="bg-brand-black text-brand-cream py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl text-brand-gold mb-4">
                Featured Scents in This Story
              </h2>
              <p className="text-gray-400 font-sans max-w-2xl mx-auto">
                Discover the fragrances that inspired this piece.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group block">
                  <div className="bg-[#111] p-6 rounded-lg text-center h-full transition-transform duration-300 group-hover:-translate-y-2">
                    <div className="relative aspect-square w-full mb-6">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                        unoptimized
                      />
                    </div>
                    <p className="text-brand-gold uppercase tracking-widest text-xs mb-2">
                      {product.brand}
                    </p>
                    <h3 className="text-2xl mb-2 group-hover:text-white transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 font-sans text-sm mb-4">
                      {product.category}
                    </p>
                    <p className="text-lg">{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
