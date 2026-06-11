"use client"

import { Link } from "@/i18n/routing"
import { trackEvent } from "@/lib/analytics"

export function VelvetRope() {
  return (
    <section className="py-12 px-8 border-t border-slate-200">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm text-slate-500 leading-relaxed">
          Sloane / Adler accepts new mandates by introduction only. To verify a principal or request a secure file transfer, please{" "}
          <Link
            href="/correspondence"
            className="text-[#1a2332] underline underline-offset-2"
            onClick={() => trackEvent('cta_click', { link_text: 'contact us', destination: '/correspondence', location: 'velvet_rope' })}
          >
            contact us
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
