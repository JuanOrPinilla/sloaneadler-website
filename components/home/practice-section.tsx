"use client"

import { Reveal } from "@/components/reveal"

const practices = [
  {
    title: "Reputation",
    description: "Narrative integrity, institutional positioning, and response architecture.",
  },
  {
    title: "State & Policy",
    description: "Sovereign advisory and regulatory navigation at the threshold of public and private power.",
  },
  {
    title: "Stewardship",
    description: "Governance design, trustee counsel, and continuity planning across generations.",
  },
  {
    title: "Enterprise",
    description: "Strategic counsel for founders, boards, and leadership in transition.",
  },
]

export function PracticeSection() {
  return (
    <section id="practice" className="px-6 sm:px-8 bg-[#F9FAFC] flex items-center" style={{ minHeight: "100vh", paddingTop: "5rem", paddingBottom: "5rem" }}>
      <div className="max-w-[85.5rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <Reveal className="space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#1a2332]">
              Five Domains of Counsel
            </h2>
            <p className="text-sm sm:text-lg text-slate-700 leading-relaxed text-justify sm:text-left">
              We work at the intersection of capital, reputation, and state
              power providing structurally sound counsel for those operating
              at the highest levels of consequence.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-x-10 gap-y-14">
            {practices.map((practice, index) => (
              <Reveal key={practice.title} delay={index * 90}>
                <h3 className="font-serif text-lg sm:text-xl text-[#1a2332] mb-3">
                  {practice.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-[17rem]">{practice.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
