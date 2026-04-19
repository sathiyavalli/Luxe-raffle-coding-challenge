'use client';

import { Raffle } from '@/types/Raffle';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useCart } from '@/context/CartContext';
import { Plus, Minus } from 'lucide-react';

export default function RaffleTile({ raffle }: { raffle: Raffle }) {
  const { addItem, items, updateQuantity } = useCart();

  // Find if this raffle is already in cart
  const cartItem = items.find((item) => item.id === raffle.id);
  const cartQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addItem(raffle, 1);
  };

  const handleIncreaseQuantity = () => {
    if (cartQuantity > 0) {
      updateQuantity(raffle.id, cartQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (cartQuantity > 1) {
      updateQuantity(raffle.id, cartQuantity - 1);
    } else if (cartQuantity === 1) {
      updateQuantity(raffle.id, 0);
    }
  };

  // Calculate sold percentage and "hot" status
  const soldPercentage = ((raffle.totalTickets - raffle.availableTickets) / raffle.totalTickets) * 100;
  const isHot = soldPercentage > 70; // Hot if more than 70% sold

  return (
    <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl group h-full flex flex-col border border-gray-200 bg-gradient-to-br from-white to-gray-50">
      {/* Image Container with Price Tag */}
      <div className="relative overflow-hidden bg-gray-100 h-48">
        {/* Hot Badge */}
        {isHot && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-red-500 hover:bg-red-600 text-white animate-pulse">
              🔥 Hot
            </Badge>
          </div>
        )}

        {/* Price Tag - Corner Label */}
        <div className="absolute bottom-3 right-3 z-10 bg-black/80 text-white px-3 py-1 rounded-lg font-semibold text-sm backdrop-blur-sm">
          €{raffle.ticketPrice}
        </div>

        {/* Image with Zoom Effect */}
        <Image
          src={raffle.image || '/placeholder.svg'}
          alt={raffle.name}
          width={300}
          height={200}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold mb-3">{raffle.name}</h2>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-600">
              {raffle.totalTickets - raffle.availableTickets} / {raffle.totalTickets} sold
            </span>
            <span className="text-xs font-semibold text-gray-700">
              {Math.round(soldPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${soldPercentage}%` }}
            ></div>
          </div>
        </div>

        <p className="text-gray-600 mb-3 text-sm">{raffle.description}</p>

        <div className="flex gap-2 mt-auto">
          {cartQuantity === 0 ? (
            <>
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1 transition-all hover:bg-blue-50"
              >
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1">
                Details
              </Button>
            </>
          ) : (
            <>
              <div className="flex-1 flex items-center justify-between gap-2 bg-blue-50 rounded-lg px-3  border border-blue-200">
                <button
                  onClick={handleDecreaseQuantity}
                  className="flex items-center justify-center w-6 py-2 rounded hover:bg-blue-200 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} className="text-blue-600" />
                </button>
                <span className="font-semibold text-blue-600 min-w-8 text-center">
                  {cartQuantity}
                </span>
                <button
                  onClick={handleIncreaseQuantity}
                  className="flex items-center justify-center w-6 h-6 rounded hover:bg-blue-200 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} className="text-blue-600" />
                </button>
              </div>
              <Button variant="outline" className="flex-1">
                Details
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
