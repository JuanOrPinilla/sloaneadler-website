"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [postureBarHeight, setPostureBarHeight] = useState(28)
  const [currentTime, setCurrentTime] = useState(new Date())
  const postureBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const measureBar = () => {
      if (postureBarRef.current) {
        setPostureBarHeight(postureBarRef.current.offsetHeight)
      }
    }
    measureBar()
    window.addEventListener("resize", measureBar)
    return () => window.removeEventListener("resize", measureBar)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date, timeZone: string) => {
    return date.toLocaleTimeString("en-US", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).toUpperCase()
  }

  const timeZones = [
    { city: "SAN FRANCISCO", zone: "America/Los_Angeles" },
    { city: "NEW YORK", zone: "America/New_York" },
    { city: "PARIS", zone: "Europe/Paris" },
    { city: "ABU DHABI", zone: "Asia/Dubai" },
    { city: "SINGAPORE", zone: "Asia/Singapore" },
  ]

  return (
    <div className="min-h-screen bg-white text-[#1a2332]">
      {/* Global Posture Bar */}
      <div ref={postureBarRef} className="bg-[#1a2332] text-[10px] tracking-widest text-slate-400 uppercase font-sans py-5 sm:py-2 px-4 text-center sm:whitespace-nowrap">
        {timeZones.map((tz, index) => (
          <span key={tz.zone}>
            {tz.city} {formatTime(currentTime, tz.zone)}
            {index < timeZones.length - 1 && " · "}
          </span>
        ))}
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 transition-all duration-300" style={{ top: scrollY > 50 ? 0 : postureBarHeight }}>
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-tight text-[#1a2332]">
            SLOANE <span className="text-slate-500">/</span> Adler
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-12">
            <Link href="/" className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors">
              Home
            </Link>
            <Link
              href="/approach"
              className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors"
            >
              Approach
            </Link>
            <Link
              href="/investor"
              className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors"
            >
              Investor
            </Link>
            <Link href="/news" className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors">
              News
            </Link>
            <Link
              href="/correspondence"
              className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors"
            >
              Contact
            </Link>
            <Link href="/login" className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors">
              Principals
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-8 py-6">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/approach"
                className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Approach
              </Link>
              <Link
                href="/investor"
                className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Investor
              </Link>
              <Link
                href="/news"
                className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                News
              </Link>
              <Link
                href="/correspondence"
                className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/login"
                className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Principals
              </Link>
            </nav>
          </div>
        )}
      </header>

      <section className="pt-48 pb-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className="text-center"
            style={{
              opacity: Math.max(0, 1 - scrollY / 500),
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            <h1 className="font-serif text-5xl md:text-6xl leading-tight text-balance mb-6 text-[#1a2332]">
              Where Capital Stops Solving Problems.
            </h1>
            <p className="text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto">
              Complexity expands faster than internal leadership. Exposure increases without warning. Decisions carry weight beyond the balance sheet. We exist at those moments.
            </p>
          </div>
        </div>
      </section>

      {/* The Fracturing Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">The Fracturing</h2>
              <p className="text-2xl font-serif leading-relaxed text-[#1a2332] text-balance">
                Sloane / Adler emerged during a period of intense trade and regulatory fracturing.
              </p>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  We were initially engaged to navigate this volatility for corporate stakeholders. The practice expanded when we recognized that private capital - family offices and investment principals - faced the same systemic opacity.
                </p>
                <p>We bridge the gap between regulatory reality and strategic intent.</p>
              </div>
            </div>
            <div className="flex flex-col items-center lg:items-end">
              <img
                src="/images/d7hftxdivxxvm.webp"
                alt="Two figures in counsel - blue textured art print"
                width={600}
                height={450}
                className="w-full max-w-lg h-auto mb-3"
              />
              <div className="w-full max-w-lg text-[10px] uppercase tracking-wider text-slate-400 font-sans leading-relaxed border-t border-slate-100 pt-2">
                Luc Tuymans, The Conversation, 1995
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Quiet Operator */}
      <section id="philosophy" className="py-20 px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500 mb-6 text-center">The Quiet Operator</h2>
          <p className="text-2xl font-serif leading-relaxed text-[#1a2332] text-balance text-center">
            We operate across governments, institutions, and markets, where discretion and experience matter more than volume.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mt-6 text-center">
            We step in when families and enterprises step into visibility without institutional muscle memory.
          </p>
        </div>
      </section>

      {/* Our Practice Section */}
      <section className="py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500 mb-16 text-center">
            Our Practice
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="space-y-3">
              <div className="h-px w-12 bg-[#b8a07e]"></div>
              <h3 className="font-serif text-xl text-[#1a2332]">Capital</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Portfolio construction, allocation oversight, and inter-generational capital planning.
              </p>
            </div>

            <div className="space-y-3">
              <div className="h-px w-12 bg-[#b8a07e]"></div>
              <h3 className="font-serif text-xl text-[#1a2332]">Reputation</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Narrative integrity, institutional positioning, and response architecture.
              </p>
            </div>

            <div className="space-y-3">
              <div className="h-px w-12 bg-[#b8a07e]"></div>
              <h3 className="font-serif text-xl text-[#1a2332]">Stewardship</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Governance design, trustee counsel, and continuity planning.
              </p>
            </div>

            <div className="space-y-3">
              <div className="h-px w-12 bg-[#b8a07e]"></div>
              <h3 className="font-serif text-xl text-[#1a2332]">State & Policy</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Sovereign advisory and regulatory navigation at the threshold of public and private power.
              </p>
            </div>

            <div className="space-y-3">
              <div className="h-px w-12 bg-[#b8a07e]"></div>
              <h3 className="font-serif text-xl text-[#1a2332]">Enterprise</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Strategic counsel for founders, boards, and leadership in transition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Section */}
      <section className="py-20 px-8 bg-[#f8f7f5]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2 relative">
              <div className="aspect-square overflow-hidden mb-3 relative">
                <Image
                  src="/images/4226.webp"
                  alt="Abstract colorful painting with heavy texture"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-sans leading-relaxed border-t border-slate-200/50 pt-2">
                Gerhard Richter, Oil on Alu Dibond, 1999
              </div>
            </div>
            <div className="lg:col-span-3 space-y-6">
              <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">Engagement</h2>
              <p className="text-2xl font-serif leading-relaxed text-[#1a2332]">
                We work with a limited number of families, enterprises, and institutions.
              </p>
              <div className="space-y-4 text-slate-600">
                <p>Engagements are confidential, long-horizon, and entered by mutual election.</p>
                <p>Relationships are structured for continuity, not transaction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Domains of Counsel section */}
      <section className="py-28 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500 mb-4">Domains of Counsel</h2>
            <p className="text-lg text-slate-600">Where we provide guidance and structure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            <div className="flex items-start gap-4">
              <div className="h-px w-8 bg-[#b8a07e] mt-3 shrink-0"></div>
              <div>
                <h3 className="font-serif text-lg text-[#1a2332]">Cross-border capital alignment</h3>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-px w-8 bg-[#b8a07e] mt-3 shrink-0"></div>
              <div>
                <h3 className="font-serif text-lg text-[#1a2332]">Reputation under scrutiny</h3>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-px w-8 bg-[#b8a07e] mt-3 shrink-0"></div>
              <div>
                <h3 className="font-serif text-lg text-[#1a2332]">Leadership transition</h3>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-px w-8 bg-[#b8a07e] mt-3 shrink-0"></div>
              <div>
                <h3 className="font-serif text-lg text-[#1a2332]">State and jurisdictional exposure</h3>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-px w-8 bg-[#b8a07e] mt-3 shrink-0"></div>
              <div>
                <h3 className="font-serif text-lg text-[#1a2332]">Enterprise continuity</h3>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-px w-8 bg-[#b8a07e] mt-3 shrink-0"></div>
              <div>
                <h3 className="font-serif text-lg text-[#1a2332]">Inter-generational stewardship</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-[#1a2332]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-sm uppercase tracking-widest text-slate-400 mb-16 text-center">
            The Long View
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <h3 className="font-serif text-lg text-white">Introduction</h3>
              <p className="text-sm text-slate-400">Through established counsel</p>
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-serif text-lg text-white">Alignment</h3>
              <p className="text-sm text-slate-400">Mutual understanding of scope</p>
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-serif text-lg text-white">Counsel</h3>
              <p className="text-sm text-slate-400">Ongoing advisory partnership</p>
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-serif text-lg text-white">Endurance</h3>
              <p className="text-sm text-slate-400">Multi-generational continuity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Velvet Rope */}
      <section className="py-12 px-8 border-t border-slate-200">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-slate-500 leading-relaxed">
            Sloane / Adler accepts new mandates by introduction only. To verify a principal or request a secure file transfer, please{" "}
            <Link href="/correspondence" className="text-[#1a2332] underline underline-offset-2">contact us</Link>.
          </p>
        </div>
      </section>

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
              <Link href="/policies" className="text-slate-600 hover:text-[#1a2332] transition-colors">
                Policies
              </Link>
              <Link href="/correspondence" className="text-slate-600 hover:text-[#1a2332] transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div className="text-sm text-slate-500 text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
              <p>{"© SLOANE / Adler Holdings. Confidential and proprietary."}</p>
              <div className="flex items-center gap-2">
                <button className="hover:text-[#1a2332] transition-colors font-medium text-[#1a2332]">English</button>
                <span>|</span>
                <button className="hover:text-[#1a2332] transition-colors">Español</button>
                <span>|</span>
                <button className="hover:text-[#1a2332] transition-colors">Français</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
