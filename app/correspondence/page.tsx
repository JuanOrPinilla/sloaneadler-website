import Link from "next/link"

export default function CorrespondencePage() {
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
            <Link href="/correspondence" className="text-sm tracking-wide text-[#1a2332] transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-24 px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-8 text-balance">Correspondence</h1>

          <div className="space-y-8 mb-16">
            <p className="text-xl text-slate-600 leading-relaxed">
              SLOANE / Adler operates by referral. Direct correspondence is reserved for inquiries introduced through
              established counsel or institutional relationships.
            </p>
          </div>

          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">For Referred Inquiries</h2>
              <p className="text-slate-600 leading-relaxed">
                If you have been referred by existing counsel or institutional introduction, please include the
                referring party's name and context in your correspondence.
              </p>
              <p className="text-slate-600 leading-relaxed">Correspondence should be directed to:</p>
              <div className="bg-slate-50 p-6 border border-slate-200">
                <p className="text-[#1a2332] font-medium">correspondence@sloane-adler.com</p>
              </div>
            </div>

            <div className="h-px w-24 bg-slate-200"></div>

            <div className="space-y-4">
              <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">Response Protocol</h2>
              <p className="text-slate-600 leading-relaxed">
                All correspondence is reviewed and evaluated with discretion. Response times vary based on context,
                complexity, and referral source.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Unsolicited inquiries without institutional introduction are not accepted.
              </p>
            </div>

            <div className="h-px w-24 bg-slate-200"></div>

            <div className="space-y-4">
              <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">Confidentiality</h2>
              <p className="text-slate-600 leading-relaxed">
                All correspondence is treated as confidential. We do not retain contact information without express
                engagement or mutual agreement.
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
