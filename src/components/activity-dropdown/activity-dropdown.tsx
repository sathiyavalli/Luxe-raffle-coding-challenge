'use client';

import { useState, useRef, useEffect } from 'react';
import { Activity, X } from 'lucide-react';

const MOCK_ENTRIES = [
  {
    id: 1,
    userName: 'Alex M.',
    raffleModel: 'Ferrari 488 GTB',
    timeAgo: '5 min ago',
  },
  {
    id: 2,
    userName: 'Sarah K.',
    raffleModel: 'Rolls-Royce Phantom',
    timeAgo: '12 min ago',
  },
  {
    id: 3,
    userName: 'James P.',
    raffleModel: 'Lamborghini Huracán',
    timeAgo: '23 min ago',
  },
  {
    id: 4,
    userName: 'Emma W.',
    raffleModel: 'Aston Martin DB11',
    timeAgo: '34 min ago',
  },
];

export const ActivityDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Activity Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#FDF8F0] cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 group"
        aria-label="Recent activity"
        aria-expanded={isOpen}
      >
        <Activity size={20} className="text-[#D4AF37] group-hover:text-[#B8860B] transition-colors" />
        <span className="text-sm font-medium text-gray-700 group-hover:text-[#D4AF37] transition-colors hidden md:inline">Activity</span>
      </button>

      {/* Mobile Activity Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[#FDF8F0] cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
        aria-label="Recent activity"
        aria-expanded={isOpen}
      >
        <Activity size={20} className="text-[#D4AF37]" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-1/2 sm:right-0 sm:left-auto -translate-x-1/2 sm:translate-x-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 md:w-96 bg-white rounded-xl shadow-xl border-2 border-[#D4AF37] z-50 max-h-96 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-3 sm:px-4 py-3 border-b-2 border-[#D4AF37]/20 flex items-center justify-between bg-gradient-to-r from-[#FDF8F0] to-white sticky top-0">
            <div className="flex items-center gap-2 min-w-0">
              <Activity size={18} className="text-[#D4AF37] flex-shrink-0" />
              <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">Recent Activity</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-[#FDF8F0] rounded-full transition-colors ml-2 flex-shrink-0"
            >
              <X size={16} className="text-gray-600" />
            </button>
          </div>

          {/* Activity List */}
          <div className="overflow-y-auto flex-1">
            {MOCK_ENTRIES.map((entry, index) => (
              <div
                key={entry.id}
                className={`px-3 sm:px-4 py-2 sm:py-3 hover:bg-[#FDF8F0] transition-colors duration-150 ${
                  index !== MOCK_ENTRIES.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 mt-1 sm:mt-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">
                      {entry.userName}
                      <span className="font-normal text-gray-600"> joined</span>
                    </p>
                    <p className="text-xs sm:text-sm text-[#D4AF37] font-medium truncate">{entry.raffleModel}</p>
                    <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">{entry.timeAgo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Stats */}
          <div className="px-3 sm:px-4 py-3 border-t-2 border-[#D4AF37]/20 bg-gradient-to-r from-[#FDF8F0] to-white sticky bottom-0">
            <div className="px-2 sm:px-3 py-2 bg-white rounded-lg border-2 border-[#D4AF37]">
              <p className="text-xs text-[#8B7500] text-center font-semibold">
                🔥 <strong>47 entries</strong> in the last 2 hours
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityDropdown;
