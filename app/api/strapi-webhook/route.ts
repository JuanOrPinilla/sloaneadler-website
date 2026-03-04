import { NextRequest, NextResponse } from 'next/server';

interface StrapiWebhookPayload {
  event: 'entry.create' | 'entry.update' | 'entry.delete' | 'entry.publish' | 'entry.unpublish';
  model: string;
  entry: {
    id: number;
    documentId?: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    status?: 'draft' | 'published';
    publishedAt?: string;
    [key: string]: unknown;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret from header
    const webhookSecret = request.headers.get('x-strapi-webhook-secret');
    if (webhookSecret !== process.env.STRAPI_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: StrapiWebhookPayload = await request.json();
    const { event, model, entry } = body;

    // Only process post events
    if (model !== 'post') {
      return NextResponse.json({ message: 'Not a post event, skipping' });
    }

    // Only process published posts for content distribution
    if (event === 'entry.publish' || (entry.status === 'published' && (event === 'entry.create' || event === 'entry.update'))) {
      const n8nPayload = {
        post: {
          id: entry.id,
          documentId: entry.documentId,
          title: entry.title,
          slug: entry.slug,
          excerpt: entry.excerpt,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${entry.slug}`,
          status: entry.status,
          publishedAt: entry.publishedAt,
        },
        meta: {
          source: 'strapi-cms',
          site: 'sloaneadler',
          timestamp: new Date().toISOString(),
          webhookType: event,
          model,
        },
      };

      const n8nWebhookUrl = process.env.N8N_CONTENT_WEBHOOK_URL;
      if (n8nWebhookUrl) {
        const n8nResponse = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET || '',
          },
          body: JSON.stringify(n8nPayload),
        });

        if (!n8nResponse.ok) {
          console.error('n8n webhook failed:', await n8nResponse.text());
          return NextResponse.json({ error: 'Failed to notify n8n' }, { status: 500 });
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Post processed and sent to n8n',
        postId: entry.id,
        event,
      });
    }

    return NextResponse.json({
      message: 'Event processed but not forwarded (not a publish event)',
      event,
    });

  } catch (error) {
    console.error('Strapi webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ status: 'Strapi webhook endpoint active' });
}
