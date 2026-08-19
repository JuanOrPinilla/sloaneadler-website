"use client"

import { Reveal } from "@/components/reveal"

const sections = [
  {
    label: "Overview",
    title: "A Limited Set of Aligned Investors",
    paragraphs: [
      "SLOANE / Adler does not seek capital broadly. Investor relationships are entered through direct introduction and mutual assessment of alignment.",
      "Our structure reflects the same principles we bring to client counsel: clarity, integrity, and long-term thinking. Our principals invest alongside our partners - we share outcomes, not just objectives.",
    ],
  },
  {
    label: "Philosophy",
    title: "Long-Horizon Orientation",
    paragraphs: [
      "We measure success across years and decades, not quarters. Patience is structural, not incidental to how we operate.",
      "Decisions are shaped by context and experience. Complexity demands discernment - not rigid frameworks, not uniform models applied to singular situations.",
    ],
  },
  {
    label: "Stewardship",
    title: "Aligned Interests, Shared Outcomes",
    paragraphs: [
      "Capital is a responsibility, not merely an asset to be managed. We treat it with the same discipline we apply to counsel.",
      "There is no separation between advisor and stakeholder. What we ask of our investors, we require of ourselves.",
    ],
  },
]

export function InvestorOverviewSection() {
  return (
    <section className="py-20 sm:py-32 px-6 sm:px-8 bg-white">
      <div className="max-w-[85.5rem] mx-auto space-y-14 sm:space-y-20">
        {sections.map((item, index) => (
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
