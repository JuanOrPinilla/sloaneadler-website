# n8n Workflows

Production workflow definitions for n8n automation platform.

## Files

| File | Purpose | Trigger |
|------|---------|---------|
| `n8n-workflow-contact-form.json` | Contact form submission handler | HTTP Webhook |
| `n8n-workflow-email-processing.json` | Email ingestion for correspondence@sloaneadler.com | Email/IMAP |
| `n8n-workflow-social-media-automation.json` | Multi-platform social media posting | Schedule/API |

## Import Instructions

1. Open n8n UI at `https://n8n.yourdomain.com`
2. Go to **Workflows** → **Import from File**
3. Select the JSON file
4. Configure credentials (Resend, HubSpot, Social APIs)
5. Activate workflow

## Lead Scoring

Contact form workflow includes AI-powered lead scoring optimized for:
- Family offices
- High-net-worth families
- Institutional investors
- Generational wealth advisory

## Related Documentation

- See main README.md for environment variables
- See TECHNICAL_SPEC.md for deployment details
