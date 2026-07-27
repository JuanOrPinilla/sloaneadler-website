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
  const [pastHero, setPastHero] = useState(false)

  const isHome = pathname === "/"
  const isTransparent = isHome && !scrolled && !mobileMenuOpen

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!isHome) return
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setPastHero(window.scrollY > window.innerHeight - 100)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHome])

  return (
    <div
      className={`${mobileMenuOpen ? "fixed inset-0 flex flex-col overflow-y-auto" : isHome ? "fixed top-0 left-0 right-0" : "sticky top-0 left-0 right-0"} z-50 transition-colors`}
      style={{ backgroundColor: mobileMenuOpen ? "#1a2332" : "transparent", transitionDuration: mobileMenuOpen ? "0ms" : "500ms" }}
    >
      {/* Global Posture Bar */}
      <div
        className="shrink-0 overflow-hidden"
        style={{
          backgroundColor: "#1a2332",
          color: "#ffffff",
          fontSize: "10px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          maxHeight: pastHero ? "0px" : "2.25rem",
          opacity: pastHero ? 0 : 1,
          padding: pastHero ? "0 1rem" : "0.5rem 1rem",
          transition: "max-height 500ms ease, opacity 500ms ease, padding 500ms ease",
          transitionDuration: mobileMenuOpen ? "0ms" : undefined,
        }}
      >
        <div className="navbar-marquee-track flex w-max whitespace-nowrap sm:w-full sm:justify-center">
          <span className="shrink-0 pr-8 sm:pr-0">
            {timeZones.map((tz, index) => (
              <span key={tz.city}>
                {tz.city} {formatTime(currentTime, tz.zone)}
                {index < timeZones.length - 1 && " · "}
              </span>
            ))}
          </span>
          <span className="shrink-0 pr-8 sm:hidden" aria-hidden="true">
            {timeZones.map((tz, index) => (
              <span key={tz.city}>
                {tz.city} {formatTime(currentTime, tz.zone)}
                {index < timeZones.length - 1 && " · "}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Header */}
      <header
        className={`relative transition-colors ${mobileMenuOpen ? "flex-1 flex flex-col min-h-0" : ""}`}
        style={{
          backgroundColor: isTransparent ? "transparent" : "#1a2332",
          borderBottom: "none",
          transitionDuration: mobileMenuOpen ? "0ms" : "500ms",
        }}
      >
        {/* Mobile row: logo + toggle (desktop uses absolute-positioned elements below) */}
        <div className="lg:hidden shrink-0 flex items-center justify-between px-4" style={{ height: "5.5rem" }}>
          <Link href="/" style={{ transform: "translateY(-4px)" }}>
            <Image
              src="/images/sloane.png"
              alt="Sloane Adler"
              width={220}
              height={220}
              className="h-auto w-44 transition-all duration-500"
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
          style={{ position: "absolute", top: "50%", left: "1rem", transform: "translateY(calc(-50% - 6px))" }}
        >
          <Image
            src="/images/sloane.png"
            alt="Sloane Adler"
            width={280}
            height={280}
            className="h-auto w-[200px] transition-all duration-500"
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
          className="hidden lg:inline-flex items-center justify-center transition-opacity hover:opacity-80"
          style={{
            position: "absolute",
            top: "50%",
            right: "2.5rem",
            transform: "translateY(-50%)",
            backgroundColor: "#1a2332",
            color: "#ffffff",
            border: isTransparent ? "1px solid rgba(255,255,255,0.6)" : "none",
            padding: "0.65rem 2.25rem",
            lineHeight: 1,
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
          <div
            className="lg:hidden flex-1 flex flex-col justify-center"
            style={{ backgroundColor: "#1a2332", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "1.5rem 2rem" }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: "#ffffff", fontSize: "1.1rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Castoro Titling', serif" }}
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
