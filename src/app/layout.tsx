import localFont from 'next/font/local';
import { cookies } from 'next/headers';

import * as S from '@/app/globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { AuthProvider } from '@/provider/authProvider';
import TanstackProviders from '@/provider/tanstackProviders';

import type { Metadata, Viewport } from 'next';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
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
  const accessToken = cookie.get('access')?.value || null;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanstackProviders>
          <AuthProvider initialToken={accessToken}>
            <Header />
          </AuthProvider>
          <div className={S.container}>{children}</div>
          <Footer />
        </TanstackProviders>
        <div id="root-portal" />
      </body>
    </html>
  );
}
