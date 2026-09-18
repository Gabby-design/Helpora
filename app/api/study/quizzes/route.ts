import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/data/store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subject_id = searchParams.get('subject_id') || undefined;

    const quizzes = DataStore.getQuizzes(subject_id);
    return NextResponse.json({ success: true, data: quizzes });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
