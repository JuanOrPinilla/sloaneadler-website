/**
 * n8n Client Utilities
 * 
 * This module provides utilities for interacting with n8n workflows
 * and managing automation triggers from the Sloane Adler website.
 */

// n8n Configuration
const N8N_BASE_URL = process.env.N8N_BASE_URL || '';
const N8N_API_KEY = process.env.N8N_API_KEY || '';
const N8N_WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET || '';

// Webhook URLs
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || '';
const N8N_CONTENT_WEBHOOK_URL = process.env.N8N_CONTENT_WEBHOOK_URL || '';

// Workflow Types
export type WorkflowType = 
  | 'contact_form'
  | 'content_publish'
  | 'lead_enrichment'
  | 'correspondence'
  | 'custom';

// Webhook Payload Interface
export interface WebhookPayload {
  formData?: Record<string, unknown>;
  post?: Record<string, unknown>;
  lead?: Record<string, unknown>;
  meta: {
    source: string;
    formId?: string;
    timestamp: string;
    ipAddress?: string;
    userAgent?: string;
    webhookType?: string;
    model?: string;
    [key: string]: unknown;
  };
}

// Workflow Execution Result
export interface WorkflowResult {
  success: boolean;
  workflowId?: string;
  executionId?: string;
  message: string;
  error?: string;
}

// n8n API Response
interface N8NApiResponse {
  data?: unknown;
  error?: string;
  message?: string;
  executionId?: string;
  workflowId?: string;
}

/**
 * Get webhook URL for a specific workflow type
 */
export function getWebhookUrl(type: WorkflowType): string | null {
  switch (type) {
    case 'contact_form':
    case 'correspondence':
      return N8N_WEBHOOK_URL || null;
    case 'content_publish':
      return N8N_CONTENT_WEBHOOK_URL || null;
    case 'lead_enrichment':
      return N8N_BASE_URL 
        ? `${N8N_BASE_URL}/webhook/lead-enrichment` 
        : null;
    case 'custom':
      return N8N_BASE_URL 
        ? `${N8N_BASE_URL}/webhook/custom` 
        : null;
    default:
      return null;
  }
}

/**
 * Trigger an n8n workflow via webhook
 */
export async function triggerWorkflow(
  type: WorkflowType,
  payload: WebhookPayload,
  customWebhookUrl?: string
): Promise<WorkflowResult> {
  const webhookUrl = customWebhookUrl || getWebhookUrl(type);

  if (!webhookUrl) {
    return {
      success: false,
      message: `No webhook URL configured for workflow type: ${type}`,
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': N8N_WEBHOOK_SECRET,
        'X-Source': 'sloaneadler-website',
        ...(N8N_API_KEY && { 'X-N8N-API-Key': N8N_API_KEY }),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`n8n webhook failed for ${type}:`, errorText);
      return {
        success: false,
        message: `Webhook request failed: ${response.statusText}`,
        error: errorText,
      };
    }

    // Try to parse JSON response, but handle non-JSON responses gracefully
    let data: N8NApiResponse = {};
    try {
      const text = await response.text();
      if (text) {
        data = JSON.parse(text);
      }
    } catch {
      // Non-JSON response is OK for n8n webhooks
    }

    return {
      success: true,
      workflowId: data.workflowId,
      executionId: data.executionId,
      message: `Workflow ${type} triggered successfully`,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error triggering n8n workflow ${type}:`, error);
    return {
      success: false,
      message: `Failed to trigger workflow: ${errorMessage}`,
      error: errorMessage,
    };
  }
}

/**
 * Trigger contact form workflow
 */
export async function triggerContactWorkflow(
  formData: Record<string, unknown>,
  meta: {
    ipAddress?: string;
    userAgent?: string;
    formId?: string;
    source?: string;
  }
): Promise<WorkflowResult> {
  return triggerWorkflow('contact_form', {
    formData,
    meta: {
      source: meta.source || 'sloaneadler-website',
      formId: meta.formId || 'contact',
      timestamp: new Date().toISOString(),
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    },
  });
}

/**
 * Trigger content publish workflow
 */
export async function triggerContentWorkflow(
  post: Record<string, unknown>,
  event: 'entry.publish' | 'entry.update' | 'entry.create' | 'entry.unpublish' | 'entry.delete',
  model: string
): Promise<WorkflowResult> {
  return triggerWorkflow('content_publish', {
    post,
    meta: {
      source: 'cms',
      site: 'sloaneadler',
      timestamp: new Date().toISOString(),
      webhookType: event,
      model,
    },
  });
}

/**
 * Trigger lead enrichment workflow
 */
export async function triggerLeadEnrichment(
  lead: Record<string, unknown>,
  meta: {
    ipAddress?: string;
    userAgent?: string;
    source?: string;
  }
): Promise<WorkflowResult> {
  return triggerWorkflow('lead_enrichment', {
    lead,
    meta: {
      source: meta.source || 'sloaneadler-website',
      timestamp: new Date().toISOString(),
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    },
  });
}

/**
 * Check if n8n integration is configured
 */
export function isN8NConfigured(): boolean {
  return !!(N8N_BASE_URL || N8N_WEBHOOK_URL || N8N_CONTENT_WEBHOOK_URL);
}

/**
 * Check if specific workflow type is available
 */
export function isWorkflowAvailable(type: WorkflowType): boolean {
  return !!getWebhookUrl(type);
}

/**
 * Get n8n configuration status
 */
export function getN8NStatus(): {
  configured: boolean;
  baseUrl: boolean;
  apiKey: boolean;
  webhooks: {
    contact: boolean;
    content: boolean;
    leadEnrichment: boolean;
    custom: boolean;
  };
} {
  return {
    configured: isN8NConfigured(),
    baseUrl: !!N8N_BASE_URL,
    apiKey: !!N8N_API_KEY,
    webhooks: {
      contact: !!N8N_WEBHOOK_URL,
      content: !!N8N_CONTENT_WEBHOOK_URL,
      leadEnrichment: !!N8N_BASE_URL,
      custom: !!N8N_BASE_URL,
    },
  };
}

/**
 * Make authenticated request to n8n API (for advanced operations)
 */
export async function n8nApiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<unknown> {
  if (!N8N_BASE_URL || !N8N_API_KEY) {
    throw new Error('n8n API not configured');
  }

  const url = `${N8N_BASE_URL}/api/v1${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-N8N-API-KEY': N8N_API_KEY,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`n8n API error: ${error}`);
  }

  return response.json();
}

/**
 * List available workflows from n8n API
 */
export async function listWorkflows(): Promise<unknown> {
  return n8nApiRequest('/workflows');
}

/**
 * Get workflow execution status
 */
export async function getExecutionStatus(executionId: string): Promise<unknown> {
  return n8nApiRequest(`/executions/${executionId}`);
}

/**
 * Activate a workflow
 */
export async function activateWorkflow(workflowId: string): Promise<unknown> {
  return n8nApiRequest(`/workflows/${workflowId}/activate`, {
    method: 'POST',
  });
}

/**
 * Deactivate a workflow
 */
export async function deactivateWorkflow(workflowId: string): Promise<unknown> {
  return n8nApiRequest(`/workflows/${workflowId}/deactivate`, {
    method: 'POST',
  });
}

export default {
  triggerWorkflow,
  triggerContactWorkflow,
  triggerContentWorkflow,
  triggerLeadEnrichment,
  isN8NConfigured,
  isWorkflowAvailable,
  getN8NStatus,
  getWebhookUrl,
  n8nApiRequest,
  listWorkflows,
  getExecutionStatus,
  activateWorkflow,
  deactivateWorkflow,
};
