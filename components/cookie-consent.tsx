'use client'

import { useState, useEffect } from 'react'

const CONSENT_KEY = 'sa_cookie_consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
    window.dispatchEvent(new CustomEvent('cookieConsentAccepted'))
  }

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a2332] text-white px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
        We use analytics cookies to understand how visitors navigate our site.{' '}
        <a href="/legal/privacy" className="underline underline-offset-2 hover:text-white transition-colors">
          Privacy Policy
        </a>
      </p>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={decline}
          className="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2"
        >
          Decline
        </button>
        <button
          onClick={accept}
          className="text-sm bg-white text-[#1a2332] px-5 py-2 hover:bg-slate-100 transition-colors font-medium"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
