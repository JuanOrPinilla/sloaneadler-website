# SLOANE / Adler - Technical Specification

## Overview
Family office and advisory firm website with secure correspondence forms and password protection.

## Default Access Credentials
- **Password:** `password123!`
- Can be overridden by setting `SITE_PASSWORD` environment variable

## Architecture

### Tech Stack
- **Framework**: Next.js 16.0.10
- **Runtime**: React 19.2.0
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: shadcn/ui (New York style)
- **Authentication**: Custom middleware-based password protection
- **Form Handling**: Server-side API routes with Zod validation
- **Email**: Resend integration ready
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
5. Server validates against password (default: "password123!")
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
# Optional: Override default password
SITE_PASSWORD=your_custom_password

# Required for email notifications
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL=correspondence@sloaneadler.com

# Optional: n8n webhook
N8N_WEBHOOK_URL=https://your-n8n.com/webhook/contact-form
N8N_WEBHOOK_SECRET=your-webhook-secret
```

## API Endpoints

### POST /api/auth/verify
Authenticates user and sets session cookie.

**Request:**
```json
{
  "password": "password123!"
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
  --allow-unauthenticated
```

### Email Setup (Resend)
1. Sign up at https://resend.com
2. Create API key
3. Set `RESEND_API_KEY` environment variable
4. Configure `CONTACT_EMAIL` for notifications

## Languages
The site supports multiple languages via the footer selector:
- English (default)
- Spanish
- French

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
