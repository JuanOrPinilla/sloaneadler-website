# API Documentation

## SLOANE / Adler Website

## Authentication

### POST /api/auth/verify

Verify password and set session cookie.

**Request:**
```json
{
  "password": "string"
}
```

**Response (Success):**
```json
{
  "success": true
}
```

**Response (Error):**
```json
{
  "error": "Invalid password"
}
```

**Cookies Set:**
- `site_session=authenticated` (HTTP-only, 7 days)

### POST /api/auth/logout

Clear session cookie.

**Response:**
```json
{
  "success": true
}
```

## Contact Form

### POST /api/contact

Submit contact form.

**Request:**
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "company": "string (optional)",
  "inquiry_type": "string (required: 'speaking' | 'advisory' | 'general')",
  "message": "string (required, min 10 chars)"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you for your submission"
}
```

**Response (Error):**
```json
{
  "error": "Invalid input",
  "details": ["Message must be at least 10 characters"]
}
```

**Rate Limit:** 5 requests per minute per IP

**Webhooks:** Sends to N8N_WEBHOOK_URL if configured

## Correspondence (HNW Inquiry)

### POST /api/correspondence

Submit detailed High Net Worth inquiry form.

**Request:**
```json
{
  "name": "string (required)",
  "organization": "string (optional)",
  "email": "string (required, email format)",
  "phone": "string (optional)",
  "context": "string (required, inquiry context/details)",
  "inquiryType": "string (required: 'wealth' | 'advisory' | 'partnership' | 'other')",
  "priority": "string (optional: 'low' | 'medium' | 'high' | 'urgent', default: 'medium')"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Your inquiry has been received"
}
```

**Response (Error):**
```json
{
  "error": "Invalid input",
  "details": ["Email is required", "Context must be at least 10 characters"]
}
```

**Rate Limit:** 3 requests per minute per IP

## CMS Webhook

### POST /api/strapi-webhook

Handle CMS webhook events from Strapi.

**Headers:**
```
X-Strapi-Webhook-Secret: <webhook-secret>
```

**Request:**
```json
{
  "event": "entry.publish | entry.update",
  "model": "string",
  "entry": {
    "id": "string",
    "attributes": {}
  }
}
```

**Response (Success):**
```json
{
  "success": true,
  "metadata": {
    "event": "entry.publish",
    "model": "article",
    "timestamp": "<ISO8601-timestamp>"
  }
}
```

**Response (Error):**
```json
{
  "error": "Invalid webhook secret"
}
```

**Supported Events:**
- `entry.publish` - Content published
- `entry.update` - Content updated

## n8n Workflow Trigger

### POST /api/n8n/trigger

Trigger n8n workflow automations.

**Request:**
```json
{
  "workflow": "string (required, name of the workflow to trigger)",
  "data": {
    "key": "value"
  },
  "wait": {
    "enabled": false,
    "timeout": 30
  }
}
```

**Response (Success):**
```json
{
  "success": true,
  "execution": {
    "id": "string",
    "workflowName": "string",
    "status": "running | completed | failed",
    "startedAt": "<ISO8601-timestamp>",
    "finishedAt": "<ISO8601-timestamp>"
  }
}
```

**Response (Error):**
```json
{
  "error": "Workflow not found"
}
```

## Health Check

### GET /api/health

Check service health and system status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "<ISO8601-timestamp>",
  "uptime": 3600
}
```

**Fields:**
- `status`: Current service status (`healthy`, `degraded`, `unhealthy`)
- `timestamp`: ISO 8601 formatted timestamp
- `uptime`: Server uptime in seconds

## Error Handling

All API endpoints return consistent error formats:

```json
{
  "error": "Error description",
  "code": "ERROR_CODE",
  "details": {}
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid password) |
| 429 | Too Many Requests (rate limit) |
| 500 | Internal Server Error |

## Rate Limiting

| Endpoint | Limit |
|----------|-------|
| Contact form | 5 requests/minute per IP |
| Correspondence | 3 requests/minute per IP |
| Auth endpoints | 10 requests/minute per IP |

Headers returned:
```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 4
X-RateLimit-Reset: 1709553600
```

## Authentication Middleware

Protected routes require valid session cookie:
- `site_session=authenticated`

Public routes (no auth required):
- `/access`
- `/api/auth/verify`
- `/api/auth/logout`
- `/api/health`
- `/api/contact`
- `/api/correspondence`
- `/api/strapi-webhook`
- `/api/n8n/trigger`

## Database Schema

See [database/migrations/001_initial_schema.sql](../database/migrations/001_initial_schema.sql) for complete schema.

### Key Tables

- `user_accounts` - User authentication
- `user_sessions` - Session management
- `contact_submissions` - Form submissions
- `correspondence_submissions` - HNW inquiry submissions
- `audit_logs` - Security audit trail

## Environment Variables

API behavior is controlled by environment variables:

```bash
SITE_PASSWORD=password123!          # Access password
DB_HOST=/cloudsql/...               # Database host
DB_PASSWORD=...                     # Database password
N8N_WEBHOOK_URL=https://...         # Automation webhook
N8N_WEBHOOK_SECRET=...              # Webhook verification
STRAPI_WEBHOOK_SECRET=...           # Strapi webhook secret
RESEND_API_KEY=re_...               # Email API key
CONTACT_EMAIL=contact@sloaneadler.com  # Notification email
```
