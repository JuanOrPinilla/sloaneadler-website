import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SLOANE / Adler',
    short_name: 'SLOANE / Adler',
    description: 'Stewardship Across Generations. Advisory counsel for families, enterprises, and institutions across capital, reputation, governance, and continuity.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1a2332',
    icons: [
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
