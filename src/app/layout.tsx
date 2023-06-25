import React from 'react';

import { Noto_Sans_KR } from 'next/font/google';
import { NextResponse } from 'next/server';

import StyledComponentsRegistry from '@/lib/registry';

const notoSansKr = Noto_Sans_KR({
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  fallback: ['-apple-system', 'Malgun Gothic', 'Apple SD Gothic Neo', 'Roboto', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'sans-serif'],
  subsets: ['latin'],
});

async function fetchData() {
  return fetch('http://localhost:3000/api/drink', {
    method: 'GET',
  });
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonData = await fetchData().then((data) => NextResponse.json(data));

  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <body className={notoSansKr.className}>{children}</body>
      </StyledComponentsRegistry>
    </html>
  );
}
