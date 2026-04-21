'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trophy, ArrowLeft } from 'lucide-react';

export default function WinnersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Back Button */}
        <div className="mb-8 sm:mb-12">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={18} />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="mb-4 sm:mb-6 flex justify-center">
              <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] p-4 sm:p-6 rounded-full">
                <Trophy size={48} className="text-white sm:w-16 sm:h-16" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900">
              🏆 Previous Winners
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Celebrating the fortunate winners from our past raffles. Current event winners will be selected once all tickets are sold.
            </p>
          </div>

          {/* Featured Winners Section */}
          <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#B8860B]/10 rounded-xl border-2 border-[#D4AF37] p-6 sm:p-8 md:p-10 mb-12 sm:mb-16">
            <div className="flex items-start gap-4">
              <span className="text-4xl flex-shrink-0">🎲</span>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Current Raffle In Progress
                </h3>
                <p className="text-gray-700 text-base mb-2">
                  Our current raffle events are actively ongoing! As tickets continue to be sold by our community members, we're getting closer to our drawing date.
                </p>
                <p className="text-gray-700 text-base">
                  Once all available tickets for a raffle are sold, we'll conduct a fair and verified drawing to select the winner. The lucky winner will be announced and joined to our prestigious list of LuxeRaffle champions!
                </p>
              </div>
            </div>
          </div>

          {/* Featured Winners Section */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Previous Winners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Winner 1 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#D4AF37] p-6 sm:p-8 hover:shadow-xl transition-shadow">
              <div className="mb-4 text-5xl">🎉</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Marco Ferrari
              </h3>
              <p className="text-[#D4AF37] font-semibold mb-3">
                Ferrari 488 GTB
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Marco won his dream Ferrari in March 2026. An automotive enthusiast from Milan, Italy, he has been a loyal LuxeRaffle participant for over a year. His win was celebrated across social media!
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>🗓️ March 2026</span>
              </div>
            </div>

            {/* Winner 2 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#D4AF37] p-6 sm:p-8 hover:shadow-xl transition-shadow">
              <div className="mb-4 text-5xl">🚗</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Sarah Mitchell
              </h3>
              <p className="text-[#D4AF37] font-semibold mb-3">
                Rolls-Royce Phantom
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Sarah claimed the prestigious Rolls-Royce Phantom in February 2026. Based in London, she described the experience as "absolutely surreal" and has been enjoying her luxury vehicle ever since.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>🗓️ February 2026</span>
              </div>
            </div>

            {/* Winner 3 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#D4AF37] p-6 sm:p-8 hover:shadow-xl transition-shadow">
              <div className="mb-4 text-5xl">⚡</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Alex Chen
              </h3>
              <p className="text-[#D4AF37] font-semibold mb-3">
                Lamborghini Huracán
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Alex's winning ticket secured him a stunning Lamborghini Huracán in January 2026. A photography enthusiast, he has shared incredible photos of his new ride on his social media platforms.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>🗓️ January 2026</span>
              </div>
            </div>

            {/* Winner 4 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#D4AF37] p-6 sm:p-8 hover:shadow-xl transition-shadow">
              <div className="mb-4 text-5xl">💎</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Isabella Romano
              </h3>
              <p className="text-[#D4AF37] font-semibold mb-3">
                Aston Martin DB11
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Isabella's fortune changed in December 2025 when she won the elegant Aston Martin DB11. An avid car collector from Monaco, she added this British masterpiece to her prestigious collection.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>🗓️ December 2025</span>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#B8860B]/10 rounded-xl border-2 border-[#D4AF37] p-8 sm:p-12 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              LuxeRaffle by the Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#D4AF37] mb-2">
                  150+
                </div>
                <p className="text-gray-600 text-sm">Happy Winners</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#D4AF37] mb-2">
                  €45M+
                </div>
                <p className="text-gray-600 text-sm">Prizes Awarded</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#D4AF37] mb-2">
                  500K+
                </div>
                <p className="text-gray-600 text-sm">Participants</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#D4AF37] mb-2">
                  12
                </div>
                <p className="text-gray-600 text-sm">Countries</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white rounded-xl shadow-lg border-2 border-[#D4AF37] p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ready to Win Your Dream Car?
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Your chances of winning start with your first raffle ticket. Join thousands of lucky winners and be part of the LuxeRaffle success story.
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#8B7500] text-white font-bold px-8 py-3 rounded-lg text-lg">
                🎯 Start Playing Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
