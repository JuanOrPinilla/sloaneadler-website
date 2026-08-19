"use client"

import Image from "next/image"

export function NewsHeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a2332]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/approach/news-main.png"
          alt="A principal reviewing the financial press"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-[#1a2332]/50" />

      <div className="relative z-10 w-full max-w-[85.5rem] mx-auto px-6 sm:px-8 text-center">
        <h1
          className="font-serif text-white text-balance"
          style={{ fontSize: "clamp(3rem, 9vw, 6.5rem)", lineHeight: 1.05 }}
        >
          The News
        </h1>
        <p className="mt-6 text-base sm:text-lg text-white/80">
          Selected updates and perspectives from SLOANE / Adler.
        </p>
      </div>
    </section>
  )
}
