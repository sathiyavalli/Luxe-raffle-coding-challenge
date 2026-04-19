'use client';

import { Raffle } from '@/types/Raffle';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CartItem = {
  id: number;
  raffle: Raffle;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (raffle: Raffle, quantity: number) => void;
  removeItem: (raffleId: number) => void;
  updateQuantity: (raffleId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
  isHydrated: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'luxe-raffle-cart';

export { CartContext };

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    }
  }, [items, isHydrated]);

  const addItem = (raffle: Raffle, quantity: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === raffle.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === raffle.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { id: raffle.id, raffle, quantity }];
    });
  };

  const removeItem = (raffleId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== raffleId));
  };

  const updateQuantity = (raffleId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(raffleId);
    } else {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === raffleId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce(
    (total, item) => total + item.raffle.ticketPrice * item.quantity,
    0
  );

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
