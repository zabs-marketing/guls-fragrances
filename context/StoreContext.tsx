'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '@/lib/data';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  date: string;
  total: number;
  items: CartItem[];
  status: OrderStatus;
  customer?: { name: string; email: string; address?: string };
}

export interface User {
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content?: string;
  featuredScents?: string[];
}

const defaultJournalPosts: JournalPost[] = [
  {
    slug: 'art-of-distillation',
    title: 'The Art of Distillation',
    excerpt: 'Discover the ancient techniques we use to extract the purest botanical oils.',
    category: 'Behind the Craft',
    date: 'Oct 12, 2026',
    readTime: '4 min read',
    image: '/images/hero-sections-reference.jpeg',
    featuredScents: ['laizon', 'syfar']
  },
  {
    slug: 'winter-warmth',
    title: 'Winter Warmth: Amber & Woods',
    excerpt: 'Why deep, resinous notes are the perfect companion for colder months.',
    category: 'Fragrance Notes',
    date: 'Nov 05, 2026',
    readTime: '3 min read',
    image: '/images/brand-bags.jpeg',
    featuredScents: ['gen-x', 'hassan-gul']
  }
];

interface StoreContextType {
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  orders: Order[];
  placeOrder: (orderData: any) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  journalPosts: JournalPost[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [journalPosts] = useState<JournalPost[]>(defaultJournalPosts);

  // Load from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('guls_cart');
    const savedUser = localStorage.getItem('guls_user');
    const savedOrders = localStorage.getItem('guls_orders');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('guls_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('guls_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('guls_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('guls_orders', JSON.stringify(orders));
  }, [orders]);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  const addToCart = (productId: string, quantity: number = 1) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: parseInt(product.price.replace('$', '')),
          image: product.image,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const placeOrder = (orderData: any) => {
    const newOrder: Order = {
      id: `GUL-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toLocaleDateString(),
      total: cartTotal,
      items: [...cart],
      status: 'Pending', // New orders start as Pending
      customer: user ? { name: user.name, email: user.email, address: orderData.address } : orderData.customer
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        user,
        login,
        logout,
        orders,
        placeOrder,
        updateOrderStatus,
        journalPosts,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
