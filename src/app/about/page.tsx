'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Shield, Zap } from 'lucide-react';

export default function AboutPage() {
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900">
              About LuxeRaffle
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Bringing dreams to reality, one raffle ticket at a time
            </p>
          </div>

          {/* Our Story Section */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-[#D4AF37] p-8 sm:p-12 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
              LuxeRaffle was founded in 2020 with a simple mission: to make luxury accessible to everyone. We believed that dreams shouldn't be limited to the wealthy, and that everyone deserves a chance to own their dream car.
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
              What started as a small project has grown into a thriving community of over 500,000 participants across 12 countries. We've successfully distributed luxury vehicles worth over €45 million to fortunate winners, and we're just getting started.
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Today, LuxeRaffle is committed to providing a transparent, secure, and exciting platform where everyone has a fair chance at winning their dream luxury vehicle.
            </p>
          </div>

          {/* Our Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Value 1 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#D4AF37] p-6 sm:p-8">
              <div className="mb-4 flex justify-center">
                <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] p-3 rounded-full">
                  <Heart size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">
                Passion
              </h3>
              <p className="text-gray-600 text-center">
                We're passionate about delivering joy and fulfilling dreams for our community members every single day.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#D4AF37] p-6 sm:p-8">
              <div className="mb-4 flex justify-center">
                <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] p-3 rounded-full">
                  <Shield size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">
                Trust & Security
              </h3>
              <p className="text-gray-600 text-center">
                Your security is our priority. All raffles are conducted with complete transparency and fairness.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#D4AF37] p-6 sm:p-8">
              <div className="mb-4 flex justify-center">
                <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] p-3 rounded-full">
                  <Zap size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">
                Innovation
              </h3>
              <p className="text-gray-600 text-center">
                We continuously innovate to provide the best user experience and fairest raffle system possible.
              </p>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-[#D4AF37] p-8 sm:p-12 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              How LuxeRaffle Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center font-bold text-xl sm:text-2xl mb-4 mx-auto">
                  1
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Choose</h4>
                <p className="text-gray-600 text-sm">
                  Select from our collection of exclusive luxury vehicles
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center font-bold text-xl sm:text-2xl mb-4 mx-auto">
                  2
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Buy</h4>
                <p className="text-gray-600 text-sm">
                  Purchase raffle tickets at transparent, fair prices
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center font-bold text-xl sm:text-2xl mb-4 mx-auto">
                  3
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Draw</h4>
                <p className="text-gray-600 text-sm">
                  We conduct fair draws when all tickets are sold
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center font-bold text-xl sm:text-2xl mb-4 mx-auto">
                  4
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Win!</h4>
                <p className="text-gray-600 text-sm">
                  Claim your dream car and start your adventure
                </p>
              </div>
            </div>
          </div>

          {/* Fun Facts Section */}
          <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#B8860B]/10 rounded-xl border-2 border-[#D4AF37] p-8 sm:p-12 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              Did You Know?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700 text-base">
                  <span className="font-bold text-[#D4AF37]">🏆</span> Our average winner takes home a car worth €150,000+
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700 text-base">
                  <span className="font-bold text-[#D4AF37]">🌍</span> We operate in multiple countries on 3 continents
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700 text-base">
                  <span className="font-bold text-[#D4AF37]">👥</span> Over 90% of our winners are first-time luxury car owners
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700 text-base">
                  <span className="font-bold text-[#D4AF37]">✅</span> 100% of raffles are independently verified and audited
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white rounded-xl shadow-lg border-2 border-[#D4AF37] p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Join Our Community
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Become part of the LuxeRaffle family and take your first step towards owning your dream luxury car today!
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#8B7500] text-white font-bold px-8 py-3 rounded-lg text-lg">
                🚀 Explore Raffles Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
