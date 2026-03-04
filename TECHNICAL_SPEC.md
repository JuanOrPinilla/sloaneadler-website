# SLOANE / Adler - Technical Specification

## Overview
Family office and advisory firm website with secure correspondence forms and password protection.

## Architecture

### Tech Stack
- **Framework**: Next.js 16.0.10
- **Runtime**: React 19.2.0
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: shadcn/ui (New York style)
- **Authentication**: Custom middleware-based password protection
- **Form Handling**: Server-side API routes with Zod validation
- **Deployment**: Configured for GCP Cloud Run

### Project Structure
```
app/
├── api/
│   ├── auth/
│   │   ├── verify/route.ts    # Password verification
│   │   └── logout/route.ts    # Session termination
│   └── contact/route.ts       # Correspondence form handler
├── access/page.tsx            # Password gate UI
├── correspondence/page.tsx    # Contact form page
├── approach/page.tsx          # Approach page
├── investor/page.tsx          # Investor page
├── news/page.tsx              # News page
├── policies/page.tsx          # Policies page
├── login/page.tsx             # Login placeholder
├── layout.tsx                 # Root layout
├── page.tsx                   # Home page (heavy)
└── globals.css               # Global styles

components/
└── theme-provider.tsx         # Theme context

middleware.ts                  # Auth middleware
next.config.js                # Next.js configuration
Dockerfile                    # Container definition
cloudbuild.yaml               # CI/CD pipeline
```

## Security

### Authentication Flow
1. User accesses any page
2. Middleware checks for `site_session` cookie
3. If missing/invalid, redirect to `/access`
4. User submits password to `/api/auth/verify`
5. Server validates against `SITE_PASSWORD` env var
6. On success, sets HTTP-only `site_session` cookie
7. User redirected to original destination

### Form Security
- Rate limiting: 5 requests/minute per IP
- Zod schema validation
- CSRF-ready structure
- Input sanitization
- No client-side secrets

### Environment Variables
```bash
SITE_PASSWORD              # Required: Access password
N8N_WEBHOOK_URL           # Optional: n8n webhook endpoint
N8N_WEBHOOK_SECRET        # Optional: Webhook verification
RESEND_API_KEY            # Optional: Email API key
CONTACT_EMAIL             # Optional: Notification email
```

## API Endpoints

### POST /api/auth/verify
Authenticates user and sets session cookie.

**Request:**
```json
{
  "password": "string"
}
```

**Response:**
```json
{
  "success": true
}
```

### POST /api/auth/logout
Clears session cookie.

### POST /api/contact
Submits correspondence form.

**Request:**
```json
{
  "name": "string",
  "organization": "string (optional)",
  "email": "string",
  "inquiryType": "general|advisory|access|press",
  "referralSource": "string (optional)",
  "message": "string"
}
```

**Rate Limit:** 5 requests/minute per IP

## Deployment

### GCP Cloud Run
```bash
# Build and deploy
gcloud builds submit --config cloudbuild.yaml

# Or manual deploy
gcloud run deploy sloaneadler \
  --source . \
  --region=us-central1 \
  --set-env-vars=SITE_PASSWORD=yourpassword \
  --allow-unauthenticated
```

### Environment Setup
1. Create `.env` from `.env.example`
2. Set `SITE_PASSWORD` (required)
3. Configure n8n webhook (optional)
4. Set up Resend API key (optional)

## Performance Notes
- Home page is large (435 lines) - candidate for code splitting
- Static generation for pages
- Server-side API routes
- Middleware for auth

## Monitoring
Health check endpoint: `/api/health`

## Maintenance
- Node.js 22+ required
- Next.js 16 with Turbopack
- No database dependencies
- Stateless architecture
