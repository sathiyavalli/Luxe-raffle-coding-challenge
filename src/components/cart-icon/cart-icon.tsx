'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

const CartCounter = ({ count }: { count: number }) => (
  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
    {count}
  </span>
);

export default function CartIcon() {
  // Use useContext directly to avoid the error throw from useCart hook
  const context = useContext(CartContext);

  // If context is not available, show fallback
  if (!context) {
    return (
      <Link
        href="/cart"
        className="text-gray-600 hover:text-gray-800 relative transition"
      >
        <ShoppingCart size={24} />
      </Link>
    );
  }

  const { itemCount, isHydrated } = context;

  // Show loading state until hydrated
  if (!isHydrated) {
    return (
      <div className="relative animate-pulse">
        <ShoppingCart size={24} className="text-gray-400" />
        <div className="absolute -top-2 -right-2 h-5 w-5 bg-gray-300 rounded-full"></div>
      </div>
    );
  }

  return (
    <Link
      href="/cart"
      className="text-gray-600 hover:text-gray-800 relative transition"
    >
      <ShoppingCart size={24} />
      {itemCount > 0 && <CartCounter count={itemCount} />}
    </Link>
  );
};
