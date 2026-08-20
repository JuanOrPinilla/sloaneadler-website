"use client"

import { Footer } from "@/components/footer"
import { ApproachHeroSection } from "@/components/approach/hero-section"
import { FoundationsSection } from "@/components/approach/foundations-section"
import { ApproachDomainsSection } from "@/components/approach/domains-section"
import { AdvisoryStructureSection } from "@/components/approach/advisory-structure-section"

export default function ApproachPage() {
  return (
    <div className="min-h-screen bg-white text-[#1a2332]">
      <ApproachHeroSection />
      <FoundationsSection />
      <ApproachDomainsSection />
      <AdvisoryStructureSection />

      <Footer />
    </div>
  )
}
