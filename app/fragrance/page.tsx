import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FragranceCatalog, { CatalogProduct } from '@/components/fragrance/FragranceCatalog';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface FragrancePageProps {
  searchParams: Promise<{
    collection?: string;
    search?: string;
    sort?: string;
    page?: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function FragrancePage({ searchParams }: FragrancePageProps) {
  const resolvedParams = await searchParams;
  const collection = resolvedParams.collection || '';
  const search = resolvedParams.search || '';
  const sort = resolvedParams.sort || 'Featured';
  const page = Math.max(1, parseInt(resolvedParams.page || '1') || 1);
  const pageSize = 12;

  // 1. Fetch only active categories from database
  const rawCategories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { id: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
      isActive: true,
    },
  });

  // 2. Build where filter for Products
  const where: Prisma.ProductWhereInput = {};

  if (collection && collection !== 'All') {
    const matchedCategory = rawCategories.find(
      (c) => c.slug.toLowerCase() === collection.toLowerCase()
    );
    if (matchedCategory) {
      where.categoryId = matchedCategory.id;
    }
  }

  if (search.trim()) {
    where.OR = [
      { name: { contains: search.trim() } },
      { brand: { contains: search.trim() } },
      { description: { contains: search.trim() } },
      { topNote: { contains: search.trim() } },
      { heartNote: { contains: search.trim() } },
      { baseNote: { contains: search.trim() } },
    ];
  }

  // 3. Sorting
  let orderBy: Prisma.ProductOrderByWithRelationInput = { name: 'asc' };
  if (sort === 'Price: Low to High') {
    orderBy = { price: 'asc' };
  } else if (sort === 'Price: High to Low') {
    orderBy = { price: 'desc' };
  }

  // 4. Server-Side Data Fetching
  const [totalCount, rawProducts] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    }),
  ]);

  // Format products with serialized number prices
  const products: CatalogProduct[] = rawProducts.map((p) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    description: p.description,
    price: Number(p.price),
    stockQuantity: p.stockQuantity,
    imageURL: p.imageURL,
    categoryId: p.categoryId,
    category: p.category,
    topNote: p.topNote,
    heartNote: p.heartNote,
    baseNote: p.baseNote,
    isSpecialEdition: p.isSpecialEdition,
    specialEditionType: p.specialEditionType,
  }));

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return (
    <main className="min-h-screen bg-brand-green-dark text-white selection:bg-brand-gold selection:text-brand-green-dark">
      <Navbar />

      {/* Page Hero Header */}
      <section className="pt-32 pb-10 px-6 md:px-14 bg-gradient-to-b from-black/80 to-brand-green-dark border-b border-brand-gold/10">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-white/40 mb-3">
            <span className="hover:text-brand-gold transition-colors">Home</span>
            <span>/</span>
            <span className="text-brand-gold">Fragrance Catalogue</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-white">
            Our <span className="italic text-brand-gold">Fragrance House</span>
          </h1>
          <p className="text-white/60 text-xs sm:text-sm mt-3 max-w-xl font-light">
            Explore handcrafted impressions and signature collections. Formulated with high-concentration essences for extraordinary longevity.
          </p>
        </div>
      </section>

      {/* Interactive Catalog Component */}
      <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-white/40">Loading collections…</div>}>
        <FragranceCatalog
          products={products}
          categories={rawCategories}
          totalProducts={totalCount}
          totalPages={totalPages}
          currentPage={page}
          selectedCollection={collection}
          searchQuery={search}
          sortBy={sort}
        />
      </Suspense>

      <Footer />
    </main>
  );
}