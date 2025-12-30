import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, organization, email, inquiryType, referralSource, message } = body

    // In production, this would send an email using a service like Resend, SendGrid, etc.
    // For now, we log the submission. The email is hidden from the frontend.
    const emailContent = `
New Correspondence from SLOANE / Adler Website

Name: ${name}
Organization: ${organization || "Not provided"}
Email: ${email}
Inquiry Type: ${inquiryType}
Referral Source: ${referralSource || "Not provided"}

Message:
${message}
    `

    // Email would be sent to: ike_umunnah@mail.harvard.edu
    console.log("Contact form submission:", emailContent)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to process submission" }, { status: 500 })
  }
}
