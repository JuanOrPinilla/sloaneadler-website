import { NextResponse } from "next/server";
import { z } from "zod";
import { triggerContactWorkflow } from "@/lib/n8n";

// Rate limiting map (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 5; // 5 requests
const RATE_WINDOW = 60 * 1000; // 1 minute

// Validation schema
const correspondenceSchema = z.object({
  name: z.string().min(1).max(100),
  organization: z.string().max(100).optional(),
  email: z.string().email(),
  inquiryType: z.enum(["general", "advisory", "access", "press"]),
  referralSource: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
});

export type ContactFormData = z.infer<typeof correspondenceSchema>;

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
 * POST /api/contact
 * 
 * Handle contact form submissions with n8n workflow integration.
 * 
 * Flow:
 * 1. Rate limiting check (5 requests/min per IP)
 * 2. Input validation with Zod
 * 3. Trigger n8n contact workflow
 * 4. Optional: Send email notification via Resend
 * 
 * n8n Integration:
 * - Forwards form data to N8N_WEBHOOK_URL
 * - Includes metadata: IP, user agent, timestamp
 * - Workflow can enrich data via HubSpot, Slack, etc.
 */
export async function POST(request: Request) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";
    
    // Rate limiting check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate
    const body = await request.json();
    const validated = correspondenceSchema.parse(body);

    // Trigger n8n workflow
    const n8nResult = await triggerContactWorkflow(validated, {
      formId: "correspondence",
      ipAddress: ip,
      userAgent: request.headers.get("user-agent") || "unknown",
      source: "sloaneadler-website",
    });

    // Log n8n result (don't fail if n8n is down)
    if (!n8nResult.success) {
      console.error("n8n workflow trigger failed:", n8nResult.message, n8nResult.error);
    } else {
      console.log("n8n workflow triggered:", n8nResult.executionId || "no execution ID");
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
            subject: `Correspondence: ${validated.inquiryType} - ${validated.name}`,
            text: `
Name: ${validated.name}
Organization: ${validated.organization || "Not provided"}
Email: ${validated.email}
Inquiry Type: ${validated.inquiryType}
Referral Source: ${validated.referralSource || "Not provided"}

Message:
${validated.message}
            `.trim(),
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
      message: "Form submitted successfully",
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
    
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * 
 * Returns endpoint information.
 */
export async function GET() {
  return NextResponse.json({
    endpoint: "/api/contact",
    methods: ["POST"],
    description: "Contact form submission with n8n integration",
    rateLimit: {
      requests: RATE_LIMIT,
      window: "1 minute",
    },
    requiredFields: {
      name: "string (1-100 chars)",
      email: "valid email",
      inquiryType: "general | advisory | access | press",
      message: "string (10-5000 chars)",
    },
    optionalFields: {
      organization: "string (max 100 chars)",
      referralSource: "string (max 200 chars)",
    },
    integrations: {
      n8n: process.env.N8N_WEBHOOK_URL ? "configured" : "not configured",
      resend: process.env.RESEND_API_KEY ? "configured" : "not configured",
    },
  });
}
