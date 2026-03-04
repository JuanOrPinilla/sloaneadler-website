"use client"

const phases = [
  { title: "Introduction", description: "Through established counsel" },
  { title: "Alignment", description: "Mutual understanding of scope" },
  { title: "Counsel", description: "Ongoing advisory partnership" },
  { title: "Endurance", description: "Multi-generational continuity" },
]

export function LongViewSection() {
  return (
    <section className="py-24 px-8 bg-[#1a2332]">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-sm uppercase tracking-widest text-slate-400 mb-16 text-center">
          The Long View
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {phases.map((phase) => (
            <div key={phase.title} className="text-center space-y-2">
              <h3 className="font-serif text-lg text-white">{phase.title}</h3>
              <p className="text-sm text-slate-400">{phase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
