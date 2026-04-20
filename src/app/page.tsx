'use client';

import RafflesGrid from '@/components/raffles-grid/raffles-grid';
import { getRaffles } from '@/server-functions/getRaffles';
import { Raffle } from '@/types/Raffle';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

export default function Home() {
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('luxeRaffleVisited');
    const username = user?.firstName || 'Guest';
    
    let message = '';
    if (!hasVisited) {
      message = `Welcome ${username}! 🏎️`;
      localStorage.setItem('luxeRaffleVisited', 'true');
    } else {
      message = `Welcome back, ${username}! ✨`;
    }
    
    setWelcomeMessage(message);
    setShowToast(true);
    
    // Auto-hide toast after 4 seconds
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [user?.firstName]);

  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        setLoading(true);
        const data = await getRaffles();
        setRaffles(data);
      } catch (err) {
        console.error('Failed to fetch raffles:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchRaffles();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-[#FDF8F0] rounded w-1/4 mx-auto mb-8 border border-[#D4AF37]"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-[#FDF8F0] rounded-lg shadow-md overflow-hidden border-2 border-[#D4AF37]">
                <div className="h-48 bg-[#FAF4E6]"></div>
                <div className="p-4">
                  <div className="h-6 bg-[#FAF4E6] rounded mb-2"></div>
                  <div className="h-4 bg-[#FAF4E6] rounded mb-2"></div>
                  <div className="h-4 bg-[#FAF4E6] rounded w-3/4 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-8 bg-[#D4AF37] rounded w-20"></div>
                    <div className="h-8 bg-[#D4AF37] rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Raffles</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#D4AF37] hover:bg-[#B8860B] text-white px-4 py-2 rounded font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Welcome Toast Notification */}
      {showToast && welcomeMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top">
          <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white px-6 py-4 rounded-lg shadow-xl font-medium text-lg flex items-center gap-2">
            <span className="text-2xl">✨</span>
            {welcomeMessage}
          </div>
        </div>
      )}
      <RafflesGrid raffles={raffles} />
    </>
  );
}
