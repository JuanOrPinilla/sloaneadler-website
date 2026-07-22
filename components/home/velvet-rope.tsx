"use client"

import Image from "next/image"
import { Link } from "@/i18n/routing"
import { trackEvent } from "@/lib/analytics"
import { Reveal } from "@/components/reveal"

export function VelvetRope() {
  return (
    <section className="relative px-6 sm:px-8 flex items-center justify-center overflow-hidden" style={{ minHeight: "100vh" }}>
      <Image
        src="/images/byintroductiononly.png"
        alt="By Introduction Only"
        fill
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-white/40" />

      <Reveal className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight text-[#1a2332]">
          By Introduction
          <br />
          Only
        </h2>
        <p className="text-slate-600 leading-relaxed">
          Inquiries are welcomed through referral or introduction.
          <br />
          Please provide context for your correspondence.
        </p>
        <div>
          <Link
            href="/correspondence"
            onClick={() => trackEvent("cta_click", { link_text: "open correspondence", destination: "/access", location: "velvet_rope" })}
            className="inline-block bg-[#1a2332] text-white text-xs tracking-widest uppercase hover:bg-[#2a3342] transition-colors px-10 py-4 sm:px-20"
            style={{ fontFamily: "'Castoro Titling', serif" }}
          >
            Open Correspondence
          </Link>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-sans">
          All communications are treated as strictly confidential.
        </p>
      </Reveal>
    </section>
  )
}
