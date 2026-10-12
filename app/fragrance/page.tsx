import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShopHero from '@/components/fragrance/ShopHero';
import FragranceCatalog, { CatalogProduct } from '@/components/fragrance/FragranceCatalog';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface FragrancePageProps {
  searchParams: Promise<{
    collection?: string;
    category?: string;
    gender?: string;
    search?: string;
    q?: string;
    sort?: string;
    page?: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function FragrancePage({ searchParams }: FragrancePageProps) {
  const resolvedParams = await searchParams;
  const collection = resolvedParams.collection || resolvedParams.category || '';
  const gender = resolvedParams.gender || '';
  const search = resolvedParams.q || resolvedParams.search || '';
  const sort = resolvedParams.sort || 'Featured';
  const page = Math.max(1, parseInt(resolvedParams.page || '1') || 1);
  const pageSize = 12;

  // 1. Fetch categories from database: active categories + signature editions specifically for header
  const rawCategories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { id: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
      isActive: true,
      isSignatureEdition: true,
    },
  });

  const signatureEditions = rawCategories.filter((c) => c.isSignatureEdition);

  // 2. Build where filter for Products (Category, Gender, Search)
  const where: Prisma.ProductWhereInput = {};

  if (collection && collection !== 'All') {
    const matchedCategory = rawCategories.find(
      (c) => c.slug.toLowerCase() === collection.toLowerCase()
    );
    if (matchedCategory) {
      where.categoryId = matchedCategory.id;
    }
  }

  if (gender && gender !== 'All') {
    where.gender = gender;
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
  let orderBy: Prisma.ProductOrderByWithRelationInput = { id: 'desc' };
  if (sort === 'Price: Low to High') {
    orderBy = { price: 'asc' };
  } else if (sort === 'Price: High to Low') {
    orderBy = { price: 'desc' };
  } else if (sort === 'Newest') {
    orderBy = { id: 'desc' };
  } else if (sort === 'Featured') {
    orderBy = { id: 'asc' };
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
    gender: p.gender,
  }));

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return (
    <main className="min-h-screen bg-brand-white text-brand-black selection:bg-brand-green/10 selection:text-brand-green">
      <Navbar />

      {/* Sleek Native Shop Hero with Minimal Signature Edition Pills */}
      <ShopHero signatureEditions={signatureEditions} activeCategory={collection} />

      {/* Interactive Catalog Component */}
      <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-brand-muted font-sans text-xs">Loading collections…</div>}>
        <FragranceCatalog
          products={products}
          categories={rawCategories}
          totalProducts={totalCount}
          totalPages={totalPages}
          currentPage={page}
          selectedCollection={collection}
          selectedGender={gender}
          searchQuery={search}
          sortBy={sort}
        />
      </Suspense>

      <Footer />
    </main>
  );
}