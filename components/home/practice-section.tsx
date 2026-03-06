"use client"

const practices = [
  {
    title: "Capital",
    description: "Portfolio construction, allocation oversight, and inter-generational capital planning.",
  },
  {
    title: "Reputation",
    description: "Narrative integrity, institutional positioning, and response architecture.",
  },
  {
    title: "Stewardship",
    description: "Governance design, trustee counsel, and continuity planning.",
  },
  {
    title: "State & Policy",
    description: "Sovereign advisory and regulatory navigation at the threshold of public and private power.",
  },
  {
    title: "Enterprise",
    description: "Strategic counsel for founders, boards, and leadership in transition.",
  },
]

export function PracticeSection() {
  return (
    <section className="py-28 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500 mb-16 text-center">
          Our Practice
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {practices.map((practice) => (
            <div key={practice.title} className="space-y-3">
              <div className="h-px w-12 bg-[#b8a07e]"></div>
              <h3 className="font-serif text-xl text-[#1a2332]">{practice.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {practice.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
