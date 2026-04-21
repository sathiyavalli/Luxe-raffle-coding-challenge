'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X, LogIn } from 'lucide-react';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginRequiredModal({ isOpen, onClose }: LoginRequiredModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-sm w-full p-6 z-50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-[#D4AF37]/20 p-3">
              <LogIn className="text-[#D4AF37]" size={32} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Login Required
          </h2>

          <p className="text-gray-600 mb-6">
            You need to be logged in to participate in raffles and manage your cart. Sign in to your account to continue.
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Link href="/login" onClick={onClose} className="w-full">
              <Button className="w-full bg-[#D4AF37] hover:bg-[#B8860B] text-white font-semibold">
                Go to Login
              </Button>
            </Link>

            <button
              onClick={onClose}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
