"use client"

import { Reveal } from "@/components/reveal"

const domains = [
  {
    number: "01",
    title: "Reputation",
    category: "Advisory",
    description: "Narrative integrity, institutional positioning, and response architecture.",
  },
  {
    number: "02",
    title: "Stewardship",
    category: "Governance",
    description: "Governance design, trustee counsel, and continuity planning across generations.",
  },
  {
    number: "03",
    title: "State & Policy",
    category: "Sovereign",
    description: "Sovereign advisory and regulatory navigation at the threshold of public and private power.",
  },
  {
    number: "04",
    title: "Enterprise",
    category: "Strategic",
    description: "Strategic counsel for founders, boards, and leadership in transition.",
  },
]

export function ApproachDomainsSection() {
  return (
    <section className="py-20 sm:py-32 px-6 sm:px-8 bg-[#F9FAFC] border-t border-slate-200">
      <div className="max-w-[85.5rem] mx-auto">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1a2332] text-balance">
            Where We Provide Guidance
          </h2>
          <span className="font-serif text-base sm:text-lg uppercase tracking-widest text-slate-400 shrink-0">
            Domains
          </span>
        </Reveal>

        <div>
          {domains.map((domain, index) => (
            <Reveal key={domain.title} delay={index * 80}>
              <div className="grid grid-cols-1 sm:grid-cols-[3rem_11rem_1fr_9rem] gap-x-6 gap-y-2 items-start sm:items-center py-6 sm:py-8">
                <span className="hidden sm:block font-serif text-lg sm:text-xl text-[#1a2332]">{domain.number}</span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1a2332]">
                  <span className="sm:hidden font-serif text-lg text-[#1a2332] mr-2">{domain.number}</span>
                  {domain.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed sm:translate-x-8">{domain.description}</p>
                <span className="font-serif text-base sm:text-lg uppercase tracking-widest text-slate-400 sm:text-right">
                  {domain.category}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
