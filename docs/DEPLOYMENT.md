# Deployment Guide

## SLOANE / Adler Website

## Quick Start

### Prerequisites

- Node.js 22+
- npm or pnpm
- Google Cloud SDK (for GCP deployment)
- Vercel CLI (optional): `npm i -g vercel`

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Vercel Deployment (Current)

### Automatic Deployment

1. Connect GitHub repository to Vercel
2. Push to `main` branch
3. Vercel automatically builds and deploys

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Environment Variables (Vercel)

Set in Vercel Dashboard → Project Settings → Environment Variables:

```
SITE_PASSWORD=your-secure-password
DB_HOST=/cloudsql/project:region:instance
DB_PASSWORD=your-db-password
RESEND_API_KEY=re_your_key
N8N_WEBHOOK_URL=https://n8n.example.com/webhook
```

## GCP Cloud Run Deployment

### 1. Enable APIs

```bash
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### 2. Build and Deploy

```bash
# Submit build to Cloud Build
gcloud builds submit --config cloudbuild.yaml

# Or deploy directly
gcloud run deploy sloaneadler \
  --source . \
  --region=us-central1 \
  --allow-unauthenticated \
  --set-env-vars="SITE_PASSWORD=your-password,DB_HOST=/cloudsql/..."
```

### 3. Configure Cloud SQL

```bash
# Add Cloud SQL connection
gcloud run services update sloaneadler \
  --add-cloudsql-instances=your-project:us-central1:ike-db-instance \
  --region=us-central1
```

## Database Setup

### Local Development

```bash
# Use Cloud SQL Proxy for local DB connection
./cloud-sql-proxy --port 5432 your-project:us-central1:ike-db-instance

# Set environment
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=ike_website_db
export DB_USER=db_user
export DB_PASSWORD=your-password
```

### Production

Run migrations:
```bash
gcloud sql connect ike-db-instance --user=db_user --database=ike_website_db

# Then run SQL from database/migrations/001_initial_schema.sql
```

## Domain Configuration

### Vercel

1. Add domain in Vercel Dashboard → Domains
2. Configure DNS records:
   - A Record: `@` → Vercel IPs
   - CNAME: `www` → cname.vercel-dns.com

### GCP Cloud Run

```bash
# Map custom domain
gcloud run domain-mappings create \
  --service=sloaneadler \
  --domain=sloaneadler.com \
  --region=us-central1
```

## SSL/TLS

### Vercel
- Automatic SSL certificates via Let's Encrypt
- No configuration needed

### GCP Cloud Run
- Automatic SSL for custom domains
- Managed certificates

## Rollback Procedure

### Vercel
```bash
# Rollback via CLI
vercel rollback [deployment-url]

# Or use Vercel Dashboard → Deployments → Redeploy
```

### GCP Cloud Run
```bash
# List revisions
gcloud run revisions list --service=sloaneadler

# Rollback to specific revision
gcloud run services update-traffic sloaneadler \
  --to-revisions=REVISION_NAME=100 \
  --region=us-central1
```

## Health Checks

### Endpoint
```
GET /api/health
```

### Expected Response
```json
{
  "status": "healthy",
  "timestamp": "<ISO8601-timestamp>"
}
```

## Troubleshooting

### Build Failures

```bash
# Check build locally
npm run build

# Clear cache and rebuild
rm -rf .next
npm run build
```

### Database Connection Issues

1. Verify Cloud SQL Proxy is running (local)
2. Check service account permissions
3. Verify connection name format: `project:region:instance`

### 500 Errors

1. Check Vercel/GCP logs
2. Verify environment variables
3. Check database connectivity

## Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates active
- [ ] Custom domain configured
- [ ] Analytics enabled
- [ ] Error tracking configured (Sentry optional)
- [ ] Backups scheduled (Cloud SQL)
- [ ] Health checks passing

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Cloud Run Docs**: https://cloud.google.com/run/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
