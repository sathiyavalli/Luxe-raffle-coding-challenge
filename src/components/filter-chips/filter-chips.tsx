'use client';

import { useState } from 'react';
import { Button } from '../ui/button';

type FilterType = 'all' | 'hot' | 'price';

interface FilterChipsProps {
  onFilterChange?: (filter: FilterType) => void;
}

export default function FilterChips({ onFilterChange }: FilterChipsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filters: { id: FilterType; label: string; icon: string; description: string }[] = [
    { id: 'all', label: 'All', icon: '📅', description: 'All Raffles' },
    { id: 'hot', label: 'Most Trending Cars', icon: '🔥', description: 'High Sold Out Cars' },
    { id: 'price', label: 'Best Price Cars', icon: '💰', description: 'Low to High Price' },
  ];

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    onFilterChange?.(filter);
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="px-4">
        <h3 className="text-sm font-bold text-[#8B7500] uppercase tracking-widest">
          🎯 Filter Raffles
        </h3>
      </div>

      {/* Chip Buttons */}
      <div className="space-y-2 px-4">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterChange(filter.id)}
            className={`w-full py-3 px-4 rounded-lg transition-all duration-300 flex items-center gap-3 font-semibold border-2 ${
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] border-[#8B7500] text-white shadow-lg shadow-[#D4AF37]/50'
                : 'bg-gradient-to-br from-[#FDF8F0] to-[#FAF4E6] border-[#D4AF37] text-[#8B7500] hover:border-[#B8860B] hover:shadow-md'
            }`}
          >
            <span className="text-2xl">{filter.icon}</span>
            <div className="flex flex-col items-start">
              <span className="text-sm font-bold">{filter.label}</span>
              <span className={`text-xs ${activeFilter === filter.id ? 'text-white/80' : 'text-[#8B7500]/70'}`}>
                {filter.description}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/50 to-[#D4AF37]/20" />

      {/* Stats Box */}
      <div className="mx-4 bg-gradient-to-br from-[#FDF8F0] to-[#FAF4E6] border-2 border-[#D4AF37] rounded-lg p-4 space-y-2">
        <div className="flex justify-between items-center mb-3 pb-3 border-b border-[#D4AF37]/20">
          <span className="text-xs font-bold text-[#8B7500] uppercase">Quick Stats</span>
          <span className="text-lg">📊</span>
        </div>
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-[#8B7500]/70">Active Raffles</span>
            <span className="font-bold text-[#D4AF37]">12</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8B7500]/70">Total Tickets</span>
            <span className="font-bold text-[#D4AF37]">8,450</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8B7500]/70">Participants</span>
            <span className="font-bold text-[#D4AF37]">1,234</span>
          </div>
        </div>
      </div>
    </div>
  );
}
