import { NextResponse } from "next/server";
import { z } from "zod";
import { triggerContactWorkflow } from "@/lib/n8n";

// Rate limiting map (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 3; // 3 requests per window (more restrictive than contact)
const RATE_WINDOW = 60 * 1000; // 1 minute

// Extended validation schema for correspondence (more detailed than contact)
const correspondenceSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  organization: z.string().max(100).optional(),
  title: z.string().max(100).optional(),
  email: z.string().email("Valid email is required"),
  phone: z.string().max(50).optional(),
  inquiryType: z.enum(["general", "advisory", "access", "press", "family-office", "investment"]),
  referralSource: z.string().max(200).optional(),
  referralDetail: z.string().max(500).optional(),
  familyOfficeType: z.enum(["single", "multi", "virtual", "other"]).optional(),
  aum: z.enum(["under-50m", "50m-250m", "250m-1b", "over-1b", "prefer-not-to-say"]).optional(),
  urgency: z.enum(["low", "normal", "high", "immediate"]).default("normal"),
  preferredContact: z.enum(["email", "phone", "either"]).default("email"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  newsletter: z.boolean().default(false),
});

export type CorrespondenceFormData = z.infer<typeof correspondenceSchema>;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (now - record.timestamp > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

/**
 * POST /api/correspondence
 * 
 * Handle detailed correspondence form submissions with enhanced n8n workflow integration.
 * 
 * This endpoint is designed for the /correspondence page which collects more
 * detailed information for high-net-worth inquiries and family office prospects.
 * 
 * Flow:
 * 1. Rate limiting check (3 requests/min per IP - stricter than contact)
 * 2. Input validation with Zod
 * 3. Trigger n8n correspondence workflow (enhanced lead enrichment)
 * 4. Optional: Send email notification via Resend
 * 
 * n8n Integration:
 * - Forwards detailed form data to N8N_WEBHOOK_URL
 * - Includes lead scoring metadata for family office prospects
 * - Triggers HubSpot contact creation/upd ate
 * - Sends Slack notifications for high-value leads
 * - Can trigger personalized email responses
 */
export async function POST(request: Request) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";
    
    // Rate limiting check (stricter than contact form)
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate
    const body = await request.json();
    const validated = correspondenceSchema.parse(body);

    // Calculate lead score based on criteria
    const leadScore = calculateLeadScore(validated);

    // Prepare metadata for n8n
    const meta = {
      formId: "correspondence",
      formType: "detailed-inquiry",
      ipAddress: ip,
      userAgent: request.headers.get("user-agent") || "unknown",
      source: "sloaneadler-website",
      leadScore,
      isHighValueLead: leadScore >= 70,
    };

    // Trigger n8n workflow with enriched data
    const n8nResult = await triggerContactWorkflow(validated, meta);

    if (!n8nResult.success) {
      console.error("n8n correspondence workflow failed:", n8nResult.message, n8nResult.error);
    } else {
      console.log("n8n correspondence workflow triggered:", {
        executionId: n8nResult.executionId,
        leadScore,
        isHighValue: meta.isHighValueLead,
      });
    }

    // Send notification email if Resend is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "SLOANE / Adler <correspondence@sloaneadler.com>",
            to: process.env.CONTACT_EMAIL || "correspondence@sloaneadler.com",
            reply_to: validated.email,
            subject: `[${validated.urgency.toUpperCase()}] Correspondence: ${validated.inquiryType} - ${validated.name}`,
            text: buildEmailContent(validated, leadScore),
            html: buildEmailHtml(validated, leadScore),
          }),
        });

        if (!emailResponse.ok) {
          console.error("Email notification failed:", await emailResponse.text());
        }
      } catch (emailError) {
        console.error("Email send error:", emailError);
      }
    }

    return NextResponse.json({ 
      success: true,
      message: "Correspondence submitted successfully",
      leadScore,
      n8n: n8nResult.success ? {
        executionId: n8nResult.executionId,
        workflowId: n8nResult.workflowId,
      } : undefined,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    
    console.error("Correspondence form error:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/correspondence
 * 
 * Returns endpoint information.
 */
export async function GET() {
  return NextResponse.json({
    endpoint: "/api/correspondence",
    methods: ["POST"],
    description: "Detailed correspondence form with enhanced n8n integration",
    rateLimit: {
      requests: RATE_LIMIT,
      window: "1 minute",
    },
    requiredFields: {
      name: "string (1-100 chars)",
      email: "valid email",
      inquiryType: "general | advisory | access | press | family-office | investment",
      message: "string (10-5000 chars)",
    },
    optionalFields: {
      organization: "string (max 100 chars)",
      title: "string (max 100 chars)",
      phone: "string (max 50 chars)",
      referralSource: "string (max 200 chars)",
      referralDetail: "string (max 500 chars)",
      familyOfficeType: "single | multi | virtual | other",
      aum: "under-50m | 50m-250m | 250m-1b | over-1b | prefer-not-to-say",
      urgency: "low | normal | high | immediate",
      preferredContact: "email | phone | either",
      newsletter: "boolean",
    },
    integrations: {
      n8n: process.env.N8N_WEBHOOK_URL ? "configured" : "not configured",
      resend: process.env.RESEND_API_KEY ? "configured" : "not configured",
    },
  });
}

/**
 * Calculate lead score based on form data
 * Higher scores indicate more valuable leads
 */
function calculateLeadScore(data: CorrespondenceFormData): number {
  let score = 0;

  // Family office type (highest value)
  if (data.familyOfficeType) {
    switch (data.familyOfficeType) {
      case 'single':
        score += 40;
        break;
      case 'multi':
        score += 35;
        break;
      case 'virtual':
        score += 25;
        break;
    }
  }

  // AUM range
  if (data.aum) {
    switch (data.aum) {
      case 'over-1b':
        score += 30;
        break;
      case '250m-1b':
        score += 25;
        break;
      case '50m-250m':
        score += 20;
        break;
      case 'under-50m':
        score += 15;
        break;
    }
  }

  // Inquiry type
  switch (data.inquiryType) {
    case 'advisory':
      score += 20;
      break;
    case 'family-office':
      score += 20;
      break;
    case 'investment':
      score += 15;
      break;
    case 'access':
      score += 10;
      break;
    case 'press':
      score += 5;
      break;
  }

  // Urgency
  switch (data.urgency) {
    case 'immediate':
      score += 10;
      break;
    case 'high':
      score += 5;
      break;
  }

  // Referral source (indicates warm lead)
  if (data.referralSource) {
    score += 10;
  }

  // Organization provided
  if (data.organization) {
    score += 5;
  }

  // Phone provided (more contactable)
  if (data.phone) {
    score += 5;
  }

  return Math.min(score, 100); // Cap at 100
}

/**
 * Build plain text email content
 */
function buildEmailContent(data: CorrespondenceFormData, leadScore: number): string {
  return `
NEW CORRESPONDENCE SUBMISSION
Lead Score: ${leadScore}/100

CONTACT INFORMATION
-------------------
Name: ${data.name}
Organization: ${data.organization || "Not provided"}
Title: ${data.title || "Not provided"}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}

INQUIRY DETAILS
---------------
Type: ${data.inquiryType}
Urgency: ${data.urgency}
Preferred Contact: ${data.preferredContact}
Newsletter Opt-in: ${data.newsletter ? "Yes" : "No"}

FAMILY OFFICE PROFILE
---------------------
Family Office Type: ${data.familyOfficeType || "Not provided"}
AUM Range: ${data.aum || "Not provided"}

REFERRAL INFORMATION
--------------------
Source: ${data.referralSource || "Not provided"}
Detail: ${data.referralDetail || "Not provided"}

MESSAGE
-------
${data.message}
  `.trim();
}

/**
 * Build HTML email content
 */
function buildEmailHtml(data: CorrespondenceFormData, leadScore: number): string {
  const getUrgencyColor = () => {
    switch (data.urgency) {
      case 'immediate': return '#dc2626';
      case 'high': return '#ea580c';
      case 'normal': return '#2563eb';
      default: return '#6b7280';
    }
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; line-height: 1.5; color: #333; }
    .header { background: #1a2332; color: white; padding: 20px; }
    .lead-score { 
      background: ${leadScore >= 70 ? '#dcfce7' : leadScore >= 40 ? '#fef3c7' : '#f3f4f6'};
      padding: 10px 15px;
      border-radius: 5px;
      margin: 15px 0;
      font-weight: bold;
    }
    .section { margin: 20px 0; }
    .section h3 { color: #1a2332; border-bottom: 2px solid #b8a07e; padding-bottom: 5px; }
    .field { margin: 10px 0; }
    .label { font-weight: bold; color: #666; }
    .urgency { color: ${getUrgencyColor()}; font-weight: bold; text-transform: uppercase; }
    .message { background: #f9fafb; padding: 15px; border-left: 4px solid #b8a07e; }
  </style>
</head>
<body>
  <div class="header">
    <h2>New Correspondence Submission</h2>
  </div>
  
  <div class="lead-score">
    Lead Score: ${leadScore}/100 ${leadScore >= 70 ? '⭐ HIGH VALUE' : ''}
  </div>

  <div class="section">
    <h3>Contact Information</h3>
    <div class="field"><span class="label">Name:</span> ${data.name}</div>
    <div class="field"><span class="label">Organization:</span> ${data.organization || "Not provided"}</div>
    <div class="field"><span class="label">Title:</span> ${data.title || "Not provided"}</div>
    <div class="field"><span class="label">Email:</span> ${data.email}</div>
    <div class="field"><span class="label">Phone:</span> ${data.phone || "Not provided"}</div>
  </div>

  <div class="section">
    <h3>Inquiry Details</h3>
    <div class="field"><span class="label">Type:</span> ${data.inquiryType}</div>
    <div class="field"><span class="label">Urgency:</span> <span class="urgency">${data.urgency}</span></div>
    <div class="field"><span class="label">Preferred Contact:</span> ${data.preferredContact}</div>
  </div>

  ${data.familyOfficeType || data.aum ? `
  <div class="section">
    <h3>Family Office Profile</h3>
    ${data.familyOfficeType ? `<div class="field"><span class="label">Type:</span> ${data.familyOfficeType}</div>` : ''}
    ${data.aum ? `<div class="field"><span class="label">AUM Range:</span> ${data.aum}</div>` : ''}
  </div>
  ` : ''}

  ${data.referralSource ? `
  <div class="section">
    <h3>Referral Information</h3>
    <div class="field"><span class="label">Source:</span> ${data.referralSource}</div>
    ${data.referralDetail ? `<div class="field"><span class="label">Detail:</span> ${data.referralDetail}</div>` : ''}
  </div>
  ` : ''}

  <div class="section">
    <h3>Message</h3>
    <div class="message">${data.message.replace(/\n/g, '<br>')}</div>
  </div>
</body>
</html>
  `;
}
