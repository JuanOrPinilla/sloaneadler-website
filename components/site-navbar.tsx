"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Link, usePathname } from "@/i18n/routing"
import { Menu, X } from "lucide-react"

const timeZones = [
  { city: "WASHINGTON, D.C.", zone: "America/New_York" },
  { city: "NEW YORK", zone: "America/New_York" },
  { city: "ABU DHABI", zone: "Asia/Dubai" },
  { city: "LONDON", zone: "Europe/London" },
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
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [scrolled, setScrolled] = useState(false)

  const isHome = pathname === "/"
  const isTransparent = isHome && !scrolled

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!isHome) return
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHome])

  return (
    <div className={`${isHome ? "fixed" : "sticky"} top-0 left-0 right-0 z-50 transition-colors duration-500`}>
      {/* Global Posture Bar */}
      <div
        className="sm:whitespace-nowrap transition-colors duration-500"
        style={{
          backgroundColor: isTransparent ? "transparent" : "#1a2332",
          color: "#ffffff",
          fontSize: "10px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "0.5rem 1rem",
          textAlign: "center",
        }}
      >
        {timeZones.map((tz, index) => (
          <span key={tz.city}>
            {tz.city} {formatTime(currentTime, tz.zone)}
            {index < timeZones.length - 1 && " · "}
          </span>
        ))}
      </div>

      {/* Header */}
      <header
        className="relative transition-colors duration-500"
        style={{
          backgroundColor: isTransparent ? "transparent" : "#1a2332",
          borderBottom: isTransparent ? "1px solid transparent" : "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Mobile row: logo + toggle (desktop uses absolute-positioned elements below) */}
        <div className="lg:hidden flex items-center justify-between px-4" style={{ height: "5.5rem" }}>
          <Link href="/">
            <Image
              src="/images/sloane.png"
              alt="Sloane Adler"
              width={220}
              height={220}
              className="h-auto w-36 transition-all duration-500"
              style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
            />
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            style={{ color: "#ffffff" }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop: Logo (absolute left) */}
        <Link
          href="/"
          className="hidden lg:block"
          style={{ position: "absolute", top: "50%", left: "1rem", transform: "translateY(-50%)" }}
        >
          <Image
            src="/images/sloane.png"
            alt="Sloane Adler"
            width={280}
            height={280}
            className="h-auto w-[280px] transition-all duration-500"
            style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
          />
        </Link>

        {/* Desktop: Navigation (absolute centered) */}
        <nav
          className="hidden lg:flex"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            alignItems: "center",
            gap: "3.75rem",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-500"
              style={{ color: "#ffffff", fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Castoro Titling', serif" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop: CTA Button (absolute right) */}
        <Link
          href="/correspondence"
          className="hidden lg:inline-block transition-opacity hover:opacity-80"
          style={{
            position: "absolute",
            top: "50%",
            right: "2.5rem",
            transform: "translateY(-50%)",
            backgroundColor: "#1a2332",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.6)",
            padding: "1rem 2.25rem",
            fontSize: "0.85rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "'Castoro Titling', serif",
          }}
        >
          Correspondence
        </Link>

        {/* Spacer to size the header on desktop */}
        <div className="hidden lg:block" style={{ height: "5.5rem" }} />

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden" style={{ backgroundColor: "#1a2332", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "1.5rem 2rem" }}>
            <nav style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: "#ffffff", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Castoro Titling', serif" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/correspondence"
                className="transition-opacity hover:opacity-80"
                onClick={() => setMobileMenuOpen(false)}
                style={{ backgroundColor: "#1a2332", color: "#ffffff", border: "1px solid rgba(255,255,255,0.6)", padding: "1rem 2.25rem", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Castoro Titling', serif", textAlign: "center" }}
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
