'use client';

import { useState } from 'react';
import { Raffle } from '@/types/Raffle';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import GiftPreview from '../gift-preview/gift-preview';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  raffle: Raffle;
  availableTickets: number;
}

export default function GiftModal({ isOpen, onClose, raffle, availableTickets }: GiftModalProps) {
  const [selectedTickets, setSelectedTickets] = useState<number>(1);
  const [message, setMessage] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const { user } = useAuth();
  const { addGiftItem } = useCart();

  const handleSendGift = () => {
    if (!recipientEmail.trim()) {
      alert('Please enter recipient email');
      return;
    }

    // Add gift to cart
    addGiftItem(raffle, selectedTickets, {
      recipientEmail,
      message,
      senderName: user?.firstName || 'A Friend',
    });

    // Show confirmation
    setShowConfirmation(true);
    
    // Reset form
    setTimeout(() => {
      setSelectedTickets(1);
      setMessage('');
      setRecipientEmail('');
      setShowPreview(false);
      setShowConfirmation(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  // Confirmation Message
  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full shadow-2xl border-2 border-[#D4AF37] p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-[#8B7500] mb-2">Gift Added to Cart!</h2>
          <p className="text-gray-600 mb-4">
            The gift has been added to your cart. You can edit the message anytime before checkout.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            After purchase, the gift email will be sent to <strong>{recipientEmail}</strong>
          </p>
          <div className="text-4xl mb-4">🎁</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#D4AF37]">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#FDF8F0] to-[#FAF4E6] border-b-2 border-[#D4AF37] p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#8B7500]">🎁 Gift This Ticket</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#8B7500]">Prize</h3>
              <div className="bg-gradient-to-br from-[#FDF8F0] to-[#FAF4E6] border-2 border-[#D4AF37] rounded-lg p-4">
                <p className="font-bold text-lg text-gray-800">{raffle.name}</p>
                <p className="text-sm text-gray-600 mt-1">{raffle.description}</p>
                <p className="text-[#D4AF37] font-semibold mt-2">
                  €{raffle.ticketPrice} per ticket
                </p>
              </div>
            </div>

            {/* Ticket Selection */}
            <div>
              <label className="block text-sm font-semibold text-[#8B7500] mb-3">
                Number of Tickets to Gift
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 5, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSelectedTickets(num)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedTickets === num
                        ? 'bg-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/50'
                        : 'bg-gray-100 text-gray-700 border-2 border-[#D4AF37] hover:bg-[#D4AF37]/10'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min="1"
                max={100}
                value={selectedTickets}
                onChange={(e) => setSelectedTickets(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full mt-3 px-4 py-2 border-2 border-[#D4AF37] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
              />
            </div>

            {/* Recipient Email */}
            <div>
              <label className="block text-sm font-semibold text-[#8B7500] mb-2">
                Recipient Email
              </label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="recipient@example.com"
                className="w-full px-4 py-2 border-2 border-[#D4AF37] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
              />
              <p className="text-xs text-gray-500 mt-1">They'll receive the gift after you purchase</p>
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-sm font-semibold text-[#8B7500] mb-2">
                Personal Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a special message with your gift..."
                maxLength={200}
                rows={4}
                className="w-full px-4 py-2 border-2 border-[#D4AF37] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">{message.length}/200 characters</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setShowPreview(!showPreview)}
                variant="outline"
                className="flex-1 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold hover:bg-[#D4AF37]/10"
              >
                {showPreview ? '← Back' : 'Preview →'}
              </Button>
              <Button
                onClick={handleSendGift}
                disabled={!recipientEmail.trim()}
                className="flex-1 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8860B] transition-all shadow-lg shadow-[#D4AF37]/50 disabled:opacity-50"
              >
                Add to Cart
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100"
              >
                Cancel
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          {showPreview ? (
            <GiftPreview
              raffle={raffle}
              tickets={selectedTickets}
              message={message}
              senderName={user?.firstName || 'A Friend'}
              recipientEmail={recipientEmail}
            />
          ) : (
            <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#FDF8F0] to-[#FAF4E6] rounded-lg border-2 border-dashed border-[#D4AF37]/30 p-8">
              <div className="text-center">
                <p className="text-gray-500 mb-2">👉 Click "Preview" to see</p>
                <p className="text-gray-500 mb-4">how your gift will look</p>
                <div className="text-4xl">🎁</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
