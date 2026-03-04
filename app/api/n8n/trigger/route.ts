import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  triggerWorkflow,
  triggerContactWorkflow,
  triggerContentWorkflow,
  triggerLeadEnrichment,
  getN8NStatus,
  WorkflowResult,
  WorkflowType,
} from '@/lib/n8n';

// Validation schema for trigger requests
const triggerSchema = z.object({
  workflow: z.enum([
    'contact_form',
    'content_publish',
    'lead_enrichment',
    'correspondence',
    'custom',
  ] as const),
  payload: z.record(z.unknown()).optional(),
  formData: z.record(z.unknown()).optional(),
  post: z.record(z.unknown()).optional(),
  lead: z.record(z.unknown()).optional(),
  meta: z.record(z.unknown()).optional(),
});

export type TriggerRequest = z.infer<typeof triggerSchema>;

/**
 * POST /api/n8n/trigger
 * 
 * Trigger n8n workflows programmatically.
 * 
 * Request body:
 * {
 *   workflow: 'contact_form' | 'content_publish' | 'lead_enrichment' | 'correspondence' | 'custom',
 *   payload?: object,       // Generic payload for custom workflows
 *   formData?: object,      // For contact_form/correspondence workflows
 *   post?: object,          // For content_publish workflow
 *   lead?: object,          // For lead_enrichment workflow
 *   meta?: object           // Additional metadata
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate request
    const validation = triggerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Invalid request body',
          details: validation.error.errors 
        },
        { status: 400 }
      );
    }

    const { workflow, payload, formData, post, lead, meta = {} } = validation.data;

    // Get request metadata
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Build metadata
    const enrichedMeta = {
      ...meta,
      ipAddress: ip,
      userAgent,
      timestamp: new Date().toISOString(),
    };

    let result: WorkflowResult;

    // Route to appropriate trigger function
    switch (workflow) {
      case 'contact_form':
      case 'correspondence':
        if (!formData) {
          return NextResponse.json(
            { error: 'formData is required for contact workflows' },
            { status: 400 }
          );
        }
        result = await triggerContactWorkflow(formData, enrichedMeta);
        break;

      case 'content_publish':
        if (!post) {
          return NextResponse.json(
            { error: 'post is required for content_publish workflow' },
            { status: 400 }
          );
        }
        result = await triggerContentWorkflow(
          post,
          (meta?.webhookType as 'entry.publish' | 'entry.update' | 'entry.create' | 'entry.unpublish') || 'entry.publish',
          (meta?.model as string) || 'post'
        );
        break;

      case 'lead_enrichment':
        if (!lead) {
          return NextResponse.json(
            { error: 'lead is required for lead_enrichment workflow' },
            { status: 400 }
          );
        }
        result = await triggerLeadEnrichment(lead, enrichedMeta);
        break;

      case 'custom':
        if (!payload) {
          return NextResponse.json(
            { error: 'payload is required for custom workflows' },
            { status: 400 }
          );
        }
        result = await triggerWorkflow('custom', {
          ...payload,
          meta: enrichedMeta,
        } as { meta: typeof enrichedMeta });
        break;

      default:
        return NextResponse.json(
          { error: `Unknown workflow type: ${workflow}` },
          { status: 400 }
        );
    }

    if (!result.success) {
      return NextResponse.json(
        { 
          error: 'Workflow trigger failed',
          message: result.message,
          details: result.error 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      workflow,
      executionId: result.executionId,
      workflowId: result.workflowId,
      message: result.message,
    });

  } catch (error) {
    console.error('n8n trigger API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

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
 * GET /api/n8n/trigger
 * 
 * Get n8n integration status and available workflows.
 */
export async function GET() {
  const status = getN8NStatus();
  
  return NextResponse.json({
    status: 'active',
    configured: status.configured,
    integrations: {
      baseUrl: status.baseUrl,
      apiKey: status.apiKey,
    },
    workflows: {
      contact_form: status.webhooks.contact,
      content_publish: status.webhooks.content,
      lead_enrichment: status.webhooks.leadEnrichment,
      custom: status.webhooks.custom,
    },
    endpoints: {
      trigger: '/api/n8n/trigger',
      health: '/api/health',
    },
  });
}

/**
 * OPTIONS /api/n8n/trigger
 * 
 * Handle CORS preflight requests.
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
