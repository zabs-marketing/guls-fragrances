import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  categoryName: string;
  name: string;
  target: string;
  description: string;
  imageSrc: string;
  productId: number;
}

export function ProductCard({ categoryName, name, target, description, imageSrc, productId }: ProductCardProps) {
  return (
    <Link href={`/product/${productId}`} className="group block w-full h-[460px] shadow-soft-md hover:shadow-soft-xl transition-all duration-300">
      
      {/* Top Half: Cream/Gold Background */}
      {/* Removed padding so the bottle can span the full height and sit on the baseline */}
      <div className="relative h-[55%] w-full bg-gradient-to-b from-[#F3E9D7] to-[#E3CFA8] border-b border-[#C9A66B] overflow-hidden pt-4">
        <div className="relative w-full h-full">
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain object-bottom drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
      
      {/* Bottom Half: Dark Green Background */}
      <div className="relative h-[45%] w-full bg-[#183629] p-6 flex flex-col justify-start text-left">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#C9A66B] mb-2 font-semibold">
          {categoryName}
        </p>
        <h3 className="font-serif text-[24px] font-bold text-[#F3E9D7] tracking-wide mb-1 leading-tight group-hover:text-[#C9A66B] transition-colors">
          {name}
        </h3>
        <p className="font-sans text-[12px] italic text-[#D8C6A5] mb-3">
          {target}
        </p>
        <p className="font-sans text-[13px] leading-relaxed text-[#F3E9D7]/80 line-clamp-3">
          {description}
        </p>
      </div>
    </Link>
  );
}