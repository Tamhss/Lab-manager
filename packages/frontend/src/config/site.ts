export type SiteConfig = typeof siteConfig;

// TODO update information
export const siteConfig = {
  name: 'Lab',
  description: 'Developer love Repicle',
  ogImage: 'https://repicle.com/twitter-cards/repicle.jpeg',
  author: 'Junior Garcia',
  email: 'jrgarciadev@gmail.com',
  siteUrl: 'https://repicle.com',
  creator: '@wanosoft',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://repicle.com',
    siteName: 'repicle',
    description: 'Beautiful, fast and modern React UI Library',
    images: [
      {
        url: 'https://repicle.com/twitter-cards/repicle.jpeg',
        width: 1200,
        height: 630,
        alt: 'repicle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'repicle - Beautiful, fast and modern React UI Library',
    description: 'Make beautiful websites regardless of your design experience.',
    image: 'https://repicle.com/twitter-cards/repicle.jpeg',
    creator: '@wanosoft',
  },
  links: {
    github: 'https://github.com/repicle-org/repicle',
    twitter: 'https://twitter.com/wanosoft',
    docs: 'https://repicle.com/docs',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
    portfolio: 'https://jrgarciadev.com',
  },
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
  ],
  navMenuItems: [
    {
      label: 'Home',
      href: '/',
    },
  ],
};
