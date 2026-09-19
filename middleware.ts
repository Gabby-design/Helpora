import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/auth/adapter';
import { User } from '@/lib/types';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // List of routes that require user to be authenticated
  const isAccountRoute = pathname.startsWith('/account');
  const isBusinessDashboard = pathname.startsWith('/dashboard/business');
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/services/admin');

  // If not accessing a protected route, allow request through immediately
  if (!isAccountRoute && !isBusinessDashboard && !isAdminRoute) {
    return NextResponse.next();
  }

  // Read session cookie
  const sessionCookie = request.cookies.get(AUTH_COOKIE_NAME);
  let user: User | null = null;

  if (sessionCookie?.value) {
    try {
      user = JSON.parse(sessionCookie.value);
    } catch {
      user = null;
    }
  }

  // 1. Unauthenticated users -> redirect to /login with returnTo
  if (!user) {
    const returnTo = `${pathname}${search}`;
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('returnTo', returnTo);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Business Dashboard -> role must be 'provider' or 'admin'
  if (isBusinessDashboard) {
    if (user.role !== 'provider' && user.role !== 'admin') {
      const accountUrl = new URL('/account', request.url);
      accountUrl.searchParams.set(
        'message',
        'Your account is currently registered as a Customer. Please register as a Service Provider to access the Business Dashboard.'
      );
      return NextResponse.redirect(accountUrl);
    }
  }

  // 3. Admin Routes -> role must be 'admin'
  if (isAdminRoute) {
    if (user.role !== 'admin') {
      const accountUrl = new URL('/account', request.url);
      accountUrl.searchParams.set('message', 'Access to the Admin Portal is restricted to verified administrators.');
      return NextResponse.redirect(accountUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/account/:path*',
    '/dashboard/business/:path*',
    '/admin/:path*',
    '/services/admin/:path*'
  ]
};
