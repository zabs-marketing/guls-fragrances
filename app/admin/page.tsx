import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Package, ShoppingCart, DollarSign, Tag, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [totalProducts, totalCategories, orders, totalRevenueRaw] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        orderItems: {
          include: { product: { select: { name: true } } },
        },
      },
    }),
    prisma.order.aggregate({
      where: {
        status: { in: ['CONFIRMED', 'DISPATCHED', 'COMPLETED'] },
      },
      _sum: { totalAmount: true },
    }),
  ]);

  const activeOrdersCount = await prisma.order.count({
    where: { status: { in: ['PENDING', 'CONFIRMED', 'DISPATCHED'] } },
  });

  const totalRevenue = Number(totalRevenueRaw._sum.totalAmount || 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-50 text-amber-800 border-amber-200/70';
      case 'CONFIRMED':
        return 'bg-blue-50 text-blue-800 border-blue-200/70';
      case 'DISPATCHED':
        return 'bg-purple-50 text-purple-800 border-purple-200/70';
      case 'COMPLETED':
        return 'bg-green-50 text-green-800 border-green-200/70';
      case 'CANCELLED':
        return 'bg-red-50 text-red-800 border-red-200/70';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-playfair font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Live metrics and enterprise operational summary.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-[#f4f1eb] rounded-lg">
            <DollarSign className="w-6 h-6 text-[#d4af37]" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-2xl font-bold text-gray-900">PKR {totalRevenue.toLocaleString()}</h3>
          </div>
        </div>

        {/* Active Orders */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-[#f4f1eb] rounded-lg">
            <ShoppingCart className="w-6 h-6 text-[#d4af37]" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Active Orders</p>
            <h3 className="text-2xl font-bold text-gray-900">{activeOrdersCount}</h3>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-[#f4f1eb] rounded-lg">
            <Package className="w-6 h-6 text-[#d4af37]" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Catalogue Items</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalProducts}</h3>
          </div>
        </div>

        {/* Total Categories */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-[#f4f1eb] rounded-lg">
            <Tag className="w-6 h-6 text-[#d4af37]" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Collections</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalCategories}</h3>
          </div>
        </div>
      </div>

      {/* Recent Orders Overview */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">Recent Customer Orders</h2>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-black hover:text-[#d4af37] flex items-center gap-1 transition-colors"
          >
            <span>View All Orders</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="p-6 text-center text-gray-500 py-12">
            <p>No orders placed yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                  <th className="text-left px-6 py-3 font-semibold">Order</th>
                  <th className="text-left px-6 py-3 font-semibold">Customer</th>
                  <th className="text-left px-6 py-3 font-semibold">Items</th>
                  <th className="text-right px-6 py-3 font-semibold">Amount</th>
                  <th className="text-center px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => {
                  const itemsStr = order.orderItems.map((i) => `${i.product.name} (x${i.quantity})`).join(', ');

                  return (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-gray-900 font-mono text-xs">
                        #{order.orderNumber}
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="font-medium text-gray-900">{order.customerName}</div>
                        <div className="text-xs text-gray-500">{order.customerPhone}</div>
                      </td>
                      <td className="px-6 py-3.5 text-xs text-gray-600 max-w-xs truncate" title={itemsStr}>
                        {itemsStr}
                      </td>
                      <td className="px-6 py-3.5 text-right font-semibold text-gray-900">
                        PKR {Number(order.totalAmount).toLocaleString()}
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
