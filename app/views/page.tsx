import Link from "next/link"

export default function ViewsPage() {
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
            <Link
              href="/access"
              className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors"
            >
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
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-8 text-balance">Views</h1>

          <p className="text-xl text-slate-600 leading-relaxed mb-24">
            Occasional editorial perspectives on institutional stewardship, continuity, and consequence.
          </p>

          <div className="space-y-16">
            <article className="space-y-4 pb-16 border-b border-slate-200">
              <div className="text-sm text-slate-500">2025</div>
              <h2 className="font-serif text-2xl text-[#1a2332]">On the Durability of Institutional Memory</h2>
              <p className="text-slate-600 leading-relaxed">
                Institutions that endure do not optimize for the present. They preserve context, maintain continuity,
                and recognize that certain forms of knowledge cannot be reconstituted once lost.
              </p>
            </article>

            <article className="space-y-4 pb-16 border-b border-slate-200">
              <div className="text-sm text-slate-500">2024</div>
              <h2 className="font-serif text-2xl text-[#1a2332]">The Architecture of Discretion</h2>
              <p className="text-slate-600 leading-relaxed">
                In environments of consequence, discretion is not opacity. It is the deliberate structuring of
                information, relationships, and authority to preserve integrity under scrutiny.
              </p>
            </article>

            <article className="space-y-4 pb-16 border-b border-slate-200">
              <div className="text-sm text-slate-500">2024</div>
              <h2 className="font-serif text-2xl text-[#1a2332]">Capital and Continuity</h2>
              <p className="text-slate-600 leading-relaxed">
                Wealth across generations is not preserved through returns alone. It is sustained through governance,
                culture, and the transmission of values that outlast market cycles.
              </p>
            </article>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 text-center">
              Additional perspectives are available to authorized parties through secure channels.
            </p>
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
