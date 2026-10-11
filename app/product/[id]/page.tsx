import prisma from '@/lib/prisma';
import { products as hardcodedProducts, collections as hardcodedCollections } from '@/lib/data';
import ProductDetailView, { FormattedProduct } from '@/components/product/ProductDetailView';

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

  return <ProductDetailView product={formattedProduct} />;
}