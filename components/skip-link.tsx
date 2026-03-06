/**
 * SkipLink Component
 * 
 * WCAG 2.4.1 Bypass Blocks - Level A compliance
 * Provides keyboard users a way to skip repetitive navigation
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[#1a2332] focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1a2332] focus:ring-offset-2"
    >
      Skip to main content
    </a>
  )
}
