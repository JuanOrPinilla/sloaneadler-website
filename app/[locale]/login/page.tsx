"use client"

import { LanguageSwitcher } from "@/components/language-switcher"
import type React from "react"
import { useState } from "react"
import { Link } from "@/i18n/routing"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder - auth not yet implemented
  }

  return (
    <div className="min-h-screen bg-white text-[#1a2332]">
      {/* Main Content */}
      <main className="pt-32 pb-24 px-8 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full">
          <h1 className="font-serif text-4xl leading-tight mb-4 text-[#1a2332] text-center">Restricted Access</h1>
          <p className="text-slate-500 text-center mb-10 text-sm leading-relaxed max-w-sm mx-auto">
            Access to the Sloane / Adler Partner Portal is restricted to authorized principals and client designees. Unsuccessful login attempts are logged for security purposes.
          </p>

          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-8 space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-slate-600">
                Username
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 text-[#1a2332] focus:outline-none focus:border-[#1a2332] transition-colors"
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
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1a2332] text-white text-sm tracking-widest uppercase hover:bg-[#2a3342] transition-colors"
            >
              Enter
            </button>
          </form>
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
