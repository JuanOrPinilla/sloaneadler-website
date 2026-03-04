# SLOANE / Adler

Stewardship across generations. Advisory counsel for families, enterprises, and institutions.

> Advisory counsel for families, enterprises, and institutions across capital, reputation, governance, and continuity.

---

## Overview

Family office and advisory firm website with a sophisticated, institutional aesthetic. Features a navy/slate/white/muted gold palette for high-net-worth clientele, global posture time bar, and referral-only positioning.

**Live Site**: https://sloaneadler.com  
**Password**: `password123!`

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Automation Workflows](#automation-workflows)
- [Security](#security)
- [Accessibility](#accessibility)
- [Project Structure](#project-structure)

---

## Features

### Core Functionality
- **Password Protection**: Middleware-based authentication
- **Multi-Page Architecture**: 8 pages with institutional aesthetic
- **Correspondence Form**: Referral-source tracking on inquiries
- **Global Posture Bar**: Live 5-city time display (SF, NY, Paris, Abu Dhabi, Singapore)
- **Expandable News**: Blog-style posts with read more/less
- **Partner Portal Placeholder**: Login page for restricted access

### Pages
| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Global posture bar, hero, practice areas |
| Approach | `/approach` | Foundations, discipline, counsel, domains |
| Investor | `/investor` | Investor relations (Coming Soon for existing) |
| News | `/news` | News/insights with expandable posts |
| Policies | `/policies` | Confidentiality, referral, independence |
| Contact | `/contact` | General contact form |
| Correspondence | `/correspondence` | Detailed contact form with referral source |
| Login | `/login` | Partner portal (placeholder) |
| Access | `/access` | Password entry gate |

### Design System
- **Typography**: Inter (body), Crimson Pro (headings)
- **Colors**: Navy (#1a2332), slate, white, muted gold (#b8a07e)
- **Institutional Aesthetic**: Sophisticated, luxury positioning
- **Art Integration**: Multiple generated images for hero/sections

### Five Practice Areas
1. Capital
2. Reputation
3. Stewardship
4. State & Policy
5. Enterprise

---

## Architecture

### Authentication Flow
```
User visits site → Middleware checks cookie → No cookie? → Redirect to /access
                                                    ↓
User enters password → POST /api/auth/verify → Sets HTTP-only cookie → Redirect
```

### Contact Form Flow
```
Form submission → Client validation (Zod) → POST /api/contact
                                                ↓
Rate limit check (5/min per IP) → Server validation → n8n webhook
                                                ↓
Optional: Resend email notification
```

### Theme System
- CSS variables for navy/slate/white/gold palette
- `next-themes` provider for theme state

---

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 16.0.10 |
| UI Library | React | 19.2.0 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.1.9 |
| CMS | Strapi v5 | - |
| Icons | Lucide React | ^0.454.0 |
| Fonts | Google Fonts (next/font) | - |
| Validation | Zod | ^3.25.76 |
| Analytics | Vercel Analytics | ^1.3.1 |
| Automation | n8n | - |

---

## Getting Started

### Prerequisites
- Node.js 22+
- npm or pnpm
- Google Cloud SDK (for GCP deployment)

### Installation
```bash
# Clone the repository
git clone https://github.com/devonshigaki/sloaneadler-website.git
cd sloaneadler-website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

---

## Development

```bash
# Run development server
npm run dev

# Open browser
open http://localhost:3000
```

**Default Password**: `password123!`

### Build
```bash
npm run build
```

---

## Deployment

### Vercel (Current)
Automatic deployments from GitHub pushes.

### Google Cloud Run (Future)
```bash
# Deploy using Cloud Build
gcloud builds submit --config cloudbuild.yaml

# Or deploy directly
gcloud run deploy sloaneadler \
  --source . \
  --region=us-central1 \
  --allow-unauthenticated
```

**Configuration Files**:
- `Dockerfile` - Multi-stage build
- `cloudbuild.yaml` - Cloud Build pipeline
- `next.config.mjs` - Standalone output

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `SITE_PASSWORD` | No | `password123!` | Access password |
| `STRAPI_URL` | **Yes** | `http://localhost:1337` | Strapi CMS base URL |
| `STRAPI_API_TOKEN` | **Yes** | - | Strapi API authentication token |
| `RESEND_API_KEY` | No | - | Resend API key |
| `CONTACT_EMAIL` | No | `correspondence@sloaneadler.com` | Notification email |
| `N8N_WEBHOOK_URL` | No | - | n8n webhook URL for contact form |
| `N8N_WEBHOOK_SECRET` | No | - | Webhook secret |
| `N8N_CONTENT_WEBHOOK_URL` | No | - | n8n webhook for Strapi content |
| `STRAPI_WEBHOOK_SECRET` | No | - | Secret for verifying Strapi webhooks |
| `CSRF_SECRET` | No | - | CSRF protection key |
| `NEXT_PUBLIC_SENTRY_DSN` | No | - | Sentry error tracking DSN |
| `SENTRY_AUTH_TOKEN` | No | - | Sentry auth token |

### Environment Setup

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in required values for your environment

3. For Strapi CMS integration, obtain an API token from your Strapi admin panel

---

## CMS Integration (Strapi v5)

The website uses **Strapi v5** as its headless CMS for content management.

### Content Types
- **Posts**: Blog posts, perspectives, and news articles
- **Pages**: Dynamic page content (optional)

### Configuration
Set the following environment variables:
```bash
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_here
```

### Fetching Content
Content is fetched from Strapi using the REST API:
- Posts listing: `GET /api/posts?populate=*`
- Single post: `GET /api/posts/:slug?populate=*`

## Webhook Endpoints

### Strapi Webhook (`/api/strapi-webhook`)
Receives events from Strapi CMS when content is published/updated.

**Events Handled:**
- `entry.publish` - New content published
- `entry.update` - Existing content updated
- `entry.create` - New entry created

**Security:**
- Verifies `x-strapi-webhook-secret` header against `STRAPI_WEBHOOK_SECRET`

**Integration with n8n:**
- Forwards post data to `N8N_CONTENT_WEBHOOK_URL` for automated distribution
- Payload includes post metadata, URL, and publish timestamp

### Contact Form Webhook (`/api/contact`)
Handles contact form submissions and forwards to n8n.

**Rate Limiting:**
- 5 requests per minute per IP address

**n8n Integration:**
- Forwards to `N8N_WEBHOOK_URL`
- Includes form data with CSRF protection

## Automation Workflows

Three n8n workflows included:

| Workflow | File | Purpose |
|----------|------|---------|
| Contact Form | `n8n-workflow-contact-form.json` | Process inquiries, family office lead scoring |
| Email Processing | `n8n-workflow-email-processing.json` | Handle correspondence@ inbox |
| Social Media | `n8n-workflow-social-media-automation.json` | Family office advisory content automation |
| Content Distribution | Configured via Strapi webhook | Auto-publish posts to social/email |

**Lead Scoring Criteria**: Optimized for family offices, high-net-worth families, institutional investors, and generational wealth advisory.

---

## Security

- ✅ Password protection via Next.js middleware
- ✅ Rate limiting (5 requests/minute per IP)
- ✅ Input validation with Zod
- ✅ Server-side form processing
- ✅ HTTP-only session cookies
- ✅ Secure cookie flags

---

## Accessibility

### Current Implementation
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ `lang="en"` attribute

### Known Issues
- Form labels lack `htmlFor` attributes
- Form errors not announced to screen readers
- Mobile menu lacks state attributes

### Planned Improvements
- [ ] Fix label-input associations
- [ ] Add ARIA live regions for errors
- [ ] Skip-to-content link
- [ ] Reduced motion support

---

## Project Structure

```
sloaneadler-website/
├── app/
│   ├── [locale]/                 # i18n locale routes (en, es, fr)
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx            # Locale layout with i18n providers
│   │   ├── globals.css           # Navy/gold theme
│   │   ├── approach/             # Approach page
│   │   ├── investor/             # Investor relations
│   │   ├── news/                 # News/insights
│   │   ├── policies/             # Policies page
│   │   ├── correspondence/       # Contact form
│   │   ├── login/                # Partner portal (WIP)
│   │   └── access/               # Password gate
│   ├── layout.tsx                # Root layout (pass-through)
│   ├── globals.css               # Global styles
│   └── api/                      # API routes (non-localized)
│       ├── contact/route.ts
│       └── auth/
│           ├── verify/route.ts
│           └── logout/route.ts
├── components/
│   ├── language-switcher.tsx     # Language selector UI
│   └── theme-provider.tsx        # Theme context
├── lib/                          # Utility libraries
│   ├── utils.ts                  # Utilities
│   └── db/                       # Database client (GCP Cloud SQL)
│       └── index.ts              # PostgreSQL pool configuration
├── messages/                     # i18n translation files (next-intl)
│   ├── en.json                   # English translations
│   ├── es.json                   # Spanish translations
│   └── fr.json                   # French translations
├── i18n/                         # i18n configuration
│   ├── routing.ts                # NextIntl routing config
│   ├── config.ts                 # i18n settings
│   └── request.ts                # Request-time locale detection
├── database/                     # Database migrations and scripts
│   ├── migrations/               # SQL migration files
│   └── README.md                 # Database setup instructions
├── middleware.ts                 # Auth middleware + i18n routing
├── public/
│   └── images/                   # Art images
├── n8n-workflow-*.json          # Workflows
├── Dockerfile
├── cloudbuild.yaml
└── next.config.mjs
```

### Key Folders Explained

| Folder | Purpose |
|--------|---------|
| `messages/` | Internationalization translations (JSON) for English, Spanish, French |
| `i18n/` | next-intl configuration files for routing and locale management |
| `lib/db/` | GCP Cloud SQL PostgreSQL connection pool configuration |
| `database/` | SQL migrations and database setup documentation |
| `workflows/` | n8n automation workflow JSON files |

---

## Mobile Clock Evolution

The timezone clock implementation went through 8 iterations for mobile responsiveness:
1. Hide timezone bar on mobile
2. Remove em dashes, adjust visibility
3. Display on all screen sizes
4. Enable horizontal scroll for mobile
5. Add whitespace-nowrap for mobile
6. Fix text overflow on mobile
7. Increase mobile padding
8. Prevent nav header overlap

---

*Built with Next.js 16, React 19, and Tailwind CSS*
