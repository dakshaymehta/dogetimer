import type { Metadata } from 'next'
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'DOGE Timer - Countdown to July 4th, 2026',
  description: 'Watch the countdown to DOGE\'s self-deletion date. A fun timer tracking the days until July 4th, 2026. Not affiliated with Dogecoin.',
  keywords: ['DOGE', 'Dogecoin', 'Countdown', 'Timer', 'Crypto', 'July 4th 2026'],
  authors: [{ name: 'Dakshay Mehta', url: 'https://twitter.com/fibnewtonian' }],
  creator: 'Dakshay Mehta',
  publisher: 'Dakshay Mehta',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dogetimer.vercel.app',
    siteName: 'DOGE Timer',
    title: 'DOGE Timer - Countdown to July 4th, 2026',
    description: 'Watch the countdown to DOGE\'s self-deletion date. A fun timer tracking the days until July 4th, 2026.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DOGE Timer Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOGE Timer - Countdown to July 4th, 2026',
    description: 'Watch the countdown to DOGE\'s self-deletion date. A fun timer tracking the days until July 4th, 2026.',
    creator: '@fibnewtonian',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  themeColor: '#f4c20d',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://dogetimer.vercel.app" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
