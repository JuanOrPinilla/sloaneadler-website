"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

const posts = [
  {
    id: 1,
    date: "December 30, 2025",
    title: "On the Nature of Patient Capital",
    summary:
      "In an environment shaped by short-term pressures, the discipline of long-horizon thinking remains essential.",
    body: `The current landscape rewards speed and scale. Yet for families and institutions with multi-generational mandates, the calculus differs fundamentally. Patient capital is not passive capital; it is capital deployed with the clarity that comes from understanding time differently.

We continue to advise principals who measure outcomes across decades, not quarters. This orientation shapes everything: the relationships we enter, the counsel we provide, and the structures we recommend.`,
  },
  {
    id: 2,
    date: "December 30, 2025",
    title: "Governance in Transition",
    summary:
      "Leadership succession remains one of the most consequential challenges facing enterprises and families alike.",
    body: `The transfer of leadership; whether in a family enterprise, a sovereign context, or a closely-held fund, carries implications that extend far beyond the immediate transition. Done well, it preserves institutional knowledge while creating space for necessary evolution.

Our work in this area emphasizes preparation over reaction. The most successful transitions we have counseled share a common thread: they began years before any formal announcement.`,
  },
  {
    id: 3,
    date: "December 30, 2025",
    title: "Discretion as Discipline",
    summary: "In an age of transparency, the value of measured communication has only increased.",
    body: `Discretion is often misunderstood as secrecy. In practice, it is the discipline of speaking precisely, sharing deliberately, and understanding that not all matters benefit from broad visibility.

For the families and institutions we serve, this discipline is foundational. Reputation is built through consistent action over time, and preserved through the wisdom to know when silence serves better than statement.`,
  },
]

export function NewsArticlesGrid() {
  const [expandedPost, setExpandedPost] = useState<number | null>(null)

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-8 bg-white">
      <div className="max-w-[85.5rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-0 gap-y-14 md:[&>*:not(:nth-child(3n+1))]:border-l md:[&>*:not(:nth-child(3n+1))]:border-slate-200">
          {posts.map((post, index) => (
            <Reveal key={post.id} delay={index * 80} className="px-0 md:px-10 first:pl-0">
              <article className="text-center">
                <time className="text-xs uppercase tracking-widest text-slate-500">{post.date}</time>
                <h2 className="font-serif text-2xl text-[#1a2332] mt-3 mb-4 text-balance">{post.title}</h2>
                <p className="text-slate-600 leading-relaxed mb-4">{post.summary}</p>

                {expandedPost === post.id && (
                  <div className="space-y-4 mt-6 text-left">
                    {post.body.split("\n\n").map((paragraph, idx) => (
                      <p key={idx} className="text-slate-600 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                  className="text-sm text-[#1a2332] inline-flex items-center gap-2 mt-2 hover:text-[#b8a07e] transition-colors"
                >
                  {expandedPost === post.id ? "Show Less" : "Read More"} <ArrowRight className="w-4 h-4" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
