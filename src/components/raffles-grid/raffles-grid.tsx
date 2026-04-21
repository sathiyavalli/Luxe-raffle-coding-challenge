'use client';

import { Raffle } from '@/types/Raffle';
import RaffleTile from '../raffle-tile/raffle-tile';
import FilterChips from '../filter-chips/filter-chips';
import { ReferralProgram } from '../referral-program/referral-program';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect, useRef } from 'react';

type FilterType = 'all' | 'hot' | 'price';
type SortOption = 'original' | 'mosSoldOut' | 'price';

const ITEMS_PER_PAGE = 6;

export default function RafflesGrid({ raffles }: { raffles: Raffle[] }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroImageLoaded, setHeroImageLoaded] = useState(true); // Load hero immediately for LCP
  const { isLoggedIn, user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const [time, setTime] = useState({
    days: 5,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate countdown timer
  useEffect(() => {
    const calculateCountdown = () => {
      const eventEnd = new Date();
      eventEnd.setDate(eventEnd.getDate() + 5); // 5 days from now

      const timer = setInterval(() => {
        const now = new Date();
        const diff = eventEnd.getTime() - now.getTime();

        if (diff <= 0) {
          setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTime({ days, hours, minutes, seconds });
      }, 1000);

      return () => clearInterval(timer);
    };

    return calculateCountdown();
  }, []);

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
    setDisplayedCount(ITEMS_PER_PAGE); // Reset to initial count when filter changes
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedCount < filteredRaffles.length) {
          setDisplayedCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredRaffles.length));
        }
      },
      { threshold: 0.1 }
    );

    const sentinelElement = document.getElementById('scroll-sentinel');
    if (sentinelElement) {
      observer.observe(sentinelElement);
    }

    return () => {
      if (sentinelElement) {
        observer.unobserve(sentinelElement);
      }
    };
  }, [displayedCount, filteredRaffles.length]);

  const displayedRaffles = filteredRaffles.slice(0, displayedCount);

  return (
    <div className="container-fluid mx-auto px-4 py-8">
      {/* Luxury Hero Section - Split Layout */}
      <div className="w-full mb-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* Left Side - Background Image with Lazy Loading */}
        <div 
          ref={heroRef}
          className="rounded-xl overflow-hidden shadow-lg border-2 border-[#D4AF37] h-64 sm:h-80 lg:h-96 bg-gray-200 transition-opacity duration-500"
          style={{
            backgroundImage: heroImageLoaded ? 'url(/images/hero-bg.png)' : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
          }}
          role="img"
          aria-label="Luxury car raffle hero image showing a premium vehicle"
        />
        <noscript>
          <div 
            className="rounded-xl overflow-hidden shadow-lg border-2 border-[#D4AF37] h-64 sm:h-80 lg:h-96 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/hero-bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </noscript>

        {/* Right Side - Event Information */}
        <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8860B]/10 rounded-xl border-2 border-[#D4AF37] p-6 sm:p-8 flex flex-col justify-center h-64 sm:h-80 lg:h-96">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
              🏎️ Win Your Dream Car
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8">
              Exclusive Luxury Competition
            </p>
            <div className="inline-block bg-white rounded-lg border-2 border-[#D4AF37] p-4 sm:p-6 w-full sm:w-auto">
              <p className="text-xs sm:text-sm font-bold text-[#8B7500] uppercase tracking-widest mb-3 text-center">
                Event Countdown
              </p>
              <div className="flex justify-center gap-1 sm:gap-3 items-center">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded px-2 sm:px-4 py-2 sm:py-3 border border-[#8B7500] min-w-12 sm:min-w-16">
                    <span className="text-base sm:text-2xl font-bold text-white">{String(time.days).padStart(2, '0')}</span>
                  </div>
                  <span className="text-xs font-semibold text-[#8B7500] mt-1 sm:mt-2">Days</span>
                </div>
                <div className="text-lg sm:text-2xl font-bold text-[#D4AF37] -mt-6 sm:-mt-8">:</div>
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded px-2 sm:px-4 py-2 sm:py-3 border border-[#8B7500] min-w-12 sm:min-w-16">
                    <span className="text-base sm:text-2xl font-bold text-white">{String(time.hours).padStart(2, '0')}</span>
                  </div>
                  <span className="text-xs font-semibold text-[#8B7500] mt-1 sm:mt-2">Hrs</span>
                </div>
                <div className="text-lg sm:text-2xl font-bold text-[#D4AF37] -mt-6 sm:-mt-8">:</div>
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded px-2 sm:px-4 py-2 sm:py-3 border border-[#8B7500] min-w-12 sm:min-w-16">
                    <span className="text-base sm:text-2xl font-bold text-white">{String(time.minutes).padStart(2, '0')}</span>
                  </div>
                  <span className="text-xs font-semibold text-[#8B7500] mt-1 sm:mt-2">Min</span>
                </div>
                <div className="text-lg sm:text-2xl font-bold text-[#D4AF37] -mt-6 sm:-mt-8">:</div>
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded px-2 sm:px-4 py-2 sm:py-3 border border-[#8B7500] min-w-12 sm:min-w-16">
                    <span className="text-base sm:text-2xl font-bold text-white">{String(time.seconds).padStart(2, '0')}</span>
                  </div>
                  <span className="text-xs font-semibold text-[#8B7500] mt-1 sm:mt-2">Sec</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Raffles Grid with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Raffles Grid - 3 columns on lg, full width on mobile */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedRaffles.map((raffle, index) => (
              <RaffleTile key={raffle.id} raffle={raffle} priority={index < 6} />
            ))}
          </div>

          {/* Scroll Sentinel - Triggers lazy loading */}
          <div id="scroll-sentinel" className="h-2 mt-8" />

          {/* Loading indicator when more items are available */}
          {displayedCount < filteredRaffles.length && (
            <div className="flex justify-center py-8">
              <div className="text-center text-gray-600">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#D4AF37] border-t-transparent mb-2"></div>
                <p className="text-sm">Loading more raffles...</p>
              </div>
            </div>
          )}

          {/* Show all loaded message */}
          {displayedCount >= filteredRaffles.length && filteredRaffles.length > ITEMS_PER_PAGE && (
            <div className="text-center py-6 text-gray-500 text-sm">
              Showing all {filteredRaffles.length} raffles
            </div>
          )}
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
