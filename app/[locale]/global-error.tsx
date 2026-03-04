'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error caught:', error)
  }, [error])

  return (
    <html>
      <body style={{ backgroundColor: '#fff', color: '#1a2332' }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <div style={{
              width: '48px',
              height: '1px',
              backgroundColor: '#b8a07e',
              margin: '0 auto 24px',
            }} />
            <h1 style={{ fontSize: '24px', fontWeight: 400, marginBottom: '16px', fontFamily: 'Georgia, serif' }}>
              An Unexpected Error
            </h1>
            <p style={{ color: '#666', marginBottom: '24px' }}>
              We apologize for this inconvenience. Please refresh to continue.
            </p>
            <button
              onClick={reset}
              style={{
                padding: '12px 24px',
                backgroundColor: '#1a2332',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
