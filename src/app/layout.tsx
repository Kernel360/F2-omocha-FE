import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Roboto } from 'next/font/google';
import Head from 'next/head';
import { cookies } from 'next/headers';

// import { Category } from '@/apis/types/category';
import * as S from '@/app/globals.css';
import ChattingIconButton from '@/components/Chatting/ChattingIconButton';
import Footer from '@/components/Footer';
import HeaderSection from '@/components/HeaderSection';
import NavigationEvents from '@/components/NavigationEvents';
import ScrollToTopButton from '@/components/ScrollToTopButton';
// import usePrefetchQueryWithCookie from '@/hooks/usePrefetchQueryWithCookie';
import usePrefetchQueriesWithCookie from '@/hooks/usePrefetchQueriesWithCookie';
import { AuthProvider } from '@/provider/authProvider';
import TanstackProviders from '@/provider/tanstackProviders';
import { ToastProvider } from '@/provider/toastProvider';

import type { Metadata, Viewport } from 'next';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Omocha',
  description: 'Hello, Omocha!',
  icons: {
    icon: './icon.ico',
  },
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
  const cookie = cookies();
  const isLoggedIn = cookie.has('access');

  const queryClient = await usePrefetchQueriesWithCookie([
    { queryKey: ['userInfo'], api: '/v2/member' },
    { queryKey: ['category'], api: '/v2/categories' },
  ]);

  return (
    <html lang="en" className={roboto.className}>
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <body suppressHydrationWarning>
        <ToastProvider>
          <TanstackProviders>
            <NavigationEvents />
            <AuthProvider isLoggedIn={isLoggedIn}>
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
