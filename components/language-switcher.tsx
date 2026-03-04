'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { Locale, locales, defaultLocale } from '@/i18n/config';
import { cn } from '@/lib/utils';

const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
};

function getLocalePath(pathname: string, newLocale: string): string {
  // Remove any existing locale prefix
  const localesPattern = locales.join('|');
  const localeRegex = new RegExp(`^/(${localesPattern})(/|$)`);
  const pathWithoutLocale = pathname.replace(localeRegex, '/');
  
  // For default locale (en), don't add prefix when using 'as-needed'
  if (newLocale === defaultLocale) {
    return pathWithoutLocale || '/';
  }
  
  // For non-default locales, add the prefix
  const cleanPath = pathWithoutLocale === '/' ? '' : pathWithoutLocale;
  return `/${newLocale}${cleanPath}`;
}

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
            <a
              href={getLocalePath(pathname, loc)}
              className={cn(
                "cursor-pointer hover:text-foreground transition-colors focus:outline-none focus:underline",
                loc === locale && "font-medium text-foreground"
              )}
              aria-current={loc === locale ? 'true' : undefined}
              aria-label={`${t('label')}: ${localeNames[loc]}`}
            >
              {localeNames[loc]}
            </a>
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
            window.location.href = getLocalePath(pathname, newLocale);
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
