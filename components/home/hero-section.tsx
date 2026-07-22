"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Link } from "@/i18n/routing"

const cityImages = [
  { src: "/images/1.png", city: "Washington, D.C." },
  { src: "/images/2.png", city: "New York" },
  { src: "/images/3.png", city: "Abu Dhabi" },
  { src: "/images/4.png", city: "London" },
  { src: "/images/5.png", city: "Singapore" },
]

const SLIDE_DURATION = 5000

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cityImages.length)
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center px-8 overflow-hidden bg-[#1a2332]">
      {/* City carousel background */}
      <div className="absolute inset-0 z-0">
        {cityImages.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.city}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-contain transition-opacity duration-1000 ease-in-out"
            style={{ opacity: index === activeIndex ? 1 : 0 }}
          />
        ))}
      </div>
      {/* Darkening overlay for text contrast */}
      <div className="absolute inset-0 z-0 bg-[#1a2332]/30" />

      <div className="relative z-10 w-full max-w-[85.5rem] mx-auto text-center">
        <h1 className="font-serif leading-[1.02] text-white mx-auto" style={{ fontSize: "clamp(2rem, 7.5vw, 7rem)", lineHeight: "0.95" }}>
          When Leadership
          <br />
          Escalates. We Are
          <br />
          There
        </h1>
      </div>

      <div
        className="z-10 flex flex-nowrap items-center justify-center gap-3 sm:gap-6 md:gap-14"
        style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: "4rem" }}
      >
        <Link
          href="/correspondence"
          className="inline-block whitespace-nowrap bg-transparent text-white uppercase hover:opacity-70 transition-opacity shrink-0"
          style={{ fontFamily: "'Castoro Titling', serif", fontSize: "1.35rem", letterSpacing: "0.15em", padding: "1rem 1.5rem" }}
        >
          Begin Correspondence
        </Link>
      </div>
    </section>
  )
}
