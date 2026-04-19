'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LogOut, ShoppingCart, AlertCircle, CheckCircle } from 'lucide-react';
import { getAuthToken } from '@/lib/auth-cookies';
import { decryptToken } from '@/lib/token';
import { getOrders } from '@/server-functions/getOrders';
import { getRaffles } from '@/server-functions/getRaffles';
import { logout } from '@/server-functions/logout';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [raffles, setRaffles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          const raffleMap = {};
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
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
    <div className="container mx-auto px-4 py-8">
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <div>
            <p className="font-semibold text-green-900">Order Confirmed!</p>
            <p className="text-sm text-green-700">
              Your raffle tickets have been purchased successfully.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Account Information</CardTitle>
            <CardDescription>Welcome back, {user.firstName}!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">First Name</p>
                <p className="text-lg font-semibold">{user.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <form action={logout} className="w-full">
              <Button variant="destructive" className="w-full" type="submit">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </form>
          </CardFooter>
        </Card>

        {/* Orders Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <ShoppingCart className="h-6 w-6" />
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
                <Link href="/">
                  <Button>Browse Raffles</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-mono text-sm font-semibold">
                          {order.id.substring(0, 8)}...
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item) => {
                        const raffle = raffles[item.id];
                        return (
                          <div
                            key={item.id}
                            className="flex justify-between items-center p-2 bg-gray-50 rounded"
                          >
                            <div>
                              <p className="font-semibold">
                                {raffle?.name || `Raffle #${item.id}`}
                              </p>
                              <p className="text-sm text-gray-600">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                {raffle
                                  ? (
                                      raffle.ticketPrice * item.quantity
                                    ).toLocaleString('de-DE')
                                  : '-'}{' '}
                                €
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        Status: <span className="font-semibold">Confirmed</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Tickets: {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          {orders.length > 0 && (
            <CardFooter>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full">
                  Browse More Raffles
                </Button>
              </Link>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
