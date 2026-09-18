import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/data/store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('all') === 'true';
    const data = includeInactive
      ? DataStore.getAllCategoriesAdmin()
      : DataStore.getCategories();

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.description) {
      return NextResponse.json({ success: false, error: 'Name and description are required' }, { status: 400 });
    }

    const newCat = DataStore.createCategory({
      name: body.name.trim(),
      slug: body.slug?.trim() || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      iconName: body.iconName || 'Wrench',
      description: body.description.trim(),
      commonServices: body.commonServices || [],
      active: body.active !== undefined ? body.active : true,
      sortOrder: body.sortOrder || 99
    });

    return NextResponse.json({ success: true, data: newCat }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Category ID is required' }, { status: 400 });
    }

    const updated = DataStore.updateCategory(body.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
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
      return NextResponse.json({ success: false, error: 'Category ID required' }, { status: 400 });
    }

    const deleted = DataStore.deleteCategory(id);
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
