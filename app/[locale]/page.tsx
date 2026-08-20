"use client"

import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { PracticeSection } from "@/components/home/practice-section"
import { EngagementSection } from "@/components/home/engagement-section"
import { DomainsSection } from "@/components/home/domains-section"
import { LongViewSection } from "@/components/home/long-view-section"
import { VelvetRope } from "@/components/home/velvet-rope"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#1a2332]">
      <HeroSection />
      <PracticeSection />
      <EngagementSection />
      <DomainsSection />
      <LongViewSection />
      <VelvetRope />

      <Footer />
    </div>
  )
}
