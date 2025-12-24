import Link from "next/link"

export default function DomainsPage() {
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
            <Link href="/domains" className="text-sm tracking-wide text-[#1a2332] transition-colors">
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
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-8 text-balance">Domains of Counsel</h1>

          <p className="text-xl text-slate-600 leading-relaxed mb-24 max-w-3xl">
            We operate at the intersection of capital, governance, and continuity—where complexity demands clarity and
            consequence demands counsel.
          </p>

          <div className="space-y-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
              <div className="space-y-4">
                <div className="h-px w-12 bg-[#b8a07e]"></div>
                <h2 className="font-serif text-2xl text-[#1a2332]">Cross-border capital alignment</h2>
                <p className="text-slate-600 leading-relaxed">
                  Coordination of capital structures across jurisdictions, currencies, and regulatory environments.
                  Advisory on allocation, risk exposure, and structural resilience in multi-sovereign contexts.
                </p>
              </div>

              <div className="space-y-4">
                <div className="h-px w-12 bg-[#b8a07e]"></div>
                <h2 className="font-serif text-2xl text-[#1a2332]">Reputation under scrutiny</h2>
                <p className="text-slate-600 leading-relaxed">
                  Counsel during moments of public attention, institutional review, or narrative complexity. We advise
                  on positioning, response architecture, and long-term reputational integrity.
                </p>
              </div>

              <div className="space-y-4">
                <div className="h-px w-12 bg-[#b8a07e]"></div>
                <h2 className="font-serif text-2xl text-[#1a2332]">Leadership transition</h2>
                <p className="text-slate-600 leading-relaxed">
                  Structural and advisory support for generational handoff, succession planning, and the continuity of
                  authority. Counsel for families, enterprises, and institutions navigating leadership change.
                </p>
              </div>

              <div className="space-y-4">
                <div className="h-px w-12 bg-[#b8a07e]"></div>
                <h2 className="font-serif text-2xl text-[#1a2332]">State and jurisdictional exposure</h2>
                <p className="text-slate-600 leading-relaxed">
                  Sovereign advisory for entities operating at the intersection of private authority and public
                  consequence. Navigation of regulatory environments, diplomatic contexts, and policy exposure.
                </p>
              </div>

              <div className="space-y-4">
                <div className="h-px w-12 bg-[#b8a07e]"></div>
                <h2 className="font-serif text-2xl text-[#1a2332]">Enterprise continuity</h2>
                <p className="text-slate-600 leading-relaxed">
                  Governance architecture and institutional design for long-term resilience. Advisory on board
                  structure, fiduciary oversight, and the preservation of enterprise integrity across cycles and crises.
                </p>
              </div>

              <div className="space-y-4">
                <div className="h-px w-12 bg-[#b8a07e]"></div>
                <h2 className="font-serif text-2xl text-[#1a2332]">Inter-generational stewardship</h2>
                <p className="text-slate-600 leading-relaxed">
                  Capital preservation, family governance, and the transfer of authority across multiple generations. We
                  advise on trust structures, succession frameworks, and the maintenance of legacy.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-16">
              <p className="text-lg text-slate-600 leading-relaxed text-center max-w-3xl mx-auto">
                These domains are not services. They are contexts in which we provide counsel—discreetly, deliberately,
                and with attention to consequence over time.
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
