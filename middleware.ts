import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { SESSION_COOKIE } from '@/lib/session';

const secretKey = process.env.SESSION_SECRET;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard /admin/* routes
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';

  if (!isAdminRoute || isLoginPage) {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;

  if (!token || !secretKey) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  try {
    const encodedKey = new TextEncoder().encode(secretKey);
    await jwtVerify(token, encodedKey, { algorithms: ['HS256'] });
    return NextResponse.next();
  } catch {
    // Token invalid or expired
    const response = NextResponse.redirect(new URL('/admin/login', req.url));
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
