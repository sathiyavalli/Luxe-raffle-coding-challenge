'use client';

import { Raffle } from '@/types/Raffle';
import RaffleTile from '../raffle-tile/raffle-tile';
import CountdownTimer from '../countdown-timer/countdown-timer';
import FilterChips from '../filter-chips/filter-chips';
import { ReferralProgram } from '../referral-program/referral-program';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

type FilterType = 'all' | 'hot' | 'price';
type SortOption = 'original' | 'mosSoldOut' | 'price';

export default function RafflesGrid({ raffles }: { raffles: Raffle[] }) {
  const { isLoggedIn, user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  // Filter and sort raffles based on selected filter
  const filteredRaffles = raffles.filter((raffle) => {
    if (selectedFilter === 'hot') {
      // Hot filter: high sold out cars (more than 70% sold)
      const soldPercentage = ((raffle.totalTickets - raffle.availableTickets) / raffle.totalTickets) * 100;
      return soldPercentage > 70;
    }
    return true; // 'all' and 'price' show all raffles
  }).sort((a, b) => {
    if (selectedFilter === 'price') {
      // Price filter: sort from low to high
      return a.ticketPrice - b.ticketPrice;
    }
    return 0; // Keep original order for 'all' and 'hot'
  });

  const handleFilterChange = (filter: FilterType) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="container-fluid mx-auto px-4 py-8">
      {/* Luxury Hero Section */}
      <div 
        className="w-full mb-12"
        style={{
          backgroundImage: 'url(/images/hero-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          height: '20rem',
        }}
      />

      {/* Countdown Timer */}
      <CountdownTimer />

      {/* Raffles Grid with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Raffles Grid - 3 columns on lg, full width on mobile */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRaffles.map((raffle) => (
              <RaffleTile key={raffle.id} raffle={raffle} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Filter Chips */}
          <FilterChips onFilterChange={handleFilterChange} />

          {/* Referral Program Widget */}
          <ReferralProgram userName={user?.firstName || 'User'} isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </div>
  );
}
