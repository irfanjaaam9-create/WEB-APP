import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'source_by_zahid_super_secret_jwt_key_2026_x89f';

export interface AdminPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function signAdminToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch (error) {
    return null;
  }
}

export async function getAuthSession(): Promise<AdminPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('sbz_admin_token')?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export async function checkAdminAuth(req?: NextRequest): Promise<AdminPayload | null> {
  let token: string | undefined;

  if (req) {
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }

  if (!token) {
    const cookieStore = await cookies();
    token = cookieStore.get('sbz_admin_token')?.value;
  }

  if (!token) return null;
  return verifyAdminToken(token);
}

export function unauthorizedResponse(message = 'Unauthorized admin access') {
  return NextResponse.json({ error: message, success: false }, { status: 401 });
}
