import React from 'react';

import { Noto_Sans_KR } from 'next/font/google';

import { ToastProvider } from '@/context/toastContext';
import StyledComponentsRegistry from '@/lib/registry';

const notoSansKr = Noto_Sans_KR({
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  fallback: ['-apple-system', 'Malgun Gothic', 'Apple SD Gothic Neo', 'Roboto', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'sans-serif'],
  subsets: ['latin'],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ToastProvider>
        <StyledComponentsRegistry>
          <body className={notoSansKr.className}>{children}</body>
        </StyledComponentsRegistry>
      </ToastProvider>
    </html>
  );
}
