import type { Metadata } from "next";
import { Suspense } from 'react';
import "./globals.css";
import PageTransition from './components/NavigationProgress';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTopButton from './components/ScrollToTopButton';

export const metadata: Metadata = {
  metadataBase: new URL('https://redelephanttravels.com'),
  title: {
    default: "Red Elephant Travels & Tours | Premium Sri Lanka Experiences",
    template: "%s | Red Elephant Travels"
  },
  description:
    "Discover Sri Lanka's most extraordinary destinations with Red Elephant Travels & Tours. Award-winning luxury tours, honeymoon packages, cultural journeys, wildlife safaris and more. Est. 2009.",
  keywords:
    "Sri Lanka tours, luxury travel Sri Lanka, Red Elephant Travels, Sri Lanka holidays, honeymoon Sri Lanka, cultural tours Sri Lanka, private tours Sri Lanka",
  openGraph: {
    title: "Red Elephant Travels & Tours",
    description:
      "Sri Lanka's most loved premium travel specialist. 15+ years crafting extraordinary journeys.",
    type: "website",
    siteName: "Red Elephant Travels",
    locale: 'en_LK',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "var(--color-dark)",
        }}
      >
        <Suspense fallback={null}>
          <PageTransition />
          <ScrollToTop />
          <ScrollToTopButton />
          <WhatsAppButton />
        </Suspense>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
