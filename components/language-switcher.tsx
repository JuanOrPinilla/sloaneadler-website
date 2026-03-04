'use client';

import { useTransition, useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleLocaleChange(newLocale: Locale) {
    if (newLocale === locale) return;
    
    startTransition(() => {
      router.replace(pathname, { locale: newLocale, scroll: false });
    });
  }

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
            <button
              onClick={() => handleLocaleChange(loc)}
              disabled={isPending}
              className={cn(
                "cursor-pointer hover:text-foreground transition-colors focus:outline-none focus:underline",
                loc === locale && "font-medium text-foreground",
                isPending && "opacity-50 cursor-wait"
              )}
              aria-current={loc === locale ? 'true' : undefined}
              aria-label={`${t('label')}: ${localeNames[loc]}`}
              type="button"
            >
              {localeNames[loc]}
            </button>
            {index < locales.length - 1 && <span>|</span>}
          </span>
        ))}
      </div>
    );
  }

  return (
    <select
      value={locale}
      onChange={(e) => handleLocaleChange(e.target.value as Locale)}
      disabled={isPending}
      className="bg-transparent border border-border rounded px-2 py-1 text-sm cursor-pointer"
      aria-label={t('label')}
    >
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {localeNames[loc]}
        </option>
      ))}
    </select>
  );
}
