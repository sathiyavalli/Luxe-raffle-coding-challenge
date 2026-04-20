'use client';

import { Activity } from 'lucide-react';

// Mock recent entries data
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

export const RecentEntriesWidget = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-2 border-[#D4AF37]">
      <div className="flex items-center gap-2 mb-4">
        <Activity size={20} className="text-[#D4AF37]" />
        <h3 className="font-bold text-lg text-gray-900">Recent Activity</h3>
      </div>
      
      <div className="space-y-3">
        {MOCK_ENTRIES.map((entry) => (
          <div
            key={entry.id}
            className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-b-0"
          >
            <div className="w-2 h-2 mt-2 bg-green-500 rounded-full flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">
                {entry.userName}
                <span className="font-normal text-gray-600"> joined</span>
              </p>
              <p className="text-sm text-gray-600 truncate">
                {entry.raffleModel}
              </p>
              <p className="text-xs text-gray-500 mt-1">{entry.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-[#FDF8F0] rounded-lg border border-[#D4AF37]">
        <p className="text-xs text-[#8B7500] text-center font-semibold">
          🔥 <strong>47 entries</strong> in the last 2 hours
        </p>
      </div>
    </div>
  );
};
