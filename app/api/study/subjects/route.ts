import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/data/store';

export async function GET() {
  try {
    const subjects = DataStore.getStudySubjects();
    return NextResponse.json({ success: true, data: subjects });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
