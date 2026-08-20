"use client"

import Image from "next/image"
import { Reveal } from "@/components/reveal"

const formats = [
  {
    number: "01",
    category: "Retainer",
    title: "Retainer Advisory",
    description:
      "Ongoing counsel across capital, governance, and institutional positioning. Structured for long-horizon continuity the relationship deepens with the mandate.",
  },
  {
    number: "02",
    category: "Assessment",
    title: "Strategic Review",
    description:
      "Focused assessment of specific matters transactions, transitions, or structural decisions with recommendations calibrated for consequence, not speed.",
  },
  {
    number: "03",
    category: "Governance",
    title: "Board & Trustee Counsel",
    description:
      "Advisory to governance bodies on fiduciary responsibility, succession, and institutional integrity at the highest levels of stewardship.",
  },
  {
    number: "04",
    category: "Integration",
    title: "Family Office",
    description:
      "Coordination of advisors, alignment of objectives, and oversight of multi-generational planning across jurisdictions, currencies, and cultures.",
  },
]

export function AdvisoryStructureSection() {
  return (
    <section className="py-20 sm:py-32 px-6 sm:px-8 bg-white">
      <div className="max-w-[85.5rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 sm:mb-28">
          <Reveal className="max-w-md mx-auto lg:mx-0 w-full">
            <div className="relative aspect-[1764/1416] overflow-hidden">
              <Image
                src="/images/approach/paint-approach.png"
                alt="Empirical Construction, Istanbul, by Julie Mehretu"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-sans border-t border-slate-200/50 pt-2 mt-3">
              Empirical Construction, Istanbul (2019) © Julie Mehretu. Courtesy of The Museum of Modern Art (MoMA).
            </p>
          </Reveal>

          <Reveal delay={150} className="space-y-6 lg:-translate-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1a2332] leading-tight text-balance">
              How We Structure Advisory Relationships
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Each engagement is structured to match the nature and duration of the mandate. We do not apply uniform
              models to singular situations.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-14 pt-14 sm:pt-16">
          {formats.map((format, index) => (
            <Reveal key={format.title} delay={index * 100} className="space-y-3">
              <span
                className="block text-xs uppercase tracking-widest text-slate-400"
                style={{ fontFamily: "'Castoro Titling', serif" }}
              >
                {format.number} {format.category}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1a2332]">{format.title}</h3>
              <p className="text-slate-600 leading-relaxed">{format.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
