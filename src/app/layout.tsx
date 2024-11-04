import { Roboto } from 'next/font/google';
import Head from 'next/head';
import { cookies } from 'next/headers';

import * as S from '@/app/globals.css';
import ChattingIconButton from '@/components/Chatting/ChattingIconButton';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NavigationEvents from '@/components/NavigationEvents';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { AuthProvider } from '@/provider/authProvider';
import TanstackProviders from '@/provider/tanstackProviders';

import type { Metadata, Viewport } from 'next';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  icons: {
    icon: './favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = cookies();
  const isLoggedIn = cookie.has('access');

  return (
    <html lang="en" className={roboto.className}>
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <body>
        <TanstackProviders>
          <NavigationEvents />
          <AuthProvider isLoggedIn={isLoggedIn}>
            <Header />
            <div className={S.container}>
              {children}
              <ChattingIconButton />
              <ScrollToTopButton />
            </div>
          </AuthProvider>
          <Footer />
        </TanstackProviders>
        <div id="root-portal" />
      </body>
    </html>
  );
}
