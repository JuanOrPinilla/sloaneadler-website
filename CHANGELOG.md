# Changelog

All notable changes to the Sloane Adler website will be documented in this file.

## [1.0.0] - 2026-02-23

### Timeline
- **Development Period**: January 21, 2026 - February 23, 2026 (4 weeks)
- **Status**: Production Handoff Complete

---

## Week 4 (Feb 17 - Feb 23): Production Handoff & Final Polish

### Security & Performance
- Added HSTS headers with `max-age=31536000; includeSubDomains; preload`
- Implemented CSRF protection infrastructure (`lib/csrf.ts`)
- Added Redis-based rate limiting (`lib/rate-limit.ts`)
- Created Sentry error tracking infrastructure (instrumentation files)

### Accessibility (Major Improvements)
- Added skip-to-content link component (`components/skip-link.tsx`)
- Implemented ARIA live regions (`components/aria-announcer.tsx`)
- Added reduced-motion support CSS and `useReducedMotion()` hook
- **Fixed all form label associations** (added `htmlFor`/`id` links)
- **Added focus-visible indicators** (replaced `outline-none` with `focus-visible:ring-2`)
- **Fixed semantic landmark regions** (`<main id="main-content">`)
- Added `aria-required`, `aria-busy`, `aria-label` attributes

### Legal & Compliance
- Created comprehensive Terms of Service page (`app/[locale]/legal/terms/page.tsx`)
- Created comprehensive Privacy Policy page (`app/[locale]/legal/privacy/page.tsx`)
- Updated footer with legal links (Terms, Privacy)

### Code Quality
- **Major refactor**: Split 440-line `page.tsx` into 8 component files:
  - `components/home/hero-section.tsx`
  - `components/home/fracturing-section.tsx`
  - `components/home/philosophy-section.tsx`
  - `components/home/practice-section.tsx`
  - `components/home/engagement-section.tsx`
  - `components/home/domains-section.tsx`
  - `components/home/long-view-section.tsx`
  - `components/home/velvet-rope.tsx`
- Fixed TypeScript type safety (`as any` → `as Locale`)
- Added global error boundary (`app/global-error.tsx`)
- Fixed raw `<img>` to use Next.js `<Image>` component

---

## Week 3 (Feb 10 - Feb 16): i18n & Language Support

### Internationalization
- Implemented next-intl with `[locale]` dynamic segment
- Added language switcher component with globe icon
- Created i18n routing configuration (`i18n/routing.ts`)
- Added translation files for EN, ES, FR (`messages/`)
- Implemented `localePrefix: 'as-needed'` strategy

### Content
- Updated all pages for locale-aware routing
- Added LanguageSwitcher to header and footer

---

## Week 2 (Jan 28 - Feb 9): Security & Authentication

### Authentication
- Implemented password protection middleware
- Added session cookie validation (`site_session`)
- Created `/access` password gate page
- Created `/login` principals page
- Added secure logout functionality
- Created API auth endpoints (`/api/auth/verify`, `/api/auth/logout`)

### Security Headers
- Added comprehensive security headers middleware
- Implemented Content Security Policy (CSP)
- Added X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
- Configured Referrer-Policy and Permissions-Policy

### Content
- Added contact form (Correspondence page)
- Implemented webhook integration for form submissions
- Created database schema for contact submissions

---

## Week 1 (Jan 21 - Jan 27): Project Setup & Foundation

### Project Initialization
- Initialized Next.js 16 project with App Router
- Configured TypeScript with strict mode
- Set up Tailwind CSS with custom configuration
- Configured Inter + Crimson Pro font stack

### Design System
- Implemented custom typography system
- Created Sloane Adler brand colors (#1a2332, #b8a07e)
- Set up serif/sans-serif font pairing
- Added global time display (posture bar)

### Components
- Created header with global time display
- Implemented world time zones (SF, NY, Paris, Abu Dhabi, Singapore)
- Added mobile responsive hamburger menu
- Created footer with navigation

### Build & Deploy
- Created Dockerfile for containerization
- Added cloudbuild.yaml for GCP deployment
- Configured next.config.mjs with standalone output

### SEO & Metadata
- Created manifest.ts for PWA support
- Added robots.ts for search engine directives
- Implemented sitemap.ts generation
- Added OpenGraph and Twitter card metadata

### Pages
- Homepage with art portfolio sections
- Approach page
- Investor page
- News page
- Correspondence (Contact) page
- Login page

---

## Technical Stack

- **Framework**: Next.js 16.0.10 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS
- **Fonts**: Inter (sans), Crimson Pro (serif)
- **i18n**: next-intl 4.8.3
- **Auth**: Custom cookie-based session
- **Database**: GCP Cloud SQL (PostgreSQL)
- **Deployment**: Docker + Google Cloud Run
- **Analytics**: Vercel Analytics

## Environment Variables Required

```bash
# Authentication
SITE_PASSWORD=your-secure-password

# CSRF Protection
CSRF_SECRET=your-super-secret-csrf-key-min-32-chars-long

# Database
DATABASE_URL=postgresql://user:pass@host:port/db

# Email (Resend)
RESEND_API_KEY=re_xxx
CONTACT_EMAIL=contact@sloaneadler.com

# Webhook (n8n)
N8N_WEBHOOK_URL=https://n8n.your-domain.com/webhook/contact
N8N_WEBHOOK_SECRET=your-webhook-secret

# Redis (Optional - for production rate limiting)
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here

# Sentry (Optional)
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.us.sentry.io/xxx
SENTRY_AUTH_TOKEN=sntrys_xxx
```

## Known Issues

- None at production handoff

## Future Enhancements

- Enable Sentry error tracking (uncomment instrumentation files)
- Install @vercel/speed-insights for performance monitoring
- Add Redis rate limiting for distributed deployments
- Consider implementing art collection CMS
