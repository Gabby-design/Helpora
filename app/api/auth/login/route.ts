import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/auth/schemas';
import { checkRateLimit } from '@/lib/auth/rateLimiter';
import { AUTH_COOKIE_NAME } from '@/lib/auth/adapter';
import { User, UserRole } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimit = checkRateLimit(`login_${ip}`, 5, 60000);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many login attempts. Please wait ${rateLimit.resetInSec} seconds before trying again.`
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Check for development Google demo login
    if (body.isGoogleDemo) {
      const demoUser: User = {
        id: 'usr-google-demo',
        name: body.name || 'Jordan Martinez',
        email: body.email || 'demo.google@helpora.ng',
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        email_verified: true,
        created_at: new Date().toISOString()
      };

      const res = NextResponse.json({
        success: true,
        user: demoUser,
        redirectTo: body.returnTo || '/account'
      });

      res.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: JSON.stringify(demoUser),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });

      return res;
    }

    // Zod validation
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Invalid login details';
      return NextResponse.json({ success: false, message: firstError }, { status: 400 });
    }

    const { email, password, returnTo } = parsed.data;

    // Determine role based on email or default
    let role: UserRole = 'user';
    if (email.includes('admin')) role = 'admin';
    else if (email.includes('provider') || email.includes('artisan') || email.includes('electric') || email.includes('plumb')) role = 'provider';
    else if (email.includes('volunteer') || email.includes('ngo') || email.includes('nysc')) role = 'volunteer_org';

    const displayName = email.split('@')[0].replace(/[._-]/g, ' ').replace(/^\w/, c => c.toUpperCase());

    const user: User = {
      id: `usr-${Date.now()}`,
      name: displayName,
      email,
      role,
      avatar: `https://avatar.vercel.sh/${encodeURIComponent(email)}`,
      email_verified: true,
      created_at: new Date().toISOString()
    };

    let destination = returnTo || '/account';
    if (!returnTo) {
      if (role === 'provider') destination = '/dashboard/business';
      else if (role === 'admin') destination = '/admin';
      else if (role === 'volunteer_org') destination = '/community/volunteer';
    }

    const res = NextResponse.json({
      success: true,
      user,
      redirectTo: destination
    });

    res.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: JSON.stringify(user),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'An unexpected error occurred during login' },
      { status: 500 }
    );
  }
}
