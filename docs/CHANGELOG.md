# Changelog

## SLOANE / Adler Website

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-03-04

### Added
- Multi-language support (English, Spanish, French) via next-intl
- Password protection with middleware-based auth
- GCP Cloud SQL database integration
- Language switcher component in footer
- Error boundaries (error.tsx, not-found.tsx, global-error.tsx)
- SEO files (robots.ts, sitemap.ts, manifest.ts)
- Security headers (CSP, X-Frame-Options, etc.)
- Health check endpoint (/api/health)
- Comprehensive documentation in /docs folder

### Changed
- Moved TECHNICAL_SPEC.md to docs/
- Updated footer components to use LanguageSwitcher
- Fixed TypeScript errors in assignments page
- Replaced hardcoded language buttons with component

### Fixed
- Language switcher not working (missing NextIntlClientProvider)
- Hydration mismatches in LanguageSwitcher
- Build errors with optional properties

## [0.9.0] - 2026-03-03

### Added
- n8n workflow files (contact form, email processing, social media)
- Workflows organized in /workflows folder
- .env.example with all required variables
- Database setup documentation

### Changed
- Removed Supabase references, using GCP Cloud SQL
- Updated middleware for i18n support

## [0.8.0] - 2026-03-02

### Added
- Error handling pages (404, error boundary)
- Loading states
- Structured data components

## [0.7.0] - 2026-03-01

### Added
- Password protection system
- /access page for authentication
- Auth API routes (/api/auth/verify, /api/auth/logout)

## [0.6.0] - 2026-02-28

### Added
- GCP Cloud Run deployment setup
- Dockerfile and cloudbuild.yaml
- next.config.mjs with standalone output

## [0.5.0] - 2026-02-15

### Added
- Multi-page site structure
- Field-themed sections
- Theme toggle (dark/light)
- World clock component

## [0.4.0] - 2026-02-10

### Added
- shadcn/ui components
- Tailwind CSS setup
- Google Fonts integration

## [0.3.0] - 2026-02-05

### Added
- Contact form with validation
- Zod schema validation
- Rate limiting

## [0.2.0] - 2026-02-01

### Added
- Next.js 16 setup
- React 19
- TypeScript configuration

## [0.1.0] - 2026-01-29

### Added
- Initial repository setup
- Basic site structure
- README.md

---

Format based on [Keep a Changelog](https://keepachangelog.com/)
