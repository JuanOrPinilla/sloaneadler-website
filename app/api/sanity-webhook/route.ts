import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = request.headers.get('x-sanity-webhook-secret');
    if (webhookSecret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { _id, _type, slug, title, excerpt, status } = body;

    if (_type !== 'post' || status !== 'published') {
      return NextResponse.json({ message: 'Not a published post, skipping' });
    }

    const n8nPayload = {
      post: {
        id: _id,
        title,
        slug: slug?.current,
        excerpt,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${slug?.current}`,
        status,
      },
      meta: {
        source: 'sanity-cms',
        site: 'iketheodore',
        timestamp: new Date().toISOString(),
        webhookType: 'new-post',
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
      postId: _id,
    });

  } catch (error) {
    console.error('Sanity webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ status: 'Sanity webhook endpoint active' });
}
