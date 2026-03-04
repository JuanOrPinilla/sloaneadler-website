"use client"

const domains = [
  "Cross-border capital alignment",
  "Reputation under scrutiny",
  "Leadership transition",
  "State and jurisdictional exposure",
  "Enterprise continuity",
  "Inter-generational stewardship",
]

export function DomainsSection() {
  return (
    <section className="py-28 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500 mb-4">
            Domains of Counsel
          </h2>
          <p className="text-lg text-slate-600">Where we provide guidance and structure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {domains.map((domain) => (
            <div key={domain} className="flex items-start gap-4">
              <div className="h-px w-8 bg-[#b8a07e] mt-3 shrink-0"></div>
              <div>
                <h3 className="font-serif text-lg text-[#1a2332]">{domain}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
