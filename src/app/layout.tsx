import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { BackToTop } from '@/components/back-to-top/back-to-top';
import { AuthProvider } from '@/context/AuthContext';
import { ReferralNotificationCenter } from '@/components/referral-notification-center/referral-notification-center';
import { TimedRewardBanner } from '@/components/timed-reward-banner/timed-reward-banner';
import { SpinWheel } from '@/components/spin-wheel/spin-wheel';
import { ClientWrapper } from '@/components/client-wrapper';
import { getAuthToken } from '@/lib/auth-cookies';
import { decryptToken } from '@/lib/token';

// Force dynamic rendering to prevent build-time cookie access errors
export const dynamic = 'force-dynamic';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
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
  let isLoggedIn = false;
  let user = null;
  
  try {
    const token = await getAuthToken();
    if (token) {
      user = decryptToken(token);
      isLoggedIn = !!user?.firstName;
    }
  } catch (error) {
    // Silently fail during build time when cookies aren't available
    // This is expected during static generation phase
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/images/hero-bg.png" as="image" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientWrapper>
          <CartProvider>
            <AuthProvider isLoggedIn={isLoggedIn} user={user}>
              {isLoggedIn && (
                <>
                  <BackToTop />
                  <ReferralNotificationCenter />
                  <TimedRewardBanner />
                  <SpinWheel isLoggedIn={isLoggedIn} />
                </>
              )}
              <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
                {header}
                {children}
                {footer}
              </div>
            </AuthProvider>
          </CartProvider>
        </ClientWrapper>
      </body>
    </html>
  );
}
