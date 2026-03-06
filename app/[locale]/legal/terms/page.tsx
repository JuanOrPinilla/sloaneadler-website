export const metadata = {
  title: "Terms of Service | Sloane Adler",
  description: "Terms of service and conditions for using this website.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
              Conditions for using this website.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">Last updated: March 2026</p>
          </div>

          {/* Acceptance */}
          <div className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              1. Acceptance of Terms
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                By accessing and using this website (sloaneadler.com), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use this website.
              </p>
            </div>
          </div>

          {/* Use License */}
          <div className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              2. Use License
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Permission is granted to temporarily view the materials on this website for personal, non-commercial use only. This is the grant of a license, not a transfer of title.
              </p>
              <p>Under this license you may not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to reverse engineer any software on the website</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer materials to another person or mirror on another server</li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              3. Disclaimer
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                The materials on this website are provided on an "as is" basis. Sloane Adler makes no warranties, expressed or implied, and hereby disclaims all other warranties including merchantability, fitness for a particular purpose, or non-infringement.
              </p>
            </div>
          </div>

          {/* Limitations */}
          <div className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              4. Limitations
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                In no event shall Sloane Adler be liable for any damages arising out of the use or inability to use the materials on this website.
              </p>
            </div>
          </div>

          {/* Revisions */}
          <div className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              5. Revisions
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Sloane Adler may revise these terms at any time without notice. By using this website, you agree to be bound by the current version.
              </p>
            </div>
          </div>

          {/* Governing Law */}
          <div className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              6. Governing Law
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                These terms shall be governed by and construed in accordance with the laws of the State of Virginia, United States.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="border-t border-border pt-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              Contact
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                For questions about these Terms, please contact us through the contact form on this website.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
