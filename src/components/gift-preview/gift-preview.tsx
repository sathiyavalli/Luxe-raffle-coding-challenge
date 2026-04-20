'use client';

import { Raffle } from '@/types/Raffle';
import Image from 'next/image';

interface GiftPreviewProps {
  raffle: Raffle;
  tickets: number;
  message: string;
  senderName: string;
  recipientEmail: string;
}

export default function GiftPreview({
  raffle,
  tickets,
  message,
  senderName,
  recipientEmail,
}: GiftPreviewProps) {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-[#FDF8F0] to-[#FAF4E6]">
      <div className="w-full max-w-sm">
        {/* Gift Card Container */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-[#D4AF37] transform transition-all hover:scale-105">
          {/* Gold Header */}
          <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] px-6 py-8 text-center text-white">
            <div className="text-5xl mb-2">🎁</div>
            <h3 className="text-2xl font-bold">Gift Certificate</h3>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Prize Section */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Prize</p>
              <p className="text-xl font-bold text-[#8B7500] mt-2">{raffle.name}</p>
              {raffle.image && (
                <div className="relative w-full h-40 mt-3 rounded-lg overflow-hidden border-2 border-[#D4AF37]/20">
                  <Image
                    src={raffle.image}
                    alt={raffle.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Tickets */}
            <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#8B5CF6]/10 rounded-lg p-4 border-2 border-dashed border-[#D4AF37]">
              <p className="text-sm text-gray-600">Number of Tickets</p>
              <p className="text-3xl font-bold text-[#D4AF37] mt-1">{tickets}</p>
            </div>

            {/* Message */}
            {message && (
              <div className="border-l-4 border-[#D4AF37] pl-4 py-2 bg-[#FDF8F0]">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Message</p>
                <p className="text-gray-700 mt-2 italic">"{message}"</p>
              </div>
            )}

            {/* From Section */}
            <div className="space-y-3 pt-4 border-t-2 border-[#D4AF37]/20">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">From</p>
                <p className="text-lg font-semibold text-[#8B7500] mt-1">{senderName}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">To</p>
                <p className="text-lg font-semibold text-[#8B7500] mt-1 break-words">{recipientEmail}</p>
              </div>
            </div>

            {/* Value Display */}
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-lg p-4 text-center text-white">
              <p className="text-sm font-semibold opacity-90">Total Value</p>
              <p className="text-3xl font-bold mt-1">
                €{(raffle.ticketPrice * tickets).toLocaleString('de-DE')}
              </p>
            </div>

            {/* Footer Date */}
            <div className="text-center text-xs text-gray-500 pt-2">
              <p>Sent on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>

          {/* Decorative Footer */}
          <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#8B5CF6]/20 h-2"></div>
        </div>

        {/* Instructional Text */}
        <p className="text-center text-xs text-gray-500 mt-4">
          This is a preview of how your gift card will appear to the recipient.
        </p>
      </div>
    </div>
  );
}
