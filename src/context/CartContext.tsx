'use client';

import { Raffle } from '@/types/Raffle';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type GiftInfo = {
  recipientEmail: string;
  message: string;
  senderName: string;
};

export type CartItem = {
  id: number;
  raffle: Raffle;
  quantity: number;
  gift?: GiftInfo; // Only present if this is a gift purchase
};

type CartContextType = {
  items: CartItem[];
  addItem: (raffle: Raffle, quantity: number) => void;
  addGiftItem: (raffle: Raffle, quantity: number, giftInfo: GiftInfo) => void;
  removeItem: (raffleId: number, isGift?: boolean) => void;
  updateQuantity: (raffleId: number, quantity: number, isGift?: boolean) => void;
  updateGiftMessage: (raffleId: number, message: string) => void;
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
      const existingItem = prevItems.find((item) => item.id === raffle.id && !item.gift);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === raffle.id && !item.gift
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { id: raffle.id, raffle, quantity }];
    });
  };

  const addGiftItem = (raffle: Raffle, quantity: number, giftInfo: GiftInfo) => {
    setItems((prevItems) => {
      // Each gift is independent, so we create a new entry for each gift
      return [...prevItems, { id: raffle.id, raffle, quantity, gift: giftInfo }];
    });
  };

  const removeItem = (raffleId: number, isGift?: boolean) => {
    setItems((prevItems) => {
      if (isGift !== undefined) {
        // Remove specific gift item
        const itemIndex = prevItems.findIndex((item) => item.id === raffleId && !!item.gift === isGift);
        if (itemIndex > -1) {
          return prevItems.filter((_, index) => index !== itemIndex);
        }
      }
      // Remove regular item
      return prevItems.filter((item) => item.id !== raffleId || item.gift);
    });
  };

  const updateQuantity = (raffleId: number, quantity: number, isGift?: boolean) => {
    if (quantity <= 0) {
      removeItem(raffleId, isGift);
    } else {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === raffleId && (!isGift ? !item.gift : item.gift)
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const updateGiftMessage = (raffleId: number, message: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === raffleId && item.gift
          ? { ...item, gift: { ...item.gift, message } }
          : item
      )
    );
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
        addGiftItem,
        removeItem,
        updateQuantity,
        updateGiftMessage,
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
