"use client"

import type React from "react"
import { useState } from "react"
import { Footer } from "@/components/footer"

export default function CorrespondencePage() {
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

      <Footer />
    </div>
  )
}
