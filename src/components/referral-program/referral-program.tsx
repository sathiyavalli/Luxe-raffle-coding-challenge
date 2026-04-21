'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, Gift, TrendingUp, LogIn } from 'lucide-react';
import Link from 'next/link';
import { ReferralModal } from '../referral-modal/referral-modal';

interface ReferralProgramProps {
  userName?: string;
  isLoggedIn: boolean;
}

export const ReferralProgram = ({ userName = 'User', isLoggedIn }: ReferralProgramProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [friendsJoined, setFriendsJoined] = useState(0);

  // Generate referral code
  const referralCode = isLoggedIn ? `${userName.toUpperCase().slice(0, 4)}2024` : 'LOGIN2024';

  // Simulate friends joined (in real app, fetch from backend)
  useEffect(() => {
    if (isLoggedIn) {
      // Mock data: random number of friends joined (0-5)
      const stored = localStorage.getItem(`luxe-friends-${referralCode}`);
      if (stored) {
        setFriendsJoined(parseInt(stored));
      } else {
        const simulated = Math.floor(Math.random() * 3); // 0-2 friends
        localStorage.setItem(`luxe-friends-${referralCode}`, simulated.toString());
        setFriendsJoined(simulated);
      }
    }
  }, [isLoggedIn, referralCode]);

  const handleCopy = () => {
    const link = `${typeof window !== 'undefined' ? window.location.origin : ''}?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isLoggedIn) {
    return (
      <Link href="/login" className="block w-full">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-[#D4AF37] rounded-lg p-4 cursor-pointer hover:shadow-lg hover:scale-105 transition-all">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Gift size={20} className="text-[#D4AF37]" />
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-sm">Invite & Earn</h4>
              <p className="text-xs text-gray-600 mt-1">
                Give €5, Get €5 🎁
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <LogIn size={20} className="text-[#D4AF37]" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  const unlockedCount = friendsJoined;

  return (
    <>
      <div
        className="w-full bg-gradient-to-br from-[#FDF8F0] to-[#FAF4E6] border-2 border-[#D4AF37] rounded-lg p-4 hover:shadow-lg hover:border-[#B8860B] transition-all min-h-[220px] flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Gift size={20} className="text-[#D4AF37]" />
            <h4 className="font-semibold text-gray-900 text-sm">Invite & Earn</h4>
          </div>
          <TrendingUp size={18} className="text-[#D4AF37]" />
        </div>

        <p className="text-xs text-gray-600 mb-3">Give €5, Get €5</p>

        {/* Mini Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-gray-900">{friendsJoined}/5 Friends</span>
            <span className="text-xs text-gray-500">{unlockedCount} reward{unlockedCount !== 1 ? 's' : ''}</span>
          </div>
          <div className="w-full bg-[#FDF8F0] rounded-full h-2 border border-[#D4AF37]">
            <div
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min((friendsJoined / 5) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          {/* Copy Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-[#FDF8F0] text-[#D4AF37] rounded-lg border border-[#D4AF37] transition-all font-semibold text-sm"
          >
            {copied ? (
              <>
                <Check size={16} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy Link
              </>
            )}
          </button>

          {/* Invite Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#8B7500] text-white rounded-lg border border-[#D4AF37] transition-all font-semibold text-sm"
          >
            <Gift size={16} />
            Invite Friends
          </button>
        </div>
      </div>

      {/* Referral Modal */}
      <ReferralModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        referralCode={referralCode}
        friendsJoined={friendsJoined}
      />
    </>
  );
};
