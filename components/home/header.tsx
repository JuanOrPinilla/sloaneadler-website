"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"


interface HeaderProps {
  scrollY: number
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/approach", label: "Approach" },
  { href: "/investor", label: "Investor" },
  { href: "/news", label: "News" },
  { href: "/correspondence", label: "Contact" },
  { href: "/login", label: "Principals" },
]

export function Header({ scrollY }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [postureBarHeight, setPostureBarHeight] = useState(28)
  const postureBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const measureBar = () => {
      if (postureBarRef.current) {
        setPostureBarHeight(postureBarRef.current.offsetHeight)
      }
    }
    measureBar()
    window.addEventListener("resize", measureBar)
    return () => window.removeEventListener("resize", measureBar)
  }, [])

  return (
    <>
      {/* Posture Bar */}
      <div 
        ref={postureBarRef}
        className="bg-[#1a2332] text-[10px] tracking-widest text-slate-400 uppercase font-sans py-5 sm:py-2 px-4 text-center sm:whitespace-nowrap"
      >
        {/* Time display will be injected here by parent */}
      </div>

      <header 
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 transition-all duration-300" 
        style={{ top: scrollY > 50 ? 0 : postureBarHeight }}
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-tight text-[#1a2332]">
            SLOANE <span className="text-slate-500">/</span> Adler
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-12 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors"
              >
                {link.label}
              </Link>
            ))}

          </nav>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-8 py-6">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-wide text-slate-600 hover:text-[#1a2332] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
