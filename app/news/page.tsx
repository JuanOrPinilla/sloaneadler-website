"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ArrowRight } from "lucide-react"

const posts = [
  {
    id: 1,
    date: "December 30, 2025",
    title: "On the Nature of Patient Capital",
    summary:
      "In an environment shaped by short-term pressures, the discipline of long-horizon thinking remains essential.",
    body: `The current landscape rewards speed and scale. Yet for families and institutions with multi-generational mandates, the calculus differs fundamentally. Patient capital is not passive capital; it is capital deployed with the clarity that comes from understanding time differently.

We continue to advise principals who measure outcomes across decades, not quarters. This orientation shapes everything: the relationships we enter, the counsel we provide, and the structures we recommend.`,
  },
  {
    id: 2,
    date: "December 30, 2025",
    title: "Governance in Transition",
    summary:
      "Leadership succession remains one of the most consequential challenges facing enterprises and families alike.",
    body: `The transfer of leadership; whether in a family enterprise, a sovereign context, or a closely-held fund, carries implications that extend far beyond the immediate transition. Done well, it preserves institutional knowledge while creating space for necessary evolution.

Our work in this area emphasizes preparation over reaction. The most successful transitions we have counseled share a common thread: they began years before any formal announcement.`,
  },
  {
    id: 3,
    date: "December 30, 2025",
    title: "Discretion as Discipline",
    summary: "In an age of transparency, the value of measured communication has only increased.",
    body: `Discretion is often misunderstood as secrecy. In practice, it is the discipline of speaking precisely, sharing deliberately, and understanding that not all matters benefit from broad visibility.

For the families and institutions we serve, this discipline is foundational. Reputation is built through consistent action over time, and preserved through the wisdom to know when silence serves better than statement.`,
  },
  {
    id: 4,
    date: "December 30, 2025",
    title: "Cross-Border Complexity",
    summary: "Navigating capital, reputation, and governance across jurisdictions requires integrated counsel.",
    body: `The principals we advise rarely operate within a single jurisdiction. Their interests span continents, their families cross borders, and their enterprises face regulatory environments that shift with political winds.

This complexity demands counsel that sees the whole picture. We work at the intersections; where tax meets reputation, where governance meets culture, where capital meets policy.`,
  },
]

export default function NewsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedPost, setExpandedPost] = useState<number | null>(null)

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
            <Link href="/news" className="text-sm tracking-wide text-[#1a2332] transition-colors">
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
                href="/investor"
                className="text-sm tracking-wide text-slate-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Investor
              </Link>
              <Link
                href="/news"
                className="text-sm tracking-wide text-[#1a2332]"
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

      {/* Main Content */}
      <main className="pt-32 pb-24 px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-8 text-balance">News</h1>

          <p className="text-xl text-slate-600 leading-relaxed mb-16">
            Selected updates and perspectives from SLOANE / Adler.
          </p>

          <div className="space-y-12">
            {posts.map((post) => (
              <article key={post.id} className="border-b border-slate-200 pb-12">
                <time className="text-sm text-slate-500">{post.date}</time>
                <h2 className="font-serif text-2xl text-[#1a2332] mt-2 mb-3">{post.title}</h2>
                <p className="text-slate-600 leading-relaxed mb-4">{post.summary}</p>

                {expandedPost === post.id ? (
                  <div className="space-y-4 mt-6">
                    {post.body.split("\n\n").map((paragraph, idx) => (
                      <p key={idx} className="text-slate-600 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                    <button
                      onClick={() => setExpandedPost(null)}
                      className="text-sm text-[#1a2332] flex items-center gap-2 mt-4 hover:text-[#b8a07e] transition-colors"
                    >
                      Show less
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setExpandedPost(post.id)}
                    className="text-sm text-[#1a2332] flex items-center gap-2 hover:text-[#b8a07e] transition-colors"
                  >
                    Read more <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </article>
            ))}
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
            {"© SLOANE / Adler Holdings. Confidential and proprietary."}
          </div>
        </div>
      </footer>
    </div>
  )
}
