export const REFERRAL_REWARDS = [
  {
    id: 1,
    friendsRequired: 1,
    reward: '€5 Bonus Credit',
    description: 'Get an instant €5 bonus to spend',
    icon: '🎁',
    unlocked: true,
  },
  {
    id: 2,
    friendsRequired: 3,
    reward: 'Free Raffle Entry',
    description: 'Get a free ticket to any raffle',
    icon: '🎟️',
    unlocked: false,
  },
  {
    id: 3,
    friendsRequired: 5,
    reward: 'Bonus Entries',
    description: 'Get 3x bonus spins on the wheel',
    icon: '🎡',
    unlocked: false,
  },
];

export const REFERRAL_MESSAGE = {
  headline: 'Invite Friends. Earn Rewards. 🎁',
  subheading: 'Give €5, Get €5',
  description: 'Share your unique code and unlock amazing rewards as your friends join!',
  copyButtonText: 'Copy & Share',
  copiedText: 'Copied to clipboard!',
};

export const generateReferralLink = (code: string): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}?ref=${code}`;
};
