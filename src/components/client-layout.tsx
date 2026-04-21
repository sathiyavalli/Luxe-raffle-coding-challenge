'use client';

import React from 'react';
import ErrorBoundary from '@/components/error-boundary';
import { BackToTop } from '@/components/back-to-top/back-to-top';
import { ReferralNotificationCenter } from '@/components/referral-notification-center/referral-notification-center';
import { TimedRewardBanner } from '@/components/timed-reward-banner/timed-reward-banner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

interface ClientLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}

export function ClientLayout({ children, header, footer }: ClientLayoutProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
            retry: (failureCount, error) => {
              // Don't retry on 4xx errors
              if (error instanceof Error && error.message.includes('4')) {
                return false;
              }
              return failureCount < 3;
            },
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BackToTop />
        <ReferralNotificationCenter />
        <TimedRewardBanner />
        <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
          {header}
          {children}
          {footer}
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
