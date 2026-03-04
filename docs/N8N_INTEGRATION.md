# n8n Integration Guide

Complete guide for n8n automation integration with the Sloane Adler website.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [Workflows](#workflows)
- [API Endpoints](#api-endpoints)
- [Client Library](#client-library)
- [Security](#security)
- [Troubleshooting](#troubleshooting)

---

## Overview

n8n is a workflow automation platform that connects the Sloane Adler website with:

- **HubSpot CRM** - Contact management and lead tracking
- **Slack** - Real-time notifications for inquiries
- **PostgreSQL** - Workflow execution history and data persistence
- **AWS S3** - Backup storage for workflows
- **Resend** - Email notifications
- **Strapi CMS** - Content distribution automation

### Supported Workflows

| Workflow | Trigger | Description |
|----------|---------|-------------|
| Contact Form | `POST /api/contact` | General inquiries, basic lead capture |
| Correspondence | `POST /api/correspondence` | Detailed HNW inquiries with lead scoring |
| Content Publish | `POST /api/strapi-webhook` | Auto-distribute blog posts |
| Lead Enrichment | `POST /api/n8n/trigger` | Enhanced lead data enrichment |
| Custom | `POST /api/n8n/trigger` | Programmatic workflow triggers |

---

## Architecture

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

---

## Configuration

### Environment Variables

```bash
# Required
N8N_BASE_URL=https://automation.sloaneadler.com
N8N_WEBHOOK_URL=https://automation.sloaneadler.com/webhook/contact
N8N_CONTENT_WEBHOOK_URL=https://automation.sloaneadler.com/webhook/content-publish

# Optional but recommended
N8N_API_KEY=n8n_api_your_api_key_here
N8N_WEBHOOK_SECRET=your-webhook-secret-key

# Integrations
HUBSPOT_API_KEY=pat-na1-your-key
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET_NAME=sloaneadler-n8n-backups

# Database (for n8n internal use)
N8N_DB_HOST=localhost
N8N_DB_NAME=n8n_workflows
N8N_DB_USER=n8n_user
N8N_DB_PASSWORD=secure_password
N8N_DATABASE_URL=postgresql://n8n_user:...@localhost:5432/n8n_workflows
```

### Setup Steps

1. **Deploy n8n**
   ```bash
   # Using Docker
   docker run -it --rm \
     --name n8n \
     -p 5678:5678 \
     -v ~/.n8n:/home/node/.n8n \
     n8nio/n8n
   ```

2. **Configure Webhook URLs**
   - Create webhooks in n8n for each workflow
   - Copy webhook URLs to environment variables
   - Set webhook secret for security

3. **Import Workflows**
   - Import workflow files from `/workflows/` directory
   - Activate workflows in n8n UI
   - Test with sample payloads

---

## Workflows

### 1. Contact Form Workflow

**Trigger:** `N8N_WEBHOOK_URL`

**Payload:**
```json
{
  "formData": {
    "name": "John Doe",
    "email": "john@example.com",
    "inquiryType": "advisory",
    "message": "Interested in family office services"
  },
  "meta": {
    "source": "sloaneadler-website",
    "formId": "contact",
    "timestamp": "2024-01-15T10:30:00Z",
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0..."
  }
}
```

**Actions:**
1. Validate webhook secret
2. Create/Update HubSpot contact
3. Send Slack notification
4. Log to PostgreSQL
5. Send confirmation email (if opted in)

### 2. Correspondence Workflow

**Trigger:** `N8N_WEBHOOK_URL` with `formId: "correspondence"`

**Enhanced Payload:**
```json
{
  "formData": {
    "name": "Jane Smith",
    "organization": "Smith Family Office",
    "email": "jane@smithfo.com",
    "inquiryType": "family-office",
    "familyOfficeType": "single",
    "aum": "250m-1b",
    "urgency": "high",
    "message": "Looking for multi-generational advisory"
  },
  "meta": {
    "source": "sloaneadler-website",
    "formId": "correspondence",
    "leadScore": 85,
    "isHighValueLead": true
  }
}
```

**Actions:**
1. Lead scoring evaluation
2. HubSpot contact + company creation
3. Deal creation for high-value leads
4. Slack notification with lead score
5. Priority routing based on urgency

### 3. Content Distribution Workflow

**Trigger:** `N8N_CONTENT_WEBHOOK_URL`

**Payload:**
```json
{
  "post": {
    "id": 123,
    "title": "Family Office Trends 2024",
    "slug": "family-office-trends-2024",
    "excerpt": "Key insights for...",
    "url": "https://sloaneadler.com/posts/family-office-trends-2024",
    "publishedAt": "2024-01-15T10:00:00Z"
  },
  "meta": {
    "source": "strapi-cms",
    "site": "sloaneadler",
    "webhookType": "entry.publish"
  }
}
```

**Actions:**
1. Generate social media posts
2. Send email newsletter
3. Post to LinkedIn/Twitter
4. Notify subscribers
5. Update search index

---

## API Endpoints

### Trigger Workflow Programmatically

```typescript
POST /api/n8n/trigger

{
  "workflow": "contact_form",  // or "content_publish", "lead_enrichment"
  "formData": { ... },         // for contact workflows
  "post": { ... },             // for content workflows  
  "lead": { ... },             // for lead enrichment
  "meta": { ... }              // additional metadata
}
```

### Get n8n Status

```typescript
GET /api/n8n/trigger

// Response
{
  "status": "active",
  "configured": true,
  "workflows": {
    "contact_form": true,
    "content_publish": true,
    "lead_enrichment": true
  }
}
```

---

## Client Library

### Basic Usage

```typescript
import { 
  triggerContactWorkflow,
  triggerContentWorkflow,
  triggerLeadEnrichment,
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
console.log(status.configured); // true/false
```

### Advanced Usage

```typescript
import { triggerWorkflow, listWorkflows } from '@/lib/n8n';

// Custom workflow trigger
const result = await triggerWorkflow('custom', {
  formData: { ... },
  meta: { source: 'custom-integration' }
});

// List workflows via API
const workflows = await listWorkflows();
```

---

## Security

### Webhook Security

1. **Secret Verification**
   - All webhooks verify `X-Webhook-Secret` header
   - Secret stored in `N8N_WEBHOOK_SECRET`

2. **API Key Authentication**
   - n8n API calls use `X-N8N-API-KEY` header
   - Key stored in `N8N_API_KEY`

3. **Rate Limiting**
   - Contact form: 5 requests/minute
   - Correspondence: 3 requests/minute
   - Strapi webhook: No limit (internal)

### Data Protection

- IP addresses logged for rate limiting only
- No PII stored in n8n execution logs
- HubSpot API uses OAuth 2.0 / Private App tokens
- S3 backups encrypted with SSE-S3

---

## Troubleshooting

### Common Issues

**Webhook not triggering:**
```bash
# Check if n8n is configured
GET /api/n8n/trigger

# Verify environment variables
echo $N8N_WEBHOOK_URL
```

**Authentication failures:**
- Verify `N8N_WEBHOOK_SECRET` matches n8n webhook settings
- Check API key has correct permissions

**Rate limit exceeded:**
- Wait 1 minute before retrying
- Use Redis in production for distributed rate limiting

### Debug Logging

Enable verbose logging:
```bash
# .env.local
DEBUG=n8n:*
```

### Testing Workflows

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
```

---

## Maintenance

### Backup Workflows

Automated backup to S3 (configured in n8n):
- Frequency: Daily
- Retention: 30 days
- Encryption: AES-256

### Monitoring

Monitor these endpoints:
- `GET /api/health` - Website health
- `GET /api/n8n/trigger` - n8n configuration status
- `GET /api/strapi-webhook?check=config` - Webhook status

### Updates

1. Test n8n updates in staging
2. Export workflows before updates
3. Update via Docker image tag
4. Verify webhooks are still registered

---

*Last updated: March 2026*
