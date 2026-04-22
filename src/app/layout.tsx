import React from 'react';

import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'sonner';

import './globals.css';

const outfit = Outfit({
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-display',
});

const plusJakarta = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-body',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <body className={plusJakarta.className}>
        {children}
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            style: {
              fontFamily: 'var(--font-body)',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  );
}
