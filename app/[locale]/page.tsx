"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Link } from "@/i18n/routing"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { HeroSection } from "@/components/home/hero-section"
import { PracticeSection } from "@/components/home/practice-section"
import { EngagementSection } from "@/components/home/engagement-section"
import { DomainsSection } from "@/components/home/domains-section"
import { LongViewSection } from "@/components/home/long-view-section"
import { VelvetRope } from "@/components/home/velvet-rope"

const timeZones = [
  { city: "SAN FRANCISCO", zone: "America/Los_Angeles" },
  { city: "NEW YORK", zone: "America/New_York" },
  { city: "PARIS", zone: "Europe/Paris" },
  { city: "ABU DHABI", zone: "Asia/Dubai" },
  { city: "SINGAPORE", zone: "Asia/Singapore" },
] as const

const navLinks = [
  { href: "/approach", label: "Approach" },
  { href: "/investor", label: "Investor" },
  { href: "/login", label: "Principals" },
  { href: "/news", label: "News" },
]

function formatTime(date: Date, timeZone: string): string {
  return date.toLocaleTimeString("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).toUpperCase()
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white text-[#1a2332]">
      <div className="sticky top-0 z-50">
        {/* Global Posture Bar */}
        <div className="bg-[#1a2332] text-[10px] tracking-widest text-slate-400 uppercase font-sans py-5 sm:py-2 px-4 text-center sm:whitespace-nowrap">
          {timeZones.map((tz, index) => (
            <span key={tz.zone}>
              {tz.city} {formatTime(currentTime, tz.zone)}
              {index < timeZones.length - 1 && " · "}
            </span>
          ))}
        </div>

        {/* Header */}
        <header style={{ backgroundColor: "rgba(255,255,255,0.97)", borderBottom: "1px solid #e2e8f0" }} className="backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-between" style={{ height: "5rem" }}>
            {/* Logo */}
            <Link href="/">
              <Image src="/images/sloane.png" alt="Sloane Adler" width={180} height={180} style={{ objectFit: "contain" }} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center" style={{ gap: "6rem" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors"
                  style={{ color: "#475569", letterSpacing: "0.02em" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                href="/correspondence"
                className="text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#1a2332", color: "#ffffff", padding: "0.75rem 1.75rem", fontFamily: "'Castoro Titling', serif" }}
              >
                Correspondence
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-slate-200 px-8 py-6">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/correspondence"
                  className="text-sm tracking-wide font-medium text-[#1a2332]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Correspondence
                </Link>
              </nav>
            </div>
          )}
        </header>
      </div>

      <HeroSection />
      <PracticeSection />
      <EngagementSection />
      <DomainsSection />
      <LongViewSection />
      <VelvetRope />

      {/* Footer */}
      <footer style={{ backgroundColor: "#0D172F", paddingTop: "4rem", paddingBottom: "2rem", paddingLeft: "2rem", paddingRight: "2rem" }}>
        <div className="max-w-7xl mx-auto">
          {/* Main footer grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16" style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
            {/* Left: Logo + tagline */}
            <div className="md:col-span-1">
              <div className="font-serif text-xl mb-4" style={{ color: "#ffffff" }}>
                SLOANE <span style={{ color: "rgba(255,255,255,0.4)" }}>/</span> Adler
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Inquiries are welcomed through referral or introduction. Please provide context for your correspondence.
              </p>
            </div>

            {/* Spacer */}
            <div className="hidden md:block" />

            {/* Navigation column */}
            <div>
              <p className="text-xs tracking-widest uppercase mb-6 font-sans" style={{ color: "rgba(255,255,255,0.4)" }}>
                Navigation
              </p>
              <nav className="flex flex-col gap-4">
                <Link href="/approach" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}>Approach</Link>
                <Link href="/investor" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}>Investor</Link>
                <Link href="/login" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}>Principals</Link>
                <Link href="/news" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}>News</Link>
              </nav>
            </div>

            {/* Legal + Contact column */}
            <div className="flex flex-col gap-10">
              <div>
                <p className="text-xs tracking-widest uppercase mb-6 font-sans" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Legal
                </p>
                <Link href="/legal/terms" className="text-sm transition-colors block" style={{ color: "rgba(255,255,255,0.7)" }}>Terms of use</Link>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase mb-6 font-sans" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Contact
                </p>
                <Link href="/correspondence" className="text-sm transition-colors block" style={{ color: "rgba(255,255,255,0.7)" }}>Begin Correspondence</Link>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              {"© SLOANE / Adler Holdings. Confidential and proprietary."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
