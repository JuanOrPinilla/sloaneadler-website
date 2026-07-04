"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Link } from "@/i18n/routing"
import { Menu, X } from "lucide-react"

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

export function SiteNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="sticky top-0 z-50">
      {/* Global Posture Bar */}
      <div className="overflow-x-auto" style={{ backgroundColor: "#1a2332", color: "#94a3b8", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.5rem 1rem", textAlign: "center", whiteSpace: "nowrap" }}>
        {timeZones.map((tz, index) => (
          <span key={tz.zone}>
            {tz.city} {formatTime(currentTime, tz.zone)}
            {index < timeZones.length - 1 && " · "}
          </span>
        ))}
      </div>

      {/* Header */}
      <header style={{ backgroundColor: "rgba(255,255,255,0.97)", borderBottom: "1px solid #e2e8f0", backdropFilter: "blur(8px)" }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8" style={{ height: "5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link href="/" className="lg:-ml-[4.5rem]">
            <Image src="/images/sloane.png" alt="Sloane Adler" width={180} height={180} className="h-auto w-32 lg:w-[180px]" style={{ objectFit: "contain" }} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex" style={{ alignItems: "center", gap: "6rem" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors"
                style={{ color: "#475569", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Castoro Titling', serif" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            href="/correspondence"
            className="hidden lg:inline-block transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#1a2332", color: "#ffffff", padding: "0.75rem 1.75rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Castoro Titling', serif" }}
          >
            Correspondence
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            style={{ color: "#1a2332" }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden" style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e2e8f0", padding: "1.5rem 2rem" }}>
            <nav style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: "#475569", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Castoro Titling', serif" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/correspondence"
                className="transition-opacity hover:opacity-80"
                onClick={() => setMobileMenuOpen(false)}
                style={{ backgroundColor: "#1a2332", color: "#ffffff", padding: "0.75rem 1.75rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Castoro Titling', serif", textAlign: "center" }}
              >
                Correspondence
              </Link>
            </nav>
          </div>
        )}
      </header>
    </div>
  )
}
