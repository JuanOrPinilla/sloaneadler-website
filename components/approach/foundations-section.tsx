"use client"

import { Reveal } from "@/components/reveal"

const foundations = [
  {
    label: "Foundations",
    title: "Built for the Long Horizon",
    paragraphs: [
      "We do not optimize for quarterly outcomes or transactional efficiency. Our work is calibrated for durability, discretion, and multi-generational continuity.",
      "Relationships are structured around trust, institutional memory, and the recognition that certain counsel cannot be replaced, replicated, or commoditized.",
    ],
  },
  {
    label: "Discipline",
    title: "Defined by What We Decline",
    paragraphs: [
      "We work with restraint. No marketing. No public discourse. No performance metrics or client lists.",
      "Our practice is defined by what we decline as much as what we accept.",
    ],
  },
  {
    label: "Counsel",
    title: "Relational, Contextual, Longitudinal",
    paragraphs: [
      "Advisory is not transactional. It is relational, contextual, and longitudinal. We work across transitions, generations, and jurisdictions where complexity cannot be reduced to frameworks or processes.",
    ],
  },
]

export function FoundationsSection() {
  return (
    <section className="py-20 sm:py-32 px-6 sm:px-8 bg-white">
      <div className="max-w-[85.5rem] mx-auto space-y-14 sm:space-y-20">
        {foundations.map((item, index) => (
          <Reveal key={item.title} delay={index * 100}>
            <div className="grid grid-cols-1 lg:grid-cols-[12rem_1fr] gap-4 lg:gap-16">
              <span className="block font-serif text-base sm:text-lg uppercase tracking-widest text-slate-400">
                {item.label}
              </span>
              <div className="space-y-4 max-w-5xl lg:translate-x-16">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1a2332] leading-snug text-balance">
                  {item.title}
                </h2>
                {item.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-lg text-slate-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
