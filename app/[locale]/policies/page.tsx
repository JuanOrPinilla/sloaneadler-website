"use client"

import { Footer } from "@/components/footer"

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-white text-[#1a2332]">
      {/* Main Content - Removed contractual language, kept institutional guidelines */}
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
            </div>

            <div className="h-px w-24 bg-slate-200"></div>

            <div className="space-y-6">
              <h2 className="font-serif text-xl text-[#1a2332]">Referral Protocol</h2>
              <p className="text-slate-600 leading-relaxed">
                SLOANE / Adler welcomes inquiries through referral and institutional introduction. We do not market,
                compete for mandates, or engage in promotional activity.
              </p>
            </div>

            <div className="h-px w-24 bg-slate-200"></div>

            <div className="space-y-6">
              <h2 className="font-serif text-xl text-[#1a2332]">Independence</h2>
              <p className="text-slate-600 leading-relaxed">
                We maintain strict independence in all advisory relationships. Conflicts of interest are evaluated with
                rigor, and we decline engagements where counsel cannot be provided with complete objectivity.
              </p>
            </div>

            <div className="h-px w-24 bg-slate-200"></div>

            <div className="space-y-6">
              <h2 className="font-serif text-xl text-[#1a2332]">Data and Records</h2>
              <p className="text-slate-600 leading-relaxed">
                All information, correspondence, and documentation are retained with the highest standards of security
                and confidentiality. We do not share, sell, or distribute any client information.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
