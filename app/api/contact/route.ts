import { NextResponse } from "next/server";
import { z } from "zod";

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

export async function POST(request: Request) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    
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

    // Prepare webhook payload
    const webhookPayload = {
      formData: validated,
      meta: {
        source: "sloaneadler-website",
        formId: "correspondence",
        timestamp: new Date().toISOString(),
        ipAddress: ip,
        userAgent: request.headers.get("user-agent") || "unknown",
      },
    };

    // Send to n8n webhook if configured
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      const n8nResponse = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Secret": process.env.N8N_WEBHOOK_SECRET || "",
        },
        body: JSON.stringify(webhookPayload),
      });

      if (!n8nResponse.ok) {
        console.error("n8n webhook failed:", await n8nResponse.text());
      }
    }

    // Send notification email if Resend is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      await fetch("https://api.resend.com/emails", {
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
    }

    return NextResponse.json({ success: true });
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
