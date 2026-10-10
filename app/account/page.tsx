'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogOut, Package, Clock, CheckCircle, Truck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore, OrderStatus } from '@/context/StoreContext';

const STATUS_STEPS = ['Pending', 'Processing', 'Shipped', 'Delivered'];

export default function AccountPage() {
  const { user, orders, logout } = useStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'LiveTracking' | 'History'>('LiveTracking');

  useEffect(() => {
    if (!user) {
      router.push('/account/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/account/login');
  };

  const activeOrders = orders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const pastOrders = orders.filter((o) => o.status === 'Delivered' || o.status === 'Cancelled');

  const getStepIndex = (status: OrderStatus) => STATUS_STEPS.indexOf(status);

  return (
    <main className="min-h-screen bg-brand-green-dark text-white flex flex-col">
      <Navbar />

      <section className="pt-32 pb-12 px-6 md:px-12 flex-grow">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 border-b border-white/10 pb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">
                Welcome back, <span className="text-brand-gold">{user.name}</span>
              </h1>
              <span className="inline-block border border-white/20 px-3 py-1 text-xs uppercase tracking-widest text-white/50">
                Private Atelier Member
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="mt-6 md:mt-0 flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-brand-gold transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-8 mb-10 border-b border-white/10">
            <button
              onClick={() => setActiveTab('LiveTracking')}
              className={`pb-4 text-xs uppercase tracking-[0.1em] font-bold transition-colors ${
                activeTab === 'LiveTracking'
                  ? 'border-b-2 border-brand-gold text-brand-gold'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              Live Tracking
            </button>
            <button
              onClick={() => setActiveTab('History')}
              className={`pb-4 text-xs uppercase tracking-[0.1em] font-bold transition-colors ${
                activeTab === 'History'
                  ? 'border-b-2 border-brand-gold text-brand-gold'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              Order History
            </button>
          </div>

          {/* Content */}
          <div className="bg-brand-green-rich border border-white/10 p-8 md:p-10 min-h-[460px]">

            {activeTab === 'LiveTracking' && (
              <div>
                <h2 className="text-2xl font-serif text-white mb-8">Active Orders</h2>
                {activeOrders.length === 0 ? (
                  <p className="text-white/50 italic">You have no active orders at this time.</p>
                ) : (
                  <div className="space-y-14">
                    {activeOrders.map((order) => (
                      <div key={order.id} className="border border-white/10 p-6 md:p-8">
                        <div className="flex justify-between items-center mb-8">
                          <span className="text-sm font-bold tracking-widest uppercase text-white/60">
                            Order #{order.id}
                          </span>
                          <span className="text-lg font-serif text-brand-gold">${order.total}</span>
                        </div>

                        {/* Progress Tracker */}
                        <div className="relative mb-10">
                          <div className="absolute top-4 left-0 w-full h-[1px] bg-white/10 -z-10" />
                          <div
                            className="absolute top-4 left-0 h-[1px] bg-brand-gold -z-10 transition-all duration-500"
                            style={{
                              width: `${(Math.max(0, getStepIndex(order.status)) / (STATUS_STEPS.length - 1)) * 100}%`,
                            }}
                          />
                          <div className="flex justify-between">
                            {STATUS_STEPS.map((step, idx) => {
                              const isActive = getStepIndex(order.status) >= idx;
                              return (
                                <div key={step} className="flex flex-col items-center gap-2 bg-brand-green-rich px-2">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                                      isActive
                                        ? 'border-brand-gold bg-brand-gold text-brand-green-dark'
                                        : 'border-white/20 bg-brand-green-rich text-white/30'
                                    }`}
                                  >
                                    {idx === 0 && <Clock size={14} />}
                                    {idx === 1 && <Package size={14} />}
                                    {idx === 2 && <Truck size={14} />}
                                    {idx === 3 && <CheckCircle size={14} />}
                                  </div>
                                  <span
                                    className={`text-[9px] uppercase tracking-widest ${
                                      isActive ? 'text-brand-gold font-bold' : 'text-white/30'
                                    }`}
                                  >
                                    {step}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Items Summary */}
                        <div className="bg-white/5 border border-white/10 p-6">
                          <h3 className="text-xs uppercase tracking-widest font-bold mb-4 text-white/60">Items Summary</h3>
                          <div className="space-y-4">
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 relative border border-white/10 bg-brand-green-dark">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized sizes="48px" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold">{item.name}</p>
                                    <p className="text-xs text-white/40">Qty: {item.quantity}</p>
                                  </div>
                                </div>
                                <span className="text-sm text-brand-gold">${item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'History' && (
              <div>
                <h2 className="text-2xl font-serif text-white mb-8">Past Orders</h2>
                {pastOrders.length === 0 ? (
                  <p className="text-white/50 italic">No past orders found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="py-4 text-xs uppercase tracking-widest text-white/40 font-normal">Order</th>
                          <th className="py-4 text-xs uppercase tracking-widest text-white/40 font-normal">Date</th>
                          <th className="py-4 text-xs uppercase tracking-widest text-white/40 font-normal">Status</th>
                          <th className="py-4 text-xs uppercase tracking-widest text-white/40 font-normal text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pastOrders.map((order) => (
                          <tr key={order.id} className="border-b border-white/5 last:border-0">
                            <td className="py-5 font-bold text-sm text-brand-gold">#{order.id}</td>
                            <td className="py-5 text-sm text-white/60">{order.date}</td>
                            <td className="py-5">
                              <span
                                className={`inline-block px-2 py-1 text-[10px] uppercase tracking-widest border ${
                                  order.status === 'Delivered'
                                    ? 'border-green-500/50 text-green-400'
                                    : 'border-red-500/50 text-red-400'
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="py-5 text-right font-bold text-brand-gold">${order.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
