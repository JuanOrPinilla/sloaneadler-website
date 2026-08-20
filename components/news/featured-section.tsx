"use client"

import { Link } from "@/i18n/routing"
import { newsArticles } from "@/lib/news-articles"

const featuredPost = newsArticles[0]

export function NewsFeaturedSection() {
  return (
    <section className="py-20 sm:py-28 px-6 sm:px-8 bg-[#F9FAFC]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Latest News</p>
        <time className="block text-xs uppercase tracking-widest text-slate-500 mb-8">{featuredPost.date}</time>

        <h2 className="font-serif text-4xl sm:text-5xl text-[#1a2332] leading-tight text-balance mb-6">
          {featuredPost.title}
        </h2>

        <p className="text-slate-600 leading-relaxed max-w-xl mx-auto mb-10">{featuredPost.excerpt}</p>

        <Link
          href={`/news/${featuredPost.slug}`}
          className="inline-flex items-center justify-center bg-[#1a2332] text-white uppercase tracking-widest text-xs px-8 py-3 hover:opacity-90 transition-opacity"
        >
          Read More
        </Link>
      </div>
    </section>
  )
}
