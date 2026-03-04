"use client"

import Image from "next/image"

export function FracturingSection() {
  return (
    <section className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="font-serif text-sm uppercase tracking-widest text-slate-500">The Fracturing</h2>
            <p className="text-2xl font-serif leading-relaxed text-[#1a2332] text-balance">
              Sloane / Adler emerged during a period of intense trade and regulatory fracturing.
            </p>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>
                We were initially engaged to navigate this volatility for corporate stakeholders. The practice expanded when we recognized that private capital - family offices and investment principals - faced the same systemic opacity.
              </p>
              <p>We bridge the gap between regulatory reality and strategic intent.</p>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-end">
            <Image
              src="/images/d7hftxdivxxvm.webp"
              alt="Two figures in counsel - blue textured art print"
              width={600}
              height={450}
              className="w-full max-w-lg h-auto mb-3"
            />
            <div className="w-full max-w-lg text-[10px] uppercase tracking-wider text-slate-400 font-sans leading-relaxed border-t border-slate-100 pt-2">
              Luc Tuymans, The Conversation, 1995
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
