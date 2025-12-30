"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-[#1a2332]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 transition-all duration-300">
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
              Login
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
                Login
              </Link>
            </nav>
          </div>
        )}
      </header>

      <section className="pt-40 pb-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className="text-center"
            style={{
              opacity: Math.max(0, 1 - scrollY / 500),
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            <h1 className="font-serif text-5xl md:text-6xl leading-tight text-balance mb-6 text-[#1a2332]">
              Stewardship Across Generations
            </h1>
            <p className="text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto">
              Advisory for families, enterprises, and institutions navigating capital, reputation, and continuity.
            </p>
          </div>
        </div>
      </section>

      {/* Origins Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">Origins</h2>
              <p className="text-2xl font-serif leading-relaxed text-[#1a2332] text-balance">
                Sloane Adler emerged from conversations with corporate principals, family offices, and funds seeking a
                place where reputation, policy, and capital aligned.
              </p>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  The name carries intent. <em>Sloane</em>, of Gaelic lineage, speaks to protection and steadiness.{" "}
                  <em>Adler</em>, from the Germanic for eagle, conveys clarity and vigilance.
                </p>
                <p>Together they embody the discipline to see widely and act with care.</p>
                <p>
                  We advise across continents, cultures, and currencies. Every relationship begins through familiarity
                  or introduction and continues through judgment, steadfastness, and an enduring sense of continuity.
                </p>
              </div>
            </div>
            <div className="relative flex justify-center">
              <Image
                src="/images/hero-watercolor.jpeg"
                alt="SLOANE / Adler principal in counsel"
                width={500}
                height={500}
                className="w-full max-w-md h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scope Section */}
      <section id="scope" className="py-20 px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500 mb-6">Scope</h2>
          <p className="text-2xl font-serif leading-relaxed text-[#1a2332] text-balance">
            We operate where complexity demands clarity and consequence demands counsel.
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
            <div className="lg:col-span-2 relative aspect-square overflow-hidden">
              <Image src="/images/img-7483.jpeg" alt="Counsel in dialogue" fill className="object-cover" />
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
            © {new Date().getFullYear()} SLOANE / Adler. Confidential and proprietary.
          </div>
        </div>
      </footer>
    </div>
  )
}
