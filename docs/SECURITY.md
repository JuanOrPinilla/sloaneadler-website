# Security Policy

## SLOANE / Adler Website

## Supported Versions

| Version | Supported |
|---------|-----------|
| Current (main) | ✅ Yes |
| Older commits | ❌ No |

## Security Features

### Authentication

- **Password Protection**: Simple cookie-based auth for site access
- **Session Management**: 7-day HTTP-only cookies
- **Default Password**: Change immediately in production via `SITE_PASSWORD` env var

### Data Protection

- **Input Validation**: Zod schema validation on all forms
- **SQL Injection Prevention**: Parameterized queries via `pg` driver
- **XSS Protection**: Content Security Policy headers
- **CSRF Protection**: SameSite cookie attributes

### Headers (via middleware)

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'...
```

## Reporting Security Issues

**Please do not report security issues publicly.**

Instead, email: contact@sloaneadler.com

Include:
- Description of the issue
- Steps to reproduce
- Potential impact
- Suggested fix (optional)

## Security Checklist for Deployment

- [ ] Change default password
- [ ] Use strong database password
- [ ] Enable Cloud SQL SSL
- [ ] Set secure environment variables
- [ ] Enable HSTS (when HTTPS confirmed)
- [ ] Configure proper CORS if needed
- [ ] Review RLS policies
- [ ] Enable audit logging

## Known Limitations

1. **No 2FA**: Current auth is password-only
2. **Rate Limiting**: In-memory (resets on deploy)
3. **Session Storage**: Cookie-based (no server-side invalidation)

## Dependencies

Regular security audits:

```bash
npm audit
npm audit fix
```

## Incident Response

1. Identify scope of breach
2. Rotate all credentials
3. Review audit logs
4. Patch vulnerability
5. Deploy fix
6. Post-incident review
