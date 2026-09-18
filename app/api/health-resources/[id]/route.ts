import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/data/store';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const resource = DataStore.getHealthResourceById(params.id);
    if (!resource) {
      return NextResponse.json({ success: false, error: 'Health resource not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: resource });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = DataStore.updateHealthResource(params.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Health resource not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = DataStore.deleteHealthResource(params.id);
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
