# Changelog

All notable changes to the Sloane Adler website will be documented in this file.

## [1.0.0] - 2026-02-23

### Timeline
- **Development Period**: January 21, 2026 - February 23, 2026 (4 weeks)
- **Status**: Production Handoff Complete

---

## Week 4 (Feb 17 - Feb 23): CMS Integration & Production Polish

### Content Management
- Implemented Strapi v5 CMS integration
- Added Strapi webhook integration with n8n
- Created Perspectives (posts) listing page
- Created individual perspective pages
- Set up automatic content distribution workflow
- Added elegant serif typography for long-form content

### Security & Performance
- Added HSTS headers
- Implemented CSRF protection infrastructure
- Added Redis-based rate limiting
- Created Sentry error tracking infrastructure

### Accessibility
- Added skip-to-content link component
- Implemented ARIA live regions
- Added reduced-motion support
- Fixed all form label associations
- Added focus-visible indicators
- Fixed semantic landmark regions
- Added aria-required, aria-busy, aria-label attributes

### Legal & Compliance
- Created comprehensive Terms of Service page
- Created comprehensive Privacy Policy page
- Updated footer with legal links

### Code Quality
- Major refactor: Split 440-line page into 8 component files
- Fixed TypeScript type safety
- Added global error boundary
- Fixed raw img to use Next.js Image component

---

## Week 3 (Feb 10 - Feb 16): i18n & Language Support

### Internationalization
- Implemented next-intl with dynamic locale segments
- Added language switcher component with globe icon
- Created i18n routing configuration
- Added translation files for EN, ES, FR
- Implemented localePrefix strategy
- Updated all pages for locale-aware routing
- Added LanguageSwitcher to header and footer

---

## Week 2 (Jan 28 - Feb 9): Security & Authentication

### Authentication
- Implemented password protection middleware
- Added session cookie validation
- Created password gate page
- Created login principals page
- Added secure logout functionality
- Created API auth endpoints

### Security Headers
- Added comprehensive security headers middleware
- Implemented Content Security Policy
- Added X-Frame-Options, X-Content-Type-Options
- Configured Referrer-Policy and Permissions-Policy

### Content
- Added contact form (Correspondence page)
- Created Contact page with general inquiry form
- Implemented webhook integration for form submissions
- Created database schema for contact submissions

---

## Week 1 (Jan 21 - Jan 27): Foundation & Setup

### Project Initialization
- Initialized Next.js 16 project with App Router
- Configured TypeScript with strict mode
- Set up Tailwind CSS
- Configured Inter + Crimson Pro font stack

### Design System
- Implemented custom typography system
- Created Sloane Adler brand colors
- Set up serif/sans-serif font pairing
- Added global time display (posture bar)

### Components
- Created header with global time display
- Implemented world time zones
- Added mobile responsive hamburger menu
- Created footer with navigation

### Build & Deploy
- Created Dockerfile for containerization
- Added cloudbuild.yaml for GCP deployment
- Configured next.config.mjs

### SEO & Metadata
- Created manifest.ts for PWA support
- Added robots.ts
- Implemented sitemap.ts
- Added OpenGraph and Twitter card metadata

### Pages
- Homepage with art portfolio sections
- Approach page
- Investor page
- News page
- Correspondence page
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
CSRF_SECRET=your-super-secret-csrf-key

# Database
DATABASE_URL=postgresql://user:pass@host:port/db

# Email (Resend)
RESEND_API_KEY=re_xxx
CONTACT_EMAIL=contact@sloaneadler.com

# Webhook (n8n)
N8N_WEBHOOK_URL=https://n8n.your-domain.com/webhook/contact
N8N_WEBHOOK_SECRET=your-secret

# Redis (Optional)
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token

# Sentry (Optional)
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.us.sentry.io/xxx
SENTRY_AUTH_TOKEN=sntrys_xxx
```

## Known Issues

- None at production handoff

## Future Enhancements

- Enable Sentry error tracking
- Install @vercel/speed-insights
- Add Redis rate limiting
- Consider implementing art collection CMS
