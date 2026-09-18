import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/data/store';

export async function GET() {
  try {
    const stats = DataStore.getStats();
    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('API Error in GET /api/admin/stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve admin stats' },
      { status: 500 }
    );
  }
}
