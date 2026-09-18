import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/data/store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region') || undefined;
    const all = searchParams.get('all') === 'true';

    const contacts = all
      ? DataStore.getAllEmergencyContactsAdmin()
      : DataStore.getEmergencyContacts(region);

    return NextResponse.json({ success: true, data: contacts });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.phone) {
      return NextResponse.json({ success: false, error: 'Name and phone are required' }, { status: 400 });
    }

    const newContact = DataStore.createEmergencyContact({
      name: body.name.trim(),
      description: body.description?.trim() || '',
      phone: body.phone.trim(),
      country: body.country?.trim() || 'Nigeria',
      region: body.region?.trim() || 'National',
      service_type: body.service_type?.trim() || 'Emergency Service',
      active: body.active !== undefined ? body.active : true,
      priority: Number(body.priority) || 10,
      urgent: Boolean(body.urgent)
    });

    return NextResponse.json({ success: true, data: newContact }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Contact ID is required' }, { status: 400 });
    }

    const updated = DataStore.updateEmergencyContact(body.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Emergency contact not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Contact ID required' }, { status: 400 });
    }

    const deleted = DataStore.deleteEmergencyContact(id);
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
