import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/data/store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cityId = searchParams.get('cityId') || undefined;

    const reports = DataStore.getCommunityReports(cityId);
    return NextResponse.json({ success: true, data: reports });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.description || !body.category || !body.location) {
      return NextResponse.json(
        { success: false, error: 'Title, description, category, and location are required' },
        { status: 400 }
      );
    }

    const report = DataStore.createCommunityReport({
      user_id: body.user_id || 'usr-demo-1',
      user_name: body.user_name?.trim() || 'Community Member',
      title: body.title.trim(),
      description: body.description.trim(),
      category: body.category,
      location: body.location.trim(),
      address: body.address?.trim() || body.location.trim(),
      cityId: body.cityId || 'abuja-fct',
      photo: body.photo?.trim() || undefined
    });

    return NextResponse.json({ success: true, data: report }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id || !body.status) {
      return NextResponse.json({ success: false, error: 'Report ID and status are required' }, { status: 400 });
    }

    const updated = DataStore.updateCommunityReportStatus(body.id, body.status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Report not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
