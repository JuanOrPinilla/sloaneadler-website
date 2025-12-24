import Link from "next/link"

export default function CounselPage() {
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
            <Link href="/counsel" className="text-sm tracking-wide text-[#1a2332] transition-colors">
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
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-8 text-balance">Counsel Formats</h1>

          <p className="text-xl text-slate-600 leading-relaxed mb-24 max-w-3xl">
            We provide counsel through multiple formats, each calibrated for the context, complexity, and continuity
            required.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            <div className="space-y-4">
              <div className="h-px w-12 bg-[#b8a07e]"></div>
              <h2 className="font-serif text-2xl text-[#1a2332]">Principals counsel</h2>
              <p className="text-slate-600 leading-relaxed">
                Direct advisory to family principals, founders, and institutional leadership on matters of capital,
                reputation, and strategic consequence.
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-px w-12 bg-[#b8a07e]"></div>
              <h2 className="font-serif text-2xl text-[#1a2332]">Institutional advisory</h2>
              <p className="text-slate-600 leading-relaxed">
                Ongoing structural counsel for boards, trustees, and governance bodies navigating complexity,
                transition, and long-term continuity.
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-px w-12 bg-[#b8a07e]"></div>
              <h2 className="font-serif text-2xl text-[#1a2332]">Transition support</h2>
              <p className="text-slate-600 leading-relaxed">
                Guidance during succession, restructuring, and moments of institutional change where continuity must be
                preserved through transformation.
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-px w-12 bg-[#b8a07e]"></div>
              <h2 className="font-serif text-2xl text-[#1a2332]">Jurisdictional alignment</h2>
              <p className="text-slate-600 leading-relaxed">
                Coordination across regulatory environments, sovereign contexts, and legal systems where complexity
                cannot be delegated to process.
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-px w-12 bg-[#b8a07e]"></div>
              <h2 className="font-serif text-2xl text-[#1a2332]">Multi-generational stewardship</h2>
              <p className="text-slate-600 leading-relaxed">
                Longitudinal counsel across decades and generations, maintaining institutional memory and continuity of
                purpose.
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-px w-12 bg-[#b8a07e]"></div>
              <h2 className="font-serif text-2xl text-[#1a2332]">Crisis and consequence counsel</h2>
              <p className="text-slate-600 leading-relaxed">
                Advisory during moments of acute complexity, public scrutiny, or institutional risk where discretion and
                judgment are non-negotiable.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-16 max-w-3xl mx-auto">
            <p className="text-lg text-slate-600 leading-relaxed text-center">
              Counsel is not transactional. It is relational, contextual, and structured for continuity across time,
              transitions, and complexity.
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
