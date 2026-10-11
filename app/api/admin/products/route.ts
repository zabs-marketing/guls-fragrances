import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdminSession } from '@/lib/auth-helpers';
import { productSchema } from '@/lib/validators';

// GET /api/admin/products – list all products with category name
export async function GET() {
  const unauth = await requireAdminSession();
  if (unauth) return unauth;

  try {
    const products = await prisma.product.findMany({
      orderBy: { name: 'asc' },
      include: { category: { select: { id: true, name: true } } },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error('[GET /api/admin/products]', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/admin/products – create a product
export async function POST(req: Request) {
  const unauth = await requireAdminSession();
  if (unauth) return unauth;

  try {
    const body = await req.json();
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });
    }

    const data = parsed.data;

    const product = await prisma.product.create({
      data: {
        name: data.name,
        brand: data.brand,
        description: data.description,
        price: parseFloat(data.price),
        stockQuantity: parseInt(data.stockQuantity),
        categoryId: parseInt(data.categoryId),
        imageURL: data.imageURL || null,
        topNote: data.topNote || null,
        heartNote: data.heartNote || null,
        baseNote: data.baseNote || null,
        ingredients: data.ingredients || null,
        isSpecialEdition: data.isSpecialEdition,
        specialEditionType: data.specialEditionType || null,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('[POST /api/admin/products]', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

