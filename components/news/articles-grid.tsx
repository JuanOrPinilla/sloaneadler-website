"use client"

import { ArrowRight } from "lucide-react"
import { Link } from "@/i18n/routing"
import { Reveal } from "@/components/reveal"
import { newsArticles } from "@/lib/news-articles"

const posts = newsArticles.slice(1)

export function NewsArticlesGrid() {
  return (
    <section className="py-20 sm:py-28 px-6 sm:px-8 bg-white">
      <div className="max-w-[85.5rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-0 gap-y-14 md:[&>*:not(:nth-child(3n+1))]:border-l md:[&>*:not(:nth-child(3n+1))]:border-slate-200">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 80} className="px-0 md:px-10 first:pl-0">
              <article className="text-center">
                <time className="text-xs uppercase tracking-widest text-slate-500">{post.date}</time>
                <h2 className="font-serif text-2xl text-[#1a2332] mt-3 mb-4 text-balance">{post.title}</h2>
                <p className="text-slate-600 leading-relaxed mb-4">{post.excerpt}</p>

                <Link
                  href={`/news/${post.slug}`}
                  className="text-sm text-[#1a2332] inline-flex items-center gap-2 mt-2 hover:text-[#b8a07e] transition-colors"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
