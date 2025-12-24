"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"

export default function AccessPage() {
  const [passphrase, setPassphrase] = useState("")
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple gating mechanism - in production, this would be server-side
    if (passphrase.toLowerCase() === "referred") {
      setIsAuthorized(true)
      setError("")
    } else {
      setError("Access requires referral authorization")
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#1a2332]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
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
            <Link href="/access" className="text-sm tracking-wide text-[#1a2332] transition-colors">
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

      {/* Main Content */}
      <main className="pt-32 pb-24 px-8">
        <div className="max-w-2xl mx-auto">
          {!isAuthorized ? (
            <>
              <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-8 text-balance">Access</h1>

              <div className="space-y-8 mb-16">
                <p className="text-xl text-slate-600 leading-relaxed">
                  SLOANE / Adler operates by referral and invitation.
                </p>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Access is extended through established counsel or institutional introduction. Engagements are
                  confidential and entered by mutual election.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label htmlFor="passphrase" className="block text-sm font-medium text-slate-600">
                    Referral Authorization
                  </label>
                  <input
                    type="password"
                    id="passphrase"
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 focus:border-[#1a2332] focus:ring-1 focus:ring-[#1a2332] outline-none transition-colors"
                    placeholder="Enter referral code"
                  />
                  {error && <p className="text-sm text-slate-500">{error}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1a2332] text-white py-3 px-6 hover:bg-slate-800 transition-colors"
                >
                  Submit
                </button>
              </form>

              <div className="mt-16 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-500 text-center">
                  For inquiries through established counsel, direct correspondence may be initiated through secure
                  channels.
                </p>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-8 text-balance">Access Granted</h1>

              <div className="space-y-8">
                <p className="text-xl text-slate-600 leading-relaxed">
                  You have been granted access to restricted materials and counsel channels.
                </p>

                <div className="space-y-4 pt-8">
                  <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">Available Resources</h2>

                  <div className="space-y-3">
                    <Link
                      href="/views"
                      className="block py-4 px-6 border border-slate-200 hover:border-[#1a2332] transition-colors"
                    >
                      <div className="font-serif text-lg text-[#1a2332]">Views</div>
                      <div className="text-sm text-slate-600">Editorial perspectives on institutional stewardship</div>
                    </Link>

                    <Link
                      href="/correspondence"
                      className="block py-4 px-6 border border-slate-200 hover:border-[#1a2332] transition-colors"
                    >
                      <div className="font-serif text-lg text-[#1a2332]">Secure Correspondence</div>
                      <div className="text-sm text-slate-600">Direct communication channels</div>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
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
