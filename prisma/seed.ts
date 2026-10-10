import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create default admin user
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
  console.log('Created Admin User:', admin.email)

  // Create categories
  const categoryMasculine = await prisma.category.upsert({
    where: { slug: 'masculine-energy' },
    update: {},
    create: {
      name: 'Masculine Energy',
      slug: 'masculine-energy',
    },
  })
  console.log('Created Category:', categoryMasculine.name)

  const categoryPourElle = await prisma.category.upsert({
    where: { slug: 'pour-elle' },
    update: {},
    create: {
      name: 'Pour Elle',
      slug: 'pour-elle',
    },
  })
  console.log('Created Category:', categoryPourElle.name)

  // Create products
  const product1 = await prisma.product.create({
    data: {
      name: 'Oud Wood Intense',
      brand: 'Gul\'s Collection',
      description: 'A rich, woody fragrance for the modern man.',
      price: 150.00,
      stockQuantity: 50,
      categoryId: categoryMasculine.id,
      topNote: 'Rosewood, Cardamom',
      heartNote: 'Oud Wood, Sandalwood',
      baseNote: 'Vanilla, Amber',
    },
  })
  console.log('Created Product:', product1.name)

  const product2 = await prisma.product.create({
    data: {
      name: 'Midnight Rose',
      brand: 'Gul\'s Collection',
      description: 'A sensual, floral perfume for evening wear.',
      price: 120.00,
      stockQuantity: 30,
      categoryId: categoryPourElle.id,
      topNote: 'Raspberry, Rose',
      heartNote: 'Jasmine, Peony',
      baseNote: 'Musk, Cedar',
    },
  })
  console.log('Created Product:', product2.name)

  const product3 = await prisma.product.create({
    data: {
      name: 'Citrus Breeze',
      brand: 'Gul\'s Collection',
      description: 'A refreshing, everyday scent with a burst of citrus.',
      price: 90.00,
      stockQuantity: 100,
      categoryId: categoryPourElle.id,
      topNote: 'Bergamot, Lemon',
      heartNote: 'Orange Blossom',
      baseNote: 'Vetiver',
    },
  })
  console.log('Created Product:', product3.name)

  console.log('Database seeding completed successfully.')
}

main()
  .catch((e) => {
    console.error('Error during database seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
