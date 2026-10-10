"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, Package, ShoppingCart, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Do not render the sidebar on the login page
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900 font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="font-playfair font-bold text-xl tracking-wide">Gul&apos;s CMS</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1">
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
              pathname === '/admin' ? 'bg-[#f4f1eb] text-black font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link 
            href="/admin/products" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
              pathname?.startsWith('/admin/products') ? 'bg-[#f4f1eb] text-black font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Package size={18} />
            Products
          </Link>
          <Link 
            href="/admin/orders" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
              pathname?.startsWith('/admin/orders') ? 'bg-[#f4f1eb] text-black font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <ShoppingCart size={18} />
            Orders
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-red-600 hover:bg-red-50 transition-colors text-left"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header (optional for future) */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:hidden">
          <span className="font-playfair font-bold text-lg">Gul&apos;s CMS</span>
          <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="text-sm text-red-600 font-medium">
            Sign Out
          </button>
        </header>

        <div className="flex-1 overflow-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

