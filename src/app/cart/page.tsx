'use client';

import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface CartItem {
  id: number;
  quantity: number;
}

export default function CartPage() {
  // TODO: This must come from the cart
  const [items, setItems] = useState<CartItem[]>([]);

  const handleQuantityUpdate = (id: number, newQuantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemove = () => {
    // TODO: Implement this
  };

  const handleCheckout = () => {
    // TODO: Implement this. Redirect to /account
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <div className="mb-8">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg
                className="mx-auto h-24 w-24 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8m10 0l1.1-5M9 21h6m-6 0a2 2 0 01-2-2v-8m8 10a2 2 0 002-2v-8"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Start winning your dream car by adding raffle tickets to your cart!
            </p>
            <Button asChild>
              <a href="/">Browse Raffles</a>
            </Button>
          </div>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => {
              // TODO: We need to load data from the server somehow
              const name = '';
              const imageSrc = '';

              return (
                <li key={item.id} className="flex items-center space-x-4">
                  <Image
                    src={imageSrc}
                    alt={name}
                    width={80}
                    height={60}
                    className="rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{name}</h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleQuantityUpdate(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleQuantityUpdate(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemove()}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="flex justify-end">
        <Button variant="default" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  );
}
