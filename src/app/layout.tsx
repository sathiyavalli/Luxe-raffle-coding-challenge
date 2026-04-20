import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { BackToTop } from '@/components/back-to-top/back-to-top';
import { SpinWheel } from '@/components/spin-wheel/spin-wheel';
import { AuthProvider } from '@/context/AuthContext';
import { ReferralNotificationCenter } from '@/components/referral-notification-center/referral-notification-center';
import { TimedRewardBanner } from '@/components/timed-reward-banner/timed-reward-banner';
import { getAuthToken } from '@/lib/auth-cookies';
import { decryptToken } from '@/lib/token';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LuxeRaffle',
};

export default async function RootLayout({
  children,
  footer,
  header,
}: Readonly<{
  children: React.ReactNode;
  footer: React.ReactNode;
  header: React.ReactNode;
}>) {
  const token = await getAuthToken();
  const user = token ? decryptToken(token) : null;
  const isLoggedIn = !!user?.firstName;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <AuthProvider isLoggedIn={isLoggedIn} user={user}>
            <BackToTop />
            <SpinWheel isLoggedIn={isLoggedIn} />
            <ReferralNotificationCenter />
            <TimedRewardBanner />
            <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
              {header}
              {children}
              {footer}
            </div>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
