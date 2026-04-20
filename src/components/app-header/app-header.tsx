import { ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getAuthToken } from '@/lib/auth-cookies';
import { decryptToken } from '@/lib/token';
import { UserMenu } from '../user-menu/user-menu';
import { ActivityDropdown } from '../activity-dropdown/activity-dropdown';

// Dynamically import CartIcon as client component
const CartIcon = dynamic(() => import('../cart-icon/cart-icon'), {
  loading: () => (
    <div className="relative animate-pulse">
      <ShoppingCart size={24} className="text-[#D4AF37] mt-1" />
      <div className="absolute -top-2 -right-2 h-5 w-5 bg-[#D4AF37] rounded-full"></div>
    </div>
  )
});

export const AppHeader = async () => {
  const token = await getAuthToken();
  const user = token ? decryptToken(token) : null;
  const firstName = user?.firstName || '';

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b-2 border-[#D4AF37]">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-8 flex-1">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-gray-800 whitespace-nowrap hover:text-[#D4AF37] transition-colors">
            LuxeRaffle
          </Link>

          <nav className="hidden sm:block">
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/winners"
                  className="text-gray-600 hover:text-[#D4AF37] transition-colors font-medium"
                >
                  Winners
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-[#D4AF37] transition-colors font-medium"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6">
          <ActivityDropdown />
          <CartIcon />
          {firstName ? (
            <UserMenu firstName={firstName} />
          ) : (
            <Link href="/login" className="text-gray-600 hover:text-[#D4AF37] transition-colors flex-shrink-0">
              <User size={24} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
