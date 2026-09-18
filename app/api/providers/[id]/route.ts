import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data/store';
import { getBusinessStatus } from '@/lib/utils/hours';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const provider = DataStore.getProviderById(id);

    if (!provider) {
      return NextResponse.json(
        { success: false, error: 'Provider not found' },
        { status: 404 }
      );
    }

    const reviews = DataStore.getReviewsByProviderId(id);
    const businessStatus = getBusinessStatus(provider.hours);

    return NextResponse.json({
      success: true,
      data: {
        ...provider,
        reviews,
        businessStatus
      }
    });
  } catch (error) {
    console.error('API Error in GET /api/providers/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve provider details' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updates = await request.json();
    const updated = DataStore.updateProvider(id, updates);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Provider not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated
    });
  } catch (error) {
    console.error('API Error in PATCH /api/providers/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update provider' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const deleted = DataStore.deleteProvider(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Provider not found or could not be deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Provider deleted successfully'
    });
  } catch (error) {
    console.error('API Error in DELETE /api/providers/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete provider' },
      { status: 500 }
    );
  }
}
