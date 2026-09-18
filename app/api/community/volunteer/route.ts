import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/data/store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cityId = searchParams.get('cityId') || undefined;

    const opportunities = DataStore.getVolunteerOpportunities(cityId);
    const organizations = DataStore.getVolunteerOrganizations();

    return NextResponse.json({
      success: true,
      data: {
        opportunities,
        organizations
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.org_name || !body.description || !body.location) {
      return NextResponse.json(
        { success: false, error: 'Title, organization, description, and location are required' },
        { status: 400 }
      );
    }

    const created = DataStore.createVolunteerOpportunity({
      org_id: body.org_id || `org-${Date.now()}`,
      org_name: body.org_name.trim(),
      title: body.title.trim(),
      description: body.description.trim(),
      location: body.location.trim(),
      cityId: body.cityId || 'abuja-fct',
      date: body.date?.trim() || 'Upcoming',
      requirements: Array.isArray(body.requirements) ? body.requirements : ['Open to all volunteers'],
      contact: body.contact?.trim() || 'volunteer@civictrust.ng',
      active: true
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
