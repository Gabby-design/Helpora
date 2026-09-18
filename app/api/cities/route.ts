import { NextResponse } from 'next/server';
import { CITIES } from '@/lib/data/cities';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: CITIES
  });
}
