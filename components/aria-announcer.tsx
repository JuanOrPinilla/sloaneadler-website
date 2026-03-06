"use client"

import { useCallback } from "react"

/**
 * Global ARIA live region announcer
 * Place this component once in your layout
 */
export function AriaAnnouncer() {
  return (
    <>
      <div 
        id="aria-announcer-polite" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only" 
      />
      <div 
        id="aria-announcer-assertive" 
        aria-live="assertive" 
        aria-atomic="true" 
        className="sr-only" 
      />
    </>
  )
}

/**
 * Hook to announce messages to screen readers
 */
export function useAnnouncer() {
  const announce = useCallback((message: string, priority: "polite" | "assertive" = "polite") => {
    const announcer = document.getElementById(`aria-announcer-${priority}`)
    if (announcer) {
      announcer.textContent = message
      setTimeout(() => {
        announcer.textContent = ""
      }, 1000)
    }
  }, [])
  return announce
}
