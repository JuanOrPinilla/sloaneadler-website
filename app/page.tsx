"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-[#1a2332]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-tight text-[#1a2332]">
            SLOANE <span className="text-slate-500">/</span> Adler
          </Link>
          <nav className="flex gap-12">
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
              href="/domains"
              className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors"
            >
              Domains
            </Link>
            <Link
              href="/counsel"
              className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors"
            >
              Counsel
            </Link>
            <Link
              href="/access"
              className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors"
            >
              Access
            </Link>
            <Link
              href="/correspondence"
              className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Foundation Section */}
      <section
        className="pt-48 pb-32 px-8"
        style={{
          opacity: Math.max(0, 1 - scrollY / 500),
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-6xl md:text-7xl leading-tight text-balance mb-12 text-[#1a2332]">
            Stewardship Across Generations
          </h1>
          <p className="text-xl leading-relaxed text-slate-600 max-w-3xl mx-auto text-pretty">
            SLOANE / Adler serves families, enterprises, and institutions through long-horizon advisory, capital
            stewardship, and continuity architecture. We work across generations, jurisdictions, and transitions with
            discretion and deliberation.
          </p>
        </div>
      </section>

      {/* Scope Section */}
      <section id="scope" className="py-24 px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500 mb-6">Scope</h2>
          <p className="text-3xl font-serif leading-relaxed text-[#1a2332] text-balance">
            We operate at the intersection of capital, reputation, governance, and continuity—where complexity demands
            clarity and consequence demands counsel.
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500 mb-16 text-center">
            Our Practice
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {/* Capital */}
            <div className="space-y-4">
              <div className="h-px w-12 bg-[#b8a07e]"></div>
              <h3 className="font-serif text-2xl text-[#1a2332]">Capital</h3>
              <p className="text-slate-600 leading-relaxed">
                Portfolio construction, allocation oversight, and inter-generational capital planning. We advise on
                structure, stewardship, and long-term resilience.
              </p>
            </div>

            {/* Reputation */}
            <div className="space-y-4">
              <div className="h-px w-12 bg-[#b8a07e]"></div>
              <h3 className="font-serif text-2xl text-[#1a2332]">Reputation</h3>
              <p className="text-slate-600 leading-relaxed">
                Counsel on narrative integrity, institutional positioning, and response architecture in moments of
                complexity or public consequence.
              </p>
            </div>

            {/* Stewardship */}
            <div className="space-y-4">
              <div className="h-px w-12 bg-[#b8a07e]"></div>
              <h3 className="font-serif text-2xl text-[#1a2332]">Stewardship</h3>
              <p className="text-slate-600 leading-relaxed">
                Governance design, trustee counsel, and continuity planning for families and enterprises operating
                across generations and geographies.
              </p>
            </div>

            {/* State & Policy */}
            <div className="space-y-4">
              <div className="h-px w-12 bg-[#b8a07e]"></div>
              <h3 className="font-serif text-2xl text-[#1a2332]">State & Policy</h3>
              <p className="text-slate-600 leading-relaxed">
                Sovereign advisory, regulatory navigation, and structural counsel for entities operating at the
                threshold of public and private power.
              </p>
            </div>

            {/* Enterprise & Leadership */}
            <div className="space-y-4">
              <div className="h-px w-12 bg-[#b8a07e]"></div>
              <h3 className="font-serif text-2xl text-[#1a2332]">Enterprise & Leadership</h3>
              <p className="text-slate-600 leading-relaxed">
                Strategic counsel for founders, boards, and leadership in transition. We advise on succession,
                restructuring, and institutional longevity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Posture Section */}
      <section className="py-24 px-8 bg-[#1a2332]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-sm uppercase tracking-widest text-slate-400 mb-12 text-center">
            Engagement Posture
          </h2>

          <div className="space-y-6 text-center">
            <p className="text-xl text-slate-300 leading-relaxed">
              We work with a limited number of families, enterprises, and institutions.
            </p>
            <p className="text-xl text-slate-300 leading-relaxed">
              Engagements are confidential, long-horizon, and entered by mutual election.
            </p>
            <p className="text-xl text-slate-300 leading-relaxed">
              We do not market. We do not compete. We do not disclose.
            </p>
            <p className="text-xl text-slate-300 leading-relaxed">
              Relationships are structured for continuity, not transaction.
            </p>
          </div>
        </div>
      </section>

      {/* Domains of Counsel section */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500 mb-16 text-center">
            Domains of Counsel
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            <div className="space-y-3">
              <h3 className="font-serif text-xl text-[#1a2332]">Cross-border capital alignment</h3>
              <p className="text-slate-600 leading-relaxed">
                Coordination of capital structures across jurisdictions, currencies, and regulatory environments.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-xl text-[#1a2332]">Reputation under scrutiny</h3>
              <p className="text-slate-600 leading-relaxed">
                Counsel during moments of public attention, institutional review, or narrative complexity.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-xl text-[#1a2332]">Leadership transition</h3>
              <p className="text-slate-600 leading-relaxed">
                Structural and advisory support for generational handoff, succession, and continuity of authority.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-xl text-[#1a2332]">State and jurisdictional exposure</h3>
              <p className="text-slate-600 leading-relaxed">
                Sovereign advisory for entities operating at the intersection of private authority and public
                consequence.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-xl text-[#1a2332]">Enterprise continuity</h3>
              <p className="text-slate-600 leading-relaxed">
                Governance architecture and institutional design for long-term resilience and structural integrity.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-xl text-[#1a2332]">Inter-generational stewardship</h3>
              <p className="text-slate-600 leading-relaxed">
                Capital preservation, family governance, and the transfer of authority across multiple generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Counsel Formats section */}
      <section className="py-24 px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500 mb-16 text-center">
            Counsel Formats
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-3">
              <div className="h-px w-10 bg-[#b8a07e]"></div>
              <h3 className="font-serif text-lg text-[#1a2332]">Principals counsel</h3>
              <p className="text-sm text-slate-600">
                Direct advisory to family principals, founders, and institutional leadership.
              </p>
            </div>

            <div className="space-y-3">
              <div className="h-px w-10 bg-[#b8a07e]"></div>
              <h3 className="font-serif text-lg text-[#1a2332]">Institutional advisory</h3>
              <p className="text-sm text-slate-600">
                Ongoing structural counsel for boards, trustees, and governance bodies.
              </p>
            </div>

            <div className="space-y-3">
              <div className="h-px w-10 bg-[#b8a07e]"></div>
              <h3 className="font-serif text-lg text-[#1a2332]">Transition support</h3>
              <p className="text-sm text-slate-600">
                Guidance during succession, restructuring, and moments of institutional change.
              </p>
            </div>

            <div className="space-y-3">
              <div className="h-px w-10 bg-[#b8a07e]"></div>
              <h3 className="font-serif text-lg text-[#1a2332]">Jurisdictional alignment</h3>
              <p className="text-sm text-slate-600">
                Coordination across regulatory environments, sovereign contexts, and legal systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Context section */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500 mb-12">Operating Context</h2>

          <div className="space-y-6">
            <p className="text-xl text-slate-600 leading-relaxed">
              We operate across multi-continental environments, navigating cross-cultural dynamics and cross-currency
              structures.
            </p>
            <p className="text-xl text-slate-600 leading-relaxed">
              Our work spans public and private capital environments, where discretion and institutional memory are
              non-negotiable.
            </p>
          </div>
        </div>
      </section>

      {/* Continuity Section */}
      <section className="py-32 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500 mb-16 text-center">
            Continuity Over Time
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center space-y-3">
              <div className="h-px w-8 bg-[#b8a07e] mx-auto"></div>
              <h3 className="font-serif text-lg text-[#1a2332]">Entry</h3>
              <p className="text-sm text-slate-600">
                Introduction through established counsel or institutional referral
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="h-px w-8 bg-[#b8a07e] mx-auto"></div>
              <h3 className="font-serif text-lg text-[#1a2332]">Stewardship</h3>
              <p className="text-sm text-slate-600">
                Ongoing advisory across capital, governance, and institutional continuity
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="h-px w-8 bg-[#b8a07e] mx-auto"></div>
              <h3 className="font-serif text-lg text-[#1a2332]">Transition</h3>
              <p className="text-sm text-slate-600">
                Succession planning, generational handoff, and structural redesign
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="h-px w-8 bg-[#b8a07e] mx-auto"></div>
              <h3 className="font-serif text-lg text-[#1a2332]">Endurance</h3>
              <p className="text-sm text-slate-600">Multi-generational counsel and institutional memory preservation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Access Section */}
      <section id="access" className="py-24 px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500 mb-8">Access</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            SLOANE / Adler operates by referral and invitation.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            For inquiries through established counsel, contact may be initiated through secure channels provided to
            existing advisory relationships.
          </p>
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
              <Link href="/domains" className="text-slate-600 hover:text-[#1a2332] transition-colors">
                Domains
              </Link>
              <Link href="/counsel" className="text-slate-600 hover:text-[#1a2332] transition-colors">
                Counsel
              </Link>
              <Link href="/policies" className="text-slate-600 hover:text-[#1a2332] transition-colors">
                Policies
              </Link>
              <Link href="/correspondence" className="text-slate-600 hover:text-[#1a2332] transition-colors">
                Correspondence
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
