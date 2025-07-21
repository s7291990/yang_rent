import React from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/footer';
import SessionProviderWrapper from '@/components/common/SessionProviderWrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <title>모빌리티 | (주)올림포스네트웍스</title>
        <meta
          name="description"
          content="주식회사 올림포스네트웍스. 렌터카 실시간 중개 플랫폼 및 사고대차 ,일반대여,장기대여 플랫폼서비스"
        />
        <meta
          name="keywords"
          content="렌터카 실시간 중개 플랫폼, 사고대차 ,일반대여, 장기대여 ,단기 렌트카"
        />
        <meta property="og:title" content="올림포스네트웍스" />
        <meta
          property="og:description"
          content="주식회사 올림포스네트웍스. 렌터카 실시간 중개 플랫폼 및 사고대차 ,일반대여,장기대여 플랫폼서비스."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:url" content="https://www.olymposnetworks.com" />
        <meta property="og:site_name" content="올림포스네트웍스" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProviderWrapper>
          <Header />
          {children}
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
