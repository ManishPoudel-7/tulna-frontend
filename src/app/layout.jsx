'use client';

import { Playfair_Display, Manrope } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <head>
        <title>Tulna — Quick commerce, compared quietly</title>
        <meta name="description" content="Find the best grocery prices across Blinkit, Zepto, Instamart and BigBasket." />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#F4EFE6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1A1F1C" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="font-sans min-h-screen">
      <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
