import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Krushiva — Where Agriculture Connects',
    template: '%s | Krushiva',
  },
  description:
    'Connect Farmers, Buyers and Transporters through one trusted platform. Verified listings, tracked logistics, transparent trust scoring.',
  keywords: ['agriculture', 'farmers', 'agri marketplace', 'farm to buyer', 'agricultural logistics'],
  authors: [{ name: 'Krushiva' }],
  creator: 'Krushiva',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://krushiva.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Krushiva',
    title: 'Krushiva — Where Agriculture Connects',
    description: 'The trusted agricultural marketplace for Farmers, Buyers & Transporters.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krushiva — Where Agriculture Connects',
    description: 'The trusted agricultural marketplace for Farmers, Buyers & Transporters.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
