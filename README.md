# SLOANE / Adler

Stewardship across generations. Advisory counsel for families, enterprises, and institutions.

## Overview

Advisory counsel for families, enterprises, and institutions across capital, reputation, governance, and continuity.

## Access Credentials

- **Password:** `password123!`
- Can be customized by setting the `SITE_PASSWORD` environment variable

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

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

**Default Password:** `password123!`

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
  --allow-unauthenticated
```

## Email Setup (Resend)

To enable email notifications for form submissions:

1. Sign up at [https://resend.com](https://resend.com)
2. Create an API key
3. Set the environment variable:
   ```bash
   RESEND_API_KEY=re_your_api_key
   CONTACT_EMAIL=correspondence@sloaneadler.com
   ```

## Environment Variables

Optional:
- `SITE_PASSWORD` - Custom password (default: "password123!")
- `RESEND_API_KEY` - Resend API key for email
- `CONTACT_EMAIL` - Email address for notifications
- `N8N_WEBHOOK_URL` - n8n webhook endpoint
- `N8N_WEBHOOK_SECRET` - Webhook verification secret

## Languages

The site includes language selector buttons in the footer:
- English (default)
- Spanish
- French

## Security

- Password protection via Next.js middleware
- Rate limiting (5 requests/minute)
- Input validation with Zod
- Server-side form processing
- HTTP-only session cookies

## Documentation

- [Technical Specification](./TECHNICAL_SPEC.md)
