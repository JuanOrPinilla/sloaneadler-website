"use client"

const phases = [
  {
    numeral: "I",
    title: "Introduction",
    description: "Through established counsel and trusted introduction. Mandates are never solicited.",
  },
  {
    numeral: "II",
    title: "Alignment",
    description: "Mutual understanding of scope, discretion requirements, and structural fit.",
  },
  {
    numeral: "III",
    title: "Counsel",
    description: "Ongoing advisory partnership, calibrated to the pace and scale of your exposure.",
  },
  {
    numeral: "IV",
    title: "Endurance",
    description: "Multi-generational continuity built for what outlasts the moment.",
  },
]

export function LongViewSection() {
  return (
    <section className="py-28 px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl text-[#1a2332] mb-6">How We Begin</h2>
          <p className="text-slate-600">
            A four-stage path built for permanence,
            <br />
            not transaction.
          </p>
        </div>

        <div className="relative flex items-start" style={{ paddingTop: "4rem" }}>
          <div className="absolute h-px bg-slate-300" style={{ top: "7rem", left: "12.5%", right: "12.5%" }} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 w-full">
            {phases.map((phase) => (
              <div key={phase.title} className="flex flex-col items-center text-center px-4">
                <div className="relative z-10 border border-slate-300 flex items-center justify-center bg-white mb-8" style={{ borderRadius: "50%", width: "6rem", height: "6rem", flexShrink: 0 }}>
                  <span className="font-serif text-xl text-slate-400">{phase.numeral}</span>
                </div>
                <h3 className="font-serif text-lg text-[#1a2332] mb-3">{phase.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
