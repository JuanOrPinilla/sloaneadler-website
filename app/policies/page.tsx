import Link from "next/link"

export default function PoliciesPage() {
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
          <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-16 text-balance">Policies</h1>

          <div className="space-y-16">
            <div className="space-y-6">
              <h2 className="font-serif text-xl text-[#1a2332]">Confidentiality</h2>
              <p className="text-slate-600 leading-relaxed">
                All engagements, correspondence, and counsel provided by SLOANE / Adler are strictly confidential. We do
                not disclose client relationships, matters under advisement, or any information shared in the course of
                counsel.
              </p>
              <p className="text-slate-600 leading-relaxed">
                No testimonials, case studies, or attribution of work are made public without explicit written consent.
              </p>
            </div>

            <div className="h-px w-24 bg-slate-200"></div>

            <div className="space-y-6">
              <h2 className="font-serif text-xl text-[#1a2332]">Engagement Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                Engagements are entered by mutual election and structured for long-horizon continuity. We do not accept
                transactional mandates or time-bound projects that compromise depth of counsel.
              </p>
              <p className="text-slate-600 leading-relaxed">
                All terms of engagement are established through direct correspondence and documented agreement between
                parties.
              </p>
            </div>

            <div className="h-px w-24 bg-slate-200"></div>

            <div className="space-y-6">
              <h2 className="font-serif text-xl text-[#1a2332]">Referral Protocol</h2>
              <p className="text-slate-600 leading-relaxed">
                SLOANE / Adler operates exclusively through referral and institutional introduction. Direct inquiries
                without established counsel or introduction are not accepted.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We do not market, compete for mandates, or engage in promotional activity.
              </p>
            </div>

            <div className="h-px w-24 bg-slate-200"></div>

            <div className="space-y-6">
              <h2 className="font-serif text-xl text-[#1a2332]">Conflicts and Independence</h2>
              <p className="text-slate-600 leading-relaxed">
                We maintain strict independence in all advisory relationships. Conflicts of interest are evaluated with
                rigor, and we decline engagements where counsel cannot be provided with complete objectivity.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We do not accept contingent fees, transactional compensation, or arrangements that compromise the
                integrity of counsel.
              </p>
            </div>

            <div className="h-px w-24 bg-slate-200"></div>

            <div className="space-y-6">
              <h2 className="font-serif text-xl text-[#1a2332]">Data and Records</h2>
              <p className="text-slate-600 leading-relaxed">
                All information, correspondence, and documentation are retained with the highest standards of security
                and confidentiality. Records are maintained in accordance with jurisdictional requirements and
                institutional best practice.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We do not share, sell, or distribute any client information or data.
              </p>
            </div>

            <div className="h-px w-24 bg-slate-200"></div>

            <div className="space-y-6">
              <h2 className="font-serif text-xl text-[#1a2332]">Termination and Continuity</h2>
              <p className="text-slate-600 leading-relaxed">
                Engagements may be concluded by mutual agreement. In all cases, we ensure orderly transition,
                preservation of institutional memory, and ongoing confidentiality.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Multi-generational engagements are structured for continuity across transitions in leadership,
                governance, or family structure.
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
