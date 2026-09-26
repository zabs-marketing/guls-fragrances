'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useStore, Order, OrderStatus } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Eye, 
  X, 
  TrendingUp, 
  Package, 
  Clock, 
  CheckCircle,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TABS: (OrderStatus | 'All')[] = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered'];

export default function AdminDashboard() {
  const { user, orders, updateOrderStatus } = useStore();
  const router = useRouter();
  
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<OrderStatus | 'All'>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use effect to handle auth redirect
  useEffect(() => {
    if (isClient) {
      if (!user) {
        router.push('/account/login');
      } else if (user.role !== 'admin') {
        // Not an admin, maybe push to their account page
        router.push('/account');
      }
    }
  }, [user, router, isClient]);

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const pendingFulfillment = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
    const completedDeliveries = orders.filter(o => o.status === 'Delivered').length;

    return { totalRevenue, totalOrders, pendingFulfillment, completedDeliveries };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTab = activeTab === 'All' || order.status === activeTab;
      
      return matchesSearch && matchesTab;
    });
  }, [orders, searchTerm, activeTab]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  if (!isClient) return null; // Avoid hydration mismatch
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream text-brand-charcoal">
        <p className="text-xl font-serif">Verifying Access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif uppercase tracking-tight">Executive Portal</h1>
            <p className="text-sm uppercase tracking-widest text-brand-charcoal/70 mt-2">
              Welcome back, {user.name}
            </p>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Revenue', value: formatPrice(stats.totalRevenue), icon: TrendingUp },
            { label: 'Total Orders', value: stats.totalOrders.toString(), icon: Package },
            { label: 'Pending Fulfillment', value: stats.pendingFulfillment.toString(), icon: Clock },
            { label: 'Completed Deliveries', value: stats.completedDeliveries.toString(), icon: CheckCircle },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 border border-brand-charcoal/10 flex items-start justify-between shadow-sm">
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-charcoal/60 mb-2">{stat.label}</p>
                <p className="text-3xl font-serif">{stat.value}</p>
              </div>
              <div className="text-brand-charcoal/40">
                <stat.icon size={24} strokeWidth={1.5} />
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white border border-brand-charcoal/10 p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
          {/* Tabs */}
          <div className="flex overflow-x-auto w-full md:w-auto hide-scrollbar gap-2">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm uppercase tracking-widest whitespace-nowrap transition-colors border ${
                  activeTab === tab 
                    ? 'bg-brand-charcoal text-white border-brand-charcoal' 
                    : 'bg-transparent text-brand-charcoal border-transparent hover:border-brand-charcoal/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80 border-b border-brand-charcoal">
            <input
              type="text"
              placeholder="SEARCH ORDERS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent px-0 py-2 pr-10 text-sm uppercase tracking-widest focus:outline-none placeholder:text-brand-charcoal/40"
            />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/60" />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white border border-brand-charcoal/10 overflow-x-auto shadow-sm">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-brand-charcoal/5 border-b border-brand-charcoal/10">
              <tr>
                <th className="px-6 py-4 uppercase tracking-widest font-normal text-xs">Order ID</th>
                <th className="px-6 py-4 uppercase tracking-widest font-normal text-xs">Date</th>
                <th className="px-6 py-4 uppercase tracking-widest font-normal text-xs">Customer</th>
                <th className="px-6 py-4 uppercase tracking-widest font-normal text-xs">Items</th>
                <th className="px-6 py-4 uppercase tracking-widest font-normal text-xs">Total</th>
                <th className="px-6 py-4 uppercase tracking-widest font-normal text-xs">Status</th>
                <th className="px-6 py-4 uppercase tracking-widest font-normal text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-brand-charcoal/50 uppercase tracking-widest">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="border-b border-brand-charcoal/5 hover:bg-brand-charcoal/5 transition-colors">
                    <td className="px-6 py-4 font-serif">{order.id}</td>
                    <td className="px-6 py-4 text-brand-charcoal/70">{order.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span>{order.customer?.name || 'Guest'}</span>
                        <span className="text-xs text-brand-charcoal/50">{order.customer?.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-brand-charcoal/70">{order.items.length}</td>
                    <td className="px-6 py-4 font-serif">{formatPrice(order.total)}</td>
                    <td className="px-6 py-4">
                      <div className="relative inline-block w-full max-w-[140px]">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className={`w-full appearance-none bg-transparent border py-1.5 pl-3 pr-8 text-xs uppercase tracking-widest focus:outline-none transition-colors ${
                            order.status === 'Delivered' ? 'border-green-800/30 text-green-900 bg-green-50' :
                            order.status === 'Cancelled' ? 'border-red-800/30 text-red-900 bg-red-50' :
                            'border-brand-charcoal/20 hover:border-brand-charcoal'
                          }`}
                        >
                          {TABS.filter(t => t !== 'All').map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-50" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-brand-charcoal hover:text-white transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Panel for Order Details */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-brand-black/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 border-l border-brand-charcoal/10 overflow-y-auto"
            >
              <div className="p-6 md:p-8 space-y-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-sm uppercase tracking-widest text-brand-charcoal/50 mb-1">Order Details</h2>
                    <p className="text-3xl font-serif">{selectedOrder.id}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 hover:bg-brand-cream rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="uppercase tracking-widest text-brand-charcoal/50 text-xs mb-1">Date</p>
                    <p>{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-widest text-brand-charcoal/50 text-xs mb-1">Status</p>
                    <p className="uppercase">{selectedOrder.status}</p>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-brand-charcoal/10">
                  <h3 className="text-xs uppercase tracking-widest text-brand-charcoal/50">Customer Information</h3>
                  <div className="bg-brand-cream/50 p-4 border border-brand-charcoal/5 text-sm">
                    <p className="font-serif text-lg mb-1">{selectedOrder.customer?.name || 'Guest User'}</p>
                    <p className="text-brand-charcoal/70">{selectedOrder.customer?.email}</p>
                    {selectedOrder.customer?.address && (
                      <p className="mt-4 pt-4 border-t border-brand-charcoal/10 text-brand-charcoal/70 leading-relaxed">
                        {selectedOrder.customer.address}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-brand-charcoal/10">
                  <h3 className="text-xs uppercase tracking-widest text-brand-charcoal/50">Items ({selectedOrder.items.length})</h3>
                  <div className="space-y-4">
                    {selectedOrder.items.map(item => (
                      <div key={item.id} className="flex gap-4 bg-brand-cream/30 p-3 border border-brand-charcoal/5">
                        <div className="w-16 h-16 bg-brand-charcoal/5 flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                        </div>
                        <div className="flex-grow flex flex-col justify-center">
                          <p className="font-serif">{item.name}</p>
                          <p className="text-xs uppercase tracking-widest text-brand-charcoal/50 mt-1">
                            Qty: {item.quantity} × {formatPrice(item.price)}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center text-right font-serif">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-charcoal/20 space-y-3">
                  <div className="flex justify-between text-sm uppercase tracking-widest text-brand-charcoal/60">
                    <span>Subtotal</span>
                    <span>{formatPrice(selectedOrder.total)}</span>
                  </div>
                  <div className="flex justify-between text-sm uppercase tracking-widest text-brand-charcoal/60">
                    <span>Shipping</span>
                    <span>{formatPrice(0)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-serif pt-3 border-t border-brand-charcoal/10">
                    <span>Total</span>
                    <span>{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>
                
                <div className="pt-8 pb-4">
                   <button 
                     onClick={() => setSelectedOrder(null)}
                     className="w-full py-4 bg-brand-charcoal text-white uppercase tracking-widest text-sm hover:bg-brand-charcoal/90 transition-colors"
                   >
                     Close Panel
                   </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
