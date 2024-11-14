import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Roboto } from 'next/font/google';
import Head from 'next/head';
import { cookies } from 'next/headers';

import { getCategory } from '@/apis/queryFunctions/category';
import * as S from '@/app/globals.css';
import ChattingIconButton from '@/components/Chatting/ChattingIconButton';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NavigationEvents from '@/components/NavigationEvents';
import ScrollToTopButton from '@/components/ScrollToTopButton';
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
  const queryClient = new QueryClient();

  const cookie = cookies();
  const isLoggedIn = cookie.has('access');

  await queryClient.prefetchQuery({
    queryKey: ['category'],
    queryFn: () => getCategory(),
  });

  return (
    <html lang="en" className={roboto.className}>
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <body>
        <ToastProvider>
          <TanstackProviders>
            <NavigationEvents />
            <AuthProvider isLoggedIn={isLoggedIn}>
              <HydrationBoundary state={dehydrate(queryClient)}>
                <Header />
              </HydrationBoundary>
              <div className={S.container}>
                {children}
                <ChattingIconButton />
                <ScrollToTopButton />
              </div>
            </AuthProvider>
            <Footer />
          </TanstackProviders>
          <div id="root-portal" />
        </ToastProvider>
      </body>
    </html>
  );
}
