'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, Link } from '@/i18n/routing';
import { Locale, locales } from '@/i18n/config';
import { cn } from '@/lib/utils';

const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
};

export function LanguageSwitcher({ 
  variant = 'footer' 
}: { 
  variant?: 'footer' | 'inline' 
}) {
  const [mounted, setMounted] = useState(false);
  const locale = useLocale() as Locale;
  const t = useTranslations('locale_switcher');
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch - render static version on server
  if (!mounted) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {locales.map((loc, index) => (
          <span key={loc} className="flex items-center gap-2">
            <span className={cn(
              "cursor-pointer hover:text-foreground transition-colors",
              loc === locale && "font-medium text-foreground"
            )}>
              {localeNames[loc]}
            </span>
            {index < locales.length - 1 && <span>|</span>}
          </span>
        ))}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div 
        className="flex items-center gap-2 text-sm text-muted-foreground"
        aria-label={t('label')}
      >
        {locales.map((loc, index) => (
          <span key={loc} className="flex items-center gap-2">
            <Link
              href={pathname}
              locale={loc}
              className={cn(
                "cursor-pointer hover:text-foreground transition-colors focus:outline-none focus:underline",
                loc === locale && "font-medium text-foreground"
              )}
              aria-current={loc === locale ? 'true' : undefined}
              aria-label={`${t('label')}: ${localeNames[loc]}`}
            >
              {localeNames[loc]}
            </Link>
            {index < locales.length - 1 && <span>|</span>}
          </span>
        ))}
      </div>
    );
  }

  // Inline select variant
  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => {
          const newLocale = e.target.value as Locale;
          if (newLocale !== locale) {
            // Use window.location to navigate with locale change
            const newPath = `/${newLocale}${pathname}`;
            window.location.href = newPath;
          }
        }}
        className="bg-transparent border border-border rounded px-2 py-1 text-sm cursor-pointer appearance-none pr-8"
        aria-label={t('label')}
        style={{ minWidth: '120px' }}
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc]}
          </option>
        ))}
      </select>
      <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-xs">
        ▼
      </span>
    </div>
  );
}
