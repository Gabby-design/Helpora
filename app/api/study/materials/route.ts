import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/data/store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subject_id = searchParams.get('subject_id') || undefined;
    const difficulty = searchParams.get('difficulty') || undefined;
    const search = searchParams.get('search') || undefined;
    const id = searchParams.get('id');

    if (id) {
      const single = DataStore.getStudyMaterialById(id);
      if (!single) {
        return NextResponse.json({ success: false, error: 'Material not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: single });
    }

    const materials = DataStore.getStudyMaterials({ subject_id, difficulty, search });
    return NextResponse.json({ success: true, data: materials });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.subject_id || !body.content) {
      return NextResponse.json({ success: false, error: 'Title, subject_id, and content are required' }, { status: 400 });
    }

    const created = DataStore.createStudyMaterial({
      title: body.title.trim(),
      subject_id: body.subject_id,
      topic_id: body.topic_id || 'general',
      description: body.description?.trim() || '',
      difficulty: body.difficulty || 'beginner',
      type: body.type || 'guide',
      content: body.content.trim()
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
