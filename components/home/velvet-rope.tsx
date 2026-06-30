"use client"

import { Link } from "@/i18n/routing"
import { trackEvent } from "@/lib/analytics"

export function VelvetRope() {
  return (
    <section className="py-28 px-8 bg-[#f8f7f5]">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="font-serif text-5xl md:text-6xl leading-tight text-[#1a2332]">
          By Introduction Only
        </h2>
        <p className="text-slate-600 leading-relaxed">
          Inquiries are welcomed through referral or introduction. Please provide context for your correspondence.
        </p>
        <div>
          <Link
            href="/access"
            onClick={() => trackEvent("cta_click", { link_text: "open correspondence", destination: "/access", location: "velvet_rope" })}
            className="inline-block px-10 py-4 bg-[#1a2332] text-white text-xs tracking-widest uppercase font-sans hover:bg-[#2a3342] transition-colors"
          >
            Open Correspondence
          </Link>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-sans">
          All communications are treated as strictly confidential.
        </p>
      </div>
    </section>
  )
}
