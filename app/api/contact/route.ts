import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, organization, email, inquiryType, referralSource, message } = body

    const emailContent = `
New Correspondence from SLOANE / Adler Website

Name: ${name}
Organization: ${organization || "Not provided"}
Email: ${email}
Inquiry Type: ${inquiryType}
Referral Source: ${referralSource || "Not provided"}

Message:
${message}
    `.trim()

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const TO_EMAIL = "ike.umunnah@mail.harvard.edu"

    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "SLOANE / Adler <contact@sloaneadler.com>",
        to: [TO_EMAIL],
        subject: `New Inquiry: ${inquiryType} from ${name}`,
        text: emailContent,
        reply_to: email,
      }),
    })

    const responseData = await resendResponse.json()

    if (!resendResponse.ok) {
      console.error("Resend API error:", responseData)
      throw new Error(responseData.message || "Failed to send email")
    }

    return NextResponse.json({ success: true, id: responseData.id })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      {
        error: "Failed to process submission",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
