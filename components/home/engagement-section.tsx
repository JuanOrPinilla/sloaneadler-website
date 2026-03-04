"use client"

import Image from "next/image"

export function EngagementSection() {
  return (
    <section className="py-20 px-8 bg-[#f8f7f5]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2 relative">
            <div className="aspect-square overflow-hidden mb-3 relative">
              <Image
                src="/images/4226.webp"
                alt="Abstract colorful painting with heavy texture"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-sans leading-relaxed border-t border-slate-200/50 pt-2">
              Gerhard Richter, Oil on Alu Dibond, 1999
            </div>
          </div>
          <div className="lg:col-span-3 space-y-6">
            <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">Engagement</h2>
            <p className="text-2xl font-serif leading-relaxed text-[#1a2332]">
              We work with a limited number of families, enterprises, and institutions.
            </p>
            <div className="space-y-4 text-slate-600">
              <p>Engagements are confidential, long-horizon, and entered by mutual election.</p>
              <p>Relationships are structured for continuity, not transaction.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
