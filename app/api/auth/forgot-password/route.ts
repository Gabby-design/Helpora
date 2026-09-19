import { NextRequest, NextResponse } from 'next/server';
import { forgotPasswordSchema } from '@/lib/auth/schemas';
import { checkRateLimit } from '@/lib/auth/rateLimiter';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimit = checkRateLimit(`pwd_reset_${ip}`, 3, 60000);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many password reset requests. Please wait ${rateLimit.resetInSec} seconds.`
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || 'Please enter a valid email address';
      return NextResponse.json({ success: false, message: errorMsg }, { status: 400 });
    }

    const { email } = parsed.data;

    return NextResponse.json({
      success: true,
      message: `If an account exists for ${email}, a password reset link has been dispatched to your inbox.`
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Could not process password reset request' },
      { status: 500 }
    );
  }
}
