import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiting (for development)
// In production, use Redis with @upstash/ratelimit
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export const rateLimiters = {
  contact: {
    limit: async (identifier: string) => {
      const now = Date.now();
      const windowMs = 5 * 60 * 1000; // 5 minutes
      const maxRequests = 3;
      
      const record = rateLimitMap.get(identifier);
      
      if (!record || now - record.timestamp > windowMs) {
        rateLimitMap.set(identifier, { count: 1, timestamp: now });
        return {
          success: true,
          limit: maxRequests,
          remaining: maxRequests - 1,
          reset: now + windowMs,
        };
      }
      
      if (record.count >= maxRequests) {
        return {
          success: false,
          limit: maxRequests,
          remaining: 0,
          reset: record.timestamp + windowMs,
        };
      }
      
      record.count++;
      return {
        success: true,
        limit: maxRequests,
        remaining: maxRequests - record.count,
        reset: record.timestamp + windowMs,
      };
    },
  },
  api: {
    limit: async (identifier: string) => {
      const now = Date.now();
      const windowMs = 60 * 1000; // 1 minute
      const maxRequests = 60;
      
      const record = rateLimitMap.get(identifier);
      
      if (!record || now - record.timestamp > windowMs) {
        rateLimitMap.set(identifier, { count: 1, timestamp: now });
        return {
          success: true,
          limit: maxRequests,
          remaining: maxRequests - 1,
          reset: now + windowMs,
        };
      }
      
      if (record.count >= maxRequests) {
        return {
          success: false,
          limit: maxRequests,
          remaining: 0,
          reset: record.timestamp + windowMs,
        };
      }
      
      record.count++;
      return {
        success: true,
        limit: maxRequests,
        remaining: maxRequests - record.count,
        reset: record.timestamp + windowMs,
      };
    },
  },
  auth: {
    limit: async (identifier: string) => {
      const now = Date.now();
      const windowMs = 15 * 60 * 1000; // 15 minutes
      const maxRequests = 5;
      
      const record = rateLimitMap.get(identifier);
      
      if (!record || now - record.timestamp > windowMs) {
        rateLimitMap.set(identifier, { count: 1, timestamp: now });
        return {
          success: true,
          limit: maxRequests,
          remaining: maxRequests - 1,
          reset: now + windowMs,
        };
      }
      
      if (record.count >= maxRequests) {
        return {
          success: false,
          limit: maxRequests,
          remaining: 0,
          reset: record.timestamp + windowMs,
        };
      }
      
      record.count++;
      return {
        success: true,
        limit: maxRequests,
        remaining: maxRequests - record.count,
        reset: record.timestamp + windowMs,
      };
    },
  },
};

export function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  return "anonymous";
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  response?: NextResponse;
}

export async function checkRateLimit(
  request: NextRequest,
  limiter: { limit: (identifier: string) => Promise<{ success: boolean; limit: number; remaining: number; reset: number }> },
  identifier?: string
): Promise<RateLimitResult> {
  const key = identifier || getClientIP(request);
  const { success, limit, reset, remaining } = await limiter.limit(key);

  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000);
    const response = NextResponse.json(
      {
        error: "Too Many Requests",
        message: "Rate limit exceeded. Please try again later.",
        retryAfter,
      },
      {
        status: 429,
        headers: {
          "RateLimit-Limit": limit.toString(),
          "RateLimit-Remaining": "0",
          "RateLimit-Reset": Math.ceil(reset / 1000).toString(),
          "Retry-After": retryAfter.toString(),
        },
      }
    );
    return { success: false, limit, remaining: 0, reset, response };
  }

  return { success: true, limit, remaining, reset };
}
