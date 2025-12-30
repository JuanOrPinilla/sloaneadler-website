"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function LoginPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder - auth not yet implemented
  }

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
            <Link href="/login" className="text-sm tracking-wide text-[#1a2332] transition-colors">
              Login
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
                className="text-sm tracking-wide text-[#1a2332]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-24 px-8 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full">
          <h1 className="font-serif text-4xl leading-tight mb-2 text-[#1a2332] text-center">Client Access</h1>
          <p className="text-slate-500 text-center mb-8">Secure portal for existing clients and investors</p>

          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-8 space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-slate-600">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 text-[#1a2332] focus:outline-none focus:border-[#1a2332] transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm text-slate-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 text-[#1a2332] focus:outline-none focus:border-[#1a2332] transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1a2332] text-white text-sm tracking-wide hover:bg-[#2a3342] transition-colors"
            >
              Sign In
            </button>

            <div className="text-center">
              <button type="button" className="text-sm text-slate-500 hover:text-[#1a2332] transition-colors">
                Forgot password?
              </button>
            </div>
          </form>

          <div className="mt-8 p-6 bg-slate-50 border border-slate-200 text-center">
            <div className="h-px w-12 bg-[#b8a07e] mx-auto mb-4"></div>
            <p className="font-serif text-lg text-[#1a2332] mb-2">Coming Soon</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Secure client portal access is currently under development. Existing clients and investors will receive
              credentials upon launch.
            </p>
            <div className="h-px w-12 bg-[#b8a07e] mx-auto mt-4"></div>
          </div>

          <p className="mt-6 text-sm text-slate-500 text-center">
            For immediate assistance, please use the{" "}
            <Link href="/correspondence" className="text-[#1a2332] underline underline-offset-2">
              contact form
            </Link>
            .
          </p>
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
            © {new Date().getFullYear()} SLOANE / Adler. Confidential and proprietary.
          </div>
        </div>
      </footer>
    </div>
  )
}
