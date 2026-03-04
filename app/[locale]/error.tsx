'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-light mb-4" style={{ fontFamily: 'Crimson Pro, serif' }}>
          An Error Occurred
        </h1>
        <p className="text-muted-foreground mb-8">
          We apologize for the inconvenience. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={reset}
            className="px-4 py-2 bg-[#1a2332] text-white rounded hover:opacity-90"
          >
            Try again
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 border border-[#1a2332] rounded hover:bg-[#1a2332]/5"
          >
            Return home
          </button>
        </div>
      </div>
    </div>
  );
}
