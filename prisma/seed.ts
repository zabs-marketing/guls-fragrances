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

  // 2. Create the 4 core Categories matching the brand editions
  const categoriesData = [
    {
      name: 'Masculine Energy',
      slug: 'masculine-energy',
      image: '/images/gen-x.jpeg',
      isActive: true,
    },
    {
      name: 'Pour Elle',
      slug: 'pour-elle',
      image: '/images/bring-her.jpeg',
      isActive: true,
    },
    {
      name: 'N°01 - For All',
      slug: 'for-all',
      image: '/images/after-5.jpeg',
      isActive: true,
    },
    {
      name: 'Arabesques',
      slug: 'arabesques',
      image: '/images/syfar.jpeg',
      isActive: true,
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
