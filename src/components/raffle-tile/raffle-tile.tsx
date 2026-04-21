'use client';

import { useState } from 'react';
import { Raffle } from '@/types/Raffle';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useCart } from '@/context/CartContext';
import { Plus, Minus, Gift } from 'lucide-react';
import GiftModal from '../gift-modal/gift-modal';

export default function RaffleTile({ raffle, priority = false }: { raffle: Raffle; priority?: boolean }) {
  const { addItem, items, updateQuantity } = useCart();
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);

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
    <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl group h-full flex flex-col border-2 border-[#D4AF37] bg-gradient-to-br from-[#FDF8F0] to-[#FAF4E6]">
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
          priority={priority}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-xl font-semibold flex-1">{raffle.name}</h2>
          <button
            onClick={() => setIsGiftModalOpen(true)}
            className="flex-shrink-0 p-2 hover:bg-[#D4AF37]/20 rounded-lg transition-colors duration-200 group"
            title="Send as Gift"
          >
            <Gift size={24} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
          </button>
        </div>

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
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] h-full rounded-full transition-all duration-300"
              style={{ width: `${soldPercentage}%` }}
            ></div>
          </div>
        </div>

        <p className="text-gray-600 mb-3 text-sm">{raffle.description}</p>

        <div className="space-y-2 mt-auto">
          {/* Show gift badge if this item has a gift */}
          {cartQuantity > 0 && cartItem?.gift && (
            <div className="bg-gradient-to-r from-[#8B5CF6]/20 to-[#D4AF37]/20 rounded-lg px-3 py-2 border-2 border-[#8B5CF6] flex items-center justify-center gap-2">
              <span className="text-2xl">🎁</span>
              <div className="text-left text-sm">
                <p className="font-semibold text-[#8B5CF6]">Gift Item</p>
                <p className="text-xs text-[#8B7500]">{cartItem.gift.recipientEmail}</p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            {cartQuantity === 0 ? (
              <>
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1 transition-all border-2 border-[#D4AF37] text-[#D4AF37] font-semibold hover:bg-[#D4AF37] hover:text-white hover:shadow-lg hover:shadow-[#D4AF37]/50 active:shadow-md"
                >
                  Enter Raffle
                </Button>
                <Button variant="outline" className="flex-1 transition-all border-2 border-[#D4AF37] text-[#D4AF37] font-semibold hover:bg-[#D4AF37] hover:text-white hover:shadow-lg hover:shadow-[#D4AF37]/50 active:shadow-md">
                  Details
                </Button>
              </>
            ) : (
              <>
                <div className="flex-1 flex items-center justify-between gap-2 bg-[#D4AF37]/10 rounded-lg px-3  border-2 border-[#D4AF37]">
                  <button
                    onClick={handleDecreaseQuantity}
                    className="flex items-center justify-center w-6 py-2 rounded hover:bg-[#D4AF37]/20 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} className="text-[#D4AF37]" />
                  </button>
                  <span className="font-semibold text-[#D4AF37] min-w-8 text-center">
                    {cartQuantity}
                  </span>
                  <button
                    onClick={handleIncreaseQuantity}
                    className="flex items-center justify-center w-6 h-6 rounded hover:bg-[#D4AF37]/20 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} className="text-[#D4AF37]" />
                  </button>
                </div>
                <Button variant="outline" className="flex-1 transition-all border-2 border-[#D4AF37] text-[#D4AF37] font-semibold hover:bg-[#D4AF37] hover:text-white hover:shadow-lg hover:shadow-[#D4AF37]/50 active:shadow-md">
                  Details
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Gift Modal */}
      <GiftModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
        raffle={raffle}
        availableTickets={-1}
      />
    </div>
  );
}
