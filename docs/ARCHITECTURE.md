# Architecture Documentation

## SLOANE / Adler Website

## Overview

Family office and advisory firm website with a sophisticated, institutional aesthetic. Features a navy/slate/white/muted gold palette for high-net-worth clientele, global posture time bar, and referral-only positioning.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS 4.1.9 |
| UI Components | shadcn/ui |
| Internationalization | next-intl |
| CMS | Strapi v5 |
| Automation | n8n |
| Database | GCP Cloud SQL (PostgreSQL) |
| Deployment | Vercel + GCP Cloud Run |
| Analytics | Vercel Analytics |

## Directory Structure

```
app/                          # Next.js App Router
├── [locale]/                 # i18n route groups
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Locale-specific layout
│   ├── approach/             # Approach page
│   ├── investor/             # Investor relations
│   ├── news/                 # News/insights
│   ├── policies/             # Policies page
│   ├── correspondence/       # Detailed contact form
│   ├── contact/              # Contact form
│   ├── login/                # Partner portal (placeholder)
│   └── access/               # Password entry page
├── api/                      # API routes
│   ├── auth/
│   │   ├── verify/route.ts   # Password verification
│   │   └── logout/route.ts   # Session logout
│   ├── contact/route.ts      # Contact form handler
│   ├── correspondence/       # Correspondence form handler
│   ├── strapi-webhook/       # CMS webhook handler
│   ├── n8n/trigger/          # n8n workflow triggers
│   └── health/route.ts       # Health check
├── error.tsx                 # Error boundary
├── not-found.tsx             # 404 page
├── robots.ts                 # SEO robots
└── sitemap.ts                # SEO sitemap

components/                   # React components
├── sections/                 # Page sections
├── ui/                       # shadcn/ui components
├── language-switcher.tsx     # i18n language selector
└── theme-provider.tsx        # Theme context

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
├── strapi.ts                 # Strapi CMS client
├── n8n.ts                    # n8n automation client
└── utils.ts                  # Helper functions

middleware.ts                 # Auth + i18n middleware
public/                       # Static assets
└── images/                   # Image assets

workflows/                    # n8n automation
├── n8n-workflow-contact-form.json
├── n8n-workflow-correspondence.json
└── n8n-workflow-content-distribution.json
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

## CMS Integration (Strapi)

The website uses **Strapi v5** as its headless CMS for blog posts and content management.

### Content Types

- **Posts**: Blog posts, perspectives, and news articles
- **Pages**: Dynamic page content (optional)

### Architecture

```
Content Editor → Strapi CMS → Webhook → Next.js API
                                           ↓
                                    ┌──────┴──────┐
                                    ▼             ▼
                              Cache Invalidation  n8n
                                                    ↓
                              ┌──────────┬──────────┼──────────┐
                              ▼          ▼          ▼          ▼
                          LinkedIn   Email      Slack    Newsletter
```

### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/posts` | List all published posts |
| `GET /api/posts/:slug` | Get single post by slug |

### Webhook Endpoint

**URL**: `/api/strapi-webhook`
- Receives webhooks from Strapi on content changes
- Forwards post events to n8n for content distribution
- Supports `X-Strapi-Webhook-Secret` header verification

See [CMS_INTEGRATION.md](./CMS_INTEGRATION.md) for complete details.

## Automation (n8n)

The website integrates with [n8n](https://n8n.io/) for workflow automation, connecting form submissions and content updates with HubSpot, Slack, PostgreSQL, and AWS S3.

### Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Sloane Adler Website                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│   │  /api/contact │    │ /api/corresp │    │/api/strapi-  │         │
│   │              │    │   ondence    │    │  webhook     │         │
│   └──────┬───────┘    └──────┬───────┘    └──────┬───────┘         │
│          │                   │                    │                 │
│          └───────────────────┼────────────────────┘                 │
│                              │                                      │
│                    ┌─────────┴─────────┐                            │
│                    │   lib/n8n.ts      │                            │
│                    │  Client Library   │                            │
│                    └─────────┬─────────┘                            │
│                              │                                      │
└──────────────────────────────┼──────────────────────────────────────┘
                               │ HTTPS
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          n8n Instance                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ Contact Flow │  │Correspondence│  │ Content Dist │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
│         │                 │                 │                       │
│         ▼                 ▼                 ▼                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   HubSpot    │  │    Slack     │  │    Email     │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Available Workflows

| Workflow | Trigger | Description |
|----------|---------|-------------|
| **Contact Form** | `POST /api/contact` | General inquiries, basic lead capture |
| **Correspondence** | `POST /api/correspondence` | Detailed HNW inquiries with lead scoring |
| **Content Publish** | `POST /api/strapi-webhook` | Auto-distribute blog posts |
| **Lead Enrichment** | `POST /api/n8n/trigger` | Enhanced lead data enrichment |

### Workflow Details

#### Contact Form Workflow
- **Trigger**: Form submission on `/contact`
- **Rate Limit**: 5 requests/minute
- **Actions**: HubSpot contact creation, Slack notification, email confirmation

#### Correspondence Workflow
- **Trigger**: Form submission on `/correspondence`
- **Rate Limit**: 3 requests/minute
- **Features**: Lead scoring (0-100), AUM tracking, family office classification
- **Actions**: HubSpot contact + company, deal creation for high-value leads, priority routing

#### Content Distribution Workflow
- **Trigger**: Strapi CMS publish events
- **Actions**: Social media posting, email newsletter, Slack notification

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contact` | POST | Contact form with n8n integration |
| `/api/correspondence` | POST | Detailed HNW inquiry form with lead scoring |
| `/api/strapi-webhook` | POST | Strapi CMS webhook handler |
| `/api/n8n/trigger` | POST | Programmatic workflow triggers |
| `/api/n8n/trigger` | GET | n8n configuration status |

### Client Library

The `lib/n8n.ts` module provides utilities for triggering workflows:

```typescript
import { 
  triggerContactWorkflow,
  triggerContentWorkflow,
  getN8NStatus 
} from '@/lib/n8n';

// Trigger contact form workflow
const result = await triggerContactWorkflow(
  { name: 'John', email: 'john@example.com', inquiryType: 'general', message: 'Hello' },
  { ipAddress: '1.2.3.4', userAgent: '...' }
);

// Trigger content workflow
await triggerContentWorkflow(
  { id: 1, title: 'New Post', slug: 'new-post' },
  'entry.publish',
  'post'
);

// Check configuration
const status = getN8NStatus();
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `N8N_BASE_URL` | n8n instance URL |
| `N8N_WEBHOOK_URL` | Webhook URL for contact forms |
| `N8N_CONTENT_WEBHOOK_URL` | Webhook URL for Strapi content |
| `N8N_API_KEY` | n8n API key for programmatic access |
| `N8N_WEBHOOK_SECRET` | Secret for webhook verification |

### Third-Party Integrations

| Variable | Used For |
|----------|----------|
| `HUBSPOT_API_KEY` | HubSpot Private App token |
| `HUBSPOT_PORTAL_ID` | HubSpot account portal ID |
| `SLACK_WEBHOOK_URL` | Incoming webhook URL |
| `SLACK_CHANNEL` | Default channel for notifications |
| `AWS_ACCESS_KEY_ID` | AWS access key for backups |
| `AWS_S3_BUCKET_NAME` | Backup bucket name |

### Database (n8n Internal)

| Variable | Description |
|----------|-------------|
| `N8N_DB_HOST` | PostgreSQL host |
| `N8N_DB_NAME` | n8n database name |
| `N8N_DB_USER` | Database user |
| `N8N_DB_PASSWORD` | Database password |
| `N8N_DATABASE_URL` | Full PostgreSQL connection URL |

### Workflow Files

Workflow JSON files are located in `/workflows/`:
- `workflows/n8n-workflow-contact-form.json`
- `workflows/n8n-workflow-correspondence.json`
- `workflows/n8n-workflow-content-distribution.json`

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

## Security

### Implemented Measures
- **Password Protection**: HTTP-only cookies
- **Rate Limiting**: 5 requests/minute on contact, 3 on correspondence
- **CSRF Protection**: Token-based CSRF protection
- **Input Validation**: Zod schema validation
- **SQL Injection Prevention**: Parameterized queries via pg
- **Webhook Verification**: `X-Strapi-Webhook-Secret` header validation

### Security Headers
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| POST /api/contact | 5 | 1 minute |
| POST /api/correspondence | 3 | 1 minute |
| POST /api/strapi-webhook | No limit | Internal |

## Performance Optimizations

- **Image Optimization**: Next.js Image component
- **Static Generation**: Pages prerendered at build time
- **Code Splitting**: Automatic via Next.js
- **Font Optimization**: next/font for Google Fonts

## Deployment

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

---

*For detailed CMS and automation configuration, see [CMS_INTEGRATION.md](./CMS_INTEGRATION.md)*
