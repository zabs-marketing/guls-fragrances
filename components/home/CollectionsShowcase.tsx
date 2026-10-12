import React from 'react';
import prisma from '@/lib/prisma';
import PremiumCard from '@/components/ui/PremiumCard';
import Button from '@/components/ui/Button';

export default async function CollectionsShowcase() {
  // Fetch active categories flagged as Signature Editions dynamically from database
  const editions = await prisma.category.findMany({
    where: {
      isActive: true,
      isSignatureEdition: true,
    },
    orderBy: { id: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
    },
  });

  if (!editions || editions.length === 0) {
    return null;
  }

  // Helper metadata tags for display
  const editionTaglines: Record<string, { number: string; subtitle: string; tagline: string }> = {
    'masculine-energy': {
      number: '01',
      subtitle: 'Masculine Energy',
      tagline: 'For The Modern Gentleman',
    },
    'pour-elle': {
      number: '02',
      subtitle: 'Pour Elle',
      tagline: 'For Her',
    },
    'for-all': {
      number: '03',
      subtitle: 'N°01_For All',
      tagline: 'Unisex',
    },
    'arabesques': {
      number: '04',
      subtitle: 'Arabesques',
      tagline: 'The Oud Collection',
    },
  };

  return (
    <section id="collections" className="relative w-full bg-brand-light py-28 md:py-36 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.3em] text-brand-muted mb-3 inline-block">
            Curated Decades
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-black tracking-tight">
            Signature Editions
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-brand-muted tracking-wide max-w-md mx-auto">
            Our exclusive, curated collection of distinct olfactory realms designed to embody distinct characters, moods, and eras.
          </p>
        </div>

        {/* Dynamic Grid with PremiumCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {editions.map((edition, idx) => {
            const meta = editionTaglines[edition.slug] || {
              number: `0${idx + 1}`,
              subtitle: edition.name,
              tagline: "Signature House Blend",
            };

            return (
              <div key={edition.id} className="h-full">
                <PremiumCard
                  elevation="elevated"
                  hoverLift={true}
                  className="h-full flex flex-col items-center text-center p-8 md:p-10 justify-between group"
                >
                  {/* Subtle Top Accent Indicator */}
                  <div className="w-full flex justify-between items-center mb-10">
                    <span className="font-serif text-sm tracking-widest text-brand-black/30 group-hover:text-brand-green transition-colors">
                      {meta.number}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-black/10 group-hover:bg-brand-green transition-colors" />
                  </div>

                  {/* Content Block */}
                  <div className="my-auto flex flex-col items-center">
                    <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-brand-muted mb-2">
                      {edition.name}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-brand-black mb-3 group-hover:text-brand-black transition-colors">
                      {meta.subtitle}
                    </h3>
                    <div className="w-8 h-[1px] bg-brand-black/10 group-hover:bg-brand-green/40 transition-colors my-3" />
                    <p className="text-xs font-sans tracking-widest uppercase text-brand-charcoal/70">
                      {meta.tagline}
                    </p>
                  </div>

                  {/* Action CTA */}
                  <div className="w-full mt-10">
                    <Button
                      href={`/fragrance?collection=${encodeURIComponent(edition.slug)}`}
                      variant="secondary"
                      size="sm"
                      fullWidth
                      className="text-[10px] tracking-[0.25em] py-3 group-hover:bg-brand-green group-hover:text-brand-white group-hover:border-brand-green transition-all"
                    >
                      View Edition
                    </Button>
                  </div>
                </PremiumCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
