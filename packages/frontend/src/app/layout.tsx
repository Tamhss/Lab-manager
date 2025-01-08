import '@/styles/globals.css';
import { Link } from '@nextui-org/link';
import clsx from 'clsx';
import { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import { Navbar } from '@/components/molecules/Navbar';
import { fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import './globals.css';
import { HeaderProvider } from '@/components/Context';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['Lab'],
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  twitter: siteConfig.twitter,
  openGraph: siteConfig.openGraph,
  authors: [
    {
      name: 'Tam',
    },
  ],
  creator: 'Tam',
  alternates: {
    canonical: 'https://repicle.com',
    types: {
      'application/rss+xml': [{ url: 'https://repicle.com/feed.xml', title: 'Repicle Research Topic Particle' }],
    },
  },
  viewport: 'viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <HeaderProvider>
        <body className={clsx('min-h-screen bg-white font-sans antialiased', fontSans.variable)}>
          <div className="relative h-screen overflow-hidden">
            {children}

          </div>
        </body>
      </HeaderProvider>
    </html>
  );
};

export default RootLayout;
