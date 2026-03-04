# Architecture Documentation

## SLOANE / Adler Website

## Overview

Personal website for SLOANE / Adler featuring a "field notes" aesthetic with multi-language support, password protection, and dynamic content sections.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS 4.1.9 |
| UI Components | shadcn/ui |
| Internationalization | next-intl |
| Database | GCP Cloud SQL (PostgreSQL) |
| Deployment | Vercel + GCP Cloud Run |
| Analytics | Vercel Analytics |

## Directory Structure

```
app/                          # Next.js App Router
├── [locale]/                 # i18n route groups
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Locale-specific layout
│   ├── hello/                # Bio page
│   ├── assignments/          # Career record
│   ├── faculty/              # Teaching page
│   ├── speaking/             # Speaking topics
│   ├── contact/              # Contact form
│   └── ...
├── api/                      # API routes
│   ├── auth/
│   │   ├── verify/route.ts   # Password verification
│   │   └── logout/route.ts   # Session logout
│   ├── contact/route.ts      # Form handler
│   └── health/route.ts       # Health check
├── error.tsx                 # Error boundary
├── not-found.tsx             # 404 page
├── robots.ts                 # SEO robots
└── sitemap.ts                # SEO sitemap

components/                   # React components
├── sections/                 # Page sections
│   ├── hero.tsx
│   ├── field-record.tsx
│   └── ...
├── ui/                       # shadcn/ui components
├── language-switcher.tsx     # i18n language selector
├── site-nav.tsx              # Navigation
├── site-footer.tsx           # Footer with world clock
└── world-clock.tsx           # Multi-timezone clock

i18n/                         # Internationalization
├── config.ts                 # Locale configuration
├── routing.ts                # next-intl routing
└── request.ts                # Message loading

messages/                     # Translation files
├── en.json                   # English
├── es.json                   # Spanish
└── fr.json                   # French

database/                     # Database
├── migrations/
│   └── 001_initial_schema.sql
└── README.md

lib/                          # Utilities
├── db/
│   └── index.ts              # Database client
└── utils.ts                  # Helper functions

middleware.ts                 # Auth + i18n middleware
public/                       # Static assets
└── images/                   # Image assets

workflows/                    # n8n automation
├── n8n-workflow-contact-form.json
├── n8n-workflow-email-processing.json
└── n8n-workflow-social-media-automation.json
```

## Authentication Flow

```
User Request
    ↓
Middleware (middleware.ts)
    ├── Check i18n locale
    ├── Check auth cookie
    └── If no auth → Redirect to /access
    ↓
/access Page
    └── User enters password
    ↓
POST /api/auth/verify
    ├── Validate password
    ├── Set HTTP-only cookie
    └── Return success
    ↓
Redirect to original page
```

## Internationalization Architecture

```
User Request
    ↓
Middleware detects locale
    ├── Check cookie (NEXT_LOCALE)
    ├── Check Accept-Language header
    └── Default to 'en'
    ↓
[nextlocale].tsx layout
    ├── Load messages from messages/{locale}.json
    ├── Wrap with NextIntlClientProvider
    └── Render page
    ↓
LanguageSwitcher component
    └── Client-side locale switching
```

## Database Schema

### User Accounts
```sql
CREATE TABLE user_accounts (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP
);
```

### Sessions
```sql
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES user_accounts(id),
    session_token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);
```

### Contact Submissions
```sql
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    inquiry_type TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP
);
```

## Component Hierarchy

```
RootLayout
├── NextIntlClientProvider
│   └── ThemeProvider
│       └── PageShell (most pages)
│           ├── SiteNav
│           │   ├── Navigation links
│           │   ├── Mobile menu
│           │   └── Theme toggle
│           ├── Main Content
│           │   └── Page-specific sections
│           └── SiteFooter
│               ├── WorldClock
│               ├── LanguageSwitcher
│               └── Social links
```

## Security Considerations

- **Password Protection**: HTTP-only cookies, 7-day expiry
- **Rate Limiting**: 5 requests/minute on contact form
- **CSP Headers**: Content Security Policy via middleware
- **Input Validation**: Zod schema validation
- **SQL Injection Prevention**: Parameterized queries via pg

## Performance Optimizations

- **Image Optimization**: Next.js Image component
- **Static Generation**: Pages prerendered at build time
- **Code Splitting**: Automatic via Next.js
- **Font Optimization**: next/font for Google Fonts

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| SITE_PASSWORD | Access password | Yes (default: password123!) |
| DB_HOST | Cloud SQL host | Yes (for GCP) |
| DB_PASSWORD | Database password | Yes |
| RESEND_API_KEY | Email service key | No |
| N8N_WEBHOOK_URL | Automation webhook | No |

## Deployment Strategy

### Vercel (Current)
```
Git Push → Vercel Build → Deploy to Edge
```

### GCP Cloud Run (Future)
```
Git Push → Cloud Build → Container → Cloud Run
```

## Monitoring

- **Vercel Analytics**: Performance & usage
- **Build Logs**: Vercel dashboard
- **Runtime Logs**: Cloud Logging (GCP)

## Future Enhancements

1. Full user account system with profiles
2. Blog/Intel section with CMS integration
3. Speaking calendar integration
4. Newsletter signup
5. Advanced analytics with custom events
