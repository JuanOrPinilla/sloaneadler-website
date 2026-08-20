"use client"

import { Footer } from "@/components/footer"
import { NewsHeroSection } from "@/components/news/hero-section"
import { NewsFeaturedSection } from "@/components/news/featured-section"
import { NewsArticlesGrid } from "@/components/news/articles-grid"

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white text-[#1a2332]">
      <NewsHeroSection />
      <NewsFeaturedSection />
      <NewsArticlesGrid />

      <Footer />
    </div>
  )
}
