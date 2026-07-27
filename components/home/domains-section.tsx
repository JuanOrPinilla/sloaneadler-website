"use client"

import { Reveal } from "@/components/reveal"

const domains = [
  "Global market access",
  "Reputation under scrutiny",
  "Leadership transition",
  "State and jurisdictional exposure",
  "Enterprise continuity",
  "Inter-generational stewardship",
]

export function DomainsSection() {
  return (
    <section className="py-16 sm:py-28 px-6 sm:px-8 bg-white">
      <div className="max-w-[85.5rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[11fr_14fr] gap-10 lg:gap-16">
          <Reveal className="space-y-6 lg:translate-y-20">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#1a2332] text-balance">
              Domains of Guidance and Structure
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our counsel extends across the full spectrum of challenges facing those who carry consequence from capital to sovereignty, reputation to continuity.
            </p>
          </Reveal>
          <div className="mt-6 lg:mt-0 lg:pl-20">
            {domains.map((domain, index) => (
              <Reveal key={domain} delay={index * 80} y={16}>
                <div className={`border-b border-slate-200 py-5 transition-transform duration-300 ease-out will-change-transform hover:-translate-y-1 hover:cursor-default ${index === 0 ? "border-t" : ""}`}>
                  <p className="font-serif text-lg text-[#1a2332]">{domain}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
