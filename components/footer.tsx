'use client';

import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Footer() {
  return (
    <footer className="py-16 px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div className="font-serif text-xl text-[#1a2332]">
            SLOANE <span className="text-slate-400">/</span> Adler
          </div>

          <nav className="flex flex-col md:flex-row gap-6 text-sm">
            <Link href="/approach" className="text-slate-600 hover:text-[#1a2332] transition-colors">
              Approach
            </Link>
            <Link href="/investor" className="text-slate-600 hover:text-[#1a2332] transition-colors">
              Investor
            </Link>
            <Link href="/news" className="text-slate-600 hover:text-[#1a2332] transition-colors">
              News
            </Link>
            <Link href="/legal/terms" className="text-slate-600 hover:text-[#1a2332] transition-colors">
              Terms
            </Link>
            <Link href="/legal/privacy" className="text-slate-600 hover:text-[#1a2332] transition-colors">
              Privacy
            </Link>
            <Link href="/correspondence" className="text-slate-600 hover:text-[#1a2332] transition-colors">
              Contact
            </Link>
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
