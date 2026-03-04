"use client"

import { LanguageSwitcher } from "@/components/language-switcher"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function PoliciesPage() {
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

      {/* Main Content - Removed contractual language, kept institutional guidelines */}
      <main className="pt-32 pb-24 px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-16 text-balance">Policies</h1>

          <div className="space-y-16">
            <div className="space-y-6">
              <h2 className="font-serif text-xl text-[#1a2332]">Confidentiality</h2>
              <p className="text-slate-600 leading-relaxed">
                All engagements, correspondence, and counsel provided by SLOANE / Adler are strictly confidential. We do
                not disclose client relationships, matters under advisement, or any information shared in the course of
                counsel.
              </p>
            </div>

            <div className="h-px w-24 bg-slate-200"></div>

            <div className="space-y-6">
              <h2 className="font-serif text-xl text-[#1a2332]">Referral Protocol</h2>
              <p className="text-slate-600 leading-relaxed">
                SLOANE / Adler welcomes inquiries through referral and institutional introduction. We do not market,
                compete for mandates, or engage in promotional activity.
              </p>
            </div>

            <div className="h-px w-24 bg-slate-200"></div>

            <div className="space-y-6">
              <h2 className="font-serif text-xl text-[#1a2332]">Independence</h2>
              <p className="text-slate-600 leading-relaxed">
                We maintain strict independence in all advisory relationships. Conflicts of interest are evaluated with
                rigor, and we decline engagements where counsel cannot be provided with complete objectivity.
              </p>
            </div>

            <div className="h-px w-24 bg-slate-200"></div>

            <div className="space-y-6">
              <h2 className="font-serif text-xl text-[#1a2332]">Data and Records</h2>
              <p className="text-slate-600 leading-relaxed">
                All information, correspondence, and documentation are retained with the highest standards of security
                and confidentiality. We do not share, sell, or distribute any client information.
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
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
