'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import PremiumCard from '@/components/ui/PremiumCard';
import { useStore } from '@/context/StoreContext';

export interface UniversalProduct {
  id: number | string;
  name: string;
  brand?: string;
  price: number;
  imageURL?: string | null;
  category?: { name: string; slug?: string } | null;
  topNote?: string | null;
  gender?: string | null;
  isSpecialEdition?: boolean;
}

interface ProductCardProps {
  product: UniversalProduct;
  className?: string;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useStore();

  const price = typeof product.price === 'number' ? product.price : Number(product.price);
  const fallbackUrl = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop';
  const initialImage = product.imageURL || fallbackUrl;
  const [imgSrc, setImgSrc] = React.useState(initialImage);
  const categoryName = product.category?.name || "Gul's Fragrance";

  React.useEffect(() => {
    setImgSrc(product.imageURL || fallbackUrl);
  }, [product.imageURL]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(String(product.id), 1, {
      name: product.name,
      price: price,
      image: imgSrc,
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(String(product.id), 1, {
      name: product.name,
      price: price,
      image: imgSrc,
    });
    router.push('/checkout');
  };

  return (
    <Link href={`/product/${product.id}`} className={`block h-full group ${className}`}>
      <PremiumCard
        elevation="elevated"
        hoverLift={true}
        className="h-full flex flex-col justify-between p-4 sm:p-5"
      >
        {/* Product Image Container with Zoom effect */}
        <div className="relative aspect-[4/5] w-full bg-brand-offwhite rounded-sm overflow-hidden mb-4">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            onError={() => setImgSrc(fallbackUrl)}
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Special Edition or Gender Pill */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
            {product.isSpecialEdition && (
              <span className="bg-brand-green text-brand-white text-[8px] sm:text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-xs shadow-soft-sm">
                Special Edition
              </span>
            )}
            {product.gender && (
              <span className="bg-black/60 backdrop-blur-xs text-white text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-xs">
                {product.gender}
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-grow justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-brand-muted font-sans block mb-1">
              {categoryName}
            </span>
            <h3 className="font-serif text-base sm:text-lg text-brand-black group-hover:text-brand-green transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
            {product.topNote && (
              <p className="text-[11px] text-brand-muted font-sans line-clamp-1 mb-3">
                {product.topNote}
              </p>
            )}
          </div>

          {/* Price & Action Row */}
          <div className="pt-3 border-t border-brand-black/5 mt-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans font-semibold text-xs sm:text-sm text-brand-black tracking-wide">
                Rs. {price.toLocaleString()}
              </span>
            </div>

            {/* Bottom Actions: Buy Now text button + Add to Cart icon button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-grow py-2.5 px-3 bg-brand-black text-brand-white text-[10px] uppercase tracking-[0.2em] font-semibold rounded-xs hover:bg-brand-green transition-colors active:scale-95 text-center cursor-pointer"
              >
                Buy Now
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                aria-label="Add to cart"
                className="w-9 h-9 shrink-0 border border-brand-black/20 text-brand-black flex items-center justify-center rounded-xs hover:border-brand-green hover:text-brand-green hover:bg-brand-green/5 transition-all active:scale-95 cursor-pointer"
              >
                <ShoppingBag size={14} strokeWidth={1.7} />
              </button>
            </div>
          </div>
        </div>
      </PremiumCard>
    </Link>
  );
}

