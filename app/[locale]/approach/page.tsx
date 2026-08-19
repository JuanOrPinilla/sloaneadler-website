"use client"

import { LanguageSwitcher } from "@/components/language-switcher"
import { Link } from "@/i18n/routing"
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

      {/* Footer */}
      <footer style={{ backgroundColor: "#0D172F", paddingTop: "4rem", paddingBottom: "2rem", paddingLeft: "2rem", paddingRight: "2rem" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12" style={{ paddingBottom: "4rem", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
            {/* Left: Logo + tagline */}
            <div>
              <div className="font-serif text-xl" style={{ color: "#ffffff", marginBottom: "1rem" }}>
                SLOANE <span style={{ color: "rgba(255,255,255,0.4)" }}>/</span> Adler
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Inquiries are welcomed through referral or introduction. Please provide context for your correspondence.
              </p>
            </div>

            {/* Spacer */}
            <div className="hidden lg:block" />

            {/* Navigation column */}
            <div>
              <p className="text-xs tracking-widest uppercase font-sans" style={{ color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>
                Navigation
              </p>
              <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Link href="/approach" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}>Approach</Link>
                <Link href="/investor" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}>Investor</Link>
                <Link href="/login" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}>Principals</Link>
                <Link href="/news" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}>News</Link>
              </nav>
            </div>

            {/* Legal + Contact column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              <div>
                <p className="text-xs tracking-widest uppercase font-sans" style={{ color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>
                  Legal
                </p>
                <Link href="/legal/terms" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}>Terms of use</Link>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase font-sans" style={{ color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>
                  Contact
                </p>
                <Link href="/correspondence" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}>Begin Correspondence</Link>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ paddingTop: "1.5rem" }}>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              {"© SLOANE / Adler Holdings. Confidential and proprietary."}
            </p>
            <LanguageSwitcher />
          </div>
        </div>
      </footer>
    </div>
  )
}
