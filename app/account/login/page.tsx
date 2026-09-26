'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useStore();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default login as customer
    login({ name: 'Guest', email, role: 'customer' });
    router.push('/account');
  };

  const handleDemoAdmin = () => {
    login({ name: 'Admin', email: 'admin@guls.com', role: 'admin' });
    router.push('/admin');
  };

  const handleDemoCustomer = () => {
    login({ name: 'Jane Doe', email: 'jane@example.com', role: 'customer' });
    router.push('/account');
  };

  return (
    <main className="min-h-screen flex bg-brand-cream font-serif">
      {/* Left Side - Visual */}
      <div className="hidden lg:block lg:w-1/2 relative bg-brand-black">
        <Image 
          src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2787&auto=format&fit=crop" 
          alt="Dark moody perfume" 
          fill 
          className="object-cover opacity-80"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h2 className="text-4xl mb-4">Discover Your Signature</h2>
          <p className="text-sm uppercase tracking-[0.2em] opacity-80">Enter the atelier</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 xl:p-24 bg-brand-cream">
        <div className="w-full max-w-md">
          <div className="mb-12 text-center lg:text-left">
            <h1 className="text-4xl text-brand-black mb-4">Welcome Back</h1>
            <p className="text-sm text-gray-500 italic">Sign in to your private account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 mb-12">
            <div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address" 
                className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-brand-black transition-colors rounded-none placeholder:text-gray-400"
                required
              />
            </div>
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" 
                className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-brand-black transition-colors rounded-none placeholder:text-gray-400"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-brand-black text-white py-4 text-xs uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors rounded-none"
            >
              Sign In
            </button>
          </form>

          <div className="border-t border-gray-200 pt-8">
            <p className="text-xs uppercase tracking-widest text-center text-gray-500 mb-6">For Testing Purposes</p>
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleDemoCustomer}
                className="w-full border border-brand-black text-brand-black py-3 text-xs uppercase tracking-widest hover:bg-brand-black hover:text-white transition-colors rounded-none"
              >
                Demo Login as Customer
              </button>
              <button 
                onClick={handleDemoAdmin}
                className="w-full border border-brand-black text-brand-black py-3 text-xs uppercase tracking-widest hover:bg-brand-black hover:text-white transition-colors rounded-none"
              >
                Demo Login as Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
