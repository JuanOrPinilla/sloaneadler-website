"use client"

import { Reveal } from "@/components/reveal"

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
    description: "Governance design, trustee counsel, and continuity planning across generations.",
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
    <section id="practice" className="px-8 bg-[#F9FAFC] flex items-center" style={{ minHeight: "100vh", paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className="max-w-[85.5rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-20 lg:mb-40">
          <Reveal>
            <h2 className="font-serif text-5xl md:text-6xl leading-tight text-[#1a2332] whitespace-nowrap">
              Five Domains of Counsel
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lg text-slate-700 leading-relaxed">
              We work at the intersection of capital, reputation, and state
              power providing structurally sound counsel for those operating
              at the highest levels of consequence.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
          {practices.map((practice, index) => (
            <Reveal key={practice.title} delay={index * 90}>
              <h3 className="uppercase tracking-widest font-medium text-[#1a2332] mb-3" style={{ fontFamily: "'Castoro Titling', serif", fontSize: "1.1rem" }}>
                {practice.title}
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">{practice.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
