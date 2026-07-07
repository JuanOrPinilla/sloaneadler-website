"use client"

import { Link } from "@/i18n/routing"

export function HeroSection() {
  return (
    <section className="pt-32 md:pt-40 lg:pt-48 pb-24 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif leading-[1.02] text-[#1a2332] mb-8 max-w-5xl" style={{ fontSize: "clamp(3rem, 7vw, 8.5rem)", lineHeight: "0.95" }}>
          When Leadership
          <br />
          Escalates. We Are
          <br />
          There
        </h1>
        <p className="text-base leading-relaxed text-slate-600 max-w-2xl mb-12">
          Complexity expands faster than internal leadership. Exposure increases without warning. Decisions carry weight beyond the balance sheet. We exist at those moments.
        </p>
        <div className="flex items-center justify-start gap-12 md:gap-14">
          <Link
            href="/correspondence"
            className="inline-block px-8 py-4 bg-[#1a2332] text-white text-xs tracking-widest uppercase hover:bg-[#2a3342] transition-colors"
            style={{ fontFamily: "'Castoro Titling', serif" }}
          >
            Begin Correspondence
          </Link>
          <Link
            href="#practice"
            className="text-xs tracking-widest uppercase text-[#1a2332] inline-flex items-center gap-2 hover:opacity-70 transition-opacity shrink-0"
            style={{ fontFamily: "'Castoro Titling', serif" }}
          >
            Our Practice <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
