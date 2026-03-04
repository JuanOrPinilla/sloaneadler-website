import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Inter, Crimson_Pro } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
})

export const metadata: Metadata = {
  title: "SLOANE / Adler - Stewardship Across Generations",
  description:
    "Advisory counsel for families, enterprises, and institutions across capital, reputation, governance, and continuity.",

  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231a2332'/%3E%3Ctext x='50' y='65' font-size='50' text-anchor='middle' fill='white' font-family='serif'%3ES%3C/text%3E%3C/svg%3E",
        type: "image/svg+xml",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${crimsonPro.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
