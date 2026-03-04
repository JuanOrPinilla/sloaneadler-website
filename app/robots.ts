import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/access', '/api/', '/login'],
    },
    sitemap: 'https://sloaneadler.com/sitemap.xml',
  };
}
