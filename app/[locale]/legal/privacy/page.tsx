export const metadata = {
  title: "Privacy Policy | Sloane Adler",
  description: "How we collect, use, and protect your personal information.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
              How we handle your information.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">Last updated: March 2026</p>
          </div>

          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              Introduction
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                This Privacy Policy describes how Sloane Adler (Films/Photos) collects, uses, and shares your personal information when you visit sloaneadler.com or use our contact form.
              </p>
              <p>
                We are committed to protecting your privacy and handling your data in compliance with applicable laws, including GDPR and CCPA.
              </p>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              1. Information We Collect
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p className="font-medium text-foreground">Contact Form Submissions:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number (optional)</li>
                <li>Project type</li>
                <li>Message content</li>
              </ul>
              
              <p className="font-medium text-foreground mt-6">Automatically Collected:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Referrer URL</li>
              </ul>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              2. How We Use Your Information
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to inquiries and booking requests</li>
                <li>Coordinate production scheduling</li>
                <li>Send project-related communications</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </div>

          {/* Data Retention */}
          <div className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              3. Data Retention
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Contact form submissions are retained for <strong>3 years</strong> from the date of submission, or for the duration of our business relationship, whichever is longer. After this period, data is securely deleted.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              4. Your Rights
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to certain processing activities</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us through the form on this website.
              </p>
            </div>
          </div>

          {/* Third Parties */}
          <div className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              5. Third-Party Services
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Vercel:</strong> Website hosting and analytics</li>
                <li><strong>GCP Cloud SQL:</strong> Secure database storage</li>
                <li><strong>Resend:</strong> Email delivery</li>
                <li><strong>n8n:</strong> Workflow automation</li>
              </ul>
            </div>
          </div>

          {/* Security */}
          <div className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              6. Data Security
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                We implement industry-standard security measures including HTTPS/TLS encryption, password protection, secure cloud database with encryption at rest, and regular security audits.
              </p>
            </div>
          </div>

          {/* Changes */}
          <div className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              7. Changes to This Policy
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                We may update this Privacy Policy periodically. Changes are effective when posted.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="border-t border-border pt-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              Contact Us
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                For privacy-related questions, please contact us through the contact form on this website.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
