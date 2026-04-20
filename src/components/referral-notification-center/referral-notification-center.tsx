'use client';

import { useEffect, useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface ReferralNotification {
  id: string;
  type: 'friend_joined' | 'milestone_unlocked' | 'reward_available';
  message: string;
  description?: string;
  icon?: string;
}

export const ReferralNotificationCenter = () => {
  const [notifications, setNotifications] = useState<ReferralNotification[]>([]);

  // Simulate referral notifications for demo
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotifications: ReferralNotification[] = [
        {
          id: `friend-${Date.now()}`,
          type: 'friend_joined',
          message: '🎉 Your friend Sarah joined!',
          description: 'They used your referral code',
        },
        {
          id: `milestone-${Date.now()}`,
          type: 'milestone_unlocked',
          message: '🎁 Milestone Unlocked!',
          description: '3 friends joined - Get a free raffle entry',
        },
      ];

      const notification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
      
      setNotifications((prev) => [...prev, notification]);

      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
      }, 5000);
    }, 15000); // New notification every 15 seconds (for demo)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-24 right-6 z-40 space-y-3 max-w-sm pointer-events-none">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white rounded-lg shadow-xl border-l-4 border-green-500 p-4 pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 text-2xl">
              {notification.type === 'friend_joined' && '👥'}
              {notification.type === 'milestone_unlocked' && '🏆'}
              {notification.type === 'reward_available' && '🎁'}
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">{notification.message}</p>
              {notification.description && (
                <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
              )}
            </div>
            <Check size={20} className="text-green-600 flex-shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
};
