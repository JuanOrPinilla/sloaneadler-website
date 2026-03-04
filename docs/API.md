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

## Health Check

### GET /api/health

Check service health.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "<ISO8601-timestamp>"
}
```

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

- Contact form: 5 requests/minute per IP
- Auth endpoints: 10 requests/minute per IP

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

## Database Schema

See [database/migrations/001_initial_schema.sql](../database/migrations/001_initial_schema.sql) for complete schema.

### Key Tables

- `user_accounts` - User authentication
- `user_sessions` - Session management
- `contact_submissions` - Form submissions
- `audit_logs` - Security audit trail

## Environment Variables

API behavior is controlled by environment variables:

```bash
SITE_PASSWORD=password123!          # Access password
DB_HOST=/cloudsql/...               # Database host
DB_PASSWORD=...                     # Database password
N8N_WEBHOOK_URL=https://...         # Automation webhook
N8N_WEBHOOK_SECRET=...              # Webhook verification
RESEND_API_KEY=re_...               # Email API key
CONTACT_EMAIL=contact@sloaneadler.com  # Notification email
```
