'use client';

import RafflesGrid from '@/components/raffles-grid/raffles-grid';
import { getRaffles } from '@/server-functions/getRaffles';
import { Raffle } from '@/types/Raffle';
import { useEffect, useState } from 'react';

export default function Home() {
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('luxeRaffleVisited');
    if (!hasVisited) {
      setWelcomeMessage('Welcome to LuxeRaffle! 🏎️');
      localStorage.setItem('luxeRaffleVisited', 'true');
    } else {
      setWelcomeMessage('Welcome back! ✨');
    }
  }, []);

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
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {welcomeMessage && (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 text-center font-medium animate-fade-in-down">
          {welcomeMessage}
        </div>
      )}
      <RafflesGrid raffles={raffles} />
    </>
  );
}
