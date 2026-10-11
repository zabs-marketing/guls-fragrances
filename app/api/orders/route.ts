import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendOrderStatusEmail } from '@/lib/email';

// POST /api/orders – Guest checkout order creation
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, customerPhone, shippingAddress, items } = body;

    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Please provide all required customer and item details.' }, { status: 422 });
    }

    // Generate unique order number e.g. GUL-2026-98432
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `GUL-${new Date().getFullYear()}-${randomSuffix}`;

    // Calculate total and prepare items
    let totalAmount = 0;
    const orderItemsData: { productId: number; quantity: number; priceAtPurchase: number }[] = [];
    const emailItems: { name: string; quantity: number; price: number }[] = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(item.productId) },
      });

      if (!product) {
        return NextResponse.json({ error: `Product ID ${item.productId} not found.` }, { status: 404 });
      }

      const qty = Math.max(1, parseInt(item.quantity) || 1);
      const price = Number(product.price);
      totalAmount += price * qty;

      orderItemsData.push({
        productId: product.id,
        quantity: qty,
        priceAtPurchase: price,
      });

      emailItems.push({
        name: product.name,
        quantity: qty,
        price,
      });
    }

    // Create Order with OrderItems in Prisma transaction
    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim().toLowerCase(),
        customerPhone: customerPhone.trim(),
        shippingAddress: shippingAddress.trim(),
        totalAmount,
        status: 'PENDING',
        orderItems: {
          create: orderItemsData,
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    // Dispatch Order Received email (background)
    sendOrderStatusEmail({
      orderNumber: newOrder.orderNumber,
      customerName: newOrder.customerName,
      customerEmail: newOrder.customerEmail,
      totalAmount: Number(newOrder.totalAmount),
      status: 'PENDING',
      items: emailItems,
    }).catch((err) => console.error('Failed to send order email:', err));

    return NextResponse.json(
      {
        orderId: newOrder.id,
        orderNumber: newOrder.orderNumber,
        totalAmount: newOrder.totalAmount,
        message: 'Order placed successfully.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/orders]', error);
    return NextResponse.json({ error: 'Failed to place order.' }, { status: 500 });
  }
}

