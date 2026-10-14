import prisma from '@/lib/prisma';
import { products as hardcodedProducts, collections as hardcodedCollections } from '@/lib/data';
import ProductDetailView, { FormattedProduct } from '@/components/product/ProductDetailView';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = await params;
  let formattedProduct: FormattedProduct | null = null;

  // 1. Try fetching by numeric ID from database
  const numericId = parseInt(id);
  if (!isNaN(numericId)) {
    const dbProduct = await prisma.product.findUnique({
      where: { id: numericId },
      include: { category: true },
    });

    if (dbProduct) {
      formattedProduct = {
        id: dbProduct.id,
        name: dbProduct.name,
        brand: dbProduct.brand,
        description: dbProduct.description,
        price: Number(dbProduct.price),
        image: dbProduct.imageURL || '/images/placeholder-image.jpg',
        category: dbProduct.category.slug,
        categoryTitle: dbProduct.category.name,
        topNote: dbProduct.topNote,
        heartNote: dbProduct.heartNote,
        baseNote: dbProduct.baseNote,
        ingredients: dbProduct.ingredients,
        isSpecialEdition: dbProduct.isSpecialEdition,
        specialEditionType: dbProduct.specialEditionType,
      };
    }
  }

  // 2. Fallback to matching hardcoded item or slug
  if (!formattedProduct) {
    // Check if ID matches name or slug in DB
    const dbProductByName = await prisma.product.findFirst({
      where: {
        OR: [
          { name: { equals: id } },
          { name: { contains: id.replace(/-/g, ' ') } },
        ],
      },
      include: { category: true },
    });

    if (dbProductByName) {
      formattedProduct = {
        id: dbProductByName.id,
        name: dbProductByName.name,
        brand: dbProductByName.brand,
        description: dbProductByName.description,
        price: Number(dbProductByName.price),
        image: dbProductByName.imageURL || '/images/placeholder-image.jpg',
        category: dbProductByName.category.slug,
        categoryTitle: dbProductByName.category.name,
        topNote: dbProductByName.topNote,
        heartNote: dbProductByName.heartNote,
        baseNote: dbProductByName.baseNote,
        ingredients: dbProductByName.ingredients,
        isSpecialEdition: dbProductByName.isSpecialEdition,
        specialEditionType: dbProductByName.specialEditionType,
      };
    } else {
      // Check hardcoded data
      const hardcoded = hardcodedProducts.find((p) => p.id === id);
      if (hardcoded) {
        const coll = hardcodedCollections.find((c) => c.id === hardcoded.category);
        formattedProduct = {
          id: hardcoded.id,
          name: hardcoded.name,
          brand: hardcoded.brand,
          description: hardcoded.description,
          price: hardcoded.price,
          image: hardcoded.image,
          category: hardcoded.category,
          categoryTitle: coll ? coll.title : hardcoded.category,
          topNote: hardcoded.topNote,
          heartNote: hardcoded.heartNote,
          baseNote: hardcoded.baseNote,
          ingredients: hardcoded.ingredients,
          isSpecialEdition: hardcoded.isSpecialEdition,
          specialEditionType: hardcoded.specialEditionType || null,
        };
      }
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#F7F7F5] text-[#29251D] selection:bg-[#C9A66B]/30 selection:text-[#183629]">
      <Navbar />
      
      <div className="flex-grow pt-[90px]">
        {formattedProduct ? (
          <ProductDetailView product={formattedProduct} />
        ) : (
          /* --- Luxury Empty State (Not Found) --- */
          <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#183629] text-[#C9A66B] flex items-center justify-center mb-6 shadow-md font-serif text-3xl">
              !
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-[#183629] mb-4">
              Fragrance Not Found
            </h1>
            <p className="font-sans text-[14px] text-[#8C7A5B] max-w-md mx-auto mb-8 leading-relaxed">
              We couldn&apos;t find the specific fragrance you&apos;re looking for. It may have been archived or the link might be incorrect.
            </p>
            <Link 
              href="/fragrance"
              className="inline-block tracking-[0.2em] text-[11px] px-8 py-4 bg-[#183629] text-[#F3E9D7] hover:bg-[#11261d] hover:text-[#C9A66B] transition-colors uppercase font-semibold shadow-sm"
            >
              Return to Collection
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}