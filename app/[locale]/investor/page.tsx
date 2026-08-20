"use client"

import { Footer } from "@/components/footer"
import { InvestorHeroSection } from "@/components/investor/hero-section"
import { InvestorOverviewSection } from "@/components/investor/overview-section"
import { VelvetRope } from "@/components/home/velvet-rope"

export default function InvestorPage() {
  return (
    <div className="min-h-screen bg-white text-[#1a2332]">
      <InvestorHeroSection />
      <InvestorOverviewSection />
      <VelvetRope />

      <Footer />
    </div>
  )
}
