"use client"

import Image from "next/image"
import { Reveal } from "@/components/reveal"

const leftPhases = [
  {
    numeral: "I",
    title: "Introduction",
    description: "Through established counsel and trusted introduction. Mandates are never solicited.",
  },
  {
    numeral: "III",
    title: "Counsel",
    description: "Ongoing advisory partnership, calibrated to the pace and scale of your exposure.",
  },
]

const rightPhases = [
  {
    numeral: "II",
    title: "Alignment",
    description: "Mutual understanding of scope, discretion requirements, and structural fit.",
  },
  {
    numeral: "IV",
    title: "Endurance",
    description: "Multi-generational continuity built for what outlasts the moment.",
  },
]

const allPhasesOrdered = [leftPhases[0], rightPhases[0], leftPhases[1], rightPhases[1]]

export function LongViewSection() {
  return (
    <section className="py-16 sm:py-28 px-6 sm:px-8 bg-white">
      <div className="max-w-[85.5rem] mx-auto">
        <Reveal className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1a2332] mb-6">How We Begin</h2>
          <p className="text-slate-600">A four-stage path built for permanence, not transaction.</p>
        </Reveal>

        {/* Mobile / tablet: single column, correct numeral order */}
        <div className="flex flex-col items-center gap-10 lg:hidden">
          <Reveal className="w-full max-w-[18rem] sm:max-w-[22rem]">
            <div className="relative aspect-square overflow-hidden mb-3">
              <Image
                src="/images/4226.webp"
                alt="Abstract colorful painting with heavy texture"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-sans border-t border-slate-200/50 pt-2 text-center">
              Gerhard Richter, Oil on Alu Dibond, 1999
            </div>
          </Reveal>
          {allPhasesOrdered.map((phase, index) => (
            <Reveal key={phase.title} delay={index * 100} className="text-center">
              <span className="block font-serif text-2xl text-slate-400 mb-1">{phase.numeral}</span>
              <h3 className="font-serif text-2xl text-[#1a2332] mb-3">{phase.title}</h3>
              <p className="text-lg text-slate-600 leading-relaxed">{phase.description}</p>
            </Reveal>
          ))}
        </div>

        {/* Desktop: zigzag three-column layout */}
        <div className="hidden lg:grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-6 gap-y-12">
          <div className="flex flex-col gap-12 pr-10">
            {leftPhases.map((phase, index) => (
              <Reveal key={phase.title} delay={index * 120} className="text-center">
                <span className="block font-serif text-2xl text-slate-400 mb-1">{phase.numeral}</span>
                <h3 className="font-serif text-2xl text-[#1a2332] mb-3">{phase.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed">{phase.description}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100} className="w-[34rem]">
            <div className="relative aspect-square overflow-hidden mb-3">
              <Image
                src="/images/4226.webp"
                alt="Abstract colorful painting with heavy texture"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-sans border-t border-slate-200/50 pt-2 text-center">
              Gerhard Richter, Oil on Alu Dibond, 1999
            </div>
          </Reveal>

          <div className="flex flex-col gap-12 pl-10">
            {rightPhases.map((phase, index) => (
              <Reveal key={phase.title} delay={200 + index * 120} className="text-center">
                <span className="block font-serif text-2xl text-slate-400 mb-1">{phase.numeral}</span>
                <h3 className="font-serif text-2xl text-[#1a2332] mb-3">{phase.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed">{phase.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
