import { Package, ShoppingCart, DollarSign, Users } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-playfair font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your store&apos;s performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Stat Card 1 */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-[#f4f1eb] rounded-lg">
            <DollarSign className="w-6 h-6 text-[#d4af37]" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
            <h3 className="text-2xl font-bold text-gray-900">$0.00</h3>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-[#f4f1eb] rounded-lg">
            <ShoppingCart className="w-6 h-6 text-[#d4af37]" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Orders</p>
            <h3 className="text-2xl font-bold text-gray-900">0</h3>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-[#f4f1eb] rounded-lg">
            <Package className="w-6 h-6 text-[#d4af37]" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Products</p>
            <h3 className="text-2xl font-bold text-gray-900">0</h3>
          </div>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-[#f4f1eb] rounded-lg">
            <Users className="w-6 h-6 text-[#d4af37]" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Customers</p>
            <h3 className="text-2xl font-bold text-gray-900">0</h3>
          </div>
        </div>

      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
        </div>
        <div className="p-6 text-center text-gray-500 py-12">
          <p>No recent orders found.</p>
        </div>
      </div>
    </div>
  );
}
