import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data/store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { review_id, status } = body;

    if (!review_id || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing review_id or status' },
        { status: 400 }
      );
    }

    if (!['approved', 'flagged', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid moderation status' },
        { status: 400 }
      );
    }

    const updated = DataStore.updateReviewStatus(review_id, status);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Review marked as ${status}`,
      data: updated
    });
  } catch (error) {
    console.error('API Error in POST /api/admin/reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update review status' },
      { status: 500 }
    );
  }
}
