import { NextResponse } from 'next/server';
import { getAllCategories, createCategory } from '@/lib/admin/store';
import { Category } from '@/types';

export async function GET() {
  const categories = await getAllCategories();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const body = await request.json();
  const category: Category = {
    id: `cat-${Date.now()}`,
    name: body.name || '',
    slug: body.slug || body.name?.toLowerCase().replace(/\s+/g, '-') || '',
    image: body.image || '',
    description: body.description || '',
    productCount: Number(body.productCount) || 0,
  };
  const created = await createCategory(category);
  return NextResponse.json(created, { status: 201 });
}
