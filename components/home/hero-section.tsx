"use client"

interface HeroSectionProps {
  scrollY: number
}

export function HeroSection({ scrollY }: HeroSectionProps) {
  return (
    <section className="pt-48 pb-20 px-8">
      <div className="max-w-4xl mx-auto">
        <div
          className="text-center"
          style={{
            opacity: Math.max(0, 1 - scrollY / 500),
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <h1 className="font-serif text-5xl md:text-6xl leading-tight text-balance mb-6 text-[#1a2332]">
            Where Capital Stops Solving Problems.
          </h1>
          <p className="text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Complexity expands faster than internal leadership. Exposure increases without warning. Decisions carry weight beyond the balance sheet. We exist at those moments.
          </p>
        </div>
      </div>
    </section>
  )
}
