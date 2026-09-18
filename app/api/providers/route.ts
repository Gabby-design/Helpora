import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data/store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const cityId = searchParams.get('cityId') || undefined;
    const search = searchParams.get('search') || undefined;
    const verifiedOnly = searchParams.get('verifiedOnly') === 'true';
    const openNow = searchParams.get('openNow') === 'true';
    const sortBy = (searchParams.get('sortBy') as 'distance' | 'rating' | 'reviews') || undefined;
    
    const latParam = searchParams.get('lat');
    const lngParam = searchParams.get('lng');
    const userLat = latParam ? parseFloat(latParam) : undefined;
    const userLng = lngParam ? parseFloat(lngParam) : undefined;

    const providers = DataStore.getProviders({
      category,
      cityId,
      search,
      verifiedOnly,
      openNow,
      sortBy,
      userLat,
      userLng
    });

    return NextResponse.json({
      success: true,
      count: providers.length,
      data: providers
    });
  } catch (error) {
    console.error('API Error in GET /api/providers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve providers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.category || !body.phone || !body.address) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (name, category, phone, address)' },
        { status: 400 }
      );
    }

    const newProvider = DataStore.createProvider({
      name: body.name.trim(),
      category: body.category,
      cityId: body.cityId || 'abuja-fct',
      description: body.description?.trim() || '',
      address: body.address.trim(),
      lat: Number(body.lat) || 9.0765,
      lng: Number(body.lng) || 7.3986,
      phone: body.phone.trim(),
      email: body.email?.trim() || '',
      website: body.website?.trim() || '',
      hours: body.hours || {
        monday: { open: '08:00', close: '18:00' },
        tuesday: { open: '08:00', close: '18:00' },
        wednesday: { open: '08:00', close: '18:00' },
        thursday: { open: '08:00', close: '18:00' },
        friday: { open: '08:00', close: '18:00' },
        saturday: { open: '09:00', close: '16:00' },
        sunday: { open: '00:00', close: '00:00', closed: true }
      },
      services: Array.isArray(body.services) ? body.services : [],
      photos: Array.isArray(body.photos) && body.photos.length > 0 ? body.photos : [
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
      ],
      verification_status: body.verification_status || 'pending',
      license_number: body.license_number?.trim() || '',
      claimed_by_user_id: body.claimed_by_user_id,
      is_demo: Boolean(body.is_demo)
    });

    return NextResponse.json({
      success: true,
      message: 'Provider registered successfully',
      data: newProvider
    }, { status: 201 });
  } catch (error) {
    console.error('API Error in POST /api/providers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create provider' },
      { status: 500 }
    );
  }
}
