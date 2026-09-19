import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/auth/adapter';

export async function POST(req: NextRequest) {
  try {
    const { user } = await req.json();

    if (!user) {
      const response = NextResponse.json({ success: true });
      response.cookies.delete(AUTH_COOKIE_NAME);
      return response;
    }

    const response = NextResponse.json({ success: true, user });
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: JSON.stringify(user),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 400 });
  }
}
