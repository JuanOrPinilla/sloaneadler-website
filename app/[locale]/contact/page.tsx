"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { Mail, Phone, MapPin } from "lucide-react"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  const t = useTranslations("contact")
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formState.name.trim()) {
      newErrors.name = t("errors.nameRequired") || "Name is required"
    } else if (formState.name.trim().length < 2) {
      newErrors.name = t("errors.nameMinLength") || "Name must be at least 2 characters"
    }

    if (!formState.email.trim()) {
      newErrors.email = t("errors.emailRequired") || "Email is required"
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formState.email)) {
        newErrors.email = t("errors.emailInvalid") || "Please enter a valid email address"
      }
    }

    if (!formState.message.trim()) {
      newErrors.message = t("errors.messageRequired") || "Message is required"
    } else if (formState.message.trim().length < 10) {
      newErrors.message = t("errors.messageMinLength") || "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState,
          inquiryType: "general",
        }),
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

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#1a2332]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6 text-balance">
            {t("hero.title") || "Contact"}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
            {t("hero.subtitle") || "Begin a conversation. We respond to thoughtful inquiries with discretion and care."}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <main className="py-20 px-8" id="main-content" tabIndex={-1}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500 mb-6">
                  {t("info.title") || "Direct Contact"}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {t("info.description") ||
                    "For inquiries regarding advisory services, investor relations, or general correspondence."}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#b8a07e]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#1a2332] mb-1">
                      {t("info.email.title") || "Email"}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {t("info.email.description") || "correspondence@sloaneadler.com"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#b8a07e]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#1a2332] mb-1">
                      {t("info.location.title") || "Offices"}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {t("info.location.description") || "New York · San Francisco · London"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#b8a07e]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-[#1a2332] mb-1">
                      {t("info.response.title") || "Response Time"}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {t("info.response.description") || "Typically within 48 hours"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-l-2 border-[#b8a07e] pl-6">
                <p className="text-sm text-slate-500 leading-relaxed">
                  {t("info.note") ||
                    "For detailed inquiries requiring confidentiality, please use our correspondence form."}
                </p>
                <Link
                  href="/correspondence"
                  className="inline-block mt-4 text-sm text-[#1a2332] underline underline-offset-4 hover:text-[#b8a07e] transition-colors"
                >
                  {t("info.correspondenceLink") || "Go to Correspondence Form"}
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              {submitted ? (
                <div
                  className="bg-slate-50 border border-slate-200 p-8 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <h2 className="font-serif text-2xl text-[#1a2332] mb-4">
                    {t("form.success.title") || "Message Sent"}
                  </h2>
                  <p className="text-slate-600">
                    {t("form.success.message") ||
                      "Thank you for your inquiry. We will review your message and respond with discretion."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form" noValidate>
                  {error && (
                    <div
                      className="p-4 border border-red-200 bg-red-50 text-red-700 text-sm"
                      role="alert"
                      aria-live="assertive"
                    >
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm text-slate-600">
                      {t("form.name.label") || "Name"} <span aria-label="required">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formState.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={`w-full px-4 py-3 border bg-white text-[#1a2332] focus-visible:ring-2 focus-visible:ring-[#1a2332] focus-visible:ring-offset-2 focus-visible:border-[#1a2332] transition-colors outline-none ${
                        errors.name ? "border-red-300" : "border-slate-200"
                      }`}
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-sm text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-slate-600">
                      {t("form.email.label") || "Email"} <span aria-label="required">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formState.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={`w-full px-4 py-3 border bg-white text-[#1a2332] focus-visible:ring-2 focus-visible:ring-[#1a2332] focus-visible:ring-offset-2 focus-visible:border-[#1a2332] transition-colors outline-none ${
                        errors.email ? "border-red-300" : "border-slate-200"
                      }`}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm text-slate-600">
                      {t("form.message.label") || "Message"} <span aria-label="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formState.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className={`w-full px-4 py-3 border bg-white text-[#1a2332] focus-visible:ring-2 focus-visible:ring-[#1a2332] focus-visible:ring-offset-2 focus-visible:border-[#1a2332] transition-colors outline-none resize-none ${
                        errors.message ? "border-red-300" : "border-slate-200"
                      }`}
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-sm text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      aria-busy={submitting}
                      className="w-full px-8 py-4 bg-[#1a2332] text-white text-sm tracking-wide hover:bg-[#2a3342] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-[#1a2332] focus-visible:ring-offset-2 outline-none"
                    >
                      {submitting ? t("form.submit.sending") || "Sending..." : t("form.submit.label") || "Send Message"}
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 text-center">
                    {t("form.privacy") || "Your information will be handled with strict confidentiality."}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
