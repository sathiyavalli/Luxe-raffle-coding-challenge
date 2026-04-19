import { ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getAuthToken } from '@/lib/auth-cookies';
import { decryptToken } from '@/lib/token';
import { UserMenu } from '../user-menu/user-menu';

// Dynamically import CartIcon as client component
const CartIcon = dynamic(() => import('../cart-icon/cart-icon'), {
  loading: () => (
    <div className="relative animate-pulse">
      <ShoppingCart size={24} className="text-gray-400 mt-1" />
      <div className="absolute -top-2 -right-2 h-5 w-5 bg-gray-300 rounded-full"></div>
    </div>
  )
});

export const AppHeader = async () => {
  const token = await getAuthToken();
  const user = token ? decryptToken(token) : null;
  const firstName = user?.firstName || '';

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            LuxeRaffle
          </Link>

          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/winners"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Winners
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-800"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center space-x-6">
          <CartIcon />
          {firstName ? (
            <UserMenu firstName={firstName} />
          ) : (
            <Link href="/login" className="text-gray-600 hover:text-gray-800 transition-colors">
              <User size={24} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
