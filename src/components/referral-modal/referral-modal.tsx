'use client';

import { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { REFERRAL_REWARDS, REFERRAL_MESSAGE, generateReferralLink } from '@/lib/referral-rewards';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  referralCode: string;
  friendsJoined?: number;
}

export const ReferralModal = ({
  isOpen,
  onClose,
  referralCode,
  friendsJoined = 0,
}: ReferralModalProps) => {
  const [copied, setCopied] = useState(false);
  const referralLink = generateReferralLink(referralCode);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>

          <h2 className="text-4xl font-bold mb-2">{REFERRAL_MESSAGE.headline}</h2>
          <p className="text-xl opacity-90">{REFERRAL_MESSAGE.subheading}</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Invitation Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <p className="text-gray-600 mb-4">{REFERRAL_MESSAGE.description}</p>

            {/* Referral Code */}
            <div className="bg-white rounded-lg p-4 mb-4 border-2 border-dashed border-blue-300">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Your Referral Code</p>
              <div className="flex items-center justify-between">
                <code className="text-2xl font-bold text-blue-600 tracking-wider">
                  {referralCode}
                </code>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                >
                  {copied ? (
                    <>
                      <Check size={18} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      <span>{REFERRAL_MESSAGE.copyButtonText}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Share Options */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-semibold"
              >
                <Copy size={20} />
                Copy Link
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Join LuxeRaffle',
                      text: 'Get €5 bonus when you use my referral code!',
                      url: referralLink,
                    });
                  } else {
                    handleCopy();
                  }
                }}
                className="flex items-center justify-center gap-2 p-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors font-semibold"
              >
                <Share2 size={20} />
                Share
              </button>
            </div>
          </div>

          {/* Progress Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Progress</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-bold text-gray-900">{friendsJoined}</span>
                <span className="text-gray-600">friends joined</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
                  style={{ width: `${Math.min((friendsJoined / 5) * 100, 100)}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">0 / 5 friends to unlock next tier</p>
            </div>
          </div>

          {/* Rewards Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Unlock Rewards</h3>
            <div className="space-y-3">
              {REFERRAL_REWARDS.map((reward) => {
                const isUnlocked = friendsJoined >= reward.friendsRequired;
                return (
                  <div
                    key={reward.id}
                    className={`rounded-lg p-4 transition-all ${
                      isUnlocked
                        ? 'bg-green-50 border-2 border-green-300 shadow-md'
                        : 'bg-gray-50 border border-gray-200 opacity-70'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl flex-shrink-0">{reward.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-gray-900">{reward.reward}</h4>
                          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                            isUnlocked
                              ? 'bg-green-200 text-green-800'
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {friendsJoined >= reward.friendsRequired ? '✓ Unlocked' : `${reward.friendsRequired} friends`}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <Button
            onClick={handleCopy}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 text-lg rounded-lg"
          >
            Start Sharing & Earning
          </Button>
        </div>
      </div>
    </div>
  );
};
