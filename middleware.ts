import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Create next-intl middleware
const intlMiddleware = createIntlMiddleware(routing);

// Routes that don't require authentication
const publicRoutes = ["/access", "/api/auth/verify", "/api/auth/logout"];

// Security headers to add to all responses
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
};

// Content Security Policy
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle i18n first
  const intlResponse = intlMiddleware(request);
  
  // If next-intl returns a redirect, return that response
  if (intlResponse.status !== 200) {
    return intlResponse;
  }

  let response: NextResponse;

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    response = intlResponse;
  }
  // Allow API routes
  else if (pathname.startsWith("/api/")) {
    response = intlResponse;
  }
  // Check for auth cookie
  else {
    const session = request.cookies.get("site_session");

    if (session?.value !== "authenticated") {
      const url = request.nextUrl.clone();
      url.pathname = "/access";
      url.searchParams.set("redirect", pathname);
      response = NextResponse.redirect(url);
    } else {
      response = intlResponse;
    }
  }

  // Add security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add CSP header
  response.headers.set(
    'Content-Security-Policy',
    cspHeader.replace(/\s{2,}/g, ' ').trim()
  );

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
