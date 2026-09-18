import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/data/store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || undefined;
    const cityId = searchParams.get('cityId') || undefined;
    const search = searchParams.get('search') || undefined;
    const emergencyOnly = searchParams.get('emergencyOnly') === 'true';

    const latParam = searchParams.get('lat');
    const lngParam = searchParams.get('lng');
    const userLat = latParam ? parseFloat(latParam) : undefined;
    const userLng = lngParam ? parseFloat(lngParam) : undefined;

    const resources = DataStore.getHealthResources({
      type,
      cityId,
      search,
      emergencyOnly,
      userLat,
      userLng
    });

    return NextResponse.json({ success: true, data: resources });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.address || !body.phone) {
      return NextResponse.json({ success: false, error: 'Name, address, and phone are required' }, { status: 400 });
    }

    const created = DataStore.createHealthResource({
      name: body.name.trim(),
      type: body.type || 'hospital',
      address: body.address.trim(),
      cityId: body.cityId || 'abuja-fct',
      lat: Number(body.lat) || 9.0765,
      lng: Number(body.lng) || 7.3986,
      phone: body.phone.trim(),
      hours: body.hours?.trim() || '24/7',
      services: Array.isArray(body.services) ? body.services : [],
      description: body.description?.trim() || '',
      emergency_available: Boolean(body.emergency_available),
      verified_status: body.verified_status || 'verified',
      website: body.website?.trim(),
      is_demo: Boolean(body.is_demo)
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
