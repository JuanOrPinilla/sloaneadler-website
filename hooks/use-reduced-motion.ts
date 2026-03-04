'use client';

import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function getInitialState(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia(QUERY).matches;
}

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(getInitialState);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
    } else {
      mediaQueryList.addListener(listener);
    }

    setPrefersReducedMotion(mediaQueryList.matches);

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, []);

  return prefersReducedMotion;
}
