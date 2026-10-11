import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdminSession } from '@/lib/auth-helpers';
import { OrderStatus, Prisma } from '@prisma/client';

// GET /api/admin/orders – list orders with pagination, search, status tabs, date range, product filter, or CSV export
export async function GET(req: Request) {
  const unauth = await requireAdminSession();
  if (unauth) return unauth;

  try {
    const { searchParams } = new URL(req.url);
    const exportCsv = searchParams.get('exportCsv') === 'true';

    const page = Math.max(1, parseInt(searchParams.get('page') || '1') || 1);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10') || 10));
    const search = searchParams.get('search')?.trim() || '';
    const statusParam = searchParams.get('status')?.toUpperCase() || 'ALL';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const productId = searchParams.get('productId');

    const where: Prisma.OrderWhereInput = {};

    // 1. Status Filter
    if (statusParam && statusParam !== 'ALL') {
      if (Object.values(OrderStatus).includes(statusParam as OrderStatus)) {
        where.status = statusParam as OrderStatus;
      }
    }

    // 2. Search (Order Number, Customer Name, Phone, Email)
    if (search) {
      where.OR = [
        { orderNumber: { contains: search } },
        { customerName: { contains: search } },
        { customerPhone: { contains: search } },
        { customerEmail: { contains: search } },
      ];
    }

    // 3. Date Range Filter
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    // 4. Product Filter
    if (productId && productId !== 'all') {
      const pId = parseInt(productId);
      if (!isNaN(pId)) {
        where.orderItems = {
          some: {
            productId: pId,
          },
        };
      }
    }

    // CSV Export Flow (for Accounting)
    if (exportCsv) {
      const allMatchingOrders = await prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          orderItems: {
            include: {
              product: {
                select: { name: true },
              },
            },
          },
        },
      });

      // Construct CSV
      const csvHeader = [
        'Order Number',
        'Date',
        'Customer Name',
        'Email',
        'Phone',
        'Shipping Address',
        'Status',
        'Total (PKR)',
        'Items Summary',
        'Cancellation Reason',
      ].join(',');

      const csvRows = allMatchingOrders.map((o) => {
        const itemsSummary = o.orderItems
          .map((i) => `${i.product.name} (x${i.quantity})`)
          .join('; ');

        return [
          `"${o.orderNumber}"`,
          `"${new Date(o.createdAt).toLocaleDateString('en-GB')}"`,
          `"${o.customerName.replace(/"/g, '""')}"`,
          `"${o.customerEmail.replace(/"/g, '""')}"`,
          `"${o.customerPhone.replace(/"/g, '""')}"`,
          `"${o.shippingAddress.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
          `"${o.status}"`,
          `"${o.totalAmount}"`,
          `"${itemsSummary.replace(/"/g, '""')}"`,
          `"${(o.cancellationReason || '').replace(/"/g, '""')}"`,
        ].join(',');
      });

      const csvContent = [csvHeader, ...csvRows].join('\n');

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="guls-orders-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      });
    }

    // Normal Paginated Flow
    const [total, orders, statusCountsRaw] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          orderItems: {
            include: {
              product: {
                select: { id: true, name: true, imageURL: true },
              },
            },
          },
        },
      }),
      // Count per status tab
      prisma.order.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
    ]);

    const statusCounts: Record<string, number> = {
      ALL: 0,
      PENDING: 0,
      CONFIRMED: 0,
      DISPATCHED: 0,
      COMPLETED: 0,
      CANCELLED: 0,
    };

    let totalAllOrders = 0;
    statusCountsRaw.forEach((sc) => {
      statusCounts[sc.status] = sc._count.status;
      totalAllOrders += sc._count.status;
    });
    statusCounts.ALL = totalAllOrders;

    return NextResponse.json({
      orders,
      statusCounts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    console.error('[GET /api/admin/orders]', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

