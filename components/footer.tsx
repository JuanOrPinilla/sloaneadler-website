'use client';

import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/language-switcher";
import { trackEvent } from "@/lib/analytics";

export function Footer() {
  return (
    <footer className="pt-16 pb-8 px-8 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-16 border-b border-slate-200"
        >
          {/* Left: Logo + tagline */}
          <div>
            <div className="font-serif text-xl text-[#1a2332] mb-4">
              SLOANE <span className="text-slate-400">/</span> Adler
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              Inquiries are welcomed through referral or introduction. Please provide context for your correspondence.
            </p>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block" />

          {/* Navigation column */}
          <div>
            <p className="text-xs tracking-widest uppercase font-sans text-slate-400 mb-6">
              Navigation
            </p>
            <nav className="flex flex-col gap-4">
              <Link
                href="/approach"
                className="text-sm text-slate-600 hover:text-[#1a2332] transition-colors"
                onClick={() => trackEvent('nav_click', { link_text: 'Approach', destination: '/approach', location: 'footer' })}
              >
                Approach
              </Link>
              <Link
                href="/investor"
                className="text-sm text-slate-600 hover:text-[#1a2332] transition-colors"
                onClick={() => trackEvent('nav_click', { link_text: 'Investor', destination: '/investor', location: 'footer' })}
              >
                Investor
              </Link>
              <Link
                href="/login"
                className="text-sm text-slate-600 hover:text-[#1a2332] transition-colors"
                onClick={() => trackEvent('nav_click', { link_text: 'Principals', destination: '/login', location: 'footer' })}
              >
                Principals
              </Link>
              <Link
                href="/news"
                className="text-sm text-slate-600 hover:text-[#1a2332] transition-colors"
                onClick={() => trackEvent('nav_click', { link_text: 'News', destination: '/news', location: 'footer' })}
              >
                News
              </Link>
            </nav>
          </div>

          {/* Legal + Contact column */}
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-xs tracking-widest uppercase font-sans text-slate-400 mb-6">
                Legal
              </p>
              <Link
                href="/legal/terms"
                className="text-sm text-slate-600 hover:text-[#1a2332] transition-colors"
                onClick={() => trackEvent('nav_click', { link_text: 'Terms of use', destination: '/legal/terms', location: 'footer' })}
              >
                Terms of use
              </Link>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase font-sans text-slate-400 mb-6">
                Contact
              </p>
              <Link
                href="/correspondence"
                className="text-sm text-slate-600 hover:text-[#1a2332] transition-colors"
                onClick={() => trackEvent('cta_click', { link_text: 'Begin Correspondence', destination: '/correspondence', location: 'footer' })}
              >
                Begin Correspondence
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6">
          <p className="text-xs text-slate-500">
            {"© SLOANE / Adler Holdings. Confidential and proprietary."}
          </p>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
