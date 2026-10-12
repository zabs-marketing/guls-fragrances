import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with realistic fragrance catalogue...')

  // 1. Create or ensure default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gulscollection.com' },
    update: {},
    create: {
      email: 'admin@gulscollection.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('Admin user ready:', admin.email)

  // 2. Create Categories: 4 Signature Editions + 3 Standard Demographics
  const categoriesData = [
    {
      name: 'Masculine Energy',
      slug: 'masculine-energy',
      image: '/images/gen-x.jpeg',
      isActive: true,
      isSignatureEdition: true,
    },
    {
      name: 'Pour Elle',
      slug: 'pour-elle',
      image: '/images/bring-her.jpeg',
      isActive: true,
      isSignatureEdition: true,
    },
    {
      name: 'N°01 - For All',
      slug: 'for-all',
      image: '/images/after-5.jpeg',
      isActive: true,
      isSignatureEdition: true,
    },
    {
      name: 'Arabesques',
      slug: 'arabesques',
      image: '/images/syfar.jpeg',
      isActive: true,
      isSignatureEdition: true,
    },
    {
      name: 'Men',
      slug: 'men',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop',
      isActive: true,
      isSignatureEdition: false,
    },
    {
      name: 'Women',
      slug: 'women',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000&auto=format&fit=crop',
      isActive: true,
      isSignatureEdition: false,
    },
    {
      name: 'Unisex',
      slug: 'unisex',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop',
      isActive: true,
      isSignatureEdition: false,
    },
  ]

  const categoryMap = new Map<string, number>()

  for (const cat of categoriesData) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        image: cat.image,
        isActive: cat.isActive,
        isSignatureEdition: cat.isSignatureEdition,
      },
      create: cat,
    })
    categoryMap.set(cat.slug, record.id)
    console.log(`Category seeded: ${record.name} (#${record.id})`)
  }

  // 3. Products seed data
  const productsData = [
    {
      name: 'BAOW',
      brand: "Gul's",
      description: 'Sweet, fruity and irresistibly charismatic. A scent that demands attention.',
      price: 180.00,
      stockQuantity: 45,
      imageURL: '/images/baow.jpeg',
      categorySlug: 'masculine-energy',
      topNote: 'Pineapple, Granny Smith Apple, Mandarin',
      heartNote: 'Vanilla, Cedar, Oakmoss',
      baseNote: 'Ambergris, Caramel, Dry Woods, Musk',
      ingredients: 'Alcohol Denat., Parfum, Aqua, Limonene, Linalool, Citronellol, Coumarin, Citral, Geraniol.',
      isSpecialEdition: false,
      specialEditionType: null,
    },
    {
      name: 'Gen X',
      brand: "Gul's",
      description: 'Bold, fresh and timeless. For the man who leads his own era.',
      price: 195.00,
      stockQuantity: 60,
      imageURL: '/images/gen-x.jpeg',
      categorySlug: 'masculine-energy',
      topNote: 'Lime, Galbanum, Gin & Tonic Accord',
      heartNote: 'Nutmeg, Cypress, Mint',
      baseNote: 'Cedarwood, Vetiver, Amber',
      ingredients: 'Alcohol Denat., Parfum, Aqua, Limonene, Linalool, Alpha-Isomethyl Ionone, Citronellol, Coumarin.',
      isSpecialEdition: false,
      specialEditionType: null,
    },
    {
      name: 'Hassan Gul',
      brand: "Gul's",
      description: 'A powerful, sensual and refined signature for a true gentleman.',
      price: 240.00,
      stockQuantity: 25,
      imageURL: '/images/hassan-gul.jpeg',
      categorySlug: 'masculine-energy',
      topNote: 'Bergamot, Mandarin, Pink Pepper',
      heartNote: 'Lavender, Orris, Cinnamon',
      baseNote: 'Black Vanilla, Leather, Patchouli, Tonka Bean',
      ingredients: 'Alcohol Denat., Parfum, Aqua, Linalool, Limonene, Coumarin, Citronellol, Alpha-Isomethyl Ionone.',
      isSpecialEdition: true,
      specialEditionType: 'Male',
    },
    {
      name: 'Bring Her',
      brand: "Gul's",
      description: 'Soft, sensual and addictively sweet. The ultimate feminine trail.',
      price: 185.00,
      stockQuantity: 35,
      imageURL: '/images/bring-her.jpeg',
      categorySlug: 'pour-elle',
      topNote: 'Red Fruits, Orange, Blackcurrant',
      heartNote: 'Marshmallow, Lily Of The Valley, Jasmine',
      baseNote: 'Vanilla, Musk, Amber',
      ingredients: 'Alcohol Denat., Parfum, Aqua, Benzyl Salicylate, Limonene, Linalool, Hydroxycitronellal.',
      isSpecialEdition: false,
      specialEditionType: null,
    },
    {
      name: 'SO',
      brand: "Gul's",
      description: 'A delicious burst of berries and sweetness. Playful, feminine, unforgettable.',
      price: 190.00,
      stockQuantity: 40,
      imageURL: '/images/so.jpeg',
      categorySlug: 'pour-elle',
      topNote: 'Strawberry, Raspberry, Blackberry, Cherry, Mandarin, Lemon',
      heartNote: 'Violet, Jasmine',
      baseNote: 'Musk, Vanilla, Cashmeran, Amber, Oakmoss, Patchouli',
      ingredients: 'Alcohol Denat., Parfum, Aqua, Limonene, Linalool, Citronellol, Geraniol, Benzyl Salicylate.',
      isSpecialEdition: false,
      specialEditionType: null,
    },
    {
      name: 'Jaweria Gul',
      brand: "Gul's",
      description: 'Elegance in a bottle. Floral, graceful and luxurious.',
      price: 230.00,
      stockQuantity: 20,
      imageURL: '/images/jaweria-gul.jpeg',
      categorySlug: 'pour-elle',
      topNote: 'Pear Blossom, Red Berries, Mandarin',
      heartNote: 'White Gardenia, Jasmine, Frangipani',
      baseNote: 'Brown Sugar, Patchouli, Musk',
      ingredients: 'Alcohol Denat., Parfum, Aqua, Limonene, Hydroxycitronellal, Linalool, Citronellol, Coumarin.',
      isSpecialEdition: true,
      specialEditionType: 'Female',
    },
    {
      name: 'Gen Z',
      brand: "Gul's",
      description: 'Bold, spicy and extreme. An icon of the new generation.',
      price: 175.00,
      stockQuantity: 50,
      imageURL: '/images/gen-z.jpeg',
      categorySlug: 'for-all',
      topNote: 'Nutmeg, Cinnamon, Cardamom, Grapefruit',
      heartNote: 'Lavender',
      baseNote: 'Licorice, Sandalwood, Amber, Patchouli, Haitian Vetiver',
      ingredients: 'Alcohol Denat., Parfum, Aqua, Limonene, Linalool, Coumarin, Citronellol, Citral, Geraniol.',
      isSpecialEdition: false,
      specialEditionType: null,
    },
    {
      name: 'After 5',
      brand: "Gul's",
      description: 'Fresh, clean and endearingly versatile. Your everyday signature.',
      price: 165.00,
      stockQuantity: 55,
      imageURL: '/images/after-5.jpeg',
      categorySlug: 'for-all',
      topNote: 'Lemon, Green Notes, Bergamot, Mandarin, Pineapple, Papaya',
      heartNote: 'Jasmine, Violet, Rose, Nutmeg, Lily, Orris',
      baseNote: 'Musk, Amber, Sandalwood, Cedar, Oakmoss',
      ingredients: 'Alcohol Denat., Parfum, Aqua, Limonene, Linalool, Ethylhexyl Methoxycinnamate, Geraniol.',
      isSpecialEdition: false,
      specialEditionType: null,
    },
    {
      name: 'Syfar',
      brand: "Gul's",
      description: 'Deep, smoky and luxurious. An oriental masterpiece.',
      price: 210.00,
      stockQuantity: 30,
      imageURL: '/images/syfar.jpeg',
      categorySlug: 'arabesques',
      topNote: 'Bergamot, Pink Pepper, Tangerine, Oud, Honey',
      heartNote: 'Rose, Saffron, Jasmine, Patchouli, Orange Blossom',
      baseNote: 'Amber, Leather, Sandalwood, Agarwood, Musk, Raspberry',
      ingredients: 'Alcohol Denat., Parfum, Aqua, Limonene, Linalool, Citronellol, Geraniol, Hydroxycitronellal.',
      isSpecialEdition: false,
      specialEditionType: null,
    },
    {
      name: 'Laizon',
      brand: "Gul's",
      description: 'A majestic fusion of citrus, oud and vanilla. Royalty redefined.',
      price: 220.00,
      stockQuantity: 35,
      imageURL: '/images/laizon.jpeg',
      categorySlug: 'arabesques',
      topNote: 'Grapefruit, Saffron, Lemon',
      heartNote: 'Cedarwood, Nutmeg, Oud',
      baseNote: 'Patchouli, Sandalwood',
      ingredients: 'Alcohol Denat., Parfum, Aqua, Alpha-Isomethyl Ionone, Limonene, Linalool, Coumarin, Eugenol.',
      isSpecialEdition: false,
      specialEditionType: null,
    },
  ]

  for (const item of productsData) {
    const categoryId = categoryMap.get(item.categorySlug)
    if (!categoryId) continue

    const existing = await prisma.product.findFirst({
      where: { name: item.name },
    })

    if (!existing) {
      await prisma.product.create({
        data: {
          name: item.name,
          brand: item.brand,
          description: item.description,
          price: item.price,
          stockQuantity: item.stockQuantity,
          imageURL: item.imageURL,
          categoryId: categoryId,
          topNote: item.topNote,
          heartNote: item.heartNote,
          baseNote: item.baseNote,
          ingredients: item.ingredients,
          isSpecialEdition: item.isSpecialEdition,
          specialEditionType: item.specialEditionType,
        },
      })
      console.log(`Product created: ${item.name}`)
    } else {
      await prisma.product.update({
        where: { id: existing.id },
        data: {
          brand: item.brand,
          description: item.description,
          price: item.price,
          stockQuantity: item.stockQuantity,
          imageURL: item.imageURL,
          categoryId: categoryId,
          topNote: item.topNote,
          heartNote: item.heartNote,
          baseNote: item.baseNote,
          ingredients: item.ingredients,
          isSpecialEdition: item.isSpecialEdition,
          specialEditionType: item.specialEditionType,
        },
      })
      console.log(`Product updated: ${item.name}`)
    }
  }

  // 4. Seed initial realistic orders
  const sampleOrders = [
    {
      orderNumber: 'GUL-2026-10492',
      customerName: 'Hamza Tariq',
      customerEmail: 'hamza.tariq@gmail.com',
      customerPhone: '+92 300 8274192',
      shippingAddress: 'House 42, Street 7, Phase 6, DHA, Karachi',
      status: 'PENDING' as const,
      totalAmount: 435.00,
      cancellationReason: null,
      items: [
        { productName: 'Hassan Gul', quantity: 1, price: 240.00 },
        { productName: 'Gen X', quantity: 1, price: 195.00 },
      ],
    },
    {
      orderNumber: 'GUL-2026-10493',
      customerName: 'Ayesha Siddiqui',
      customerEmail: 'ayesha.s@outlook.com',
      customerPhone: '+92 321 4459821',
      shippingAddress: 'Apartment 5B, Creek Vistas, Phase 8, DHA, Karachi',
      status: 'CONFIRMED' as const,
      totalAmount: 420.00,
      cancellationReason: null,
      items: [
        { productName: 'Bring Her', quantity: 1, price: 185.00 },
        { productName: 'Jaweria Gul', quantity: 1, price: 230.00 },
      ],
    },
    {
      orderNumber: 'GUL-2026-10494',
      customerName: 'Bilal Khan',
      customerEmail: 'bilalkhan.pk@gmail.com',
      customerPhone: '+92 333 9120485',
      shippingAddress: 'B-14, Block 4, Clifton, Karachi',
      status: 'DISPATCHED' as const,
      totalAmount: 210.00,
      cancellationReason: null,
      items: [
        { productName: 'Syfar', quantity: 1, price: 210.00 },
      ],
    },
    {
      orderNumber: 'GUL-2026-10495',
      customerName: 'Zainab Fatima',
      customerEmail: 'zainab.fatima@hotmail.com',
      customerPhone: '+92 312 8763290',
      shippingAddress: 'Villa 18, Tipu Sultan Road, Karachi',
      status: 'COMPLETED' as const,
      totalAmount: 400.00,
      cancellationReason: null,
      items: [
        { productName: 'BAOW', quantity: 1, price: 180.00 },
        { productName: 'Laizon', quantity: 1, price: 220.00 },
      ],
    },
    {
      orderNumber: 'GUL-2026-10496',
      customerName: 'Omar Farooq',
      customerEmail: 'omar.farooq@yahoo.com',
      customerPhone: '+92 345 2291044',
      shippingAddress: 'Plot 77, KDA Scheme 1, Karachi',
      status: 'CANCELLED' as const,
      totalAmount: 175.00,
      cancellationReason: 'Customer requested change of shipping address and placed a new order.',
      items: [
        { productName: 'Gen Z', quantity: 1, price: 175.00 },
      ],
    },
  ];

  for (const o of sampleOrders) {
    const existingOrder = await prisma.order.findUnique({
      where: { orderNumber: o.orderNumber },
    });

    if (!existingOrder) {
      const orderItemsToCreate: { productId: number; quantity: number; priceAtPurchase: number }[] = [];
      for (const it of o.items) {
        const prod = await prisma.product.findFirst({ where: { name: it.productName } });
        if (prod) {
          orderItemsToCreate.push({
            productId: prod.id,
            quantity: it.quantity,
            priceAtPurchase: it.price,
          });
        }
      }

      await prisma.order.create({
        data: {
          orderNumber: o.orderNumber,
          customerName: o.customerName,
          customerEmail: o.customerEmail,
          customerPhone: o.customerPhone,
          shippingAddress: o.shippingAddress,
          status: o.status,
          totalAmount: o.totalAmount,
          cancellationReason: o.cancellationReason,
          orderItems: {
            create: orderItemsToCreate,
          },
        },
      });
      console.log(`Order seeded: #${o.orderNumber} (${o.status})`);
    }
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('Error during database seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
