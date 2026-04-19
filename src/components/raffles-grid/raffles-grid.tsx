'use client';

import { Raffle } from '@/types/Raffle';
import RaffleTile from '../raffle-tile/raffle-tile';
import { useState } from 'react';
import { ShoppingCart, CreditCard, Trophy, ChevronRight } from 'lucide-react';

type SortOption = 'original' | 'mosSoldOut' | 'price';

export default function RafflesGrid({ raffles }: { raffles: Raffle[] }) {
  const [sortBy, setSortBy] = useState<SortOption>('original');

  const sortedRaffles = [...raffles].sort((a, b) => {
    if (sortBy === 'original') return raffles.indexOf(a) - raffles.indexOf(b);
    
    if (sortBy === 'mosSoldOut') {
      // Calculate sold percentage
      const soldPercentageA = ((a.totalTickets - a.availableTickets) / a.totalTickets) * 100;
      const soldPercentageB = ((b.totalTickets - b.availableTickets) / b.totalTickets) * 100;
      return soldPercentageB - soldPercentageA; // Highest first
    }
    
    if (sortBy === 'price') {
      return a.ticketPrice - b.ticketPrice; // Lowest price first
    }
    
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">LuxeRaffle</h1>
      
      {/* Steps Section */}
      <div className="text-center mb-12">
        <p className="text-gray-600 mb-4">With 3 easy steps</p>
        
        {/* Steps with Icons */}
        <div className="flex justify-center items-center gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
              <ShoppingCart size={20} />
            </div>
            <span className="font-semibold text-gray-700">Add to Cart</span>
          </div>
          
          <ChevronRight size={24} className="text-gray-400" />
          
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
              <CreditCard size={20} />
            </div>
            <span className="font-semibold text-gray-700">Checkout</span>
          </div>
          
          <ChevronRight size={24} className="text-gray-400" />
          
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600">
              <Trophy size={20} />
            </div>
            <span className="font-semibold text-gray-700">Win</span>
          </div>
        </div>
        
        <p className="text-gray-600">you can win a luxury cars</p>
      </div>
      
      {/* Sort Chips */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <button
          onClick={() => setSortBy('mosSoldOut')}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
            sortBy === 'mosSoldOut'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Most Sold Out
        </button>
        <button
          onClick={() => setSortBy('price')}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
            sortBy === 'price'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Price (Low to High)
        </button>
        {sortBy !== 'original' && (
          <button
            onClick={() => setSortBy('original')}
            className="px-4 py-2 rounded-full font-medium transition-all duration-200 bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Reset
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedRaffles.map((raffle) => (
          <RaffleTile key={raffle.id} raffle={raffle} />
        ))}
      </div>
    </div>
  );
}
