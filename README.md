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
- [Changelog](#changelog)

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
| Correspondence | `/correspondence` | Contact form with referral source |
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
| `RESEND_API_KEY` | No | - | Resend API key |
| `CONTACT_EMAIL` | No | `correspondence@sloaneadler.com` | Notification email |
| `N8N_WEBHOOK_URL` | No | - | n8n webhook URL |
| `N8N_WEBHOOK_SECRET` | No | - | Webhook secret |

---

## Automation Workflows

Three n8n workflows included:

| Workflow | File | Purpose |
|----------|------|---------|
| Contact Form | `n8n-workflow-contact-form.json` | Process inquiries, family office lead scoring |
| Email Processing | `n8n-workflow-email-processing.json` | Handle correspondence@ inbox |
| Social Media | `n8n-workflow-social-media-automation.json` | Family office advisory content automation |

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
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Navy/gold theme
│   ├── approach/                 # Approach page
│   ├── investor/                 # Investor relations
│   ├── news/                     # News/insights
│   ├── policies/                 # Policies page
│   ├── correspondence/           # Contact form
│   ├── login/                    # Partner portal (WIP)
│   ├── access/                   # Password gate
│   └── api/                      # API routes
│       ├── contact/route.ts
│       └── auth/
│           ├── verify/route.ts
│           └── logout/route.ts
├── components/
│   └── theme-provider.tsx        # Theme context
├── lib/
│   └── utils.ts                  # Utilities
├── middleware.ts                 # Auth middleware
├── public/
│   └── images/                   # Art images
├── n8n-workflow-*.json          # Workflows
├── Dockerfile
├── cloudbuild.yaml
└── next.config.mjs
```

---

## Changelog

### March 4, 2026
- Fixed Next.js 16 `cookies()` Promise requirement
- Added all 3 n8n workflow files
- Enhanced technical documentation

### March 3, 2026
- Added password protection
- Added language selector
- Added GCP deployment setup
- Created n8n workflows

### February 14, 2026
- Updated tagline and navigation
- Implemented live timezone clocks
- Updated footer styling

### December 24, 2025
- Initial repository setup
- First site launch

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
