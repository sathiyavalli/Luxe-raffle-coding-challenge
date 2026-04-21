'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { logout } from '@/server-functions/logout';
import { UserCircle, LogOut, User as UserIcon } from 'lucide-react';

interface UserMenuProps {
  firstName: string;
}

export const UserMenu = ({ firstName }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on mobile when item is clicked
  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Status Button - Icon + Name + Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#FDF8F0] cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className="relative">
          <UserCircle size={28} className="text-[#D4AF37]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <span className="text-sm font-semibold text-gray-800">{firstName}</span>
        
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* User Name Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold text-gray-800">{firstName}</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-xs font-semibold text-green-600">Online</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {/* Account Link */}
            <Link href="/account" onClick={handleMenuItemClick}>
              <div className="px-4 py-2 text-sm text-gray-700 hover:bg-[#FDF8F0] cursor-pointer transition-colors duration-150 flex items-center gap-3">
                <UserIcon size={18} className="text-[#D4AF37]" />
                Account
              </div>
            </Link>

            {/* Logout Button */}
            <form action={logout}>
              <button
                type="submit"
                onClick={handleMenuItemClick}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#FDF8F0] transition-colors duration-150 flex items-center gap-3"
              >
                <LogOut size={18} className="text-[#D4AF37]" />
                Logout
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
