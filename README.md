# SLOANE / Adler

Stewardship across generations. Advisory counsel for families, enterprises, and institutions.

## Overview

Advisory counsel for families, enterprises, and institutions across capital, reputation, governance, and continuity.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui

## Prerequisites

- Node.js 22+
- npm or pnpm
- Google Cloud SDK (for deployment)

## Development

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your values

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Build

```bash
npm run build
```

## Deployment

### Google Cloud Run (Recommended)

```bash
# Deploy using Cloud Build
gcloud builds submit --config cloudbuild.yaml

# Or deploy directly
gcloud run deploy sloaneadler \
  --source . \
  --region=us-central1 \
  --set-env-vars=SITE_PASSWORD=your_secure_password \
  --allow-unauthenticated
```

### Environment Variables

Required:
- `SITE_PASSWORD` - Password for site access

Optional:
- `N8N_WEBHOOK_URL` - n8n webhook endpoint for form submissions
- `N8N_WEBHOOK_SECRET` - Secret for webhook verification
- `RESEND_API_KEY` - Resend API key for email notifications
- `CONTACT_EMAIL` - Email address for notifications

## Security

This site uses password protection via Next.js middleware. All form submissions include:
- Rate limiting (5 requests/minute)
- Input validation with Zod
- Server-side processing
- Optional n8n webhook integration

## Project Structure

- `app/` - Next.js app router pages
- `app/api/` - API routes for auth and forms
- `components/` - React components
- `middleware.ts` - Authentication middleware

## Documentation

- [Technical Specification](./TECHNICAL_SPEC.md)
