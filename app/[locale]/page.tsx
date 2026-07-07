"use client"

import { Link } from "@/i18n/routing"
import { LanguageSwitcher } from "@/components/language-switcher"
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

      {/* Footer */}
      <footer style={{ backgroundColor: "#0D172F", paddingTop: "4rem", paddingBottom: "2rem", paddingLeft: "2rem", paddingRight: "2rem" }}>
        <div className="max-w-7xl mx-auto">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "3rem", paddingBottom: "4rem", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
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
            <div />

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
          <div style={{ paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
