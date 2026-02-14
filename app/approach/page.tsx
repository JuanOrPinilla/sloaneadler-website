"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function ApproachPage() {
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
            <Link href="/approach" className="text-sm tracking-wide text-[#1a2332] transition-colors">
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
                className="text-sm tracking-wide text-[#1a2332]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Approach
              </Link>
              <Link
                href="/investor"
                className="text-sm tracking-wide text-slate-600"
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

      {/* Main Content */}
      <main className="pt-32 pb-24 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-16 text-balance">Approach</h1>

          <div className="space-y-16">
            <div className="space-y-6">
              <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">Foundations</h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                We do not optimize for quarterly outcomes or transactional efficiency. Our work is calibrated for
                durability, discretion, and multi-generational continuity.
              </p>
              <p className="text-xl text-slate-600 leading-relaxed">
                Relationships are structured around trust, institutional memory, and the recognition that certain
                counsel cannot be replaced, replicated, or commoditized.
              </p>
            </div>

            <div className="h-px w-24 bg-slate-200 mx-auto"></div>

            <div className="space-y-6">
              <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">Discipline</h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                We work with restraint. No marketing. No public discourse. No performance metrics or client lists.
              </p>
              <p className="text-xl text-slate-600 leading-relaxed">
                Our practice is defined by what we decline as much as what we accept.
              </p>
            </div>

            <div className="h-px w-24 bg-slate-200 mx-auto"></div>

            <div className="space-y-6">
              <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">Counsel</h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Advisory is not transactional. It is relational, contextual, and longitudinal. We work across
                transitions, generations, and jurisdictions where complexity cannot be reduced to frameworks or
                processes.
              </p>
            </div>
          </div>
        </div>

        {/* Domains Section - consolidated from domains page */}
        <div className="max-w-5xl mx-auto mt-32">
          <div className="text-center mb-16">
            <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500 mb-4">Domains</h2>
            <p className="text-lg text-slate-600">Where we provide guidance and structure.</p>
          </div>

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

        {/* Counsel Formats Section - consolidated from counsel page */}
        <div className="max-w-4xl mx-auto mt-32">
          <div className="text-center mb-16">
            <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500 mb-4">Counsel Formats</h2>
            <p className="text-lg text-slate-600">How we structure advisory relationships.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-[#1a2332]">Retainer Advisory</h3>
              <p className="text-slate-600 leading-relaxed">
                Ongoing counsel across capital, governance, and institutional positioning. Structured for long-horizon
                continuity.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-xl text-[#1a2332]">Strategic Review</h3>
              <p className="text-slate-600 leading-relaxed">
                Focused assessment of specific matters - transactions, transitions, or structural decisions - with
                recommendations.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-xl text-[#1a2332]">Board & Trustee Counsel</h3>
              <p className="text-slate-600 leading-relaxed">
                Advisory to governance bodies on fiduciary responsibility, succession, and institutional integrity.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-xl text-[#1a2332]">Family Office Integration</h3>
              <p className="text-slate-600 leading-relaxed">
                Coordination of advisors, alignment of objectives, and oversight of multi-generational planning.
              </p>
            </div>
          </div>
        </div>
      </main>

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
            {"© SLOANE / Adler Holdings. Confidential and proprietary."}
          </div>
        </div>
      </footer>
    </div>
  )
}
