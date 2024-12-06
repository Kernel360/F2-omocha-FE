import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Roboto } from 'next/font/google';
import Head from 'next/head';

import * as S from '@/app/globals.css';
import ChattingIconButton from '@/components/Chatting/ChattingIconButton';
import Footer from '@/components/Footer';
import HeaderSection from '@/components/HeaderSection';
import NavigationEvents from '@/components/NavigationEvents';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import usePrefetchQueriesWithCookie from '@/hooks/usePrefetchQueriesWithCookie';
import { AuthProvider } from '@/provider/authProvider';
import TanstackProviders from '@/provider/tanstackProviders';
import { ToastProvider } from '@/provider/toastProvider';
import getMetadata from '@/utils/getMetadata';

import type { Metadata, Viewport } from 'next';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata();
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = await usePrefetchQueriesWithCookie([
    { queryKey: ['category'], api: '/v2/categories' },
  ]);

  return (
    <html lang="ko" className={roboto.className}>
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <body suppressHydrationWarning>
        <ToastProvider>
          <TanstackProviders>
            <NavigationEvents />
            <AuthProvider>
              <HydrationBoundary state={dehydrate(queryClient)}>
                <HeaderSection />
                <div className={S.container}>
                  {children}
                  <ChattingIconButton />
                  <ScrollToTopButton />
                </div>
              </HydrationBoundary>
            </AuthProvider>
            <Footer />
            <ReactQueryDevtools initialIsOpen={false} />
          </TanstackProviders>
          <div id="root-portal" />
        </ToastProvider>
      </body>
    </html>
  );
}
