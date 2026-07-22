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

export function LongViewSection() {
  return (
    <section className="py-28 px-8 bg-white">
      <div className="max-w-[85.5rem] mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-[#1a2332] mb-6">How We Begin</h2>
          <p className="text-slate-600">A four-stage path built for permanence, not transaction.</p>
        </Reveal>

        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-2 sm:gap-x-4 md:gap-x-6 gap-y-12">
          <div className="flex flex-col gap-8 sm:gap-12 pr-2 sm:pr-6 md:pr-10">
            {leftPhases.map((phase, index) => (
              <Reveal key={phase.title} delay={index * 120} className="text-center">
                <span className="block font-serif text-2xl text-slate-400 mb-1">{phase.numeral}</span>
                <h3 className="font-serif text-2xl text-[#1a2332] mb-3">{phase.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed">{phase.description}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100} className="w-[16rem] sm:w-[22rem] md:w-[28rem] lg:w-[34rem]">
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

          <div className="flex flex-col gap-8 sm:gap-12 pl-2 sm:pl-6 md:pl-10">
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
