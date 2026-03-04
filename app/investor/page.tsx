"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, CheckCircle2 } from "lucide-react"

export default function InvestorPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-[#1a2332]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-tight text-[#1a2332]">
            SLOANE <span className="text-slate-500">/</span> Adler
          </Link>

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
            <Link href="/investor" className="text-sm tracking-wide text-[#1a2332] transition-colors">
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

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-8 py-6">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-sm tracking-wide text-slate-600" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link
                href="/approach"
                className="text-sm tracking-wide text-slate-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Approach
              </Link>
              <Link
                href="/investor"
                className="text-sm tracking-wide text-[#1a2332]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Investor
              </Link>
              <Link
                href="/news"
                className="text-sm tracking-wide text-slate-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                News
              </Link>
              <Link
                href="/correspondence"
                className="text-sm tracking-wide text-slate-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/login"
                className="text-sm tracking-wide text-slate-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Principals
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6 text-balance">Investor Relations</h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
            A framework for alignment between principals and capital stewards, built on shared understanding and
            long-horizon commitment.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">Overview</h2>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <p className="text-lg text-slate-700 leading-relaxed">
                SLOANE / Adler maintains relationships with a limited set of aligned investors who share our orientation
                toward patient capital, discretion, and enduring value creation.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We do not seek capital broadly. Investor relationships are entered through direct introduction and
                mutual assessment of alignment. Our structure reflects the same principles we bring to client counsel:
                clarity, integrity, and long-term thinking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">Philosophy</h2>
            </div>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#b8a07e]" />
                    <h3 className="font-serif text-lg text-[#1a2332]">Long-Horizon Orientation</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed pl-8">
                    We measure success across years and decades, not quarters.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#b8a07e]" />
                    <h3 className="font-serif text-lg text-[#1a2332]">Judgment Over Formula</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed pl-8">
                    Decisions are shaped by context and experience, not rigid frameworks.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#b8a07e]" />
                    <h3 className="font-serif text-lg text-[#1a2332]">Stewardship Mindset</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed pl-8">
                    Capital is a responsibility, not merely an asset to be managed.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#b8a07e]" />
                    <h3 className="font-serif text-lg text-[#1a2332]">Aligned Interests</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed pl-8">
                    Our principals invest alongside our partners. We share outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">Governance</h2>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <p className="text-slate-600 leading-relaxed">
                SLOANE / Adler operates with a governance structure designed for accountability, transparency to aligned
                partners, and operational independence.
              </p>
              <div className="border-l-2 border-[#b8a07e] pl-6 space-y-4">
                <div>
                  <h3 className="font-serif text-lg text-[#1a2332]">Advisory Council</h3>
                  <p className="text-slate-600 text-sm">
                    Senior advisors with deep expertise across finance, governance, and statecraft.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#1a2332]">Investor Committee</h3>
                  <p className="text-slate-600 text-sm">
                    Quarterly engagement with aligned capital partners on strategic direction.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#1a2332]">Operating Principals</h3>
                  <p className="text-slate-600 text-sm">
                    Day-to-day leadership with full accountability for client relationships and outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-20 px-8 bg-[#1a2332]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="font-serif text-sm uppercase tracking-widest text-slate-400">Materials</h2>
            </div>
            <div className="lg:col-span-2">
              <div className="border border-slate-600 p-8 text-center space-y-4">
                <p className="text-white font-serif text-lg">Investor Portal</p>
                <p className="text-slate-400 text-sm">
                  Access to quarterly updates, fund documentation, and secure communications.
                </p>
                <div className="pt-4">
                  <Link
                    href="/login"
                    className="inline-block px-6 py-3 border border-[#b8a07e] text-[#b8a07e] text-sm tracking-wide hover:bg-[#b8a07e] hover:text-[#1a2332] transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
                <p className="text-slate-500 text-xs pt-2">Coming soon for existing investors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-2xl text-[#1a2332] mb-4">Inquiries</h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            For investor-related matters, please use our secure contact form. All inquiries are treated with discretion.
          </p>
          <Link
            href="/correspondence"
            className="inline-block px-8 py-4 bg-[#1a2332] text-white text-sm tracking-wide hover:bg-[#2a3342] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

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
