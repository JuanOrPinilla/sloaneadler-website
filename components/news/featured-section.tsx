"use client"

import { useState } from "react"

const featuredPost = {
  date: "August 15, 2026",
  title: "The Unassigned Problem",
  excerpt:
    "Some of the most consequential matters in a family office begin as questions that appear too unusual, too narrow, or too temporary to require a dedicated owner.",
  body: [
    "Every family office accumulates a category of matters that resist categorization: the introduction to evaluate, the property to consider, the reputational question with no clear owner. These do not fit neatly into an existing mandate, and so they are often deferred, delegated informally, or left unaddressed until the cost of inaction becomes visible.",
    "We built our practice around precisely this gap. The unassigned problem is rarely the largest matter on a principal's desk, but it is often the one that reveals the most about the strength of their advisory structure. Institutions that treat these questions with the same rigor as their core mandates are the ones that endure.",
  ],
}

export function NewsFeaturedSection() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-8 bg-[#F9FAFC]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Latest News</p>
        <time className="block text-xs uppercase tracking-widest text-slate-500 mb-8">{featuredPost.date}</time>

        <h2 className="font-serif text-4xl sm:text-5xl text-[#1a2332] leading-tight text-balance mb-6">
          {featuredPost.title}
        </h2>

        <p className="text-slate-600 leading-relaxed max-w-xl mx-auto mb-10">{featuredPost.excerpt}</p>

        {expanded ? (
          <div className="space-y-4 text-left max-w-xl mx-auto mb-10">
            {featuredPost.body.map((paragraph) => (
              <p key={paragraph} className="text-slate-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="inline-flex items-center justify-center bg-[#1a2332] text-white uppercase tracking-widest text-xs px-8 py-3 hover:opacity-90 transition-opacity"
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      </div>
    </section>
  )
}
