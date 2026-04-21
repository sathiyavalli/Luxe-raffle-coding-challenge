'use client';

export const dynamic = 'force-dynamic';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LogOut, ShoppingCart, AlertCircle, CheckCircle, Gift, Users, Zap, TrendingUp } from 'lucide-react';
import { getAuthToken } from '@/lib/auth-cookies';
import { decryptToken } from '@/lib/token';
import { getOrders } from '@/server-functions/getOrders';
import { getRaffles } from '@/server-functions/getRaffles';
import { logout } from '@/server-functions/logout';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User } from '@/types/User';
import { Order } from '@/types/Order';
import { Raffle } from '@/types/Raffle';

export default function AccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [raffles, setRaffles] = useState<Record<string, Raffle>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getAuthToken();
        if (!token) {
          router.push('/login');
          return;
        }

        const userData = decryptToken(token);
        if (!userData) {
          router.push('/login');
          return;
        }

        setUser(userData);

        // Check if returning from successful checkout
        if (searchParams.get('orderSuccess') === 'true') {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 5000);
        }

        // Fetch orders and raffles
        try {
          const [ordersData, rafflesData] = await Promise.all([
            getOrders(),
            getRaffles(),
          ]);

          setOrders(ordersData || []);

          // Create a map of raffles by ID for quick lookup
          const raffleMap: Record<number, Raffle> = {};
          rafflesData.forEach((raffle) => {
            raffleMap[raffle.id] = raffle;
          });
          setRaffles(raffleMap);
        } catch (err) {
          console.error('Failed to fetch orders/raffles:', err);
          setError('Failed to load your orders. Please try again later.');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, searchParams]);

  const handleLogout = async () => {
    router.push('/login');
  };

  // Calculate dashboard metrics
  const totalTickets = orders.reduce((sum, order) => {
    return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
  }, 0);

  const totalSpent = orders.reduce((sum, order) => {
    return sum + order.items.reduce((itemSum, item) => {
      const raffle = raffles[item.id];
      return itemSum + (raffle ? raffle.ticketPrice * item.quantity : 0);
    }, 0);
  }, 0);

  // Mock data for dashboard (can be replaced with real data)
  const dashboardMetrics = {
    activeTickets: totalTickets,
    rewardsAvailable: 5,
    spinsAvailable: 1,
    referrals: { current: 2, total: 5 },
    giftsSent: orders.flatMap(order => 
      order.items.map(item => ({
        raffleId: item.id,
        raffleName: raffles[item.id]?.name || `Raffle #${item.id}`
      }))
    ).slice(0, 3)
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="mt-8 h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-900">Order Confirmed!</p>
              <p className="text-sm text-green-700">
                Your raffle tickets have been purchased successfully.
              </p>
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header with Profile & Logout */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Welcome back, {user.firstName}!</h1>
              <p className="text-gray-600 mt-1">{user.email}</p>
            </div>
            <form action={logout}>
              <Button size="sm" variant="outline" className="border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10" type="submit">
                <LogOut className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Browse Raffles Button */}
          <Link href="/" className="block">
            <button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#8B6914] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Browse Raffles & Try Your Luck
            </button>
          </Link>

          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-2 border-[#D4AF37] bg-gradient-to-br from-[#FDF8F0] to-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🎟️</div>
                  <p className="text-sm text-gray-600 mb-1">Active Tickets</p>
                  <p className="text-2xl font-bold text-[#D4AF37]">{dashboardMetrics.activeTickets}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#D4AF37] bg-gradient-to-br from-[#FDF8F0] to-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🎁</div>
                  <p className="text-sm text-gray-600 mb-1">Rewards Available</p>
                  <p className="text-2xl font-bold text-[#D4AF37]">€{dashboardMetrics.rewardsAvailable}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#D4AF37] bg-gradient-to-br from-[#FDF8F0] to-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🎡</div>
                  <p className="text-sm text-gray-600 mb-1">Spins Available</p>
                  <p className="text-2xl font-bold text-[#D4AF37]">{dashboardMetrics.spinsAvailable}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#D4AF37] bg-gradient-to-br from-[#FDF8F0] to-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">👥</div>
                  <p className="text-sm text-gray-600 mb-1">Referrals</p>
                  <p className="text-2xl font-bold text-[#D4AF37]">{dashboardMetrics.referrals.current}/{dashboardMetrics.referrals.total}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2 space-y-8">
              {/* Your Raffle Tickets - Enhanced */}
              <Card className="border-2 border-[#D4AF37]">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <ShoppingCart className="h-6 w-6 text-[#D4AF37]" />
                    Your Raffle Tickets
                  </CardTitle>
                  <CardDescription>
                    {orders.length === 0
                      ? 'No tickets purchased yet.'
                      : `You have ${orders.length} order${orders.length === 1 ? '' : 's'}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {error ? (
                    <div className="text-center py-8">
                      <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
                      <p className="text-red-600 mb-4">{error}</p>
                      <Button onClick={() => window.location.reload()}>
                        Try Again
                      </Button>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-4">
                        You haven't purchased any raffle tickets yet.
                      </p>
                      <Link href="/" className="block w-full">
                        <Button asChild className="bg-[#D4AF37] hover:bg-[#B8860B] text-white w-full">
                          Browse Raffles
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border-2 border-[#D4AF37]/30 rounded-lg p-4 hover:border-[#D4AF37] hover:shadow-md transition bg-gradient-to-r from-[#FDF8F0] to-white"
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
                            <div>
                              <p className="text-sm text-gray-600">Order ID</p>
                              <p className="font-mono text-sm font-semibold text-[#D4AF37]">
                                {order.id.substring(0, 8)}...
                              </p>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
                              <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
                              Active
                            </span>
                          </div>

                          <div className="space-y-3">
                            {order.items.map((item) => {
                              const raffle = raffles[item.id];
                              const soldPercentage = raffle ? ((raffle.totalTickets - raffle.availableTickets) / raffle.totalTickets) * 100 : 0;
                              return (
                                <div key={item.id} className="space-y-2">
                                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                    <div>
                                      <p className="font-semibold text-gray-900">
                                        {raffle?.name || `Raffle #${item.id}`}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        Tickets: {item.quantity} × €{raffle?.ticketPrice || '-'}
                                      </p>
                                    </div>
                                    <p className="font-bold text-[#D4AF37] text-lg">
                                      €{raffle
                                        ? (raffle.ticketPrice * item.quantity).toLocaleString('de-DE')
                                        : '-'}
                                    </p>
                                  </div>

                                  {/* Progress Bar */}
                                  {raffle && (
                                    <div className="space-y-1">
                                      <div className="flex justify-between items-center text-xs text-gray-600">
                                        <span>{Math.round(soldPercentage)}% Sold</span>
                                        <span>{raffle.totalTickets - raffle.availableTickets}/{raffle.totalTickets}</span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div
                                          className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] h-full rounded-full"
                                          style={{ width: `${soldPercentage}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          <div className="mt-4 pt-3 border-t border-[#D4AF37]/30 flex justify-between items-center">
                            <span className="text-xs font-semibold text-gray-600">
                              Total Tickets: {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                            </span>
                            <Link href="/">
                              <Button size="sm" variant="outline" className="text-xs border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
                                View Raffle
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Purchase Analytics Chart */}
              {orders.length > 0 && (
                <Card className="border-2 border-[#D4AF37]">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-[#D4AF37]" />
                      Purchase Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-blue-300">
                        <p className="text-sm text-blue-700 font-semibold mb-1">Total Orders</p>
                        <p className="text-2xl font-bold text-blue-900">{orders.length}</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border-2 border-green-300">
                        <p className="text-sm text-green-700 font-semibold mb-1">Total Tickets</p>
                        <p className="text-2xl font-bold text-green-900">{totalTickets}</p>
                      </div>
                      <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#B8860B]/20 rounded-lg p-4 border-2 border-[#D4AF37]">
                        <p className="text-sm text-[#8B7500] font-semibold mb-1">Total Spent</p>
                        <p className="text-2xl font-bold text-[#D4AF37]">€{totalSpent.toLocaleString('de-DE')}</p>
                      </div>
                    </div>

                    {/* Simple Bar Chart */}
                    <div className="mt-6 space-y-2 max-h-64 overflow-y-auto">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Spending by Raffle</p>
                      {orders.map((order) => (
                        <div key={order.id} className="space-y-1">
                          {order.items.map((item) => {
                            const raffle = raffles[item.id];
                            const spent = raffle ? raffle.ticketPrice * item.quantity : 0;
                            const percentage = (spent / totalSpent) * 100;
                            return (
                              <div key={`${order.id}-${item.id}`}>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="font-semibold text-gray-700 truncate">{raffle?.name || `Raffle #${item.id}`}</span>
                                  <span className="text-gray-600">€{(spent).toLocaleString('de-DE')}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] h-full rounded-full transition-all"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar - Right Side */}
            <div className="space-y-8">
              {/* Rewards & Bonuses */}
              <Card className="border-2 border-[#D4AF37]">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Gift className="h-5 w-5 text-[#D4AF37]" />
                    Rewards & Bonuses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-lg p-4 space-y-2">
                    <p className="font-semibold text-yellow-900">🎉 €{dashboardMetrics.rewardsAvailable} Bonus Available</p>
                    <Button size="sm" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                      Claim Reward
                    </Button>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-300 rounded-lg p-4 space-y-2">
                    <p className="font-semibold text-purple-900">🎡 {dashboardMetrics.spinsAvailable} Free Spin Ready</p>
                    <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      Spin Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Referral Section */}
              <Card className="border-2 border-[#D4AF37]">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#D4AF37]" />
                    Referral Program
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="font-semibold text-gray-700">Friends Joined</span>
                      <span className="font-bold text-[#D4AF37]">{dashboardMetrics.referrals.current}/{dashboardMetrics.referrals.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] h-full rounded-full"
                        style={{ width: `${(dashboardMetrics.referrals.current / dashboardMetrics.referrals.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full bg-[#D4AF37] hover:bg-[#B8860B] text-white">
                    Invite Friends
                  </Button>
                </CardContent>
              </Card>

              {/* Gift Activity */}
              {dashboardMetrics.giftsSent.length > 0 && (
                <Card className="border-2 border-[#D4AF37]">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Gift className="h-5 w-5 text-[#D4AF37]" />
                      Recent Gifts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {dashboardMetrics.giftsSent.map((gift, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 bg-gradient-to-r from-[#FDF8F0] to-white rounded border border-[#D4AF37]/20">
                          <span className="text-lg">🎁</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{gift.raffleName}</p>
                            <p className="text-xs text-gray-600">Gift sent</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
