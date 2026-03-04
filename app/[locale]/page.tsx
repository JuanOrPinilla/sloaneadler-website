"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { HeroSection } from "@/components/home/hero-section"
import { FracturingSection } from "@/components/home/fracturing-section"
import { PhilosophySection } from "@/components/home/philosophy-section"
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
  { href: "/", label: "Home" },
  { href: "/approach", label: "Approach" },
  { href: "/investor", label: "Investor" },
  { href: "/news", label: "News" },
  { href: "/correspondence", label: "Contact" },
  { href: "/login", label: "Principals" },
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
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white text-[#1a2332]">
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
      <header 
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 transition-all duration-300" 
        style={{ top: scrollY > 50 ? 0 : undefined }}
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-tight text-[#1a2332]">
            SLOANE <span className="text-slate-500">/</span> Adler
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-12 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

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
            </nav>
          </div>
        )}
      </header>

      <HeroSection scrollY={scrollY} />
      <FracturingSection />
      <PhilosophySection />
      <PracticeSection />
      <EngagementSection />
      <DomainsSection />
      <LongViewSection />
      <VelvetRope />

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
            <div className="font-serif text-xl text-[#1a2332]">
              SLOANE <span className="text-slate-400">/</span> Adler
            </div>

            <nav className="flex flex-col md:flex-row gap-6 text-sm">
              <Link href="/approach" className="text-slate-600 hover:text-[#1a2332] transition-colors">
                Approach
              </Link>
              <Link href="/investor" className="text-slate-600 hover:text-[#1a2332] transition-colors">
                Investor
              </Link>
              <Link href="/news" className="text-slate-600 hover:text-[#1a2332] transition-colors">
                News
              </Link>
              <Link href="/legal/terms" className="text-slate-600 hover:text-[#1a2332] transition-colors">
                Terms
              </Link>
              <Link href="/legal/privacy" className="text-slate-600 hover:text-[#1a2332] transition-colors">
                Privacy
              </Link>
              <Link href="/correspondence" className="text-slate-600 hover:text-[#1a2332] transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div className="text-sm text-slate-500 text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
              <p>{"© SLOANE / Adler Holdings. Confidential and proprietary."}</p>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
