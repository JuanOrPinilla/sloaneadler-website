# Monthly Operating Costs

**Project:** Sloane Adler Website  
**Analysis Date:** March 4, 2026  

---

## 💰 Total Monthly Cost Estimate

| Scenario | Monthly Cost | Annual Cost |
|----------|--------------|-------------|
| **Minimal (Hobby/Dev)** | $18 - $42 | $216 - $504 |
| **Standard (Production)** | $95 - $220 | $1,140 - $2,640 |
| **Enterprise (High Traffic)** | $400 - $850 | $4,800 - $10,200 |

**Higher costs due to:** HNW integrations (HubSpot, Slack), correspondence forms, premium features.

---

## 📊 Cost Breakdown by Service

### 1. Hosting (Vercel)

| Plan | Monthly Cost |
|------|--------------|
| **Hobby** | $0 |
| **Pro** | $20 |
| **Enterprise** | Custom |

---

### 2. CMS Hosting (Strapi)

| Option | Monthly Cost | Notes |
|--------|--------------|-------|
| **Self-Hosted** | $10 - $50 | |
| **Strapi Cloud Starter** | $9 | |
| **Strapi Cloud Growth** | $29 | |
| **Strapi Cloud Pro** | $99 | High-res image storage |

---

### 3. Automation (n8n)

| Option | Monthly Cost |
|--------|--------------|
| **Self-Hosted** | $5 - $20 |
| **n8n Cloud Starter** | $20 |
| **n8n Cloud Pro** | $50 |

**Higher usage due to:** HubSpot integration, Slack notifications, correspondence workflows.

---

### 4. CRM Integration (HubSpot)

| Plan | Monthly Cost | Contacts |
|------|--------------|----------|
| **Free** | $0 | Up to 1M |
| **Starter** | $18 | 1,000 |
| **Professional** | $800 | 2,000 |

**Recommendation:** Free tier sufficient for most artists (~$0/month).

---

### 5. Database

| Option | Monthly Cost |
|--------|--------------|
| **Upstash Redis Free** | $0 |
| **Cloud SQL PostgreSQL** | $7 - $25 |
| **AWS RDS** | $13 - $35 |

---

### 6. Email (Resend)

| Volume | Monthly Cost |
|--------|--------------|
| **Free (3,000 emails)** | $0 |
| **Higher volume** | $0.0001/email |

---

### 7. Notifications (Slack)

| Plan | Monthly Cost |
|------|--------------|
| **Free** | $0 |
| **Pro** | $7.25/user |

**Recommendation:** Free tier sufficient for notifications (~$0/month).

---

### 8. Monitoring & Analytics

| Service | Monthly Cost |
|---------|--------------|
| **Vercel Analytics** | $0 (with Pro) |
| **Sentry Developer** | $0 |
| **Sentry Team** | $26 |
| **Google Analytics** | $0 |

---

### 9. Domain & SSL

| Item | Monthly Cost |
|------|--------------|
| **.com Domain** | ~$1 |
| **Wildcard SSL** | $4 - $12 |

---

## 📈 Cost by Scenario

### Scenario A: Development

| Service | Monthly Cost |
|---------|--------------|
| Vercel Hobby | $0 |
| Strapi Self-Hosted | $10 |
| n8n Self-Hosted | $5 |
| HubSpot Free | $0 |
| Upstash Redis Free | $0 |
| Resend Free | $0 |
| Slack Free | $0 |
| Domain | $1 |
| **Total** | **~$16/month** |

---

### Scenario B: Production (Recommended)

| Service | Monthly Cost |
|---------|--------------|
| Vercel Pro | $20 |
| Strapi Cloud Growth | $29 |
| n8n Self-Hosted | $10 |
| HubSpot Free | $0 |
| Cloud SQL PostgreSQL | $15 |
| Upstash Redis | $10 |
| Resend | $5 |
| Slack Free | $0 |
| Sentry Team | $26 |
| Domain | $2 |
| **Total** | **~$117/month** |

---

### Scenario C: High Traffic (Art Gallery)

| Service | Monthly Cost |
|---------|--------------|
| Vercel Enterprise | $150+ |
| Strapi Cloud Pro | $99 |
| n8n Cloud Pro | $50 |
| HubSpot Starter | $18 |
| Cloud SQL (larger) | $50 |
| Upstash Redis | $30 |
| Resend | $20 |
| Slack Pro | $15 |
| Sentry Business | $80 |
| Domain + SSL | $10 |
| **Total** | **~$522/month** |

---

## 🔧 Annual Maintenance

| Service | Annual Cost | Monthly Equivalent |
|---------|-------------|-------------------|
| **Security Updates** | $2,500 - $5,000 | $210 - $415 |
| **Dependency Updates** | $1,000 - $2,000 | $85 - $165 |
| **Feature Additions** | $3,000 - $6,000 | $250 - $500 |
| **Bug Fixes** | $1,500 - $3,000 | $125 - $250 |
| **Total** | **$8,000 - $16,000** | **~$670 - $1,330/month** |

---

## 💡 Cost-Saving Tips

### 1. HNW Lead Optimization
- Use HubSpot free tier initially
- Implement lead scoring to focus on quality
- Automate low-value lead filtering

### 2. Image Storage
- Use Strapi's built-in media library
- Optimize images before upload
- Implement CDN caching

### 3. Workflow Efficiency
- Batch n8n operations
- Use efficient database queries
- Cache frequently accessed data

### 4. Monitor Usage
- Track HubSpot contact growth
- Monitor n8n execution counts
- Set up billing alerts

---

## 📋 Recommended Production Stack

| Service | Monthly Cost | Notes |
|---------|--------------|-------|
| Vercel Pro | $20 | Production hosting |
| Strapi Cloud Growth | $29 | CMS with image storage |
| n8n Self-Hosted | $10 | Automation |
| HubSpot Free | $0 | CRM (up to 1M contacts) |
| Cloud SQL | $15 | Database |
| Upstash Redis | $10 | Caching |
| Resend | $5 | Email |
| Slack Free | $0 | Notifications |
| Sentry Team | $26 | Error tracking |
| Domain | $2 | .com |
| **Total** | **~$119/month** | |

---

## 🎯 ROI for Art Sales

| Metric | Value |
|--------|-------|
| Monthly Operating Cost | $119 |
| Annual Operating Cost | $1,428 |
| **Average Art Commission** | $10,000 |
| **Sales Needed to Break Even** | 0.14/year (1 per 7 years) |
| **Sales Needed/Month** | 0.012 |

**Conclusion:** A single art sale every 7 years covers all operating costs.

---

## 📚 Sources

- Vercel: vercel.com/pricing
- Strapi Cloud: strapi.io/pricing-cloud
- n8n: n8n.io/pricing
- HubSpot: hubspot.com/pricing
- Upstash: upstash.com/pricing
- Resend: resend.com/pricing
- Slack: slack.com/pricing
- Sentry: sentry.io/pricing

---

*Last Updated: March 4, 2026*
