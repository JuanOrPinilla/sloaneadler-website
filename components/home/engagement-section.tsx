"use client"

import Image from "next/image"
import { Reveal } from "@/components/reveal"

export function EngagementSection() {
  return (
    <section className="min-h-screen flex items-center py-16 sm:py-24 px-6 sm:px-8 bg-white">
      <div className="max-w-[85.5rem] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center lg:items-start gap-y-12">
          <Reveal className="space-y-8 text-center lg:text-left lg:pr-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-[#1a2332]">
              Long-Horizon Relationships
            </h2>
            <p className="text-slate-600 leading-relaxed text-justify sm:text-left">
              We work with a limited number of families, enterprises, and institutions. Engagements are confidential, long-horizon, and entered by mutual election.
            </p>
          </Reveal>

          <Reveal delay={150} className="w-full max-w-[20rem] sm:max-w-[22rem] md:max-w-[28rem] lg:w-[34rem] lg:max-w-none mx-auto lg:mx-0">
            <div className="relative aspect-[1598/1224] overflow-hidden">
              <Image
                src="/images/d7hftxdivxxvm.webp"
                alt="Long-Horizon Relationships"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-sans border-t border-slate-200/50 pt-2 mt-3 text-left">
              The Conversation (1995) © Luc Tuymans.
            </div>
          </Reveal>

          <Reveal delay={280} className="text-center lg:text-right lg:pl-16 lg:self-end">
            <blockquote>
              <p className="font-serif text-xl text-[#1a2332] leading-snug" style={{ transform: "translateY(-28px)" }}>
                Relationships are structured for continuity, not transaction. Every mandate is singular.
              </p>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
