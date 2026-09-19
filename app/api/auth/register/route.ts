import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '@/lib/auth/schemas';
import { checkRateLimit } from '@/lib/auth/rateLimiter';
import { verifyTurnstileToken } from '@/lib/auth/turnstile';
import { AUTH_COOKIE_NAME } from '@/lib/auth/adapter';
import { User, UserRole } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimit = checkRateLimit(`register_${ip}`, 5, 60000);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many registration attempts from this network. Please wait ${rateLimit.resetInSec} seconds.`
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Verify Cloudflare Turnstile token
    const turnstileCheck = await verifyTurnstileToken(body.turnstileToken, ip);
    if (!turnstileCheck.success) {
      return NextResponse.json({ success: false, message: turnstileCheck.message }, { status: 400 });
    }

    // Zod validation
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Invalid registration details';
      return NextResponse.json({ success: false, message: firstError }, { status: 400 });
    }

    const { name, email, role } = parsed.data;

    const user: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: role as UserRole,
      avatar: `https://avatar.vercel.sh/${encodeURIComponent(email)}`,
      email_verified: true,
      created_at: new Date().toISOString()
    };

    // Providers continue straight into business onboarding
    const redirectTo = role === 'provider'
      ? '/business/register?from=register'
      : role === 'volunteer_org'
      ? '/community/volunteer?from=register'
      : '/account?welcome=true';

    const res = NextResponse.json({
      success: true,
      user,
      redirectTo,
      message: 'Account registered successfully!'
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
      { success: false, message: err.message || 'An unexpected error occurred during registration' },
      { status: 500 }
    );
  }
}
