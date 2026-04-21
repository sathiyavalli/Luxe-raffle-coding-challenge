'use client';

export const dynamic = 'force-dynamic';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { order } from '@/server-functions/order';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Redirect if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <AlertCircle className="mx-auto h-24 w-24 text-orange-400 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Login Required
            </h1>
            <p className="text-gray-600 mb-6">
              Please log in to your account to complete your purchase.
            </p>
            <Link href="/login">
              <Button>Go to Login</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <AlertCircle className="mx-auto h-24 w-24 text-yellow-400 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Cart is Empty
            </h1>
            <p className="text-gray-600 mb-6">
              Please add items to your cart before proceeding to checkout.
            </p>
            <Link href="/cart">
              <Button>Back to Cart</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      setError(null);

      // Convert cart items to OrderItem format (id and quantity)
      const orderItems = items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));

      // Call order server function
      await order({ items: orderItems });

      // Success
      setSuccess(true);
      clearCart();

      // Redirect to account page after 2 seconds
      setTimeout(() => {
        router.push('/account?orderSuccess=true');
      }, 2000);
    } catch (err) {
      console.error('Order failed:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to place order. Please try again.'
      );
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <CheckCircle className="mx-auto h-24 w-24 text-green-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your raffle tickets are ready!
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to your account...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Review */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold">Order Review</h2>
              </div>

              <ul className="divide-y">
                {items.map((item) => (
                  <li key={item.id} className="p-6 flex items-center gap-4">
                    <Image
                      src={item.raffle.image || '/placeholder.svg'}
                      alt={item.raffle.name}
                      width={120}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">
                        {item.raffle.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {item.raffle.description}
                      </p>
                      <div className="mt-2 flex justify-between items-center">
                        <p className="text-green-600 font-semibold">
                          {item.raffle.ticketPrice} € × {item.quantity}
                        </p>
                        <p className="text-lg font-bold">
                          {(
                            item.raffle.ticketPrice * item.quantity
                          ).toLocaleString('de-DE')}{' '}
                          €
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary & Confirm */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items:</span>
                  <span className="font-semibold">{items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tickets:</span>
                  <span className="font-semibold">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-green-600">
                    {cartTotal.toLocaleString('de-DE')} €
                  </span>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <Button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full mb-3 gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm Order'
                )}
              </Button>

              <Link href="/cart">
                <Button variant="outline" className="w-full" disabled={loading}>
                  Back to Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
