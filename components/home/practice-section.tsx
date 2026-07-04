"use client"

const practices = [
  {
    number: "01",
    title: "Capital",
    description: "Portfolio construction, allocation oversight, and inter-generational capital planning.",
  },
  {
    number: "02",
    title: "Reputation",
    description: "Narrative integrity, institutional positioning, and response architecture.",
  },
  {
    number: "03",
    title: "Stewardship",
    description: "Governance design, trustee counsel, and continuity planning across generations.",
  },
  {
    number: "04",
    title: "State & Policy",
    description: "Sovereign advisory and regulatory navigation at the threshold of public and private power.",
  },
  {
    number: "05",
    title: "Enterprise",
    description: "Strategic counsel for founders, boards, and leadership in transition.",
  },
]

export function PracticeSection() {
  return (
    <section id="practice" className="px-8 bg-[#F9FAFC] flex items-center" style={{ minHeight: "100vh", paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-end mb-44">
          <h2 className="font-serif text-5xl md:text-6xl leading-tight text-[#1a2332] lg:col-span-2">
            Five Domains
            <br />
            of Counsel
          </h2>
          <div className="hidden lg:block" />
          <p className="text-base text-slate-700 leading-relaxed lg:col-span-2 lg:text-right" style={{ marginTop: "auto", paddingTop: "3rem", paddingBottom: "2rem" }}>
            We work at the intersection of capital, reputation, and state
            power providing structurally sound counsel for those operating
            at the highest levels of consequence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" style={{ marginTop: "6rem" }}>
          {practices.map((practice, index) => (
            <div
              key={practice.title}
              className="px-0 lg:px-8 lg:first:pl-0 lg:last:pr-0 py-8 lg:py-4"
              style={index > 0 ? { borderLeft: "1px solid #1a2332", paddingLeft: "2rem" } : undefined}
            >
              <p className="text-xs text-slate-400 font-sans mb-3">{practice.number}</p>
              <h3 className="uppercase tracking-widest font-medium text-[#1a2332] mb-3" style={{ fontFamily: "'Castoro Titling', serif", fontSize: "0.85rem" }}>
                {practice.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{practice.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
