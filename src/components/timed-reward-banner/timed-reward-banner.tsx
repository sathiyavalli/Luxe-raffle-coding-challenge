'use client';

import { useState, useEffect } from 'react';
import { Clock, Gift, X } from 'lucide-react';

const REWARD_LOCK_DURATION = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_DAILY_CLAIMS = 3;
const TIMED_REWARD_KEY = 'luxe-timed-reward';
const TIMED_REWARD_CLAIMS_KEY = 'luxe-timed-reward-claims';

interface RewardState {
  lastClaimTime: number | null;
  claimsToday: number;
}

export const TimedRewardBanner = () => {
  const [isReady, setIsReady] = useState(false);
  const [countdown, setCountdown] = useState('');
  const [claimsLeft, setClaimsLeft] = useState(MAX_DAILY_CLAIMS);
  const [showBanner, setShowBanner] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Initialize reward state
  useEffect(() => {
    checkRewardStatus();
  }, []);

  // Timer for countdown
  useEffect(() => {
    if (!isReady) {
      const timer = setInterval(() => {
        checkRewardStatus();
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isReady]);

  // Toast auto-hide
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const checkRewardStatus = () => {
    const storedReward = localStorage.getItem(TIMED_REWARD_KEY);
    const storedClaims = localStorage.getItem(TIMED_REWARD_CLAIMS_KEY);

    // Reset claims counter if it's a new day
    const today = new Date().toDateString();
    const claimsData = storedClaims ? JSON.parse(storedClaims) : { date: today, count: 0 };

    if (claimsData.date !== today) {
      claimsData.date = today;
      claimsData.count = 0;
      localStorage.setItem(TIMED_REWARD_CLAIMS_KEY, JSON.stringify(claimsData));
    }

    setClaimsLeft(MAX_DAILY_CLAIMS - claimsData.count);

    // Check if reward is ready
    if (!storedReward) {
      setIsReady(true);
      return;
    }

    const lastClaimTime = parseInt(storedReward);
    const timeSinceLastClaim = Date.now() - lastClaimTime;

    if (timeSinceLastClaim >= REWARD_LOCK_DURATION) {
      setIsReady(true);
      setCountdown('');
    } else {
      setIsReady(false);
      const timeRemaining = REWARD_LOCK_DURATION - timeSinceLastClaim;
      updateCountdown(timeRemaining);
    }
  };

  const updateCountdown = (timeRemaining: number) => {
    const minutes = Math.floor(timeRemaining / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);
    setCountdown(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  };

  const handleClaimReward = () => {
    if (!isReady || claimsLeft <= 0) return;

    // Update last claim time
    localStorage.setItem(TIMED_REWARD_KEY, Date.now().toString());

    // Update claims count
    const storedClaims = localStorage.getItem(TIMED_REWARD_CLAIMS_KEY);
    const claimsData = storedClaims ? JSON.parse(storedClaims) : { date: new Date().toDateString(), count: 0 };
    claimsData.count += 1;
    localStorage.setItem(TIMED_REWARD_CLAIMS_KEY, JSON.stringify(claimsData));

    // Show toast
    setToastMessage(`🎉 €5 bonus claimed! ${MAX_DAILY_CLAIMS - claimsData.count} claims left today`);
    setShowToast(true);

    // Reset state
    setIsReady(false);
    checkRewardStatus();
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-16 right-4 z-50 animate-in slide-in-from-top-2">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <Gift size={20} />
            <span className="font-semibold">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Timed Reward Banner */}
      <div className="relative bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-2 sm:py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
              {isReady && claimsLeft > 0 ? (
                <>
                  <Gift className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-bold text-xs sm:text-sm leading-tight">🎁 Your reward is ready!</span>
                    <span className="text-xs opacity-90 truncate">Claim €5 bonus • {claimsLeft} claims left today</span>
                  </div>
                </>
              ) : claimsLeft <= 0 ? (
                <>
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-bold text-xs sm:text-sm leading-tight">⏰ Daily claim limit reached</span>
                    <span className="text-xs opacity-90 truncate">Come back tomorrow for more rewards</span>
                  </div>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 animate-spin flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-bold text-xs sm:text-sm leading-tight">⏳ Next reward in {countdown}</span>
                    <span className="text-xs opacity-90 truncate">Keep exploring to earn rewards</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {isReady && claimsLeft > 0 && (
                <button
                  onClick={handleClaimReward}
                  className="bg-white text-amber-600 hover:bg-slate-100 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-lg transition-all active:scale-95 whitespace-nowrap"
                >
                  Claim Now
                </button>
              )}
              <button
                onClick={() => setShowBanner(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors flex-shrink-0"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Decorative shimmer effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
    </>
  );
};