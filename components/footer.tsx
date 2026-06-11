'use client';

import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/language-switcher";
import { trackEvent } from "@/lib/analytics";

export function Footer() {
  return (
    <footer className="py-16 px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div className="font-serif text-xl text-[#1a2332]">
            SLOANE <span className="text-slate-400">/</span> Adler
          </div>

          <nav className="flex flex-col md:flex-row gap-6 text-sm">
            {[
              { href: '/approach', label: 'Approach' },
              { href: '/investor', label: 'Investor' },
              { href: '/news', label: 'News' },
              { href: '/legal/terms', label: 'Terms' },
              { href: '/legal/privacy', label: 'Privacy' },
              { href: '/correspondence', label: 'Contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-[#1a2332] transition-colors"
                onClick={() => trackEvent('nav_click', { link_text: link.label, destination: link.href, location: 'footer' })}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="text-sm text-slate-500 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
            <p>{"© SLOANE / Adler Holdings. Confidential and proprietary."}</p>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
