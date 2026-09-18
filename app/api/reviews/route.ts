import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data/store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const providerId = searchParams.get('provider_id');

    let reviews;
    if (providerId) {
      reviews = DataStore.getReviewsByProviderId(providerId);
    } else {
      reviews = DataStore.getAllReviews();
    }

    return NextResponse.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    console.error('API Error in GET /api/reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve reviews' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.provider_id || !body.rating || !body.text) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (provider_id, rating, text)' },
        { status: 400 }
      );
    }

    const newReview = DataStore.createReview({
      provider_id: body.provider_id,
      author: body.author || 'Local Resident',
      rating: Number(body.rating),
      text: body.text
    });

    return NextResponse.json({
      success: true,
      message: 'Review posted successfully',
      data: newReview
    }, { status: 201 });
  } catch (error) {
    console.error('API Error in POST /api/reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to post review' },
      { status: 500 }
    );
  }
}
