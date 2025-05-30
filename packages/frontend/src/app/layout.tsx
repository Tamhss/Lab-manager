// app/layout.tsx (hoặc src/app/layout.tsx nếu bạn dùng cấu trúc src)
import '@/styles/globals.css';
import clsx from 'clsx';
import { Metadata } from 'next';
import { fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import './globals.css';
import ClientLayout from '@/components/organisms/clientLayout';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['AIoT Lab-DNU'],
  manifest: '/manifest.json',
  twitter: siteConfig.twitter,
  openGraph: siteConfig.openGraph,
  authors: [{ name: 'Tam' }],
  creator: 'Tam',
  alternates: {
    canonical: 'https://repicle.com',
    types: {
      'application/rss+xml': [
        {
          url: 'https://repicle.com/feed.xml',
          title: 'Repicle Research Topic Particle',
        },
      ],
    },
  },
};

export function generateViewport() {
  return {
    viewport: 'viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
  };
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={clsx('min-h-screen w-full bg-white font-sans antialiased', fontSans.variable)}>
        <ClientLayout>
          <div className="relative h-screen overflow-hidden">{children}</div>
        </ClientLayout>
      </body>
    </html>
  );
};

export default RootLayout;
