"use client"

import Image from "next/image"

export function EngagementSection() {
  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="font-serif text-5xl md:text-6xl leading-tight text-[#1a2332]">
              Long-Horizon Relationships
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We work with a limited number of families, enterprises, and institutions. Engagements are confidential, long-horizon, and entered by mutual election.
            </p>
            <blockquote className="border-l-2 border-slate-300 pl-4">
              <p className="font-serif text-lg text-slate-500 leading-relaxed">
                Relationships are structured for continuity, not transaction. Every mandate is singular.
              </p>
            </blockquote>
          </div>
          <div>
            <div className="relative aspect-square overflow-hidden mb-3">
              <Image
                src="/images/4226.webp"
                alt="Abstract colorful painting with heavy texture"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-sans border-t border-slate-200/50 pt-2">
              Gerhard Richter, Oil on Alu Dibond, 1999
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
