import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/join', '/create', '/mypage'],
    },
    sitemap: `https://www.omocha-auction.com/sitemap.xml`,
  };
}
