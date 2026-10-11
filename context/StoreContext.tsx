'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
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

export interface OrderFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
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
    featuredScents: ['laizon', 'syfar'],
  },
  {
    slug: 'winter-warmth',
    title: 'Winter Warmth: Amber & Woods',
    excerpt: 'Why deep, resinous notes are the perfect companion for colder months.',
    category: 'Fragrance Notes',
    date: 'Nov 05, 2026',
    readTime: '3 min read',
    image: '/images/brand-bags.jpeg',
    featuredScents: ['gen-x', 'hassan-gul'],
  },
];

interface StoreContextType {
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number, itemDetails?: { name: string; price: number; image: string }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  orders: Order[];
  placeOrder: (orderData: OrderFormData) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  journalPosts: JournalPost[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [journalPosts] = useState<JournalPost[]>(defaultJournalPosts);

  // Guard: don't persist cart to localStorage until we've loaded from it first.
  // This prevents the initial empty-cart state from overwriting saved data.
  const isHydrated = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('guls_cart');
    const savedUser = localStorage.getItem('guls_user');
    const savedOrders = localStorage.getItem('guls_orders');

    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedOrders) setOrders(JSON.parse(savedOrders));

    isHydrated.current = true;
  }, []);

  // Persist cart — only after initial hydration from localStorage
  useEffect(() => {
    if (!isHydrated.current) return;
    localStorage.setItem('guls_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!isHydrated.current) return;
    if (user) {
      localStorage.setItem('guls_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('guls_user');
    }
  }, [user]);

  useEffect(() => {
    if (!isHydrated.current) return;
    localStorage.setItem('guls_orders', JSON.stringify(orders));
  }, [orders]);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  const addToCart = (
    productId: string,
    quantity: number = 1,
    itemDetails?: { name: string; price: number; image: string }
  ) => {
    const fallbackProduct = products.find((p) => p.id === productId);
    const itemData = itemDetails
      ? {
          id: productId,
          name: itemDetails.name,
          price: itemDetails.price,
          image: itemDetails.image,
        }
      : fallbackProduct
      ? {
          id: fallbackProduct.id,
          name: fallbackProduct.name,
          price: fallbackProduct.price,
          image: fallbackProduct.image,
        }
      : null;

    if (!itemData) return;

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
          id: itemData.id,
          name: itemData.name,
          price: itemData.price,
          image: itemData.image,
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

  const placeOrder = (orderData: OrderFormData) => {
    const newOrder: Order = {
      id: `GUL-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      total: cartTotal,
      items: [...cart],
      status: 'Pending',
      customer: user
        ? { name: user.name, email: user.email, address: orderData.address }
        : { name: `${orderData.firstName} ${orderData.lastName}`, email: orderData.email, address: orderData.address },
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
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
