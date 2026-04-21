'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

type SpinState = 'hidden' | 'ready' | 'spinning' | 'result';

const SPIN_DURATION = 4500;
const DAILY_SPIN_KEY = 'luxe-spin-wheel-last-spin';

// 8 segments alternating between red and yellow/orange for vibrant appearance
const REWARDS = [
  { label: '€5 Bonus', value: 5, isRed: false },
  { label: 'Free Ticket', value: 0, special: true, isRed: true },
  { label: '€8 Bonus', value: 8, isRed: false },
  { label: 'Try Again', value: 0, tryAgain: true, isRed: true },
  { label: '€10 Bonus', value: 10, isRed: false },
  { label: '€3 Bonus', value: 3, isRed: true },
  { label: 'Bonus Entry', value: 0, special: true, isRed: false },
  { label: 'Premium Pass', value: 0, special: true, isRed: true },
];

export const SpinWheel = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [state, setState] = useState<SpinState>('hidden');
  const [rotation, setRotation] = useState(0);
  const [selectedReward, setSelectedReward] = useState<(typeof REWARDS)[0] | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [canSpin, setCanSpin] = useState(true);
  const [nextSpinTime, setNextSpinTime] = useState<string | null>(null);

  // Check daily spin limitation
  useEffect(() => {
    const checkDailyLimit = () => {
      const today = new Date().toDateString();
      const lastSpinDate = localStorage.getItem(DAILY_SPIN_KEY);
      
      if (lastSpinDate === today) {
        // Already spun today
        setCanSpin(false);
        // Calculate next spin time (tomorrow at 00:00)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        setNextSpinTime(tomorrow.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      } else {
        // Fresh spin available
        setCanSpin(true);
        setNextSpinTime(null);
      }
    };

    checkDailyLimit();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const percent = (scrollTop / (documentHeight - windowHeight)) * 100;

      if (percent >= 40 && percent <= 50 && state === 'hidden') {
        setState('ready');
      }

      if (percent < 35 && state !== 'hidden') {
        setState('hidden');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [state]);

  const handleSpin = () => {
    if (state !== 'ready' || !canSpin || isSpinning) return;

    setIsSpinning(true);
    setState('spinning');

    // Record today's spin in localStorage
    const today = new Date().toDateString();
    localStorage.setItem(DAILY_SPIN_KEY, today);

    const selectedIndex = Math.floor(Math.random() * REWARDS.length);
    const segmentAngle = 360 / REWARDS.length;
    const targetSegmentAngle = selectedIndex * segmentAngle + segmentAngle / 2;
    const numRotations = 5 + Math.random() * 3;
    const finalRotation = rotation + numRotations * 360 + targetSegmentAngle;

    setTimeout(() => {
      setRotation(finalRotation);
    }, 50);

    setTimeout(() => {
      const reward = REWARDS[selectedIndex];
      setSelectedReward(reward);
      setIsSpinning(false);
      setState('result');
      setCanSpin(false);
      
      // Calculate next spin time
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      setNextSpinTime(tomorrow.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    }, SPIN_DURATION + 200);
  };

  const handleClose = () => {
    setState('hidden');
  };

  // Hidden state - nothing to show
  if (state === 'hidden') {
    return null;
  }

  // Ready state - show floating button
  if (state === 'ready' || state === 'spinning') {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-lg w-full border-2 border-amber-700/50 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
              🎡 SPIN TO WIN
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-amber-600/30 rounded-full transition-all duration-200 border border-amber-600/50 flex-shrink-0"
              aria-label="Close spin wheel"
            >
              <X size={20} className="text-amber-400 sm:w-6 sm:h-6" />
            </button>
          </div>

          <p className="text-slate-300 mb-6 sm:mb-10 text-center text-xs sm:text-sm font-light tracking-wide">
            Your fortune awaits • Claim luxurious rewards
          </p>

          {/* Wheel Container */}
          <div className="flex justify-center mb-8 w-full">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Outer Ring with Border */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '8px solid',
                  borderColor: '#D4AF37',
                }}
              />

              {/* Secondary Ring */}
              <div
                className="absolute inset-3 rounded-full"
                style={{
                  border: '2px solid rgba(212, 175, 55, 0.4)',
                }}
              />

              {/* Wheel Canvas */}
              <svg
                viewBox="0 0 400 400"
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning
                    ? `transform ${SPIN_DURATION}ms cubic-bezier(0.25, 0.02, 0.25, 1)`
                    : 'none',
                }}
              >
                {REWARDS.map((reward, i) => {
                  const totalSegments = REWARDS.length;
                  const segmentAngle = 360 / totalSegments;
                  const startAngle = (i * segmentAngle - 90) * (Math.PI / 180);
                  const endAngle = ((i + 1) * segmentAngle - 90) * (Math.PI / 180);

                  // Adjusted radius and positioning for better fit
                  const radius = 170; // Reduced from 180 to fit better
                  const x1 = 200 + radius * Math.cos(startAngle);
                  const y1 = 200 + radius * Math.sin(startAngle);
                  const x2 = 200 + radius * Math.cos(endAngle);
                  const y2 = 200 + radius * Math.sin(endAngle);

                  const largeArc = segmentAngle > 180 ? 1 : 0;

                  const pathData = `
                    M 200 200
                    L ${x1} ${y1}
                    A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
                    Z
                  `;

                  // Alternate between red and yellow/orange
                  const fillColor = reward.isRed
                    ? '#DC2F45'
                    : '#FFC300';
                  const strokeColor = reward.isRed
                    ? '#A01B2E'
                    : '#FF8C00';

                  const midAngle = (startAngle + endAngle) / 2;
                  const textRadius = 130;
                  const textX = 200 + textRadius * Math.cos(midAngle);
                  const textY = 200 + textRadius * Math.sin(midAngle);
                  const textRotation = (midAngle * 180) / Math.PI + 90;

                  return (
                    <g key={i}>
                      {/* Segment */}
                      <path
                        d={pathData}
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth="2"
                        style={{
                          filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                        }}
                      />

                      {/* Shine effect */}
                      <path
                        d={pathData}
                        fill="url(#segmentShine)"
                        opacity="0.3"
                      />

                      {/* Text Label */}
                      <g transform={`translate(${textX}, ${textY}) rotate(${textRotation})`}>
                        <text
                          x="0"
                          y="0"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="white"
                          fontSize="13"
                          fontWeight="700"
                          style={{
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                            filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8))',
                          }}
                        >
                          {reward.label}
                        </text>
                      </g>
                    </g>
                  );
                })}

                {/* Shine gradient definition */}
                <defs>
                  <linearGradient id="segmentShine" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center Hub - Luxury Design */}
              <div
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center font-bold text-xl md:text-2xl text-white border-4 border-amber-300 cursor-pointer hover:scale-110 transition-transform duration-200"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #FCD34D 0%, #D4AF37 50%, #B8860B 100%)',
                  boxShadow:
                    '0 0 40px rgba(217, 119, 6, 1), 0 8px 16px rgba(0, 0, 0, 0.6), inset -2px -2px 8px rgba(0, 0, 0, 0.3), inset 2px 2px 8px rgba(255, 255, 255, 0.3)',
                  border: '4px solid #FCD34D',
                }}
              >
                SPIN
              </div>

              {/* Top Pointer - Prominent */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 z-10 pointer-events-none"
                style={{
                  top: '-14px',
                  width: 0,
                  height: 0,
                  borderLeft: '12px solid transparent',
                  borderRight: '12px solid transparent',
                  borderTop: '20px solid #D4AF37',
                  filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.8))',
                }}
              />

              {/* Pointer glow */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none"
                style={{
                  top: '-4px',
                  width: '3px',
                  height: '16px',
                  background: 'linear-gradient(to bottom, rgba(212, 175, 55, 0.8), transparent)',
                  borderRadius: '2px',
                  filter: 'blur(1px)',
                }}
              />
            </div>
          </div>

          {/* Spin Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning || !canSpin}
            className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white border-2 border-amber-400"
            style={{
              background: isSpinning
                ? 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)'
                : 'linear-gradient(135deg, #FCD34D 0%, #D4AF37 50%, #B8860B 100%)',
              boxShadow: isSpinning
                ? '0 0 30px rgba(212, 175, 55, 0.8), inset 0 0 10px rgba(0, 0, 0, 0.2)'
                : '0 8px 20px rgba(212, 175, 55, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            }}
            aria-label={isSpinning ? 'Spinning the wheel' : 'Spin the wheel to win rewards'}
          >
            {isSpinning ? '🎡 SPINNING... HOLD ON!' : '✨ CLAIM YOUR FORTUNE'}
          </button>

          <p className="text-center text-slate-400 text-xs mt-4 sm:mt-6 tracking-widest uppercase">
            ★ Unlimited Spins • Win Luxury Rewards ★
          </p>
        </div>
      </div>
    );
  }

  // Result state
  if (state === 'result' && selectedReward) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <style>{`
          @keyframes result-celebrate {
            0%, 100% { transform: scale(1) rotateZ(0deg); }
            25% { transform: scale(1.05) rotateZ(-2deg); }
            75% { transform: scale(1.05) rotateZ(2deg); }
          }
          @keyframes sparkle-float {
            0%, 100% { opacity: 1; transform: translateY(0); }
            50% { opacity: 0.5; transform: translateY(-10px); }
          }
          .celebrate {
            animation: result-celebrate 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .sparkle {
            animation: sparkle-float 2s ease-in-out infinite;
          }
          .spin-wheel-modal::-webkit-scrollbar {
            display: none;
          }
          .spin-wheel-modal {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        <div
          className="bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-md w-full border-2 border-amber-600/50 text-center celebrate"
          style={{
            boxShadow: '0 0 60px rgba(212, 175, 55, 0.6), 0 20px 40px rgba(0, 0, 0, 0.8)',
          }}
        >
          <div className="mb-6 sm:mb-8">
            <h2 className="text-4xl sm:text-5xl font-bold mb-2 sm:mb-3">🎉</h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
              CONGRATULATIONS!
            </h3>
          </div>

          {/* Reward Display */}
          <div
            className="bg-gradient-to-br from-amber-600/30 to-amber-800/20 rounded-2xl p-6 sm:p-8 md:p-10 mb-6 sm:mb-8 border-2 border-amber-500/60 sparkle"
            style={{
              boxShadow: '0 0 40px rgba(212, 175, 55, 0.5), inset 0 1px 10px rgba(212, 175, 55, 0.2)',
            }}
          >
            <p className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4">
              {selectedReward.special ? '🎁' : selectedReward.tryAgain ? '🔄' : '💰'}
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-300 mb-2">
              {selectedReward.special
                ? 'Premium Reward'
                : selectedReward.tryAgain
                ? 'Try Again'
                : `€${selectedReward.value} Bonus`}
            </p>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {selectedReward.special
                ? 'You have won an exclusive premium entry!'
                : selectedReward.tryAgain
                ? 'Spin again for another chance.'
                : `A bonus worth €${selectedReward.value} credits is now yours!`}
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1 border-amber-600/50 text-amber-400 hover:bg-amber-600/20"
            >
              Close
            </Button>
            {!isLoggedIn && (
              <Link href="/login" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold">
                  Log In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
