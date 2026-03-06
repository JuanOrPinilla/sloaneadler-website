# CMS Integration Guide

## Strapi v5 Integration for SLOANE / Adler Website

---

## Overview

The website uses **Strapi v5** as its headless CMS for content management including blog posts, perspectives, and news articles.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Strapi CMS Instance                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  Posts   │  │ Authors  │  │Categories│  │  Media   │            │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘            │
│       └─────────────┴─────────────┴─────────────┘                   │
│                              │                                      │
│                       Webhook Trigger                               │
└──────────────────────────────┼──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Next.js Website                                │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                     lib/strapi.ts                             │ │
│  │  • Axios-based HTTP client                                    │ │
│  │  • Type-safe API responses                                    │ │
│  │  • Error handling & retries                                   │ │
│  └────────────────────────┬──────────────────────────────────────┘ │
│                           │                                         │
│       ┌───────────────────┼───────────────────┐                    │
│       ▼                   ▼                   ▼                    │
│  ┌──────────┐       ┌──────────┐       ┌──────────┐               │
│  │   News   │       │ Authors  │       │ Categories              │
│  │  Pages   │       │  Pages   │       │   Pages                 │
│  └──────────┘       └──────────┘       └──────────┘               │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │              /api/strapi-webhook/route.ts                     │ │
│  │  • Receive publish/update events                              │ │
│  │  • Verify webhook secret                                      │ │
│  │  • Forward to n8n for distribution                            │ │
│  └────────────────────────┬──────────────────────────────────────┘ │
│                           │                                         │
│                           ▼                                         │
│                    ┌──────────────┐                                │
│                    │     n8n      │                                │
│                    │ Content Dist │                                │
│                    └──────────────┘                                │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Content Types

### Posts

| Field | Type | Description |
|-------|------|-------------|
| `title` | String | Post title |
| `slug` | String | URL-friendly identifier (unique) |
| `excerpt` | Text | Short summary for previews |
| `content` | Blocks | Rich text content (Strapi Blocks editor) |
| `coverImage` | Media | Featured image |
| `author` | Relation | Post author (→ Authors) |
| `categories` | Relation | Post categories (→ Categories) |
| `tags` | JSON | Array of tag strings |
| `featured` | Boolean | Featured post flag |
| `status` | Enumeration | `published` or `draft` |
| `metaTitle` | String | SEO title |
| `metaDescription` | Text | SEO description |
| `publishedAt` | DateTime | Publication date |

### Authors

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Author name |
| `slug` | String | URL-friendly identifier |
| `bio` | Text | Author biography |
| `avatar` | Media | Profile image |
| `email` | Email | Contact email |

### Categories

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Category name |
| `slug` | String | URL-friendly identifier |
| `description` | Text | Category description |

---

## Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `STRAPI_URL` | **Yes** | `http://localhost:1337` | Strapi CMS API base URL |
| `STRAPI_API_TOKEN` | **Yes** | - | Strapi API authentication token |
| `STRAPI_WEBHOOK_SECRET` | No | - | Secret for verifying Strapi webhooks |

### Client Configuration

The CMS client is configured in `lib/strapi.ts`:

```typescript
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Axios instance with auth header
const strapiClient = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});
```

### Setting Up Strapi

1. **Install Strapi v5:**
   ```bash
   npx create-strapi-app@latest sloaneadler-cms
   cd sloaneadler-cms
   npm run develop
   ```

2. **Create API Token:**
   - Go to Settings → API Tokens
   - Click "Create new API Token"
   - Name: `Website API`
   - Token type: `Full access` or `Custom`
   - Copy the generated token

3. **Add to Environment:**
   ```bash
   # .env.local (website)
   STRAPI_URL=http://localhost:1337
   STRAPI_API_TOKEN=your_api_token_here
   ```

---

## API Usage

### Fetching Posts

```typescript
import { getPosts, getPostBySlug } from '@/lib/strapi';

// List all published posts
const posts = await getPosts({
  populate: '*',
  sort: 'publishedAt:desc',
});

// Get single post by slug
const post = await getPostBySlug('my-post-slug');
```

### Fetching Authors

```typescript
import { getAuthors, getAuthorBySlug } from '@/lib/strapi';

// List all authors
const authors = await getAuthors();

// Get author with posts
const author = await getAuthorBySlug('john-doe', {
  populate: ['posts', 'avatar'],
});
```

### Fetching Categories

```typescript
import { getCategories, getCategoryBySlug } from '@/lib/strapi';

// List all categories
const categories = await getCategories();

// Get category with posts
const category = await getCategoryBySlug('capital', {
  populate: ['posts.coverImage'],
});
```

---

## Webhook Integration

### Webhook Endpoint

**URL**: `/api/strapi-webhook`

**Method**: `POST`

**Headers:**
- `Content-Type: application/json`
- `X-Strapi-Webhook-Secret: your-secret` (optional, if configured)

### Strapi Webhook Configuration

1. Go to Settings → Webhooks
2. Create new webhook:
   - **Name**: Website Content Updates
   - **URL**: `https://sloaneadler.com/api/strapi-webhook`
   - **Headers**: `X-Strapi-Webhook-Secret: your-secret-key`
   - **Events**:
     - ☑️ Entry → Create
     - ☑️ Entry → Update
     - ☑️ Entry → Publish
     - ☑️ Entry → Unpublish
     - ☑️ Entry → Delete

3. Click "Save"

### Webhook Payload

**Entry Publish Event:**
```json
{
  "event": "entry.publish",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "model": "post",
  "entry": {
    "id": 1,
    "documentId": "abc123",
    "title": "Post Title",
    "slug": "post-slug",
    "excerpt": "Post excerpt...",
    "content": [...],
    "status": "published",
    "publishedAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Webhook Processing

The webhook handler:

1. **Verifies secret** (if `STRAPI_WEBHOOK_SECRET` is set)
2. **Filters events** - Only processes `post` model events
3. **Revalidates cache** - Clears Next.js cache for affected pages
4. **Forwards to n8n** - Sends to `N8N_CONTENT_WEBHOOK_URL` for distribution

### n8n Payload

When forwarded to n8n, the payload is enriched:

```json
{
  "post": {
    "id": 1,
    "documentId": "abc123",
    "title": "Post Title",
    "slug": "post-slug",
    "excerpt": "Post excerpt...",
    "url": "https://sloaneadler.com/posts/post-slug",
    "status": "published",
    "publishedAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "locale": "en"
  },
  "meta": {
    "source": "cms",
    "site": "sloaneadler",
    "timestamp": "2024-01-15T10:30:00Z",
    "webhookType": "entry.publish",
    "event": "entry.publish",
    "model": "post"
  }
}
```

---

## Content Distribution

When content is published, n8n workflows can:

1. **Social Media**: Auto-post to LinkedIn
2. **Newsletter**: Send email notifications
3. **Notifications**: Slack alerts for new content
4. **Logging**: Record in PostgreSQL for analytics

### n8n Content Workflow

The content distribution workflow (`workflows/n8n-workflow-content-distribution.json`):

1. Receives webhook from Strapi via `N8N_CONTENT_WEBHOOK_URL`
2. Generates social media posts
3. Sends email newsletter
4. Posts to LinkedIn/Twitter
5. Notifies subscribers
6. Updates search index

See [ARCHITECTURE.md](./ARCHITECTURE.md) for n8n integration details.

---

## TypeScript Types

```typescript
interface Post {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: BlocksContent;
  coverImage?: Media;
  author?: Author;
  categories?: Category[];
  tags?: string[];
  featured: boolean;
  status: 'published' | 'draft';
  metaTitle?: string;
  metaDescription?: string;
  publishedAt: string;
  updatedAt: string;
}

interface Author {
  id: number;
  name: string;
  slug: string;
  bio?: string;
  avatar?: Media;
  email?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}
```

---

## Error Handling

The Strapi client includes built-in error handling:

```typescript
try {
  const post = await getPostBySlug('non-existent');
} catch (error) {
  if (error.response?.status === 404) {
    // Post not found
  } else if (error.response?.status === 401) {
    // Invalid API token
  } else {
    // Network or server error
  }
}
```

---

## Testing

### Test Webhook Endpoint

```bash
# Health check
curl https://sloaneadler.com/api/strapi-webhook

# Test webhook payload
curl -X POST http://localhost:3000/api/strapi-webhook \
  -H "Content-Type: application/json" \
  -H "X-Strapi-Webhook-Secret: your-secret" \
  -d '{
    "event": "entry.publish",
    "model": "post",
    "entry": {
      "id": 1,
      "documentId": "test123",
      "title": "Test Post",
      "slug": "test-post",
      "status": "published"
    }
  }'
```

### Test CMS Client

```bash
# Test Strapi connection
node -e "
const { getPosts } = require('./lib/strapi');
getPosts().then(posts => console.log(\`Found \${posts.length} posts\`));
"
```

---

## Troubleshooting

### Posts Not Loading

1. Check `STRAPI_URL` is correct
2. Verify `STRAPI_API_TOKEN` is valid
3. Ensure posts are published (not drafts)
4. Check Strapi server is running

### Webhook Not Working

1. Verify webhook URL is publicly accessible
2. Check `STRAPI_WEBHOOK_SECRET` matches
3. Review webhook logs in Strapi admin
4. Check Vercel/GCP function logs

### Cache Not Updating

1. Verify webhook is receiving events
2. Check revalidation is triggered
3. Test with `?revalidate=1` query param
4. Manual revalidation: `curl -X POST /api/revalidate`

---

## Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [Strapi Webhooks Guide](https://docs.strapi.io/dev-docs/concepts/webhooks)
- [Next.js ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
