import Link from "next/link"

export default function ApproachPage() {
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
            <Link href="/approach" className="text-sm tracking-wide text-[#1a2332] transition-colors">
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
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-16 text-balance">Approach</h1>

          <div className="space-y-16">
            <div className="space-y-6">
              <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">Foundations</h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                We do not optimize for quarterly outcomes or transactional efficiency. Our work is calibrated for
                durability, discretion, and multi-generational continuity.
              </p>
              <p className="text-xl text-slate-600 leading-relaxed">
                Relationships are structured around trust, institutional memory, and the recognition that certain
                counsel cannot be replaced, replicated, or commoditized.
              </p>
            </div>

            <div className="h-px w-24 bg-slate-200 mx-auto"></div>

            <div className="space-y-6">
              <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">Discipline</h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                We work with restraint. No marketing. No public discourse. No performance metrics or client lists.
              </p>
              <p className="text-xl text-slate-600 leading-relaxed">
                Our practice is defined by what we decline as much as what we accept. We do not pursue growth. We do not
                compete for mandates. We do not operate on timelines that compromise depth.
              </p>
            </div>

            <div className="h-px w-24 bg-slate-200 mx-auto"></div>

            <div className="space-y-6">
              <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">Counsel</h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Advisory is not transactional. It is relational, contextual, and longitudinal. We work across
                transitions, generations, and jurisdictions where complexity cannot be reduced to frameworks or
                processes.
              </p>
              <p className="text-xl text-slate-600 leading-relaxed">
                Engagements are structured for continuity, with counsel extended over years and decades rather than
                quarters or campaigns.
              </p>
            </div>

            <div className="h-px w-24 bg-slate-200 mx-auto"></div>

            <div className="space-y-6">
              <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">Discretion</h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                All work is confidential. No case studies. No testimonials. No attribution. No disclosure.
              </p>
              <p className="text-xl text-slate-600 leading-relaxed">
                We operate in environments where exposure is risk and trust is earned through consistency, not
                credentials.
              </p>
            </div>
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
