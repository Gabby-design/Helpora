import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/data/store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'usr-demo-1';
    const saved = DataStore.getUserSaved(userId);

    // Resolve full entities
    const providers = saved.providers.map(id => DataStore.getProviderById(id)).filter(Boolean);
    const materials = saved.materials.map(id => DataStore.getStudyMaterialById(id)).filter(Boolean);
    const health = saved.health.map(id => DataStore.getHealthResourceById(id)).filter(Boolean);
    const allOpps = DataStore.getVolunteerOpportunities();
    const volunteer = saved.volunteer.map(id => allOpps.find(o => o.id === id)).filter(Boolean);

    return NextResponse.json({
      success: true,
      data: {
        raw: saved,
        providers,
        materials,
        health,
        volunteer
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId = 'usr-demo-1', type, itemId } = body;

    if (!type || !itemId) {
      return NextResponse.json({ success: false, error: 'Type and itemId are required' }, { status: 400 });
    }

    const isSaved = DataStore.toggleSaved(userId, type, itemId);
    const updated = DataStore.getUserSaved(userId);

    return NextResponse.json({
      success: true,
      isSaved,
      data: updated
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
