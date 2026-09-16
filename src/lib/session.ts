import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export interface SessionPayload {
  userId: string;
  role: 'admin' | 'editor';
  expiresAt: Date;
}

const SESSION_COOKIE = 'zoy_session';
const CSRF_COOKIE = 'csrf_token';
const secretKey = process.env.SESSION_SECRET || 'development-secret-key-change-me';

const encodedKey = new TextEncoder().encode(secretKey);

function generateToken(length = 32) {
  const bytes = new Uint8Array(length);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function getCsrfToken() {
  const cookieStore = await cookies();
  return cookieStore.get(CSRF_COOKIE)?.value || '';
}

export async function validateCsrfToken(token) {
  if (!token) return false;
  const expectedToken = await getCsrfToken();
  return typeof token === 'string' && token.length > 0 && token === expectedToken;
}

export async function requireAdminSession(payload: Record<string, unknown> | string = {}) {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    throw new Error('Unauthorized');
  }

  const csrfToken = typeof payload === 'string' ? payload : (payload?.csrfToken as string | undefined) || '';
  if (csrfToken) {
    const isValid = await validateCsrfToken(csrfToken);
    if (!isValid) {
      throw new Error('Invalid CSRF token');
    }
  }

  return session;
}

// ─────────────────────────────────────────────
// Encrypt / Decrypt
// ─────────────────────────────────────────────

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────
// Cookie Helpers
// ─────────────────────────────────────────────

export async function createSession(userId: string, role: 'admin' | 'editor'): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const token = await encrypt({ userId, role, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return decrypt(token);
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

// ─────────────────────────────────────────────
// Middleware-compatible token reader (no async cookies)
// ─────────────────────────────────────────────

export { SESSION_COOKIE, CSRF_COOKIE };
