import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { BackToTop } from '@/components/back-to-top/back-to-top';

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

export default function RootLayout({
  children,
  footer,
  header,
}: Readonly<{
  children: React.ReactNode;
  footer: React.ReactNode;
  header: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <BackToTop />
          <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
            {header}
            {children}
            {footer}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
