"use client"

import Image from "next/image"

export function ApproachHeroSection() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-[#1a2332]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/approach/approach-main.png"
          alt="A private residence entrance"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#1a2332]/80 via-[#1a2332]/20 to-[#1a2332]/40" />

      <div className="relative z-10 w-full px-6 sm:px-8 pb-16 sm:pb-24">
        <div className="max-w-[85.5rem] mx-auto">
          <h1
            className="font-serif text-white text-balance"
            style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)", lineHeight: 1.05 }}
          >
            Durability.
            <br />
            Discretion.
            <br />
            Continuity.
          </h1>
          <div className="mt-8 max-w-xl space-y-1 text-sm sm:text-base text-white/80 leading-relaxed">
            <p>A framework built not for the quarter, but for the generation.</p>
            <p>What follows is how we think, how we work, and where we provide counsel.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
