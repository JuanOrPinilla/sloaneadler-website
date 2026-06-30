"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function AccessForm() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        router.push(redirect)
        router.refresh()
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError(false)
          }}
          placeholder="Enter password"
          autoFocus
          className="w-full px-4 py-3 text-sm border border-slate-200 bg-white text-[#1a2332] placeholder:text-slate-400 focus:outline-none focus:border-slate-400"
        />
        {error && (
          <p className="text-xs text-red-600 mt-2">
            Incorrect password.
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-3 text-sm font-medium bg-[#1a2332] text-white hover:bg-[#2a3342] transition-colors disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Enter"}
      </button>
    </form>
  )
}

export default function AccessPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl tracking-tight text-[#1a2332]">
            SLOANE <span className="text-slate-500">/</span> Adler
          </h1>
          <p className="text-sm font-medium text-[#1a2332] mt-3">
            Restricted Access
          </p>
          <p className="text-xs text-slate-500 mt-3 leading-relaxed max-w-xs mx-auto">
            Access to the Sloane / Adler Partner Portal is restricted to authorized principals and client designees. Unsuccessful login attempts are logged for security purposes.
          </p>
        </div>
        <Suspense fallback={<div className="text-center text-slate-500">Loading...</div>}>
          <AccessForm />
        </Suspense>
      </div>
    </div>
  )
}
