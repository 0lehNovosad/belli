import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/Providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

const WebVitals = dynamic(() => import('@/components/performance/WebVitals').then((m) => ({ default: m.WebVitals })), {
  ssr: false,
});

const manrope = Manrope({
  variable: '--font-display',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});
const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#166534',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bellizoo.com.ua'),
  title: {
    default: 'BelliZoo — Зоотовари для собак та котів | Львів',
    template: '%s | BelliZoo',
  },
  description:
    'Купити зоотовари у Львові онлайн: корм для собак і котів, аксесуари, наповнювачі. Безкоштовна доставка від 1000 грн. 14 днів повернення.',
  keywords: ['зоотовари', 'корм для собак', 'корм для котів', 'BelliZoo', 'Львів'],
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: 'BelliZoo',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${manrope.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://bellizoo.com.ua" />
      </head>
      <body className="min-h-screen flex flex-col font-sans" suppressHydrationWarning>
        <Providers>
          <WebVitals />
          <Header />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileBottomNav />
        </Providers>
      </body>
    </html>
  );
}
