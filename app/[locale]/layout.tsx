import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { Inter, Crimson_Pro } from "next/font/google"
import "../globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
})

const siteUrl = 'https://sloaneadler.com'
const siteName = 'SLOANE / Adler'
const defaultDescription = 'Advisory counsel for families, enterprises, and institutions across capital, reputation, governance, and continuity.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: ['family office', 'wealth management', 'stewardship', 'governance', 'capital advisory', 'reputation management'],
  authors: [{ name: 'SLOANE / Adler' }],
  creator: 'SLOANE / Adler Holdings',
  publisher: 'SLOANE / Adler Holdings',
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231a2332'/%3E%3Ctext x='50' y='65' font-size='50' text-anchor='middle' fill='white' font-family='serif'%3ES%3C/text%3E%3C/svg%3E",
        type: "image/svg+xml",
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: siteName,
    description: defaultDescription,
    images: [
      {
        url: '/placeholder-logo.png',
        width: 1200,
        height: 630,
        alt: 'SLOANE / Adler',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: defaultDescription,
    images: ['/placeholder-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
}

export const viewport: Viewport = {
  themeColor: "#1a2332",
  width: 'device-width',
  initialScale: 1,
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Await params for Next.js 15+
  const { locale } = await params
  
  // Validate that the incoming locale is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }
  
  const messages = await getMessages()
  
  return (
    <html lang={locale} className={`${inter.variable} ${crimsonPro.variable}`}>
      <head>
        <link rel="dns-prefetch" href="//sloaneadler.com" />
        <link rel="preconnect" href="https://sloaneadler.com" />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
