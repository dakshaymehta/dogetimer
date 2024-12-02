import type { Metadata, Viewport } from 'next'
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

export const viewport: Viewport = {
  themeColor: '#f4c20d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'DOGE Timer - Countdown to July 4th, 2026',
  description: 'Watch the countdown to DOGE\'s self-deletion date. A fun timer tracking the days until July 4th, 2026. Not affiliated with Dogecoin.',
  keywords: ['DOGE', 'Dogecoin', 'Countdown', 'Timer', 'Crypto', 'July 4th 2026'],
  authors: [{ name: 'Dakshay Mehta', url: 'https://twitter.com/fibnewtonian' }],
  creator: 'Dakshay Mehta',
  publisher: 'Dakshay Mehta',
  robots: 'index, follow',
  icons: {
    icon: '/dogetimer.png',
    shortcut: '/dogetimer.png',
    apple: '/dogetimer.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dogetimer.vercel.app',
    siteName: 'DOGE Timer',
    title: 'DOGE Timer - Countdown to July 4th, 2026',
    description: 'Watch the countdown to DOGE\'s self-deletion date. A fun timer tracking the days until July 4th, 2026.',
    images: [
      {
        url: '/dogetimer.png',
        width: 192,
        height: 192,
        alt: 'DOGE Timer Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOGE Timer - Countdown to July 4th, 2026',
    description: 'Watch the countdown to DOGE\'s self-deletion date. A fun timer tracking the days until July 4th, 2026.',
    creator: '@fibnewtonian',
    images: ['/dogetimer.png'],
  },
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
