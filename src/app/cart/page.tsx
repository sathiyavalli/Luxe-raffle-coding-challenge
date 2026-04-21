'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ShoppingCart, Edit2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, updateGiftMessage, cartTotal, isHydrated } = useCart();
  const [editingGiftId, setEditingGiftId] = useState<number | null>(null);
  const [editingMessage, setEditingMessage] = useState<string>('');

  // Show loading state until cart is hydrated
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="animate-spin mx-auto h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Loading your cart...
            </h1>
            <p className="text-gray-600">
              Please wait while we load your items.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <ShoppingCart className="mx-auto h-24 w-24 text-gray-400 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-6">
              Start winning your dream car by adding raffle tickets to your cart!
            </p>
            <Link href="/" className="block w-full">
              <Button asChild className="w-full">Browse Raffles</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <ul className="divide-y">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className={`p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 hover:bg-gray-50 transition ${
                      item.gift ? 'bg-gradient-to-r from-[#D4AF37]/5 to-[#B8860B]/5 border-l-4 border-[#D4AF37]' : ''
                    }`}
                  >
                    {/* Image Container */}
                    <div className="w-full sm:w-auto flex-shrink-0">
                      <Image
                        src={item.raffle.image || '/placeholder.svg'}
                        alt={item.raffle.name}
                        width={120}
                        height={80}
                        className="w-full sm:w-32 h-auto sm:h-24 rounded-md object-cover"
                      />
                    </div>

                    {/* Content Container */}
                    <div className="flex-grow min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="font-semibold text-base sm:text-lg">
                          {item.raffle.name}
                        </h3>
                        {item.gift && (
                          <span className="inline-flex items-center gap-1 bg-[#D4AF37]/20 border-2 border-[#D4AF37] rounded-full px-2 py-1 text-xs font-semibold text-[#8B7500] w-fit">
                            🎁 Gift
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">
                        {item.raffle.description}
                      </p>
                      {item.gift && (
                        <p className="text-xs text-[#8B7500] mt-1 font-medium">
                          📧 To: <span className="font-semibold">{item.gift.recipientEmail}</span>
                        </p>
                      )}
                      <div className="grid grid-cols-2 gap-2 mt-2 sm:flex sm:gap-4 sm:mt-2">
                        <div>
                          <p className="text-green-600 font-semibold text-sm sm:text-base">
                            {item.raffle.ticketPrice} € 
                            <span className="text-gray-600 font-normal text-xs sm:text-sm">
                              /ticket
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs sm:text-sm">
                            Subtotal: <span className="font-semibold text-gray-900">{(item.raffle.ticketPrice * item.quantity).toLocaleString('de-DE')} €</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions Container */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center flex-shrink-0">
                      <div className="flex items-center gap-1 border border-gray-300 rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="h-7 w-7 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-semibold min-w-6 text-center text-xs">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-7 w-7 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="gap-1 py-1 h-7 text-xs"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Remove</span>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-4">
              <h2 className="text-lg sm:text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 sm:space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Items:</span>
                  <span className="font-semibold">{items.length}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Tickets:</span>
                  <span className="font-semibold">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-semibold">Total:</span>
                  <span className="text-xl sm:text-2xl font-bold text-green-600">
                    {cartTotal.toLocaleString('de-DE')} €
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="block w-full">
                <Button asChild className=\"w-full mb-3 text-sm sm:text-base py-2 sm:py-2\">Proceed to Checkout</Button>
              </Link>

              <Link href=\"/\" className=\"block w-full\">
                <Button asChild variant=\"outline\" className=\"w-full text-sm sm:text-base py-2 sm:py-2\">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
