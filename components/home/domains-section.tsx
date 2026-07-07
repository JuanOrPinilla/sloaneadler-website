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
    <section className="py-28 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2 space-y-6" style={{ transform: "translateY(5rem)" }}>
            <h2 className="font-serif text-5xl md:text-6xl leading-tight text-[#1a2332]">
              Domains of
              <br />
              Guidance and Structure
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our counsel extends across the full spectrum of challenges facing those who carry consequence from capital to sovereignty, reputation to continuity.
            </p>
          </div>
          <div className="lg:col-span-3">
            {domains.map((domain) => (
              <div key={domain} className="border-b border-slate-200 py-5 first:border-t">
                <p className="font-serif text-lg text-[#1a2332]">{domain}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
