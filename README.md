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
- [n8n Automation](#n8n-automation)
- [CMS Integration](#cms-integration)
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

### Contact Form Flow with n8n
```
Form submission → Client validation (Zod) → POST /api/contact
                                                ↓
Rate limit check → Server validation → lib/n8n.ts → n8n Webhook
                                                ↓
                                    ┌───────────┼───────────┐
                                    ▼           ▼           ▼
                                 HubSpot     Slack      PostgreSQL
                                  CRM      Notification   Logs
```

### Strapi Content Distribution Flow
```
Strapi CMS → POST /api/strapi-webhook
                    ↓
            Verify webhook secret
                    ↓
            lib/n8n.ts → n8n Content Webhook
                    ↓
        ┌───────────┼───────────┐
        ▼           ▼           ▼
    Social Media  Email      Slack
    (LinkedIn)  Newsletter  Notification
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
| Automation | n8n | - |
| Icons | Lucide React | ^0.454.0 |
| Fonts | Google Fonts (next/font) | - |
| Validation | Zod | ^3.25.76 |
| Analytics | Vercel Analytics | ^1.3.1 |

---

## Getting Started

### Prerequisites
- Node.js 22+
- npm or pnpm
- Google Cloud SDK (for GCP deployment)
- n8n instance (local or cloud)

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

### Core Application

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `SITE_PASSWORD` | No | `password123!` | Access password |
| `STRAPI_URL` | **Yes** | `http://localhost:1337` | Strapi CMS base URL |
| `STRAPI_API_TOKEN` | **Yes** | - | Strapi API authentication token |
| `RESEND_API_KEY` | No | - | Resend API key |
| `CONTACT_EMAIL` | No | `correspondence@sloaneadler.com` | Notification email |

### n8n Automation

| Variable | Required | Description |
|----------|----------|-------------|
| `N8N_BASE_URL` | No | n8n instance URL (e.g., `https://automation.sloaneadler.com`) |
| `N8N_WEBHOOK_URL` | No | Webhook URL for contact forms |
| `N8N_CONTENT_WEBHOOK_URL` | No | Webhook URL for Strapi content |
| `N8N_API_KEY` | No | n8n API key for programmatic access |
| `N8N_WEBHOOK_SECRET` | No | Secret for webhook verification |

### HubSpot CRM Integration

| Variable | Required | Description |
|----------|----------|-------------|
| `HUBSPOT_API_KEY` | No | HubSpot Private App token |
| `HUBSPOT_PORTAL_ID` | No | HubSpot account portal ID |

### PostgreSQL (n8n Database)

| Variable | Required | Description |
|----------|----------|-------------|
| `N8N_DB_HOST` | No | PostgreSQL host |
| `N8N_DB_PORT` | No | PostgreSQL port (default: 5432) |
| `N8N_DB_NAME` | No | n8n database name |
| `N8N_DB_USER` | No | Database user |
| `N8N_DB_PASSWORD` | No | Database password |
| `N8N_DATABASE_URL` | No | Full PostgreSQL connection URL |

### Slack Notifications

| Variable | Required | Description |
|----------|----------|-------------|
| `SLACK_WEBHOOK_URL` | No | Incoming webhook URL |
| `SLACK_CHANNEL` | No | Default channel for notifications |
| `SLACK_BOT_TOKEN` | No | Bot token for advanced features |

### AWS S3 (Backups)

| Variable | Required | Description |
|----------|----------|-------------|
| `AWS_ACCESS_KEY_ID` | No | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | No | AWS secret key |
| `AWS_REGION` | No | AWS region (e.g., `us-east-1`) |
| `AWS_S3_BUCKET_NAME` | No | Backup bucket name |

### Security

| Variable | Required | Description |
|----------|----------|-------------|
| `STRAPI_WEBHOOK_SECRET` | No | Secret for verifying Strapi webhooks |
| `CSRF_SECRET` | No | CSRF protection key |
| `UPSTASH_REDIS_REST_URL` | No | Redis URL for distributed rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | No | Redis token |

### Environment Setup

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in required values for your environment

3. For Strapi CMS integration, obtain an API token from your Strapi admin panel

4. For n8n, configure webhooks and copy URLs to environment variables

---

## n8n Automation

The website integrates with [n8n](https://n8n.io) for workflow automation, connecting form submissions and content updates with HubSpot, Slack, PostgreSQL, and AWS S3.

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

// Check n8n configuration
const status = getN8NStatus();
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contact` | POST | Contact form with n8n integration |
| `/api/correspondence` | POST | Detailed HNW inquiry form with lead scoring |
| `/api/strapi-webhook` | POST | Strapi CMS webhook handler |
| `/api/n8n/trigger` | POST | Programmatic workflow triggers |
| `/api/n8n/trigger` | GET | n8n configuration status |

### Workflow Types

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

#### Lead Enrichment Workflow
- **Trigger**: Programmatic via `/api/n8n/trigger`
- **Actions**: Data enrichment, background checks, company research

### n8n Setup

1. **Deploy n8n:**
   ```bash
   docker run -it --rm \
     --name n8n \
     -p 5678:5678 \
     -v ~/.n8n:/home/node/.n8n \
     n8nio/n8n
   ```

2. **Create Webhooks:**
   - Create webhook nodes in n8n for each workflow
   - Copy webhook URLs to environment variables
   - Set `N8N_WEBHOOK_SECRET` for security

3. **Import Workflows:**
   - Import workflow files from `/workflows/` directory
   - Activate workflows in n8n UI
   - Test with sample payloads

### Testing

```bash
# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "inquiryType": "general",
    "message": "Test message"
  }'

# Test n8n trigger endpoint
curl -X POST http://localhost:3000/api/n8n/trigger \
  -H "Content-Type: application/json" \
  -d '{
    "workflow": "contact_form",
    "formData": {
      "name": "Test",
      "email": "test@example.com",
      "inquiryType": "general",
      "message": "Test"
    }
  }'

# Check n8n status
curl http://localhost:3000/api/n8n/trigger
```

For detailed n8n documentation, see [docs/N8N_INTEGRATION.md](./docs/N8N_INTEGRATION.md).

---

## CMS Integration

The website uses **Strapi v5** as its headless CMS for content management.

### Content Types
- **Posts**: Blog posts, perspectives, and news articles
- **Pages**: Dynamic page content (optional)

### Configuration
Set the following environment variables:
```bash
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_here
STRAPI_WEBHOOK_SECRET=your_webhook_secret_here
```

### Fetching Content
Content is fetched from Strapi using the REST API:
- Posts listing: `GET /api/posts?populate=*`
- Single post: `GET /api/posts/:slug?populate=*`

### Strapi Webhook (`/api/strapi-webhook`)

Receives events from Strapi CMS when content is published/updated.

**Events Handled:**
- `entry.publish` - New content published
- `entry.update` - Existing content updated
- `entry.create` - New entry created
- `entry.unpublish` - Content unpublished

**Security:**
- Verifies `x-strapi-webhook-secret` header against `STRAPI_WEBHOOK_SECRET`

**n8n Integration:**
- Forwards post data to `N8N_CONTENT_WEBHOOK_URL`
- Triggers content distribution workflows
- Payload includes post metadata, URL, and publish timestamp

---

## Security

- ✅ Password protection via Next.js middleware
- ✅ Rate limiting (5 requests/minute for contact, 3 for correspondence)
- ✅ Input validation with Zod
- ✅ Server-side form processing
- ✅ HTTP-only session cookies
- ✅ Secure cookie flags
- ✅ Webhook secret verification
- ✅ CSRF protection on forms

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
│       ├── contact/route.ts      # Contact form with n8n
│       ├── correspondence/       # Detailed inquiry form
│       │   └── route.ts
│       ├── strapi-webhook/       # CMS webhook handler
│       │   └── route.ts
│       ├── n8n/trigger/          # n8n workflow triggers
│       │   └── route.ts
│       └── auth/
│           ├── verify/route.ts
│           └── logout/route.ts
├── components/
│   ├── language-switcher.tsx     # Language selector UI
│   └── theme-provider.tsx        # Theme context
├── lib/                          # Utility libraries
│   ├── utils.ts                  # Utilities
│   ├── n8n.ts                    # n8n client library ⭐
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
├── docs/                         # Documentation
│   └── N8N_INTEGRATION.md        # n8n integration guide ⭐
├── middleware.ts                 # Auth middleware + i18n routing
├── workflows/                    # n8n workflow JSON files
├── public/
│   └── images/                   # Art images
├── Dockerfile
├── cloudbuild.yaml
└── next.config.mjs
```

### Key Files for n8n Integration

| File | Purpose |
|------|---------|
| `lib/n8n.ts` | n8n client library - workflow triggers, status checks |
| `app/api/n8n/trigger/route.ts` | API endpoint for programmatic workflow triggers |
| `app/api/contact/route.ts` | Contact form with n8n integration |
| `app/api/correspondence/route.ts` | Detailed inquiry form with lead scoring |
| `app/api/strapi-webhook/route.ts` | CMS webhook handler with n8n forwarding |
| `docs/N8N_INTEGRATION.md` | Complete n8n integration documentation |

### Key Folders Explained

| Folder | Purpose |
|--------|---------|
| `messages/` | Internationalization translations (JSON) for English, Spanish, French |
| `i18n/` | next-intl configuration files for routing and locale management |
| `lib/` | Utility libraries including n8n client |
| `lib/db/` | GCP Cloud SQL PostgreSQL connection pool configuration |
| `database/` | SQL migrations and database setup documentation |
| `docs/` | Project documentation including n8n integration guide |
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
