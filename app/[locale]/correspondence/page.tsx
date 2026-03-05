"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "@/i18n/routing"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function CorrespondencePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    organization: "",
    email: "",
    inquiryType: "general",
    referralSource: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to submit")
      }
      
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.")
    } finally {
      setSubmitting(false)
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

          <nav className="hidden md:flex gap-12 items-center">
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
            <Link href="/correspondence" className="text-sm tracking-wide text-[#1a2332] transition-colors">
              Contact
            </Link>
            <Link href="/login" className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors">
              Principals
            </Link>
          </nav>

          <button 
            className="md:hidden p-2 focus-visible:ring-2 focus-visible:ring-[#1a2332] focus-visible:ring-offset-2 rounded" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            aria-label="Toggle menu"
          >
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
                className="text-sm tracking-wide text-[#1a2332]"
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
      <main className="pt-32 pb-24 px-8" id="main-content" tabIndex={-1}>
        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-8 text-balance">Correspondence</h1>

          <div className="space-y-6 mb-12">
            <p className="text-xl text-slate-600 leading-relaxed">
              Inquiries are welcomed through referral or introduction. Please provide context for your correspondence.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed border-l-2 border-[#b8a07e] pl-4">
              Sloane / Adler accepts new mandates by introduction only. To verify a principal or request a secure file transfer, please use the form below.
            </p>
          </div>

          {submitted ? (
            <div 
              className="bg-slate-50 border border-slate-200 p-8 text-center"
              role="status"
              aria-live="polite"
            >
              <h2 className="font-serif text-2xl text-[#1a2332] mb-4">Received</h2>
              <p className="text-slate-600">
                Your correspondence has been received and will be reviewed with discretion.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8" aria-label="Contact correspondence form">
              {error && (
                <div 
                  className="p-4 border border-red-200 bg-red-50 text-red-700 text-sm"
                  role="alert"
                  aria-live="assertive"
                >
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-slate-600">
                    Name <span aria-label="required">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    aria-required="true"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 bg-white text-[#1a2332] focus-visible:ring-2 focus-visible:ring-[#1a2332] focus-visible:ring-offset-2 focus-visible:border-[#1a2332] transition-colors outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="organization" className="text-sm text-slate-600">
                    Organization
                  </label>
                  <input
                    id="organization"
                    type="text"
                    value={formState.organization}
                    onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 bg-white text-[#1a2332] focus-visible:ring-2 focus-visible:ring-[#1a2332] focus-visible:ring-offset-2 focus-visible:border-[#1a2332] transition-colors outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-slate-600">
                  Email <span aria-label="required">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  aria-required="true"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 bg-white text-[#1a2332] focus-visible:ring-2 focus-visible:ring-[#1a2332] focus-visible:ring-offset-2 focus-visible:border-[#1a2332] transition-colors outline-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="inquiryType" className="text-sm text-slate-600">
                  Nature of Inquiry
                </label>
                <select
                  id="inquiryType"
                  value={formState.inquiryType}
                  onChange={(e) => setFormState({ ...formState, inquiryType: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 bg-white text-[#1a2332] focus-visible:ring-2 focus-visible:ring-[#1a2332] focus-visible:ring-offset-2 focus-visible:border-[#1a2332] transition-colors outline-none"
                >
                  <option value="general">General Inquiry</option>
                  <option value="advisory">Advisory Services</option>
                  <option value="access">Access Request</option>
                  <option value="press">Press & Media</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="referralSource" className="text-sm text-slate-600">
                  Referral Source or Introduction
                </label>
                <input
                  id="referralSource"
                  type="text"
                  placeholder="If applicable"
                  value={formState.referralSource}
                  onChange={(e) => setFormState({ ...formState, referralSource: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 bg-white text-[#1a2332] placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#1a2332] focus-visible:ring-offset-2 focus-visible:border-[#1a2332] transition-colors outline-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-slate-600">
                  Message <span aria-label="required">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  aria-required="true"
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 bg-white text-[#1a2332] focus-visible:ring-2 focus-visible:ring-[#1a2332] focus-visible:ring-offset-2 focus-visible:border-[#1a2332] transition-colors outline-none resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting}
                  className="px-8 py-3 bg-[#1a2332] text-white text-sm tracking-wide hover:bg-[#2a3342] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-[#1a2332] focus-visible:ring-offset-2 outline-none"
                >
                  {submitting ? "Submitting..." : "Submit Correspondence"}
                </button>
              </div>

              <p className="text-sm text-slate-500">
                All correspondence is treated as confidential. Response times vary based on context and referral source.
              </p>
            </form>
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

            <nav className="flex flex-col md:flex-row gap-6 text-sm" aria-label="Footer navigation">
              <Link href="/approach" className="text-slate-600 hover:text-[#1a2332] transition-colors">
                Approach
              </Link>
              <Link href="/investor" className="text-slate-600 hover:text-[#1a2332] transition-colors">
                Investor
              </Link>
              <Link href="/news" className="text-slate-600 hover:text-[#1a2332] transition-colors">
                News
              </Link>
              <Link href="/legal/terms" className="text-slate-600 hover:text-[#1a2332] transition-colors">
                Terms
              </Link>
              <Link href="/legal/privacy" className="text-slate-600 hover:text-[#1a2332] transition-colors">
                Privacy
              </Link>
              <Link href="/correspondence" className="text-slate-600 hover:text-[#1a2332] transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              {"© SLOANE / Adler Holdings. Confidential and proprietary."}
            </p>
            <LanguageSwitcher />
          </div>
        </div>
      </footer>
    </div>
  )
}
