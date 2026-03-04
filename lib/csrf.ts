import { cookies } from 'next/headers';
import { createHmac, randomBytes, timingSafeEqual } from 'crypto';

const CSRF_COOKIE_NAME = '__Host-csrf-token';
const CSRF_HEADER_NAME = 'x-csrf-token';
const CSRF_SECRET = process.env.CSRF_SECRET!;

if (!CSRF_SECRET) {
  throw new Error('CSRF_SECRET environment variable is required');
}

const TOKEN_SEPARATOR = '.';

function generateRandomValue(length: number = 32): string {
  return randomBytes(length).toString('hex');
}

function createHmacSignature(sessionId: string, randomValue: string): string {
  const message = `${sessionId.length}!${sessionId}!${randomValue.length}!${randomValue}`;
  return createHmac('sha256', CSRF_SECRET).update(message).digest('hex');
}

export async function generateCSRFToken(sessionId: string): Promise<string> {
  const randomValue = generateRandomValue();
  const hmac = createHmacSignature(sessionId, randomValue);
  const token = `${hmac}${TOKEN_SEPARATOR}${randomValue}`;
  
  const cookieStore = await cookies();
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24,
  });
  
  return token;
}

export async function validateCSRFToken(
  requestToken: string | null,
  sessionId: string
): Promise<boolean> {
  if (!requestToken) return false;
  
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;
  
  if (!cookieToken) return false;
  
  const [requestHmac, requestRandom] = requestToken.split(TOKEN_SEPARATOR);
  const [cookieHmac, cookieRandom] = cookieToken.split(TOKEN_SEPARATOR);
  
  if (!requestHmac || !requestRandom || !cookieHmac || !cookieRandom) {
    return false;
  }
  
  if (!timingSafeEqual(Buffer.from(requestRandom), Buffer.from(cookieRandom))) {
    return false;
  }
  
  const expectedHmac = createHmacSignature(sessionId, requestRandom);
  
  if (!timingSafeEqual(Buffer.from(requestHmac), Buffer.from(expectedHmac))) {
    return false;
  }
  
  return true;
}

export function getCSRFTokenFromRequest(request: Request): string | null {
  return request.headers.get(CSRF_HEADER_NAME);
}

export { CSRF_COOKIE_NAME, CSRF_HEADER_NAME };
