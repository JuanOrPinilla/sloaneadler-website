import { NextRequest, NextResponse } from 'next/server';
import { triggerContentWorkflow } from '@/lib/n8n';

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

/**
 * POST /api/strapi-webhook
 * 
 * Receive webhooks from Strapi CMS and forward to n8n for content distribution.
 * 
 * Security:
 * - Verifies x-strapi-webhook-secret header against STRAPI_WEBHOOK_SECRET
 * 
 * Events Handled:
 * - entry.publish: New content published
 * - entry.update: Existing content updated
 * - entry.create: New entry created
 * - entry.unpublish: Content unpublished
 * - entry.delete: Content deleted
 * 
 * n8n Integration:
 * - Forwards post data to N8N_CONTENT_WEBHOOK_URL
 * - Triggers automated content distribution workflows
 * - Can notify Slack, send emails, post to social media, etc.
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret from header
    const webhookSecret = request.headers.get('x-strapi-webhook-secret');
    if (webhookSecret !== process.env.STRAPI_WEBHOOK_SECRET) {
      console.error('Strapi webhook: Invalid secret');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: StrapiWebhookPayload = await request.json();
    const { event, model, entry } = body;

    console.log(`Strapi webhook received: ${event} on ${model} (ID: ${entry.id})`);

    // Only process post events
    if (model !== 'post') {
      return NextResponse.json({ 
        message: 'Not a post event, skipping',
        model,
        event,
      });
    }

    // Build post URL
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sloaneadler.com';
    const postUrl = entry.slug ? `${siteUrl}/posts/${entry.slug}` : undefined;

    // Determine if this is a publish event
    const isPublishEvent = 
      event === 'entry.publish' || 
      (entry.status === 'published' && (event === 'entry.create' || event === 'entry.update'));

    // Prepare post data for n8n
    const postData = {
      id: entry.id,
      documentId: entry.documentId,
      title: entry.title,
      slug: entry.slug,
      excerpt: entry.excerpt,
      url: postUrl,
      status: entry.status,
      publishedAt: entry.publishedAt,
      // Include any additional fields from entry
      ...Object.fromEntries(
        Object.entries(entry).filter(([key]) => 
          !['id', 'documentId', 'title', 'slug', 'excerpt', 'status', 'publishedAt'].includes(key)
        )
      ),
    };

    // Trigger n8n content workflow
    const n8nResult = await triggerContentWorkflow(
      postData,
      event,
      model
    );

    if (!n8nResult.success) {
      console.error('n8n content workflow failed:', n8nResult.message, n8nResult.error);
      // Don't fail the webhook response - Strapi shouldn't retry on n8n failures
    } else {
      console.log('n8n content workflow triggered:', n8nResult.executionId || 'success');
    }

    // Return appropriate response based on event type
    if (isPublishEvent) {
      return NextResponse.json({
        success: true,
        message: 'Post published and forwarded to n8n',
        postId: entry.id,
        documentId: entry.documentId,
        title: entry.title,
        url: postUrl,
        event,
        n8n: n8nResult.success ? {
          executionId: n8nResult.executionId,
          workflowId: n8nResult.workflowId,
        } : undefined,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Event processed',
      event,
      postId: entry.id,
      status: entry.status,
      n8n: n8nResult.success ? {
        executionId: n8nResult.executionId,
      } : undefined,
    });

  } catch (error) {
    console.error('Strapi webhook error:', error);
    
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/strapi-webhook
 * 
 * Health check endpoint for Strapi webhook configuration.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const checkConfig = url.searchParams.get('check') === 'config';

  if (checkConfig) {
    return NextResponse.json({
      status: 'active',
      configured: {
        webhookSecret: !!process.env.STRAPI_WEBHOOK_SECRET,
        n8nContentWebhook: !!process.env.N8N_CONTENT_WEBHOOK_URL,
        n8nWebhookSecret: !!process.env.N8N_WEBHOOK_SECRET,
        siteUrl: !!process.env.NEXT_PUBLIC_SITE_URL,
      },
      events: ['entry.create', 'entry.update', 'entry.publish', 'entry.unpublish', 'entry.delete'],
      models: ['post'],
    });
  }

  return NextResponse.json({ 
    status: 'Strapi webhook endpoint active',
    documentation: '/api/strapi-webhook?check=config',
  });
}

/**
 * HEAD /api/strapi-webhook
 * 
 * Lightweight health check for monitoring.
 */
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
