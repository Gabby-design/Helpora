import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data/store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { provider_id, status, license_number, notes } = body;

    if (!provider_id || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing provider_id or status' },
        { status: 400 }
      );
    }

    if (!['verified', 'pending', 'unverified'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid verification status' },
        { status: 400 }
      );
    }

    const updates: Record<string, any> = {
      verification_status: status
    };

    if (status === 'verified') {
      updates.verified_date = new Date().toISOString().split('T')[0];
    }
    if (license_number !== undefined) {
      updates.license_number = license_number;
    }

    const updated = DataStore.updateProvider(provider_id, updates);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Provider not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Provider status updated to ${status}`,
      data: updated
    });
  } catch (error) {
    console.error('API Error in POST /api/admin/verify:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update verification status' },
      { status: 500 }
    );
  }
}
